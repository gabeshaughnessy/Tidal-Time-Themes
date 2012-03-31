
	
	
	<div id="main" class="pull-right span12">
	<div class="pull-left span8">
			 <!-- Start the Loop. -->
			 <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			 
			 
			 <!-- The following tests if the current post is in category 3. -->
			 <!-- If it is, the div box is given the CSS class "post-cat-three". -->
			 <!-- Otherwise, the div box will be given the CSS class "post". -->
			  <div class="content">
			
			
			 <?php
			 if ( has_post_format( 'video') ) {
			 }
			 else {
			 if ( has_post_format( 'image' ) ) {
			 
			  if ( has_post_thumbnail() ) {
			    the_post_thumbnail('large');
			  } 
			  }
			 
			  ?>
			 <!-- Display the Title as a link to the Post's permalink. -->
			 <h2 class="entry_title"><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
			<?php } ?>
			
			
			 <!-- Display the Post's Content in a div box. -->
			 <div class="entry">
			   <?php the_content(); ?>
			 </div>
			
			 </div>
			 <!-- Stop The Loop (but note the "else:" - see next line). -->
			 <?php endwhile; else: ?>
			
			 <!-- The very first "if" tested to see if there were any Posts to -->
			 <!-- display.  This "else" part tells what do if there weren't any. -->
			 <p>These are not the droids you're looking for.</p>
			
			 <!-- REALLY stop The Loop. -->
			 <?php endif; ?>
			
				 
		 <!--<ul id="sidebar" class="">
		
		    <?php dynamic_sidebar( 'Primary' ); ?>
		 
		 </ul>-->
	</div>			 
</div>
