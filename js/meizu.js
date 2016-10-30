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
//同时运动函数（对象，{属性:目标值,}，速度，下一运动）
function starMove(obj,json,spee,fn) {
var flag = true ;
clearInterval(obj.timer);//清理一下防止重复调用计时器
obj.timer = setInterval(function() {
for(var attr in json)
{
	//1.获取属性值
	var icur ;
	if (attr == 'opacity') {
		icur = Math.round(parseFloat(getStyle(obj,attr))*100);
	} else {
		icur = parseInt(getStyle(obj,attr));
	}
	//2.算速度
	var speed = (json[attr] - icur)/spee;
	speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
	//3.检测停止
	if (icur != json[attr]){
		flag = false ;
	}
		if (attr == 'opacity') {
		obj.style.filter = 'alpha(opacity:'+(icur+speed)+')';
		obj.style.opacity = (icur+speed)/100;
		} else {
			obj.style[attr] = icur+speed+'px';
		}
}
if(flag){
	clearInterval(obj.timer)
	if (fn) {
		fu();
	}
}
},30)
}


window.onload = function(){
	/*大广告轮播图 元素*/
  var oDiv = document.getElementById('bannerBox');//获取父元素
  var oPre = getByClass(oDiv,'pre')[0];//获取向上箭头
  var oNext = getByClass(oDiv,'next')[0];//获取向下箭头
  var oUlBig = document.getElementById('banner_box_ul');//获取ul标签
  var aBigLi = oUlBig.getElementsByTagName('li');//获取li
  var oDivSmall = getByClass(oDiv,'wrap_page')[0];//获取点点的父元素
  var aLiSmall = oDivSmall.getElementsByTagName('span');//点点的标签
	/*大广告轮播图 元素*/

	//导航
	var navList = document.getElementById('nav_list');
	var navListLi = getByClass(navList,'nav_list_li');
	console.log(navListLi);
	for (var i = 0; i < navListLi.length; i++) {
		navListLi[i].onmouseover = function () {
			var navListChildren = this.getElementsByTagName("div")[0];
			starMove(navListChildren,{opacity:100,height:250},5);
		};
		navListLi[i].onmouseout = function () {
			var navListChildren = this.getElementsByTagName("div")[0];
			starMove(navListChildren,{opacity:0,height:0},1);
		}

	};
	//竖排导航
  //轮播函数
  function tab()
  {
     for(var i=0; i<aLiSmall.length; i++)
     {
     	//清除样式
	    aLiSmall[i].className = '';
     }
     aLiSmall[now].className = 'wrap_item';
     starMove(oUlBig,{left:-(now*aBigLi[0].offsetWidth)},5);
  };
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
	  };
 };


  oPre.onclick = function()
  {
	  --now;
	  if(now == -1)
	  {
		  now = aBigLi.length;
	  }
	   tab();
  };
   oNext.onclick = function()
  {
	   ++now;
	  if(now ==aBigLi.length)
	  {
		  now = 0;
	  }
	  tab();
  };
  var timer = setInterval(oNext.onclick,3000) //滚动间隔时间设置
  oDiv.onmouseover = function()
  {
	  clearInterval(timer)
  };
   oDiv.onmouseout = function()
  {
	  timer = setInterval(oNext.onclick,3000) //滚动间隔时间设置
  };

}
