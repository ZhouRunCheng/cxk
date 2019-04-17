(function(){
	var add = document.querySelector('.add input')
	var addIcon = document.querySelector('.add-icon')
	var unList = document.querySelector('.unfinish .list')
	var itemInput = document.querySelectorAll('.item-content input')
	
	var getLocalUnfinishList = () => {
		var a = localStorage.getItem("unfinishList")
		var getLocal = JSON.parse(a)
		
		unList.innerHTML = ""
		if(getLocal != null){
			for(var i = 0;i<getLocal.length;i++){
				var newNode = document.createElement('div')
				newNode.className = "list-item"
				newNode.innerHTML = `
					<div class="finished-item iconfont icon-dagouyouquan"></div>
					<div class="item-content">
						<input type="text" value="${getLocal[i].content}" disabled="disabled" index="1">
					</div>
					<span class="delete-item iconfont icon-shanchu"></span>
				`
				unList.appendChild(newNode)
				var itemIndex = newNode.parentElement.children.length
				// console.log(newNode.parentElement.children.length)
				newNode.setAttribute("index",itemIndex)
				// console.log(newNode)
				
				//删除
				newNode.onclick = function(e){
					if(e.path[0].nodeName == "SPAN"){
						var i = e.path[1].getAttribute("index") - 1
						var a = localStorage.getItem("unfinishList")
						var unfinish = JSON.parse(a)
						unfinish.splice(i,1)
						var jsonU = JSON.stringify( unfinish );
						localStorage.unfinishList = jsonU;
						getLocalUnfinishList()
						// console.log(e.path[2].children[i])
					}
				}
			}
		}
	}
	
	getLocalUnfinishList()
	
	//控制显示隐藏input
	addIcon.onclick = function(){
		if(add.className === "hide") {
			add.classList.remove("hide")
		}else{
			add.classList.add("hide")
		}
	}
	
	var unfinish
	if(localStorage.unfinishList == undefined){
		unfinish = []
	}else{
		var a = localStorage.getItem("unfinishList")
		var unfinish = JSON.parse(a)
	}
	//enter按键事件
	add.onkeydown = function(e){
		if(e.key == "Enter" && add.value != ""){
			var todoitem = {
				content:add.value,
				done:false
			}
			var a = localStorage.getItem("unfinishList")
			var unfinish = JSON.parse(a)
			unfinish.push(todoitem)
			// console.log(unfinish)
			var jsonU = JSON.stringify( unfinish );
			localStorage.unfinishList = jsonU;
			
			getLocalUnfinishList();
			add.value = "";
		}
	}
})()