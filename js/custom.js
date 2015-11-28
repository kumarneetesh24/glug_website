// JavaScript Document

'use strict';

$(document).ready(function(e) {
	$('#main-menu-button, #main-menu-close').click(function(e) {
		e.preventDefault();

		if($('#main-menu-container').hasClass('slide-in')) {
			$('#main-menu-container').removeClass('slide-in');
			$('#content').removeClass('slide-right');
		}
		else {
			$('#main-menu-container').addClass('slide-in');
			$('#content').addClass('slide-right');
		}
		
		//head
		$('#header-static').toggleClass('slide-up');
		
		//in case content width changes on menu slide, some plugins should be refreshed
		/*isotopeEl.isotope('layout');
		$('.owl-carousel').each(function(index, element) {
			var owl = $(this).data('owlCarousel');
			owl.destroy();
        });
		runCarousels();*/
    });
	
	runMainSlider();
	runCarousels();
	checkMainMenuHeight();
	checkHeaderScroll();
	googleMap();
	
	$('.scroll-to').click(function(e) {
		e.preventDefault();
		$.scrollTo($(this).attr('href'), 800, {axis:'y'});
	});
	
	$('#rss-subscribe').submit(function(e) {
		return form_to_ajax_request($(this), ['email'], ['email']);
	});
	
	$('#contact-form').submit(function(e) {
		return form_to_ajax_request($(this), ['email', 'name', 'subject', 'message'], ['email', 'name', 'subject', 'message']);
	});
	
	$('.onscroll-animate').each(function(index, element) {
		$(this).one('inview', function (event, visible) {
			var el = $(this);
			if(el.hasClass('graph'))
				var anim = "graph-anim";
			else
				var anim = (el.data("animation") !== undefined) ? el.data("animation") : "fadeIn";
			var delay = (el.data("delay") !== undefined ) ? el.data("delay") : 200;
				
			setTimeout(function() {
				el.addClass(anim);
				if(el.hasClass('graph'))
					el.children('.graph-value').countTo();
			}, delay);
		});
	});
		
	$(window).resize(function(e) {
        checkMainMenuHeight();
    });
	
	$(document).on( 'scroll', function(){
		checkHeaderScroll();
	});
	
	function checkMainMenuHeight() {
		if($(window).height() < 700)
			$('.main-menu').addClass('scroll');
		else
			$('.main-menu').removeClass('scroll');
	}
	
	function checkHeaderScroll() {
		var offset = $('#head').height() - 80;
		$('#header-static').removeClass('after-scroll');
		if($(window).scrollTop() > offset) {
			$('#header-static').addClass('after-scroll');
		}
	}
	
	function runCarousels() {
		$('#slider-testimonial').owlCarousel({
			singleItem: true,
		});
		
		$('#slider-blog-posts').owlCarousel({
			items: 3,
		});
		
		$('#team-slider').owlCarousel({
			singleItem: true,
			navigation: true,
			pagination: false,
			navigationText: false,
		});
		
		$('.full-slider').each(function(index, element) {
            $(this).owlCarousel({
				singleItem: true,
				navigation: true,
				navigationText: false,
			});
        });
		
		$('.post-images-slider').each(function(index, element) {
            $(this).owlCarousel({
				singleItem: true,
				navigation: true,
				navigationText: false,
			});	
        });
	};
	
	function runMainSlider() {
		if(typeof MasterSlider != 'function')
			return;
		var slider = new MasterSlider();
	    slider.setup('masterslider' , {
	    	width:1920,    // slider standard width
	        height:1200,   // slider standard height
			view:'basic',
			layout:'fullscreen',
			speed:20
	    });
		slider.control('bullets', {autohide:false});
	}
	
	
	/* Google Map */
	function googleMap() {
		var map;
		var myLatlng = new google.maps.LatLng(23.547933, 87.292376);
		function mapInitialize() {
			var mapOptions = {
				scrollwheel: false,
				zoom: 15,
				center: myLatlng
			};
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map
			});
		}
		google.maps.event.addDomListener(window, 'load', mapInitialize);
	}
});

$(window).load(function(e) {
	$('.parallax-background').each(function(index, element) {
		if(!$(this).attr("data-stellar-background-ratio"))
        	$(this).attr('data-stellar-background-ratio', 0.4);
    });
	
    $.stellar({
		horizontalScrolling: false,
		responsive: true,
	});
	
	var isotopeEl = $('#works').isotope({
		itemSelector: '.work',
		layoutMode: 'fitRows'
	});
	
	$('.isotope-filter').click(function(e) {
		e.preventDefault();
		$(this).parent('.filter-list').children('.filter-active').removeClass('filter-active');
		$(this).addClass('filter-active');
		isotopeEl.isotope({ filter: $(this).data('filter') });
	});
});


