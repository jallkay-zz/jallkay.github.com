import urllib, json, logging
from flask import Flask, make_response
app = Flask(__name__)

# newsApi stuff
newsApiKey = '793a5531cfaf45b6b6f9221a49c81a74'
newsSources = ['bloomberg', 'bbc-news']
data = []
for source in newsSources:
    newsUrl = ('https://newsapi.org/v1/articles?source=%s&sortBy=top&apiKey=' % source) + newsApiKey
    response = urllib.urlopen(newsUrl)
    data.append(json.loads(response.read()))

#alchelmyApi stuff
from watson_developer_cloud import AlchemyLanguageV1
alchelmyKey = 'fbce84c5734fe5e587b438cedc8ce78fa76b3293'
alchelmyApi = AlchemyLanguageV1(api_key = alchelmyKey)


titles = []
ratings = []
counter = 0
#for sourceData in data:
    #for item in sourceData['articles']:
        #res = alchelmyApi.combined(text = item['title'] + '. ' + item['description'], extract='entities,keywords,doc-emotion', sentiment=1, max_items=1)

@app.route('/headlines', methods=['GET'])
def headlines():
    resp = make_response('{"response": ''test''}')
    resp.headers['Content-Type'] = "application/json"
    return resp

if __name__ == '__main__':
    app.run()

import webbrowser
console.log("got this")
webbrowser.open('/index.html')

