from flask import *
import os
import openai

app = Flask(__name__)
openai.api_key = os.environ.get('OPENAI_API_KEY')


@app.route('/', methods=('GET', 'POST'))
def index():
    return render_template('index.html')


@app.route('/send', methods=('GET', 'POST'))
def send():
    recv = request.json
    data = recv['content']
    query_type = recv['query_type']
    print("请求类型：" + query_type)
    print("请求数据：" + data)

    if query_type == "txt":
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=data + '.',
            temperature=0.8,
            n=1,
            max_tokens=2048
        )
        text = response.choices[0].text
        print("响应内容：" + str(response) + "\n")
        return text

    if query_type == "img":
        response = openai.Image.create(
            prompt=data + ".",
            n=1,
            size="512x512"
        )
        image_url = response['data'][0]['url']
        print("响应内容：" + image_url + "\n")
        return image_url

    return "\n\n好像出了点问题哦，稍后再试试吧～"


if __name__ == '__main__':
    app.run()
