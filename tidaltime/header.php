<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<title><?php wp_title(); ?> <?php bloginfo( 'name' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<!-- Twitter Bootstrap -->
<link rel="stylesheet" href="<?php bloginfo( 'stylesheet_directory' ); ?>/bootstrap/css/bootstrap.min.css" type="text/css" media="screen" />
<link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>" type="text/css" media="screen" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php wp_head(); ?>
</head>

<body <?php body_class('custom'); ?>>
<div id="wrapper" class="container-fluid">
	<div id="header" class="row">
		
		<div id="title_area" class=" pull-right span12">
		
			<div id="title" class="pull-left span8 "><h1 class="logo"><a href="<?php echo get_bloginfo('url'); ?>" title="Home"><?php echo get_bloginfo('name'); ?></a></h1>
			</div>
			<?php get_template_part('content_block', 'main_menu') ?>
						<!--<div id="description"  class="span6 offset2">
			<h3><?php echo get_bloginfo('description'); ?></h3>
			</div>-->
		</div>
		<div class="sculpture span4 pull-left"><img src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/half_mast.png" width="400px" height="auto" />
		<div class="tether"></div>
		<img class="base" src="<?php bloginfo( 'stylesheet_directory' ); ?>/images/base.png" width="400px" height="auto" />
		</div>
		
	<!--<div id="main_menu" class="navbar span12">
	<div class="navbar-inner">
	<div class="container">
	<?php wp_nav_menu(
	array( 
	'theme_location' => 'main_menu',
	'menu_class' => 'nav'
	 ) ); ?>
	 <form class="navbar-search pull-left">
	   <input type="text" class="search-query" placeholder="Search">
	 </form>
	 </div>
	 </div>
	 </div>-->
	</div><!-- end of row -->
	<div id="waves" class="row"></div>
	<div id="content" class="row">

	