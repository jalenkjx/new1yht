define(['jquery',
		'param',
		'getOpenId'
		],function($){
	//发分享页面人的openid
	var open = getUrlParam('openid');
	//发分享页面人的头像
	var open = getUrlParam('headimgurl');
	//发分享页面人的昵称
	var nickname = getUrlParam('nickname');
	//点击当前页面人的openid
	var openid = window.localStorage.getItem('openid');
	$.ajax({
		type:"get",
		//商品列表接口
		url:api+"v1/api/tasks/wxData",
		success:function(res){
			console.log(res);
			if(open==openid){
				$('.goods').css('display','block');
				$('.userInfo').css('display','none');
				$('.helphim').html('召集好友');
				$('.metoo').css('display','none');
				$('.separate').html('帮我的好友');
				
			}else{
				$('.goods').css('display','none');
				$('.userInfo').css('display','block');
				$('.metoo').css('display','block');
				$('strong','.who').html(nickname);
			}
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
			var taskid = getUrlParam('taskid');
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
			
		}
	});
})
//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null)
		return unescape(r[2]);
		return null; //返回参数值
	}