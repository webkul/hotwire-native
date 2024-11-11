import {
    Controller as e
} from "./stimulus.js";
var t, s = Object.defineProperty,
    n = class {
        constructor(e) {
            this.element = e
        }
        get title() {
            return (this.bridgeAttribute("title") || this.attribute("aria-label") || this.element.textContent || this.element.value).trim()
        }
        get enabled() {
            return !this.disabled
        }
        get disabled() {
            const e = this.bridgeAttribute("disabled");
            return "true" === e || e === this.platform
        }
        enableForComponent(e) {
            e.enabled && this.removeBridgeAttribute("disabled")
        }
        hasClass(e) {
            return this.element.classList.contains(e)
        }
        attribute(e) {
            return this.element.getAttribute(e)
        }
        bridgeAttribute(e) {
            return this.attribute(`data-bridge-${e}`)
        }
        setBridgeAttribute(e, t) {
            this.element.setAttribute(`data-bridge-${e}`, t)
        }
        removeBridgeAttribute(e) {
            this.element.removeAttribute(`data-bridge-${e}`)
        }
        click() {
            "android" == this.platform && this.element.removeAttribute("target"), this.element.click()
        }
        get platform() {
            return document.documentElement.dataset.bridgePlatform
        }
    },
    {
        userAgent: a
    } = window.navigator,
    i = /bridge-components: \[.+\]/.test(a),
    r = class extends e {
        static get shouldLoad() {
            return i
        }
        pendingMessageCallbacks = [];
        initialize() {
            this.pendingMessageCallbacks = []
        }
        connect() { }
        disconnect() {
            this.removePendingCallbacks(), this.removePendingMessages()
        }
        get component() {
            return this.constructor.component
        }
        get platformOptingOut() {
            const {
                bridgePlatform: e
            } = document.documentElement.dataset;
            return this.identifier == this.element.getAttribute(`data-controller-optout-${e}`)
        }
        get enabled() {
            return !this.platformOptingOut && this.bridge.supportsComponent(this.component)
        }
        send(e, t = {}, s) {
            t.metadata = {
                url: window.location.href
            };
            const n = {
                component: this.component,
                event: e,
                data: t,
                callback: s
            },
                a = this.bridge.send(n);
            s && this.pendingMessageCallbacks.push(a)
        }
        removePendingCallbacks() {
            this.pendingMessageCallbacks.forEach((e => this.bridge.removeCallbackFor(e)))
        }
        removePendingMessages() {
            this.bridge.removePendingMessagesFor(this.component)
        }
        get bridgeElement() {
            return new n(this.element)
        }
        get bridge() {
            return window.Strada.web
        }
    };
if (((e, t, n) => {
    t in e ? s(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n
})(r, "symbol" != typeof (t = "component") ? t + "" : t, ""), !window.Strada) {
    const e = new class {
        #e;
        #t;
        #s;
        #n;
        constructor() {
            this.#e = null, this.#t = 0, this.#s = [], this.#n = new Map
        }
        start() {
            this.notifyApplicationAfterStart()
        }
        notifyApplicationAfterStart() {
            document.dispatchEvent(new Event("web-bridge:ready"))
        }
        supportsComponent(e) {
            return !!this.#e && this.#e.supportsComponent(e)
        }
        send({
            component: e,
            event: t,
            data: s,
            callback: n
        }) {
            if (!this.#e) return this.#a({
                component: e,
                event: t,
                data: s,
                callback: n
            }), null;
            if (!this.supportsComponent(e)) return null;
            const a = this.generateMessageId(),
                i = {
                    id: a,
                    component: e,
                    event: t,
                    data: s || {}
                };
            return this.#e.receive(i), n && this.#n.set(a, n), a
        }
        receive(e) {
            this.executeCallbackFor(e)
        }
        executeCallbackFor(e) {
            const t = this.#n.get(e.id);
            t && t(e)
        }
        removeCallbackFor(e) {
            this.#n.has(e) && this.#n.delete(e)
        }
        removePendingMessagesFor(e) {
            this.#s = this.#s.filter((t => t.component != e))
        }
        generateMessageId() {
            return (++this.#t).toString()
        }
        setAdapter(e) {
            this.#e = e, document.documentElement.dataset.bridgePlatform = this.#e.platform, this.adapterDidUpdateSupportedComponents(), this.#i()
        }
        adapterDidUpdateSupportedComponents() {
            this.#e && (document.documentElement.dataset.bridgeComponents = this.#e.supportedComponents.join(" "))
        }
        #a(e) {
            this.#s.push(e)
        }
        #i() {
            this.#s.forEach((e => this.send(e))), this.#s = []
        }
    };
    window.Strada = {
        web: e
    }, e.start()
}
export {
    r as BridgeComponent, n as BridgeElement
};
export default null;
//# sourceMappingURL=/sm/3593d0d2e0b2bac5af6dff46b215d93c177de5453096a5fa28c5c694107cb0b6.map
