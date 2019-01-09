$(document).ready(function () {

	var $body = $('body'),
			$window = $(window),
			$footer = $('footer'),
			$header = $('header');

	$('.adb_slider').slick({
		// dots: true,
		// arrows: false,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
	});

	// dialog plugin
	$.fn.dialog = function() {
		var $this = $(this),
		$dialogWrapper = $('.dialog_wrapper'),
		$dialog = $('.dialog'),
		$dialogBg = $('.dialog_bg'),
		$dialogClose = $('.dialog_close'),
		wPosSet = $window.scrollTop(),
		wPosGet = $body.attr('data-scroll');
		$dialogWrapper.show();
		$dialogBg.show();
		$this.show();
		$body.addClass('dialog_opened');
		$body.css('top', - wPosSet+'px');
		$body.attr('data-scroll', wPosSet);
		if ($this.height() > $dialogWrapper.height()) {	$body.addClass('dialog_scrollable'); } else { $body.addClass('dialog_scrollable'); }
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { $body.addClass('dialog_scrollable_mobile'); }
		$dialogClose.on('click', function() {
			$dialog.hide();
			$dialogBg.hide();
			$dialogWrapper.hide();
			$body.removeClass('dialog_opened', 'dialog_scrollable_mobile');
			$window.scrollTop(wPosSet);
		});
	};


	$(document).keydown(function(e) {
		if (e.keyCode == 27) {
			$('.dialog_close').trigger('click');
		}
	});

	// open mobile navigation
	$('.navigation_btn').on('click', function () {
		$(this).toggleClass('isOpen');
		$('.navigation').toggleClass('nav-opened');
		$('.dark_overlay').toggleClass('nav-opened');
	});

	$('.dark_overlay').click(function() {
		$(this).removeClass('nav-opened');
		$('.navigation').removeClass('nav-opened');
		$('.navigation_btn').removeClass('isOpen');
	});




	// open dialog
	$('.btn').on('click', function (e) {
		e.preventDefault();
		$('.modal').dialog();
	});

});