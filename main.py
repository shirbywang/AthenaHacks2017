import http.client, urllib.request, urllib.parse, urllib.error, base64, sys, json

def request():
    headers = {
        # Request headers. Replace the placeholder key below with your subscription key.
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': 'eba55b501cc54c078b09860bf1c84d3e',
    }

    params = urllib.parse.urlencode({
    })

    # Replace the example URL below with the URL of the image you want to analyze.
    body = "{ 'url': 'https://i.ytimg.com/vi/G8GVWhviw8s/hqdefault.jpg' }"

    try:
        conn = http.client.HTTPSConnection('westus.api.cognitive.microsoft.com')
        conn.request("POST", "/emotion/v1.0/recognize?%s" % params, body, headers)
        response = conn.getresponse()
        data = response.read()
        json_data = json.loads(data.decode(encoding = 'utf-8'))
        return("angerry " + str(json_data[0]['scores']['anger']))
        conn.close()
    
    except Exception as e:
        print(e.args)


print(request())
