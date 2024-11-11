import { Controller } from "../vendor/stimulus.js"

export default class Popover extends Controller {
    static targets = ["card", "content"]
    static values = { url: String }

    async show(event) {
        const element = event.currentTarget
        const card = this.cardTarget

        // Position the card relative to the link
        const rect = element.getBoundingClientRect()
        // Show the card
        card.classList.remove("hidden")
    }

    hide() {
        if (this.hasCardTarget) {
            // Hide the card
            this.cardTarget.classList.add("hidden")
        }
    }

}
