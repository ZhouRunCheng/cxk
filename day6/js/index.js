(function(){
	var add = document.querySelector('.add input')
	var addIcon = document.querySelector('.add-icon')
	var unList = document.querySelector('.unfinish .list')
	
	//控制显示隐藏input
	addIcon.onclick = function(){
		if(add.className === "hide") {
			add.classList.remove("hide")
		}else{
			add.classList.add("hide")
		}
	}
	
	var unfinish = []
	
	//enter按键事件
	add.onkeydown = function(e){
		if(e.key == "Enter"){
			var todoitem = {
				id:unfinish.length + 1,
				content:add.value
			}
			unfinish.push(todoitem)
			var jsonU = JSON.stringify( unfinish );
			console.log(jsonU)
			add.value = "";
		}
	}
	
	var newNode = document.createElement('div')
	newNode.className = "list-item"
	newNode.innerHTML = `
		<div class="finished-item iconfont icon-dagouyouquan"></div>
		<div class="item-content">
			<input type="text" value="今晚恰烧烤" disabled="disabled">
		</div>
		<div class="delete-item iconfont icon-shanchu"></div>
	`
	unList.appendChild(newNode)
	
	
})()