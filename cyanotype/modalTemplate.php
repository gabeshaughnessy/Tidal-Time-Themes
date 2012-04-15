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
		<div class="modal-header">
		  <a class="close" data-dismiss="modal">×</a>
		  <h3><?php the_title(); ?></h3>
		</div>
		
		<article id="post-<?php the_ID();?>" class="">
					<div class="entry-content modal-body">
				<?php the_content(); ?>
			</div>
			</article>
		<div class="modal-footer">
		</div>
		<?php endwhile; ?>		
		<?php endif; // end of the loop ?>