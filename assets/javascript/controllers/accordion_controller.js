import { Controller } from "../vendor/stimulus.js"

export default class extends Controller {
    static targets = ["header"]

    toggle(event) {
        const header = event.currentTarget
        const selector = header.dataset.toggle
        const content = document.querySelector(selector)

        if (header.classList.contains('active')) {
            content.style.maxHeight = ''
            content.style.padding = ''
        } else {
            content.style.maxHeight = (content.scrollHeight + 50) + 'px'
            content.style.padding = '25px'
        }

        header.classList.toggle('active')
    }
}
