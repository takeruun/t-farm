$(function(){

	setTimeout("$('#flash').fadeOut('slow')",2000);

	var post_array = [];
	var post_num   = [];
	var url;
	var now_url = location.href;

	//<li>作成
	function createFavPost(post,id_now,i){
		post_array.push(post);
		post_num.push(i);

		$('.favpost ul').append('<li value='+i+'><a><img></a></li>');
		$('.favpost').find('li').attr({
			class: 'slide'
		});

		if ($('.favpost').find('li').val() == 0){
			$('.favpost').find('li:eq(0)').addClass('active');
		}
		return post.image.thumb.url;
		
	}

	//データ取得
	if(now_url == 'http://localhost/posts' || now_url == 'https://www.t-farm.ml/posts' || now_url.indexOf('http://localhost/posts?') !== -1 || now_url.indexOf('https://www.t-farm.ml/posts?') !== -1){
		$(window).load(function(){
			var favpost_id_now = $('.favpost').data('id');
			$.ajax({
				url: '/posts',
				type: 'GET',
				data: {favpost: {id: favpost_id_now}},
				context: favpost_id_now,
				dataType: 'json'
			})
			.done(function(data){
				$.each(data, function(i,data){
					url = createFavPost(data,favpost_id_now,i);
					$('.favpost').find('img:eq('+i+')').attr({
						alt: '注目投稿',
						src: url
					});
					$('.favpost').find('a:eq('+i+')').attr({
						href: 'posts/'+data.id+''
					});
				});

			})
			.fail(function(){
				alert('error');
			})
		});
	}
	
	$('.change-btn').click(function(){
		var $changePost = $('.active');
		var slideIndex  = $('.slide').index($('.active'));
		$changePost.removeClass('active');
		
		if ($(this).hasClass('prev-btn')){
			if (slideIndex == 0){
				$('.slide').eq(post_num.length-1).addClass('active');
			}
			$changePost.prev().addClass('active');
		}else{
			if (slideIndex == post_num.length-1){
				$('.slide').eq(0).addClass('active');
			}
			$changePost.next().addClass('active');
		}
	});

	$('.form').on('change','input[type="file"]',function(e) {
		var file = e.target.files[0];
		var reader = new FileReader();

		if(file.type.indexOf("image")<0){
			return false;
		}

		reader.onload = (function(file){
			return function(e){
				$('.preview').empty();
				$('.preview').append($('<img>').attr({
					src: e.target.result,
					alt: ' '
				}));
			};
		})(file);

		reader.readAsDataURL(file);
	});

}); 