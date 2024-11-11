// tabs_controller.js
import { Controller } from "../vendor/stimulus.js"

export default class extends Controller {
    static targets = ["link", "content"]

    connect() {
        // Set initial state
        this.showTab(this.linkTargets[0].dataset.tab)
    }

    switch(event) {
        event.preventDefault()
        const clickedTab = event.currentTarget.dataset.tab
        this.showTab(clickedTab)
    }

    showTab(tabId) {
        // Update link states
        this.linkTargets.forEach(link => {
            link.classList.toggle("wkhw_active", link.dataset.tab === tabId)
        })

        // Update content states
        this.contentTargets.forEach(content => {
            content.classList.toggle("wkhw_active", content.id === tabId)
        })
    }
}
