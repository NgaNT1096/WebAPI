;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.jquery_mmenu_js = factory(root.jQuery);
    }
}(this, function (jQuery) {
    /*
     * jQuery mmenu v7.0.3
     * @requires jQuery 1.7.0 or later
     *
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     * www.frebsite.nl
     *
     * License: CC-BY-NC-4.0
     * http://creativecommons.org/licenses/by-nc/4.0/
     */
    ! function (e) {
        function t() {
            e[n].glbl || (l = {
                $wndw: e(window),
                $docu: e(document),
                $html: e("html"),
                $body: e("body")
            }, s = {}, a = {}, r = {}, e.each([s, a, r], function (e, t) {
                t.add = function (e) {
                    e = e.split(" ");
                    for (var n = 0, i = e.length; n < i; n++) t[e[n]] = t.mm(e[n])
                }
            }), s.mm = function (e) {
                return "mm-" + e
            }, s.add("wrapper menu panels panel nopanel navbar listview nolistview listitem btn hidden"), s.umm = function (e) {
                return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
            }, a.mm = function (e) {
                return "mm-" + e
            }, a.add("parent child title"), r.mm = function (e) {
                return e + ".mm"
            }, r.add("transitionend webkitTransitionEnd click scroll resize keydown mousedown mouseup touchstart touchmove touchend orientationchange"), e[n]._c = s, e[n]._d = a, e[n]._e = r, e[n].glbl = l)
        }
        var n = "mmenu",
            i = "7.0.3";
        if (!(e[n] && e[n].version > i)) {
            e[n] = function (e, t, n) {
                return this.$menu = e, this._api = ["bind", "getInstance", "initPanels", "openPanel", "closePanel", "closeAllPanels", "setSelected"], this.opts = t, this.conf = n, this.vars = {}, this.cbck = {}, this.mtch = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initHooks(), this._initWrappers(), this._initAddons(), this._initExtensions(), this._initMenu(), this._initPanels(), this._initOpened(), this._initAnchors(), this._initMatchMedia(), "function" == typeof this.___debug && this.___debug(), this
            }, e[n].version = i, e[n].uniqueId = 0, e[n].wrappers = {}, e[n].addons = {}, e[n].defaults = {
                hooks: {},
                extensions: [],
                wrappers: [],
                navbar: {
                    add: !0,
                    title: "Menu",
                    titleLink: "parent"
                },
                onClick: {
                    setSelected: !0
                },
                slidingSubmenus: !0
            }, e[n].configuration = {
                classNames: {
                    divider: "Divider",
                    inset: "Inset",
                    nolistview: "NoListview",
                    nopanel: "NoPanel",
                    panel: "Panel",
                    selected: "Selected",
                    spacer: "Spacer",
                    vertical: "Vertical"
                },
                clone: !1,
                openingInterval: 25,
                panelNodetype: "ul, ol, div",
                transitionDuration: 400
            }, e[n].prototype = {
                getInstance: function () {
                    return this
                },
                initPanels: function (e) {
                    this._initPanels(e)
                },
                openPanel: function (t, i) {
                    if (this.trigger("openPanel:before", t), t && t.length && (t.is("." + s.panel) || (t = t.closest("." + s.panel)), t.is("." + s.panel))) {
                        var r = this;
                        if ("boolean" != typeof i && (i = !0), t.parent("." + s.listitem + "_vertical").length) t.parents("." + s.listitem + "_vertical").addClass(s.listitem + "_opened").children("." + s.panel).removeClass(s.hidden), this.openPanel(t.parents("." + s.panel).not(function () {
                            return e(this).parent("." + s.listitem + "_vertical").length
                        }).first()), this.trigger("openPanel:start", t), this.trigger("openPanel:finish", t);
                        else {
                            if (t.hasClass(s.panel + "_opened")) return;
                            var l = this.$pnls.children("." + s.panel),
                                o = this.$pnls.children("." + s.panel + "_opened");
                            if (!e[n].support.csstransitions) return o.addClass(s.hidden).removeClass(s.panel + "_opened"), t.removeClass(s.hidden).addClass(s.panel + "_opened"), this.trigger("openPanel:start", t), void this.trigger("openPanel:finish", t);
                            l.not(t).removeClass(s.panel + "_opened-parent");
                            for (var d = t.data(a.parent); d;) d = d.closest("." + s.panel), d.parent("." + s.listitem + "_vertical").length || d.addClass(s.panel + "_opened-parent"), d = d.data(a.parent);
                            l.removeClass(s.panel + "_highest").not(o).not(t).addClass(s.hidden), t.removeClass(s.hidden);
                            var c = function () {
                                    o.removeClass(s.panel + "_opened"), t.addClass(s.panel + "_opened"), t.hasClass(s.panel + "_opened-parent") ? (o.addClass(s.panel + "_highest"), t.removeClass(s.panel + "_opened-parent")) : (o.addClass(s.panel + "_opened-parent"), t.addClass(s.panel + "_highest")), r.trigger("openPanel:start", t)
                                },
                                h = function () {
                                    o.removeClass(s.panel + "_highest").addClass(s.hidden), t.removeClass(s.panel + "_highest"), r.trigger("openPanel:finish", t)
                                };
                            i && !t.hasClass(s.panel + "_noanimation") ? setTimeout(function () {
                                r.__transitionend(t, function () {
                                    h()
                                }, r.conf.transitionDuration), c()
                            }, r.conf.openingInterval) : (c(), h())
                        }
                        this.trigger("openPanel:after", t)
                    }
                },
                closePanel: function (e) {
                    this.trigger("closePanel:before", e);
                    var t = e.parent();
                    t.hasClass(s.listitem + "_vertical") && (t.removeClass(s.listitem + "_opened"), e.addClass(s.hidden), this.trigger("closePanel", e)), this.trigger("closePanel:after", e)
                },
                closeAllPanels: function (e) {
                    this.trigger("closeAllPanels:before"), this.$pnls.find("." + s.listview).children().removeClass(s.listitem + "_selected").filter("." + s.listitem + "_vertical").removeClass(s.listitem + "_opened");
                    var t = this.$pnls.children("." + s.panel),
                        n = e && e.length ? e : t.first();
                    this.$pnls.children("." + s.panel).not(n).removeClass(s.panel + "_opened").removeClass(s.panel + "_opened-parent").removeClass(s.panel + "_highest").addClass(s.hidden), this.openPanel(n, !1), this.trigger("closeAllPanels:after")
                },
                togglePanel: function (e) {
                    var t = e.parent();
                    t.hasClass(s.listitem + "_vertical") && this[t.hasClass(s.listitem + "_opened") ? "closePanel" : "openPanel"](e)
                },
                setSelected: function (e) {
                    this.trigger("setSelected:before", e), this.$menu.find("." + s.listitem + "_selected").removeClass(s.listitem + "_selected"), e.addClass(s.listitem + "_selected"), this.trigger("setSelected:after", e)
                },
                bind: function (e, t) {
                    this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(t)
                },
                trigger: function () {
                    var e = this,
                        t = Array.prototype.slice.call(arguments),
                        n = t.shift();
                    if (this.cbck[n])
                        for (var i = 0, s = this.cbck[n].length; i < s; i++) this.cbck[n][i].apply(e, t)
                },
                matchMedia: function (e, t, n) {
                    var i = {
                        yes: t,
                        no: n
                    };
                    this.mtch[e] = this.mtch[e] || [], this.mtch[e].push(i)
                },
                _initHooks: function () {
                    for (var e in this.opts.hooks) this.bind(e, this.opts.hooks[e])
                },
                _initWrappers: function () {
                    this.trigger("initWrappers:before");
                    for (var t = 0; t < this.opts.wrappers.length; t++) {
                        var i = e[n].wrappers[this.opts.wrappers[t]];
                        "function" == typeof i && i.call(this)
                    }
                    this.trigger("initWrappers:after")
                },
                _initAddons: function () {
                    this.trigger("initAddons:before");
                    var t;
                    for (t in e[n].addons) e[n].addons[t].add.call(this), e[n].addons[t].add = function () {};
                    for (t in e[n].addons) e[n].addons[t].setup.call(this);
                    this.trigger("initAddons:after")
                },
                _initExtensions: function () {
                    this.trigger("initExtensions:before");
                    var e = this;
                    this.opts.extensions.constructor === Array && (this.opts.extensions = {
                        all: this.opts.extensions
                    });
                    for (var t in this.opts.extensions) this.opts.extensions[t] = this.opts.extensions[t].length ? s.menu + "_" + this.opts.extensions[t].join(" " + s.menu + "_") : "", this.opts.extensions[t] && ! function (t) {
                        e.matchMedia(t, function () {
                            this.$menu.addClass(this.opts.extensions[t])
                        }, function () {
                            this.$menu.removeClass(this.opts.extensions[t])
                        })
                    }(t);
                    this.trigger("initExtensions:after")
                },
                _initMenu: function () {
                    this.trigger("initMenu:before");
                    this.conf.clone && (this.$orig = this.$menu, this.$menu = this.$orig.clone(), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function () {
                        e(this).attr("id", s.mm(e(this).attr("id")))
                    })), this.$menu.attr("id", this.$menu.attr("id") || this.__getUniqueId()), this.$pnls = e('<div class="' + s.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu), this.$menu.addClass(s.menu).parent().addClass(s.wrapper), this.trigger("initMenu:after")
                },
                _initPanels: function (t) {
                    this.trigger("initPanels:before", t), t = t || this.$pnls.children(this.conf.panelNodetype);
                    var n = e(),
                        i = this,
                        a = function (t) {
                            t.filter(i.conf.panelNodetype).each(function (t) {
                                var r = i._initPanel(e(this));
                                if (r) {
                                    i._initNavbar(r), i._initListview(r), n = n.add(r);
                                    var l = r.children("." + s.listview).children("li").children(i.conf.panelNodeType).add(r.children("." + i.conf.classNames.panel));
                                    l.length && a(l)
                                }
                            })
                        };
                    a(t), this.trigger("initPanels:after", n)
                },
                _initPanel: function (e) {
                    this.trigger("initPanel:before", e);
                    if (e.hasClass(s.panel)) return e;
                    if (this.__refactorClass(e, this.conf.classNames.panel, s.panel), this.__refactorClass(e, this.conf.classNames.nopanel, s.nopanel), this.__refactorClass(e, this.conf.classNames.inset, s.listview + "_inset"), e.filter("." + s.listview + "_inset").addClass(s.nopanel), e.hasClass(s.nopanel)) return !1;
                    var t = e.hasClass(this.conf.classNames.vertical) || !this.opts.slidingSubmenus;
                    e.removeClass(this.conf.classNames.vertical);
                    var n = e.attr("id") || this.__getUniqueId();
                    e.is("ul, ol") && (e.removeAttr("id"), e.wrap("<div />"), e = e.parent()), e.attr("id", n), e.addClass(s.panel + " " + s.hidden);
                    var i = e.parent("li");
                    return t ? i.addClass(s.listitem + "_vertical") : e.appendTo(this.$pnls), i.length && (i.data(a.child, e), e.data(a.parent, i)), this.trigger("initPanel:after", e), e
                },
                _initNavbar: function (t) {
                    if (this.trigger("initNavbar:before", t), !t.children("." + s.navbar).length) {
                        var n = t.data(a.parent),
                            i = e('<div class="' + s.navbar + '" />'),
                            r = this.__getPanelTitle(t, this.opts.navbar.title),
                            l = "";
                        if (n && n.length) {
                            if (n.hasClass(s.listitem + "_vertical")) return;
                            if (n.parent().is("." + s.listview)) var o = n.children("a, span").not("." + s.btn + "_next");
                            else var o = n.closest("." + s.panel).find('a[href="#' + t.attr("id") + '"]');
                            o = o.first(), n = o.closest("." + s.panel);
                            var d = n.attr("id");
                            switch (r = this.__getPanelTitle(t, e("<span>" + o.text() + "</span>").text()), this.opts.navbar.titleLink) {
                                case "anchor":
                                    l = o.attr("href");
                                    break;
                                case "parent":
                                    l = "#" + d
                            }
                            i.append('<a class="' + s.btn + " " + s.btn + "_prev " + s.navbar + '__btn" href="#' + d + '" />')
                        } else if (!this.opts.navbar.title) return;
                        this.opts.navbar.add && t.addClass(s.panel + "_has-navbar"), i.append('<a class="' + s.navbar + '__title"' + (l.length ? ' href="' + l + '"' : "") + ">" + r + "</a>").prependTo(t), this.trigger("initNavbar:after", t)
                    }
                },
                _initListview: function (t) {
                    this.trigger("initListview:before", t);
                    var n = this.__childAddBack(t, "ul, ol");
                    this.__refactorClass(n, this.conf.classNames.nolistview, s.nolistview);
                    var i = n.not("." + s.nolistview).addClass(s.listview).children().addClass(s.listitem);
                    this.__refactorClass(i, this.conf.classNames.selected, s.listitem + "_selected"), this.__refactorClass(i, this.conf.classNames.divider, s.listitem + "_divider"), this.__refactorClass(i, this.conf.classNames.spacer, s.listitem + "_spacer");
                    var r = t.data(a.parent);
                    if (r && r.is("." + s.listitem) && !r.children("." + s.btn + "_next").length) {
                        var l = r.children("a, span").first(),
                            o = e('<a class="' + s.btn + '_next" href="#' + t.attr("id") + '" />').insertBefore(l);
                        l.is("span") && o.addClass(s.btn + "_fullwidth")
                    }
                    this.trigger("initListview:after", t)
                },
                _initOpened: function () {
                    this.trigger("initOpened:before");
                    var e = this.$pnls.find("." + s.listitem + "_selected").removeClass(s.listitem + "_selected").last().addClass(s.listitem + "_selected"),
                        t = e.length ? e.closest("." + s.panel) : this.$pnls.children("." + s.panel).first();
                    this.openPanel(t, !1), this.trigger("initOpened:after")
                },
                _initAnchors: function () {
                    this.trigger("initAnchors:before");
                    var t = this;
                    l.$body.on(r.click + "-oncanvas", "a[href]", function (i) {
                        var a = e(this),
                            r = a.attr("href"),
                            l = t.$menu.find(a).length,
                            o = a.is("." + s.listitem + " > a"),
                            d = a.is('[rel="external"]') || a.is('[target="_blank"]');
                        if (l && r.length > 1 && "#" == r.slice(0, 1)) try {
                            var c = t.$menu.find(r);
                            if (c.is("." + s.panel)) return t[a.parent().hasClass(s.listitem + "_vertical") ? "togglePanel" : "openPanel"](c), void i.preventDefault()
                        } catch (h) {}
                        var f = {
                            close: null,
                            setSelected: null,
                            preventDefault: "#" == r.slice(0, 1)
                        };
                        for (var p in e[n].addons) {
                            var u = e[n].addons[p].clickAnchor.call(t, a, l, o, d);
                            if (u) {
                                if ("boolean" == typeof u) return void i.preventDefault();
                                "object" == typeof u && (f = e.extend({}, f, u))
                            }
                        }
                        l && o && !d && (t.__valueOrFn(a, t.opts.onClick.setSelected, f.setSelected) && t.setSelected(e(i.target).parent()), t.__valueOrFn(a, t.opts.onClick.preventDefault, f.preventDefault) && i.preventDefault(), t.__valueOrFn(a, t.opts.onClick.close, f.close) && t.opts.offCanvas && "function" == typeof t.close && t.close())
                    }), this.trigger("initAnchors:after")
                },
                _initMatchMedia: function () {
                    var e = this;
                    for (var t in this.mtch) ! function () {
                        var n = t,
                            i = window.matchMedia(n);
                        e._fireMatchMedia(n, i), i.addListener(function (t) {
                            e._fireMatchMedia(n, t)
                        })
                    }()
                },
                _fireMatchMedia: function (e, t) {
                    for (var n = t.matches ? "yes" : "no", i = 0; i < this.mtch[e].length; i++) this.mtch[e][i][n].call(this)
                },
                _getOriginalMenuId: function () {
                    var e = this.$menu.attr("id");
                    return this.conf.clone && e && e.length && (e = s.umm(e)), e
                },
                __api: function () {
                    var t = this,
                        n = {};
                    return e.each(this._api, function (e) {
                        var i = this;
                        n[i] = function () {
                            var e = t[i].apply(t, arguments);
                            return "undefined" == typeof e ? n : e
                        }
                    }), n
                },
                __valueOrFn: function (e, t, n) {
                    if ("function" == typeof t) {
                        var i = t.call(e[0]);
                        if ("undefined" != typeof i) return i
                    }
                    return "function" != typeof t && "undefined" != typeof t || "undefined" == typeof n ? t : n
                },
                __getPanelTitle: function (t, i) {
                    var s;
                    return "function" == typeof this.opts.navbar.title && (s = this.opts.navbar.title.call(t[0])), "undefined" == typeof s && (s = t.data(a.title)), "undefined" != typeof s ? s : "string" == typeof i ? e[n].i18n(i) : e[n].i18n(e[n].defaults.navbar.title)
                },
                __refactorClass: function (e, t, n) {
                    return e.filter("." + t).removeClass(t).addClass(n)
                },
                __findAddBack: function (e, t) {
                    return e.find(t).add(e.filter(t))
                },
                __childAddBack: function (e, t) {
                    return e.children(t).add(e.filter(t))
                },
                __filterListItems: function (e) {
                    return e.not("." + s.listitem + "_divider").not("." + s.hidden)
                },
                __filterListItemAnchors: function (e) {
                    return this.__filterListItems(e).children("a").not("." + s.btn + "_next")
                },
                __openPanelWoAnimation: function (e) {
                    e.hasClass(s.panel + "_noanimation") || (e.addClass(s.panel + "_noanimation"), this.__transitionend(e, function () {
                        e.removeClass(s.panel + "_noanimation")
                    }, this.conf.openingInterval), this.openPanel(e))
                },
                __transitionend: function (e, t, n) {
                    var i = !1,
                        s = function (n) {
                            "undefined" != typeof n && n.target != e[0] || (i || (e.off(r.transitionend), e.off(r.webkitTransitionEnd), t.call(e[0])), i = !0)
                        };
                    e.on(r.transitionend, s), e.on(r.webkitTransitionEnd, s), setTimeout(s, 1.1 * n)
                },
                __getUniqueId: function () {
                    return s.mm(e[n].uniqueId++)
                }
            }, e.fn[n] = function (i, s) {
                t(), i = e.extend(!0, {}, e[n].defaults, i), s = e.extend(!0, {}, e[n].configuration, s);
                var a = e();
                return this.each(function () {
                    var t = e(this);
                    if (!t.data(n)) {
                        var r = new e[n](t, i, s);
                        r.$menu.data(n, r.__api()), a = a.add(r.$menu)
                    }
                }), a
            }, e[n].i18n = function () {
                var t = {};
                return function (n) {
                    switch (typeof n) {
                        case "object":
                            return e.extend(t, n), t;
                        case "string":
                            return t[n] || n;
                        case "undefined":
                        default:
                            return t
                    }
                }
            }(), e[n].support = {
                touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
                csstransitions: function () {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransitions || Modernizr.csstransitions
                }(),
                csstransforms: function () {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms || Modernizr.csstransforms
                }(),
                csstransforms3d: function () {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms3d || Modernizr.csstransforms3d
                }()
            };
            var s, a, r, l
        }
    }(jQuery);
    /*
     * jQuery mmenu offCanvas add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    ! function (e) {
        var t = "mmenu",
            n = "offCanvas";
        e[t].addons[n] = {
            setup: function () {
                if (this.opts[n]) {
                    var i = this.opts[n],
                        s = this.conf[n];
                    r = e[t].glbl, this._api = e.merge(this._api, ["open", "close", "setPage"]), "object" != typeof i && (i = {}), i = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], i), "string" != typeof s.pageSelector && (s.pageSelector = "> " + s.pageNodetype), this.vars.opened = !1;
                    var a = [o.menu + "_offcanvas"];
                    e[t].support.csstransforms || a.push(o["no-csstransforms"]), e[t].support.csstransforms3d || a.push(o["no-csstransforms3d"]), this.bind("initMenu:after", function () {
                        var e = this;
                        this.setPage(r.$page), this._initBlocker(), this["_initWindow_" + n](), this.$menu.addClass(a.join(" ")).parent("." + o.wrapper).removeClass(o.wrapper), this.$menu[s.menuInsertMethod](s.menuInsertSelector);
                        var t = window.location.hash;
                        if (t) {
                            var i = this._getOriginalMenuId();
                            i && i == t.slice(1) && setTimeout(function () {
                                e.open()
                            }, 1e3)
                        }
                    }), this.bind("open:start:sr-aria", function () {
                        this.__sr_aria(this.$menu, "hidden", !1)
                    }), this.bind("close:finish:sr-aria", function () {
                        this.__sr_aria(this.$menu, "hidden", !0)
                    }), this.bind("initMenu:after:sr-aria", function () {
                        this.__sr_aria(this.$menu, "hidden", !0)
                    })
                }
            },
            add: function () {
                o = e[t]._c, i = e[t]._d, s = e[t]._e, o.add("slideout page no-csstransforms3d"), i.add("style")
            },
            clickAnchor: function (e, t) {
                var i = this;
                if (this.opts[n]) {
                    var s = this._getOriginalMenuId();
                    if (s && e.is('[href="#' + s + '"]')) {
                        if (t) return this.open(), !0;
                        var a = e.closest("." + o.menu);
                        if (a.length) {
                            var p = a.data("mmenu");
                            if (p && p.close) return p.close(), i.__transitionend(a, function () {
                                i.open()
                            }, i.conf.transitionDuration), !0
                        }
                        return this.open(), !0
                    }
                    if (r.$page) return s = r.$page.first().attr("id"), s && e.is('[href="#' + s + '"]') ? (this.close(), !0) : void 0
                }
            }
        }, e[t].defaults[n] = {
            blockUI: !0,
            moveBackground: !0
        }, e[t].configuration[n] = {
            pageNodetype: "div",
            pageSelector: null,
            noPageSelector: [],
            wrapPageIfNeeded: !0,
            menuInsertMethod: "prependTo",
            menuInsertSelector: "body"
        }, e[t].prototype.open = function () {
            if (this.trigger("open:before"), !this.vars.opened) {
                var e = this;
                this._openSetup(), setTimeout(function () {
                    e._openFinish()
                }, this.conf.openingInterval), this.trigger("open:after")
            }
        }, e[t].prototype._openSetup = function () {
            var t = this,
                a = this.opts[n];
            this.closeAllOthers(), r.$page.each(function () {
                e(this).data(i.style, e(this).attr("style") || "")
            }), r.$wndw.trigger(s.resize + "-" + n, [!0]);
            var p = [o.wrapper + "_opened"];
            a.blockUI && p.push(o.wrapper + "_blocking"), "modal" == a.blockUI && p.push(o.wrapper + "_modal"), a.moveBackground && p.push(o.wrapper + "_background"), r.$html.addClass(p.join(" ")), setTimeout(function () {
                t.vars.opened = !0
            }, this.conf.openingInterval), this.$menu.addClass(o.menu + "_opened")
        }, e[t].prototype._openFinish = function () {
            var e = this;
            this.__transitionend(r.$page.first(), function () {
                e.trigger("open:finish")
            }, this.conf.transitionDuration), this.trigger("open:start"), r.$html.addClass(o.wrapper + "_opening")
        }, e[t].prototype.close = function () {
            if (this.trigger("close:before"), this.vars.opened) {
                var t = this;
                this.__transitionend(r.$page.first(), function () {
                    t.$menu.removeClass(o.menu + "_opened");
                    var n = [o.wrapper + "_opened", o.wrapper + "_blocking", o.wrapper + "_modal", o.wrapper + "_background"];
                    r.$html.removeClass(n.join(" ")), r.$page.each(function () {
                        e(this).attr("style", e(this).data(i.style))
                    }), t.vars.opened = !1, t.trigger("close:finish")
                }, this.conf.transitionDuration), this.trigger("close:start"), r.$html.removeClass(o.wrapper + "_opening"), this.trigger("close:after")
            }
        }, e[t].prototype.closeAllOthers = function () {
            r.$body.find("." + o.menu + "_offcanvas").not(this.$menu).each(function () {
                var n = e(this).data(t);
                n && n.close && n.close()
            })
        }, e[t].prototype.setPage = function (t) {
            this.trigger("setPage:before", t);
            var i = this,
                s = this.conf[n];
            t && t.length || (t = r.$body.find(s.pageSelector), s.noPageSelector.length && (t = t.not(s.noPageSelector.join(", "))), t.length > 1 && s.wrapPageIfNeeded && (t = t.wrapAll("<" + this.conf[n].pageNodetype + " />").parent())), t.each(function () {
                e(this).attr("id", e(this).attr("id") || i.__getUniqueId())
            }), t.addClass(o.page + " " + o.slideout), r.$page = t, this.trigger("setPage:after", t)
        }, e[t].prototype["_initWindow_" + n] = function () {
            r.$wndw.off(s.keydown + "-" + n).on(s.keydown + "-" + n, function (e) {
                if (r.$html.hasClass(o.wrapper + "_opened") && 9 == e.keyCode) return e.preventDefault(), !1
            });
            var e = 0;
            r.$wndw.off(s.resize + "-" + n).on(s.resize + "-" + n, function (t, n) {
                if (1 == r.$page.length && (n || r.$html.hasClass(o.wrapper + "_opened"))) {
                    var i = r.$wndw.height();
                    (n || i != e) && (e = i, r.$page.css("minHeight", i))
                }
            })
        }, e[t].prototype._initBlocker = function () {
            var t = this;
            this.opts[n].blockUI && (r.$blck || (r.$blck = e('<div class="' + o.page + "__blocker " + o.slideout + '" />')), r.$blck.appendTo(r.$body).off(s.touchstart + "-" + n + " " + s.touchmove + "-" + n).on(s.touchstart + "-" + n + " " + s.touchmove + "-" + n, function (e) {
                e.preventDefault(), e.stopPropagation(), r.$blck.trigger(s.mousedown + "-" + n)
            }).off(s.mousedown + "-" + n).on(s.mousedown + "-" + n, function (e) {
                e.preventDefault(), r.$html.hasClass(o.wrapper + "_modal") || (t.closeAllOthers(), t.close())
            }))
        };
        var o, i, s, r
    }(jQuery);
    /*
     * jQuery mmenu screenReader add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    ! function (t) {
        var i = "mmenu",
            n = "screenReader";
        t[i].addons[n] = {
            setup: function () {
                var a = this,
                    o = this.opts[n],
                    h = this.conf[n];
                s = t[i].glbl, "boolean" == typeof o && (o = {
                    aria: o,
                    text: o
                }), "object" != typeof o && (o = {}), o = this.opts[n] = t.extend(!0, {}, t[i].defaults[n], o), o.aria && (this.bind("initAddons:after", function () {
                    this.bind("initMenu:after", function () {
                        this.trigger("initMenu:after:sr-aria")
                    }), this.bind("initNavbar:after", function () {
                        this.trigger("initNavbar:after:sr-aria", arguments[0])
                    }), this.bind("openPanel:start", function () {
                        this.trigger("openPanel:start:sr-aria", arguments[0])
                    }), this.bind("close:start", function () {
                        this.trigger("close:start:sr-aria")
                    }), this.bind("close:finish", function () {
                        this.trigger("close:finish:sr-aria")
                    }), this.bind("open:start", function () {
                        this.trigger("open:start:sr-aria")
                    }), this.bind("initOpened:after", function () {
                        this.trigger("initOpened:after:sr-aria")
                    })
                }), this.bind("updateListview", function () {
                    this.$pnls.find("." + e.listview).children().each(function () {
                        a.__sr_aria(t(this), "hidden", t(this).is("." + e.hidden))
                    })
                }), this.bind("openPanel:start", function (t) {
                    var i = this.$menu.find("." + e.panel).not(t).not(t.parents("." + e.panel)),
                        n = t.add(t.find("." + e.listitem + "_vertical ." + e.listitem + "_opened").children("." + e.panel));
                    this.__sr_aria(i, "hidden", !0), this.__sr_aria(n, "hidden", !1)
                }), this.bind("closePanel", function (t) {
                    this.__sr_aria(t, "hidden", !0)
                }), this.bind("initPanels:after", function (i) {
                    var n = i.find("." + e.btn).each(function () {
                        a.__sr_aria(t(this), "owns", t(this).attr("href").replace("#", ""))
                    });
                    this.__sr_aria(n, "haspopup", !0)
                }), this.bind("initNavbar:after", function (t) {
                    var i = t.children("." + e.navbar);
                    this.__sr_aria(i, "hidden", !t.hasClass(e.panel + "_has-navbar"))
                }), o.text && (this.bind("initlistview:after", function (t) {
                    var i = t.find("." + e.listview).find("." + e.btn + "_fullwidth").parent().children("span");
                    this.__sr_aria(i, "hidden", !0)
                }), "parent" == this.opts.navbar.titleLink && this.bind("initNavbar:after", function (t) {
                    var i = t.children("." + e.navbar),
                        n = !!i.children("." + e.btn + "_prev").length;
                    this.__sr_aria(i.children("." + e.title), "hidden", n)
                }))), o.text && (this.bind("initAddons:after", function () {
                    this.bind("setPage:after", function () {
                        this.trigger("setPage:after:sr-text", arguments[0])
                    })
                }), this.bind("initNavbar:after", function (n) {
                    var r = n.children("." + e.navbar),
                        a = r.children("." + e.title).text(),
                        s = t[i].i18n(h.text.closeSubmenu);
                    a && (s += " (" + a + ")"), r.children("." + e.btn + "_prev").html(this.__sr_text(s))
                }), this.bind("initListview:after", function (n) {
                    var s = n.data(r.parent);
                    if (s && s.length) {
                        var o = s.children("." + e.btn + "_next"),
                            d = o.nextAll("span, a").first().text(),
                            l = t[i].i18n(h.text[o.parent().is("." + e.listitem + "_vertical") ? "toggleSubmenu" : "openSubmenu"]);
                        d && (l += " (" + d + ")"), o.html(a.__sr_text(l))
                    }
                }))
            },
            add: function () {
                e = t[i]._c, r = t[i]._d, a = t[i]._e, e.add("sronly")
            },
            clickAnchor: function (t, i) {}
        }, t[i].defaults[n] = {
            aria: !0,
            text: !0
        }, t[i].configuration[n] = {
            text: {
                closeMenu: "Close menu",
                closeSubmenu: "Close submenu",
                openSubmenu: "Open submenu",
                toggleSubmenu: "Toggle submenu"
            }
        }, t[i].prototype.__sr_aria = function (t, i, n) {
            t.prop("aria-" + i, n)[n ? "attr" : "removeAttr"]("aria-" + i, n)
        }, t[i].prototype.__sr_role = function (t, i) {
            t.prop("role", i)[i ? "attr" : "removeAttr"]("role", i)
        }, t[i].prototype.__sr_text = function (t) {
            return '<span class="' + e.sronly + '">' + t + "</span>"
        };
        var e, r, a, s
    }(jQuery);
    /*
     * jQuery mmenu scrollBugFix add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    ! function (o) {
        var t = "mmenu",
            n = "scrollBugFix";
        o[t].addons[n] = {
            setup: function () {
                var r = this.opts[n];
                this.conf[n];
                i = o[t].glbl, o[t].support.touch && this.opts.offCanvas && this.opts.offCanvas.blockUI && ("boolean" == typeof r && (r = {
                    fix: r
                }), "object" != typeof r && (r = {}), r = this.opts[n] = o.extend(!0, {}, o[t].defaults[n], r), r.fix && (this.bind("open:start", function () {
                    this.$pnls.children("." + e.panel + "_opened").scrollTop(0)
                }), this.bind("initMenu:after", function () {
                    this["_initWindow_" + n]()
                })))
            },
            add: function () {
                e = o[t]._c, r = o[t]._d, s = o[t]._e
            },
            clickAnchor: function (o, t) {}
        }, o[t].defaults[n] = {
            fix: !0
        }, o[t].prototype["_initWindow_" + n] = function () {
            var t = this;
            i.$docu.off(s.touchmove + "-" + n).on(s.touchmove + "-" + n, function (o) {
                i.$html.hasClass(e.wrapper + "_opened") && o.preventDefault()
            });
            var r = !1;
            i.$body.off(s.touchstart + "-" + n).on(s.touchstart + "-" + n, "." + e.panels + "> ." + e.panel, function (o) {
                i.$html.hasClass(e.wrapper + "_opened") && (r || (r = !0, 0 === o.currentTarget.scrollTop ? o.currentTarget.scrollTop = 1 : o.currentTarget.scrollHeight === o.currentTarget.scrollTop + o.currentTarget.offsetHeight && (o.currentTarget.scrollTop -= 1), r = !1))
            }).off(s.touchmove + "-" + n).on(s.touchmove + "-" + n, "." + e.panels + "> ." + e.panel, function (t) {
                i.$html.hasClass(e.wrapper + "_opened") && o(this)[0].scrollHeight > o(this).innerHeight() && t.stopPropagation()
            }), i.$wndw.off(s.orientationchange + "-" + n).on(s.orientationchange + "-" + n, function () {
                t.$pnls.children("." + e.panel + "_opened").scrollTop(0).css({
                    "-webkit-overflow-scrolling": "auto"
                }).css({
                    "-webkit-overflow-scrolling": "touch"
                })
            })
        };
        var e, r, s, i
    }(jQuery);
    return true;
}));