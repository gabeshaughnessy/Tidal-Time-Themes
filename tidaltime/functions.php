<?php 
// Twitter Bootstrap does some heavy lifting for this theme, take a look over there for Javascript functonality and any styles: http://twitter.github.com/bootstrap

// Theme Location Global variable.
define('THEMELOCATION', get_bloginfo('stylesheet_directory'), true);

// WordPress Post Thumbnail Support
if (function_exists('add_theme_support')) {
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(200, 100, true);
    add_image_size('featured', 350, 350, true);
}

//Load Required Theme Scripts
function getsome_js() {
	if (is_admin()) return;
	wp_enqueue_script('jquery');  //Get the latest version of jquery bundled with WordPress
	
	/*Twitter Bootstrap */
	wp_enqueue_script('twitter_bootstrap', THEMELOCATION .'/bootstrap/js/bootstrap.min.js', 'jquery');//The main bootstap
	//wp_enqueue_script('tool_tips', THEMELOCATION .'/scripts/tool_tips.js', 'jquery');//Add bootstrap tooltips to elements
	//wp_enqueue_script('popover', THEMELOCATION .'/scripts/popovers.js', 'jquery');//Add bootstrap tooltips to elements
	
	wp_enqueue_script('fade', THEMELOCATION . '/scripts/jquery.fade.js', 'jquery'); //The fade in script from Press75.com themes	
	}
add_action('init', 'getsome_js');//add all these awesome scripts to the init function
/* Post Formats */
add_theme_support( 'post-formats', array( 'video', 'image', 'gallery' ) );

/* Menus */
if ( function_exists( 'register_nav_menus' ) ) {
	register_nav_menus(
		array(
		  'main_menu' => 'Main Menu',
		  'footer_menu' => 'Footer Menu'
		)
	);
}

/* Sidebars */
register_sidebar(array(
  'name' => 'Primary Sidebar',
  'id' => 'primary-sidebar',
  'description' => 'Widgets in this area will be shown by default on any page with a sidebar.',
  'before_title' => '<h2>',
  'after_title' => '</h2>',
  'before_widget' => '',
  'after_widget' => ''
));

register_sidebar(array(
  'name' => 'Footer Left',
  'id' => 'footer-left-sidebar',
  'description' => 'Widgets in this area will be shown on the left side of the footer.',
  'before_title' => '<h2>',
  'after_title' => '</h2>',
  'before_widget' => '',
  'after_widget' => ''
));
register_sidebar(array(
  'name' => 'Footer Middle',
  'id' => 'footer-mid-sidebar',
  'description' => 'Widgets in this area will be shown in the middle side of the footer.',
  'before_title' => '<h2>',
  'after_title' => '</h2>',
  'before_widget' => '',
  'after_widget' => ''
));
register_sidebar(array(
  'name' => 'Footer Right',
  'id' => 'footer-right-sidebar',
  'description' => 'Widgets in this area will be shown on the right side of the footer.',
  'before_title' => '<h2>',
  'after_title' => '</h2>',
  'before_widget' => '',
  'after_widget' => ''
));



?>