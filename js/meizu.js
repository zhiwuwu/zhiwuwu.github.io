// 获取样式
function getStyle(obj,name){
	if (obj.currentStyle) {
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
// 获取class
function getByClass(oParent,nClass) {
	// 获取Tag 
	var ele = oParent.getElementsByTagName('*');
	// 创建一个空数组
	var aRrent =[];
	//遍历所有标签
	for(var i=0;i<ele.length;i++){
		if(ele[i].className == nClass){
			aRrent.push(ele[i]);
		}
	}
	return aRrent;
}

//动作函数
function startMove(obj,att,add) {
	// 清除定时器
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		// 存储当前样式的值
		var cutt = 0 ;
		if(att == 'opacity'){
			//正常浏览器
			cutt = Math.round(parseFloat(getStyle(obj,att)));
		}else{
			// ie
			cutt = Math.round(parseInt(getStyle(obj,att)));
		}
		// 设置速度
		var speed = (add-cutt)/3;
		// 三维判断使之变成整数
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		if (cutt==add) {
			clearInterval(obj.timer)
		}else{
			if(att=='opacity'){
				obj.style.opacity = (cutt + speed)/100;
				obj.style.filter = 'alpha(opacity:'+(cutt + speed)+')';
			}else{
				obj.style[att]=cutt+speed+'px';
			}
		}
	},30)
}


window.onload = function(){
  var oDiv = document.getElementById('bannerBox');//获取父元素
  var oPre = getByClass(oDiv,'pre')[0];//获取向上箭头
  var oNext = getByClass(oDiv,'next')[0];//获取向下箭头
  var oUlBig = document.getElementById('banner_box_ul');//获取ul标签
  var aBigLi = oUlBig.getElementsByTagName('li');//获取li
  var oDivSmall = getByClass(oDiv,'wrap_page')[0];//获取点点的父元素
  var aLiSmall = oDivSmall.getElementsByTagName('span');//点点的标签
  
  //轮播函数
  function tab()
  {
     for(var i=0; i<aLiSmall.length; i++)
     {
     	//清除样式
	    aLiSmall[i].className = '';
     }
     aLiSmall[now].className = 'wrap_item';
     startMove(oUlBig,'left',-(now*aBigLi[0].offsetWidth));
  }
  //定义当前下标
  var now = 0;
  //遍历点点取出下标
  for(var i=0; i<aLiSmall.length; i++)
  {
	  aLiSmall[i].index = i;
	  //为下标添加事件
	  aLiSmall[i].onclick = function()
	  {
		  now = this.index;
		  tab();
	  }
 }


  oPre.onclick = function()
  {
	  --now;
	  if(now == -1)
	  {
		  now = aBigLi.length;
	  }
	   tab();
  }
   oNext.onclick = function()
  {
	   ++now;
	  if(now ==aBigLi.length)
	  {
		  now = 0;
	  }
	  tab();
  }
  var timer = setInterval(oNext.onclick,3000) //滚动间隔时间设置
  oDiv.onmouseover = function()
  {
	  clearInterval(timer)
  }
   oDiv.onmouseout = function()
  {
	  timer = setInterval(oNext.onclick,3000) //滚动间隔时间设置
  }

}
