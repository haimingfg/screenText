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
		var startCC = startIndex ? startIndex : 0;
		// 屏幕分割多少个阶度
		var scaleCount = 16 - startCC;

		// 获取屏幕高度
		var screenHeight = this.screenHeight();

		var screenWidth = this.screenWidth();

		// 每个阶度长度
		var scaleWidth = screenWidth / scaleCount ;
		// 循环灰阶
		var grayColor = startCC;
		
		for ( ; scaleCount > 0; --scaleCount ) {
			var hexColor = grayColor.toString(16);
			this.grayDIV(scaleWidth, screenHeight, hexColor + hexColor + hexColor);
			grayColor += 1;
		}

	};
	this.grayscale = function(startIndex) {
		var that = this;
		window.onresize = function(){
			while(that.screen.hasChildNodes()){
				that.screen.removeChild(that.screen.lastChild);
			}
			that.doGrayscale(startIndex);
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
		divEle.appendChild(document.createTextNode(color));
		/*divEle.style.backgroundColor = '#' + color.toString(16);*/
		this.screen.appendChild(divEle);
	};
}
