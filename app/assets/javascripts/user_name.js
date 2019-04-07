$(document).on('turbolinks:load',function(){
	function buildHTML(user) {
	var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</div>
                </div>`
                return html;
            }
    function appendUser(userId, userName) {
	var html = `<div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                  <input name='group[user_ids][]' type='hidden' value="${userId}"">
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
                return html
            }

	$('#user-search-field').on('keyup', function(){
		var input = $(this).val();

	    $.ajax({
			type: 'GET',
			url: '/users',
			data: { keyword: input },
			dataType: 'json'
		})
		.done(function(users){
			$('#user-search-result').empty();

			if (users.length !== 0 && input.length !== 0) {
				users.forEach(function(user) {
					var html = buildHTML(user);
					var currentUserId = $('.chat-group-user').attr("id");
			        $('#user-search-result').append(html);
			        var appendUserId = $('.user-search-add').attr("data-user-id");
			        if (currentUserId === appendUserId ) {
                       $('#user-search-result').empty();
			        }
		        });
			}
		})
		.fail(function(){
			alert('ユーザー検索に失敗しました');
		});
	});

	$(document).on('click', ".user-search-add", function(e){
		e.preventDefault();
		var userId = $(this).attr("data-user-id");
		var userName = $(this).attr("data-user-name");
    	$('#user-search-result').empty();
    	var html = appendUser(userId, userName);
    	$('#chat-group-users').append(html);
    	});

    $(document).on('click', ".user-search-remove", function(e){
    	e.preventDefault();
    	$(this).parent().empty();
    });
});






