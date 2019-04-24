$(function(){
	
	console.log(`
说明:
这是一个答题游戏:
点击“开始游戏”进行十道题的考验,每题都有10秒的时间限制.答对一题获得十分,答错不得分.
点击“查看最高分”可以查看历史答题分数的最高分

这个程序基本的答题功能是比较简单的,但是要加十秒一题的显示就有点复杂.首先我把每个可以封装的方法都封装了起来,这样方便我随时按需调用,较为灵活.
我的是思路是用一个间隔函数做一个计时器方法,然后在每一题的开始调用这个计时器方法,在计时器里面添加判断,如果过时则重置时间,然后调用渲染下一题的方法,
如果点击答案了,也会重置时间,继续计时,如果十道题答完了,就清除这个间隔函数.
另外这个“查看最高分”我是存到了localStorage中的,存的时候会有重复值,但是我只要取最高分就行了,重复不重复我不管（懒）......

我这个方法可能比较蠢,步骤繁杂,也有很多BUG,但是具体的功能实现了就好了啊,老板也不会看你代码是不是（老陈教的"ヽ(ー_ー)ノ"）.
`)
	
	var allQuestion = []
	var currentQuestion = []
	var count = 0
	var countTime = 10
	var isConfirm = false
	var score = 0
	
	
	$.ajax('',{
		url: 'js/dati.json',
		success:function(data){
			allQuestion = data
		},
		error:function(xhr,type,errorThrown){
			alert("加载题库失败!请检查文件有无缺失或者使用Hbuilder运行！")
		}
	});
	
	$('.startBtn').click(()=>{
		$('.startPage').fadeOut(500)
		$('.lookPage').fadeOut(500)
		getCurrentQuestion()
		insertItem(currentQuestion)
		timer();
	})
	
	$('.lookBtn').click(()=>{
		$('.startPage').fadeOut(500)
		var a = localStorage.getItem("rankList");
		rankList = JSON.parse(a);
		var maxscore = parseInt(Math.max.apply(null, rankList));
		var achievement
		if(maxscore < 50) achievement = "丢人";
		else if(maxscore >= 50 && maxscore < 80) achievement = "还行";
		else achievement = "王者";
		$('.rank-list').html(`
														<div>历史最高分 :<span> ${maxscore}</span></div>
														<div>获得成就 : <span> ${achievement}</span></div>
												`)
		$('.lookPage').fadeIn(500)
	})
	
	//计数器
	var timer = () => {
		var timers = setInterval(() => {
			$('.time').html(`
												<div class="remainder-time">剩余时间: <span>${countTime}</span></div>
												<div class="remainder-question">剩余题目: <span>${10-count}</span></div>
												<div class="remainder-score">目前分数: <span>${score}</span></div>
										 `)
			countTime--
			// console.log(countTime)
			$('.answer').on('click',(e) => {
				if(e.target.className == "item"){
					countTime = 10
				}
			})
			if(countTime == 0){
				countTime = 10
				count++;
				if(count < 10)
					nextQuestion()
				else{
					//停止循环
					clearInterval(timers);
					getScore();
				}
			}
		},1000)
	}
		
	//获取十个题目
	var getCurrentQuestion = () => {
		var newQuestion = []
		for(var i = 0;i<10;i++){
			var randomNum = parseInt(Math.random()*300);
			newQuestion.push(allQuestion[randomNum])
			currentQuestion = newQuestion
		}
	}
	
	
	//渲染题目和答案
	var insertItem = (data) => {
		$('.question').html(`
				${data[count].quiz}
		`)
		for(var i = 0;i<data[count].options.length;i++){
			$('.answer').append(`
														<button class="item" data-index="${i+1}">${data[count].options[i]}</button>
												`)
		}
	}
	
	//显示点击的答案
	var showAnswer = (e) => {
		if(e.target.dataset.index == currentQuestion[count].answer){
			$(e.target).css({backgroundColor:'turquoise'})
			score+=10
		}else{
			$(e.target).css({backgroundColor:'red'})
		}
	}
	
	
	//显示分数
	var getScore = () => {
		var achievement
		if(score < 50) achievement = "丢人";
		else if(score >= 50 && score < 80) achievement = "还行";
		else achievement = "王者";
		$('.endPage').html(`
												<div class="get-score">你的分数是: <span class="score-num">${score}</span></div>
												<div class="get-achievement">获得成就: <span class="score-achi">${achievement}</span></div>
												<button type="button" class="back-index">返回</button>
											`);
		$('.gamePage').fadeOut(300)
	}
	
	//存储分数
	var saveScore = () => {
		var rankList
		if(localStorage.rankList == undefined){
			rankList = []
		}else{
			var a = localStorage.getItem("rankList");
			rankList = JSON.parse(a);
		}
		rankList.push(score);
		var jsonU = JSON.stringify( rankList );
		localStorage.rankList = jsonU;		
	}
	
	//获得下一问题
	var nextQuestion = () => {
		$('.question').html("");
		$('.answer').html("");
		insertItem(currentQuestion);
		isConfirm = false;
	}
	
	//返回主页
	$('.back-index').click(() => {
		window.location.reload()
	})
	$('.endPage').click((e) => {
		if(e.target.nodeName == "BUTTON")
			window.location.reload()
	})
	
	$('.answer').click((e) => {
		if(e.target.className == "item"){
			if(!isConfirm){
				showAnswer(e)
				count++;
				if(count < 10){
					setTimeout(() => {
						nextQuestion()
					},1000)
				}else if(count == 10){
					setTimeout(() => {
						getScore();
						saveScore();
					},1000)
				}
			}
			isConfirm = true;
		}
	})
	
	
})