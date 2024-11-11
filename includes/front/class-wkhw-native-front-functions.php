<?php
/**
 * Front functions
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Includes\Front;

defined( 'ABSPATH' ) || exit();

use WKHW_NATIVE\Templates\Front as FrontTemplates;

if ( ! class_exists( 'Wkhw_Native_Front_Functions' ) ) {
	/**
	 * Front functions class.
	 *
	 * This class contains various front-end functions that are used to enqueue scripts,
	 * add import maps, and manage other front-end related tasks.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Native_Front_Functions {
		/**
		 * POS Scripts Enqueue Function.
		 *
		 * Enqueues the custom Hotwire bridge script and adds the type="module" attribute to the script tag.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function wkhw_enqueue_front_scripts() {
			$hotwire_status = get_option( 'hw_native_status', 'enable' );

			if ( 'enable' === $hotwire_status ) {
				// phpcs:ignore WordPress.WP.EnqueuedStylesScope
				wp_enqueue_script( 'custom-hotwire-bridge', WKHW_NATIVE_PLUGIN_URL . 'assets/dist/js/application.min.js', array(), WKHW_NATIVE_SCRIPT_VERSION, false );

				wp_localize_script(
					'custom-hotwire-bridge',
					'customForm',
					array(
						'ajaxUrl' => admin_url( 'admin-ajax.php' ),
						'nonce'   => wp_create_nonce( 'custom_form_nonce' ),
					)
				);

				// Add the type="module" attribute to the script tag.
				add_filter(
					'script_loader_tag',
					function ( $tag, $handle ) {
						if ( 'custom-hotwire-bridge' !== $handle ) {
							return $tag;
						}
						return str_replace( '<script ', '<script type="module" ', $tag );
					},
					10,
					2
				);
			}
		}

		/**
		 * Register the shortcodes.
		 *
		 * @return void
		 */
		public function wkhw_register_shortcodes() {
			add_shortcode( 'hotwire_form', array( $this, 'wkhw_form_shortcode' ) );
			add_shortcode( 'hotwire_popover', array( $this, 'wkhw_popover_shortcode' ) );
			add_shortcode( 'hotwire_notification', array( $this, 'wkhw_notification_shortcode' ) );
			add_shortcode( 'hotwire_accordion', array( $this, 'wkhw_accordion_shortcode' ) );
			add_shortcode( 'hotwire_tab', array( $this, 'wkhw_tab_shortcode' ) );
		}

		/**
		 *  Register shortcode for the tab.
		 *
		 * @return void
		 */
		public function wkhw_tab_shortcode() {
			new FrontTemplates\Wkhw_Tab_Settings();
		}

		/**
		 *  Register shortcode for the FAB.
		 *
		 * @return void
		 */
		public function wkhw_accordion_shortcode() {
			new FrontTemplates\Wkhw_Accordion_Settings();
		}

		/**
		 *  Register shortcode for the form.
		 *
		 * @return void
		 */
		public function wkhw_form_shortcode() {
			new FrontTemplates\Wkhw_Forms_Settings();
		}

		/**
		 *  Register shortcode for the popover
		 *
		 * @return void
		 */
		public function wkhw_popover_shortcode() {
			new FrontTemplates\Wkhw_Popover_Settings();
		}

		/**
		 *  Register shortcode for the notification
		 *
		 * @return void
		 */
		public function wkhw_notification_shortcode() {
			new FrontTemplates\Wkhw_Notification_Settings();
		}

		/**
		 * Enqueue front script.
		 *
		 * @return void
		 */
		public function wkhw_enqueue_front_script() {
			wp_enqueue_style( 'wkhw-front-style', WKHW_NATIVE_PLUGIN_URL . 'assets/build/css/wkhw-front-style.css', array(), WKHW_NATIVE_SCRIPT_VERSION );
		}

		/**
		 * Submission form ajax.
		 *
		 * @return void
		 */
		public function hwf_handle_submission() {
			check_ajax_referer( 'hwf_form_nonce', 'nonce' );

			$name    = ! empty( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
			$email   = ! empty( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
			$message = ! empty( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';

			// Validate inputs.
			if ( empty( $name ) || empty( $email ) || empty( $message ) ) {
				wp_send_json_error( esc_html__( 'All fields are required', 'hotwire-native' ) );
			}

			if ( ! is_email( $email ) ) {
				wp_send_json_error( esc_html__( 'Invalid email address', 'hotwire-native' ) );
			}

			// Process form (e.g., send email, save to database).
			$to      = get_option( 'admin_email', '' );
			$subject = esc_html__( 'New Form Submission', 'hotwire-native' );
			$body    = "Name: $name\nEmail: $email\nMessage: $message";
			$headers = array( 'Content-Type: text/html; charset=UTF-8' );

			if ( wp_mail( $to, $subject, $body, $headers ) ) {
				wp_send_json_success( esc_html__( 'Message sent successfully!', 'hotwire-native' ) );
			}

			wp_send_json_error( esc_html__( 'Failed to send message', 'hotwire-native' ) );
		}
	}
}
