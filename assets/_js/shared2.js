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
				$('#lightSlider').lightSlider({
					gallery: true,
					item: 1,
					loop: true,
					slideMargin: 0,
					thumbItem: 9
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