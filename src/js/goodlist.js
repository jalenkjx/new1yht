//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null)
	return unescape(r[2]);
	return null; //返回参数值
}
function param() {
   var url = location.search; 
   var param = new Object();
   if (url.indexOf("?") != -1){
      var str = url.substr(1);
      strs = str.split("$");
      for(var i = 0; i < strs.length; i ++) {
         param[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
   }
   return param;     
}

define(['jquery',
		'param',
		'getOpenId',
		'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
		],function($){
	//发分享页面人的openid
	var open = param().openid;
	//发分享页面人的头像
	var headurl = param().headimgurl;
	//发分享页面人的昵称
	var nickname = param().nickname;
	//点击当前页面人的openid
	var openid = window.localStorage.getItem('openid');
	
	var code = getUrlParam('code');
	var state = getUrlParam('state');
	$.ajax({
		type:"get",
		//商品列表接口
		url:api+"v1/api/tasks/wxData",
		success:function(res){
			console.log(res);
			
			var data = res.datas;
			$.each(data, function(i) {
				var html = 	'<li data-id="'+data[i].goodsId+'" data-task="'+data[i].taskId+'">'+
								'<div class="imgbox"><img src ="'+imgLink+data[i].goods.goodsImages[2].imgName+'"/></div>'+
								'<div class="info">'+
									'<p class="name">'+data[i].goods.name+'</p>'+
									'<div class="other">'+
										'<div class="price">￥<strong>'+data[i].goods.actualPrice+'</strong></div>'+
										'<div class="share">需邀请<span>'+data[i].condition+'</span>位好友</div>'+
										'<button>立即参与</button>'
									'</div>'+
								'</div>'+
							'</li>';
				$('.goods').append(html);
			});
			
			if(open==openid||open==null){
				//本人查看
				$('.goods').css('display','block');
				$('.userInfo').css('display','none');
				$('.helphim').css('display','none');
				$('.helphim01').css('display','block');
				$('.metoo').css('display','none');
				$('.separate').html('帮我的好友');
				
			}else {
				//帮助的好友查看
				$('.helphim01').css('display','none');
				$('.goods').css('display','none');
				$('.userInfo').css('display','block');
				$('.metoo').css('display','block');
				$('strong','.who').html(nickname);
			}
			
			
			
			$('li').on('click',function(){
				var goodid = $(this).attr('data-id');
				
				var taskid = $(this).attr('data-task');

				var imgsrc = $('.imgbox',$(this)).children('img').attr('src');

				var goodName = $('.name',$(this)).html();

				var goodPrice = $('.price',$(this)).children('strong').html();
				
				var condition = $('.share',$(this)).children('span').html();
				//存储商品id 图片 名称 条件
				
				window.localStorage.setItem('goodid',goodid);
				window.localStorage.setItem('taskid',taskid);
				window.localStorage.setItem('imgsrc',imgsrc);
				window.localStorage.setItem('goodName',goodName);
				window.localStorage.setItem('goodPrice',goodPrice);
				window.localStorage.setItem('condition',condition);
				//读取头像
				var headicon = window.localStorage.getItem('headimgurl');
				//读取昵称
				var nick = window.localStorage.getItem('nickname');
				$('.who').html('“'+nick+'”想要的1元海淘商品');
				$(this).parent().css('display','none');
				$('.userInfo').css('display','block');
				var html = 	'<div class="imgbox"><img src="'+imgsrc+'" alt="" /></div>'+
							'<div class="info">'+
								'<p class="name">'+goodName+'</p>'+
								'<div class="other">'+
									'<div class="price">￥<strong>'+goodPrice+'</strong></div>'+
								'</div>'+
							'</div>';
				$('.goodDetail_info').html(html);
				var headimg = '<img src="'+headicon+'"/>';
				$('.icon').html(headimg);
			});
			//获取taskid拼接;
			var taskid = param('taskid').taskid;
			if(taskid){
				$.each(data,function(i){
					if(taskid==data[i].taskId){
						//console.log(i);
						var html  =	'<div class="imgbox"><img src="'+imgLink+data[i].goods.goodsImages[2].imgName+'" alt="" /></div>'+
									'<div class="info">'+
										'<p class="name">'+data[i].goods.name+'</p>'+
										'<div class="other">'+
											'<div class="price">￥<strong>'+data[i].goods.actualPrice+'</strong></div>'+
										'</div>'+
									'</div>';
						$('.goodDetail_info').html(html);
					}
				})
			}
			//读取openid headimgurl nickname
			var topen = window.localStorage.getItem('openid');
			var theadurl = window.localStorage.getItem('headimgurl');
			var tnick = window.localStorage.getItem('nickname');
			//获取url taskid 和goodid
			var t_id =  param().taskid;
			var g_id = param().goodid;
			//微信用户进入帮助页面接口
			if(open){
				var helpParam = JSON.stringify(
				{"wxTask":{
							"openId": open,
							"nickname": nickname,
							"headimgurl": headurl,
							"tOpendId": topen,
							"tNickname": tnick,
							"tHeadimgurl": theadurl,
							"taskId":t_id,
							"goodsId":g_id 
							}
				});
			}
			
			console.log(helpParam);
//			$.ajax({
//				type:"post",
//				url:api+"v1/api/wxTasks/getData",
//				data:{
//					
//				},
//				header:{
//					'Content-Type': 'application/json'
//				},
//				success:function(res){
//					//console.log(res);
//				}
//			});
			//获取分享授权
			$.ajax({
				type:"post",
				url:api+"v1/api/weixin/getSignature",
				//url:"http://192.168.199.106:8081/zzht-web/v1/api/weixin/getSignature",
				data:{
					urlStr:'http://service.myzhenzhen.com/mobile/wx_test/wx_1yht/wx1yht.html?code='+code+'&state='+state
				},
				header:{
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success:function(res){
					var resp = res.datas;
					console.log(resp); 
					 var apilist=[
						'onMenuShareTimeline',
			            'onMenuShareAppMessage',
			            'onMenuShareQQ',
			            'onMenuShareWeibo',
					];
					//分享内容；
					var obj = {
					    title: '微信1元海淘',
					    desc: '1元海淘的内容',
					    //分享链接
					    link: "http://service.myzhenzhen.com/html/channel_jrtt_03.html",
					    //分享的图片
					    imgUrl: "http://og20zwqwb.bkt.clouddn.com/wx1yhthbg.png",
					    success: function() {
					    	//分享成功的回调函数
					   	}
					};
					wx.config({
						debug: true,
						appId: resp.appId,
						timestamp: resp.timestamp,
						nonceStr: resp.noncestr,
						signature: resp.signature,
						jsApiList: apilist
					});
					wx.ready(function() {
							alert('123');
							
			                wx.onMenuShareAppMessage(obj);

			                wx.onMenuShareTimeline(obj);
			        });
				}
			});
		}
	});
	
})
