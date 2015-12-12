jQuery(function ($) {

    'use strict';
    $(window).ready(function() {
        $('#pre-status').fadeOut();
        $('#tt-preloader').delay(350).fadeOut('slow');
        $('.mylogo1').attr("id","main-logo1");
	    $('.mylogo2').attr("id","main-logo2");
	    $('#main-logo1').attr("src","images/club_logo.png");
	    $('#main-logo2').attr("src","images/club_logo.png");
    });
});