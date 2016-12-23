var winWidth = window.innerWidth;
	var fontSize = winWidth/750*100;
	var html = document.documentElement;
	html.style.fontSize = fontSize + "px";
	window.onresize = function(){
		var winWidth = window.innerWidth;
		var fontSize = winWidth/750*100;
		var html = document.documentElement;
		html.style.fontSize = fontSize + "px";
	}
require(['jquery'],function($){
	$('.userInfo').on('click',function(){
		$(this).css('display','none');
		$('.goods').css('display','block');
	})
	$('.goods').on('click',function(){
		$(this).css('display','none');
		$('.userInfo').css('display','block');
	});
})
