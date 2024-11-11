! function (e) {
    function t(e, t, s) {
        throw new e("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + t + ".", s)
    }
    "function" != typeof e.requestSubmit && (e.requestSubmit = function (e) {
        e ? (! function (e, s) {
            e instanceof HTMLElement || t(TypeError, "parameter 1 is not of type 'HTMLElement'"), "submit" == e.type || t(TypeError, "The specified element is not a submit button"), e.form == s || t(DOMException, "The specified element is not owned by this form element", "NotFoundError")
        }(e, this), e.click()) : ((e = document.createElement("input")).type = "submit", e.hidden = !0, this.appendChild(e), e.click(), this.removeChild(e))
    })
}(HTMLFormElement.prototype);
const e = new WeakMap;

function t(t) {
    const s = function (e) {
        const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null,
            s = t ? t.closest("input, button") : null;
        return "submit" == s?.type ? s : null
    }(t.target);
    s && s.form && e.set(s.form, s)
} ! function () {
    if ("submitter" in Event.prototype) return;
    let s = window.Event.prototype;
    if ("SubmitEvent" in window) {
        const e = window.SubmitEvent.prototype;
        if (!/Apple Computer/.test(navigator.vendor) || "submitter" in e) return;
        s = e
    }
    addEventListener("click", t, !0), Object.defineProperty(s, "submitter", {
        get() {
            if ("submit" == this.type && this.target instanceof HTMLFormElement) return e.get(this.target)
        }
    })
}();
const s = {
    eager: "eager",
    lazy: "lazy"
};
class r extends HTMLElement {
    static delegateConstructor = void 0;
    loaded = Promise.resolve();
    static get observedAttributes() {
        return ["disabled", "complete", "loading", "src"]
    }
    constructor() {
        super(), this.delegate = new r.delegateConstructor(this)
    }
    connectedCallback() {
        this.delegate.connect()
    }
    disconnectedCallback() {
        this.delegate.disconnect()
    }
    reload() {
        return this.delegate.sourceURLReloaded()
    }
    attributeChangedCallback(e) {
        "loading" == e ? this.delegate.loadingStyleChanged() : "complete" == e ? this.delegate.completeChanged() : "src" == e ? this.delegate.sourceURLChanged() : this.delegate.disabledChanged()
    }
    get src() {
        return this.getAttribute("src")
    }
    set src(e) {
        e ? this.setAttribute("src", e) : this.removeAttribute("src")
    }
    get refresh() {
        return this.getAttribute("refresh")
    }
    set refresh(e) {
        e ? this.setAttribute("refresh", e) : this.removeAttribute("refresh")
    }
    get loading() {
        return function (e) {
            if ("lazy" === e.toLowerCase()) return s.lazy;
            return s.eager
        }(this.getAttribute("loading") || "")
    }
    set loading(e) {
        e ? this.setAttribute("loading", e) : this.removeAttribute("loading")
    }
    get disabled() {
        return this.hasAttribute("disabled")
    }
    set disabled(e) {
        e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled")
    }
    get autoscroll() {
        return this.hasAttribute("autoscroll")
    }
    set autoscroll(e) {
        e ? this.setAttribute("autoscroll", "") : this.removeAttribute("autoscroll")
    }
    get complete() {
        return !this.delegate.isLoading
    }
    get isActive() {
        return this.ownerDocument === document && !this.isPreview
    }
    get isPreview() {
        return this.ownerDocument?.documentElement?.hasAttribute("data-turbo-preview")
    }
}

function i(e) {
    return new URL(e.toString(), document.baseURI)
}

function n(e) {
    let t;
    return e.hash ? e.hash.slice(1) : (t = e.href.match(/#(.*)$/)) ? t[1] : void 0
}

function o(e, t) {
    return i(t?.getAttribute("formaction") || e.getAttribute("action") || e.action)
}

function a(e) {
    return (function (e) {
        return function (e) {
            return e.pathname.split("/").slice(1)
        }(e).slice(-1)[0]
    }(e).match(/\.[^.]*$/) || [])[0] || ""
}

function l(e, t) {
    const s = function (e) {
        return t = e.origin + e.pathname, t.endsWith("/") ? t : t + "/";
        var t
    }(t);
    return e.href === i(s).href || e.href.startsWith(s)
}

function h(e, t) {
    return l(e, t) && !!a(e).match(/^(?:|\.(?:htm|html|xhtml|php))$/)
}

function c(e) {
    const t = n(e);
    return null != t ? e.href.slice(0, -(t.length + 1)) : e.href
}

function d(e) {
    return c(e)
}
class u {
    constructor(e) {
        this.response = e
    }
    get succeeded() {
        return this.response.ok
    }
    get failed() {
        return !this.succeeded
    }
    get clientError() {
        return this.statusCode >= 400 && this.statusCode <= 499
    }
    get serverError() {
        return this.statusCode >= 500 && this.statusCode <= 599
    }
    get redirected() {
        return this.response.redirected
    }
    get location() {
        return i(this.response.url)
    }
    get isHTML() {
        return this.contentType && this.contentType.match(/^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/)
    }
    get statusCode() {
        return this.response.status
    }
    get contentType() {
        return this.header("Content-Type")
    }
    get responseText() {
        return this.response.clone().text()
    }
    get responseHTML() {
        return this.isHTML ? this.response.clone().text() : Promise.resolve(void 0)
    }
    header(e) {
        return this.response.headers.get(e)
    }
}

function m(e) {
    if ("false" == e.getAttribute("data-turbo-eval")) return e;
    {
        const t = document.createElement("script"),
            s = P("csp-nonce");
        return s && (t.nonce = s), t.textContent = e.textContent, t.async = !1,
            function (e, t) {
                for (const {
                    name: s,
                    value: r
                }
                    of t.attributes) e.setAttribute(s, r)
            }(t, e), t
    }
}

function p(e, {
    target: t,
    cancelable: s,
    detail: r
} = {}) {
    const i = new CustomEvent(e, {
        cancelable: s,
        bubbles: !0,
        composed: !0,
        detail: r
    });
    return t && t.isConnected ? t.dispatchEvent(i) : document.documentElement.dispatchEvent(i), i
}

function f() {
    return "hidden" === document.visibilityState ? b() : g()
}

function g() {
    return new Promise((e => requestAnimationFrame((() => e()))))
}

function b() {
    return new Promise((e => setTimeout((() => e()), 0)))
}

function v(e = "") {
    return (new DOMParser).parseFromString(e, "text/html")
}

function w(e, ...t) {
    const s = function (e, t) {
        return e.reduce(((e, s, r) => e + s + (null == t[r] ? "" : t[r])), "")
    }(e, t).replace(/^\n/, "").split("\n"),
        r = s[0].match(/^\s+/),
        i = r ? r[0].length : 0;
    return s.map((e => e.slice(i))).join("\n")
}

function S() {
    return Array.from({
        length: 36
    }).map(((e, t) => 8 == t || 13 == t || 18 == t || 23 == t ? "-" : 14 == t ? "4" : 19 == t ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(15 * Math.random()).toString(16))).join("")
}

function E(e, ...t) {
    for (const s of t.map((t => t?.getAttribute(e))))
        if ("string" == typeof s) return s;
    return null
}

function y(...e) {
    for (const t of e) "turbo-frame" == t.localName && t.setAttribute("busy", ""), t.setAttribute("aria-busy", "true")
}

function R(...e) {
    for (const t of e) "turbo-frame" == t.localName && t.removeAttribute("busy"), t.removeAttribute("aria-busy")
}

function L(e, t = 2e3) {
    return new Promise((s => {
        const r = () => {
            e.removeEventListener("error", r), e.removeEventListener("load", r), s()
        };
        e.addEventListener("load", r, {
            once: !0
        }), e.addEventListener("error", r, {
            once: !0
        }), setTimeout(s, t)
    }))
}

function A(e) {
    switch (e) {
        case "replace":
            return history.replaceState;
        case "advance":
        case "restore":
            return history.pushState
    }
}

function T(...e) {
    const t = E("data-turbo-action", ...e);
    return function (e) {
        return "advance" == e || "replace" == e || "restore" == e
    }(t) ? t : null
}

function C(e) {
    return document.querySelector(`meta[name="${e}"]`)
}

function P(e) {
    const t = C(e);
    return t && t.content
}

function k(e, t) {
    if (e instanceof Element) return e.closest(t) || k(e.assignedSlot || e.getRootNode()?.host, t)
}

function M(e) {
    return !!e && null == e.closest("[inert], :disabled, [hidden], details:not([open]), dialog:not([open])") && "function" == typeof e.focus
}

function F(e) {
    return Array.from(e.querySelectorAll("[autofocus]")).find(M)
}

function I(e) {
    return i(e.getAttribute("href") || "")
}
class q extends Set {
    constructor(e) {
        super(), this.maxSize = e
    }
    add(e) {
        if (this.size >= this.maxSize) {
            const e = this.values().next().value;
            this.delete(e)
        }
        super.add(e)
    }
}
const H = new q(20),
    B = window.fetch;

function N(e, t = {}) {
    const s = new Headers(t.headers || {}),
        r = S();
    return H.add(r), s.append("X-Turbo-Request-Id", r), B(e, {
        ...t,
        headers: s
    })
}

function O(e) {
    switch (e.toLowerCase()) {
        case "get":
            return V.get;
        case "post":
            return V.post;
        case "put":
            return V.put;
        case "patch":
            return V.patch;
        case "delete":
            return V.delete
    }
}
const V = {
    get: "get",
    post: "post",
    put: "put",
    patch: "patch",
    delete: "delete"
};

function x(e) {
    switch (e.toLowerCase()) {
        case D.multipart:
            return D.multipart;
        case D.plain:
            return D.plain;
        default:
            return D.urlEncoded
    }
}
const D = {
    urlEncoded: "application/x-www-form-urlencoded",
    multipart: "multipart/form-data",
    plain: "text/plain"
};
class W {
    abortController = new AbortController;
    #e = e => { };
    constructor(e, t, s, r = new URLSearchParams, n = null, o = D.urlEncoded) {
        const [a, l] = $(i(s), t, r, o);
        this.delegate = e, this.url = a, this.target = n, this.fetchOptions = {
            credentials: "same-origin",
            redirect: "follow",
            method: t,
            headers: {
                ...this.defaultHeaders
            },
            body: l,
            signal: this.abortSignal,
            referrer: this.delegate.referrer?.href
        }, this.enctype = o
    }
    get method() {
        return this.fetchOptions.method
    }
    set method(e) {
        const t = this.isSafe ? this.url.searchParams : this.fetchOptions.body || new FormData,
            s = O(e) || V.get;
        this.url.search = "";
        const [r, i] = $(this.url, s, t, this.enctype);
        this.url = r, this.fetchOptions.body = i, this.fetchOptions.method = s
    }
    get headers() {
        return this.fetchOptions.headers
    }
    set headers(e) {
        this.fetchOptions.headers = e
    }
    get body() {
        return this.isSafe ? this.url.searchParams : this.fetchOptions.body
    }
    set body(e) {
        this.fetchOptions.body = e
    }
    get location() {
        return this.url
    }
    get params() {
        return this.url.searchParams
    }
    get entries() {
        return this.body ? Array.from(this.body.entries()) : []
    }
    cancel() {
        this.abortController.abort()
    }
    async perform() {
        const {
            fetchOptions: e
        } = this;
        this.delegate.prepareRequest(this);
        const t = await this.#t(e);
        try {
            this.delegate.requestStarted(this), t.detail.fetchRequest ? this.response = t.detail.fetchRequest.response : this.response = N(this.url.href, e);
            const s = await this.response;
            return await this.receive(s)
        } catch (e) {
            if ("AbortError" !== e.name) throw this.#s(e) && this.delegate.requestErrored(this, e), e
        } finally {
            this.delegate.requestFinished(this)
        }
    }
    async receive(e) {
        const t = new u(e);
        return p("turbo:before-fetch-response", {
            cancelable: !0,
            detail: {
                fetchResponse: t
            },
            target: this.target
        }).defaultPrevented ? this.delegate.requestPreventedHandlingResponse(this, t) : t.succeeded ? this.delegate.requestSucceededWithResponse(this, t) : this.delegate.requestFailedWithResponse(this, t), t
    }
    get defaultHeaders() {
        return {
            Accept: "text/html, application/xhtml+xml"
        }
    }
    get isSafe() {
        return U(this.method)
    }
    get abortSignal() {
        return this.abortController.signal
    }
    acceptResponseType(e) {
        this.headers.Accept = [e, this.headers.Accept].join(", ")
    }
    async #t(e) {
        const t = new Promise((e => this.#e = e)),
            s = p("turbo:before-fetch-request", {
                cancelable: !0,
                detail: {
                    fetchOptions: e,
                    url: this.url,
                    resume: this.#e
                },
                target: this.target
            });
        return this.url = s.detail.url, s.defaultPrevented && await t, s
    }
    #s(e) {
        return !p("turbo:fetch-request-error", {
            target: this.target,
            cancelable: !0,
            detail: {
                request: this,
                error: e
            }
        }).defaultPrevented
    }
}

function U(e) {
    return O(e) == V.get
}

function $(e, t, s, r) {
    const i = Array.from(s).length > 0 ? new URLSearchParams(j(s)) : e.searchParams;
    return U(t) ? [z(e, i), null] : r == D.urlEncoded ? [e, i] : [e, s]
}

function j(e) {
    const t = [];
    for (const [s, r] of e) r instanceof File || t.push([s, r]);
    return t
}

function z(e, t) {
    const s = new URLSearchParams(j(t));
    return e.search = s.toString(), e
}
class _ {
    started = !1;
    constructor(e, t) {
        this.delegate = e, this.element = t, this.intersectionObserver = new IntersectionObserver(this.intersect)
    }
    start() {
        this.started || (this.started = !0, this.intersectionObserver.observe(this.element))
    }
    stop() {
        this.started && (this.started = !1, this.intersectionObserver.unobserve(this.element))
    }
    intersect = e => {
        const t = e.slice(-1)[0];
        t?.isIntersecting && this.delegate.elementAppearedInViewport(this.element)
    }
}
class X {
    static contentType = "text/vnd.turbo-stream.html";
    static wrap(e) {
        return "string" == typeof e ? new this(function (e) {
            const t = document.createElement("template");
            return t.innerHTML = e, t.content
        }(e)) : e
    }
    constructor(e) {
        this.fragment = function (e) {
            for (const t of e.querySelectorAll("turbo-stream")) {
                const e = document.importNode(t, !0);
                for (const t of e.templateElement.content.querySelectorAll("script")) t.replaceWith(m(t));
                t.replaceWith(e)
            }
            return e
        }(e)
    }
}
const K = new class {
    #r = null;
    #i = null;
    get(e) {
        if (this.#i && this.#i.url === e && this.#i.expire > Date.now()) return this.#i.request
    }
    setLater(e, t, s) {
        this.clear(), this.#r = setTimeout((() => {
            t.perform(), this.set(e, t, s), this.#r = null
        }), 100)
    }
    set(e, t, s) {
        this.#i = {
            url: e,
            request: t,
            expire: new Date((new Date).getTime() + s)
        }
    }
    clear() {
        this.#r && clearTimeout(this.#r), this.#i = null
    }
},
    Q = {
        initialized: "initialized",
        requesting: "requesting",
        waiting: "waiting",
        receiving: "receiving",
        stopping: "stopping",
        stopped: "stopped"
    };
