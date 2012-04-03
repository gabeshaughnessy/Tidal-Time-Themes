<?php
/*
Template Name: Modal
*/
?>
<?php
/**
 * The Loop
 *
 */ 
if ( have_posts() ) :  while( have_posts() ) : the_post(); ?>
		<article id="post-<?php the_ID();?>" class="">
		<div class="modal-header">
		  <a class="close" data-dismiss="modal">×</a>
		  <h3><?php the_title(); ?></h3>
		</div>
			<div class="entry-content modal-body">
				<?php the_content(); ?>
			</div>
			<div class="modal-footer">
			</div>
		</article>
		
		<?php endwhile; ?>		
		<?php endif; // end of the loop ?>