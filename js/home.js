/**
 * START NAV CODE
 */
jQuery('ul.nav').on('click', 'li a[href^="#"]', function(e){
	e.preventDefault();
	var target = this.hash;

	jQuery('div.nav-container').removeClass('open');

	jQuery('html, body').stop().animate({
		'scrollTop': jQuery(target).offset().top
	}, 300, 'swing', function() {
		window.location.hash = target;
	});
});
/**
 * END NAV CODE
 */

/**
 * START SLIDER CODE
 */
setInterval(function(){
	stopAnimation();
}, 34000);

setInterval(function(){
	setTimeout(function(){
		startAnimation();
	}, 1000);
}, 34000);

function startAnimation() {
	document.getElementsByClassName("slider")[0].setAttribute('data-animation', 'on');
}

function stopAnimation() {
	document.getElementsByClassName("slider")[0].setAttribute('data-animation', '');
}
/**
 * END SLIDER CODE
 */

/**
 * START EMAIL SUBSCRIBE CODE
 */
jQuery('div.email-container').on('submit', 'form', function(e){

	e.preventDefault();

	jQuery('p.error, p.success', form).remove();

	var emailField = jQuery('div.email-container input[type="email"]');
	var submitButton = jQuery('div.email-container button');
	var form = jQuery('div.email-container form');
	
	if (emailField.val().trim() == "") {
		form.append('<p class="error">Please enter an email address</p>');
	}
	else {
		submitButton.attr('disabled', 'disabled').html('Sending&hellip;');

		jQuery.ajax({
			url: homeVars.ajaxurl,
			type: 'post',
			dataType: 'json',
			data: { action: 'subscribe_email', email: emailField.val() },
			success: function() {
				submitButton.removeAttr('disabled').html('Subscribe');
				emailField.val('');
				form.append('<p class="success">Thanks! Your email has been subscribed.</p>');
			},
			error: function(xhr) {
				submitButton.removeAttr('disabled').html('Subscribe');
				var response = JSON.parse(xhr.responseText);
				form.append('<p class="error">' + response.error + '</p>');
			}
		});
	}

	return false;
});
/**
 * END EMAIL SUBSCRIBE CODE
 */

/**
 * START CONTACT FORM CODE
 */
jQuery('section#contact').on('submit', 'form', function(e){
	jQuery('p.error, p.success', form).remove();

	var emailField = jQuery('section#contact input[type="email"]');
	var submitButton = jQuery('section#contact button');
	var messageField = jQuery('section#contact textarea');
	var form = jQuery('section#contact form');
	
	if (emailField.val().trim() == "") {
		submitButton.before('<p class="error">Please enter an email address</p>');
	}
	else if (messageField.val().trim() == "") {
		submitButton.before('<p class="error">Please enter a message</p>');	
	}
	else {
		submitButton.attr('disabled', 'disabled').html('Sending&hellip;');

		jQuery.ajax({
			url: homeVars.ajaxurl,
			type: 'post',
			dataType: 'json',
			data: { action: 'contact_email', email: emailField.val(), message: messageField.val() },
			success: function() {
				submitButton.removeAttr('disabled').html('Send');
				emailField.val('');
				messageField.val('');
				form.after('<p class="success">Thanks! Your email has been sent!.</p>');
				form.remove();
			},
			error: function(xhr) {
				submitButton.removeAttr('disabled').html('Send');
				var response = JSON.parse(xhr.responseText);
				submitButton.before('<p class="error">' + response.error + '</p>');
			}
		});
	}

	return false;
});
/**
 * END CONTACT FORM CODE
 */

/**
 * START MOBILE MENU CODE
 */
jQuery('div.nav-container').on('click', 'button.nav-trigger', function(e) {
	jQuery('div.nav-container').toggleClass('open');
});

jQuery('div.nav-container').on('click', 'div.nav-screen', function(e) {
	jQuery('div.nav-container').removeClass('open');
});
/**
 * END MOBILE MENU CODE
 */

/**
 * START VH FIX CODE
 */
var vhFix = new VHChromeFix([{selector: 'section.intro', vh: 100}]);
/**
 * END VH FIX CODE
 */