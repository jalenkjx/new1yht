define(['jquery','param'],function($){
	var code = getUrlParam('code');
	console.log(code);
	$.ajax({
		type:'get',
		url: api+'v1/api/weixin/getOpenId?code='+code,
		success:function(res){
			console.log(res);
			var data = res.datas;
			var headimgurl = data.headimgurl;
			var openid = data.openid;
			var nickname = data.nickname;
			window.localStorage.setItem('headimgurl',headimgurl);
			window.localStorage.setItem('openid',openid);
			window.localStorage.setItem('nickname',nickname);
			//window.location.href = './wx1yht.html?headimgurl='+headimgurl+'&openid='+openid+'&nickname='+nickname;
			//$.get('./wx1yht.html?headimgurl='+headimgurl+'&openid='+openid+'&nickname='+nickname,{},function(){})
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


