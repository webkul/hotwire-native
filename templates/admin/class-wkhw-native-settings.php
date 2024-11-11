<?php
/**
 * Setting class.
 *
 * @package hotwire turbo
 * @version 1.0.0
 */

namespace WKHW_NATIVE\Templates\Admin;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'Wkhw_Native_Settings' ) ) {

	/**
	 * Setting class.
	 *
	 * @since 1.0.0
	 */
	class Wkhw_Native_Settings {
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
			$this->wkhw_native_get_template();
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
		public function wkhw_native_get_template() {
			settings_errors();
			$option_url = esc_url( admin_url( 'options.php' ) );
			// Get the current option value.
			$current_status = get_option( 'hw_native_status', 'enable' ); // Default to 'enable' if not set.
			?>
			<div class="wrap">
				<h1><?php esc_html_e( 'Settings', 'hotwire-native' ); ?></h1>

				<form action="<?php echo esc_url( $option_url ); ?>" method="post">
					<?php settings_fields( 'hotwire-native-settings-group' ); ?>
					<?php do_settings_sections( 'hotwire-native-settings-group' ); ?>

					<table>
						<tbody>
							<tr class="form-field">
								<th scope="row">
									<label for="locale"><?php esc_html_e( 'Hotwire For WordPress', 'hotwire-native' ); ?></label>
								</th>
								<td>
									<select name="hw_native_status">
										<option value="enable" <?php selected( $current_status, 'enable' ); ?>>
											<?php esc_html_e( 'Enable', 'hotwire-native' ); ?>
										</option>
										<option value="disable" <?php selected( $current_status, 'disable' ); ?>>
											<?php esc_html_e( 'Disable', 'hotwire-native' ); ?>
										</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>

					<p class="submit">
						<input type="submit" name="save_hotwire" class="button button-primary" value="Save">
					</p>
				</form>
			</div>
			<?php
		}
	}
}
