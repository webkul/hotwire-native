import { Controller } from "../vendor/stimulus.js"

export default class extends Controller {
  static targets = [ "dialog", "item", "result" ]

  show() {
    this.dialogTarget.style.display = "block"
  }

  hide() {
    this.dialogTarget.style.display = "none"
  }

  hideOnClickOutside({ target }) {
    if (this.dialogTarget == target) {
      this.hide()
    }
  }

  itemSelected({ target }) {
    this.hide()
    this.resultTarget.textContent = `${target.textContent} was selected`
  }
}
