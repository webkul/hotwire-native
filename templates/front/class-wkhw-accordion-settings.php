<?php
/**
 * Accordion template.
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Templates\Front;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'Wkhw_Accordion_Settings' ) ) {
	/**
	 * Front hooks class
	 *
	 * This class is responsible for managing front-end hooks and actions within the plugin.
	 * It initializes the front-end functions and attaches them to specific WordPress hooks.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Accordion_Settings {
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
			<div class="wkhw_accordion" data-controller="accordion">
				<div class="wkhw_accordion__item">
					<div class="wkhw_accordion__header"
						data-accordion-target="header"
						data-action="click->accordion#toggle"
						data-toggle="#wkhw_faq1">
						<?php esc_html_e( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 'hotwire-native' ); ?>
					</div>
					<div class="wkhw_accordion__content" id="wkhw_faq1">
					<p>
						<?php esc_html_e( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'hotwire-native' ); ?>
						</p>
					</div>
				</div>

				<div class="wkhw_accordion__item">
					<div class="wkhw_accordion__header"
						data-accordion-target="header"
						data-action="click->accordion#toggle"
						data-toggle="#wkhw_faq2">
						<?php esc_html_e( 'But I must explain to you how all this mistaken idea?', 'hotwire-native' ); ?>
					</div>
					<div class="wkhw_accordion__content" id="wkhw_faq2">
					<p>
						<?php esc_html_e( 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beata', 'hotwire-native' ); ?>
						</p>
					</div>
				</div>

				<div class="wkhw_accordion__item">
					<div class="wkhw_accordion__header"
						data-accordion-target="header"
						data-action="click->accordion#toggle"
						data-toggle="#wkhw_faq3">
						<?php esc_html_e( 'At vero eos et accusamus et iusto odio?', 'hotwire-native' ); ?>
					</div>
					<div class="wkhw_accordion__content" id="wkhw_faq3">
					<p>
						<?php esc_html_e( 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful', 'hotwire-native' ); ?>
						</p>
					</div>
				</div>
			</div>
			<?php
		}
	}
}
