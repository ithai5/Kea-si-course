import json
import xmltodict
with open("../data/nbaPlayer.json") as json_file:
    data= json.load(json_file)
    print(data)


with open("../data/nbaPlayer.xml") as xmlFile:
    nbaPlayer = xmltodict.parse(xmlFile.read())
    print(nbaPlayer)

