		var ismoving = false ;//使页面滚动停止监听滚轮事件
		var pageH = document.documentElement.clientHeight;//获取当前窗口高度
        var allheight=document.documentElement.scrollHeight;//获得页面总高度


		//鼠标滚动事件
		var scrollFun= function(e) {
			e = e ||window.event;
			if(ismoving){//当前页面正在滚动时停止监听滚动事件
				return;
			}else{
				if (e.wheelDelta > 0 || e.detail < 0 ) {//滚轮向上划
					var current = window.pageYOffset;
					if (current == 0) {
						return;
					}
					pageScroll(-1,current);
				}
				if (e.wheelDelta < 0 || e.detail > 0) {
					var current = window.pageYOffset;
					if (current == allheight - pageH) {
						return;
					}
					pageScroll(1,current);
				} 
			}
		}
		//重新获取窗口
		window.onresize=function(){
            pageH=document.documentElement.clientHeight;
        }
		//绑定火狐浏览器的滚轮事件
		if (document.addEventListener) {
			document.addEventListener("DOMMouseScroll",scrollFun,false);
		}
		window.onmousewheel = document.onmousewheel = scrollFun;

		//滚动页面函数
		var timer = null ;
		function pageScroll(speed,current) {
			ismoving = true;
			if (speed>0) {
				var allH = current+pageH; // 这个是目标位置
				//滚动效果定时器
				timer = setInterval(function() {
					var cur = window.pageYOffset;//执行一次重新获取当前的左上角位置
					window.scrollTo(0, cur+speed);
					//设置速度效果
					if (cur > (allH - (pageH/2))) {
						speed--;
					}else{
						speed++;
					}
					if (cur>=allH) {
						clearInterval(timer);
						window.scrollTo(0,allH);
						ismoving = false;
					}
				},15)
			}else{
				var allH = current - pageH;
				timer = setInterval(function() {
					var cur = window.pageYOffset;
					window.scrollTo(0,cur + speed);
					if (cur<(allH+(pageH/2))) {
						speed++;
					}else{
						speed--;
					}
					if (cur<= allH) {
						clearInterval(timer);
						window.scrollTo(0,allH);
						ismoving = false;
					}
				},15)
			}
		}
<<<<<<< HEAD
		//全屏动画<---分割线--->		
=======
>>>>>>> a575b19eafbaa1b16464338bafe1f82094144241
