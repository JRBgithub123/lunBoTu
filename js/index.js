$(function(){
	var banner = {
		//初始化属性和方法调用
		init: function(){
			this.bannerWrapper = $('.banner-wrapper');
			this.imgWrapper = this.bannerWrapper.find('.img-wrapper');
			this.arrowL = this.bannerWrapper.find('.arrow-left');
			this.arrowR = this.bannerWrapper.find('.arrow-right');
			this.imgs = this.imgWrapper.find('img');

			//小圆圈
			this.circles = this.bannerWrapper.find('.circles-item');

			//克隆元素
			var firstImg = this.imgs.first().clone(true);
			var lastImg = this.imgs.last().clone(true);
			//在第一个位置添加最后一张图片
			this.imgWrapper.prepend(lastImg);
			//在最后一个位置放第一张图片
			this.imgWrapper.append(firstImg);

			//获取图片个数及图片的宽度
			this.imgLength = $('.img-wrapper img').length;
			this.imgWidth = firstImg.width();

			//改变imgWrapper的宽度
			this.imgWrapper.width( this.imgLength * this.imgWidth );

			//默认显示真正的第一张图片
			this.imgWrapper.css({
				marginLeft: -this.imgWidth
			});

			//imgWrapper的偏移量
			this.index = 1;

			//定时器
			this.timer = null;

			this.autoPlay();
			this.stopAuto();
			this.nextClick();
			this.prevClick();
			this.circleClick();
		},
		/*
			自动播放
			
		*/  
		autoPlay: function(){
			var that = this;
			this.timer = setInterval(function(){
				that.index++;
				that.switchImg();
			},1500);// 动画运动时间 + 等待时间
		},
		/*
			图片切换功能
			
		*/
		switchImg: function(){
			var that = this;
			this.imgWrapper.stop(true,true).animate({
				marginLeft: -that.imgWidth * that.index
			},500,function(){
				//右边界处理   最后一张图片运动完成，拉回到真正的第一张图片
				if(that.index >= that.imgLength-1){
					that.index = 1;
				}
				//左边界处理  第一张运动完成，拉回到真正的最后一张
				if(that.index <= 0){
					that.index = that.imgLength - 2;
				}

				that.imgWrapper.css({
					marginLeft: -that.imgWidth * that.index
				});

				//小圆圈的下标  0 - 5   that.index 1 - 6
				that.circles.eq(that.index-1)
					.addClass('active')
					.siblings().removeClass('active');
			});
		},
		/*
			鼠标悬停功能
			原理：当鼠标移入banner-wrapper盒子时，清除自动播放定时器timer
				  当鼠标离开banner-wrapper盒子时，重新执行自动播放
		*/
		stopAuto: function(){
			var that = this;
			$('.banner-wrapper').hover(function(){
				clearInterval(that.timer);
			},function(){
				that.autoPlay();
			});
		},
		/*
			【下一张】按钮点击功能
			原理：点击【下一张】时，改变index的值，调用switchImg即可
		*/
		nextClick: function(){
			var that = this;
			this.arrowR.click(function(){
				that.index++;
				that.switchImg();
			});
		},
		/*
			【上一张】按钮点击功能
			原理：点击【上一张】时，改变index的值，调用switchImg即可
		*/
		prevClick: function(){
			var that = this;
			this.arrowL.click(function(){
				that.index--;
				that.switchImg();
			});
		},
		//小圆圈点击
		circleClick: function(){
			var that = this;
			this.circles.click(function(){
				//获取当前小圆圈的下标0-5  ， 转化为图片下标 1 - 6
				that.index = $(this).index() + 1;
				that.switchImg();
			});
		}
	};
	banner.init();
});