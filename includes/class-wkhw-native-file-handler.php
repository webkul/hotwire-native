<?php
/**
 * File handler
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Includes;

defined( 'ABSPATH' ) || exit();

use WKHW_NATIVE\Includes\Front;
use WKHW_NATIVE\Includes\Admin;

if ( ! class_exists( 'Wkhw_Native_File_Handler' ) ) {

	/**
	 * File handler class.
	 *
	 * This class is responsible for managing file-related operations within the plugin.
	 * It initializes the front-end hooks and other necessary components.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Native_File_Handler {
		/**
		 * Constructor Function.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function __construct() {
			if ( is_admin() && is_user_logged_in() ) {
				new Admin\Wkhw_Native_Admin_Hooks();
			}
			new Front\Wkhw_Native_Front_Hooks();
		}
	}
}
