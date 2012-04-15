</div><!--end of page 1 -->
<div id="footer" class="row">
	<ul id="footer_left" class="span4">
	<?php dynamic_sidebar( 'Footer Left' ); ?>
	</ul>
	<ul id="footer_middle" class="span4">
	<?php dynamic_sidebar( 'Footer Middle' ); ?>
	</ul>
	<ul id="footer_right" class="span4">
	<?php dynamic_sidebar( 'Footer Right' ); ?>
	</ul>
	
		
	<?php wp_footer(); ?>
	</div>

</div><!-- end of the wrapper -->
<div id="modal" class="modal hide fade">
<div class="modal-header">
  <a class="close" data-dismiss="modal">×</a>
  
</div>

<article id="post-<?php the_ID();?>" class="">
			<div class="entry-content modal-body">
		<h4>Loading...</h4>
	</div>
	</article>
<div class="modal-footer">
</div>
</div><!--empty modal to fill with page content -->
</body>
</html>