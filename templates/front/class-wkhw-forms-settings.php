<?php
/**
 * Forms settings template.
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Templates\Front;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'Wkhw_Forms_Settings' ) ) {
	/**
	 * Front hooks class
	 *
	 * This class is responsible for managing front-end hooks and actions within the plugin.
	 * It initializes the front-end functions and attaches them to specific WordPress hooks.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Forms_Settings {
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
			<button data-controller="modal" data-action="click->modal#openForm" class="m40 wkhw-button"><?php esc_html_e( 'Start a project', 'hotwire-native' ); ?> </button>

			<!-- Modal Turbo Frame Wrapper (hidden initially) -->
			<turbo-frame id="wkhw-form-modal" class="wkhw-modal-frame" hidden>
				<!-- Placeholder content. The actual form content will load here when the button is clicked -->
			</turbo-frame>

			<turbo-frame id="wkhw-form-submit" hidden>
				<form id="wkhw-ios-native-form" action="" method="POST" data-controller="form" data-action="submit->form#submit">
					<button data-controller="modal" id="wkhw-close-btn" data-action="click->modal#closeForm" hidden><span class="dashicons dashicons-no-alt"></span></button>
					<label for="name"><?php esc_html_e( 'Name', 'hotwire-native' ); ?></label>
					<input type="text" id="name" name="name" required />
					<label for="email"><?php esc_html_e( 'Email', 'hotwire-native' ); ?></label>
					<input type="email" id="email" name="email" required />
					<button type="submit"><?php esc_html_e( 'Submit', 'hotwire-native' ); ?></button>
					<div id="wkhw-form-response"></div>
				</form>
			</turbo-frame>
			<?php
		}
	}
}
