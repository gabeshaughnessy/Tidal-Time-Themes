<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<title><?php wp_title(); ?> <?php bloginfo( 'name' ); ?></title>
<!-- Google Fonts -->
<link href='http://fonts.googleapis.com/css?family=Lato:400,700,400italic|Philosopher:700' rel='stylesheet' type='text/css'>

<link rel="profile" href="http://gmpg.org/xfn/11" />
<!-- Twitter Bootstrap -->
<link rel="stylesheet" href="<?php bloginfo( 'stylesheet_directory' ); ?>/bootstrap/css/bootstrap.min.css" type="text/css" media="screen" />
<link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>" type="text/css" media="screen" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php wp_head(); ?>
</head>

<body <?php body_class('custom'); ?>>
<div id="wrapper" class="container-fluid">
<div id="page1" class="page"><!--<div class="close_page">Close Page <span>X</span></div>-->
<div id="header" class="row-fluid">
	
	<div id="title_area" class="span7">
		<a href="<?php echo get_bloginfo('url'); ?>" title="Home"><div id="title"><h1><?php echo get_bloginfo('name'); ?></h1>
			</div></a>
			<div id="description"  class="">
			<h3><?php echo get_bloginfo('description'); ?></h3>
			</div><!--end of description -->
		</div><!--end of the title area-->
		<div id="main_nav" class="nav_menu"><?php wp_nav_menu(array('menu' => 'main_menu')); ?></div>
</div><!-- end of header row -->

	