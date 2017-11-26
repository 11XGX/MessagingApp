// function getText(text) {
//     console.log(text.value);
//     // Remove the text area content as the message has been stored.
//     text.value="";
// }

function getText(text) {
    // Get the message from the textarea and store it in a variable 'msg'.
    var msg = document.getElementById("textarea");
    // console.log(msg.value);
    // Insert the string as a div message and add to the chatbox.
    create(msg.value);
    var fragment = create("<div id=message>"+msg.value+"</div>");
    document.getElementById("chat").appendChild(fragment);

    // TODO: Scroll to bottom of chatbox.

    var objDiv = document.getElementById("chat");
    objDiv.scrollTop = objDiv.scrollHeight;

    // Remove the text area content as the message has been stored.
    textarea.value = "";
}

function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
