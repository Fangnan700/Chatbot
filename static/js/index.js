
let loading_frame = document.getElementById("loading_frame");
let _input = document.getElementById("input");
let response = document.getElementById("response");
let clear_btn = document.getElementById("clear_btn");
let send_btn = document.getElementById("send_btn");
let history;

response.innerText = "hi～我是Chatbot，你可以把你的问题写在下方，然后发送给我，我会尽力为你解答😆"
_input.innerText = "请把你的问题写在这里"

function send() {
    send_btn.blur();
    loading_frame.style.visibility = "visible";
    let value = _input.innerText;
    history = document.getElementById("response").innerText;
    response.innerText = history + "\n\nQ:\n\n" + value;
    let data = {"content": value};
    $.ajax({
        url: "/send",
        type: "post",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            history = document.getElementById("response").innerText;
            response.innerText = history + "\n\nA:" + result;
            loading_frame.style.visibility = "hidden";
        },
        error: function () {
            loading_frame.style.visibility = "hidden";
            response.innerText = "好像出了点问题哦，稍后再试试吧～";
        }
    })
}

function clear_input() {
    _input.innerText = "";
}

function clear_history() {
    clear_btn.blur();
    _input.innerText = "";
    response.innerText = "";
}

