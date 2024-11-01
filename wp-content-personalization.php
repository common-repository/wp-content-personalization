<?php
/**
 * Plugin Name: WP Content Personalization
 * Plugin URI: https://www.ventureharbour.com/wp-content-personalisation/
 * Description: WP Content Personalization allows you to show and hide content depending on a visitors' answer to a question.
 * Version: 1.0.1
 * Author: Venture Harbour
 * Author URI: https://www.ventureharbour.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

register_activation_hook( __FILE__, 'wpcs_plugin_install' );
register_deactivation_hook( __FILE__, 'wpcs_plugin_remove' );

function wpcs_plugin_install() {
	flush_rewrite_rules();
}

function wpcs_plugin_remove() {
	delete_option( 'wpcp_checkbox' );
	flush_rewrite_rules();
}

function wpcp_settings_page() {
	add_settings_section( 'section', '', null, 'wpcp' );
	add_settings_field( 'style-checkbox', 'Exclude WP Content Personalization CSS', 'wpcp_checkbox_display', 'wpcp', 'section' );
	register_setting( 'section', 'wpcp_checkbox' );
}

function wpcp_checkbox_display() {
	?>
	<input type="checkbox" name="wpcp_checkbox" value="1" <?php checked( 1, get_option( 'wpcp_checkbox' ), true ); ?> />
	<?php
}
add_action( 'admin_init', 'wpcp_settings_page' );

function wpcp_page() {
	?>
	<div class="wrap">
		<?php screen_icon(); ?>
		<h2>WP Content Personalization Settings</h2>

		<form method="post" action="options.php">
			<?php
				settings_fields( 'section' );

				do_settings_sections( 'wpcp' );

				submit_button();
			?>
		</form>
	</div>
	<?php
}

function wpcp_menu_item() {
	add_submenu_page( 'options-general.php', 'Content Personalization', 'Content Personalization', 'manage_options', 'wpcp', 'wpcp_page' );
}
add_action( 'admin_menu', 'wpcp_menu_item' );

require_once 'shortcodes.php';

function wpcs_include_custom_script_style() {
	$hide_style = get_option( 'wpcp_checkbox' );

	// If user has not ticked box in settings page, use our css.
	if ( '1' !== $hide_style ) {
		wp_register_style( 'wpcp_stylesheet', plugins_url( 'css/wpcp.css', __FILE__ ) );
		wp_enqueue_style( 'wpcp_stylesheet' );
	}

	wp_enqueue_script( 'wpcpfoot', plugins_url( 'js/wpcp-foot.min.js', __FILE__ ), array(), null, true );
}
add_action( 'wp_enqueue_scripts', 'wpcs_include_custom_script_style' );


function wpcp_add_my_tc_button() {
	global $typenow;
	// check user permissions
	if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
		return;
	}
	// verify the post type
	if ( ! in_array( $typenow, array( 'post', 'page' ) ) ) {
		return;
	}
	// check if WYSIWYG is enabled
	if ( get_user_option('rich_editing') == 'true' ) {
		add_filter( 'mce_external_plugins', 'wpcp_add_tinymce_plugin' );
		add_filter( 'mce_buttons', 'wpcp_register_my_tc_button' );
	}
}
add_action( 'admin_head', 'wpcp_add_my_tc_button' );

function wpcp_add_tinymce_plugin( $plugin_array ) {
	$plugin_array['wpcp_tc_button'] = plugins_url( '/js/tiny-mce/tiny-mce.js', __FILE__ );
	return $plugin_array;
}

function wpcp_register_my_tc_button( $buttons ) {
	array_push( $buttons, 'wpcp_tc_button' );
	return $buttons;
}

function wpcp_css() {
	wp_enqueue_style( 'wpcp', plugins_url( '/css/tinymce-style.css', __FILE__ ) );
}
add_action( 'admin_enqueue_scripts', 'wpcp_css' );
