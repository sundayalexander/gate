/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
;
if (typeof jQuery === "undefined") {
    throw new Error("Bootstrap's JavaScript requires jQuery")
}
+function (b) {
    var a = b.fn.jquery.split(" ")[0].split(".");
    if ((a[0] < 2 && a[1] < 9) || (a[0] == 1 && a[1] == 9 && a[2] < 1)) {
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
    }
}(jQuery);
+function (b) {
    function a() {
        var f = document.createElement("bootstrap");
        var d = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in d) {
            if (f.style[c] !== undefined) {
                return {end: d[c]}
            }
        }
        return false
    }

    b.fn.emulateTransitionEnd = function (f) {
        var d = false;
        var c = this;
        b(this).one("bsTransitionEnd", function () {
            d = true
        });
        var g = function () {
            if (!d) {
                b(c).trigger(b.support.transition.end)
            }
        };
        setTimeout(g, f);
        return this
    };
    b(function () {
        b.support.transition = a();
        if (!b.support.transition) {
            return
        }
        b.event.special.bsTransitionEnd = {
            bindType: b.support.transition.end,
            delegateType: b.support.transition.end,
            handle: function (c) {
                if (b(c.target).is(this)) {
                    return c.handleObj.handler.apply(this, arguments)
                }
            }
        }
    })
}(jQuery);
+function (f) {
    var d = '[data-dismiss="alert"]';
    var b = function (g) {
        f(g).on("click", d, this.close)
    };
    b.VERSION = "3.3.4";
    b.TRANSITION_DURATION = 150;
    b.prototype.close = function (k) {
        var j = f(this);
        var h = j.attr("data-target");
        if (!h) {
            h = j.attr("href");
            h = h && h.replace(/.*(?=#[^\s]*$)/, "")
        }
        var i = f(h);
        if (k) {
            k.preventDefault()
        }
        if (!i.length) {
            i = j.closest(".alert")
        }
        i.trigger(k = f.Event("close.bs.alert"));
        if (k.isDefaultPrevented()) {
            return
        }
        i.removeClass("in");

        function g() {
            i.detach().trigger("closed.bs.alert").remove()
        }

        f.support.transition && i.hasClass("fade") ? i.one("bsTransitionEnd", g).emulateTransitionEnd(b.TRANSITION_DURATION) : g()
    };

    function c(g) {
        return this.each(function () {
            var i = f(this);
            var h = i.data("bs.alert");
            if (!h) {
                i.data("bs.alert", (h = new b(this)))
            }
            if (typeof g == "string") {
                h[g].call(i)
            }
        })
    }

    var a = f.fn.alert;
    f.fn.alert = c;
    f.fn.alert.Constructor = b;
    f.fn.alert.noConflict = function () {
        f.fn.alert = a;
        return this
    };
    f(document).on("click.bs.alert.data-api", d, b.prototype.close)
}(jQuery);
+function (d) {
    var b = function (g, f) {
        this.$element = d(g);
        this.options = d.extend({}, b.DEFAULTS, f);
        this.isLoading = false
    };
    b.VERSION = "3.3.4";
    b.DEFAULTS = {loadingText: "loading..."};
    b.prototype.setState = function (h) {
        var j = "disabled";
        var f = this.$element;
        var i = f.is("input") ? "val" : "html";
        var g = f.data();
        h = h + "Text";
        if (g.resetText == null) {
            f.data("resetText", f[i]())
        }
        setTimeout(d.proxy(function () {
            f[i](g[h] == null ? this.options[h] : g[h]);
            if (h == "loadingText") {
                this.isLoading = true;
                f.addClass(j).attr(j, j)
            } else {
                if (this.isLoading) {
                    this.isLoading = false;
                    f.removeClass(j).removeAttr(j)
                }
            }
        }, this), 0)
    };
    b.prototype.toggle = function () {
        var g = true;
        var f = this.$element.closest('[data-toggle="buttons"]');
        if (f.length) {
            var h = this.$element.find("input");
            if (h.prop("type") == "radio") {
                if (h.prop("checked") && this.$element.hasClass("active")) {
                    g = false
                } else {
                    f.find(".active").removeClass("active")
                }
            }
            if (g) {
                h.prop("checked", !this.$element.hasClass("active")).trigger("change")
            }
        } else {
            this.$element.attr("aria-pressed", !this.$element.hasClass("active"))
        }
        if (g) {
            this.$element.toggleClass("active")
        }
    };

    function c(f) {
        return this.each(function () {
            var i = d(this);
            var h = i.data("bs.button");
            var g = typeof f == "object" && f;
            if (!h) {
                i.data("bs.button", (h = new b(this, g)))
            }
            if (f == "toggle") {
                h.toggle()
            } else {
                if (f) {
                    h.setState(f)
                }
            }
        })
    }

    var a = d.fn.button;
    d.fn.button = c;
    d.fn.button.Constructor = b;
    d.fn.button.noConflict = function () {
        d.fn.button = a;
        return this
    };
    d(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (g) {
        var f = d(g.target);
        if (!f.hasClass("btn")) {
            f = f.closest(".btn")
        }
        c.call(f, "toggle");
        g.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (f) {
        d(f.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(f.type))
    })
}(jQuery);
+function (c) {
    var d = function (h, g) {
        this.$element = c(h);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = g;
        this.paused = null;
        this.sliding = null;
        this.interval = null;
        this.$active = null;
        this.$items = null;
        this.options.keyboard && this.$element.on("keydown.bs.carousel", c.proxy(this.keydown, this));
        this.options.pause == "hover" && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", c.proxy(this.pause, this)).on("mouseleave.bs.carousel", c.proxy(this.cycle, this))
    };
    d.VERSION = "3.3.4";
    d.TRANSITION_DURATION = 600;
    d.DEFAULTS = {interval: 5000, pause: "hover", wrap: true, keyboard: true};
    d.prototype.keydown = function (g) {
        if (/input|textarea/i.test(g.target.tagName)) {
            return
        }
        switch (g.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        g.preventDefault()
    };
    d.prototype.cycle = function (g) {
        g || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval(c.proxy(this.next, this), this.options.interval));
        return this
    };
    d.prototype.getItemIndex = function (g) {
        this.$items = g.parent().children(".item");
        return this.$items.index(g || this.$active)
    };
    d.prototype.getItemForDirection = function (k, j) {
        var g = this.getItemIndex(j);
        var h = (k == "prev" && g === 0) || (k == "next" && g == (this.$items.length - 1));
        if (h && !this.options.wrap) {
            return j
        }
        var m = k == "prev" ? -1 : 1;
        var i = (g + m) % this.$items.length;
        return this.$items.eq(i)
    };
    d.prototype.to = function (i) {
        var h = this;
        var g = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (i > (this.$items.length - 1) || i < 0) {
            return
        }
        if (this.sliding) {
            return this.$element.one("slid.bs.carousel", function () {
                h.to(i)
            })
        }
        if (g == i) {
            return this.pause().cycle()
        }
        return this.slide(i > g ? "next" : "prev", this.$items.eq(i))
    };
    d.prototype.pause = function (g) {
        g || (this.paused = true);
        if (this.$element.find(".next, .prev").length && c.support.transition) {
            this.$element.trigger(c.support.transition.end);
            this.cycle(true)
        }
        this.interval = clearInterval(this.interval);
        return this
    };
    d.prototype.next = function () {
        if (this.sliding) {
            return
        }
        return this.slide("next")
    };
    d.prototype.prev = function () {
        if (this.sliding) {
            return
        }
        return this.slide("prev")
    };
    d.prototype.slide = function (o, j) {
        var r = this.$element.find(".item.active");
        var h = j || this.getItemForDirection(o, r);
        var m = this.interval;
        var p = o == "next" ? "left" : "right";
        var k = this;
        if (h.hasClass("active")) {
            return (this.sliding = false)
        }
        var n = h[0];
        var g = c.Event("slide.bs.carousel", {relatedTarget: n, direction: p});
        this.$element.trigger(g);
        if (g.isDefaultPrevented()) {
            return
        }
        this.sliding = true;
        m && this.pause();
        if (this.$indicators.length) {
            this.$indicators.find(".active").removeClass("active");
            var i = c(this.$indicators.children()[this.getItemIndex(h)]);
            i && i.addClass("active")
        }
        var q = c.Event("slid.bs.carousel", {relatedTarget: n, direction: p});
        if (c.support.transition && this.$element.hasClass("slide")) {
            h.addClass(o);
            h[0].offsetWidth;
            r.addClass(p);
            h.addClass(p);
            r.one("bsTransitionEnd", function () {
                h.removeClass([o, p].join(" ")).addClass("active");
                r.removeClass(["active", p].join(" "));
                k.sliding = false;
                setTimeout(function () {
                    k.$element.trigger(q)
                }, 0)
            }).emulateTransitionEnd(d.TRANSITION_DURATION)
        } else {
            r.removeClass("active");
            h.addClass("active");
            this.sliding = false;
            this.$element.trigger(q)
        }
        m && this.cycle();
        return this
    };

    function b(g) {
        return this.each(function () {
            var k = c(this);
            var j = k.data("bs.carousel");
            var h = c.extend({}, d.DEFAULTS, k.data(), typeof g == "object" && g);
            var i = typeof g == "string" ? g : h.slide;
            if (!j) {
                k.data("bs.carousel", (j = new d(this, h)))
            }
            if (typeof g == "number") {
                j.to(g)
            } else {
                if (i) {
                    j[i]()
                } else {
                    if (h.interval) {
                        j.pause().cycle()
                    }
                }
            }
        })
    }

    var a = c.fn.carousel;
    c.fn.carousel = b;
    c.fn.carousel.Constructor = d;
    c.fn.carousel.noConflict = function () {
        c.fn.carousel = a;
        return this
    };
    var f = function (m) {
        var h;
        var k = c(this);
        var g = c(k.attr("data-target") || (h = k.attr("href")) && h.replace(/.*(?=#[^\s]+$)/, ""));
        if (!g.hasClass("carousel")) {
            return
        }
        var i = c.extend({}, g.data(), k.data());
        var j = k.attr("data-slide-to");
        if (j) {
            i.interval = false
        }
        b.call(g, i);
        if (j) {
            g.data("bs.carousel").to(j)
        }
        m.preventDefault()
    };
    c(document).on("click.bs.carousel.data-api", "[data-slide]", f).on("click.bs.carousel.data-api", "[data-slide-to]", f);
    c(window).on("load", function () {
        c('[data-ride="carousel"]').each(function () {
            var g = c(this);
            b.call(g, g.data())
        })
    })
}(jQuery);
+function (d) {
    var f = function (h, g) {
        this.$element = d(h);
        this.options = d.extend({}, f.DEFAULTS, g);
        this.$trigger = d('[data-toggle="collapse"][href="#' + h.id + '"],[data-toggle="collapse"][data-target="#' + h.id + '"]');
        this.transitioning = null;
        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }
        if (this.options.toggle) {
            this.toggle()
        }
    };
    f.VERSION = "3.3.4";
    f.TRANSITION_DURATION = 350;
    f.DEFAULTS = {toggle: true};
    f.prototype.dimension = function () {
        var g = this.$element.hasClass("width");
        return g ? "width" : "height"
    };
    f.prototype.show = function () {
        if (this.transitioning || this.$element.hasClass("in")) {
            return
        }
        var i;
        var k = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
        if (k && k.length) {
            i = k.data("bs.collapse");
            if (i && i.transitioning) {
                return
            }
        }
        var h = d.Event("show.bs.collapse");
        this.$element.trigger(h);
        if (h.isDefaultPrevented()) {
            return
        }
        if (k && k.length) {
            b.call(k, "hide");
            i || k.data("bs.collapse", null)
        }
        var m = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[m](0).attr("aria-expanded", true);
        this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
        this.transitioning = 1;
        var g = function () {
            this.$element.removeClass("collapsing").addClass("collapse in")[m]("");
            this.transitioning = 0;
            this.$element.trigger("shown.bs.collapse")
        };
        if (!d.support.transition) {
            return g.call(this)
        }
        var j = d.camelCase(["scroll", m].join("-"));
        this.$element.one("bsTransitionEnd", d.proxy(g, this)).emulateTransitionEnd(f.TRANSITION_DURATION)[m](this.$element[0][j])
    };
    f.prototype.hide = function () {
        if (this.transitioning || !this.$element.hasClass("in")) {
            return
        }
        var h = d.Event("hide.bs.collapse");
        this.$element.trigger(h);
        if (h.isDefaultPrevented()) {
            return
        }
        var i = this.dimension();
        this.$element[i](this.$element[i]())[0].offsetHeight;
        this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", false);
        this.$trigger.addClass("collapsed").attr("aria-expanded", false);
        this.transitioning = 1;
        var g = function () {
            this.transitioning = 0;
            this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        };
        if (!d.support.transition) {
            return g.call(this)
        }
        this.$element[i](0).one("bsTransitionEnd", d.proxy(g, this)).emulateTransitionEnd(f.TRANSITION_DURATION)
    };
    f.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    f.prototype.getParent = function () {
        return d(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(d.proxy(function (j, h) {
            var g = d(h);
            this.addAriaAndCollapsedClass(c(g), g)
        }, this)).end()
    };
    f.prototype.addAriaAndCollapsedClass = function (h, g) {
        var i = h.hasClass("in");
        h.attr("aria-expanded", i);
        g.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };

    function c(g) {
        var h;
        var i = g.attr("data-target") || (h = g.attr("href")) && h.replace(/.*(?=#[^\s]+$)/, "");
        return d(i)
    }

    function b(g) {
        return this.each(function () {
            var j = d(this);
            var i = j.data("bs.collapse");
            var h = d.extend({}, f.DEFAULTS, j.data(), typeof g == "object" && g);
            if (!i && h.toggle && /show|hide/.test(g)) {
                h.toggle = false
            }
            if (!i) {
                j.data("bs.collapse", (i = new f(this, h)))
            }
            if (typeof g == "string") {
                i[g]()
            }
        })
    }

    var a = d.fn.collapse;
    d.fn.collapse = b;
    d.fn.collapse.Constructor = f;
    d.fn.collapse.noConflict = function () {
        d.fn.collapse = a;
        return this
    };
    d(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (k) {
        var j = d(this);
        if (!j.attr("data-target")) {
            k.preventDefault()
        }
        var g = c(j);
        var i = g.data("bs.collapse");
        var h = i ? "toggle" : j.data();
        b.call(g, h)
    })
}(jQuery);
+function (i) {
    var f = ".dropdown-backdrop";
    var b = '[data-toggle="dropdown"]';
    var a = function (j) {
        i(j).on("click.bs.dropdown", this.toggle)
    };
    a.VERSION = "3.3.4";
    a.prototype.toggle = function (o) {
        var n = i(this);
        if (n.is(".disabled, :disabled")) {
            return
        }
        var m = g(n);
        var k = m.hasClass("open");
        d();
        if (!k) {
            if ("ontouchstart" in document.documentElement && !m.closest(".navbar-nav").length) {
                i('<div class="dropdown-backdrop"/>').insertAfter(i(this)).on("click", d)
            }
            var j = {relatedTarget: this};
            m.trigger(o = i.Event("show.bs.dropdown", j));
            if (o.isDefaultPrevented()) {
                return
            }
            n.trigger("focus").attr("aria-expanded", "true");
            m.toggleClass("open").trigger("shown.bs.dropdown", j)
        }
        return false
    };
    a.prototype.keydown = function (o) {
        if (!/(38|40|27|32)/.test(o.which) || /input|textarea/i.test(o.target.tagName)) {
            return
        }
        var n = i(this);
        o.preventDefault();
        o.stopPropagation();
        if (n.is(".disabled, :disabled")) {
            return
        }
        var m = g(n);
        var k = m.hasClass("open");
        if ((!k && o.which != 27) || (k && o.which == 27)) {
            if (o.which == 27) {
                m.find(b).trigger("focus")
            }
            return n.trigger("click")
        }
        var p = " li:not(.disabled):visible a";
        var q = m.find('[role="menu"]' + p + ', [role="listbox"]' + p);
        if (!q.length) {
            return
        }
        var j = q.index(o.target);
        if (o.which == 38 && j > 0) {
            j--
        }
        if (o.which == 40 && j < q.length - 1) {
            j++
        }
        if (!~j) {
            j = 0
        }
        q.eq(j).trigger("focus")
    };

    function d(j) {
        if (j && j.which === 3) {
            return
        }
        i(f).remove();
        i(b).each(function () {
            var n = i(this);
            var m = g(n);
            var k = {relatedTarget: this};
            if (!m.hasClass("open")) {
                return
            }
            m.trigger(j = i.Event("hide.bs.dropdown", k));
            if (j.isDefaultPrevented()) {
                return
            }
            n.attr("aria-expanded", "false");
            m.removeClass("open").trigger("hidden.bs.dropdown", k)
        })
    }

    function g(m) {
        var j = m.attr("data-target");
        if (!j) {
            j = m.attr("href");
            j = j && /#[A-Za-z]/.test(j) && j.replace(/.*(?=#[^\s]*$)/, "")
        }
        var k = j && i(j);
        return k && k.length ? k : m.parent()
    }

    function h(j) {
        return this.each(function () {
            var m = i(this);
            var k = m.data("bs.dropdown");
            if (!k) {
                m.data("bs.dropdown", (k = new a(this)))
            }
            if (typeof j == "string") {
                k[j].call(m)
            }
        })
    }

    var c = i.fn.dropdown;
    i.fn.dropdown = h;
    i.fn.dropdown.Constructor = a;
    i.fn.dropdown.noConflict = function () {
        i.fn.dropdown = c;
        return this
    };
    i(document).on("click.bs.dropdown.data-api", d).on("click.bs.dropdown.data-api", ".dropdown form", function (j) {
        j.stopPropagation()
    }).on("click.bs.dropdown.data-api", b, a.prototype.toggle).on("keydown.bs.dropdown.data-api", b, a.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', a.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', a.prototype.keydown)
}(jQuery);
+function (d) {
    var b = function (g, f) {
        this.options = f;
        this.$body = d(document.body);
        this.$element = d(g);
        this.$dialog = this.$element.find(".modal-dialog");
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;
        if (this.options.remote) {
            this.$element.find(".modal-content").load(this.options.remote, d.proxy(function () {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        }
    };
    b.VERSION = "3.3.4";
    b.TRANSITION_DURATION = 300;
    b.BACKDROP_TRANSITION_DURATION = 150;
    b.DEFAULTS = {backdrop: true, keyboard: true, show: true};
    b.prototype.toggle = function (f) {
        return this.isShown ? this.hide() : this.show(f)
    };
    b.prototype.show = function (h) {
        var f = this;
        var g = d.Event("show.bs.modal", {relatedTarget: h});
        this.$element.trigger(g);
        if (this.isShown || g.isDefaultPrevented()) {
            return
        }
        this.isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass("modal-open");
        this.escape();
        this.resize();
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', d.proxy(this.hide, this));
        this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            f.$element.one("mouseup.dismiss.bs.modal", function (i) {
                if (d(i.target).is(f.$element)) {
                    f.ignoreBackdropClick = true
                }
            })
        });
        this.backdrop(function () {
            var j = d.support.transition && f.$element.hasClass("fade");
            if (!f.$element.parent().length) {
                f.$element.appendTo(f.$body)
            }
            f.$element.show().scrollTop(0);
            f.adjustDialog();
            if (j) {
                f.$element[0].offsetWidth
            }
            f.$element.addClass("in").attr("aria-hidden", false);
            f.enforceFocus();
            var i = d.Event("shown.bs.modal", {relatedTarget: h});
            j ? f.$dialog.one("bsTransitionEnd", function () {
                f.$element.trigger("focus").trigger(i)
            }).emulateTransitionEnd(b.TRANSITION_DURATION) : f.$element.trigger("focus").trigger(i)
        })
    };
    b.prototype.hide = function (f) {
        if (f) {
            f.preventDefault()
        }
        f = d.Event("hide.bs.modal");
        this.$element.trigger(f);
        if (!this.isShown || f.isDefaultPrevented()) {
            return
        }
        this.isShown = false;
        this.escape();
        this.resize();
        d(document).off("focusin.bs.modal");
        this.$element.removeClass("in").attr("aria-hidden", true).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");
        this.$dialog.off("mousedown.dismiss.bs.modal");
        d.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", d.proxy(this.hideModal, this)).emulateTransitionEnd(b.TRANSITION_DURATION) : this.hideModal()
    };
    b.prototype.enforceFocus = function () {
        d(document).off("focusin.bs.modal").on("focusin.bs.modal", d.proxy(function (f) {
            if (this.$element[0] !== f.target && !this.$element.has(f.target).length) {
                this.$element.trigger("focus")
            }
        }, this))
    };
    b.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on("keydown.dismiss.bs.modal", d.proxy(function (f) {
                f.which == 27 && this.hide()
            }, this))
        } else {
            if (!this.isShown) {
                this.$element.off("keydown.dismiss.bs.modal")
            }
        }
    };
    b.prototype.resize = function () {
        if (this.isShown) {
            d(window).on("resize.bs.modal", d.proxy(this.handleUpdate, this))
        } else {
            d(window).off("resize.bs.modal")
        }
    };
    b.prototype.hideModal = function () {
        var f = this;
        this.$element.hide();
        this.backdrop(function () {
            f.$body.removeClass("modal-open");
            f.resetAdjustments();
            f.resetScrollbar();
            f.$element.trigger("hidden.bs.modal")
        })
    };
    b.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    b.prototype.backdrop = function (j) {
        var i = this;
        var g = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = d.support.transition && g;
            this.$backdrop = d('<div class="modal-backdrop ' + g + '" />').appendTo(this.$body);
            this.$element.on("click.dismiss.bs.modal", d.proxy(function (k) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;
                    return
                }
                if (k.target !== k.currentTarget) {
                    return
                }
                this.options.backdrop == "static" ? this.$element[0].focus() : this.hide()
            }, this));
            if (f) {
                this.$backdrop[0].offsetWidth
            }
            this.$backdrop.addClass("in");
            if (!j) {
                return
            }
            f ? this.$backdrop.one("bsTransitionEnd", j).emulateTransitionEnd(b.BACKDROP_TRANSITION_DURATION) : j()
        } else {
            if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var h = function () {
                    i.removeBackdrop();
                    j && j()
                };
                d.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", h).emulateTransitionEnd(b.BACKDROP_TRANSITION_DURATION) : h()
            } else {
                if (j) {
                    j()
                }
            }
        }
    };
    b.prototype.handleUpdate = function () {
        this.adjustDialog()
    };
    b.prototype.adjustDialog = function () {
        var f = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && f ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !f ? this.scrollbarWidth : ""
        })
    };
    b.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    };
    b.prototype.checkScrollbar = function () {
        var g = window.innerWidth;
        if (!g) {
            var f = document.documentElement.getBoundingClientRect();
            g = f.right - Math.abs(f.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < g;
        this.scrollbarWidth = this.measureScrollbar()
    };
    b.prototype.setScrollbar = function () {
        var f = parseInt((this.$body.css("padding-right") || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        if (this.bodyIsOverflowing) {
            this.$body.css("padding-right", f + this.scrollbarWidth)
        }
    };
    b.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    };
    b.prototype.measureScrollbar = function () {
        var g = document.createElement("div");
        g.className = "modal-scrollbar-measure";
        this.$body.append(g);
        var f = g.offsetWidth - g.clientWidth;
        this.$body[0].removeChild(g);
        return f
    };

    function c(f, g) {
        return this.each(function () {
            var j = d(this);
            var i = j.data("bs.modal");
            var h = d.extend({}, b.DEFAULTS, j.data(), typeof f == "object" && f);
            if (!i) {
                j.data("bs.modal", (i = new b(this, h)))
            }
            if (typeof f == "string") {
                i[f](g)
            } else {
                if (h.show) {
                    i.show(g)
                }
            }
        })
    }

    var a = d.fn.modal;
    d.fn.modal = c;
    d.fn.modal.Constructor = b;
    d.fn.modal.noConflict = function () {
        d.fn.modal = a;
        return this
    };
    d(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (j) {
        var i = d(this);
        var g = i.attr("href");
        var f = d(i.attr("data-target") || (g && g.replace(/.*(?=#[^\s]+$)/, "")));
        var h = f.data("bs.modal") ? "toggle" : d.extend({remote: !/#/.test(g) && g}, f.data(), i.data());
        if (i.is("a")) {
            j.preventDefault()
        }
        f.one("show.bs.modal", function (k) {
            if (k.isDefaultPrevented()) {
                return
            }
            f.one("hidden.bs.modal", function () {
                i.is(":visible") && i.trigger("focus")
            })
        });
        c.call(f, h, this)
    })
}(jQuery);
+function (d) {
    var c = function (g, f) {
        this.type = null;
        this.options = null;
        this.enabled = null;
        this.timeout = null;
        this.hoverState = null;
        this.$element = null;
        this.init("tooltip", g, f)
    };
    c.VERSION = "3.3.4";
    c.TRANSITION_DURATION = 150;
    c.DEFAULTS = {
        animation: true,
        placement: "top",
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: false,
        container: false,
        viewport: {selector: "body", padding: 0}
    };
    c.prototype.init = function (n, k, h) {
        this.enabled = true;
        this.type = n;
        this.$element = d(k);
        this.options = this.getOptions(h);
        this.$viewport = this.options.viewport && d(this.options.viewport.selector || this.options.viewport);
        if (this.$element[0] instanceof document.constructor && !this.options.selector) {
            throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!")
        }
        var m = this.options.trigger.split(" ");
        for (var j = m.length; j--;) {
            var g = m[j];
            if (g == "click") {
                this.$element.on("click." + this.type, this.options.selector, d.proxy(this.toggle, this))
            } else {
                if (g != "manual") {
                    var o = g == "hover" ? "mouseenter" : "focusin";
                    var f = g == "hover" ? "mouseleave" : "focusout";
                    this.$element.on(o + "." + this.type, this.options.selector, d.proxy(this.enter, this));
                    this.$element.on(f + "." + this.type, this.options.selector, d.proxy(this.leave, this))
                }
            }
        }
        this.options.selector ? (this._options = d.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        })) : this.fixTitle()
    };
    c.prototype.getDefaults = function () {
        return c.DEFAULTS
    };
    c.prototype.getOptions = function (f) {
        f = d.extend({}, this.getDefaults(), this.$element.data(), f);
        if (f.delay && typeof f.delay == "number") {
            f.delay = {show: f.delay, hide: f.delay}
        }
        return f
    };
    c.prototype.getDelegateOptions = function () {
        var f = {};
        var g = this.getDefaults();
        this._options && d.each(this._options, function (h, i) {
            if (g[h] != i) {
                f[h] = i
            }
        });
        return f
    };
    c.prototype.enter = function (g) {
        var f = g instanceof this.constructor ? g : d(g.currentTarget).data("bs." + this.type);
        if (f && f.$tip && f.$tip.is(":visible")) {
            f.hoverState = "in";
            return
        }
        if (!f) {
            f = new this.constructor(g.currentTarget, this.getDelegateOptions());
            d(g.currentTarget).data("bs." + this.type, f)
        }
        clearTimeout(f.timeout);
        f.hoverState = "in";
        if (!f.options.delay || !f.options.delay.show) {
            return f.show()
        }
        f.timeout = setTimeout(function () {
            if (f.hoverState == "in") {
                f.show()
            }
        }, f.options.delay.show)
    };
    c.prototype.leave = function (g) {
        var f = g instanceof this.constructor ? g : d(g.currentTarget).data("bs." + this.type);
        if (!f) {
            f = new this.constructor(g.currentTarget, this.getDelegateOptions());
            d(g.currentTarget).data("bs." + this.type, f)
        }
        clearTimeout(f.timeout);
        f.hoverState = "out";
        if (!f.options.delay || !f.options.delay.hide) {
            return f.hide()
        }
        f.timeout = setTimeout(function () {
            if (f.hoverState == "out") {
                f.hide()
            }
        }, f.options.delay.hide)
    };
    c.prototype.show = function () {
        var q = d.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(q);
            var r = d.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (q.isDefaultPrevented() || !r) {
                return
            }
            var p = this;
            var n = this.tip();
            var i = this.getUID(this.type);
            this.setContent();
            n.attr("id", i);
            this.$element.attr("aria-describedby", i);
            if (this.options.animation) {
                n.addClass("fade")
            }
            var m = typeof this.options.placement == "function" ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement;
            var u = /\s?auto?\s?/i;
            var v = u.test(m);
            if (v) {
                m = m.replace(u, "") || "top"
            }
            n.detach().css({top: 0, left: 0, display: "block"}).addClass(m).data("bs." + this.type, this);
            this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
            var s = this.getPosition();
            var f = n[0].offsetWidth;
            var o = n[0].offsetHeight;
            if (v) {
                var k = m;
                var t = this.options.container ? d(this.options.container) : this.$element.parent();
                var h = this.getPosition(t);
                m = m == "bottom" && s.bottom + o > h.bottom ? "top" : m == "top" && s.top - o < h.top ? "bottom" : m == "right" && s.right + f > h.width ? "left" : m == "left" && s.left - f < h.left ? "right" : m;
                n.removeClass(k).addClass(m)
            }
            var j = this.getCalculatedOffset(m, s, f, o);
            this.applyPlacement(j, m);
            var g = function () {
                var w = p.hoverState;
                p.$element.trigger("shown.bs." + p.type);
                p.hoverState = null;
                if (w == "out") {
                    p.leave(p)
                }
            };
            d.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", g).emulateTransitionEnd(c.TRANSITION_DURATION) : g()
        }
    };
    c.prototype.applyPlacement = function (k, m) {
        var n = this.tip();
        var h = n[0].offsetWidth;
        var s = n[0].offsetHeight;
        var g = parseInt(n.css("margin-top"), 10);
        var j = parseInt(n.css("margin-left"), 10);
        if (isNaN(g)) {
            g = 0
        }
        if (isNaN(j)) {
            j = 0
        }
        k.top = k.top + g;
        k.left = k.left + j;
        d.offset.setOffset(n[0], d.extend({
            using: function (t) {
                n.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, k), 0);
        n.addClass("in");
        var f = n[0].offsetWidth;
        var o = n[0].offsetHeight;
        if (m == "top" && o != s) {
            k.top = k.top + s - o
        }
        var r = this.getViewportAdjustedDelta(m, k, f, o);
        if (r.left) {
            k.left += r.left
        } else {
            k.top += r.top
        }
        var p = /top|bottom/.test(m);
        var i = p ? r.left * 2 - h + f : r.top * 2 - s + o;
        var q = p ? "offsetWidth" : "offsetHeight";
        n.offset(k);
        this.replaceArrow(i, n[0][q], p)
    };
    c.prototype.replaceArrow = function (h, f, g) {
        this.arrow().css(g ? "left" : "top", 50 * (1 - h / f) + "%").css(g ? "top" : "left", "")
    };
    c.prototype.setContent = function () {
        var g = this.tip();
        var f = this.getTitle();
        g.find(".tooltip-inner")[this.options.html ? "html" : "text"](f);
        g.removeClass("fade in top bottom left right")
    };
    c.prototype.hide = function (j) {
        var g = this;
        var i = d(this.$tip);
        var h = d.Event("hide.bs." + this.type);

        function f() {
            if (g.hoverState != "in") {
                i.detach()
            }
            g.$element.removeAttr("aria-describedby").trigger("hidden.bs." + g.type);
            j && j()
        }

        this.$element.trigger(h);
        if (h.isDefaultPrevented()) {
            return
        }
        i.removeClass("in");
        d.support.transition && i.hasClass("fade") ? i.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f();
        this.hoverState = null;
        return this
    };
    c.prototype.fixTitle = function () {
        var f = this.$element;
        if (f.attr("title") || typeof (f.attr("data-original-title")) != "string") {
            f.attr("data-original-title", f.attr("title") || "").attr("title", "")
        }
    };
    c.prototype.hasContent = function () {
        return this.getTitle()
    };
    c.prototype.getPosition = function (h) {
        h = h || this.$element;
        var j = h[0];
        var g = j.tagName == "BODY";
        var i = j.getBoundingClientRect();
        if (i.width == null) {
            i = d.extend({}, i, {width: i.right - i.left, height: i.bottom - i.top})
        }
        var m = g ? {top: 0, left: 0} : h.offset();
        var f = {scroll: g ? document.documentElement.scrollTop || document.body.scrollTop : h.scrollTop()};
        var k = g ? {width: d(window).width(), height: d(window).height()} : null;
        return d.extend({}, i, f, k, m)
    };
    c.prototype.getCalculatedOffset = function (f, i, g, h) {
        return f == "bottom" ? {
            top: i.top + i.height,
            left: i.left + i.width / 2 - g / 2
        } : f == "top" ? {
            top: i.top - h,
            left: i.left + i.width / 2 - g / 2
        } : f == "left" ? {top: i.top + i.height / 2 - h / 2, left: i.left - g} : {
            top: i.top + i.height / 2 - h / 2,
            left: i.left + i.width
        }
    };
    c.prototype.getViewportAdjustedDelta = function (i, m, f, k) {
        var o = {top: 0, left: 0};
        if (!this.$viewport) {
            return o
        }
        var h = this.options.viewport && this.options.viewport.padding || 0;
        var n = this.getPosition(this.$viewport);
        if (/right|left/.test(i)) {
            var p = m.top - h - n.scroll;
            var j = m.top + h - n.scroll + k;
            if (p < n.top) {
                o.top = n.top - p
            } else {
                if (j > n.top + n.height) {
                    o.top = n.top + n.height - j
                }
            }
        } else {
            var q = m.left - h;
            var g = m.left + h + f;
            if (q < n.left) {
                o.left = n.left - q
            } else {
                if (g > n.width) {
                    o.left = n.left + n.width - g
                }
            }
        }
        return o
    };
    c.prototype.getTitle = function () {
        var h;
        var f = this.$element;
        var g = this.options;
        h = f.attr("data-original-title") || (typeof g.title == "function" ? g.title.call(f[0]) : g.title);
        return h
    };
    c.prototype.getUID = function (f) {
        do {
            f += ~~(Math.random() * 1000000)
        } while (document.getElementById(f));
        return f
    };
    c.prototype.tip = function () {
        return (this.$tip = this.$tip || d(this.options.template))
    };
    c.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"))
    };
    c.prototype.enable = function () {
        this.enabled = true
    };
    c.prototype.disable = function () {
        this.enabled = false
    };
    c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    };
    c.prototype.toggle = function (g) {
        var f = this;
        if (g) {
            f = d(g.currentTarget).data("bs." + this.type);
            if (!f) {
                f = new this.constructor(g.currentTarget, this.getDelegateOptions());
                d(g.currentTarget).data("bs." + this.type, f)
            }
        }
        f.tip().hasClass("in") ? f.leave(f) : f.enter(f)
    };
    c.prototype.destroy = function () {
        var f = this;
        clearTimeout(this.timeout);
        this.hide(function () {
            f.$element.off("." + f.type).removeData("bs." + f.type)
        })
    };

    function b(f) {
        return this.each(function () {
            var i = d(this);
            var h = i.data("bs.tooltip");
            var g = typeof f == "object" && f;
            if (!h && /destroy|hide/.test(f)) {
                return
            }
            if (!h) {
                i.data("bs.tooltip", (h = new c(this, g)))
            }
            if (typeof f == "string") {
                h[f]()
            }
        })
    }

    var a = d.fn.tooltip;
    d.fn.tooltip = b;
    d.fn.tooltip.Constructor = c;
    d.fn.tooltip.noConflict = function () {
        d.fn.tooltip = a;
        return this
    }
}(jQuery);
+function (d) {
    var c = function (g, f) {
        this.init("popover", g, f)
    };
    if (!d.fn.tooltip) {
        throw new Error("Popover requires tooltip.js")
    }
    c.VERSION = "3.3.4";
    c.DEFAULTS = d.extend({}, d.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    c.prototype = d.extend({}, d.fn.tooltip.Constructor.prototype);
    c.prototype.constructor = c;
    c.prototype.getDefaults = function () {
        return c.DEFAULTS
    };
    c.prototype.setContent = function () {
        var h = this.tip();
        var g = this.getTitle();
        var f = this.getContent();
        h.find(".popover-title")[this.options.html ? "html" : "text"](g);
        h.find(".popover-content").children().detach().end()[this.options.html ? (typeof f == "string" ? "html" : "append") : "text"](f);
        h.removeClass("fade top bottom left right in");
        if (!h.find(".popover-title").html()) {
            h.find(".popover-title").hide()
        }
    };
    c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    };
    c.prototype.getContent = function () {
        var f = this.$element;
        var g = this.options;
        return f.attr("data-content") || (typeof g.content == "function" ? g.content.call(f[0]) : g.content)
    };
    c.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"))
    };

    function b(f) {
        return this.each(function () {
            var i = d(this);
            var h = i.data("bs.popover");
            var g = typeof f == "object" && f;
            if (!h && /destroy|hide/.test(f)) {
                return
            }
            if (!h) {
                i.data("bs.popover", (h = new c(this, g)))
            }
            if (typeof f == "string") {
                h[f]()
            }
        })
    }

    var a = d.fn.popover;
    d.fn.popover = b;
    d.fn.popover.Constructor = c;
    d.fn.popover.noConflict = function () {
        d.fn.popover = a;
        return this
    }
}(jQuery);
+function (d) {
    function c(g, f) {
        this.$body = d(document.body);
        this.$scrollElement = d(g).is(document.body) ? d(window) : d(g);
        this.options = d.extend({}, c.DEFAULTS, f);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", d.proxy(this.process, this));
        this.refresh();
        this.process()
    }

    c.VERSION = "3.3.4";
    c.DEFAULTS = {offset: 10};
    c.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };
    c.prototype.refresh = function () {
        var h = this;
        var f = "offset";
        var g = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        if (!d.isWindow(this.$scrollElement[0])) {
            f = "position";
            g = this.$scrollElement.scrollTop()
        }
        this.$body.find(this.selector).map(function () {
            var j = d(this);
            var i = j.data("target") || j.attr("href");
            var k = /^#./.test(i) && d(i);
            return (k && k.length && k.is(":visible") && [[k[f]().top + g, i]]) || null
        }).sort(function (j, i) {
            return j[0] - i[0]
        }).each(function () {
            h.offsets.push(this[0]);
            h.targets.push(this[1])
        })
    };
    c.prototype.process = function () {
        var m = this.$scrollElement.scrollTop() + this.options.offset;
        var h = this.getScrollHeight();
        var k = this.options.offset + h - this.$scrollElement.height();
        var j = this.offsets;
        var f = this.targets;
        var n = this.activeTarget;
        var g;
        if (this.scrollHeight != h) {
            this.refresh()
        }
        if (m >= k) {
            return n != (g = f[f.length - 1]) && this.activate(g)
        }
        if (n && m < j[0]) {
            this.activeTarget = null;
            return this.clear()
        }
        for (g = j.length; g--;) {
            n != f[g] && m >= j[g] && (j[g + 1] === undefined || m < j[g + 1]) && this.activate(f[g])
        }
    };
    c.prototype.activate = function (h) {
        this.activeTarget = h;
        this.clear();
        var f = this.selector + '[data-target="' + h + '"],' + this.selector + '[href="' + h + '"]';
        var g = d(f).parents("li").addClass("active");
        if (g.parent(".dropdown-menu").length) {
            g = g.closest("li.dropdown").addClass("active")
        }
        g.trigger("activate.bs.scrollspy")
    };
    c.prototype.clear = function () {
        d(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };

    function b(f) {
        return this.each(function () {
            var i = d(this);
            var h = i.data("bs.scrollspy");
            var g = typeof f == "object" && f;
            if (!h) {
                i.data("bs.scrollspy", (h = new c(this, g)))
            }
            if (typeof f == "string") {
                h[f]()
            }
        })
    }

    var a = d.fn.scrollspy;
    d.fn.scrollspy = b;
    d.fn.scrollspy.Constructor = c;
    d.fn.scrollspy.noConflict = function () {
        d.fn.scrollspy = a;
        return this
    };
    d(window).on("load.bs.scrollspy.data-api", function () {
        d('[data-spy="scroll"]').each(function () {
            var f = d(this);
            b.call(f, f.data())
        })
    })
}(jQuery);
+function (d) {
    var b = function (g) {
        this.element = d(g)
    };
    b.VERSION = "3.3.4";
    b.TRANSITION_DURATION = 150;
    b.prototype.show = function () {
        var n = this.element;
        var i = n.closest("ul:not(.dropdown-menu)");
        var h = n.data("target");
        if (!h) {
            h = n.attr("href");
            h = h && h.replace(/.*(?=#[^\s]*$)/, "")
        }
        if (n.parent("li").hasClass("active")) {
            return
        }
        var k = i.find(".active:last a");
        var m = d.Event("hide.bs.tab", {relatedTarget: n[0]});
        var j = d.Event("show.bs.tab", {relatedTarget: k[0]});
        k.trigger(m);
        n.trigger(j);
        if (j.isDefaultPrevented() || m.isDefaultPrevented()) {
            return
        }
        var g = d(h);
        this.activate(n.closest("li"), i);
        this.activate(g, g.parent(), function () {
            k.trigger({type: "hidden.bs.tab", relatedTarget: n[0]});
            n.trigger({type: "shown.bs.tab", relatedTarget: k[0]})
        })
    };
    b.prototype.activate = function (i, h, m) {
        var g = h.find("> .active");
        var k = m && d.support.transition && ((g.length && g.hasClass("fade")) || !!h.find("> .fade").length);

        function j() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", false);
            i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", true);
            if (k) {
                i[0].offsetWidth;
                i.addClass("in")
            } else {
                i.removeClass("fade")
            }
            if (i.parent(".dropdown-menu").length) {
                i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", true)
            }
            m && m()
        }

        g.length && k ? g.one("bsTransitionEnd", j).emulateTransitionEnd(b.TRANSITION_DURATION) : j();
        g.removeClass("in")
    };

    function c(g) {
        return this.each(function () {
            var i = d(this);
            var h = i.data("bs.tab");
            if (!h) {
                i.data("bs.tab", (h = new b(this)))
            }
            if (typeof g == "string") {
                h[g]()
            }
        })
    }

    var a = d.fn.tab;
    d.fn.tab = c;
    d.fn.tab.Constructor = b;
    d.fn.tab.noConflict = function () {
        d.fn.tab = a;
        return this
    };
    var f = function (g) {
        g.preventDefault();
        c.call(d(this), "show")
    };
    d(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', f).on("click.bs.tab.data-api", '[data-toggle="pill"]', f)
}(jQuery);
+function (d) {
    var c = function (g, f) {
        this.options = d.extend({}, c.DEFAULTS, f);
        this.$target = d(this.options.target).on("scroll.bs.affix.data-api", d.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", d.proxy(this.checkPositionWithEventLoop, this));
        this.$element = d(g);
        this.affixed = null;
        this.unpin = null;
        this.pinnedOffset = null;
        this.checkPosition()
    };
    c.VERSION = "3.3.4";
    c.RESET = "affix affix-top affix-bottom";
    c.DEFAULTS = {offset: 0, target: window};
    c.prototype.getState = function (p, o, g, h) {
        var f = this.$target.scrollTop();
        var j = this.$element.offset();
        var k = this.$target.height();
        if (g != null && this.affixed == "top") {
            return f < g ? "top" : false
        }
        if (this.affixed == "bottom") {
            if (g != null) {
                return (f + this.unpin <= j.top) ? false : "bottom"
            }
            return (f + k <= p - h) ? false : "bottom"
        }
        var i = this.affixed == null;
        var n = i ? f : j.top;
        var m = i ? k : o;
        if (g != null && f <= g) {
            return "top"
        }
        if (h != null && (n + m >= p - h)) {
            return "bottom"
        }
        return false
    };
    c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) {
            return this.pinnedOffset
        }
        this.$element.removeClass(c.RESET).addClass("affix");
        var g = this.$target.scrollTop();
        var f = this.$element.offset();
        return (this.pinnedOffset = f.top - g)
    };
    c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(d.proxy(this.checkPosition, this), 1)
    };
    c.prototype.checkPosition = function () {
        if (!this.$element.is(":visible")) {
            return
        }
        var f = this.$element.height();
        var m = this.options.offset;
        var j = m.top;
        var h = m.bottom;
        var i = d(document.body).height();
        if (typeof m != "object") {
            h = j = m
        }
        if (typeof j == "function") {
            j = m.top(this.$element)
        }
        if (typeof h == "function") {
            h = m.bottom(this.$element)
        }
        var g = this.getState(i, f, j, h);
        if (this.affixed != g) {
            if (this.unpin != null) {
                this.$element.css("top", "")
            }
            var n = "affix" + (g ? "-" + g : "");
            var k = d.Event(n + ".bs.affix");
            this.$element.trigger(k);
            if (k.isDefaultPrevented()) {
                return
            }
            this.affixed = g;
            this.unpin = g == "bottom" ? this.getPinnedOffset() : null;
            this.$element.removeClass(c.RESET).addClass(n).trigger(n.replace("affix", "affixed") + ".bs.affix")
        }
        if (g == "bottom") {
            this.$element.offset({top: i - f - h})
        }
    };

    function b(f) {
        return this.each(function () {
            var i = d(this);
            var h = i.data("bs.affix");
            var g = typeof f == "object" && f;
            if (!h) {
                i.data("bs.affix", (h = new c(this, g)))
            }
            if (typeof f == "string") {
                h[f]()
            }
        })
    }

    var a = d.fn.affix;
    d.fn.affix = b;
    d.fn.affix.Constructor = c;
    d.fn.affix.noConflict = function () {
        d.fn.affix = a;
        return this
    };
    d(window).on("load", function () {
        d('[data-spy="affix"]').each(function () {
            var g = d(this);
            var f = g.data();
            f.offset = f.offset || {};
            if (f.offsetBottom != null) {
                f.offset.bottom = f.offsetBottom
            }
            if (f.offsetTop != null) {
                f.offset.top = f.offsetTop
            }
            b.call(g, f)
        })
    })
}(jQuery);
var bootbox = window.bootbox || function (k, c) {
    function i(g, h) {
        null == h && (h = a);
        return "string" === typeof f[h][g] ? f[h][g] : h != w ? i(g, w) : g
    }

    var a = "en", w = "en", p = !0, b = "static", o = "", j = {}, d = {
        setLocale: function (g) {
            for (var h in f) {
                if (h == g) {
                    a = g;
                    return
                }
            }
            throw Error("Invalid locale: " + g)
        }, addLocale: function (g, h) {
            "undefined" === typeof f[g] && (f[g] = {});
            for (var m in h) {
                f[g][m] = h[m]
            }
        }, setIcons: function (g) {
            j = g;
            if ("object" !== typeof j || null == j) {
                j = {}
            }
        }, alert: function () {
            var g = "", h = i("OK"), m = null;
            switch (arguments.length) {
                case 1:
                    g = arguments[0];
                    break;
                case 2:
                    g = arguments[0];
                    "function" == typeof arguments[1] ? m = arguments[1] : h = arguments[1];
                    break;
                case 3:
                    g = arguments[0];
                    h = arguments[1];
                    m = arguments[2];
                    break;
                default:
                    throw Error("Incorrect number of arguments: expected 1-3")
            }
            return d.dialog(g, {label: h, icon: j.OK, callback: m}, {onEscape: m || !0})
        }, confirm: function () {
            var g = "", h = i("CANCEL"), q = i("CONFIRM"), n = null;
            switch (arguments.length) {
                case 1:
                    g = arguments[0];
                    break;
                case 2:
                    g = arguments[0];
                    "function" == typeof arguments[1] ? n = arguments[1] : h = arguments[1];
                    break;
                case 3:
                    g = arguments[0];
                    h = arguments[1];
                    "function" == typeof arguments[2] ? n = arguments[2] : q = arguments[2];
                    break;
                case 4:
                    g = arguments[0];
                    h = arguments[1];
                    q = arguments[2];
                    n = arguments[3];
                    break;
                default:
                    throw Error("Incorrect number of arguments: expected 1-4")
            }
            var m = function () {
                "function" === typeof n && n(!1)
            };
            return d.dialog(g, [{label: h, icon: j.CANCEL, callback: m}, {
                label: q,
                icon: j.CONFIRM,
                callback: function () {
                    "function" === typeof n && n(!0)
                }
            }], {onEscape: m})
        }, prompt: function () {
            var g = "", h = i("CANCEL"), s = i("CONFIRM"), q = null, n = "";
            switch (arguments.length) {
                case 1:
                    g = arguments[0];
                    break;
                case 2:
                    g = arguments[0];
                    "function" == typeof arguments[1] ? q = arguments[1] : h = arguments[1];
                    break;
                case 3:
                    g = arguments[0];
                    h = arguments[1];
                    "function" == typeof arguments[2] ? q = arguments[2] : s = arguments[2];
                    break;
                case 4:
                    g = arguments[0];
                    h = arguments[1];
                    s = arguments[2];
                    q = arguments[3];
                    break;
                case 5:
                    g = arguments[0];
                    h = arguments[1];
                    s = arguments[2];
                    q = arguments[3];
                    n = arguments[4];
                    break;
                default:
                    throw Error("Incorrect number of arguments: expected 1-5")
            }
            var r = c("<form></form>");
            r.append("<input autocomplete=off type=text value='" + n + "' />");
            var n = function () {
                "function" === typeof q && q(null)
            }, m = d.dialog(r, [{label: h, icon: j.CANCEL, callback: n}, {
                label: s,
                icon: j.CONFIRM,
                callback: function () {
                    "function" === typeof q && q(r.find("input[type=text]").val())
                }
            }], {header: g, show: !1, onEscape: n});
            m.on("shown", function () {
                r.find("input[type=text]").focus();
                r.on("submit", function (t) {
                    t.preventDefault();
                    m.find(".btn-primary").click()
                })
            });
            m.modal("show");
            return m
        }, dialog: function (C, D, B) {
            var z = "", t = [];
            B = B || {};
            null == D ? D = [] : "undefined" == typeof D.length && (D = [D]);
            for (var A = D.length; A--;) {
                var s = null, v = null, u = null, r = "", q = null;
                if ("undefined" == typeof D[A].label && "undefined" == typeof D[A]["class"] && "undefined" == typeof D[A].callback) {
                    var s = 0, v = null, n;
                    for (n in D[A]) {
                        if (v = n, 1 < ++s) {
                            break
                        }
                    }
                    1 == s && "function" == typeof D[A][n] && (D[A].label = v, D[A].callback = D[A][n])
                }
                "function" == typeof D[A].callback && (q = D[A].callback);
                D[A]["class"] ? u = D[A]["class"] : A == D.length - 1 && 2 >= D.length && (u = "btn-primary");
                s = D[A].label ? D[A].label : "Option " + (A + 1);
                D[A].icon && (r = "<i class='" + D[A].icon + "'></i> ");
                v = D[A].href ? D[A].href : "javascript:;";
                z = "<a data-handler='" + A + "' class='btn " + u + "' href='" + v + "'>" + r + "" + s + "</a>" + z;
                t[A] = q
            }
            A = ["<div class='bootbox modal' tabindex='-1' style='overflow:hidden;'>"];
            if (B.header) {
                u = "";
                if ("undefined" == typeof B.headerCloseButton || B.headerCloseButton) {
                    u = "<a href='javascript:;' class='close'>&times;</a>"
                }
                A.push("<div class='modal-header'>" + u + "<h3>" + B.header + "</h3></div>")
            }
            A.push("<div class='modal-body'></div>");
            z && A.push("<div class='modal-footer'>" + z + "</div>");
            A.push("</div>");
            var y = c(A.join("\n"));
            ("undefined" === typeof B.animate ? p : B.animate) && y.addClass("fade");
            (z = "undefined" === typeof B.classes ? o : B.classes) && y.addClass(z);
            y.find(".modal-body").html(C);
            y.on("hidden", function () {
                y.remove()
            });
            y.on("keyup.dismiss.modal", function (g) {
                if (27 == g.which && B.onEscape) {
                    if ("function" === typeof B.onEscape) {
                        B.onEscape()
                    }
                    y.modal("hide")
                }
            });
            y.on("shown", function () {
                y.find("a.btn-primary:first").focus()
            });
            y.on("click", ".modal-footer a, a.close", function (g) {
                var E = c(this).data("handler"), m = t[E], h = null;
                "undefined" !== typeof E && "undefined" !== typeof D[E].href || (g.preventDefault(), "function" == typeof m && (h = m()), !1 !== h && y.modal("hide"))
            });
            c("body").append(y);
            y.modal({backdrop: "undefined" === typeof B.backdrop ? b : B.backdrop, keyboard: !1, show: !1});
            y.on("show", function () {
                c(k).off("focusin.modal")
            });
            ("undefined" === typeof B.show || !0 === B.show) && y.modal("show");
            return y
        }, modal: function () {
            var g, h, n, m = {onEscape: null, keyboard: !0, backdrop: b};
            switch (arguments.length) {
                case 1:
                    g = arguments[0];
                    break;
                case 2:
                    g = arguments[0];
                    "object" == typeof arguments[1] ? n = arguments[1] : h = arguments[1];
                    break;
                case 3:
                    g = arguments[0];
                    h = arguments[1];
                    n = arguments[2];
                    break;
                default:
                    throw Error("Incorrect number of arguments: expected 1-3")
            }
            m.header = h;
            n = "object" == typeof n ? c.extend(m, n) : m;
            return d.dialog(g, [], n)
        }, hideAll: function () {
            c(".bootbox").modal("hide")
        }, animate: function (g) {
            p = g
        }, backdrop: function (g) {
            b = g
        }, classes: function (g) {
            o = g
        }
    }, f = {
        en: {OK: "OK", CANCEL: "Cancel", CONFIRM: "OK"},
        fr: {OK: "OK", CANCEL: "Annuler", CONFIRM: "D'accord"},
        de: {OK: "OK", CANCEL: "Abbrechen", CONFIRM: "Akzeptieren"},
        es: {OK: "OK", CANCEL: "Cancelar", CONFIRM: "Aceptar"},
        br: {OK: "OK", CANCEL: "Cancelar", CONFIRM: "Sim"},
        nl: {OK: "OK", CANCEL: "Annuleren", CONFIRM: "Accepteren"},
        ru: {
            OK: "OK",
            CANCEL: "\u041e\u0442\u043c\u0435\u043d\u0430",
            CONFIRM: "\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c"
        },
        it: {OK: "OK", CANCEL: "Annulla", CONFIRM: "Conferma"}
    };
    return d
}(document, window.jQuery);
window.bootbox = bootbox;
(function (a) {
    a.fn.smartPopover = function (d) {
        d.toggle = "manual";
        var f = null;
        var b = null;
        var c = null;
        a(this).popover(d).mouseenter(function () {
            c = this;
            a(this).popover("show");
            b = a(this).data("popover").$tip;
            a(b).mouseenter(function () {
                clearTimeout(f)
            }).mouseleave(function () {
                a(c).popover("hide")
            })
        }).mouseleave(function () {
            var g = this;
            f = setTimeout(function () {
                a(g).popover("hide")
            }, 150)
        })
    }
})(jQuery);
/*!
jquery.notice */
(function (a) {
    a.extend({
        noticeAdd: function (c) {
            var g = {
                inEffect: {opacity: "show"},
                inEffectDuration: 600,
                stayTime: 2000,
                text: "",
                stay: false,
                type: "notice"
            };
            var c, h, f, d, b;
            c = a.extend({}, g, c);
            h = (!a(".notice-wrap").length) ? a("<div></div>").addClass("notice-wrap").appendTo("body") : a(".notice-wrap");
            f = a("<div></div>").addClass("notice-item-wrapper");
            d = a("<div></div>").hide().addClass("notice-item " + c.type).appendTo(h).html("<p>" + c.text + "</p>").animate(c.inEffect, c.inEffectDuration).wrap(f);
            b = a("<div></div>").addClass("notice-item-close").prependTo(d).html("x").click(function () {
                a.noticeRemove(d)
            });
            if (navigator.userAgent.match(/MSIE 6/i)) {
                h.css({top: document.documentElement.scrollTop})
            }
            if (!c.stay) {
                setTimeout(function () {
                    a.noticeRemove(d)
                }, c.stayTime)
            }
        }, noticeRemove: function (b) {
            b.animate({opacity: "0"}, 600, function () {
                b.parent().animate({height: "0px"}, 300, function () {
                    b.parent().remove()
                })
            })
        }
    })
})(jQuery);
/*!
jquery.cropzoom */
(function (c) {
    var a = null;
    var q = null;
    c.fn.cropzoom = function (w) {
        q = c.extend(true, c.fn.cropzoom.defaults, w);
        return this.each(function () {
            if (!c.isFunction(c.fn.draggable) || !c.isFunction(c.fn.resizable) || !c.isFunction(c.fn.slider)) {
                alert("You must include ui.draggable, ui.resizable and ui.slider to use cropZoom");
                return
            }
            if (q.image.source == "" || q.image.width == 0 || q.image.height == 0) {
                alert("You must set the source, witdth and height of the image element");
                return
            }
            a = c(this);
            a.empty();
            a.css({
                width: q.width,
                height: q.height,
                "background-color": q.bgColor,
                overflow: "hidden",
                position: "relative",
                border: "2px solid #333"
            });
            b("image", {
                h: q.image.height,
                w: q.image.width,
                posY: 0,
                posX: 0,
                scaleX: 0,
                scaleY: 0,
                rotation: 0,
                source: q.image.source
            });
            s();
            f();
            n("image").posX = Math.abs((q.width / 2) - (n("image").w / 2));
            n("image").posY = Math.abs((q.height / 2) - (n("image").h / 2));
            b("selector", {
                x: q.selector.x,
                y: q.selector.y,
                w: (q.selector.maxWidth != null ? (q.selector.w > q.selector.maxWidth ? q.selector.maxWidth : q.selector.w) : q.selector.w),
                h: (q.selector.maxHeight != null ? (q.selector.h > q.selector.maxHeight ? q.selector.maxHeight : q.selector.h) : q.selector.h)
            });
            var y = null;
            var B = null;
            if (!c.browser.msie()) {
                y = a[0].ownerDocument.createElementNS("http://www.w3.org/2000/svg", "svg");
                y.setAttribute("id", "k");
                y.setAttribute("width", q.width);
                y.setAttribute("height", q.height);
                y.setAttribute("preserveAspectRatio", "none");
                B = a[0].ownerDocument.createElementNS("http://www.w3.org/2000/svg", "image");
                B.setAttributeNS("http://www.w3.org/1999/xlink", "href", q.image.source);
                B.setAttribute("width", n("image").w);
                B.setAttribute("height", n("image").h);
                B.setAttribute("id", "img_to_crop");
                B.setAttribute("preserveAspectRatio", "none");
                c(B).svgAttr("x", 0);
                c(B).svgAttr("y", 0);
                y.appendChild(B)
            } else {
                a[0].ownerDocument.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML");
                var A = document.createStyleSheet();
                A.addRule("v\\:image", "behavior: url(#default#VML);display:inline-block");
                A.addRule("v\\:image", "antiAlias: false;");
                y = c("<div />").svgAttr("id", "k").css({width: q.width, height: q.height, position: "absolute"});
                B = document.createElement("v:image");
                B.setAttribute("id", "img_to_crop");
                B.setAttribute("src", q.image.source);
                B.setAttribute("gamma", "0");
                c(B).css({position: "absolute", left: 0, top: 0, width: n("image").w, height: n("image").h});
                B.setAttribute("coordsize", "21600,21600");
                B.outerHTML = B.outerHTML;
                var z = o();
                if (z == "png" || z == "gif") {
                    B.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + q.image.source + "',sizingMethod='scale');"
                }
                y.append(B)
            }
            a.append(y);
            v();
            c(c("#img_to_crop"), B).draggable({
                drag: function (C, D) {
                    n("image").posY = D.position.top;
                    n("image").posX = D.position.left;
                    v();
                    if (q.onImageDrag != null) {
                        q.onImageDrag(c("#img_to_crop"), n("image"))
                    }
                }
            });
            g();
            a.find(".ui-icon-gripsmall-diagonal-se").css({
                background: "#FFF",
                border: "1px solid #000",
                width: 8,
                height: 8
            });
            j();
            if (q.enableZoom) {
                h()
            }
            if (q.enableRotation) {
                r()
            }
            return this
        })
    };

    function o() {
        var w = q.image.source.split(".");
        return w[w.length - 1]
    }

    function s() {
        n("image").scaleX = parseFloat(q.width / n("image").w);
        n("image").scaleY = parseFloat(q.height / n("image").h)
    }

    function f() {
        var y = n("image").scaleX;
        var w = n("image").scaleY;
        if (w < y) {
            n("image").h = q.height;
            n("image").w = Math.round(n("image").w * w)
        } else {
            n("image").h = Math.round(n("image").h * y);
            n("image").w = q.width
        }
    }

    function v() {
        var y = "";
        var w = "";
        if (c.browser.msie()) {
            y = n("image").rotation;
            c("#img_to_crop").css({rotation: y, top: n("image").posY, left: n("image").posX})
        } else {
            y = "rotate(" + n("image").rotation + "," + (n("image").posX + (n("image").w / 2)) + "," + (n("image").posY + (n("image").h / 2)) + ")";
            w = " translate(" + n("image").posX + "," + n("image").posY + ")";
            y += w;
            c("#img_to_crop").svgAttr("transform", y)
        }
    }

    function r() {
        var A = c("<div />").css({
            position: "absolute",
            "background-color": "#FFF",
            "z-index": 3,
            opacity: 0.6,
            width: 31,
            height: a.height() / 2,
            top: 5,
            left: 5
        }).mouseover(function () {
            c(this).css("opacity", 1)
        }).mouseout(function () {
            c(this).css("opacity", 0.6)
        });
        var y = c("<div />").css({color: "#000", font: "700 11px Arial", margin: "auto", width: 10});
        var w = c("<div />").css({color: "#000", font: "700 11px Arial", margin: "auto", width: 21});
        y.html("0");
        w.html("360");
        var z = c("<div />");
        z.slider({
            orientation: "vertical",
            value: 360,
            min: 0,
            max: 360,
            step: ((q.rotationSteps > 360 || q.rotationSteps < 0) ? 1 : q.rotationSteps),
            slide: function (B, C) {
                n("image").rotation = Math.abs(360 - C.value);
                v();
                if (q.onRotate != null) {
                    q.onRotate(c("#img_to_crop"), n("image").rotation)
                }
            }
        });
        A.append(y);
        A.append(z);
        A.append(w);
        z.css({margin: " 7px auto", height: (a.height() / 2) - 60, position: "relative", width: 7});
        a.append(A)
    }

    function h() {
        var y = c("<div />").css({
            position: "absolute",
            "background-color": "#FFF",
            "z-index": 3,
            opacity: 0.6,
            width: 31,
            height: (a.height() / 2),
            top: 5,
            right: 5
        }).mouseover(function () {
            c(this).css("opacity", 1)
        }).mouseout(function () {
            c(this).css("opacity", 0.6)
        });
        var w = c("<div />").css({
            color: "#000",
            font: "700 14px Arial",
            margin: "auto",
            width: "100%",
            "text-align": "center"
        }).html("<b>-</b>");
        var A = c("<div />").css({
            color: "#000",
            font: "700 14px Arial",
            margin: "auto",
            width: "100%",
            "text-align": "center"
        }).html("<b>+</b>");
        var z = c("<div />");
        z.slider({
            orientation: "vertical",
            value: d(),
            min: q.image.minZoom,
            max: q.image.maxZoom,
            step: ((q.zoomSteps > q.image.maxZoom || q.zoomSteps < 0) ? 1 : q.zoomSteps),
            slide: function (B, D) {
                var E = ((q.image.width * Math.abs(D.value)) / 100);
                var C = ((q.image.height * Math.abs(D.value)) / 100);
                if (!c.browser.msie()) {
                    c("#img_to_crop").svgAttr("width", E + "px");
                    c("#img_to_crop").svgAttr("height", C + "px")
                } else {
                    c("#img_to_crop").css({width: E + "px", height: C + "px"})
                }
                n("image").w = E;
                n("image").h = C;
                s();
                n("image").posX = ((q.width / 2) - (n("image").w / 2));
                n("image").posY = ((q.height / 2) - (n("image").h / 2));
                v();
                if (q.onZoom != null) {
                    q.onZoom(c("#img_to_crop"), n("image"))
                }
            }
        });
        y.append(A);
        y.append(z);
        y.append(w);
        z.css({margin: " 7px auto", height: (a.height() / 2) - 60, width: 7, position: "relative"});
        a.append(y)
    }

    function d() {
        var w = 0;
        if (n("image").w > n("image").h) {
            w = ((n("image").w * 100) / q.image.width)
        } else {
            w = ((n("image").h * 100) / q.image.height)
        }
        return w
    }

    function g() {
        if (q.selector.centered) {
            n("selector").y = (q.height / 2) - (n("selector").h / 2);
            n("selector").x = (q.width / 2) - (n("selector").w / 2)
        }
        var w = c("<div />").svgAttr("id", "selector").css({
            width: n("selector").w,
            height: n("selector").h,
            top: n("selector").y + "px",
            left: n("selector").x + "px",
            border: "1px dashed " + q.selector.borderColor,
            position: "absolute",
            cursor: "move"
        }).mouseover(function () {
            c(this).css({border: "1px dashed " + q.selector.borderColorHover})
        }).mouseout(function () {
            c(this).css({border: "1px dashed " + q.selector.borderColor})
        });
        w.draggable({
            containment: a, iframeFix: true, refreshPositions: true, drag: function (y, z) {
                n("selector").x = z.position.left;
                n("selector").y = z.position.top;
                u(z);
                i(w);
                if (q.onSelectorDrag != null) {
                    q.onSelectorDrag(w, n("selector"))
                }
            }, stop: function (y, z) {
                t();
                if (q.onSelectorDragStop != null) {
                    q.onSelectorDragStop(w, n("selector"))
                }
            }
        });
        w.resizable({
            aspectRatio: q.selector.aspectRatio,
            maxHeight: q.selector.maxHeight,
            maxWidth: q.selector.maxWidth,
            minHeight: q.selector.h,
            minWidth: q.selector.w,
            containment: "parent",
            resize: function (y, z) {
                n("selector").w = w.width();
                n("selector").h = w.height();
                u(z);
                i(w);
                if (q.onSelectorResize != null) {
                    q.onSelectorResize(w, n("selector"))
                }
            },
            stop: function (y, z) {
                if (q.onSelectorResizeStop != null) {
                    q.onSelectorResizeStop(w, n("selector"))
                }
            }
        });
        i(w);
        a.append(w)
    }

    function i(y) {
        var w = null;
        var z = false;
        if (y.find("#infoSelector").length > 0) {
            w = y.find("#infoSelector")
        } else {
            w = c("<div />").svgAttr("id", "infoSelector").css({
                position: "absolute",
                top: 0,
                left: 0,
                background: q.selector.bgInfoLayer,
                opacity: 0.6,
                "font-size": q.selector.infoFontSize + "px",
                "font-family": "Arial",
                color: q.selector.infoFontColor,
                width: "100%"
            })
        }
        if (q.selector.showDimetionsOnDrag) {
            w.html("X:" + n("selector").x + "px - Y:" + n("selector").y + "px");
            z = true
        }
        if (q.selector.showPositionsOnDrag) {
            if (z) {
                w.html(w.html() + " | W:" + n("selector").w + "px - H:" + n("selector").h + "px")
            } else {
                w.html("W:" + n("selector").w + "px - H:" + n("selector").h + "px")
            }
        }
        y.append(w)
    }

    function j() {
        var w = ["t", "b", "l", "r"];
        c.each(w, function () {
            var y = c("<div />").svgAttr("id", this).css({
                overflow: "hidden",
                background: q.overlayColor,
                opacity: 0.6,
                position: "absolute",
                "z-index": 2,
                visibility: "visible"
            });
            a.append(y)
        })
    }

    function u(w) {
        c("#t").css({display: "block", width: q.width, height: w.position.top, left: 0, top: 0});
        c("#b").css({
            display: "block",
            width: q.width,
            height: q.height,
            top: (w.position.top + c("#selector").height()) + "px",
            left: 0
        });
        c("#l").css({
            display: "block",
            left: 0,
            top: w.position.top,
            width: w.position.left,
            height: c("#selector").height()
        });
        c("#r").css({
            display: "block",
            top: w.position.top,
            left: (w.position.left + c("#selector").width()) + "px",
            width: q.width,
            height: c("#selector").height() + "px"
        })
    }

    function t() {
        c("#t,#b,#l,#r").hide()
    }

    function b(w, y) {
        a.data(w, y)
    }

    function n(w) {
        return a.data(w)
    }

    var m = c.fn.attr;
    c.fn.svgAttr = function (y, A, z) {
        if (typeof y === "string" && A === undefined) {
            var B = m.apply(this, [y, A, z]);
            return (B && B.baseVal ? B.baseVal.valueAsString : B)
        }
        var w = y;
        if (typeof y === "string") {
            w = {};
            w[y] = A
        }
        return this.each(function () {
            if (k(this)) {
                for (var C in w) {
                    this.setAttribute(C, (typeof w[C] == "function" ? w[C]() : w[C]))
                }
            } else {
                m.apply(c(this), [y, A, z])
            }
        })
    };

    function k(w) {
        return (w.nodeType == 1 && w.namespaceURI == "http://www.w3.org/2000/svg")
    }

    function p(z) {
        var A = n("image");
        var w = n("selector");
        var y = {
            viewPortW: a.width(),
            viewPortH: a.height(),
            imageX: A.posX,
            imageY: A.posY,
            imageRotate: A.rotation,
            imageW: A.w,
            imageH: A.h,
            imageSource: A.source,
            selectorX: w.x,
            selectorY: w.y,
            selectorW: w.w,
            selectorH: w.h
        };
        return c.extend(y, z)
    }

    c.fn.cropzoom.defaults = {
        width: 500,
        height: 375,
        bgColor: "#000",
        overlayColor: "#000",
        selector: {
            x: 0,
            y: 0,
            w: 229,
            h: 100,
            aspectRatio: false,
            centered: false,
            borderColor: "yellow",
            borderColorHover: "red",
            bgInfoLayer: "#FFF",
            infoFontSize: 10,
            infoFontColor: "blue",
            showPositionsOnDrag: true,
            showDimetionsOnDrag: true,
            maxHeight: null,
            maxWidth: null
        },
        image: {source: "", rotation: 0, width: 0, height: 0, minZoom: 10, maxZoom: 150},
        enableRotation: true,
        enableZoom: true,
        zoomSteps: 1,
        rotationSteps: 5,
        onSelectorDrag: null,
        onSelectorDragStop: null,
        onSelectorResize: null,
        onSelectorResizeStop: null,
        onZoom: null,
        onRotate: null,
        onImageDrag: null
    };
    c.fn.extend({
        setSelector: function (z, D, A, C, B) {
            if (B != undefined && B == true) {
                c("#selector").animate({top: D, left: z, width: A, height: C}, "slow")
            } else {
                c("#selector").css({top: D, left: z, width: A, height: C})
            }
            b("selector", {x: z, y: D, w: A, h: C})
        }, restore: function () {
            a.empty();
            b("image", {});
            b("selector", {});
            a.cropzoom(q)
        }, getParameters: function (w) {
            return p(w)
        }, send: function (y, z, A, B) {
            var w = "";
            c.ajax({
                url: y, type: z, data: (p(A)), success: function (C) {
                    b("imageResult", C);
                    if (B !== undefined && B != null) {
                        B(C)
                    }
                }
            })
        }
    })
})(jQuery);
/*!
	jQuery ColorBox v1.3.34 - 2013-02-04
	(c) 2013 Jack Moore - jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function (a8, aP, a3) {
    function aV(a, c, d) {
        var b = aP.createElement(a);
        return c && (b.id = ae + c), d && (b.style.cssText = d), a8(b)
    }

    function aX(c) {
        var b = ag.length, a = (an + c) % b;
        return 0 > a ? b + a : a
    }

    function a4(b, a) {
        return Math.round((/%/.test(b) ? ("x" === a ? aB.width() : aB.height()) / 100 : 1) * parseInt(b, 10))
    }

    function aR(a) {
        return al.photo || al.photoRegex.test(a)
    }

    function aZ(a) {
        return al.retinaUrl && a3.devicePixelRatio > 1 ? a.replace(al.photoRegex, al.retinaSuffix) : a
    }

    function aQ() {
        var b, a = a8.data(aC, ar);
        null == a ? (al = a8.extend({}, ac), console && console.log && console.log("Error: cboxElement missing settings object")) : al = a8.extend({}, a);
        for (b in al) {
            a8.isFunction(al[b]) && "on" !== b.slice(0, 2) && (al[b] = al[b].call(aC))
        }
        al.rel = al.rel || aC.rel || a8(aC).data("rel") || "nofollow", al.href = al.href || a8(aC).attr("href"), al.title = al.title || aC.title, "string" == typeof al.href && (al.href = a8.trim(al.href))
    }

    function bc(a, b) {
        a8(aP).trigger(a), aw.trigger(a), a8.isFunction(b) && b.call(aC)
    }

    function a9() {
        var f, b, a, g, j, c = ae + "Slideshow_", d = "click." + ae;
        al.slideshow && ag[1] ? (b = function () {
            clearTimeout(f)
        }, a = function () {
            (al.loop || ag[an + 1]) && (f = setTimeout(aI.next, al.slideshowSpeed))
        }, g = function () {
            ap.html(al.slideshowStop).unbind(d).one(d, j), aw.bind(a6, a).bind(aT, b).bind(aE, j), aY.removeClass(c + "off").addClass(c + "on")
        }, j = function () {
            b(), aw.unbind(a6, a).unbind(aT, b).unbind(aE, j), ap.html(al.slideshowStart).unbind(d).one(d, function () {
                aI.next(), g()
            }), aY.removeClass(c + "on").addClass(c + "off")
        }, al.slideshowAuto ? g() : j()) : aY.removeClass(c + "off " + c + "on")
    }

    function ba(a) {
        aS || (aC = a, aQ(), ag = a8(aC), an = 0, "nofollow" !== al.rel && (ag = a8("." + ab).filter(function () {
            var c, b = a8.data(this, ar);
            return b && (c = a8(this).data("rel") || b.rel || this.rel), c === al.rel
        }), an = ag.index(aC), -1 === an && (ag = ag.add(aC), an = ag.length - 1)), am || (am = a2 = !0, aY.css({
            visibility: "hidden",
            display: "block"
        }), a0 = aV(ah, "LoadedContent", "width:0; height:0; overflow:hidden").appendTo(a5), bd = aL.height() + bb.height() + a5.outerHeight(!0) - a5.height(), aq = aN.width() + aK.width() + a5.outerWidth(!0) - a5.width(), aJ = a0.outerHeight(!0), aA = a0.outerWidth(!0), al.returnFocus && (a8(aC).blur(), aw.one(aG, function () {
            a8(aC).focus()
        })), aU.css({
            opacity: parseFloat(al.opacity),
            cursor: al.overlayClose ? "pointer" : "auto",
            visibility: "visible"
        }).show(), al.w = a4(al.initialWidth, "x"), al.h = a4(al.initialHeight, "y"), aI.position(), aH && aB.bind("resize." + aF + " scroll." + aF, function () {
            aU.css({width: aB.width(), height: aB.height(), top: aB.scrollTop(), left: aB.scrollLeft()})
        }).trigger("resize." + aF), a9(), bc(aa, al.onOpen), aj.add(av).hide(), ay.html(al.close).show()), aI.load(!0))
    }

    function aO() {
        !aY && aP.body && (ak = !1, aB = a8(a3), aY = aV(ah).attr({
            id: ar,
            "class": aW ? ae + (aH ? "IE6" : "IE") : ""
        }).hide(), aU = aV(ah, "Overlay", aH ? "position:absolute" : "").hide(), ad = aV(ah, "LoadingOverlay").add(aV(ah, "LoadingGraphic")), aM = aV(ah, "Wrapper"), a5 = aV(ah, "Content").append(av = aV(ah, "Title"), az = aV(ah, "Current"), ao = aV(ah, "Next"), ai = aV(ah, "Previous"), ap = aV(ah, "Slideshow"), ay = aV(ah, "Close")), aM.append(aV(ah).append(aV(ah, "TopLeft"), aL = aV(ah, "TopCenter"), aV(ah, "TopRight")), aV(ah, !1, "clear:left").append(aN = aV(ah, "MiddleLeft"), a5, aK = aV(ah, "MiddleRight")), aV(ah, !1, "clear:left").append(aV(ah, "BottomLeft"), bb = aV(ah, "BottomCenter"), aV(ah, "BottomRight"))).find("div div").css({"float": "left"}), au = aV(ah, !1, "position:absolute; width:9999px; visibility:hidden; display:none"), aj = ao.add(ai).add(az).add(ap), a8(aP.body).append(aU, aY.append(aM, au)))
    }

    function a7() {
        function a(b) {
            b.which > 1 || b.shiftKey || b.altKey || b.metaKey || (b.preventDefault(), ba(this))
        }

        return aY ? (ak || (ak = !0, ao.click(function () {
            aI.next()
        }), ai.click(function () {
            aI.prev()
        }), ay.click(function () {
            aI.close()
        }), aU.click(function () {
            al.overlayClose && aI.close()
        }), a8(aP).bind("keydown." + ae, function (c) {
            var b = c.keyCode;
            am && al.escKey && 27 === b && (c.preventDefault(), aI.close()), am && al.arrowKey && ag[1] && (37 === b ? (c.preventDefault(), ai.click()) : 39 === b && (c.preventDefault(), ao.click()))
        }), a8.isFunction(a8.fn.on) ? a8(aP).on("click." + ae, "." + ab, a) : a8("." + ab).live("click." + ae, a)), !0) : !1
    }

    var aU, aY, aM, a5, aL, aN, aK, bb, ag, aB, a0, au, ad, av, az, ap, ao, ai, ay, aj, al, bd, aq, aJ, aA, aC, an, aD,
        am, a2, aS, af, aI, ax, ak, ac = {
            transition: "elastic",
            speed: 300,
            width: !1,
            initialWidth: "600",
            innerWidth: !1,
            maxWidth: !1,
            height: !1,
            initialHeight: "450",
            innerHeight: !1,
            maxHeight: !1,
            scalePhotos: !0,
            scrolling: !0,
            inline: !1,
            html: !1,
            iframe: !1,
            fastIframe: !0,
            photo: !1,
            href: !1,
            title: !1,
            rel: !1,
            opacity: 0.9,
            preloading: !0,
            className: !1,
            retinaImage: !1,
            retinaUrl: !1,
            retinaSuffix: "@2x.$1",
            current: "image {current} of {total}",
            previous: "previous",
            next: "next",
            close: "close",
            xhrError: "This content failed to load.",
            imgError: "This image failed to load.",
            open: !1,
            returnFocus: !0,
            reposition: !0,
            loop: !0,
            slideshow: !1,
            slideshowAuto: !0,
            slideshowSpeed: 2500,
            slideshowStart: "start slideshow",
            slideshowStop: "stop slideshow",
            photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i,
            onOpen: !1,
            onLoad: !1,
            onComplete: !1,
            onCleanup: !1,
            onClosed: !1,
            overlayClose: !0,
            escKey: !0,
            arrowKey: !0,
            top: !1,
            bottom: !1,
            left: !1,
            right: !1,
            fixed: !1,
            data: void 0
        }, ar = "colorbox", ae = "cbox", ab = ae + "Element", aa = ae + "_open", aT = ae + "_load", a6 = ae + "_complete",
        aE = ae + "_cleanup", aG = ae + "_closed", a1 = ae + "_purge", aW = !a8.support.leadingWhitespace,
        aH = aW && !a3.XMLHttpRequest, aF = ae + "_IE6", aw = a8({}), ah = "div";
    a8.colorbox || (a8(aO), aI = a8.fn[ar] = a8[ar] = function (b, a) {
        var c = this;
        if (b = b || {}, aO(), a7()) {
            if (a8.isFunction(c)) {
                c = a8("<a/>"), b.open = !0
            } else {
                if (!c[0]) {
                    return c
                }
            }
            a && (b.onComplete = a), c.each(function () {
                a8.data(this, ar, a8.extend({}, a8.data(this, ar) || ac, b))
            }).addClass(ab), (a8.isFunction(b.open) && b.open.call(c) || b.open) && ba(c[0])
        }
        return c
    }, aI.position = function (h, k) {
        function g(a) {
            aL[0].style.width = bb[0].style.width = a5[0].style.width = parseInt(a.style.width, 10) - aq + "px", a5[0].style.height = aN[0].style.height = aK[0].style.height = parseInt(a.style.height, 10) - bd + "px"
        }

        var c, d, b, f = 0, m = 0, j = aY.offset();
        aB.unbind("resize." + ae), aY.css({
            top: -90000,
            left: -90000
        }), d = aB.scrollTop(), b = aB.scrollLeft(), al.fixed && !aH ? (j.top -= d, j.left -= b, aY.css({position: "fixed"})) : (f = d, m = b, aY.css({position: "absolute"})), m += al.right !== !1 ? Math.max(aB.width() - al.w - aA - aq - a4(al.right, "x"), 0) : al.left !== !1 ? a4(al.left, "x") : Math.round(Math.max(aB.width() - al.w - aA - aq, 0) / 2), f += al.bottom !== !1 ? Math.max(aB.height() - al.h - aJ - bd - a4(al.bottom, "y"), 0) : al.top !== !1 ? a4(al.top, "y") : Math.round(Math.max(aB.height() - al.h - aJ - bd, 0) / 2), aY.css({
            top: j.top,
            left: j.left,
            visibility: "visible"
        }), h = aY.width() === al.w + aA && aY.height() === al.h + aJ ? 0 : h || 0, aM[0].style.width = aM[0].style.height = "9999px", c = {
            width: al.w + aA + aq,
            height: al.h + aJ + bd,
            top: f,
            left: m
        }, 0 === h && aY.css(c), aY.dequeue().animate(c, {
            duration: h, complete: function () {
                g(this), a2 = !1, aM[0].style.width = al.w + aA + aq + "px", aM[0].style.height = al.h + aJ + bd + "px", al.reposition && setTimeout(function () {
                    aB.bind("resize." + ae, aI.position)
                }, 1), k && k()
            }, step: function () {
                g(this)
            }
        })
    }, aI.resize = function (a) {
        am && (a = a || {}, a.width && (al.w = a4(a.width, "x") - aA - aq), a.innerWidth && (al.w = a4(a.innerWidth, "x")), a0.css({width: al.w}), a.height && (al.h = a4(a.height, "y") - aJ - bd), a.innerHeight && (al.h = a4(a.innerHeight, "y")), a.innerHeight || a.height || (a0.css({height: "auto"}), al.h = a0.height()), a0.css({height: al.h}), aI.position("none" === al.transition ? 0 : al.speed))
    }, aI.prep = function (c) {
        function b() {
            return al.w = al.w || a0.width(), al.w = al.mw && al.mw < al.w ? al.mw : al.w, al.w
        }

        function f() {
            return al.h = al.h || a0.height(), al.h = al.mh && al.mh < al.h ? al.mh : al.h, al.h
        }

        if (am) {
            var a, d = "none" === al.transition ? 0 : al.speed;
            a0.empty().remove(), a0 = aV(ah, "LoadedContent").append(c), a0.hide().appendTo(au.show()).css({
                width: b(),
                overflow: al.scrolling ? "auto" : "hidden"
            }).css({height: f()}).prependTo(a5), au.hide(), a8(aD).css({"float": "none"}), a = function () {
                function k() {
                    aW && aY[0].style.removeAttribute("filter")
                }

                var j, m, g = ag.length, n = "frameBorder", o = "allowTransparency";
                am && (m = function () {
                    clearTimeout(af), ad.remove(), bc(a6, al.onComplete)
                }, aW && aD && a0.fadeIn(100), av.html(al.title).add(a0).show(), g > 1 ? ("string" == typeof al.current && az.html(al.current.replace("{current}", an + 1).replace("{total}", g)).show(), ao[al.loop || g - 1 > an ? "show" : "hide"]().html(al.next), ai[al.loop || an ? "show" : "hide"]().html(al.previous), al.slideshow && ap.show(), al.preloading && a8.each([aX(-1), aX(1)], function () {
                    var p, h, q = ag[this], r = a8.data(q, ar);
                    r && r.href ? (p = r.href, a8.isFunction(p) && (p = p.call(q))) : p = a8(q).attr("href"), p && (aR(p) || r.photo) && (h = new Image, h.src = p)
                })) : aj.hide(), al.iframe ? (j = aV("iframe")[0], n in j && (j[n] = 0), o in j && (j[o] = "true"), al.scrolling || (j.scrolling = "no"), a8(j).attr({
                    src: al.href,
                    name: (new Date).getTime(),
                    "class": ae + "Iframe",
                    allowFullScreen: !0,
                    webkitAllowFullScreen: !0,
                    mozallowfullscreen: !0
                }).one("load", m).appendTo(a0), aw.one(a1, function () {
                    j.src = "//about:blank"
                }), al.fastIframe && a8(j).trigger("load")) : m(), "fade" === al.transition ? aY.fadeTo(d, 1, k) : k())
            }, "fade" === al.transition ? aY.fadeTo(d, 0, function () {
                aI.position(0, a)
            }) : aI.position(d, a)
        }
    }, aI.load = function (b) {
        var h, f, g, a = aI.prep;
        a2 = !0, aD = !1, aC = ag[an], b || aQ(), ax && aY.add(aU).removeClass(ax), al.className && aY.add(aU).addClass(al.className), ax = al.className, bc(a1), bc(aT, al.onLoad), al.h = al.height ? a4(al.height, "y") - aJ - bd : al.innerHeight && a4(al.innerHeight, "y"), al.w = al.width ? a4(al.width, "x") - aA - aq : al.innerWidth && a4(al.innerWidth, "x"), al.mw = al.w, al.mh = al.h, al.maxWidth && (al.mw = a4(al.maxWidth, "x") - aA - aq, al.mw = al.w && al.w < al.mw ? al.w : al.mw), al.maxHeight && (al.mh = a4(al.maxHeight, "y") - aJ - bd, al.mh = al.h && al.h < al.mh ? al.h : al.mh), h = al.href, af = setTimeout(function () {
            ad.appendTo(a5)
        }, 100), al.inline ? (g = aV(ah).hide().insertBefore(a8(h)[0]), aw.one(a1, function () {
            g.replaceWith(a0.children())
        }), a(a8(h))) : al.iframe ? a(" ") : al.html ? a(al.html) : aR(h) ? (h = aZ(h), a8(aD = new Image).addClass(ae + "Photo").bind("error", function () {
            al.title = !1, a(aV(ah, "Error").html(al.imgError))
        }).one("load", function () {
            var c;
            al.retinaImage && a3.devicePixelRatio > 1 && (aD.height = aD.height / a3.devicePixelRatio, aD.width = aD.width / a3.devicePixelRatio), al.scalePhotos && (f = function () {
                aD.height -= aD.height * c, aD.width -= aD.width * c
            }, al.mw && aD.width > al.mw && (c = (aD.width - al.mw) / aD.width, f()), al.mh && aD.height > al.mh && (c = (aD.height - al.mh) / aD.height, f())), al.h && (aD.style.marginTop = Math.max(al.mh - aD.height, 0) / 2 + "px"), ag[1] && (al.loop || ag[an + 1]) && (aD.style.cursor = "pointer", aD.onclick = function () {
                aI.next()
            }), aW && (aD.style.msInterpolationMode = "bicubic"), setTimeout(function () {
                a(aD)
            }, 1)
        }), setTimeout(function () {
            aD.src = h
        }, 1)) : h && au.load(h, al.data, function (d, c) {
            a("error" === c ? aV(ah, "Error").html(al.xhrError) : a8(this).contents())
        })
    }, aI.next = function () {
        !a2 && ag[1] && (al.loop || ag[an + 1]) && (an = aX(1), aI.load())
    }, aI.prev = function () {
        !a2 && ag[1] && (al.loop || an) && (an = aX(-1), aI.load())
    }, aI.close = function () {
        am && !aS && (aS = !0, am = !1, bc(aE, al.onCleanup), aB.unbind("." + ae + " ." + aF), aU.fadeTo(200, 0), aY.stop().fadeTo(300, 0, function () {
            aY.add(aU).css({opacity: 1, cursor: "auto"}).hide(), bc(a1), a0.empty().remove(), setTimeout(function () {
                aS = !1, bc(aG, al.onClosed)
            }, 1)
        }))
    }, aI.remove = function () {
        a8([]).add(aY).add(aU).remove(), aY = null, a8("." + ab).removeData(ar).removeClass(ab), a8(aP).unbind("click." + ae)
    }, aI.element = function () {
        return a8(aC)
    }, aI.settings = ac)
})(jQuery, document, window);
/*!
 * jQuery Iframe Transport Plugin 1.6.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        a(window.jQuery)
    }
}(function (b) {
    var a = 0;
    b.ajaxTransport("iframe", function (c) {
        if (c.async) {
            var f, d, g;
            return {
                send: function (h, i) {
                    f = b('<form style="display:none;"></form>');
                    f.attr("accept-charset", c.formAcceptCharset);
                    g = /\?/.test(c.url) ? "&" : "?";
                    if (c.type === "DELETE") {
                        c.url = c.url + g + "_method=DELETE";
                        c.type = "POST"
                    } else {
                        if (c.type === "PUT") {
                            c.url = c.url + g + "_method=PUT";
                            c.type = "POST"
                        } else {
                            if (c.type === "PATCH") {
                                c.url = c.url + g + "_method=PATCH";
                                c.type = "POST"
                            }
                        }
                    }
                    d = b('<iframe src="javascript:false;" name="iframe-transport-' + (a += 1) + '"></iframe>').bind("load", function () {
                        var j, k = b.isArray(c.paramName) ? c.paramName : [c.paramName];
                        d.unbind("load").bind("load", function () {
                            var m;
                            try {
                                m = d.contents();
                                if (!m.length || !m[0].firstChild) {
                                    throw new Error()
                                }
                            } catch (n) {
                                m = undefined
                            }
                            i(200, "success", {iframe: m});
                            b('<iframe src="javascript:false;"></iframe>').appendTo(f);
                            f.remove()
                        });
                        f.prop("target", d.prop("name")).prop("action", c.url).prop("method", c.type);
                        if (c.formData) {
                            b.each(c.formData, function (m, n) {
                                b('<input type="hidden"/>').prop("name", n.name).val(n.value).appendTo(f)
                            })
                        }
                        if (c.fileInput && c.fileInput.length && c.type === "POST") {
                            j = c.fileInput.clone();
                            c.fileInput.after(function (m) {
                                return j[m]
                            });
                            if (c.paramName) {
                                c.fileInput.each(function (m) {
                                    b(this).prop("name", k[m] || c.paramName)
                                })
                            }
                            f.append(c.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data")
                        }
                        f.submit();
                        if (j && j.length) {
                            c.fileInput.each(function (n, m) {
                                var o = b(j[n]);
                                b(m).prop("name", o.prop("name"));
                                o.replaceWith(m)
                            })
                        }
                    });
                    f.append(d).appendTo(document.body)
                }, abort: function () {
                    if (d) {
                        d.unbind("load").prop("src", "javascript".concat(":false;"))
                    }
                    if (f) {
                        f.remove()
                    }
                }
            }
        }
    });
    b.ajaxSetup({
        converters: {
            "iframe text": function (c) {
                return c && b(c[0].body).text()
            }, "iframe json": function (c) {
                return c && b.parseJSON(b(c[0].body).text())
            }, "iframe html": function (c) {
                return c && b(c[0].body).html()
            }, "iframe script": function (c) {
                return c && b.globalEval(b(c[0].body).text())
            }
        }
    })
}));
/*!
 * jQuery File Upload Plugin 5.21.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "jquery.ui.widget"], a)
    } else {
        a(window.jQuery)
    }
}(function (a) {
    a.support.xhrFileUpload = !!(window.XMLHttpRequestUpload && window.FileReader);
    a.support.xhrFormDataFileUpload = !!window.FormData;
    a.propHooks.elements = {
        get: function (b) {
            if (a.nodeName(b, "form")) {
                return a.grep(b.elements, function (c) {
                    return !a.nodeName(c, "input") || c.type !== "file"
                })
            }
            return null
        }
    };
    a.widget("blueimp.fileupload", {
        options: {
            dropZone: a(document),
            pasteZone: a(document),
            fileInput: undefined,
            replaceFileInput: true,
            paramName: undefined,
            singleFileUploads: true,
            limitMultiFileUploads: undefined,
            sequentialUploads: false,
            limitConcurrentUploads: undefined,
            forceIframeTransport: false,
            redirect: undefined,
            redirectParamName: undefined,
            postMessage: undefined,
            multipart: true,
            maxChunkSize: undefined,
            uploadedBytes: undefined,
            recalculateProgress: true,
            progressInterval: 100,
            bitrateInterval: 500,
            formData: function (b) {
                return b.serializeArray()
            },
            add: function (c, b) {
                b.submit()
            },
            processData: false,
            contentType: false,
            cache: false
        },
        _refreshOptionsList: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
        _BitrateTimer: function () {
            this.timestamp = +(new Date());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (d, c, b) {
                var f = d - this.timestamp;
                if (!this.bitrate || !b || f > b) {
                    this.bitrate = (c - this.loaded) * (1000 / f) * 8;
                    this.loaded = c;
                    this.timestamp = d
                }
                return this.bitrate
            }
        },
        _isXHRUpload: function (b) {
            return !b.forceIframeTransport && ((!b.multipart && a.support.xhrFileUpload) || a.support.xhrFormDataFileUpload)
        },
        _getFormData: function (b) {
            var c;
            if (typeof b.formData === "function") {
                return b.formData(b.form)
            }
            if (a.isArray(b.formData)) {
                return b.formData
            }
            if (b.formData) {
                c = [];
                a.each(b.formData, function (d, f) {
                    c.push({name: d, value: f})
                });
                return c
            }
            return []
        },
        _getTotal: function (c) {
            var b = 0;
            a.each(c, function (d, f) {
                b += f.size || 1
            });
            return b
        },
        _onProgress: function (g, f) {
            if (g.lengthComputable) {
                var c = +(new Date()), d, b;
                if (f._time && f.progressInterval && (c - f._time < f.progressInterval) && g.loaded !== g.total) {
                    return
                }
                f._time = c;
                d = f.total || this._getTotal(f.files);
                b = parseInt(g.loaded / g.total * (f.chunkSize || d), 10) + (f.uploadedBytes || 0);
                this._loaded += b - (f.loaded || f.uploadedBytes || 0);
                f.lengthComputable = true;
                f.loaded = b;
                f.total = d;
                f.bitrate = f._bitrateTimer.getBitrate(c, b, f.bitrateInterval);
                this._trigger("progress", g, f);
                this._trigger("progressall", g, {
                    lengthComputable: true,
                    loaded: this._loaded,
                    total: this._total,
                    bitrate: this._bitrateTimer.getBitrate(c, this._loaded, f.bitrateInterval)
                })
            }
        },
        _initProgressListener: function (b) {
            var c = this, d = b.xhr ? b.xhr() : a.ajaxSettings.xhr();
            if (d.upload) {
                a(d.upload).bind("progress", function (f) {
                    var g = f.originalEvent;
                    f.lengthComputable = g.lengthComputable;
                    f.loaded = g.loaded;
                    f.total = g.total;
                    c._onProgress(f, b)
                });
                b.xhr = function () {
                    return d
                }
            }
        },
        _initXHRData: function (c) {
            var g, d = c.files[0], b = c.multipart || !a.support.xhrFileUpload, f = c.paramName[0];
            c.headers = c.headers || {};
            if (c.contentRange) {
                c.headers["Content-Range"] = c.contentRange
            }
            if (!b) {
                c.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(d.name) + '"';
                c.contentType = d.type;
                c.data = c.blob || d
            } else {
                if (a.support.xhrFormDataFileUpload) {
                    if (c.postMessage) {
                        g = this._getFormData(c);
                        if (c.blob) {
                            g.push({name: f, value: c.blob})
                        } else {
                            a.each(c.files, function (h, i) {
                                g.push({name: c.paramName[h] || f, value: i})
                            })
                        }
                    } else {
                        if (c.formData instanceof FormData) {
                            g = c.formData
                        } else {
                            g = new FormData();
                            a.each(this._getFormData(c), function (h, i) {
                                g.append(i.name, i.value)
                            })
                        }
                        if (c.blob) {
                            c.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(d.name) + '"';
                            g.append(f, c.blob, d.name)
                        } else {
                            a.each(c.files, function (h, i) {
                                if ((window.Blob && i instanceof Blob) || (window.File && i instanceof File)) {
                                    g.append(c.paramName[h] || f, i, i.name)
                                }
                            })
                        }
                    }
                    c.data = g
                }
            }
            c.blob = null
        },
        _initIframeSettings: function (b) {
            b.dataType = "iframe " + (b.dataType || "");
            b.formData = this._getFormData(b);
            if (b.redirect && a("<a></a>").prop("href", b.url).prop("host") !== location.host) {
                b.formData.push({name: b.redirectParamName || "redirect", value: b.redirect})
            }
        },
        _initDataSettings: function (b) {
            if (this._isXHRUpload(b)) {
                if (!this._chunkedUpload(b, true)) {
                    if (!b.data) {
                        this._initXHRData(b)
                    }
                    this._initProgressListener(b)
                }
                if (b.postMessage) {
                    b.dataType = "postmessage " + (b.dataType || "")
                }
            } else {
                this._initIframeSettings(b, "iframe")
            }
        },
        _getParamName: function (b) {
            var c = a(b.fileInput), d = b.paramName;
            if (!d) {
                d = [];
                c.each(function () {
                    var f = a(this), g = f.prop("name") || "files[]", h = (f.prop("files") || [1]).length;
                    while (h) {
                        d.push(g);
                        h -= 1
                    }
                });
                if (!d.length) {
                    d = [c.prop("name") || "files[]"]
                }
            } else {
                if (!a.isArray(d)) {
                    d = [d]
                }
            }
            return d
        },
        _initFormSettings: function (b) {
            if (!b.form || !b.form.length) {
                b.form = a(b.fileInput.prop("form"));
                if (!b.form.length) {
                    b.form = a(this.options.fileInput.prop("form"))
                }
            }
            b.paramName = this._getParamName(b);
            if (!b.url) {
                b.url = b.form.prop("action") || location.href
            }
            b.type = (b.type || b.form.prop("method") || "").toUpperCase();
            if (b.type !== "POST" && b.type !== "PUT" && b.type !== "PATCH") {
                b.type = "POST"
            }
            if (!b.formAcceptCharset) {
                b.formAcceptCharset = b.form.attr("accept-charset")
            }
        },
        _getAJAXSettings: function (c) {
            var b = a.extend({}, this.options, c);
            this._initFormSettings(b);
            this._initDataSettings(b);
            return b
        },
        _enhancePromise: function (b) {
            b.success = b.done;
            b.error = b.fail;
            b.complete = b.always;
            return b
        },
        _getXHRPromise: function (f, d, c) {
            var b = a.Deferred(), g = b.promise();
            d = d || this.options.context || g;
            if (f === true) {
                b.resolveWith(d, c)
            } else {
                if (f === false) {
                    b.rejectWith(d, c)
                }
            }
            g.abort = b.promise;
            return this._enhancePromise(g)
        },
        _getUploadedBytes: function (d) {
            var b = d.getResponseHeader("Range"), f = b && b.split("-"), c = f && f.length > 1 && parseInt(f[1], 10);
            return c && c + 1
        },
        _chunkedUpload: function (o, h) {
            var g = this, d = o.files[0], f = d.size, b = o.uploadedBytes = o.uploadedBytes || 0,
                c = o.maxChunkSize || f, j = d.slice || d.webkitSlice || d.mozSlice, k = a.Deferred(), n = k.promise(),
                i, m;
            if (!(this._isXHRUpload(o) && j && (b || c < f)) || o.data) {
                return false
            }
            if (h) {
                return true
            }
            if (b >= f) {
                d.error = "Uploaded bytes exceed file size";
                return this._getXHRPromise(false, o.context, [null, "error", d.error])
            }
            m = function () {
                var p = a.extend({}, o);
                p.blob = j.call(d, b, b + c, d.type);
                p.chunkSize = p.blob.size;
                p.contentRange = "bytes " + b + "-" + (b + p.chunkSize - 1) + "/" + f;
                g._initXHRData(p);
                g._initProgressListener(p);
                i = ((g._trigger("chunksend", null, p) !== false && a.ajax(p)) || g._getXHRPromise(false, p.context)).done(function (q, s, r) {
                    b = g._getUploadedBytes(r) || (b + p.chunkSize);
                    if (!p.loaded || p.loaded < p.total) {
                        g._onProgress(a.Event("progress", {
                            lengthComputable: true,
                            loaded: b - p.uploadedBytes,
                            total: b - p.uploadedBytes
                        }), p)
                    }
                    o.uploadedBytes = p.uploadedBytes = b;
                    p.result = q;
                    p.textStatus = s;
                    p.jqXHR = r;
                    g._trigger("chunkdone", null, p);
                    g._trigger("chunkalways", null, p);
                    if (b < f) {
                        m()
                    } else {
                        k.resolveWith(p.context, [q, s, r])
                    }
                }).fail(function (q, s, r) {
                    p.jqXHR = q;
                    p.textStatus = s;
                    p.errorThrown = r;
                    g._trigger("chunkfail", null, p);
                    g._trigger("chunkalways", null, p);
                    k.rejectWith(p.context, [q, s, r])
                })
            };
            this._enhancePromise(n);
            n.abort = function () {
                return i.abort()
            };
            m();
            return n
        },
        _beforeSend: function (c, b) {
            if (this._active === 0) {
                this._trigger("start");
                this._bitrateTimer = new this._BitrateTimer()
            }
            this._active += 1;
            this._loaded += b.uploadedBytes || 0;
            this._total += this._getTotal(b.files)
        },
        _onDone: function (b, g, f, c) {
            if (!this._isXHRUpload(c) || !c.loaded || c.loaded < c.total) {
                var d = this._getTotal(c.files) || 1;
                this._onProgress(a.Event("progress", {lengthComputable: true, loaded: d, total: d}), c)
            }
            c.result = b;
            c.textStatus = g;
            c.jqXHR = f;
            this._trigger("done", null, c)
        },
        _onFail: function (c, f, d, b) {
            b.jqXHR = c;
            b.textStatus = f;
            b.errorThrown = d;
            this._trigger("fail", null, b);
            if (b.recalculateProgress) {
                this._loaded -= b.loaded || b.uploadedBytes || 0;
                this._total -= b.total || this._getTotal(b.files)
            }
        },
        _onAlways: function (d, f, c, b) {
            this._active -= 1;
            this._trigger("always", null, b);
            if (this._active === 0) {
                this._trigger("stop");
                this._loaded = this._total = 0;
                this._bitrateTimer = null
            }
        },
        _onSend: function (h, f) {
            var g = this, j, b, i, c, k = g._getAJAXSettings(f), d = function () {
                g._sending += 1;
                k._bitrateTimer = new g._BitrateTimer();
                j = j || (((b || g._trigger("send", h, k) === false) && g._getXHRPromise(false, k.context, b)) || g._chunkedUpload(k) || a.ajax(k)).done(function (m, o, n) {
                    g._onDone(m, o, n, k)
                }).fail(function (m, o, n) {
                    g._onFail(m, o, n, k)
                }).always(function (p, q, o) {
                    g._sending -= 1;
                    g._onAlways(p, q, o, k);
                    if (k.limitConcurrentUploads && k.limitConcurrentUploads > g._sending) {
                        var n = g._slots.shift(), m;
                        while (n) {
                            m = n.state ? n.state() === "pending" : !n.isRejected();
                            if (m) {
                                n.resolve();
                                break
                            }
                            n = g._slots.shift()
                        }
                    }
                });
                return j
            };
            this._beforeSend(h, k);
            if (this.options.sequentialUploads || (this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    i = a.Deferred();
                    this._slots.push(i);
                    c = i.pipe(d)
                } else {
                    c = (this._sequence = this._sequence.pipe(d, d))
                }
                c.abort = function () {
                    b = [undefined, "abort", "abort"];
                    if (!j) {
                        if (i) {
                            i.rejectWith(k.context, b)
                        }
                        return d()
                    }
                    return j.abort()
                };
                return this._enhancePromise(c)
            }
            return d()
        },
        _onAdd: function (k, g) {
            var j = this, o = true, n = a.extend({}, this.options, g), d = n.limitMultiFileUploads,
                h = this._getParamName(n), c, b, m, f;
            if (!(n.singleFileUploads || d) || !this._isXHRUpload(n)) {
                m = [g.files];
                c = [h]
            } else {
                if (!n.singleFileUploads && d) {
                    m = [];
                    c = [];
                    for (f = 0; f < g.files.length; f += d) {
                        m.push(g.files.slice(f, f + d));
                        b = h.slice(f, f + d);
                        if (!b.length) {
                            b = h
                        }
                        c.push(b)
                    }
                } else {
                    c = h
                }
            }
            g.originalFiles = g.files;
            a.each(m || g.files, function (i, p) {
                var q = a.extend({}, g);
                q.files = m ? p : [p];
                q.paramName = c[i];
                q.submit = function () {
                    q.jqXHR = this.jqXHR = (j._trigger("submit", k, this) !== false) && j._onSend(k, this);
                    return this.jqXHR
                };
                o = j._trigger("add", k, q);
                return o
            });
            return o
        },
        _replaceFileInput: function (b) {
            var c = b.clone(true);
            a("<form></form>").append(c)[0].reset();
            b.after(c).detach();
            a.cleanData(b.unbind("remove"));
            this.options.fileInput = this.options.fileInput.map(function (d, f) {
                if (f === b[0]) {
                    return c[0]
                }
                return f
            });
            if (b[0] === this.element[0]) {
                this.element = c
            }
        },
        _handleFileTreeEntry: function (g, h) {
            var f = this, b = a.Deferred(), c = function (i) {
                if (i && !i.entry) {
                    i.entry = g
                }
                b.resolve([i])
            }, d;
            h = h || "";
            if (g.isFile) {
                if (g._file) {
                    g._file.relativePath = h;
                    b.resolve(g._file)
                } else {
                    g.file(function (i) {
                        i.relativePath = h;
                        b.resolve(i)
                    }, c)
                }
            } else {
                if (g.isDirectory) {
                    d = g.createReader();
                    d.readEntries(function (i) {
                        f._handleFileTreeEntries(i, h + g.name + "/").done(function (j) {
                            b.resolve(j)
                        }).fail(c)
                    }, c)
                } else {
                    b.resolve([])
                }
            }
            return b.promise()
        },
        _handleFileTreeEntries: function (b, d) {
            var c = this;
            return a.when.apply(a, a.map(b, function (f) {
                return c._handleFileTreeEntry(f, d)
            })).pipe(function () {
                return Array.prototype.concat.apply([], arguments)
            })
        },
        _getDroppedFiles: function (c) {
            c = c || {};
            var b = c.items;
            if (b && b.length && (b[0].webkitGetAsEntry || b[0].getAsEntry)) {
                return this._handleFileTreeEntries(a.map(b, function (f) {
                    var d;
                    if (f.webkitGetAsEntry) {
                        d = f.webkitGetAsEntry();
                        if (d) {
                            d._file = f.getAsFile()
                        }
                        return d
                    }
                    return f.getAsEntry()
                }))
            }
            return a.Deferred().resolve(a.makeArray(c.files)).promise()
        },
        _getSingleFileInputFiles: function (d) {
            d = a(d);
            var b = d.prop("webkitEntries") || d.prop("entries"), c, f;
            if (b && b.length) {
                return this._handleFileTreeEntries(b)
            }
            c = a.makeArray(d.prop("files"));
            if (!c.length) {
                f = d.prop("value");
                if (!f) {
                    return a.Deferred().resolve([]).promise()
                }
                c = [{name: f.replace(/^.*\\/, "")}]
            } else {
                if (c[0].name === undefined && c[0].fileName) {
                    a.each(c, function (g, h) {
                        h.name = h.fileName;
                        h.size = h.fileSize
                    })
                }
            }
            return a.Deferred().resolve(c).promise()
        },
        _getFileInputFiles: function (b) {
            if (!(b instanceof a) || b.length === 1) {
                return this._getSingleFileInputFiles(b)
            }
            return a.when.apply(a, a.map(b, this._getSingleFileInputFiles)).pipe(function () {
                return Array.prototype.concat.apply([], arguments)
            })
        },
        _onChange: function (d) {
            var b = this, c = {fileInput: a(d.target), form: a(d.target.form)};
            this._getFileInputFiles(c.fileInput).always(function (f) {
                c.files = f;
                if (b.options.replaceFileInput) {
                    b._replaceFileInput(c.fileInput)
                }
                if (b._trigger("change", d, c) !== false) {
                    b._onAdd(d, c)
                }
            })
        },
        _onPaste: function (f) {
            var d = f.originalEvent.clipboardData, b = (d && d.items) || [], c = {files: []};
            a.each(b, function (g, i) {
                var h = i.getAsFile && i.getAsFile();
                if (h) {
                    c.files.push(h)
                }
            });
            if (this._trigger("paste", f, c) === false || this._onAdd(f, c) === false) {
                return false
            }
        },
        _onDrop: function (f) {
            var b = this, d = f.dataTransfer = f.originalEvent.dataTransfer, c = {};
            if (d && d.files && d.files.length) {
                f.preventDefault()
            }
            this._getDroppedFiles(d).always(function (g) {
                c.files = g;
                if (b._trigger("drop", f, c) !== false) {
                    b._onAdd(f, c)
                }
            })
        },
        _onDragOver: function (c) {
            var b = c.dataTransfer = c.originalEvent.dataTransfer;
            if (this._trigger("dragover", c) === false) {
                return false
            }
            if (b && a.inArray("Files", b.types) !== -1) {
                b.dropEffect = "copy";
                c.preventDefault()
            }
        },
        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {dragover: this._onDragOver, drop: this._onDrop});
                this._on(this.options.pasteZone, {paste: this._onPaste})
            }
            this._on(this.options.fileInput, {change: this._onChange})
        },
        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, "dragover drop");
            this._off(this.options.pasteZone, "paste");
            this._off(this.options.fileInput, "change")
        },
        _setOption: function (b, d) {
            var c = a.inArray(b, this._refreshOptionsList) !== -1;
            if (c) {
                this._destroyEventHandlers()
            }
            this._super(b, d);
            if (c) {
                this._initSpecialOptions();
                this._initEventHandlers()
            }
        },
        _initSpecialOptions: function () {
            var b = this.options;
            if (b.fileInput === undefined) {
                b.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]')
            } else {
                if (!(b.fileInput instanceof a)) {
                    b.fileInput = a(b.fileInput)
                }
            }
            if (!(b.dropZone instanceof a)) {
                b.dropZone = a(b.dropZone)
            }
            if (!(b.pasteZone instanceof a)) {
                b.pasteZone = a(b.pasteZone)
            }
        },
        _create: function () {
            var b = this.options;
            a.extend(b, a(this.element[0].cloneNode(false)).data());
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = this._loaded = this._total = 0;
            this._initEventHandlers()
        },
        _destroy: function () {
            this._destroyEventHandlers()
        },
        add: function (c) {
            var b = this;
            if (!c || this.options.disabled) {
                return
            }
            if (c.fileInput && !c.files) {
                this._getFileInputFiles(c.fileInput).always(function (d) {
                    c.files = d;
                    b._onAdd(null, c)
                })
            } else {
                c.files = a.makeArray(c.files);
                this._onAdd(null, c)
            }
        },
        send: function (g) {
            if (g && !this.options.disabled) {
                if (g.fileInput && !g.files) {
                    var d = this, b = a.Deferred(), h = b.promise(), c, f;
                    h.abort = function () {
                        f = true;
                        if (c) {
                            return c.abort()
                        }
                        b.reject(null, "abort", "abort");
                        return h
                    };
                    this._getFileInputFiles(g.fileInput).always(function (i) {
                        if (f) {
                            return
                        }
                        g.files = i;
                        c = d._onSend(null, g).then(function (j, m, k) {
                            b.resolve(j, m, k)
                        }, function (j, m, k) {
                            b.reject(j, m, k)
                        })
                    });
                    return this._enhancePromise(h)
                }
                g.files = a.makeArray(g.files);
                if (g.files.length) {
                    return this._onSend(null, g)
                }
            }
            return this._getXHRPromise(false, g && g.context)
        }
    })
}));
/*!
 * jQuery File Upload File Processing Plugin 1.2.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "load-image", "canvas-to-blob", "./jquery.fileupload"], a)
    } else {
        a(window.jQuery, window.loadImage)
    }
}(function (a, b) {
    a.widget("blueimp.fileupload", a.blueimp.fileupload, {
        options: {
            process: [], add: function (d, c) {
                a(this).fileupload("process", c).done(function () {
                    c.submit()
                })
            }
        }, processActions: {
            load: function (h, d) {
                var g = this, f = h.files[h.index], c = a.Deferred();
                if (window.HTMLCanvasElement && window.HTMLCanvasElement.prototype.toBlob && (a.type(d.maxFileSize) !== "number" || f.size < d.maxFileSize) && (!d.fileTypes || d.fileTypes.test(f.type))) {
                    b(f, function (i) {
                        if (!i.src) {
                            return c.rejectWith(g, [h])
                        }
                        h.img = i;
                        c.resolveWith(g, [h])
                    })
                } else {
                    c.rejectWith(g, [h])
                }
                return c.promise()
            }, resize: function (g, f) {
                var c = g.img, d;
                f = a.extend({canvas: true}, f);
                if (c) {
                    d = b.scale(c, f);
                    if (d.width !== c.width || d.height !== c.height) {
                        g.canvas = d
                    }
                }
                return g
            }, save: function (i, f) {
                if (!i.canvas) {
                    return i
                }
                var h = this, g = i.files[i.index], d = g.name, c = a.Deferred(), j = function (k) {
                    if (!k.name) {
                        if (g.type === k.type) {
                            k.name = g.name
                        } else {
                            if (g.name) {
                                k.name = g.name.replace(/\..+$/, "." + k.type.substr(6))
                            }
                        }
                    }
                    i.files[i.index] = k;
                    c.resolveWith(h, [i])
                };
                if (i.canvas.mozGetAsFile) {
                    j(i.canvas.mozGetAsFile((/^image\/(jpeg|png)$/.test(g.type) && d) || ((d && d.replace(/\..+$/, "")) || "blob") + ".png", g.type))
                } else {
                    i.canvas.toBlob(j, g.type)
                }
                return c.promise()
            }
        }, _processFile: function (i, f, d) {
            var h = this, c = a.Deferred().resolveWith(h, [{files: i, index: f}]), g = c.promise();
            h._processing += 1;
            a.each(d.process, function (j, k) {
                g = g.pipe(function (m) {
                    return h.processActions[k.action].call(this, m, k)
                })
            });
            g.always(function () {
                h._processing -= 1;
                if (h._processing === 0) {
                    h.element.removeClass("fileupload-processing")
                }
            });
            if (h._processing === 1) {
                h.element.addClass("fileupload-processing")
            }
            return g
        }, process: function (f) {
            var d = this, c = a.extend({}, this.options, f);
            if (c.process && c.process.length && this._isXHRUpload(c)) {
                a.each(f.files, function (g, h) {
                    d._processingQueue = d._processingQueue.pipe(function () {
                        var i = a.Deferred();
                        d._processFile(f.files, g, c).always(function () {
                            i.resolveWith(d)
                        });
                        return i.promise()
                    })
                })
            }
            return this._processingQueue
        }, _create: function () {
            this._super();
            this._processing = 0;
            this._processingQueue = a.Deferred().resolveWith(this).promise()
        }
    })
}));
/*!
 * jQuery File Upload User Interface Plugin 7.3
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "tmpl", "load-image", "./jquery.fileupload-fp"], a)
    } else {
        a(window.jQuery, window.tmpl, window.loadImage)
    }
}(function (b, a, c) {
    b.widget("blueimp.fileupload", b.blueimp.fileupload, {
        options: {
            autoUpload: false,
            maxNumberOfFiles: undefined,
            maxFileSize: undefined,
            minFileSize: undefined,
            acceptFileTypes: /.+$/i,
            previewSourceFileTypes: /^image\/(gif|jpeg|png)$/,
            previewSourceMaxFileSize: 5000000,
            previewMaxWidth: 80,
            previewMaxHeight: 80,
            previewAsCanvas: true,
            uploadTemplateId: "template-upload",
            downloadTemplateId: "template-download",
            filesContainer: undefined,
            prependFiles: false,
            dataType: "json",
            add: function (i, h) {
                var g = b(this).data("blueimp-fileupload") || b(this).data("fileupload"), d = g.options, f = h.files;
                b(this).fileupload("process", h).done(function () {
                    g._adjustMaxNumberOfFiles(-f.length);
                    h.maxNumberOfFilesAdjusted = true;
                    h.files.valid = h.isValidated = g._validate(f);
                    h.context = g._renderUpload(f).data("data", h);
                    d.filesContainer[d.prependFiles ? "prepend" : "append"](h.context);
                    g._renderPreviews(h);
                    g._forceReflow(h.context);
                    g._transition(h.context).done(function () {
                        if ((g._trigger("added", i, h) !== false) && (d.autoUpload || h.autoUpload) && h.autoUpload !== false && h.isValidated) {
                            h.submit()
                        }
                    })
                })
            },
            send: function (g, f) {
                var d = b(this).data("blueimp-fileupload") || b(this).data("fileupload");
                if (!f.isValidated) {
                    if (!f.maxNumberOfFilesAdjusted) {
                        d._adjustMaxNumberOfFiles(-f.files.length);
                        f.maxNumberOfFilesAdjusted = true
                    }
                    if (!d._validate(f.files)) {
                        return false
                    }
                }
                if (f.context && f.dataType && f.dataType.substr(0, 6) === "iframe") {
                    f.context.find(".progress").addClass(!b.support.transition && "progress-animated").attr("aria-valuenow", 100).find(".bar").css("width", "100%")
                }
                return d._trigger("sent", g, f)
            },
            done: function (j, i) {
                var h = b(this).data("blueimp-fileupload") || b(this).data("fileupload"),
                    g = h._getFilesFromResponse(i), f, d;
                if (i.context) {
                    i.context.each(function (m) {
                        var n = g[m] || {error: "Empty file upload result"}, k = h._addFinishedDeferreds();
                        if (n.error) {
                            h._adjustMaxNumberOfFiles(1)
                        }
                        h._transition(b(this)).done(function () {
                            var o = b(this);
                            f = h._renderDownload([n]).replaceAll(o);
                            h._forceReflow(f);
                            h._transition(f).done(function () {
                                i.context = b(this);
                                h._trigger("completed", j, i);
                                h._trigger("finished", j, i);
                                k.resolve()
                            })
                        })
                    })
                } else {
                    if (g.length) {
                        b.each(g, function (k, m) {
                            if (i.maxNumberOfFilesAdjusted && m.error) {
                                h._adjustMaxNumberOfFiles(1)
                            } else {
                                if (!i.maxNumberOfFilesAdjusted && !m.error) {
                                    h._adjustMaxNumberOfFiles(-1)
                                }
                            }
                        });
                        i.maxNumberOfFilesAdjusted = true
                    }
                    f = h._renderDownload(g).appendTo(h.options.filesContainer);
                    h._forceReflow(f);
                    d = h._addFinishedDeferreds();
                    h._transition(f).done(function () {
                        i.context = b(this);
                        h._trigger("completed", j, i);
                        h._trigger("finished", j, i);
                        d.resolve()
                    })
                }
            },
            fail: function (i, h) {
                var g = b(this).data("blueimp-fileupload") || b(this).data("fileupload"), f, d;
                if (h.maxNumberOfFilesAdjusted) {
                    g._adjustMaxNumberOfFiles(h.files.length)
                }
                if (h.context) {
                    h.context.each(function (j) {
                        if (h.errorThrown !== "abort") {
                            var k = h.files[j];
                            k.error = k.error || h.errorThrown || true;
                            d = g._addFinishedDeferreds();
                            g._transition(b(this)).done(function () {
                                var m = b(this);
                                f = g._renderDownload([k]).replaceAll(m);
                                g._forceReflow(f);
                                g._transition(f).done(function () {
                                    h.context = b(this);
                                    g._trigger("failed", i, h);
                                    g._trigger("finished", i, h);
                                    d.resolve()
                                })
                            })
                        } else {
                            d = g._addFinishedDeferreds();
                            g._transition(b(this)).done(function () {
                                b(this).remove();
                                g._trigger("failed", i, h);
                                g._trigger("finished", i, h);
                                d.resolve()
                            })
                        }
                    })
                } else {
                    if (h.errorThrown !== "abort") {
                        h.context = g._renderUpload(h.files).appendTo(g.options.filesContainer).data("data", h);
                        g._forceReflow(h.context);
                        d = g._addFinishedDeferreds();
                        g._transition(h.context).done(function () {
                            h.context = b(this);
                            g._trigger("failed", i, h);
                            g._trigger("finished", i, h);
                            d.resolve()
                        })
                    } else {
                        g._trigger("failed", i, h);
                        g._trigger("finished", i, h);
                        g._addFinishedDeferreds().resolve()
                    }
                }
            },
            progress: function (g, f) {
                if (f.context) {
                    var d = parseInt(f.loaded / f.total * 100, 10);
                    f.context.find(".progress").attr("aria-valuenow", d).find(".bar").css("width", d + "%")
                }
            },
            progressall: function (i, g) {
                var h = b(this), f = parseInt(g.loaded / g.total * 100, 10), d = h.find(".fileupload-progress"),
                    j = d.find(".progress-extended");
                if (j.length) {
                    j.html((h.data("blueimp-fileupload") || h.data("fileupload"))._renderExtendedProgress(g))
                }
                d.find(".progress").attr("aria-valuenow", f).find(".bar").css("width", f + "%")
            },
            start: function (f) {
                var d = b(this).data("blueimp-fileupload") || b(this).data("fileupload");
                d._resetFinishedDeferreds();
                d._transition(b(this).find(".fileupload-progress")).done(function () {
                    d._trigger("started", f)
                })
            },
            stop: function (g) {
                var f = b(this).data("blueimp-fileupload") || b(this).data("fileupload"), d = f._addFinishedDeferreds();
                b.when.apply(b, f._getFinishedDeferreds()).done(function () {
                    f._trigger("stopped", g)
                });
                f._transition(b(this).find(".fileupload-progress")).done(function () {
                    b(this).find(".progress").attr("aria-valuenow", "0").find(".bar").css("width", "0%");
                    b(this).find(".progress-extended").html("&nbsp;");
                    d.resolve()
                })
            },
            destroy: function (g, f) {
                var d = b(this).data("blueimp-fileupload") || b(this).data("fileupload");
                if (f.url) {
                    b.ajax(f);
                    d._adjustMaxNumberOfFiles(1)
                }
                d._transition(f.context).done(function () {
                    b(this).remove();
                    d._trigger("destroyed", g, f)
                })
            }
        }, _resetFinishedDeferreds: function () {
            this._finishedUploads = []
        }, _addFinishedDeferreds: function (d) {
            if (!d) {
                d = b.Deferred()
            }
            this._finishedUploads.push(d);
            return d
        }, _getFinishedDeferreds: function () {
            return this._finishedUploads
        }, _getFilesFromResponse: function (d) {
            if (d.result && b.isArray(d.result.files)) {
                return d.result.files
            }
            return []
        }, _enableDragToDesktop: function () {
            var h = b(this), f = h.prop("href"), d = h.prop("download"), g = "application/octet-stream";
            h.bind("dragstart", function (j) {
                try {
                    j.originalEvent.dataTransfer.setData("DownloadURL", [g, d, f].join(":"))
                } catch (i) {
                }
            })
        }, _adjustMaxNumberOfFiles: function (d) {
            if (typeof this.options.maxNumberOfFiles === "number") {
                this.options.maxNumberOfFiles += d;
                if (this.options.maxNumberOfFiles < 1) {
                    this._disableFileInputButton()
                } else {
                    this._enableFileInputButton()
                }
            }
        }, _formatFileSize: function (d) {
            if (typeof d !== "number") {
                return ""
            }
            if (d >= 1000000000) {
                return (d / 1000000000).toFixed(2) + " GB"
            }
            if (d >= 1000000) {
                return (d / 1000000).toFixed(2) + " MB"
            }
            return (d / 1000).toFixed(2) + " KB"
        }, _formatBitrate: function (d) {
            if (typeof d !== "number") {
                return ""
            }
            if (d >= 1000000000) {
                return (d / 1000000000).toFixed(2) + " Gbit/s"
            }
            if (d >= 1000000) {
                return (d / 1000000).toFixed(2) + " Mbit/s"
            }
            if (d >= 1000) {
                return (d / 1000).toFixed(2) + " kbit/s"
            }
            return d.toFixed(2) + " bit/s"
        }, _formatTime: function (f) {
            var d = new Date(f * 1000), g = parseInt(f / 86400, 10);
            g = g ? g + "d " : "";
            return g + ("0" + d.getUTCHours()).slice(-2) + ":" + ("0" + d.getUTCMinutes()).slice(-2) + ":" + ("0" + d.getUTCSeconds()).slice(-2)
        }, _formatPercentage: function (d) {
            return (d * 100).toFixed(2) + " %"
        }, _renderExtendedProgress: function (d) {
            return this._formatBitrate(d.bitrate) + " | " + this._formatTime((d.total - d.loaded) * 8 / d.bitrate) + " | " + this._formatPercentage(d.loaded / d.total) + " | " + this._formatFileSize(d.loaded) + " / " + this._formatFileSize(d.total)
        }, _hasError: function (d) {
            if (d.error) {
                return d.error
            }
            if (this.options.maxNumberOfFiles < 0) {
                return "Maximum number of files exceeded"
            }
            if (!(this.options.acceptFileTypes.test(d.type) || this.options.acceptFileTypes.test(d.name))) {
                return "Filetype not allowed"
            }
            if (this.options.maxFileSize && d.size > this.options.maxFileSize) {
                return "File is too big"
            }
            if (typeof d.size === "number" && d.size < this.options.minFileSize) {
                return "File is too small"
            }
            return null
        }, _validate: function (g) {
            var f = this, d = !!g.length;
            b.each(g, function (h, i) {
                i.error = f._hasError(i);
                if (i.error) {
                    d = false
                }
            });
            return d
        }, _renderTemplate: function (g, f) {
            if (!g) {
                return b()
            }
            var d = g({files: f, formatFileSize: this._formatFileSize, options: this.options});
            if (d instanceof b) {
                return d
            }
            return b(this.options.templatesContainer).html(d).children()
        }, _renderPreview: function (g, i) {
            var h = this, f = this.options, d = b.Deferred();
            return ((c && c(g, function (j) {
                i.append(j);
                h._forceReflow(i);
                h._transition(i).done(function () {
                    d.resolveWith(i)
                });
                if (!b.contains(h.document[0].body, i[0])) {
                    d.resolveWith(i)
                }
            }, {
                maxWidth: f.previewMaxWidth,
                maxHeight: f.previewMaxHeight,
                canvas: f.previewAsCanvas
            })) || d.resolveWith(i)) && d
        }, _renderPreviews: function (g) {
            var f = this, d = this.options;
            g.context.find(".preview span").each(function (h, j) {
                var i = g.files[h];
                if (d.previewSourceFileTypes.test(i.type) && (b.type(d.previewSourceMaxFileSize) !== "number" || i.size < d.previewSourceMaxFileSize)) {
                    f._processingQueue = f._processingQueue.pipe(function () {
                        var k = b.Deferred(), m = b.Event("previewdone", {target: j});
                        f._renderPreview(i, b(j)).done(function () {
                            f._trigger(m.type, m, g);
                            k.resolveWith(f)
                        });
                        return k.promise()
                    })
                }
            });
            return this._processingQueue
        }, _renderUpload: function (d) {
            return this._renderTemplate(this.options.uploadTemplate, d)
        }, _renderDownload: function (d) {
            return this._renderTemplate(this.options.downloadTemplate, d).find("a[download]").each(this._enableDragToDesktop).end()
        }, _startHandler: function (h) {
            h.preventDefault();
            var d = b(h.currentTarget), f = d.closest(".template-upload"), g = f.data("data");
            if (g && g.submit && !g.jqXHR && g.submit()) {
                d.prop("disabled", true)
            }
        }, _cancelHandler: function (g) {
            g.preventDefault();
            var d = b(g.currentTarget).closest(".template-upload"), f = d.data("data") || {};
            if (!f.jqXHR) {
                f.errorThrown = "abort";
                this._trigger("fail", g, f)
            } else {
                f.jqXHR.abort()
            }
        }, _deleteHandler: function (f) {
            f.preventDefault();
            var d = b(f.currentTarget);
            this._trigger("destroy", f, b.extend({
                context: d.closest(".template-download"),
                type: "DELETE",
                dataType: this.options.dataType
            }, d.data()))
        }, _forceReflow: function (d) {
            return b.support.transition && d.length && d[0].offsetWidth
        }, _transition: function (f) {
            var d = b.Deferred();
            if (b.support.transition && f.hasClass("fade")) {
                f.bind(b.support.transition.end, function (g) {
                    if (g.target === f[0]) {
                        f.unbind(b.support.transition.end);
                        d.resolveWith(f)
                    }
                }).toggleClass("in")
            } else {
                f.toggleClass("in");
                d.resolveWith(f)
            }
            return d
        }, _initButtonBarEventHandlers: function () {
            var d = this.element.find(".fileupload-buttonbar"), f = this.options.filesContainer;
            this._on(d.find(".start"), {
                click: function (g) {
                    g.preventDefault();
                    f.find(".start button").click()
                }
            });
            this._on(d.find(".cancel"), {
                click: function (g) {
                    g.preventDefault();
                    f.find(".cancel button").click()
                }
            });
            this._on(d.find(".delete"), {
                click: function (g) {
                    g.preventDefault();
                    f.find(".delete input:checked").siblings("button").click();
                    d.find(".toggle").prop("checked", false)
                }
            });
            this._on(d.find(".toggle"), {
                change: function (g) {
                    f.find(".delete input").prop("checked", b(g.currentTarget).is(":checked"))
                }
            })
        }, _destroyButtonBarEventHandlers: function () {
            this._off(this.element.find(".fileupload-buttonbar button"), "click");
            this._off(this.element.find(".fileupload-buttonbar .toggle"), "change.")
        }, _initEventHandlers: function () {
            this._super();
            this._on(this.options.filesContainer, {
                "click .start button": this._startHandler,
                "click .cancel button": this._cancelHandler,
                "click .delete button": this._deleteHandler
            });
            this._initButtonBarEventHandlers()
        }, _destroyEventHandlers: function () {
            this._destroyButtonBarEventHandlers();
            this._off(this.options.filesContainer, "click");
            this._super()
        }, _enableFileInputButton: function () {
            this.element.find(".fileinput-button input").prop("disabled", false).parent().removeClass("disabled")
        }, _disableFileInputButton: function () {
            this.element.find(".fileinput-button input").prop("disabled", true).parent().addClass("disabled")
        }, _initTemplates: function () {
            var d = this.options;
            d.templatesContainer = this.document[0].createElement(d.filesContainer.prop("nodeName"));
            if (a) {
                if (d.uploadTemplateId) {
                    d.uploadTemplate = a(d.uploadTemplateId)
                }
                if (d.downloadTemplateId) {
                    d.downloadTemplate = a(d.downloadTemplateId)
                }
            }
        }, _initFilesContainer: function () {
            var d = this.options;
            if (d.filesContainer === undefined) {
                d.filesContainer = this.element.find(".files")
            } else {
                if (!(d.filesContainer instanceof b)) {
                    d.filesContainer = b(d.filesContainer)
                }
            }
        }, _stringToRegExp: function (g) {
            var f = g.split("/"), d = f.pop();
            f.shift();
            return new RegExp(f.join("/"), d)
        }, _initRegExpOptions: function () {
            var d = this.options;
            if (b.type(d.acceptFileTypes) === "string") {
                d.acceptFileTypes = this._stringToRegExp(d.acceptFileTypes)
            }
            if (b.type(d.previewSourceFileTypes) === "string") {
                d.previewSourceFileTypes = this._stringToRegExp(d.previewSourceFileTypes)
            }
        }, _initSpecialOptions: function () {
            this._super();
            this._initFilesContainer();
            this._initTemplates();
            this._initRegExpOptions()
        }, _setOption: function (d, f) {
            this._super(d, f);
            if (d === "maxNumberOfFiles") {
                this._adjustMaxNumberOfFiles(0)
            }
        }, _create: function () {
            this._super();
            this._refreshOptionsList.push("filesContainer", "uploadTemplateId", "downloadTemplateId");
            if (!this._processingQueue) {
                this._processingQueue = b.Deferred().resolveWith(this).promise();
                this.process = function () {
                    return this._processingQueue
                }
            }
            this._resetFinishedDeferreds()
        }, enable: function () {
            var d = false;
            if (this.options.disabled) {
                d = true
            }
            this._super();
            if (d) {
                this.element.find("input, button").prop("disabled", false);
                this._enableFileInputButton()
            }
        }, disable: function () {
            if (!this.options.disabled) {
                this.element.find("input, button").prop("disabled", true);
                this._disableFileInputButton()
            }
            this._super()
        }
    })
}));
(function (b) {
    var a = {
        init: function (c) {
            var d = this;
            if (!d.data("jqv") || d.data("jqv") == null) {
                c = a._saveOptions(d, c);
                b(document).on("click", ".formError", function () {
                    b(this).fadeOut(150, function () {
                        b(this).parent(".formErrorOuter").remove();
                        b(this).remove()
                    })
                })
            }
            return this
        },
        attach: function (f) {
            var d = this;
            var c;
            if (f) {
                c = a._saveOptions(d, f)
            } else {
                c = d.data("jqv")
            }
            c.validateAttribute = (d.find("[data-validation-engine*=validate]").length) ? "data-validation-engine" : "class";
            if (c.binded) {
                d.on(c.validationEventTrigger, "[" + c.validateAttribute + "*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)", a._onFieldEvent);
                d.on("click", "[" + c.validateAttribute + "*=validate][type=checkbox],[" + c.validateAttribute + "*=validate][type=radio]", a._onFieldEvent);
                d.on(c.validationEventTrigger, "[" + c.validateAttribute + "*=validate][class*=datepicker]", {delay: 300}, a._onFieldEvent)
            }
            if (c.autoPositionUpdate) {
                b(window).bind("resize", {noAnimation: true, formElem: d}, a.updatePromptsPosition)
            }
            d.on("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", a._submitButtonClick);
            d.removeData("jqv_submitButton");
            d.on("submit", a._onSubmitEvent);
            return this
        },
        detach: function () {
            var d = this;
            var c = d.data("jqv");
            d.find("[" + c.validateAttribute + "*=validate]").not("[type=checkbox]").off(c.validationEventTrigger, a._onFieldEvent);
            d.find("[" + c.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").off("click", a._onFieldEvent);
            d.off("submit", a.onAjaxFormComplete);
            d.off("submit", a.onAjaxFormComplete);
            d.removeData("jqv");
            d.off("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", a._submitButtonClick);
            d.removeData("jqv_submitButton");
            if (c.autoPositionUpdate) {
                b(window).unbind("resize", a.updatePromptsPosition)
            }
            return this
        },
        validate: function () {
            var d = b(this);
            var g = null;
            if (d.is("form") || d.hasClass("validationEngineContainer")) {
                if (d.hasClass("validating")) {
                    return false
                } else {
                    d.addClass("validating");
                    var c = d.data("jqv");
                    var g = a._validateFields(this);
                    setTimeout(function () {
                        d.removeClass("validating")
                    }, 100);
                    if (g && c.onSuccess) {
                        c.onSuccess()
                    } else {
                        if (!g && c.onFailure) {
                            c.onFailure()
                        }
                    }
                }
            } else {
                if (d.is("form") || d.hasClass("validationEngineContainer")) {
                    d.removeClass("validating")
                } else {
                    var f = d.closest("form, .validationEngineContainer"),
                        c = (f.data("jqv")) ? f.data("jqv") : b.validationEngine.defaults, g = a._validateField(d, c);
                    if (g && c.onFieldSuccess) {
                        c.onFieldSuccess()
                    } else {
                        if (c.onFieldFailure && c.InvalidFields.length > 0) {
                            c.onFieldFailure()
                        }
                    }
                }
            }
            if (c.onValidationComplete) {
                return !!c.onValidationComplete(f, g)
            }
            return g
        },
        updatePromptsPosition: function (g) {
            if (g && this == window) {
                var f = g.data.formElem;
                var c = g.data.noAnimation
            } else {
                var f = b(this.closest("form, .validationEngineContainer"))
            }
            var d = f.data("jqv");
            f.find("[" + d.validateAttribute + "*=validate]").not(":disabled").each(function () {
                var j = b(this);
                if (d.prettySelect && j.is(":hidden")) {
                    j = f.find("#" + d.usePrefix + j.attr("id") + d.useSuffix)
                }
                var h = a._getPrompt(j);
                var i = b(h).find(".formErrorContent").html();
                if (h) {
                    a._updatePrompt(j, b(h), i, undefined, false, d, c)
                }
            });
            return this
        },
        showPrompt: function (d, g, i, f) {
            var h = this.closest("form, .validationEngineContainer");
            var c = h.data("jqv");
            if (!c) {
                c = a._saveOptions(this, c)
            }
            if (i) {
                c.promptPosition = i
            }
            c.showArrow = f == true;
            a._showPrompt(this, d, g, false, c);
            return this
        },
        hide: function () {
            var g = b(this).closest("form, .validationEngineContainer");
            var d = g.data("jqv");
            var f = (d && d.fadeDuration) ? d.fadeDuration : 0.3;
            var c;
            if (b(this).is("form") || b(this).hasClass("validationEngineContainer")) {
                c = "parentForm" + a._getClassName(b(this).attr("id"))
            } else {
                c = a._getClassName(b(this).attr("id")) + "formError"
            }
            b("." + c).fadeTo(f, 0.3, function () {
                b(this).parent(".formErrorOuter").remove();
                b(this).remove()
            });
            return this
        },
        hideAll: function () {
            var d = this;
            var c = d.data("jqv");
            var f = c ? c.fadeDuration : 300;
            b(".formError").fadeTo(f, 300, function () {
                b(this).parent(".formErrorOuter").remove();
                b(this).remove()
            });
            return this
        },
        _onFieldEvent: function (f) {
            var g = b(this);
            var d = g.closest("form, .validationEngineContainer");
            var c = d.data("jqv");
            c.eventTrigger = "field";
            window.setTimeout(function () {
                a._validateField(g, c);
                if (c.InvalidFields.length == 0 && c.onFieldSuccess) {
                    c.onFieldSuccess()
                } else {
                    if (c.InvalidFields.length > 0 && c.onFieldFailure) {
                        c.onFieldFailure()
                    }
                }
            }, (f.data) ? f.data.delay : 0)
        },
        _onSubmitEvent: function () {
            var g = b(this);
            var c = g.data("jqv");
            if (g.data("jqv_submitButton")) {
                var d = b("#" + g.data("jqv_submitButton"));
                if (d) {
                    if (d.length > 0) {
                        if (d.hasClass("validate-skip") || d.attr("data-validation-engine-skip") == "true") {
                            return true
                        }
                    }
                }
            }
            c.eventTrigger = "submit";
            var f = a._validateFields(g);
            if (f && c.ajaxFormValidation) {
                a._validateFormWithAjax(g, c);
                return false
            }
            if (c.onValidationComplete) {
                return !!c.onValidationComplete(g, f)
            }
            return f
        },
        _checkAjaxStatus: function (d) {
            var c = true;
            b.each(d.ajaxValidCache, function (f, g) {
                if (!g) {
                    c = false;
                    return false
                }
            });
            return c
        },
        _checkAjaxFieldStatus: function (c, d) {
            return d.ajaxValidCache[c] == true
        },
        _validateFields: function (f) {
            var o = f.data("jqv");
            var g = false;
            f.trigger("jqv.form.validating");
            var p = null;
            f.find("[" + o.validateAttribute + "*=validate]").not(":disabled").each(function () {
                var r = b(this);
                var q = [];
                if (b.inArray(r.attr("name"), q) < 0) {
                    g |= a._validateField(r, o);
                    if (g && p == null) {
                        if (r.is(":hidden") && o.prettySelect) {
                            p = r = f.find("#" + o.usePrefix + a._jqSelector(r.attr("id")) + o.useSuffix)
                        } else {
                            p = r
                        }
                    }
                    if (o.doNotShowAllErrosOnSubmit) {
                        return false
                    }
                    q.push(r.attr("name"));
                    if (o.showOneMessage == true && g) {
                        return false
                    }
                }
            });
            f.trigger("jqv.form.result", [g]);
            if (g) {
                if (o.scroll) {
                    var n = p.offset().top;
                    var i = p.offset().left;
                    var k = o.promptPosition;
                    if (typeof (k) == "string" && k.indexOf(":") != -1) {
                        k = k.substring(0, k.indexOf(":"))
                    }
                    if (k != "bottomRight" && k != "bottomLeft") {
                        var j = a._getPrompt(p);
                        if (j) {
                            n = j.offset().top
                        }
                    }
                    if (o.scrollOffset) {
                        n -= o.scrollOffset
                    }
                    if (o.isOverflown) {
                        var c = b(o.overflownDIV);
                        if (!c.length) {
                            return false
                        }
                        var d = c.scrollTop();
                        var h = -parseInt(c.offset().top);
                        n += d + h - 5;
                        var m = b(o.overflownDIV + ":not(:animated)");
                        m.animate({scrollTop: n}, 1100, function () {
                            if (o.focusFirstField) {
                                p.focus()
                            }
                        })
                    } else {
                        b("html, body").animate({scrollTop: n}, 1100, function () {
                            if (o.focusFirstField) {
                                p.focus()
                            }
                        });
                        b("html, body").animate({scrollLeft: i}, 1100)
                    }
                } else {
                    if (o.focusFirstField) {
                        p.focus()
                    }
                }
                return false
            }
            return true
        },
        _validateFormWithAjax: function (h, f) {
            var i = h.serialize();
            var g = (f.ajaxFormValidationMethod) ? f.ajaxFormValidationMethod : "GET";
            var d = (f.ajaxFormValidationURL) ? f.ajaxFormValidationURL : h.attr("action");
            var c = (f.dataType) ? f.dataType : "json";
            b.ajax({
                type: g,
                url: d,
                cache: false,
                dataType: c,
                data: i,
                form: h,
                methods: a,
                options: f,
                beforeSend: function () {
                    return f.onBeforeAjaxFormValidation(h, f)
                },
                error: function (j, k) {
                    a._ajaxError(j, k)
                },
                success: function (o) {
                    if ((c == "json") && (o !== true)) {
                        var m = false;
                        for (var n = 0; n < o.length; n++) {
                            var p = o[n];
                            var r = p[0];
                            var k = b(b("#" + r)[0]);
                            if (k.length == 1) {
                                var q = p[2];
                                if (p[1] == true) {
                                    if (q == "" || !q) {
                                        a._closePrompt(k)
                                    } else {
                                        if (f.allrules[q]) {
                                            var j = f.allrules[q].alertTextOk;
                                            if (j) {
                                                q = j
                                            }
                                        }
                                        if (f.showPrompts) {
                                            a._showPrompt(k, q, "pass", false, f, true)
                                        }
                                    }
                                } else {
                                    m |= true;
                                    if (f.allrules[q]) {
                                        var j = f.allrules[q].alertText;
                                        if (j) {
                                            q = j
                                        }
                                    }
                                    if (f.showPrompts) {
                                        a._showPrompt(k, q, "", false, f, true)
                                    }
                                }
                            }
                        }
                        f.onAjaxFormComplete(!m, h, o, f)
                    } else {
                        f.onAjaxFormComplete(true, h, o, f)
                    }
                }
            })
        },
        _validateField: function (d, n, u) {
            if (!d.attr("id")) {
                d.attr("id", "form-validation-field-" + b.validationEngine.fieldIdCounter);
                ++b.validationEngine.fieldIdCounter
            }
            if (!n.validateNonVisibleFields && (d.is(":hidden") && !n.prettySelect || d.parent().is(":hidden"))) {
                return false
            }
            var w = d.attr(n.validateAttribute);
            var C = /validate\[(.*)\]/.exec(w);
            if (!C) {
                return false
            }
            var y = C[1];
            var t = y.split(/\[|,|\]/);
            var q = false;
            var k = d.attr("name");
            var j = "";
            var B = "";
            var v = false;
            var D = false;
            n.isError = false;
            n.showArrow = true;
            if (n.maxErrorsPerField > 0) {
                D = true
            }
            var f = b(d.closest("form, .validationEngineContainer"));
            for (var A = 0; A < t.length; A++) {
                t[A] = t[A].replace(" ", "");
                if (t[A] === "") {
                    delete t[A]
                }
            }
            for (var A = 0, p = 0; A < t.length; A++) {
                if (D && p >= n.maxErrorsPerField) {
                    if (!v) {
                        var m = b.inArray("required", t);
                        v = (m != -1 && m >= A)
                    }
                    break
                }
                var h = undefined;
                switch (t[A]) {
                    case"required":
                        v = true;
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._required);
                        break;
                    case"custom":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._custom);
                        break;
                    case"groupRequired":
                        var z = "[" + n.validateAttribute + "*=" + t[A + 1] + "]";
                        var g = f.find(z).eq(0);
                        if (g[0] != d[0]) {
                            a._validateField(g, n, u);
                            n.showArrow = true
                        }
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._groupRequired);
                        if (h) {
                            v = true
                        }
                        n.showArrow = false;
                        break;
                    case"ajax":
                        h = a._ajax(d, t, A, n);
                        if (h) {
                            B = "load"
                        }
                        break;
                    case"minSize":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._minSize);
                        break;
                    case"maxSize":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._maxSize);
                        break;
                    case"min":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._min);
                        break;
                    case"max":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._max);
                        break;
                    case"past":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._past);
                        break;
                    case"future":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._future);
                        break;
                    case"dateRange":
                        var z = "[" + n.validateAttribute + "*=" + t[A + 1] + "]";
                        n.firstOfGroup = f.find(z).eq(0);
                        n.secondOfGroup = f.find(z).eq(1);
                        if (n.firstOfGroup[0].value || n.secondOfGroup[0].value) {
                            h = a._getErrorMessage(f, d, t[A], t, A, n, a._dateRange)
                        }
                        if (h) {
                            v = true
                        }
                        n.showArrow = false;
                        break;
                    case"dateTimeRange":
                        var z = "[" + n.validateAttribute + "*=" + t[A + 1] + "]";
                        n.firstOfGroup = f.find(z).eq(0);
                        n.secondOfGroup = f.find(z).eq(1);
                        if (n.firstOfGroup[0].value || n.secondOfGroup[0].value) {
                            h = a._getErrorMessage(f, d, t[A], t, A, n, a._dateTimeRange)
                        }
                        if (h) {
                            v = true
                        }
                        n.showArrow = false;
                        break;
                    case"maxCheckbox":
                        d = b(f.find("input[name='" + k + "']"));
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._maxCheckbox);
                        break;
                    case"minCheckbox":
                        d = b(f.find("input[name='" + k + "']"));
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._minCheckbox);
                        break;
                    case"equals":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._equals);
                        break;
                    case"funcCall":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._funcCall);
                        break;
                    case"creditCard":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._creditCard);
                        break;
                    case"condRequired":
                        h = a._getErrorMessage(f, d, t[A], t, A, n, a._condRequired);
                        if (h !== undefined) {
                            v = true
                        }
                        break;
                    default:
                }
                var o = false;
                if (typeof h == "object") {
                    switch (h.status) {
                        case"_break":
                            o = true;
                            break;
                        case"_error":
                            h = h.message;
                            break;
                        case"_error_no_prompt":
                            return true;
                            break;
                        default:
                            break
                    }
                }
                if (o) {
                    break
                }
                if (typeof h == "string") {
                    j += h + "<br/>";
                    n.isError = true;
                    p++
                }
            }
            if (!v && !(d.val()) && d.val().length < 1) {
                n.isError = false
            }
            var r = d.prop("type");
            var c = d.data("promptPosition") || n.promptPosition;
            if ((r == "radio" || r == "checkbox") && f.find("input[name='" + k + "']").size() > 1) {
                if (c === "inline") {
                    d = b(f.find("input[name='" + k + "'][type!=hidden]:last"))
                } else {
                    d = b(f.find("input[name='" + k + "'][type!=hidden]:first"))
                }
                n.showArrow = false
            }
            if (d.is(":hidden") && n.prettySelect) {
                d = f.find("#" + n.usePrefix + a._jqSelector(d.attr("id")) + n.useSuffix)
            }
            if (n.isError && n.showPrompts) {
                a._showPrompt(d, j, B, false, n)
            } else {
                if (!q) {
                    a._closePrompt(d)
                }
            }
            if (!q) {
                d.trigger("jqv.field.result", [d, n.isError, j])
            }
            var s = b.inArray(d[0], n.InvalidFields);
            if (s == -1) {
                if (n.isError) {
                    n.InvalidFields.push(d[0])
                }
            } else {
                if (!n.isError) {
                    n.InvalidFields.splice(s, 1)
                }
            }
            a._handleStatusCssClasses(d, n);
            if (n.isError && n.onFieldFailure) {
                n.onFieldFailure(d)
            }
            if (!n.isError && n.onFieldSuccess) {
                n.onFieldSuccess(d)
            }
            return n.isError
        },
        _handleStatusCssClasses: function (d, c) {
            if (c.addSuccessCssClassToField) {
                d.removeClass(c.addSuccessCssClassToField)
            }
            if (c.addFailureCssClassToField) {
                d.removeClass(c.addFailureCssClassToField)
            }
            if (c.addSuccessCssClassToField && !c.isError) {
                d.addClass(c.addSuccessCssClassToField)
            }
            if (c.addFailureCssClassToField && c.isError) {
                d.addClass(c.addFailureCssClassToField)
            }
        },
        _getErrorMessage: function (c, p, n, r, h, s, o) {
            var k = jQuery.inArray(n, r);
            if (n === "custom" || n === "funcCall") {
                var q = r[k + 1];
                n = n + "[" + q + "]";
                delete (r[k])
            }
            var d = n;
            var f = (p.attr("data-validation-engine")) ? p.attr("data-validation-engine") : p.attr("class");
            var j = f.split(" ");
            var m;
            if (n == "future" || n == "past" || n == "maxCheckbox" || n == "minCheckbox") {
                m = o(c, p, r, h, s)
            } else {
                m = o(p, r, h, s)
            }
            if (m != undefined) {
                var g = a._getCustomErrorMessage(b(p), j, d, s);
                if (g) {
                    m = g
                }
            }
            return m
        },
        _getCustomErrorMessage: function (k, f, j, n) {
            var g = false;
            var d = a._validityProp[j];
            if (d != undefined) {
                g = k.attr("data-errormessage-" + d);
                if (g != undefined) {
                    return g
                }
            }
            g = k.attr("data-errormessage");
            if (g != undefined) {
                return g
            }
            var c = "#" + k.attr("id");
            if (typeof n.custom_error_messages[c] != "undefined" && typeof n.custom_error_messages[c][j] != "undefined") {
                g = n.custom_error_messages[c][j]["message"]
            } else {
                if (f.length > 0) {
                    for (var h = 0; h < f.length && f.length > 0; h++) {
                        var m = "." + f[h];
                        if (typeof n.custom_error_messages[m] != "undefined" && typeof n.custom_error_messages[m][j] != "undefined") {
                            g = n.custom_error_messages[m][j]["message"];
                            break
                        }
                    }
                }
            }
            if (!g && typeof n.custom_error_messages[j] != "undefined" && typeof n.custom_error_messages[j]["message"] != "undefined") {
                g = n.custom_error_messages[j]["message"]
            }
            return g
        },
        _validityProp: {
            required: "value-missing",
            custom: "custom-error",
            groupRequired: "value-missing",
            ajax: "custom-error",
            minSize: "range-underflow",
            maxSize: "range-overflow",
            min: "range-underflow",
            max: "range-overflow",
            past: "type-mismatch",
            future: "type-mismatch",
            dateRange: "type-mismatch",
            dateTimeRange: "type-mismatch",
            maxCheckbox: "range-overflow",
            minCheckbox: "range-underflow",
            equals: "pattern-mismatch",
            funcCall: "custom-error",
            creditCard: "pattern-mismatch",
            condRequired: "value-missing"
        },
        _required: function (j, m, g, o, h) {
            switch (j.prop("type")) {
                case"text":
                case"password":
                case"textarea":
                case"file":
                case"select-one":
                case"select-multiple":
                default:
                    var n = b.trim(j.val());
                    var f = b.trim(j.attr("data-validation-placeholder"));
                    var k = b.trim(j.attr("placeholder"));
                    if ((!n) || (f && n == f) || (k && n == k)) {
                        return o.allrules[m[g]].alertText
                    }
                    break;
                case"radio":
                case"checkbox":
                    if (h) {
                        if (!j.attr("checked")) {
                            return o.allrules[m[g]].alertTextCheckboxMultiple
                        }
                        break
                    }
                    var d = j.closest("form, .validationEngineContainer");
                    var c = j.attr("name");
                    if (d.find("input[name='" + c + "']:checked").size() == 0) {
                        if (d.find("input[name='" + c + "']:visible").size() == 1) {
                            return o.allrules[m[g]].alertTextCheckboxe
                        } else {
                            return o.allrules[m[g]].alertTextCheckboxMultiple
                        }
                    }
                    break
            }
        },
        _groupRequired: function (g, j, d, c) {
            var h = "[" + c.validateAttribute + "*=" + j[d + 1] + "]";
            var f = false;
            g.closest("form, .validationEngineContainer").find(h).each(function () {
                if (!a._required(b(this), j, d, c)) {
                    f = true;
                    return false
                }
            });
            if (!f) {
                return c.allrules[j[d]].alertText
            }
        },
        _custom: function (k, m, d, n) {
            var c = m[d + 1];
            var h = n.allrules[c];
            var j;
            if (!h) {
                alert("jqv:custom rule not found - " + c);
                return
            }
            if (h.regex) {
                var g = h.regex;
                if (!g) {
                    alert("jqv:custom regex not found - " + c);
                    return
                }
                var f = new RegExp(g);
                if (!f.test(k.val())) {
                    return n.allrules[c].alertText
                }
            } else {
                if (h.func) {
                    j = h.func;
                    if (typeof (j) !== "function") {
                        alert("jqv:custom parameter 'function' is no function - " + c);
                        return
                    }
                    if (!j(k, m, d, n)) {
                        return n.allrules[c].alertText
                    }
                } else {
                    alert("jqv:custom type not allowed " + c);
                    return
                }
            }
        },
        _funcCall: function (k, m, d, c) {
            var j = m[d + 1];
            var g;
            if (j.indexOf(".") > -1) {
                var h = j.split(".");
                var f = window;
                while (h.length) {
                    f = f[h.shift()]
                }
                g = f
            } else {
                g = window[j] || c.customFunctions[j]
            }
            if (typeof (g) == "function") {
                return g(k, m, d, c)
            }
        },
        _equals: function (g, h, f, d) {
            var c = h[f + 1];
            if (g.val() != b("#" + c).val()) {
                return d.allrules.equals.alertText
            }
        },
        _maxSize: function (j, k, g, f) {
            var d = k[g + 1];
            var c = j.val().length;
            if (c > d) {
                var h = f.allrules.maxSize;
                return h.alertText + d + h.alertText2
            }
        },
        _minSize: function (j, k, g, d) {
            var f = k[g + 1];
            var c = j.val().length;
            if (c < f) {
                var h = d.allrules.minSize;
                return h.alertText + f + h.alertText2
            }
        },
        _min: function (j, k, g, d) {
            var f = parseFloat(k[g + 1]);
            var c = parseFloat(j.val());
            if (c < f) {
                var h = d.allrules.min;
                if (h.alertText2) {
                    return h.alertText + f + h.alertText2
                }
                return h.alertText + f
            }
        },
        _max: function (j, k, g, f) {
            var d = parseFloat(k[g + 1]);
            var c = parseFloat(j.val());
            if (c > d) {
                var h = f.allrules.max;
                if (h.alertText2) {
                    return h.alertText + d + h.alertText2
                }
                return h.alertText + d
            }
        },
        _past: function (d, k, m, f, o) {
            var c = m[f + 1];
            var h = b(d.find("input[name='" + c.replace(/^#+/, "") + "']"));
            var g;
            if (c.toLowerCase() == "now") {
                g = new Date()
            } else {
                if (undefined != h.val()) {
                    if (h.is(":disabled")) {
                        return
                    }
                    g = a._parseDate(h.val())
                } else {
                    g = a._parseDate(c)
                }
            }
            var n = a._parseDate(k.val());
            if (n > g) {
                var j = o.allrules.past;
                if (j.alertText2) {
                    return j.alertText + a._dateToString(g) + j.alertText2
                }
                return j.alertText + a._dateToString(g)
            }
        },
        _future: function (d, k, m, f, o) {
            var c = m[f + 1];
            var h = b(d.find("input[name='" + c.replace(/^#+/, "") + "']"));
            var g;
            if (c.toLowerCase() == "now") {
                g = new Date()
            } else {
                if (undefined != h.val()) {
                    if (h.is(":disabled")) {
                        return
                    }
                    g = a._parseDate(h.val())
                } else {
                    g = a._parseDate(c)
                }
            }
            var n = a._parseDate(k.val());
            if (n < g) {
                var j = o.allrules.future;
                if (j.alertText2) {
                    return j.alertText + a._dateToString(g) + j.alertText2
                }
                return j.alertText + a._dateToString(g)
            }
        },
        _isDate: function (d) {
            var c = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
            return c.test(d)
        },
        _isDateTime: function (d) {
            var c = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
            return c.test(d)
        },
        _dateCompare: function (d, c) {
            return (new Date(d.toString()) < new Date(c.toString()))
        },
        _dateRange: function (f, g, d, c) {
            if ((!c.firstOfGroup[0].value && c.secondOfGroup[0].value) || (c.firstOfGroup[0].value && !c.secondOfGroup[0].value)) {
                return c.allrules[g[d]].alertText + c.allrules[g[d]].alertText2
            }
            if (!a._isDate(c.firstOfGroup[0].value) || !a._isDate(c.secondOfGroup[0].value)) {
                return c.allrules[g[d]].alertText + c.allrules[g[d]].alertText2
            }
            if (!a._dateCompare(c.firstOfGroup[0].value, c.secondOfGroup[0].value)) {
                return c.allrules[g[d]].alertText + c.allrules[g[d]].alertText2
            }
        },
        _dateTimeRange: function (f, g, d, c) {
            if ((!c.firstOfGroup[0].value && c.secondOfGroup[0].value) || (c.firstOfGroup[0].value && !c.secondOfGroup[0].value)) {
                return c.allrules[g[d]].alertText + c.allrules[g[d]].alertText2
            }
            if (!a._isDateTime(c.firstOfGroup[0].value) || !a._isDateTime(c.secondOfGroup[0].value)) {
                return c.allrules[g[d]].alertText + c.allrules[g[d]].alertText2
            }
            if (!a._dateCompare(c.firstOfGroup[0].value, c.secondOfGroup[0].value)) {
                return c.allrules[g[d]].alertText + c.allrules[g[d]].alertText2
            }
        },
        _maxCheckbox: function (j, k, m, h, g) {
            var d = m[h + 1];
            var f = k.attr("name");
            var c = j.find("input[name='" + f + "']:checked").size();
            if (c > d) {
                g.showArrow = false;
                if (g.allrules.maxCheckbox.alertText2) {
                    return g.allrules.maxCheckbox.alertText + " " + d + " " + g.allrules.maxCheckbox.alertText2
                }
                return g.allrules.maxCheckbox.alertText
            }
        },
        _minCheckbox: function (j, k, m, h, g) {
            var d = m[h + 1];
            var f = k.attr("name");
            var c = j.find("input[name='" + f + "']:checked").size();
            if (c < d) {
                g.showArrow = false;
                return g.allrules.minCheckbox.alertText + " " + d + " " + g.allrules.minCheckbox.alertText2
            }
        },
        _creditCard: function (m, n, g, p) {
            var d = false, o = m.val().replace(/ +/g, "").replace(/-+/g, "");
            var c = o.length;
            if (c >= 14 && c <= 16 && parseInt(o) > 0) {
                var h = 0, g = c - 1, k = 1, j, f = new String();
                do {
                    j = parseInt(o.charAt(g));
                    f += (k++ % 2 == 0) ? j * 2 : j
                } while (--g >= 0);
                for (g = 0; g < f.length; g++) {
                    h += parseInt(f.charAt(g))
                }
                d = h % 10 == 0
            }
            if (!d) {
                return p.allrules.creditCard.alertText
            }
        },
        _ajax: function (q, t, k, u) {
            var s = t[k + 1];
            var p = u.allrules[s];
            var f = p.extraData;
            var n = p.extraDataDynamic;
            var j = {fieldId: q.attr("id"), fieldValue: q.val()};
            if (typeof f === "object") {
                b.extend(j, f)
            } else {
                if (typeof f === "string") {
                    var m = f.split("&");
                    for (var k = 0; k < m.length; k++) {
                        var r = m[k].split("=");
                        if (r[0] && r[0]) {
                            j[r[0]] = r[1]
                        }
                    }
                }
            }
            if (n) {
                var h = [];
                var o = String(n).split(",");
                for (var k = 0; k < o.length; k++) {
                    var c = o[k];
                    if (b(c).length) {
                        var d = q.closest("form, .validationEngineContainer").find(c).val();
                        var g = c.replace("#", "") + "=" + escape(d);
                        j[c.replace("#", "")] = d
                    }
                }
            }
            if (u.eventTrigger == "field") {
                delete (u.ajaxValidCache[q.attr("id")])
            }
            if (!u.isError && !a._checkAjaxFieldStatus(q.attr("id"), u)) {
                b.ajax({
                    type: u.ajaxFormValidationMethod,
                    url: p.url,
                    cache: false,
                    dataType: "json",
                    data: j,
                    field: q,
                    rule: p,
                    methods: a,
                    options: u,
                    beforeSend: function () {
                    },
                    error: function (i, v) {
                        a._ajaxError(i, v)
                    },
                    success: function (y) {
                        var A = y[0];
                        var w = b("#" + A).eq(0);
                        if (w.length == 1) {
                            var v = y[1];
                            var z = y[2];
                            if (!v) {
                                u.ajaxValidCache[A] = false;
                                u.isError = true;
                                if (z) {
                                    if (u.allrules[z]) {
                                        var i = u.allrules[z].alertText;
                                        if (i) {
                                            z = i
                                        }
                                    }
                                } else {
                                    z = p.alertText
                                }
                                if (u.showPrompts) {
                                    a._showPrompt(w, z, "", true, u)
                                }
                            } else {
                                u.ajaxValidCache[A] = true;
                                if (z) {
                                    if (u.allrules[z]) {
                                        var i = u.allrules[z].alertTextOk;
                                        if (i) {
                                            z = i
                                        }
                                    }
                                } else {
                                    z = p.alertTextOk
                                }
                                if (u.showPrompts) {
                                    if (z) {
                                        a._showPrompt(w, z, "pass", true, u)
                                    } else {
                                        a._closePrompt(w)
                                    }
                                }
                                if (u.eventTrigger == "submit") {
                                    q.closest("form").submit()
                                }
                            }
                        }
                        w.trigger("jqv.field.result", [w, u.isError, z])
                    }
                });
                return p.alertTextLoad
            }
        },
        _ajaxError: function (c, d) {
            if (c.status == 0 && d == null) {
                alert("The page is not served from a server! ajax call failed")
            } else {
                if (typeof console != "undefined") {
                    console.log("Ajax error: " + c.status + " " + d)
                }
            }
        },
        _dateToString: function (c) {
            return c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate()
        },
        _parseDate: function (f) {
            var c = f.split("-");
            if (c == f) {
                c = f.split("/")
            }
            if (c == f) {
                c = f.split(".");
                return new Date(c[2], (c[1] - 1), c[0])
            }
            return new Date(c[0], (c[1] - 1), c[2])
        },
        _showPrompt: function (j, h, i, g, f, d) {
            var c = a._getPrompt(j);
            if (d) {
                c = false
            }
            if (b.trim(h)) {
                if (c) {
                    a._updatePrompt(j, c, h, i, g, f)
                } else {
                    a._buildPrompt(j, h, i, g, f)
                }
            }
        },
        _buildPrompt: function (j, c, h, m, o) {
            var d = b("<div>");
            d.addClass(a._getClassName(j.attr("id")) + "formError");
            d.addClass("parentForm" + a._getClassName(j.closest("form, .validationEngineContainer").attr("id")));
            d.addClass("formError");
            switch (h) {
                case"pass":
                    d.addClass("greenPopup");
                    break;
                case"load":
                    d.addClass("blackPopup");
                    break;
                default:
            }
            if (m) {
                d.addClass("ajaxed")
            }
            var p = b("<div>").addClass("formErrorContent").html(c).appendTo(d);
            var g = j.data("promptPosition") || o.promptPosition;
            if (o.showArrow) {
                var k = b("<div>").addClass("formErrorArrow");
                if (typeof (g) == "string") {
                    var i = g.indexOf(":");
                    if (i != -1) {
                        g = g.substring(0, i)
                    }
                }
                switch (g) {
                    case"bottomLeft":
                    case"bottomRight":
                        d.find(".formErrorContent").before(k);
                        k.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                        break;
                    case"topLeft":
                    case"topRight":
                        k.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
                        d.append(k);
                        break
                }
            }
            if (o.addPromptClass) {
                d.addClass(o.addPromptClass)
            }
            var n = j.attr("data-required-class");
            if (n !== undefined) {
                d.addClass(n)
            } else {
                if (o.prettySelect) {
                    if (b("#" + j.attr("id")).next().is("select")) {
                        var f = b("#" + j.attr("id").substr(o.usePrefix.length).substring(o.useSuffix.length)).attr("data-required-class");
                        if (f !== undefined) {
                            d.addClass(f)
                        }
                    }
                }
            }
            d.css({opacity: 0});
            if (g === "inline") {
                d.addClass("inline");
                if (typeof j.attr("data-prompt-target") !== "undefined" && b("#" + j.attr("data-prompt-target")).length > 0) {
                    d.appendTo(b("#" + j.attr("data-prompt-target")))
                } else {
                    j.after(d)
                }
            } else {
                j.before(d)
            }
            var i = a._calculatePosition(j, d, o);
            d.css({
                position: g === "inline" ? "relative" : "absolute",
                top: i.callerTopPosition,
                left: i.callerleftPosition,
                marginTop: i.marginTopSize,
                opacity: 0
            }).data("callerField", j);
            if (o.autoHidePrompt) {
                setTimeout(function () {
                    d.animate({opacity: 0}, function () {
                        d.closest(".formErrorOuter").remove();
                        d.remove()
                    })
                }, o.autoHideDelay)
            }
            return d.animate({opacity: 0.87})
        },
        _updatePrompt: function (j, d, c, h, k, m, f) {
            if (d) {
                if (typeof h !== "undefined") {
                    if (h == "pass") {
                        d.addClass("greenPopup")
                    } else {
                        d.removeClass("greenPopup")
                    }
                    if (h == "load") {
                        d.addClass("blackPopup")
                    } else {
                        d.removeClass("blackPopup")
                    }
                }
                if (k) {
                    d.addClass("ajaxed")
                } else {
                    d.removeClass("ajaxed")
                }
                d.find(".formErrorContent").html(c);
                var i = a._calculatePosition(j, d, m);
                var g = {top: i.callerTopPosition, left: i.callerleftPosition, marginTop: i.marginTopSize};
                if (f) {
                    d.css(g)
                } else {
                    d.animate(g)
                }
            }
        },
        _closePrompt: function (d) {
            var c = a._getPrompt(d);
            if (c) {
                c.fadeTo("fast", 0, function () {
                    c.parent(".formErrorOuter").remove();
                    c.remove()
                })
            }
        },
        closePrompt: function (c) {
            return a._closePrompt(c)
        },
        _getPrompt: function (f) {
            var g = b(f).closest("form, .validationEngineContainer").attr("id");
            var d = a._getClassName(f.attr("id")) + "formError";
            var c = b("." + a._escapeExpression(d) + ".parentForm" + g)[0];
            if (c) {
                return b(c)
            }
        },
        _escapeExpression: function (c) {
            return c.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1")
        },
        isRTL: function (f) {
            var g = b(document);
            var c = b("body");
            var d = (f && f.hasClass("rtl")) || (f && (f.attr("dir") || "").toLowerCase() === "rtl") || g.hasClass("rtl") || (g.attr("dir") || "").toLowerCase() === "rtl" || c.hasClass("rtl") || (c.attr("dir") || "").toLowerCase() === "rtl";
            return Boolean(d)
        },
        _calculatePosition: function (o, g, t) {
            var f, p, m;
            var h = o.width();
            var c = o.position().left;
            var r = o.position().top;
            var d = o.height();
            var s = g.height();
            f = p = 0;
            m = -s;
            var k = o.data("promptPosition") || t.promptPosition;
            var j = "";
            var i = "";
            var q = 0;
            var n = 0;
            if (typeof (k) == "string") {
                if (k.indexOf(":") != -1) {
                    j = k.substring(k.indexOf(":") + 1);
                    k = k.substring(0, k.indexOf(":"));
                    if (j.indexOf(",") != -1) {
                        i = j.substring(j.indexOf(",") + 1);
                        j = j.substring(0, j.indexOf(","));
                        n = parseInt(i);
                        if (isNaN(n)) {
                            n = 0
                        }
                    }
                    q = parseInt(j);
                    if (isNaN(j)) {
                        j = 0
                    }
                }
            }
            switch (k) {
                default:
                case"topRight":
                    p += c + h - 30;
                    f += r;
                    break;
                case"topLeft":
                    f += r;
                    p += c;
                    break;
                case"centerRight":
                    f = r + 4;
                    m = 0;
                    p = c + o.outerWidth(true) + 5;
                    break;
                case"centerLeft":
                    p = c - (g.width() + 2);
                    f = r + 4;
                    m = 0;
                    break;
                case"bottomLeft":
                    f = r + o.height() + 5;
                    m = 0;
                    p = c;
                    break;
                case"bottomRight":
                    p = c + h - 30;
                    f = r + o.height() + 5;
                    m = 0;
                    break;
                case"inline":
                    p = 0;
                    f = 0;
                    m = 0
            }
            p += q;
            f += n;
            return {callerTopPosition: f + "px", callerleftPosition: p + "px", marginTopSize: m + "px"}
        },
        _saveOptions: function (f, d) {
            if (b.validationEngineLanguage) {
                var c = b.validationEngineLanguage.allRules
            } else {
                b.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page")
            }
            b.validationEngine.defaults.allrules = c;
            var g = b.extend(true, {}, b.validationEngine.defaults, d);
            f.data("jqv", g);
            return g
        },
        _getClassName: function (c) {
            if (c) {
                return c.replace(/:/g, "_").replace(/\./g, "_")
            }
        },
        _jqSelector: function (c) {
            return c.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1")
        },
        _condRequired: function (h, j, f, d) {
            var c, g;
            for (c = (f + 1); c < j.length; c++) {
                g = jQuery("#" + j[c]).first();
                if (g.length && a._required(g, ["required"], 0, d, true) == undefined) {
                    return a._required(h, ["required"], 0, d)
                }
            }
        },
        _submitButtonClick: function (f) {
            var c = b(this);
            var d = c.closest("form, .validationEngineContainer");
            d.data("jqv_submitButton", c.attr("id"))
        }
    };
    b.fn.validationEngine = function (d) {
        var c = b(this);
        if (!c[0]) {
            return c
        }
        if (typeof (d) == "string" && d.charAt(0) != "_" && a[d]) {
            if (d != "showPrompt" && d != "hide" && d != "hideAll") {
                a.init.apply(c)
            }
            return a[d].apply(c, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof d == "object" || !d) {
                a.init.apply(c, arguments);
                return a.attach.apply(c)
            } else {
                b.error("Method " + d + " does not exist in jQuery.validationEngine")
            }
        }
    };
    b.validationEngine = {
        fieldIdCounter: 0,
        defaults: {
            validationEventTrigger: "blur",
            scroll: true,
            focusFirstField: true,
            showPrompts: true,
            validateNonVisibleFields: false,
            promptPosition: "topRight",
            bindMethod: "bind",
            inlineAjax: false,
            ajaxFormValidation: false,
            ajaxFormValidationURL: false,
            ajaxFormValidationMethod: "get",
            onAjaxFormComplete: b.noop,
            onBeforeAjaxFormValidation: b.noop,
            onValidationComplete: false,
            doNotShowAllErrosOnSubmit: false,
            custom_error_messages: {},
            binded: true,
            showArrow: true,
            isError: false,
            maxErrorsPerField: false,
            ajaxValidCache: {},
            autoPositionUpdate: false,
            InvalidFields: [],
            onFieldSuccess: false,
            onFieldFailure: false,
            onSuccess: false,
            onFailure: false,
            validateAttribute: "class",
            addSuccessCssClassToField: "",
            addFailureCssClassToField: "",
            autoHidePrompt: false,
            autoHideDelay: 10000,
            fadeDuration: 0.3,
            prettySelect: false,
            addPromptClass: "",
            usePrefix: "",
            useSuffix: "",
            showOneMessage: false
        }
    };
    b(function () {
        b.validationEngine.defaults.promptPosition = a.isRTL() ? "topLeft" : "topRight"
    })
})(jQuery);
!function (d, c) {
    "object" == typeof exports ? module.exports = c() : "function" == typeof define && define.amd ? define(c) : d.Spinner = c()
}(this, function () {
    function E(g, f) {
        var i, h = document.createElement(g || "div");
        for (i in f) {
            h[i] = f[i]
        }
        return h
    }

    function D(f) {
        for (var d = 1, g = arguments.length; g > d; d++) {
            f.appendChild(arguments[d])
        }
        return f
    }

    function C(I, H, G, F) {
        var o = ["opacity", H, ~~(100 * I), G, F].join("-"), n = 0.01 + G / F * 100,
            m = Math.max(1 - (1 - I) / H * (100 - n), I), k = u.substring(0, u.indexOf("Animation")).toLowerCase(),
            j = k && "-" + k + "-" || "";
        return r[o] || (t.insertRule("@" + j + "keyframes " + o + "{0%{opacity:" + m + "}" + n + "%{opacity:" + I + "}" + (n + 0.01) + "%{opacity:1}" + (n + H) % 100 + "%{opacity:" + I + "}100%{opacity:" + m + "}}", t.cssRules.length), r[o] = 1), o
    }

    function B(g, f) {
        var j, i, h = g.style;
        if (f = f.charAt(0).toUpperCase() + f.slice(1), void 0 !== h[f]) {
            return f
        }
        for (i = 0; i < s.length; i++) {
            if (j = s[i] + f, void 0 !== h[j]) {
                return j
            }
        }
    }

    function A(f, d) {
        for (var g in d) {
            f.style[B(f, g) || g] = d[g]
        }
        return f
    }

    function z(g) {
        for (var f = 1; f < arguments.length; f++) {
            var i = arguments[f];
            for (var h in i) {
                void 0 === g[h] && (g[h] = i[h])
            }
        }
        return g
    }

    function y(d, c) {
        return "string" == typeof d ? d : d[c % d.length]
    }

    function w(b) {
        this.opts = z(b || {}, w.defaults, q)
    }

    function v() {
        function a(d, f) {
            return E("<" + d + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', f)
        }

        t.addRule(".spin-vml", "behavior:url(#default#VML)"), w.prototype.lines = function (I, H) {
            function G() {
                return A(a("group", {coordsize: g + " " + g, coordorigin: -n + " " + -n}), {width: g, height: g})
            }

            function F(d, j, f) {
                D(b, D(A(G(), {
                    rotation: 360 / H.lines * d + "deg",
                    left: ~~j
                }), D(A(a("roundrect", {arcsize: H.corners}), {
                    width: n,
                    height: H.scale * H.width,
                    left: H.scale * H.radius,
                    top: -H.scale * H.width >> 1,
                    filter: f
                }), a("fill", {color: y(H.color, d), opacity: H.opacity}), a("stroke", {opacity: 0}))))
            }

            var o, n = H.scale * (H.length + H.width), g = 2 * H.scale * n,
                c = -(H.width + H.length) * H.scale * 2 + "px", b = A(G(), {position: "absolute", top: c, left: c});
            if (H.shadow) {
                for (o = 1; o <= H.lines; o++) {
                    F(o, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)")
                }
            }
            for (o = 1; o <= H.lines; o++) {
                F(o)
            }
            return D(I, b)
        }, w.prototype.opacity = function (g, f, j, i) {
            var h = g.firstChild;
            i = i.shadow && i.lines || 0, h && f + i < h.childNodes.length && (h = h.childNodes[f + i], h = h && h.firstChild, h = h && h.firstChild, h && (h.opacity = j))
        }
    }

    var u, t, s = ["webkit", "Moz", "ms", "O"], r = {}, q = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        scale: 1,
        corners: 1,
        color: "#000",
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1,
        trail: 100,
        fps: 20,
        zIndex: 2000000000,
        className: "spinner",
        top: "50%",
        left: "50%",
        shadow: !1,
        hwaccel: !1,
        position: "absolute"
    };
    if (w.defaults = {}, z(w.prototype, {
        spin: function (O) {
            this.stop();
            var N = this, M = N.opts, L = N.el = E(null, {className: M.className});
            if (A(L, {
                position: M.position,
                width: 0,
                zIndex: M.zIndex,
                left: M.left,
                top: M.top
            }), O && O.insertBefore(L, O.firstChild || null), L.setAttribute("role", "progressbar"), N.lines(L, N.opts), !u) {
                var K, J = 0, I = (M.lines - 1) * (1 - M.direction) / 2, H = M.fps, G = H / M.speed,
                    F = (1 - M.opacity) / (G * M.trail / 100), j = G / M.lines;
                !function a() {
                    J++;
                    for (var b = 0; b < M.lines; b++) {
                        K = Math.max(1 - (J + (M.lines - b) * j) % G * F, M.opacity), N.opacity(L, b * M.direction + I, K, M)
                    }
                    N.timeout = N.el && setTimeout(a, ~~(1000 / H))
                }()
            }
            return N
        }, stop: function () {
            var b = this.el;
            return b && (clearTimeout(this.timeout), b.parentNode && b.parentNode.removeChild(b), this.el = void 0), this
        }, lines: function (m, j) {
            function g(d, f) {
                return A(E(), {
                    position: "absolute",
                    width: j.scale * (j.length + j.width) + "px",
                    height: j.scale * j.width + "px",
                    background: d,
                    boxShadow: f,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~(360 / j.lines * b + j.rotate) + "deg) translate(" + j.scale * j.radius + "px,0)",
                    borderRadius: (j.corners * j.scale * j.width >> 1) + "px"
                })
            }

            for (var c, b = 0, a = (j.lines - 1) * (1 - j.direction) / 2; b < j.lines; b++) {
                c = A(E(), {
                    position: "absolute",
                    top: 1 + ~(j.scale * j.width / 2) + "px",
                    transform: j.hwaccel ? "translate3d(0,0,0)" : "",
                    opacity: j.opacity,
                    animation: u && C(j.opacity, j.trail, a + b * j.direction, j.lines) + " " + 1 / j.speed + "s linear infinite"
                }), j.shadow && D(c, A(g("#000", "0 0 4px #000"), {top: "2px"})), D(m, D(c, g(y(j.color, b), "0 0 1px rgba(0,0,0,.1)")))
            }
            return m
        }, opacity: function (f, d, g) {
            d < f.childNodes.length && (f.childNodes[d].style.opacity = g)
        }
    }), "undefined" != typeof document) {
        t = function () {
            var a = E("style", {type: "text/css"});
            return D(document.getElementsByTagName("head")[0], a), a.sheet || a.styleSheet
        }();
        var p = A(E("group"), {behavior: "url(#default#VML)"});
        !B(p, "transform") && p.adj ? v() : u = B(p, "animation")
    }
    return w
});
window.Modernizr = function (ad, ac, ab) {
    function F(b) {
        U.cssText = b
    }

    function E(d, c) {
        return F(R.join(d + ";") + (c || ""))
    }

    function D(d, c) {
        return typeof d === c
    }

    function C(d, c) {
        return !!~("" + d).indexOf(c)
    }

    function O(g, c, j) {
        for (var i in g) {
            var h = c[g[i]];
            if (h !== ab) {
                return j === !1 ? g[i] : D(h, "function") ? h.bind(j || c) : h
            }
        }
        return !1
    }

    var aa = "2.7.1", Z = {}, Y = !0, X = ac.documentElement, W = "modernizr", V = ac.createElement(W), U = V.style, T,
        S = {}.toString, R = " -webkit- -moz- -o- -ms- ".split(" "), Q = {}, P = {}, N = {}, M = [], K = M.slice, J,
        I = function (v, u, t, s) {
            var r, q, p, o, h = ac.createElement("div"), g = ac.body, b = g || ac.createElement("body");
            if (parseInt(t, 10)) {
                while (t--) {
                    p = ac.createElement("div"), p.id = s ? s[t] : W + (t + 1), h.appendChild(p)
                }
            }
            return r = ["&#173;", '<style id="s', W, '">', v, "</style>"].join(""), h.id = W, (g ? h : b).innerHTML += r, b.appendChild(h), g || (b.style.background = "", b.style.overflow = "hidden", o = X.style.overflow, X.style.overflow = "hidden", X.appendChild(b)), q = u(h, v), g ? h.parentNode.removeChild(h) : (b.parentNode.removeChild(b), X.style.overflow = o), !!q
        }, H = {}.hasOwnProperty, G;
    !D(H, "undefined") && !D(H.call, "undefined") ? G = function (d, c) {
        return H.call(d, c)
    } : G = function (d, c) {
        return c in d && D(d.constructor.prototype[c], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (a) {
        var h = this;
        if (typeof h != "function") {
            throw new TypeError
        }
        var g = K.call(arguments, 1), f = function () {
            if (this instanceof f) {
                var b = function () {
                };
                b.prototype = h.prototype;
                var d = new b, c = h.apply(d, g.concat(K.call(arguments)));
                return Object(c) === c ? c : d
            }
            return h.apply(a, g.concat(K.call(arguments)))
        };
        return f
    }), Q.touch = function () {
        var a;
        return "ontouchstart" in ad || ad.DocumentTouch && ac instanceof DocumentTouch ? a = !0 : I(["@media (", R.join("touch-enabled),("), W, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (b) {
            a = b.offsetTop === 9
        }), a
    }, Q.video = function () {
        var b = ac.createElement("video"), g = !1;
        try {
            if (g = !!b.canPlayType) {
                g = new Boolean(g), g.ogg = b.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), g.h264 = b.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), g.webm = b.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
            }
        } catch (f) {
        }
        return g
    };
    for (var L in Q) {
        G(Q, L) && (J = L.toLowerCase(), Z[J] = Q[L](), M.push((Z[J] ? "" : "no-") + J))
    }
    return Z.addTest = function (f, c) {
        if (typeof f == "object") {
            for (var g in f) {
                G(f, g) && Z.addTest(g, f[g])
            }
        } else {
            f = f.toLowerCase();
            if (Z[f] !== ab) {
                return Z
            }
            c = typeof c == "function" ? c() : c, typeof Y != "undefined" && Y && (X.className += " w-mod-" + (c ? "" : "no-") + f), Z[f] = c
        }
        return Z
    }, F(""), V = T = null, function (ao, an) {
        function B(g, f) {
            var i = g.createElement("p"), h = g.getElementsByTagName("head")[0] || g.documentElement;
            return i.innerHTML = "x<style>" + f + "</style>", h.insertBefore(i.lastChild, h.firstChild)
        }

        function A() {
            var b = t.elements;
            return typeof b == "string" ? b.split(" ") : b
        }

        function z(d) {
            var c = af[d[ah]];
            return c || (c = {}, ag++, d[ah] = ag, af[ag] = c), c
        }

        function y(b, i, h) {
            i || (i = an);
            if (ae) {
                return i.createElement(b)
            }
            h || (h = z(i));
            var f;
            return h.cache[b] ? f = h.cache[b].cloneNode() : aj.test(b) ? f = (h.cache[b] = h.createElem(b)).cloneNode() : f = h.createElem(b), f.canHaveChildren && !ak.test(b) && !f.tagUrn ? h.frag.appendChild(f) : f
        }

        function w(b, m) {
            b || (b = an);
            if (ae) {
                return b.createDocumentFragment()
            }
            m = m || z(b);
            var k = m.frag.cloneNode(), j = 0, i = A(), h = i.length;
            for (; j < h; j++) {
                k.createElement(i[j])
            }
            return k
        }

        function v(d, c) {
            c.cache || (c.cache = {}, c.createElem = d.createElement, c.createFrag = d.createDocumentFragment, c.frag = c.createFrag()), d.createElement = function (a) {
                return t.shivMethods ? y(a, d, c) : c.createElem(a)
            }, d.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + A().join().replace(/[\w\-]+/g, function (b) {
                return c.createElem(b), c.frag.createElement(b), 'c("' + b + '")'
            }) + ");return n}")(t, c.frag)
        }

        function u(b) {
            b || (b = an);
            var d = z(b);
            return t.shivCSS && !ai && !d.hasCSS && (d.hasCSS = !!B(b, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), ae || v(b, d), b
        }

        var am = "3.7.0", al = ao.html5 || {},
            ak = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            aj = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            ai, ah = "_html5shiv", ag = 0, af = {}, ae;
        (function () {
            try {
                var b = an.createElement("a");
                b.innerHTML = "<xyz></xyz>", ai = "hidden" in b, ae = b.childNodes.length == 1 || function () {
                    an.createElement("a");
                    var c = an.createDocumentFragment();
                    return typeof c.cloneNode == "undefined" || typeof c.createDocumentFragment == "undefined" || typeof c.createElement == "undefined"
                }()
            } catch (d) {
                ai = !0, ae = !0
            }
        })();
        var t = {
            elements: al.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: am,
            shivCSS: al.shivCSS !== !1,
            supportsUnknownElements: ae,
            shivMethods: al.shivMethods !== !1,
            type: "default",
            shivDocument: u,
            createElement: y,
            createDocumentFragment: w
        };
        ao.html5 = t, u(an)
    }(this, ac), Z._version = aa, Z._prefixes = R, Z.testStyles = I, X.className = X.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (Y ? " w-mod-js w-mod-" + M.join(" w-mod-") : ""), Z
}(this, this.document);
Modernizr.addTest("ios", /(ipod|iphone|ipad)/i.test(navigator.userAgent));
!function (b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b : b(jQuery)
}(function (w) {
    function v(C) {
        var B = C || window.event, A = o.call(arguments, 1), z = 0, y = 0, k = 0, i = 0, f = 0, d = 0;
        if (C = w.event.fix(B), C.type = "mousewheel", "detail" in B && (k = -1 * B.detail), "wheelDelta" in B && (k = B.wheelDelta), "wheelDeltaY" in B && (k = B.wheelDeltaY), "wheelDeltaX" in B && (y = -1 * B.wheelDeltaX), "axis" in B && B.axis === B.HORIZONTAL_AXIS && (y = -1 * k, k = 0), z = 0 === k ? y : k, "deltaY" in B && (k = -1 * B.deltaY, z = k), "deltaX" in B && (y = B.deltaX, 0 === k && (z = -1 * y)), 0 !== k || 0 !== y) {
            if (1 === B.deltaMode) {
                var c = w.data(this, "mousewheel-line-height");
                z *= c, k *= c, y *= c
            } else {
                if (2 === B.deltaMode) {
                    var a = w.data(this, "mousewheel-page-height");
                    z *= a, k *= a, y *= a
                }
            }
            if (i = Math.max(Math.abs(k), Math.abs(y)), (!r || r > i) && (r = i, t(B, i) && (r /= 40)), t(B, i) && (z /= 40, y /= 40, k /= 40), z = Math[z >= 1 ? "floor" : "ceil"](z / r), y = Math[y >= 1 ? "floor" : "ceil"](y / r), k = Math[k >= 1 ? "floor" : "ceil"](k / r), m.settings.normalizeOffset && this.getBoundingClientRect) {
                var D = this.getBoundingClientRect();
                f = C.clientX - D.left, d = C.clientY - D.top
            }
            return C.deltaX = y, C.deltaY = k, C.deltaFactor = r, C.offsetX = f, C.offsetY = d, C.deltaMode = 0, A.unshift(C, z, y, k), s && clearTimeout(s), s = setTimeout(u, 200), (w.event.dispatch || w.event.handle).apply(this, A)
        }
    }

    function u() {
        r = null
    }

    function t(d, c) {
        return m.settings.adjustOldDeltas && "mousewheel" === d.type && c % 120 === 0
    }

    var s, r, q = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        p = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        o = Array.prototype.slice;
    if (w.event.fixHooks) {
        for (var n = q.length; n;) {
            w.event.fixHooks[q[--n]] = w.event.mouseHooks
        }
    }
    var m = w.event.special.mousewheel = {
        version: "3.1.12", setup: function () {
            if (this.addEventListener) {
                for (var a = p.length; a;) {
                    this.addEventListener(p[--a], v, !1)
                }
            } else {
                this.onmousewheel = v
            }
            w.data(this, "mousewheel-line-height", m.getLineHeight(this)), w.data(this, "mousewheel-page-height", m.getPageHeight(this))
        }, teardown: function () {
            if (this.removeEventListener) {
                for (var a = p.length; a;) {
                    this.removeEventListener(p[--a], v, !1)
                }
            } else {
                this.onmousewheel = null
            }
            w.removeData(this, "mousewheel-line-height"), w.removeData(this, "mousewheel-page-height")
        }, getLineHeight: function (a) {
            var g = w(a), f = g["offsetParent" in w.fn ? "offsetParent" : "parent"]();
            return f.length || (f = w("body")), parseInt(f.css("fontSize"), 10) || parseInt(g.css("fontSize"), 10) || 16
        }, getPageHeight: function (a) {
            return w(a).height()
        }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
    };
    w.fn.extend({
        mousewheel: function (b) {
            return b ? this.bind("mousewheel", b) : this.trigger("mousewheel")
        }, unmousewheel: function (b) {
            return this.unbind("mousewheel", b)
        }
    })
});
!function (a) {
    "undefined" != typeof module && module.exports ? module.exports = a : a(jQuery, window, document)
}(function (a) {
    !function (d) {
        var f = "function" == typeof define && define.amd, b = "undefined" != typeof module && module.exports,
            g = "https:" == document.location.protocol ? "https:" : "http:",
            c = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
        f || (b ? require("jquery-mousewheel")(a) : a.event.special.mousewheel || a("head").append(decodeURI("%3Cscript src=" + g + "//" + c + "%3E%3C/script%3E"))), d()
    }(function () {
        var aJ, aP = "mCustomScrollbar", a3 = "mCS", aQ = ".mCustomScrollbar", aV = {
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: !0,
                alwaysShowScrollbar: 0,
                snapOffset: 0,
                mouseWheel: {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    deltaFactor: "auto",
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                scrollButtons: {scrollType: "stepless", scrollAmount: "auto"},
                keyboard: {enable: !0, scrollType: "stepless", scrollAmount: "auto"},
                contentTouchScroll: 25,
                advanced: {
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: !0,
                    updateOnImageLoad: !0
                },
                theme: "light",
                callbacks: {onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0}
            }, aL = 0, aS = {}, aK = window.attachEvent && !window.addEventListener ? 1 : 0, a1 = !1,
            a0 = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
            aI = {
                init: function (b) {
                    var b = a.extend(!0, {}, aV, b), f = aZ.call(this);
                    if (b.live) {
                        var d = b.liveSelector || this.selector || aQ, g = a(d);
                        if ("off" === b.live) {
                            return void aR(d)
                        }
                        aS[d] = setTimeout(function () {
                            g.mCustomScrollbar(b), "once" === b.live && g.length && aR(d)
                        }, 500)
                    } else {
                        aR(d)
                    }
                    return b.setWidth = b.set_width ? b.set_width : b.setWidth, b.setHeight = b.set_height ? b.set_height : b.setHeight, b.axis = b.horizontalScroll ? "x" : aO(b.axis), b.scrollInertia = b.scrollInertia > 0 && b.scrollInertia < 17 ? 17 : b.scrollInertia, "object" != typeof b.mouseWheel && 1 == b.mouseWheel && (b.mouseWheel = {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        preventDefault: !1,
                        deltaFactor: "auto",
                        normalizeDelta: !1,
                        invert: !1
                    }), b.mouseWheel.scrollAmount = b.mouseWheelPixels ? b.mouseWheelPixels : b.mouseWheel.scrollAmount, b.mouseWheel.normalizeDelta = b.advanced.normalizeMouseWheelDelta ? b.advanced.normalizeMouseWheelDelta : b.mouseWheel.normalizeDelta, b.scrollButtons.scrollType = aX(b.scrollButtons.scrollType), aW(b), a(f).each(function () {
                        var m = a(this);
                        if (!m.data(a3)) {
                            m.data(a3, {
                                idx: ++aL,
                                opt: b,
                                scrollRatio: {y: null, x: null},
                                overflowed: null,
                                contentReset: {y: null, x: null},
                                bindEvents: !1,
                                tweenRunning: !1,
                                sequential: {},
                                langDir: m.css("direction"),
                                cbOffsets: null,
                                trigger: null
                            });
                            var q = m.data(a3), j = q.opt, h = m.data("mcs-axis"), k = m.data("mcs-scrollbar-position"),
                                p = m.data("mcs-theme");
                            h && (j.axis = h), k && (j.scrollbarPosition = k), p && (j.theme = p, aW(j)), aH.call(this), a("#mCSB_" + q.idx + "_container img:not(." + a0[2] + ")").addClass(a0[2]), aI.update.call(null, m)
                        }
                    })
                }, update: function (b, c) {
                    var d = b || aZ.call(this);
                    return a(d).each(function () {
                        var h = a(this);
                        if (h.data(a3)) {
                            var m = h.data(a3), g = m.opt, k = a("#mCSB_" + m.idx + "_container"),
                                f = [a("#mCSB_" + m.idx + "_dragger_vertical"), a("#mCSB_" + m.idx + "_dragger_horizontal")];
                            if (!k.length) {
                                return
                            }
                            m.tweenRunning && ae(h), h.hasClass(a0[3]) && h.removeClass(a0[3]), h.hasClass(a0[4]) && h.removeClass(a0[4]), ah.call(this), a4.call(this), "y" === g.axis || g.advanced.autoExpandHorizontalScroll || k.css("width", aF(k.children())), m.overflowed = az.call(this), al.call(this), g.autoDraggerLength && a2.call(this), ay.call(this), aT.call(this);
                            var j = [Math.abs(k[0].offsetTop), Math.abs(k[0].offsetLeft)];
                            "x" !== g.axis && (m.overflowed[0] ? f[0].height() > f[0].parent().height() ? ag.call(this) : (aj(h, j[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }), m.contentReset.y = null) : (ag.call(this), "y" === g.axis ? an.call(this) : "yx" === g.axis && m.overflowed[1] && aj(h, j[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }))), "y" !== g.axis && (m.overflowed[1] ? f[1].width() > f[1].parent().width() ? ag.call(this) : (aj(h, j[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }), m.contentReset.x = null) : (ag.call(this), "x" === g.axis ? an.call(this) : "yx" === g.axis && m.overflowed[0] && aj(h, j[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }))), c && m && (2 === c && g.callbacks.onImageLoad && "function" == typeof g.callbacks.onImageLoad ? g.callbacks.onImageLoad.call(this) : 3 === c && g.callbacks.onSelectorChange && "function" == typeof g.callbacks.onSelectorChange ? g.callbacks.onSelectorChange.call(this) : g.callbacks.onUpdate && "function" == typeof g.callbacks.onUpdate && g.callbacks.onUpdate.call(this)), ac.call(this)
                        }
                    })
                }, scrollTo: function (b, c) {
                    if ("undefined" != typeof b && null != b) {
                        var d = aZ.call(this);
                        return a(d).each(function () {
                            var o = a(this);
                            if (o.data(a3)) {
                                var g = o.data(a3), j = g.opt, f = {
                                        trigger: "external",
                                        scrollInertia: j.scrollInertia,
                                        scrollEasing: "mcsEaseInOut",
                                        moveDragger: !1,
                                        timeout: 60,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0
                                    }, h = a.extend(!0, {}, f, c), m = ab.call(this, b),
                                    k = h.scrollInertia > 0 && h.scrollInertia < 17 ? 17 : h.scrollInertia;
                                m[0] = aU.call(this, m[0], "y"), m[1] = aU.call(this, m[1], "x"), h.moveDragger && (m[0] *= g.scrollRatio.y, m[1] *= g.scrollRatio.x), h.dur = k, setTimeout(function () {
                                    null !== m[0] && "undefined" != typeof m[0] && "x" !== j.axis && g.overflowed[0] && (h.dir = "y", h.overwrite = "all", aj(o, m[0].toString(), h)), null !== m[1] && "undefined" != typeof m[1] && "y" !== j.axis && g.overflowed[1] && (h.dir = "x", h.overwrite = "none", aj(o, m[1].toString(), h))
                                }, h.timeout)
                            }
                        })
                    }
                }, stop: function () {
                    var b = aZ.call(this);
                    return a(b).each(function () {
                        var c = a(this);
                        c.data(a3) && ae(c)
                    })
                }, disable: function (b) {
                    var c = aZ.call(this);
                    return a(c).each(function () {
                        var d = a(this);
                        if (d.data(a3)) {
                            d.data(a3);
                            ac.call(this, "remove"), an.call(this), b && ag.call(this), al.call(this, !0), d.addClass(a0[3])
                        }
                    })
                }, destroy: function () {
                    var b = aZ.call(this);
                    return a(b).each(function () {
                        var k = a(this);
                        if (k.data(a3)) {
                            var f = k.data(a3), h = f.opt, d = a("#mCSB_" + f.idx),
                                g = a("#mCSB_" + f.idx + "_container"), j = a(".mCSB_" + f.idx + "_scrollbar");
                            h.live && aR(h.liveSelector || a(b).selector), ac.call(this, "remove"), an.call(this), ag.call(this), k.removeData(a3), aa(this, "mcs"), j.remove(), g.find("img." + a0[2]).removeClass(a0[2]), d.replaceWith(g.contents()), k.removeClass(aP + " _" + a3 + "_" + f.idx + " " + a0[6] + " " + a0[7] + " " + a0[5] + " " + a0[3]).addClass(a0[4])
                        }
                    })
                }
            }, aZ = function () {
                return "object" != typeof a(this) || a(this).length < 1 ? aQ : this
            }, aW = function (d) {
                var g = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                    b = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                    h = ["minimal", "minimal-dark"], c = ["minimal", "minimal-dark"], f = ["minimal", "minimal-dark"];
                d.autoDraggerLength = a.inArray(d.theme, g) > -1 ? !1 : d.autoDraggerLength, d.autoExpandScrollbar = a.inArray(d.theme, b) > -1 ? !1 : d.autoExpandScrollbar, d.scrollButtons.enable = a.inArray(d.theme, h) > -1 ? !1 : d.scrollButtons.enable, d.autoHideScrollbar = a.inArray(d.theme, c) > -1 ? !0 : d.autoHideScrollbar, d.scrollbarPosition = a.inArray(d.theme, f) > -1 ? "outside" : d.scrollbarPosition
            }, aR = function (b) {
                aS[b] && (clearTimeout(aS[b]), aa(aS, b))
            }, aO = function (b) {
                return "yx" === b || "xy" === b || "auto" === b ? "yx" : "x" === b || "horizontal" === b ? "x" : "y"
            }, aX = function (b) {
                return "stepped" === b || "pixels" === b || "step" === b || "click" === b ? "stepped" : "stepless"
            }, aH = function () {
                var B = a(this), j = B.data(a3), q = j.opt, b = q.autoExpandScrollbar ? " " + a0[1] + "_expand" : "",
                    o = ["<div id='mCSB_" + j.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + j.idx + "_scrollbar mCS-" + q.theme + " mCSB_scrollTools_vertical" + b + "'><div class='" + a0[12] + "'><div id='mCSB_" + j.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + j.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + j.idx + "_scrollbar mCS-" + q.theme + " mCSB_scrollTools_horizontal" + b + "'><div class='" + a0[12] + "'><div id='mCSB_" + j.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                    C = "yx" === q.axis ? "mCSB_vertical_horizontal" : "x" === q.axis ? "mCSB_horizontal" : "mCSB_vertical",
                    z = "yx" === q.axis ? o[0] + o[1] : "x" === q.axis ? o[1] : o[0],
                    A = "yx" === q.axis ? "<div id='mCSB_" + j.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                    y = q.autoHideScrollbar ? " " + a0[6] : "",
                    v = "x" !== q.axis && "rtl" === j.langDir ? " " + a0[7] : "";
                q.setWidth && B.css("width", q.setWidth), q.setHeight && B.css("height", q.setHeight), q.setLeft = "y" !== q.axis && "rtl" === j.langDir ? "989999px" : q.setLeft, B.addClass(aP + " _" + a3 + "_" + j.idx + y + v).wrapInner("<div id='mCSB_" + j.idx + "' class='mCustomScrollBox mCS-" + q.theme + " " + C + "'><div id='mCSB_" + j.idx + "_container' class='mCSB_container' style='position:relative; top:" + q.setTop + "; left:" + q.setLeft + ";' dir=" + j.langDir + " /></div>");
                var k = a("#mCSB_" + j.idx), d = a("#mCSB_" + j.idx + "_container");
                "y" === q.axis || q.advanced.autoExpandHorizontalScroll || d.css("width", aF(d.children())), "outside" === q.scrollbarPosition ? ("static" === B.css("position") && B.css("position", "relative"), B.css("overflow", "visible"), k.addClass("mCSB_outside").after(z)) : (k.addClass("mCSB_inside").append(z), d.wrap(A)), aG.call(this);
                var w = [a("#mCSB_" + j.idx + "_dragger_vertical"), a("#mCSB_" + j.idx + "_dragger_horizontal")];
                w[0].css("min-height", w[0].height()), w[1].css("min-width", w[1].width())
            }, aF = function (b) {
                return Math.max.apply(Math, b.map(function () {
                    return a(this).outerWidth(!0)
                }).get())
            }, a4 = function () {
                var c = a(this), d = c.data(a3), f = d.opt, b = a("#mCSB_" + d.idx + "_container");
                f.advanced.autoExpandHorizontalScroll && "y" !== f.axis && b.css({
                    position: "absolute",
                    width: "auto"
                }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                    width: Math.ceil(b[0].getBoundingClientRect().right + 0.4) - Math.floor(b[0].getBoundingClientRect().left),
                    position: "relative"
                }).unwrap()
            }, aG = function () {
                var d = a(this), h = d.data(a3), j = h.opt, c = a(".mCSB_" + h.idx + "_scrollbar:first"),
                    g = aY(j.scrollButtons.tabindex) ? "tabindex='" + j.scrollButtons.tabindex + "'" : "",
                    b = ["<a href='#' class='" + a0[13] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + a0[14] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + a0[15] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + a0[16] + "' oncontextmenu='return false;' " + g + " />"],
                    f = ["x" === j.axis ? b[2] : b[0], "x" === j.axis ? b[3] : b[1], b[2], b[3]];
                j.scrollButtons.enable && c.prepend(f[0]).append(f[1]).next(".mCSB_scrollTools").prepend(f[2]).append(f[3])
            }, ah = function () {
                var d = a(this), h = d.data(a3), j = a("#mCSB_" + h.idx), c = d.css("max-height") || "none",
                    g = -1 !== c.indexOf("%"), b = d.css("box-sizing");
                if ("none" !== c) {
                    var f = g ? d.parent().height() * parseInt(c) / 100 : parseInt(c);
                    "border-box" === b && (f -= d.innerHeight() - d.height() + (d.outerHeight() - d.innerHeight())), j.css("max-height", Math.round(f))
                }
            }, a2 = function () {
                var q = a(this), f = q.data(a3), g = a("#mCSB_" + f.idx), j = a("#mCSB_" + f.idx + "_container"),
                    b = [a("#mCSB_" + f.idx + "_dragger_vertical"), a("#mCSB_" + f.idx + "_dragger_horizontal")],
                    h = [g.height() / j.outerHeight(!1), g.width() / j.outerWidth(!1)],
                    m = [parseInt(b[0].css("min-height")), Math.round(h[0] * b[0].parent().height()), parseInt(b[1].css("min-width")), Math.round(h[1] * b[1].parent().width())],
                    k = aK && m[1] < m[0] ? m[0] : m[1], p = aK && m[3] < m[2] ? m[2] : m[3];
                b[0].css({
                    height: k,
                    "max-height": b[0].parent().height() - 10
                }).find(".mCSB_dragger_bar").css({"line-height": m[0] + "px"}), b[1].css({
                    width: p,
                    "max-width": b[1].parent().width() - 10
                })
            }, ay = function () {
                var d = a(this), h = d.data(a3), j = a("#mCSB_" + h.idx), c = a("#mCSB_" + h.idx + "_container"),
                    g = [a("#mCSB_" + h.idx + "_dragger_vertical"), a("#mCSB_" + h.idx + "_dragger_horizontal")],
                    b = [c.outerHeight(!1) - j.height(), c.outerWidth(!1) - j.width()],
                    f = [b[0] / (g[0].parent().height() - g[0].height()), b[1] / (g[1].parent().width() - g[1].width())];
                h.scrollRatio = {y: f[0], x: f[1]}
            }, aE = function (d, c, f) {
                var b = f ? a0[0] + "_expanded" : "", g = d.closest(".mCSB_scrollTools");
                "active" === c ? (d.toggleClass(a0[0] + " " + b), g.toggleClass(a0[1]), d[0]._draggable = d[0]._draggable ? 0 : 1) : d[0]._draggable || ("hide" === c ? (d.removeClass(a0[0]), g.removeClass(a0[1])) : (d.addClass(a0[0]), g.addClass(a0[1])))
            }, az = function () {
                var d = a(this), g = d.data(a3), h = a("#mCSB_" + g.idx), c = a("#mCSB_" + g.idx + "_container"),
                    f = null == g.overflowed ? c.height() : c.outerHeight(!1),
                    b = null == g.overflowed ? c.width() : c.outerWidth(!1);
                return [f > h.height(), b > h.width()]
            }, ag = function () {
                var d = a(this), h = d.data(a3), j = h.opt, c = a("#mCSB_" + h.idx), g = a("#mCSB_" + h.idx + "_container"),
                    b = [a("#mCSB_" + h.idx + "_dragger_vertical"), a("#mCSB_" + h.idx + "_dragger_horizontal")];
                if (ae(d), ("x" !== j.axis && !h.overflowed[0] || "y" === j.axis && h.overflowed[0]) && (b[0].add(g).css("top", 0), aj(d, "_resetY")), "y" !== j.axis && !h.overflowed[1] || "x" === j.axis && h.overflowed[1]) {
                    var f = dx = 0;
                    "rtl" === h.langDir && (f = c.width() - g.outerWidth(!1), dx = Math.abs(f / h.scrollRatio.x)), g.css("left", f), b[1].css("left", dx), aj(d, "_resetX")
                }
            }, aT = function () {
                function c() {
                    d = setTimeout(function () {
                        a.event.special.mousewheel ? (clearTimeout(d), ad.call(f[0])) : c()
                    }, 100)
                }

                var f = a(this), g = f.data(a3), b = g.opt;
                if (!g.bindEvents) {
                    if (ai.call(this), b.contentTouchScroll && aw.call(this), ax.call(this), b.mouseWheel.enable) {
                        var d;
                        c()
                    }
                    ak.call(this), at.call(this), b.advanced.autoScrollOnFocus && aD.call(this), b.scrollButtons.enable && af.call(this), b.keyboard.enable && aM.call(this), g.bindEvents = !0
                }
            }, an = function () {
                var d = a(this), h = d.data(a3), j = h.opt, c = a3 + "_" + h.idx, g = ".mCSB_" + h.idx + "_scrollbar",
                    b = a("#mCSB_" + h.idx + ",#mCSB_" + h.idx + "_container,#mCSB_" + h.idx + "_container_wrapper," + g + " ." + a0[12] + ",#mCSB_" + h.idx + "_dragger_vertical,#mCSB_" + h.idx + "_dragger_horizontal," + g + ">a"),
                    f = a("#mCSB_" + h.idx + "_container");
                j.advanced.releaseDraggableSelectors && b.add(a(j.advanced.releaseDraggableSelectors)), h.bindEvents && (a(document).unbind("." + c), b.each(function () {
                    a(this).unbind("." + c)
                }), clearTimeout(d[0]._focusTimeout), aa(d[0], "_focusTimeout"), clearTimeout(h.sequential.step), aa(h.sequential, "step"), clearTimeout(f[0].onCompleteTimeout), aa(f[0], "onCompleteTimeout"), h.bindEvents = !1)
            }, al = function (f) {
                var j = a(this), m = j.data(a3), d = m.opt, h = a("#mCSB_" + m.idx + "_container_wrapper"),
                    b = h.length ? h : a("#mCSB_" + m.idx + "_container"),
                    g = [a("#mCSB_" + m.idx + "_scrollbar_vertical"), a("#mCSB_" + m.idx + "_scrollbar_horizontal")],
                    k = [g[0].find(".mCSB_dragger"), g[1].find(".mCSB_dragger")];
                "x" !== d.axis && (m.overflowed[0] && !f ? (g[0].add(k[0]).add(g[0].children("a")).css("display", "block"), b.removeClass(a0[8] + " " + a0[10])) : (d.alwaysShowScrollbar ? (2 !== d.alwaysShowScrollbar && k[0].css("display", "none"), b.removeClass(a0[10])) : (g[0].css("display", "none"), b.addClass(a0[10])), b.addClass(a0[8]))), "y" !== d.axis && (m.overflowed[1] && !f ? (g[1].add(k[1]).add(g[1].children("a")).css("display", "block"), b.removeClass(a0[9] + " " + a0[11])) : (d.alwaysShowScrollbar ? (2 !== d.alwaysShowScrollbar && k[1].css("display", "none"), b.removeClass(a0[11])) : (g[1].css("display", "none"), b.addClass(a0[11])), b.addClass(a0[9]))), m.overflowed[0] || m.overflowed[1] ? j.removeClass(a0[5]) : j.addClass(a0[5])
            }, ar = function (d) {
                var c = d.type;
                switch (c) {
                    case"pointerdown":
                    case"MSPointerDown":
                    case"pointermove":
                    case"MSPointerMove":
                    case"pointerup":
                    case"MSPointerUp":
                        return d.target.ownerDocument !== document ? [d.originalEvent.screenY, d.originalEvent.screenX, !1] : [d.originalEvent.pageY, d.originalEvent.pageX, !1];
                    case"touchstart":
                    case"touchmove":
                    case"touchend":
                        var f = d.originalEvent.touches[0] || d.originalEvent.changedTouches[0],
                            b = d.originalEvent.touches.length || d.originalEvent.changedTouches.length;
                        return d.target.ownerDocument !== document ? [f.screenY, f.screenX, b > 1] : [f.pageY, f.pageX, b > 1];
                    default:
                        return [d.pageY, d.pageX, !1]
                }
            }, ai = function () {
                function C(f) {
                    var d = q.find("iframe");
                    if (d.length) {
                        var g = f ? "auto" : "none";
                        d.css("pointer-events", g)
                    }
                }

                function j(m, g, n, d) {
                    if (q[0].idleTimer = B.scrollInertia < 233 ? 250 : 0, k.attr("id") === w[1]) {
                        var f = "x", h = (k[0].offsetLeft - g + d) * A.scrollRatio.x
                    } else {
                        var f = "y", h = (k[0].offsetTop - m + n) * A.scrollRatio.y
                    }
                    aj(s, h.toString(), {dir: f, drag: !0})
                }

                var k, v, b, s = a(this), A = s.data(a3), B = A.opt, z = a3 + "_" + A.idx,
                    w = ["mCSB_" + A.idx + "_dragger_vertical", "mCSB_" + A.idx + "_dragger_horizontal"],
                    q = a("#mCSB_" + A.idx + "_container"), c = a("#" + w[0] + ",#" + w[1]),
                    y = B.advanced.releaseDraggableSelectors ? c.add(a(B.advanced.releaseDraggableSelectors)) : c;
                c.bind("mousedown." + z + " touchstart." + z + " pointerdown." + z + " MSPointerDown." + z, function (t) {
                    if (t.stopImmediatePropagation(), t.preventDefault(), aC(t)) {
                        a1 = !0, aK && (document.onselectstart = function () {
                            return !1
                        }), C(!1), ae(s), k = a(this);
                        var i = k.offset(), r = ar(t)[0] - i.top, p = ar(t)[1] - i.left, n = k.height() + i.top,
                            g = k.width() + i.left;
                        n > r && r > 0 && g > p && p > 0 && (v = r, b = p), aE(k, "active", B.autoExpandScrollbar)
                    }
                }).bind("touchmove." + z, function (h) {
                    h.stopImmediatePropagation(), h.preventDefault();
                    var g = k.offset(), f = ar(h)[0] - g.top, d = ar(h)[1] - g.left;
                    j(v, b, f, d)
                }), a(document).bind("mousemove." + z + " pointermove." + z + " MSPointerMove." + z, function (h) {
                    if (k) {
                        var g = k.offset(), f = ar(h)[0] - g.top, d = ar(h)[1] - g.left;
                        if (v === f) {
                            return
                        }
                        j(v, b, f, d)
                    }
                }).add(y).bind("mouseup." + z + " touchend." + z + " pointerup." + z + " MSPointerUp." + z, function () {
                    k && (aE(k, "active", B.autoExpandScrollbar), k = null), a1 = !1, aK && (document.onselectstart = null), C(!0)
                })
            }, aw = function () {
                function a8(b) {
                    if (!aN(b) || a1 || ar(b)[2]) {
                        return void (aJ = 0)
                    }
                    aJ = 1, q = 0, bi = 0;
                    var d = H.offset();
                    bh = ar(b)[0] - d.top, Q = ar(b)[1] - d.left, a6 = [ar(b)[0], ar(b)[1]]
                }

                function a9(p) {
                    if (aN(p) && !a1 && !ar(p)[2] && (p.stopImmediatePropagation(), !bi || q)) {
                        a7 = aq();
                        var u = bc.offset(), d = ar(p)[0] - u.top, s = ar(p)[1] - u.left, g = "mcsLinearOut";
                        if (t.push(d), U.push(s), a6[2] = Math.abs(ar(p)[0] - a6[0]), a6[3] = Math.abs(ar(p)[1] - a6[1]), J.overflowed[0]) {
                            var k = G[0].parent().height() - G[0].height(),
                                b = bh - d > 0 && d - bh > -(k * J.scrollRatio.y) && (2 * a6[3] < a6[2] || "yx" === a5.axis)
                        }
                        if (J.overflowed[1]) {
                            var h = G[1].parent().width() - G[1].width(),
                                m = Q - s > 0 && s - Q > -(h * J.scrollRatio.x) && (2 * a6[2] < a6[3] || "yx" === a5.axis)
                        }
                        b || m ? (p.preventDefault(), q = 1) : bi = 1, bj = "yx" === a5.axis ? [bh - d, Q - s] : "x" === a5.axis ? [null, Q - s] : [bh - d, null], H[0].idleTimer = 250, J.overflowed[0] && X(bj[0], V, g, "y", "all", !0), J.overflowed[1] && X(bj[1], V, g, "x", c, !0)
                    }
                }

                function bd(b) {
                    if (!aN(b) || a1 || ar(b)[2]) {
                        return void (aJ = 0)
                    }
                    aJ = 1, b.stopImmediatePropagation(), ae(Y), ba = aq();
                    var d = bc.offset();
                    bg = ar(b)[0] - d.top, be = ar(b)[1] - d.left, t = [], U = []
                }

                function Z(m) {
                    if (aN(m) && !a1 && !ar(m)[2]) {
                        m.stopImmediatePropagation(), q = 0, bi = 0, bf = aq();
                        var w = bc.offset(), g = ar(m)[0] - w.top, s = ar(m)[1] - w.left;
                        if (!(bf - a7 > 30)) {
                            K = 1000 / (bf - ba);
                            var h = "mcsEaseOut", k = 2.5 > K, b = k ? [t[t.length - 2], U[U.length - 2]] : [0, 0];
                            N = k ? [g - b[0], s - b[1]] : [g - bg, s - be];
                            var p = [Math.abs(N[0]), Math.abs(N[1])];
                            K = k ? [Math.abs(N[0] / 4), Math.abs(N[1] / 4)] : [K, K];
                            var v = [Math.abs(H[0].offsetTop) - N[0] * bb(p[0] / K[0], K[0]), Math.abs(H[0].offsetLeft) - N[1] * bb(p[1] / K[1], K[1])];
                            bj = "yx" === a5.axis ? [v[0], v[1]] : "x" === a5.axis ? [null, v[1]] : [v[0], null], L = [4 * p[0] + a5.scrollInertia, 4 * p[1] + a5.scrollInertia];
                            var f = parseInt(a5.contentTouchScroll) || 0;
                            bj[0] = p[0] > f ? bj[0] : 0, bj[1] = p[1] > f ? bj[1] : 0, J.overflowed[0] && X(bj[0], L[0], h, "y", c, !1), J.overflowed[1] && X(bj[1], L[1], h, "x", c, !1)
                        }
                    }
                }

                function bb(d, b) {
                    var f = [1.5 * b, 2 * b, b / 1.5, b / 2];
                    return d > 90 ? b > 4 ? f[0] : f[3] : d > 60 ? b > 3 ? f[3] : f[2] : d > 30 ? b > 8 ? f[1] : b > 6 ? f[0] : b > 4 ? b : f[2] : b > 8 ? b : f[3]
                }

                function X(g, f, h, b, k, d) {
                    g && aj(Y, g.toString(), {dur: f, scrollEasing: h, dir: b, overwrite: k, drag: d})
                }

                var bh, Q, bg, be, ba, a7, bf, N, K, bj, L, q, bi, Y = a(this), J = Y.data(a3), a5 = J.opt,
                    j = a3 + "_" + J.idx, bc = a("#mCSB_" + J.idx), H = a("#mCSB_" + J.idx + "_container"),
                    G = [a("#mCSB_" + J.idx + "_dragger_vertical"), a("#mCSB_" + J.idx + "_dragger_horizontal")], t = [],
                    U = [], V = 0, c = "yx" === a5.axis ? "none" : "all", a6 = [], F = H.find("iframe"),
                    I = ["touchstart." + j + " pointerdown." + j + " MSPointerDown." + j, "touchmove." + j + " pointermove." + j + " MSPointerMove." + j, "touchend." + j + " pointerup." + j + " MSPointerUp." + j];
                H.bind(I[0], function (b) {
                    a8(b)
                }).bind(I[1], function (b) {
                    a9(b)
                }), bc.bind(I[0], function (b) {
                    bd(b)
                }).bind(I[2], function (b) {
                    Z(b)
                }), F.length && F.each(function () {
                    a(this).load(function () {
                        ao(this) && a(this.contentDocument || this.contentWindow.document).bind(I[0], function (b) {
                            a8(b), bd(b)
                        }).bind(I[1], function (b) {
                            a9(b)
                        }).bind(I[2], function (b) {
                            Z(b)
                        })
                    })
                })
            }, ax = function () {
                function c() {
                    return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
                }

                function g(f, d, h) {
                    q.type = h && k ? "stepped" : "stepless", q.scrollAmount = 10, av(b, f, d, "mcsLinearOut", h ? 60 : null)
                }

                var k, b = a(this), j = b.data(a3), v = j.opt, q = j.sequential, t = a3 + "_" + j.idx,
                    p = a("#mCSB_" + j.idx + "_container"), m = p.parent();
                p.bind("mousedown." + t, function () {
                    aJ || k || (k = 1, a1 = !0)
                }).add(document).bind("mousemove." + t, function (h) {
                    if (!aJ && k && c()) {
                        var d = p.offset(), f = ar(h)[0] - d.top + p[0].offsetTop, i = ar(h)[1] - d.left + p[0].offsetLeft;
                        f > 0 && f < m.height() && i > 0 && i < m.width() ? q.step && g("off", null, "stepped") : ("x" !== v.axis && j.overflowed[0] && (0 > f ? g("on", 38) : f > m.height() && g("on", 40)), "y" !== v.axis && j.overflowed[1] && (0 > i ? g("on", 37) : i > m.width() && g("on", 39)))
                    }
                }).bind("mouseup." + t, function () {
                    aJ || (k && (k = 0, g("off", null)), a1 = !1)
                })
            }, ad = function () {
                function g(z, w) {
                    if (ae(k), !aA(k, z.target)) {
                        var c = "auto" !== f.mouseWheel.deltaFactor ? parseInt(f.mouseWheel.deltaFactor) : aK && z.deltaFactor < 100 ? 100 : z.deltaFactor || 100;
                        if ("x" === f.axis || "x" === f.mouseWheel.axis) {
                            var v = "x", y = [Math.round(c * p.scrollRatio.x), parseInt(f.mouseWheel.scrollAmount)],
                                s = "auto" !== f.mouseWheel.scrollAmount ? y[1] : y[0] >= b.width() ? 0.9 * b.width() : y[0],
                                o = Math.abs(a("#mCSB_" + p.idx + "_container")[0].offsetLeft), n = m[1][0].offsetLeft,
                                i = m[1].parent().width() - m[1].width(), q = z.deltaX || z.deltaY || w
                        } else {
                            var v = "y", y = [Math.round(c * p.scrollRatio.y), parseInt(f.mouseWheel.scrollAmount)],
                                s = "auto" !== f.mouseWheel.scrollAmount ? y[1] : y[0] >= b.height() ? 0.9 * b.height() : y[0],
                                o = Math.abs(a("#mCSB_" + p.idx + "_container")[0].offsetTop), n = m[0][0].offsetTop,
                                i = m[0].parent().height() - m[0].height(), q = z.deltaY || w
                        }
                        "y" === v && !p.overflowed[0] || "x" === v && !p.overflowed[1] || (f.mouseWheel.invert && (q = -q), f.mouseWheel.normalizeDelta && (q = 0 > q ? -1 : 1), (q > 0 && 0 !== n || 0 > q && n !== i || f.mouseWheel.preventDefault) && (z.stopImmediatePropagation(), z.preventDefault()), aj(k, (o - q * s).toString(), {dir: v}))
                    }
                }

                var k = a(this), p = k.data(a3), f = p.opt, h = a3 + "_" + p.idx, b = a("#mCSB_" + p.idx),
                    m = [a("#mCSB_" + p.idx + "_dragger_vertical"), a("#mCSB_" + p.idx + "_dragger_horizontal")],
                    j = a("#mCSB_" + p.idx + "_container").find("iframe");
                p && (j.length && j.each(function () {
                    a(this).load(function () {
                        ao(this) && a(this.contentDocument || this.contentWindow.document).bind("mousewheel." + h, function (c, d) {
                            g(c, d)
                        })
                    })
                }), b.bind("mousewheel." + h, function (c, d) {
                    g(c, d)
                }))
            }, ao = function (d) {
                var c = null;
                try {
                    var f = d.contentDocument || d.contentWindow.document;
                    c = f.body.innerHTML
                } catch (b) {
                }
                return null !== c
            }, aA = function (c, f) {
                var g = f.nodeName.toLowerCase(), b = c.data(a3).opt.mouseWheel.disableOver, d = ["select", "textarea"];
                return a.inArray(g, b) > -1 && !(a.inArray(g, d) > -1 && !a(f).is(":focus"))
            }, ak = function () {
                var d = a(this), g = d.data(a3), h = a3 + "_" + g.idx, c = a("#mCSB_" + g.idx + "_container"),
                    f = c.parent(), b = a(".mCSB_" + g.idx + "_scrollbar ." + a0[12]);
                b.bind("touchstart." + h + " pointerdown." + h + " MSPointerDown." + h, function () {
                    a1 = !0
                }).bind("touchend." + h + " pointerup." + h + " MSPointerUp." + h, function () {
                    a1 = !1
                }).bind("click." + h, function (j) {
                    if (a(j.target).hasClass(a0[12]) || a(j.target).hasClass("mCSB_draggerRail")) {
                        ae(d);
                        var p = a(this), i = p.find(".mCSB_dragger");
                        if (p.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!g.overflowed[1]) {
                                return
                            }
                            var m = "x", o = j.pageX > i.offset().left ? -1 : 1,
                                k = Math.abs(c[0].offsetLeft) - 0.9 * o * f.width()
                        } else {
                            if (!g.overflowed[0]) {
                                return
                            }
                            var m = "y", o = j.pageY > i.offset().top ? -1 : 1,
                                k = Math.abs(c[0].offsetTop) - 0.9 * o * f.height()
                        }
                        aj(d, k.toString(), {dir: m, scrollEasing: "mcsEaseInOut"})
                    }
                })
            }, aD = function () {
                var d = a(this), g = d.data(a3), h = g.opt, c = a3 + "_" + g.idx, f = a("#mCSB_" + g.idx + "_container"),
                    b = f.parent();
                f.bind("focusin." + c, function () {
                    var m = a(document.activeElement), j = f.find(".mCustomScrollBox").length, k = 0;
                    m.is(h.advanced.autoScrollOnFocus) && (ae(d), clearTimeout(d[0]._focusTimeout), d[0]._focusTimer = j ? (k + 17) * j : 0, d[0]._focusTimeout = setTimeout(function () {
                        var o = [aB(m)[0], aB(m)[1]], i = [f[0].offsetTop, f[0].offsetLeft],
                            n = [i[0] + o[0] >= 0 && i[0] + o[0] < b.height() - m.outerHeight(!1), i[1] + o[1] >= 0 && i[0] + o[1] < b.width() - m.outerWidth(!1)],
                            p = "yx" !== h.axis || n[0] || n[1] ? "all" : "none";
                        "x" === h.axis || n[0] || aj(d, o[0].toString(), {
                            dir: "y",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: p,
                            dur: k
                        }), "y" === h.axis || n[1] || aj(d, o[1].toString(), {
                            dir: "x",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: p,
                            dur: k
                        })
                    }, d[0]._focusTimer))
                })
            }, at = function () {
                var c = a(this), d = c.data(a3), f = a3 + "_" + d.idx, b = a("#mCSB_" + d.idx + "_container").parent();
                b.bind("scroll." + f, function () {
                    (0 !== b.scrollTop() || 0 !== b.scrollLeft()) && a(".mCSB_" + d.idx + "_scrollbar").css("visibility", "hidden")
                })
            }, af = function () {
                var d = a(this), h = d.data(a3), j = h.opt, c = h.sequential, g = a3 + "_" + h.idx,
                    b = ".mCSB_" + h.idx + "_scrollbar", f = a(b + ">a");
                f.bind("mousedown." + g + " touchstart." + g + " pointerdown." + g + " MSPointerDown." + g + " mouseup." + g + " touchend." + g + " pointerup." + g + " MSPointerUp." + g + " mouseout." + g + " pointerout." + g + " MSPointerOut." + g + " click." + g, function (k) {
                    function m(n, p) {
                        c.scrollAmount = j.snapAmount || j.scrollButtons.scrollAmount, av(d, n, p)
                    }

                    if (k.preventDefault(), aC(k)) {
                        var i = a(this).attr("class");
                        switch (c.type = j.scrollButtons.scrollType, k.type) {
                            case"mousedown":
                            case"touchstart":
                            case"pointerdown":
                            case"MSPointerDown":
                                if ("stepped" === c.type) {
                                    return
                                }
                                a1 = !0, h.tweenRunning = !1, m("on", i);
                                break;
                            case"mouseup":
                            case"touchend":
                            case"pointerup":
                            case"MSPointerUp":
                            case"mouseout":
                            case"pointerout":
                            case"MSPointerOut":
                                if ("stepped" === c.type) {
                                    return
                                }
                                a1 = !1, c.dir && m("off", i);
                                break;
                            case"click":
                                if ("stepped" !== c.type || h.tweenRunning) {
                                    return
                                }
                                m("on", i)
                        }
                    }
                })
            }, aM = function () {
                function z(n) {
                    function i(h, f) {
                        b.type = m.keyboard.scrollType, b.scrollAmount = m.snapAmount || m.keyboard.scrollAmount, "stepped" === b.type && j.tweenRunning || av(g, h, f)
                    }

                    switch (n.type) {
                        case"blur":
                            j.tweenRunning && b.dir && i("off", null);
                            break;
                        case"keydown":
                        case"keyup":
                            var d = n.keyCode ? n.keyCode : n.which, r = "on";
                            if ("x" !== m.axis && (38 === d || 40 === d) || "y" !== m.axis && (37 === d || 39 === d)) {
                                if ((38 === d || 40 === d) && !j.overflowed[0] || (37 === d || 39 === d) && !j.overflowed[1]) {
                                    return
                                }
                                "keyup" === n.type && (r = "off"), a(document.activeElement).is(y) || (n.preventDefault(), n.stopImmediatePropagation(), i(r, d))
                            } else {
                                if (33 === d || 34 === d) {
                                    if ((j.overflowed[0] || j.overflowed[1]) && (n.preventDefault(), n.stopImmediatePropagation()), "keyup" === n.type) {
                                        ae(g);
                                        var u = 34 === d ? -1 : 1;
                                        if ("x" === m.axis || "yx" === m.axis && j.overflowed[1] && !j.overflowed[0]) {
                                            var o = "x", c = Math.abs(w[0].offsetLeft) - 0.9 * u * v.width()
                                        } else {
                                            var o = "y", c = Math.abs(w[0].offsetTop) - 0.9 * u * v.height()
                                        }
                                        aj(g, c.toString(), {dir: o, scrollEasing: "mcsEaseInOut"})
                                    }
                                } else {
                                    if ((35 === d || 36 === d) && !a(document.activeElement).is(y) && ((j.overflowed[0] || j.overflowed[1]) && (n.preventDefault(), n.stopImmediatePropagation()), "keyup" === n.type)) {
                                        if ("x" === m.axis || "yx" === m.axis && j.overflowed[1] && !j.overflowed[0]) {
                                            var o = "x", c = 35 === d ? Math.abs(v.width() - w.outerWidth(!1)) : 0
                                        } else {
                                            var o = "y", c = 35 === d ? Math.abs(v.height() - w.outerHeight(!1)) : 0
                                        }
                                        aj(g, c.toString(), {dir: o, scrollEasing: "mcsEaseInOut"})
                                    }
                                }
                            }
                    }
                }

                var g = a(this), j = g.data(a3), m = j.opt, b = j.sequential, k = a3 + "_" + j.idx, A = a("#mCSB_" + j.idx),
                    w = a("#mCSB_" + j.idx + "_container"), v = w.parent(),
                    y = "input,textarea,select,datalist,keygen,[contenteditable='true']", q = w.find("iframe"),
                    p = ["blur." + k + " keydown." + k + " keyup." + k];
                q.length && q.each(function () {
                    a(this).load(function () {
                        ao(this) && a(this.contentDocument || this.contentWindow.document).bind(p[0], function (c) {
                            z(c)
                        })
                    })
                }), A.attr("tabindex", "0").bind(p[0], function (c) {
                    z(c)
                })
            }, av = function (D, j, k, w, b) {
                function v(h) {
                    var c = "stepped" !== A.type, r = b ? b : h ? c ? d / 1.5 : z : 1000 / 60, f = h ? c ? 7.5 : 40 : 2.5,
                        H = [Math.abs(y[0].offsetTop), Math.abs(y[0].offsetLeft)],
                        i = [B.scrollRatio.y > 10 ? 10 : B.scrollRatio.y, B.scrollRatio.x > 10 ? 10 : B.scrollRatio.x],
                        G = "x" === A.dir[0] ? H[1] + A.dir[1] * i[1] * f : H[0] + A.dir[1] * i[0] * f,
                        g = "x" === A.dir[0] ? H[1] + A.dir[1] * parseInt(A.scrollAmount) : H[0] + A.dir[1] * parseInt(A.scrollAmount),
                        F = "auto" !== A.scrollAmount ? g : G,
                        p = w ? w : h ? c ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear", t = h ? !0 : !1;
                    return h && 17 > r && (F = "x" === A.dir[0] ? H[1] : H[0]), aj(D, F.toString(), {
                        dir: A.dir[0],
                        scrollEasing: p,
                        dur: r,
                        onComplete: t
                    }), h ? void (A.dir = !1) : (clearTimeout(A.step), void (A.step = setTimeout(function () {
                        v()
                    }, r)))
                }

                function E() {
                    clearTimeout(A.step), aa(A, "step"), ae(D)
                }

                var B = D.data(a3), C = B.opt, A = B.sequential, y = a("#mCSB_" + B.idx + "_container"),
                    q = "stepped" === A.type ? !0 : !1, d = C.scrollInertia < 26 ? 26 : C.scrollInertia,
                    z = C.scrollInertia < 1 ? 17 : C.scrollInertia;
                switch (j) {
                    case"on":
                        if (A.dir = [k === a0[16] || k === a0[15] || 39 === k || 37 === k ? "x" : "y", k === a0[13] || k === a0[15] || 38 === k || 37 === k ? -1 : 1], ae(D), aY(k) && "stepped" === A.type) {
                            return
                        }
                        v(q);
                        break;
                    case"off":
                        E(), (q || B.tweenRunning && A.dir) && v(!0)
                }
            }, ab = function (b) {
                var c = a(this).data(a3).opt, d = [];
                return "function" == typeof b && (b = b()), b instanceof Array ? d = b.length > 1 ? [b[0], b[1]] : "x" === c.axis ? [null, b[0]] : [b[0], null] : (d[0] = b.y ? b.y : b.x || "x" === c.axis ? null : b, d[1] = b.x ? b.x : b.y || "y" === c.axis ? null : b), "function" == typeof d[0] && (d[0] = d[0]()), "function" == typeof d[1] && (d[1] = d[1]()), d
            }, aU = function (B, j) {
                if (null != B && "undefined" != typeof B) {
                    var k = a(this), v = k.data(a3), b = v.opt, u = a("#mCSB_" + v.idx + "_container"), C = u.parent(),
                        A = typeof B;
                    j || (j = "x" === b.axis ? "x" : "y");
                    var z = "x" === j ? u.outerWidth(!1) : u.outerHeight(!1),
                        y = "x" === j ? u[0].offsetLeft : u[0].offsetTop, w = "x" === j ? "left" : "top";
                    switch (A) {
                        case"function":
                            return B();
                        case"object":
                            var q = B.jquery ? B : a(B);
                            if (!q.length) {
                                return
                            }
                            return "x" === j ? aB(q)[1] : aB(q)[0];
                        case"string":
                        case"number":
                            if (aY(B)) {
                                return Math.abs(B)
                            }
                            if (-1 !== B.indexOf("%")) {
                                return Math.abs(z * parseInt(B) / 100)
                            }
                            if (-1 !== B.indexOf("-=")) {
                                return Math.abs(y - parseInt(B.split("-=")[1]))
                            }
                            if (-1 !== B.indexOf("+=")) {
                                var g = y + parseInt(B.split("+=")[1]);
                                return g >= 0 ? 0 : Math.abs(g)
                            }
                            if (-1 !== B.indexOf("px") && aY(B.split("px")[0])) {
                                return Math.abs(B.split("px")[0])
                            }
                            if ("top" === B || "left" === B) {
                                return 0
                            }
                            if ("bottom" === B) {
                                return Math.abs(C.height() - u.outerHeight(!1))
                            }
                            if ("right" === B) {
                                return Math.abs(C.width() - u.outerWidth(!1))
                            }
                            if ("first" === B || "last" === B) {
                                var q = u.find(":" + B);
                                return "x" === j ? aB(q)[1] : aB(q)[0]
                            }
                            return a(B).length ? "x" === j ? aB(a(B))[1] : aB(a(B))[0] : (u.css(w, B), void aI.update.call(null, k[0]))
                    }
                }
            }, ac = function (u) {
                function B() {
                    clearTimeout(G[0].autoUpdate), G[0].autoUpdate = setTimeout(function () {
                        return I.advanced.updateOnSelectorChange && (D = z(), D !== k) ? (E(3), void (k = D)) : (I.advanced.updateOnContentResize && (A = [G.outerHeight(!1), G.outerWidth(!1), q.height(), q.width(), L()[0], L()[1]], (A[0] !== d[0] || A[1] !== d[1] || A[2] !== d[2] || A[3] !== d[3] || A[4] !== d[4] || A[5] !== d[5]) && (E(A[0] !== d[0] || A[1] !== d[1]), d = A)), I.advanced.updateOnImageLoad && (H = C(), H !== K && (G.find("img").each(function () {
                            F(this)
                        }), K = H)), void ((I.advanced.updateOnSelectorChange || I.advanced.updateOnContentResize || I.advanced.updateOnImageLoad) && B()))
                    }, 60)
                }

                function C() {
                    var b = 0;
                    return I.advanced.updateOnImageLoad && (b = G.find("img").length), b
                }

                function F(c) {
                    function f(i, h) {
                        return function () {
                            return h.apply(i, arguments)
                        }
                    }

                    function b() {
                        this.onload = null, a(c).addClass(a0[2]), E(2)
                    }

                    if (a(c).hasClass(a0[2])) {
                        return void E()
                    }
                    var g = new Image;
                    g.onload = f(g, b), g.src = c.src
                }

                function z() {
                    I.advanced.updateOnSelectorChange === !0 && (I.advanced.updateOnSelectorChange = "*");
                    var b = 0, c = G.find(I.advanced.updateOnSelectorChange);
                    return I.advanced.updateOnSelectorChange && c.length > 0 && c.each(function () {
                        b += a(this).height() + a(this).width()
                    }), b
                }

                function E(b) {
                    clearTimeout(G[0].autoUpdate), aI.update.call(null, y[0], b)
                }

                var y = a(this), J = y.data(a3), I = J.opt, G = a("#mCSB_" + J.idx + "_container");
                if (u) {
                    return clearTimeout(G[0].autoUpdate), void aa(G[0], "autoUpdate")
                }
                var D, A, H, q = G.parent(),
                    j = [a("#mCSB_" + J.idx + "_scrollbar_vertical"), a("#mCSB_" + J.idx + "_scrollbar_horizontal")],
                    L = function () {
                        return [j[0].is(":visible") ? j[0].outerHeight(!0) : 0, j[1].is(":visible") ? j[1].outerWidth(!0) : 0]
                    }, k = z(), d = [G.outerHeight(!1), G.outerWidth(!1), q.height(), q.width(), L()[0], L()[1]], K = C();
                B()
            }, am = function (c, b, d) {
                return Math.round(c / b) * b - d
            }, ae = function (b) {
                var c = b.data(a3),
                    d = a("#mCSB_" + c.idx + "_container,#mCSB_" + c.idx + "_container_wrapper,#mCSB_" + c.idx + "_dragger_vertical,#mCSB_" + c.idx + "_dragger_horizontal");
                d.each(function () {
                    ap.call(this)
                })
            }, aj = function (D, J, K) {
                function N(b) {
                    return E && U.callbacks[b] && "function" == typeof U.callbacks[b]
                }

                function G() {
                    return [U.callbacks.alwaysTriggerOffsets || W >= y[0] + V, U.callbacks.alwaysTriggerOffsets || -F >= W]
                }

                function M() {
                    var d = [O[0].offsetTop, O[0].offsetLeft], f = [z[0].offsetTop, z[0].offsetLeft],
                        b = [O.outerHeight(!1), O.outerWidth(!1)], c = [Q.height(), Q.width()];
                    D[0].mcs = {
                        content: O,
                        top: d[0],
                        left: d[1],
                        draggerTop: f[0],
                        draggerLeft: f[1],
                        topPct: Math.round(100 * Math.abs(d[0]) / (Math.abs(b[0]) - c[0])),
                        leftPct: Math.round(100 * Math.abs(d[1]) / (Math.abs(b[1]) - c[1])),
                        direction: K.dir
                    }
                }

                var E = D.data(a3), U = E.opt, R = {
                        trigger: "internal",
                        dir: "y",
                        scrollEasing: "mcsEaseOut",
                        drag: !1,
                        dur: U.scrollInertia,
                        overwrite: "all",
                        callbacks: !0,
                        onStart: !0,
                        onUpdate: !0,
                        onComplete: !0
                    }, K = a.extend(R, K), A = [K.dur, K.drag ? 0 : K.dur], Q = a("#mCSB_" + E.idx),
                    O = a("#mCSB_" + E.idx + "_container"), L = O.parent(),
                    I = U.callbacks.onTotalScrollOffset ? ab.call(D, U.callbacks.onTotalScrollOffset) : [0, 0],
                    P = U.callbacks.onTotalScrollBackOffset ? ab.call(D, U.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (E.trigger = K.trigger, (0 !== L.scrollTop() || 0 !== L.scrollLeft()) && (a(".mCSB_" + E.idx + "_scrollbar").css("visibility", "visible"), L.scrollTop(0).scrollLeft(0)), "_resetY" !== J || E.contentReset.y || (N("onOverflowYNone") && U.callbacks.onOverflowYNone.call(D[0]), E.contentReset.y = 1), "_resetX" !== J || E.contentReset.x || (N("onOverflowXNone") && U.callbacks.onOverflowXNone.call(D[0]), E.contentReset.x = 1), "_resetY" !== J && "_resetX" !== J) {
                    switch (!E.contentReset.y && D[0].mcs || !E.overflowed[0] || (N("onOverflowY") && U.callbacks.onOverflowY.call(D[0]), E.contentReset.x = null), !E.contentReset.x && D[0].mcs || !E.overflowed[1] || (N("onOverflowX") && U.callbacks.onOverflowX.call(D[0]), E.contentReset.x = null), U.snapAmount && (J = am(J, U.snapAmount, U.snapOffset)), K.dir) {
                        case"x":
                            var z = a("#mCSB_" + E.idx + "_dragger_horizontal"), q = "left", W = O[0].offsetLeft,
                                y = [Q.width() - O.outerWidth(!1), z.parent().width() - z.width()],
                                k = [J, 0 === J ? 0 : J / E.scrollRatio.x], V = I[1], F = P[1],
                                H = V > 0 ? V / E.scrollRatio.x : 0, j = F > 0 ? F / E.scrollRatio.x : 0;
                            break;
                        case"y":
                            var z = a("#mCSB_" + E.idx + "_dragger_vertical"), q = "top", W = O[0].offsetTop,
                                y = [Q.height() - O.outerHeight(!1), z.parent().height() - z.height()],
                                k = [J, 0 === J ? 0 : J / E.scrollRatio.y], V = I[0], F = P[0],
                                H = V > 0 ? V / E.scrollRatio.y : 0, j = F > 0 ? F / E.scrollRatio.y : 0
                    }
                    k[1] < 0 || 0 === k[0] && 0 === k[1] ? k = [0, 0] : k[1] >= y[1] ? k = [y[0], y[1]] : k[0] = -k[0], D[0].mcs || (M(), N("onInit") && U.callbacks.onInit.call(D[0])), clearTimeout(O[0].onCompleteTimeout), (E.tweenRunning || !(0 === W && k[0] >= 0 || W === y[0] && k[0] <= y[0])) && (au(z[0], q, Math.round(k[1]), A[1], K.scrollEasing), au(O[0], q, Math.round(k[0]), A[0], K.scrollEasing, K.overwrite, {
                        onStart: function () {
                            K.callbacks && K.onStart && !E.tweenRunning && (N("onScrollStart") && (M(), U.callbacks.onScrollStart.call(D[0])), E.tweenRunning = !0, aE(z), E.cbOffsets = G())
                        }, onUpdate: function () {
                            K.callbacks && K.onUpdate && N("whileScrolling") && (M(), U.callbacks.whileScrolling.call(D[0]))
                        }, onComplete: function () {
                            if (K.callbacks && K.onComplete) {
                                "yx" === U.axis && clearTimeout(O[0].onCompleteTimeout);
                                var b = O[0].idleTimer || 0;
                                O[0].onCompleteTimeout = setTimeout(function () {
                                    N("onScroll") && (M(), U.callbacks.onScroll.call(D[0])), N("onTotalScroll") && k[1] >= y[1] - H && E.cbOffsets[0] && (M(), U.callbacks.onTotalScroll.call(D[0])), N("onTotalScrollBack") && k[1] <= j && E.cbOffsets[1] && (M(), U.callbacks.onTotalScrollBack.call(D[0])), E.tweenRunning = !1, O[0].idleTimer = 0, aE(z, "hide")
                                }, b)
                            }
                        }
                    }))
                }
            }, au = function (M, A, E, Q, F, I, C) {
                function H() {
                    j.stop || (k || G.call(), k = aq() - y, B(), k >= j.time && (j.time = k > j.time ? k + L - (k - j.time) : k + L - 1, j.time < k + 1 && (j.time = k + 1)), j.time < Q ? j.id = J(H) : K.call())
                }

                function B() {
                    Q > 0 ? (j.currVal = z(j.time, R, P, Q, F), q[A] = Math.round(j.currVal) + "px") : q[A] = E + "px", D.call()
                }

                function O() {
                    L = 1000 / 60, j.time = k + L, J = window.requestAnimationFrame ? window.requestAnimationFrame : function (b) {
                        return B(), setTimeout(b, 0.01)
                    }, j.id = J(H)
                }

                function N() {
                    null != j.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(j.id) : clearTimeout(j.id), j.id = null)
                }

                function z(g, d, h, b, m) {
                    switch (m) {
                        case"linear":
                        case"mcsLinear":
                            return h * g / b + d;
                        case"mcsLinearOut":
                            return g /= b, g--, h * Math.sqrt(1 - g * g) + d;
                        case"easeInOutSmooth":
                            return g /= b / 2, 1 > g ? h / 2 * g * g + d : (g--, -h / 2 * (g * (g - 2) - 1) + d);
                        case"easeInOutStrong":
                            return g /= b / 2, 1 > g ? h / 2 * Math.pow(2, 10 * (g - 1)) + d : (g--, h / 2 * (-Math.pow(2, -10 * g) + 2) + d);
                        case"easeInOut":
                        case"mcsEaseInOut":
                            return g /= b / 2, 1 > g ? h / 2 * g * g * g + d : (g -= 2, h / 2 * (g * g * g + 2) + d);
                        case"easeOutSmooth":
                            return g /= b, g--, -h * (g * g * g * g - 1) + d;
                        case"easeOutStrong":
                            return h * (-Math.pow(2, -10 * g / b) + 1) + d;
                        case"easeOut":
                        case"mcsEaseOut":
                        default:
                            var c = (g /= b) * g, f = c * g;
                            return d + h * (0.499999999999997 * f * c + -2.5 * c * c + 5.5 * f + -6.5 * c + 4 * g)
                    }
                }

                M._mTween || (M._mTween = {top: {}, left: {}});
                var L, J, C = C || {}, G = C.onStart || function () {
                }, D = C.onUpdate || function () {
                }, K = C.onComplete || function () {
                }, y = aq(), k = 0, R = M.offsetTop, q = M.style, j = M._mTween[A];
                "left" === A && (R = M.offsetLeft);
                var P = E - R;
                j.stop = 0, "none" !== I && N(), O()
            }, aq = function () {
                return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            }, ap = function () {
                var d = this;
                d._mTween || (d._mTween = {top: {}, left: {}});
                for (var c = ["top", "left"], f = 0; f < c.length; f++) {
                    var b = c[f];
                    d._mTween[b].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(d._mTween[b].id) : clearTimeout(d._mTween[b].id), d._mTween[b].id = null, d._mTween[b].stop = 1)
                }
            }, aa = function (c, b) {
                try {
                    delete c[b]
                } catch (d) {
                    c[b] = null
                }
            }, aC = function (b) {
                return !(b.which && 1 !== b.which)
            }, aN = function (c) {
                var b = c.originalEvent.pointerType;
                return !(b && "touch" !== b && 2 !== b)
            }, aY = function (b) {
                return !isNaN(parseFloat(b)) && isFinite(b)
            }, aB = function (c) {
                var b = c.parents(".mCSB_container");
                return [c.offset().top - b.offset().top, c.offset().left - b.offset().left]
            };
        a.fn[aP] = function (b) {
            return aI[b] ? aI[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist") : aI.init.apply(this, arguments)
        }, a[aP] = function (b) {
            return aI[b] ? aI[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist") : aI.init.apply(this, arguments)
        }, a[aP].defaults = aV, window[aP] = !0, a(window).load(function () {
            a(aQ)[aP](), a.extend(a.expr[":"], {
                mcsInView: a.expr[":"].mcsInView || function (d) {
                    var f, b, g = a(d), c = g.parents(".mCSB_container");
                    if (c.length) {
                        return f = c.parent(), b = [c[0].offsetTop, c[0].offsetLeft], b[0] + aB(g)[0] >= 0 && b[0] + aB(g)[0] < f.height() - g.outerHeight(!1) && b[1] + aB(g)[1] >= 0 && b[1] + aB(g)[1] < f.width() - g.outerWidth(!1)
                    }
                }, mcsOverflow: a.expr[":"].mcsOverflow || function (b) {
                    var c = a(b).data(a3);
                    if (c) {
                        return c.overflowed[0] || c.overflowed[1]
                    }
                }
            })
        })
    })
});
var loading = false;
var spinnerOpts = {
    lines: 13,
    length: 5,
    width: 2,
    radius: 10,
    scale: 1,
    corners: 1,
    color: "#000",
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 100,
    className: "spinner",
    top: "50%",
    left: "50%",
    shadow: false,
    hwaccel: false,
    position: "absolute"
};
$(document).ready(function () {
    if ($("table.index-table tbody tr").size() === 0 && $(".load-more").size()) {
        loadMore()
    }
    $(".toggle-select-all-menu").on("click", function (a) {
        a.preventDefault();
        if (!$(".multi-select-menu").hasClass("visible")) {
            $(".multi-select-menu").show();
            $(".multi-select-menu").addClass("visible")
        } else {
            $(".multi-select-menu").hide();
            $(".multi-select-menu").removeClass("visible")
        }
    });
    $(".multi-select-menu").on("click", function () {
        $(".multi-select-menu").hide();
        $(".multi-select-menu").removeClass("visible")
    });
    $("table.index-table tbody").on("click", "a, input", function (a) {
        a.stopPropagation()
    });
    $("table.index-table tbody").on("click", "tr", function (a) {
        if ($(this).data("url")) {
            window.location.href = $(this).data("url")
        }
    });
    if ($(".load-more").size()) {
        $(window).scroll(function () {
            loadMore()
        })
    }
    $(".filter-dropdown").on("click", function (a) {
        a.stopPropagation();
        if ($(".filter-dropdown").find(".filter-dropdown-menu").css("transform") === "matrix(0, 0, 0, 0, 0, 0)") {
            $(".filter-dropdown").find(".filter-dropdown-menu").css("transform", "scale(1)")
        } else {
            $(".filter-dropdown").find(".filter-dropdown-menu").css("transform", "scale(0)")
        }
    });
    $("body").on("click", function () {
        if ($(".filter-dropdown-menu").css("transform") === "matrix(1, 0, 0, 1, 0, 0)") {
            $(".filter-dropdown-menu").css("transform", "scale(0)")
        }
    })
});

function loadMore() {
    if (!loading) {
        if ($(window).scrollTop() + 35 > $(document).height() - $(window).height()) {
            $(".load-more").html("");
            var a = document.getElementById("load-more");
            var b = new Spinner(spinnerOpts).spin(a);
            loading = true;
            if ($(".load-more").data("url") != null) {
                $.get($(".load-more").data("url") + "/page:" + Math.ceil(($("table.index-table tbody tr, table.list-table tbody tr").size() / 20) + 1), function (d) {
                    if (d.substring(0, 1) != "<") {
                        d = d.substring(d.indexOf("<"))
                    }
                    var c = $(d);
                    b.stop();
                    if (!c.find("tbody tr").size()) {
                        $(".load-more").remove()
                    } else {
                        if ($(".load-more").siblings("table").hasClass("index-table") || $(".load-more").parents("table").hasClass("index-table")) {
                            $("table.index-table tbody").append(c.find("tbody").html())
                        } else {
                            if ($(".load-more").siblings("table").hasClass("list-table") || $(".load-more").parents("table").hasClass("list-table")) {
                                $("table.list-table tbody").append(c.find("tbody").html())
                            }
                        }
                    }
                    loading = false
                }).fail(function () {
                    $(".load-more").html("No more data found");
                    loading = false
                })
            }
        }
    }
}

function campaignsTableEffects() {
    $("table.index-table tbody").on("click", "a, input", function (a) {
        a.stopPropagation()
    });
    $("table.index-table tbody").on("click", "tr", function (a) {
        if ($(this).data("url")) {
            window.location.href = $(this).data("url")
        }
    });
    $("table.index-table tbody").on("mouseover", "tr", function (a) {
        var c = $(this);
        var b = c.find(".actions");
        b.css("right", 0)
    });
    $("table.index-table tbody").on("mouseleave", "tr", function (a) {
        var c = $(this);
        var b = c.find(".actions");
        b.css("right", -b.width() + "px")
    });
    if ($(".load-more").size()) {
        $(window).scroll(function () {
            loadMore()
        })
    }
    $("table.account-mailinglists-table tbody").on("mouseover", "tr", function (a) {
        var c = $(this);
        var b = c.find(".actions");
        b.css("right", 0)
    });
    $("table.account-mailinglists-table tbody").on("mouseleave", "tr", function (a) {
        var c = $(this);
        var b = c.find(".actions");
        b.css("right", -b.width() + "px")
    })
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("html").addClass("ismobile")
}
$(window).load(function () {
    if (!$("html").hasClass("ismobile")) {
        if ($(".page-loader")[0]) {
            setTimeout(function () {
                $(".page-loader").fadeOut()
            }, 500)
        }
    }
});
$(document).ready(function () {
    (function () {
        var k = localStorage.getItem("ma-layout-status");
        if (!$("#header-2")[0]) {
            if (k == 1) {
                $("body").addClass("sw-toggled");
                $("#tw-switch").prop("checked", true)
            }
        }
        $("body").on("change", "#toggle-width input:checkbox", function () {
            if ($(this).is(":checked")) {
                setTimeout(function () {
                    $("body").addClass("toggled sw-toggled");
                    localStorage.setItem("ma-layout-status", 1)
                }, 250)
            } else {
                setTimeout(function () {
                    $("body").removeClass("toggled sw-toggled");
                    localStorage.setItem("ma-layout-status", 0)
                }, 250)
            }
        })
    })();

    function a(k, n, m) {
        $(k).mCustomScrollbar({
            theme: n,
            scrollInertia: 100,
            axis: "yx",
            mouseWheel: {enable: true, axis: m, preventDefault: true}
        })
    }

    if (!$("html").hasClass("ismobile")) {
        if ($(".c-overflow")[0]) {
            a(".c-overflow", "minimal-dark", "y")
        }
    }
    (function () {
        $("body").on("click", "#top-search > a", function (k) {
            k.preventDefault();
            $("#header").addClass("search-toggled");
            $("#top-search-wrap input").focus()
        });
        $("body").on("click", "#top-search-close", function (k) {
            k.preventDefault();
            $("#header").removeClass("search-toggled")
        })
    })();
    (function () {
        $("body").on("click", "#menu-trigger, #chat-trigger", function (m) {
            m.preventDefault();
            var k = $(this).data("trigger");
            $(k).toggleClass("toggled");
            $(this).toggleClass("open");
            $(".sub-menu.toggled").not(".active").each(function () {
                $(this).removeClass("toggled");
                $(this).find("ul").hide()
            });
            $(".profile-menu .main-menu").hide();
            if (k == "#sidebar") {
                $elem = "#sidebar";
                $elem2 = "#menu-trigger";
                $("#chat-trigger").removeClass("open");
                if (!$("#chat").hasClass("toggled")) {
                    $("#header").toggleClass("sidebar-toggled")
                } else {
                    $("#chat").removeClass("toggled")
                }
            }
            if (k == "#chat") {
                $elem = "#chat";
                $elem2 = "#chat-trigger";
                $("#menu-trigger").removeClass("open");
                if (!$("#sidebar").hasClass("toggled")) {
                    $("#header").toggleClass("sidebar-toggled")
                } else {
                    $("#sidebar").removeClass("toggled")
                }
            }
            if ($("#header").hasClass("sidebar-toggled")) {
                $(document).on("click", function (n) {
                    if (($(n.target).closest($elem).length === 0) && ($(n.target).closest($elem2).length === 0)) {
                        setTimeout(function () {
                            $($elem).removeClass("toggled");
                            $("#header").removeClass("sidebar-toggled");
                            $($elem2).removeClass("open")
                        })
                    }
                })
            }
        });
        $("body").on("click", ".sub-menu > a", function (k) {
            k.preventDefault();
            $(this).next().slideToggle(200);
            $(this).parent().toggleClass("toggled")
        })
    })();
    $("body").on("click", '[data-clear="notification"]', function (n) {
        n.preventDefault();
        var k = $(this).closest(".listview");
        var p = k.find(".lv-item");
        var o = p.size();
        $(this).parent().fadeOut();
        k.find(".list-group").prepend('<i class="grid-loading hide-it"></i>');
        k.find(".grid-loading").fadeIn(1500);
        var m = 0;
        p.each(function () {
            var q = $(this);
            setTimeout(function () {
                q.addClass("animated fadeOutRightBig").delay(1000).queue(function () {
                    q.remove()
                })
            }, m += 150)
        });
        setTimeout(function () {
            $("#notifications").addClass("empty")
        }, (o * 150) + 200)
    });
    if ($(".dropdown")[0]) {
        $("body").on("click", ".dropdown.open .dropdown-menu", function (k) {
            k.stopPropagation()
        });
        $(".dropdown").on("shown.bs.dropdown", function (k) {
            if ($(this).attr("data-animation")) {
                $animArray = [];
                $animation = $(this).data("animation");
                $animArray = $animation.split(",");
                $animationIn = "animated " + $animArray[0];
                $animationOut = "animated " + $animArray[1];
                $animationDuration = "";
                if (!$animArray[2]) {
                    $animationDuration = 500
                } else {
                    $animationDuration = $animArray[2]
                }
                $(this).find(".dropdown-menu").removeClass($animationOut);
                $(this).find(".dropdown-menu").addClass($animationIn)
            }
            if ($(this).find('[data-toggle="dropdown"] .zmdi') && !$(this).find('[data-toggle="dropdown"] .zmdi').hasClass("no-arrow-change")) {
                $(this).find('[data-toggle="dropdown"] .zmdi').removeClass("zmdi-chevron-down");
                $(this).find('[data-toggle="dropdown"] .zmdi').addClass("zmdi-chevron-up")
            }
        });
        $(".dropdown").on("hide.bs.dropdown", function (k) {
            if ($(this).attr("data-animation")) {
                k.preventDefault();
                $this = $(this);
                $dropdownMenu = $this.find(".dropdown-menu");
                $dropdownMenu.addClass($animationOut);
                setTimeout(function () {
                    $this.removeClass("open")
                }, $animationDuration)
            }
            if ($(this).find('[data-toggle="dropdown"] .zmdi') && !$(this).find('[data-toggle="dropdown"] .zmdi').hasClass("no-arrow-change")) {
                $(this).find('[data-toggle="dropdown"] .zmdi').removeClass("zmdi-chevron-up");
                $(this).find('[data-toggle="dropdown"] .zmdi').addClass("zmdi-chevron-down")
            }
        })
    }
    if ($("#calendar-widget")[0]) {
        (function () {
            $("#calendar-widget").fullCalendar({
                contentHeight: "auto",
                theme: true,
                header: {right: "", center: "prev, title, next", left: ""},
                defaultDate: "2014-06-12",
                editable: true,
                events: [{title: "All Day", start: "2014-06-01", className: "bgm-cyan"}, {
                    title: "Long Event",
                    start: "2014-06-07",
                    end: "2014-06-10",
                    className: "bgm-orange"
                }, {id: 999, title: "Repeat", start: "2014-06-09", className: "bgm-lightgreen"}, {
                    id: 999,
                    title: "Repeat",
                    start: "2014-06-16",
                    className: "bgm-lightblue"
                }, {title: "Meet", start: "2014-06-12", end: "2014-06-12", className: "bgm-green"}, {
                    title: "Lunch",
                    start: "2014-06-12",
                    className: "bgm-cyan"
                }, {title: "Birthday", start: "2014-06-13", className: "bgm-amber"}, {
                    title: "Google",
                    url: "http://google.com/",
                    start: "2014-06-28",
                    className: "bgm-amber"
                }]
            })
        })()
    }
    if ($("#weather-widget")[0]) {
        $.simpleWeather({
            location: "Austin, TX", woeid: "", unit: "f", success: function (k) {
                html = '<div class="weather-status">' + k.temp + "&deg;" + k.units.temp + "</div>";
                html += '<ul class="weather-info"><li>' + k.city + ", " + k.region + "</li>";
                html += '<li class="currently">' + k.currently + "</li></ul>";
                html += '<div class="weather-icon wi-' + k.code + '"></div>';
                html += '<div class="dash-widget-footer"><div class="weather-list tomorrow">';
                html += '<span class="weather-list-icon wi-' + k.forecast[2].code + '"></span><span>' + k.forecast[1].high + "/" + k.forecast[1].low + "</span><span>" + k.forecast[1].text + "</span>";
                html += "</div>";
                html += '<div class="weather-list after-tomorrow">';
                html += '<span class="weather-list-icon wi-' + k.forecast[2].code + '"></span><span>' + k.forecast[2].high + "/" + k.forecast[2].low + "</span><span>" + k.forecast[2].text + "</span>";
                html += "</div></div>";
                $("#weather-widget").html(html)
            }, error: function (k) {
                $("#weather-widget").html("<p>" + k + "</p>")
            }
        })
    }
    if ($("#todo-lists")[0]) {
        $("body").on("click", "#add-tl-item .add-new-item", function () {
            $(this).parent().addClass("toggled")
        });
        $("body").on("click", ".add-tl-actions > a", function (m) {
            m.preventDefault();
            var k = $(this).closest("#add-tl-item");
            var n = $(this).data("tl-action");
            if (n == "dismiss") {
                k.find("textarea").val("");
                k.removeClass("toggled")
            }
            if (n == "save") {
                k.find("textarea").val("");
                k.removeClass("toggled")
            }
        })
    }
    if ($(".auto-size")[0]) {
        autosize($(".auto-size"))
    }
    $("body").on("click", ".profile-menu > a", function (k) {
        k.preventDefault();
        $(this).parent().toggleClass("toggled");
        $(this).next().slideToggle(200)
    });
    if ($(".fg-line")[0]) {
        $("body").on("focus", ".fg-line .form-control", function () {
            $(this).closest(".fg-line").addClass("fg-toggled");
            $(this).closest(".fg-line").removeClass("fg-keep-label")
        });
        $("body").on("blur", ".form-control", function () {
            var m = $(this).closest(".form-group, .input-group");
            var k = m.find(".form-control").val();
            if (m.hasClass("fg-float")) {
                if (k.length == 0) {
                    $(this).closest(".fg-line").removeClass("fg-toggled")
                } else {
                    $(this).closest(".fg-line").removeClass("fg-toggled").addClass("fg-keep-label")
                }
            } else {
                $(this).closest(".fg-line").removeClass("fg-toggled")
            }
        })
    }
    if ($(".fg-float")[0]) {
        $(".fg-float .form-control").each(function () {
            var k = $(this).val();
            if (!k.length == 0) {
                $(this).closest(".fg-line").addClass("fg-toggled")
            }
        })
    }
    if ($("audio, video")[0]) {
        $("video,audio").mediaelementplayer()
    }
    if ($(".chosen")[0]) {
        $(".chosen").chosen({width: "100%", allow_single_deselect: true})
    }
    if ($(".input-slider")[0]) {
        $(".input-slider").each(function () {
            var k = $(this).data("is-start");
            $(this).noUiSlider({start: k, range: {min: 0, max: 100}})
        })
    }
    if ($(".input-slider-range")[0]) {
        $(".input-slider-range").noUiSlider({start: [30, 60], range: {min: 0, max: 100}, connect: true})
    }
    if ($(".input-slider-values")[0]) {
        $(".input-slider-values").noUiSlider({
            start: [45, 80],
            connect: true,
            direction: "rtl",
            behaviour: "tap-drag",
            range: {min: 0, max: 100}
        });
        $(".input-slider-values").Link("lower").to($("#value-lower"));
        $(".input-slider-values").Link("upper").to($("#value-upper"), "html")
    }
    if ($("input-mask")[0]) {
        $(".input-mask").mask()
    }
    if ($(".color-picker")[0]) {
        $(".color-picker").each(function () {
            var k = $(this).closest(".cp-container").find(".cp-value");
            $(this).farbtastic(k)
        })
    }
    if ($(".html-editor")[0]) {
        $(".html-editor").summernote({height: 150})
    }
    if ($(".html-editor-click")[0]) {
        $("body").on("click", ".hec-button", function () {
            $(".html-editor-click").summernote({focus: true});
            $(".hec-save").show()
        });
        $("body").on("click", ".hec-save", function () {
            $(".html-editor-click").code();
            $(".html-editor-click").destroy();
            $(".hec-save").hide();
            h("Content Saved Successfully!", "success")
        })
    }
    if ($(".html-editor-airmod")[0]) {
        $(".html-editor-airmod").summernote({airMode: true})
    }
    if ($(".date-time-picker")[0]) {
        $(".date-time-picker").datetimepicker({format: "Y-M-D HH:mm:ss"})
    }
    if ($(".time-picker")[0]) {
        $(".time-picker").datetimepicker({format: "LT"})
    }
    if ($(".date-picker")[0]) {
        $(".date-picker").datetimepicker({format: "Y-M-D"})
    }
    if ($(".form-wizard-basic")[0]) {
        $(".form-wizard-basic").bootstrapWizard({
            tabClass: "fw-nav",
            nextSelector: ".next",
            previousSelector: ".previous"
        })
    }

    function h(m, k) {
        $.growl({message: m}, {
            type: k,
            allow_dismiss: false,
            label: "Cancel",
            className: "btn-xs btn-inverse",
            placement: {from: "top", align: "right"},
            delay: 2500,
            animate: {enter: "animated bounceIn", exit: "animated bounceOut"},
            offset: {x: 20, y: 85}
        })
    }

    (function () {
        Waves.attach(".btn:not(.btn-icon):not(.btn-float)");
        Waves.attach(".btn-icon, .btn-float", ["waves-circle", "waves-float"]);
        Waves.init()
    })();
    if ($(".lightbox")[0]) {
        $(".lightbox").lightGallery({enableTouch: true})
    }
    $("body").on("click", ".a-prevent", function (k) {
        k.preventDefault()
    });
    if ($(".collapse")[0]) {
        $(".collapse").on("show.bs.collapse", function (k) {
            $(this).closest(".panel").find(".panel-heading").addClass("active")
        });
        $(".collapse").on("hide.bs.collapse", function (k) {
            $(this).closest(".panel").find(".panel-heading").removeClass("active")
        });
        $(".collapse.in").each(function () {
            $(this).closest(".panel").find(".panel-heading").addClass("active")
        })
    }
    if ($('[data-toggle="tooltip"]')[0]) {
        $('[data-toggle="tooltip"]').tooltip()
    }
    if ($('[data-toggle="popover"]')[0]) {
        $('[data-toggle="popover"]').popover()
    }
    if ($(".on-select")[0]) {
        var d = ".lv-avatar-content input:checkbox";
        var c = $(".on-select").closest(".lv-actions");
        $("body").on("click", d, function () {
            if ($(d + ":checked")[0]) {
                c.addClass("toggled")
            } else {
                c.removeClass("toggled")
            }
        })
    }
    if ($("#ms-menu-trigger")[0]) {
        $("body").on("click", "#ms-menu-trigger", function (k) {
            k.preventDefault();
            $(this).toggleClass("open");
            $(".ms-menu").toggleClass("toggled")
        })
    }
    if ($(".login-content")[0]) {
        $("html").addClass("login-content");
        $("body").on("click", ".login-navigation > li", function () {
            var m = $(this).data("block");
            var k = $(this).closest(".lc-block");
            k.removeClass("toggled");
            setTimeout(function () {
                $(m).addClass("toggled")
            })
        })
    }
    if ($('[data-action="fullscreen"]')[0]) {
        var f = $("[data-action='fullscreen']");
        f.on("click", function (m) {
            m.preventDefault();

            function n(o) {
                if (o.requestFullscreen) {
                    o.requestFullscreen()
                } else {
                    if (o.mozRequestFullScreen) {
                        o.mozRequestFullScreen()
                    } else {
                        if (o.webkitRequestFullscreen) {
                            o.webkitRequestFullscreen()
                        } else {
                            if (o.msRequestFullscreen) {
                                o.msRequestFullscreen()
                            }
                        }
                    }
                }
            }

            function k() {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else {
                    if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen()
                    } else {
                        if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen()
                        }
                    }
                }
            }

            n(document.documentElement);
            f.closest(".dropdown").removeClass("open")
        })
    }
    if ($('[data-action="clear-localstorage"]')[0]) {
        var j = $('[data-action="clear-localstorage"]');
        j.on("click", function (k) {
            k.preventDefault();
            swal({
                title: "Are you sure?",
                text: "All your saved localStorage values will be removed",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
                localStorage.clear();
                swal("Done!", "localStorage is cleared", "success")
            })
        })
    }
    if ($("[data-pmb-action]")[0]) {
        $("body").on("click", "[data-pmb-action]", function (k) {
            k.preventDefault();
            var m = $(this).data("pmb-action");
            if (m === "edit") {
                $(this).closest(".pmb-block").toggleClass("toggled")
            }
            if (m === "reset") {
                $(this).closest(".pmb-block").removeClass("toggled")
            }
        })
    }
    if ($("html").hasClass("ie9")) {
        $("input, textarea").placeholder({customClass: "ie9-placeholder"})
    }
    if ($(".lvh-search-trigger")[0]) {
        $("body").on("click", ".lvh-search-trigger", function (k) {
            k.preventDefault();
            x = $(this).closest(".lv-header-alt").find(".lvh-search");
            x.fadeIn(300);
            x.find(".lvhs-input").focus()
        });
        $("body").on("click", ".lvh-search-close", function () {
            x.fadeOut(300);
            setTimeout(function () {
                x.find(".lvhs-input").val("")
            }, 350)
        })
    }
    if ($('[data-action="print"]')[0]) {
        $("body").on("click", '[data-action="print"]', function (k) {
            k.preventDefault();
            window.print()
        })
    }
    if ($(".typeahead")[0]) {
        var b = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
        var i = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: b
        });
        $(".typeahead").typeahead({hint: true, highlight: true, minLength: 1}, {name: "states", source: i})
    }
    if ($(".wcc-toggle")[0]) {
        var g = '<div class="wcc-inner"><textarea class="wcci-text auto-size" placeholder="Write Something..."></textarea></div><div class="m-t-15"><button class="btn btn-sm btn-primary">Post</button><button class="btn btn-sm btn-link wcc-cencel">Cancel</button></div>';
        $("body").on("click", ".wcc-toggle", function () {
            $(this).parent().html(g);
            autosize($(".auto-size"))
        });
        $("body").on("click", ".wcc-cencel", function (k) {
            k.preventDefault();
            $(this).closest(".wc-comment").find(".wcc-inner").addClass("wcc-toggle").html("Write Something...")
        })
    }
    $("body").on("click", "[data-skin]", function () {
        var k = $("[data-current-skin]").data("current-skin");
        var m = $(this).data("skin");
        $("[data-current-skin]").attr("data-current-skin", m)
    })
});
/*!
 * Waves v0.7.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */
;(function (b, a) {
    if (typeof define === "function" && define.amd) {
        define([], function () {
            return a.apply(b)
        })
    } else {
        if (typeof exports === "object") {
            module.exports = a.call(b)
        } else {
            b.Waves = a.call(b)
        }
    }
})(typeof global === "object" ? global : this, function () {
    var k = k || {};
    var q = document.querySelectorAll.bind(document);
    var f = Object.prototype.toString;
    var o = "ontouchstart" in window;

    function h(t) {
        return t !== null && t === t.window
    }

    function g(t) {
        return h(t) ? t : t.nodeType === 9 && t.defaultView
    }

    function r(u) {
        var t = typeof u;
        return t === "function" || t === "object" && !!u
    }

    function p(t) {
        return r(t) && t.nodeType > 0
    }

    function j(t) {
        var u = f.call(t);
        if (u === "[object String]") {
            return q(t)
        } else {
            if (r(t) && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(u) && t.hasOwnProperty("length")) {
                return t
            } else {
                if (p(t)) {
                    return [t]
                }
            }
        }
        return []
    }

    function i(v) {
        var t, y, u = {top: 0, left: 0}, w = v && v.ownerDocument;
        t = w.documentElement;
        if (typeof v.getBoundingClientRect !== typeof undefined) {
            u = v.getBoundingClientRect()
        }
        y = g(w);
        return {top: u.top + y.pageYOffset - t.clientTop, left: u.left + y.pageXOffset - t.clientLeft}
    }

    function c(u) {
        var t = "";
        for (var v in u) {
            if (u.hasOwnProperty(v)) {
                t += (v + ":" + u[v] + ";")
            }
        }
        return t
    }

    var s = {
        duration: 750, delay: 200, show: function (B, z, y) {
            if (B.button === 2) {
                return false
            }
            z = z || this;
            var E = document.createElement("div");
            E.className = "waves-ripple waves-rippling";
            z.appendChild(E);
            var D = i(z);
            var A = 0;
            var C = 0;
            if ("touches" in B && B.touches.length) {
                A = (B.touches[0].pageY - D.top);
                C = (B.touches[0].pageX - D.left)
            } else {
                A = (B.pageY - D.top);
                C = (B.pageX - D.left)
            }
            C = C >= 0 ? C : 0;
            A = A >= 0 ? A : 0;
            var v = "scale(" + ((z.clientWidth / 100) * 3) + ")";
            var u = "translate(0,0)";
            if (y) {
                u = "translate(" + (y.x) + "px, " + (y.y) + "px)"
            }
            E.setAttribute("data-hold", Date.now());
            E.setAttribute("data-x", C);
            E.setAttribute("data-y", A);
            E.setAttribute("data-scale", v);
            E.setAttribute("data-translate", u);
            var t = {top: A + "px", left: C + "px"};
            E.classList.add("waves-notransition");
            E.setAttribute("style", c(t));
            E.classList.remove("waves-notransition");
            t["-webkit-transform"] = v + " " + u;
            t["-moz-transform"] = v + " " + u;
            t["-ms-transform"] = v + " " + u;
            t["-o-transform"] = v + " " + u;
            t.transform = v + " " + u;
            t.opacity = "1";
            var w = B.type === "mousemove" ? 2500 : s.duration;
            t["-webkit-transition-duration"] = w + "ms";
            t["-moz-transition-duration"] = w + "ms";
            t["-o-transition-duration"] = w + "ms";
            t["transition-duration"] = w + "ms";
            E.setAttribute("style", c(t))
        }, hide: function (y, w) {
            w = w || this;
            var u = w.getElementsByClassName("waves-rippling");
            for (var v = 0, t = u.length; v < t; v++) {
                b(y, w, u[v])
            }
        }
    };
    var m = {
        input: function (v) {
            var w = v.parentNode;
            if (w.tagName.toLowerCase() === "i" && w.classList.contains("waves-effect")) {
                return
            }
            var z = document.createElement("i");
            z.className = v.className + " waves-input-wrapper";
            v.className = "waves-button-input";
            w.replaceChild(z, v);
            z.appendChild(v);
            var y = window.getComputedStyle(v, null);
            var u = y.color;
            var t = y.backgroundColor;
            z.setAttribute("style", "color:" + u + ";background:" + t);
            v.setAttribute("style", "background-color:rgba(0,0,0,0);")
        }, img: function (t) {
            var u = t.parentNode;
            if (u.tagName.toLowerCase() === "i" && u.classList.contains("waves-effect")) {
                return
            }
            var v = document.createElement("i");
            u.replaceChild(v, t);
            v.appendChild(t)
        }
    };

    function b(A, t, D) {
        if (!D) {
            return
        }
        D.classList.remove("waves-rippling");
        var B = D.getAttribute("data-x");
        var z = D.getAttribute("data-y");
        var v = D.getAttribute("data-scale");
        var u = D.getAttribute("data-translate");
        var C = Date.now() - Number(D.getAttribute("data-hold"));
        var y = 350 - C;
        if (y < 0) {
            y = 0
        }
        if (A.type === "mousemove") {
            y = 150
        }
        var w = A.type === "mousemove" ? 2500 : s.duration;
        setTimeout(function () {
            var E = {
                top: z + "px",
                left: B + "px",
                opacity: "0",
                "-webkit-transition-duration": w + "ms",
                "-moz-transition-duration": w + "ms",
                "-o-transition-duration": w + "ms",
                "transition-duration": w + "ms",
                "-webkit-transform": v + " " + u,
                "-moz-transform": v + " " + u,
                "-ms-transform": v + " " + u,
                "-o-transform": v + " " + u,
                transform: v + " " + u
            };
            D.setAttribute("style", c(E));
            setTimeout(function () {
                try {
                    t.removeChild(D)
                } catch (F) {
                    return false
                }
            }, w)
        }, y)
    }

    var a = {
        touches: 0, allowEvent: function (u) {
            var t = true;
            if (/^(mousedown|mousemove)$/.test(u.type) && a.touches) {
                t = false
            }
            return t
        }, registerEvent: function (u) {
            var t = u.type;
            if (t === "touchstart") {
                a.touches += 1
            } else {
                if (/^(touchend|touchcancel)$/.test(t)) {
                    setTimeout(function () {
                        if (a.touches) {
                            a.touches -= 1
                        }
                    }, 500)
                }
            }
        }
    };

    function n(v) {
        if (a.allowEvent(v) === false) {
            return null
        }
        var t = null;
        var u = v.target || v.srcElement;
        while (u.parentElement !== null) {
            if (u.classList.contains("waves-effect") && (!(u instanceof SVGElement))) {
                t = u;
                break
            }
            u = u.parentElement
        }
        return t
    }

    function d(v) {
        var t = n(v);
        if (t !== null) {
            if (t.disabled || t.getAttribute("disabled") || t.classList.contains("disabled")) {
                return
            }
            a.registerEvent(v);
            if (v.type === "touchstart" && s.delay) {
                var u = false;
                var z = setTimeout(function () {
                    z = null;
                    s.show(v, t)
                }, s.delay);
                var y = function (A) {
                    if (z) {
                        clearTimeout(z);
                        z = null;
                        s.show(v, t)
                    }
                    if (!u) {
                        u = true;
                        s.hide(A, t)
                    }
                };
                var w = function (A) {
                    if (z) {
                        clearTimeout(z);
                        z = null
                    }
                    y(A)
                };
                t.addEventListener("touchmove", w, false);
                t.addEventListener("touchend", y, false);
                t.addEventListener("touchcancel", y, false)
            } else {
                s.show(v, t);
                if (o) {
                    t.addEventListener("touchend", s.hide, false);
                    t.addEventListener("touchcancel", s.hide, false)
                }
                t.addEventListener("mouseup", s.hide, false);
                t.addEventListener("mouseleave", s.hide, false)
            }
        }
    }

    k.init = function (u) {
        var t = document.body;
        u = u || {};
        if ("duration" in u) {
            s.duration = u.duration
        }
        if ("delay" in u) {
            s.delay = u.delay
        }
        if (o) {
            t.addEventListener("touchstart", d, false);
            t.addEventListener("touchcancel", a.registerEvent, false);
            t.addEventListener("touchend", a.registerEvent, false)
        }
        t.addEventListener("mousedown", d, false)
    };
    k.attach = function (z, y) {
        z = j(z);
        if (f.call(y) === "[object Array]") {
            y = y.join(" ")
        }
        y = y ? " " + y : "";
        var w, v;
        for (var u = 0, t = z.length; u < t; u++) {
            w = z[u];
            v = w.tagName.toLowerCase();
            if (["input", "img"].indexOf(v) !== -1) {
                m[v](w);
                w = w.parentElement
            }
            if (w.className.indexOf("waves-effect") === -1) {
                w.className += " waves-effect" + y
            }
        }
    };
    k.ripple = function (t, E) {
        t = j(t);
        var w = t.length;
        E = E || {};
        E.wait = E.wait || 0;
        E.position = E.position || null;
        if (w) {
            var B, D, y, u = {}, C = 0;
            var v = {type: "mousedown", button: 1};
            var z = function (G, F) {
                return function () {
                    s.hide(G, F)
                }
            };
            for (; C < w; C++) {
                B = t[C];
                D = E.position || {x: B.clientWidth / 2, y: B.clientHeight / 2};
                y = i(B);
                u.x = y.left + D.x;
                u.y = y.top + D.y;
                v.pageX = u.x;
                v.pageY = u.y;
                s.show(v, B);
                if (E.wait >= 0 && E.wait !== null) {
                    var A = {type: "mouseup", button: 1};
                    setTimeout(z(A, B), E.wait)
                }
            }
        }
    };
    k.calm = function (v) {
        v = j(v);
        var w = {type: "mouseup", button: 1};
        for (var u = 0, t = v.length; u < t; u++) {
            s.hide(w, v[u])
        }
    };
    k.displayEffect = function (t) {
        console.error("Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect");
        k.init(t)
    };
    return k
});
!function (d, c) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = c() : "function" == typeof define && define.amd ? define(c) : d.moment = c()
}(this, function () {
    function eS() {
        return dO.apply(null, arguments)
    }

    function eQ(b) {
        dO = b
    }

    function eO(b) {
        return b instanceof Array || "[object Array]" === Object.prototype.toString.call(b)
    }

    function eM(b) {
        return b instanceof Date || "[object Date]" === Object.prototype.toString.call(b)
    }

    function eK(g, f) {
        var i, h = [];
        for (i = 0; i < g.length; ++i) {
            h.push(f(g[i], i))
        }
        return h
    }

    function eI(d, c) {
        return Object.prototype.hasOwnProperty.call(d, c)
    }

    function eH(f, d) {
        for (var g in d) {
            eI(d, g) && (f[g] = d[g])
        }
        return eI(d, "toString") && (f.toString = d.toString), eI(d, "valueOf") && (f.valueOf = d.valueOf), f
    }

    function eF(g, f, i, h) {
        return eZ(g, f, i, h, !0).utc()
    }

    function eE() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null
        }
    }

    function eD(b) {
        return null == b._pf && (b._pf = eE()), b._pf
    }

    function eC(f) {
        if (null == f._isValid) {
            var d = eD(f), g = dE.call(d.parsedDateParts, function (b) {
                return null != b
            });
            f._isValid = !isNaN(f._d.getTime()) && d.overflow < 0 && !d.empty && !d.invalidMonth && !d.invalidWeekday && !d.nullInput && !d.invalidFormat && !d.userInvalidated && (!d.meridiem || d.meridiem && g), f._strict && (f._isValid = f._isValid && 0 === d.charsLeftOver && 0 === d.unusedTokens.length && void 0 === d.bigHour)
        }
        return f._isValid
    }

    function eB(d) {
        var c = eF(NaN);
        return null != d ? eH(eD(c), d) : eD(c).userInvalidated = !0, c
    }

    function eA(b) {
        return void 0 === b
    }

    function ez(g, f) {
        var j, i, h;
        if (eA(f._isAMomentObject) || (g._isAMomentObject = f._isAMomentObject), eA(f._i) || (g._i = f._i), eA(f._f) || (g._f = f._f), eA(f._l) || (g._l = f._l), eA(f._strict) || (g._strict = f._strict), eA(f._tzm) || (g._tzm = f._tzm), eA(f._isUTC) || (g._isUTC = f._isUTC), eA(f._offset) || (g._offset = f._offset), eA(f._pf) || (g._pf = eD(f)), eA(f._locale) || (g._locale = f._locale), dt.length > 0) {
            for (j in dt) {
                i = dt[j], h = f[i], eA(h) || (g[i] = h)
            }
        }
        return g
    }

    function ey(a) {
        ez(this, a), this._d = new Date(null != a._d ? a._d.getTime() : NaN), di === !1 && (di = !0, eS.updateOffset(this), di = !1)
    }

    function ex(b) {
        return b instanceof ey || null != b && null != b._isAMomentObject
    }

    function ew(b) {
        return 0 > b ? Math.ceil(b) : Math.floor(b)
    }

    function ev(f) {
        var d = +f, g = 0;
        return 0 !== d && isFinite(d) && (g = ew(d)), g
    }

    function eu(i, h, o) {
        var n, m = Math.min(i.length, h.length), k = Math.abs(i.length - h.length), j = 0;
        for (n = 0; m > n; n++) {
            (o && i[n] !== h[n] || !o && ev(i[n]) !== ev(h[n])) && j++
        }
        return j + k
    }

    function et(a) {
        eS.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
    }

    function es(a, g) {
        var f = !0;
        return eH(function () {
            return null != eS.deprecationHandler && eS.deprecationHandler(null, a), f && (et(a + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), f = !1), g.apply(this, arguments)
        }, g)
    }

    function er(a, d) {
        null != eS.deprecationHandler && eS.deprecationHandler(a, d), c2[a] || (et(d), c2[a] = !0)
    }

    function eq(b) {
        return b instanceof Function || "[object Function]" === Object.prototype.toString.call(b)
    }

    function ep(b) {
        return "[object Object]" === Object.prototype.toString.call(b)
    }

    function en(f) {
        var d, g;
        for (g in f) {
            d = f[g], eq(d) ? this[g] = d : this["_" + g] = d
        }
        this._config = f, this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }

    function el(g, f) {
        var i, h = eH({}, g);
        for (i in f) {
            eI(f, i) && (ep(g[i]) && ep(f[i]) ? (h[i] = {}, eH(h[i], g[i]), eH(h[i], f[i])) : null != f[i] ? h[i] = f[i] : delete h[i])
        }
        return h
    }

    function fz(b) {
        null != b && this.set(b)
    }

    function fy(b) {
        return b ? b.toLowerCase().replace("_", "-") : b
    }

    function fw(h) {
        for (var g, m, k, j, i = 0; i < h.length;) {
            for (j = fy(h[i]).split("-"), g = j.length, m = fy(h[i + 1]), m = m ? m.split("-") : null; g > 0;) {
                if (k = fu(j.slice(0, g).join("-"))) {
                    return k
                }
                if (m && m.length >= g && eu(j, m, !0) >= g - 1) {
                    break
                }
                g--
            }
            i++
        }
        return null
    }

    function fu(f) {
        var d = null;
        if (!co[f] && "undefined" != typeof module && module && module.exports) {
            try {
                d = cI._abbr, require("./locale/" + f), fs(d)
            } catch (g) {
            }
        }
        return co[f]
    }

    function fs(f, d) {
        var g;
        return f && (g = eA(d) ? fn(f) : fq(f, d), g && (cI = g)), cI._abbr
    }

    function fq(d, c) {
        return null !== c ? (c.abbr = d, null != co[d] ? (er("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"), c = el(co[d]._config, c)) : null != c.parentLocale && (null != co[c.parentLocale] ? c = el(co[c.parentLocale]._config, c) : er("parentLocaleUndefined", "specified parentLocale is not defined yet")), co[d] = new fz(c), fs(d), co[d]) : (delete co[d], null)
    }

    function fo(f, d) {
        if (null != d) {
            var g;
            null != co[f] && (d = el(co[f]._config, d)), g = new fz(d), g.parentLocale = co[f], co[f] = g, fs(f)
        } else {
            null != co[f] && (null != co[f].parentLocale ? co[f] = co[f].parentLocale : null != co[f] && delete co[f])
        }
        return co[f]
    }

    function fn(d) {
        var c;
        if (d && d._locale && d._locale._abbr && (d = d._locale._abbr), !d) {
            return cI
        }
        if (!eO(d)) {
            if (c = fu(d)) {
                return c
            }
            d = [d]
        }
        return fw(d)
    }

    function fl() {
        return cS(co)
    }

    function fk(f, d) {
        var g = f.toLowerCase();
        b3[g] = b3[g + "s"] = b3[d] = f
    }

    function fj(b) {
        return "string" == typeof b ? b3[b] || b3[b.toLowerCase()] : void 0
    }

    function fi(g) {
        var f, i, h = {};
        for (i in g) {
            eI(g, i) && (f = fj(i), f && (h[f] = g[i]))
        }
        return h
    }

    function fh(a, d) {
        return function (b) {
            return null != b ? (ff(this, a, b), eS.updateOffset(this, d), this) : fg(this, a)
        }
    }

    function fg(d, c) {
        return d.isValid() ? d._d["get" + (d._isUTC ? "UTC" : "") + c]() : NaN
    }

    function ff(f, d, g) {
        f.isValid() && f._d["set" + (f._isUTC ? "UTC" : "") + d](g)
    }

    function e9(f, d) {
        var g;
        if ("object" == typeof f) {
            for (g in f) {
                this.set(g, f[g])
            }
        } else {
            if (f = fj(f), eq(this[f])) {
                return this[f](d)
            }
        }
        return this
    }

    function e8(h, g, m) {
        var k = "" + Math.abs(h), j = g - k.length, i = h >= 0;
        return (i ? m ? "+" : "" : "-") + Math.pow(10, Math.max(0, j)).toString().substr(1) + k
    }

    function e7(g, f, j, i) {
        var h = i;
        "string" == typeof i && (h = function () {
            return this[i]()
        }), g && (bk[g] = h), f && (bk[f[0]] = function () {
            return e8(h.apply(this, arguments), f[1], f[2])
        }), j && (bk[j] = function () {
            return this.localeData().ordinal(h.apply(this, arguments), g)
        })
    }

    function e6(b) {
        return b.match(/\[[\s\S]/) ? b.replace(/^\[|\]$/g, "") : b.replace(/\\/g, "")
    }

    function e5(g) {
        var f, i, h = g.match(bT);
        for (f = 0, i = h.length; i > f; f++) {
            bk[h[f]] ? h[f] = bk[h[f]] : h[f] = e6(h[f])
        }
        return function (a) {
            var d, c = "";
            for (d = 0; i > d; d++) {
                c += h[d] instanceof Function ? h[d].call(a, g) : h[d]
            }
            return c
        }
    }

    function e4(d, c) {
        return d.isValid() ? (c = e3(c, d.localeData()), bz[c] = bz[c] || e5(c), bz[c](d)) : d.localeData().invalidDate()
    }

    function e3(g, f) {
        function i(b) {
            return f.longDateFormat(b) || b
        }

        var h = 5;
        for (bJ.lastIndex = 0; h >= 0 && bJ.test(g);) {
            g = g.replace(bJ, i), bJ.lastIndex = 0, h -= 1
        }
        return g
    }

    function e2(f, d, g) {
        ej[f] = eq(d) ? d : function (b, c) {
            return b && g ? g : d
        }
    }

    function e1(d, c) {
        return eI(ej, d) ? ej[d](c._strict, c._locale) : new RegExp(e0(d))
    }

    function e0(b) {
        return eY(b.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (g, f, j, i, h) {
            return f || j || i || h
        }))
    }

    function eY(b) {
        return b.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function fP(g, f) {
        var i, h = f;
        for ("string" == typeof g && (g = [g]), "number" == typeof f && (h = function (b, d) {
            d[f] = ev(b)
        }), i = 0; i < g.length; i++) {
            d3[g[i]] = h
        }
    }

    function eT(d, c) {
        fP(d, function (b, h, g, f) {
            g._w = g._w || {}, c(b, g._w, g, f)
        })
    }

    function fQ(f, d, g) {
        null != d && eI(d3, f) && d3[f](d, g._a, g, f)
    }

    function fx(d, c) {
        return new Date(Date.UTC(d, c + 1, 0)).getUTCDate()
    }

    function eR(d, c) {
        return eO(this._months) ? this._months[d.month()] : this._months[b8.test(c) ? "format" : "standalone"][d.month()]
    }

    function eh(d, c) {
        return eO(this._monthsShort) ? this._monthsShort[d.month()] : this._monthsShort[b8.test(c) ? "format" : "standalone"][d.month()]
    }

    function d1(i, h, o) {
        var n, m, k, j = i.toLocaleLowerCase();
        if (!this._monthsParse) {
            for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; 12 > n; ++n) {
                k = eF([2000, n]), this._shortMonthsParse[n] = this.monthsShort(k, "").toLocaleLowerCase(), this._longMonthsParse[n] = this.months(k, "").toLocaleLowerCase()
            }
        }
        return o ? "MMM" === h ? (m = cy.call(this._shortMonthsParse, j), -1 !== m ? m : null) : (m = cy.call(this._longMonthsParse, j), -1 !== m ? m : null) : "MMM" === h ? (m = cy.call(this._shortMonthsParse, j), -1 !== m ? m : (m = cy.call(this._longMonthsParse, j), -1 !== m ? m : null)) : (m = cy.call(this._longMonthsParse, j), -1 !== m ? m : (m = cy.call(this._shortMonthsParse, j), -1 !== m ? m : null))
    }

    function dR(h, g, m) {
        var k, j, i;
        if (this._monthsParseExact) {
            return d1.call(this, h, g, m)
        }
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), k = 0; 12 > k; k++) {
            if (j = eF([2000, k]), m && !this._longMonthsParse[k] && (this._longMonthsParse[k] = new RegExp("^" + this.months(j, "").replace(".", "") + "$", "i"), this._shortMonthsParse[k] = new RegExp("^" + this.monthsShort(j, "").replace(".", "") + "$", "i")), m || this._monthsParse[k] || (i = "^" + this.months(j, "") + "|^" + this.monthsShort(j, ""), this._monthsParse[k] = new RegExp(i.replace(".", ""), "i")), m && "MMMM" === g && this._longMonthsParse[k].test(h)) {
                return k
            }
            if (m && "MMM" === g && this._shortMonthsParse[k].test(h)) {
                return k
            }
            if (!m && this._monthsParse[k].test(h)) {
                return k
            }
        }
    }

    function dH(f, d) {
        var g;
        if (!f.isValid()) {
            return f
        }
        if ("string" == typeof d) {
            if (/^\d+$/.test(d)) {
                d = ev(d)
            } else {
                if (d = f.localeData().monthsParse(d), "number" != typeof d) {
                    return f
                }
            }
        }
        return g = Math.min(f.date(), fx(f.year(), d)), f._d["set" + (f._isUTC ? "UTC" : "") + "Month"](d, g), f
    }

    function dw(a) {
        return null != a ? (dH(this, a), eS.updateOffset(this, !0), this) : fg(this, "Month")
    }

    function dl() {
        return fx(this.year(), this.month())
    }

    function c5(b) {
        return this._monthsParseExact ? (eI(this, "_monthsRegex") || cL.call(this), b ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && b ? this._monthsShortStrictRegex : this._monthsShortRegex
    }

    function cV(b) {
        return this._monthsParseExact ? (eI(this, "_monthsRegex") || cL.call(this), b ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && b ? this._monthsStrictRegex : this._monthsRegex
    }

    function cL() {
        function h(d, c) {
            return c.length - d.length
        }

        var g, m, k = [], j = [], i = [];
        for (g = 0; 12 > g; g++) {
            m = eF([2000, g]), k.push(this.monthsShort(m, "")), j.push(this.months(m, "")), i.push(this.months(m, "")), i.push(this.monthsShort(m, ""))
        }
        for (k.sort(h), j.sort(h), i.sort(h), g = 0; 12 > g; g++) {
            k[g] = eY(k[g]), j[g] = eY(j[g]), i[g] = eY(i[g])
        }
        this._monthsRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + j.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + k.join("|") + ")", "i")
    }

    function cB(f) {
        var d, g = f._a;
        return g && -2 === eD(f).overflow && (d = g[dJ] < 0 || g[dJ] > 11 ? dJ : g[dz] < 1 || g[dz] > fx(g[dT], g[dJ]) ? dz : g[dn] < 0 || g[dn] > 24 || 24 === g[dn] && (0 !== g[c7] || 0 !== g[cX] || 0 !== g[cN]) ? dn : g[c7] < 0 || g[c7] > 59 ? c7 : g[cX] < 0 || g[cX] > 59 ? cX : g[cN] < 0 || g[cN] > 999 ? cN : -1, eD(f)._overflowDayOfYear && (dT > d || d > dz) && (d = dz), eD(f)._overflowWeeks && -1 === d && (d = cD), eD(f)._overflowWeekday && -1 === d && (d = ct), eD(f).overflow = d), f
    }

    function cr(s) {
        var r, q, p, o, n, m, k = s._i, j = cj.exec(k) || ap.exec(k);
        if (j) {
            for (eD(s).iso = !0, r = 0, q = fp.length; q > r; r++) {
                if (fp[r][1].exec(j[1])) {
                    o = fp[r][0], p = fp[r][2] !== !1;
                    break
                }
            }
            if (null == o) {
                return void (s._isValid = !1)
            }
            if (j[3]) {
                for (r = 0, q = eJ.length; q > r; r++) {
                    if (eJ[r][1].exec(j[3])) {
                        n = (j[2] || " ") + eJ[r][0];
                        break
                    }
                }
                if (null == n) {
                    return void (s._isValid = !1)
                }
            }
            if (!p && null != n) {
                return void (s._isValid = !1)
            }
            if (j[4]) {
                if (!fL.exec(j[4])) {
                    return void (s._isValid = !1)
                }
                m = "Z"
            }
            s._f = o + (n || "") + (m || ""), a2(s)
        } else {
            s._isValid = !1
        }
    }

    function b6(a) {
        var d = d8.exec(a._i);
        return null !== d ? void (a._d = new Date(+d[1])) : (cr(a), void (a._isValid === !1 && (delete a._isValid, eS.createFromInputFallback(a))))
    }

    function bW(j, i, q, p, o, n, m) {
        var k = new Date(j, i, q, p, o, n, m);
        return 100 > j && j >= 0 && isFinite(k.getFullYear()) && k.setFullYear(j), k
    }

    function bM(d) {
        var c = new Date(Date.UTC.apply(null, arguments));
        return 100 > d && d >= 0 && isFinite(c.getUTCFullYear()) && c.setUTCFullYear(d), c
    }

    function bC(b) {
        return bn(b) ? 366 : 365
    }

    function bn(b) {
        return b % 4 === 0 && b % 100 !== 0 || b % 400 === 0
    }

    function a7() {
        return bn(this.year())
    }

    function aX(g, f, j) {
        var i = 7 + f - j, h = (7 + bM(g, 0, i).getUTCDay() - f) % 7;
        return -h + i - 1
    }

    function aN(u, t, s, r, q) {
        var p, o, n = (7 + s - r) % 7, m = aX(u, r, q), k = 1 + 7 * (t - 1) + n + m;
        return 0 >= k ? (p = u - 1, o = bC(p) + k) : k > bC(u) ? (p = u + 1, o = k - bC(u)) : (p = u, o = k), {
            year: p,
            dayOfYear: o
        }
    }

    function aD(i, h, o) {
        var n, m, k = aX(i.year(), h, o), j = Math.floor((i.dayOfYear() - k - 1) / 7) + 1;
        return 1 > j ? (m = i.year() - 1, n = j + an(m, h, o)) : j > an(i.year(), h, o) ? (n = j - an(i.year(), h, o), m = i.year() + 1) : (m = i.year(), n = j), {
            week: n,
            year: m
        }
    }

    function an(g, f, j) {
        var i = aX(g, f, j), h = aX(g + 1, f, j);
        return (bC(g) - i + h) / 7
    }

    function f0(f, d, g) {
        return null != f ? f : null != d ? d : g
    }

    function fJ(a) {
        var d = new Date(eS.now());
        return a._useUTC ? [d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()] : [d.getFullYear(), d.getMonth(), d.getDate()]
    }

    function bx(h) {
        var g, m, k, j, i = [];
        if (!h._d) {
            for (k = fJ(h), h._w && null == h._a[dz] && null == h._a[dJ] && bi(h), h._dayOfYear && (j = f0(h._a[dT], k[dT]), h._dayOfYear > bC(j) && (eD(h)._overflowDayOfYear = !0), m = bM(j, 0, h._dayOfYear), h._a[dJ] = m.getUTCMonth(), h._a[dz] = m.getUTCDate()), g = 0; 3 > g && null == h._a[g]; ++g) {
                h._a[g] = i[g] = k[g]
            }
            for (; 7 > g; g++) {
                h._a[g] = i[g] = null == h._a[g] ? 2 === g ? 1 : 0 : h._a[g]
            }
            24 === h._a[dn] && 0 === h._a[c7] && 0 === h._a[cX] && 0 === h._a[cN] && (h._nextDay = !0, h._a[dn] = 0), h._d = (h._useUTC ? bM : bW).apply(null, i), null != h._tzm && h._d.setUTCMinutes(h._d.getUTCMinutes() - h._tzm), h._nextDay && (h._a[dn] = 24)
        }
    }

    function bi(s) {
        var r, q, p, o, n, m, k, j;
        r = s._w, null != r.GG || null != r.W || null != r.E ? (n = 1, m = 4, q = f0(r.GG, s._a[dT], aD(eo(), 1, 4).year), p = f0(r.W, 1), o = f0(r.E, 1), (1 > o || o > 7) && (j = !0)) : (n = s._locale._week.dow, m = s._locale._week.doy, q = f0(r.gg, s._a[dT], aD(eo(), n, m).year), p = f0(r.w, 1), null != r.d ? (o = r.d, (0 > o || o > 6) && (j = !0)) : null != r.e ? (o = r.e + n, (r.e < 0 || r.e > 6) && (j = !0)) : o = n), 1 > p || p > an(q, n, m) ? eD(s)._overflowWeeks = !0 : null != j ? eD(s)._overflowWeekday = !0 : (k = aN(q, p, o, n, m), s._a[dT] = k.year, s._dayOfYear = k.dayOfYear)
    }

    function a2(s) {
        if (s._f === eS.ISO_8601) {
            return void cr(s)
        }
        s._a = [], eD(s).empty = !0;
        var r, q, p, o, n, m = "" + s._i, j = m.length, a = 0;
        for (p = e3(s._f, s._locale).match(bT) || [], r = 0; r < p.length; r++) {
            o = p[r], q = (m.match(e1(o, s)) || [])[0], q && (n = m.substr(0, m.indexOf(q)), n.length > 0 && eD(s).unusedInput.push(n), m = m.slice(m.indexOf(q) + q.length), a += q.length), bk[o] ? (q ? eD(s).empty = !1 : eD(s).unusedTokens.push(o), fQ(o, q, s)) : s._strict && !q && eD(s).unusedTokens.push(o)
        }
        eD(s).charsLeftOver = j - a, m.length > 0 && eD(s).unusedInput.push(m), eD(s).bigHour === !0 && s._a[dn] <= 12 && s._a[dn] > 0 && (eD(s).bigHour = void 0), eD(s).parsedDateParts = s._a.slice(0), eD(s).meridiem = s._meridiem, s._a[dn] = aS(s._locale, s._a[dn], s._meridiem), bx(s), cB(s)
    }

    function aS(g, f, i) {
        var h;
        return null == i ? f : null != g.meridiemHour ? g.meridiemHour(f, i) : null != g.isPM ? (h = g.isPM(i), h && 12 > f && (f += 12), h || 12 !== f || (f = 0), f) : f
    }

    function aI(h) {
        var g, m, k, j, i;
        if (0 === h._f.length) {
            return eD(h).invalidFormat = !0, void (h._d = new Date(NaN))
        }
        for (j = 0; j < h._f.length; j++) {
            i = 0, g = ez({}, h), null != h._useUTC && (g._useUTC = h._useUTC), g._f = h._f[j], a2(g), eC(g) && (i += eD(g).charsLeftOver, i += 10 * eD(g).unusedTokens.length, eD(g).score = i, (null == k || k > i) && (k = i, m = g))
        }
        eH(h, m || g)
    }

    function ay(d) {
        if (!d._d) {
            var c = fi(d._i);
            d._a = eK([c.year, c.month, c.day || c.date, c.hour, c.minute, c.second, c.millisecond], function (b) {
                return b && parseInt(b, 10)
            }), bx(d)
        }
    }

    function ai(d) {
        var c = new ey(cB(fV(d)));
        return c._nextDay && (c.add(1, "d"), c._nextDay = void 0), c
    }

    function fV(d) {
        var c = d._i, f = d._f;
        return d._locale = d._locale || fn(d._l), null === c || void 0 === f && "" === c ? eB({nullInput: !0}) : ("string" == typeof c && (d._i = c = d._locale.preparse(c)), ex(c) ? new ey(cB(c)) : (eO(f) ? aI(d) : f ? a2(d) : eM(c) ? d._d = c : fE(d), eC(d) || (d._d = null), d))
    }

    function fE(a) {
        var c = a._i;
        void 0 === c ? a._d = new Date(eS.now()) : eM(c) ? a._d = new Date(c.valueOf()) : "string" == typeof c ? b6(a) : eO(c) ? (a._a = eK(c.slice(0), function (b) {
            return parseInt(b, 10)
        }), bx(a)) : "object" == typeof c ? ay(a) : "number" == typeof c ? a._d = new Date(c) : eS.createFromInputFallback(a)
    }

    function eZ(h, g, m, k, j) {
        var i = {};
        return "boolean" == typeof m && (k = m, m = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = j, i._l = m, i._i = h, i._f = g, i._strict = k, ai(i)
    }

    function eo(g, f, i, h) {
        return eZ(g, f, i, h, !1)
    }

    function d6(f, c) {
        var h, g;
        if (1 === c.length && eO(c[0]) && (c = c[0]), !c.length) {
            return eo()
        }
        for (h = c[0], g = 1; g < c.length; ++g) {
            (!c[g].isValid() || c[g][f](h)) && (h = c[g])
        }
        return h
    }

    function dW() {
        var b = [].slice.call(arguments, 0);
        return d6("isBefore", b)
    }

    function dM() {
        var b = [].slice.call(arguments, 0);
        return d6("isAfter", b)
    }

    function dC(w) {
        var v = fi(w), u = v.year || 0, t = v.quarter || 0, s = v.month || 0, r = v.week || 0, q = v.day || 0,
            p = v.hour || 0, o = v.minute || 0, n = v.second || 0, m = v.millisecond || 0;
        this._milliseconds = +m + 1000 * n + 60000 * o + 1000 * p * 60 * 60, this._days = +q + 7 * r, this._months = +s + 3 * t + 12 * u, this._data = {}, this._locale = fn(), this._bubble()
    }

    function dr(b) {
        return b instanceof dC
    }

    function dg(d, c) {
        e7(d, 0, 0, function () {
            var b = this.utcOffset(), f = "+";
            return 0 > b && (b = -b, f = "-"), f + e8(~~(b / 60), 2) + c + e8(~~b % 60, 2)
        })
    }

    function c0(h, g) {
        var m = (g || "").match(h) || [], k = m[m.length - 1] || [], j = (k + "").match(dh) || ["-", 0, 0],
            i = +(60 * j[1]) + ev(j[2]);
        return "+" === j[0] ? i : -i
    }

    function cQ(a, h) {
        var g, d;
        return h._isUTC ? (g = h.clone(), d = (ex(a) || eM(a) ? a.valueOf() : eo(a).valueOf()) - g.valueOf(), g._d.setTime(g._d.valueOf() + d), eS.updateOffset(g, !1), g) : eo(a).local()
    }

    function cG(b) {
        return 15 * -Math.round(b._d.getTimezoneOffset() / 15)
    }

    function cw(a, h) {
        var g, f = this._offset || 0;
        return this.isValid() ? null != a ? ("string" == typeof a ? a = c0(fS, a) : Math.abs(a) < 16 && (a = 60 * a), !this._isUTC && h && (g = cG(this)), this._offset = a, this._isUTC = !0, null != g && this.add(g, "m"), f !== a && (!h || this._changeInProgress ? c4(this, eg(a - f, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, eS.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? f : cG(this) : null != a ? this : NaN
    }

    function ch(d, c) {
        return null != d ? ("string" != typeof d && (d = -d), this.utcOffset(d, c), this) : -this.utcOffset()
    }

    function b1(b) {
        return this.utcOffset(0, b)
    }

    function bR(b) {
        return this._isUTC && (this.utcOffset(0, b), this._isUTC = !1, b && this.subtract(cG(this), "m")), this
    }

    function bH() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(c0(f2, this._i)), this
    }

    function bs(b) {
        return this.isValid() ? (b = b ? eo(b).utcOffset() : 0, (this.utcOffset() - b) % 60 === 0) : !1
    }

    function cm() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }

    function at() {
        if (!eA(this._isDSTShifted)) {
            return this._isDSTShifted
        }
        var d = {};
        if (ez(d, this), d = fV(d), d._a) {
            var c = d._isUTC ? eF(d._a) : eo(d._a);
            this._isDSTShifted = this.isValid() && eu(d._a, c.toArray()) > 0
        } else {
            this._isDSTShifted = !1
        }
        return this._isDSTShifted
    }

    function fO() {
        return this.isValid() ? !this._isUTC : !1
    }

    function fv() {
        return this.isValid() ? this._isUTC : !1
    }

    function eP() {
        return this.isValid() ? this._isUTC && 0 === this._offset : !1
    }

    function eg(i, f) {
        var o, n, m, k = i, j = null;
        return dr(i) ? k = {
            ms: i._milliseconds,
            d: i._days,
            M: i._months
        } : "number" == typeof i ? (k = {}, f ? k[f] = i : k.milliseconds = i) : (j = c1.exec(i)) ? (o = "-" === j[1] ? -1 : 1, k = {
            y: 0,
            d: ev(j[dz]) * o,
            h: ev(j[dn]) * o,
            m: ev(j[c7]) * o,
            s: ev(j[cX]) * o,
            ms: ev(j[cN]) * o
        }) : (j = cR.exec(i)) ? (o = "-" === j[1] ? -1 : 1, k = {
            y: d0(j[2], o),
            M: d0(j[3], o),
            w: d0(j[4], o),
            d: d0(j[5], o),
            h: d0(j[6], o),
            m: d0(j[7], o),
            s: d0(j[8], o)
        }) : null == k ? k = {} : "object" == typeof k && ("from" in k || "to" in k) && (m = dG(eo(k.from), eo(k.to)), k = {}, k.ms = m.milliseconds, k.M = m.months), n = new dC(k), dr(i) && eI(i, "_locale") && (n._locale = i._locale), n
    }

    function d0(f, d) {
        var g = f && parseFloat(f.replace(",", "."));
        return (isNaN(g) ? 0 : g) * d
    }

    function dQ(f, d) {
        var g = {milliseconds: 0, months: 0};
        return g.months = d.month() - f.month() + 12 * (d.year() - f.year()), f.clone().add(g.months, "M").isAfter(d) && --g.months, g.milliseconds = +d - +f.clone().add(g.months, "M"), g
    }

    function dG(f, d) {
        var g;
        return f.isValid() && d.isValid() ? (d = cQ(d, f), f.isBefore(d) ? g = dQ(f, d) : (g = dQ(d, f), g.milliseconds = -g.milliseconds, g.months = -g.months), g) : {
            milliseconds: 0,
            months: 0
        }
    }

    function dv(b) {
        return 0 > b ? -1 * Math.round(-1 * b) : Math.round(b)
    }

    function dk(d, c) {
        return function (h, g) {
            var b, a;
            return null === g || isNaN(+g) || (er(c, "moment()." + c + "(period, number) is deprecated. Please use moment()." + c + "(number, period)."), a = h, h = g, g = a), h = "string" == typeof h ? +h : h, b = eg(h, g), c4(this, b, d), this
        }
    }

    function c4(a, o, n, m) {
        var k = o._milliseconds, j = dv(o._days), i = dv(o._months);
        a.isValid() && (m = null == m ? !0 : m, k && a._d.setTime(a._d.valueOf() + k * n), j && ff(a, "Date", fg(a, "Date") + j * n), i && dH(a, fg(a, "Month") + i * n), m && eS.updateOffset(a, j || i))
    }

    function cU(i, h) {
        var o = i || eo(), n = cQ(o, this).startOf("day"), m = this.diff(n, "days", !0),
            k = -6 > m ? "sameElse" : -1 > m ? "lastWeek" : 0 > m ? "lastDay" : 1 > m ? "sameDay" : 2 > m ? "nextDay" : 7 > m ? "nextWeek" : "sameElse",
            j = h && (eq(h[k]) ? h[k]() : h[k]);
        return this.format(j || this.localeData().calendar(k, this, eo(o)))
    }

    function cK() {
        return new ey(this)
    }

    function cA(f, d) {
        var g = ex(f) ? f : eo(f);
        return this.isValid() && g.isValid() ? (d = fj(eA(d) ? "millisecond" : d), "millisecond" === d ? this.valueOf() > g.valueOf() : g.valueOf() < this.clone().startOf(d).valueOf()) : !1
    }

    function cq(f, d) {
        var g = ex(f) ? f : eo(f);
        return this.isValid() && g.isValid() ? (d = fj(eA(d) ? "millisecond" : d), "millisecond" === d ? this.valueOf() < g.valueOf() : this.clone().endOf(d).valueOf() < g.valueOf()) : !1
    }

    function b5(g, f, i, h) {
        return h = h || "()", ("(" === h[0] ? this.isAfter(g, i) : !this.isBefore(g, i)) && (")" === h[1] ? this.isBefore(f, i) : !this.isAfter(f, i))
    }

    function bV(g, f) {
        var i, h = ex(g) ? g : eo(g);
        return this.isValid() && h.isValid() ? (f = fj(f || "millisecond"), "millisecond" === f ? this.valueOf() === h.valueOf() : (i = h.valueOf(), this.clone().startOf(f).valueOf() <= i && i <= this.clone().endOf(f).valueOf())) : !1
    }

    function bL(d, c) {
        return this.isSame(d, c) || this.isAfter(d, c)
    }

    function bB(d, c) {
        return this.isSame(d, c) || this.isBefore(d, c)
    }

    function bm(i, h, o) {
        var n, m, k, j;
        return this.isValid() ? (n = cQ(i, this), n.isValid() ? (m = 60000 * (n.utcOffset() - this.utcOffset()), h = fj(h), "year" === h || "month" === h || "quarter" === h ? (j = a6(this, n), "quarter" === h ? j /= 3 : "year" === h && (j /= 12)) : (k = this - n, j = "second" === h ? k / 1000 : "minute" === h ? k / 60000 : "hour" === h ? k / 3600000 : "day" === h ? (k - m) / 86400000 : "week" === h ? (k - m) / 604800000 : k), o ? j : ew(j)) : NaN) : NaN
    }

    function a6(h, g) {
        var m, k, j = 12 * (g.year() - h.year()) + (g.month() - h.month()), i = h.clone().add(j, "months");
        return 0 > g - i ? (m = h.clone().add(j - 1, "months"), k = (g - i) / (i - m)) : (m = h.clone().add(j + 1, "months"), k = (g - i) / (m - i)), -(j + k) || 0
    }

    function aW() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function aM() {
        var b = this.clone().utc();
        return 0 < b.year() && b.year() <= 9999 ? eq(Date.prototype.toISOString) ? this.toDate().toISOString() : e4(b, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : e4(b, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }

    function aC(a) {
        a || (a = this.isUtc() ? eS.defaultFormatUtc : eS.defaultFormat);
        var d = e4(this, a);
        return this.localeData().postformat(d)
    }

    function am(d, c) {
        return this.isValid() && (ex(d) && d.isValid() || eo(d).isValid()) ? eg({
            to: this,
            from: d
        }).locale(this.locale()).humanize(!c) : this.localeData().invalidDate()
    }

    function fZ(b) {
        return this.from(eo(), b)
    }

    function fI(d, c) {
        return this.isValid() && (ex(d) && d.isValid() || eo(d).isValid()) ? eg({
            from: this,
            to: d
        }).locale(this.locale()).humanize(!c) : this.localeData().invalidDate()
    }

    function bw(b) {
        return this.to(eo(), b)
    }

    function bh(d) {
        var c;
        return void 0 === d ? this._locale._abbr : (c = fn(d), null != c && (this._locale = c), this)
    }

    function a1() {
        return this._locale
    }

    function aR(b) {
        switch (b = fj(b)) {
            case"year":
                this.month(0);
            case"quarter":
            case"month":
                this.date(1);
            case"week":
            case"isoWeek":
            case"day":
            case"date":
                this.hours(0);
            case"hour":
                this.minutes(0);
            case"minute":
                this.seconds(0);
            case"second":
                this.milliseconds(0)
        }
        return "week" === b && this.weekday(0), "isoWeek" === b && this.isoWeekday(1), "quarter" === b && this.month(3 * Math.floor(this.month() / 3)), this
    }

    function aH(b) {
        return b = fj(b), void 0 === b || "millisecond" === b ? this : ("date" === b && (b = "day"), this.startOf(b).add(1, "isoWeek" === b ? "week" : b).subtract(1, "ms"))
    }

    function ax() {
        return this._d.valueOf() - 60000 * (this._offset || 0)
    }

    function ah() {
        return Math.floor(this.valueOf() / 1000)
    }

    function fU() {
        return this._offset ? new Date(this.valueOf()) : this._d
    }

    function fD() {
        var b = this;
        return [b.year(), b.month(), b.date(), b.hour(), b.minute(), b.second(), b.millisecond()]
    }

    function eX() {
        var b = this;
        return {
            years: b.year(),
            months: b.month(),
            date: b.date(),
            hours: b.hours(),
            minutes: b.minutes(),
            seconds: b.seconds(),
            milliseconds: b.milliseconds()
        }
    }

    function em() {
        return this.isValid() ? this.toISOString() : null
    }

    function d5() {
        return eC(this)
    }

    function dV() {
        return eH({}, eD(this))
    }

    function dL() {
        return eD(this).overflow
    }

    function dB() {
        return {input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict}
    }

    function dq(d, c) {
        e7(0, [d, d.length], 0, c)
    }

    function c9(b) {
        return cv.call(this, b, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }

    function cZ(b) {
        return cv.call(this, b, this.isoWeek(), this.isoWeekday(), 1, 4)
    }

    function cP() {
        return an(this.year(), 1, 4)
    }

    function cF() {
        var b = this.localeData()._week;
        return an(this.year(), b.dow, b.doy)
    }

    function cv(h, g, m, k, j) {
        var i;
        return null == h ? aD(this, k, j).year : (i = an(h, k, j), g > i && (g = i), cg.call(this, h, g, m, k, j))
    }

    function cg(i, h, o, n, m) {
        var k = aN(i, h, o, n, m), j = bM(k.year, 0, k.dayOfYear);
        return this.year(j.getUTCFullYear()), this.month(j.getUTCMonth()), this.date(j.getUTCDate()), this
    }

    function b0(b) {
        return null == b ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (b - 1) + this.month() % 3)
    }

    function bQ(b) {
        return aD(b, this._week.dow, this._week.doy).week
    }

    function bG() {
        return this._week.dow
    }

    function br() {
        return this._week.doy
    }

    function cl(d) {
        var c = this.localeData().week(this);
        return null == d ? c : this.add(7 * (d - c), "d")
    }

    function ar(d) {
        var c = aD(this, 1, 4).week;
        return null == d ? c : this.add(7 * (d - c), "d")
    }

    function fN(d, c) {
        return "string" != typeof d ? d : isNaN(d) ? (d = c.weekdaysParse(d), "number" == typeof d ? d : null) : parseInt(d, 10)
    }

    function ft(d, c) {
        return eO(this._weekdays) ? this._weekdays[d.day()] : this._weekdays[this._weekdays.isFormat.test(c) ? "format" : "standalone"][d.day()]
    }

    function eN(b) {
        return this._weekdaysShort[b.day()]
    }

    function ef(b) {
        return this._weekdaysMin[b.day()]
    }

    function dZ(i, h, o) {
        var n, m, k, j = i.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; 7 > n; ++n) {
                k = eF([2000, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(k, "").toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(k, "").toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(k, "").toLocaleLowerCase()
            }
        }
        return o ? "dddd" === h ? (m = cy.call(this._weekdaysParse, j), -1 !== m ? m : null) : "ddd" === h ? (m = cy.call(this._shortWeekdaysParse, j), -1 !== m ? m : null) : (m = cy.call(this._minWeekdaysParse, j), -1 !== m ? m : null) : "dddd" === h ? (m = cy.call(this._weekdaysParse, j), -1 !== m ? m : (m = cy.call(this._shortWeekdaysParse, j), -1 !== m ? m : (m = cy.call(this._minWeekdaysParse, j), -1 !== m ? m : null))) : "ddd" === h ? (m = cy.call(this._shortWeekdaysParse, j), -1 !== m ? m : (m = cy.call(this._weekdaysParse, j), -1 !== m ? m : (m = cy.call(this._minWeekdaysParse, j), -1 !== m ? m : null))) : (m = cy.call(this._minWeekdaysParse, j), -1 !== m ? m : (m = cy.call(this._weekdaysParse, j), -1 !== m ? m : (m = cy.call(this._shortWeekdaysParse, j), -1 !== m ? m : null)))
    }

    function dP(h, g, m) {
        var k, j, i;
        if (this._weekdaysParseExact) {
            return dZ.call(this, h, g, m)
        }
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), k = 0; 7 > k; k++) {
            if (j = eF([2000, 1]).day(k), m && !this._fullWeekdaysParse[k] && (this._fullWeekdaysParse[k] = new RegExp("^" + this.weekdays(j, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[k] = new RegExp("^" + this.weekdaysShort(j, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[k] = new RegExp("^" + this.weekdaysMin(j, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[k] || (i = "^" + this.weekdays(j, "") + "|^" + this.weekdaysShort(j, "") + "|^" + this.weekdaysMin(j, ""), this._weekdaysParse[k] = new RegExp(i.replace(".", ""), "i")), m && "dddd" === g && this._fullWeekdaysParse[k].test(h)) {
                return k
            }
            if (m && "ddd" === g && this._shortWeekdaysParse[k].test(h)) {
                return k
            }
            if (m && "dd" === g && this._minWeekdaysParse[k].test(h)) {
                return k
            }
            if (!m && this._weekdaysParse[k].test(h)) {
                return k
            }
        }
    }

    function dF(d) {
        if (!this.isValid()) {
            return null != d ? this : NaN
        }
        var c = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != d ? (d = fN(d, this.localeData()), this.add(d - c, "d")) : c
    }

    function du(d) {
        if (!this.isValid()) {
            return null != d ? this : NaN
        }
        var c = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == d ? c : this.add(d - c, "d")
    }

    function dj(b) {
        return this.isValid() ? null == b ? this.day() || 7 : this.day(this.day() % 7 ? b : b - 7) : null != b ? this : NaN
    }

    function c3(b) {
        return this._weekdaysParseExact ? (eI(this, "_weekdaysRegex") || cz.call(this), b ? this._weekdaysStrictRegex : this._weekdaysRegex) : this._weekdaysStrictRegex && b ? this._weekdaysStrictRegex : this._weekdaysRegex
    }

    function cT(b) {
        return this._weekdaysParseExact ? (eI(this, "_weekdaysRegex") || cz.call(this), b ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : this._weekdaysShortStrictRegex && b ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex
    }

    function cJ(b) {
        return this._weekdaysParseExact ? (eI(this, "_weekdaysRegex") || cz.call(this), b ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : this._weekdaysMinStrictRegex && b ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex
    }

    function cz() {
        function u(d, c) {
            return c.length - d.length
        }

        var t, s, r, q, p, o = [], n = [], m = [], h = [];
        for (t = 0; 7 > t; t++) {
            s = eF([2000, 1]).day(t), r = this.weekdaysMin(s, ""), q = this.weekdaysShort(s, ""), p = this.weekdays(s, ""), o.push(r), n.push(q), m.push(p), h.push(r), h.push(q), h.push(p)
        }
        for (o.sort(u), n.sort(u), m.sort(u), h.sort(u), t = 0; 7 > t; t++) {
            n[t] = eY(n[t]), m[t] = eY(m[t]), h[t] = eY(h[t])
        }
        this._weekdaysRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + m.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + o.join("|") + ")", "i")
    }

    function cp(d) {
        var c = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 86400000) + 1;
        return null == d ? c : this.add(d - c, "d")
    }

    function b4() {
        return this.hours() % 12 || 12
    }

    function bU() {
        return this.hours() || 24
    }

    function bK(d, c) {
        e7(d, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), c)
        })
    }

    function bA(d, c) {
        return c._meridiemParse
    }

    function bl(b) {
        return "p" === (b + "").toLowerCase().charAt(0)
    }

    function a5(f, d, g) {
        return f > 11 ? g ? "pm" : "PM" : g ? "am" : "AM"
    }

    function aV(d, c) {
        c[cN] = ev(1000 * ("0." + d))
    }

    function aL() {
        return this._isUTC ? "UTC" : ""
    }

    function aB() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }

    function al(b) {
        return eo(1000 * b)
    }

    function fY() {
        return eo.apply(null, arguments).parseZone()
    }

    function fH(g, f, i) {
        var h = this._calendar[g];
        return eq(h) ? h.call(f, i) : h
    }

    function bv(f) {
        var d = this._longDateFormat[f], g = this._longDateFormat[f.toUpperCase()];
        return d || !g ? d : (this._longDateFormat[f] = g.replace(/MMMM|MM|DD|dddd/g, function (b) {
            return b.slice(1)
        }), this._longDateFormat[f])
    }

    function bg() {
        return this._invalidDate
    }

    function a0(b) {
        return this._ordinal.replace("%d", b)
    }

    function aQ(b) {
        return b
    }

    function aG(g, f, j, i) {
        var h = this._relativeTime[j];
        return eq(h) ? h(g, f, j, i) : h.replace(/%d/i, g)
    }

    function aw(f, d) {
        var g = this._relativeTime[f > 0 ? "future" : "past"];
        return eq(g) ? g(d) : g.replace(/%s/i, d)
    }

    function ag(h, g, m, k) {
        var j = fn(), i = eF().set(k, g);
        return j[m](i, h)
    }

    function fT(g, f, j) {
        if ("number" == typeof g && (f = g, g = void 0), g = g || "", null != f) {
            return ag(g, f, j, "month")
        }
        var i, h = [];
        for (i = 0; 12 > i; i++) {
            h[i] = ag(g, i, j, "month")
        }
        return h
    }

    function fC(j, i, q, p) {
        "boolean" == typeof j ? ("number" == typeof i && (q = i, i = void 0), i = i || "") : (i = j, q = i, j = !1, "number" == typeof i && (q = i, i = void 0), i = i || "");
        var o = fn(), n = j ? o._week.dow : 0;
        if (null != q) {
            return ag(i, (q + n) % 7, p, "day")
        }
        var m, k = [];
        for (m = 0; 7 > m; m++) {
            k[m] = ag(i, (m + n) % 7, p, "day")
        }
        return k
    }

    function eW(d, c) {
        return fT(d, c, "months")
    }

    function ek(d, c) {
        return fT(d, c, "monthsShort")
    }

    function d4(f, d, g) {
        return fC(f, d, g, "weekdays")
    }

    function dU(f, d, g) {
        return fC(f, d, g, "weekdaysShort")
    }

    function dK(f, d, g) {
        return fC(f, d, g, "weekdaysMin")
    }

    function dA() {
        var b = this._data;
        return this._milliseconds = d2(this._milliseconds), this._days = d2(this._days), this._months = d2(this._months), b.milliseconds = d2(b.milliseconds), b.seconds = d2(b.seconds), b.minutes = d2(b.minutes), b.hours = d2(b.hours), b.months = d2(b.months), b.years = d2(b.years), this
    }

    function dp(g, f, j, i) {
        var h = eg(f, j);
        return g._milliseconds += i * h._milliseconds, g._days += i * h._days, g._months += i * h._months, g._bubble()
    }

    function c8(d, c) {
        return dp(this, d, c, 1)
    }

    function cY(d, c) {
        return dp(this, d, c, -1)
    }

    function cO(b) {
        return 0 > b ? Math.floor(b) : Math.ceil(b)
    }

    function cE() {
        var s, r, q, p, o, n = this._milliseconds, m = this._days, k = this._months, j = this._data;
        return n >= 0 && m >= 0 && k >= 0 || 0 >= n && 0 >= m && 0 >= k || (n += 86400000 * cO(b9(k) + m), m = 0, k = 0), j.milliseconds = n % 1000, s = ew(n / 1000), j.seconds = s % 60, r = ew(s / 60), j.minutes = r % 60, q = ew(r / 60), j.hours = q % 24, m += ew(q / 24), o = ew(cu(m)), k += o, m -= cO(b9(o)), p = ew(k / 12), k %= 12, j.days = m, j.months = k, j.years = p, this
    }

    function cu(b) {
        return 4800 * b / 146097
    }

    function b9(b) {
        return 146097 * b / 4800
    }

    function bZ(g) {
        var f, i, h = this._milliseconds;
        if (g = fj(g), "month" === g || "year" === g) {
            return f = this._days + h / 86400000, i = this._months + cu(f), "month" === g ? i : i / 12
        }
        switch (f = this._days + Math.round(b9(this._months)), g) {
            case"week":
                return f / 7 + h / 604800000;
            case"day":
                return f + h / 86400000;
            case"hour":
                return 24 * f + h / 3600000;
            case"minute":
                return 1440 * f + h / 60000;
            case"second":
                return 86400 * f + h / 1000;
            case"millisecond":
                return Math.floor(86400000 * f) + h;
            default:
                throw new Error("Unknown unit " + g)
        }
    }

    function bP() {
        return this._milliseconds + 86400000 * this._days + this._months % 12 * 2592000000 + 31536000000 * ev(this._months / 12)
    }

    function bF(b) {
        return function () {
            return this.as(b)
        }
    }

    function bq(b) {
        return b = fj(b), this[b + "s"]()
    }

    function ck(b) {
        return function () {
            return this._data[b]
        }
    }

    function aq() {
        return ew(this.days() / 7)
    }

    function fM(g, f, j, i, h) {
        return h.relativeTime(f || 1, !!j, g, i)
    }

    function fr(w, v, u) {
        var t = eg(w).abs(), s = ao(t.as("s")), r = ao(t.as("m")), q = ao(t.as("h")), p = ao(t.as("d")),
            o = ao(t.as("M")), n = ao(t.as("y")),
            m = s < fK.s && ["s", s] || 1 >= r && ["m"] || r < fK.m && ["mm", r] || 1 >= q && ["h"] || q < fK.h && ["hh", q] || 1 >= p && ["d"] || p < fK.d && ["dd", p] || 1 >= o && ["M"] || o < fK.M && ["MM", o] || 1 >= n && ["y"] || ["yy", n];
        return m[2] = v, m[3] = +w > 0, m[4] = u, fM.apply(null, m)
    }

    function eL(d, c) {
        return void 0 === fK[d] ? !1 : void 0 === c ? fK[d] : (fK[d] = c, !0)
    }

    function d9(f) {
        var d = this.localeData(), g = fr(this, !f, d);
        return f && (g = d.pastFuture(+this, g)), d.postformat(g)
    }

    function dY() {
        var A, z, y, w = fm(this._milliseconds) / 1000, v = fm(this._days), u = fm(this._months);
        A = ew(w / 60), z = ew(A / 60), w %= 60, A %= 60, y = ew(u / 12), u %= 12;
        var t = y, s = u, r = v, q = z, p = A, o = w, n = this.asSeconds();
        return n ? (0 > n ? "-" : "") + "P" + (t ? t + "Y" : "") + (s ? s + "M" : "") + (r ? r + "D" : "") + (q || p || o ? "T" : "") + (q ? q + "H" : "") + (p ? p + "M" : "") + (o ? o + "S" : "") : "P0D"
    }

    var dO, dE;
    dE = Array.prototype.some ? Array.prototype.some : function (g) {
        for (var f = Object(this), i = f.length >>> 0, h = 0; i > h; h++) {
            if (h in f && g.call(this, f[h], h, f)) {
                return !0
            }
        }
        return !1
    };
    var dt = eS.momentProperties = [], di = !1, c2 = {};
    eS.suppressDeprecationWarnings = !1, eS.deprecationHandler = null;
    var cS;
    cS = Object.keys ? Object.keys : function (f) {
        var d, g = [];
        for (d in f) {
            eI(f, d) && g.push(d)
        }
        return g
    };
    var cI, cy, co = {}, b3 = {},
        bT = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        bJ = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, bz = {}, bk = {}, a4 = /\d/, aU = /\d\d/, aK = /\d{3}/,
        aA = /\d{4}/, ak = /[+-]?\d{6}/, fX = /\d\d?/, fG = /\d\d\d\d?/, bu = /\d\d\d\d\d\d?/, a9 = /\d{1,3}/,
        aZ = /\d{1,4}/, aP = /[+-]?\d{1,6}/, aF = /\d+/, av = /[+-]?\d+/, f2 = /Z|[+-]\d\d:?\d\d/gi,
        fS = /Z|[+-]\d\d(?::?\d\d)?/gi, fB = /[+-]?\d+(\.\d{1,3})?/,
        eV = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        ej = {}, d3 = {}, dT = 0, dJ = 1, dz = 2, dn = 3, c7 = 4, cX = 5, cN = 6, cD = 7, ct = 8;
    cy = Array.prototype.indexOf ? Array.prototype.indexOf : function (d) {
        var c;
        for (c = 0; c < this.length; ++c) {
            if (this[c] === d) {
                return c
            }
        }
        return -1
    }, e7("M", ["MM", 2], "Mo", function () {
        return this.month() + 1
    }), e7("MMM", 0, 0, function (b) {
        return this.localeData().monthsShort(this, b)
    }), e7("MMMM", 0, 0, function (b) {
        return this.localeData().months(this, b)
    }), fk("month", "M"), e2("M", fX), e2("MM", fX, aU), e2("MMM", function (d, c) {
        return c.monthsShortRegex(d)
    }), e2("MMMM", function (d, c) {
        return c.monthsRegex(d)
    }), fP(["M", "MM"], function (d, c) {
        c[dJ] = ev(d) - 1
    }), fP(["MMM", "MMMM"], function (g, f, j, i) {
        var h = j._locale.monthsParse(g, i, j._strict);
        null != h ? f[dJ] = h : eD(j).invalidMonth = g
    });
    var b8 = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
        bY = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        bO = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), bE = eV, bp = eV,
        cj = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
        ap = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
        fL = /Z|[+-]\d\d(?::?\d\d)?/,
        fp = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
        eJ = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
        d8 = /^\/?Date\((\-?\d+)/i;
    eS.createFromInputFallback = es("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (b) {
        b._d = new Date(b._i + (b._useUTC ? " UTC" : ""))
    }), e7("Y", 0, 0, function () {
        var b = this.year();
        return 9999 >= b ? "" + b : "+" + b
    }), e7(0, ["YY", 2], 0, function () {
        return this.year() % 100
    }), e7(0, ["YYYY", 4], 0, "year"), e7(0, ["YYYYY", 5], 0, "year"), e7(0, ["YYYYYY", 6, !0], 0, "year"), fk("year", "y"), e2("Y", av), e2("YY", fX, aU), e2("YYYY", aZ, aA), e2("YYYYY", aP, ak), e2("YYYYYY", aP, ak), fP(["YYYYY", "YYYYYY"], dT), fP("YYYY", function (a, d) {
        d[dT] = 2 === a.length ? eS.parseTwoDigitYear(a) : ev(a)
    }), fP("YY", function (a, d) {
        d[dT] = eS.parseTwoDigitYear(a)
    }), fP("Y", function (d, c) {
        c[dT] = parseInt(d, 10)
    }), eS.parseTwoDigitYear = function (b) {
        return ev(b) + (ev(b) > 68 ? 1900 : 2000)
    };
    var dX = fh("FullYear", !0);
    eS.ISO_8601 = function () {
    };
    var dN = es("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
            var b = eo.apply(null, arguments);
            return this.isValid() && b.isValid() ? this > b ? this : b : eB()
        }),
        dD = es("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
            var b = eo.apply(null, arguments);
            return this.isValid() && b.isValid() ? b > this ? this : b : eB()
        }), ds = function () {
            return Date.now ? Date.now() : +new Date
        };
    dg("Z", ":"), dg("ZZ", ""), e2("Z", fS), e2("ZZ", fS), fP(["Z", "ZZ"], function (f, d, g) {
        g._useUTC = !0, g._tzm = c0(fS, f)
    });
    var dh = /([\+\-]|\d\d)/gi;
    eS.updateOffset = function () {
    };
    var c1 = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
        cR = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
    eg.fn = dC.prototype;
    var cH = dk(1, "add"), cx = dk(-1, "subtract");
    eS.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", eS.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var cn = es("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (b) {
        return void 0 === b ? this.localeData() : this.locale(b)
    });
    e7(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100
    }), e7(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100
    }), dq("gggg", "weekYear"), dq("ggggg", "weekYear"), dq("GGGG", "isoWeekYear"), dq("GGGGG", "isoWeekYear"), fk("weekYear", "gg"), fk("isoWeekYear", "GG"), e2("G", av), e2("g", av), e2("GG", fX, aU), e2("gg", fX, aU), e2("GGGG", aZ, aA), e2("gggg", aZ, aA), e2("GGGGG", aP, ak), e2("ggggg", aP, ak), eT(["gggg", "ggggg", "GGGG", "GGGGG"], function (g, f, i, h) {
        f[h.substr(0, 2)] = ev(g)
    }), eT(["gg", "GG"], function (a, h, g, f) {
        h[f] = eS.parseTwoDigitYear(a)
    }), e7("Q", 0, "Qo", "quarter"), fk("quarter", "Q"), e2("Q", a4), fP("Q", function (d, c) {
        c[dJ] = 3 * (ev(d) - 1)
    }), e7("w", ["ww", 2], "wo", "week"), e7("W", ["WW", 2], "Wo", "isoWeek"), fk("week", "w"), fk("isoWeek", "W"), e2("w", fX), e2("ww", fX, aU), e2("W", fX), e2("WW", fX, aU), eT(["w", "ww", "W", "WW"], function (g, f, i, h) {
        f[h.substr(0, 1)] = ev(g)
    });
    var b2 = {dow: 0, doy: 6};
    e7("D", ["DD", 2], "Do", "date"), fk("date", "D"), e2("D", fX), e2("DD", fX, aU), e2("Do", function (d, c) {
        return d ? c._ordinalParse : c._ordinalParseLenient
    }), fP(["D", "DD"], dz), fP("Do", function (d, c) {
        c[dz] = ev(d.match(fX)[0], 10)
    });
    var bS = fh("Date", !0);
    e7("d", 0, "do", "day"), e7("dd", 0, 0, function (b) {
        return this.localeData().weekdaysMin(this, b)
    }), e7("ddd", 0, 0, function (b) {
        return this.localeData().weekdaysShort(this, b)
    }), e7("dddd", 0, 0, function (b) {
        return this.localeData().weekdays(this, b)
    }), e7("e", 0, 0, "weekday"), e7("E", 0, 0, "isoWeekday"), fk("day", "d"), fk("weekday", "e"), fk("isoWeekday", "E"), e2("d", fX), e2("e", fX), e2("E", fX), e2("dd", function (d, c) {
        return c.weekdaysMinRegex(d)
    }), e2("ddd", function (d, c) {
        return c.weekdaysShortRegex(d)
    }), e2("dddd", function (d, c) {
        return c.weekdaysRegex(d)
    }), eT(["dd", "ddd", "dddd"], function (g, f, j, i) {
        var h = j._locale.weekdaysParse(g, i, j._strict);
        null != h ? f.d = h : eD(j).invalidWeekday = g
    }), eT(["d", "e", "E"], function (g, f, i, h) {
        f[h] = ev(g)
    });
    var bI = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        by = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), bj = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), a3 = eV, aT = eV,
        aJ = eV;
    e7("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), fk("dayOfYear", "DDD"), e2("DDD", a9), e2("DDDD", aK), fP(["DDD", "DDDD"], function (f, d, g) {
        g._dayOfYear = ev(f)
    }), e7("H", ["HH", 2], 0, "hour"), e7("h", ["hh", 2], 0, b4), e7("k", ["kk", 2], 0, bU), e7("hmm", 0, 0, function () {
        return "" + b4.apply(this) + e8(this.minutes(), 2)
    }), e7("hmmss", 0, 0, function () {
        return "" + b4.apply(this) + e8(this.minutes(), 2) + e8(this.seconds(), 2)
    }), e7("Hmm", 0, 0, function () {
        return "" + this.hours() + e8(this.minutes(), 2)
    }), e7("Hmmss", 0, 0, function () {
        return "" + this.hours() + e8(this.minutes(), 2) + e8(this.seconds(), 2)
    }), bK("a", !0), bK("A", !1), fk("hour", "h"), e2("a", bA), e2("A", bA), e2("H", fX), e2("h", fX), e2("HH", fX, aU), e2("hh", fX, aU), e2("hmm", fG), e2("hmmss", bu), e2("Hmm", fG), e2("Hmmss", bu), fP(["H", "HH"], dn), fP(["a", "A"], function (f, d, g) {
        g._isPm = g._locale.isPM(f), g._meridiem = f
    }), fP(["h", "hh"], function (f, d, g) {
        d[dn] = ev(f), eD(g).bigHour = !0
    }), fP("hmm", function (g, f, i) {
        var h = g.length - 2;
        f[dn] = ev(g.substr(0, h)), f[c7] = ev(g.substr(h)), eD(i).bigHour = !0
    }), fP("hmmss", function (g, f, j) {
        var i = g.length - 4, h = g.length - 2;
        f[dn] = ev(g.substr(0, i)), f[c7] = ev(g.substr(i, 2)), f[cX] = ev(g.substr(h)), eD(j).bigHour = !0
    }), fP("Hmm", function (g, f, i) {
        var h = g.length - 2;
        f[dn] = ev(g.substr(0, h)), f[c7] = ev(g.substr(h))
    }), fP("Hmmss", function (g, f, j) {
        var i = g.length - 4, h = g.length - 2;
        f[dn] = ev(g.substr(0, i)), f[c7] = ev(g.substr(i, 2)), f[cX] = ev(g.substr(h))
    });
    var az = /[ap]\.?m?\.?/i, aj = fh("Hours", !0);
    e7("m", ["mm", 2], 0, "minute"), fk("minute", "m"), e2("m", fX), e2("mm", fX, aU), fP(["m", "mm"], c7);
    var fW = fh("Minutes", !1);
    e7("s", ["ss", 2], 0, "second"), fk("second", "s"), e2("s", fX), e2("ss", fX, aU), fP(["s", "ss"], cX);
    var fF = fh("Seconds", !1);
    e7("S", 0, 0, function () {
        return ~~(this.millisecond() / 100)
    }), e7(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10)
    }), e7(0, ["SSS", 3], 0, "millisecond"), e7(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond()
    }), e7(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond()
    }), e7(0, ["SSSSSS", 6], 0, function () {
        return 1000 * this.millisecond()
    }), e7(0, ["SSSSSSS", 7], 0, function () {
        return 10000 * this.millisecond()
    }), e7(0, ["SSSSSSSS", 8], 0, function () {
        return 100000 * this.millisecond()
    }), e7(0, ["SSSSSSSSS", 9], 0, function () {
        return 1000000 * this.millisecond()
    }), fk("millisecond", "ms"), e2("S", a9, a4), e2("SS", a9, aU), e2("SSS", a9, aK);
    var bt;
    for (bt = "SSSS"; bt.length <= 9; bt += "S") {
        e2(bt, aF)
    }
    for (bt = "S"; bt.length <= 9; bt += "S") {
        fP(bt, aV)
    }
    var a8 = fh("Milliseconds", !1);
    e7("z", 0, 0, "zoneAbbr"), e7("zz", 0, 0, "zoneName");
    var aY = ey.prototype;
    aY.add = cH, aY.calendar = cU, aY.clone = cK, aY.diff = bm, aY.endOf = aH, aY.format = aC, aY.from = am, aY.fromNow = fZ, aY.to = fI, aY.toNow = bw, aY.get = e9, aY.invalidAt = dL, aY.isAfter = cA, aY.isBefore = cq, aY.isBetween = b5, aY.isSame = bV, aY.isSameOrAfter = bL, aY.isSameOrBefore = bB, aY.isValid = d5, aY.lang = cn, aY.locale = bh, aY.localeData = a1, aY.max = dD, aY.min = dN, aY.parsingFlags = dV, aY.set = e9, aY.startOf = aR, aY.subtract = cx, aY.toArray = fD, aY.toObject = eX, aY.toDate = fU, aY.toISOString = aM, aY.toJSON = em, aY.toString = aW, aY.unix = ah, aY.valueOf = ax, aY.creationData = dB, aY.year = dX, aY.isLeapYear = a7, aY.weekYear = c9, aY.isoWeekYear = cZ, aY.quarter = aY.quarters = b0, aY.month = dw, aY.daysInMonth = dl, aY.week = aY.weeks = cl, aY.isoWeek = aY.isoWeeks = ar, aY.weeksInYear = cF, aY.isoWeeksInYear = cP, aY.date = bS, aY.day = aY.days = dF, aY.weekday = du, aY.isoWeekday = dj, aY.dayOfYear = cp, aY.hour = aY.hours = aj, aY.minute = aY.minutes = fW, aY.second = aY.seconds = fF, aY.millisecond = aY.milliseconds = a8, aY.utcOffset = cw, aY.utc = b1, aY.local = bR, aY.parseZone = bH, aY.hasAlignedHourOffset = bs, aY.isDST = cm, aY.isDSTShifted = at, aY.isLocal = fO, aY.isUtcOffset = fv, aY.isUtc = eP, aY.isUTC = eP, aY.zoneAbbr = aL, aY.zoneName = aB, aY.dates = es("dates accessor is deprecated. Use date instead.", bS), aY.months = es("months accessor is deprecated. Use month instead", dw), aY.years = es("years accessor is deprecated. Use year instead", dX), aY.zone = es("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", ch);
    var aO = aY, aE = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }, au = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }, f1 = "Invalid date", fR = "%d", fA = /\d{1,2}/, eU = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }, ei = fz.prototype;
    ei._calendar = aE, ei.calendar = fH, ei._longDateFormat = au, ei.longDateFormat = bv, ei._invalidDate = f1, ei.invalidDate = bg, ei._ordinal = fR, ei.ordinal = a0, ei._ordinalParse = fA, ei.preparse = aQ, ei.postformat = aQ, ei._relativeTime = eU, ei.relativeTime = aG, ei.pastFuture = aw, ei.set = en, ei.months = eR, ei._months = bY, ei.monthsShort = eh, ei._monthsShort = bO, ei.monthsParse = dR, ei._monthsRegex = bp, ei.monthsRegex = cV, ei._monthsShortRegex = bE, ei.monthsShortRegex = c5, ei.week = bQ, ei._week = b2, ei.firstDayOfYear = br, ei.firstDayOfWeek = bG, ei.weekdays = ft, ei._weekdays = bI, ei.weekdaysMin = ef, ei._weekdaysMin = bj, ei.weekdaysShort = eN, ei._weekdaysShort = by, ei.weekdaysParse = dP, ei._weekdaysRegex = a3, ei.weekdaysRegex = c3, ei._weekdaysShortRegex = aT, ei.weekdaysShortRegex = cT, ei._weekdaysMinRegex = aJ, ei.weekdaysMinRegex = cJ, ei.isPM = bl, ei._meridiemParse = az, ei.meridiem = a5, fs("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (f) {
            var d = f % 10, g = 1 === ev(f % 100 / 10) ? "th" : 1 === d ? "st" : 2 === d ? "nd" : 3 === d ? "rd" : "th";
            return f + g
        }
    }), eS.lang = es("moment.lang is deprecated. Use moment.locale instead.", fs), eS.langData = es("moment.langData is deprecated. Use moment.localeData instead.", fn);
    var d2 = Math.abs, dS = bF("ms"), dI = bF("s"), dy = bF("m"), dm = bF("h"), c6 = bF("d"), cW = bF("w"),
        cM = bF("M"), cC = bF("y"), cs = ck("milliseconds"), b7 = ck("seconds"), bX = ck("minutes"), bN = ck("hours"),
        bD = ck("days"), bo = ck("months"), ci = ck("years"), ao = Math.round, fK = {s: 45, m: 45, h: 22, d: 26, M: 11},
        fm = Math.abs, eG = dC.prototype;
    eG.abs = dA, eG.add = c8, eG.subtract = cY, eG.as = bZ, eG.asMilliseconds = dS, eG.asSeconds = dI, eG.asMinutes = dy, eG.asHours = dm, eG.asDays = c6, eG.asWeeks = cW, eG.asMonths = cM, eG.asYears = cC, eG.valueOf = bP, eG._bubble = cE, eG.get = bq, eG.milliseconds = cs, eG.seconds = b7, eG.minutes = bX, eG.hours = bN, eG.days = bD, eG.weeks = aq, eG.months = bo, eG.years = ci, eG.humanize = d9, eG.toISOString = dY, eG.toString = dY, eG.toJSON = dY, eG.locale = bh, eG.localeData = a1, eG.toIsoString = es("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", dY), eG.lang = cn, e7("X", 0, 0, "unix"), e7("x", 0, 0, "valueOf"), e2("x", av), e2("X", fB), fP("X", function (f, d, g) {
        g._d = new Date(1000 * parseFloat(f, 10))
    }), fP("x", function (f, d, g) {
        g._d = new Date(ev(f))
    }), eS.version = "2.13.0", eQ(eo), eS.fn = aO, eS.min = dW, eS.max = dM, eS.now = ds, eS.utc = eF, eS.unix = al, eS.months = eW, eS.isDate = eM, eS.locale = fs, eS.invalid = eB, eS.duration = eg, eS.isMoment = ex, eS.weekdays = d4, eS.parseZone = fY, eS.localeData = fn, eS.isDuration = dr, eS.monthsShort = ek, eS.weekdaysMin = dK, eS.defineLocale = fq, eS.updateLocale = fo, eS.locales = fl, eS.weekdaysShort = dU, eS.normalizeUnits = fj, eS.relativeTimeThreshold = eL, eS.prototype = aO;
    var d7 = eS;
    return d7
});
/*! version : 4.7.14
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "moment"], a)
    } else {
        if (typeof exports === "object") {
            a(require("jquery"), require("moment"))
        } else {
            if (typeof jQuery === "undefined") {
                throw"bootstrap-datetimepicker requires jQuery to be loaded first"
            }
            if (typeof moment === "undefined") {
                throw"bootstrap-datetimepicker requires Moment.js to be loaded first"
            }
            a(jQuery, moment)
        }
    }
}(function (b, c) {
    if (!c) {
        throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first")
    }
    var a = function (w, D) {
        var q = {}, aj = c().startOf("d"), ae = aj.clone(), S = true, k, ak = false, N = false, i, U = 0, z, an, t,
            ac = [{clsName: "days", navFnc: "M", navStep: 1}, {
                clsName: "months",
                navFnc: "y",
                navStep: 1
            }, {clsName: "years", navFnc: "y", navStep: 10}], al = ["days", "months", "years"],
            u = ["top", "bottom", "auto"], j = ["left", "right", "auto"], am = ["default", "top", "bottom"], E = {
                up: 38,
                38: "up",
                down: 40,
                40: "down",
                left: 37,
                37: "left",
                right: 39,
                39: "right",
                tab: 9,
                9: "tab",
                escape: 27,
                27: "escape",
                enter: 13,
                13: "enter",
                pageUp: 33,
                33: "pageUp",
                pageDown: 34,
                34: "pageDown",
                shift: 16,
                16: "shift",
                control: 17,
                17: "control",
                space: 32,
                32: "space",
                t: 84,
                84: "t",
                "delete": 46,
                46: "delete"
            }, ah = {}, af = function (ap) {
                if (typeof ap !== "string" || ap.length > 1) {
                    throw new TypeError("isEnabled expects a single character string parameter")
                }
                switch (ap) {
                    case"y":
                        return z.indexOf("Y") !== -1;
                    case"M":
                        return z.indexOf("M") !== -1;
                    case"d":
                        return z.toLowerCase().indexOf("d") !== -1;
                    case"h":
                    case"H":
                        return z.toLowerCase().indexOf("h") !== -1;
                    case"m":
                        return z.indexOf("m") !== -1;
                    case"s":
                        return z.indexOf("s") !== -1;
                    default:
                        return false
                }
            }, H = function () {
                return (af("h") || af("m") || af("s"))
            }, M = function () {
                return (af("y") || af("M") || af("d"))
            }, n = function () {
                var aq = b("<thead>").append(b("<tr>").append(b("<th>").addClass("prev").attr("data-action", "previous").append(b("<span>").addClass(D.icons.previous))).append(b("<th>").addClass("picker-switch").attr("data-action", "pickerSwitch").attr("colspan", (D.calendarWeeks ? "6" : "5"))).append(b("<th>").addClass("next").attr("data-action", "next").append(b("<span>").addClass(D.icons.next)))),
                    ap = b("<tbody>").append(b("<tr>").append(b("<td>").attr("colspan", (D.calendarWeeks ? "8" : "7"))));
                return [b("<div>").addClass("datepicker-days").append(b("<table>").addClass("table-condensed").append(aq).append(b("<tbody>"))), b("<div>").addClass("datepicker-months").append(b("<table>").addClass("table-condensed").append(aq.clone()).append(ap.clone())), b("<div>").addClass("datepicker-years").append(b("<table>").addClass("table-condensed").append(aq.clone()).append(ap.clone()))]
            }, Q = function () {
                var ap = b("<tr>"), aq = b("<tr>"), ar = b("<tr>");
                if (af("h")) {
                    ap.append(b("<td>").append(b("<a>").attr({
                        href: "#",
                        tabindex: "-1"
                    }).addClass("btn").attr("data-action", "incrementHours").append(b("<span>").addClass(D.icons.up))));
                    aq.append(b("<td>").append(b("<span>").addClass("timepicker-hour").attr("data-time-component", "hours").attr("data-action", "showHours")));
                    ar.append(b("<td>").append(b("<a>").attr({
                        href: "#",
                        tabindex: "-1"
                    }).addClass("btn").attr("data-action", "decrementHours").append(b("<span>").addClass(D.icons.down))))
                }
                if (af("m")) {
                    if (af("h")) {
                        ap.append(b("<td>").addClass("separator"));
                        aq.append(b("<td>").addClass("separator").html(":"));
                        ar.append(b("<td>").addClass("separator"))
                    }
                    ap.append(b("<td>").append(b("<a>").attr({
                        href: "#",
                        tabindex: "-1"
                    }).addClass("btn").attr("data-action", "incrementMinutes").append(b("<span>").addClass(D.icons.up))));
                    aq.append(b("<td>").append(b("<span>").addClass("timepicker-minute").attr("data-time-component", "minutes").attr("data-action", "showMinutes")));
                    ar.append(b("<td>").append(b("<a>").attr({
                        href: "#",
                        tabindex: "-1"
                    }).addClass("btn").attr("data-action", "decrementMinutes").append(b("<span>").addClass(D.icons.down))))
                }
                if (af("s")) {
                    if (af("m")) {
                        ap.append(b("<td>").addClass("separator"));
                        aq.append(b("<td>").addClass("separator").html(":"));
                        ar.append(b("<td>").addClass("separator"))
                    }
                    ap.append(b("<td>").append(b("<a>").attr({
                        href: "#",
                        tabindex: "-1"
                    }).addClass("btn").attr("data-action", "incrementSeconds").append(b("<span>").addClass(D.icons.up))));
                    aq.append(b("<td>").append(b("<span>").addClass("timepicker-second").attr("data-time-component", "seconds").attr("data-action", "showSeconds")));
                    ar.append(b("<td>").append(b("<a>").attr({
                        href: "#",
                        tabindex: "-1"
                    }).addClass("btn").attr("data-action", "decrementSeconds").append(b("<span>").addClass(D.icons.down))))
                }
                if (!i) {
                    ap.append(b("<td>").addClass("separator"));
                    aq.append(b("<td>").append(b("<button>").addClass("btn btn-primary").attr("data-action", "togglePeriod")));
                    ar.append(b("<td>").addClass("separator"))
                }
                return b("<div>").addClass("timepicker-picker").append(b("<table>").addClass("table-condensed").append([ap, aq, ar]))
            }, R = function () {
                var aq = b("<div>").addClass("timepicker-hours").append(b("<table>").addClass("table-condensed")),
                    ap = b("<div>").addClass("timepicker-minutes").append(b("<table>").addClass("table-condensed")),
                    at = b("<div>").addClass("timepicker-seconds").append(b("<table>").addClass("table-condensed")),
                    ar = [Q()];
                if (af("h")) {
                    ar.push(aq)
                }
                if (af("m")) {
                    ar.push(ap)
                }
                if (af("s")) {
                    ar.push(at)
                }
                return ar
            }, ab = function () {
                var ap = [];
                if (D.showTodayButton) {
                    ap.push(b("<td>").append(b("<a>").attr("data-action", "today").append(b("<span>").addClass(D.icons.today))))
                }
                if (!D.sideBySide && M() && H()) {
                    ap.push(b("<td>").append(b("<a>").attr("data-action", "togglePicker").append(b("<span>").addClass(D.icons.time))))
                }
                if (D.showClear) {
                    ap.push(b("<td>").append(b("<a>").attr("data-action", "clear").append(b("<span>").addClass(D.icons.clear))))
                }
                if (D.showClose) {
                    ap.push(b("<td>").append(b("<a>").attr("data-action", "close").append(b("<span>").addClass(D.icons.close))))
                }
                return b("<table>").addClass("table-condensed").append(b("<tbody>").append(b("<tr>").append(ap)))
            }, ao = function () {
                var ar = b("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),
                    ap = b("<div>").addClass("datepicker").append(n()), aq = b("<div>").addClass("timepicker").append(R()),
                    au = b("<ul>").addClass("list-unstyled"),
                    at = b("<li>").addClass("picker-switch" + (D.collapse ? " accordion-toggle" : "")).append(ab());
                if (D.inline) {
                    ar.removeClass("dropdown-menu")
                }
                if (i) {
                    ar.addClass("usetwentyfour")
                }
                if (D.sideBySide && M() && H()) {
                    ar.addClass("timepicker-sbs");
                    ar.append(b("<div>").addClass("row").append(ap.addClass("col-sm-6")).append(aq.addClass("col-sm-6")));
                    ar.append(at);
                    return ar
                }
                if (D.toolbarPlacement === "top") {
                    au.append(at)
                }
                if (M()) {
                    au.append(b("<li>").addClass((D.collapse && H() ? "collapse in" : "")).append(ap))
                }
                if (D.toolbarPlacement === "default") {
                    au.append(at)
                }
                if (H()) {
                    au.append(b("<li>").addClass((D.collapse && M() ? "collapse" : "")).append(aq))
                }
                if (D.toolbarPlacement === "bottom") {
                    au.append(at)
                }
                return ar.append(au)
            }, d = function () {
                var ap, aq = {};
                if (w.is("input") || D.inline) {
                    ap = w.data()
                } else {
                    ap = w.find("input").data()
                }
                if (ap.dateOptions && ap.dateOptions instanceof Object) {
                    aq = b.extend(true, aq, ap.dateOptions)
                }
                b.each(D, function (at) {
                    var ar = "date" + at.charAt(0).toUpperCase() + at.slice(1);
                    if (ap[ar] !== undefined) {
                        aq[at] = ap[ar]
                    }
                });
                return aq
            }, o = function () {
                var ap = (ak || w).position(), au = (ak || w).offset(), ar = D.widgetPositioning.vertical,
                    aq = D.widgetPositioning.horizontal, at;
                if (D.widgetParent) {
                    at = D.widgetParent.append(N)
                } else {
                    if (w.is("input")) {
                        at = w.parent().append(N)
                    } else {
                        if (D.inline) {
                            at = w.append(N);
                            return
                        } else {
                            at = w;
                            w.children().first().after(N)
                        }
                    }
                }
                if (ar === "auto") {
                    if (au.top + N.height() * 1.5 >= b(window).height() + b(window).scrollTop() && N.height() + w.outerHeight() < au.top) {
                        ar = "top"
                    } else {
                        ar = "bottom"
                    }
                }
                if (aq === "auto") {
                    if (at.width() < au.left + N.outerWidth() / 2 && au.left + N.outerWidth() > b(window).width()) {
                        aq = "right"
                    } else {
                        aq = "left"
                    }
                }
                if (ar === "top") {
                    N.addClass("top").removeClass("bottom")
                } else {
                    N.addClass("bottom").removeClass("top")
                }
                if (aq === "right") {
                    N.addClass("pull-right")
                } else {
                    N.removeClass("pull-right")
                }
                if (at.css("position") !== "relative") {
                    at = at.parents().filter(function () {
                        return b(this).css("position") === "relative"
                    }).first()
                }
                if (at.length === 0) {
                    throw new Error("datetimepicker component should be placed within a relative positioned container")
                }
                N.css({
                    top: ar === "top" ? "auto" : ap.top + w.outerHeight(),
                    bottom: ar === "top" ? ap.top + w.outerHeight() : "auto",
                    left: aq === "left" ? at.css("padding-left") : "auto",
                    right: aq === "left" ? "auto" : at.width() - w.outerWidth()
                })
            }, s = function (ap) {
                if (ap.type === "dp.change" && ((ap.date && ap.date.isSame(ap.oldDate)) || (!ap.date && !ap.oldDate))) {
                    return
                }
                w.trigger(ap)
            }, f = function (ap) {
                if (!N) {
                    return
                }
                if (ap) {
                    t = Math.max(U, Math.min(2, t + ap))
                }
                N.find(".datepicker > div").hide().filter(".datepicker-" + ac[t].clsName).show()
            }, ai = function () {
                var aq = b("<tr>"), ap = ae.clone().startOf("w");
                if (D.calendarWeeks === true) {
                    aq.append(b("<th>").addClass("cw").text("#"))
                }
                while (ap.isBefore(ae.clone().endOf("w"))) {
                    aq.append(b("<th>").addClass("dow").text(ap.format("dd")));
                    ap.add(1, "d")
                }
                N.find(".datepicker-days thead").append(aq)
            }, B = function (ap) {
                return D.disabledDates[ap.format("YYYY-MM-DD")] === true
            }, P = function (ap) {
                return D.enabledDates[ap.format("YYYY-MM-DD")] === true
            }, m = function (ap, aq) {
                if (!ap.isValid()) {
                    return false
                }
                if (D.disabledDates && B(ap) && aq !== "M") {
                    return false
                }
                if (D.enabledDates && !P(ap) && aq !== "M") {
                    return false
                }
                if (D.minDate && ap.isBefore(D.minDate, aq)) {
                    return false
                }
                if (D.maxDate && ap.isAfter(D.maxDate, aq)) {
                    return false
                }
                if (aq === "d" && D.daysOfWeekDisabled.indexOf(ap.day()) !== -1) {
                    return false
                }
                return true
            }, I = function () {
                var ap = [], aq = ae.clone().startOf("y").hour(12);
                while (aq.isSame(ae, "y")) {
                    ap.push(b("<span>").attr("data-action", "selectMonth").addClass("month").text(aq.format("MMM")));
                    aq.add(1, "M")
                }
                N.find(".datepicker-months td").empty().append(ap)
            }, y = function () {
                var aq = N.find(".datepicker-months"), ar = aq.find("th"), ap = aq.find("tbody").find("span");
                aq.find(".disabled").removeClass("disabled");
                if (!m(ae.clone().subtract(1, "y"), "y")) {
                    ar.eq(0).addClass("disabled")
                }
                ar.eq(1).text(ae.year());
                if (!m(ae.clone().add(1, "y"), "y")) {
                    ar.eq(2).addClass("disabled")
                }
                ap.removeClass("active");
                if (aj.isSame(ae, "y")) {
                    ap.eq(aj.month()).addClass("active")
                }
                ap.each(function (at) {
                    if (!m(ae.clone().month(at), "M")) {
                        b(this).addClass("disabled")
                    }
                })
            }, A = function () {
                var aq = N.find(".datepicker-years"), at = aq.find("th"), ap = ae.clone().subtract(5, "y"),
                    au = ae.clone().add(6, "y"), ar = "";
                aq.find(".disabled").removeClass("disabled");
                if (D.minDate && D.minDate.isAfter(ap, "y")) {
                    at.eq(0).addClass("disabled")
                }
                at.eq(1).text(ap.year() + "-" + au.year());
                if (D.maxDate && D.maxDate.isBefore(au, "y")) {
                    at.eq(2).addClass("disabled")
                }
                while (!ap.isAfter(au, "y")) {
                    ar += '<span data-action="selectYear" class="year' + (ap.isSame(aj, "y") ? " active" : "") + (!m(ap, "y") ? " disabled" : "") + '">' + ap.year() + "</span>";
                    ap.add(1, "y")
                }
                aq.find("td").html(ar)
            }, r = function () {
                var aq = N.find(".datepicker-days"), av = aq.find("th"), ap, ar = [], au, at;
                if (!M()) {
                    return
                }
                aq.find(".disabled").removeClass("disabled");
                av.eq(1).text(ae.format(D.dayViewHeaderFormat));
                if (!m(ae.clone().subtract(1, "M"), "M")) {
                    av.eq(0).addClass("disabled")
                }
                if (!m(ae.clone().add(1, "M"), "M")) {
                    av.eq(2).addClass("disabled")
                }
                ap = ae.clone().startOf("M").startOf("week");
                while (!ae.clone().endOf("M").endOf("w").isBefore(ap, "d")) {
                    if (ap.weekday() === 0) {
                        au = b("<tr>");
                        if (D.calendarWeeks) {
                            au.append('<td class="cw">' + ap.week() + "</td>")
                        }
                        ar.push(au)
                    }
                    at = "";
                    if (ap.isBefore(ae, "M")) {
                        at += " old"
                    }
                    if (ap.isAfter(ae, "M")) {
                        at += " new"
                    }
                    if (ap.isSame(aj, "d") && !S) {
                        at += " active"
                    }
                    if (!m(ap, "d")) {
                        at += " disabled"
                    }
                    if (ap.isSame(c(), "d")) {
                        at += " today"
                    }
                    if (ap.day() === 0 || ap.day() === 6) {
                        at += " weekend"
                    }
                    au.append('<td data-action="selectDay" class="day' + at + '">' + ap.date() + "</td>");
                    ap.add(1, "d")
                }
                aq.find("tbody").empty().append(ar);
                y();
                A()
            }, K = function () {
                var aq = N.find(".timepicker-hours table"), at = ae.clone().startOf("d"), ap = [], ar = b("<tr>");
                if (ae.hour() > 11 && !i) {
                    at.hour(12)
                }
                while (at.isSame(ae, "d") && (i || (ae.hour() < 12 && at.hour() < 12) || ae.hour() > 11)) {
                    if (at.hour() % 4 === 0) {
                        ar = b("<tr>");
                        ap.push(ar)
                    }
                    ar.append('<td data-action="selectHour" class="hour' + (!m(at, "h") ? " disabled" : "") + '">' + at.format(i ? "HH" : "hh") + "</td>");
                    at.add(1, "h")
                }
                aq.empty().append(ap)
            }, G = function () {
                var ar = N.find(".timepicker-minutes table"), at = ae.clone().startOf("h"), ap = [], au = b("<tr>"),
                    aq = D.stepping === 1 ? 5 : D.stepping;
                while (ae.isSame(at, "h")) {
                    if (at.minute() % (aq * 4) === 0) {
                        au = b("<tr>");
                        ap.push(au)
                    }
                    au.append('<td data-action="selectMinute" class="minute' + (!m(at, "m") ? " disabled" : "") + '">' + at.format("mm") + "</td>");
                    at.add(aq, "m")
                }
                ar.empty().append(ap)
            }, h = function () {
                var ar = N.find(".timepicker-seconds table"), ap = ae.clone().startOf("m"), aq = [], at = b("<tr>");
                while (ae.isSame(ap, "m")) {
                    if (ap.second() % 20 === 0) {
                        at = b("<tr>");
                        aq.push(at)
                    }
                    at.append('<td data-action="selectSecond" class="second' + (!m(ap, "s") ? " disabled" : "") + '">' + ap.format("ss") + "</td>");
                    ap.add(5, "s")
                }
                ar.empty().append(aq)
            }, p = function () {
                var ap = N.find(".timepicker span[data-time-component]");
                if (!i) {
                    N.find(".timepicker [data-action=togglePeriod]").text(aj.format("A"))
                }
                ap.filter("[data-time-component=hours]").text(aj.format(i ? "HH" : "hh"));
                ap.filter("[data-time-component=minutes]").text(aj.format("mm"));
                ap.filter("[data-time-component=seconds]").text(aj.format("ss"));
                K();
                G();
                h()
            }, O = function () {
                if (!N) {
                    return
                }
                r();
                p()
            }, T = function (aq) {
                var ap = S ? null : aj;
                if (!aq) {
                    S = true;
                    k.val("");
                    w.data("date", "");
                    s({type: "dp.change", date: null, oldDate: ap});
                    O();
                    return
                }
                aq = aq.clone().locale(D.locale);
                if (D.stepping !== 1) {
                    aq.minutes((Math.round(aq.minutes() / D.stepping) * D.stepping) % 60).seconds(0)
                }
                if (m(aq)) {
                    aj = aq;
                    ae = aj.clone();
                    k.val(aj.format(z));
                    w.data("date", aj.format(z));
                    O();
                    S = false;
                    s({type: "dp.change", date: aj.clone(), oldDate: ap})
                } else {
                    if (!D.keepInvalid) {
                        k.val(S ? "" : aj.format(z))
                    }
                    s({type: "dp.error", date: aq})
                }
            }, ag = function () {
                var ap = false;
                if (!N) {
                    return q
                }
                N.find(".collapse").each(function () {
                    var aq = b(this).data("collapse");
                    if (aq && aq.transitioning) {
                        ap = true;
                        return false
                    }
                    return true
                });
                if (ap) {
                    return q
                }
                if (ak && ak.hasClass("btn")) {
                    ak.toggleClass("active")
                }
                N.hide();
                b(window).off("resize", o);
                N.off("click", "[data-action]");
                N.off("mousedown", false);
                N.remove();
                N = false;
                s({type: "dp.hide", date: aj.clone()});
                return q
            }, X = function () {
                T(null)
            }, aa = {
                next: function () {
                    ae.add(ac[t].navStep, ac[t].navFnc);
                    r()
                }, previous: function () {
                    ae.subtract(ac[t].navStep, ac[t].navFnc);
                    r()
                }, pickerSwitch: function () {
                    f(1)
                }, selectMonth: function (aq) {
                    var ap = b(aq.target).closest("tbody").find("span").index(b(aq.target));
                    ae.month(ap);
                    if (t === U) {
                        T(aj.clone().year(ae.year()).month(ae.month()));
                        if (!D.inline) {
                            ag()
                        }
                    } else {
                        f(-1);
                        r()
                    }
                }, selectYear: function (aq) {
                    var ap = parseInt(b(aq.target).text(), 10) || 0;
                    ae.year(ap);
                    if (t === U) {
                        T(aj.clone().year(ae.year()));
                        if (!D.inline) {
                            ag()
                        }
                    } else {
                        f(-1);
                        r()
                    }
                }, selectDay: function (aq) {
                    var ap = ae.clone();
                    if (b(aq.target).is(".old")) {
                        ap.subtract(1, "M")
                    }
                    if (b(aq.target).is(".new")) {
                        ap.add(1, "M")
                    }
                    T(ap.date(parseInt(b(aq.target).text(), 10)));
                    if (!H() && !D.keepOpen && !D.inline) {
                        ag()
                    }
                }, incrementHours: function () {
                    T(aj.clone().add(1, "h"))
                }, incrementMinutes: function () {
                    T(aj.clone().add(D.stepping, "m"))
                }, incrementSeconds: function () {
                    T(aj.clone().add(1, "s"))
                }, decrementHours: function () {
                    T(aj.clone().subtract(1, "h"))
                }, decrementMinutes: function () {
                    T(aj.clone().subtract(D.stepping, "m"))
                }, decrementSeconds: function () {
                    T(aj.clone().subtract(1, "s"))
                }, togglePeriod: function () {
                    T(aj.clone().add((aj.hours() >= 12) ? -12 : 12, "h"))
                }, togglePicker: function (av) {
                    var au = b(av.target), at = au.closest("ul"), aq = at.find(".in"), ap = at.find(".collapse:not(.in)"),
                        ar;
                    if (aq && aq.length) {
                        ar = aq.data("collapse");
                        if (ar && ar.transitioning) {
                            return
                        }
                        if (aq.collapse) {
                            aq.collapse("hide");
                            ap.collapse("show")
                        } else {
                            aq.removeClass("in");
                            ap.addClass("in")
                        }
                        if (au.is("span")) {
                            au.toggleClass(D.icons.time + " " + D.icons.date)
                        } else {
                            au.find("span").toggleClass(D.icons.time + " " + D.icons.date)
                        }
                    }
                }, showPicker: function () {
                    N.find(".timepicker > div:not(.timepicker-picker)").hide();
                    N.find(".timepicker .timepicker-picker").show()
                }, showHours: function () {
                    N.find(".timepicker .timepicker-picker").hide();
                    N.find(".timepicker .timepicker-hours").show()
                }, showMinutes: function () {
                    N.find(".timepicker .timepicker-picker").hide();
                    N.find(".timepicker .timepicker-minutes").show()
                }, showSeconds: function () {
                    N.find(".timepicker .timepicker-picker").hide();
                    N.find(".timepicker .timepicker-seconds").show()
                }, selectHour: function (aq) {
                    var ap = parseInt(b(aq.target).text(), 10);
                    if (!i) {
                        if (aj.hours() >= 12) {
                            if (ap !== 12) {
                                ap += 12
                            }
                        } else {
                            if (ap === 12) {
                                ap = 0
                            }
                        }
                    }
                    T(aj.clone().hours(ap));
                    aa.showPicker.call(q)
                }, selectMinute: function (ap) {
                    T(aj.clone().minutes(parseInt(b(ap.target).text(), 10)));
                    aa.showPicker.call(q)
                }, selectSecond: function (ap) {
                    T(aj.clone().seconds(parseInt(b(ap.target).text(), 10)));
                    aa.showPicker.call(q)
                }, clear: X, today: function () {
                    T(c())
                }, close: ag
            }, L = function (ap) {
                if (b(ap.currentTarget).is(".disabled")) {
                    return false
                }
                aa[b(ap.currentTarget).data("action")].apply(q, arguments);
                return false
            }, W = function () {
                var ap, aq = {
                    year: function (ar) {
                        return ar.month(0).date(1).hours(0).seconds(0).minutes(0)
                    }, month: function (ar) {
                        return ar.date(1).hours(0).seconds(0).minutes(0)
                    }, day: function (ar) {
                        return ar.hours(0).seconds(0).minutes(0)
                    }, hour: function (ar) {
                        return ar.seconds(0).minutes(0)
                    }, minute: function (ar) {
                        return ar.seconds(0)
                    }
                };
                if (k.prop("disabled") || (!D.ignoreReadonly && k.prop("readonly")) || N) {
                    return q
                }
                if (D.useCurrent && S && ((k.is("input") && k.val().trim().length === 0) || D.inline)) {
                    ap = c();
                    if (typeof D.useCurrent === "string") {
                        ap = aq[D.useCurrent](ap)
                    }
                    T(ap)
                }
                N = ao();
                ai();
                I();
                N.find(".timepicker-hours").hide();
                N.find(".timepicker-minutes").hide();
                N.find(".timepicker-seconds").hide();
                O();
                f();
                b(window).on("resize", o);
                N.on("click", "[data-action]", L);
                N.on("mousedown", false);
                if (ak && ak.hasClass("btn")) {
                    ak.toggleClass("active")
                }
                N.show();
                o();
                if (!k.is(":focus")) {
                    k.focus()
                }
                s({type: "dp.show"});
                return q
            }, F = function () {
                return (N ? ag() : W())
            }, V = function (ap) {
                if (c.isMoment(ap) || ap instanceof Date) {
                    ap = c(ap)
                } else {
                    ap = c(ap, an, D.useStrict)
                }
                ap.locale(D.locale);
                return ap
            }, C = function (aw) {
                var az = null, au, av, ax = [], at = {}, ay = aw.which, aq, ap, ar = "p";
                ah[ay] = ar;
                for (au in ah) {
                    if (ah.hasOwnProperty(au) && ah[au] === ar) {
                        ax.push(au);
                        if (parseInt(au, 10) !== ay) {
                            at[au] = true
                        }
                    }
                }
                for (au in D.keyBinds) {
                    if (D.keyBinds.hasOwnProperty(au) && typeof (D.keyBinds[au]) === "function") {
                        aq = au.split(" ");
                        if (aq.length === ax.length && E[ay] === aq[aq.length - 1]) {
                            ap = true;
                            for (av = aq.length - 2; av >= 0; av--) {
                                if (!(E[aq[av]] in at)) {
                                    ap = false;
                                    break
                                }
                            }
                            if (ap) {
                                az = D.keyBinds[au];
                                break
                            }
                        }
                    }
                }
                if (az) {
                    az.call(q, N);
                    aw.stopPropagation();
                    aw.preventDefault()
                }
            }, ad = function (ap) {
                ah[ap.which] = "r";
                ap.stopPropagation();
                ap.preventDefault()
            }, g = function (aq) {
                var ar = b(aq.target).val().trim(), ap = ar ? V(ar) : null;
                T(ap);
                aq.stopImmediatePropagation();
                return false
            }, v = function () {
                k.on({change: g, blur: D.debug ? "" : ag, keydown: C, keyup: ad});
                if (w.is("input")) {
                    k.on({focus: W})
                } else {
                    if (ak) {
                        ak.on("click", F);
                        ak.on("mousedown", false)
                    }
                }
            }, J = function () {
                k.off({change: g, blur: ag, keydown: C, keyup: ad});
                if (w.is("input")) {
                    k.off({focus: W})
                } else {
                    if (ak) {
                        ak.off("click", F);
                        ak.off("mousedown", false)
                    }
                }
            }, Y = function (ap) {
                var aq = {};
                b.each(ap, function () {
                    var ar = V(this);
                    if (ar.isValid()) {
                        aq[ar.format("YYYY-MM-DD")] = true
                    }
                });
                return (Object.keys(aq).length) ? aq : false
            }, Z = function () {
                var ap = D.format || "L LT";
                z = ap.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (aq) {
                    var ar = aj.localeData().longDateFormat(aq) || aq;
                    return ar.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (at) {
                        return aj.localeData().longDateFormat(at) || at
                    })
                });
                an = D.extraFormats ? D.extraFormats.slice() : [];
                if (an.indexOf(ap) < 0 && an.indexOf(z) < 0) {
                    an.push(z)
                }
                i = (z.toLowerCase().indexOf("a") < 1 && z.indexOf("h") < 1);
                if (af("y")) {
                    U = 2
                }
                if (af("M")) {
                    U = 1
                }
                if (af("d")) {
                    U = 0
                }
                t = Math.max(U, t);
                if (!S) {
                    T(aj)
                }
            };
        q.destroy = function () {
            ag();
            J();
            w.removeData("DateTimePicker");
            w.removeData("date")
        };
        q.toggle = F;
        q.show = W;
        q.hide = ag;
        q.disable = function () {
            ag();
            if (ak && ak.hasClass("btn")) {
                ak.addClass("disabled")
            }
            k.prop("disabled", true);
            return q
        };
        q.enable = function () {
            if (ak && ak.hasClass("btn")) {
                ak.removeClass("disabled")
            }
            k.prop("disabled", false);
            return q
        };
        q.ignoreReadonly = function (ap) {
            if (arguments.length === 0) {
                return D.ignoreReadonly
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("ignoreReadonly () expects a boolean parameter")
            }
            D.ignoreReadonly = ap;
            return q
        };
        q.options = function (ap) {
            if (arguments.length === 0) {
                return b.extend(true, {}, D)
            }
            if (!(ap instanceof Object)) {
                throw new TypeError("options() options parameter should be an object")
            }
            b.extend(true, D, ap);
            b.each(D, function (aq, ar) {
                if (q[aq] !== undefined) {
                    q[aq](ar)
                } else {
                    throw new TypeError("option " + aq + " is not recognized!")
                }
            });
            return q
        };
        q.date = function (ap) {
            if (arguments.length === 0) {
                if (S) {
                    return null
                }
                return aj.clone()
            }
            if (ap !== null && typeof ap !== "string" && !c.isMoment(ap) && !(ap instanceof Date)) {
                throw new TypeError("date() parameter must be one of [null, string, moment or Date]")
            }
            T(ap === null ? null : V(ap));
            return q
        };
        q.format = function (ap) {
            if (arguments.length === 0) {
                return D.format
            }
            if ((typeof ap !== "string") && ((typeof ap !== "boolean") || (ap !== false))) {
                throw new TypeError("format() expects a sting or boolean:false parameter " + ap)
            }
            D.format = ap;
            if (z) {
                Z()
            }
            return q
        };
        q.dayViewHeaderFormat = function (ap) {
            if (arguments.length === 0) {
                return D.dayViewHeaderFormat
            }
            if (typeof ap !== "string") {
                throw new TypeError("dayViewHeaderFormat() expects a string parameter")
            }
            D.dayViewHeaderFormat = ap;
            return q
        };
        q.extraFormats = function (ap) {
            if (arguments.length === 0) {
                return D.extraFormats
            }
            if (ap !== false && !(ap instanceof Array)) {
                throw new TypeError("extraFormats() expects an array or false parameter")
            }
            D.extraFormats = ap;
            if (an) {
                Z()
            }
            return q
        };
        q.disabledDates = function (ap) {
            if (arguments.length === 0) {
                return (D.disabledDates ? b.extend({}, D.disabledDates) : D.disabledDates)
            }
            if (!ap) {
                D.disabledDates = false;
                O();
                return q
            }
            if (!(ap instanceof Array)) {
                throw new TypeError("disabledDates() expects an array parameter")
            }
            D.disabledDates = Y(ap);
            D.enabledDates = false;
            O();
            return q
        };
        q.enabledDates = function (ap) {
            if (arguments.length === 0) {
                return (D.enabledDates ? b.extend({}, D.enabledDates) : D.enabledDates)
            }
            if (!ap) {
                D.enabledDates = false;
                O();
                return q
            }
            if (!(ap instanceof Array)) {
                throw new TypeError("enabledDates() expects an array parameter")
            }
            D.enabledDates = Y(ap);
            D.disabledDates = false;
            O();
            return q
        };
        q.daysOfWeekDisabled = function (ap) {
            if (arguments.length === 0) {
                return D.daysOfWeekDisabled.splice(0)
            }
            if (!(ap instanceof Array)) {
                throw new TypeError("daysOfWeekDisabled() expects an array parameter")
            }
            D.daysOfWeekDisabled = ap.reduce(function (aq, ar) {
                ar = parseInt(ar, 10);
                if (ar > 6 || ar < 0 || isNaN(ar)) {
                    return aq
                }
                if (aq.indexOf(ar) === -1) {
                    aq.push(ar)
                }
                return aq
            }, []).sort();
            O();
            return q
        };
        q.maxDate = function (aq) {
            if (arguments.length === 0) {
                return D.maxDate ? D.maxDate.clone() : D.maxDate
            }
            if ((typeof aq === "boolean") && aq === false) {
                D.maxDate = false;
                O();
                return q
            }
            if (typeof aq === "string") {
                if (aq === "now" || aq === "moment") {
                    aq = c()
                }
            }
            var ap = V(aq);
            if (!ap.isValid()) {
                throw new TypeError("maxDate() Could not parse date parameter: " + aq)
            }
            if (D.minDate && ap.isBefore(D.minDate)) {
                throw new TypeError("maxDate() date parameter is before options.minDate: " + ap.format(z))
            }
            D.maxDate = ap;
            if (D.maxDate.isBefore(aq)) {
                T(D.maxDate)
            }
            if (ae.isAfter(ap)) {
                ae = ap.clone()
            }
            O();
            return q
        };
        q.minDate = function (aq) {
            if (arguments.length === 0) {
                return D.minDate ? D.minDate.clone() : D.minDate
            }
            if ((typeof aq === "boolean") && aq === false) {
                D.minDate = false;
                O();
                return q
            }
            if (typeof aq === "string") {
                if (aq === "now" || aq === "moment") {
                    aq = c()
                }
            }
            var ap = V(aq);
            if (!ap.isValid()) {
                throw new TypeError("minDate() Could not parse date parameter: " + aq)
            }
            if (D.maxDate && ap.isAfter(D.maxDate)) {
                throw new TypeError("minDate() date parameter is after options.maxDate: " + ap.format(z))
            }
            D.minDate = ap;
            if (D.minDate.isAfter(aq)) {
                T(D.minDate)
            }
            if (ae.isBefore(ap)) {
                ae = ap.clone()
            }
            O();
            return q
        };
        q.defaultDate = function (aq) {
            if (arguments.length === 0) {
                return D.defaultDate ? D.defaultDate.clone() : D.defaultDate
            }
            if (!aq) {
                D.defaultDate = false;
                return q
            }
            if (typeof aq === "string") {
                if (aq === "now" || aq === "moment") {
                    aq = c()
                }
            }
            var ap = V(aq);
            if (!ap.isValid()) {
                throw new TypeError("defaultDate() Could not parse date parameter: " + aq)
            }
            if (!m(ap)) {
                throw new TypeError("defaultDate() date passed is invalid according to component setup validations")
            }
            D.defaultDate = ap;
            if (D.defaultDate && k.val().trim() === "" && k.attr("placeholder") === undefined) {
                T(D.defaultDate)
            }
            return q
        };
        q.locale = function (ap) {
            if (arguments.length === 0) {
                return D.locale
            }
            if (!c.localeData(ap)) {
                throw new TypeError("locale() locale " + ap + " is not loaded from moment locales!")
            }
            D.locale = ap;
            aj.locale(D.locale);
            ae.locale(D.locale);
            if (z) {
                Z()
            }
            if (N) {
                ag();
                W()
            }
            return q
        };
        q.stepping = function (ap) {
            if (arguments.length === 0) {
                return D.stepping
            }
            ap = parseInt(ap, 10);
            if (isNaN(ap) || ap < 1) {
                ap = 1
            }
            D.stepping = ap;
            return q
        };
        q.useCurrent = function (ap) {
            var aq = ["year", "month", "day", "hour", "minute"];
            if (arguments.length === 0) {
                return D.useCurrent
            }
            if ((typeof ap !== "boolean") && (typeof ap !== "string")) {
                throw new TypeError("useCurrent() expects a boolean or string parameter")
            }
            if (typeof ap === "string" && aq.indexOf(ap.toLowerCase()) === -1) {
                throw new TypeError("useCurrent() expects a string parameter of " + aq.join(", "))
            }
            D.useCurrent = ap;
            return q
        };
        q.collapse = function (ap) {
            if (arguments.length === 0) {
                return D.collapse
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("collapse() expects a boolean parameter")
            }
            if (D.collapse === ap) {
                return q
            }
            D.collapse = ap;
            if (N) {
                ag();
                W()
            }
            return q
        };
        q.icons = function (ap) {
            if (arguments.length === 0) {
                return b.extend({}, D.icons)
            }
            if (!(ap instanceof Object)) {
                throw new TypeError("icons() expects parameter to be an Object")
            }
            b.extend(D.icons, ap);
            if (N) {
                ag();
                W()
            }
            return q
        };
        q.useStrict = function (ap) {
            if (arguments.length === 0) {
                return D.useStrict
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("useStrict() expects a boolean parameter")
            }
            D.useStrict = ap;
            return q
        };
        q.sideBySide = function (ap) {
            if (arguments.length === 0) {
                return D.sideBySide
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("sideBySide() expects a boolean parameter")
            }
            D.sideBySide = ap;
            if (N) {
                ag();
                W()
            }
            return q
        };
        q.viewMode = function (ap) {
            if (arguments.length === 0) {
                return D.viewMode
            }
            if (typeof ap !== "string") {
                throw new TypeError("viewMode() expects a string parameter")
            }
            if (al.indexOf(ap) === -1) {
                throw new TypeError("viewMode() parameter must be one of (" + al.join(", ") + ") value")
            }
            D.viewMode = ap;
            t = Math.max(al.indexOf(ap), U);
            f();
            return q
        };
        q.toolbarPlacement = function (ap) {
            if (arguments.length === 0) {
                return D.toolbarPlacement
            }
            if (typeof ap !== "string") {
                throw new TypeError("toolbarPlacement() expects a string parameter")
            }
            if (am.indexOf(ap) === -1) {
                throw new TypeError("toolbarPlacement() parameter must be one of (" + am.join(", ") + ") value")
            }
            D.toolbarPlacement = ap;
            if (N) {
                ag();
                W()
            }
            return q
        };
        q.widgetPositioning = function (ap) {
            if (arguments.length === 0) {
                return b.extend({}, D.widgetPositioning)
            }
            if (({}).toString.call(ap) !== "[object Object]") {
                throw new TypeError("widgetPositioning() expects an object variable")
            }
            if (ap.horizontal) {
                if (typeof ap.horizontal !== "string") {
                    throw new TypeError("widgetPositioning() horizontal variable must be a string")
                }
                ap.horizontal = ap.horizontal.toLowerCase();
                if (j.indexOf(ap.horizontal) === -1) {
                    throw new TypeError("widgetPositioning() expects horizontal parameter to be one of (" + j.join(", ") + ")")
                }
                D.widgetPositioning.horizontal = ap.horizontal
            }
            if (ap.vertical) {
                if (typeof ap.vertical !== "string") {
                    throw new TypeError("widgetPositioning() vertical variable must be a string")
                }
                ap.vertical = ap.vertical.toLowerCase();
                if (u.indexOf(ap.vertical) === -1) {
                    throw new TypeError("widgetPositioning() expects vertical parameter to be one of (" + u.join(", ") + ")")
                }
                D.widgetPositioning.vertical = ap.vertical
            }
            O();
            return q
        };
        q.calendarWeeks = function (ap) {
            if (arguments.length === 0) {
                return D.calendarWeeks
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("calendarWeeks() expects parameter to be a boolean value")
            }
            D.calendarWeeks = ap;
            O();
            return q
        };
        q.showTodayButton = function (ap) {
            if (arguments.length === 0) {
                return D.showTodayButton
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("showTodayButton() expects a boolean parameter")
            }
            D.showTodayButton = ap;
            if (N) {
                ag();
                W()
            }
            return q
        };
        q.showClear = function (ap) {
            if (arguments.length === 0) {
                return D.showClear
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("showClear() expects a boolean parameter")
            }
            D.showClear = ap;
            if (N) {
                ag();
                W()
            }
            return q
        };
        q.widgetParent = function (ap) {
            if (arguments.length === 0) {
                return D.widgetParent
            }
            if (typeof ap === "string") {
                ap = b(ap)
            }
            if (ap !== null && (typeof ap !== "string" && !(ap instanceof b))) {
                throw new TypeError("widgetParent() expects a string or a jQuery object parameter")
            }
            D.widgetParent = ap;
            if (N) {
                ag();
                W()
            }
            return q
        };
        q.keepOpen = function (ap) {
            if (arguments.length === 0) {
                return D.keepOpen
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("keepOpen() expects a boolean parameter")
            }
            D.keepOpen = ap;
            return q
        };
        q.inline = function (ap) {
            if (arguments.length === 0) {
                return D.inline
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("inline() expects a boolean parameter")
            }
            D.inline = ap;
            return q
        };
        q.clear = function () {
            X();
            return q
        };
        q.keyBinds = function (ap) {
            D.keyBinds = ap;
            return q
        };
        q.debug = function (ap) {
            if (typeof ap !== "boolean") {
                throw new TypeError("debug() expects a boolean parameter")
            }
            D.debug = ap;
            return q
        };
        q.showClose = function (ap) {
            if (arguments.length === 0) {
                return D.showClose
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("showClose() expects a boolean parameter")
            }
            D.showClose = ap;
            return q
        };
        q.keepInvalid = function (ap) {
            if (arguments.length === 0) {
                return D.keepInvalid
            }
            if (typeof ap !== "boolean") {
                throw new TypeError("keepInvalid() expects a boolean parameter")
            }
            D.keepInvalid = ap;
            return q
        };
        q.datepickerInput = function (ap) {
            if (arguments.length === 0) {
                return D.datepickerInput
            }
            if (typeof ap !== "string") {
                throw new TypeError("datepickerInput() expects a string parameter")
            }
            D.datepickerInput = ap;
            return q
        };
        if (w.is("input")) {
            k = w
        } else {
            k = w.find(D.datepickerInput);
            if (k.size() === 0) {
                k = w.find("input")
            } else {
                if (!k.is("input")) {
                    throw new Error('CSS class "' + D.datepickerInput + '" cannot be applied to non input element')
                }
            }
        }
        if (w.hasClass("input-group")) {
            if (w.find(".datepickerbutton").size() === 0) {
                ak = w.find('[class^="input-group-"]')
            } else {
                ak = w.find(".datepickerbutton")
            }
        }
        if (!D.inline && !k.is("input")) {
            throw new Error("Could not initialize DateTimePicker without an input element")
        }
        b.extend(true, D, d());
        q.options(D);
        Z();
        v();
        if (k.prop("disabled")) {
            q.disable()
        }
        if (k.is("input") && k.val().trim().length !== 0) {
            T(V(k.val().trim()))
        } else {
            if (D.defaultDate && k.attr("placeholder") === undefined) {
                T(D.defaultDate)
            }
        }
        if (D.inline) {
            W()
        }
        return q
    };
    b.fn.datetimepicker = function (d) {
        return this.each(function () {
            var f = b(this);
            if (!f.data("DateTimePicker")) {
                d = b.extend(true, {}, b.fn.datetimepicker.defaults, d);
                f.data("DateTimePicker", a(f, d))
            }
        })
    };
    b.fn.datetimepicker.defaults = {
        format: false,
        dayViewHeaderFormat: "MMMM YYYY",
        extraFormats: false,
        stepping: 1,
        minDate: false,
        maxDate: false,
        useCurrent: true,
        collapse: true,
        locale: c.locale(),
        defaultDate: false,
        disabledDates: false,
        enabledDates: false,
        icons: {
            time: "glyphicon glyphicon-time",
            date: "glyphicon glyphicon-calendar",
            up: "glyphicon glyphicon-chevron-up",
            down: "glyphicon glyphicon-chevron-down",
            previous: "glyphicon glyphicon-chevron-left",
            next: "glyphicon glyphicon-chevron-right",
            today: "glyphicon glyphicon-screenshot",
            clear: "glyphicon glyphicon-trash",
            close: "glyphicon glyphicon-remove"
        },
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: [],
        calendarWeeks: false,
        viewMode: "days",
        toolbarPlacement: "default",
        showTodayButton: false,
        showClear: false,
        showClose: false,
        widgetPositioning: {horizontal: "auto", vertical: "auto"},
        widgetParent: null,
        ignoreReadonly: false,
        keepOpen: false,
        inline: false,
        keepInvalid: false,
        datepickerInput: ".datepickerinput",
        keyBinds: {
            up: function (f) {
                if (!f) {
                    return
                }
                var g = this.date() || c();
                if (f.find(".datepicker").is(":visible")) {
                    this.date(g.clone().subtract(7, "d"))
                } else {
                    this.date(g.clone().add(1, "m"))
                }
            }, down: function (f) {
                if (!f) {
                    this.show();
                    return
                }
                var g = this.date() || c();
                if (f.find(".datepicker").is(":visible")) {
                    this.date(g.clone().add(7, "d"))
                } else {
                    this.date(g.clone().subtract(1, "m"))
                }
            }, "control up": function (f) {
                if (!f) {
                    return
                }
                var g = this.date() || c();
                if (f.find(".datepicker").is(":visible")) {
                    this.date(g.clone().subtract(1, "y"))
                } else {
                    this.date(g.clone().add(1, "h"))
                }
            }, "control down": function (f) {
                if (!f) {
                    return
                }
                var g = this.date() || c();
                if (f.find(".datepicker").is(":visible")) {
                    this.date(g.clone().add(1, "y"))
                } else {
                    this.date(g.clone().subtract(1, "h"))
                }
            }, left: function (f) {
                if (!f) {
                    return
                }
                var g = this.date() || c();
                if (f.find(".datepicker").is(":visible")) {
                    this.date(g.clone().subtract(1, "d"))
                }
            }, right: function (f) {
                if (!f) {
                    return
                }
                var g = this.date() || c();
                if (f.find(".datepicker").is(":visible")) {
                    this.date(g.clone().add(1, "d"))
                }
            }, pageUp: function (f) {
                if (!f) {
                    return
                }
                var g = this.date() || c();
                if (f.find(".datepicker").is(":visible")) {
                    this.date(g.clone().subtract(1, "M"))
                }
            }, pageDown: function (f) {
                if (!f) {
                    return
                }
                var g = this.date() || c();
                if (f.find(".datepicker").is(":visible")) {
                    this.date(g.clone().add(1, "M"))
                }
            }, enter: function () {
                this.hide()
            }, escape: function () {
                this.hide()
            }, "control space": function (d) {
                if (d.find(".timepicker").is(":visible")) {
                    d.find('.btn[data-action="togglePeriod"]').click()
                }
            }, t: function () {
                this.date(c())
            }, "delete": function () {
                this.clear()
            }
        },
        debug: false
    }
}));
jQuery.fn.farbtastic = function (a) {
    $.farbtastic(this, a);
    return this
};
jQuery.farbtastic = function (a, b) {
    var a = $(a).get(0);
    return a.farbtastic || (a.farbtastic = new jQuery._farbtastic(a, b))
};
jQuery._farbtastic = function (a, d) {
    var b = this;
    $(a).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');
    var c = $(".farbtastic", a);
    b.wheel = $(".wheel", a).get(0);
    b.radius = 84;
    b.square = 100;
    b.width = 194;
    if (navigator.appVersion.match(/MSIE [0-6]\./)) {
        $("*", c).each(function () {
            if (this.currentStyle.backgroundImage != "none") {
                var f = this.currentStyle.backgroundImage;
                f = this.currentStyle.backgroundImage.substring(5, f.length - 2);
                $(this).css({
                    backgroundImage: "none",
                    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + f + "')"
                })
            }
        })
    }
    b.linkTo = function (f) {
        if (typeof b.callback == "object") {
            $(b.callback).unbind("keyup", b.updateValue)
        }
        b.color = null;
        if (typeof f == "function") {
            b.callback = f
        } else {
            if (typeof f == "object" || typeof f == "string") {
                b.callback = $(f);
                b.callback.bind("keyup", b.updateValue);
                if (b.callback.get(0).value) {
                    b.setColor(b.callback.get(0).value)
                }
            }
        }
        return this
    };
    b.updateValue = function (f) {
        if (this.value && this.value != b.color) {
            b.setColor(this.value)
        }
    };
    b.setColor = function (f) {
        var g = b.unpack(f);
        if (b.color != f && g) {
            b.color = f;
            b.rgb = g;
            b.hsl = b.RGBToHSL(b.rgb);
            b.updateDisplay()
        }
        return this
    };
    b.setHSL = function (f) {
        b.hsl = f;
        b.rgb = b.HSLToRGB(f);
        b.color = b.pack(b.rgb);
        b.updateDisplay();
        return this
    };
    b.widgetCoords = function (i) {
        var g, n;
        var h = i.target || i.srcElement;
        var f = b.wheel;
        if (typeof i.offsetX != "undefined") {
            var m = {x: i.offsetX, y: i.offsetY};
            var j = h;
            while (j) {
                j.mouseX = m.x;
                j.mouseY = m.y;
                m.x += j.offsetLeft;
                m.y += j.offsetTop;
                j = j.offsetParent
            }
            var j = f;
            var k = {x: 0, y: 0};
            while (j) {
                if (typeof j.mouseX != "undefined") {
                    g = j.mouseX - k.x;
                    n = j.mouseY - k.y;
                    break
                }
                k.x += j.offsetLeft;
                k.y += j.offsetTop;
                j = j.offsetParent
            }
            j = h;
            while (j) {
                j.mouseX = undefined;
                j.mouseY = undefined;
                j = j.offsetParent
            }
        } else {
            var m = b.absolutePosition(f);
            g = (i.pageX || 0 * (i.clientX + $("html").get(0).scrollLeft)) - m.x;
            n = (i.pageY || 0 * (i.clientY + $("html").get(0).scrollTop)) - m.y
        }
        return {x: g - b.width / 2, y: n - b.width / 2}
    };
    b.mousedown = function (f) {
        if (!document.dragging) {
            $(document).bind("mousemove", b.mousemove).bind("mouseup", b.mouseup);
            document.dragging = true
        }
        var g = b.widgetCoords(f);
        b.circleDrag = Math.max(Math.abs(g.x), Math.abs(g.y)) * 2 > b.square;
        b.mousemove(f);
        return false
    };
    b.mousemove = function (i) {
        var j = b.widgetCoords(i);
        if (b.circleDrag) {
            var h = Math.atan2(j.x, -j.y) / 6.28;
            if (h < 0) {
                h += 1
            }
            b.setHSL([h, b.hsl[1], b.hsl[2]])
        } else {
            var g = Math.max(0, Math.min(1, -(j.x / b.square) + 0.5));
            var f = Math.max(0, Math.min(1, -(j.y / b.square) + 0.5));
            b.setHSL([b.hsl[0], g, f])
        }
        return false
    };
    b.mouseup = function () {
        $(document).unbind("mousemove", b.mousemove);
        $(document).unbind("mouseup", b.mouseup);
        document.dragging = false
    };
    b.updateDisplay = function () {
        var f = b.hsl[0] * 6.28;
        $(".h-marker", c).css({
            left: Math.round(Math.sin(f) * b.radius + b.width / 2) + "px",
            top: Math.round(-Math.cos(f) * b.radius + b.width / 2) + "px"
        });
        $(".sl-marker", c).css({
            left: Math.round(b.square * (0.5 - b.hsl[1]) + b.width / 2) + "px",
            top: Math.round(b.square * (0.5 - b.hsl[2]) + b.width / 2) + "px"
        });
        $(".color", c).css("backgroundColor", b.pack(b.HSLToRGB([b.hsl[0], 1, 0.5])));
        if (typeof b.callback == "object") {
            $(b.callback).css({backgroundColor: b.color, color: b.hsl[2] > 0.5 ? "#000" : "#fff"});
            $(b.callback).each(function () {
                if (this.value && this.value != b.color) {
                    this.value = b.color
                }
            })
        } else {
            if (typeof b.callback == "function") {
                b.callback.call(b, b.color)
            }
        }
    };
    b.absolutePosition = function (g) {
        var h = {x: g.offsetLeft, y: g.offsetTop};
        if (g.offsetParent) {
            var f = b.absolutePosition(g.offsetParent);
            h.x += f.x;
            h.y += f.y
        }
        return h
    };
    b.pack = function (h) {
        var j = Math.round(h[0] * 255);
        var i = Math.round(h[1] * 255);
        var f = Math.round(h[2] * 255);
        return "#" + (j < 16 ? "0" : "") + j.toString(16) + (i < 16 ? "0" : "") + i.toString(16) + (f < 16 ? "0" : "") + f.toString(16)
    };
    b.unpack = function (f) {
        if (f.length == 7) {
            return [parseInt("0x" + f.substring(1, 3)) / 255, parseInt("0x" + f.substring(3, 5)) / 255, parseInt("0x" + f.substring(5, 7)) / 255]
        } else {
            if (f.length == 4) {
                return [parseInt("0x" + f.substring(1, 2)) / 15, parseInt("0x" + f.substring(2, 3)) / 15, parseInt("0x" + f.substring(3, 4)) / 15]
            }
        }
    };
    b.HSLToRGB = function (n) {
        var p, o, f, k, m;
        var j = n[0], q = n[1], i = n[2];
        o = (i <= 0.5) ? i * (q + 1) : i + q - i * q;
        p = i * 2 - o;
        return [this.hueToRGB(p, o, j + 0.33333), this.hueToRGB(p, o, j), this.hueToRGB(p, o, j - 0.33333)]
    };
    b.hueToRGB = function (g, f, i) {
        i = (i < 0) ? i + 1 : ((i > 1) ? i - 1 : i);
        if (i * 6 < 1) {
            return g + (f - g) * i * 6
        }
        if (i * 2 < 1) {
            return f
        }
        if (i * 3 < 2) {
            return g + (f - g) * (0.66666 - i) * 6
        }
        return g
    };
    b.RGBToHSL = function (n) {
        var j, p, q, k, t, i;
        var f = n[0], m = n[1], o = n[2];
        j = Math.min(f, Math.min(m, o));
        p = Math.max(f, Math.max(m, o));
        q = p - j;
        i = (j + p) / 2;
        t = 0;
        if (i > 0 && i < 1) {
            t = q / (i < 0.5 ? (2 * i) : (2 - 2 * i))
        }
        k = 0;
        if (q > 0) {
            if (p == f && p != m) {
                k += (m - o) / q
            }
            if (p == m && p != o) {
                k += (2 + (o - f) / q)
            }
            if (p == o && p != f) {
                k += (4 + (f - m) / q)
            }
            k /= 6
        }
        return [k, t, i]
    };
    $("*", c).mousedown(b.mousedown);
    b.setColor("#000000");
    if (d) {
        b.linkTo(d)
    }
};
/*!
 * Html5 Placeholder Polyfill - v2.0.4 - 2012-09-21
 * web: * http://blog.ginader.de/dev/jquery/HTML5-placeholder-polyfill/
 * issues: * https://github.com/ginader/HTML5-placeholder-polyfill/issues
 * Copyright (c) 2012 Dirk Ginader; Licensed MIT, GPL
*/
(function (j) {
    function b(f, a) {
        f.val() === "" ? f.data("placeholder").removeClass(a.hideClass) : f.data("placeholder").addClass(a.hideClass)
    }

    function g(f, a) {
        f.data("placeholder").addClass(a.hideClass)
    }

    function q(s, f) {
        var u = f.is("textarea"), o = f.offset();
        if (f.css("padding") && f.css("padding") !== "0px") {
            var a = f.css("padding").split(" ");
            o.top += Number(a[0].replace("px", "")), o.left += Number(a[a.length - 1].replace("px", ""))
        } else {
            f.css("padding-top") && f.css("padding-top") !== "0px" && (o.top += Number(f.css("padding-top").replace("px", ""))), f.css("padding-left") && f.css("padding-left") !== "0px" && (o.left += Number(f.css("padding-left").replace("px", "")))
        }
        s.css({
            width: f.innerWidth() - (u ? 20 : 4),
            height: f.innerHeight() - 6,
            lineHeight: f.css("line-height"),
            whiteSpace: u ? "normal" : "nowrap",
            overflow: "hidden"
        }).offset(o)
    }

    function c(n, a) {
        var i = n.val();
        (function f() {
            d = requestAnimationFrame(f), n.val() !== i && (g(n, a), k(), m(n, a))
        })()
    }

    function m(o, f) {
        var a = o.val();
        (function n() {
            d = requestAnimationFrame(n), b(o, f)
        })()
    }

    function k() {
        cancelAnimationFrame(d)
    }

    function h(a) {
        p && window.console && window.console.log && window.console.log(a)
    }

    var p = !1, d;
    j.fn.placeHolder = function (f) {
        h("init placeHolder");
        var i = this, a = j(this).length;
        return this.options = j.extend({
            className: "placeholder",
            visibleToScreenreaders: !0,
            visibleToScreenreadersHideClass: "placeholder-hide-except-screenreader",
            visibleToNoneHideClass: "placeholder-hide",
            hideOnFocus: !1,
            removeLabelClass: "visuallyhidden",
            hiddenOverrideClass: "visuallyhidden-with-placeholder",
            forceHiddenOverride: !0,
            forceApply: !1,
            autoInit: !0
        }, f), this.options.hideClass = this.options.visibleToScreenreaders ? this.options.visibleToScreenreadersHideClass : this.options.visibleToNoneHideClass, j(this).each(function (r) {
            var z = j(this), s = z.attr("placeholder"), w = z.attr("id"), y, o, n, u;
            y = z.closest("label"), z.removeAttr("placeholder");
            if (!y.length && !w) {
                h("the input element with the placeholder needs an id!");
                return
            }
            y = y.length ? y : j('label[for="' + w + '"]').first();
            if (!y.length) {
                h("the input element with the placeholder needs a label!");
                return
            }
            u = j(y).find(".placeholder");
            if (u.length) {
                return q(u, z), u.text(s), z
            }
            y.hasClass(i.options.removeLabelClass) && y.removeClass(i.options.removeLabelClass).addClass(i.options.hiddenOverrideClass), o = j('<span class="' + i.options.className + '">' + s + "</span>").appendTo(y), n = o.width() > z.width(), n && o.attr("title", s), q(o, z), z.data("placeholder", o), o.data("input", o), o.click(function () {
                j(this).data("input").focus()
            }), z.focusin(function () {
                !i.options.hideOnFocus && window.requestAnimationFrame ? c(z, i.options) : g(z, i.options)
            }), z.focusout(function () {
                b(j(this), i.options), !i.options.hideOnFocus && window.cancelAnimationFrame && k()
            }), b(z, i.options), j(document).bind("fontresize resize", function () {
                q(o, z)
            }), j.event.special.resize ? j("textarea").bind("resize", function (t) {
                q(o, z)
            }) : j("textarea").css("resize", "none"), r >= a - 1 && (j.attrHooks.placeholder = {
                get: function (v) {
                    return v.nodeName.toLowerCase() === "input" || v.nodeName.toLowerCase() === "textarea" ? j(v).data("placeholder") ? j(j(v).data("placeholder")).text() : j(v)[0].placeholder : undefined
                }, set: function (v, A) {
                    return j(j(v).data("placeholder")).text(A)
                }
            })
        })
    }, j(function () {
        var a = window.placeHolderConfig || {};
        if (a.autoInit === !1) {
            h("placeholder:abort because autoInit is off");
            return
        }
        if ("placeholder" in j("<input>")[0] && !a.forceApply) {
            h("placeholder:abort because browser has native support");
            return
        }
        j("input[placeholder], textarea[placeholder]").placeHolder(a)
    })
})(jQuery);
/*! jqbrowser */
;new function () {
    var j = {
        browser: function () {
            return p.browser
        }, version: {
            number: function () {
                return p.version.number
            }, string: function () {
                return p.version.string
            }
        }, OS: function () {
            return p.OS
        }, aol: function () {
            return p.aol
        }, camino: function () {
            return p.camino
        }, firefox: function () {
            return p.firefox
        }, flock: function () {
            return p.flock
        }, icab: function () {
            return p.icab
        }, konqueror: function () {
            return p.konqueror
        }, mozilla: function () {
            return p.mozilla
        }, msie: function () {
            return p.msie
        }, netscape: function () {
            return p.netscape
        }, opera: function () {
            return p.opera
        }, safari: function () {
            return p.safari
        }, linux: function () {
            return p.linux
        }, mac: function () {
            return p.mac
        }, win: function () {
            return p.win
        }
    };
    $.browser = j;
    var p = {
        browser: "Unknown",
        version: {number: undefined, string: "Unknown"},
        OS: "Unknown",
        aol: false,
        camino: false,
        firefox: false,
        flock: false,
        icab: false,
        konqueror: false,
        mozilla: false,
        msie: false,
        netscape: false,
        opera: false,
        safari: false,
        linux: false,
        mac: false,
        win: false
    };
    for (var d = 0, b = navigator.userAgent, g = navigator.vendor, q = [{
        name: "Safari", browser: function () {
            return /Apple/.test(g)
        }
    }, {
        name: "Opera", browser: function () {
            return window.opera != undefined
        }
    }, {
        name: "iCab", browser: function () {
            return /iCab/.test(g)
        }
    }, {
        name: "Konqueror", browser: function () {
            return /KDE/.test(g)
        }
    }, {
        identifier: "aol", name: "AOL Explorer", browser: function () {
            return /America Online Browser/.test(b)
        }, version: function () {
            return b.match(/rev(\d+(?:\.\d+)+)/)
        }
    }, {
        name: "Flock", browser: function () {
            return /Flock/.test(b)
        }
    }, {
        name: "Camino", browser: function () {
            return /Camino/.test(g)
        }
    }, {
        name: "Firefox", browser: function () {
            return /Firefox/.test(b)
        }
    }, {
        name: "Netscape", browser: function () {
            return /Netscape/.test(b)
        }
    }, {
        identifier: "msie", name: "Internet Explorer", browser: function () {
            return /MSIE/.test(b)
        }, version: function () {
            return b.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/)
        }
    }, {
        name: "Mozilla", browser: function () {
            return /Gecko|Mozilla/.test(b)
        }, version: function () {
            return b.match(/rv:(\d+(?:\.\d+)+)/)
        }
    }]; d < q.length; d++) {
        if (q[d].browser()) {
            var c = q[d].identifier ? q[d].identifier : q[d].name.toLowerCase();
            p[c] = true;
            p.browser = q[d].name;
            var m;
            if (q[d].version != undefined && (m = q[d].version())) {
                p.version.string = m[1];
                p.version.number = parseFloat(m[1])
            } else {
                var k = new RegExp(q[d].name + "(?:\\s|\\/)(\\d+(?:\\.\\d+)+(?:(?:a|b)\\d*)?)");
                m = b.match(k);
                if (m != undefined) {
                    p.version.string = m[1];
                    p.version.number = parseFloat(m[1])
                }
            }
            break
        }
    }
    for (var d = 0, h = navigator.platform, q = [{
        identifier: "win", name: "Windows", OS: function () {
            return /Win/.test(h)
        }
    }, {
        name: "Mac", OS: function () {
            return /Mac/.test(h)
        }
    }, {
        name: "Linux", OS: function () {
            return /Linux/.test(h)
        }
    }]; d < q.length; d++) {
        if (q[d].OS()) {
            var c = q[d].identifier ? q[d].identifier : q[d].name.toLowerCase();
            p[c] = true;
            p.OS = q[d].name;
            break
        }
    }
};
/*!
 * NETEYE Activity Indicator jQuery Plugin
 *
 * Copyright (c) 2010 NETEYE GmbH
 * Licensed under the MIT license
 *
 * Author: Felix Gnass [fgnass at neteye dot de]
 * Version: 1.0.0
 */
(function (g) {
    g.fn.activity = function (i) {
        this.each(function () {
            var o = g(this);
            var m = o.data("activity");
            if (m) {
                clearInterval(m.data("interval"));
                m.remove();
                o.removeData("activity")
            }
            if (i !== false) {
                i = g.extend({color: o.css("color")}, g.fn.activity.defaults, i);
                m = f(o, i).css("position", "absolute").prependTo(i.outside ? "body" : o);
                var k = o.outerHeight() - m.height();
                var j = o.outerWidth() - m.width();
                var n = {
                    top: i.valign == "top" ? i.padding : i.valign == "bottom" ? k - i.padding : Math.floor(k / 2),
                    left: i.align == "left" ? i.padding : i.align == "right" ? j - i.padding : Math.floor(j / 2)
                };
                var p = o.offset();
                if (i.outside) {
                    m.css({top: p.top + "px", left: p.left + "px"})
                } else {
                    n.top -= m.offset().top - p.top;
                    n.left -= m.offset().left - p.left
                }
                m.css({marginTop: n.top + "px", marginLeft: n.left + "px"});
                b(m, i.segments, Math.round(10 / i.speed) / 10);
                o.data("activity", m)
            }
        });
        return this
    };
    g.fn.activity.defaults = {
        segments: 12,
        space: 3,
        length: 7,
        width: 4,
        speed: 1.2,
        align: "center",
        valign: "center",
        padding: 4
    };
    g.fn.activity.getOpacity = function (n, m) {
        var k = n.steps || n.segments - 1;
        var j = n.opacity !== undefined ? n.opacity : 1 / k;
        return 1 - Math.min(m, k) * (1 - j) / k
    };
    var f = function () {
        return g("<div>").addClass("busy")
    };
    var b = function () {
    };

    function a(j, i) {
        var k = document.createElementNS("http://www.w3.org/2000/svg", j || "svg");
        if (i) {
            g.each(i, function (n, m) {
                k.setAttributeNS(null, n, m)
            })
        }
        return g(k)
    }

    if (document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) {
        f = function (p, q) {
            var o = q.width * 2 + q.space;
            var n = (o + q.length + Math.ceil(q.width / 2) + 1);
            var k = a().width(n * 2).height(n * 2);
            var m = a("g", {
                "stroke-width": q.width,
                "stroke-linecap": "round",
                stroke: q.color
            }).appendTo(a("g", {transform: "translate(" + n + "," + n + ")"}).appendTo(k));
            for (var j = 0; j < q.segments; j++) {
                m.append(a("line", {
                    x1: 0,
                    y1: o,
                    x2: 0,
                    y2: o + q.length,
                    transform: "rotate(" + (360 / q.segments * j) + ", 0, 0)",
                    opacity: g.fn.activity.getOpacity(q, j)
                }))
            }
            return g("<div>").append(k).width(2 * n).height(2 * n)
        };
        if (document.createElement("div").style.WebkitAnimationName !== undefined) {
            var h = {};
            b = function (k, p, m) {
                if (!h[p]) {
                    var j = "spin" + p;
                    var o = "@-webkit-keyframes " + j + " {";
                    for (var n = 0; n < p; n++) {
                        var s = Math.round(100000 / p * n) / 1000;
                        var r = Math.round(100000 / p * (n + 1) - 1) / 1000;
                        var q = "% { -webkit-transform:rotate(" + Math.round(360 / p * n) + "deg); }\n";
                        o += s + q + r + q
                    }
                    o += "100% { -webkit-transform:rotate(100deg); }\n}";
                    document.styleSheets[0].insertRule(o, document.styleSheets[0].rules.length);
                    h[p] = j
                }
                k.css("-webkit-animation", h[p] + " " + m + "s linear infinite")
            }
        } else {
            b = function (k, i, n) {
                var j = 0;
                var m = k.find("g g").get(0);
                k.data("interval", setInterval(function () {
                    m.setAttributeNS(null, "transform", "rotate(" + (++j % i * (360 / i)) + ")")
                }, n * 1000 / i))
            }
        }
    } else {
        var d = g("<shape>").css("behavior", "url(#default#VML)").appendTo("body");
        if (d.get(0).adj) {
            var c = document.createStyleSheet();
            g.each(["group", "shape", "stroke"], function () {
                c.addRule(this, "behavior:url(#default#VML);")
            });
            f = function (q, u) {
                var p = u.width * 2 + u.space;
                var n = (p + u.length + Math.ceil(u.width / 2) + 1);
                var m = n * 2;
                var t = -Math.ceil(m / 2);
                var k = g("<group>", {coordsize: m + " " + m, coordorigin: t + " " + t}).css({
                    top: t,
                    left: t,
                    width: m,
                    height: m
                });
                for (var j = 0; j < u.segments; j++) {
                    k.append(g("<shape>", {path: "m " + p + ",0  l " + (p + u.length) + ",0"}).css({
                        width: m,
                        height: m,
                        rotation: (360 / u.segments * j) + "deg"
                    }).append(g("<stroke>", {
                        color: u.color,
                        weight: u.width + "px",
                        endcap: "round",
                        opacity: g.fn.activity.getOpacity(u, j)
                    })))
                }
                return g("<group>", {coordsize: m + " " + m}).css({width: m, height: m, overflow: "hidden"}).append(k)
            };
            b = function (k, i, n) {
                var j = 0;
                var m = k.get(0);
                k.data("interval", setInterval(function () {
                    m.style.rotation = ++j % i * (360 / i)
                }, n * 1000 / i))
            }
        }
        g(d).remove()
    }
})(jQuery);
/*! highlight */
;!function (a) {
    "undefined" != typeof exports ? a(exports) : (window.hljs = a({}), "function" == typeof define && define.amd && define([], function () {
        return window.hljs
    }))
}(function (P) {
    function H(a) {
        return a.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function B(a) {
        return a.nodeName.toLowerCase()
    }

    function D(b, c) {
        var a = b && b.exec(c);
        return a && 0 == a.index
    }

    function T(a) {
        var b = (a.className + " " + (a.parentNode ? a.parentNode.className : "")).split(/\s+/);
        return b = b.map(function (c) {
            return c.replace(/^lang(uage)?-/, "")
        }), b.filter(function (c) {
            return j(c) || /no(-?)highlight|plain|text/.test(c)
        })[0]
    }

    function K(c, d) {
        var a, b = {};
        for (a in c) {
            b[a] = c[a]
        }
        if (d) {
            for (a in d) {
                b[a] = d[a]
            }
        }
        return b
    }

    function G(b) {
        var c = [];
        return function a(g, d) {
            for (var f = g.firstChild; f; f = f.nextSibling) {
                3 == f.nodeType ? d += f.nodeValue.length : 1 == f.nodeType && (c.push({
                    event: "start",
                    offset: d,
                    node: f
                }), d = a(f, d), B(f).match(/br|hr|img|input/) || c.push({event: "stop", offset: d, node: f}))
            }
            return d
        }(b, 0), c
    }

    function z(t, b, w) {
        function m() {
            return t.length && b.length ? t[0].offset != b[0].offset ? t[0].offset < b[0].offset ? t : b : "start" == b[0].event ? t : b : t.length ? t : b
        }

        function d(c) {
            function a(f) {
                return " " + f.nodeName + '="' + H(f.value) + '"'
            }

            h += "<" + B(c) + Array.prototype.map.call(c.attributes, a).join("") + ">"
        }

        function E(a) {
            h += "</" + B(a) + ">"
        }

        function v(a) {
            ("start" == a.event ? d : E)(a.node)
        }

        for (var N = 0, h = "", p = []; t.length || b.length;) {
            var n = m();
            if (h += H(w.substr(N, n[0].offset - N)), N = n[0].offset, n == t) {
                p.reverse().forEach(E);
                do {
                    v(n.splice(0, 1)[0]), n = m()
                } while (n == t && n.length && n[0].offset == N);
                p.reverse().forEach(d)
            } else {
                "start" == n[0].event ? p.push(n[0].node) : p.pop(), v(n.splice(0, 1)[0])
            }
        }
        return h + H(w.substr(N))
    }

    function R(c) {
        function d(f) {
            return f && f.source || f
        }

        function a(f, g) {
            return new RegExp(d(f), "m" + (c.cI ? "i" : "") + (g ? "g" : ""))
        }

        function b(g, m) {
            if (!g.compiled) {
                if (g.compiled = !0, g.k = g.k || g.bK, g.k) {
                    var h = {}, n = function (p, o) {
                        c.cI && (o = o.toLowerCase()), o.split(" ").forEach(function (s) {
                            var r = s.split("|");
                            h[r[0]] = [p, r[1] ? Number(r[1]) : 1]
                        })
                    };
                    "string" == typeof g.k ? n("keyword", g.k) : Object.keys(g.k).forEach(function (o) {
                        n(o, g.k[o])
                    }), g.k = h
                }
                g.lR = a(g.l || /\b\w+\b/, !0), m && (g.bK && (g.b = "\\b(" + g.bK.split(" ").join("|") + ")\\b"), g.b || (g.b = /\B|\b/), g.bR = a(g.b), g.e || g.eW || (g.e = /\B|\b/), g.e && (g.eR = a(g.e)), g.tE = d(g.e) || "", g.eW && m.tE && (g.tE += (g.e ? "|" : "") + m.tE)), g.i && (g.iR = a(g.i)), void 0 === g.r && (g.r = 1), g.c || (g.c = []);
                var i = [];
                g.c.forEach(function (o) {
                    o.v ? o.v.forEach(function (p) {
                        i.push(K(o, p))
                    }) : i.push("self" == o ? g : o)
                }), g.c = i, g.c.forEach(function (o) {
                    b(o, g)
                }), g.starts && b(g.starts, m);
                var f = g.c.map(function (o) {
                    return o.bK ? "\\.?(" + o.b + ")\\.?" : o.b
                }).concat([g.tE, g.i]).map(d).filter(Boolean);
                g.t = f.length ? a(f.join("|"), !0) : {
                    exec: function () {
                        return null
                    }
                }
            }
        }

        b(c)
    }

    function C(aj, X, am, af) {
        function ab(b, d) {
            for (var a = 0; a < d.c.length; a++) {
                if (D(d.c[a].bR, b)) {
                    return d.c[a]
                }
            }
        }

        function V(a, b) {
            if (D(a.eR, b)) {
                for (; a.endsParent && a.parent;) {
                    a = a.parent
                }
                return a
            }
            return a.eW ? V(a.parent, b) : void 0
        }

        function ai(a, b) {
            return !am && D(b.iR, a)
        }

        function ah(b, d) {
            var a = W.cI ? d[0].toLowerCase() : d[0];
            return b.k.hasOwnProperty(a) && b.k[a]
        }

        function aa(h, p, f, g) {
            var b = g ? "" : k.classPrefix, d = '<span class="' + b, m = f ? "" : "</span>";
            return d += h + '">', d + p + m
        }

        function ak() {
            if (!s.k) {
                return H(w)
            }
            var g = "", d = 0;
            s.lR.lastIndex = 0;
            for (var f = s.lR.exec(w); f;) {
                g += H(w.substr(d, f.index - d));
                var b = ah(s, f);
                b ? (Z += b[1], g += aa(b[0], H(f[0]))) : g += H(f[0]), d = s.lR.lastIndex, f = s.lR.exec(w)
            }
            return g + H(w.substr(d))
        }

        function ag() {
            if (s.sL && !q[s.sL]) {
                return H(w)
            }
            var a = s.sL ? C(s.sL, w, !0, r[s.sL]) : J(w);
            return s.r > 0 && (Z += a.r), "continuous" == s.subLanguageMode && (r[s.sL] = a.top), aa(a.language, a.value, !1, !0)
        }

        function al() {
            return void 0 !== s.sL ? ag() : ak()
        }

        function U(d, a) {
            var b = d.cN ? aa(d.cN, "", !0) : "";
            d.rB ? (ad += b, w = "") : d.eB ? (ad += H(a) + b, w = "") : (ad += b, w = a), s = Object.create(d, {parent: {value: s}})
        }

        function ac(h, f) {
            if (w += h, void 0 === f) {
                return ad += al(), 0
            }
            var g = ab(f, s);
            if (g) {
                return ad += al(), U(g, f), g.rB ? 0 : f.length
            }
            var b = V(s, f);
            if (b) {
                var d = s;
                d.rE || d.eE || (w += f), ad += al();
                do {
                    s.cN && (ad += "</span>"), Z += s.r, s = s.parent
                } while (s != b.parent);
                return d.eE && (ad += H(f)), w = "", b.starts && U(b.starts, ""), d.rE ? 0 : f.length
            }
            if (ai(f, s)) {
                throw new Error('Illegal lexeme "' + f + '" for mode "' + (s.cN || "<unnamed>") + '"')
            }
            return w += f, f.length || 1
        }

        var W = j(aj);
        if (!W) {
            throw new Error('Unknown language: "' + aj + '"')
        }
        R(W);
        var n, s = af || W, r = {}, ad = "";
        for (n = s; n != W; n = n.parent) {
            n.cN && (ad = aa(n.cN, "", !0) + ad)
        }
        var w = "", Z = 0;
        try {
            for (var Y, ae, N = 0; ;) {
                if (s.t.lastIndex = N, Y = s.t.exec(X), !Y) {
                    break
                }
                ae = ac(X.substr(N, Y.index - N), Y[0]), N = Y.index + ae
            }
            for (ac(X.substr(N)), n = s; n.parent; n = n.parent) {
                n.cN && (ad += "</span>")
            }
            return {r: Z, value: ad, language: aj, top: s}
        } catch (c) {
            if (-1 != c.message.indexOf("Illegal")) {
                return {r: 0, value: H(X)}
            }
            throw c
        }
    }

    function J(f, c) {
        c = c || k.languages || Object.keys(q);
        var d = {r: 0, value: H(f)}, b = d;
        return c.forEach(function (g) {
            if (j(g)) {
                var a = C(g, f, !1);
                a.language = g, a.r > b.r && (b = a), a.r > d.r && (b = d, d = a)
            }
        }), b.language && (d.second_best = b), d
    }

    function O(a) {
        return k.tabReplace && (a = a.replace(/^((<[^>]+>|\t)+)/gm, function (b, c) {
            return c.replace(/\t/g, k.tabReplace)
        })), k.useBR && (a = a.replace(/\n/g, "<br>")), a
    }

    function M(f, g, c) {
        var d = g ? A[g] : c, b = [f.trim()];
        return f.match(/\bhljs\b/) || b.push("hljs"), -1 === f.indexOf(d) && b.push(d), b.join(" ").trim()
    }

    function F(g) {
        var m = T(g);
        if (!/no(-?)highlight|plain|text/.test(m)) {
            var b;
            k.useBR ? (b = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), b.innerHTML = g.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : b = g;
            var d = b.textContent, a = m ? C(m, d, !0) : J(d), h = G(b);
            if (h.length) {
                var f = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                f.innerHTML = a.value, a.value = z(h, G(f), d)
            }
            a.value = O(a.value), g.innerHTML = a.value, g.className = M(g.className, m, a.language), g.result = {
                language: a.language,
                re: a.r
            }, a.second_best && (g.second_best = {language: a.second_best.language, re: a.second_best.r})
        }
    }

    function Q(a) {
        k = K(k, a)
    }

    function L() {
        if (!L.called) {
            L.called = !0;
            var a = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(a, F)
        }
    }

    function S() {
        addEventListener("DOMContentLoaded", L, !1), addEventListener("load", L, !1)
    }

    function y(c, a) {
        var b = q[c] = a(P);
        b.aliases && b.aliases.forEach(function (d) {
            A[d] = c
        })
    }

    function I() {
        return Object.keys(q)
    }

    function j(a) {
        return q[a] || q[A[a]]
    }

    var k = {classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0}, q = {}, A = {};
    return P.highlight = C, P.highlightAuto = J, P.fixMarkup = O, P.highlightBlock = F, P.configure = Q, P.initHighlighting = L, P.initHighlightingOnLoad = S, P.registerLanguage = y, P.listLanguages = I, P.getLanguage = j, P.inherit = K, P.IR = "[a-zA-Z]\\w*", P.UIR = "[a-zA-Z_]\\w*", P.NR = "\\b\\d+(\\.\\d+)?", P.CNR = "\\b(0[xX][a-fA-F0-9]+|(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", P.BNR = "\\b(0b[01]+)", P.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", P.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, P.ASM = {cN: "string", b: "'", e: "'", i: "\\n", c: [P.BE]}, P.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [P.BE]
    }, P.PWM = {b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/}, P.C = function (f, c, d) {
        var b = P.inherit({cN: "comment", b: f, e: c, c: []}, d || {});
        return b.c.push(P.PWM), b
    }, P.CLCM = P.C("//", "$"), P.CBCM = P.C("/\\*", "\\*/"), P.HCM = P.C("#", "$"), P.NM = {
        cN: "number",
        b: P.NR,
        r: 0
    }, P.CNM = {cN: "number", b: P.CNR, r: 0}, P.BNM = {cN: "number", b: P.BNR, r: 0}, P.CSSNM = {
        cN: "number",
        b: P.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, P.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [P.BE, {b: /\[/, e: /\]/, r: 0, c: [P.BE]}]
    }, P.TM = {cN: "title", b: P.IR, r: 0}, P.UTM = {cN: "title", b: P.UIR, r: 0}, P
});
hljs.registerLanguage("json", function (f) {
    var d = {literal: "true false null"}, b = [f.QSM, f.CNM], a = {cN: "value", e: ",", eW: !0, eE: !0, c: b, k: d},
        h = {
            b: "{",
            e: "}",
            c: [{cN: "attribute", b: '\\s*"', e: '"\\s*:\\s*', eB: !0, eE: !0, c: [f.BE], i: "\\n", starts: a}],
            i: "\\S"
        }, g = {b: "\\[", e: "\\]", c: [f.inherit(a, {cN: null})], i: "\\S"};
    return b.splice(b.length, 0, h, g), {c: b, k: d, i: "\\S"}
});
(function e(b, g, d) {
    function c(k, i) {
        if (!g[k]) {
            if (!b[k]) {
                var h = typeof require == "function" && require;
                if (!i && h) {
                    return h(k, !0)
                }
                if (a) {
                    return a(k, !0)
                }
                throw new Error("Cannot find module '" + k + "'")
            }
            var j = g[k] = {exports: {}};
            b[k][0].call(j.exports, function (m) {
                var o = b[k][1][m];
                return c(o ? o : m)
            }, j, j.exports, e, b, g, d)
        }
        return g[k].exports
    }

    var a = typeof require == "function" && require;
    for (var f = 0; f < d.length; f++) {
        c(d[f])
    }
    return c
})({
    1: [function (b, c, a) {
        (function () {
            var g, j, f, d, i, h = [].slice;
            g = jQuery;
            j = b("./modules/bus");
            f = b("./modules/leg");
            i = g.tourbus = function () {
                var k, m;
                k = 1 <= arguments.length ? h.call(arguments, 0) : [];
                m = k[0];
                if (d.hasOwnProperty(m)) {
                    k = k.slice(1)
                } else {
                    if (m instanceof g) {
                        m = "build"
                    } else {
                        if (typeof m === "string") {
                            m = "build";
                            k[0] = g(k[0])
                        } else {
                            g.error("Unknown method of $.tourbus --", k)
                        }
                    }
                }
                return d[m].apply(this, k)
            };
            g.fn.tourbus = function () {
                var k;
                k = 1 <= arguments.length ? h.call(arguments, 0) : [];
                return this.each(function () {
                    k.unshift(g(this));
                    i.apply(null, ["build"].concat(h.call(k)));
                    return this
                })
            };
            d = {
                build: function (n, k) {
                    var m;
                    if (k == null) {
                        k = {}
                    }
                    k = g.extend(true, {}, i.defaults, k);
                    m = [];
                    if (!(n instanceof g)) {
                        n = g(n)
                    }
                    n.each(function () {
                        return m.push(new j(this, k))
                    });
                    if (m.length === 0) {
                        g.error("" + n.selector + " was not found!")
                    }
                    if (m.length === 1) {
                        return m[0]
                    }
                    return m
                }, destroyAll: function () {
                    var m, n, o, k;
                    o = j._busses;
                    k = [];
                    for (n in o) {
                        m = o[n];
                        k.push(m.destroy())
                    }
                    return k
                }, expose: function (k) {
                    return k.tourbus = {Bus: j, Leg: f}
                }
            };
            i.defaults = {
                debug: false,
                autoDepart: false,
                container: "body",
                "class": null,
                startAt: 0,
                onDepart: function () {
                    return null
                },
                onStop: function () {
                    return null
                },
                onLegStart: function () {
                    return null
                },
                onLegEnd: function () {
                    return null
                },
                leg: {
                    "class": null,
                    scrollTo: null,
                    scrollSpeed: 150,
                    scrollContext: 100,
                    orientation: "bottom",
                    align: "left",
                    width: "auto",
                    margin: 10,
                    top: null,
                    left: null,
                    zindex: 9999,
                    arrow: "50%"
                }
            }
        }).call(this)
    }, {"./modules/bus": 2, "./modules/leg": 3}], 2: [function (b, c, a) {
        (function () {
            var g, i, f, d, h = [].slice;
            g = jQuery;
            f = b("./leg");
            d = b("./utils");
            c.exports = i = (function () {
                j._busses = {};
                j._tours = 0;
                j.uniqueId = function () {
                    return this._tours++
                };

                function j(m, k) {
                    this.options = k;
                    this.id = this.constructor.uniqueId();
                    this.elId = "tourbus-" + this.id;
                    this.constructor._busses[this.id] = this;
                    this.$original = g(m);
                    this.rawData = this.$original.data();
                    this.$container = g(d.dataProp(this.rawData.container, this.options.container));
                    this.$original.data({tourbus: this});
                    this.currentLegIndex = null;
                    this.legs = [];
                    this.legEls = this.$original.children("li");
                    this.totalLegs = this.legEls.length;
                    this._configureElement();
                    this._setupEvents();
                    if (d.dataProp(this.rawData.autoDepart, this.options.autoDepart)) {
                        this.$original.trigger("depart.tourbus")
                    }
                    this._log("built tourbus with el", m.toString(), "and options", this.options)
                }

                j.prototype.depart = function () {
                    this.running = true;
                    this.options.onDepart(this);
                    this._log("departing", this);
                    this.currentLegIndex = d.dataProp(this.rawData.startAt, this.options.startAt);
                    return this.showLeg()
                };
                j.prototype.stop = function () {
                    if (!this.running) {
                        return
                    }
                    g.each(this.legs, g.proxy(this.hideLeg, this));
                    this.currentLegIndex = null;
                    this.options.onStop(this);
                    return this.running = false
                };
                j.prototype.on = function (n, k, m) {
                    return this.$container.on(n, k, m)
                };
                j.prototype.currentLeg = function () {
                    if (this.currentLegIndex === null) {
                        return null
                    }
                    return this.legs[this.currentLegIndex]
                };
                j.prototype.buildLeg = function (m) {
                    var k, o, n;
                    k = g(this.legEls[m]);
                    o = k.data();
                    this.legs[m] = n = new f({bus: this, original: k, target: o.el || "body", index: m, rawData: o});
                    n.render();
                    this.$el.append(n.$el);
                    n._position();
                    n.hide();
                    return n
                };
                j.prototype.showLeg = function (m) {
                    var n, k;
                    if (m == null) {
                        m = this.currentLegIndex
                    }
                    n = this.legs[m] || this.buildLeg(m);
                    this._log("showLeg:", n);
                    k = this.options.onLegStart(n, this);
                    if (k !== false) {
                        n.show()
                    }
                    if (++m < this.totalLegs && !this.legs[m]) {
                        return this.buildLeg(m)
                    }
                };
                j.prototype.hideLeg = function (m) {
                    var n, k;
                    if (m == null) {
                        m = this.currentLegIndex
                    }
                    n = this.legs[m];
                    if (n && n.visible) {
                        this._log("hideLeg:", n);
                        k = this.options.onLegEnd(n, this);
                        if (k !== false) {
                            n.hide()
                        }
                    }
                    if (--m > 0 && !this.legs[m]) {
                        return this.buildLeg(m)
                    }
                };
                j.prototype.repositionLegs = function () {
                    return g.each(this.legs, function () {
                        return this.reposition()
                    })
                };
                j.prototype.next = function () {
                    this.hideLeg();
                    this.currentLegIndex++;
                    if (this.currentLegIndex > this.totalLegs - 1) {
                        return this.$original.trigger("stop.tourbus")
                    } else {
                        return this.showLeg()
                    }
                };
                j.prototype.prev = function (k) {
                    this.hideLeg();
                    this.currentLegIndex--;
                    if (this.currentLegIndex < 0) {
                        return this.$original.trigger("stop.tourbus")
                    } else {
                        return this.showLeg()
                    }
                };
                j.prototype.destroy = function () {
                    g.each(this.legs, function () {
                        return this.destroy()
                    });
                    this.legs = [];
                    delete this.constructor._busses[this.id];
                    this._teardownEvents();
                    this.$original.removeData("tourbus");
                    return this.$el.remove()
                };
                j.prototype._configureElement = function () {
                    this.$el = g("<div class='tourbus-container'></div>");
                    this.el = this.$el[0];
                    this.$el.attr({id: this.elId});
                    this.$el.addClass(d.dataProp(this.rawData["class"], this.options["class"]));
                    return this.$container.append(this.$el)
                };
                j.prototype._log = function () {
                    if (!d.dataProp(this.rawData.debug, this.options.debug)) {
                        return
                    }
                    return console.log.apply(console, ["TOURBUS " + this.id + ":"].concat(h.call(arguments)))
                };
                j.prototype._setupEvents = function () {
                    this.$original.on("depart.tourbus", g.proxy(this.depart, this));
                    this.$original.on("stop.tourbus", g.proxy(this.stop, this));
                    this.$original.on("next.tourbus", g.proxy(this.next, this));
                    return this.$original.on("prev.tourbus", g.proxy(this.prev, this))
                };
                j.prototype._teardownEvents = function () {
                    return this.$original.off(".tourbus")
                };
                return j
            })()
        }).call(this)
    }, {"./leg": 3, "./utils": 4}], 3: [function (b, c, a) {
        (function () {
            var g, f, d, h;
            g = jQuery;
            d = b("./utils");
            c.exports = f = (function () {
                function i(j) {
                    this.options = j;
                    this.$original = this.options.original;
                    this.bus = this.options.bus;
                    this.rawData = this.options.rawData;
                    this.index = this.options.index;
                    this.$target = g(this.options.target);
                    this.id = "" + this.bus.id + "-" + this.options.index;
                    this.elId = "tourbus-leg-" + this.id;
                    this.visible = false;
                    if (this.$target.length === 0) {
                        throw"" + this.$target.selector + " is not an element!"
                    }
                    this.content = this.$original.html();
                    this._setupOptions();
                    this._configureElement();
                    this._configureTarget();
                    this._configureScroll();
                    this._setupEvents();
                    this.bus._log("leg " + this.index + " made with options", this.options)
                }

                i.prototype.render = function () {
                    var k, j;
                    k = this.options.orientation === "centered" ? "" : "tourbus-arrow";
                    this.$el.addClass(" " + k + " tourbus-arrow-" + this.options.orientation + " ");
                    j = "<div class='tourbus-leg-inner'>\n  " + this.content + "\n</div>";
                    this.$el.css({width: this.options.width, zIndex: this.options.zindex}).html(j);
                    return this
                };
                i.prototype.destroy = function () {
                    this.$el.remove();
                    return this._teardownEvents()
                };
                i.prototype.reposition = function () {
                    this._configureTarget();
                    return this._position()
                };
                i.prototype._position = function () {
                    var k, m, n, j;
                    if (this.options.orientation !== "centered") {
                        n = {};
                        m = {top: "left", bottom: "left", left: "top", right: "top"};
                        if (typeof this.options.arrow === "number") {
                            this.options.arrow += "px"
                        }
                        n[m[this.options.orientation]] = this.options.arrow;
                        j = "#" + this.elId + ".tourbus-arrow";
                        this.bus._log("adding rule for " + this.elId, n);
                        h("" + j + ":before, " + j + ":after", n)
                    }
                    k = this._offsets();
                    this.bus._log("setting offsets on leg", k);
                    return this.$el.css(k)
                };
                i.prototype.show = function () {
                    this.visible = true;
                    this.$el.css({visibility: "visible", opacity: 1, zIndex: this.options.zindex});
                    return this.scrollIntoView()
                };
                i.prototype.hide = function () {
                    this.visible = false;
                    if (this.bus.options.debug) {
                        return this.$el.css({visibility: "visible", opacity: 0.4, zIndex: 0})
                    } else {
                        return this.$el.css({visibility: "hidden"})
                    }
                };
                i.prototype.scrollIntoView = function () {
                    var j;
                    if (!this.willScroll) {
                        return
                    }
                    j = d.dataProp(this.options.scrollTo, this.$el);
                    this.bus._log("scrolling to", j, this.scrollSettings);
                    return g.scrollTo(j, this.scrollSettings)
                };
                i.prototype._setupOptions = function () {
                    var n, m, p, o, k, j;
                    m = this.bus.options.leg;
                    n = ["class", "top", "left", "scrollTo", "scrollSpeed", "scrollContext", "margin", "arrow", "align", "width", "zindex", "orientation"];
                    j = [];
                    for (o = 0, k = n.length; o < k; o++) {
                        p = n[o];
                        j.push(this.options[p] = d.dataProp(this.rawData[p], m[p]))
                    }
                    return j
                };
                i.prototype._configureElement = function () {
                    this.$el = g("<div class='tourbus-leg'></div>");
                    this.el = this.$el[0];
                    this.$el.attr({id: this.elId});
                    this.$el.addClass(this.options["class"]);
                    return this.$el.css({zIndex: this.options.zindex})
                };
                i.prototype._setupEvents = function () {
                    this.$el.on("click", ".tourbus-next", g.proxy(this.bus.next, this.bus));
                    this.$el.on("click", ".tourbus-prev", g.proxy(this.bus.prev, this.bus));
                    return this.$el.on("click", ".tourbus-stop", g.proxy(this.bus.stop, this.bus))
                };
                i.prototype._teardownEvents = function () {
                    return this.$el.off("click")
                };
                i.prototype._configureTarget = function () {
                    this.targetOffset = this.$target.offset();
                    if (d.dataProp(this.options.top, false)) {
                        this.targetOffset.top = this.options.top
                    }
                    if (d.dataProp(this.options.left, false)) {
                        this.targetOffset.left = this.options.left
                    }
                    this.targetWidth = this.$target.outerWidth();
                    return this.targetHeight = this.$target.outerHeight()
                };
                i.prototype._configureScroll = function () {
                    this.willScroll = g.fn.scrollTo && this.options.scrollTo !== false;
                    return this.scrollSettings = {
                        offset: -this.options.scrollContext,
                        easing: "linear",
                        axis: "y",
                        duration: this.options.scrollSpeed
                    }
                };
                i.prototype._offsets = function () {
                    var q, m, k, n, p, r, j, o;
                    k = this.$el.height();
                    n = this.$el.width();
                    p = {};
                    switch (this.options.orientation) {
                        case"centered":
                            j = g(window).height();
                            p.top = this.options.top;
                            if (!d.dataProp(p.top, false)) {
                                p.top = (j / 2) - (k / 2)
                            }
                            p.left = (this.targetWidth / 2) - (n / 2);
                            break;
                        case"left":
                            p.top = this.targetOffset.top;
                            p.left = this.targetOffset.left - n - this.options.margin;
                            break;
                        case"right":
                            if (this.targetOffset.top != 0) {
                                p.top = this.targetOffset.top - (k / 2) + (this.targetHeight / 2)
                            } else {
                                p.top = this.targetOffset.top
                            }
                            p.left = this.targetOffset.left + this.targetWidth + this.options.margin;
                            break;
                        case"top":
                            p.top = this.targetOffset.top - k - this.options.margin;
                            p.left = this.targetOffset.left;
                            break;
                        case"bottom":
                            p.top = this.targetOffset.top + this.targetHeight + this.options.margin;
                            p.left = this.targetOffset.left
                    }
                    o = {
                        top: ["left", "right"],
                        bottom: ["left", "right"],
                        left: ["top", "bottom"],
                        right: ["top", "bottom"]
                    };
                    if (d.include(this.options.orientation, o[this.options.align])) {
                        switch (this.options.align) {
                            case"right":
                                p.left += this.targetWidth - n;
                                break;
                            case"bottom":
                                p.top += this.targetHeight - k
                        }
                    } else {
                        if (this.options.align === "center") {
                            if (d.include(this.options.orientation, o.left)) {
                                r = this.targetWidth / 2;
                                m = n / 2;
                                q = "left"
                            } else {
                                r = this.targetHeight / 2;
                                m = k / 2;
                                q = "top"
                            }
                            if (r > m) {
                                p[q] += r - m
                            } else {
                                p[q] -= m - r
                            }
                        }
                    }
                    return p
                };
                return i
            })();
            h = (function (i) {
                var j;
                i.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(i);
                j = document.styleSheets[document.styleSheets.length - 1];
                return function (k, o) {
                    var n, m;
                    m = g.map((function () {
                        var q;
                        q = [];
                        for (n in o) {
                            q.push(n)
                        }
                        return q
                    })(), function (q) {
                        return "" + q + ":" + o[q]
                    }).join(";");
                    try {
                        if (j.insertRule) {
                            j.insertRule("" + k + " { " + m + " }", (j.cssRules || j.rules).length)
                        } else {
                            j.addRule(k, m)
                        }
                    } catch (p) {
                    }
                }
            })(document.createElement("style"))
        }).call(this)
    }, {"./utils": 4}], 4: [function (b, c, a) {
        (function () {
            c.exports = {
                dataProp: function (f, d) {
                    if (f === null || typeof f === "undefined") {
                        return d
                    }
                    return f
                }, include: function (d, f) {
                    return $.inArray(d, f || []) !== -1
                }
            }
        }).call(this)
    }, {}]
}, {}, [1, 2, 3, 4]);
/*! sender */

;var _windowInnerHeight = 0;
var _mainContainerHeight = 0;
$(document).ready(function () {
    // translationHelper.init();
    // translationHelper.registerLanguage(translations);
    $("#CampaignAutoFollowupActive").change(function () {
        if (this.checked) {
            $("#CampaignAutoFollowupSubject").closest(".form-group.hidden").removeClass("hidden");
            $("#CampaignDelays").closest(".form-group.hidden").removeClass("hidden");
            $("#CampaignAutoFollowupSubject").addClass("validate[required]");
            $("#CampaignDelays").addClass("validate[required]")
        } else {
            $("#CampaignAutoFollowupSubject").closest(".form-group").addClass("hidden");
            $("#CampaignDelays").closest(".form-group").addClass("hidden");
            $("#CampaignAutoFollowupSubject").removeClass("validate[required]");
            $("#CampaignDelays").removeClass("validate[required]")
        }
    });
    $(".heading-main").css("max-width", $(window).width() * 0.6);
    $("#sidebar").height($("#sidebar").height() - $(".email_quota").height());
    positionBreadcrumbs();
    $(".style_option").click(function () {
        bottomoffset = $(window).height() - ($(this).offset().top - $(window).scrollTop());
        if (bottomoffset < 200) {
            $(this).next(".dropdown-menu").css("top", "-210px")
        } else {
            $(this).next(".dropdown-menu").css("top", "100%")
        }
    });
    hljs.initHighlightingOnLoad();
    $("a.accountSuspend").on("click", function (g) {
        g.preventDefault();
        $("#accountSuspendDialog").dialog({
            width: 600,
            modal: true,
            resizable: false,
            draggable: false,
            buttons: [{
                text: l("Cancel"), "class": "btn btn-default waves-effect", click: function () {
                    $(this).dialog("close")
                }
            }, {
                text: l("Save"),
                "class": "btn bgm-teal waves-effect",
                attr: {form: "AccountSuspendForm", type: "submit"}
            }],
            open: function () {
                disableScrolling();
                preventToggle = true
            },
            close: function () {
                enableScrolling();
                preventToggle = false
            }
        })
    });
    $(".templateSelection .template").on("click", function () {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        $("#HtmlTemplateId").val($(this).data("template-id"))
    });
    $("#exportToNewList").click(function (h) {
        h.preventDefault();
        var i = $(this).attr("message");
        var g = $(this).attr("href");
        $("#exportToNewMailinglistDialog").dialog({
            width: 400,
            modal: true,
            resizable: false,
            draggable: false,
            title: i,
            buttons: [{
                text: l("Cancel"), "class": "btn btn-default waves-effect", click: function () {
                    $(this).dialog("close")
                }
            }, {
                text: l("Save"),
                "class": "btn bgm-teal waves-effect",
                attr: {form: "MailinglistAddForm", type: "submit"}
            }],
            open: function () {
                $("#exportToNewMailinglistDialog form").attr("action", g);
                disableScrolling();
                preventToggle = true
            },
            close: function () {
                enableScrolling();
                preventToggle = false
            }
        })
    });
    $("a.mailinglistCreate, a.mailinglistEdit").on("click", function (g) {
        g.preventDefault();
        var i = $(this).attr("message");
        var h = $(this);
        if ($(this).hasClass("mailinglistCreate")) {
            $("#mailinglistCreateDialog").dialog({
                width: 400,
                modal: true,
                resizable: false,
                draggable: false,
                title: i,
                buttons: [{
                    text: l("Cancel"), "class": "btn btn-default waves-effect", click: function () {
                        $(this).dialog("close")
                    }
                }, {
                    text: l("Save"), "class": "btn bgm-teal waves-effect", click: function () {
                        $("#MailinglistAddForm").submit()
                    }
                }],
                open: function () {
                    disableScrolling();
                    preventToggle = true
                },
                close: function () {
                    enableScrolling();
                    preventToggle = false
                }
            })
        } else {
            $("#mailinglistEditDialog").dialog({
                width: 400,
                modal: true,
                resizable: false,
                draggable: false,
                title: i,
                buttons: [{
                    text: l("Cancel"), "class": "btn btn-default waves-effect", click: function () {
                        $(this).dialog("close")
                    }
                }, {
                    text: l("Save"),
                    "class": "btn bgm-teal waves-effect",
                    attr: {form: "MailinglistEditForm", type: "submit"}
                }],
                open: function () {
                    $("#mailinglistEditDialog form").attr("action", h.attr("href"));
                    $("#mailinglistEditDialog form #MailinglistTitle").val(h.attr("listName"));
                    disableScrolling();
                    preventToggle = true
                },
                close: function () {
                    enableScrolling();
                    preventToggle = false
                }
            })
        }
    });
    $("a.workflowCreate").on("click", function (g) {
        g.preventDefault();
        var h = $(this).attr("message");
        $("#workflowCreateDialog").dialog({
            width: 400,
            modal: true,
            resizable: false,
            draggable: false,
            title: h,
            buttons: [{
                text: l("Cancel"), "class": "btn btn-default waves-effect", click: function () {
                    $(this).dialog("close")
                }
            }, {
                text: l("Save"),
                "class": "btn bgm-teal waves-effect",
                attr: {form: "WorkflowAddForm", type: "submit"}
            }],
            open: function () {
                disableScrolling();
                preventToggle = true
            },
            close: function () {
                enableScrolling();
                preventToggle = false
            }
        })
    });
    $(".renameWorkflow").on("click", function (g) {
        g.preventDefault();
        var i = $(this).attr("message");
        var h = $(this);
        $("#workflowEditDialog").dialog({
            width: 400,
            modal: true,
            resizable: false,
            draggable: false,
            title: i,
            buttons: [{
                text: l("Cancel"), "class": "btn btn-default waves-effect", click: function () {
                    $(this).dialog("close")
                }
            }, {
                text: l("Save"),
                "class": "btn bgm-teal waves-effect",
                attr: {form: "WorkflowEditForm", type: "submit"}
            }],
            open: function () {
                $("#workflowEditDialog form").attr("action", h.attr("href"));
                $("#workflowEditDialog form #WorkflowTitle").val($(h).parents("td").prev("td").find(".title").html());
                disableScrolling();
                preventToggle = true
            },
            close: function () {
                enableScrolling();
                preventToggle = false
            }
        })
    });
    preventToggle = false;
    $(document).ajaxComplete(function () {
        $("body").tooltip({selector: '[data-toggle="tooltip"]'});
        $(".dropdown-toggle-ajax").unbind();
        $(".dropdown-toggle-ajax").click(function (g) {
            g.preventDefault();
            if ($(this).attr("aria-expanded") === "true") {
                $(".dropdown-toggle-ajax").parent("div").removeClass("open");
                $(".dropdown-toggle-ajax").attr("aria-expanded", false);
                $(this).find(".zmdi").removeClass("zmdi-chevron-up");
                $(this).find(".zmdi").addClass("zmdi-chevron-down");
                $(this).closest("div").removeClass("open");
                $(this).attr("aria-expanded", false)
            } else {
                if (typeof $(this).attr("aria-expanded") === "undefined" || $(this).attr("aria-expanded") === "false") {
                    $(".dropdown-toggle-ajax").parent("div").removeClass("open");
                    $(".dropdown-toggle-ajax").attr("aria-expanded", false);
                    $(this).find(".zmdi").removeClass("zmdi-chevron-down");
                    $(this).find(".zmdi").addClass("zmdi-chevron-up");
                    $(this).closest("div").addClass("open");
                    $(this).attr("aria-expanded", true)
                }
            }
        });
        $(".social_share").click(function (h) {
            h.preventDefault();
            var g = $(this).attr("href");
            var i = $(this).parent(".actions");
            $("#social-share-dialog").dialog({
                height: 280,
                width: 500,
                modal: true,
                resizable: false,
                draggable: false,
                create: function (j, k) {
                    $("#social-share-content").load(g)
                },
                open: function () {
                    disableScrolling();
                    preventToggle = true;
                    i.hide()
                },
                close: function () {
                    enableScrolling();
                    i.css("right", -i.width() + "px");
                    preventToggle = false;
                    i.show()
                }
            });
            return false
        });
        $(".delete").click(function (g) {
            g.stopPropagation()
        });
        $("a.autoresponder_preview, a.campaign_preview, a.transactional_campaign_preview").unbind();
        $("a.autoresponder_preview, a.campaign_preview, a.transactional_campaign_preview").click(function (h) {
            h.preventDefault();
            h.stopPropagation();
            var g = jQuery(this).attr("href");
            var i = $(this).parent(".actions");
            jQuery.colorbox({
                iframe: true,
                width: "820px",
                height: "95%",
                title: l("Letter preview"),
                close: l("Close"),
                href: g,
                onOpen: function () {
                    disableScrolling();
                    i.hide();
                    preventToggle = true
                },
                onClosed: function () {
                    enableScrolling();
                    i.css("right", -i.width() + "px");
                    preventToggle = false;
                    i.show()
                }
            })
        });
        $("a.delete").on("click", function (h) {
            h.preventDefault();
            var g = $(this).attr("href");
            var j = $(this).parent(".actions");
            var i = $(this).attr("message");
            $("#confirmDialog").dialog({
                height: 220,
                width: 380,
                modal: true,
                resizable: false,
                draggable: false,
                title: i,
                buttons: [{
                    text: l("No"), "class": "btn btn-default waves-effect", click: function () {
                        $(this).dialog("close")
                    }
                }, {
                    text: l("Yes"), "class": "btn btn-success waves-effect", click: function () {
                        $(this).dialog("close");
                        window.location.href = g
                    }
                }],
                open: function () {
                    if (!$(".warning").length) {
                        $(".ui-dialog-titlebar").prepend('<div class="icon warning pulseWarning" style="display: block;"> <span class="body pulseWarningIns"></span> <span class="dot pulseWarningIns"></span> </div>')
                    }
                    disableScrolling();
                    j.hide();
                    preventToggle = true
                },
                close: function () {
                    $(".warning").remove();
                    enableScrolling();
                    j.css("right", -j.width() + "px");
                    preventToggle = false;
                    j.show()
                }
            })
        });
        preventToggle = false;
        $("a.mailinglistEdit").on("click", function (g) {
            g.preventDefault();
            var i = $(this).attr("message");
            var h = $(this);
            $("#mailinglistEditDialog").dialog({
                width: 400,
                modal: true,
                resizable: false,
                draggable: false,
                title: i,
                buttons: [{
                    text: l("Cancel"), "class": "btn btn-default waves-effect", click: function () {
                        $(this).dialog("close")
                    }
                }, {
                    text: l("Save"),
                    "class": "btn bgm-teal waves-effect",
                    attr: {form: "MailinglistEditForm", type: "submit"}
                }],
                open: function () {
                    $("#mailinglistEditDialog form").attr("action", h.attr("href"));
                    $("#mailinglistEditDialog form #MailinglistTitle").val(h.attr("listName"));
                    disableScrolling();
                    preventToggle = true
                },
                close: function () {
                    enableScrolling();
                    preventToggle = false
                }
            })
        });
        $("a.workflowCreate").on("click", function (g) {
            g.preventDefault();
            var h = $(this).attr("message");
            $("#workflowCreateDialog").dialog({
                width: 400,
                modal: true,
                resizable: false,
                draggable: false,
                title: h,
                buttons: [{
                    text: l("Cancel"), "class": "btn btn-default waves-effect", click: function () {
                        $(this).dialog("close")
                    }
                }, {
                    text: l("Save"),
                    "class": "btn bgm-teal waves-effect",
                    attr: {form: "WorkflowAddForm", type: "submit"}
                }],
                open: function () {
                    disableScrolling();
                    preventToggle = true
                },
                close: function () {
                    enableScrolling();
                    preventToggle = false
                }
            })
        });
        $(".renameWorkflow").click(function (g) {
            g.preventDefault();
            var i = $(this);
            var h = $(this).attr("message");
            $("#workflowEditDialog").dialog({
                width: 400,
                modal: true,
                resizable: false,
                draggable: false,
                title: h,
                buttons: [{
                    text: l("Cancel"), "class": "btn btn-default waves-effect", click: function () {
                        $(this).dialog("close")
                    }
                }, {
                    text: l("Save"),
                    "class": "btn bgm-teal waves-effect",
                    attr: {form: "WorkflowEditForm", type: "submit"}
                }],
                open: function () {
                    $("#workflowEditDialog form").attr("action", i.attr("href"));
                    $("#workflowEditDialog form #WorkflowTitle").val($(i).parents("td").prev("td").find(".title").html());
                    disableScrolling();
                    preventToggle = true
                },
                close: function () {
                    enableScrolling();
                    preventToggle = false
                }
            })
        });
        preventToggle = false
    });
    $("a.autoresponder_preview, a.campaign_preview, a.transactional_campaign_preview").click(function (h) {
        h.preventDefault();
        h.stopPropagation();
        var g = jQuery(this).attr("href");
        var i = $(this).parent(".actions");
        jQuery.colorbox({
            iframe: true,
            width: "820px",
            height: "95%",
            title: l("Letter preview"),
            close: l("Close"),
            href: g,
            onOpen: function () {
                disableScrolling();
                i.hide();
                preventToggle = true
            },
            onClosed: function () {
                enableScrolling();
                i.css("right", -i.width() + "px");
                preventToggle = false;
                i.show()
            }
        })
    });
    $("a.delete").on("click", function (h) {
        h.preventDefault();
        var g = $(this).attr("href");
        var j = $(this).parent(".actions");
        var i = $(this).attr("message");
        $("#confirmDialog").dialog({
            height: 220,
            width: 380,
            modal: true,
            resizable: false,
            draggable: false,
            title: i,
            buttons: [{
                text: l("No"), "class": "btn btn-default waves-effect", click: function () {
                    $(this).dialog("close")
                }
            }, {
                text: l("Yes"), "class": "btn btn-success waves-effect", click: function () {
                    $(this).dialog("close");
                    window.location.href = g
                }
            }],
            open: function () {
                if (!$(".warning").length) {
                    $(".ui-dialog-titlebar").prepend('<div class="icon warning pulseWarning" style="display: block;"> <span class="body pulseWarningIns"></span> <span class="dot pulseWarningIns"></span> </div>')
                }
                disableScrolling();
                j.hide();
                preventToggle = true
            },
            close: function () {
                enableScrolling();
                j.css("right", -j.width() + "px");
                preventToggle = false;
                j.show()
            }
        })
    });
    $("a.accountVerification").on("click", function (j) {
        j.preventDefault();
        var i = $(this).attr("href");
        var k = $(this).attr("message");
        var h = JSON.parse(atob($(this).attr("data-value")));
        var g = "";
        Object.keys(h).forEach(function (m) {
            g += '<option value = "' + btoa(JSON.stringify(h[m])) + '" >' + m + "</option>"
        });
        swal.fire({
            title: k,
            input: "select",
            inputOptions: {1: "1 level", 2: "2 level", 3: "3 level"},
            html: '<select class="swal2-select" id="mta-dropdown"><option selected>None</option>' + g + " </select>",
            type: "warning",
            showCancelButton: true,
            showCloseButton: false,
            animation: false,
            width: 450,
            cancelButtonText: l("Cancel"),
            customClass: "zoomIn",
            cancelButtonClass: "btn-secondary",
            confirmButtonClass: "btn-success",
            confirmButtonText: l("Yes"),
            preConfirm: function (m) {
                return new Promise(function (n) {
                    n([document.getElementById("mta-dropdown").value, m])
                })
            }
        }).then(function (n) {
            if (!n.dismiss) {
                var m = n.value[0];
                var o = n.value[1];
                window.location.href = i + "/" + parseInt(o) + "/" + m
            }
        })
    });
    preventToggle = false;
    $("table.index-table tbody").on("mouseover", "tr", function (g) {
        if (!preventToggle) {
            var i = $(this);
            var h = i.find(".actions");
            h.css("right", 0)
        }
    });
    $("table.index-table tbody").on("mouseleave", "tr", function (g) {
        if (!preventToggle) {
            var i = $(this);
            var h = i.find(".actions");
            h.css("right", -h.width() + "px")
        }
    });
    $(".social_share").click(function (h) {
        h.preventDefault();
        var g = $(this).attr("href");
        var j = $(this).parent(".actions");
        var i = false;
        $("#social-share-dialog").dialog({
            height: 280,
            width: 500,
            modal: true,
            resizable: false,
            draggable: false,
            create: function (k, m) {
                $("#social-share-content").load(g)
            },
            open: function () {
                $("#social-share-content").load(g);
                disableScrolling();
                preventToggle = true;
                j.hide()
            },
            close: function () {
                enableScrolling();
                j.css("right", -j.width() + "px");
                preventToggle = false;
                j.show();
                i = true
            }
        });
        if (i == true && $("#social-share-content").dialog("instance")) {
            $("#social-share-content").dialog("destroy")
        }
        return false
    });
    $("form").on("submit", function (g) {
    });
    var f = {37: 1, 38: 1, 39: 1, 40: 1};

    function a(g) {
        g = g || window.event;
        if (g.preventDefault) {
            g.preventDefault()
        }
        g.returnValue = false
    }

    function c(g) {
        if (f[g.keyCode]) {
            a(g);
            return false
        }
    }

    function d() {
        if (window.addEventListener) {
            window.addEventListener("DOMMouseScroll", a, false)
        }
        window.onwheel = a;
        window.onmousewheel = document.onmousewheel = a;
        window.ontouchmove = a;
        document.onkeydown = c
    }

    function b() {
        if (window.removeEventListener) {
            window.removeEventListener("DOMMouseScroll", a, false)
        }
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null
    }

    $(".change-credits").click(function (h) {
        var g = $(this);
        $("#change-credits-dialog").dialog({
            height: 280,
            width: 430,
            modal: true,
            resizable: false,
            draggable: false,
            buttons: [{
                text: l("Cancel"), "class": "btn btn-default waves-effect", click: function () {
                    $(this).dialog("close")
                }
            }, {
                text: l("Save"),
                "class": "btn bgm-teal waves-effect",
                attr: {form: "CreditChangeForm", type: "submit"}
            }],
            open: function () {
                $(".ui-widget-overlay").height($(document).height());
                $("#change-credits-content").load(g.attr("href") + "/ajax");
                d()
            },
            close: function () {
                b()
            }
        });
        return false
    });
    $("#MailinglistMultiForm .dropdown-menu a").click(function () {
        $(this).closest("div").removeClass("open");
        $(".dropdown-toggle").attr({"aria-expanded": false})
    });
    $(".sortableFields").sortable({
        delay: 0, stop: function (j, k) {
            var h = 1;
            var g = {};
            $.each($(".field"), function () {
                g[$(this).attr("id")] = h;
                h++
            });
            $.post(appRoot + "customFields/rearrange", {mailinglist_id: $("#listId").val(), order: g})
        }
    });
    $(".recipient-edit .datepicker").datepicker({dateFormat: "yy-mm-dd", firstDay: 1});
    $("#code-options .nav-pills > li").on("click", function (g) {
        a(g);
        if (!$(this).hasClass("active-pill")) {
            toggleTab()
        }
    });
    $("#code-options .copy-option").mouseenter(function (g) {
        a(g);
        if (!$("#code-options .copy-option").hasClass("copied")) {
            $("#code-options .copy-option").toggleClass("copied")
        }
        $("#code-options .copy-option").toggleClass("copied")
    });
    $("#code-options .copy-option").on("click", function (g) {
        a(g);
        copyToClipboard($("#code-options .active-well").text());
        $("#code-options .copy-option").toggleClass("copied")
    })
});

function refreshInputs(a) {
    a.find(".fg-line").each(function (b, c) {
        if ($(c).find("input").val() || $(c).find("textarea").val()) {
            $(c).addClass("fg-keep-label")
        } else {
            $(c).removeClass("fg-keep-label")
        }
    })
}

function positionBreadcrumbs() {
    var a = $(".breadcrumbs");
    var b = $(".breadcrumbs").width();
    var c = $(".footer-navigation").width() - $(".footer-navigation .btn-back").outerWidth() - $(".footer-navigation .btn-next").outerWidth();
    if (b > c) {
        a.css("display", "none")
    } else {
        a.css("margin-left", (c - b) / 2);
        a.css("display", "inline-block")
    }
}

function disableScrolling() {
    var a = window.scrollX;
    var b = window.scrollY;
    window.onscroll = function () {
        window.scrollTo(a, b)
    }
}

function enableScrolling() {
    window.onscroll = function () {
    }
}

function notifySuccess(a) {
    $.noticeAdd({text: a, type: "notice-success"})
}

function notifyError(a) {
    $.noticeAdd({text: a, type: "notice-error"})
}

function change_Status_Ajax(b, a) {
    b.preventDefault();
    if (confirm("Are you sure?")) {
        $.ajax({
            type: "POST", url: a, success: function (c) {
                $(".container .row-fluid").html(c)
            }
        })
    }
}

function toggleTab() {
    $(".well").toggle();
    $(".nav-pills > li").toggleClass("active-pill");
    $(".well").toggleClass("active-well")
}

function copyToClipboard(a) {
    navigator.clipboard.writeText(a)
}

function getCampaignData(a) {
    $.ajax({
        url: "/transactional_campaigns/getCampaignStats/" + a + ".json",
        type: "POST",
        dataType: "json",
        success: function (i) {
            var g = i.opens / i.sent * 100;
            var c = i.clicks / i.sent * 100;
            var h = i.bounces / i.sent * 100;
            if (i.sent === 0) {
                var d = "-";
                var j = "-";
                var f = "-";
                var b = "-"
            } else {
                d = i.sent;
                j = i.opens + " (" + g.toFixed(2) + "%)";
                f = i.clicks + " (" + c.toFixed(2) + "%)";
                b = i.bounces + " (" + h.toFixed(2) + "%)"
            }
            $("tr[data-campaignId=" + a + '] td[data-stats="sent"] div.text-center').html(d);
            $("tr[data-campaignId=" + a + '] td[data-stats="opens"] div.text-center').html(j);
            $("tr[data-campaignId=" + a + '] td[data-stats="clicks"] div.text-center').html(f);
            $("tr[data-campaignId=" + a + '] td[data-stats="bounces"] div.text-center').html(b)
        },
        error: function (b) {
            console.log(b.status)
        }
    })
}

function getIframePdf(g) {
    var f = new jsPDF("p", "pt", "a4");
    var c = document.getElementById(g);
    var d = c.contentWindow.document.body;
    var b = f.internal.pageSize.getWidth();
    var a = f.internal.pageSize.getHeight();
    html2canvas(d, {logging: false, allowTaint: false, useCORS: true}).then(function (h) {
        f.addImage(h.toDataURL(), "PNG", 0, 0, b, a);
        f.save("report.pdf")
    })
}

/*!
 * Bootstrap-select v1.7.2 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2015 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
(function (a, b) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], function (c) {
            return (b(c))
        })
    } else {
        if (typeof exports === "object") {
            module.exports = b(require("jquery"))
        } else {
            b(jQuery)
        }
    }
}(this, function () {
    (function (d) {
        if (!String.prototype.includes) {
            (function () {
                var k = {}.toString;
                var h = (function () {
                    try {
                        var p = {};
                        var o = Object.defineProperty;
                        var m = o(p, p, p) && o
                    } catch (n) {
                    }
                    return m
                }());
                var j = "".indexOf;
                var i = function (r) {
                    if (this == null) {
                        throw TypeError()
                    }
                    var p = String(this);
                    if (r && k.call(r) == "[object RegExp]") {
                        throw TypeError()
                    }
                    var n = p.length;
                    var o = String(r);
                    var q = o.length;
                    var m = arguments.length > 1 ? arguments[1] : undefined;
                    var t = m ? Number(m) : 0;
                    if (t != t) {
                        t = 0
                    }
                    var s = Math.min(Math.max(t, 0), n);
                    if (q + s > n) {
                        return false
                    }
                    return j.call(p, o, t) != -1
                };
                if (h) {
                    h(String.prototype, "includes", {value: i, configurable: true, writable: true})
                } else {
                    String.prototype.includes = i
                }
            }())
        }
        if (!String.prototype.startsWith) {
            (function () {
                var h = (function () {
                    try {
                        var o = {};
                        var n = Object.defineProperty;
                        var k = n(o, o, o) && n
                    } catch (m) {
                    }
                    return k
                }());
                var j = {}.toString;
                var i = function (s) {
                    if (this == null) {
                        throw TypeError()
                    }
                    var p = String(this);
                    if (s && j.call(s) == "[object RegExp]") {
                        throw TypeError()
                    }
                    var k = p.length;
                    var t = String(s);
                    var n = t.length;
                    var o = arguments.length > 1 ? arguments[1] : undefined;
                    var r = o ? Number(o) : 0;
                    if (r != r) {
                        r = 0
                    }
                    var m = Math.min(Math.max(r, 0), k);
                    if (n + m > k) {
                        return false
                    }
                    var q = -1;
                    while (++q < n) {
                        if (p.charCodeAt(m + q) != t.charCodeAt(q)) {
                            return false
                        }
                    }
                    return true
                };
                if (h) {
                    h(String.prototype, "startsWith", {value: i, configurable: true, writable: true})
                } else {
                    String.prototype.startsWith = i
                }
            }())
        }
        if (!Object.keys) {
            Object.keys = function (j, h, i) {
                i = [];
                for (h in j) {
                    i.hasOwnProperty.call(j, h) && i.push(h)
                }
                return i
            }
        }
        d.expr[":"].icontains = function (k, h, j) {
            var m = d(k);
            var i = (m.data("tokens") || m.text()).toUpperCase();
            return i.includes(j[3].toUpperCase())
        };
        d.expr[":"].ibegins = function (k, h, j) {
            var m = d(k);
            var i = (m.data("tokens") || m.text()).toUpperCase();
            return i.startsWith(j[3].toUpperCase())
        };
        d.expr[":"].aicontains = function (k, h, j) {
            var m = d(k);
            var i = (m.data("tokens") || m.data("normalizedText") || m.text()).toUpperCase();
            return i.includes(j[3].toUpperCase())
        };
        d.expr[":"].aibegins = function (k, h, j) {
            var m = d(k);
            var i = (m.data("tokens") || m.data("normalizedText") || m.text()).toUpperCase();
            return i.startsWith(j[3].toUpperCase())
        };

        function g(i) {
            var h = [{re: /[\xC0-\xC6]/g, ch: "A"}, {re: /[\xE0-\xE6]/g, ch: "a"}, {
                re: /[\xC8-\xCB]/g,
                ch: "E"
            }, {re: /[\xE8-\xEB]/g, ch: "e"}, {re: /[\xCC-\xCF]/g, ch: "I"}, {
                re: /[\xEC-\xEF]/g,
                ch: "i"
            }, {re: /[\xD2-\xD6]/g, ch: "O"}, {re: /[\xF2-\xF6]/g, ch: "o"}, {
                re: /[\xD9-\xDC]/g,
                ch: "U"
            }, {re: /[\xF9-\xFC]/g, ch: "u"}, {re: /[\xC7-\xE7]/g, ch: "c"}, {re: /[\xD1]/g, ch: "N"}, {
                re: /[\xF1]/g,
                ch: "n"
            }];
            d.each(h, function () {
                i = i.replace(this.re, this.ch)
            });
            return i
        }

        function f(i) {
            var k = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"};
            var n = "(?:" + Object.keys(k).join("|") + ")", m = new RegExp(n), j = new RegExp(n, "g"),
                h = i == null ? "" : "" + i;
            return m.test(h) ? h.replace(j, function (o) {
                return k[o]
            }) : h
        }

        var b = function (i, h, j) {
            if (j) {
                j.stopPropagation();
                j.preventDefault()
            }
            this.$element = d(i);
            this.$newElement = null;
            this.$button = null;
            this.$menu = null;
            this.$lis = null;
            this.options = h;
            if (this.options.title === null) {
                this.options.title = this.$element.attr("title")
            }
            this.val = b.prototype.val;
            this.render = b.prototype.render;
            this.refresh = b.prototype.refresh;
            this.setStyle = b.prototype.setStyle;
            this.selectAll = b.prototype.selectAll;
            this.deselectAll = b.prototype.deselectAll;
            this.destroy = b.prototype.remove;
            this.remove = b.prototype.remove;
            this.show = b.prototype.show;
            this.hide = b.prototype.hide;
            this.init()
        };
        b.VERSION = "1.7.2";
        b.DEFAULTS = {
            noneSelectedText: "Nothing selected",
            noneResultsText: "No results matched {0}",
            countSelectedText: function (i, h) {
                return (i == 1) ? "{0} item selected" : "{0} items selected"
            },
            maxOptionsText: function (h, i) {
                return [(h == 1) ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", (i == 1) ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
            },
            selectAllText: "Select All",
            deselectAllText: "Deselect All",
            doneButton: false,
            doneButtonText: "Close",
            multipleSeparator: ", ",
            styleBase: "btn",
            style: "btn-default",
            size: "auto",
            title: null,
            selectedTextFormat: "values",
            width: false,
            container: false,
            hideDisabled: false,
            showSubtext: false,
            showIcon: true,
            showContent: true,
            dropupAuto: false,
            header: false,
            liveSearch: false,
            liveSearchPlaceholder: null,
            liveSearchNormalize: false,
            liveSearchStyle: "contains",
            actionsBox: false,
            iconBase: "glyphicon",
            tickIcon: "glyphicon-ok",
            maxOptions: false,
            mobile: false,
            selectOnTab: false,
            dropdownAlignRight: false
        };
        b.prototype = {
            constructor: b, init: function () {
                var h = this, i = this.$element.attr("id");
                this.$element.addClass("bs-select-hidden");
                this.liObj = {};
                this.multiple = this.$element.prop("multiple");
                this.autofocus = this.$element.prop("autofocus");
                this.$newElement = this.createView();
                this.$element.after(this.$newElement);
                this.$button = this.$newElement.children("button");
                this.$menu = this.$newElement.children(".dropdown-menu");
                this.$menuInner = this.$menu.children(".inner");
                this.$searchbox = this.$menu.find("input");
                if (this.options.dropdownAlignRight) {
                    this.$menu.addClass("dropdown-menu-right")
                }
                if (typeof i !== "undefined") {
                    this.$button.attr("data-id", i);
                    d('label[for="' + i + '"]').click(function (j) {
                        j.preventDefault();
                        h.$button.focus()
                    })
                }
                this.checkDisabled();
                this.clickListener();
                if (this.options.liveSearch) {
                    this.liveSearchListener()
                }
                this.render();
                this.setStyle();
                this.setWidth();
                if (this.options.container) {
                    this.selectPosition()
                }
                this.$menu.data("this", this);
                this.$newElement.data("this", this);
                if (this.options.mobile) {
                    this.mobile()
                }
                this.$newElement.on("hide.bs.dropdown", function (j) {
                    h.$element.trigger("hide.bs.select", j)
                });
                this.$newElement.on("hidden.bs.dropdown", function (j) {
                    h.$element.trigger("hidden.bs.select", j)
                });
                this.$newElement.on("show.bs.dropdown", function (j) {
                    h.$element.trigger("show.bs.select", j)
                });
                this.$newElement.on("shown.bs.dropdown", function (j) {
                    h.$element.trigger("shown.bs.select", j)
                });
                setTimeout(function () {
                    h.$element.trigger("loaded.bs.select")
                })
            }, createDropdown: function () {
                var i = this.multiple ? " show-tick" : "",
                    j = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                    p = this.autofocus ? " autofocus" : "";
                var o = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "";
                var n = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + f(this.options.liveSearchPlaceholder) + '"') + "></div>" : "";
                var m = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "";
                var h = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "";
                var k = '<div class="btn-group bootstrap-select' + i + j + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + p + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + o + n + m + '<ul class="dropdown-menu inner" role="menu"></ul>' + h + "</div></div>";
                return d(k)
            }, createView: function () {
                var i = this.createDropdown(), h = this.createLi();
                i.find("ul")[0].innerHTML = h;
                return i
            }, reloadLi: function () {
                this.destroyLi();
                var h = this.createLi();
                this.$menuInner[0].innerHTML = h
            }, destroyLi: function () {
                this.$menu.find("li").remove()
            }, createLi: function () {
                var o = this, n = [], p = 0, j = document.createElement("option"), i = -1;
                var h = function (t, r, s, q) {
                    return "<li" + ((typeof s !== "undefined" & "" !== s) ? ' class="' + s + '"' : "") + ((typeof r !== "undefined" & null !== r) ? ' data-original-index="' + r + '"' : "") + ((typeof q !== "undefined" & null !== q) ? 'data-optgroup="' + q + '"' : "") + ">" + t + "</li>"
                };
                var m = function (t, q, s, r) {
                    return '<a tabindex="0"' + (typeof q !== "undefined" ? ' class="' + q + '"' : "") + (typeof s !== "undefined" ? ' style="' + s + '"' : "") + (o.options.liveSearchNormalize ? ' data-normalized-text="' + g(f(t)) + '"' : "") + (typeof r !== "undefined" || r !== null ? ' data-tokens="' + r + '"' : "") + ">" + t + '<span class="' + o.options.iconBase + " " + o.options.tickIcon + ' check-mark"></span></a>'
                };
                if (this.options.title && !this.multiple) {
                    i--;
                    if (!this.$element.find(".bs-title-option").length) {
                        var k = this.$element[0];
                        j.className = "bs-title-option";
                        j.appendChild(document.createTextNode(this.options.title));
                        j.value = "";
                        k.insertBefore(j, k.firstChild);
                        if (k.options[k.selectedIndex].getAttribute("selected") === null) {
                            j.selected = true
                        }
                    }
                }
                this.$element.find("option").each(function (t) {
                    var v = d(this);
                    i++;
                    if (v.hasClass("bs-title-option")) {
                        return
                    }
                    var r = this.className || "", u = this.style.cssText,
                        C = v.data("content") ? v.data("content") : v.html(),
                        w = v.data("tokens") ? v.data("tokens") : null,
                        A = typeof v.data("subtext") !== "undefined" ? '<small class="text-muted">' + v.data("subtext") + "</small>" : "",
                        y = typeof v.data("icon") !== "undefined" ? '<span class="' + o.options.iconBase + " " + v.data("icon") + '"></span> ' : "",
                        B = this.disabled || this.parentElement.tagName === "OPTGROUP" && this.parentElement.disabled;
                    if (y !== "" && B) {
                        y = "<span>" + y + "</span>"
                    }
                    if (o.options.hideDisabled && B) {
                        i--;
                        return
                    }
                    if (!v.data("content")) {
                        C = y + '<span class="text">' + C + A + "</span>"
                    }
                    if (this.parentElement.tagName === "OPTGROUP" && v.data("divider") !== true) {
                        if (v.index() === 0) {
                            p += 1;
                            var z = this.parentElement.label,
                                D = typeof v.parent().data("subtext") !== "undefined" ? '<small class="text-muted">' + v.parent().data("subtext") + "</small>" : "",
                                q = v.parent().data("icon") ? '<span class="' + o.options.iconBase + " " + v.parent().data("icon") + '"></span> ' : "",
                                s = " " + this.parentElement.className || "";
                            z = q + '<span class="text">' + z + D + "</span>";
                            if (t !== 0 && n.length > 0) {
                                i++;
                                n.push(h("", null, "divider", p + "div"))
                            }
                            i++;
                            n.push(h(z, null, "dropdown-header" + s, p))
                        }
                        n.push(h(m(C, "opt " + r + s, u, w), t, "", p))
                    } else {
                        if (v.data("divider") === true) {
                            n.push(h("", t, "divider"))
                        } else {
                            if (v.data("hidden") === true) {
                                n.push(h(m(C, r, u, w), t, "hidden is-hidden"))
                            } else {
                                if (this.previousElementSibling && this.previousElementSibling.tagName === "OPTGROUP") {
                                    i++;
                                    n.push(h("", null, "divider", p + "div"))
                                }
                                n.push(h(m(C, r, u, w), t))
                            }
                        }
                    }
                    o.liObj[t] = i
                });
                if (!this.multiple && this.$element.find("option:selected").length === 0 && !this.options.title) {
                    this.$element.find("option").eq(0).prop("selected", true).attr("selected", "selected")
                }
                return n.join("")
            }, findLis: function () {
                if (this.$lis == null) {
                    this.$lis = this.$menu.find("li")
                }
                return this.$lis
            }, render: function (k) {
                var j = this, n;
                if (k !== false) {
                    this.$element.find("option").each(function (q) {
                        var r = j.findLis().eq(j.liObj[q]);
                        j.setDisabled(q, this.disabled || this.parentElement.tagName === "OPTGROUP" && this.parentElement.disabled, r);
                        j.setSelected(q, this.selected, r)
                    })
                }
                this.tabIndex();
                var p = this.$element.find("option").map(function () {
                    if (this.selected) {
                        if (j.options.hideDisabled && (this.disabled || this.parentElement.tagName === "OPTGROUP" && this.parentElement.disabled)) {
                            return false
                        }
                        var s = d(this),
                            r = s.data("icon") && j.options.showIcon ? '<i class="' + j.options.iconBase + " " + s.data("icon") + '"></i> ' : "",
                            q;
                        if (j.options.showSubtext && s.data("subtext") && !j.multiple) {
                            q = ' <small class="text-muted">' + s.data("subtext") + "</small>"
                        } else {
                            q = ""
                        }
                        if (typeof s.attr("title") !== "undefined") {
                            return s.attr("title")
                        } else {
                            if (s.data("content") && j.options.showContent) {
                                return s.data("content")
                            } else {
                                return r + s.html() + q
                            }
                        }
                    }
                }).toArray();
                var m = !this.multiple ? p[0] : p.join(this.options.multipleSeparator);
                if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                    var h = this.options.selectedTextFormat.split(">");
                    if ((h.length > 1 && p.length > h[1]) || (h.length == 1 && p.length >= 2)) {
                        n = this.options.hideDisabled ? ", [disabled]" : "";
                        var i = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + n).length,
                            o = (typeof this.options.countSelectedText === "function") ? this.options.countSelectedText(p.length, i) : this.options.countSelectedText;
                        m = o.replace("{0}", p.length.toString()).replace("{1}", i.toString())
                    }
                }
                if (this.options.title == undefined) {
                    this.options.title = this.$element.attr("title")
                }
                if (this.options.selectedTextFormat == "static") {
                    m = this.options.title
                }
                if (!m) {
                    m = typeof this.options.title !== "undefined" ? this.options.title : this.options.noneSelectedText
                }
                this.$button.attr("title", d.trim(m.replace(/<[^>]*>?/g, "")));
                this.$button.children(".filter-option").html(m);
                this.$element.trigger("rendered.bs.select")
            }, setStyle: function (j, i) {
                if (this.$element.attr("class")) {
                    this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""))
                }
                var h = j ? j : this.options.style;
                if (i == "add") {
                    this.$button.addClass(h)
                } else {
                    if (i == "remove") {
                        this.$button.removeClass(h)
                    } else {
                        this.$button.removeClass(this.options.style);
                        this.$button.addClass(h)
                    }
                }
            }, liHeight: function (o) {
                if (!o && (this.options.size === false || this.sizeInfo)) {
                    return
                }
                var m = document.createElement("div"), h = document.createElement("div"),
                    s = document.createElement("ul"), B = document.createElement("li"),
                    A = document.createElement("li"), F = document.createElement("a"),
                    z = document.createElement("span"),
                    E = this.options.header ? this.$menu.find(".popover-title")[0].cloneNode(true) : null,
                    t = this.options.liveSearch ? document.createElement("div") : null,
                    u = this.options.actionsBox && this.multiple ? this.$menu.find(".bs-actionsbox")[0].cloneNode(true) : null,
                    k = this.options.doneButton && this.multiple ? this.$menu.find(".bs-donebutton")[0].cloneNode(true) : null;
                z.className = "text";
                m.className = this.$menu[0].parentNode.className + " open";
                h.className = "dropdown-menu open";
                s.className = "dropdown-menu inner";
                B.className = "divider";
                z.appendChild(document.createTextNode("Inner text"));
                F.appendChild(z);
                A.appendChild(F);
                s.appendChild(A);
                s.appendChild(B);
                if (E) {
                    h.appendChild(E)
                }
                if (t) {
                    var w = document.createElement("span");
                    t.className = "bs-searchbox";
                    w.className = "form-control";
                    t.appendChild(w);
                    h.appendChild(t)
                }
                if (u) {
                    h.appendChild(u)
                }
                h.appendChild(s);
                if (k) {
                    h.appendChild(k)
                }
                m.appendChild(h);
                document.body.appendChild(m);
                var j = F.offsetHeight, D = E ? E.offsetHeight : 0, v = t ? t.offsetHeight : 0,
                    r = u ? u.offsetHeight : 0, n = k ? k.offsetHeight : 0, y = d(B).outerHeight(true),
                    i = getComputedStyle ? getComputedStyle(h) : false, p = i ? d(h) : null,
                    C = parseInt(i ? i.paddingTop : p.css("paddingTop")) + parseInt(i ? i.paddingBottom : p.css("paddingBottom")) + parseInt(i ? i.borderTopWidth : p.css("borderTopWidth")) + parseInt(i ? i.borderBottomWidth : p.css("borderBottomWidth")),
                    q = C + parseInt(i ? i.marginTop : p.css("marginTop")) + parseInt(i ? i.marginBottom : p.css("marginBottom")) + 2;
                document.body.removeChild(m);
                this.sizeInfo = {
                    liHeight: j,
                    headerHeight: D,
                    searchHeight: v,
                    actionsHeight: r,
                    doneButtonHeight: n,
                    dividerHeight: y,
                    menuPadding: C,
                    menuExtras: q
                }
            }, setSize: function () {
                this.findLis();
                this.liHeight();
                var q = this, n = this.$menu, j = this.$menuInner, w = d(window), D = this.$newElement[0].offsetHeight,
                    k = this.sizeInfo.liHeight, B = this.sizeInfo.headerHeight, t = this.sizeInfo.searchHeight,
                    p = this.sizeInfo.actionsHeight, m = this.sizeInfo.doneButtonHeight,
                    s = this.sizeInfo.dividerHeight, A = this.sizeInfo.menuPadding, o = this.sizeInfo.menuExtras,
                    y = this.options.hideDisabled ? ".disabled" : "", z, u, E, C, r = function () {
                        E = q.$newElement.offset().top - w.scrollTop();
                        C = w.height() - E - D
                    };
                r();
                if (this.options.header) {
                    n.css("padding-top", 0)
                }
                if (this.options.size === "auto") {
                    var i = function () {
                        var I, H = function (L, K) {
                                return function (M) {
                                    if (K) {
                                        return (M.classList ? M.classList.contains(L) : d(M).hasClass(L))
                                    } else {
                                        return !(M.classList ? M.classList.contains(L) : d(M).hasClass(L))
                                    }
                                }
                            }, G = q.$menuInner[0].getElementsByTagName("li"),
                            F = Array.prototype.filter ? Array.prototype.filter.call(G, H("hidden", false)) : q.$lis.not(".hidden"),
                            J = Array.prototype.filter ? Array.prototype.filter.call(F, H("dropdown-header", true)) : F.filter(".dropdown-header");
                        r();
                        z = C - o;
                        if (q.options.container) {
                            if (!n.data("height")) {
                                n.data("height", n.height())
                            }
                            u = n.data("height")
                        } else {
                            u = n.height()
                        }
                        if (q.options.dropupAuto) {
                            q.$newElement.toggleClass("dropup", E > C && (z - o) < u)
                        }
                        if (q.$newElement.hasClass("dropup")) {
                            z = E - o
                        }
                        if ((F.length + J.length) > 3) {
                            I = k * 3 + o - 2
                        } else {
                            I = 0
                        }
                        n.css({"max-height": z + "px", overflow: "hidden", "min-height": I + B + t + p + m + "px"});
                        j.css({
                            "max-height": z - B - t - p - m - A + "px",
                            "overflow-y": "auto",
                            "min-height": Math.max(I - A, 0) + "px"
                        })
                    };
                    i();
                    this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", i);
                    w.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", i)
                } else {
                    if (this.options.size && this.options.size != "auto" && this.$lis.not(y).length > this.options.size) {
                        var v = this.$lis.not(".divider").not(y).children().slice(0, this.options.size).last().parent().index(),
                            h = this.$lis.slice(0, v + 1).filter(".divider").length;
                        z = k * this.options.size + h * s + A;
                        if (q.options.container) {
                            if (!n.data("height")) {
                                n.data("height", n.height())
                            }
                            u = n.data("height")
                        } else {
                            u = n.height()
                        }
                        if (q.options.dropupAuto) {
                            this.$newElement.toggleClass("dropup", E > C && (z - o) < u)
                        }
                        n.css({"max-height": z + B + t + p + m + "px", overflow: "hidden", "min-height": ""});
                        j.css({"max-height": z - A + "px", "overflow-y": "auto", "min-height": ""})
                    }
                }
            }, setWidth: function () {
                if (this.options.width === "auto") {
                    this.$menu.css("min-width", "0");
                    var i = this.$menu.parent().clone().appendTo("body"),
                        h = this.options.container ? this.$newElement.clone().appendTo("body") : i,
                        j = i.children(".dropdown-menu").outerWidth(),
                        k = h.css("width", "auto").children("button").outerWidth();
                    i.remove();
                    h.remove();
                    this.$newElement.css("width", Math.max(j, k) + "px")
                } else {
                    if (this.options.width === "fit") {
                        this.$menu.css("min-width", "");
                        this.$newElement.css("width", "").addClass("fit-width")
                    } else {
                        if (this.options.width) {
                            this.$menu.css("min-width", "");
                            this.$newElement.css("width", this.options.width)
                        } else {
                            this.$menu.css("min-width", "");
                            this.$newElement.css("width", "")
                        }
                    }
                }
                if (this.$newElement.hasClass("fit-width") && this.options.width !== "fit") {
                    this.$newElement.removeClass("fit-width")
                }
            }, selectPosition: function () {
                var j = this, i = "<div />", k = d(i), n, m, h = function (o) {
                    k.addClass(o.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", o.hasClass("dropup"));
                    n = o.offset();
                    m = o.hasClass("dropup") ? 0 : o[0].offsetHeight;
                    k.css({top: n.top + m, left: n.left, width: o[0].offsetWidth, position: "absolute"})
                };
                this.$newElement.on("click", function () {
                    if (j.isDisabled()) {
                        return
                    }
                    h(d(this));
                    k.appendTo(j.options.container);
                    k.toggleClass("open", !d(this).hasClass("open"));
                    k.append(j.$menu)
                });
                d(window).on("resize scroll", function () {
                    h(j.$newElement)
                });
                this.$element.on("hide.bs.select", function () {
                    j.$menu.data("height", j.$menu.height());
                    k.detach()
                })
            }, setSelected: function (h, j, i) {
                if (!i) {
                    var i = this.findLis().eq(this.liObj[h])
                }
                i.toggleClass("selected", j)
            }, setDisabled: function (h, j, i) {
                if (!i) {
                    var i = this.findLis().eq(this.liObj[h])
                }
                if (j) {
                    i.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1)
                } else {
                    i.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0)
                }
            }, isDisabled: function () {
                return this.$element[0].disabled
            }, checkDisabled: function () {
                var h = this;
                if (this.isDisabled()) {
                    this.$newElement.addClass("disabled");
                    this.$button.addClass("disabled").attr("tabindex", -1)
                } else {
                    if (this.$button.hasClass("disabled")) {
                        this.$newElement.removeClass("disabled");
                        this.$button.removeClass("disabled")
                    }
                    if (this.$button.attr("tabindex") == -1 && !this.$element.data("tabindex")) {
                        this.$button.removeAttr("tabindex")
                    }
                }
                this.$button.click(function () {
                    return !h.isDisabled()
                })
            }, tabIndex: function () {
                if (this.$element.is("[tabindex]")) {
                    this.$element.data("tabindex", this.$element.attr("tabindex"));
                    this.$button.attr("tabindex", this.$element.data("tabindex"))
                }
            }, clickListener: function () {
                var h = this, i = d(document);
                this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function (j) {
                    j.stopPropagation()
                });
                i.data("spaceSelect", false);
                this.$button.on("keyup", function (j) {
                    if (/(32)/.test(j.keyCode.toString(10)) && i.data("spaceSelect")) {
                        j.preventDefault();
                        i.data("spaceSelect", false)
                    }
                });
                this.$newElement.on("click", function () {
                    h.setSize();
                    h.$element.on("shown.bs.select", function () {
                        if (!h.options.liveSearch && !h.multiple) {
                            h.$menu.find(".selected a").focus()
                        } else {
                            if (!h.multiple) {
                                var j = h.liObj[h.$element[0].selectedIndex];
                                if (typeof j !== "number") {
                                    return
                                }
                                var k = h.$lis.eq(j)[0].offsetTop - h.$menuInner[0].offsetTop;
                                k = k - h.$menuInner[0].offsetHeight / 2 + h.sizeInfo.liHeight / 2;
                                h.$menuInner[0].scrollTop = k
                            }
                        }
                    })
                });
                this.$menu.on("click", "li a", function (A) {
                    var p = d(this), j = p.parent().data("originalIndex"), y = h.$element.val(),
                        r = h.$element.prop("selectedIndex");
                    if (h.multiple) {
                        A.stopPropagation()
                    }
                    A.preventDefault();
                    if (!h.isDisabled() && !p.parent().hasClass("disabled")) {
                        var v = h.$element.find("option"), w = v.eq(j), m = w.prop("selected"),
                            u = w.parent("optgroup"), C = h.options.maxOptions, s = u.data("maxOptions") || false;
                        if (!h.multiple) {
                            v.prop("selected", false);
                            w.prop("selected", true);
                            h.$menu.find(".selected").removeClass("selected");
                            h.setSelected(j, true)
                        } else {
                            w.prop("selected", !m);
                            h.setSelected(j, !m);
                            p.blur();
                            if (C !== false || s !== false) {
                                var k = C < v.filter(":selected").length, o = s < u.find("option:selected").length;
                                if ((C && k) || (s && o)) {
                                    if (C && C == 1) {
                                        v.prop("selected", false);
                                        w.prop("selected", true);
                                        h.$menu.find(".selected").removeClass("selected");
                                        h.setSelected(j, true)
                                    } else {
                                        if (s && s == 1) {
                                            u.find("option:selected").prop("selected", false);
                                            w.prop("selected", true);
                                            var z = p.parent().data("optgroup");
                                            h.$menu.find('[data-optgroup="' + z + '"]').removeClass("selected");
                                            h.setSelected(j, true)
                                        } else {
                                            var n = (typeof h.options.maxOptionsText === "function") ? h.options.maxOptionsText(C, s) : h.options.maxOptionsText,
                                                B = n[0].replace("{n}", C), q = n[1].replace("{n}", s),
                                                t = d('<div class="notify"></div>');
                                            if (n[2]) {
                                                B = B.replace("{var}", n[2][C > 1 ? 0 : 1]);
                                                q = q.replace("{var}", n[2][s > 1 ? 0 : 1])
                                            }
                                            w.prop("selected", false);
                                            h.$menu.append(t);
                                            if (C && k) {
                                                t.append(d("<div>" + B + "</div>"));
                                                h.$element.trigger("maxReached.bs.select")
                                            }
                                            if (s && o) {
                                                t.append(d("<div>" + q + "</div>"));
                                                h.$element.trigger("maxReachedGrp.bs.select")
                                            }
                                            setTimeout(function () {
                                                h.setSelected(j, false)
                                            }, 10);
                                            t.delay(750).fadeOut(300, function () {
                                                d(this).remove()
                                            })
                                        }
                                    }
                                }
                            }
                        }
                        if (!h.multiple) {
                            h.$button.focus()
                        } else {
                            if (h.options.liveSearch) {
                                h.$searchbox.focus()
                            }
                        }
                        if ((y != h.$element.val() && h.multiple) || (r != h.$element.prop("selectedIndex") && !h.multiple)) {
                            h.$element.change();
                            h.$element.trigger("changed.bs.select", [j, w.prop("selected"), m])
                        }
                    }
                });
                this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function (j) {
                    if (j.currentTarget == this) {
                        j.preventDefault();
                        j.stopPropagation();
                        if (h.options.liveSearch && !d(j.target).hasClass("close")) {
                            h.$searchbox.focus()
                        } else {
                            h.$button.focus()
                        }
                    }
                });
                this.$menu.on("click", "li.divider, li.dropdown-header", function (j) {
                    j.preventDefault();
                    j.stopPropagation();
                    if (h.options.liveSearch) {
                        h.$searchbox.focus()
                    } else {
                        h.$button.focus()
                    }
                });
                this.$menu.on("click", ".popover-title .close", function () {
                    h.$button.click()
                });
                this.$searchbox.on("click", function (j) {
                    j.stopPropagation()
                });
                this.$menu.on("click", ".actions-btn", function (j) {
                    if (h.options.liveSearch) {
                        h.$searchbox.focus()
                    } else {
                        h.$button.focus()
                    }
                    j.preventDefault();
                    j.stopPropagation();
                    if (d(this).hasClass("bs-select-all")) {
                        h.selectAll()
                    } else {
                        h.deselectAll()
                    }
                    h.$element.change()
                });
                this.$element.change(function () {
                    h.render(false)
                })
            }, liveSearchListener: function () {
                var i = this, h = d('<li class="no-results"></li>');
                this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api", function () {
                    i.$menuInner.find(".active").removeClass("active");
                    if (!!i.$searchbox.val()) {
                        i.$searchbox.val("");
                        i.$lis.not(".is-hidden").removeClass("hidden");
                        if (!!h.parent().length) {
                            h.remove()
                        }
                    }
                    if (!i.multiple) {
                        i.$menuInner.find(".selected").addClass("active")
                    }
                    setTimeout(function () {
                        i.$searchbox.focus()
                    }, 10)
                });
                this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function (j) {
                    j.stopPropagation()
                });
                this.$searchbox.on("input propertychange", function () {
                    if (i.$searchbox.val()) {
                        var j = i.$lis.not(".is-hidden").removeClass("hidden").children("a");
                        if (i.options.liveSearchNormalize) {
                            j = j.not(":a" + i._searchStyle() + "(" + g(i.$searchbox.val()) + ")")
                        } else {
                            j = j.not(":" + i._searchStyle() + "(" + i.$searchbox.val() + ")")
                        }
                        j.parent().addClass("hidden");
                        i.$lis.filter(".dropdown-header").each(function () {
                            var n = d(this), m = n.data("optgroup");
                            if (i.$lis.filter("[data-optgroup=" + m + "]").not(n).not(".hidden").length === 0) {
                                n.addClass("hidden");
                                i.$lis.filter("[data-optgroup=" + m + "div]").addClass("hidden")
                            }
                        });
                        var k = i.$lis.not(".hidden");
                        k.each(function (m) {
                            var n = d(this);
                            if (n.hasClass("divider") && (n.index() === k.eq(0).index() || n.index() === k.last().index() || k.eq(m + 1).hasClass("divider"))) {
                                n.addClass("hidden")
                            }
                        });
                        if (!i.$lis.not(".hidden, .no-results").length) {
                            if (!!h.parent().length) {
                                h.remove()
                            }
                            h.html(i.options.noneResultsText.replace("{0}", '"' + f(i.$searchbox.val()) + '"')).show();
                            i.$menuInner.append(h)
                        } else {
                            if (!!h.parent().length) {
                                h.remove()
                            }
                        }
                    } else {
                        i.$lis.not(".is-hidden").removeClass("hidden");
                        if (!!h.parent().length) {
                            h.remove()
                        }
                    }
                    i.$lis.filter(".active").removeClass("active");
                    i.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus();
                    d(this).focus()
                })
            }, _searchStyle: function () {
                var h = "icontains";
                switch (this.options.liveSearchStyle) {
                    case"begins":
                    case"startsWith":
                        h = "ibegins";
                        break;
                    case"contains":
                    default:
                        break
                }
                return h
            }, val: function (h) {
                if (typeof h !== "undefined") {
                    this.$element.val(h);
                    this.render();
                    return this.$element
                } else {
                    return this.$element.val()
                }
            }, selectAll: function () {
                this.findLis();
                this.$element.find("option:enabled").not("[data-divider], [data-hidden]").prop("selected", true);
                this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").addClass("selected");
                this.render(false)
            }, deselectAll: function () {
                this.findLis();
                this.$element.find("option:enabled").not("[data-divider], [data-hidden]").prop("selected", false);
                this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").removeClass("selected");
                this.render(false)
            }, keydown: function (A) {
                var j = d(this), t = j.is("input") ? j.parent().parent() : j.parent(), i, o = t.data("this"), k, v, n,
                    r, u, h, p, y, w = ":not(.disabled, .hidden, .dropdown-header, .divider)", s = {
                        32: " ",
                        48: "0",
                        49: "1",
                        50: "2",
                        51: "3",
                        52: "4",
                        53: "5",
                        54: "6",
                        55: "7",
                        56: "8",
                        57: "9",
                        59: ";",
                        65: "a",
                        66: "b",
                        67: "c",
                        68: "d",
                        69: "e",
                        70: "f",
                        71: "g",
                        72: "h",
                        73: "i",
                        74: "j",
                        75: "k",
                        76: "l",
                        77: "m",
                        78: "n",
                        79: "o",
                        80: "p",
                        81: "q",
                        82: "r",
                        83: "s",
                        84: "t",
                        85: "u",
                        86: "v",
                        87: "w",
                        88: "x",
                        89: "y",
                        90: "z",
                        96: "0",
                        97: "1",
                        98: "2",
                        99: "3",
                        100: "4",
                        101: "5",
                        102: "6",
                        103: "7",
                        104: "8",
                        105: "9"
                    };
                if (o.options.liveSearch) {
                    t = j.parent().parent()
                }
                if (o.options.container) {
                    t = o.$menu
                }
                i = d("[role=menu] li a", t);
                y = o.$menu.parent().hasClass("open");
                if (!y && (A.keyCode >= 48 && A.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90)) {
                    if (!o.options.container) {
                        o.setSize();
                        o.$menu.parent().addClass("open");
                        y = true
                    } else {
                        o.$newElement.trigger("click")
                    }
                    o.$searchbox.focus()
                }
                if (o.options.liveSearch) {
                    if (/(^9$|27)/.test(A.keyCode.toString(10)) && y && o.$menu.find(".active").length === 0) {
                        A.preventDefault();
                        o.$menu.parent().removeClass("open");
                        if (o.options.container) {
                            o.$newElement.removeClass("open")
                        }
                        o.$button.focus()
                    }
                    i = d("[role=menu] li:not(.disabled, .hidden, .dropdown-header, .divider)", t);
                    if (!j.val() && !/(38|40)/.test(A.keyCode.toString(10))) {
                        if (i.filter(".active").length === 0) {
                            i = o.$newElement.find("li");
                            if (o.options.liveSearchNormalize) {
                                i = i.filter(":a" + o._searchStyle() + "(" + g(s[A.keyCode]) + ")")
                            } else {
                                i = i.filter(":" + o._searchStyle() + "(" + s[A.keyCode] + ")")
                            }
                        }
                    }
                }
                if (!i.length) {
                    return
                }
                if (/(38|40)/.test(A.keyCode.toString(10))) {
                    k = i.index(i.filter(":focus"));
                    n = i.parent(w).first().data("originalIndex");
                    r = i.parent(w).last().data("originalIndex");
                    v = i.eq(k).parent().nextAll(w).eq(0).data("originalIndex");
                    u = i.eq(k).parent().prevAll(w).eq(0).data("originalIndex");
                    h = i.eq(v).parent().prevAll(w).eq(0).data("originalIndex");
                    if (o.options.liveSearch) {
                        i.each(function (C) {
                            if (!d(this).hasClass("disabled")) {
                                d(this).data("index", C)
                            }
                        });
                        k = i.index(i.filter(".active"));
                        n = i.first().data("index");
                        r = i.last().data("index");
                        v = i.eq(k).nextAll().eq(0).data("index");
                        u = i.eq(k).prevAll().eq(0).data("index");
                        h = i.eq(v).prevAll().eq(0).data("index")
                    }
                    p = j.data("prevIndex");
                    if (A.keyCode == 38) {
                        if (o.options.liveSearch) {
                            k -= 1
                        }
                        if (k != h && k > u) {
                            k = u
                        }
                        if (k < n) {
                            k = n
                        }
                        if (k == p) {
                            k = r
                        }
                    } else {
                        if (A.keyCode == 40) {
                            if (o.options.liveSearch) {
                                k += 1
                            }
                            if (k == -1) {
                                k = 0
                            }
                            if (k != h && k < v) {
                                k = v
                            }
                            if (k > r) {
                                k = r
                            }
                            if (k == p) {
                                k = n
                            }
                        }
                    }
                    j.data("prevIndex", k);
                    if (!o.options.liveSearch) {
                        i.eq(k).focus()
                    } else {
                        A.preventDefault();
                        if (!j.hasClass("dropdown-toggle")) {
                            i.removeClass("active").eq(k).addClass("active").children("a").focus();
                            j.focus()
                        }
                    }
                } else {
                    if (!j.is("input")) {
                        var q = [], m, B;
                        i.each(function () {
                            if (!d(this).parent().hasClass("disabled")) {
                                if (d.trim(d(this).text().toLowerCase()).substring(0, 1) == s[A.keyCode]) {
                                    q.push(d(this).parent().index())
                                }
                            }
                        });
                        m = d(document).data("keycount");
                        m++;
                        d(document).data("keycount", m);
                        B = d.trim(d(":focus").text().toLowerCase()).substring(0, 1);
                        if (B != s[A.keyCode]) {
                            m = 1;
                            d(document).data("keycount", m)
                        } else {
                            if (m >= q.length) {
                                d(document).data("keycount", 0);
                                if (m > q.length) {
                                    m = 1
                                }
                            }
                        }
                        i.eq(q[m - 1]).focus()
                    }
                }
                if ((/(13|32)/.test(A.keyCode.toString(10)) || (/(^9$)/.test(A.keyCode.toString(10)) && o.options.selectOnTab)) && y) {
                    if (!/(32)/.test(A.keyCode.toString(10))) {
                        A.preventDefault()
                    }
                    if (!o.options.liveSearch) {
                        var z = d(":focus");
                        z.click();
                        z.focus();
                        A.preventDefault();
                        d(document).data("spaceSelect", true)
                    } else {
                        if (!/(32)/.test(A.keyCode.toString(10))) {
                            o.$menu.find(".active a").click();
                            j.focus()
                        }
                    }
                    d(document).data("keycount", 0)
                }
                if ((/(^9$|27)/.test(A.keyCode.toString(10)) && y && (o.multiple || o.options.liveSearch)) || (/(27)/.test(A.keyCode.toString(10)) && !y)) {
                    o.$menu.parent().removeClass("open");
                    if (o.options.container) {
                        o.$newElement.removeClass("open")
                    }
                    o.$button.focus()
                }
            }, mobile: function () {
                this.$element.addClass("mobile-device").appendTo(this.$newElement);
                if (this.options.container) {
                    this.$menu.hide()
                }
            }, refresh: function () {
                this.$lis = null;
                this.reloadLi();
                this.render();
                this.checkDisabled();
                this.liHeight(true);
                this.setStyle();
                this.setWidth();
                if (this.$lis) {
                    this.$searchbox.trigger("propertychange")
                }
                this.$element.trigger("refreshed.bs.select")
            }, hide: function () {
                this.$newElement.hide()
            }, show: function () {
                this.$newElement.show()
            }, remove: function () {
                this.$newElement.remove();
                this.$element.remove()
            }
        };

        function c(k, m) {
            var i = arguments;
            var o = k, h = m;
            [].shift.apply(i);
            var n;
            var j = this.each(function () {
                var t = d(this);
                if (t.is("select")) {
                    var s = t.data("selectpicker"), q = typeof o == "object" && o;
                    if (!s) {
                        var p = d.extend({}, b.DEFAULTS, d.fn.selectpicker.defaults || {}, t.data(), q);
                        t.data("selectpicker", (s = new b(this, p, h)))
                    } else {
                        if (q) {
                            for (var r in q) {
                                if (q.hasOwnProperty(r)) {
                                    s.options[r] = q[r]
                                }
                            }
                        }
                    }
                    if (typeof o == "string") {
                        if (s[o] instanceof Function) {
                            n = s[o].apply(s, i)
                        } else {
                            n = s.options[o]
                        }
                    }
                }
            });
            if (typeof n !== "undefined") {
                return n
            } else {
                return j
            }
        }

        var a = d.fn.selectpicker;
        d.fn.selectpicker = c;
        d.fn.selectpicker.Constructor = b;
        d.fn.selectpicker.noConflict = function () {
            d.fn.selectpicker = a;
            return this
        };
        d(document).data("keycount", 0).on("keydown", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', b.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function (h) {
            h.stopPropagation()
        });
        d(window).on("load.bs.select.data-api", function () {
            d(".selectpicker").each(function () {
                var h = d(this);
                c.call(h, h.data())
            })
        })
    })(jQuery)
}));
(function () {
    var h, g, k, i, f, m = {}.hasOwnProperty, j = function (n, c) {
        function p() {
            this.constructor = n
        }

        for (var o in c) {
            m.call(c, o) && (n[o] = c[o])
        }
        return p.prototype = c.prototype, n.prototype = new p, n.__super__ = c.prototype, n
    };
    i = function () {
        function a() {
            this.options_index = 0, this.parsed = []
        }

        return a.prototype.add_node = function (b) {
            return "OPTGROUP" === b.nodeName.toUpperCase() ? this.add_group(b) : this.add_option(b)
        }, a.prototype.add_group = function (o) {
            var n, t, s, r, q, p;
            for (n = this.parsed.length, this.parsed.push({
                array_index: n,
                group: !0,
                label: this.escapeExpression(o.label),
                title: o.title ? o.title : void 0,
                children: 0,
                disabled: o.disabled,
                classes: o.className
            }), q = o.childNodes, p = [], s = 0, r = q.length; r > s; s++) {
                t = q[s], p.push(this.add_option(t, n, o.disabled))
            }
            return p
        }, a.prototype.add_option = function (n, d, o) {
            return "OPTION" === n.nodeName.toUpperCase() ? ("" !== n.text ? (null != d && (this.parsed[d].children += 1), this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: n.value,
                text: n.text,
                html: n.innerHTML,
                title: n.title ? n.title : void 0,
                selected: n.selected,
                disabled: o === !0 ? o : n.disabled,
                group_array_index: d,
                group_label: null != d ? this.parsed[d].label : null,
                classes: n.className,
                style: n.style.cssText
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }), this.options_index += 1) : void 0
        }, a.prototype.escapeExpression = function (n) {
            var d, o;
            return null == n || n === !1 ? "" : /[\&\<\>\"\'\`]/.test(n) ? (d = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            }, o = /&(?!\w+;)|[\<\>\"\'\`]/g, n.replace(o, function (b) {
                return d[b] || "&amp;"
            })) : n
        }, a
    }(), i.select_to_array = function (o) {
        var n, s, r, q, p;
        for (s = new i, p = o.childNodes, r = 0, q = p.length; q > r; r++) {
            n = p[r], s.add_node(n)
        }
        return s.parsed
    }, g = function () {
        function a(d, c) {
            this.form_field = d, this.options = null != c ? c : {}, a.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready())
        }

        return a.prototype.set_default_values = function () {
            var b = this;
            return this.click_test_action = function (c) {
                return b.test_active_click(c)
            }, this.activate_action = function (c) {
                return b.activate_field(c)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.group_search = null != this.options.group_search ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0, this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1
        }, a.prototype.set_default_text = function () {
            return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || a.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || a.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || a.default_no_result_text
        }, a.prototype.choice_label = function (b) {
            return this.include_group_label_in_selected && null != b.group_label ? "<b class='group-name'>" + b.group_label + "</b>" + b.html : b.html
        }, a.prototype.mouse_enter = function () {
            return this.mouse_on_container = !0
        }, a.prototype.mouse_leave = function () {
            return this.mouse_on_container = !1
        }, a.prototype.input_focus = function () {
            var b = this;
            if (this.is_multiple) {
                if (!this.active_field) {
                    return setTimeout(function () {
                        return b.container_mousedown()
                    }, 50)
                }
            } else {
                if (!this.active_field) {
                    return this.activate_field()
                }
            }
        }, a.prototype.input_blur = function () {
            var b = this;
            return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function () {
                return b.blur_test()
            }, 100))
        }, a.prototype.results_option_build = function (o) {
            var n, s, r, q, p;
            for (n = "", p = this.results_data, r = 0, q = p.length; q > r; r++) {
                s = p[r], n += s.group ? this.result_add_group(s) : this.result_add_option(s), (null != o ? o.first : void 0) && (s.selected && this.is_multiple ? this.choice_build(s) : s.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(s)))
            }
            return n
        }, a.prototype.result_add_option = function (n) {
            var d, o;
            return n.search_match && this.include_option_in_results(n) ? (d = [], n.disabled || n.selected && this.is_multiple || d.push("active-result"), !n.disabled || n.selected && this.is_multiple || d.push("disabled-result"), n.selected && d.push("result-selected"), null != n.group_array_index && d.push("group-option"), "" !== n.classes && d.push(n.classes), o = document.createElement("li"), o.className = d.join(" "), o.style.cssText = n.style, o.setAttribute("data-option-array-index", n.array_index), o.innerHTML = n.search_text, n.title && (o.title = n.title), this.outerHTML(o)) : ""
        }, a.prototype.result_add_group = function (n) {
            var d, o;
            return (n.search_match || n.group_match) && n.active_options > 0 ? (d = [], d.push("group-result"), n.classes && d.push(n.classes), o = document.createElement("li"), o.className = d.join(" "), o.innerHTML = n.search_text, n.title && (o.title = n.title), this.outerHTML(o)) : ""
        }, a.prototype.results_update_field = function () {
            return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing ? this.winnow_results() : void 0
        }, a.prototype.reset_single_select_options = function () {
            var o, n, r, q, p;
            for (q = this.results_data, p = [], n = 0, r = q.length; r > n; n++) {
                o = q[n], p.push(o.selected ? o.selected = !1 : void 0)
            }
            return p
        }, a.prototype.results_toggle = function () {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, a.prototype.results_search = function () {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, a.prototype.winnow_results = function () {
            var z, y, w, v, u, t, s, r, q, p, o, n;
            for (this.no_results_clear(), v = 0, t = this.get_search_text(), z = t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), q = new RegExp(z, "i"), w = this.get_search_regex(z), n = this.results_data, p = 0, o = n.length; o > p; p++) {
                y = n[p], y.search_match = !1, u = null, this.include_option_in_results(y) && (y.group && (y.group_match = !1, y.active_options = 0), null != y.group_array_index && this.results_data[y.group_array_index] && (u = this.results_data[y.group_array_index], 0 === u.active_options && u.search_match && (v += 1), u.active_options += 1), y.search_text = y.group ? y.label : y.html, (!y.group || this.group_search) && (y.search_match = this.search_string_match(y.search_text, w), y.search_match && !y.group && (v += 1), y.search_match ? (t.length && (s = y.search_text.search(q), r = y.search_text.substr(0, s + t.length) + "</em>" + y.search_text.substr(s + t.length), y.search_text = r.substr(0, s) + "<em>" + r.substr(s)), null != u && (u.group_match = !0)) : null != y.group_array_index && this.results_data[y.group_array_index].search_match && (y.search_match = !0)))
            }
            return this.result_clear_highlight(), 1 > v && t.length ? (this.update_results_content(""), this.no_results(t)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
        }, a.prototype.get_search_regex = function (d) {
            var c;
            return c = this.search_contains ? "" : "^", new RegExp(c + d, "i")
        }, a.prototype.search_string_match = function (o, n) {
            var s, r, q, p;
            if (n.test(o)) {
                return !0
            }
            if (this.enable_split_word_search && (o.indexOf(" ") >= 0 || 0 === o.indexOf("[")) && (r = o.replace(/\[|\]/g, "").split(" "), r.length)) {
                for (q = 0, p = r.length; p > q; q++) {
                    if (s = r[q], n.test(s)) {
                        return !0
                    }
                }
            }
        }, a.prototype.choices_count = function () {
            var o, n, q, p;
            if (null != this.selected_option_count) {
                return this.selected_option_count
            }
            for (this.selected_option_count = 0, p = this.form_field.options, n = 0, q = p.length; q > n; n++) {
                o = p[n], o.selected && (this.selected_option_count += 1)
            }
            return this.selected_option_count
        }, a.prototype.choices_click = function (b) {
            return b.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
        }, a.prototype.keyup_checker = function (n) {
            var d, o;
            switch (d = null != (o = n.which) ? o : n.keyCode, this.search_field_scale(), d) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
                        return this.keydown_backstroke()
                    }
                    if (!this.pending_backstroke) {
                        return this.result_clear_highlight(), this.results_search()
                    }
                    break;
                case 13:
                    if (n.preventDefault(), this.results_showing) {
                        return this.result_select(n)
                    }
                    break;
                case 27:
                    return this.results_showing && this.results_hide(), !0;
                case 9:
                case 38:
                case 40:
                case 16:
                case 91:
                case 17:
                    break;
                default:
                    return this.results_search()
            }
        }, a.prototype.clipboard_event_checker = function () {
            var b = this;
            return setTimeout(function () {
                return b.results_search()
            }, 50)
        }, a.prototype.container_width = function () {
            return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
        }, a.prototype.include_option_in_results = function (b) {
            return this.is_multiple && !this.display_selected_options && b.selected ? !1 : !this.display_disabled_options && b.disabled ? !1 : b.empty ? !1 : !0
        }, a.prototype.search_results_touchstart = function (b) {
            return this.touch_started = !0, this.search_results_mouseover(b)
        }, a.prototype.search_results_touchmove = function (b) {
            return this.touch_started = !1, this.search_results_mouseout(b)
        }, a.prototype.search_results_touchend = function (b) {
            return this.touch_started ? this.search_results_mouseup(b) : void 0
        }, a.prototype.outerHTML = function (d) {
            var c;
            return d.outerHTML ? d.outerHTML : (c = document.createElement("div"), c.appendChild(d), c.innerHTML)
        }, a.browser_is_supported = function () {
            return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0
        }, a.default_multiple_text = "Select Some Options", a.default_single_text = "Select an Option", a.default_no_result_text = "No results match", a
    }(), h = jQuery, h.fn.extend({
        chosen: function (a) {
            return g.browser_is_supported() ? this.each(function () {
                var n, b;
                n = h(this), b = n.data("chosen"), "destroy" === a && b instanceof k ? b.destroy() : b instanceof k || n.data("chosen", new k(this, a))
            }) : this
        }
    }), k = function (b) {
        function a() {
            return f = a.__super__.constructor.apply(this, arguments)
        }

        return j(a, b), a.prototype.setup = function () {
            return this.form_field_jq = h(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
        }, a.prototype.set_up_html = function () {
            var d, n;
            return d = ["chosen-container"], d.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && d.push(this.form_field.className), this.is_rtl && d.push("chosen-rtl"), n = {
                "class": d.join(" "),
                style: "width: " + this.container_width() + ";",
                title: this.form_field.title
            }, this.form_field.id.length && (n.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = h("<div />", n), this.container.html(this.is_multiple ? '<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>' : '<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior()
        }, a.prototype.on_ready = function () {
            return this.form_field_jq.trigger("chosen:ready", {chosen: this})
        }, a.prototype.register_observers = function () {
            var c = this;
            return this.container.bind("touchstart.chosen", function (d) {
                return c.container_mousedown(d), d.preventDefault()
            }), this.container.bind("touchend.chosen", function (d) {
                return c.container_mouseup(d), d.preventDefault()
            }), this.container.bind("mousedown.chosen", function (d) {
                c.container_mousedown(d)
            }), this.container.bind("mouseup.chosen", function (d) {
                c.container_mouseup(d)
            }), this.container.bind("mouseenter.chosen", function (d) {
                c.mouse_enter(d)
            }), this.container.bind("mouseleave.chosen", function (d) {
                c.mouse_leave(d)
            }), this.search_results.bind("mouseup.chosen", function (d) {
                c.search_results_mouseup(d)
            }), this.search_results.bind("mouseover.chosen", function (d) {
                c.search_results_mouseover(d)
            }), this.search_results.bind("mouseout.chosen", function (d) {
                c.search_results_mouseout(d)
            }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function (d) {
                c.search_results_mousewheel(d)
            }), this.search_results.bind("touchstart.chosen", function (d) {
                c.search_results_touchstart(d)
            }), this.search_results.bind("touchmove.chosen", function (d) {
                c.search_results_touchmove(d)
            }), this.search_results.bind("touchend.chosen", function (d) {
                c.search_results_touchend(d)
            }), this.form_field_jq.bind("chosen:updated.chosen", function (d) {
                c.results_update_field(d)
            }), this.form_field_jq.bind("chosen:activate.chosen", function (d) {
                c.activate_field(d)
            }), this.form_field_jq.bind("chosen:open.chosen", function (d) {
                c.container_mousedown(d)
            }), this.form_field_jq.bind("chosen:close.chosen", function (d) {
                c.input_blur(d)
            }), this.search_field.bind("blur.chosen", function (d) {
                c.input_blur(d)
            }), this.search_field.bind("keyup.chosen", function (d) {
                c.keyup_checker(d)
            }), this.search_field.bind("keydown.chosen", function (d) {
                c.keydown_checker(d)
            }), this.search_field.bind("focus.chosen", function (d) {
                c.input_focus(d)
            }), this.search_field.bind("cut.chosen", function (d) {
                c.clipboard_event_checker(d)
            }), this.search_field.bind("paste.chosen", function (d) {
                c.clipboard_event_checker(d)
            }), this.is_multiple ? this.search_choices.bind("click.chosen", function (d) {
                c.choices_click(d)
            }) : this.container.bind("click.chosen", function (d) {
                d.preventDefault()
            })
        }, a.prototype.destroy = function () {
            return h(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
        }, a.prototype.search_field_disabled = function () {
            return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
        }, a.prototype.container_mousedown = function (c) {
            return this.is_disabled || (c && "mousedown" === c.type && !this.results_showing && c.preventDefault(), null != c && h(c.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !c || h(c.target)[0] !== this.selected_item[0] && !h(c.target).parents("a.chosen-single").length || (c.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), h(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
        }, a.prototype.container_mouseup = function (c) {
            return "ABBR" !== c.target.nodeName || this.is_disabled ? void 0 : this.results_reset(c)
        }, a.prototype.search_results_mousewheel = function (d) {
            var c;
            return d.originalEvent && (c = d.originalEvent.deltaY || -d.originalEvent.wheelDelta || d.originalEvent.detail), null != c ? (d.preventDefault(), "DOMMouseScroll" === d.type && (c = 40 * c), this.search_results.scrollTop(c + this.search_results.scrollTop())) : void 0
        }, a.prototype.blur_test = function () {
            return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
        }, a.prototype.close_field = function () {
            return h(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
        }, a.prototype.activate_field = function () {
            return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
        }, a.prototype.test_active_click = function (d) {
            var n;
            return n = h(d.target).closest(".chosen-container"), n.length && this.container[0] === n[0] ? this.active_field = !0 : this.close_field()
        }, a.prototype.results_build = function () {
            return this.parsing = !0, this.selected_option_count = null, this.results_data = i.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({first: !0})), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
        }, a.prototype.result_do_highlight = function (o) {
            var n, s, r, q, p;
            if (o.length) {
                if (this.result_clear_highlight(), this.result_highlight = o, this.result_highlight.addClass("highlighted"), r = parseInt(this.search_results.css("maxHeight"), 10), p = this.search_results.scrollTop(), q = r + p, s = this.result_highlight.position().top + this.search_results.scrollTop(), n = s + this.result_highlight.outerHeight(), n >= q) {
                    return this.search_results.scrollTop(n - r > 0 ? n - r : 0)
                }
                if (p > s) {
                    return this.search_results.scrollTop(s)
                }
            }
        }, a.prototype.result_clear_highlight = function () {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, a.prototype.results_show = function () {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {chosen: this}))
        }, a.prototype.update_results_content = function (c) {
            return this.search_results.html(c)
        }, a.prototype.results_hide = function () {
            return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {chosen: this})), this.results_showing = !1
        }, a.prototype.set_tab_index = function () {
            var c;
            return this.form_field.tabIndex ? (c = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = c) : void 0
        }, a.prototype.set_label_behavior = function () {
            var c = this;
            return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = h("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function (d) {
                return c.is_multiple ? c.container_mousedown(d) : c.activate_field()
            }) : void 0
        }, a.prototype.show_search_field_default = function () {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, a.prototype.search_results_mouseup = function (d) {
            var n;
            return n = h(d.target).hasClass("active-result") ? h(d.target) : h(d.target).parents(".active-result").first(), n.length ? (this.result_highlight = n, this.result_select(d), this.search_field.focus()) : void 0
        }, a.prototype.search_results_mouseover = function (d) {
            var n;
            return n = h(d.target).hasClass("active-result") ? h(d.target) : h(d.target).parents(".active-result").first(), n ? this.result_do_highlight(n) : void 0
        }, a.prototype.search_results_mouseout = function (c) {
            return h(c.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
        }, a.prototype.choice_build = function (n) {
            var q, p, o = this;
            return q = h("<li />", {"class": "search-choice"}).html("<span>" + this.choice_label(n) + "</span>"), n.disabled ? q.addClass("search-choice-disabled") : (p = h("<a />", {
                "class": "search-choice-close",
                "data-option-array-index": n.array_index
            }), p.bind("click.chosen", function (c) {
                return o.choice_destroy_link_click(c)
            }), q.append(p)), this.search_container.before(q)
        }, a.prototype.choice_destroy_link_click = function (c) {
            return c.preventDefault(), c.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(h(c.target))
        }, a.prototype.choice_destroy = function (c) {
            return this.result_deselect(c[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), c.parents("li").first().remove(), this.search_field_scale()) : void 0
        }, a.prototype.results_reset = function () {
            return this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
        }, a.prototype.results_reset_cleanup = function () {
            return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
        }, a.prototype.result_select = function (n) {
            var d, o;
            return this.result_highlight ? (d = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.is_multiple ? d.removeClass("active-result") : this.reset_single_select_options(), d.addClass("result-selected"), o = this.results_data[d[0].getAttribute("data-option-array-index")], o.selected = !0, this.form_field.options[o.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(o) : this.single_set_selected_text(this.choice_label(o)), (n.metaKey || n.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {selected: this.form_field.options[o.options_index].value}), this.current_selectedIndex = this.form_field.selectedIndex, n.preventDefault(), this.search_field_scale())) : void 0
        }, a.prototype.single_set_selected_text = function (c) {
            return null == c && (c = this.default_text), c === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").html(c)
        }, a.prototype.result_deselect = function (d) {
            var c;
            return c = this.results_data[d], this.form_field.options[c.options_index].disabled ? !1 : (c.selected = !1, this.form_field.options[c.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {deselected: this.form_field.options[c.options_index].value}), this.search_field_scale(), !0)
        }, a.prototype.single_deselect_control_build = function () {
            return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
        }, a.prototype.get_search_text = function () {
            return h("<div/>").text(h.trim(this.search_field.val())).html()
        }, a.prototype.winnow_results_set_highlight = function () {
            var d, c;
            return c = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), d = c.length ? c.first() : this.search_results.find(".active-result").first(), null != d ? this.result_do_highlight(d) : void 0
        }, a.prototype.no_results = function (d) {
            var n;
            return n = h('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), n.find("span").first().html(d), this.search_results.append(n), this.form_field_jq.trigger("chosen:no_results", {chosen: this})
        }, a.prototype.no_results_clear = function () {
            return this.search_results.find(".no-results").remove()
        }, a.prototype.keydown_arrow = function () {
            var c;
            return this.results_showing && this.result_highlight ? (c = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(c) : void 0 : this.results_show()
        }, a.prototype.keyup_arrow = function () {
            var c;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (c = this.result_highlight.prevAll("li.active-result"), c.length ? this.result_do_highlight(c.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
        }, a.prototype.keydown_backstroke = function () {
            var c;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (c = this.search_container.siblings("li.search-choice").last(), c.length && !c.hasClass("search-choice-disabled") ? (this.pending_backstroke = c, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
        }, a.prototype.clear_backstroke = function () {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, a.prototype.keydown_checker = function (n) {
            var d, o;
            switch (d = null != (o = n.which) ? o : n.keyCode, this.search_field_scale(), 8 !== d && this.pending_backstroke && this.clear_backstroke(), d) {
                case 8:
                    this.backstroke_length = this.search_field.val().length;
                    break;
                case 9:
                    this.results_showing && !this.is_multiple && this.result_select(n), this.mouse_on_container = !1;
                    break;
                case 13:
                    this.results_showing && n.preventDefault();
                    break;
                case 32:
                    this.disable_search && n.preventDefault();
                    break;
                case 38:
                    n.preventDefault(), this.keyup_arrow();
                    break;
                case 40:
                    n.preventDefault(), this.keydown_arrow()
            }
        }, a.prototype.search_field_scale = function () {
            var v, u, t, s, r, q, p, o, n;
            if (this.is_multiple) {
                for (t = 0, p = 0, r = "position:absolute; left: -1000px; top: -1000px; display:none;", q = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], o = 0, n = q.length; n > o; o++) {
                    s = q[o], r += s + ":" + this.search_field.css(s) + ";"
                }
                return v = h("<div />", {style: r}), v.text(this.search_field.val()), h("body").append(v), p = v.width() + 25, v.remove(), u = this.container.outerWidth(), p > u - 10 && (p = u - 10), this.search_field.css({width: p + "px"})
            }
        }, a
    }(g)
}).call(this);
/*! EmojioneArea v3.4.1 | MIT license */
;window = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, document = window.document || {}, function (d, c) {
    "function" == typeof require && "object" == typeof exports && "object" == typeof module ? d(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], d) : d(c.jQuery)
}(function (aG) {
    var aF = 0, aE = {}, aD = {}, aC = window.emojione, aB = [];

    function aA(b) {
        aC ? b() : aB.push(b)
    }

    var az = "data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAMDAwAAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==",
        ay = [].slice, ax = "emojionearea", aw = 0, av = "&#8203;";

    function au(a, m, k) {
        var j = !0, i = 1;
        if (m) {
            m = m.toLowerCase();
            do {
                var c = 1 == i ? "@" + m : m;
                aE[a.id][c] && aE[a.id][c].length && aG.each(aE[a.id][c], function (b, d) {
                    return j = d.apply(a, k || []) !== !1
                })
            } while (j && i--)
        }
        return j
    }

    function at(a, h, g, d) {
        d = d || function (f, i) {
            return aG(i.currentTarget)
        }, aG.each(g, function (c, b) {
            c = aG.isArray(g) ? b : c, (aD[a.id][b] || (aD[a.id][b] = [])).push([h, c, d])
        })
    }

    function ar(j, i, p) {
        var o = aC.imageType, n;
        n = "svg" == o ? aC.imagePathSVG : aC.imagePathPNG;
        var m = "";
        p && (m = p.substr(1, p.length - 2).replace(/_/g, " ").replace(/\w\S*/g, function (b) {
            return b.charAt(0).toUpperCase() + b.substr(1).toLowerCase()
        }));
        var k = "";
        return i.uc_base && aw > 4 ? (k = i.uc_base, i = i.uc_output.toUpperCase()) : k = i, j.replace("{name}", p || "").replace("{friendlyName}", m).replace("{img}", n + (aw < 2 ? k.toUpperCase() : k) + "." + o).replace("{uni}", i).replace("{alt}", aC.convert(i))
    }

    function aq(f, d, g) {
        return f.replace(/:?\+?[\w_\-]+:?/g, function (b) {
            b = ":" + b.replace(/:$/, "").replace(/^:/, "") + ":";
            var c = aC.emojioneList[b];
            return c ? aw > 4 ? ar(d, c, b) : (aw > 3 && (c = c.unicode), ar(d, c[c.length - 1], b)) : g ? "" : b
        })
    }

    function ap(i) {
        var h, o;
        if (window.getSelection) {
            if (h = window.getSelection(), h.getRangeAt && h.rangeCount) {
                o = h.getRangeAt(0), o.deleteContents();
                var n = document.createElement("div");
                n.innerHTML = i;
                var m = document.createDocumentFragment(), k, j;
                while (k = n.firstChild) {
                    j = m.appendChild(k)
                }
                o.insertNode(m), j && (o = o.cloneRange(), o.setStartAfter(j), o.collapse(!0), h.removeAllRanges(), h.addRange(o))
            }
        } else {
            document.selection && "Control" != document.selection.type && document.selection.createRange().pasteHTML(i)
        }
    }

    function ao() {
        return window.emojioneVersion || "3.1.2"
    }

    function an(b) {
        return "object" == typeof b
    }

    function am(d) {
        var c;
        return d.cacheBustParam ? (c = d.cacheBustParam, an(d.jsEscapeMap) ? "?v=1.2.4" === c ? "2.0.0" : "?v=2.0.1" === c ? "2.1.0" : "?v=2.1.1" === c ? "2.1.1" : "?v=2.1.2" === c ? "2.1.2" : "?v=2.1.3" === c ? "2.1.3" : "?v=2.1.4" === c ? "2.1.4" : "2.2.7" : "1.5.2") : d.emojiVersion
    }

    function al(b) {
        switch (b) {
            case"1.5.2":
                return 0;
            case"2.0.0":
                return 1;
            case"2.1.0":
            case"2.1.1":
                return 2;
            case"2.1.2":
                return 3;
            case"2.1.3":
            case"2.1.4":
            case"2.2.7":
                return 4;
            case"3.0.1":
            case"3.0.2":
            case"3.0.3":
            case"3.0":
                return 5;
            case"3.1.0":
            case"3.1.1":
            case"3.1.2":
            case"3.1":
            default:
                return 6
        }
    }

    function ak() {
        if (aG.fn.emojioneArea && aG.fn.emojioneArea.defaults) {
            return aG.fn.emojioneArea.defaults
        }
        var a = {
            attributes: {
                dir: "ltr",
                spellcheck: !1,
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off"
            },
            search: !0,
            placeholder: null,
            emojiPlaceholder: ":smiley:",
            searchPlaceholder: "SEARCH",
            container: null,
            hideSource: !0,
            shortnames: !0,
            sprite: !0,
            pickerPosition: "top",
            filtersPosition: "top",
            searchPosition: "top",
            hidePickerOnBlur: !0,
            buttonTitle: "Use the TAB key to insert emoji faster",
            tones: !0,
            tonesStyle: "bullet",
            inline: null,
            saveEmojisAs: "unicode",
            shortcuts: !0,
            autocomplete: !0,
            autocompleteTones: !1,
            standalone: !1,
            useInternalCDN: !0,
            imageType: "png",
            recentEmojis: !0,
            textcomplete: {maxCount: 15, placement: null}
        }, d = al(aC ? am(aC) : ao());
        return d > 4 ? a.filters = {
            tones: {
                title: "Diversity",
                emoji: "open_hands raised_hands palms_up_together clap pray thumbsup thumbsdown punch fist left_facing_fist right_facing_fist fingers_crossed v metal love_you_gesture ok_hand point_left point_right point_up_2 point_down point_up raised_hand raised_back_of_hand hand_splayed vulcan wave call_me muscle middle_finger writing_hand selfie nail_care ear nose baby boy girl man woman blond-haired_woman blond-haired_man older_man older_woman man_with_chinese_cap woman_wearing_turban man_wearing_turban woman_police_officer man_police_officer woman_construction_worker man_construction_worker woman_guard man_guard woman_detective man_detective woman_health_worker man_health_worker woman_farmer man_farmer woman_cook man_cook woman_student man_student woman_singer man_singer woman_teacher man_teacher woman_factory_worker man_factory_worker woman_technologist man_technologist woman_office_worker man_office_worker woman_mechanic man_mechanic woman_scientist man_scientist woman_artist man_artist woman_firefighter man_firefighter woman_pilot man_pilot woman_astronaut man_astronaut woman_judge man_judge mrs_claus santa princess prince bride_with_veil man_in_tuxedo angel pregnant_woman breast_feeding woman_bowing man_bowing man_tipping_hand woman_tipping_hand man_gesturing_no woman_gesturing_no man_gesturing_ok woman_gesturing_ok man_raising_hand woman_raising_hand woman_facepalming man_facepalming woman_shrugging man_shrugging man_pouting woman_pouting man_frowning woman_frowning man_getting_haircut woman_getting_haircut man_getting_face_massage woman_getting_face_massage man_in_business_suit_levitating dancer man_dancing woman_walking man_walking woman_running man_running adult child older_adult bearded_person woman_with_headscarf woman_mage man_mage woman_fairy man_fairy woman_vampire man_vampire mermaid merman woman_elf man_elf snowboarder woman_lifting_weights man_lifting_weights woman_cartwheeling man_cartwheeling woman_bouncing_ball man_bouncing_ball woman_playing_handball man_playing_handball woman_golfing man_golfing woman_surfing man_surfing woman_swimming man_swimming woman_playing_water_polo man_playing_water_polo woman_rowing_boat man_rowing_boat horse_racing woman_biking man_biking woman_mountain_biking man_mountain_biking woman_juggling man_juggling woman_in_steamy_room man_in_steamy_room woman_climbing man_climbing woman_in_lotus_position man_in_lotus_position bath person_in_bed"
            },
            recent: {icon: "clock3", title: "Recent", emoji: ""},
            smileys_people: {
                icon: "yum",
                title: "Smileys & People",
                emoji: "grinning smiley smile grin laughing sweat_smile joy rofl relaxed blush innocent slight_smile upside_down wink relieved crazy_face star_struck heart_eyes kissing_heart kissing kissing_smiling_eyes kissing_closed_eyes yum stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue money_mouth hugging nerd sunglasses cowboy smirk unamused disappointed pensive worried face_with_raised_eyebrow face_with_monocle confused slight_frown frowning2 persevere confounded tired_face weary triumph angry rage face_with_symbols_over_mouth no_mouth neutral_face expressionless hushed frowning anguished open_mouth astonished dizzy_face exploding_head flushed scream fearful cold_sweat cry disappointed_relieved drooling_face sob sweat sleepy sleeping rolling_eyes thinking shushing_face face_with_hand_over_mouth lying_face grimacing zipper_mouth face_vomiting nauseated_face sneezing_face mask thermometer_face head_bandage smiling_imp imp japanese_ogre japanese_goblin poop ghost skull skull_crossbones alien space_invader robot jack_o_lantern clown smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face pouting_cat open_hands raised_hands palms_up_together clap pray handshake thumbsup thumbsdown punch fist left_facing_fist right_facing_fist fingers_crossed v metal love_you_gesture ok_hand point_left point_right point_up_2 point_down point_up raised_hand raised_back_of_hand hand_splayed vulcan wave call_me muscle middle_finger writing_hand selfie nail_care ring lipstick kiss lips tongue ear nose footprints eye eyes speaking_head bust_in_silhouette busts_in_silhouette baby boy girl man woman blond-haired_woman blond_haired_man older_man older_woman man_with_chinese_cap woman_wearing_turban man_wearing_turban woman_police_officer police_officer woman_construction_worker construction_worker woman_guard guard woman_detective detective woman_health_worker man_health_worker woman_farmer man_farmer woman_cook man_cook woman_student man_student woman_singer man_singer woman_teacher man_teacher woman_factory_worker man_factory_worker woman_technologist man_technologist woman_office_worker man_office_worker woman_mechanic man_mechanic woman_scientist man_scientist woman_artist man_artist woman_firefighter man_firefighter woman_pilot man_pilot woman_astronaut man_astronaut woman_judge man_judge mrs_claus santa princess prince bride_with_veil man_in_tuxedo angel pregnant_woman breast_feeding woman_bowing man_bowing woman_tipping_hand man_tipping_hand woman_gesturing_no man_gesturing_no woman_gesturing_ok man_gesturing_ok woman_raising_hand man_raising_hand woman_facepalming man_facepalming woman_shrugging man_shrugging woman_pouting man_pouting woman_frowning man_frowning woman_getting_haircut man_getting_haircut woman_getting_face_massage man_getting_face_massage man_in_business_suit_levitating dancer man_dancing women_with_bunny_ears_partying men_with_bunny_ears_partying woman_walking man_walking woman_running man_running couple two_women_holding_hands two_men_holding_hands couple_with_heart couple_ww couple_mm couplekiss kiss_ww kiss_mm family family_mwg family_mwgb family_mwbb family_mwgg family_wwb family_wwg family_wwgb family_wwbb family_wwgg family_mmb family_mmg family_mmgb family_mmbb family_mmgg family_woman_boy family_woman_girl family_woman_girl_boy family_woman_boy_boy family_woman_girl_girl family_man_boy family_man_girl family_man_girl_boy family_man_boy_boy family_man_girl_girl bearded_person woman_with_headscarf woman_mage man_mage woman_fairy man_fairy woman_vampire man_vampire mermaid merman woman_elf man_elf woman_genie man_genie woman_zombie man_zombie womans_clothes shirt jeans necktie dress bikini kimono high_heel sandal boot mans_shoe athletic_shoe womans_hat tophat mortar_board crown helmet_with_cross school_satchel pouch purse handbag briefcase eyeglasses dark_sunglasses closed_umbrella umbrella2 brain billed_cap scarf gloves coat socks "
            },
            animals_nature: {
                icon: "hamster",
                title: "Animals & Nature",
                emoji: "dog cat mouse hamster rabbit fox bear panda_face koala tiger lion_face cow pig pig_nose frog monkey_face see_no_evil hear_no_evil speak_no_evil monkey chicken penguin bird baby_chick hatching_chick hatched_chick duck eagle owl bat wolf boar horse unicorn bee bug butterfly snail shell beetle ant spider spider_web turtle snake lizard scorpion crab squid octopus shrimp tropical_fish fish blowfish dolphin shark whale whale2 crocodile leopard tiger2 water_buffalo ox cow2 deer dromedary_camel camel elephant rhino gorilla racehorse pig2 goat ram sheep dog2 poodle cat2 rooster turkey dove rabbit2 mouse2 rat chipmunk dragon giraffe zebra hedgehog sauropod t_rex cricket dragon_face feet cactus christmas_tree evergreen_tree deciduous_tree palm_tree seedling herb shamrock four_leaf_clover bamboo tanabata_tree leaves fallen_leaf maple_leaf mushroom ear_of_rice bouquet tulip rose wilted_rose sunflower blossom cherry_blossom hibiscus earth_americas earth_africa earth_asia full_moon waning_gibbous_moon last_quarter_moon waning_crescent_moon new_moon waxing_crescent_moon first_quarter_moon waxing_gibbous_moon new_moon_with_face full_moon_with_face sun_with_face first_quarter_moon_with_face last_quarter_moon_with_face crescent_moon dizzy star star2 sparkles zap fire boom comet sunny white_sun_small_cloud partly_sunny white_sun_cloud white_sun_rain_cloud rainbow cloud cloud_rain thunder_cloud_rain cloud_lightning cloud_snow snowman2 snowman snowflake wind_blowing_face dash cloud_tornado fog ocean droplet sweat_drops umbrella "
            },
            food_drink: {
                icon: "pizza",
                title: "Food & Drink",
                emoji: "green_apple apple pear tangerine lemon banana watermelon grapes strawberry melon cherries peach pineapple kiwi avocado tomato eggplant cucumber carrot corn hot_pepper potato sweet_potato chestnut peanuts honey_pot croissant bread french_bread cheese egg cooking bacon pancakes fried_shrimp poultry_leg meat_on_bone pizza hotdog hamburger fries stuffed_flatbread taco burrito salad shallow_pan_of_food spaghetti ramen stew fish_cake sushi bento curry rice_ball rice rice_cracker oden dango shaved_ice ice_cream icecream cake birthday custard lollipop candy chocolate_bar popcorn doughnut cookie milk baby_bottle coffee tea sake beer beers champagne_glass wine_glass tumbler_glass cocktail tropical_drink champagne spoon fork_and_knife fork_knife_plate dumpling fortune_cookie takeout_box chopsticks bowl_with_spoon cup_with_straw coconut broccoli pie pretzel cut_of_meat sandwich canned_food"
            },
            activity: {
                icon: "basketball",
                title: "Activity",
                emoji: "soccer basketball football baseball tennis volleyball rugby_football 8ball ping_pong badminton goal hockey field_hockey cricket_game golf bow_and_arrow fishing_pole_and_fish boxing_glove martial_arts_uniform ice_skate ski skier snowboarder woman_lifting_weights man_lifting_weights person_fencing women_wrestling men_wrestling woman_cartwheeling man_cartwheeling woman_bouncing_ball man_bouncing_ball woman_playing_handball man_playing_handball woman_golfing man_golfing woman_surfing man_surfing woman_swimming man_swimming woman_playing_water_polo man_playing_water_polo woman_rowing_boat man_rowing_boat horse_racing woman_biking man_biking woman_mountain_biking man_mountain_biking woman_in_steamy_room man_in_steamy_room woman_climbing man_climbing woman_in_lotus_position man_in_lotus_position running_shirt_with_sash medal military_medal first_place second_place third_place trophy rosette reminder_ribbon ticket tickets circus_tent woman_juggling man_juggling performing_arts art clapper microphone headphones musical_score musical_keyboard drum saxophone trumpet guitar violin game_die dart bowling video_game slot_machine sled curling_stone "
            },
            travel_places: {
                icon: "rocket",
                title: "Travel & Places",
                emoji: "red_car taxi blue_car bus trolleybus race_car police_car ambulance fire_engine minibus truck articulated_lorry tractor scooter bike motor_scooter motorcycle rotating_light oncoming_police_car oncoming_bus oncoming_automobile oncoming_taxi aerial_tramway mountain_cableway suspension_railway railway_car train mountain_railway monorail bullettrain_side bullettrain_front light_rail steam_locomotive train2 metro tram station helicopter airplane_small airplane airplane_departure airplane_arriving rocket satellite_orbital seat canoe sailboat motorboat speedboat cruise_ship ferry ship anchor construction fuelpump busstop vertical_traffic_light traffic_light map moyai statue_of_liberty fountain tokyo_tower european_castle japanese_castle stadium ferris_wheel roller_coaster carousel_horse beach_umbrella beach island mountain mountain_snow mount_fuji volcano desert camping tent railway_track motorway construction_site factory house house_with_garden homes house_abandoned office department_store post_office european_post_office hospital bank hotel convenience_store school love_hotel wedding classical_building church mosque synagogue kaaba shinto_shrine japan rice_scene park sunrise sunrise_over_mountains stars sparkler fireworks city_sunset city_dusk cityscape night_with_stars milky_way bridge_at_night foggy flying_saucer"
            },
            objects: {
                icon: "bulb",
                title: "Objects",
                emoji: "watch iphone calling computer keyboard desktop printer mouse_three_button trackball joystick compression minidisc floppy_disk cd dvd vhs camera camera_with_flash video_camera movie_camera projector film_frames telephone_receiver telephone pager fax tv radio microphone2 level_slider control_knobs stopwatch timer alarm_clock clock hourglass hourglass_flowing_sand satellite battery electric_plug bulb flashlight candle wastebasket oil money_with_wings dollar yen euro pound moneybag credit_card gem scales wrench hammer hammer_pick tools pick nut_and_bolt gear chains gun bomb knife dagger crossed_swords shield smoking coffin urn amphora crystal_ball prayer_beads barber alembic telescope microscope hole pill syringe thermometer toilet potable_water shower bathtub bath bellhop key key2 door couch bed sleeping_accommodation frame_photo shopping_bags shopping_cart gift balloon flags ribbon confetti_ball tada dolls izakaya_lantern wind_chime envelope envelope_with_arrow incoming_envelope e-mail love_letter inbox_tray outbox_tray package label mailbox_closed mailbox mailbox_with_mail mailbox_with_no_mail postbox postal_horn scroll page_with_curl page_facing_up bookmark_tabs bar_chart chart_with_upwards_trend chart_with_downwards_trend notepad_spiral calendar_spiral calendar date card_index card_box ballot_box file_cabinet clipboard file_folder open_file_folder dividers newspaper2 newspaper notebook notebook_with_decorative_cover ledger closed_book green_book blue_book orange_book books book bookmark link paperclip paperclips triangular_ruler straight_ruler pushpin round_pushpin scissors pen_ballpoint pen_fountain black_nib paintbrush crayon pencil pencil2 mag mag_right lock_with_ink_pen closed_lock_with_key lock unlock"
            },
            symbols: {
                icon: "heartpulse",
                title: "Symbols",
                emoji: "heart orange_heart yellow_heart green_heart blue_heart purple_heart black_heart broken_heart heart_exclamation two_hearts revolving_hearts heartbeat heartpulse sparkling_heart cupid gift_heart heart_decoration peace cross star_and_crescent om_symbol wheel_of_dharma star_of_david six_pointed_star menorah yin_yang orthodox_cross place_of_worship ophiuchus aries taurus gemini cancer leo virgo libra scorpius sagittarius capricorn aquarius pisces id atom accept radioactive biohazard mobile_phone_off vibration_mode u6709 u7121 u7533 u55b6 u6708 eight_pointed_black_star vs white_flower ideograph_advantage secret congratulations u5408 u6e80 u5272 u7981 a b ab cl o2 sos x o octagonal_sign no_entry name_badge no_entry_sign 100 anger hotsprings no_pedestrians do_not_litter no_bicycles non-potable_water underage no_mobile_phones no_smoking exclamation grey_exclamation question grey_question bangbang interrobang low_brightness high_brightness part_alternation_mark warning children_crossing trident fleur-de-lis beginner recycle white_check_mark u6307 chart sparkle eight_spoked_asterisk negative_squared_cross_mark globe_with_meridians diamond_shape_with_a_dot_inside m cyclone zzz atm wc wheelchair parking u7a7a sa passport_control customs baggage_claim left_luggage mens womens baby_symbol restroom put_litter_in_its_place cinema signal_strength koko symbols information_source abc abcd capital_abcd ng ok up cool new free zero one two three four five six seven eight nine keycap_ten 1234 hash asterisk arrow_forward pause_button play_pause stop_button record_button eject track_next track_previous fast_forward rewind arrow_double_up arrow_double_down arrow_backward arrow_up_small arrow_down_small arrow_right arrow_left arrow_up arrow_down arrow_upper_right arrow_lower_right arrow_lower_left arrow_upper_left arrow_up_down left_right_arrow arrow_right_hook leftwards_arrow_with_hook arrow_heading_up arrow_heading_down twisted_rightwards_arrows repeat repeat_one arrows_counterclockwise arrows_clockwise musical_note notes heavy_plus_sign heavy_minus_sign heavy_division_sign heavy_multiplication_x heavy_dollar_sign currency_exchange tm copyright registered wavy_dash curly_loop loop end back on top soon heavy_check_mark ballot_box_with_check radio_button white_circle black_circle red_circle blue_circle small_red_triangle small_red_triangle_down small_orange_diamond small_blue_diamond large_orange_diamond large_blue_diamond white_square_button black_square_button black_small_square white_small_square black_medium_small_square white_medium_small_square black_medium_square white_medium_square black_large_square white_large_square speaker mute sound loud_sound bell no_bell mega loudspeaker speech_left eye_in_speech_bubble speech_balloon thought_balloon anger_right spades clubs hearts diamonds black_joker flower_playing_cards mahjong clock1 clock2 clock3 clock4 clock5 clock6 clock7 clock8 clock9 clock10 clock11 clock12 clock130 clock230 clock330 clock430 clock530 clock630 clock730 clock830 clock930 clock1030 clock1130 clock1230"
            },
            flags: {
                icon: "flag_gb",
                title: "Flags",
                emoji: "flag_white flag_black checkered_flag triangular_flag_on_post rainbow_flag flag_af flag_ax flag_al flag_dz flag_as flag_ad flag_ao flag_ai flag_aq flag_ag flag_ar flag_am flag_aw flag_au flag_at flag_az flag_bs flag_bh flag_bd flag_bb flag_by flag_be flag_bz flag_bj flag_bm flag_bt flag_bo flag_ba flag_bw flag_br flag_io flag_vg flag_bn flag_bg flag_bf flag_bi flag_kh flag_cm flag_ca flag_ic flag_cv flag_bq flag_ky flag_cf flag_td flag_cl flag_cn flag_cx flag_cc flag_co flag_km flag_cg flag_cd flag_ck flag_cr flag_ci flag_hr flag_cu flag_cw flag_cy flag_cz flag_dk flag_dj flag_dm flag_do flag_ec flag_eg flag_sv flag_gq flag_er flag_ee flag_et flag_eu flag_fk flag_fo flag_fj flag_fi flag_fr flag_gf flag_pf flag_tf flag_ga flag_gm flag_ge flag_de flag_gh flag_gi flag_gr flag_gl flag_gd flag_gp flag_gu flag_gt flag_gg flag_gn flag_gw flag_gy flag_ht flag_hn flag_hk flag_hu flag_is flag_in flag_id flag_ir flag_iq flag_ie flag_im flag_il flag_it flag_jm flag_jp crossed_flags flag_je flag_jo flag_kz flag_ke flag_ki flag_xk flag_kw flag_kg flag_la flag_lv flag_lb flag_ls flag_lr flag_ly flag_li flag_lt flag_lu flag_mo flag_mk flag_mg flag_mw flag_my flag_mv flag_ml flag_mt flag_mh flag_mq flag_mr flag_mu flag_yt flag_mx flag_fm flag_md flag_mc flag_mn flag_me flag_ms flag_ma flag_mz flag_mm flag_na flag_nr flag_np flag_nl flag_nc flag_nz flag_ni flag_ne flag_ng flag_nu flag_nf flag_kp flag_mp flag_no flag_om flag_pk flag_pw flag_ps flag_pa flag_pg flag_py flag_pe flag_ph flag_pn flag_pl flag_pt flag_pr flag_qa flag_re flag_ro flag_ru flag_rw flag_ws flag_sm flag_st flag_sa flag_sn flag_rs flag_sc flag_sl flag_sg flag_sx flag_sk flag_si flag_gs flag_sb flag_so flag_za flag_kr flag_ss flag_es flag_lk flag_bl flag_sh flag_kn flag_lc flag_pm flag_vc flag_sd flag_sr flag_sz flag_se flag_ch flag_sy flag_tw flag_tj flag_tz flag_th flag_tl flag_tg flag_tk flag_to flag_tt flag_tn flag_tr flag_tm flag_tc flag_tv flag_vi flag_ug flag_ua flag_ae flag_gb flag_us flag_uy flag_uz flag_vu flag_va flag_ve flag_vn flag_wf flag_eh flag_ye flag_zm flag_zw flag_ac flag_ta flag_bv flag_hm flag_sj flag_um flag_ea flag_cp flag_dg flag_mf united_nations england scotland wales"
            }
        } : a.filters = {
            tones: {
                title: "Diversity",
                emoji: "santa runner surfer swimmer lifter ear nose point_up_2 point_down point_left point_right punch wave ok_hand thumbsup thumbsdown clap open_hands boy girl man woman cop bride_with_veil person_with_blond_hair man_with_gua_pi_mao man_with_turban older_man grandma baby construction_worker princess angel information_desk_person guardsman dancer nail_care massage haircut muscle spy hand_splayed middle_finger vulcan no_good ok_woman bow raising_hand raised_hands person_frowning person_with_pouting_face pray rowboat bicyclist mountain_bicyclist walking bath metal point_up basketball_player fist raised_hand v writing_hand"
            },
            recent: {icon: "clock3", title: "Recent", emoji: ""},
            smileys_people: {
                icon: "yum",
                title: "Smileys & People",
                emoji: "grinning grimacing grin joy smiley smile sweat_smile laughing innocent wink blush slight_smile upside_down relaxed yum relieved heart_eyes kissing_heart kissing kissing_smiling_eyes kissing_closed_eyes stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue money_mouth nerd sunglasses hugging smirk no_mouth neutral_face expressionless unamused rolling_eyes thinking flushed disappointed worried angry rage pensive confused slight_frown frowning2 persevere confounded tired_face weary triumph open_mouth scream fearful cold_sweat hushed frowning anguished cry disappointed_relieved sleepy sweat sob dizzy_face astonished zipper_mouth mask thermometer_face head_bandage sleeping zzz poop smiling_imp imp japanese_ogre japanese_goblin skull ghost alien robot smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face pouting_cat raised_hands clap wave thumbsup thumbsdown punch fist v ok_hand raised_hand open_hands muscle pray point_up point_up_2 point_down point_left point_right middle_finger hand_splayed metal vulcan writing_hand nail_care lips tongue ear nose eye eyes bust_in_silhouette busts_in_silhouette speaking_head baby boy girl man woman person_with_blond_hair older_man older_woman man_with_gua_pi_mao man_with_turban cop construction_worker guardsman spy santa angel princess bride_with_veil walking runner dancer dancers couple two_men_holding_hands two_women_holding_hands bow information_desk_person no_good ok_woman raising_hand person_with_pouting_face person_frowning haircut massage couple_with_heart couple_ww couple_mm couplekiss kiss_ww kiss_mm family family_mwg family_mwgb family_mwbb family_mwgg family_wwb family_wwg family_wwgb family_wwbb family_wwgg family_mmb family_mmg family_mmgb family_mmbb family_mmgg womans_clothes shirt jeans necktie dress bikini kimono lipstick kiss footprints high_heel sandal boot mans_shoe athletic_shoe womans_hat tophat helmet_with_cross mortar_board crown school_satchel pouch purse handbag briefcase eyeglasses dark_sunglasses ring closed_umbrella"
            },
            animals_nature: {
                icon: "hamster",
                title: "Animals & Nature",
                emoji: "dog cat mouse hamster rabbit bear panda_face koala tiger lion_face cow pig pig_nose frog octopus monkey_face see_no_evil hear_no_evil speak_no_evil monkey chicken penguin bird baby_chick hatching_chick hatched_chick wolf boar horse unicorn bee bug snail beetle ant spider scorpion crab snake turtle tropical_fish fish blowfish dolphin whale whale2 crocodile leopard tiger2 water_buffalo ox cow2 dromedary_camel camel elephant goat ram sheep racehorse pig2 rat mouse2 rooster turkey dove dog2 poodle cat2 rabbit2 chipmunk feet dragon dragon_face cactus christmas_tree evergreen_tree deciduous_tree palm_tree seedling herb shamrock four_leaf_clover bamboo tanabata_tree leaves fallen_leaf maple_leaf ear_of_rice hibiscus sunflower rose tulip blossom cherry_blossom bouquet mushroom chestnut jack_o_lantern shell spider_web earth_americas earth_africa earth_asia full_moon waning_gibbous_moon last_quarter_moon waning_crescent_moon new_moon waxing_crescent_moon first_quarter_moon waxing_gibbous_moon new_moon_with_face full_moon_with_face first_quarter_moon_with_face last_quarter_moon_with_face sun_with_face crescent_moon star star2 dizzy sparkles comet sunny white_sun_small_cloud partly_sunny white_sun_cloud white_sun_rain_cloud cloud cloud_rain thunder_cloud_rain cloud_lightning zap fire boom snowflake cloud_snow snowman2 snowman wind_blowing_face dash cloud_tornado fog umbrella2 umbrella droplet sweat_drops ocean"
            },
            food_drink: {
                icon: "pizza",
                title: "Food & Drink",
                emoji: "green_apple apple pear tangerine lemon banana watermelon grapes strawberry melon cherries peach pineapple tomato eggplant hot_pepper corn sweet_potato honey_pot bread cheese poultry_leg meat_on_bone fried_shrimp egg hamburger fries hotdog pizza spaghetti taco burrito ramen stew fish_cake sushi bento curry rice_ball rice rice_cracker oden dango shaved_ice ice_cream icecream cake birthday custard candy lollipop chocolate_bar popcorn doughnut cookie beer beers wine_glass cocktail tropical_drink champagne sake tea coffee baby_bottle fork_and_knife fork_knife_plate"
            },
            activity: {
                icon: "basketball",
                title: "Activity",
                emoji: "soccer basketball football baseball tennis volleyball rugby_football 8ball golf golfer ping_pong badminton hockey field_hockey cricket ski skier snowboarder ice_skate bow_and_arrow fishing_pole_and_fish rowboat swimmer surfer bath basketball_player lifter bicyclist mountain_bicyclist horse_racing levitate trophy running_shirt_with_sash medal military_medal reminder_ribbon rosette ticket tickets performing_arts art circus_tent microphone headphones musical_score musical_keyboard saxophone trumpet guitar violin clapper video_game space_invader dart game_die slot_machine bowling"
            },
            travel_places: {
                icon: "rocket",
                title: "Travel & Places",
                emoji: "red_car taxi blue_car bus trolleybus race_car police_car ambulance fire_engine minibus truck articulated_lorry tractor motorcycle bike rotating_light oncoming_police_car oncoming_bus oncoming_automobile oncoming_taxi aerial_tramway mountain_cableway suspension_railway railway_car train monorail bullettrain_side bullettrain_front light_rail mountain_railway steam_locomotive train2 metro tram station helicopter airplane_small airplane airplane_departure airplane_arriving sailboat motorboat speedboat ferry cruise_ship rocket satellite_orbital seat anchor construction fuelpump busstop vertical_traffic_light traffic_light checkered_flag ship ferris_wheel roller_coaster carousel_horse construction_site foggy tokyo_tower factory fountain rice_scene mountain mountain_snow mount_fuji volcano japan camping tent park motorway railway_track sunrise sunrise_over_mountains desert beach island city_sunset city_dusk cityscape night_with_stars bridge_at_night milky_way stars sparkler fireworks rainbow homes european_castle japanese_castle stadium statue_of_liberty house house_with_garden house_abandoned office department_store post_office european_post_office hospital bank hotel convenience_store school love_hotel wedding classical_building church mosque synagogue kaaba shinto_shrine"
            },
            objects: {
                icon: "bulb",
                title: "Objects",
                emoji: "watch iphone calling computer keyboard desktop printer mouse_three_button trackball joystick compression minidisc floppy_disk cd dvd vhs camera camera_with_flash video_camera movie_camera projector film_frames telephone_receiver telephone pager fax tv radio microphone2 level_slider control_knobs stopwatch timer alarm_clock clock hourglass_flowing_sand hourglass satellite battery electric_plug bulb flashlight candle wastebasket oil money_with_wings dollar yen euro pound moneybag credit_card gem scales wrench hammer hammer_pick tools pick nut_and_bolt gear chains gun bomb knife dagger crossed_swords shield smoking skull_crossbones coffin urn amphora crystal_ball prayer_beads barber alembic telescope microscope hole pill syringe thermometer label bookmark toilet shower bathtub key key2 couch sleeping_accommodation bed door bellhop frame_photo map beach_umbrella moyai shopping_bags balloon flags ribbon gift confetti_ball tada dolls wind_chime crossed_flags izakaya_lantern envelope envelope_with_arrow incoming_envelope e-mail love_letter postbox mailbox_closed mailbox mailbox_with_mail mailbox_with_no_mail package postal_horn inbox_tray outbox_tray scroll page_with_curl bookmark_tabs bar_chart chart_with_upwards_trend chart_with_downwards_trend page_facing_up date calendar calendar_spiral card_index card_box ballot_box file_cabinet clipboard notepad_spiral file_folder open_file_folder dividers newspaper2 newspaper notebook closed_book green_book blue_book orange_book notebook_with_decorative_cover ledger books book link paperclip paperclips scissors triangular_ruler straight_ruler pushpin round_pushpin triangular_flag_on_post flag_white flag_black closed_lock_with_key lock unlock lock_with_ink_pen pen_ballpoint pen_fountain black_nib pencil pencil2 crayon paintbrush mag mag_right"
            },
            symbols: {
                icon: "heartpulse",
                title: "Symbols",
                emoji: "heart yellow_heart green_heart blue_heart purple_heart broken_heart heart_exclamation two_hearts revolving_hearts heartbeat heartpulse sparkling_heart cupid gift_heart heart_decoration peace cross star_and_crescent om_symbol wheel_of_dharma star_of_david six_pointed_star menorah yin_yang orthodox_cross place_of_worship ophiuchus aries taurus gemini cancer leo virgo libra scorpius sagittarius capricorn aquarius pisces id atom u7a7a u5272 radioactive biohazard mobile_phone_off vibration_mode u6709 u7121 u7533 u55b6 u6708 eight_pointed_black_star vs accept white_flower ideograph_advantage secret congratulations u5408 u6e80 u7981 a b ab cl o2 sos no_entry name_badge no_entry_sign x o anger hotsprings no_pedestrians do_not_litter no_bicycles non-potable_water underage no_mobile_phones exclamation grey_exclamation question grey_question bangbang interrobang 100 low_brightness high_brightness trident fleur-de-lis part_alternation_mark warning children_crossing beginner recycle u6307 chart sparkle eight_spoked_asterisk negative_squared_cross_mark white_check_mark diamond_shape_with_a_dot_inside cyclone loop globe_with_meridians m atm sa passport_control customs baggage_claim left_luggage wheelchair no_smoking wc parking potable_water mens womens baby_symbol restroom put_litter_in_its_place cinema signal_strength koko ng ok up cool new free zero one two three four five six seven eight nine ten 1234 arrow_forward pause_button play_pause stop_button record_button track_next track_previous fast_forward rewind twisted_rightwards_arrows repeat repeat_one arrow_backward arrow_up_small arrow_down_small arrow_double_up arrow_double_down arrow_right arrow_left arrow_up arrow_down arrow_upper_right arrow_lower_right arrow_lower_left arrow_upper_left arrow_up_down left_right_arrow arrows_counterclockwise arrow_right_hook leftwards_arrow_with_hook arrow_heading_up arrow_heading_down hash asterisk information_source abc abcd capital_abcd symbols musical_note notes wavy_dash curly_loop heavy_check_mark arrows_clockwise heavy_plus_sign heavy_minus_sign heavy_division_sign heavy_multiplication_x heavy_dollar_sign currency_exchange copyright registered tm end back on top soon ballot_box_with_check radio_button white_circle black_circle red_circle large_blue_circle small_orange_diamond small_blue_diamond large_orange_diamond large_blue_diamond small_red_triangle black_small_square white_small_square black_large_square white_large_square small_red_triangle_down black_medium_square white_medium_square black_medium_small_square white_medium_small_square black_square_button white_square_button speaker sound loud_sound mute mega loudspeaker bell no_bell black_joker mahjong spades clubs hearts diamonds flower_playing_cards thought_balloon anger_right speech_balloon clock1 clock2 clock3 clock4 clock5 clock6 clock7 clock8 clock9 clock10 clock11 clock12 clock130 clock230 clock330 clock430 clock530 clock630 clock730 clock830 clock930 clock1030 clock1130 clock1230 eye_in_speech_bubble"
            },
            flags: {
                icon: "flag_gb",
                title: "Flags",
                emoji: "ac af al dz ad ao ai ag ar am aw au at az bs bh bd bb by be bz bj bm bt bo ba bw br bn bg bf bi cv kh cm ca ky cf td flag_cl cn co km cg flag_cd cr hr cu cy cz dk dj dm do ec eg sv gq er ee et fk fo fj fi fr pf ga gm ge de gh gi gr gl gd gu gt gn gw gy ht hn hk hu is in flag_id ir iq ie il it ci jm jp je jo kz ke ki xk kw kg la lv lb ls lr ly li lt lu mo mk mg mw my mv ml mt mh mr mu mx fm md mc mn me ms ma mz mm na nr np nl nc nz ni ne flag_ng nu kp no om pk pw ps pa pg py pe ph pl pt pr qa ro ru rw sh kn lc vc ws sm st flag_sa sn rs sc sl sg sk si sb so za kr es lk sd sr sz se ch sy tw tj tz th tl tg to tt tn tr flag_tm flag_tm ug ua ae gb us vi uy uz vu va ve vn wf eh ye zm zw re ax ta io bq cx cc gg im yt nf pn bl pm gs tk bv hm sj um ic ea cp dg as aq vg ck cw eu gf tf gp mq mp sx ss tc "
            }
        }, a
    }

    function aj(a) {
        var g = ak();
        if (a && a.filters) {
            var f = g.filters;
            aG.each(a.filters, function (d, h) {
                return !an(h) || aG.isEmptyObject(h) ? void delete f[d] : void aG.each(h, function (b, i) {
                    f[d][b] = i
                })
            }), a.filters = f
        }
        return aG.extend({}, g, a)
    }

    var ai, ah;
    window.getSelection && document.createRange ? (ai = function (d) {
        var c = window.getSelection && window.getSelection();
        if (c && c.rangeCount > 0) {
            return c.getRangeAt(0)
        }
    }, ah = function (f, d) {
        var g = document.createRange();
        g.setStart(d.startContainer, d.startOffset), g.setEnd(d.endContainer, d.endOffset), d = window.getSelection(), d.removeAllRanges(), d.addRange(g)
    }) : document.selection && document.body.createTextRange && (ai = function (b) {
        return document.selection.createRange()
    }, ah = function (f, d) {
        var g = document.body.createTextRange();
        g.moveToElementText(f), g.setStart(d.startContanier, d.startOffset), g.setEnd(d.endContainer, d.endOffset), g.select()
    });
    var ag;

    function af(d, c) {
        return d.replace(ag, function (b) {
            var f = aC[0 === aw ? "jsecapeMap" : "jsEscapeMap"];
            return "undefined" != typeof b && b in f ? ar(c, f[b]) : b
        })
    }

    function ae(d, c) {
        return d = d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/`/g, "&#x60;").replace(/(?:\r\n|\r|\n)/g, "\n").replace(/(\n+)/g, "<div>$1</div>").replace(/\n/g, "<br/>").replace(/<br\/><\/div>/g, "</div>"), c.shortnames && (d = aC.shortnameToUnicode(d)), af(d, c.emojiTemplate).replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/  /g, "&nbsp;&nbsp;")
    }

    function ad(d, c) {
        switch (d = d.replace(/&#10;/g, "\n").replace(/&#09;/g, "\t").replace(/<img[^>]*alt="([^"]+)"[^>]*>/gi, "$1").replace(/\n|\r/g, "").replace(/<br[^>]*>/gi, "\n").replace(/(?:<(?:div|p|ol|ul|li|pre|code|object)[^>]*>)+/gi, "<div>").replace(/(?:<\/(?:div|p|ol|ul|li|pre|code|object)>)+/gi, "</div>").replace(/\n<div><\/div>/gi, "\n").replace(/<div><\/div>\n/gi, "\n").replace(/(?:<div>)+<\/div>/gi, "\n").replace(/([^\n])<\/div><div>/gi, "$1\n").replace(/(?:<\/div>)+/gi, "</div>").replace(/([^\n])<\/div>([^\n])/gi, "$1\n$2").replace(/<\/div>/gi, "").replace(/([^\n])<div>/gi, "$1\n").replace(/\n<div>/gi, "\n").replace(/<div>\n/gi, "\n\n").replace(/<(?:[^>]+)?>/g, "").replace(new RegExp(av, "g"), "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x60;/g, "`").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&amp;/g, "&"), c.saveEmojisAs) {
            case"image":
                d = af(d, c.emojiTemplate);
                break;
            case"shortname":
                d = aC.toShort(d)
        }
        return d
    }

    function ac() {
        var f = this, d = f.editor[0].offsetWidth - f.editor[0].clientWidth, g = parseInt(f.button.css("marginRight"));
        g !== d && (f.button.css({marginRight: d}), f.floatingPicker && f.picker.css({right: parseInt(f.picker.css("right")) - g + d}))
    }

    function ab() {
        var a = this;
        if (!a.sprite && a.lasyEmoji[0] && a.lasyEmoji.eq(0).is(".lazy-emoji")) {
            var g = a.picker.offset().top, f = g + a.picker.height() + 20;
            a.lasyEmoji.each(function () {
                var c = aG(this), d = c.offset().top;
                if (d > g && d < f && c.attr("src", c.data("src")).removeClass("lazy-emoji"), d > f) {
                    return !1
                }
            }), a.lasyEmoji = a.lasyEmoji.filter(".lazy-emoji")
        }
    }

    function aa(d, c) {
        return (c ? "" : ".") + ax + (d ? "-" + d : "")
    }

    function Z(a) {
        var d = aG("<div/>", an(a) ? a : {"class": aa(a, !0)});
        return aG.each(ay.call(arguments).slice(1), function (c, f) {
            aG.isFunction(f) && (f = f.call(d)), f && aG(f).appendTo(d)
        }), d
    }

    function Y() {
        return localStorage.getItem("recent_emojis") || ""
    }

    function X(a, q) {
        var p = Y();
        if (!a.recent || a.recent !== p || q) {
            if (p.length) {
                var o = a.scrollArea.is(".skinnable"), n, m;
                o || (n = a.scrollArea.scrollTop(), q && a.recentCategory.show(), m = a.recentCategory.is(":visible") ? a.recentCategory.height() : 0);
                var k = aq(p, a.emojiBtnTemplate, !0).split("|").join("");
                if (a.recentCategory.children(".emojibtn").remove(), aG(k).insertAfter(a.recentCategory.children(".emojionearea-category-title")), a.recentCategory.children(".emojibtn").on("click", function () {
                    a.trigger("emojibtn.click", aG(this))
                }), a.recentFilter.show(), !o) {
                    a.recentCategory.show();
                    var j = a.recentCategory.height();
                    m !== j && a.scrollArea.scrollTop(n + j - m)
                }
            } else {
                a.recentFilter.hasClass("active") && a.recentFilter.removeClass("active").next().addClass("active"), a.recentCategory.hide(), a.recentFilter.hide()
            }
            a.recent = p
        }
    }

    function W(g, f) {
        var j = Y(), i = j.split("|"), h = i.indexOf(f);
        h !== -1 && i.splice(h, 1), i.unshift(f), i.length > 9 && i.pop(), localStorage.setItem("recent_emojis", i.join("|")), X(g)
    }

    function V() {
        var d = "test";
        try {
            return localStorage.setItem(d, d), localStorage.removeItem(d), !0
        } catch (c) {
            return !1
        }
    }

    function U(aH, K, J) {
        aH.options = J = aj(J), aH.sprite = J.sprite && aw < 3, aH.inline = null === J.inline ? K.is("INPUT") : J.inline, aH.shortnames = J.shortnames, aH.saveEmojisAs = J.saveEmojisAs, aH.standalone = J.standalone, aH.emojiTemplate = '<img alt="{alt}" class="emojione' + (aH.sprite ? '-{uni}" src="' + az + '"/>' : 'emoji" src="{img}"/>'), aH.emojiTemplateAlt = aH.sprite ? '<i class="emojione-{uni}"/>' : '<img class="emojioneemoji" src="{img}"/>', aH.emojiBtnTemplate = '<i class="emojibtn" role="button" data-name="{name}" title="{friendlyName}">' + aH.emojiTemplateAlt + "</i>", aH.recentEmojis = J.recentEmojis && V();
        var I = J.pickerPosition;
        aH.floatingPicker = "top" === I || "bottom" === I, aH.source = K, (K.is(":disabled") || K.is(".disabled")) && aH.disable();
        var H = K.is("TEXTAREA") || K.is("INPUT") ? "val" : "text", G, F, D, C, B, y, w, E, s, q,
            p = Z("tones", J.tones ? function () {
                this.addClass(aa("tones-" + J.tonesStyle, !0));
                for (var c = 0; c <= 5; c++) {
                    this.append(aG("<i/>", {
                        "class": "btn-tone btn-tone-" + c + (c ? "" : " active"),
                        "data-skin": c,
                        role: "button"
                    }))
                }
            } : null), n = Z({
                "class": ax + (aH.standalone ? " " + ax + "-standalone " : " ") + (K.attr("class") || ""),
                role: "application"
            }, G = aH.editor = Z("editor").attr({
                contenteditable: !aH.standalone,
                placeholder: J.placeholder || K.data("placeholder") || K.attr("placeholder") || "",
                tabindex: 0
            }), F = aH.button = Z("button", Z("button-open"), Z("button-close")).attr("title", J.buttonTitle), D = aH.picker = Z("picker", Z("wrapper", C = Z("filters"), J.search ? y = Z("search-panel", Z("search", J.search ? function () {
                aH.search = aG("<input/>", {
                    placeholder: J.searchPlaceholder || "",
                    type: "text",
                    "class": "search"
                }), this.append(aH.search)
            } : null), p) : null, q = Z("scroll-area", J.tones && !J.search ? Z("tones-panel", p) : null, w = Z("emojis-list")))).addClass(aa("picker-position-" + J.pickerPosition, !0)).addClass(aa("filters-position-" + J.filtersPosition, !0)).addClass(aa("search-position-" + J.searchPosition, !0)).addClass("hidden"));
        J.search && y.addClass(aa("with-search", !0)), aH.searchSel = null, G.data(K.data()), aG.each(J.attributes, function (d, c) {
            G.attr(d, c)
        });
        var m = Z("category-block").attr({"data-tone": 0}).prependTo(w);
        if (aG.each(J.filters, function (r, o) {
            var i = 0;
            if ("recent" !== r || aH.recentEmojis) {
                if ("tones" !== r) {
                    aG("<i/>", {
                        "class": aa("filter", !0) + " " + aa("filter-" + r, !0),
                        "data-filter": r,
                        title: o.title
                    }).wrapInner(aq(o.icon, aH.emojiTemplateAlt)).appendTo(C)
                } else {
                    if (!J.tones) {
                        return
                    }
                    i = 5
                }
                do {
                    var d, b = o.emoji.replace(/[\s,;]+/g, "|");
                    d = 0 === i ? Z("category").attr({
                        name: r,
                        "data-tone": i
                    }).appendTo(m) : Z("category-block").attr({
                        name: r,
                        "data-tone": i
                    }).appendTo(w), i > 0 && (d.hide(), b = b.split("|").join("_tone" + i + "|") + "_tone" + i), "recent" === r && (b = Y()), b = aq(b, aH.sprite ? '<i class="emojibtn" role="button" data-name="{name}" title="{friendlyName}"><i class="emojione-{uni}"></i></i>' : '<i class="emojibtn" role="button" data-name="{name}" title="{friendlyName}"><img class="emojioneemoji lazy-emoji" data-src="{img}"/></i>', !0).split("|").join(""), d.html(b), aG('<div class="emojionearea-category-title"/>').text(o.title).prependTo(d)
                } while (--i > 0)
            }
        }), J.filters = null, aH.sprite || (aH.lasyEmoji = w.find(".lazy-emoji")), B = C.find(aa("filter")), B.eq(0).addClass("active"), s = w.find(aa("category-block")), E = w.find(aa("category")), aH.recentFilter = B.filter('[data-filter="recent"]'), aH.recentCategory = E.filter("[name=recent]"), aH.scrollArea = q, J.container ? aG(J.container).wrapInner(n) : n.insertAfter(K), J.hideSource && K.hide(), aH.setText(K[H]()), K[H](aH.getText()), ac.apply(aH), aH.standalone && !aH.getText().length) {
            var k = aG(K).data("emoji-placeholder") || J.emojiPlaceholder;
            aH.setText(k), G.addClass("has-placeholder")
        }
        at(aH, w.find(".emojibtn"), {click: "emojibtn.click"}), at(aH, window, {resize: "!resize"}), at(aH, p.children(), {click: "tone.click"}), at(aH, [D, F], {mousedown: "!mousedown"}, G), at(aH, F, {click: "button.click"}), at(aH, G, {paste: "!paste"}, G), at(aH, G, ["focus", "blur"], function () {
            return !aH.stayFocused && G
        }), at(aH, D, {
            mousedown: "picker.mousedown",
            mouseup: "picker.mouseup",
            click: "picker.click",
            keyup: "picker.keyup",
            keydown: "picker.keydown",
            keypress: "picker.keypress"
        }), at(aH, G, ["mousedown", "mouseup", "click", "keyup", "keydown", "keypress"]), at(aH, D.find(".emojionearea-filter"), {click: "filter.click"}), at(aH, K, {change: "source.change"}), J.search && at(aH, aH.search, {
            keyup: "search.keypress",
            focus: "search.focus",
            blur: "search.blur"
        });
        var j = !1;
        if (q.on("scroll", function () {
            if (!j && (ab.call(aH), q.is(":not(.skinnable)"))) {
                var g = E.eq(0), f = q.offset().top;
                E.each(function (c, d) {
                    return !(aG(d).offset().top - f >= 10) && void (g = aG(d))
                });
                var b = B.filter('[data-filter="' + g.attr("name") + '"]');
                b[0] && !b.is(".active") && (B.removeClass("active"), b.addClass("active"))
            }
        }), aH.on("@filter.click", function (b) {
            var r = b.is(".active");
            if (q.is(".skinnable")) {
                if (r) {
                    return
                }
                p.children().eq(0).click()
            }
            j = !0, r || (B.filter(".active").removeClass("active"), b.addClass("active"));
            var o = E.filter('[name="' + b.data("filter") + '"]').offset().top, i = q.scrollTop(), g = q.offset().top;
            q.stop().animate({scrollTop: o + i - g - 2}, 200, "swing", function () {
                ab.call(aH), j = !1
            })
        }).on("@picker.show", function () {
            aH.recentEmojis && X(aH), ab.call(aH)
        }).on("@tone.click", function (b) {
            p.children().removeClass("active");
            var d = b.addClass("active").data("skin");
            d ? (q.addClass("skinnable"), s.hide().filter("[data-tone=" + d + "]").show(), B.removeClass("active")) : (q.removeClass("skinnable"), s.hide().filter("[data-tone=0]").show(), B.eq(0).click()), ab.call(aH), J.search && aH.trigger("search.keypress")
        }).on("@button.click", function (b) {
            b.is(".active") ? aH.hidePicker() : (aH.showPicker(), aH.searchSel = null)
        }).on("@!paste", function (z, v) {
            var u = function (O) {
                var N = "caret-" + (new Date).getTime(), M = ae(O, aH);
                ap(M), ap('<i id="' + N + '"></i>'), z.scrollTop(o);
                var L = aG("#" + N), A = L.offset().top - z.offset().top, c = z.height();
                (o + A >= c || o > A) && z.scrollTop(o + A - 2 * c / 3), L.remove(), aH.stayFocused = !1, ac.apply(aH), au(aH, "paste", [z, O, M])
            };
            if (v.originalEvent.clipboardData) {
                var t = v.originalEvent.clipboardData.getData("text/plain");
                return u(t), v.preventDefault ? v.preventDefault() : v.stop(), v.returnValue = !1, v.stopPropagation(), !1
            }
            aH.stayFocused = !0, ap("<span>" + av + "</span>");
            var r = ai(z[0]), o = z.scrollTop(), b = aG("<div/>", {contenteditable: !0}).css({
                position: "fixed",
                left: "-999px",
                width: "1px",
                height: "1px",
                top: "20px",
                overflow: "hidden"
            }).appendTo(aG("BODY")).focus();
            window.setTimeout(function () {
                z.focus(), ah(z[0], r);
                var c = ad(b.html().replace(/\r\n|\n|\r/g, "<br>"), aH);
                b.remove(), u(c)
            }, 200)
        }).on("@emojibtn.click", function (b) {
            G.removeClass("has-placeholder"), null !== aH.searchSel && (G.focus(), ah(G[0], aH.searchSel), aH.searchSel = null), aH.standalone ? (G.html(aq(b.data("name"), aH.emojiTemplate)), aH.trigger("blur")) : (ai(G[0]), ap(aq(b.data("name"), aH.emojiTemplate))), aH.recentEmojis && W(aH, b.data("name")), aH.trigger("search.keypress")
        }).on("@!resize @keyup @emojibtn.click", ac).on("@!mousedown", function (f, b) {
            return aG(b.target).hasClass("search") ? (aH.stayFocused = !0, null === aH.searchSel && (aH.searchSel = ai(f[0]))) : (n.is(".focused") || f.trigger("focus"), b.preventDefault()), !1
        }).on("@change", function () {
            var b = aH.editor.html().replace(/<\/?(?:div|span|p)[^>]*>/gi, "");
            b.length && !/^<br[^>]*>$/i.test(b) || aH.editor.html(aH.content = ""), K[H](aH.getText())
        }).on("@source.change", function () {
            aH.setText(K[H]()), au("change")
        }).on("@focus", function () {
            n.addClass("focused")
        }).on("@blur", function () {
            n.removeClass("focused"), J.hidePickerOnBlur && aH.hidePicker();
            var b = aH.editor.html();
            aH.content !== b ? (aH.content = b, au(aH, "change", [aH.editor]), K.trigger("blur").trigger("change")) : K.trigger("blur"), J.search && (aH.search.val(""), aH.trigger("search.keypress", !0))
        }), J.search && aH.on("@search.focus", function () {
            aH.stayFocused = !0, aH.search.addClass("focused")
        }).on("@search.keypress", function (o) {
            var i = D.find(".emojionearea-filter"), d = J.tones ? p.find("i.active").data("skin") : 0,
                b = aH.search.val().replace(/ /g, "_").replace(/"/g, '\\"');
            b && b.length ? (aH.recentFilter.hasClass("active") && aH.recentFilter.removeClass("active").next().addClass("active"), aH.recentCategory.hide(), aH.recentFilter.hide(), s.each(function () {
                var f = function (t, r) {
                    var v = t.find('.emojibtn[data-name*="' + b + '"]');
                    if (0 === v.length) {
                        t.data("tone") === r && t.hide(), i.filter('[data-filter="' + t.attr("name") + '"]').hide()
                    } else {
                        var u = t.find('.emojibtn:not([data-name*="' + b + '"])');
                        u.hide(), v.show(), t.data("tone") === r && t.show(), i.filter('[data-filter="' + t.attr("name") + '"]').show()
                    }
                }, g = aG(this);
                0 === g.data("tone") ? E.filter(':not([name="recent"])').each(function () {
                    f(aG(this), 0)
                }) : f(g, d)
            }), j ? ab.call(aH) : q.trigger("scroll")) : (X(aH, !0), s.filter('[data-tone="' + p.find("i.active").data("skin") + '"]:not([name="recent"])').show(), aG(".emojibtn", s).show(), i.show(), ab.call(aH))
        }).on("@search.blur", function () {
            aH.stayFocused = !1, aH.search.removeClass("focused"), aH.trigger("blur")
        }), J.shortcuts && aH.on("@keydown", function (b, d) {
            d.ctrlKey || (9 == d.which ? (d.preventDefault(), F.click()) : 27 == d.which && (d.preventDefault(), F.is(".active") && aH.hidePicker()))
        }), an(J.events) && !aG.isEmptyObject(J.events) && aG.each(J.events, function (b, d) {
            aH.on(b.replace(/_/g, "."), d)
        }), J.autocomplete) {
            var h = function () {
                var d = {maxCount: J.textcomplete.maxCount, placement: J.textcomplete.placement};
                J.shortcuts && (d.onKeydown = function (f, c) {
                    if (!f.ctrlKey && 13 == f.which) {
                        return c.KEY_ENTER
                    }
                });
                var b = aG.map(aC.emojioneList, function (f, c) {
                    return J.autocompleteTones ? c : /_tone[12345]/.test(c) ? null : c
                });
                b.sort(), G.textcomplete([{
                    id: ax, match: /\B(:[\-+\w]*)$/, search: function (f, g) {
                        g(aG.map(b, function (c) {
                            return 0 === c.indexOf(f) ? c : null
                        }))
                    }, template: function (c) {
                        return aq(c, aH.emojiTemplate) + " " + c.replace(/:/g, "")
                    }, replace: function (c) {
                        return aq(c, aH.emojiTemplate)
                    }, cache: !0, index: 1
                }], d), J.textcomplete.placement && "static" == aG(G.data("textComplete").option.appendTo).css("position") && aG(G.data("textComplete").option.appendTo).css("position", "relative")
            }, a = function () {
                if (aH.disabled) {
                    var b = function () {
                        aH.off("enabled", b), h()
                    };
                    aH.on("enabled", b)
                } else {
                    h()
                }
            };
            aG.fn.textcomplete ? a() : aG.ajax({
                url: "https://cdn.rawgit.com/yuku-t/jquery-textcomplete/v1.3.4/dist/jquery.textcomplete.js",
                dataType: "script",
                cache: !0,
                success: a
            })
        }
        aH.inline && (n.addClass(aa("inline", !0)), aH.on("@keydown", function (d, c) {
            13 == c.which && c.preventDefault()
        })), /firefox/i.test(navigator.userAgent) && document.execCommand("enableObjectResizing", !1, !1), aH.isReady = !0, aH.trigger("onLoad", G), aH.trigger("ready", G)
    }

    var T = {
        defaultBase: "https://cdnjs.cloudflare.com/ajax/libs/emojione/",
        defaultBase3: "https://cdn.jsdelivr.net/",
        base: null,
        isLoading: !1
    };

    function S(a) {
        var g = ao();
        if (a = aj(a), !T.isLoading) {
            if (!aC || al(am(aC)) < 2) {
                T.isLoading = !0;
                var f;
                f = al(g) > 5 ? T.defaultBase3 + "npm/emojione@" + g : al(g) > 4 ? T.defaultBase3 + "emojione/" + g : T.defaultBase + "/" + g, aG.ajax({
                    url: f + "/lib/js/emojione.min.js",
                    dataType: "script",
                    cache: !0,
                    success: function () {
                        aC = window.emojione, g = am(aC), aw = al(g);
                        var b;
                        aw > 4 ? (T.base = T.defaultBase3 + "emojione/assets/" + g, b = T.base + "/sprites/emojione-sprite-" + aC.emojiSize + ".css") : (T.base = T.defaultBase + g + "/assets", b = T.base + "/sprites/emojione.sprites.css"), a.sprite && (document.createStyleSheet ? document.createStyleSheet(b) : aG("<link/>", {
                            rel: "stylesheet",
                            href: b
                        }).appendTo("head"));
                        while (aB.length) {
                            aB.shift().call()
                        }
                        T.isLoading = !1
                    }
                })
            } else {
                g = am(aC), aw = al(g), aw > 4 ? T.base = T.defaultBase3 + "emojione/assets/" + g : T.base = T.defaultBase + g + "/assets"
            }
        }
        aA(function () {
            var b = "";
            a.useInternalCDN && (aw > 4 && (b = aC.emojiSize + "/"), aC.imagePathPNG = T.base + "/png/" + b, aC.imagePathSVG = T.base + "/svg/" + b, aC.imagePathSVGSprites = T.base + "/sprites/emojione.sprites.svg", aC.imageType = a.imageType), al(g) > 4 ? (ag = aC.regUnicode, aC.imageType = a.imageType || "png") : ag = new RegExp("<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(" + aC.unicodeRegexp + ")", "gi")
        })
    }

    var R = function (b, d) {
        var c = this;
        S(d), aE[c.id = ++aF] = {}, aD[c.id] = {}, aA(function () {
            U(c, b, d)
        })
    };

    function Q(a, f) {
        f = f.replace(/^@/, "");
        var d = a.id;
        aD[d][f] && (aG.each(aD[d][f], function (c, b) {
            aG.each(aG.isArray(b[0]) ? b[0] : [b[0]], function (h, g) {
                aG(g).on(b[1], function () {
                    var j = ay.call(arguments), i = aG.isFunction(b[2]) ? b[2].apply(a, [f].concat(j)) : b[2];
                    i && au(a, f, [i].concat(j))
                })
            })
        }), aD[d][f] = null)
    }

    R.prototype.on = function (a, f) {
        if (a && aG.isFunction(f)) {
            var c = this;
            aG.each(a.toLowerCase().split(" "), function (g, d) {
                Q(c, d), (aE[c.id][d] || (aE[c.id][d] = [])).push(f)
            })
        }
        return this
    }, R.prototype.off = function (a, f) {
        if (a) {
            var c = this.id;
            aG.each(a.toLowerCase().replace(/_/g, ".").split(" "), function (d, g) {
                aE[c][g] && !/^@/.test(g) && (f ? aG.each(aE[c][g], function (i, h) {
                    h === f && (aE[c][g] = aE[c][g].splice(i, 1))
                }) : aE[c][g] = [])
            })
        }
        return this
    }, R.prototype.trigger = function () {
        var d = ay.call(arguments), c = [this].concat(d.slice(0, 1));
        return c.push(d.slice(1)), au.apply(this, c)
    }, R.prototype.setFocus = function () {
        var b = this;
        return aA(function () {
            b.editor.focus()
        }), b
    }, R.prototype.setText = function (d) {
        var c = this;
        return aA(function () {
            c.editor.html(ae(d, c)), c.content = c.editor.html(), au(c, "change", [c.editor]), ac.apply(c)
        }), c
    }, R.prototype.getText = function () {
        return ad(this.editor.html(), this)
    }, R.prototype.showPicker = function () {
        var b = this;
        return b._sh_timer && window.clearTimeout(b._sh_timer), b.picker.removeClass("hidden"), b._sh_timer = window.setTimeout(function () {
            b.button.addClass("active")
        }, 50), au(b, "picker.show", [b.picker]), b
    }, R.prototype.hidePicker = function () {
        var b = this;
        return b._sh_timer && window.clearTimeout(b._sh_timer), b.button.removeClass("active"), b._sh_timer = window.setTimeout(function () {
            b.picker.addClass("hidden")
        }, 500), au(b, "picker.hide", [b.picker]), b
    }, R.prototype.enable = function () {
        var d = this, c = function () {
            d.disabled = !1, d.editor.prop("contenteditable", !0), d.button.show();
            var a = d[d.standalone ? "button" : "editor"];
            a.parent().removeClass("emojionearea-disable"), au(d, "enabled", [a])
        };
        return d.isReady ? c() : d.on("ready", c), d
    }, R.prototype.disable = function () {
        var d = this;
        d.disabled = !0;
        var c = function () {
            d.editor.prop("contenteditable", !1), d.hidePicker(), d.button.hide();
            var a = d[d.standalone ? "button" : "editor"];
            a.parent().addClass("emojionearea-disable"), au(d, "disabled", [a])
        };
        return d.isReady ? c() : d.on("ready", c), d
    }, aG.fn.emojioneArea = function (a) {
        return this.each(function () {
            return this.emojioneArea ? this.emojioneArea : (aG.data(this, "emojioneArea", this.emojioneArea = new R(aG(this), a)), this.emojioneArea)
        })
    }, aG.fn.emojioneArea.defaults = ak(), aG.fn.emojioneAreaText = function (a) {
        a = aj(a);
        var g = this, f = {
            shortnames: !a || "undefined" == typeof a.shortnames || a.shortnames,
            emojiTemplate: '<img alt="{alt}" class="emojione' + (a && a.sprite && aw < 3 ? '-{uni}" src="' + az : 'emoji" src="{img}') + '"/>'
        };
        return S(a), aA(function () {
            g.each(function () {
                var c = aG(this);
                return c.hasClass("emojionearea-text") || c.addClass("emojionearea-text").html(ae(c.is("TEXTAREA") || c.is("INPUT") ? c.val() : c.text(), f)), c
            })
        }), this
    }
}, window);
jQuery(function () {
    var w = "https://help.sender.net/wp-json/wp/v2/";
    var h = $(".help_tag_input").val();
    var u = $(".sh_container");
    var f = ".sender_help_open";
    var k = ".sender_help_close";
    var s = $(".sender_help_articles");
    var a = $(".sender_help_loading");
    var o = $(".sh_button");
    var i = $(".sh_popover");
    var t;
    var d = $(window).width();
    if ($.debounce) {
        $(".sh_search").on("keyup paste", $.debounce(500, function (y) {
            clearTimeout($.data(this, "timer"));
            if (y.keyCode == 13) {
                n(true)
            } else {
                $(".sh_no_results").fadeOut();
                $(this).data("timer", setTimeout(n, 250))
            }
        }))
    }

    function n(z) {
        var y = $(".sh_search").val();
        if (!z && y.length <= 1) {
            s.html("");
            b()
        }
        if (!z && y.length < 2) {
            return
        }
        $.ajax({
            type: "GET", dataType: "json", url: w + "st_kb?search=" + y, beforeSend: c(), success: function (A) {
                s.html("");
                if (A.length < 1) {
                    $(".sh_no_results").fadeIn();
                    q()
                } else {
                    v(A)
                }
            }, error: function (A) {
                q();
                $(".sh_empty").fadeIn()
            }
        })
    }

    $(f).on("click", function (y) {
        y.preventDefault();
        p()
    });
    $(k).on("click", function (y) {
        m()
    });
    o.on("click", function (y) {
        m()
    });
    i.on("click", function (y) {
        m()
    });
    $(".sh_button_i").on("click", function (y) {
        m()
    });
    $(".sh_popover_i").on("click", function (y) {
        m()
    });

    function c() {
        s.html("");
        $(".sh_empty").hide();
        a.show()
    }

    function q() {
        a.hide()
    }

    function j(B, A) {
        for (var y in B) {
            var z = B[y];
            if (typeof z === "object") {
                j(z, A)
            }
            if (z === A) {
                return B
            }
        }
        return false
    }

    function p() {
        mixpanel.track("help_sidebar_opened");
        u.toggle("slide", {duration: 150, direction: "right"}, function (y) {
            b()
        })
    }

    function m() {
        swal.close();
        u.toggle("slide", {duration: 100, direction: "right"}, function () {
            $(".sh_search").val("");
            $(".sh_no_results").hide();
            s.empty()
        })
    }

    function r(y) {
        if (h === undefined) {
            return
        }
        $.ajax({
            type: "GET", dataType: "json", url: w + "st_kb?kb-tag=" + y, beforeSend: c(), success: function (z) {
                v(z)
            }, error: function (z) {
                q()
            }
        })
    }

    function g(y) {
        $.ajax({
            type: "GET", dataType: "json", url: w + "st_kb/" + y, success: function (z) {
                return z
            }, error: function (z) {
            }
        })
    }

    function b() {
        $.ajax({
            type: "GET", dataType: "json", url: w + "kb-tag?per_page=100", beforeSend: c(), success: function (z) {
                for (var A = 0; A < z.length; A++) {
                    var y = j(z[A], h);
                    if (y) {
                        r(y.id);
                        return
                    }
                }
                q();
                $(".sh_empty").fadeIn()
            }, error: function (y) {
                q()
            }
        })
    }

    function v(A) {
        t = A;
        s.html("");
        for (var y = 0; y < A.length; y++) {
            var z = $('script[data-template="sh_listitem"]').text().replace("{link}", "#").replace("{article}", y).replace("{title}", A[y].title.rendered);
            s.append(z)
        }
        $(".sh_articles_container").fadeIn();
        $(".sh_item").on("click", function (C) {
            C.preventDefault();
            var E = t[$(C.currentTarget).data().article];
            $(".sender_help_articles").find(".sh_item.sh_item_focus").removeClass("sh_item_focus");
            $(C.currentTarget).addClass("sh_item_focus");
            var B = "sh_modal";
            if (d < 500) {
                m()
            }
            var D = $('script[data-template="sh_modalbody"]').text().replace("{link}", E.link).replace("{title}", E.title.rendered).replace("{content}", E.content.rendered.replace("iframe", 'iframe style="width: -webkit-fill-available !important; height:50vh !important;"'));
            mixpanel.track("help_post_viewed", {help_post_title: E.title.rendered, view: "sidebar"});
            g(E.id);
            swal.fire({
                width: "100%",
                padding: 0,
                title: '<div class="sh_no_marging"></div>',
                html: D,
                animation: false,
                backdrop: false,
                grow: "fullscreen",
                customClass: "animated sh_modal",
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: false
            });
            $(".sender_help_close_modal").on("click", function (F) {
                swal.close();
                $(".sender_help_articles").find(".sh_item.sh_item_focus").removeClass("sh_item_focus")
            })
        });
        q()
    }
});
(function (f) {
    var g = false;
    var o = "fast";
    var c = 0;
    var a = 0;
    var d = false;
    f.fn.drawTree = function (p) {
        h(p[0], f(this))
    };

    function m(u, r, q) {
        var t = false;
        var s = q.find(">div");
        var p = r.parent().find(">div");
        if (u.type === "TRIGGER") {
            s.hover(function () {
                f(this).addClass("wf-current-step")
            }, function () {
                f(this).removeClass("wf-current-step")
            });
            s.append('<hr class="m-b-0">');
            t = true;
            s.append('<span class="p-t-10" style="font-size: 14px;" class="p-r-15"><i class="zmdi zmdi-chart"></i> ' + workflowSummary + "</span>")
        }
        if (u.email_sent && u.email_sent > 0) {
            s.hover(function () {
                f(this).addClass("wf-current-step")
            }, function () {
                f(this).removeClass("wf-current-step")
            });
            s.append('<hr class="m-b-0">');
            t = true;
            s.append('<span class="p-t-10" style="font-size: 14px;" class="p-r-15"><i class="zmdi zmdi-email"></i> <b>' + u.email_sent + "</b> " + emailsSent + "</span>")
        }
        if (u.recipients_waiting && p.hasClass("wf-step-DELAY")) {
            p.hover(function () {
                f(this).addClass("wf-current-step")
            }, function () {
                f(this).removeClass("wf-current-step")
            });
            if (!p.hasClass("step-div")) {
                p.parent().parent().parent().find(">div").append('<hr class="m-b-0">');
                p.parent().parent().parent().find(">div").append('<span class="p-t-10" style="font-size: 14px;"><i class="zmdi zmdi-account"></i> <b>' + u.recipients_waiting + "</b> " + subscribersWaiting + "</span>")
            } else {
                p.append('<hr class="m-b-0">');
                p.append('<span class="p-t-10" style="font-size: 14px;"><i class="zmdi zmdi-account"></i> <b>' + u.recipients_waiting + "</b> " + subscribersWaiting + "</span>")
            }
        }
    }

    function h(t, s) {
        g = false;
        var p = t.type;
        var r = f(stepTemplates[p].replace("{nodeText}", j(t)));
        if (workflowStatus === "ACTIVE") {
            m(t, s, r)
        }
        r.find(">div").css({
            transition: "none",
            opacity: 0,
            "margin-top": "-" + (r.find(">div").height() + 90) + "px"
        }).animate({opacity: 1, "margin-top": "0px", transition: "all .3s linear"}, 500, function () {
        });
        r.appendTo(s);
        r.attr("id", "wf-step-" + t.id);
        r.data("step-type", p);
        r.find(">div").addClass("wf-step-" + p);
        if (!t.complete) {
            r.find(">div").addClass("wf-step-incomplete")
        }
        if (p == "EMAIL") {
            r.data("email-title", t.title)
        }
        if (typeof t.thumbnail !== "undefined") {
            r.find("> div > .wf-node-thumbnail img").attr("src", t.thumbnail)
        }
        if (p == "CONDITION") {
            if (t.condition_definition && t.condition_definition !== "null") {
                var q = JSON.parse(t.condition_definition).conditions[0].step_id;
                if (q) {
                    r.data("wf-email-id", JSON.parse(t.condition_definition).conditions[0].step_id)
                }
            }
            r.data("step-id", t.id);
            r.find("> ul > .sender-wf-condition-yes").data("step-id", t.id).data("condition-path", "TRUE");
            r.find("> ul > .sender-wf-condition-no").data("step-id", t.id).data("condition-path", "FALSE");
            if (typeof t.children !== "undefined") {
                f.each(t.children, function (v, u) {
                    if (u.condition_path == "TRUE") {
                        h(u, r.find("> ul > .sender-wf-condition-yes > ul"))
                    } else {
                        h(u, r.find("> ul > .sender-wf-condition-no > ul"))
                    }
                })
            }
        } else {
            r.data("step-id", t.id).data("condition-path", "TRUE");
            if (typeof t.children !== "undefined") {
                f.each(t.children, function (v, u) {
                    h(u, r.children("ul"))
                })
            } else {
                if (t.type === "TRIGGER") {
                    g = t.id
                }
            }
        }
        return r
    }

    function n() {
        var p = f(".overflow");
        p.css("width", "10000px");
        var q = f(".wf_builder > li").width();
        p.css("width", (q + 20) + "px")
    }

    function j(s) {
        var q = "";
        switch (s.type) {
            case"TRIGGER":
                if (s.title) {
                    q = s.title;
                    break
                }
                if (s.triggerDefinition == null || !s.complete) {
                    q = triggerDescriptionEmpty
                } else {
                    if (typeof s.triggerDefinition === "object") {
                        triggerDef = s.triggerDefinition
                    } else {
                        triggerDef = JSON.parse(s.triggerDefinition)
                    }
                    switch (triggerDef.triggerType) {
                        case"DATE_MATCH":
                            q = tdDateMatch.replace("{customfield}", triggerDef.date.customFieldName);
                            break;
                        case"DATE_ANNIVERSARY":
                            q = tdDateAnniversary.replace("{customfield}", triggerDef.date.customFieldName);
                            break;
                        case"LIST_ADD":
                            q = tdListAdd.replace("{mailinglist}", triggerDef.listTitle);
                            break;
                        case"LIST_REMOVE":
                            q = tdListRemove.replace("{mailinglist}", triggerDef.listTitle);
                            break;
                        case"LINK_CLICK":
                            q = tdLinkClick.replace("{link}", triggerDef.linkUrl);
                            break;
                        case"CART_ABANDONED":
                            q = tdAbandonedCart;
                            break;
                        case"PRODUCT_PURCHASED":
                            q = tdProductPurchased;
                            break;
                        case"API_CALLED":
                            q = tdApi;
                            break
                    }
                }
                break;
            case"DELAY":
                if (s.delay_amount == null || !s.complete) {
                    q = delayDescriptionEmpty
                } else {
                    var r = lang[i(s.delay_amount)][s.delay_type.toLowerCase()];
                    q = delayDescription.replace("{delay_amount}", s.delay_amount).replace("{delay_type}", r)
                }
                break;
            case"EMAIL":
                if ((s.transactional_campaign_id == null && !s.has_template) || !s.complete) {
                    q = emailDescriptionEmpty
                } else {
                    q = emailDescription.replace("{campaign_title}", s.title)
                }
                break;
            case"ACTION":
                if (s.title) {
                    q = s.title;
                    break
                }
                if (s.action_definition == null || !s.complete) {
                    q = actionDescriptionEmpty
                } else {
                    if (typeof s.action_definition === "object") {
                        actionDef = s.action_definition
                    } else {
                        actionDef = JSON.parse(s.action_definition)
                    }
                    switch (actionDef.action_type) {
                        case"removeFromList":
                            q = acRemoveFromList.replace("{mailinglist}", actionDef.list_title);
                            break;
                        case"moveToList":
                            q = acMoveToList.replace("{mailinglist}", actionDef.list_title);
                            break;
                        case"copyToList":
                            q = acCopyToList.replace("{mailinglist}", actionDef.list_title);
                            break;
                        case"markAsUnsubscribed":
                            q = acMarkAsUnsubscribed;
                            break;
                        case"updateCustomfield":
                            var p = actionDef.value;
                            if (actionDef.custom_field_type && actionDef.custom_field_type == "BOOLEAN") {
                                var p = lang["boolean" + actionDef.value]
                            }
                            q = acUpdateCustomFields.replace("{mailinglist}", actionDef.list_title).replace("{customfield}", actionDef.custom_field_title).replace("{value}", p);
                            break;
                        case"notifyMe":
                            q = acNotifyMe.replace("{email}", actionDef.email).replace("{message}", actionDef.message);
                            break;
                        case"webhook":
                            q = acWebhook.replace("{webhook}", actionDef.webhook_url);
                            break
                    }
                }
                break;
            case"CONDITION":
                if (s.title) {
                    q = s.title;
                    break
                }
                if (s.condition_definition == null || !s.complete) {
                    q = conditionDescriptionEmpty
                } else {
                    if (typeof s.condition_definition === "object") {
                        conditionDef = s.condition_definition.conditions[0]
                    } else {
                        conditionDef = JSON.parse(s.condition_definition).conditions[0]
                    }
                    if (conditionDef.step_id) {
                        f("#wf-step-" + s.id).data("wf-email-id", conditionDef.step_id)
                    } else {
                        f("#wf-step-" + s.id).data("wf-email-id", 0)
                    }
                    switch (conditionDef.condition_type) {
                        case"subscriberFields":
                            q = cdSubscriberFields.replace("{subscriber_field}", lang[conditionDef.field_name]).replace("{comparison}", lang[conditionDef.comparison_operator]).replace("{value}", conditionDef.comparison_value);
                            switch (conditionDef.comparison_operator) {
                                case"isProvided":
                                    q = cdSubscriberFieldsProvided.replace("{subscriber_field}", lang[conditionDef.field_name]).replace("{comparison}", lang[conditionDef.comparison_operator]);
                                    break;
                                case"isOneOf":
                                    q = cdSubscriberFieldsOneOf.replace("{subscriber_field}", lang[conditionDef.field_name]).replace("{value}", conditionDef.comparison_value);
                                    break
                            }
                            break;
                        case"customFields":
                            q = cdCustomFields.replace("{custom_field}", conditionDef.field_name).replace("{mailinglist}", conditionDef.list_title).replace("{comparison}", lang[conditionDef.comparison_operator]).replace("{value}", conditionDef.comparison_value);
                            switch (conditionDef.comparison_operator) {
                                case"isProvided":
                                case"isTrue":
                                case"isFalse":
                                    q = cdCustomFieldsProvided.replace("{custom_field}", conditionDef.field_name).replace("{mailinglist}", conditionDef.list_title).replace("{comparison}", lang[conditionDef.comparison_operator]);
                                    break;
                                case"isOneOf":
                                    q = cdCustomFieldsOneOf.replace("{custom_field}", conditionDef.field_name).replace("{mailinglist}", conditionDef.list_title).replace("{value}", conditionDef.comparison_value);
                                    break;
                                case"greaterThan":
                                case"lessThan":
                                case"equalOrGreater":
                                case"equalOrLess":
                                case"before":
                                case"after":
                                case"onOrBefore":
                                case"onOrAfter":
                                    q = cdCustomFieldsType.replace("{custom_field}", conditionDef.field_name).replace("{mailinglist}", conditionDef.list_title).replace("{comparison}", lang[conditionDef.comparison_operator]).replace("{value}", conditionDef.comparison_value);
                                    break
                            }
                            break;
                        case"abandonedCart":
                            q = cdAbandonedCart.replace("{cart_info}", lang[conditionDef.cart_action]).replace("{comparison}", lang[conditionDef.comparison_operator]).replace("{value}", conditionDef.comparison_value);
                            if (conditionDef.cart_action == "cartRecovered") {
                                q = cdAbandonedCartRecovered.replace("{cart_info}", lang[conditionDef.cart_action])
                            }
                            if (conditionDef.cart_action == "cartContains") {
                                q = cdAbandonedCart.replace("{cart_info}", lang[conditionDef.cart_action]).replace("{comparison}", "").replace("{value}", "„" + conditionDef.comparison_value + "“")
                            }
                            break;
                        case"campaignEmail":
                            q = cdCampaignEmail.replace("{campaign_title}", conditionDef.campaign_name).replace("{activity}", lang[conditionDef.activity_type]);
                            if (conditionDef.activity_type == "linkClicked" || conditionDef.activity_type == "clicked") {
                                q = cdCampaignEmailClick.replace("{campaign_title}", conditionDef.campaign_name).replace("{activity}", lang[conditionDef.activity_type])
                            }
                            break;
                        case"workflowEmail":
                            q = cdWorkflowEmail.replace("{email_title}", conditionDef.wf_email_name).replace("{activity}", lang[conditionDef.activity_type]);
                            if (conditionDef.activity_type == "linkClicked" || conditionDef.activity_type == "clicked") {
                                q = cdWorkflowEmailClick.replace("{email_title}", conditionDef.wf_email_name).replace("{activity}", lang[conditionDef.activity_type])
                            }
                            break;
                        case"listMembership":
                            q = cdListMembership.replace("{list_title}", conditionDef.list_title);
                            break;
                        case"productPurchased":
                            switch (conditionDef.product_purchase_action) {
                                case"specific":
                                    q = cdProductPurchaseSpecific.replace("{product}", conditionDef.product_sku);
                                    break;
                                case"any":
                                    q = cdProductPurchaseAny;
                                    break;
                                case"purchaseDate":
                                    q = cdProductPurchase.replace("{comparison}", lang["productDate_" + conditionDef.comparison_operator]).replace("{date}", conditionDef.product_purchased_date);
                                    break
                            }
                            break
                    }
                }
                break
        }
        return q
    }

    function k(p) {
        if (p === undefined) {
            p = "MAIN"
        }
        if (p === "MAIN") {
            f("#builder-loading-overlay").stop().fadeIn(1500)
        }
        if (p === "SIDEBAR") {
            f("#sidebar-loading-overlay").stop().fadeIn(1500)
        }
    }

    function i(p) {
        if ((p > 1 && p < 10) || (parseInt(p.toString().split("").pop(), 10) < 10 && parseInt(p.toString().split("").pop(), 10) > 1)) {
            return "timePlural"
        } else {
            if (p >= 10 && parseInt(p.toString().split("").pop(), 10) == 0) {
                return "timePluralZero"
            } else {
                if (p == 1 || parseInt(p.toString().split("").pop(), 10) == 1) {
                    return "timeSingular"
                }
            }
        }
    }

    function b(p) {
        if (p === undefined) {
            p = "MAIN"
        }
        if (p === "MAIN") {
            f("#builder-loading-overlay").stop().fadeOut(300)
        }
        if (p === "SIDEBAR") {
            f("#sidebar-loading-overlay").stop().fadeOut(300)
        }
    }

    f.fn.initBuilder = function () {
        return this.each(function () {
            var P = f(this).attr("class");

            function B(X) {
                if (X.hasClass("sender-wf-deletable")) {
                    X.children("div").prepend(deleteButtonTemplate)
                }
                if (X.hasClass("sender-wf-condition")) {
                    X.children("ul").children("li").children("div").prepend(addButtonTemplate)
                } else {
                    X.children("div").prepend(addButtonTemplate)
                }
            }

            f("." + P + " li").each(function () {
                B(f(this))
            });

            function J(X, aa, ab, ad) {
                var Z = f(aa);
                var ae = Z.closest("li").data("step-id");
                var ac = Z.closest("li").data("condition-path");
                var Y = f("#wf-step-" + ab);
                swal.close();
                f.ajax({
                    type: "POST",
                    dataType: "json",
                    url: appRoot + "workflows/addStep/",
                    beforeSend: k("MAIN"),
                    data: {workflowId: workflowId, stepType: X, parentId: ae, conditionPath: ac},
                    success: function (ag) {
                        ag.type = X;
                        var af = ag.id;
                        if (ab && ad !== undefined) {
                            M(ab, ag.id, ad);
                            newNode = h(ag, Z.closest("li").children("ul"));
                            if (ad) {
                                f("#wf-step-" + af).find(".sender-wf-condition-yes").find("ul").append(Y)
                            } else {
                                f("#wf-step-" + af).find(".sender-wf-condition-no").find("ul").append(Y)
                            }
                        } else {
                            if (ab && ad == undefined) {
                                M(ab, ag.id, ac);
                                newNode = h(ag, Z.closest("li").children("ul"));
                                f("#wf-step-" + af).find("ul").append(Y)
                            } else {
                                newNode = h(ag, Z.closest("li").children("ul"))
                            }
                        }
                        B(newNode);
                        y(ag);
                        z();
                        top.notifySuccess(l("Success!"));
                        n();
                        r();
                        b("MAIN");
                        C(af)
                    },
                    error: function (af) {
                        b("MAIN");
                        top.notifyError(l("Error occurred"))
                    }
                })
            }

            function C(X) {
                return new Promise(function (aa, Z) {
                    var Y = f("#wf-step-" + X).find(">div");
                    f(".builder-container").stop().animate({
                        queue: false,
                        scrollLeft: Y.offset().left - f(".overflow").offset().left - ((f(".builder-container").width() - Y.width()) / 2),
                        scrollTop: Y.offset().top - f(".overflow").offset().top - 100
                    }, 500, function (ab) {
                        aa()
                    })
                })
            }

            function s(X) {
                return new Promise(function (aa, Z) {
                    var Y = X;
                    f(".builder-container").stop().animate({
                        queue: false,
                        scrollLeft: Y.offset().left - f(".overflow").offset().left - ((f(".builder-container").width() - Y.width()) / 2),
                        scrollTop: Y.offset().top - f(".overflow").offset().top - 200
                    }, 500, function (ab) {
                        aa()
                    })
                })
            }

            function y(Y) {
                f("#step-editor").addClass("animated bounceInLeft").fadeIn(o);
                f(".step-editor-fields").hide();
                f("#form_submit_container").show();
                f(".help-block").each(function () {
                    f(this).remove()
                });
                f("div").removeClass("wf-step-infocus");
                f("#wf-step-" + Y.id).find(">div").addClass("wf-step-infocus");
                var X = f("#form-type-" + Y.type);
                X.show();
                f("#editableStepId").val(Y.id);
                f("#editableStepType").val(Y.type);
                switch (Y.type) {
                    case"TRIGGER":
                        E(Y);
                        refreshInputs(f("#form-type-TRIGGER"));
                        break;
                    case"DELAY":
                        X.find("#delay_amount").val(Y.delay_amount);
                        X.find("#delay_type").val(Y.delay_type).selectpicker("refresh");
                        refreshInputs(f("#form-type-DELAY"));
                        break;
                    case"EMAIL":
                        u(Y);
                        refreshInputs(f("#form-type-EMAIL"));
                        break;
                    case"ACTION":
                        R(Y);
                        refreshInputs(f("#form-type-ACTION"));
                        break;
                    case"CONDITION":
                        Q(Y);
                        refreshInputs(f("#form-type-CONDITION"));
                        break
                }
            }

            function E(ab) {
                var Z = f("#trigger_type_container");
                var ad = Z.find("select option:selected").val();
                var ag = f("#trigger_list_select_container").hide();
                var Y = f("#trigger_custom_field_select_container").hide();
                var ae = f("#trigger_comparison_date_operator_container").hide();
                var X = f("#trigger_delay_container").hide();
                var ah = f("#trigger_product_sku_container").hide();
                var ac = f("#trigger_send_time_container").hide();
                var aa = f("#trigger_link_open_container").hide();
                ag.find("select").val("").selectpicker("refresh");
                if (ab) {
                    var af = {};
                    if (ab.triggerDefinition) {
                        af = JSON.parse(ab.triggerDefinition)
                    } else {
                    }
                    if (af.triggerType) {
                        Z.find("select").val(af.triggerType).selectpicker("refresh").trigger("change")
                    }
                    if (ab.title) {
                        f("#trigger_title").val(ab.title)
                    }
                    if (af.date && af.date.listId) {
                        U(af.date.listId, "trigger").then(function (ai) {
                            ag.find("select").val(af.date.listId).selectpicker("refresh");
                            Y.find("select").val(af.date.customFieldId).selectpicker("refresh").trigger("change");
                            ae.find("select").val(af.date.dateOperator).selectpicker("refresh").trigger("change");
                            if (af.date.num) {
                                X.find("#trigger_delay_amount").val(af.date.num);
                                X.find("#trigger_delay_type").val(af.date.delayType).selectpicker("refresh")
                            }
                            f("#trigger_send_time").data("DateTimePicker").date(af.date.time)
                        });
                        refreshInputs(f("#form-type-TRIGGER"));
                        return
                    }
                    if (af.listId) {
                        ag.find("select").val(af.listId).selectpicker("refresh").trigger("change")
                    }
                    if (af.linkUrl) {
                        aa.find("input").val(af.linkUrl)
                    }
                    if (af.productSku) {
                        ah.find("input").val(af.productSku)
                    }
                }
                switch (ad) {
                    case"DATE_MATCH":
                        ag.fadeIn(o);
                        f("#trigger_send_time").data("DateTimePicker").stepping(15);
                        break;
                    case"DATE_ANNIVERSARY":
                        ag.fadeIn(o);
                        f("#trigger_send_time").data("DateTimePicker").stepping(15);
                        break;
                    case"LIST_ADD":
                        ag.fadeIn(o);
                        break;
                    case"LIST_REMOVE":
                        ag.fadeIn(o);
                        break;
                    case"LINK_CLICK":
                        aa.fadeIn(o);
                        break;
                    case"CART_ABANDONED":
                        break;
                    case"PRODUCT_PURCHASED":
                        ah.fadeIn(o);
                        break;
                    case"API_CALLED":
                        break
                }
            }

            function Q(ap) {
                var Y = f("#condition_type option:selected").val();
                var aa = f("#condition_integration_notice_container").hide();
                var ac = f("#subscriber_field_container").hide();
                var ah = f("#condition_custom_field_select_container").hide();
                var ae = f("#condition_list_select_container").hide();
                var ab = f("#condition_campaign_select_container").hide();
                var ag = f("#condition_workflow_email_select_container").hide();
                var al = f("#condition_activity_type_container").hide();
                var ad = f("#abandoned_cart_container").hide();
                var aj = f("#product_purchased_container").hide();
                var ai = f("#condition_type_container");
                var X = f("#condition_link_open_container").hide();
                var ao = f("#product_sku_container").hide();
                var af = f("#product_purchased_date_container").hide();
                var ak = f("#condition_workflow_email_notice").hide();
                var am = f("#condition_wf_email_activity_container").hide();
                var an = f("#wf_activity_url_container").hide();
                f("#wf_email_notice_container").fadeOut(o);
                f("#condition_purchase_date_comparison_container").fadeOut(o);
                p("HIDE", "condition_");
                if (ap) {
                    f("#condition_title").val(ap.title);
                    var Z = {};
                    if (ap.condition_definition && ap.condition_definition !== "null") {
                        Z = JSON.parse(ap.condition_definition).conditions[0]
                    } else {
                        ai.find("select").val("").selectpicker("refresh");
                        ae.find("select").val("").selectpicker("refresh");
                        ac.find("select").val("").selectpicker("refresh");
                        ab.find("select").val("").selectpicker("refresh");
                        al.find("select").val("").selectpicker("refresh");
                        ad.find("select").val("").selectpicker("refresh");
                        aj.find("select").val("").selectpicker("refresh").trigger("change");
                        ag.find("select").val("").selectpicker("refresh");
                        an.find("select").val("").selectpicker("refresh");
                        f("#product_sku").val("");
                        f("#condition_purchase_date_comparison_container").find("select").val("").selectpicker("refresh");
                        f("#product_purchased_date").data("DateTimePicker").date(null);
                        f("#condition_link_open_container").hide();
                        f("#condition_open_notice_container").hide();
                        return
                    }
                    if (Z.condition_type) {
                        ai.find("select").val(Z.condition_type).selectpicker("refresh").trigger("change")
                    }
                    if (Z.campaign_id) {
                        ab.find("select").val(Z.campaign_id).selectpicker("refresh").trigger("change")
                    }
                    if (Z.activity_type) {
                        al.find("select").val(Z.activity_type).selectpicker("refresh")
                    }
                    if (Z.link_id) {
                        F().then(function (aq) {
                            X.find("select").val(Z.link_id).selectpicker("refresh")
                        })
                    }
                    if (Z.field_name) {
                        ac.find("select").val(Z.field_name).selectpicker("refresh")
                    }
                    if (Z.list_id && !Z.custom_field_id) {
                        ae.find("select").val(Z.list_id).selectpicker("refresh").trigger("change")
                    }
                    if (Z.list_id && Z.custom_field_id) {
                        U(Z.list_id, "condition").then(function (aq) {
                            ae.find("select").val(Z.list_id).selectpicker("refresh");
                            ah.find("select").val(Z.custom_field_id).selectpicker("refresh")
                        })
                    }
                    if (Z.cart_action) {
                        ad.find("select").val(Z.cart_action).selectpicker("refresh");
                        if (Z.cart_action === "cartContains") {
                            f("#product_sku_container").fadeIn(o);
                            f("#product_sku").val(Z.comparison_value)
                        }
                    }
                    if (Z.product_purchase_action) {
                        aj.find("select").val(Z.product_purchase_action).selectpicker("refresh").trigger("change");
                        if (Z.product_purchase_action === "specific") {
                            f("#product_sku").val(Z.product_sku)
                        }
                        if (Z.product_purchase_action === "purchaseDate") {
                            f("#product_purchased_date").data("DateTimePicker").date(Z.product_purchased_date);
                            f("#condition_purchase_date_comparison_container").find("select").val(Z.comparison_operator).selectpicker("refresh")
                        }
                    }
                    if (Z.step_id) {
                        ag.find("select").val(Z.step_id).selectpicker("refresh").trigger("change");
                        if (Z.activity_type) {
                            am.find("select").val(Z.activity_type).selectpicker("refresh").trigger("change")
                        }
                    }
                    if (Z.link_url) {
                        t().then(function (aq) {
                            an.find("select").val(Z.link_url).selectpicker("refresh")
                        })
                    }
                    if (Z.comparison_type) {
                        p(Z.comparison_type, "condition_");
                        if (Z.comparison_type === "TEXT") {
                            f("#condition_comparison_string_operator").val(Z.comparison_operator).selectpicker("refresh").trigger("change")
                        }
                        if (Z.comparison_type === "INT") {
                            f("#condition_comparison_number_operator").val(Z.comparison_operator).selectpicker("refresh").trigger("change")
                        }
                        if (Z.comparison_type === "DATE") {
                            f("#condition_comparison_date_operator").val(Z.comparison_operator).selectpicker("refresh").trigger("change");
                            f("#condition_comparison_time_value").data("DateTimePicker").date(Z.comparison_value)
                        }
                        if (Z.comparison_type === "BOOLEAN") {
                            f("#condition_comparison_boolean_operator").val(Z.comparison_operator).selectpicker("refresh").trigger("change")
                        }
                        if (Z.comparison_value && Z.comparison_type !== "DATE") {
                            f("#condition_comparison_value").val(Z.comparison_value)
                        }
                    }
                    refreshInputs(f("#form-type-EMAIL"));
                    return
                }
                switch (Y) {
                    case"subscriberFields":
                        ac.fadeIn(o);
                        p("TEXT", "condition_");
                        break;
                    case"customFields":
                        ae.fadeIn(o);
                        break;
                    case"workflowEmail":
                        D(f("#editableStepId").val());
                        break;
                    case"campaignEmail":
                        ab.fadeIn(o);
                        break;
                    case"listMembership":
                        ae.fadeIn(o);
                        break;
                    case"abandonedCart":
                        aa.fadeIn(o);
                        ad.fadeIn(o);
                        break;
                    case"productPurchased":
                        aa.fadeIn(o);
                        aj.fadeIn(o);
                        break
                }
            }

            function u(ae) {
                f("#step-editor").hide();
                f("#transactional_campaign_id").remove();
                var X = f("#email_title").val("");
                var ac = f("#from_name").val("");
                var ad = f("#from_email").val("");
                var aa = f("#reply_to").val("");
                var ab = f("#subject").val("");
                var Z = f("#google_analytics");
                var Y = f("#email_thumnail").prop("src", appRoot + "img/template_placeholder.png");
                f("#campaign_content_button").off();
                f("#has_content").remove();
                f("#form-type-EMAIL").append('<input name="email_has_template" id="has_content" type="hidden" value="0">');
                if (ae.transactional_campaign_id) {
                    if (typeof ae.thumbnail !== "undefined") {
                        Y.prop("src", ae.thumbnail)
                    }
                    f.ajax({
                        type: "POST",
                        dataType: "json",
                        url: appRoot + "workflows/getTransactionalCampaignInfo/",
                        data: {transactionalCampaignId: ae.transactional_campaign_id},
                        success: function (af) {
                            b("SIDEBAR");
                            f("#step-editor").fadeIn(o);
                            f("#form_submit_container").show();
                            X.val(af.TransactionalCampaign.title);
                            ac.val(af.TransactionalCampaign.from);
                            aa.val(af.TransactionalCampaign.reply_to);
                            ab.val(af.TransactionalCampaign.subject);
                            Z.attr("checked", af.TransactionalCampaign.google_analytics);
                            refreshInputs(f("#form-type-EMAIL"));
                            f("#preview_container").show();
                            if (af.Html.template_id == 0) {
                                f("#has_content").val(0);
                                f("#campaign_content_button").attr("href", "#").on("click", function (ag) {
                                    ag.preventDefault();
                                    W();
                                    window.location = appRoot + "html/template_select/" + af.Html.id
                                }).text(emailContentCreate)
                            } else {
                                f("#has_content").val(1);
                                f("#campaign_content_button").attr("href", "#").on("click", function (ag) {
                                    ag.preventDefault();
                                    W();
                                    if (parseInt(af.Html.template_id) === -1) {
                                        window.location = appRoot + "html/html_editor/" + af.Html.id
                                    } else {
                                        window.location = appRoot + "html/editor/" + af.Html.id + "/" + af.Html.template_id
                                    }
                                }).text(emailContentEdit)
                            }
                            f("#form-type-EMAIL").append('<input name="transactional_campaign_id" id="transactional_campaign_id" type="hidden" value="' + ae.transactional_campaign_id + '">')
                        },
                        error: function (af) {
                            b("SIDEBAR");
                            top.notifyError(l("Error occurred"))
                        }
                    })
                } else {
                    f("#step-editor").fadeIn(o);
                    f("#campaign_content_button").attr("href", "#").on("click", function (af) {
                        af.preventDefault();
                        W().then(function (ag) {
                            if (ag.info.redirect) {
                                k("MAIN");
                                window.location = appRoot + "html/template_select/" + ag.info.redirect
                            }
                        })
                    }).text(emailContentCreate);
                    b("SIDEBAR")
                }
            }

            function R(Z) {
                var X = f("#action_type");
                var ah = f("#action_type option:selected").val();
                var ag = f("#action_list_select_container").hide();
                var Y = f("#notify_email_container").hide();
                var af = f("#notify_message_container").hide();
                var ae = f("#webhook_url_container").hide();
                var ac = f("#action_notice_container").hide();
                var ad = f("#action_custom_field_select_container").hide();
                var ab = f("#action_custom_field_value_container").hide();
                p("HIDE", "action_");
                if (Z) {
                    f("#action_title").val(Z.title);
                    var aa = {};
                    if (Z.action_definition) {
                        aa = JSON.parse(Z.action_definition)
                    } else {
                        X.val("").selectpicker("refresh");
                        ag.find("select").val("").selectpicker("refresh");
                        ad.find("select").val("").selectpicker("refresh");
                        f("#notify_email").val(userEmail);
                        f("#notify_message").val("");
                        f("#webhook_url").val("");
                        return
                    }
                    if (aa.action_type) {
                        X.val(aa.action_type).selectpicker("refresh").trigger("change")
                    }
                    if (aa.list_id && !aa.custom_field_id) {
                        ag.find("select").val(aa.list_id).selectpicker("refresh").trigger("change")
                    }
                    if (aa.list_id && aa.custom_field_id) {
                        U(aa.list_id, "action").then(function (ai) {
                            ag.find("select").val(aa.list_id).selectpicker("refresh");
                            ad.find("select").val(aa.custom_field_id).selectpicker("refresh").trigger("change");
                            if (aa.custom_field_type) {
                                switch (aa.custom_field_type) {
                                    case"INT":
                                    case"TEXT":
                                        f("#action_comparison_value").val(aa.value);
                                        break;
                                    case"DATE":
                                        f("#action_comparison_time_value").data("DateTimePicker").date(aa.value);
                                        break;
                                    case"BOOLEAN":
                                        f("#action_comparison_boolean_value").val(aa.value).selectpicker("refresh");
                                        break
                                }
                            } else {
                                f("#action_comparison_value").val(aa.value);
                                f("#action_comparison_time_value").data("DateTimePicker").date(aa.value)
                            }
                            refreshInputs(f("#action_comparison_values_container"))
                        })
                    }
                    if (aa.message) {
                        f("#notify_email").val(userEmail);
                        f("#notify_message").val(aa.message)
                    }
                    if (aa.webhook_url) {
                        f("#webhook_url").val(aa.webhook_url)
                    }
                    if (aa.comparison_type) {
                        p(aa.comparison_type, "action_", true);
                        if (aa.comparison_type === "TEXT") {
                            f("#action_comparison_string_operator").val(aa.comparison).selectpicker("refresh")
                        }
                        if (aa.comparison_type === "INT") {
                            f("#action_comparison_number_operator").val(aa.comparison).selectpicker("refresh")
                        }
                        if (aa.comparison_type === "DATE") {
                            f("#action_comparison_date_operator").val(aa.comparison).selectpicker("refresh");
                            f("#action_comparison_time_value").data("DateTimePicker").date(aa.value)
                        }
                        if (aa.value) {
                            f("#action_comparison_value").val(aa.value)
                        }
                    }
                    refreshInputs(f("#form-type-ACTION"));
                    return
                }
                switch (ah) {
                    case"moveToList":
                        ag.fadeIn(o);
                        break;
                    case"copyToList":
                        ag.fadeIn(o);
                        break;
                    case"removeFromList":
                        ag.fadeIn(o);
                        break;
                    case"markAsUnsubscribed":
                        ag.fadeOut(o);
                        break;
                    case"updateCustomfield":
                        ag.find("select").val("").selectpicker("refresh");
                        ag.fadeIn(o);
                        break;
                    case"notifyMe":
                        ag.fadeOut(o);
                        ad.fadeOut(o);
                        ab.fadeOut(o);
                        Y.fadeIn(o);
                        af.fadeIn(o);
                        break;
                    case"webhook":
                        ae.fadeIn(o);
                        break
                }
            }

            function p(ag, aa, ad) {
                if (!ag) {
                    return
                }
                if (!ad) {
                    ad = false
                }
                var an = f("#" + aa + "comparison_string_operator_container").hide();
                var ab = f("#" + aa + "comparison_number_operator_container").hide();
                var aj = f("#" + aa + "comparison_date_operator_container").hide();
                var ai = f("#" + aa + "comparison_boolean_operator_container").hide();
                var Z = f("#" + aa + "comparison_time_value_container").hide();
                var af = f("#" + aa + "comparison_value_container").hide();
                var am = f("#" + aa + "comparison_boolean_value_container").hide();
                var ah = f("#" + aa + "comparison_time_value").val("");
                var ac = f("#" + aa + "comparison_value").val("").attr("type", "text");
                var Y = f("#" + aa + "comparison_boolean_value");
                var al = f("#" + aa + "comparison_string_operator");
                var ae = f("#" + aa + "comparison_number_operator");
                var X = f("#" + aa + "comparison_date_operator");
                var ak = f("#" + aa + "comparison_boolean_operator");
                ah.val("");
                ac.val("");
                Y.val("").selectpicker("refresh");
                al.val("").selectpicker("refresh");
                ae.val("").selectpicker("refresh");
                X.val("").selectpicker("refresh");
                ak.val("").selectpicker("refresh");
                switch (ag) {
                    case"INT":
                        if (!ad) {
                            ab.fadeIn(o)
                        }
                        ac.val("").attr("type", "number");
                        af.fadeIn("");
                        break;
                    case"TEXT":
                        if (!ad) {
                            an.fadeIn(o)
                        }
                        ac.val("").attr("type", "text");
                        af.fadeIn("");
                        break;
                    case"DATE":
                        if (!ad) {
                            aj.fadeIn(o)
                        }
                        Z.fadeIn(o);
                        break;
                    case"BOOLEAN":
                        if (!ad) {
                            ai.fadeIn(o)
                        } else {
                            am.fadeIn(o)
                        }
                        break;
                    case"HIDE":
                        break
                }
            }

            function U(X, Y) {
                return new Promise(function (af, ae) {
                    var ad = f("#" + Y + "_list_select option:selected").val();
                    if (X) {
                        ad = X
                    }
                    if (ad == (Y + "SelectAction")) {
                        return
                    }
                    var ab = f("#" + Y + "_custom_field_select_container").hide();
                    var ac = f("#" + Y + "_custom_field_value_container").hide();
                    var aa = f("#" + Y + "_custom_field_select").html("");
                    var Z = f("#" + Y + "_notice_container");
                    Z.hide();
                    ab.prop("disabled");
                    f.ajax({
                        type: "POST",
                        dataType: "json",
                        url: appRoot + "workflows/getCustomFields/",
                        beforeSend: k("SIDEBAR"),
                        data: {mailinglistId: ad},
                        success: function (ai) {
                            b("SIDEBAR");
                            aa.html("");
                            if (ai.empty) {
                                ab.hide();
                                ac.hide();
                                aa.selectpicker("refresh");
                                Z.fadeIn(o);
                                return false
                            }
                            aa.append('<option value="' + Y + 'SelectAction" selected disabled>' + lang.select_custom_field + "</option>");
                            if (Y === "trigger") {
                                var ag = 0;
                                for (var ah = 0; ah < ai.length; ah++) {
                                    if (ai[ah].CustomField.field_type === "DATE") {
                                        aa.append('<option data-type="' + ai[ah].CustomField.field_type + '" value="' + ai[ah].CustomField.id + '">' + ai[ah].CustomField.field_title + "</option>");
                                        ag++
                                    }
                                }
                                if (ag < 1) {
                                    ab.hide();
                                    Z.fadeIn(o);
                                    return
                                }
                            } else {
                                for (var ah = 0; ah < ai.length; ah++) {
                                    aa.append('<option data-type="' + ai[ah].CustomField.field_type + '" value="' + ai[ah].CustomField.id + '">' + ai[ah].CustomField.field_title + "</option>")
                                }
                            }
                            aa.removeProp("disabled");
                            aa.selectpicker("refresh");
                            ab.fadeIn(o);
                            af()
                        },
                        error: function (ag) {
                            b("SIDEBAR");
                            top.notifyError(l("Error occurred"))
                        }
                    })
                })
            }

            function O(X) {
                if (!X) {
                }
                switch (X.type) {
                    case"TRIGGER":
                        return G(X);
                        break;
                    case"ACTION":
                        return v(X);
                        break;
                    case"DELAY":
                        return S(X);
                        break;
                    case"CONDITION":
                        return A(X);
                        break;
                    case"EMAIL":
                        return K(X);
                        break
                }
            }

            function G(X) {
                f("#trigger_type_container .form-group .help-block").remove();
                if (!X.trigger_type) {
                    f("#trigger_type_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_condition_type + "</small>");
                    return false
                }
                switch (X.trigger_type) {
                    case"DATE_MATCH":
                    case"DATE_ANNIVERSARY":
                        f("#trigger_list_select_container .form-group .help-block").remove();
                        if (!X.trigger_select) {
                            f("#trigger_list_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_mailinglist + "</small>");
                            return false
                        }
                        f("#form-type-TRIGGER .help-block").remove();
                        if (!X.custom_field_select) {
                            f("#form-type-TRIGGER").append('<small class="c-red help-block">' + lang.not_selected_custom_field + "</small>");
                            return false
                        }
                        f("#trigger_comparison_date_operator_container .form-group .help-block").remove();
                        if (!X.trigger_comparison_date_operator) {
                            f("#trigger_comparison_date_operator_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_comparison_operator + "</small>");
                            return false
                        }
                        if (f("#trigger_comparison_date_operator option:selected").val() === "Before") {
                            f("#trigger_delay_type_container .help-block").remove();
                            if (!X.trigger_delay_type) {
                                f("#trigger_delay_type_container").append('<small class="c-red help-block">' + lang.not_selected_action + "</small>");
                                return false
                            }
                            f("#trigger_delay_amount_container .help-block").remove();
                            if (!X.trigger_delay_amount) {
                                f("#trigger_delay_amount_container").append('<small class="c-red help-block">' + lang.not_entered_delay + "</small>");
                                return false
                            }
                        }
                        f("#trigger_send_time_container .form-group .help-block").remove();
                        if (!X.trigger_send_time) {
                            f("#trigger_send_time_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_value + "</small>");
                            return false
                        }
                        var Y = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.trigger_title,
                            triggerDefinition: {
                                triggerType: X.trigger_type,
                                date: {
                                    listId: X.trigger_select,
                                    customFieldId: X.custom_field_select,
                                    customFieldName: f("#trigger_custom_field_select option:selected").text(),
                                    dateOperator: X.trigger_comparison_date_operator,
                                    time: X.trigger_send_time,
                                    num: X.trigger_delay_amount,
                                    delayType: X.trigger_delay_type
                                }
                            }
                        };
                        return Y;
                        break;
                    case"LIST_ADD":
                    case"LIST_REMOVE":
                        f("#trigger_list_select_container .form-group .help-block").remove();
                        if (!X.trigger_select) {
                            f("#trigger_list_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_mailinglist + "</small>");
                            return false
                        }
                        var Y = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.trigger_title,
                            triggerDefinition: {
                                triggerType: X.trigger_type,
                                listId: X.trigger_select,
                                listTitle: f("#trigger_list_select option:selected").text()
                            }
                        };
                        return Y;
                        break;
                    case"LINK_CLICK":
                        f("#trigger_link_open_container .form-group .help-block").remove();
                        if (!X.trigger_link_open) {
                            f("#trigger_link_open_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_value + "</small>");
                            return false
                        }
                        var Y = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.trigger_title,
                            triggerDefinition: {triggerType: X.trigger_type, linkUrl: X.trigger_link_open.trim()}
                        };
                        return Y;
                        break;
                    case"CART_ABANDONED":
                        var Y = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.trigger_title,
                            triggerDefinition: {triggerType: X.trigger_type}
                        };
                        return Y;
                        break;
                    case"PRODUCT_PURCHASED":
                        f("#trigger_product_sku_container .form-group .help-block").remove();
                        if (!X.trigger_product_sku) {
                            X.trigger_product_sku = ""
                        }
                        var Y = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.trigger_title,
                            triggerDefinition: {triggerType: X.trigger_type, productSku: X.trigger_product_sku}
                        };
                        return Y;
                        break;
                    case"API_CALLED":
                        var Y = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.trigger_title,
                            triggerDefinition: {triggerType: X.trigger_type}
                        };
                        return Y;
                        break
                }
            }

            function K(X) {
                f("#title_container .form-group .help-block").remove();
                if (!X.email_title) {
                    f("#title_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_title + "</small>");
                    return false
                }
                f("#from_name_container .form-group .help-block").remove();
                if (!X.from_name) {
                    f("#from_name_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_name + "</small>");
                    return false
                }
                f("#reply_to_container .form-group .help-block").remove();
                if (!X.reply_to) {
                    f("#reply_to_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_email + "</small>");
                    return false
                }
                var Z = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                f("#reply_to_container .form-group .help-block").remove();
                if (!Z.test(X.reply_to)) {
                    f("#reply_to_container .form-group").append('<small class="c-red help-block">' + lang.not_valid_email + "</small>");
                    return false
                }
                f("#subject_container .form-group .help-block").remove();
                if (!X.subject) {
                    f("#subject_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_subject + "</small>");
                    return false
                }
                var Y = {
                    id: X.id,
                    workflowId: X.workflowId,
                    has_template: X.email_has_template,
                    type: X.type,
                    title: X.email_title,
                    from_name: X.from_name,
                    reply_to: X.reply_to,
                    subject: X.subject,
                    google_analytics: X["data[google_analytics]"],
                    transactional_campaign_id: X.transactional_campaign_id
                };
                return Y
            }

            function S(X) {
                f("#delay_amount_container .help-block").remove();
                if (!X.delay_amount) {
                    f("#delay_amount_container").append('<small class="c-red help-block">' + lang.not_entered_delay + "</small>");
                    return false
                }
                var Y = {
                    id: X.id,
                    workflowId: X.workflowId,
                    type: X.type,
                    delay_amount: X.delay_amount,
                    delay_type: X.delay_type
                };
                return Y
            }

            function A(Y) {
                Y.subject = undefined;
                var ab;
                var aa;
                var X = f("#condition_comparison_values_container").is(":visible");
                var Z = Y.condition_comparison_value ? Y.condition_comparison_value : Y.condition_comparison_time_value;
                if (Y.condition_comparison_date_operator) {
                    ab = Y.condition_comparison_date_operator;
                    aa = "DATE"
                }
                if (Y.condition_comparison_string_operator) {
                    ab = Y.condition_comparison_string_operator;
                    aa = "TEXT"
                }
                if (Y.condition_comparison_number_operator) {
                    ab = Y.condition_comparison_number_operator;
                    aa = "INT"
                }
                if (Y.condition_comparison_boolean_operator) {
                    ab = Y.condition_comparison_boolean_operator;
                    aa = "BOOLEAN"
                }
                f("#condition_type_container .form-group .help-block").remove();
                if (!Y.condition_type) {
                    f("#condition_type_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_condition_type + "</small>");
                    return false
                }
                switch (Y.condition_type) {
                    case"subscriberFields":
                        f("#subscriber_field_container .form-group .help-block").remove();
                        if (!Y.subscriber_field) {
                            f("#subscriber_field_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_subscriber_field + "</small>");
                            return false
                        }
                        f("#condition_comparisons_container .form-group .help-block").remove();
                        if (!ab) {
                            f("#condition_comparisons_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_comparison_operator + "</small>");
                            return false
                        }
                        f("#condition_comparison_values_container .form-group .help-block").remove();
                        if (!Z && X) {
                            f("#condition_comparison_values_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_value + "</small>");
                            return false
                        }
                        var ac = {
                            id: Y.id,
                            workflowId: workflowId,
                            type: Y.type,
                            title: Y.condition_title,
                            condition_definition: {
                                condition_operator: "ANY",
                                conditions: [{
                                    condition_type: Y.condition_type,
                                    field_name: Y.subscriber_field,
                                    comparison_operator: ab,
                                    comparison_type: aa,
                                    comparison_value: Z
                                }]
                            }
                        };
                        return ac;
                        break;
                    case"customFields":
                        f("#condition_list_select_container .form-group .help-block").remove();
                        if (!Y.condition_list_select) {
                            f("#condition_list_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_mailinglist + "</small>");
                            return false
                        }
                        f("#condition_custom_field_select_container .form-group .help-block").remove();
                        if (!Y.condition_custom_field_select) {
                            f("#condition_custom_field_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_custom_field + "</small>");
                            return false
                        }
                        f("#condition_comparisons_container .form-group .help-block").remove();
                        if (!ab) {
                            f("#condition_comparisons_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_comparison_operator + "</small>");
                            return false
                        }
                        f("#condition_comparison_values_container .form-group .help-block").remove();
                        if (!Z && X) {
                            f("#condition_comparison_values_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_value + "</small>");
                            return false
                        }
                        var ac = {
                            id: Y.id,
                            workflowId: workflowId,
                            type: Y.type,
                            title: Y.condition_title,
                            condition_definition: {
                                condition_operator: "ANY",
                                conditions: [{
                                    condition_type: Y.condition_type,
                                    list_title: f("#condition_list_select option:selected").text(),
                                    list_id: Y.condition_list_select,
                                    custom_field_id: Y.condition_custom_field_select,
                                    field_name: f("#condition_custom_field_select option:selected").text(),
                                    comparison_operator: ab,
                                    comparison_type: aa,
                                    comparison_value: Z
                                }]
                            }
                        };
                        return ac;
                        break;
                    case"workflowEmail":
                        f("#condition_workflow_email_select_container .form-group .help-block").remove();
                        if (!Y.condition_workflow_email_select) {
                            f("#condition_workflow_email_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_campaign + "</small>");
                            return false
                        }
                        f("#condition_wf_email_activity_container .form-group .help-block").remove();
                        if (!Y.condition_wf_email_activity_select) {
                            f("#condition_wf_email_activity_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_activity + "</small>");
                            return false
                        }
                        if (Y.condition_wf_email_activity_select === "linkClicked") {
                            f("#wf_activity_url_container .form-group .help-block").remove();
                            if (!Y.wf_activity_url) {
                                f("#wf_activity_url_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_value + "</small>");
                                return false
                            }
                        }
                        var ac = {
                            id: Y.id,
                            workflowId: workflowId,
                            type: Y.type,
                            title: Y.condition_title,
                            condition_definition: {
                                condition_operator: "ANY",
                                conditions: [{
                                    condition_type: Y.condition_type,
                                    step_id: Y.condition_workflow_email_select,
                                    wf_email_name: f("#condition_workflow_email_select option:selected").text(),
                                    activity_type: Y.condition_wf_email_activity_select,
                                    link_url: Y.wf_activity_url
                                }]
                            }
                        };
                        return ac;
                        break;
                    case"campaignEmail":
                        f("#condition_campaign_select_container .form-group .help-block").remove();
                        if (!Y.condition_campaign_select) {
                            f("#condition_campaign_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_campaign + "</small>");
                            return false
                        }
                        f("#condition_activity_type_container .form-group .help-block").remove();
                        if (!Y.condition_activity_type_select) {
                            f("#condition_activity_type_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_activity + "</small>");
                            return false
                        }
                        if (Y.condition_activity_type_select === "linkClicked") {
                            f("#condition_link_open_container .form-group .help-block").remove();
                            if (!Y.condition_link_open) {
                                f("#condition_link_open_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_link + "</small>");
                                return false
                            }
                        }
                        var ac = {
                            id: Y.id,
                            workflowId: workflowId,
                            type: Y.type,
                            title: Y.condition_title,
                            condition_definition: {
                                condition_operator: "ANY",
                                conditions: [{
                                    condition_type: Y.condition_type,
                                    campaign_id: Y.condition_campaign_select,
                                    campaign_name: f("#condition_campaign_select option:selected").text(),
                                    activity_type: Y.condition_activity_type_select,
                                    link_id: Y.condition_link_open,
                                    link_title: f("#condition_link_open option:selected").text()
                                }]
                            }
                        };
                        return ac;
                        break;
                    case"listMembership":
                        f("#condition_list_select_container .form-group .help-block").remove();
                        if (!Y.condition_list_select) {
                            f("#condition_list_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_mailinglist + "</small>");
                            return false
                        }
                        var ac = {
                            id: Y.id,
                            workflowId: workflowId,
                            type: Y.type,
                            title: Y.condition_title,
                            condition_definition: {
                                condition_operator: "ANY",
                                conditions: [{
                                    condition_type: Y.condition_type,
                                    list_id: Y.condition_list_select,
                                    list_title: f("#condition_list_select option:selected").text()
                                }]
                            }
                        };
                        return ac;
                        break;
                    case"abandonedCart":
                        f("#abandoned_cart_container .form-group .help-block").remove();
                        if (!Y.abandoned_cart_select) {
                            f("#abandoned_cart_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_cart_option + "</small>");
                            return false
                        }
                        if (Y.abandoned_cart_select === "cartAmount") {
                            f("#condition_comparisons_container .form-group .help-block").remove();
                            if (!ab) {
                                f("#condition_comparisons_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_comparison_operator + "</small>");
                                return false
                            }
                            f("#condition_comparison_values_container .form-group .help-block").remove();
                            if (!Z && X) {
                                f("#condition_comparison_values_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_value + "</small>");
                                return false
                            }
                        }
                        if (Y.abandoned_cart_select === "cartContains") {
                            f("#product_sku_container .form-group .help-block").remove();
                            if (!Y.product_sku) {
                                f("#product_sku_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_value + "</small>");
                                return false
                            } else {
                                Z = Y.product_sku
                            }
                        }
                        var ac = {
                            id: Y.id,
                            workflowId: workflowId,
                            type: Y.type,
                            title: Y.condition_title,
                            condition_definition: {
                                condition_operator: "ANY",
                                conditions: [{
                                    condition_type: Y.condition_type,
                                    cart_action: Y.abandoned_cart_select,
                                    comparison_operator: ab,
                                    comparison_type: aa,
                                    comparison_value: Z
                                }]
                            }
                        };
                        return ac;
                        break;
                    case"productPurchased":
                        f("#product_purchased_container .form-group .help-block").remove();
                        if (!Y.product_purchased_select) {
                            f("#product_purchased_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_product_info + "</small>");
                            return false
                        }
                        if (Y.product_purchased_select === "specific") {
                            f("#product_sku_container .form-group .help-block").remove();
                            if (!Y.product_sku) {
                                f("#product_sku_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_product_sku + "</small>");
                                return false
                            }
                        }
                        if (Y.product_purchased_select === "purchaseDate") {
                            f("#condition_purchase_date_comparison_container .form-group .help-block").remove();
                            if (!Y.condition_purchase_date_comparison) {
                                f("#condition_purchase_date_comparison_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_comparison_operator + "</small>");
                                return false
                            }
                            f("#product_purchased_date_container .form-group .help-block").remove();
                            if (!Y.product_purchased_date) {
                                f("#product_purchased_date_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_purchase_date + "</small>");
                                return false
                            }
                        }
                        var ac = {
                            id: Y.id,
                            workflowId: workflowId,
                            type: Y.type,
                            title: Y.condition_title,
                            condition_definition: {
                                condition_operator: "ANY",
                                conditions: [{
                                    condition_type: Y.condition_type,
                                    product_purchase_action: Y.product_purchased_select,
                                    product_sku: Y.product_sku,
                                    product_purchased_date: Y.product_purchased_date,
                                    comparison_operator: Y.condition_purchase_date_comparison
                                }]
                            }
                        };
                        return ac;
                        break
                }
            }

            function v(X) {
                var aa;
                var Y;
                if (X.action_comparison_date_operator) {
                    aa = X.action_comparison_date_operator;
                    comparisonType = "DATE"
                }
                if (X.action_comparison_string_operator) {
                    aa = X.action_comparison_string_operator;
                    comparisonType = "TEXT"
                }
                if (X.action_comparison_number_operator) {
                    aa = X.action_comparison_number_operator;
                    comparisonType = "INT"
                }
                f("#action_type_container .form-group .help-block").remove();
                if (!X.action_type) {
                    f("#action_type_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_action + "</small>");
                    return false
                }
                switch (X.action_type) {
                    case"moveToList":
                        f("#action_list_select_container .form-group .help-block").remove();
                        if (!X.list_select) {
                            f("#action_list_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_mailinglist + "</small>");
                            return false
                        }
                        var ab = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.action_title,
                            action_definition: {
                                action_type: X.action_type,
                                list_id: X.list_select,
                                list_title: f("#action_list_select option:selected").text()
                            }
                        };
                        return ab;
                        break;
                    case"copyToList":
                        f("#action_list_select_container .form-group .help-block").remove();
                        if (!X.list_select) {
                            f("#action_list_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_mailinglist + "</small>");
                            return false
                        }
                        var ab = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.action_title,
                            action_definition: {
                                action_type: X.action_type,
                                list_id: X.list_select,
                                list_title: f("#action_list_select option:selected").text()
                            }
                        };
                        return ab;
                        break;
                    case"removeFromList":
                        f("#action_list_select_container .form-group .help-block").remove();
                        if (!X.list_select) {
                            f("#action_list_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_mailinglist + "</small>");
                            return false
                        }
                        var ab = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.action_title,
                            action_definition: {
                                action_type: X.action_type,
                                list_id: X.list_select,
                                list_title: f("#action_list_select option:selected").text()
                            }
                        };
                        return ab;
                        break;
                    case"markAsUnsubscribed":
                        var ab = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.action_title,
                            action_definition: {action_type: X.action_type}
                        };
                        return ab;
                        break;
                    case"updateCustomfield":
                        var Z = false;
                        if (X.action_comparison_value) {
                            Z = X.action_comparison_value
                        } else {
                            if (X.action_comparison_time_value) {
                                Z = X.action_comparison_time_value
                            } else {
                                if (X.action_comparison_boolean_value) {
                                    Z = X.action_comparison_boolean_value
                                }
                            }
                        }
                        f("#action_list_select_container .form-group .help-block").remove();
                        if (!X.list_select) {
                            f("#action_list_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_mailinglist + "</small>");
                            return false
                        }
                        f("#action_custom_field_select_container .form-group .help-block").remove();
                        if (!X.custom_field_select) {
                            f("#action_custom_field_select_container .form-group").append('<small class="c-red help-block">' + lang.not_selected_custom_field + "</small>");
                            return false
                        }
                        f("#action_comparison_values_container .form-group .help-block").remove();
                        if (!Z) {
                            f("#action_comparison_values_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_value + "</small>");
                            return false
                        }
                        var ab = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.action_title,
                            action_definition: {
                                action_type: X.action_type,
                                list_id: X.list_select,
                                list_title: f("#action_list_select option:selected").text(),
                                custom_field_id: X.custom_field_select,
                                custom_field_title: f("#action_custom_field_select option:selected").text(),
                                custom_field_type: f("#action_custom_field_select option:selected").data("type"),
                                value: Z
                            }
                        };
                        return ab;
                        break;
                    case"notifyMe":
                        if (!X.notify_email) {
                        }
                        f("#notify_message_container .form-group .help-block").remove();
                        if (!X.notify_message) {
                            f("#notify_message_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_message + "</small>");
                            return false
                        }
                        var ab = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.action_title,
                            action_definition: {
                                action_type: X.action_type,
                                email: f("#notify_email").val(),
                                message: X.notify_message
                            }
                        };
                        return ab;
                        break;
                    case"webhook":
                        f("#webhook_url_container .form-group .help-block").remove();
                        if (!X.webhook_url) {
                            f("#webhook_url_container .form-group").append('<small class="c-red help-block">' + lang.not_entered_webhook_url + "</small>");
                            return false
                        }
                        var ab = {
                            id: X.id,
                            workflowId: workflowId,
                            type: X.type,
                            title: X.action_title,
                            action_definition: {action_type: X.action_type, webhook_url: X.webhook_url}
                        };
                        return ab;
                        break
                }
            }

            function W() {
                var X = {};
                X.workflowId = workflowId;
                var Y = f("#step-editor-form").serializeArray();
                f(Y).each(function (ab, aa) {
                    X[aa.name] = aa.value
                });
                var Z = O(X);
                if (!Z) {
                    return
                }
                return new Promise(function (ab, aa) {
                    f.ajax({
                        type: "POST",
                        dataType: "json",
                        url: appRoot + "workflows/saveStep/",
                        data: Z,
                        beforeSend: k("SIDEBAR"),
                        success: function (ac) {
                            b("SIDEBAR");
                            if (ac.errorMessages) {
                                f("#reply_to").after('<small class="c-red help-block">' + ac.errorMessages.reply_to[0] + "</small>");
                                aa();
                                return false
                            }
                            ab(ac);
                            if (ac.info.hasOwnProperty("thumbnail")) {
                                f("#wf-step-" + ac.id + " > div > div > .sender-wf-node-thumbnail img").attr("src", ac.info.thumbnail)
                            }
                            Z.complete = true;
                            f("#wf-step-" + ac.id + " > div > div > .wf-node-text").html(j(Z));
                            if (ac.info.isCompleted == 0) {
                                f("#wf-step-" + ac.id).find(">div").removeClass("wf-step-infocus")
                            } else {
                                f("#wf-step-" + ac.id).find(">div").removeClass("wf-step-incomplete").removeClass("wf-step-infocus")
                            }
                            r();
                            n();
                            d = false;
                            if (windowWidth < mobileBreakPoint) {
                                showSidebar(false)
                            } else {
                                f("#step-editor").fadeOut(o)
                            }
                            top.notifySuccess(l("Success!"))
                        },
                        error: function (ac) {
                            b("SIDEBAR");
                            aa();
                            top.notifyError(l("Error occurred"))
                        }
                    })
                })
            }

            function N(Y, X) {
                if (X === undefined) {
                    X = true
                }
                if (X) {
                    C(Y).then(function () {
                        if (windowWidth < mobileBreakPoint) {
                            showSidebar(true)
                        }
                    })
                }
                f.ajax({
                    type: "GET",
                    dataType: "json",
                    url: appRoot + "workflows/loadStep/" + Y,
                    beforeSend: k("SIDEBAR"),
                    success: function (Z) {
                        y(Z);
                        if (Z.type !== "EMAIL") {
                            b("SIDEBAR")
                        }
                    },
                    error: function (Z) {
                        b("SIDEBAR");
                        top.notifyError(l("Error occurred"))
                    }
                })
            }

            function F() {
                return new Promise(function (Y, X) {
                    campaignId = f("#condition_campaign_select option:selected").val();
                    f("#condition_open_notice_container").hide();
                    f.ajax({
                        type: "POST",
                        dataType: "json",
                        url: appRoot + "workflows/getCampaignLinks/",
                        beforeSend: k("SIDEBAR"),
                        data: {campaignId: campaignId},
                        success: function (Z) {
                            if (Z.error) {
                                f("#condition_open_notice_container").fadeIn(o);
                                return
                            }
                            f("#condition_link_open").html("").append('<option value="linkSelectAction" selected disabled>Select link</option>');
                            for (var aa = 0; aa < Z.length; aa++) {
                                f("#condition_link_open").append('<option data-type="' + Z[aa].Link.id + '" value="' + Z[aa].Link.id + '">' + Z[aa].Link.url + "</option>")
                            }
                            f("#condition_link_open").selectpicker("refresh");
                            f("#condition_link_open_container").fadeIn(o);
                            Y();
                            b("SIDEBAR")
                        },
                        error: function (Z) {
                            b("SIDEBAR");
                            top.notifyError(l("Error occurred"));
                            X()
                        }
                    })
                })
            }

            function t() {
                return new Promise(function (Y, X) {
                    stepId = f("#condition_workflow_email_select option:selected").val();
                    f("#condition_open_notice_container").hide();
                    f.ajax({
                        type: "POST",
                        dataType: "json",
                        url: appRoot + "workflows/getWorkflowEmailLinksByStepId/",
                        beforeSend: k("SIDEBAR"),
                        data: {stepId: stepId},
                        success: function (Z) {
                            if (Z.error) {
                                f("#condition_open_notice_container").fadeIn(o);
                                return
                            }
                            f("#wf_activity_url").html("").append('<option value="linkSelectAction" selected disabled>Select link</option>');
                            for (var aa = 0; aa < Z.length; aa++) {
                                f("#wf_activity_url").append('<option data-type="' + Z[aa].TransactionalLink.id + '" value="' + Z[aa].TransactionalLink.id + '">' + Z[aa].TransactionalLink.url + "</option>")
                            }
                            f("#wf_activity_url").selectpicker("refresh");
                            f("#wf_activity_url_container").fadeIn(o);
                            Y();
                            b("SIDEBAR")
                        },
                        error: function (Z) {
                            b("SIDEBAR");
                            top.notifyError(l("Error occurred"));
                            X()
                        }
                    })
                })
            }

            function D(Z) {
                var X = 0;
                var Y = f("#condition_workflow_email_select_container");
                var aa = f("#condition_workflow_email_select");
                return new Promise(function (ac, ab) {
                    aa.html("").append('<option value="notSelected" disabled selected>' + lang.not_selected_campaign + "</option>");
                    f("#wf-step-" + Z).parentsUntil(".wf-step-trigger", "li").each(function (ae, ad) {
                        if (f(ad).data("emailTitle")) {
                            X++;
                            aa.append('<option value="' + f(ad).data("stepId") + '">' + f(ad).data("emailTitle") + "</option>")
                        }
                    });
                    if (X === 0) {
                        f("#condition_workflow_email_notice").fadeIn(o);
                        ab()
                    } else {
                        Y.fadeIn(o);
                        aa.selectpicker("refresh");
                        ac()
                    }
                })
            }

            function M(Z, X, Y) {
                return new Promise(function (ab, aa) {
                    f.ajax({
                        type: "POST",
                        dataType: "json",
                        url: appRoot + "workflows/reorderStep/",
                        data: {workflowId: workflowId, workflowStepId: Z, newPath: Y, newParent: X},
                        beforeSend: k("MAIN"),
                        success: function (ac) {
                            ab();
                            b("MAIN");
                            top.notifySuccess(l("Success!"))
                        },
                        error: function (ac) {
                            b("MAIN");
                            aa(ac)
                        }
                    })
                })
            }

            function w(Y, aa, X) {
                if (aa === undefined) {
                    aa = true
                }
                var ae = Y.data("stepId");
                var ag = false;
                var ac;
                var ak;
                var ab = Y.parent().closest("li").parent().closest("li").hasClass("sender-wf-condition");
                var af = Y.parent().closest("li").data("step-id");
                var Z = false;
                var ai = [];
                if (Y.hasClass("sender-wf-condition")) {
                    Z = true;
                    if (Y.closest("li").children("ul").children("li").children("ul").children("li").length !== 0) {
                        ac = Y.closest("li").children("ul").children("li").children("ul").children("li").data("stepId");
                        ag = true
                    }
                } else {
                    Z = false;
                    if (Y.closest("li").children("ul").children("li").length !== 0) {
                        ac = Y.closest("li").children("ul").children("li").data("stepId");
                        ag = true
                    }
                }
                if (aa && ag) {
                    Y.closest("li").addClass("ajax_delete_all");
                    ajax_delete_id = [];
                    ajax_delete_id.push(ae);
                    f(".ajax_delete_all li").each(function (al, am) {
                        ajax_delete_id.push(f(this).data("stepId"))
                    });
                    ai = ajax_delete_id.filter(function (al, am) {
                        return ajax_delete_id.indexOf(al) === am
                    })
                } else {
                    ai.push(ae)
                }
                var aj = f("#wf-step-" + af).find(">ul");
                var ad = f("#wf-step-" + ac);
                if (Z && X !== undefined) {
                    if (X) {
                        ad = Y.children("ul").children(".sender-wf-condition-yes").first().children("ul").children("li");
                        w(Y.children("ul").children(".sender-wf-condition-no").first().children("ul").children("li"), true)
                    } else {
                        ad = Y.children("ul").children(".sender-wf-condition-no").first().children("ul").children("li");
                        w(Y.children("ul").children(".sender-wf-condition-yes").first().children("ul").children("li"), true)
                    }
                }
                var ah = true;
                if (ab) {
                    aj = Y.parent().parent().find(">ul");
                    if (Y.parent().parent().data("conditionPath") === "TRUE") {
                        ah = true
                    } else {
                        ah = false
                    }
                }
                if (ad.length < 1 && !aa) {
                    return
                }
                swal.close();
                return new Promise(function (am, al) {
                    f.ajax({
                        type: "POST",
                        dataType: "json",
                        url: appRoot + "workflows/removeStep/",
                        data: {deleteList: ai},
                        beforeSend: k("MAIN"),
                        success: function (an) {
                            if (!aa && ac) {
                                Y.addClass("no-before").find(">div").animate({opacity: 0}, 100);
                                Y.animate({
                                    "margin-top": "-" + (Y.find(">div").height() + 90) + "px",
                                    "z-index": 0,
                                    ease: true
                                }, 500, function () {
                                    aj.append(ad);
                                    Y.remove();
                                    r()
                                });
                                M(ad.data("stepId"), af, ah)
                            } else {
                                Y.find(">div").animate({opacity: 0}, 100);
                                Y.addClass("no-before").animate({
                                    opacity: 0,
                                    ease: true,
                                    "margin-top": "200px",
                                    "z-index": 0
                                }, 500, function () {
                                    Y.remove();
                                    r()
                                })
                            }
                            n();
                            top.notifySuccess(l("Success!"));
                            f("#step-editor").fadeOut(o);
                            b("MAIN");
                            am()
                        },
                        error: function (an) {
                            al();
                            b("MAIN");
                            top.notifyError(l("Error occurred"))
                        }
                    })
                });
                return
            }

            function r() {
                var af = 0;
                var ai = 0;
                var ae = 0;
                var ag = 0;
                var ab = 0;
                var X = 0;
                var Y = 0;
                var ak = 0;
                var ac = 0;
                var aa = 0;
                var ad = 0;
                var aj = 0;
                f(".wf_builder").find(".step-div").each(function (am, al) {
                    af++;
                    if (f(al).hasClass("wf-step-incomplete")) {
                        ai++;
                        switch (f(al).parent().data("stepType")) {
                            case"TRIGGER":
                                ae++;
                                break;
                            case"DELAY":
                                ag++;
                                break;
                            case"ACTION":
                                ab++;
                                break;
                            case"EMAIL":
                                X++;
                                break;
                            case"CONDITION":
                                Y++;
                                break
                        }
                    } else {
                        switch (f(al).parent().data("stepType")) {
                            case"TRIGGER":
                                ak++;
                                break;
                            case"DELAY":
                                ac++;
                                break;
                            case"ACTION":
                                aa++;
                                break;
                            case"EMAIL":
                                ad++;
                                break;
                            case"CONDITION":
                                aj++;
                                break
                        }
                    }
                });
                if (ae > 0) {
                    f("#incomplete_trigger").fadeIn(o)
                } else {
                    f("#incomplete_trigger").fadeOut(o)
                }
                if (ag > 0) {
                    f("#incomplete_delay").fadeIn(o).find("strong").text(ag)
                } else {
                    f("#incomplete_delay").fadeOut(o)
                }
                if (ab > 0) {
                    f("#incomplete_action").fadeIn(o).find("strong").text(ab)
                } else {
                    f("#incomplete_action").fadeOut(o)
                }
                if (X > 0) {
                    f("#incomplete_email").fadeIn(o).find("strong").text(X)
                } else {
                    f("#incomplete_email").fadeOut(o)
                }
                if (Y > 0) {
                    f("#incomplete_condition").fadeIn(o).find("strong").text(Y)
                } else {
                    f("#incomplete_condition").fadeOut(o)
                }
                a = af;
                c = ai;
                f("#completion_numbers").text((a - c) + "/" + a);
                var ah = (a - c) / a * 100;
                f(".completion_progress").css("width", ah + "%");
                f("#no_action").hide();
                if ((ad < 1 && X < 1) && (aa < 1 && ab < 1)) {
                    if (ai === 0) {
                        console.log(ai);
                        c++;
                        f("#no_action").fadeIn("slow");
                        f(".completion_progress").removeClass("bgm-teal").addClass("bgm-red")
                    } else {
                        f(".completion_progress").removeClass("bgm-red").addClass("bgm-teal")
                    }
                } else {
                    f("#no_action").fadeOut("slow");
                    f(".completion_progress").removeClass("bgm-deeporange").addClass("bgm-teal")
                }
                var Z = "fast";
                if (c > 0) {
                    f("#wf_activation").slideUp(Z, function (al) {
                        f("#wf_completion_container").slideDown(Z)
                    });
                    return false
                } else {
                    H();
                    f("#wf_completion_container").slideUp(Z, function (al) {
                        f("#wf_activation").slideDown(Z)
                    });
                    return true
                }
            }

            function I(Y, X, Z) {
                if (X === undefined) {
                    X = false
                }
                if (Z === undefined) {
                    Z = true
                }
                if (!Y || Y === undefined) {
                    firstIncomplete = f(".overflow").find(".wf-step-incomplete").first().closest("li")
                } else {
                    firstIncomplete = f(".wf-step-" + Y + ".wf-step-incomplete").first().parent()
                }
                if (X) {
                    f(".overflow-container").stop().animate({
                        queue: false,
                        scrollLeft: firstIncomplete.find(">div").offset()["left"] - f(".overflow").offset()["left"] - 600,
                        scrollTop: firstIncomplete.find(">div").offset()["top"] - f(".overflow").offset()["top"] - 200
                    }, 1000)
                }
                if (Z) {
                    N(firstIncomplete.data("stepId"))
                }
            }

            function L() {
                return new Promise(function (Y, X) {
                    f.ajax({
                        type: "POST",
                        dataType: "json",
                        url: appRoot + "workflows/activateWorkflow/",
                        beforeSend: k("MAIN"),
                        data: {workflowId: workflowId},
                        success: function (Z) {
                            Y();
                            window.location = appRoot + "workflows"
                        },
                        error: function (Z) {
                            X(Z);
                            b("MAIN")
                        }
                    })
                })
            }

            function T(Z) {
                var ab = Z.data("stepId");
                var aa = 0;
                var X = false;
                var Y = Z.find("li.sender-wf-step > div.wf-step-CONDITION:not(.wf-step-incomplete)").sort(function (ad, ac) {
                    return f(ad).parents().length > f(ac).parents().length
                }).each(function (ad, ac) {
                    if (ab === f(ac).parent().data("wfEmailId")) {
                        X = true;
                        aa = f(ac).parent().data("stepId");
                        return false
                    }
                });
                if (X) {
                    swal.fire({
                        title: lang.email_in_use_modal_title,
                        type: "info",
                        html: '<div class = "swal2-custom-label-div"><label class = "swal2-custom-label">' + lang.email_in_use_modal_text + "</label></div> ",
                        confirmButtonText: lang.email_in_use_modal_confirm,
                        confirmButtonClass: "btn-success waves-effect ",
                        showCloseButton: true,
                        buttonsStyling: false,
                        focusCancel: true,
                        showCancelButton: false,
                        allowOutsideClick: true
                    }).then(function (ac) {
                        if (ac.value) {
                            N(aa, true)
                        }
                    });
                    return true
                } else {
                    return false
                }
            }

            function H() {
                f.ajax({
                    type: "POST",
                    dataType: "json",
                    url: appRoot + "workflows/delete_warning_session/",
                    data: {workflowId: workflowId},
                    success: function (X) {
                        if (X.status = "success") {
                            f("#workflow_template_warning").remove()
                        } else {
                            console.log(X.message)
                        }
                    },
                    error: function (X) {
                        console.log(X)
                    }
                })
            }

            f("input, textarea").keypress(function (X) {
                d = true
            });
            f(".overflow-container").on("click", function (X) {
                if (d) {
                    f("#step-editor").fadeOut(o);
                    W()
                }
                if (!f(X.target).hasClass("delete_action")) {
                    f("#step-editor").fadeOut(o);
                    f(".wf-step-infocus").removeClass("wf-step-infocus")
                }
                if (!f(X.target).hasClass("add_action")) {
                    f(".overflow .step-add-popover").remove();
                    f(".overflow .popover-open").removeClass("popover-open")
                }
                if (windowWidth < mobileBreakPoint) {
                    showSidebar(false)
                }
            });
            f("#trigger_type").on("change", function (X) {
                E()
            });
            f("#trigger_list_select").on("change", function (Y) {
                var X = f("#trigger_type option:selected").val();
                f("#trigger_comparison_date_operator_container").hide();
                f("#trigger_delay_container").hide();
                if (X === "DATE_MATCH" || X === "DATE_ANNIVERSARY") {
                    U(null, "trigger").then(function (Z) {
                        f("#trigger_custom_field_select_container").fadeIn(o)
                    })
                }
            });
            f("#trigger_custom_field_select_container").find("select").on("change", function (X) {
                f("#trigger_comparison_date_operator_container").fadeIn(o);
                f("#trigger_send_time").data("DateTimePicker").format("HH:mm");
                f("#trigger_send_time_container").fadeIn(o)
            });
            f("#trigger_comparison_date_operator").on("change", function (Y) {
                var X = f("#trigger_comparison_date_operator option:selected").val();
                f("#trigger_delay_container").hide();
                if (X === "Before" || X === "After") {
                    f("#trigger_delay_container").fadeIn(o);
                    f("#advance-label").html(f("#before-label-text").html());
                    if (X === "After") {
                        f("#advance-label").html(f("#advance-label-text").html())
                    }
                }
            });
            f("select").on("hidden.bs.select", function (X) {
                d = true
            });
            f("select").on("show.bs.select", function (X) {
                f(".builder-sidebar").mCustomScrollbar("scrollTo", f(this).parent())
            });
            f("select").on("change", function (X) {
                f("#trigger_notice_container").fadeOut(o);
                f(".help-block").each(function (Y) {
                    f(this).remove()
                })
            });
            f("#condition_comparisons_container select").on("change", function (X) {
                if (f(X.currentTarget).val() === "isProvided" || f(X.currentTarget).val() === "isTrue" || f(X.currentTarget).val() === "isFalse") {
                    f("#condition_comparison_values_container").fadeOut(o);
                    f("#condition_comparison_value").val("");
                    f("#condition_comparison_time_value").val("")
                } else {
                    f("#condition_comparison_values_container").fadeIn(o)
                }
            });
            f("#saveStep").click(function (X) {
                X.preventDefault();
                W()
            });
            f("#step-editor").keypress(function (Y) {
                var X = Y.which;
                if (X === 13) {
                    Y.preventDefault();
                    W()
                }
            });
            f("#condition_campaign_select").on("change", function (X) {
                f("#condition_activity_type_container").fadeIn(o);
                f("#condition_activity_type_select").val("").selectpicker("refresh");
                f("#condition_link_open_container").hide();
                f("#condition_open_notice_container").hide()
            });
            f("#condition_activity_type_select").on("change", function (X) {
                if (f("#condition_activity_type_select option:selected").val() == "linkClicked") {
                    F()
                } else {
                    f("#condition_open_notice_container").fadeOut(o);
                    f("#condition_link_open_container").fadeOut(o)
                }
            });
            f("#condition_workflow_email_select").on("change", function (X) {
                f("#condition_wf_email_activity_container").fadeIn(o);
                f("#condition_wf_email_activity_container").find("select").val("").selectpicker("refresh");
                f("#wf_activity_url_container").hide();
                f("#condition_workflow_email_notice").hide()
            });
            f("#condition_wf_email_activity_select").on("change", function (X) {
                if (f("#condition_wf_email_activity_select option:selected").val() == "linkClicked") {
                    t()
                } else {
                    f("#wf_activity_url_container").fadeOut(o);
                    f("#condition_workflow_email_notice").fadeOut(o)
                }
            });
            f("#action_type").on("change", function (X) {
                R()
            });
            f("#action_list_select").on("change", function (X) {
                if (f("#action_type option:selected").val() == "updateCustomfield") {
                    U(null, "action").then(function (Y) {
                        f("#action_custom_field_value_container").fadeIn("")
                    })
                }
            });
            f("#condition_custom_field_select").on("change", function (Y) {
                var X = f(this).find("option:selected").data("type");
                switch (X) {
                    case"INT":
                        p("INT", "condition_");
                        break;
                    case"TEXT":
                        p("TEXT", "condition_");
                        break;
                    case"DATE":
                        p("DATE", "condition_");
                        break;
                    case"BOOLEAN":
                        p("BOOLEAN", "condition_");
                        break
                }
            });
            f("#action_custom_field_select").on("change", function (Y) {
                var X = f(this).find("option:selected").data("type");
                switch (X) {
                    case"INT":
                        p("INT", "action_", "hideComparisonOperator");
                        break;
                    case"TEXT":
                        p("TEXT", "action_", "hideComparisonOperator");
                        break;
                    case"DATE":
                        p("DATE", "action_", "hideComparisonOperator");
                        break;
                    case"BOOLEAN":
                        p("BOOLEAN", "action_", "hideComparisonOperator");
                        break
                }
            });
            f("#condition_type").on("change", function (X) {
                Q();
                if (f("#condition_type option:selected").val() == "workflowEmail") {
                    f("#wf_email_notice_container").fadeIn(o)
                }
            });
            f("#condition_list_select").on("change", function (X) {
                if (f("#condition_type option:selected").val() == "customFields") {
                    p("HIDE", "condition_");
                    U(null, "condition")
                }
            });
            f("#abandoned_cart_select").on("change", function (Y) {
                var X = f("#abandoned_cart_select option:selected").val();
                p("HIDE", "condition_");
                f("#product_sku_container").fadeOut(o);
                switch (X) {
                    case"cartAmount":
                        p("INT", "condition_");
                        break;
                    case"cartContains":
                        f("#product_sku_container").fadeIn(o);
                        break
                }
            });
            f("#product_purchased_select").on("change", function (Y) {
                var X = f("#product_purchased_select option:selected").val();
                f("#product_sku_container").hide();
                f("#product_purchased_date_container").hide();
                f("#condition_purchase_date_comparison_container").hide();
                switch (X) {
                    case"any":
                        break;
                    case"specific":
                        f("#product_sku_container").fadeIn(o);
                        break;
                    case"purchaseDate":
                        f("#product_purchased_date").data("DateTimePicker").format("Y-M-D");
                        f("#condition_purchase_date_comparison_container").fadeIn(o);
                        f("#product_purchased_date_container").fadeIn(o);
                        break
                }
            });
            f("#completion_links a").on("click", function (X) {
                I(f(X.currentTarget).data().type, true)
            });
            f(document).on("click", ".step-div", function (X) {
                if (f(X.target).hasClass("zmdi") || f(X.target).hasClass("delete_action") || f(X.target).hasClass("add_action")) {
                    return
                }
                var Y = f(X.currentTarget).parent().data("stepId");
                N(Y)
            });
            f(".toggle-switch").on("change", function (X) {
                if (g) {
                    X.preventDefault();
                    return false
                }
                if (c === 0) {
                    L()
                }
            });
            f("#wf_title").find("h2").on("click", function (X) {
                f("#wf_title_h2").hide();
                f("#wf_title_input").fadeIn()
            });
            f("#wf_title_update").on("click", function (X) {
                f(this).parent().parent().hide();
                f("#wf_title_h2").find("span").text(f("#wf_title_input").find("input").val());
                f("#wf_title_h2").fadeIn();
                f.ajax({
                    type: "POST",
                    dataType: "json",
                    url: appRoot + "workflows/rename",
                    data: {Workflow: {id: workflowId, title: f("#wf_title_input").find("input").val()}},
                    success: function (Y) {
                        f(".heading-main").text(f("#wf_title_input").find("input").val())
                    },
                    error: function (Y) {
                        console.log(Y)
                    }
                })
            });
            var q = true;
            f("#wf_completion_info").on("click", function (X) {
                q = !q;
                if (q) {
                    f("#wf-expand-icon").css({
                        "-webkit-transform": "rotate(0deg)",
                        "-moz-transform": "rotate(0deg)",
                        "-ms-transform": "rotate(0deg)",
                        "-o-transform": "rotate(0deg)",
                        transform: "rotate(0deg)"
                    })
                } else {
                    f("#wf-expand-icon").css({
                        "-webkit-transform": "rotate(180deg)",
                        "-moz-transform": "rotate(180deg)",
                        "-ms-transform": "rotate(180deg)",
                        "-o-transform": "rotate(180deg)",
                        transform: "rotate(180deg)"
                    })
                }
                f("#completion_info").slideToggle("fast", function (Y) {
                })
            });
            f(document).on("mouseenter mouseleave", "." + P + " li:not(.sender-wf-condition-yes):not(.sender-wf-condition-no) > div", function (X) {
                if (f(X.target).hasClass("add_action")) {
                    return
                }
                if (X.type == "mouseenter") {
                    f(this).children("span.delete_action, span.edit_action").show();
                    f(this).addClass("wf-current-step");
                    f("." + P + " li > div.children").removeClass("children");
                    f("." + P + " li > div.parent").removeClass("parent");
                    f(this).closest("li").children("ul").children("li").children("div").addClass("children");
                    f(this).closest("li").closest("ul").closest("li").children("div").addClass("parent")
                } else {
                    f(this).children("span.delete_action, span.edit_action").hide();
                    f("." + P + " .wf-current-step").removeClass("wf-current-step")
                }
            });
            f(document).on("click", "." + P + " span.add_action", function (Z) {
                Z.stopPropagation();
                var X = f(this);
                f(".overflow .step-add-popover").remove();
                if (X.hasClass("popover-open")) {
                    X.removeClass("popover-open");
                    return
                }
                f(".overflow .popover-open").removeClass("popover-open");
                X.addClass("popover-open");
                var aa = X.closest("li").children("ul").children("li").data("stepId");
                var ab = true;
                s(X);
                X.append(f("#step-add-popover-template").html());
                var Y = f(".overflow .step-add-popover");
                Y.addClass("step-add-popover-visible");
                f(".step-add-popover .builder-add").on("mouseenter", function () {
                    f(".step-add-popover .builder-description").addClass("hidden");
                    f(".step-add-popover #builder-description-" + f(this).data("type")).removeClass("hidden")
                });
                f(".step-add-popover .builder-add").on("mouseleave", function () {
                    f(".step-add-popover .builder-description").addClass("hidden");
                    f(".step-add-popover #builder-description-default").removeClass("hidden")
                });
                f(".step-add-popover #builder-add-condition").on("click", function (ac) {
                    if (aa) {
                        var ad = f("#condition-add-modal").html();
                        swal.fire({
                            title: lang.condition_add_modal_title,
                            type: "question",
                            html: ad,
                            showCloseButton: true,
                            showConfirmButton: false,
                            showCancelButton: false
                        });
                        f(".swal2-content #builder-condition-add div").on("click", function (ae) {
                            switch (f(ae.currentTarget).data().value) {
                                case"YES_PATH":
                                    ab = true;
                                    break;
                                case"NO_PATH":
                                    ab = false;
                                    break
                            }
                            J("CONDITION", X, aa, ab);
                            f(".overflow .step-add-popover").remove();
                            X.removeClass("popover-open")
                        })
                    } else {
                        J("CONDITION", X, aa);
                        f(".overflow .step-add-popover").remove();
                        X.removeClass("popover-open")
                    }
                });
                f(".step-add-popover #builder-add-delay").on("click", function (ac) {
                    J("DELAY", X, aa);
                    f(".overflow .step-add-popover").remove();
                    X.removeClass("popover-open")
                });
                f(".step-add-popover #builder-add-email").on("click", function (ac) {
                    J("EMAIL", X, aa);
                    f(".overflow .step-add-popover").remove();
                    X.removeClass("popover-open")
                });
                f(".step-add-popover #builder-add-action").on("click", function (ac) {
                    J("ACTION", X, aa);
                    f(".overflow .step-add-popover").remove();
                    X.removeClass("popover-open")
                });
                return
            });
            f(document).on("click", "." + P + " span.delete_action", function () {
                var X = f(this).closest("li");
                var Y = false;
                var aa;
                if (X.find(">div").hasClass("wf-step-EMAIL") && T(X)) {
                    return
                }
                if (X.hasClass("sender-wf-condition")) {
                    aa = true;
                    if (X.closest("li").children("ul").children("li").children("ul").children("li").length !== 0) {
                        Y = true
                    }
                } else {
                    aa = false;
                    if (X.closest("li").children("ul").children("li").length !== 0) {
                        Y = true
                    }
                }
                if (Y) {
                    var Z = f("#delete-step-modal").html();
                    swal.fire({
                        title: lang.delete_step_modal_title,
                        type: "warning",
                        html: Z,
                        showCloseButton: true,
                        showConfirmButton: false,
                        showCancelButton: false
                    });
                    f("#builder-step-delete-action div").on("click", function (ab) {
                        switch (f(ab.currentTarget).data().value) {
                            case"DELETE_ALL":
                                w(X, true);
                                return;
                                break;
                            case"DELETE_ONE":
                                if (aa) {
                                    if (X.children("ul").children(".sender-wf-condition-yes").first().children("ul").children("li").length < 1) {
                                        w(X, false, false);
                                        return
                                    } else {
                                        if (X.children("ul").children(".sender-wf-condition-no").first().children("ul").children("li").length < 1) {
                                            w(X, false, true);
                                            return
                                        }
                                    }
                                    var ac = f("#delete-step-keep-path-modal").html();
                                    swal.fire({
                                        title: lang.delete_step_keep_path_modal_title,
                                        type: "question",
                                        html: ac,
                                        showCloseButton: true,
                                        showConfirmButton: false,
                                        showCancelButton: false
                                    });
                                    f("#builder-step-keep-path div").on("click", function (ad) {
                                        switch (f(ad.currentTarget).data().value) {
                                            case"YES_PATH":
                                                w(X, false, true);
                                                return;
                                                break;
                                            case"NO_PATH":
                                                w(X, false, false);
                                                return;
                                                break
                                        }
                                    })
                                } else {
                                    w(X, false);
                                    return
                                }
                                break
                        }
                    })
                } else {
                    swal.fire({
                        title: lang.delete_one_step_modal_title,
                        type: "warning",
                        confirmButtonText: lang.delete_one_step_modal_confirm,
                        confirmButtonClass: "btn-danger waves-effect",
                        html: '<div class = "swal2-custom-label-div"><label class = "swal2-custom-label">THIS ACTION WILL REMOVE STEP FROM WORKFLOW</label></div> ',
                        cancelButtonClass: "btn-secondary waves-effect",
                        showCloseButton: true,
                        buttonsStyling: false,
                        focusCancel: true,
                        showCancelButton: true,
                        allowOutsideClick: true
                    }).then(function (ab) {
                        if (ab.value) {
                            w(X, true)
                        }
                    })
                }
            });

            function z() {
                V();
                f("." + P + " li.sender-wf-draggable").draggable({
                    cursor: "move",
                    cursorAt: {top: 5},
                    distance: 50,
                    zIndex: 5,
                    scroll: true,
                    revert: true,
                    revertDuration: 100,
                    start: function (X, Y) {
                        f(this).find("div").addClass("wf-step-infocus");
                        f(".sender-wf-accept-drop").addClass("sender-wf-drop-target");
                        f(this).parent().parent().find(">div").removeClass("sender-wf-drop-target");
                        f(this).find(".sender-wf-accept-drop").removeClass("sender-wf-drop-target")
                    },
                    stop: function (X, Y) {
                        f(this).find("div").removeClass("wf-step-infocus");
                        f(".sender-wf-accept-drop").removeClass("sender-wf-drop-target");
                        f(this).parent().parent().find(">div").removeClass("sender-wf-drop-target");
                        V()
                    }
                })
            }

            function V() {
                f("." + P + " li > div.sender-wf-accept-drop").droppable({
                    accept: "." + P + " li", tolerance: "pointer", hoverClass: "pulse", drop: function (Y, Z) {
                        var X = this;
                        if (f(Z.draggable[0]).data("stepId") === f(this).next("ul").children("li").data("stepId")) {
                            return
                        }
                        if (f(this).next("ul").find("li").length > 0) {
                            swal.fire({
                                title: lang.drop_step_on_parent_modal_title,
                                text: lang.drop_step_on_parent_modal_text,
                                type: "warning",
                                html: '<div class = "swal2-custom-label-div"><label class = "swal2-custom-label">' + lang.drop_step_on_parent_modal_text + "</label></div> ",
                                confirmButtonText: lang.drop_step_on_parent_modal_confirm,
                                confirmButtonClass: "btn-danger waves-effect",
                                cancelButtonClass: "btn-secondary  waves-effect",
                                buttonsStyling: false,
                                focusCancel: true,
                                showCancelButton: true,
                                showCloseButton: true,
                                allowOutsideClick: false
                            }).then(function (aa) {
                                if (aa.value) {
                                    var ab = f(X).next("ul").children("li");
                                    f(X).next("ul").append(f(Z.draggable[0]).attr({style: ""}));
                                    M(f(Z.draggable[0]).data("stepId"), f(X).parent().data("stepId"), f(X).parent().data("conditionPath")).then(function (ac) {
                                    });
                                    w(ab, true).then(function (ac) {
                                    })
                                }
                            })
                        } else {
                            f(this).next("ul").append(f(Z.draggable[0]).attr({style: ""}));
                            _draggedId = f(Z.draggable[0]).data("stepId");
                            _newParentId = f(this).closest("li").data("stepId");
                            _newPath = f(this).closest("li").data("conditionPath");
                            M(_draggedId, _newParentId, _newPath);
                            z()
                        }
                        n()
                    }
                })
            }

            z();
            if (lastStep) {
                N(lastStep)
            }
            if (g) {
                N(g)
            }
            n();
            r();
            f("#completion_info").slideToggle("fast")
        })
    };
    f.fn.initReports = function () {
        return this.each(function () {
            var q = false;

            function p(t, s) {
                if (q) {
                    return
                }
                if (windowWidth < mobileBreakPoint) {
                    showSidebar(true)
                }
                q = true;
                f.ajax({
                    type: "POST",
                    dataType: "json",
                    url: appRoot + "workflows/getStepReport/",
                    beforeSend: k("SIDEBAR"),
                    data: {stepId: t},
                    success: function (w) {
                        q = false;
                        if (w.error) {
                            top.notifyError(l("Error occurred"));
                            return
                        }
                        if (w.emailReport && !s) {
                            if (w.emailReport.sent !== 0) {
                                var v = f(".wf-email-report-template").html();
                                v = v.replace("{campaignId}", w.emailReport.transactionalCampaignId);
                                v = v.replace("{emailSent}", w.emailReport.sent);
                                v = v.replace("{numOpened}", w.emailReport.opens);
                                v = v.replace("{openPercent}", w.emailReport.opensPercent);
                                v = v.replace("{numClicked}", w.emailReport.unique_clicks);
                                v = v.replace("{clickPercent}", w.emailReport.clicksPercent);
                                v = v.replace("{numBounced}", w.emailReport.bounces);
                                v = v.replace("{bouncedPercent}", w.emailReport.bouncesPercent);
                                v = v.replace("{unsubPercent}", w.emailReport.unsubscribePercent);
                                f("#wf_reports").append(v);
                                f("#view_detailed").attr("href", appRoot + "transactional_campaigns/view/" + w.emailReport.transactionalCampaignId);
                                f("#view_content").attr("href", appRoot + "transactional_campaigns/preview/" + w.emailReport.transactionalCampaignId);
                                f(".open_link").attr("href", appRoot + "transactional_campaigns/opens/" + w.emailReport.transactionalCampaignId);
                                f(".click_link").attr("href", appRoot + "transactional_campaigns/link_clicks/" + w.emailReport.transactionalCampaignId);
                                f(".bounce_link").attr("href", appRoot + "transactional_campaigns/bounces/" + w.emailReport.transactionalCampaignId);
                                f(".unsubscribes_link").attr("href", appRoot + "transactional_campaigns/unsubscribes/" + w.emailReport.transactionalCampaignId);
                                if (w.emailReport.sentToRecipients) {
                                    var u = f(".wf-sent-to-recipients").html();
                                    u = u.replace("{subsReceived}", w.emailReport.sentToRecipients.length);
                                    f("#wf_reports").append(u);
                                    var B = 0;
                                    w.emailReport.sentToRecipients.forEach(function (D, C) {
                                        B++;
                                        if (D.TransactionalRecipient.email_address.length > 25) {
                                            emailAdress = D.TransactionalRecipient.email_address.slice(0, 25 - D.TransactionalRecipient.email_address.length) + "..."
                                        } else {
                                            emailAdress = D.TransactionalRecipient.email_address
                                        }
                                        f(".wf_emails_sent-table").first().append('<tr class=""><td class="p-l-0 p-r-0 text-left">' + emailAdress + '</td><td class="p-r-0 p-l-0 text-right">' + D.TransactionalEmail.timestamp + "</td></tr>")
                                    });
                                    if (B === 10) {
                                        f(".wf_emails_sent-table").first().append("<tr><td>...</td><td>...</td></tr>")
                                    }
                                }
                            } else {
                                var y = f(".wf-no-report").html();
                                f("#wf_reports").append(y)
                            }
                        } else {
                            if (!w.subscribersWaiting || (w.subscribersWaiting && !s)) {
                            }
                        }
                        if (w.subscribersWaiting && s) {
                            var A = f(".wf-users-in-step").html();
                            A = A.replace("{waitingSubs}", w.subscribersWaitingCount);
                            f("#wf_reports").append(A);
                            for (var z = 0; z < w.subscribersWaiting.length; z++) {
                                f(".wf_report_waiting_table").first().append('<tr><td class="dont-break-out">' + w.subscribersWaiting[z].email + "</td><td>" + w.subscribersWaiting[z].wait_until + "</td></tr>")
                            }
                        }
                        f("#wf_reports").addClass("animated bounceInLeft").fadeIn(o, function () {
                            if (w.emailReport) {
                                f(".report_bounces").first().find(".progress-bar").css("width", w.emailReport.bouncesPercent + "%");
                                f(".report_opens").first().find(".progress-bar").css("width", w.emailReport.opensPercent + "%");
                                f(".report_clicks").first().find(".progress-bar").css("width", w.emailReport.clicksPercent + "%");
                                f(".report_unsub").first().find(".progress-bar").css("width", w.emailReport.unsubscribePercent + "%")
                            }
                        });
                        b("SIDEBAR")
                    },
                    error: function (u) {
                        b("SIDEBAR");
                        top.notifyError(l("Error occurred"))
                    }
                })
            }

            function r() {
                if (q) {
                    return
                }
                q = true;
                f.ajax({
                    type: "POST",
                    dataType: "json",
                    url: appRoot + "workflows/getWorkflowReport/",
                    beforeSend: k("SIDEBAR"),
                    data: {workflowId: workflowId},
                    success: function (t) {
                        q = false;
                        if (t.error) {
                            top.notifyError(l("Error occurred"));
                            return
                        }
                        if (t.emailReport.finishedRecipients) {
                            f("#wf_done_recipients").html('<h4 class="m-0 m-b-15 wf-stats stat-title">' + finishedWorkflow + '</h4><h4><span style="font-size: 18px;">' + t.emailReport.finishedRecipients + ' <i class="zmdi zmdi-account"></i></span></h4>')
                        }
                        if (t.emailReport.sent) {
                            var s = f(".wf-email-summary-report-template").html();
                            s = s.replace("{campaignId}", t.emailReport.transactionalCampaignId);
                            s = s.replace("{emailSent}", t.emailReport.sent);
                            s = s.replace("{numOpened}", t.emailReport.opens);
                            s = s.replace("{openPercent}", t.emailReport.opensPercent);
                            s = s.replace("{numClicked}", t.emailReport.unique_clicks);
                            s = s.replace("{clickPercent}", t.emailReport.clicksPercent);
                            s = s.replace("{numBounced}", t.emailReport.bounces);
                            s = s.replace("{bouncedPercent}", t.emailReport.bouncesPercent);
                            s = s.replace("{unsubPercent}", t.emailReport.unsubscribePercent);
                            f("#wf_reports").append(s);
                            f(".open_link").attr("href", "#");
                            f(".click_link").attr("href", "#");
                            f(".bounce_link").attr("href", "#");
                            f(".unsubscribes_link").attr("href", "#");
                            f("#wf_reports").fadeIn(o, function () {
                                if (t.emailReport) {
                                    f(".report_bounces").first().find(".progress-bar").css("width", t.emailReport.bouncesPercent + "%");
                                    f(".report_opens").first().find(".progress-bar").css("width", t.emailReport.opensPercent + "%");
                                    f(".report_clicks").first().find(".progress-bar").css("width", t.emailReport.clicksPercent + "%");
                                    f(".report_unsub").first().find(".progress-bar").css("width", t.emailReport.unsubscribePercent + "%")
                                }
                            })
                        } else {
                            var u = f(".wf-no-report").html();
                            f("#wf_reports").append(u);
                            f("#wf_reports").fadeIn(o)
                        }
                        b("SIDEBAR")
                    },
                    error: function (s) {
                        b("SIDEBAR");
                        top.notifyError(l("Error occurred"))
                    }
                })
            }

            f(".overflow-container").on("click", function (s) {
                f("#wf_reports").fadeOut(o);
                f("#wf_reports .workflow-report-card").remove();
                f(".wf-step-infocus").removeClass("wf-step-infocus");
                if (f(s.target).hasClass("overflow-container")) {
                    r();
                    if (windowWidth < mobileBreakPoint) {
                        showSidebar(false)
                    }
                }
            });
            f(document).on("click", ".step-div", function (t) {
                if (q) {
                    t.preventDefault();
                    return
                }
                f(this).addClass("wf-step-infocus");
                var s = f(this).parents("li").data();
                switch (s.stepType) {
                    case"EMAIL":
                        p(s.stepId);
                    case"CONDITION":
                        p(s.stepId);
                    case"ACTION":
                        p(s.stepId);
                    case"DELAY":
                        var u = f("#wf-step-" + s.stepId).find("li.sender-wf-step").first().data("stepId");
                        if (u) {
                            p(f("#wf-step-" + s.stepId).find("li.sender-wf-step").first().data("stepId"), true)
                        } else {
                            p(s.stepId, true)
                        }
                        break;
                    default:
                        r();
                        if (windowWidth < mobileBreakPoint) {
                            showSidebar(true)
                        }
                        break
                }
            });
            f("#wf_activation").fadeIn(o);
            r();
            n()
        })
    }
})(jQuery);