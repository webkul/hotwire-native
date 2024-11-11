/**
                 * Copy functionality for short code.
                 */
function wkhw_copy_shortcode() {
    const shortcodeField = document.getElementById('wkhw_shortcode_field');

    // Check if the Clipboard API is supported.
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Use the Clipboard API.
        navigator.clipboard.writeText(shortcodeField.value)
            .then(() => {
                wkbcShowCopyMessage();
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    } else {
        // Fallback for older browsers
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = shortcodeField.value;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        try {
            document.execCommand('copy');
            wkbcShowCopyMessage();
        } catch (err) {
            console.error('Fallback: Could not copy text: ', err);
        } finally {
            document.body.removeChild(tempTextArea);
        }
    }
}

// Function to display the copy message
function wkbcShowCopyMessage() {
    const messageElement = document.getElementById('wkhw_copy_message');
    messageElement.style.display = 'block';

    // Hide the message after a few seconds.
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 2000);
}
