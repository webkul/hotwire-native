<?php
/**
 * Admin hooks
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Includes\Admin;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'Wkhw_Native_Admin_Hooks' ) ) {
	/**
	 * Admin hooks class
	 *
	 * This class is responsible for managing Admin-end hooks and actions within the plugin.
	 * It initializes the Admin-end functions and attaches them to specific WordPress hooks.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Native_Admin_Hooks {
		/**
		 * Constructor
		 *
		 * Initializes the Admin-end functions and attaches them to specific WordPress hooks.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function __construct() {
			// Initialize the Admin-end function handler.
			$function_handler = new Wkhw_Native_Admin_Functions();

			add_filter( 'admin_menu', array( $function_handler, 'wkhw_native_add_menu_items' ) );
			add_action( 'admin_init', array( $function_handler, 'wkhw_native_register_settings' ) );
			add_action( 'admin_enqueue_scripts', array( $function_handler, 'wkhw_native_admin_scripts' ) );
			add_filter( 'wk_allow_settings_update_to_demo_admin', array( $function_handler, 'wkhw_native_add_settings_for_demo_admin' ) );
			add_action( 'hw_render_settings_general', array( $function_handler, 'wkhw_native_settings' ) );
			add_action( 'hw_render_settings_views', array( $function_handler, 'wkhw_view_settings' ) );
			add_action( 'admin_enqueue_scripts', array( $function_handler, 'wkhw_enqueue_admin_script' ) );
		}
	}
}
