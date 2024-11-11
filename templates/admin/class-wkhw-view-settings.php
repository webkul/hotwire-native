<?php
/**
 * View Setting class.
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Templates\Admin;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'Wkhw_View_Settings' ) ) {

	/**
	 * View Setting class.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_View_Settings {
		/**
		 * Constructor Function.
		 *
		 * Initializes the front-end hooks by creating an instance of Hw_Front_Hooks.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function __construct() {
			$this->wkhw_view_get_template();
		}

		/**
		 * Renders the template for the Hotwire for WordPress settings page.
		 *
		 * This function generates the HTML markup for the settings page, including
		 * the form fields and submit button. It also handles displaying any settings
		 * errors that may have occurred.
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function wkhw_view_get_template() {
			// Fetch the current sub-tab dynamically.
			$current_sub_tab = ! empty( filter_input( INPUT_GET, 'sub_tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS ) ) ? filter_input( INPUT_GET, 'sub_tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS ) : esc_html( 'sub_tab1' );

			// Define the shortcodes and their corresponding sub-tabs.
			$shortcodes = array(
				'sub_tab1' => array(
					'label'     => esc_html__( 'Form', 'hotwire-native' ),
					'shortcode' => '[hotwire_form]',
				),
				'sub_tab2' => array(
					'label'     => esc_html__( 'Popover', 'hotwire-native' ),
					'shortcode' => '[hotwire_popover]',
				),
				'sub_tab3' => array(
					'label'     => esc_html__( 'Notification', 'hotwire-native' ),
					'shortcode' => '[hotwire_notification]',
				),
				'sub_tab4' => array(
					'label'     => esc_html__( 'Accordion', 'hotwire-native' ),
					'shortcode' => '[hotwire_accordion]',
				),
				'sub_tab5' => array(
					'label'     => esc_html__( 'Tab', 'hotwire-native' ),
					'shortcode' => '[hotwire_tab]',
				),
			);

			?>
			<div class="wrap">
				<h2 class="nav-tab-wrapper">
					<?php foreach ( $shortcodes as $sub_tab_key => $sub_tab_data ) : ?>
						<a href="?page=hotwire&tab=views&sub_tab=<?php echo esc_attr( $sub_tab_key ); ?>" class="nav-tab <?php echo esc_html( $sub_tab_key ) === $current_sub_tab ? 'nav-tab-active' : ''; ?>">
							<?php echo esc_attr( $sub_tab_data['label'] ); ?>
						</a>
					<?php endforeach; ?>
				</h2>

				<div class="tab-content">
					<?php if ( isset( $shortcodes[ $current_sub_tab ] ) ) : ?>
						<div>
							<p><?php echo esc_html__( 'Directly use shortcodes inside your page/article:', 'hotwire-native' ); ?></p>
							<div class="wkhw-shortcode-wrapper">
								<input type="text" id="wkhw_shortcode_field" class="wkhw-code" value="<?php echo esc_attr( $shortcodes[ $current_sub_tab ]['shortcode'] ); ?>" readonly />
								<button class="button button-secondary" type="button" id="wkhw_copy_button" onclick="wkhw_copy_shortcode()">
									<?php esc_html_e( 'Copy Shortcode', 'hotwire-native' ); ?>
								</button>
							</div>
							<div id="wkhw_copy_message" class="wkhw-copy-message">
								<?php esc_html_e( 'Short code copied!', 'hotwire-native' ); ?>
							</div>
						</div>
						<div class="wkhw-mockup-wrapper">
							<div class="wkhw-ios-container">
								<div class="wkhw-content-wrapper">
									<div class="wkhw-shutter-wrap">
										<span class="wkhw-time">9:41</span>
										<div class="wkhw-icons-wrap">
											<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3436 1.17522C10.3261 1.26298 10.3261 1.36851 10.3261 1.57958V7.26798C10.3261 7.47904 10.3261 7.58458 10.3436 7.67234C10.4153 8.03388 10.6979 8.3165 11.0595 8.38825C11.1472 8.40566 11.2528 8.40566 11.4638 8.40566C11.6749 8.40566 11.7804 8.40566 11.8682 8.38825C12.2297 8.3165 12.5123 8.03388 12.5841 7.67234C12.6015 7.58458 12.6015 7.47904 12.6015 7.26798V1.57958C12.6015 1.36851 12.6015 1.26298 12.5841 1.17522C12.5123 0.81368 12.2297 0.531056 11.8682 0.459311C11.7804 0.441895 11.6749 0.441895 11.4638 0.441895C11.2528 0.441895 11.1472 0.441895 11.0595 0.459311C10.6979 0.531056 10.4153 0.81368 10.3436 1.17522ZM6.9131 3.85523C6.9131 3.64416 6.9131 3.53863 6.93052 3.45087C7.00226 3.08933 7.28489 2.8067 7.64642 2.73496C7.73419 2.71754 7.83972 2.71754 8.05078 2.71754C8.26185 2.71754 8.36738 2.71754 8.45514 2.73496C8.81668 2.8067 9.09931 3.08933 9.17105 3.45087C9.18847 3.53863 9.18847 3.64416 9.18847 3.85522V7.26827C9.18847 7.47933 9.18847 7.58486 9.17105 7.67263C9.09931 8.03416 8.81668 8.31679 8.45514 8.38853C8.36738 8.40595 8.26185 8.40595 8.05078 8.40595C7.83972 8.40595 7.73419 8.40595 7.64642 8.38853C7.28489 8.31679 7.00226 8.03416 6.93052 7.67263C6.9131 7.58486 6.9131 7.47933 6.9131 7.26827V3.85523ZM3.51746 4.58844C3.50005 4.67621 3.50005 4.78174 3.50005 4.9928V7.26816C3.50005 7.47923 3.50005 7.58476 3.51746 7.67252C3.58921 8.03406 3.87183 8.31668 4.23337 8.38843C4.32113 8.40585 4.42666 8.40585 4.63773 8.40585C4.84879 8.40585 4.95432 8.40585 5.04209 8.38843C5.40362 8.31668 5.68625 8.03406 5.75799 7.67252C5.77541 7.58476 5.77541 7.47923 5.77541 7.26816V4.9928C5.77541 4.78174 5.77541 4.67621 5.75799 4.58844C5.68625 4.22691 5.40362 3.94428 5.04209 3.87254C4.95432 3.85512 4.84879 3.85512 4.63773 3.85512C4.42666 3.85512 4.32113 3.85512 4.23337 3.87254C3.87183 3.94428 3.58921 4.22691 3.51746 4.58844ZM0.104407 5.72614C0.0869904 5.81391 0.0869904 5.91944 0.0869904 6.1305V7.26818C0.0869904 7.47925 0.0869904 7.58478 0.104407 7.67254C0.176152 8.03408 0.458776 8.3167 0.820313 8.38845C0.908077 8.40586 1.01361 8.40586 1.22467 8.40586C1.43573 8.40586 1.54127 8.40586 1.62903 8.38845C1.99057 8.3167 2.27319 8.03408 2.34494 7.67254C2.36235 7.58478 2.36235 7.47925 2.36235 7.26818V6.1305C2.36235 5.91944 2.36235 5.81391 2.34494 5.72614C2.27319 5.36461 1.99057 5.08198 1.62903 5.01024C1.54127 4.99282 1.43573 4.99282 1.22467 4.99282C1.01361 4.99282 0.908077 4.99282 0.820313 5.01024C0.458776 5.08198 0.176152 5.36461 0.104407 5.72614Z" fill="#161E32"/>
											</svg>
											<svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M6.14795 2.08057C7.79862 2.08064 9.38618 2.6933 10.5825 3.79192C10.6726 3.87674 10.8166 3.87567 10.9053 3.78952L11.7664 2.95004C11.8114 2.90634 11.8364 2.84716 11.836 2.78558C11.8357 2.724 11.8099 2.6651 11.7644 2.62192C8.6245 -0.28478 3.67088 -0.28478 0.530941 2.62192C0.485455 2.66507 0.459651 2.72395 0.459234 2.78553C0.458809 2.84711 0.483816 2.90631 0.528706 2.95004L1.3901 3.78952C1.47876 3.8758 1.62286 3.87687 1.71289 3.79192C2.90936 2.69323 4.49711 2.08056 6.14795 2.08057ZM6.14671 5.40977C7.12126 5.4097 8.06103 5.83472 8.78342 6.60225C8.88112 6.71118 9.03504 6.70881 9.13028 6.59692L10.0545 5.50119C10.1032 5.44371 10.1302 5.36575 10.1295 5.28473C10.1288 5.2037 10.1005 5.1264 10.0508 5.07009C7.85099 2.66913 4.44429 2.66913 2.24448 5.07009C2.19478 5.1264 2.16643 5.20374 2.16578 5.28479C2.16513 5.36584 2.19223 5.4438 2.241 5.50119L3.165 6.59692C3.26024 6.70881 3.41416 6.71118 3.51187 6.60225C4.23377 5.83523 5.1728 5.41025 6.14671 5.40977ZM7.74369 7.53637C7.78925 7.49551 7.81434 7.43927 7.81303 7.38094C7.81173 7.32261 7.78415 7.26735 7.7368 7.22822C6.79575 6.50073 5.4175 6.50073 4.47645 7.22822C4.42907 7.26732 4.40144 7.32256 4.40009 7.38089C4.39874 7.43922 4.42379 7.49548 4.46931 7.53637L5.94309 8.89554C5.98629 8.93548 6.04517 8.95796 6.10663 8.95796C6.16808 8.95796 6.22696 8.93548 6.27016 8.89554L7.74369 7.53637Z" fill="#161E32"/>
											</svg>
											<svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" clip-rule="evenodd" d="M2.67841 0.441895H13.4086C14.3122 0.441895 14.6399 0.544746 14.9702 0.737878C15.3006 0.931011 15.5598 1.21443 15.7365 1.57555C15.9132 1.93668 16.0073 2.29488 16.0073 3.28269V6.70255C16.0073 7.69036 15.9132 8.04856 15.7365 8.40969C15.5598 8.77082 15.3006 9.05423 14.9702 9.24736C14.6399 9.44049 14.3122 9.54335 13.4086 9.54335H2.67841C1.77479 9.54335 1.44712 9.44049 1.11677 9.24736C0.786417 9.05423 0.527158 8.77082 0.350485 8.40969C0.173812 8.04856 0.0797272 7.69036 0.0797272 6.70255V3.28269C0.0797272 2.29488 0.173812 1.93668 0.350485 1.57555C0.527158 1.21443 0.786417 0.931011 1.11677 0.737878C1.44712 0.544746 1.77479 0.441895 2.67841 0.441895ZM2.56347 1.01098C1.8336 1.01098 1.5788 1.06676 1.31711 1.22542C1.10855 1.35185 0.949293 1.53239 0.837755 1.76881C0.697797 2.06547 0.648594 2.35431 0.648594 3.18169V6.80404C0.648594 7.63142 0.697797 7.92026 0.837755 8.21692C0.949293 8.45334 1.10855 8.63387 1.31711 8.76031C1.5788 8.91897 1.8336 8.97475 2.56347 8.97475H13.5236C14.2534 8.97475 14.5082 8.91897 14.7699 8.76031C14.9785 8.63387 15.1377 8.45334 15.2493 8.21692C15.3892 7.92026 15.4384 7.63142 15.4384 6.80404V3.18169C15.4384 2.35431 15.3892 2.06547 15.2493 1.76881C15.1377 1.53239 14.9785 1.35185 14.7699 1.22542C14.5082 1.06676 14.2534 1.01098 13.5236 1.01098H2.56347ZM18.2826 5.56169C18.2826 6.61681 17.1449 7.26822 17.1449 7.26822V3.85517C17.1449 3.85517 18.2826 4.50657 18.2826 5.56169Z" fill="black" fill-opacity="0.36"/>
												<rect x="1.17354" y="1.672" width="13.6522" height="6.64211" rx="1.21408" fill="#161E32"/>
											</svg>
										</div>
									</div>
									<div class="wkhw-content-container">
										<div class="wkhw-content-title"><?php esc_html_e( 'Mobikul', 'hotwire-native' ); ?></div>
										<?php echo do_shortcode( $shortcodes[ $current_sub_tab ]['shortcode'] ); ?>
									</div>
								</div>
							</div>
						</div>
					<?php endif; ?>
				</div>
			</div>
			<?php
		}
	}
}
