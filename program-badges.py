from nfc import ContactlessFrontend
from ndef import TextRecord, UriRecord
import nfc
from json import dumps, loads

pending_records = []
written_records = {}

try:
    f = open("pending_records","r")
    text = f.read()
    f.close()
    pending_records = loads(text)
    pending_records.reverse()
except Exception as e:
    print(e)



try:
    f = open("written_records","r")
    text = f.read()
    f.close()
    written_records = loads(text)
except:
    pass


URI_FORMAT = "https://clc.mil.dev/#{}"

def connect_handler(tag):
    print("Reader 1 Handler:", str(tag))
    success = False
    global pending_records
    if tag.ndef.is_writeable:
        record = pending_records.pop()

        try:
            tag.ndef.records = [
                    UriRecord(URI_FORMAT.format(record["token"])),
                    TextRecord(record["nickname"]),
                    TextRecord(record["realname"].split(" ")[-1]),
                    TextRecord("clc.mil.dev/puzzle")
                    ]
            success = True
            record["serial"] = tag.identifier.hex().lower()
            written_records[record["token"]] = record
        except nfc.tag.TagCommandError as err:
            print("NDEF write failed: " + str(err))
        except Exception as e:
            print("Unexpected error caused write to fail:", str(e))
    if not success:
        pending_records.append(record)
        raise(Exception("Failed to write tag"))



def program_nfc_tag():
    clf = ContactlessFrontend('usb:054c')
    success = False
    try:
        tag = clf.connect(rdwr={'on-connect': connect_handler})
        success = True
    except Exception as e:
        print(e)
    clf.close()
    return success
 

if __name__ == '__main__':
    active = True
    if len(written_records.keys()) > 0:
        while pending_records[-1]["token"] in written_records:
            pending_records.pop()
    while len(pending_records)>0:
        print("Pending Write: ", pending_records[-1].values())
        text = input("press enter when badge is seated\n")
        if "skip" not in text:
            program_nfc_tag()
            input("press enter after badge is removed\n")
            f = open("written_records","w")
            f.write(dumps(written_records))
            f.close()
        else:
            pending_records.insert(0,pending_records.pop())
    print(written_records)
        
