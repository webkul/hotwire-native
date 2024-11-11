import { Controller } from "../vendor/stimulus.js";

export default class extends Controller {
    static targets = ["notification"];

    connect() {
        // Initialize with alert hidden
        document.querySelector('#notification').classList.remove("show");
    }

    show() {
        document.querySelector('#notification').classList.add("show");
    }

    hide() {
        document.querySelector('#notification').classList.remove("show");
    }

    signOut() {
        // Logic for sign-out can go here
        document.querySelector('#notification').classList.remove("show");
    }
}
