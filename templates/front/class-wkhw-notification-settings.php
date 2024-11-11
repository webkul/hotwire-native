<?php
/**
 * Notification template.
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Templates\Front;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'Wkhw_Notification_Settings' ) ) {
	/**
	 * Front hooks class
	 *
	 * This class is responsible for managing front-end hooks and actions within the plugin.
	 * It initializes the front-end functions and attaches them to specific WordPress hooks.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Notification_Settings {
		/**
		 * Constructor
		 *
		 * Initializes the front-end functions and attaches them to specific WordPress hooks.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function __construct() {
			$this->wkhw_init();
		}

		/**
		 * Main template init function.
		 *
		 * @return void
		 */
		public function wkhw_init() {
			?>
			<div data-controller="notification" class="wkhw-notification-container">
				<button data-action="notification#show" class="m40 wkhw-button"><?php esc_html_e( 'Show Alert', 'hotwire-native' ); ?></button>

				<div class="wkhw-ios-notification" id="notification">
					<div class="wkhw-ios-notification-header"><?php esc_html_e( 'Sign Out', 'hotwire-native' ); ?></div>
					<div class="wkhw-ios-notification-body">
						<?php esc_html_e( 'Are you sure you want to sign out?', 'hotwire-native' ); ?>
					</div>
					<div class="wkhw-ios-notification-actions">
						<button class="wkhw-ios-notification-button" data-action="notification#hide"><?php esc_html_e( 'Cancel', 'hotwire-native' ); ?></button>
						<button class="wkhw-ios-notification-button wkhw-destructive" data-action="notification#signOut"><?php esc_html_e( 'Sign Out', 'hotwire-native' ); ?></button>
					</div>
				</div>
			</div>

			<?php
		}
	}
}
