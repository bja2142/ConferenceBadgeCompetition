import json

l = []

with open("badges.json", "r") as f:
    l = json.loads(f.read())

n = []
for item in l:
    item.pop("realname",None)
    n.append(item)

with open("badges.json", "w") as f:
    f.write(json.dumps(n))
