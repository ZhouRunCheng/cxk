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
		$('.startPage').fadeOut(1000)
		getCurrentQuestion()
		insertItem(currentQuestion)
	})
	
		
			var timer = setInterval(() => {
				console.log(countTime)
				$('.time').html(`${countTime}`)
				countTime--
				if(countTime == 0){
					countTime = 10
				}
			},1000)
		

	
	var getCurrentQuestion = () => {
		var newQuestion = []
		for(var i = 0;i<10;i++){
			var randomNum = parseInt(Math.random()*300);
			newQuestion.push(allQuestion[randomNum])
			currentQuestion = newQuestion
		}
		// console.log(currentQuestion)
	}
	
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
	
	var showAnswer = (e) => {
		if(e.target.dataset.index == currentQuestion[count].answer){
			$(e.target).css({backgroundColor:'turquoise'})
			score+=10
		}else{
			$(e.target).css({backgroundColor:'red'})
		}
	}
	
	var getScore = () => {
		$('.endPage').html(`
			<div class="score">你的分数是${score}</div>
		`)
	}
	
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
				// if(count = )
				if(count < 10){
					console.log(count)
					setTimeout(() => {
						nextQuestion()
					},1000)
				}else if(count == 10){
					setTimeout(() => {
						getScore();
						$('.gamePage').fadeOut(300)
					},1000)
				}
			}
			isConfirm = true;
		}
	})
})