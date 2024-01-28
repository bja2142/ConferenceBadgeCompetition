from secrets import choice

colors= [
       "red",
       "orange",
       "yellow",
       "green",
       "cyan",
       "blue",
       "magenta",
       "purple",
       "grey",
       "silver",
       "pink",
       "maroon",
       "beige",
       "peach",
       "lime",
       "turquoise",
       "teal",
       "indigo",
       "violet"
        ]
handle = [
    "ghost",
    "malware",
    "shell",
    "kernel",
    "crash",
    "phantom",
    "cypher",
    "epoch",
    "macro",
    "bitwise",
    "core",
    "patch"
]
numbers= [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
        ]
prefix = [
    "binary",
    "crypto",
    "web",
    "exploit",
    "persistent",
    "network",
    "forensic",
    "sandbox",
    "vulnerability",
    "malware",
    "firewall",
    "botnet"

        ]
roles = [
        "hacker",
        "analyst",
        "cracker",
        "operator",
        "developer",
        "defender",
        "ropper",
        "architect",
        "engineer",
        "researcher"
        ]

def new_nick():
    return "{}-{}-{}{}".format(
        choice(prefix),
        choice(handle),
        choice(roles),
        choice(numbers)
            )

def gen_list(count):
    items = set()
    while len(items) < count:
       items.add(new_nick())
    return list(items)
