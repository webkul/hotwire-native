<?php
/**
 * Plugin Name: Hotwire Native
 * Description: WordPress Hotwire native for converting website to native app.
 * Version: 1.0.0
 * Author: wkmobikul
 * Domain Path: /languages
 * Text Domain: hotwire-native
 * Requires at least: 6.5
 * Requires PHP: 7.4
 *
 * Hotwire Native is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Hotwire Native is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with WP Rollback. If not, see <http://www.gnu.org/licenses/>.
 *
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package hotwire turbo
 */

defined( 'ABSPATH' ) || exit();

use WKHW_NATIVE\Includes;

// Define Constants.
defined( 'WKHW_NATIVE_PLUGIN_FILE' ) || define( 'WKHW_NATIVE_PLUGIN_FILE', plugin_dir_path( __FILE__ ) );
defined( 'WKHW_NATIVE_PLUGIN_URL' ) || define( 'WKHW_NATIVE_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
defined( 'WKHW_NATIVE_SCRIPT_VERSION' ) || define( 'WKHW_NATIVE_SCRIPT_VERSION', '1.0.0' );

if ( ! function_exists( 'wkhw_native_includes' ) ) {
	/**
	 * Function to include necessary files and initialize the plugin.
	 *
	 * This function is responsible for loading the plugin's text domain,
	 * autoloading classes, and initializing the main file handler.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function wkhw_native_includes() {
		// Load the plugin's text domain for localization.
		load_plugin_textdomain( 'hotwire-native', false, basename( __DIR__ ) . '/languages' );
		// Include the autoloader for the plugin's classes.
		require_once WKHW_NATIVE_PLUGIN_FILE . 'includes/autoload.php';
		// Initialize the main file handler.
		new Includes\Wkhw_Native_File_Handler();
	}
	// Hook the function to the 'plugins_loaded' action to ensure it runs after WordPress is fully loaded.
	add_action( 'plugins_loaded', 'wkhw_native_includes' );
}
