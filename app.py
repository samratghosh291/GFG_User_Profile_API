from flask import Flask, render_template, jsonify
from flask_caching import Cache
import requests
from bs4 import BeautifulSoup
import json

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


@app.route('/user/<username>')
@cache.cached(timeout=3600)  # Cache the response for 1 hour (3600 seconds)
def user_info(username):
    url = f'https://www.geeksforgeeks.org/user/{username}/'
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        script_tag = soup.find('script', {'id': '__NEXT_DATA__'})
        if script_tag:
            json_data = script_tag.string.strip()
            user_data = json.loads(json_data)['props']['pageProps']['userInfo']
            print(user_data)
            profile_image_url = user_data['profile_image_url']

            return render_template('index.html', user_data=user_data)

    return 'User not found or error occurred', 404


@app.route('/')
def index():
    return {"message":"hello! home🏠"}


if __name__ == '__main__':
    app.run(debug=True)

