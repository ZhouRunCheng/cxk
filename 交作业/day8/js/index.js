$(function(){
	
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
			alert("加载题库失败!")
		}
	});
	
	$('.startBtn').click(()=>{
		$('.startPage').fadeOut(500)
		getCurrentQuestion()
		insertItem(currentQuestion)
		timer();
	})
	
	var timer = () => {
		setInterval(() => {
			$('.time').html(`<div class="remainder-time">剩余时间: ${countTime}</div>
											 <div class="remainder-question">剩余题目: ${10-count}</div>`)
			countTime--
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
					getScore()
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
		$('.endPage').html(`
			<div class="score">你的分数是${score}</div>
		`);
		$('.gamePage').fadeOut(300)
	}
	
	
	//获得下一问题
	var nextQuestion = () => {
		$('.question').html("");
		$('.answer').html("");
		insertItem(currentQuestion);
		isConfirm = false;
	}
	
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
					},1000)
				}
			}
			isConfirm = true;
		}
	})
	
	
})