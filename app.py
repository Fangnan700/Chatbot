from flask import *
import os
import openai

app = Flask(__name__)
openai.api_key = os.environ.get('OPENAI_API_KEY')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send', methods=('GET', 'POST'))
def send():
    recv = request.json
    data = recv['content']
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=data+'.',
        temperature=0.8,
        n=1,
        max_tokens=2048
    )
    return response.choices[0].text


if __name__ == '__main__':
    app.run()
