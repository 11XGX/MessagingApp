function submission(text) {
    // Get the message from the textarea and store it in a variable 'msg'.
    var msg = document.getElementById("textarea");

    // If message is empty, there is no inputted message!
    if (!$.trim($("#textarea").val())) {
        alert("Please enter a message!");
        return false;
    };

    datetime = getDate();

    // Create a new reference to a location (folder) named messages.
    let messagesRef = firebase.database().ref("Messages");
    // Store the message and date/time of the message in the firebase.
    messagesRef.push().set({
        Message: msg.value,
        Time: datetime,
        Vote: 0
    });

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

    // Adjust for an hour value less than 10 and pad a 0 to the left of the number.
    if (currentDate.getHours() < 10) {
        dateTime = dateTime + "0" + currentDate.getHours() + ":";
    } else {
        dateTime = dateTime + currentDate.getHours() + ":";
    }

    // Adjust for a minute value less than 10 and pad a 0 to the left of the number.
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
        var votecount = snap.child("Vote").val();
        $("#chat").append("<div id=message>" + postedMessage + "</div>");
        $("#chat").append("<div class=upvote><img src='Images/upvote.png' alt='Upvote Back'><img src='Images/upvote_hover.png' class='img-top' alt='Upvote Front'></div>");
        $("#chat").append("<div id=votecount>"+votecount+"</div>");
        $("#chat").append("<div class=downvote><img src='Images/downvote.png' alt='Downvote Back'><img src='Images/downvote_hover.png' class='img-top' alt='Downvote Front'></div>");
        $("#chat").append("<br /><div id=messageTime>" + time + "</div><br />");
        scrollToBottom();
    });
});

function enterSubmission(event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    if (code == 13) {
        submission(textarea);
        event.preventDefault();
    }
}

$('#textarea').keydown(function(e) {
    if (e.keyCode == 13 && e.ctrlKey) {
        $(this).val(function(i,val){
            return val + "\n";
        });
    }
});