class Y {
    state = Q.initialized;
    static confirmMethod(e, t, s) {
        return Promise.resolve(confirm(e))
    }
    constructor(e, t, s, r = !1) {
        const n = function (e, t) {
            const s = t?.getAttribute("formmethod") || e.getAttribute("method") || "";
            return O(s.toLowerCase()) || V.get
        }(t, s),
            o = function (e, t) {
                const s = i(e);
                U(t) && (s.search = "");
                return s
            }(function (e, t) {
                const s = "string" == typeof e.action ? e.action : null;
                return t?.hasAttribute("formaction") ? t.getAttribute("formaction") || "" : e.getAttribute("action") || s || ""
            }(t, s), n),
            a = function (e, t) {
                const s = new FormData(e),
                    r = t?.getAttribute("name"),
                    i = t?.getAttribute("value");
                r && s.append(r, i || "");
                return s
            }(t, s),
            l = function (e, t) {
                return x(t?.getAttribute("formenctype") || e.enctype)
            }(t, s);
        this.delegate = e, this.formElement = t, this.submitter = s, this.fetchRequest = new W(this, n, o, a, t, l), this.mustRedirect = r
    }
    get method() {
        return this.fetchRequest.method
    }
    set method(e) {
        this.fetchRequest.method = e
    }
    get action() {
        return this.fetchRequest.url.toString()
    }
    set action(e) {
        this.fetchRequest.url = i(e)
    }
    get body() {
        return this.fetchRequest.body
    }
    get enctype() {
        return this.fetchRequest.enctype
    }
    get isSafe() {
        return this.fetchRequest.isSafe
    }
    get location() {
        return this.fetchRequest.url
    }
    async start() {
        const {
            initialized: e,
            requesting: t
        } = Q, s = E("data-turbo-confirm", this.submitter, this.formElement);
        if ("string" == typeof s) {
            if (!await Y.confirmMethod(s, this.formElement, this.submitter)) return
        }
        if (this.state == e) return this.state = t, this.fetchRequest.perform()
    }
    stop() {
        const {
            stopping: e,
            stopped: t
        } = Q;
        if (this.state != e && this.state != t) return this.state = e, this.fetchRequest.cancel(), !0
    }
    prepareRequest(e) {
        if (!e.isSafe) {
            const t = function (e) {
                if (null != e) {
                    const t = (document.cookie ? document.cookie.split("; ") : []).find((t => t.startsWith(e)));
                    if (t) {
                        const e = t.split("=").slice(1).join("=");
                        return e ? decodeURIComponent(e) : void 0
                    }
                }
            }(P("csrf-param")) || P("csrf-token");
            t && (e.headers["X-CSRF-Token"] = t)
        }
        this.requestAcceptsTurboStreamResponse(e) && e.acceptResponseType(X.contentType)
    }
    requestStarted(e) {
        this.state = Q.waiting, this.submitter?.setAttribute("disabled", ""), this.setSubmitsWith(), y(this.formElement), p("turbo:submit-start", {
            target: this.formElement,
            detail: {
                formSubmission: this
            }
        }), this.delegate.formSubmissionStarted(this)
    }
    requestPreventedHandlingResponse(e, t) {
        K.clear(), this.result = {
            success: t.succeeded,
            fetchResponse: t
        }
    }
    requestSucceededWithResponse(e, t) {
        if (t.clientError || t.serverError) this.delegate.formSubmissionFailedWithResponse(this, t);
        else if (K.clear(), this.requestMustRedirect(e) && function (e) {
            return 200 == e.statusCode && !e.redirected
        }(t)) {
            const e = new Error("Form responses must redirect to another location");
            this.delegate.formSubmissionErrored(this, e)
        } else this.state = Q.receiving, this.result = {
            success: !0,
            fetchResponse: t
        }, this.delegate.formSubmissionSucceededWithResponse(this, t)
    }
    requestFailedWithResponse(e, t) {
        this.result = {
            success: !1,
            fetchResponse: t
        }, this.delegate.formSubmissionFailedWithResponse(this, t)
    }
    requestErrored(e, t) {
        this.result = {
            success: !1,
            error: t
        }, this.delegate.formSubmissionErrored(this, t)
    }
    requestFinished(e) {
        this.state = Q.stopped, this.submitter?.removeAttribute("disabled"), this.resetSubmitterText(), R(this.formElement), p("turbo:submit-end", {
            target: this.formElement,
            detail: {
                formSubmission: this,
                ...this.result
            }
        }), this.delegate.formSubmissionFinished(this)
    }
    setSubmitsWith() {
        if (this.submitter && this.submitsWith)
            if (this.submitter.matches("button")) this.originalSubmitText = this.submitter.innerHTML, this.submitter.innerHTML = this.submitsWith;
            else if (this.submitter.matches("input")) {
                const e = this.submitter;
                this.originalSubmitText = e.value, e.value = this.submitsWith
            }
    }
    resetSubmitterText() {
        if (this.submitter && this.originalSubmitText)
            if (this.submitter.matches("button")) this.submitter.innerHTML = this.originalSubmitText;
            else if (this.submitter.matches("input")) {
                this.submitter.value = this.originalSubmitText
            }
    }
    requestMustRedirect(e) {
        return !e.isSafe && this.mustRedirect
    }
    requestAcceptsTurboStreamResponse(e) {
        return !e.isSafe || function (e, ...t) {
            return t.some((t => t && t.hasAttribute(e)))
        }("data-turbo-stream", this.submitter, this.formElement)
    }
    get submitsWith() {
        return this.submitter?.getAttribute("data-turbo-submits-with")
    }
}
class J {
    constructor(e) {
        this.element = e
    }
    get activeElement() {
        return this.element.ownerDocument.activeElement
    }
    get children() {
        return [...this.element.children]
    }
    hasAnchor(e) {
        return null != this.getElementForAnchor(e)
    }
    getElementForAnchor(e) {
        return e ? this.element.querySelector(`[id='${e}'], a[name='${e}']`) : null
    }
    get isConnected() {
        return this.element.isConnected
    }
    get firstAutofocusableElement() {
        return F(this.element)
    }
    get permanentElements() {
        return Z(this.element)
    }
    getPermanentElementById(e) {
        return G(this.element, e)
    }
    getPermanentElementMapForSnapshot(e) {
        const t = {};
        for (const s of this.permanentElements) {
            const {
                id: r
            } = s, i = e.getPermanentElementById(r);
            i && (t[r] = [s, i])
        }
        return t
    }
}

function G(e, t) {
    return e.querySelector(`#${t}[data-turbo-permanent]`)
}

