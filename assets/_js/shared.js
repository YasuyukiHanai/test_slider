;(function($) {

	function object(o) {
		var f = object.f, i, len, n, prop;
		f.prototype = o;
		n = new f;
		for (i=1, len=arguments.length; i<len; ++i){
			for (prop in arguments[i]) {
				n[prop] = arguments[i][prop];
			}
		}
		return n;
	};
	object.f = function(){};


	$.extend({

		//スマホ用画像切替
		changeSPimages : function(){
			var _spimg = $(".spImg");
			var imgSrc = _spimg.attr('src');
			var sp = '_sp.';
			var pc = '_pc.';
			_spimg.each(function(){
				var $this = $(this);
				function imgSize(){
					var WWidth = parseInt($(window).width());
					if(WWidth > 630) {
						$this.attr('src',$this.attr('src').replace(sp, pc));
					} else if(WWidth <= 629) {
						$this.attr('src',$this.attr('src').replace(pc, sp));
					}
				}
				imgSize();
			});
		},

		//PCのみのボタン画像切り替え
		rollOverPC : function(){
			var WWidth = parseInt($(window).width());
			var UA = navigator.userAgent;
			if(WWidth <= 629 || (UA.indexOf('iPhone') > 0 && UA.indexOf('iPad') == -1) || UA.indexOf('Android') > 0){
				return false; //スマホ
			}else{
				$(".js-hover-pc").not("[src*='_ov']").each(function(){
					var $this = $(this);
					var $that = $this.find('img');
					var imgSrc = $that.attr('src');
					var imgOver = $that.attr('src').replace(/^(.+)(\.[a-z]+)$/, "$1_ov$2");
					$(this).hover(
						function (){
							$that.attr('src',$that.attr('src').replace(imgSrc, imgOver));
						},
						function (){
							$that.attr('src',$that.attr('src').replace(imgOver, imgSrc));
						}
					);
				});
			}
		},

		//スライダー
		productSlider : function(){
			//まずindexの時に限定
			if($(document.body).hasClass("index")){

			var	thumb = '.index .thumb a',
				thumbImg = '.index .thumb img',
				sliderWindow = '.index .sliderWrWr',
				slidersliderWr = '.index .sliderWrWr .sliderWr',
				sliderFigure = '.index .sliderWrWr .figureElm';
				sliderFigureWr = '.index .sliderWrWr .figureWr',
				sliderFigureWrWr = '.index .sliderWrWr .figureWrWr',
				sliderImg = '.index .sliderWrWr img',
				sliderFigCaption = '.index .sliderWrWr .figcaption',
				sliderPrev = '.index .sliderWrWr .prev',
				sliderNext = '.index .sliderWrWr .next',
				slidertimer = '.index .sliderWrWr .controlNav__btn-timerBtn',
				sliderPhotoNum = '.index .indicator .photoNum',
				sliderDelete = '.index .sliderWr .delete',
				isAutoPlay = true,
				loop_time = 5000;

			// 1)img要素の情報を取得して出力
			$(thumbImg).each(function(i) {
				var photo = $(this).attr('src'),
					text = $(this).attr('alt'),
					link = $(this).attr('data'),
					i = i+1,
					figureElm = '<li class="no'+i+' figureElm"><a href="/amazake/products.html#products0'+i+'"><img src="'+photo+'" width="100%"><p class="figcaption">'+text+'</p></a></li>';
				$(sliderFigureWr).append(figureElm);
			});
			$(sliderFigure).eq(-2).add($(sliderFigure).last()).prependTo(sliderFigureWr);// 最後から2つ要素を先頭に移動


			// ***コントールナビデザイン
			function controlNavDesign() {
				var figureClassName = $(sliderFigure).first().next().attr('class'),
					figureNum = $(sliderFigure).length;
					for(var i=0;i<figureNum;i++){
						$("<span></span>").appendTo(controlNav)
							//clickfunction!!
							.click(function (e) {
							e.preventDefault();
							var figureClassName = $(sliderFigure).first().next().attr('class'),
								figureNum = parseInt(figureClassName.slice(2,4))+1,
								span = controlNav.find('span'),
								indexNum = span.index(this)+1;
								//console.log('figureNum:'+figureNum+'___ indexNum:'+indexNum);

							if($(this).hasClass('current')) {
								return false;

							// *ナビボタン*別処理*処理後元に戻す操作
							}else if(indexNum > figureNum) {
								var moveLeft = ((sliderFigureWidth)*(indexNum-figureNum))+sliderFigureWidth;
								var clickThumb = indexNum-4;
								$(sliderFigureWr).not(':animated').animate(
									{marginLeft:-+moveLeft+'px'},200,'linear',
									function(){
											prevFigure = $(sliderFigureWr).find('.no'+clickThumb),
											movingFigures = $(prevFigure).nextAll();
										$(movingFigures).prependTo(sliderFigureWr);
										$(sliderFigure).first().appendTo(sliderFigureWr);
										$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+'px');
										photoNum();
									}
								);
							}else if(indexNum <= figureNum) {
								if(indexNum === 1 && figureNum > 1) {
									var moveLeft = ((sliderFigureWidth)*(figureNum-1))+sliderFigureWidth;
									$(sliderFigure).last().prependTo(sliderFigureWr);
									$(sliderFigureWr).css('margin-left', -moveLeft);
									$(sliderFigureWr).not(':animated').animate(
										{marginLeft:0+'px'},200,'linear',
										function(){
											prevFigure = $(sliderFigureWr).find('.no1'),
											movingFigures = $(prevFigure).nextAll();
											$(movingFigures).prependTo(sliderFigureWr);
											$(sliderFigure).eq(-3).add($(sliderFigure).eq(-2)).add($(sliderFigure).last()).prependTo(sliderFigureWr);
											$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+'px');

											photoNum();
										});

								}else{
									var moveLeft = ((sliderFigureWidth)*(figureNum-1-indexNum))+sliderFigureWidth;
									var clickThumb = indexNum-1;
									if(figureNum==12){
										moveLeft = sliderFigureWidth;
									};
									$(sliderFigureWr).css('margin-left', -moveLeft);
									$(sliderFigureWr).not(':animated').animate(
										{marginLeft:0+'px'},200,'linear',
										function(){
											prevFigure = $(sliderFigureWr).find('.no'+clickThumb),
											movingFigures = $(prevFigure).nextAll();
											$(movingFigures).prependTo(sliderFigureWr);
											$(sliderFigure).eq(-2).add($(sliderFigure).last()).prependTo(sliderFigureWr);
											$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+'px');
											photoNum();
										}
									);
								};
							}else if(indexNum === 1 && figureNum == 1) {
								return false;
							}
						});
					}
			};
			// 2)インジケーターの数字出力
			function photoNum() {
				var figureClassName = $(sliderFigure).first().next().next().attr('class'),
					figureNum = parseInt(figureClassName.slice(2,4)),
					flg = true;
				$(sliderPhotoNum).text(figureNum);
				controlNav = $(slidersliderWr).find($('.controlNav'));
				controlNav.find('span').add($(sliderFigure)).removeClass('current');
				controlNav.find('span').eq(figureNum-1).addClass('current');
				$(sliderFigure).eq(figureNum-1).addClass('current');
				if(flg) {
					$(sliderFigure).removeClass('current').eq(2).addClass('current');
					flg = false;
				}
			};
			photoNum();
			controlNavDesign();


			// 3)ロードファンクでサイズ取る
			$(window).load(function() {
				$(sliderWindow).css('display','block');

				function sliderWindowFigure(){// モーダルウィンドウ画像幅の取得と出力
					sliderFigureWidth = $(sliderFigure).width();// グローバル変数→CSSのサイズ取る

					$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+'px');//ネガティブマージンで写真1つ分左にずらす
					$(sliderFigure).css('width',sliderFigureWidth);
				};
				sliderWindowFigure();
				$(window).resize(function(){
					sliderWindowFigure();
					//console.log(sliderFigureWidth);
				});

				photoNum();// インジケーターの数字出力

			});

			// 4)一定時間ごとにimageMove
			var loopSwitch = setInterval(loop, loop_time);
			function loop() {
				$(sliderFigureWr).not(':animated').animate({
					marginLeft:-+sliderFigureWidth*2+'px'
					},200,'linear',
					function(){
						$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+'px');
						$(sliderFigure).first().appendTo(sliderFigureWr);
						photoNum();
					}
				);
			};
			// *+4)タイマー設置
			$(slidertimer).click(function(e){
				e.preventDefault();
				if(isAutoPlay){
					$(slidertimer).removeClass("is-play").addClass("is-stop");
					isAutoPlay = false;
					clearInterval(loopSwitch);
				}else{
					$(slidertimer).addClass("is-play").removeClass("is-stop");
					isAutoPlay = true;
					clearInterval(loopSwitch);
					checkTimer();
				}
			});
			function checkTimer(){
				if(isAutoPlay){
					loopSwitch = setInterval(loop, loop_time);
				}
			}

			// 5)左右ボタンでスライド
			$(sliderPrev).bind('click',function(e){//左ボタンで右スライド
				$(sliderFigureWr).not(':animated').animate({
					marginLeft:0+'px'
					},200,'linear',
					function(){
						$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+'px');
						$(sliderFigure).last().prependTo(sliderFigureWr);
						photoNum();
						clearInterval(loopSwitch);
						checkTimer();
					}
				);
				e.preventDefault();
			});
			$(sliderNext).bind('click',function(e){//右ボタンで左スライド
				$(sliderFigureWr).not(':animated').animate({
					marginLeft:-+sliderFigureWidth*2+'px'
					},200,'linear',
					function(){
						$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+'px');
						$(sliderFigure).first().appendTo(sliderFigureWr);
						photoNum();
						clearInterval(loopSwitch);
						checkTimer();
					}
				);
				e.preventDefault();
			});

			// 6)スワイプでスライド
			var startX,
				endX,
				diffX,
				absX;
			$(sliderFigureWrWr).bind('touchstart', function() {
				startX = event.changedTouches[0].pageX;
				imgHalfWidth = Math.round(sliderFigureWidth/2);
				clearInterval(loopSwitch);
			});
			$(sliderFigureWrWr).bind('touchmove', function(e) {
				endX = event.changedTouches[0].pageX;
				diffX = Math.round(startX - endX);// 差分
				absX = Math.abs(diffX);// 絶対値
				if (diffX > 0) {// 左スワイプで左に追従
					$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+-+absX+'px');
				} else if (diffX < 0) {// 右スワイプで右に追従
					$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+absX+'px');
				};
				e.preventDefault();
			});
			$(sliderFigureWrWr).bind('touchend', function() {
				if (absX > imgHalfWidth) {//スライド距離が半分以上
					if (diffX > 0) {// 左スワイプで左スライド
						$(sliderFigureWr).not(':animated').animate(
							{marginLeft:-+sliderFigureWidth*2+'px'},200,'linear',
							function(){
								$(sliderFigure).first().appendTo(sliderFigureWr);
								$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+'px');
								photoNum();
							}
						);
					} else if (diffX < 0) {// 右スワイプで右スライド
						$(sliderFigureWr).not(':animated').animate(
							{marginLeft:0+'px'},200,'linear',
							function(){
								$(sliderFigure).last().prependTo(sliderFigureWr);
								$(sliderFigureWr).css('margin-left',-+sliderFigureWidth+'px');
								photoNum();
							}
						);
					};
				}else if(absX < imgHalfWidth){//スライド距離が半分未満
					$(sliderFigureWr).animate({marginLeft: -+sliderFigureWidth+'px'},200,'linear')
				};
				checkTimer();
			});
		};
	},


	});


	$(function(){
		$.changeSPimages();
		$.rollOverPC();
		$.productSlider();

//----------------------------------------
//タブレットのviewport設定を調整
//----------------------------------------
		var _ua = navigator.userAgent;
		var istablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(_ua.toLowerCase()));
		if(istablet){
			$('head').append('<meta name="viewport" content="width=1024" />');
		};

//----------------------------------------
//リサイズ時
//----------------------------------------
		$(window).resize(function () {
			if($(window).width() > 630){
				$.changeSPimages();
				$(".headerArea__localNav__list").show();
				$(".headerArea__spMenuArea").removeClass('seleced');
				return false;
			}
			if($(window).width() <= 630 && !$(".headerArea__spMenuArea").hasClass('seleced')){
				$("header").css("left", "");
				$(".headerArea__localNav__list").css('right', -$(window).width());
			}
			if (resizeTimer !== false) {
				clearTimeout(resizeTimer);
			}
			resizeTimer = setTimeout(function() {
				$.changeSPimages();
			}, 10);

		});


	});
})(jQuery);