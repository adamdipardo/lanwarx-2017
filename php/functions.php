<?php

// get config variables
require( __dir__ . '/theme-config.php' );

remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

// add_filter( 'the_content', 'wpse_wpautop_nobr' );
// add_filter( 'the_excerpt', 'wpse_wpautop_nobr' );

add_action( 'after_setup_theme', 'lanwar_setup' );
add_action( 'wp_enqueue_scripts', 'lanwar_styles' );
add_action( 'wp_enqueue_scripts', 'lanwar_scripts' );
add_action( 'wp_ajax_subscribe_email', 'lanwar_subscribe_email' );
add_action( 'wp_ajax_nopriv_subscribe_email', 'lanwar_subscribe_email' );
add_action( 'wp_footer', 'lanwar_footer' );
add_action( 'wp_ajax_contact_email', 'lanwar_contact_email' );
add_action( 'wp_ajax_nopriv_contact_email', 'lanwar_contact_email' );

// handle theme setup
function lanwar_setup() {

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

}

function lanwar_styles() {

	wp_register_style( 'lanwar_style', get_template_directory_uri() . '/style.css' );
	wp_register_style( 'bootstrap_css', get_template_directory_uri() . '/bootstrap.min.css' );
	wp_register_style( 'google_fonts', 'https://fonts.googleapis.com/css?family=Open+Sans|Press+Start+2P' );

	wp_enqueue_style( 'bootstrap_css' );
	wp_enqueue_style( 'lanwar_style' );
	wp_enqueue_style( 'google_fonts' );

}

function lanwar_scripts() {

	wp_register_script( 'fontawesome', 'https://use.fontawesome.com/ed7a107f1a.js' );
	wp_register_script( 'mobile_vh_fix', get_template_directory_uri() . '/mobile-chrome-vh-fix.js' );

	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'fontawesome' );
	wp_enqueue_script( 'mobile_vh_fix' );

}

function wpse_wpautop_nobr( $content ) {

    return wpautop( $content, false );

}

function lanwar_footer() {

	if ( is_home() || is_front_page() ) {
		wp_register_script( 'lanwar_home', get_template_directory_uri() . '/home.js' );

		$translation_array = array(
			'ajaxurl' => admin_url('admin-ajax.php')
		);

		wp_localize_script( 'lanwar_home', 'homeVars', $translation_array );

		wp_enqueue_script( 'lanwar_home' );
	}

}

function lanwar_subscribe_email() {

	$email = isset($_POST['email']) ? $_POST['email'] : null;
	$apiKey = $mailchimpKey;

	if (!trim($email) || !preg_match('/@/', $email)) {
		wp_send_json(array('error' => 'Please provide a valid email address.'), 400);
	}

	$ref = curl_init('https://us11.api.mailchimp.com/3.0/lists/2279af1d54/members/'); 
	curl_setopt($ref, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
	curl_setopt($ref, CURLOPT_POST, true);
	curl_setopt($ref, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ref, CURLOPT_POSTFIELDS, json_encode(array('apikey' => $apiKey, 'email_address' => $email, 'status' => 'subscribed')));
	curl_setopt($ref, CURLOPT_USERPWD, 'user:' . $apiKey);
	// curl_setopt($ref, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
	curl_setopt($ref, CURLOPT_SSL_VERIFYPEER, false);
	//http://bugs.php.net/bug.php?id=47030
	curl_setopt($ref, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ref, CURLOPT_FOLLOWLOCATION, true);

	$response = curl_exec($ref);
	$responseStatus = curl_getinfo($ref);

	if ($responseStatus['http_code'] == 200)
	{
		wp_send_json(array('message' => 'Sent'));
	}
	else
	{
		wp_send_json(array('error' => 'Internal server error' . var_dump($responseStatus) . var_dump($response)), 500);
	}

}

function lanwar_contact_email() {

	$email = $_POST['email'];
	$message = $_POST['message'];

	if (!isset($email) || !trim($email)) {
		wp_send_json(array('error' => 'Please provide an email.'), 400);
	}

	if (!isset($message) || !trim($message)) {
		wp_send_json(array('error' => 'Please provide a message.'), 400);
	}

	// $to = "adamdipardo@fastmail.fm";
	$to = "lanwarxcontact@gmail.com";

	$subject = "LANWAR X Contact Form";

	$headers = "From: <" . strip_tags($email) . ">\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	$htmlMessage = '<html><body>';
	$htmlMessage .= nl2br($message);
	$htmlMessage .= '</body></html>';

	if(!mail($to, $subject, $htmlMessage, $headers)) {
		wp_send_json(array('error' => 'Sorry, an error occured. Please try again later.'), 500);
	}
	else {
		wp_send_json(array('message' => 'Message sent.'));
	}

}
