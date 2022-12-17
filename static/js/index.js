
function send() {
    document.getElementById("loading_frame").style.visibility = "visible"
    let _input = document.getElementById("_input")
    let value = _input.innerText;
    console.log("send:" + value);
    let data = {"content": value};
    $.ajax({
        url: "/send",
        type: "post",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            document.getElementById("loading_frame").style.visibility = "hidden";
            let history = document.getElementById("response").innerText;
            document.getElementById("response").innerText = history + result;
        },
        error: function () {
            document.getElementById("loading_frame").style.visibility = "hidden";
            document.getElementById("response").innerText = "好像出了点问题哦，稍后再试试吧～";
        }
    })
}


function clear_input_value() {
    document.getElementById("_input").innerText = "";
}