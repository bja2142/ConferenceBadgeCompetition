from nfc import ContactlessFrontend
from smartcard.CardMonitoring import CardMonitor, CardObserver
from smartcard.util import toHexString
from smartcard.Exceptions import CardConnectionException
from ndef import message_decoder
from re import compile
from threading import Thread
from time import sleep
from requests import post, get
import pygame
import sys
tag_regex = compile("https://[^/]+/#([A-Za-z0-9_\-]+)")

reader1_tag = False
reader2_tag = False

EOM = 0xfe

tag_sound = 'new-tag.wav'
already_tagged_sound = 'already-tagged.wav'
error_sound = 'error.wav'

tag_endpoint = "https://clc.mil.dev/tag"

### APDU Messages for smart card client
get_uid = [0xFF, 0xCA, 0x00, 0x00, 0x00]
get_ats = [0xFF, 0xCA, 0x01, 0x00, 0x00]

threads = []

def playsound(fn):
    pygame.mixer.init()
    pygame.mixer.music.load(fn)
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy() == True:
        continue


def build_apdu_read(block, size):
    assert block <= 256
    assert size <= 256
    return [0xFF, 0xB0, 0x00, block, size]

def check_both_badges_present():
    tag1 = reader1_tag
    tag2 = reader2_tag

    print("Reader1: {}; Reader2: {}".format(tag1, tag2))
    if tag1 and tag2:
        print("tagging!")
        playsound(tag_sound)
        data = { "tagger": tag1, "tagged" : tag2 }
        data2 = { "tagger": tag2, "tagged" : tag1 }
        try:
            resp1 = post(tag_endpoint, data)
            resp2 = post(tag_endpoint, data2)

            print(resp1.text)
            print(resp2.text)

        except Exception as e:
            print(e)

def start_check_badges_thread():
    t = Thread(target=check_both_badges_present)
    t.start()
    threads.append(t)

def parse_ndef(data):
    ndef_data = data[7:]
    
    for record in message_decoder(ndef_data):
        print(record)
        if record.type == 'urn:nfc:wkt:U':
            token = tag_regex.match(record.uri)
            if token:
                return token.group(1)

class TransmitObserver(CardObserver):

    def __init__(self, *args,**kwargs):
        super(TransmitObserver, self).__init__(*args, **kwargs)

    def update(self, observable, actions):
        global reader2_tag
        (added_cards, removed_cards) = actions
        if len(removed_cards) > 0:
            reader2_tag = False
            start_check_badges_thread()
        for card in added_cards:
            card.connection = card.createConnection()
            try:
                card.connection.connect()
            except CardConnectionException:
                print("Card was removed too fast!")
                return
            try:
                response, sw1, sw2 = card.connection.transmit(get_uid)
            except Exception as e:
                print(e)
                continue
            nfc_id = "{}".format(toHexString(response)).replace(" ", "").lower()
            print("Reader 2 Handler: ID={}".format(nfc_id))
            try:
                data = bytes(read_data_from_pcsc_card(card))
            except Exception as e:
                print(e)
                continue
            tag = parse_ndef(data)
            if tag:
                reader2_tag = tag
                start_check_badges_thread()
            return nfc_id


def read_data_from_nfc_tag(tag):
    data = []
    block = 4

    reached_end = False

    while not reached_end:
        response = tag.read(block)[:4]
        for char in response:
            data.append(char)
            if char == EOM:
                reached_end = True
                break
        block = block+1
    return data


def read_data_from_pcsc_card(card):
    data = []
    block = 4

    EOM = 0xfe
    reached_end = False

    while not reached_end:
        message = build_apdu_read(block, 4)
        response, sw1, sw2 = card.connection.transmit(message)
        for char in response:
            data.append(char)
            if char == EOM:
                reached_end = True
                break
        block = block+1
    return data


def connect_handler(tag):
    global reader1_tag
    print("Reader 1 Handler:", str(tag))
    data = bytes(read_data_from_nfc_tag(tag))
    tag = parse_ndef(data)
    if tag:
        reader1_tag = tag
        start_check_badges_thread()
    return True

active = False

def reader1_watcher():
    global reader1_tag
    print("Watcher 1 Starting")
    clf = ContactlessFrontend('usb:054c')
    while active:
        reader1_tag = False
        start_check_badges_thread()
        try:
            tag = clf.connect(rdwr={'on-connect': connect_handler})
        except Exception as e:
            print(e)
        

def reader2_watcher():
    print("Watcher 2 Starting")
    cardmonitor = CardMonitor()
    cardobserver = TransmitObserver()
    cardmonitor.addObserver(cardobserver)
    try:
        while active:
            pass
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    active = True
    #check internet
    while True:
        try:
            resp = get("https://jianmin.dev/")
            print("online:", resp)
            break
        except:
            sleep(5)
    watcher1_thread = Thread(target=reader1_watcher)
    watcher2_thread = Thread(target=reader2_watcher)
    watcher1_thread.start()
    threads.append(watcher1_thread)
    watcher2_thread.start()
    threads.append(watcher2_thread)
    sleep(1)
    if len(sys.argv) == 2 and sys.argv[1] == "daemon":
        print("running in daemon mode")
        while active:
            sleep(10)
    else:
        try:
            while True:
                command = input("press q to quit\n")
                if "q" in command:
                    active = False
                    break
        except KeyboardInterrupt:
            active = False
    for thread in threads:
        thread.join()
