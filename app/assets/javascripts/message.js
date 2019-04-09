$(document).on('turbolinks:load', function(){
  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      var html = `<div class="right-contents__chat__user" data-id="${message.id}">
                    <div class="right-contents__chat__user__name">
                      ${message.user_name}
                    </div>
                    <div class="right-contents__chat__user__date">
                      ${message.created_at}
                    </div>
                    <div class="right-contents__chat__user__comment">
                      ${message.content}
                    </div>
                    <div class="right-contents__chat__user__image">
                      <img src="${message.image.url}" class="lower-message__image" >
                    </div>
                 </div>`
    } else if (message.content) {
      var html = `<div class="right-contents__chat__user" data-id="${message.id}">
                    <div class="right-contents__chat__user__name">
                      ${message.user_name}
                    </div>
                    <div class="right-contents__chat__user__date">
                      ${message.created_at}
                    </div>
                    <div class="right-contents__chat__user__comment">
                      ${message.content}
                    </div>
                 </div>`
    } else if (message.image.url) {
      var html = `<div class="right-contents__chat__user" data-id="${message.id}">
                    <div class="right-contents__chat__user__name">
                      ${message.user_name}
                    </div>
                    <div class="right-contents__chat__user__date">
                      ${message.created_at}
                    </div>
                    <div class="right-contents__chat__user__image">
                      <img src="${message.image.url}" class="lower-message__image" >
                    </div>
                 </div>`
      };
      return html;
    };

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
    $.ajax({
      type: "POST",
      url: href,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildMessageHTML(data);
      $('.right-contents__chat').append(html);
      $('form')[0].reset();
      $('.form__submit').removeAttr('disabled');
      $('.right-contents__chat').animate({ scrollTop: $('.right-contents__chat')[0].scrollHeight});
      return false
    })
    .fail(function(){
      alert('error');
    });
  });

  function reloadMessages() {
    if ($('.right-contents')[0]) {
      var last_message_id = $('.right-contents__chat__user:last').data('id');
      console.log(last_message_id);
    }else{
      return false;
      console.log(last_message_id);
    };
    $.ajax({
      url: "api/messages",
      type: 'get',
      data: { id: last_message_id },
      dataType: 'json'
    })
    .always(function(messages){
      if (messages === {}) {
        return false;
      }else {
        $.each(messages, function(i, message){
          var html = buildMessageHTML(message);
          $('.right-contents__chat').append(html);
          $('.right-contents__chat').animate({ scrollTop: $('.right-contents__chat')[0].scrollHeight});
        });
        return false;
      };
    })
  };
  setInterval(reloadMessages, 5000);
});