function Z(e) {
    return e.querySelectorAll("[id][data-turbo-permanent]")
}
class ee {
    started = !1;
    constructor(e, t) {
        this.delegate = e, this.eventTarget = t
    }
    start() {
        this.started || (this.eventTarget.addEventListener("submit", this.submitCaptured, !0), this.started = !0)
    }
    stop() {
        this.started && (this.eventTarget.removeEventListener("submit", this.submitCaptured, !0), this.started = !1)
    }
    submitCaptured = () => {
        this.eventTarget.removeEventListener("submit", this.submitBubbled, !1), this.eventTarget.addEventListener("submit", this.submitBubbled, !1)
    };
    submitBubbled = e => {
        if (!e.defaultPrevented) {
            const t = e.target instanceof HTMLFormElement ? e.target : void 0,
                s = e.submitter || void 0;
            t && function (e, t) {
                const s = t?.getAttribute("formmethod") || e.getAttribute("method");
                return "dialog" != s
            }(t, s) && function (e, t) {
                if (t?.hasAttribute("formtarget") || e.hasAttribute("target")) {
                    const s = t?.getAttribute("formtarget") || e.target;
                    for (const e of document.getElementsByName(s))
                        if (e instanceof HTMLIFrameElement) return !1;
                    return !0
                }
                return !0
            }(t, s) && this.delegate.willSubmitForm(t, s) && (e.preventDefault(), e.stopImmediatePropagation(), this.delegate.formSubmitted(t, s))
        }
    }
}
class te {
    #n = e => { };
    #o = e => { };
    constructor(e, t) {
        this.delegate = e, this.element = t
    }
    scrollToAnchor(e) {
        const t = this.snapshot.getElementForAnchor(e);
        t ? (this.scrollToElement(t), this.focusElement(t)) : this.scrollToPosition({
            x: 0,
            y: 0
        })
    }
    scrollToAnchorFromLocation(e) {
        this.scrollToAnchor(n(e))
    }
    scrollToElement(e) {
        e.scrollIntoView()
    }
    focusElement(e) {
        e instanceof HTMLElement && (e.hasAttribute("tabindex") ? e.focus() : (e.setAttribute("tabindex", "-1"), e.focus(), e.removeAttribute("tabindex")))
    }
    scrollToPosition({
        x: e,
        y: t
    }) {
        this.scrollRoot.scrollTo(e, t)
    }
    scrollToTop() {
        this.scrollToPosition({
            x: 0,
            y: 0
        })
    }
    get scrollRoot() {
        return window
    }
    async render(e) {
        const {
            isPreview: t,
            shouldRender: s,
            willRender: r,
            newSnapshot: i
        } = e, n = r;
        if (s) try {
            this.renderPromise = new Promise((e => this.#n = e)), this.renderer = e, await this.prepareToRenderSnapshot(e);
            const s = new Promise((e => this.#o = e)),
                r = {
                    resume: this.#o,
                    render: this.renderer.renderElement,
                    renderMethod: this.renderer.renderMethod
                };
            this.delegate.allowsImmediateRender(i, r) || await s, await this.renderSnapshot(e), this.delegate.viewRenderedSnapshot(i, t, this.renderer.renderMethod), this.delegate.preloadOnLoadLinksForView(this.element), this.finishRenderingSnapshot(e)
        } finally {
                delete this.renderer, this.#n(void 0), delete this.renderPromise
            } else n && this.invalidate(e.reloadReason)
    }
    invalidate(e) {
        this.delegate.viewInvalidated(e)
    }
    async prepareToRenderSnapshot(e) {
        this.markAsPreview(e.isPreview), await e.prepareToRender()
    }
    markAsPreview(e) {
        e ? this.element.setAttribute("data-turbo-preview", "") : this.element.removeAttribute("data-turbo-preview")
    }
    markVisitDirection(e) {
        this.element.setAttribute("data-turbo-visit-direction", e)
    }
    unmarkVisitDirection() {
        this.element.removeAttribute("data-turbo-visit-direction")
    }
    async renderSnapshot(e) {
        await e.render()
    }
    finishRenderingSnapshot(e) {
        e.finishRendering()
    }
}
class se extends te {
    missing() {
        this.element.innerHTML = '<strong class="turbo-frame-error">Content missing</strong>'
    }
    get snapshot() {
        return new J(this.element)
    }
}
class re {
    constructor(e, t) {
        this.delegate = e, this.element = t
    }
    start() {
        this.element.addEventListener("click", this.clickBubbled), document.addEventListener("turbo:click", this.linkClicked), document.addEventListener("turbo:before-visit", this.willVisit)
    }
    stop() {
        this.element.removeEventListener("click", this.clickBubbled), document.removeEventListener("turbo:click", this.linkClicked), document.removeEventListener("turbo:before-visit", this.willVisit)
    }
    clickBubbled = e => {
        this.respondsToEventTarget(e.target) ? this.clickEvent = e : delete this.clickEvent
    };
    linkClicked = e => {
        this.clickEvent && this.respondsToEventTarget(e.target) && e.target instanceof Element && this.delegate.shouldInterceptLinkClick(e.target, e.detail.url, e.detail.originalEvent) && (this.clickEvent.preventDefault(), e.preventDefault(), this.delegate.linkClickIntercepted(e.target, e.detail.url, e.detail.originalEvent)), delete this.clickEvent
    };
    willVisit = e => {
        delete this.clickEvent
    };
    respondsToEventTarget(e) {
        const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
        return t && t.closest("turbo-frame, html") == this.element
    }
}
class ie {
    started = !1;
    constructor(e, t) {
        this.delegate = e, this.eventTarget = t
    }
    start() {
        this.started || (this.eventTarget.addEventListener("click", this.clickCaptured, !0), this.started = !0)
    }
    stop() {
        this.started && (this.eventTarget.removeEventListener("click", this.clickCaptured, !0), this.started = !1)
    }
    clickCaptured = () => {
        this.eventTarget.removeEventListener("click", this.clickBubbled, !1), this.eventTarget.addEventListener("click", this.clickBubbled, !1)
    };
    clickBubbled = e => {
        if (e instanceof MouseEvent && this.clickEventIsSignificant(e)) {
            const t = function (e) {
                return k(e, "a[href]:not([target^=_]):not([download])")
            }(e.composedPath && e.composedPath()[0] || e.target);
            if (t && function (e) {
                if (e.hasAttribute("target"))
                    for (const t of document.getElementsByName(e.target))
                        if (t instanceof HTMLIFrameElement) return !1;
                return !0
            }(t)) {
                const s = I(t);
                this.delegate.willFollowLinkToLocation(t, s, e) && (e.preventDefault(), this.delegate.followedLinkToLocation(t, s))
            }
        }
    };
    clickEventIsSignificant(e) {
        return !(e.target && e.target.isContentEditable || e.defaultPrevented || e.which > 1 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
    }
}
class ne {
    constructor(e, t) {
        this.delegate = e, this.linkInterceptor = new ie(this, t)
    }
    start() {
        this.linkInterceptor.start()
    }
    stop() {
        this.linkInterceptor.stop()
    }
    canPrefetchRequestToLocation(e, t) {
        return !1
    }
    prefetchAndCacheRequestToLocation(e, t) { }
    willFollowLinkToLocation(e, t, s) {
        return this.delegate.willSubmitFormLinkToLocation(e, t, s) && (e.hasAttribute("data-turbo-method") || e.hasAttribute("data-turbo-stream"))
    }
    followedLinkToLocation(e, t) {
        const s = document.createElement("form");
        for (const [e, r] of t.searchParams) s.append(Object.assign(document.createElement("input"), {
            type: "hidden",
            name: e,
            value: r
        }));
        const r = Object.assign(t, {
            search: ""
        });
        s.setAttribute("data-turbo", "true"), s.setAttribute("action", r.href), s.setAttribute("hidden", "");
        const i = e.getAttribute("data-turbo-method");
        i && s.setAttribute("method", i);
        const n = e.getAttribute("data-turbo-frame");
        n && s.setAttribute("data-turbo-frame", n);
        const o = T(e);
        o && s.setAttribute("data-turbo-action", o);
        const a = e.getAttribute("data-turbo-confirm");
        a && s.setAttribute("data-turbo-confirm", a);
        e.hasAttribute("data-turbo-stream") && s.setAttribute("data-turbo-stream", ""), this.delegate.submittedFormLinkToLocation(e, t, s), document.body.appendChild(s), s.addEventListener("turbo:submit-end", (() => s.remove()), {
            once: !0
        }), requestAnimationFrame((() => s.requestSubmit()))
    }
}
class oe {
    static async preservingPermanentElements(e, t, s) {
        const r = new this(e, t);
        r.enter(), await s(), r.leave()
    }
    constructor(e, t) {
        this.delegate = e, this.permanentElementMap = t
    }
    enter() {
        for (const e in this.permanentElementMap) {
            const [t, s] = this.permanentElementMap[e];
            this.delegate.enteringBardo(t, s), this.replaceNewPermanentElementWithPlaceholder(s)
        }
    }
    leave() {
        for (const e in this.permanentElementMap) {
            const [t] = this.permanentElementMap[e];
            this.replaceCurrentPermanentElementWithClone(t), this.replacePlaceholderWithPermanentElement(t), this.delegate.leavingBardo(t)
        }
    }
    replaceNewPermanentElementWithPlaceholder(e) {
        const t = function (e) {
            const t = document.createElement("meta");
            return t.setAttribute("name", "turbo-permanent-placeholder"), t.setAttribute("content", e.id), t
        }(e);
        e.replaceWith(t)
    }
    replaceCurrentPermanentElementWithClone(e) {
        const t = e.cloneNode(!0);
        e.replaceWith(t)
    }
    replacePlaceholderWithPermanentElement(e) {
        const t = this.getPlaceholderById(e.id);
        t?.replaceWith(e)
    }
    getPlaceholderById(e) {
        return this.placeholders.find((t => t.content == e))
    }
    get placeholders() {
        return [...document.querySelectorAll("meta[name=turbo-permanent-placeholder][content]")]
    }
}
class ae {
    #a = null;
    constructor(e, t, s, r, i = !0) {
        this.currentSnapshot = e, this.newSnapshot = t, this.isPreview = r, this.willRender = i, this.renderElement = s, this.promise = new Promise(((e, t) => this.resolvingFunctions = {
            resolve: e,
            reject: t
        }))
    }
    get shouldRender() {
        return !0
    }
    get reloadReason() { }
    prepareToRender() { }
    render() { }
    finishRendering() {
        this.resolvingFunctions && (this.resolvingFunctions.resolve(), delete this.resolvingFunctions)
    }
    async preservingPermanentElements(e) {
        await oe.preservingPermanentElements(this, this.permanentElementMap, e)
    }
    focusFirstAutofocusableElement() {
        const e = this.connectedSnapshot.firstAutofocusableElement;
        e && e.focus()
    }
    enteringBardo(e) {
        this.#a || e.contains(this.currentSnapshot.activeElement) && (this.#a = this.currentSnapshot.activeElement)
    }
    leavingBardo(e) {
        e.contains(this.#a) && this.#a instanceof HTMLElement && (this.#a.focus(), this.#a = null)
    }
    get connectedSnapshot() {
        return this.newSnapshot.isConnected ? this.newSnapshot : this.currentSnapshot
    }
    get currentElement() {
        return this.currentSnapshot.element
    }
    get newElement() {
        return this.newSnapshot.element
    }
    get permanentElementMap() {
        return this.currentSnapshot.getPermanentElementMapForSnapshot(this.newSnapshot)
    }
    get renderMethod() {
        return "replace"
    }
}
class le extends ae {
    static renderElement(e, t) {
        const s = document.createRange();
        s.selectNodeContents(e), s.deleteContents();
        const r = t,
            i = r.ownerDocument?.createRange();
        i && (i.selectNodeContents(r), e.appendChild(i.extractContents()))
    }
    constructor(e, t, s, r, i, n = !0) {
        super(t, s, r, i, n), this.delegate = e
    }
    get shouldRender() {
        return !0
    }
    async render() {
        await f(), this.preservingPermanentElements((() => {
            this.loadFrameElement()
        })), this.scrollFrameIntoView(), await f(), this.focusFirstAutofocusableElement(), await f(), this.activateScriptElements()
    }
    loadFrameElement() {
        this.delegate.willRenderFrame(this.currentElement, this.newElement), this.renderElement(this.currentElement, this.newElement)
    }
    scrollFrameIntoView() {
        if (this.currentElement.autoscroll || this.newElement.autoscroll) {
            const s = this.currentElement.firstElementChild,
                r = (e = this.currentElement.getAttribute("data-autoscroll-block"), t = "end", "end" == e || "start" == e || "center" == e || "nearest" == e ? e : t),
                i = function (e, t) {
                    return "auto" == e || "smooth" == e ? e : t
                }(this.currentElement.getAttribute("data-autoscroll-behavior"), "auto");
            if (s) return s.scrollIntoView({
                block: r,
                behavior: i
            }), !0
        }
        var e, t;
        return !1
    }
    activateScriptElements() {
        for (const e of this.newScriptElements) {
            const t = m(e);
            e.replaceWith(t)
        }
    }
    get newScriptElements() {
        return this.currentElement.querySelectorAll("script")
    }
}
class he {
    static animationDuration = 300;
    static get defaultCSS() {
        return w`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 2147483647;
        transition:
          width ${he.animationDuration}ms ease-out,
          opacity ${he.animationDuration / 2}ms ${he.animationDuration / 2}ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `
    }
    hiding = !1;
    value = 0;
    visible = !1;
    constructor() {
        this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement(), this.installStylesheetElement(), this.setValue(0)
    }
    show() {
        this.visible || (this.visible = !0, this.installProgressElement(), this.startTrickling())
    }
    hide() {
        this.visible && !this.hiding && (this.hiding = !0, this.fadeProgressElement((() => {
            this.uninstallProgressElement(), this.stopTrickling(), this.visible = !1, this.hiding = !1
        })))
    }
    setValue(e) {
        this.value = e, this.refresh()
    }
    installStylesheetElement() {
        document.head.insertBefore(this.stylesheetElement, document.head.firstChild)
    }
    installProgressElement() {
        this.progressElement.style.width = "0", this.progressElement.style.opacity = "1", document.documentElement.insertBefore(this.progressElement, document.body), this.refresh()
    }
    fadeProgressElement(e) {
        this.progressElement.style.opacity = "0", setTimeout(e, 1.5 * he.animationDuration)
    }
    uninstallProgressElement() {
        this.progressElement.parentNode && document.documentElement.removeChild(this.progressElement)
    }
    startTrickling() {
        this.trickleInterval || (this.trickleInterval = window.setInterval(this.trickle, he.animationDuration))
    }
    stopTrickling() {
        window.clearInterval(this.trickleInterval), delete this.trickleInterval
    }
    trickle = () => {
        this.setValue(this.value + Math.random() / 100)
    };
    refresh() {
        requestAnimationFrame((() => {
            this.progressElement.style.width = 10 + 90 * this.value + "%"
        }))
    }
    createStylesheetElement() {
        const e = document.createElement("style");
        return e.type = "text/css", e.textContent = he.defaultCSS, this.cspNonce && (e.nonce = this.cspNonce), e
    }
    createProgressElement() {
        const e = document.createElement("div");
        return e.className = "turbo-progress-bar", e
    }
    get cspNonce() {
        return P("csp-nonce")
    }
}
class ce extends J {
    detailsByOuterHTML = this.children.filter((e => ! function (e) {
        const t = e.localName;
        return "noscript" == t
    }(e))).map((e => function (e) {
        e.hasAttribute("nonce") && e.setAttribute("nonce", "");
        return e
    }(e))).reduce(((e, t) => {
        const {
            outerHTML: s
        } = t, r = s in e ? e[s] : {
            type: de(t),
            tracked: ue(t),
            elements: []
        };
        return {
            ...e,
            [s]: {
                ...r,
                elements: [...r.elements, t]
            }
        }
    }), {});
    get trackedElementSignature() {
        return Object.keys(this.detailsByOuterHTML).filter((e => this.detailsByOuterHTML[e].tracked)).join("")
    }
    getScriptElementsNotInSnapshot(e) {
        return this.getElementsMatchingTypeNotInSnapshot("script", e)
    }
    getStylesheetElementsNotInSnapshot(e) {
        return this.getElementsMatchingTypeNotInSnapshot("stylesheet", e)
    }
    getElementsMatchingTypeNotInSnapshot(e, t) {
        return Object.keys(this.detailsByOuterHTML).filter((e => !(e in t.detailsByOuterHTML))).map((e => this.detailsByOuterHTML[e])).filter((({
            type: t
        }) => t == e)).map((({
            elements: [e]
        }) => e))
    }
    get provisionalElements() {
        return Object.keys(this.detailsByOuterHTML).reduce(((e, t) => {
            const {
                type: s,
                tracked: r,
                elements: i
            } = this.detailsByOuterHTML[t];
            return null != s || r ? i.length > 1 ? [...e, ...i.slice(1)] : e : [...e, ...i]
        }), [])
    }
    getMetaValue(e) {
        const t = this.findMetaElementByName(e);
        return t ? t.getAttribute("content") : null
    }
    findMetaElementByName(e) {
        return Object.keys(this.detailsByOuterHTML).reduce(((t, s) => {
            const {
                elements: [r]
            } = this.detailsByOuterHTML[s];
            return function (e, t) {
                const s = e.localName;
                return "meta" == s && e.getAttribute("name") == t
            }(r, e) ? r : t
        }), 0)
    }
}

function de(e) {
    return function (e) {
        const t = e.localName;
        return "script" == t
    }(e) ? "script" : function (e) {
        const t = e.localName;
        return "style" == t || "link" == t && "stylesheet" == e.getAttribute("rel")
    }(e) ? "stylesheet" : void 0
}

function ue(e) {
    return "reload" == e.getAttribute("data-turbo-track")
}
class me extends J {
    static fromHTMLString(e = "") {
        return this.fromDocument(v(e))
    }
    static fromElement(e) {
        return this.fromDocument(e.ownerDocument)
    }
    static fromDocument({
        documentElement: e,
        body: t,
        head: s
    }) {
        return new this(e, t, new ce(s))
    }
    constructor(e, t, s) {
        super(t), this.documentElement = e, this.headSnapshot = s
    }
    clone() {
        const e = this.element.cloneNode(!0),
            t = this.element.querySelectorAll("select"),
            s = e.querySelectorAll("select");
        for (const [e, r] of t.entries()) {
            const t = s[e];
            for (const e of t.selectedOptions) e.selected = !1;
            for (const e of r.selectedOptions) t.options[e.index].selected = !0
        }
        for (const t of e.querySelectorAll('input[type="password"]')) t.value = "";
        return new me(this.documentElement, e, this.headSnapshot)
    }
    get lang() {
        return this.documentElement.getAttribute("lang")
    }
    get headElement() {
        return this.headSnapshot.element
    }
    get rootLocation() {
        return i(this.getSetting("root") ?? "/")
    }
    get cacheControlValue() {
        return this.getSetting("cache-control")
    }
    get isPreviewable() {
        return "no-preview" != this.cacheControlValue
    }
    get isCacheable() {
        return "no-cache" != this.cacheControlValue
    }
    get isVisitable() {
        return "reload" != this.getSetting("visit-control")
    }
    get prefersViewTransitions() {
        return "same-origin" === this.headSnapshot.getMetaValue("view-transition")
    }
    get shouldMorphPage() {
        return "morph" === this.getSetting("refresh-method")
    }
    get shouldPreserveScrollPosition() {
        return "preserve" === this.getSetting("refresh-scroll")
    }
    getSetting(e) {
        return this.headSnapshot.getMetaValue(`turbo-${e}`)
    }
}
class pe {
    #l = !1;
    #h = Promise.resolve();
    renderChange(e, t) {
        return e && this.viewTransitionsAvailable && !this.#l ? (this.#l = !0, this.#h = this.#h.then((async () => {
            await document.startViewTransition(t).finished
        }))) : this.#h = this.#h.then(t), this.#h
    }
    get viewTransitionsAvailable() {
        return document.startViewTransition
    }
}
const fe = {
    action: "advance",
    historyChanged: !1,
    visitCachedSnapshot: () => { },
    willRender: !0,
    updateHistory: !0,
    shouldCacheSnapshot: !0,
    acceptsStreamResponse: !1
},
    ge = "visitStart",
    be = "requestStart",
    ve = "requestEnd",
    we = "visitEnd",
    Se = "initialized",
    Ee = "started",
    ye = "canceled",
    Re = "failed",
    Le = "completed",
    Ae = 0,
    Te = -1,
    Ce = -2,
    Pe = {
        advance: "forward",
        restore: "back",
        replace: "none"
    };
class ke {
    identifier = S();
    timingMetrics = {};
    followedRedirect = !1;
    historyChanged = !1;
    scrolled = !1;
    shouldCacheSnapshot = !0;
    acceptsStreamResponse = !1;
    snapshotCached = !1;
    state = Se;
    viewTransitioner = new pe;
    constructor(e, t, s, r = {}) {
        this.delegate = e, this.location = t, this.restorationIdentifier = s || S();
        const {
            action: i,
            historyChanged: n,
            referrer: o,
            snapshot: a,
            snapshotHTML: l,
            response: h,
            visitCachedSnapshot: c,
            willRender: d,
            updateHistory: u,
            shouldCacheSnapshot: m,
            acceptsStreamResponse: p,
            direction: f
        } = {
            ...fe,
            ...r
        };
        this.action = i, this.historyChanged = n, this.referrer = o, this.snapshot = a, this.snapshotHTML = l, this.response = h, this.isSamePage = this.delegate.locationWithActionIsSamePage(this.location, this.action), this.isPageRefresh = this.view.isPageRefresh(this), this.visitCachedSnapshot = c, this.willRender = d, this.updateHistory = u, this.scrolled = !d, this.shouldCacheSnapshot = m, this.acceptsStreamResponse = p, this.direction = f || Pe[i]
    }
    get adapter() {
        return this.delegate.adapter
    }
    get view() {
        return this.delegate.view
    }
    get history() {
        return this.delegate.history
    }
    get restorationData() {
        return this.history.getRestorationDataForIdentifier(this.restorationIdentifier)
    }
    get silent() {
        return this.isSamePage
    }
    start() {
        this.state == Se && (this.recordTimingMetric(ge), this.state = Ee, this.adapter.visitStarted(this), this.delegate.visitStarted(this))
    }
    cancel() {
        this.state == Ee && (this.request && this.request.cancel(), this.cancelRender(), this.state = ye)
    }
    complete() {
        this.state == Ee && (this.recordTimingMetric(we), this.adapter.visitCompleted(this), this.state = Le, this.followRedirect(), this.followedRedirect || this.delegate.visitCompleted(this))
    }
    fail() {
        this.state == Ee && (this.state = Re, this.adapter.visitFailed(this), this.delegate.visitCompleted(this))
    }
    changeHistory() {
        if (!this.historyChanged && this.updateHistory) {
            const e = A(this.location.href === this.referrer?.href ? "replace" : this.action);
            this.history.update(e, this.location, this.restorationIdentifier), this.historyChanged = !0
        }
    }
    issueRequest() {
        this.hasPreloadedResponse() ? this.simulateRequest() : this.shouldIssueRequest() && !this.request && (this.request = new W(this, V.get, this.location), this.request.perform())
    }
    simulateRequest() {
        this.response && (this.startRequest(), this.recordResponse(), this.finishRequest())
    }
    startRequest() {
        this.recordTimingMetric(be), this.adapter.visitRequestStarted(this)
    }
    recordResponse(e = this.response) {
        if (this.response = e, e) {
            const {
                statusCode: t
            } = e;
            Me(t) ? this.adapter.visitRequestCompleted(this) : this.adapter.visitRequestFailedWithStatusCode(this, t)
        }
    }
    finishRequest() {
        this.recordTimingMetric(ve), this.adapter.visitRequestFinished(this)
    }
    loadResponse() {
        if (this.response) {
            const {
                statusCode: e,
                responseHTML: t
            } = this.response;
            this.render((async () => {
                if (this.shouldCacheSnapshot && this.cacheSnapshot(), this.view.renderPromise && await this.view.renderPromise, Me(e) && null != t) {
                    const e = me.fromHTMLString(t);
                    await this.renderPageSnapshot(e, !1), this.adapter.visitRendered(this), this.complete()
                } else await this.view.renderError(me.fromHTMLString(t), this), this.adapter.visitRendered(this), this.fail()
            }))
        }
    }
    getCachedSnapshot() {
        const e = this.view.getCachedSnapshotForLocation(this.location) || this.getPreloadedSnapshot();
        if (e && (!n(this.location) || e.hasAnchor(n(this.location))) && ("restore" == this.action || e.isPreviewable)) return e
    }
    getPreloadedSnapshot() {
        if (this.snapshotHTML) return me.fromHTMLString(this.snapshotHTML)
    }
    hasCachedSnapshot() {
        return null != this.getCachedSnapshot()
    }
    loadCachedSnapshot() {
        const e = this.getCachedSnapshot();
        if (e) {
            const t = this.shouldIssueRequest();
            this.render((async () => {
                this.cacheSnapshot(), this.isSamePage || this.isPageRefresh ? this.adapter.visitRendered(this) : (this.view.renderPromise && await this.view.renderPromise, await this.renderPageSnapshot(e, t), this.adapter.visitRendered(this), t || this.complete())
            }))
        }
    }
    followRedirect() {
        this.redirectedToLocation && !this.followedRedirect && this.response?.redirected && (this.adapter.visitProposedToLocation(this.redirectedToLocation, {
            action: "replace",
            response: this.response,
            shouldCacheSnapshot: !1,
            willRender: !1
        }), this.followedRedirect = !0)
    }
    goToSamePageAnchor() {
        this.isSamePage && this.render((async () => {
            this.cacheSnapshot(), this.performScroll(), this.changeHistory(), this.adapter.visitRendered(this)
        }))
    }
    prepareRequest(e) {
        this.acceptsStreamResponse && e.acceptResponseType(X.contentType)
    }
    requestStarted() {
        this.startRequest()
    }
    requestPreventedHandlingResponse(e, t) { }
    async requestSucceededWithResponse(e, t) {
        const s = await t.responseHTML,
            {
                redirected: r,
                statusCode: i
            } = t;
        null == s ? this.recordResponse({
            statusCode: Ce,
            redirected: r
        }) : (this.redirectedToLocation = t.redirected ? t.location : void 0, this.recordResponse({
            statusCode: i,
            responseHTML: s,
            redirected: r
        }))
    }
    async requestFailedWithResponse(e, t) {
        const s = await t.responseHTML,
            {
                redirected: r,
                statusCode: i
            } = t;
        null == s ? this.recordResponse({
            statusCode: Ce,
            redirected: r
        }) : this.recordResponse({
            statusCode: i,
            responseHTML: s,
            redirected: r
        })
    }
    requestErrored(e, t) {
        this.recordResponse({
            statusCode: Ae,
            redirected: !1
        })
    }
    requestFinished() {
        this.finishRequest()
    }
    performScroll() {
        this.scrolled || this.view.forceReloaded || this.view.shouldPreserveScrollPosition(this) || ("restore" == this.action ? this.scrollToRestoredPosition() || this.scrollToAnchor() || this.view.scrollToTop() : this.scrollToAnchor() || this.view.scrollToTop(), this.isSamePage && this.delegate.visitScrolledToSamePageLocation(this.view.lastRenderedLocation, this.location), this.scrolled = !0)
    }
    scrollToRestoredPosition() {
        const {
            scrollPosition: e
        } = this.restorationData;
        if (e) return this.view.scrollToPosition(e), !0
    }
    scrollToAnchor() {
        const e = n(this.location);
        if (null != e) return this.view.scrollToAnchor(e), !0
    }
    recordTimingMetric(e) {
        this.timingMetrics[e] = (new Date).getTime()
    }
    getTimingMetrics() {
        return {
            ...this.timingMetrics
        }
    }
    getHistoryMethodForAction(e) {
        switch (e) {
            case "replace":
                return history.replaceState;
            case "advance":
            case "restore":
                return history.pushState
        }
    }
    hasPreloadedResponse() {
        return "object" == typeof this.response
    }
    shouldIssueRequest() {
        return !this.isSamePage && ("restore" == this.action ? !this.hasCachedSnapshot() : this.willRender)
    }
    cacheSnapshot() {
        this.snapshotCached || (this.view.cacheSnapshot(this.snapshot).then((e => e && this.visitCachedSnapshot(e))), this.snapshotCached = !0)
    }
    async render(e) {
        this.cancelRender(), this.frame = await f(), await e(), delete this.frame
    }
    async renderPageSnapshot(e, t) {
        await this.viewTransitioner.renderChange(this.view.shouldTransitionTo(e), (async () => {
            await this.view.renderPage(e, t, this.willRender, this), this.performScroll()
        }))
    }
    cancelRender() {
        this.frame && (cancelAnimationFrame(this.frame), delete this.frame)
    }
}

function Me(e) {
    return e >= 200 && e < 300
}
class Fe {
    progressBar = new he;
    constructor(e) {
        this.session = e
    }
    visitProposedToLocation(e, t) {
        h(e, this.navigator.rootLocation) ? this.navigator.startVisit(e, t?.restorationIdentifier || S(), t) : window.location.href = e.toString()
    }
    visitStarted(e) {
        this.location = e.location, e.loadCachedSnapshot(), e.issueRequest(), e.goToSamePageAnchor()
    }
    visitRequestStarted(e) {
        this.progressBar.setValue(0), e.hasCachedSnapshot() || "restore" != e.action ? this.showVisitProgressBarAfterDelay() : this.showProgressBar()
    }
    visitRequestCompleted(e) {
        e.loadResponse()
    }
    visitRequestFailedWithStatusCode(e, t) {
        switch (t) {
            case Ae:
            case Te:
            case Ce:
                return this.reload({
                    reason: "request_failed",
                    context: {
                        statusCode: t
                    }
                });
            default:
                return e.loadResponse()
        }
    }
    visitRequestFinished(e) { }
    visitCompleted(e) {
        this.progressBar.setValue(1), this.hideVisitProgressBar()
    }
    pageInvalidated(e) {
        this.reload(e)
    }
    visitFailed(e) {
        this.progressBar.setValue(1), this.hideVisitProgressBar()
    }
    visitRendered(e) { }
    formSubmissionStarted(e) {
        this.progressBar.setValue(0), this.showFormProgressBarAfterDelay()
    }
    formSubmissionFinished(e) {
        this.progressBar.setValue(1), this.hideFormProgressBar()
    }
    showVisitProgressBarAfterDelay() {
        this.visitProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay)
    }
    hideVisitProgressBar() {
        this.progressBar.hide(), null != this.visitProgressBarTimeout && (window.clearTimeout(this.visitProgressBarTimeout), delete this.visitProgressBarTimeout)
    }
    showFormProgressBarAfterDelay() {
        null == this.formProgressBarTimeout && (this.formProgressBarTimeout = window.setTimeout(this.showProgressBar, this.session.progressBarDelay))
    }
    hideFormProgressBar() {
        this.progressBar.hide(), null != this.formProgressBarTimeout && (window.clearTimeout(this.formProgressBarTimeout), delete this.formProgressBarTimeout)
    }
    showProgressBar = () => {
        this.progressBar.show()
    };
    reload(e) {
        p("turbo:reload", {
            detail: e
        }), window.location.href = this.location?.toString() || window.location.href
    }
    get navigator() {
        return this.session.navigator
    }
}
class Ie {
    selector = "[data-turbo-temporary]";
    deprecatedSelector = "[data-turbo-cache=false]";
    started = !1;
    start() {
        this.started || (this.started = !0, addEventListener("turbo:before-cache", this.removeTemporaryElements, !1))
    }
    stop() {
        this.started && (this.started = !1, removeEventListener("turbo:before-cache", this.removeTemporaryElements, !1))
    }
    removeTemporaryElements = e => {
        for (const e of this.temporaryElements) e.remove()
    };
    get temporaryElements() {
        return [...document.querySelectorAll(this.selector), ...this.temporaryElementsWithDeprecation]
    }
    get temporaryElementsWithDeprecation() {
        const e = document.querySelectorAll(this.deprecatedSelector);
        return e.length && console.warn(`The ${this.deprecatedSelector} selector is deprecated and will be removed in a future version. Use ${this.selector} instead.`), [...e]
    }
}
class qe {
    constructor(e, t) {
        this.session = e, this.element = t, this.linkInterceptor = new re(this, t), this.formSubmitObserver = new ee(this, t)
    }
    start() {
        this.linkInterceptor.start(), this.formSubmitObserver.start()
    }
    stop() {
        this.linkInterceptor.stop(), this.formSubmitObserver.stop()
    }
    shouldInterceptLinkClick(e, t, s) {
        return this.#c(e)
    }
    linkClickIntercepted(e, t, s) {
        const r = this.#d(e);
        r && r.delegate.linkClickIntercepted(e, t, s)
    }
    willSubmitForm(e, t) {
        return null == e.closest("turbo-frame") && this.#u(e, t) && this.#c(e, t)
    }
    formSubmitted(e, t) {
        const s = this.#d(e, t);
        s && s.delegate.formSubmitted(e, t)
    }
    #u(e, t) {
        const s = o(e, t),
            r = this.element.ownerDocument.querySelector('meta[name="turbo-root"]'),
            n = i(r?.content ?? "/");
        return this.#c(e, t) && h(s, n)
    }
    #c(e, t) {
        if (e instanceof HTMLFormElement ? this.session.submissionIsNavigatable(e, t) : this.session.elementIsNavigatable(e)) {
            const s = this.#d(e, t);
            return !!s && s != e.closest("turbo-frame")
        }
        return !1
    }
    #d(e, t) {
        const s = t?.getAttribute("data-turbo-frame") || e.getAttribute("data-turbo-frame");
        if (s && "_top" != s) {
            const e = this.element.querySelector(`#${s}:not([disabled])`);
            if (e instanceof r) return e
        }
    }
}
class He {
    location;
    restorationIdentifier = S();
    restorationData = {};
    started = !1;
    pageLoaded = !1;
    currentIndex = 0;
    constructor(e) {
        this.delegate = e
    }
    start() {
        this.started || (addEventListener("popstate", this.onPopState, !1), addEventListener("load", this.onPageLoad, !1), this.currentIndex = history.state?.turbo?.restorationIndex || 0, this.started = !0, this.replace(new URL(window.location.href)))
    }
    stop() {
        this.started && (removeEventListener("popstate", this.onPopState, !1), removeEventListener("load", this.onPageLoad, !1), this.started = !1)
    }
    push(e, t) {
        this.update(history.pushState, e, t)
    }
    replace(e, t) {
        this.update(history.replaceState, e, t)
    }
    update(e, t, s = S()) {
        e === history.pushState && ++this.currentIndex;
        const r = {
            turbo: {
                restorationIdentifier: s,
                restorationIndex: this.currentIndex
            }
        };
        e.call(history, r, "", t.href), this.location = t, this.restorationIdentifier = s
    }
    getRestorationDataForIdentifier(e) {
        return this.restorationData[e] || {}
    }
    updateRestorationData(e) {
        const {
            restorationIdentifier: t
        } = this, s = this.restorationData[t];
        this.restorationData[t] = {
            ...s,
            ...e
        }
    }
    assumeControlOfScrollRestoration() {
        this.previousScrollRestoration || (this.previousScrollRestoration = history.scrollRestoration ?? "auto", history.scrollRestoration = "manual")
    }
    relinquishControlOfScrollRestoration() {
        this.previousScrollRestoration && (history.scrollRestoration = this.previousScrollRestoration, delete this.previousScrollRestoration)
    }
    onPopState = e => {
        if (this.shouldHandlePopState()) {
            const {
                turbo: t
            } = e.state || {};
            if (t) {
                this.location = new URL(window.location.href);
                const {
                    restorationIdentifier: e,
                    restorationIndex: s
                } = t;
                this.restorationIdentifier = e;
                const r = s > this.currentIndex ? "forward" : "back";
                this.delegate.historyPoppedToLocationWithRestorationIdentifierAndDirection(this.location, e, r), this.currentIndex = s
            }
        }
    };
    onPageLoad = async e => {
        await Promise.resolve(), this.pageLoaded = !0
    };
    shouldHandlePopState() {
        return this.pageIsLoaded()
    }
    pageIsLoaded() {
        return this.pageLoaded || "complete" == document.readyState
    }
}
class Be {
    started = !1;
    #m = null;
    constructor(e, t) {
        this.delegate = e, this.eventTarget = t
    }
    start() {
        this.started || ("loading" === this.eventTarget.readyState ? this.eventTarget.addEventListener("DOMContentLoaded", this.#p, {
            once: !0
        }) : this.#p())
    }
    stop() {
        this.started && (this.eventTarget.removeEventListener("mouseenter", this.#f, {
            capture: !0,
            passive: !0
        }), this.eventTarget.removeEventListener("mouseleave", this.#g, {
            capture: !0,
            passive: !0
        }), this.eventTarget.removeEventListener("turbo:before-fetch-request", this.#b, !0), this.started = !1)
    }
    #p = () => {
        this.eventTarget.addEventListener("mouseenter", this.#f, {
            capture: !0,
            passive: !0
        }), this.eventTarget.addEventListener("mouseleave", this.#g, {
            capture: !0,
            passive: !0
        }), this.eventTarget.addEventListener("turbo:before-fetch-request", this.#b, !0), this.started = !0
    };
    #f = e => {
        if ("false" === P("turbo-prefetch")) return;
        const t = e.target;
        if (t.matches && t.matches("a[href]:not([target^=_]):not([download])") && this.#v(t)) {
            const e = t,
                s = I(e);
            if (this.delegate.canPrefetchRequestToLocation(e, s)) {
                this.#m = e;
                const r = new W(this, V.get, s, new URLSearchParams, t);
                K.setLater(s.toString(), r, this.#w)
            }
        }
    };
    #g = e => {
        e.target === this.#m && this.#S()
    };
    #S = () => {
        K.clear(), this.#m = null
    };
    #b = e => {
        if ("FORM" !== e.target.tagName && "get" === e.detail.fetchOptions.method) {
            const t = K.get(e.detail.url.toString());
            t && (e.detail.fetchRequest = t), K.clear()
        }
    };
    prepareRequest(e) {
        const t = e.target;
        e.headers["X-Sec-Purpose"] = "prefetch";
        const s = t.closest("turbo-frame"),
            r = t.getAttribute("data-turbo-frame") || s?.getAttribute("target") || s?.id;
        r && "_top" !== r && (e.headers["Turbo-Frame"] = r)
    }
    requestSucceededWithResponse() { }
    requestStarted(e) { }
    requestErrored(e) { }
    requestFinished(e) { }
    requestPreventedHandlingResponse(e, t) { }
    requestFailedWithResponse(e, t) { }
    get #w() {
        return Number(P("turbo-prefetch-cache-time")) || 1e4
    }
    #v(e) {
        return !!e.getAttribute("href") && (!Ne(e) && (!Oe(e) && (!Ve(e) && (!xe(e) && !We(e)))))
    }
}
const Ne = e => e.origin !== document.location.origin || !["http:", "https:"].includes(e.protocol) || e.hasAttribute("target"),
    Oe = e => e.pathname + e.search === document.location.pathname + document.location.search || e.href.startsWith("#"),
    Ve = e => {
        if ("false" === e.getAttribute("data-turbo-prefetch")) return !0;
        if ("false" === e.getAttribute("data-turbo")) return !0;
        const t = k(e, "[data-turbo-prefetch]");
        return !(!t || "false" !== t.getAttribute("data-turbo-prefetch"))
    },
    xe = e => {
        const t = e.getAttribute("data-turbo-method");
        return !(!t || "get" === t.toLowerCase()) || (!!De(e) || (!!e.hasAttribute("data-turbo-confirm") || !!e.hasAttribute("data-turbo-stream")))
    },
    De = e => e.hasAttribute("data-remote") || e.hasAttribute("data-behavior") || e.hasAttribute("data-confirm") || e.hasAttribute("data-method"),
    We = e => p("turbo:before-prefetch", {
        target: e,
        cancelable: !0
    }).defaultPrevented;
