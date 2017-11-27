function getText(text) {
    // Get the message from the textarea and store it in a variable 'msg'.
    var msg = document.getElementById("textarea");

    // If message is empty, alert no input!
    if (msg.value == "") {
        alert("Please enter a message!");
        return false;
    };

    // Insert the string as a div message and add to the chatbox.
    create(msg.value);
    var fragment = create("<div id=message>"+msg.value+"</div>");
    document.getElementById("chat").appendChild(fragment);

    // Create a new reference to a location (folder) named messages.
    let messagesRef = firebase.database().ref("messages");
    // Create a new message in the firebase.
    messagesRef.push().set(msg.value);

    // Scroll to bottom of chatbox.
    scrollToBottom();

    // Remove the text area content as the message has been stored.
    textarea.value = "";
}

function create(htmlStr) {
    var frag = document.createDocumentFragment();
    var temp = document.createElement('div');

    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

function scrollToBottom() {
    document.getElementById("chatlog").scrollTop = document.getElementById("chatlog").scrollHeight;
}
