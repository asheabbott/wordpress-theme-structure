<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title><?php bloginfo('name'); ?></title>
    
	<!-- social metas -->
	<meta property="og:title" content="<?php echo get_the_title(); ?>">
	<meta property="og:type" content="website">
	<meta property="og:image" content="<?php echo get_the_post_thumbnail_url(); ?>">
	<meta property="og:description" content="<?php while( have_posts() ): the_post(); the_excerpt(); endwhile; wp_reset_postdata(); ?>">
	<meta property="og:url" content="<?php echo get_the_permalink(); ?>">
	<meta property="og:site_name" content="<?php bloginfo('name'); ?>">
	<meta name="twitter:card" content="summary_large_image">

  <link rel="shortcut icon" type="image/png" href="<?php echo get_stylesheet_directory_uri(); ?>/images/favicon.png" />

  <script>
		// put google analytics code here

		// site visits longer than 45 seconds do not count as bounces
    // setTimeout("ga('send', 'event', 'unbounce', '45_sec')", 45000);
	</script>
    
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<!-- svg sprite -->
	<div class="svg-sprite">
		<!-- inject:svg -->
		<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><svg viewBox="0 0 109.29 30.222" id="logo" xmlns="http://www.w3.org/2000/svg"><g style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal" aria-label="LOGO"><path d="M0 29.68h14.819v-4.163H4.62V.541H0zM15.532 15.11c0 8.618 6.286 15.111 14.986 15.111 8.742 0 15.027-6.535 15.027-15.11C45.545 6.619 39.26 0 30.56 0S15.532 6.577 15.532 15.11zm4.829 0c0-6.16 4.329-10.781 10.198-10.781 5.828 0 10.199 4.62 10.199 10.782 0 6.244-4.37 10.781-10.199 10.781-5.869 0-10.198-4.537-10.198-10.781zM63.322 0c-8.7 0-14.903 6.66-14.903 15.11 0 9.034 6.535 15.111 14.82 15.111 5.536 0 9.24-1.748 12.363-4.662V14.444H65.236V18.4h5.995v4.912c-.75.79-3.289 2.622-7.743 2.622-5.87 0-10.24-4.37-10.24-10.865 0-6.119 4.038-10.781 10.24-10.781 4.37 0 6.91 2.164 8.034 3.288l2.914-3.038C72.937 2.872 69.482-.001 63.32-.001zM79.272 15.11c0 8.618 6.285 15.111 14.985 15.111 8.742 0 15.028-6.535 15.028-15.11C109.285 6.619 102.999 0 94.299 0c-8.7 0-15.027 6.577-15.027 15.11zm4.828 0C84.1 8.95 88.43 4.33 94.3 4.33c5.828 0 10.199 4.62 10.199 10.782 0 6.244-4.371 10.781-10.199 10.781-5.87 0-10.199-4.537-10.199-10.781z" style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal"/></g><text x="44.901" y="284.171" font-family="sans-serif" font-size="10.583" letter-spacing="0" stroke-width=".265" word-spacing="0" style="line-height:1.25" transform="translate(-11.502 -248.82)"/></svg></defs></svg>
		<!-- endinject -->
	</div>

	<header>
		<a class="logo" href="/"><svg><use xlink:href="#logo" /></svg></a>
		<?php wp_nav_menu(array('theme_location' => 'main-menu')); ?>
	</header>

	<main>