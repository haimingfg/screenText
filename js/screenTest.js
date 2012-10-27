/**
 * 屏幕测试
 */

var screenTest = function(){
	this.screen 		= document.getElementsByTagName('body')[0];

	this.loopCC = function (arrColor, sec) {
		var obj = this;
		var timefunc = function(){
			color = arrColor.shift();
			if ( color ){ 
				obj.changeColor(color);
				setTimeout(timefunc, sec);
			} else {
				/*alert('ok stop');*/
			} 
		}
		setTimeout(timefunc, sec);
	};

	this.changeColor = function (colorCode){
		//var screen = document.getElementsByTagName(this.screen)[0];
		this.screen.style.backgroundColor = colorCode;
	};

	this.doGrayscale = function(startIndex){

		var scaleCount = this.getScaleCount(startIndex);
		// 获取屏幕高度
		var screenHeight = this.screenHeight();

		var screenWidth = this.screenWidth();

		// 每个阶度长度
		var scaleWidth = screenWidth / scaleCount ;
		// 循环灰阶
		var grayColor = 16 - scaleCount;
		
		for ( ; scaleCount > 0; --scaleCount ) {
			var hexColor = grayColor.toString(16);
			this.grayDIV(scaleWidth, screenHeight, hexColor + hexColor + hexColor);
			grayColor += 1;
		}

	};
	
	this.getScaleCount = function(startIndex){
		var startCC = 0 >= startIndex || startIndex > 16 ?  0 : startIndex;
		// 屏幕分割多少个阶度
		return 16 - startCC;
	};

	this.grayscale = function(startIndex) {
		var that = this;
		window.onresize = function(){
			var currentWidth = that.screenWidth() / that.getScaleCount(startIndex);
			var currentHeight = that.screenHeight();
			var kids = that.screen.childNodes.length;
			for ( var i = 0; i < kids; ++i ) {
				if ( that.screen.childNodes[i].nodeType != 3 ) {
					that.screen.childNodes[i].style.width = currentWidth + 'px';
					that.screen.childNodes[i].style.height = currentHeight + 'px';
				}
			}
		}
		window.onload = function (){
			that.doGrayscale(startIndex);
		}
	};

	this.screenHeight = function () {
		if ( typeof( window.innerHeight ) == 'number' ) {
			return window.innerHeight;
		} else {
			return document.documentElement.clientHeight;
		}	
	};

	this.screenWidth = function () {
		/*if ( typeof( window.innerWidth ) == 'number' ) {*/
		/*return window.innerWidth;*/
		/*} else {*/
		/*return document.documentElement.clientWidth;*/
		/*}*/
		return this.screen.offsetWidth || 0;
	};

	this.grayDIV = function (width, height, color) {
		var divEle = document.createElement('div');
		var style = [];
		style.push('background-color: #' + color);
		style.push('width:' + width + 'px');
		style.push('height:' + height + 'px');
		style.push('float:left;');
		style.push('color:#fff');
		divEle.setAttribute('style', style.join(';'));
		divEle.appendChild(document.createTextNode(color.toString(10)));
		/*divEle.style.backgroundColor = '#' + color.toString(16);*/
		this.screen.appendChild(divEle);
	};

	// 正方形灰阶
	this.squareGray = function (){
		//先把屏幕黑色
		this.screen.style.backgroundColor = '#000';
		var divWidth 	= this.screenWidth() / 16;
		var marginWidth = divWidth *  0.05;
		divWidth = divWidth - marginWidth;
		var divHeight 	= divWidth;
		// 循环000-255 十进制
		for(var i = 0; i < 255; ++i){
			var hexColor = i.toString(16);
			if ( 1 < hexColor.length ) {
				hexColor = hexColor + hexColor + hexColor;
			} else {
				hexColor = '0' + hexColor + '0' + hexColor + '0' + hexColor;
			}
			var divEle = document.createElement('div');
			divEle.style.backgroundColor 	= '#' + hexColor;
			divEle.style.width 		= divWidth + 'px';
			divEle.style.height		= divHeight + 'px';
			divEle.style.float		= 'left';
			divEle.style.margin		= marginWidth + 'px';
			this.screen.appendChild(divEle);
		}
	}
}
