(function(){
	var Ajax = {
		get: function(url,fn){
			var xhr = new XMLHttpRequest();
			xhr.open('GET',url,true);
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304){
					fn.call(this,xhr.responseText);
				}
			};
			xhr.send();
		},
		post: function (url, data, fn) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
					fn.call(this, xhr.responseText);
				}
			};
			xhr.send(data);
		}
	}
	
	var hh = document.querySelector('#citySearch')
	hh.onkeydown = (e) => {
		if(e.key == 'Enter' && hh.value != ""){
			var searchQuery = hh.value
			Ajax.get("https://free-api.heweather.net/s6/weather/now?location="+searchQuery+"&key=2bff3da5d6ea438586297093622a2958",(res) => {
				var response = JSON.parse(res)
				var currentWeather = response.HeWeather6[0].now
				showWeather(currentWeather);
			})
			Ajax.get("https://free-api.heweather.net/s6/weather/lifestyle?location="+searchQuery+"&key=2bff3da5d6ea438586297093622a2958",(res) => {
				var response = JSON.parse(res)
				var currentLifeIndex = response.HeWeather6[0].lifestyle
				showLifeIndex(currentLifeIndex);
			})
		}
	}
	
	var showWeather = function(res){
		var fl = res.fl
		var tmp = res.tmp
		var condTxt = res.cond_txt
		var imgCode = res.cond_code
		var windDir = res.wind_dir
		var newDiv = document.querySelector('.now-item')
		newDiv.innerHTML = `
			<div class="title">当前天气实况</div>
			<div class="img">
				<img src="http://cdn.heweather.com/cond_icon/${imgCode}.png" alt="">
			</div>
			<div class="textDetial">
				<div class="item">体感温度：${fl}</div>
				<div class="item">温度：${tmp}</div>
				<div class="item">天气实况：${condTxt}</div>
				<div class="item">风向：${windDir}</div>
			</div>
		`
	}
	var showLifeIndex = function(res){
		var brf = res[0].brf
		var txt = res[0].txt
		var newDiv = document.querySelector('.life-index')
		newDiv.innerHTML = `
			<div class="title">生活指数</div>
			<div class="item">舒适度：${brf}</div>
			<div class="item">建议：${txt}</div>
		`
	}
})()