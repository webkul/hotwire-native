import { Controller } from "../vendor/stimulus.js";

export default class extends Controller {
    openForm(event) {
        event.preventDefault();

        const modalFrame = document.getElementById('wkhw-form-modal');
        const closeButton = document.getElementById('wkhw-close-btn');

        // Show the modal and close button
        modalFrame.removeAttribute('hidden');
        closeButton.removeAttribute('hidden');

        // Load the form content into the Turbo frame
        const formSubmitFrame = document.getElementById('wkhw-form-submit');
        modalFrame.innerHTML = formSubmitFrame.innerHTML; // Load the hidden form content
        document.body.style.overflow = 'hidden'
    }

    closeForm() {
        const modalFrame = document.getElementById('wkhw-form-modal');
        const closeButton = document.getElementById('wkhw-close-btn');

        // Hide the modal and close button
        modalFrame.setAttribute('hidden', true);
        closeButton.setAttribute('hidden', true);
        modalFrame.innerHTML = ''; // Clear content for future loads
        document.body.style.overflow = 'auto';
    }

    openScreen(event) {
        document.getElementById('wkhw-main-frame').setAttribute('hidden', true);
        document.getElementById('wkhw-second-screen').removeAttribute('hidden');
    }

    goBackprev(event) {
        // Show the main frame and hide the second screen
        document.getElementById('wkhw-main-frame').removeAttribute('hidden');
        document.getElementById('wkhw-second-screen').setAttribute('hidden', true);
    }
}
