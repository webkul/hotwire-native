<?php
/**
 * Popover template.
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Templates\Front;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'Wkhw_Popover_Settings' ) ) {
	/**
	 * Front hooks class
	 *
	 * This class is responsible for managing front-end hooks and actions within the plugin.
	 * It initializes the front-end functions and attaches them to specific WordPress hooks.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Popover_Settings {
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
			<div data-controller="popover" class="wkhw-popover-container">
				<div data-popover-target="card" class="wkhw-popover wkhw-bottom hidden">
					<div class="wkhw-popover-header"><?php esc_html_e( 'Quick Actions', 'hotwire-native' ); ?></div>
					<div class="wkhw-popover-item"><?php esc_html_e( 'Share', 'hotwire-native' ); ?></div>
					<div class="wkhw-popover-item"><?php esc_html_e( 'Copy Link', 'hotwire-native' ); ?></div>
					<div class="wkhw-popover-separator"></div>
					<div class="wkhw-popover-item wkhw-destructive"><?php esc_html_e( 'Delete', 'hotwire-native' ); ?></div>
				</div>
				<span class="wkhw-popover-link" data-action="mouseenter->popover#show mouseleave->popover#hide">
					<span class="m40 wkhw-button"><?php esc_html_e( 'Popover', 'hotwire-native' ); ?></span>
				</span>
			</div>
			<?php
		}
	}
}