<!-- Youtube video player - add API -->
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player1;
var player2;
var player3;
function onYouTubePlayerAPIReady() {
	// create the global player from the specific iframe (#video1)
	player1 = new YT.Player('video-main', {
		events: {
      		// call this function when player is ready to use
      		'onReady': onPlayer1Ready
    	}
  	});
	player2 = new YT.Player('video-pc', {
		events: {
      		// call this function when player is ready to use
      		'onReady': onPlayer2Ready
    	}
  	});
	player3 = new YT.Player('video2', {
		events: {
      		// call this function when player is ready to use
      		'onReady': onPlayer3Ready
    	}
  	});
}

function onPlayer1Ready(event) {
  	// bind events
  	$("#video-play-button").click(function(e) {
		e.preventDefault();
		$('#video-main').addClass('active');
    	player1.playVideo();
    });
}
function onPlayer2Ready(event) {
  	// bind events
  	$("#video-pc-container").click(function(e) {
		e.preventDefault();
		$(this).find('.video-pc').addClass('show');
    	player2.playVideo();
    });
}
function onPlayer3Ready(event) {
  	// bind events
  	$(".post-image-video-btn").click(function(e) {
		e.preventDefault();
		player3.parents('.image-replacement').addClass('show');
    	player3.playVideo();
    });
}


/*	
  create ajax request from form element and his fields
  messages: set as form "data" attribut - "[field name]-not-set-msg", "all-fields-required-msg", "ajax-fail-msg", "success-msg"
  form must have attributes "method" and "action" set
  "return message" and "ajax loader" are also managed - see functions below
  
  @param form_el - form element
  @param all_fields - array of names of all fields in the form element that will be send
  @param required_fields - array of names of all fields in the form element that must be set - cannot be empty
*/
function form_to_ajax_request(form_el, all_fields, required_fields) {
	var fields_values = [];
	var error = false;
	
	//get values from fields
	$.each(all_fields, function(index, value) {
		fields_values[value] = form_el.find('*[name=' + value + ']').val();
	});
	
	//check if required fields are set
	$.each(required_fields, function(index, value) {
		if(!isSet(fields_values[value])) {
			var message = form_el.data(value + '-not-set-msg');
			if(!isSet(message))
				message = form_el.data('all-fields-required-msg');
			setReturnMessage(form_el, message);
			showReturnMessage(form_el);
			error = true;
			return;
		}
	});
	if(error)
		return false;
	
	//form data query object for ajax request
	var data_query = {};
	$.each(all_fields, function(index, value) {
		data_query[value] = fields_values[value];
	});
	data_query['ajax'] = true;

	//show ajax loader
	showLoader(form_el);
	
	//send the request
	$.ajax({
		type: form_el.attr('method'),
		url: form_el.attr('action'),
		data: data_query,
		cache: false,
		dataType: "text"
	})
	.fail(function() {		//request failed
		setReturnMessage(form_el, form_el.data('ajax-fail-msg'));
		showReturnMessage(form_el);
	})
	.done(function(message) {		//request succeeded
		if(!isSet(message)) {
			clearForm(form_el);
			setReturnMessage(form_el, form_el.data('success-msg'));
			showReturnMessage(form_el);
		}
		else {
			setReturnMessage(form_el, message);
			showReturnMessage(form_el);
		}
	});
	
	//hide ajax loader
	hideLoader(form_el);
	
	return false;
}

function isSet(variable) {
	if(variable == "" || typeof(variable) == 'undefined')
		return false;
	return true;
}

function clearForm(form_el) {
	form_el.find('input[type=text]').val('');
	form_el.find('input[type=checkbox]').prop('checked', false);
	form_el.find('textarea').val('');
}

function showLoader(form_el) {
	form_el.find('.ajax-loader').fadeIn('fast');
}

function hideLoader(form_el) {
	form_el.find('.ajax-loader').fadeOut('fast');
}
	
function setReturnMessage(form_el, content) {
	if(!isSet(content))
		content = "Unspecified message.";
	form_el.find('.return-msg').html(content);
}

function showReturnMessage(form_el) {
	form_el.find('.return-msg').addClass('show-return-msg');
}

$('.return-msg').click(function(e) {
	$(this).removeClass('show-return-msg').html('&nbsp;');
});
