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
require(['jquery',
		'param',
		'goodlist',
		//'getOpenId'
		],function($){
//	if($('.mask').css('display')=='block'){
//		console.log($('.mask').css('display'));
//		document.addEventListener('touchmove', function (event) {
//	        event.preventDefault();
//		})
//	}else{
//		console.log($('.mask').css('display'));
//	}
//	
	$('.download').on('click',function(e){
		window.location.href = 'http://dwz.cn/3JaeDJ';
	})
	
	$('.close').on('click',function(){
		$('.mask').css('display','none');
		$('.alert_help').css('display','none');
	})
	
})