class Ue {
    constructor(e) {
        this.delegate = e
    }
    proposeVisit(e, t = {}) {
        this.delegate.allowsVisitingLocationWithAction(e, t.action) && this.delegate.visitProposedToLocation(e, t)
    }
    startVisit(e, t, s = {}) {
        this.stop(), this.currentVisit = new ke(this, i(e), t, {
            referrer: this.location,
            ...s
        }), this.currentVisit.start()
    }
    submitForm(e, t) {
        this.stop(), this.formSubmission = new Y(this, e, t, !0), this.formSubmission.start()
    }
    stop() {
        this.formSubmission && (this.formSubmission.stop(), delete this.formSubmission), this.currentVisit && (this.currentVisit.cancel(), delete this.currentVisit)
    }
    get adapter() {
        return this.delegate.adapter
    }
    get view() {
        return this.delegate.view
    }
    get rootLocation() {
        return this.view.snapshot.rootLocation
    }
    get history() {
        return this.delegate.history
    }
    formSubmissionStarted(e) {
        "function" == typeof this.adapter.formSubmissionStarted && this.adapter.formSubmissionStarted(e)
    }
    async formSubmissionSucceededWithResponse(e, t) {
        if (e == this.formSubmission) {
            const s = await t.responseHTML;
            if (s) {
                const r = e.isSafe;
                r || this.view.clearSnapshotCache();
                const {
                    statusCode: i,
                    redirected: n
                } = t, o = {
                    action: this.#E(e, t),
                    shouldCacheSnapshot: r,
                    response: {
                        statusCode: i,
                        responseHTML: s,
                        redirected: n
                    }
                };
                this.proposeVisit(t.location, o)
            }
        }
    }
    async formSubmissionFailedWithResponse(e, t) {
        const s = await t.responseHTML;
        if (s) {
            const e = me.fromHTMLString(s);
            t.serverError ? await this.view.renderError(e, this.currentVisit) : await this.view.renderPage(e, !1, !0, this.currentVisit), e.shouldPreserveScrollPosition || this.view.scrollToTop(), this.view.clearSnapshotCache()
        }
    }
    formSubmissionErrored(e, t) {
        console.error(t)
    }
    formSubmissionFinished(e) {
        "function" == typeof this.adapter.formSubmissionFinished && this.adapter.formSubmissionFinished(e)
    }
    visitStarted(e) {
        this.delegate.visitStarted(e)
    }
    visitCompleted(e) {
        this.delegate.visitCompleted(e)
    }
    locationWithActionIsSamePage(e, t) {
        const s = n(e),
            r = n(this.view.lastRenderedLocation),
            i = "restore" === t && void 0 === s;
        return "replace" !== t && c(e) === c(this.view.lastRenderedLocation) && (i || null != s && s !== r)
    }
    visitScrolledToSamePageLocation(e, t) {
        this.delegate.visitScrolledToSamePageLocation(e, t)
    }
    get location() {
        return this.history.location
    }
    get restorationIdentifier() {
        return this.history.restorationIdentifier
    }
    #E(e, t) {
        const {
            submitter: s,
            formElement: r
        } = e;
        return T(s, r) || this.#y(t)
    }
    #y(e) {
        return e.redirected && e.location.href === this.location?.href ? "replace" : "advance"
    }
}
const $e = 0,
    je = 1,
    ze = 2,
    _e = 3;
