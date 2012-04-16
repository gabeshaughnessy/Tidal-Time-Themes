<div id="factoids" class="row">
	<?php
	
	// The Query
	$args = array(
		'category_name' => 'factoid'
	);
	$the_query = new WP_Query( $args );
	
	// The Loop
	while ( $the_query->have_posts() ) : $the_query->the_post();
		?>
		
		<span class="factoid">
		
		<?php the_content(); ?></span>
	
		<?php
	endwhile;
	
	// Reset Post Data
	wp_reset_postdata();
	?>
</div>
