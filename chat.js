$(document).ready(function() {
  cometApi.start({node:"app.comet-server.ru", dev_id:15 });

  // Load chat messages from local storage
  if (localStorage.getItem('chatMessages')) {
    var messages = JSON.parse(localStorage.getItem('chatMessages'));
    for (var i = 0; i < messages.length; i++) {
      $('#web_chat').append('<b>' + HtmlEncode(messages[i].name) + '</b>');
      $('#web_chat').append('<pre>' + HtmlEncode(messages[i].text) + '</pre>');
      $('#web_chat').append('<br>');
    }
  }

  cometApi.subscription("simplechat.newMessage", function(event) {
    $('#web_chat').append('<b>' + HtmlEncode(event.data.name) + '</b>');
    $('#web_chat').append('<pre>' + HtmlEncode(event.data.text) + '</pre>');
    $('#web_chat').append('<br>');

    // Store chat messages to local storage
    var messages = [];
    if (localStorage.getItem('chatMessages')) {
      messages = JSON.parse(localStorage.getItem('chatMessages'));
    }
    messages.push(event.data);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  });
});

function HtmlEncode(s){
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
}

function send(){
  var name = $('#name').val();
  var text = $('#text').val();
  
  $.ajax({
    url: "https://comet-server.com/doc/CppComet/chat-example/chat.php",
    type: "POST", 
    data: "text=" + encodeURIComponent(text) + "&name=" + encodeURIComponent(name)
  });
}

// added code to scroll to bottom every 0.1 seconds
setInterval(function() {
  window.scrollTo(0, document.body.scrollHeight);
}, 100);