class Xe {
    stage = $e;
    started = !1;
    constructor(e) {
        this.delegate = e
    }
    start() {
        this.started || (this.stage == $e && (this.stage = je), document.addEventListener("readystatechange", this.interpretReadyState, !1), addEventListener("pagehide", this.pageWillUnload, !1), this.started = !0)
    }
    stop() {
        this.started && (document.removeEventListener("readystatechange", this.interpretReadyState, !1), removeEventListener("pagehide", this.pageWillUnload, !1), this.started = !1)
    }
    interpretReadyState = () => {
        const {
            readyState: e
        } = this;
        "interactive" == e ? this.pageIsInteractive() : "complete" == e && this.pageIsComplete()
    };
    pageIsInteractive() {
        this.stage == je && (this.stage = ze, this.delegate.pageBecameInteractive())
    }
    pageIsComplete() {
        this.pageIsInteractive(), this.stage == ze && (this.stage = _e, this.delegate.pageLoaded())
    }
    pageWillUnload = () => {
        this.delegate.pageWillUnload()
    };
    get readyState() {
        return document.readyState
    }
}
class Ke {
    started = !1;
    constructor(e) {
        this.delegate = e
    }
    start() {
        this.started || (addEventListener("scroll", this.onScroll, !1), this.onScroll(), this.started = !0)
    }
    stop() {
        this.started && (removeEventListener("scroll", this.onScroll, !1), this.started = !1)
    }
    onScroll = () => {
        this.updatePosition({
            x: window.pageXOffset,
            y: window.pageYOffset
        })
    };
    updatePosition(e) {
        this.delegate.scrollPositionChanged(e)
    }
}
class Qe {
    render({
        fragment: e
    }) {
        oe.preservingPermanentElements(this, function (e) {
            const t = Z(document.documentElement),
                s = {};
            for (const r of t) {
                const {
                    id: t
                } = r;
                for (const i of e.querySelectorAll("turbo-stream")) {
                    const e = G(i.templateElement.content, t);
                    e && (s[t] = [r, e])
                }
            }
            return s
        }(e), (() => {
            !async function (e, t) {
                const s = `turbo-stream-autofocus-${S()}`,
                    r = e.querySelectorAll("turbo-stream"),
                    i = function (e) {
                        for (const t of e) {
                            const e = F(t.templateElement.content);
                            if (e) return e
                        }
                        return null
                    }(r);
                let n = null;
                i && (n = i.id ? i.id : s, i.id = n);
                t(), await f();
                if ((null == document.activeElement || document.activeElement == document.body) && n) {
                    const e = document.getElementById(n);
                    M(e) && e.focus(), e && e.id == s && e.removeAttribute("id")
                }
            }(e, (() => {
                !async function (e) {
                    const [t, s] = await async function (e, t) {
                        const s = t();
                        return e(), await g(), [s, t()]
                    }(e, (() => document.activeElement)), r = t && t.id;
                    if (r) {
                        const e = document.getElementById(r);
                        M(e) && e != s && e.focus()
                    }
                }((() => {
                    document.documentElement.appendChild(e)
                }))
            }))
        }))
    }
    enteringBardo(e, t) {
        t.replaceWith(e.cloneNode(!0))
    }
    leavingBardo() { }
}
class Ye {
    sources = new Set;
    #R = !1;
    constructor(e) {
        this.delegate = e
    }
    start() {
        this.#R || (this.#R = !0, addEventListener("turbo:before-fetch-response", this.inspectFetchResponse, !1))
    }
    stop() {
        this.#R && (this.#R = !1, removeEventListener("turbo:before-fetch-response", this.inspectFetchResponse, !1))
    }
    connectStreamSource(e) {
        this.streamSourceIsConnected(e) || (this.sources.add(e), e.addEventListener("message", this.receiveMessageEvent, !1))
    }
    disconnectStreamSource(e) {
        this.streamSourceIsConnected(e) && (this.sources.delete(e), e.removeEventListener("message", this.receiveMessageEvent, !1))
    }
    streamSourceIsConnected(e) {
        return this.sources.has(e)
    }
    inspectFetchResponse = e => {
        const t = function (e) {
            const t = e.detail?.fetchResponse;
            if (t instanceof u) return t
        }(e);
        t && function (e) {
            const t = e.contentType ?? "";
            return t.startsWith(X.contentType)
        }(t) && (e.preventDefault(), this.receiveMessageResponse(t))
    };
    receiveMessageEvent = e => {
        this.#R && "string" == typeof e.data && this.receiveMessageHTML(e.data)
    };
    async receiveMessageResponse(e) {
        const t = await e.responseHTML;
        t && this.receiveMessageHTML(t)
    }
    receiveMessageHTML(e) {
        this.delegate.receivedMessageFromStream(X.wrap(e))
    }
}
class Je extends ae {
    static renderElement(e, t) {
        const {
            documentElement: s,
            body: r
        } = document;
        s.replaceChild(t, r)
    }
    async render() {
        this.replaceHeadAndBody(), this.activateScriptElements()
    }
    replaceHeadAndBody() {
        const {
            documentElement: e,
            head: t
        } = document;
        e.replaceChild(this.newHead, t), this.renderElement(this.currentElement, this.newElement)
    }
    activateScriptElements() {
        for (const e of this.scriptElements) {
            const t = e.parentNode;
            if (t) {
                const s = m(e);
                t.replaceChild(s, e)
            }
        }
    }
    get newHead() {
        return this.newSnapshot.headSnapshot.element
    }
    get scriptElements() {
        return document.documentElement.querySelectorAll("script")
    }
}
var Ge = function () {
    let e = new Set,
        t = {
            morphStyle: "outerHTML",
            callbacks: {
                beforeNodeAdded: h,
                afterNodeAdded: h,
                beforeNodeMorphed: h,
                afterNodeMorphed: h,
                beforeNodeRemoved: h,
                afterNodeRemoved: h,
                beforeAttributeUpdated: h
            },
            head: {
                style: "merge",
                shouldPreserve: function (e) {
                    return "true" === e.getAttribute("im-preserve")
                },
                shouldReAppend: function (e) {
                    return "true" === e.getAttribute("im-re-append")
                },
                shouldRemove: h,
                afterHeadMorphed: h
            }
        };

    function s(e, t, r) {
        if (r.head.block) {
            let i = e.querySelector("head"),
                n = t.querySelector("head");
            if (i && n) {
                let o = l(n, i, r);
                return void Promise.all(o).then((function () {
                    s(e, t, Object.assign(r, {
                        head: {
                            block: !1,
                            ignore: !0
                        }
                    }))
                }))
            }
        }
        if ("innerHTML" === r.morphStyle) return n(t, e, r), e.children;
        if ("outerHTML" === r.morphStyle || null == r.morphStyle) {
            let s = function (e, t, s) {
                let r;
                r = e.firstChild;
                let i = r,
                    n = 0;
                for (; r;) {
                    let e = f(r, t, s);
                    e > n && (i = r, n = e), r = r.nextSibling
                }
                return i
            }(t, e, r),
                n = s?.previousSibling,
                o = s?.nextSibling,
                a = i(e, s, r);
            return s ? function (e, t, s) {
                let r = [],
                    i = [];
                for (; null != e;) r.push(e), e = e.previousSibling;
                for (; r.length > 0;) {
                    let e = r.pop();
                    i.push(e), t.parentElement.insertBefore(e, t)
                }
                i.push(t);
                for (; null != s;) r.push(s), i.push(s), s = s.nextSibling;
                for (; r.length > 0;) t.parentElement.insertBefore(r.pop(), t.nextSibling);
                return i
            }(n, a, o) : []
        }
        throw "Do not understand how to morph style " + r.morphStyle
    }

    function r(e, t) {
        return t.ignoreActiveValue && e === document.activeElement && e !== document.body
    }

    function i(e, t, s) {
        if (!s.ignoreActive || e !== document.activeElement) return null == t ? !1 === s.callbacks.beforeNodeRemoved(e) ? e : (e.remove(), s.callbacks.afterNodeRemoved(e), null) : d(e, t) ? (!1 === s.callbacks.beforeNodeMorphed(e, t) || (e instanceof HTMLHeadElement && s.head.ignore || (e instanceof HTMLHeadElement && "morph" !== s.head.style ? l(t, e, s) : (! function (e, t, s) {
            let i = e.nodeType;
            if (1 === i) {
                const r = e.attributes,
                    i = t.attributes;
                for (const e of r) o(e.name, t, "update", s) || t.getAttribute(e.name) !== e.value && t.setAttribute(e.name, e.value);
                for (let r = i.length - 1; 0 <= r; r--) {
                    const n = i[r];
                    o(n.name, t, "remove", s) || (e.hasAttribute(n.name) || t.removeAttribute(n.name))
                }
            }
            8 !== i && 3 !== i || t.nodeValue !== e.nodeValue && (t.nodeValue = e.nodeValue);
            r(t, s) || function (e, t, s) {
                if (e instanceof HTMLInputElement && t instanceof HTMLInputElement && "file" !== e.type) {
                    let r = e.value,
                        i = t.value;
                    a(e, t, "checked", s), a(e, t, "disabled", s), e.hasAttribute("value") ? r !== i && (o("value", t, "update", s) || (t.setAttribute("value", r), t.value = r)) : o("value", t, "remove", s) || (t.value = "", t.removeAttribute("value"))
                } else if (e instanceof HTMLOptionElement) a(e, t, "selected", s);
                else if (e instanceof HTMLTextAreaElement && t instanceof HTMLTextAreaElement) {
                    let r = e.value,
                        i = t.value;
                    if (o("value", t, "update", s)) return;
                    r !== i && (t.value = r), t.firstChild && t.firstChild.nodeValue !== r && (t.firstChild.nodeValue = r)
                }
            }(e, t, s)
        }(t, e, s), r(e, s) || n(t, e, s))), s.callbacks.afterNodeMorphed(e, t)), e) : !1 === s.callbacks.beforeNodeRemoved(e) || !1 === s.callbacks.beforeNodeAdded(t) ? e : (e.parentElement.replaceChild(t, e), s.callbacks.afterNodeAdded(t), s.callbacks.afterNodeRemoved(e), t)
    }

    function n(e, t, s) {
        let r, n = e.firstChild,
            o = t.firstChild;
        for (; n;) {
            if (r = n, n = r.nextSibling, null == o) {
                if (!1 === s.callbacks.beforeNodeAdded(r)) return;
                t.appendChild(r), s.callbacks.afterNodeAdded(r), w(s, r);
                continue
            }
            if (c(r, o, s)) {
                i(o, r, s), o = o.nextSibling, w(s, r);
                continue
            }
            let a = m(e, t, r, o, s);
            if (a) {
                o = u(o, a, s), i(a, r, s), w(s, r);
                continue
            }
            let l = p(e, t, r, o, s);
            if (l) o = u(o, l, s), i(l, r, s), w(s, r);
            else {
                if (!1 === s.callbacks.beforeNodeAdded(r)) return;
                t.insertBefore(r, o), s.callbacks.afterNodeAdded(r), w(s, r)
            }
        }
        for (; null !== o;) {
            let e = o;
            o = o.nextSibling, g(e, s)
        }
    }

    function o(e, t, s, r) {
        return !("value" !== e || !r.ignoreActiveValue || t !== document.activeElement) || !1 === r.callbacks.beforeAttributeUpdated(e, t, s)
    }

    function a(e, t, s, r) {
        if (e[s] !== t[s]) {
            let i = o(s, t, "update", r);
            i || (t[s] = e[s]), e[s] ? i || t.setAttribute(s, e[s]) : o(s, t, "remove", r) || t.removeAttribute(s)
        }
    }

    function l(e, t, s) {
        let r = [],
            i = [],
            n = [],
            o = [],
            a = s.head.style,
            l = new Map;
        for (const t of e.children) l.set(t.outerHTML, t);
        for (const e of t.children) {
            let t = l.has(e.outerHTML),
                r = s.head.shouldReAppend(e),
                h = s.head.shouldPreserve(e);
            t || h ? r ? i.push(e) : (l.delete(e.outerHTML), n.push(e)) : "append" === a ? r && (i.push(e), o.push(e)) : !1 !== s.head.shouldRemove(e) && i.push(e)
        }
        o.push(...l.values());
        let h = [];
        for (const e of o) {
            let i = document.createRange().createContextualFragment(e.outerHTML).firstChild;
            if (!1 !== s.callbacks.beforeNodeAdded(i)) {
                if (i.href || i.src) {
                    let e = null,
                        t = new Promise((function (t) {
                            e = t
                        }));
                    i.addEventListener("load", (function () {
                        e()
                    })), h.push(t)
                }
                t.appendChild(i), s.callbacks.afterNodeAdded(i), r.push(i)
            }
        }
        for (const e of i) !1 !== s.callbacks.beforeNodeRemoved(e) && (t.removeChild(e), s.callbacks.afterNodeRemoved(e));
        return s.head.afterHeadMorphed(t, {
            added: r,
            kept: n,
            removed: i
        }), h
    }

    function h() { }

    function c(e, t, s) {
        return null != e && null != t && (e.nodeType === t.nodeType && e.tagName === t.tagName && ("" !== e.id && e.id === t.id || S(s, e, t) > 0))
    }

    function d(e, t) {
        return null != e && null != t && (e.nodeType === t.nodeType && e.tagName === t.tagName)
    }

    function u(e, t, s) {
        for (; e !== t;) {
            let t = e;
            e = e.nextSibling, g(t, s)
        }
        return w(s, t), t.nextSibling
    }

    function m(e, t, s, r, i) {
        let n = S(i, s, t);
        if (n > 0) {
            let t = r,
                o = 0;
            for (; null != t;) {
                if (c(s, t, i)) return t;
                if (o += S(i, t, e), o > n) return null;
                t = t.nextSibling
            }
        }
        return null
    }

    function p(e, t, s, r, i) {
        let n = r,
            o = s.nextSibling,
            a = 0;
        for (; null != n;) {
            if (S(i, n, e) > 0) return null;
            if (d(s, n)) return n;
            if (d(o, n) && (a++, o = o.nextSibling, a >= 2)) return null;
            n = n.nextSibling
        }
        return n
    }

    function f(e, t, s) {
        return d(e, t) ? .5 + S(s, e, t) : 0
    }

    function g(e, t) {
        w(t, e), !1 !== t.callbacks.beforeNodeRemoved(e) && (e.remove(), t.callbacks.afterNodeRemoved(e))
    }

    function b(e, t) {
        return !e.deadIds.has(t)
    }

    function v(t, s, r) {
        return (t.idMap.get(r) || e).has(s)
    }

    function w(t, s) {
        let r = t.idMap.get(s) || e;
        for (const e of r) t.deadIds.add(e)
    }

    function S(t, s, r) {
        let i = t.idMap.get(s) || e,
            n = 0;
        for (const e of i) b(t, e) && v(t, e, r) && ++n;
        return n
    }

    function E(e, t) {
        let s = e.parentElement,
            r = e.querySelectorAll("[id]");
        for (const e of r) {
            let r = e;
            for (; r !== s && null != r;) {
                let s = t.get(r);
                null == s && (s = new Set, t.set(r, s)), s.add(e.id), r = r.parentElement
            }
        }
    }

    function y(e, t) {
        let s = new Map;
        return E(e, s), E(t, s), s
    }
    return {
        morph: function (e, r, i = {}) {
            e instanceof Document && (e = e.documentElement), "string" == typeof r && (r = function (e) {
                let t = new DOMParser,
                    s = e.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, "");
                if (s.match(/<\/html>/) || s.match(/<\/head>/) || s.match(/<\/body>/)) {
                    let r = t.parseFromString(e, "text/html");
                    if (s.match(/<\/html>/)) return r.generatedByIdiomorph = !0, r;
                    {
                        let e = r.firstChild;
                        return e ? (e.generatedByIdiomorph = !0, e) : null
                    }
                } {
                    let s = t.parseFromString("<body><template>" + e + "</template></body>", "text/html").body.querySelector("template").content;
                    return s.generatedByIdiomorph = !0, s
                }
            }(r));
            let n = function (e) {
                if (null == e) {
                    return document.createElement("div")
                }
                if (e.generatedByIdiomorph) return e;
                if (e instanceof Node) {
                    const t = document.createElement("div");
                    return t.append(e), t
                } {
                    const t = document.createElement("div");
                    for (const s of [...e]) t.append(s);
                    return t
                }
            }(r),
                o = function (e, s, r) {
                    return r = function (e) {
                        let s = {};
                        return Object.assign(s, t), Object.assign(s, e), s.callbacks = {}, Object.assign(s.callbacks, t.callbacks), Object.assign(s.callbacks, e.callbacks), s.head = {}, Object.assign(s.head, t.head), Object.assign(s.head, e.head), s
                    }(r), {
                        target: e,
                        newContent: s,
                        config: r,
                        morphStyle: r.morphStyle,
                        ignoreActive: r.ignoreActive,
                        ignoreActiveValue: r.ignoreActiveValue,
                        idMap: y(e, s),
                        deadIds: new Set,
                        callbacks: r.callbacks,
                        head: r.head
                    }
                }(e, n, i);
            return s(e, n, o)
        },
        defaults: t
    }
}();
class Ze extends ae {
    static renderElement(e, t) {
        document.body && t instanceof HTMLBodyElement ? document.body.replaceWith(t) : document.documentElement.appendChild(t)
    }
    get shouldRender() {
        return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical
    }
    get reloadReason() {
        return this.newSnapshot.isVisitable ? this.trackedElementsAreIdentical ? void 0 : {
            reason: "tracked_element_mismatch"
        } : {
            reason: "turbo_visit_control_is_reload"
        }
    }
    async prepareToRender() {
        this.#L(), await this.mergeHead()
    }
    async render() {
        this.willRender && await this.replaceBody()
    }
    finishRendering() {
        super.finishRendering(), this.isPreview || this.focusFirstAutofocusableElement()
    }
    get currentHeadSnapshot() {
        return this.currentSnapshot.headSnapshot
    }
    get newHeadSnapshot() {
        return this.newSnapshot.headSnapshot
    }
    get newElement() {
        return this.newSnapshot.element
    }
    #L() {
        const {
            documentElement: e
        } = this.currentSnapshot, {
            lang: t
        } = this.newSnapshot;
        t ? e.setAttribute("lang", t) : e.removeAttribute("lang")
    }
    async mergeHead() {
        const e = this.mergeProvisionalElements(),
            t = this.copyNewHeadStylesheetElements();
        this.copyNewHeadScriptElements(), await e, await t, this.willRender && this.removeUnusedDynamicStylesheetElements()
    }
    async replaceBody() {
        await this.preservingPermanentElements((async () => {
            this.activateNewBody(), await this.assignNewBody()
        }))
    }
    get trackedElementsAreIdentical() {
        return this.currentHeadSnapshot.trackedElementSignature == this.newHeadSnapshot.trackedElementSignature
    }
    async copyNewHeadStylesheetElements() {
        const e = [];
        for (const t of this.newHeadStylesheetElements) e.push(L(t)), document.head.appendChild(t);
        await Promise.all(e)
    }
    copyNewHeadScriptElements() {
        for (const e of this.newHeadScriptElements) document.head.appendChild(m(e))
    }
    removeUnusedDynamicStylesheetElements() {
        for (const e of this.unusedDynamicStylesheetElements) document.head.removeChild(e)
    }
    async mergeProvisionalElements() {
        const e = [...this.newHeadProvisionalElements];
        for (const t of this.currentHeadProvisionalElements) this.isCurrentElementInElementList(t, e) || document.head.removeChild(t);
        for (const t of e) document.head.appendChild(t)
    }
    isCurrentElementInElementList(e, t) {
        for (const [s, r] of t.entries()) {
            if ("TITLE" == e.tagName) {
                if ("TITLE" != r.tagName) continue;
                if (e.innerHTML == r.innerHTML) return t.splice(s, 1), !0
            }
            if (r.isEqualNode(e)) return t.splice(s, 1), !0
        }
        return !1
    }
    removeCurrentHeadProvisionalElements() {
        for (const e of this.currentHeadProvisionalElements) document.head.removeChild(e)
    }
    copyNewHeadProvisionalElements() {
        for (const e of this.newHeadProvisionalElements) document.head.appendChild(e)
    }
    activateNewBody() {
        document.adoptNode(this.newElement), this.activateNewBodyScriptElements()
    }
    activateNewBodyScriptElements() {
        for (const e of this.newBodyScriptElements) {
            const t = m(e);
            e.replaceWith(t)
        }
    }
    async assignNewBody() {
        await this.renderElement(this.currentElement, this.newElement)
    }
    get unusedDynamicStylesheetElements() {
        return this.oldHeadStylesheetElements.filter((e => "dynamic" === e.getAttribute("data-turbo-track")))
    }
    get oldHeadStylesheetElements() {
        return this.currentHeadSnapshot.getStylesheetElementsNotInSnapshot(this.newHeadSnapshot)
    }
    get newHeadStylesheetElements() {
        return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(this.currentHeadSnapshot)
    }
    get newHeadScriptElements() {
        return this.newHeadSnapshot.getScriptElementsNotInSnapshot(this.currentHeadSnapshot)
    }
    get currentHeadProvisionalElements() {
        return this.currentHeadSnapshot.provisionalElements
    }
    get newHeadProvisionalElements() {
        return this.newHeadSnapshot.provisionalElements
    }
    get newBodyScriptElements() {
        return this.newElement.querySelectorAll("script")
    }
}
class et extends Ze {
    async render() {
        this.willRender && await this.#A()
    }
    get renderMethod() {
        return "morph"
    }
    async #A() {
        this.#T(this.currentElement, this.newElement), this.#C(), p("turbo:morph", {
            detail: {
                currentElement: this.currentElement,
                newElement: this.newElement
            }
        })
    }
    #T(e, t, s = "outerHTML") {
        this.isMorphingTurboFrame = this.#P(e), Ge.morph(e, t, {
            ignoreActiveValue: !0,
            morphStyle: s,
            callbacks: {
                beforeNodeAdded: this.#k,
                beforeNodeMorphed: this.#M,
                beforeAttributeUpdated: this.#F,
                beforeNodeRemoved: this.#I,
                afterNodeMorphed: this.#q
            }
        })
    }
    #k = e => !(e.id && e.hasAttribute("data-turbo-permanent") && document.getElementById(e.id));
    #M = (e, t) => {
        if (e instanceof HTMLElement) {
            if (e.hasAttribute("data-turbo-permanent") || !this.isMorphingTurboFrame && this.#P(e)) return !1;
            return !p("turbo:before-morph-element", {
                cancelable: !0,
                target: e,
                detail: {
                    newElement: t
                }
            }).defaultPrevented
        }
    };
    #F = (e, t, s) => !p("turbo:before-morph-attribute", {
        cancelable: !0,
        target: t,
        detail: {
            attributeName: e,
            mutationType: s
        }
    }).defaultPrevented;
    #q = (e, t) => {
        t instanceof HTMLElement && p("turbo:morph-element", {
            target: e,
            detail: {
                newElement: t
            }
        })
    };
    #I = e => this.#M(e);
    #C() {
        this.#H().forEach((e => {
            this.#P(e) && (this.#B(e), e.reload())
        }))
    }
    #B(e) {
        e.addEventListener("turbo:before-frame-render", (e => {
            e.detail.render = this.#N
        }), {
            once: !0
        })
    }
    #N = (e, t) => {
        p("turbo:before-frame-morph", {
            target: e,
            detail: {
                currentElement: e,
                newElement: t
            }
        }), this.#T(e, t.children, "innerHTML")
    };
    #P(e) {
        return e.src && "morph" === e.refresh
    }
    #H() {
        return Array.from(document.querySelectorAll("turbo-frame[src]")).filter((e => !e.closest("[data-turbo-permanent]")))
    }
}
class tt {
    keys = [];
    snapshots = {};
    constructor(e) {
        this.size = e
    }
    has(e) {
        return d(e) in this.snapshots
    }
    get(e) {
        if (this.has(e)) {
            const t = this.read(e);
            return this.touch(e), t
        }
    }
    put(e, t) {
        return this.write(e, t), this.touch(e), t
    }
    clear() {
        this.snapshots = {}
    }
    read(e) {
        return this.snapshots[d(e)]
    }
    write(e, t) {
        this.snapshots[d(e)] = t
    }
    touch(e) {
        const t = d(e),
            s = this.keys.indexOf(t);
        s > -1 && this.keys.splice(s, 1), this.keys.unshift(t), this.trim()
    }
    trim() {
        for (const e of this.keys.splice(this.size)) delete this.snapshots[e]
    }
}
class st extends te {
    snapshotCache = new tt(10);
    lastRenderedLocation = new URL(location.href);
    forceReloaded = !1;
    shouldTransitionTo(e) {
        return this.snapshot.prefersViewTransitions && e.prefersViewTransitions
    }
    renderPage(e, t = !1, s = !0, r) {
        const i = new (this.isPageRefresh(r) && this.snapshot.shouldMorphPage ? et : Ze)(this.snapshot, e, Ze.renderElement, t, s);
        return i.shouldRender ? r?.changeHistory() : this.forceReloaded = !0, this.render(i)
    }
    renderError(e, t) {
        t?.changeHistory();
        const s = new Je(this.snapshot, e, Je.renderElement, !1);
        return this.render(s)
    }
    clearSnapshotCache() {
        this.snapshotCache.clear()
    }
    async cacheSnapshot(e = this.snapshot) {
        if (e.isCacheable) {
            this.delegate.viewWillCacheSnapshot();
            const {
                lastRenderedLocation: t
            } = this;
            await b();
            const s = e.clone();
            return this.snapshotCache.put(t, s), s
        }
    }
    getCachedSnapshotForLocation(e) {
        return this.snapshotCache.get(e)
    }
    isPageRefresh(e) {
        return !e || this.lastRenderedLocation.pathname === e.location.pathname && "replace" === e.action
    }
    shouldPreserveScrollPosition(e) {
        return this.isPageRefresh(e) && this.snapshot.shouldPreserveScrollPosition
    }
    get snapshot() {
        return me.fromElement(this.element)
    }
}
class rt {
    selector = "a[data-turbo-preload]";
    constructor(e, t) {
        this.delegate = e, this.snapshotCache = t
    }
    start() {
        "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", this.#O) : this.preloadOnLoadLinksForView(document.body)
    }
    stop() {
        document.removeEventListener("DOMContentLoaded", this.#O)
    }
    preloadOnLoadLinksForView(e) {
        for (const t of e.querySelectorAll(this.selector)) this.delegate.shouldPreloadLink(t) && this.preloadURL(t)
    }
    async preloadURL(e) {
        const t = new URL(e.href);
        if (this.snapshotCache.has(t)) return;
        const s = new W(this, V.get, t, new URLSearchParams, e);
        await s.perform()
    }
    prepareRequest(e) {
        e.headers["X-Sec-Purpose"] = "prefetch"
    }
    async requestSucceededWithResponse(e, t) {
        try {
            const s = await t.responseHTML,
                r = me.fromHTMLString(s);
            this.snapshotCache.put(e.url, r)
        } catch (e) { }
    }
    requestStarted(e) { }
    requestErrored(e) { }
    requestFinished(e) { }
    requestPreventedHandlingResponse(e, t) { }
    requestFailedWithResponse(e, t) { }
    #O = () => {
        this.preloadOnLoadLinksForView(document.body)
    }
}
class it {
    constructor(e) {
        this.session = e
    }
    clear() {
        this.session.clearCache()
    }
    resetCacheControl() {
        this.#V("")
    }
    exemptPageFromCache() {
        this.#V("no-cache")
    }
    exemptPageFromPreview() {
        this.#V("no-preview")
    }
    #V(e) {
        ! function (e, t) {
            let s = C(e);
            s || (s = document.createElement("meta"), s.setAttribute("name", e), document.head.appendChild(s)), s.setAttribute("content", t)
        }("turbo-cache-control", e)
    }
}

