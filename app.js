function getText(text) {
    // Get the message from the textarea and store it in a variable 'msg'.
    var msg = document.getElementById("textarea");

    // If message is empty, alert no input!
    if (msg.value == "") {
        alert("Please enter a message!");
        return false;
    };

    datetime = getDate();

    // Create a new reference to a location (folder) named messages.
    let messagesRef = firebase.database().ref("Messages");
    // Store the message and date/time of the message in the firebase.
    messagesRef.push().set({
        Message: msg.value,
        Time: datetime
    });

    // Scroll to bottom of chatbox.
    scrollToBottom();

    // Remove the text area content as the message has been stored.
    textarea.value = "";
}

function getDate() {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

    // Get the date and time of the message being sent.
    var currentDate = new Date();

    var day = currentDate.getDate();
    var monthIndex = currentDate.getMonth();
    var year = currentDate.getFullYear();

    var dateTime = day + ' ' + monthNames[monthIndex] + ' ' + year + ' @ ';
    if (currentDate.getHours() < 10) {
        dateTime = dateTime + "0" + currentDate.getHours() + ":";
    } else {
        dateTime = dateTime + currentDate.getHours() + ":";
    }

    if (currentDate.getMinutes() < 10) {
        dateTime = dateTime + "0" + currentDate.getMinutes();
    } else {
        dateTime = dateTime + currentDate.getMinutes();
    }

    return dateTime;
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

// Collect message and date/time data in real-time from firebase upon loading the page and display all messages on news feed.
$(document).ready(function() {
    var messageRef = firebase.database().ref().child("Messages");
    messageRef.on("child_added", snap => {
        var postedMessage = snap.child("Message").val();
        var time = snap.child("Time").val();
        $("#chat").append("<div id=message>"+postedMessage+"</div>");
        $("#chat").append("<br /><div id=messageTime>"+time+"</div>");
    });
});
