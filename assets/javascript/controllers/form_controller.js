import { Controller } from "../vendor/stimulus.js"


export default class extends Controller {
    submit(event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(this.element);
        formData.append('action', 'hwf_submit_form'); // WordPress AJAX action
        formData.append('nonce', customForm.nonce); // WordPress nonce

        // Send form data with Turbo
        fetch(customForm.ajaxUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.text()) // Use .text() to handle HTML response for Turbo
            .then(data => {
                if (data) {
                    this.navigateToSuccessPage(); // Navigate to success page
                } else {
                    this.displayErrorMessage(data.message);
                }
            })
            .catch(err => console.error('Form submission error:', err));
    }

    navigateToSuccessPage() {
        // Use Turbo to navigate to the success page
        Turbo.visit('https://wpdev.vachak.com/themes/mobikul/success/'); // Adjust the URL to your success page
    }

    displaySuccessMessage(message) {
        const responseDiv = document.getElementById('form-response');
        responseDiv.innerHTML = `<p>${message}</p>`;
        responseDiv.classList.add('success');
        this.element.reset(); // Reset form
    }

    displayErrorMessage(message) {
        const responseDiv = document.getElementById('form-response');
        responseDiv.innerHTML = `<p>${message}</p>`;
        responseDiv.classList.add('error');
    }

}