function nt(e) {
    Object.defineProperties(e, ot)
}
const ot = {
    absoluteURL: {
        get() {
            return this.toString()
        }
    }
},
    at = new class {
        navigator = new Ue(this);
        history = new He(this);
        view = new st(this, document.documentElement);
        adapter = new Fe(this);
        pageObserver = new Xe(this);
        cacheObserver = new Ie;
        linkPrefetchObserver = new Be(this, document);
        linkClickObserver = new ie(this, window);
        formSubmitObserver = new ee(this, document);
        scrollObserver = new Ke(this);
        streamObserver = new Ye(this);
        formLinkClickObserver = new ne(this, document.documentElement);
        frameRedirector = new qe(this, document.documentElement);
        streamMessageRenderer = new Qe;
        cache = new it(this);
        drive = !0;
        enabled = !0;
        progressBarDelay = 500;
        started = !1;
        formMode = "on";
        #x = 150;
        constructor(e) {
            this.recentRequests = e, this.preloader = new rt(this, this.view.snapshotCache), this.debouncedRefresh = this.refresh, this.pageRefreshDebouncePeriod = this.pageRefreshDebouncePeriod
        }
        start() {
            this.started || (this.pageObserver.start(), this.cacheObserver.start(), this.linkPrefetchObserver.start(), this.formLinkClickObserver.start(), this.linkClickObserver.start(), this.formSubmitObserver.start(), this.scrollObserver.start(), this.streamObserver.start(), this.frameRedirector.start(), this.history.start(), this.preloader.start(), this.started = !0, this.enabled = !0)
        }
        disable() {
            this.enabled = !1
        }
        stop() {
            this.started && (this.pageObserver.stop(), this.cacheObserver.stop(), this.linkPrefetchObserver.stop(), this.formLinkClickObserver.stop(), this.linkClickObserver.stop(), this.formSubmitObserver.stop(), this.scrollObserver.stop(), this.streamObserver.stop(), this.frameRedirector.stop(), this.history.stop(), this.preloader.stop(), this.started = !1)
        }
        registerAdapter(e) {
            this.adapter = e
        }
        visit(e, t = {}) {
            const s = t.frame ? document.getElementById(t.frame) : null;
            if (s instanceof r) {
                const r = t.action || T(s);
                s.delegate.proposeVisitIfNavigatedWithAction(s, r), s.src = e.toString()
            } else this.navigator.proposeVisit(i(e), t)
        }
        refresh(e, t) {
            t && this.recentRequests.has(t) || (this.cache.exemptPageFromPreview(), this.visit(e, {
                action: "replace"
            }))
        }
        connectStreamSource(e) {
            this.streamObserver.connectStreamSource(e)
        }
        disconnectStreamSource(e) {
            this.streamObserver.disconnectStreamSource(e)
        }
        renderStreamMessage(e) {
            this.streamMessageRenderer.render(X.wrap(e))
        }
        clearCache() {
            this.view.clearSnapshotCache()
        }
        setProgressBarDelay(e) {
            this.progressBarDelay = e
        }
        setFormMode(e) {
            this.formMode = e
        }
        get location() {
            return this.history.location
        }
        get restorationIdentifier() {
            return this.history.restorationIdentifier
        }
        get pageRefreshDebouncePeriod() {
            return this.#x
        }
        set pageRefreshDebouncePeriod(e) {
            this.refresh = function (e, t) {
                let s = null;
                return (...r) => {
                    clearTimeout(s), s = setTimeout((() => e.apply(this, r)), t)
                }
            }(this.debouncedRefresh.bind(this), e), this.#x = e
        }
        shouldPreloadLink(e) {
            const t = e.hasAttribute("data-turbo-method"),
                s = e.hasAttribute("data-turbo-stream"),
                i = e.getAttribute("data-turbo-frame"),
                n = "_top" == i ? null : document.getElementById(i) || k(e, "turbo-frame:not([disabled])");
            if (t || s || n instanceof r) return !1;
            {
                const t = new URL(e.href);
                return this.elementIsNavigatable(e) && h(t, this.snapshot.rootLocation)
            }
        }
        historyPoppedToLocationWithRestorationIdentifierAndDirection(e, t, s) {
            this.enabled ? this.navigator.startVisit(e, t, {
                action: "restore",
                historyChanged: !0,
                direction: s
            }) : this.adapter.pageInvalidated({
                reason: "turbo_disabled"
            })
        }
        scrollPositionChanged(e) {
            this.history.updateRestorationData({
                scrollPosition: e
            })
        }
        willSubmitFormLinkToLocation(e, t) {
            return this.elementIsNavigatable(e) && h(t, this.snapshot.rootLocation)
        }
        submittedFormLinkToLocation() { }
        canPrefetchRequestToLocation(e, t) {
            return this.elementIsNavigatable(e) && h(t, this.snapshot.rootLocation)
        }
        willFollowLinkToLocation(e, t, s) {
            return this.elementIsNavigatable(e) && h(t, this.snapshot.rootLocation) && this.applicationAllowsFollowingLinkToLocation(e, t, s)
        }
        followedLinkToLocation(e, t) {
            const s = this.getActionForLink(e),
                r = e.hasAttribute("data-turbo-stream");
            this.visit(t.href, {
                action: s,
                acceptsStreamResponse: r
            })
        }
        allowsVisitingLocationWithAction(e, t) {
            return this.locationWithActionIsSamePage(e, t) || this.applicationAllowsVisitingLocation(e)
        }
        visitProposedToLocation(e, t) {
            nt(e), this.adapter.visitProposedToLocation(e, t)
        }
        visitStarted(e) {
            e.acceptsStreamResponse || (y(document.documentElement), this.view.markVisitDirection(e.direction)), nt(e.location), e.silent || this.notifyApplicationAfterVisitingLocation(e.location, e.action)
        }
        visitCompleted(e) {
            this.view.unmarkVisitDirection(), R(document.documentElement), this.notifyApplicationAfterPageLoad(e.getTimingMetrics())
        }
        locationWithActionIsSamePage(e, t) {
            return this.navigator.locationWithActionIsSamePage(e, t)
        }
        visitScrolledToSamePageLocation(e, t) {
            this.notifyApplicationAfterVisitingSamePageLocation(e, t)
        }
        willSubmitForm(e, t) {
            const s = o(e, t);
            return this.submissionIsNavigatable(e, t) && h(i(s), this.snapshot.rootLocation)
        }
        formSubmitted(e, t) {
            this.navigator.submitForm(e, t)
        }
        pageBecameInteractive() {
            this.view.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad()
        }
        pageLoaded() {
            this.history.assumeControlOfScrollRestoration()
        }
        pageWillUnload() {
            this.history.relinquishControlOfScrollRestoration()
        }
        receivedMessageFromStream(e) {
            this.renderStreamMessage(e)
        }
        viewWillCacheSnapshot() {
            this.navigator.currentVisit?.silent || this.notifyApplicationBeforeCachingSnapshot()
        }
        allowsImmediateRender({
            element: e
        }, t) {
            const s = this.notifyApplicationBeforeRender(e, t),
                {
                    defaultPrevented: r,
                    detail: {
                        render: i
                    }
                } = s;
            return this.view.renderer && i && (this.view.renderer.renderElement = i), !r
        }
        viewRenderedSnapshot(e, t, s) {
            this.view.lastRenderedLocation = this.history.location, this.notifyApplicationAfterRender(s)
        }
        preloadOnLoadLinksForView(e) {
            this.preloader.preloadOnLoadLinksForView(e)
        }
        viewInvalidated(e) {
            this.adapter.pageInvalidated(e)
        }
        frameLoaded(e) {
            this.notifyApplicationAfterFrameLoad(e)
        }
        frameRendered(e, t) {
            this.notifyApplicationAfterFrameRender(e, t)
        }
        applicationAllowsFollowingLinkToLocation(e, t, s) {
            return !this.notifyApplicationAfterClickingLinkToLocation(e, t, s).defaultPrevented
        }
        applicationAllowsVisitingLocation(e) {
            return !this.notifyApplicationBeforeVisitingLocation(e).defaultPrevented
        }
        notifyApplicationAfterClickingLinkToLocation(e, t, s) {
            return p("turbo:click", {
                target: e,
                detail: {
                    url: t.href,
                    originalEvent: s
                },
                cancelable: !0
            })
        }
        notifyApplicationBeforeVisitingLocation(e) {
            return p("turbo:before-visit", {
                detail: {
                    url: e.href
                },
                cancelable: !0
            })
        }
        notifyApplicationAfterVisitingLocation(e, t) {
            return p("turbo:visit", {
                detail: {
                    url: e.href,
                    action: t
                }
            })
        }
        notifyApplicationBeforeCachingSnapshot() {
            return p("turbo:before-cache")
        }
        notifyApplicationBeforeRender(e, t) {
            return p("turbo:before-render", {
                detail: {
                    newBody: e,
                    ...t
                },
                cancelable: !0
            })
        }
        notifyApplicationAfterRender(e) {
            return p("turbo:render", {
                detail: {
                    renderMethod: e
                }
            })
        }
        notifyApplicationAfterPageLoad(e = {}) {
            return p("turbo:load", {
                detail: {
                    url: this.location.href,
                    timing: e
                }
            })
        }
        notifyApplicationAfterVisitingSamePageLocation(e, t) {
            dispatchEvent(new HashChangeEvent("hashchange", {
                oldURL: e.toString(),
                newURL: t.toString()
            }))
        }
        notifyApplicationAfterFrameLoad(e) {
            return p("turbo:frame-load", {
                target: e
            })
        }
        notifyApplicationAfterFrameRender(e, t) {
            return p("turbo:frame-render", {
                detail: {
                    fetchResponse: e
                },
                target: t,
                cancelable: !0
            })
        }
        submissionIsNavigatable(e, t) {
            if ("off" == this.formMode) return !1;
            {
                const s = !t || this.elementIsNavigatable(t);
                return "optin" == this.formMode ? s && null != e.closest('[data-turbo="true"]') : s && this.elementIsNavigatable(e)
            }
        }
        elementIsNavigatable(e) {
            const t = k(e, "[data-turbo]"),
                s = k(e, "turbo-frame");
            return this.drive || s ? !t || "false" != t.getAttribute("data-turbo") : !!t && "true" == t.getAttribute("data-turbo")
        }
        getActionForLink(e) {
            return T(e) || "advance"
        }
        get snapshot() {
            return this.view.snapshot
        }
    }(H),
    {
        cache: lt,
        navigator: ht
    } = at;

