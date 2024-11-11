import "../../javascript/vendor/turbo.js"
import { Application } from "../../javascript/vendor/stimulus.js"
import "../../javascript/vendor/strada.js"

// Controllers
import MenuController from "../../javascript/controllers/menu_controller.js"

// Bridge Components
import BridgeFormController from "../../javascript/controllers/bridge/form_controller.js"
import BridgeMenuController from "../../javascript/controllers/bridge/menu_controller.js"
import BridgeOverflowMenuController from "../../javascript/controllers/bridge/overflow_menu_controller.js"
import FormController from "../../javascript/controllers/form_controller.js"
import PopoverController from "../../javascript/controllers/popover_controller.js"
import NotificationController from "../../javascript/controllers/notification_controller.js"
import ModalController from "../../javascript/controllers/modal_controller.js";
import AccordionController from "../../javascript/controllers/accordion_controller.js";
import TabsController from "../../javascript/controllers/tabs_controller.js";


// Start Stimulus
window.Stimulus = Application.start()

// Register Controllers
Stimulus.register("menu", MenuController)

// Register Bridge Components
Stimulus.register("bridge--form", BridgeFormController)
Stimulus.register("bridge--menu", BridgeMenuController)
Stimulus.register("bridge--overflow-menu", BridgeOverflowMenuController)
Stimulus.register("form", FormController)
Stimulus.register("popover", PopoverController)
Stimulus.register("notification", NotificationController)
Stimulus.register("modal", ModalController);
Stimulus.register("accordion", AccordionController);
Stimulus.register("tabs", TabsController);
