<?php
/**
 * Front hooks
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Includes\Front;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'Wkhw_Native_Front_Hooks' ) ) {
	/**
	 * Front hooks class
	 *
	 * This class is responsible for managing front-end hooks and actions within the plugin.
	 * It initializes the front-end functions and attaches them to specific WordPress hooks.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Native_Front_Hooks {
		/**
		 * Constructor
		 *
		 * Initializes the front-end functions and attaches them to specific WordPress hooks.
		 *
		 * @since 1.0.0
		 */
		public function __construct() {

			// Initialize the front-end function handler.
			$function_handler = new Wkhw_Native_Front_Functions();

			// Hook the 'wkhw_enqueue_front_scripts' method to the 'wp_enqueue_scripts' action.
			add_action( 'wp_enqueue_scripts', array( $function_handler, 'wkhw_enqueue_front_scripts' ), 999 );
			// Hooks for shortcode.
			add_action( 'init', array( $function_handler, 'wkhw_register_shortcodes' ) );
			add_action( 'wp_enqueue_scripts', array( $function_handler, 'wkhw_enqueue_front_script' ), 999 );
			add_action( 'wp_ajax_hwf_submit_form', array( $function_handler, 'hwf_handle_submission' ) );
			add_action( 'wp_ajax_nopriv_hwf_submit_form', array( $function_handler, 'hwf_handle_submission' ) );
		}
	}
}