function ct() {
    at.start()
}

function dt(e) {
    at.registerAdapter(e)
}

function ut(e, t) {
    at.visit(e, t)
}

function mt(e) {
    at.connectStreamSource(e)
}

function pt(e) {
    at.disconnectStreamSource(e)
}

function ft(e) {
    at.renderStreamMessage(e)
}

function gt() {
    console.warn("Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`"), at.clearCache()
}

function bt(e) {
    at.setProgressBarDelay(e)
}

function vt(e) {
    Y.confirmMethod = e
}

function wt(e) {
    at.setFormMode(e)
}
var St = Object.freeze({
    __proto__: null,
    navigator: ht,
    session: at,
    cache: lt,
    PageRenderer: Ze,
    PageSnapshot: me,
    FrameRenderer: le,
    fetch: N,
    start: ct,
    registerAdapter: dt,
    visit: ut,
    connectStreamSource: mt,
    disconnectStreamSource: pt,
    renderStreamMessage: ft,
    clearCache: gt,
    setProgressBarDelay: bt,
    setConfirmMethod: vt,
    setFormMode: wt
});
class Et extends Error { }

function yt(e) {
    if (null != e) {
        const t = document.getElementById(e);
        if (t instanceof r) return t
    }
}

function Rt(e, t) {
    if (e) {
        const n = e.getAttribute("src");
        if (null != n && null != t && (s = t, i(n).href == i(s).href)) throw new Error(`Matching <turbo-frame id="${e.id}"> element has a source URL which references itself`);
        if (e.ownerDocument !== document && (e = document.importNode(e, !0)), e instanceof r) return e.connectedCallback(), e.disconnectedCallback(), e
    }
    var s
}
const Lt = {
    after() {
        this.targetElements.forEach((e => e.parentElement?.insertBefore(this.templateContent, e.nextSibling)))
    },
    append() {
        this.removeDuplicateTargetChildren(), this.targetElements.forEach((e => e.append(this.templateContent)))
    },
    before() {
        this.targetElements.forEach((e => e.parentElement?.insertBefore(this.templateContent, e)))
    },
    prepend() {
        this.removeDuplicateTargetChildren(), this.targetElements.forEach((e => e.prepend(this.templateContent)))
    },
    remove() {
        this.targetElements.forEach((e => e.remove()))
    },
    replace() {
        this.targetElements.forEach((e => e.replaceWith(this.templateContent)))
    },
    update() {
        this.targetElements.forEach((e => {
            e.innerHTML = "", e.append(this.templateContent)
        }))
    },
    refresh() {
        at.refresh(this.baseURI, this.requestId)
    }
};
class At extends HTMLElement {
    static async renderElement(e) {
        await e.performAction()
    }
    async connectedCallback() {
        try {
            await this.render()
        } catch (e) {
            console.error(e)
        } finally {
            this.disconnect()
        }
    }
    async render() {
        return this.renderPromise ??= (async () => {
            const e = this.beforeRenderEvent;
            this.dispatchEvent(e) && (await f(), await e.detail.render(this))
        })()
    }
    disconnect() {
        try {
            this.remove()
        } catch { }
    }
    removeDuplicateTargetChildren() {
        this.duplicateChildren.forEach((e => e.remove()))
    }
    get duplicateChildren() {
        const e = this.targetElements.flatMap((e => [...e.children])).filter((e => !!e.id)),
            t = [...this.templateContent?.children || []].filter((e => !!e.id)).map((e => e.id));
        return e.filter((e => t.includes(e.id)))
    }
    get performAction() {
        if (this.action) {
            const e = Lt[this.action];
            if (e) return e;
            this.#D("unknown action")
        }
        this.#D("action attribute is missing")
    }
    get targetElements() {
        return this.target ? this.targetElementsById : this.targets ? this.targetElementsByQuery : void this.#D("target or targets attribute is missing")
    }
    get templateContent() {
        return this.templateElement.content.cloneNode(!0)
    }
    get templateElement() {
        if (null === this.firstElementChild) {
            const e = this.ownerDocument.createElement("template");
            return this.appendChild(e), e
        }
        if (this.firstElementChild instanceof HTMLTemplateElement) return this.firstElementChild;
        this.#D("first child element must be a <template> element")
    }
    get action() {
        return this.getAttribute("action")
    }
    get target() {
        return this.getAttribute("target")
    }
    get targets() {
        return this.getAttribute("targets")
    }
    get requestId() {
        return this.getAttribute("request-id")
    }
    #D(e) {
        throw new Error(`${this.description}: ${e}`)
    }
    get description() {
        return (this.outerHTML.match(/<[^>]+>/) ?? [])[0] ?? "<turbo-stream>"
    }
    get beforeRenderEvent() {
        return new CustomEvent("turbo:before-stream-render", {
            bubbles: !0,
            cancelable: !0,
            detail: {
                newStream: this,
                render: At.renderElement
            }
        })
    }
    get targetElementsById() {
        const e = this.ownerDocument?.getElementById(this.target);
        return null !== e ? [e] : []
    }
    get targetElementsByQuery() {
        const e = this.ownerDocument?.querySelectorAll(this.targets);
        return 0 !== e.length ? Array.prototype.slice.call(e) : []
    }
}
class Tt extends HTMLElement {
    streamSource = null;
    connectedCallback() {
        this.streamSource = this.src.match(/^ws{1,2}:/) ? new WebSocket(this.src) : new EventSource(this.src), mt(this.streamSource)
    }
    disconnectedCallback() {
        this.streamSource && (this.streamSource.close(), pt(this.streamSource))
    }
    get src() {
        return this.getAttribute("src") || ""
    }
}
r.delegateConstructor = class {
    fetchResponseLoaded = e => Promise.resolve();
    #W = null;
    #U = () => { };
    #$ = !1;
    #j = !1;
    #z = new Set;
    action = null;
    constructor(e) {
        this.element = e, this.view = new se(this, this.element), this.appearanceObserver = new _(this, this.element), this.formLinkClickObserver = new ne(this, this.element), this.linkInterceptor = new re(this, this.element), this.restorationIdentifier = S(), this.formSubmitObserver = new ee(this, this.element)
    }
    connect() {
        this.#$ || (this.#$ = !0, this.loadingStyle == s.lazy ? this.appearanceObserver.start() : this.#_(), this.formLinkClickObserver.start(), this.linkInterceptor.start(), this.formSubmitObserver.start())
    }
    disconnect() {
        this.#$ && (this.#$ = !1, this.appearanceObserver.stop(), this.formLinkClickObserver.stop(), this.linkInterceptor.stop(), this.formSubmitObserver.stop())
    }
    disabledChanged() {
        this.loadingStyle == s.eager && this.#_()
    }
    sourceURLChanged() {
        this.#X("src") || (this.element.isConnected && (this.complete = !1), (this.loadingStyle == s.eager || this.#j) && this.#_())
    }
    sourceURLReloaded() {
        const {
            src: e
        } = this.element;
        return this.#K("complete", (() => {
            this.element.removeAttribute("complete")
        })), this.element.src = null, this.element.src = e, this.element.loaded
    }
    completeChanged() {
        this.#X("complete") || this.#_()
    }
    loadingStyleChanged() {
        this.loadingStyle == s.lazy ? this.appearanceObserver.start() : (this.appearanceObserver.stop(), this.#_())
    }
    async #_() {
        this.enabled && this.isActive && !this.complete && this.sourceURL && (this.element.loaded = this.#Q(i(this.sourceURL)), this.appearanceObserver.stop(), await this.element.loaded, this.#j = !0)
    }
    async loadResponse(e) {
        (e.redirected || e.succeeded && e.isHTML) && (this.sourceURL = e.response.url);
        try {
            const t = await e.responseHTML;
            if (t) {
                const s = v(t);
                me.fromDocument(s).isVisitable ? await this.#Y(e, s) : await this.#J(e)
            }
        } finally {
            this.fetchResponseLoaded = () => Promise.resolve()
        }
    }
    elementAppearedInViewport(e) {
        this.proposeVisitIfNavigatedWithAction(e, T(e)), this.#_()
    }
    willSubmitFormLinkToLocation(e) {
        return this.#G(e)
    }
    submittedFormLinkToLocation(e, t, s) {
        const r = this.#d(e);
        r && s.setAttribute("data-turbo-frame", r.id)
    }
    shouldInterceptLinkClick(e, t, s) {
        return this.#G(e)
    }
    linkClickIntercepted(e, t) {
        this.#Z(e, t)
    }
    willSubmitForm(e, t) {
        return e.closest("turbo-frame") == this.element && this.#G(e, t)
    }
    formSubmitted(e, t) {
        this.formSubmission && this.formSubmission.stop(), this.formSubmission = new Y(this, e, t);
        const {
            fetchRequest: s
        } = this.formSubmission;
        this.prepareRequest(s), this.formSubmission.start()
    }
    prepareRequest(e) {
        e.headers["Turbo-Frame"] = this.id, this.currentNavigationElement?.hasAttribute("data-turbo-stream") && e.acceptResponseType(X.contentType)
    }
    requestStarted(e) {
        y(this.element)
    }
    requestPreventedHandlingResponse(e, t) {
        this.#U()
    }
    async requestSucceededWithResponse(e, t) {
        await this.loadResponse(t), this.#U()
    }
    async requestFailedWithResponse(e, t) {
        await this.loadResponse(t), this.#U()
    }
    requestErrored(e, t) {
        console.error(t), this.#U()
    }
    requestFinished(e) {
        R(this.element)
    }
    formSubmissionStarted({
        formElement: e
    }) {
        y(e, this.#d(e))
    }
    formSubmissionSucceededWithResponse(e, t) {
        const s = this.#d(e.formElement, e.submitter);
        s.delegate.proposeVisitIfNavigatedWithAction(s, T(e.submitter, e.formElement, s)), s.delegate.loadResponse(t), e.isSafe || at.clearCache()
    }
    formSubmissionFailedWithResponse(e, t) {
        this.element.delegate.loadResponse(t), at.clearCache()
    }
    formSubmissionErrored(e, t) {
        console.error(t)
    }
    formSubmissionFinished({
        formElement: e
    }) {
        R(e, this.#d(e))
    }
    allowsImmediateRender({
        element: e
    }, t) {
        const s = p("turbo:before-frame-render", {
            target: this.element,
            detail: {
                newFrame: e,
                ...t
            },
            cancelable: !0
        }),
            {
                defaultPrevented: r,
                detail: {
                    render: i
                }
            } = s;
        return this.view.renderer && i && (this.view.renderer.renderElement = i), !r
    }
    viewRenderedSnapshot(e, t, s) { }
    preloadOnLoadLinksForView(e) {
        at.preloadOnLoadLinksForView(e)
    }
    viewInvalidated() { }
    willRenderFrame(e, t) {
        this.previousFrameElement = e.cloneNode(!0)
    }
    visitCachedSnapshot = ({
        element: e
    }) => {
        const t = e.querySelector("#" + this.element.id);
        t && this.previousFrameElement && t.replaceChildren(...this.previousFrameElement.children), delete this.previousFrameElement
    };
    async #Y(e, t) {
        const s = await this.extractForeignFrameElement(t.body);
        if (s) {
            const t = new J(s),
                r = new le(this, this.view.snapshot, t, le.renderElement, !1, !1);
            this.view.renderPromise && await this.view.renderPromise, this.changeHistory(), await this.view.render(r), this.complete = !0, at.frameRendered(e, this.element), at.frameLoaded(this.element), await this.fetchResponseLoaded(e)
        } else this.#ee(e) && this.#te(e)
    }
    async #Q(e) {
        const t = new W(this, V.get, e, new URLSearchParams, this.element);
        return this.#W?.cancel(), this.#W = t, new Promise((e => {
            this.#U = () => {
                this.#U = () => { }, this.#W = null, e()
            }, t.perform()
        }))
    }
    #Z(e, t, s) {
        const r = this.#d(e, s);
        r.delegate.proposeVisitIfNavigatedWithAction(r, T(s, e, r)), this.#se(e, (() => {
            r.src = t
        }))
    }
    proposeVisitIfNavigatedWithAction(e, t = null) {
        if (this.action = t, this.action) {
            const t = me.fromElement(e).clone(),
                {
                    visitCachedSnapshot: s
                } = e.delegate;
            e.delegate.fetchResponseLoaded = async r => {
                if (e.src) {
                    const {
                        statusCode: i,
                        redirected: n
                    } = r, o = {
                        response: {
                            statusCode: i,
                            redirected: n,
                            responseHTML: await r.responseHTML
                        },
                        visitCachedSnapshot: s,
                        willRender: !1,
                        updateHistory: !1,
                        restorationIdentifier: this.restorationIdentifier,
                        snapshot: t
                    };
                    this.action && (o.action = this.action), at.visit(e.src, o)
                }
            }
        }
    }
    changeHistory() {
        if (this.action) {
            const e = A(this.action);
            at.history.update(e, i(this.element.src || ""), this.restorationIdentifier)
        }
    }
    async #J(e) {
        console.warn(`The response (${e.statusCode}) from <turbo-frame id="${this.element.id}"> is performing a full page visit due to turbo-visit-control.`), await this.#re(e.response)
    }
    #ee(e) {
        this.element.setAttribute("complete", "");
        const t = e.response;
        return !p("turbo:frame-missing", {
            target: this.element,
            detail: {
                response: t,
                visit: async (e, t) => {
                    e instanceof Response ? this.#re(e) : at.visit(e, t)
                }
            },
            cancelable: !0
        }).defaultPrevented
    }
    #te(e) {
        this.view.missing(), this.#ie(e)
    }
    #ie(e) {
        const t = `The response (${e.statusCode}) did not contain the expected <turbo-frame id="${this.element.id}"> and will be ignored. To perform a full page visit instead, set turbo-visit-control to reload.`;
        throw new Et(t)
    }
    async #re(e) {
        const t = new u(e),
            s = await t.responseHTML,
            {
                location: r,
                redirected: i,
                statusCode: n
            } = t;
        return at.visit(r, {
            response: {
                redirected: i,
                statusCode: n,
                responseHTML: s
            }
        })
    }
    #d(e, t) {
        return yt(E("data-turbo-frame", t, e) || this.element.getAttribute("target")) ?? this.element
    }
    async extractForeignFrameElement(e) {
        let t;
        const s = CSS.escape(this.id);
        try {
            if (t = Rt(e.querySelector(`turbo-frame#${s}`), this.sourceURL), t) return t;
            if (t = Rt(e.querySelector(`turbo-frame[src][recurse~=${s}]`), this.sourceURL), t) return await t.loaded, await this.extractForeignFrameElement(t)
        } catch (e) {
            return console.error(e), new r
        }
        return null
    }
    #ne(e, t) {
        return h(i(o(e, t)), this.rootLocation)
    }
    #G(e, t) {
        const s = E("data-turbo-frame", t, e) || this.element.getAttribute("target");
        if (e instanceof HTMLFormElement && !this.#ne(e, t)) return !1;
        if (!this.enabled || "_top" == s) return !1;
        if (s) {
            const e = yt(s);
            if (e) return !e.disabled
        }
        return !!at.elementIsNavigatable(e) && !(t && !at.elementIsNavigatable(t))
    }
    get id() {
        return this.element.id
    }
    get enabled() {
        return !this.element.disabled
    }
    get sourceURL() {
        if (this.element.src) return this.element.src
    }
    set sourceURL(e) {
        this.#K("src", (() => {
            this.element.src = e ?? null
        }))
    }
    get loadingStyle() {
        return this.element.loading
    }
    get isLoading() {
        return void 0 !== this.formSubmission || void 0 !== this.#U()
    }
    get complete() {
        return this.element.hasAttribute("complete")
    }
    set complete(e) {
        this.#K("complete", (() => {
            e ? this.element.setAttribute("complete", "") : this.element.removeAttribute("complete")
        }))
    }
    get isActive() {
        return this.element.isActive && this.#$
    }
    get rootLocation() {
        const e = this.element.ownerDocument.querySelector('meta[name="turbo-root"]');
        return i(e?.content ?? "/")
    }
    #X(e) {
        return this.#z.has(e)
    }
    #K(e, t) {
        this.#z.add(e), t(), this.#z.delete(e)
    }
    #se(e, t) {
        this.currentNavigationElement = e, t(), delete this.currentNavigationElement
    }
}, void 0 === customElements.get("turbo-frame") && customElements.define("turbo-frame", r), void 0 === customElements.get("turbo-stream") && customElements.define("turbo-stream", At), void 0 === customElements.get("turbo-stream-source") && customElements.define("turbo-stream-source", Tt), (() => {
    let e = document.currentScript;
    if (e && !e.hasAttribute("data-turbo-suppress-warning"))
        for (e = e.parentElement; e;) {
            if (e == document.body) return console.warn(w`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your application’s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        ——
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `, e.outerHTML);
            e = e.parentElement
        }
})(), window.Turbo = {
    ...St,
    StreamActions: Lt
}, ct();
export {
    D as FetchEnctype, V as FetchMethod, W as FetchRequest, u as FetchResponse, r as FrameElement, s as FrameLoadingStyle, le as FrameRenderer, Ze as PageRenderer, me as PageSnapshot, Lt as StreamActions, At as StreamElement, Tt as StreamSourceElement, lt as cache, gt as clearCache, mt as connectStreamSource, pt as disconnectStreamSource, N as fetch, x as fetchEnctypeFromString, O as fetchMethodFromString, U as isSafe, ht as navigator, dt as registerAdapter, ft as renderStreamMessage, at as session, vt as setConfirmMethod, wt as setFormMode, bt as setProgressBarDelay, ct as start, ut as visit
};
export default null;
