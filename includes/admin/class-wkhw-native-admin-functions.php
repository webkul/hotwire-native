<?php
/**
 * Admin functions
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Includes\Admin;

defined( 'ABSPATH' ) || exit();

use WKHW_NATIVE\Templates\Admin as AdminTemplate;
use WKHW_NATIVE\Templates\Admin as AdminViewTemplate;

if ( ! class_exists( 'Wkhw_Native_Admin_Functions' ) ) {
	/**
	 * Admin functions class.
	 *
	 * This class contains various Admin-end functions that are used to enqueue scripts,
	 * add import maps, and manage other Admin-end related tasks.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Native_Admin_Functions {
		/**
		 * Adds menu items for the HotWire WP plugin in the WordPress admin menu.
		 *
		 * This function creates a top-level menu item for the plugin and two submenu items:
		 * one for extensions and another for support & services.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function wkhw_native_add_menu_items() {
			add_menu_page(
				esc_html__( 'HotWire WP', 'hotwire-native' ),
				'HotWire WP',
				'manage_options',
				'hotwire',
				array( $this, 'wkhw_settings_page_content' ),
				'dashicons-editor-paste-word',
				6
			);

			add_submenu_page(
				'hotwire',
				esc_html__( 'Extensions', 'hotwire-native' ),
				esc_html__( 'Extensions', 'hotwire-native' ),
				'manage_options',
				'webkul-extension',
				array( $this, 'wkhw_native_webkul_extensions' )
			);
			add_submenu_page(
				'hotwire',
				esc_html__( 'Support & Services', 'hotwire-native' ),
				esc_html__( 'Support & Services', 'hotwire-native' ),
				'manage_options',
				'webkul-support',
				array( $this, 'wkhw_native_webkul_support' )
			);
		}

		/**
		 * Enqueues admin scripts for the HotWire WP plugin.
		 *
		 * This function checks the current admin page and enqueues the appropriate scripts
		 * for the Webkul extensions and support pages.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function wkhw_native_admin_scripts() {
			$wk_page = filter_input( INPUT_GET, 'page', FILTER_SANITIZE_FULL_SPECIAL_CHARS );

			if ( ! empty( $wk_page ) && 'webkul-extension' === $wk_page ) {
				wp_enqueue_script( 'hotwire-native-webkul-extensions', esc_url( 'https://wpdemo.webkul.com/wk-extensions/client/wk.ext.js' ), array(), WKHW_NATIVE_SCRIPT_VERSION, true );
			}
			if ( ! empty( $wk_page ) && 'webkul-support' === $wk_page ) {
				wp_enqueue_script( 'hotwire-native-webkul-services', esc_url( 'https://webkul.com/common/modules/wksas.bundle.js' ), array(), WKHW_NATIVE_SCRIPT_VERSION, true );
			}
		}

		/**
		 * Adds settings hooks for the demo admin.
		 *
		 * This function appends the 'option_page_capability_hw-native-settings-group'
		 * to the provided array of settings hooks. This ensures that the settings group
		 * capability is included in the list of hooks that the demo admin needs to handle.
		 *
		 * @param array $settings_hooks An array of settings hooks.
		 * @return array The modified array of settings hooks.
		 *
		 * @since 1.0.0
		 */
		public function wkhw_native_add_settings_for_demo_admin( $settings_hooks ) {
			array_push(
				$settings_hooks,
				'option_page_capability_hw-native-settings-group',
			);
			return $settings_hooks;
		}

		/**
		 * Registers the settings for the Hotwire for WordPress plugin.
		 *
		 * This function registers the 'hw_native_status' setting under the
		 * 'hotwire-native-settings-group' settings group.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function wkhw_native_register_settings() {
			register_setting( 'hotwire-native-settings-group', 'hw_native_status' );
		}

		/**
		 * Initializes the Hotwire for WordPress settings.
		 *
		 * This function instantiates the AdminTemplate\Hw_Native_Settings class
		 * to handle the settings page and related functionalities.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function wkhw_native_settings() {
			new AdminTemplate\Wkhw_Native_Settings();
		}

		/**
		 * Initializes the Hotwire for WordPress settings.
		 *
		 * This function instantiates the AdminViewTemplate\Hw_Native_Settings class
		 * to handle the settings page and related functionalities.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function wkhw_view_settings() {
			new AdminViewTemplate\Wkhw_View_Settings();
		}

		/**
		 * Display the settings page content with dynamic hooks for tabs.
		 *
		 * @return void
		 */
		public function wkhw_settings_page_content() {
			// Fetch the current tab dynamically.
			$current_tab = ! empty( filter_input( INPUT_GET, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS ) ) ? filter_input( INPUT_GET, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS ) : esc_html( 'general' );

			// Define the tabs dynamically.
			$tabs = array(
				'general' => esc_html__( 'General Settings', 'hotwire-native' ),
				'views'   => esc_html__( 'ShortCode Views', 'hotwire-native' ),
			);
			?>
			<div class="wrap">
				<div class="wkhw-title-wrapper">
					<img src="<?php echo esc_url( WKHW_NATIVE_PLUGIN_URL . 'assets/images/hotwire-wordpress-connector.png' ); ?>" alt="Logo" />
					<h1 class="wp-header">
						<?php echo esc_html__( 'Hotwire Native Settings', 'hotwire-native' ); ?>
					</h1>
				</div>
				<h2 class="nav-tab-wrapper">
					<?php foreach ( $tabs as $tab_key => $tab_label ) : ?>
						<a href="?page=hotwire&tab=<?php echo esc_attr( $tab_key ); ?>" class="nav-tab <?php echo esc_html( $tab_key ) === $current_tab ? 'nav-tab-active' : ''; ?>">
							<?php echo esc_attr( $tab_label ); ?>
						</a>
					<?php endforeach; ?>
				</h2>
				<?php
				/**
				 * Fires for the currently selected tab.
				 *
				 * @since v1.0.0
				 * @param string $current_tab The currently selected tab.
				 */
				do_action( 'hw_render_settings_' . $current_tab );
				?>
			</div>
			<?php
		}

		/**
		 * Adds Webkul extensions to the admin footer.
		 *
		 * This function adds a filter to modify the admin footer text and includes
		 * the necessary JavaScript for the Webkul extensions.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function wkhw_native_webkul_extensions() {
			add_filter( 'admin_footer_text', array( $this, 'hw_native_admin_footer_text' ) );
			?>
				<webkul-extensions></webkul-extensions>
			<?php
		}

		/**
		 * Adds Webkul support to the admin area.
		 *
		 * This function includes the necessary JavaScript for the Webkul support
		 * area.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function wkhw_native_webkul_support() {
			?>
			<wk-area></wk-area>
			<?php
		}

		/**
		 * Admin footer text.
		 *
		 * @return string Text with link for admin footer.
		 */
		public function wkhw_native_admin_footer_text() {
			return sprintf( __( 'If you like <strong>Hotwire Native for WordPress</strong> from <strong><a href="https://webkul.com/" target="_blank" class="wc-rating-link" data-rated="Thanks :)">Webkul</a></strong> please leave us a <a href="#" target="_blank" class="wc-rating-link" data-rated="Thanks :)">★★★★★</a> rating. A huge thanks in advance!', 'hotwire-native' ) );
		}

		/**
		 * Enqueue admin script.
		 *
		 * @return void
		 */
		public function wkhw_enqueue_admin_script() {
			$page_hotwire = ! empty( filter_input( INPUT_GET, 'page', FILTER_SANITIZE_FULL_SPECIAL_CHARS ) ) ? filter_input( INPUT_GET, 'page', FILTER_SANITIZE_FULL_SPECIAL_CHARS ) : esc_html( '' );
			if ( 'hotwire' === $page_hotwire ) {
				wp_enqueue_script( 'wkhw-hotwire-bridge', WKHW_NATIVE_PLUGIN_URL . 'assets/dist/js/application.min.js', array(), WKHW_NATIVE_SCRIPT_VERSION, true );
				wp_enqueue_style( 'wkhw-admin-style', WKHW_NATIVE_PLUGIN_URL . 'assets/build/css/wkhw-front-style.css', array(), WKHW_NATIVE_SCRIPT_VERSION );
				wp_enqueue_style( 'wkhw-main-admin-style', WKHW_NATIVE_PLUGIN_URL . 'assets/build/css/wkhw-admin-style.css', array(), WKHW_NATIVE_SCRIPT_VERSION );
				wp_enqueue_script( 'wkhw-admin-script', WKHW_NATIVE_PLUGIN_URL . 'assets/javascript/admin/admin-script.js', array(), WKHW_NATIVE_SCRIPT_VERSION, true );

				add_filter(
					'script_loader_tag',
					function ( $tag, $handle ) {
						if ( 'wkhw-hotwire-bridge' === $handle ) {
							return str_replace( '<script ', '<script type="module" ', $tag );
						}
								return $tag;
					},
					10,
					2
				);
			}
		}
	}
}
