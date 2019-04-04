$(document).on('turbolinks:load', function(){
	function buildHTML(message) {
		var html = `<div class="raight-contents__chat__user">
		            <div class="right-contents__chat__user__name">
                      ${message.user_name}
                    </div>

                    <div class="right-contents__chat__user__date">
                      ${message.created_at}
                    </div>

                    <div class="right-contents__chat__user__comment">
                      ${message.content}
                      <img src="${message.image}">
                    </div>
                    </div>`
        return html;
	}
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
	    	var html = buildHTML(data);
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
});