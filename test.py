
def ping(email, logtext):
	import requests
	import json
	base_url="http://localhost:3001"
	email_url = "email"

	final_url="{0}/{1}".format(base_url,email_url)

	payload = {'email': email, 'logtext': logtext}
	headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
	response = requests.post(final_url, headers=headers, data=json.dumps(payload))
	response = requests.post(final_url, data=json.dumps(payload))

ping('leonard.loo.ks@gmail.com', 'Hello!')
