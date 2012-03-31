<?php $args = array(
  'theme_location'  => 'main_menu',
  'container'       => 'div', 
  'container_class' => 'span8', 
  'container_id'    => 'main-nav',
  'echo'            => true,
  'fallback_cb'     => false,
  'items_wrap'      => '<ul class="nav nav-pills">%3$s</ul>',
  'depth'           => 0
  );
  
   
?>
<?php wp_nav_menu( $args ); ?> 
<!-- Close the Header Row -->

