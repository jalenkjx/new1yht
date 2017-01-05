define(['jquery','param'],function($){
	var code = getUrlParam('code');
	console.log(code);
	
	//获取ip
	var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
    $.getJSON(url, function (data) {
       window.localStorage.setItem('ip',data.Ip);
    });
	var ip = window.localStorage.getItem('ip');
	
	//判断是安卓还是ios
	var client_id;
	var client_secret;
    var u = navigator.userAgent;
    //console.log(u);
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	//console.log(isiOS);
	if(isAndroid){
		client_id = '302a7d556175264c7e5b326827497349';
		client_secret = '4770414c283a20347c7b553650425773';
	}else{
		client_id = '5e572e694e4d61763b567059273a4d3d';
		client_secret = '316457735c4055642744596b302e2151';
	}
	
	//用code获取openid
	
	$.ajax({
		type:'get',
		url: api+'v1/api/weixin/getOpenId?code='+code,
		async: false,
		success:function(res){
			//console.log(res);
			var datas = res.datas;
			var headimgurl = datas.headimgurl;
			var openid = datas.openid;
			var nickname = datas.nickname;
//			window.localStorage.setItem('headimgurl',headimgurl);
//			window.localStorage.setItem('openid',openid);
//			window.localStorage.setItem('nickname',nickname);
//			topen = window.localStorage.getItem('openid');
//			theadurl = window.localStorage.getItem('headimgurl');
//			tnick = window.localStorage.getItem('nickname');
			var topen = openid;
			var theadurl = headimgurl;
			var tnick = nickname;
			
			//发分享页面人的openid
			console.log(param());
			var open = param().openid;
			//发分享页面人的头像
			var headurl = param().headimgurl;
			//发分享页面人的昵称
			var urlnickname =param().nickname;
			//点击当前页面人的openid
			
			
			
			//获取url taskid 和goodid
			var t_id =  param().taskid;
			var g_id = param().goodid;
			$.ajax({
				type:"get",
				//商品列表接口
				url:api+"v1/api/tasks/wxData",
				async: false,
				success:function(res){
					//console.log(res);
					
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
					if(open==topen||open==null){
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
						
						$('strong','.who').html(urlnickname);
						$('.icon').html('<img src="'+headurl+'"/>')
					}
					
					
					
					$('li','.goods').on('click',function(){
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
						$('.who').html('“'+tnick+'”想要的1元海淘商品');
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
						var headimg = '<img src="'+theadurl+'"/>';
						$('.icon').html(headimg);
						
						//读取taskid 和goodid
						dbtaskid = window.localStorage.getItem('taskid');
						dbgoodid = window.localStorage.getItem('goodid');
						
						//获取帮助的参数；
						helpParam = JSON.stringify(
						{"wxTask":{
							"openId": topen,
							"nickname": tnick,
							"headimgurl": theadurl,
							"tOpendId": topen,
							"tNickname": tnick,
							"tHeadimgurl": theadurl,
							"taskId":dbtaskid,
							"goodsId":dbgoodid 
							}
						});
						console.log(helpParam);
						help();
						
						
						var encodenick = tnick; 
						var goodname = window.localStorage.getItem('goodName');
						var goodprice = window.localStorage.getItem('goodPrice');
						
						//分享数据
						obj = {
							    title: '快！真真海淘全球好货1元抢！进口面膜、MK迪奥包包等海外真品1元包邮到家…',
							    desc: '我正在参与真真海淘“1元海淘”活动，价值'+goodprice+'元的'+goodname+'支付1元即可领取，快来一起参加吧！',

							    //分享链接
							    link: api+"v1/api/weixin/getCode?redirectUrl=http://service.myzhenzhen.com/mobile/wx_test/wx_1yht/wx1yht.html?"+
							    "openid="+topen+"$headimgurl="+theadurl+"$nickname="+encodenick+"$taskid="+dbtaskid+"$goodid="+dbgoodid+"=",
							    //分享的图片
							    imgUrl: "http://og20zwqwb.bkt.clouddn.com/wx1yhthbg.png",
							    success: function() {
							    	//分享成功的回调 b函数
							   	}
							};
						wx.ready(function() {
				                wx.onMenuShareAppMessage(obj);
	
				                wx.onMenuShareTimeline(obj);
				        });	
					
					});
					
					$('.helphim01').on('click',function(){
						$('.sharemask').css('display','block');
					});
					$('.sharemask').on('click',function(){
						$(this).css('display','none');
					});
					
					$('.metoo').on('click',function(){
						window.location.href = api+'v1/api/weixin/getCode?redirectUrl=http://service.myzhenzhen.com/mobile/wx_test/wx_1yht/wx1yht.html';
					});
					$('.receive').on('click',function(){
						$('.alert_help').css('display','block');
						$('.phoneCheck').css('display','block');
					})
					//获取手机验证码
					monitor($('#getCheckCode'));
					$('#getCheckCode').on('click',function(){
						if($('#phone').val()==''){
							alert('请输入正确的手机号');
						}else{
							countDown($('#getCheckCode'), getCode);
							function getCode(){
								$.ajax({
									type:"post",
									url:api+'v1/api/verifycode/quickSend',
									async:false,
									data:{
										phoneNumber:$('#phone').val()
									},
									success:function(res){
										console.log(res);
									}
								});
							}
							
						}
						
					})
					//获取accesstoken
					$('#check').on('click',function(){
						if($('#getCheckCode').val()==''){
							alert('请输入验证码');
						}else{
							$.ajax({
								url:api+'oauth/token',
								data:{
									"username":'phoneCode##86##'+$('#phone').val()+'##'+ip,
									"password":$('#yanzheng').val(),
									"grant_type":"password",
									"client_id":client_id,
									"client_secret":client_secret,
								},
								headers:{
									"Content-Type":"application/x-www-form-urlencoded"
								},
								type:'post',
								async:false,
								error:function(res){
									console.log(res);
									//var err = JSON.parse(res.responseJSON.error_description);
									//console.log(err);
									console.log(res.status);
									var status = res.status;
									if(status == 401){
										alert('验证码错误，请重新输入');
									}
								},
								success:function(res){
									token = res.access_token;
									$.ajax({
										url:api+'v1/api/wxTasks/finish',
										type:'post',
										headers:{
											'Authorization': 'Bearer '+token
										},
										data:{
											'openId':topen,
											'taskId':dbtaskid,
											'goodsId':dbgoodid
										},
										success:function(res){
											console.log(res);
											if(res.res_code==200){
												$('.check_succ').css('display','block').siblings('div').css('display','none');
												
											}
											if(res.res_code==209003){
												alert('您已经领取过此商品');
					
											}
											if(res.res_code==209002){
												alert('您的任务还没有完成，请完成后再来领取');
											}
												
										}
											
											
										
									})
								}
							})		
						}
					})
					var submitParam = JSON.stringify(
						{"wxTask":{
									"openId": open,
									"nickname": urlnickname,
									"headimgurl": headurl,
									"tOpendId": topen,
									"tNickname": tnick,
									"tHeadimgurl": theadurl,
									"taskId":t_id,
									"goodsId":g_id,
									"actId":1235
									}
						});
						
						console.log(submitParam);
					$('.helphim').on('click',function(){
						$.ajax({
							url:api+"v1/api/wxTasks/add",
							type:'post',
							async:false,
							headers:{
								'Content-Type': 'application/json'
							},
							data:submitParam,
							success:function(res){
								console.log(res);
								//帮助提交成功 弹出提示
								if(res.res_code==200){
									$('.alert_help').css('display','block');
									$('.succ_help').css('display','block').siblings('div').css('display','none');
									
									$('#coupon').val(res.datas.actCode);
								}
								if(res.res_code==209000){
									alert('您已经帮助过ta了');
								}
								if(res.res_code==209001 ){
									alert('帮助名额已满');
								}
							}
						})
					})
					
					
					//获取taskid拼接;
					
					if(t_id){
						$.each(data,function(i){
							if(t_id==data[i].taskId){
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
					
					//微信用户进入帮助页面接口
					if(open && (open != topen)){
						helpParam = JSON.stringify(
						{"wxTask":{
									"openId": open,
									"nickname": urlnickname,
									"headimgurl": headurl,
									"tOpendId": topen,
									"tNickname": tnick,
									"tHeadimgurl": theadurl,
									"taskId":t_id,
									"goodsId":g_id 
									}
						});
						help();
						console.log(helpParam);
					}
					//帮助接口
					function help(){
						$.ajax({
							type:"post",
							async: false,
							url:api+"v1/api/wxTasks/getData",
							data:helpParam,
							headers:{
								'Content-Type': 'application/json'
							},
							success:function(res){
								console.log(res);
								var resd = res.datas;
								$('.help').children('span').eq(0).html(resd.hasCount);
								$('.help').children('span').eq(1).html(resd.leftCount);
								if(resd.leftCount == 0){
									
									if(open==null||open==topen){
										$('.receive').css('display','block');
									}

									$('.helphim01').css('display','none');
								}
								var htm = '';
								$.each(resd.myOpenIds, function(i) {
									if(i<13){
										 htm += '<li><img src="'+resd.myOpenIds[i].tHeadimgurl+'"/></li>';
										
									}else if(i==13){
										 htm += '<li>...</li>';
										
									}
									
								});
								$('.helpheadimg').append(htm);
								
							}
						});
					}
					
					//获取分享授权
					$.ajax({
						type:"post",
						url:api+"v1/api/weixin/getSignature",
						async: false,
						data:{
							urlStr: window.location.href.replace(/#.*/g,"")
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
							
							wx.config({
								debug: false,
								appId: resp.appId,
								timestamp: resp.timestamp,
								nonceStr: resp.noncestr,
								signature: resp.signature,
								jsApiList: apilist
							});
							
						}
					});
				}
			});
		}
	})
});
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
         param[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
      }
   }
   return param;     
}
	function monitor(obj) {
	    var LocalDelay = getLocalDelay();
	    var timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
	    if (timeLine > LocalDelay.delay) {
	        console.log("过期");
	    } else {
	        _delay = LocalDelay.delay - timeLine;
	        obj.text(_delay).addClass("btn-disabled");
	        var timer = setInterval(function() {
	            if (_delay > 1) {
	                _delay--;
	                obj.text(_delay);
	                setLocalDelay(_delay);
	            } else {
	                clearInterval(timer);
	                obj.text("获取验证码").removeClass("btn-disabled");
	            }
	        }, 1000);
	    }
	};
	
	//倒计时效果
	/**
	 *
	 * @param {Object} obj 获取验证码按钮
	 * @param {Function} callback  获取验证码接口函数
	 */
	function countDown(obj, callback) {
	    if (obj.html() == "获取验证码") {
	        var _delay = 60;
	        var delay = _delay;
	        obj.text(_delay).addClass("btn-disabled");
	        var timer = setInterval(function() {
	            if (delay > 1) {
	                delay--;
	                obj.text(delay);
	                setLocalDelay(delay);
	            } else {
	                clearInterval(timer);
	                obj.html("获取验证码").removeClass("btn-disabled");
	            }
	        }, 1000);
	
	        callback();
	    } else {
	        return false;
	    }
	}
	
	//设置setLocalDelay
	function setLocalDelay(delay) {
	    //location.href作为页面的唯一标识，可能一个项目中会有很多页面需要获取验证码。
	    localStorage.setItem("delay_" + location.href, delay);
	    localStorage.setItem("time_" + location.href, new Date().getTime());
	}
	
	//getLocalDelay()
	function getLocalDelay() {
	    var LocalDelay = {};
	    LocalDelay.delay = localStorage.getItem("delay_" + location.href);
	    LocalDelay.time = localStorage.getItem("time_" + location.href);
	    return LocalDelay;
	}
