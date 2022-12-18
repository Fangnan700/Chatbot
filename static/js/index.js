let loading_frame = document.getElementById("loading_frame");
let _input = document.getElementById("input");
let response = document.getElementById("response");
let clear_btn = document.getElementById("clear_btn");
let send_btn = document.getElementById("send_btn");
let mode_txt = document.getElementById("txt_mode");
let mode_img = document.getElementById("img_mode");
let query_type = "txt";
let history;


response.innerHTML = "hi～我是Chatbot，你可以把你的问题写在下方，然后发送给我，我会尽力为你解答😆"
_input.innerText = "请把你的问题写在这里，按回车键或点击右下方按钮发送。"

_input.onkeydown = function (event) {
    if(event.code === "Enter") {
        send();
    }
}

function send() {
    send_btn.blur();
    loading_frame.style.visibility = "visible";
    let value = _input.innerText;
    let data = {"content": value, "query_type": query_type};
    _input.innerText = "";
    _input.blur();
    history = document.getElementById("response").innerHTML;
    response.innerHTML = history + "<br><br>Q:<br><br>" + value;
    response.scrollTop = response.scrollHeight;

    $.ajax({
        url: "/send",
        type: "post",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            history = document.getElementById("response").innerHTML;

            if(query_type === "txt") {
                response.innerHTML = history + "<br><br>A:" + "<br><br>" + "<pre>" + result + "</pre>";
            }
            if(query_type === "img") {
                response.innerHTML = history + "<br><br>A:" + "<br><br>右键或长按可以查看大图和保存哦😄<br><br><img src='" + result + "' alt='null' width='260px' height='260px'>";
            }

            response.scrollTop = response.scrollHeight;
            loading_frame.style.visibility = "hidden";
        },
        error: function () {
            loading_frame.style.visibility = "hidden";
            response.innerText = "好像出了点问题哦，稍后再试试吧～";
        }
    })
}

function choose_txt_mode() {
    mode_img.checked = false;
    query_type = "txt"
}

function choose_img_mode() {
    mode_txt.checked = false;
    query_type = "img"
}

function clear_input() {
    _input.innerText = "";
}

function clear_history() {
    clear_btn.blur();
    _input.innerText = "请把你的问题写在这里，按回车键或点击右下方按钮发送。"
    response.innerHTML = "hi～我是Chatbot，你可以把你的问题写在下方，然后发送给我，我会尽力为你解答😆";
}

