$(document).on('turbolinks:load', function(){
	var buildMessageHTML = function(message) {
		if (message.content || message.image.url) {
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
	    	$('.form__message').val('');
	    	$('.form__submit').removeAttr('disabled');
	    	$('.right-contents__chat').animate({ scrollTop: $('.right-contents__chat')[0].scrollHeight});
	    	return false
	    })
	    .fail(function(){
	    	alert('error');
	    });
	});
    function reloadMessages() {
		var last_message_id = $('.right-contents__chat__user:last').data('id');
		$.ajax({
          url: "api/messages",
          type: 'get',
          data: {id: last_message_id},
          dataType: 'json'
		})
		.done(function(messages){
			if (messages) {
			$.each(messages, function(i, message){
				var html = buildMessageHTML(message);
				$('.right-contents__chat').append(html);
			});
	    	$('.right-contents__chat').animate({ scrollTop: $('.right-contents__chat')[0].scrollHeight});
	    	return false
	        }
		})
		.fail(function(){
			alert('error');
		});
	};
	setInterval(reloadMessages, 5000);
});







