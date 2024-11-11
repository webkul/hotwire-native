<?php
/**
 * Tab template.
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Templates\Front;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'Wkhw_Tab_Settings' ) ) {
	/**
	 * Front hooks class
	 *
	 * This class is responsible for managing front-end hooks and actions within the plugin.
	 * It initializes the front-end functions and attaches them to specific WordPress hooks.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Tab_Settings {
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
			<div class="wkhw_tabs-container" data-controller="tabs">
			<div class="wkhw_tabs">
				<div class="wkhw_tab-links">
					<button class="wkhw_tab-link wkhw_active" data-tabs-target="link" data-action="click->tabs#switch" data-tab="wkhw_tab-1">
						<i class="fas fa-info-circle"></i> <?php esc_html_e( 'Overview', 'hotwire-native' ); ?></button>
					<button class="wkhw_tab-link" data-tabs-target="link" data-action="click->tabs#switch" data-tab="wkhw_tab-2">
						<i class="fas fa-list"></i><?php esc_html_e( 'Details', 'hotwire-native' ); ?>
					</button>
					<button class="wkhw_tab-link" data-tabs-target="link" data-action="click->tabs#switch" data-tab="wkhw_tab-3">
						<i class="fas fa-envelope"></i> <?php esc_html_e( 'Contact', 'hotwire-native' ); ?>
					</button>
					<button class="wkhw_tab-link" data-tabs-target="link" data-action="click->tabs#switch" data-tab="wkhw_tab-4">
						<i class="fas fa-question-circle"></i> <?php esc_html_e( 'FAQ', 'hotwire-native' ); ?>
					</button>
				</div>

				<div class="wkhw_tab-content wkhw_active" data-tabs-target="content" id="wkhw_tab-1">
					<h2><?php esc_html_e( 'Overview', 'hotwire-native' ); ?> </h2>
					<p><?php esc_html_e( 'Welcome to our modern tabbed interface! Enjoy smooth transitions, vibrant gradients, and responsive design.', 'hotwire-native' ); ?> </p>
					<button class="wkhw-button"><?php esc_html_e( 'Learn More', 'hotwire-native' ); ?> </button>
				</div>

				<div class="wkhw_tab-content" data-tabs-target="content" id="wkhw_tab-2">
					<h2><?php esc_html_e( 'Details', 'hotwire-native' ); ?></h2>
					<ul class="wkhw_details-list">
						<li><?php esc_html_e( 'Responsive across all devices', 'hotwire-native' ); ?></li>
						<li><?php esc_html_e( 'Smooth animations and transitions', 'hotwire-native' ); ?></li>
						<li><?php esc_html_e( 'Modern, gradient-based design', 'hotwire-native' ); ?></li>
						<li><?php esc_html_e( 'Clean, easy-to-read fonts', 'hotwire-native' ); ?></li>
					</ul>
					<button class="wkhw-button"><?php esc_html_e( 'Get Started', 'hotwire-native' ); ?></button>
				</div>
				<div class="wkhw_tab-content" data-tabs-target="content" id="wkhw_tab-3">
					<h2><?php esc_html_e( 'Contact Us', 'hotwire-native' ); ?></h2>
					<form class="wkhw_contact-form">
						<label for="name"><?php esc_html_e( 'Name:', 'hotwire-native' ); ?></label>
						<input type="text" id="name" placeholder="<?php esc_attr__( 'Your Name', 'hotwire-native' ); ?>">

						<label for="email"><?php esc_html_e( 'Email:', 'hotwire-native' ); ?></label>
						<input type="email" id="email" placeholder="<?php esc_attr__( 'Your Email', 'hotwire-native' ); ?>">

						<label for="message"><?php esc_html_e( 'Message:', 'hotwire-native' ); ?></label>
						<textarea id="message" placeholder="<?php esc_attr__( 'Your Message', 'hotwire-native' ); ?>"></textarea>
						<button type="submit" class="wkhw-button"><?php esc_html_e( 'Submit', 'hotwire-native' ); ?></button>
					</form>
				</div>

				<div class="wkhw_tab-content" data-tabs-target="content" id="wkhw_tab-4">
					<h2><?php esc_html_e( 'Frequently Asked Questions', 'hotwire-native' ); ?></h2>
					<ul class="wkhw_faq-list">
						<li><strong><?php esc_html_e( 'Q:', 'hotwire-native' ); ?></strong> <?php esc_html_e( 'What is this component for?', 'hotwire-native' ); ?></li>
						<li><strong><?php esc_html_e( 'A:', 'hotwire-native' ); ?></strong> <?php esc_html_e( 'It`s a modern, interactive tab interface for websites.', 'hotwire-native' ); ?></li>
						<li><strong><?php esc_html_e( 'Q:', 'hotwire-native' ); ?></strong></li>
						<li><strong><?php esc_html_e( 'A:', 'hotwire-native' ); ?></strong> <?php esc_html_e( 'Yes! It`s built to work perfectly on any screen size.', 'hotwire-native' ); ?></li>
					</ul>
				</div>
			</div>
			</div>
			<?php
		}
	}
}
