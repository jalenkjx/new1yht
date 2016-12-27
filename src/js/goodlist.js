define(['jquery','param'],function($){
	$.ajax({
		type:"get",
		url:api+"v1/api/tasks?userId=2095",
		headers:{
			'Authorization': 'Bearer f8a1f722-f8fa-48f5-a206-e7f6186617f1'
		},
		success:function(res){
			console.log(res);
		}
	});
})
