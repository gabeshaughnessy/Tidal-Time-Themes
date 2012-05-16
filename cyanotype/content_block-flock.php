<div id="flock_of_seagulls" class="row">
<?php

// The Query
$args = array(
	'category_name' => 'factoid'
	
);
$the_query = new WP_Query( $args );
$i = 0;
// The Loop
while ( $the_query->have_posts() ) : $the_query->the_post();
	?>
	
	
	<canvas id="bird<?php echo $i ?>" class="bird-canvas" data-offsety="<?php echo $i*10; ?>" data-offsetx="<?php echo $i*5; ?>" data-speed="<?php echo $i*.1; ?>" width="<?php echo $i+30; ?>" height="<?php echo $i+20; ?>">	<h3>Your Browser Doesn't Support the Canvas Element</h3>
	</canvas>
	<span class="factoid bird">
	<?php the_content(); ?></span>  

	<?php
	$i++;
endwhile;

// Reset Post Data
wp_reset_postdata();
?>
</div>
