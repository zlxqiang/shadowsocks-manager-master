!function (e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var a = n[o] = {exports: {}, id: o, loaded: !1};
        return e[o].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
    }

    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function (e, t, n) {
    "use strict";
    n(1), n(2), n(3), n(4), n(5), n(6), n(7), n(14), n(25), n(42), n(49), n(52)
}, function (e, t) {
    "use strict";
    angular.module("app", ["ngMaterial", "ui.router", "ngMessages", "ja.qr", "chart.js", "angularMoment", "ngWebSocket", "ngStorage", "angular-inview", "hc.marked", "pascalprecht.translate"])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.directive("focusMe", ["$timeout", function (e) {
        return {
            restrict: "A", link: function (t, n) {
                e(function () {
                    n[0].focus()
                })
            }
        }
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.factory("preload", ["$http", "$q", "moment", function (e, t, n) {
        var o = {}, a = function () {
            for (var e in o) o[e].expire < Date.now() && delete o[e]
        }, r = function (e, t, n) {
            o[e] = {promise: t(), expire: Date.now() + n}
        }, i = function (e, n, i) {
            return a(), o[e] && !o[e].promise.$$state.status ? o[e].promise : o[e] && o[e].data && Date.now() <= o[e].expire ? t.resolve(o[e].data) : (r(e, n, i), o[e].promise.then(function (t) {
                return o[e].data = t, t
            }))
        };
        return {get: i}
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.factory("adminApi", ["$http", "$q", "moment", "preload", "$timeout", function (e, t, n, o, a) {
        var r = function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            t.search || "", t.filter || "all", t.sort || "id", t.page || 1, t.pageSize || 20;
            return e.get("/api/admin/user", {params: t}).then(function (e) {
                return e.data
            })
        }, i = function (t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            "Paypal" === t && (n.filter = n.filter.map(function (e) {
                return "CREATE" === e ? "created" : "TRADE_SUCCESS" === e ? "approved" : "FINISH" === e ? "finish" : void 0
            }).filter(function (e) {
                return e
            }));
            var o = "支付宝" === t ? "/api/admin/alipay" : "/api/admin/paypal";
            n.search || "", n.filter || "", n.page || 1, n.pageSize || 20;
            return e.get(o, {params: n}).then(function (e) {
                return e.data
            })
        }, c = function (t) {
            return e.get("/api/admin/server", {params: {status: t}}).then(function (e) {
                return e.data
            })
        }, u = null, s = function () {
            return u && !u.$$state.status ? u : u = e.get("/api/admin/account").then(function (e) {
                return e.data
            })
        }, l = function (o) {
            return t.all([e.get("/api/admin/flow/" + o, {params: {time: [n().hour(0).minute(0).second(0).millisecond(0).toDate().valueOf(), n().toDate().valueOf()]}}), e.get("/api/admin/flow/" + o, {params: {time: [n().day(0).hour(0).minute(0).second(0).millisecond(0).toDate().valueOf(), n().toDate().valueOf()]}}), e.get("/api/admin/flow/" + o, {params: {time: [n().date(1).hour(0).minute(0).second(0).millisecond(0).toDate().valueOf(), n().toDate().valueOf()]}})]).then(function (e) {
                return {today: e[0].data[0], week: e[1].data[0], month: e[2].data[0]}
            })
        }, d = {}, m = function (t) {
            return d[t] && !d[t].$$state.status ? d[t] : (d[t] = e.get("/api/admin/flow/" + t + "/lastHour").then(function (e) {
                return {time: e.data.time, flow: e.data.flow}
            }), d[t])
        }, f = function (t) {
            return e.get("/api/admin/account/port/" + t).then(function (e) {
                return e.data.id
            })
        }, p = null, h = function () {
            return p && !p.$$state.status ? p : p = t.all([e.get("/api/admin/user/recentSignUp").then(function (e) {
                return e.data
            }), e.get("/api/admin/user/recentLogin").then(function (e) {
                return e.data
            }), e.get("/api/admin/alipay/recentOrder").then(function (e) {
                return e.data
            }), e.get("/api/admin/paypal/recentOrder").then(function (e) {
                return e.data
            })]).then(function (e) {
                return {signup: e[0], login: e[1], order: e[2], paypalOrder: e[3]}
            })
        }, g = function (n) {
            var o = JSON.parse(window.ssmgrConfig).macAccount,
                a = [e.get("/api/admin/user/" + n), e.get("/api/admin/alipay/" + n), e.get("/api/admin/paypal/" + n), e.get("/api/admin/server")];
            return o ? a.push(e.get("/api/admin/account/mac", {params: {userId: n}})) : a.push(t.resolve({data: []})), t.all(a).then(function (e) {
                return {
                    user: e[0].data,
                    alipayOrders: e[1].data,
                    paypalOrders: e[2].data,
                    server: e[3].data,
                    macAccount: e[4].data
                }
            })
        }, v = function r(i, c, u, s) {
            var l = void 0;
            "hour" === c && (!s && a(function () {
                r(i, c, u - 36e5, !0)
            }, 500), !s && a(function () {
                r(i, c, u - 72e5, !0)
            }, 600), !s && a(function () {
                r(i, c, u - 108e5, !0)
            }, 700), l = n(u).minute(0).second(0).millisecond(0).toDate().getTime()), "day" === c && (!s && a(function () {
                r(i, c, u - 864e5, !0)
            }, 500), !s && a(function () {
                r(i, c, u - 1728e5, !0)
            }, 600), !s && a(function () {
                r(i, c, u - 2592e5, !0)
            }, 700), l = n(u).hour(0).minute(0).second(0).millisecond(0).toDate().getTime()), "week" === c && (!s && a(function () {
                r(i, c, u - 6048e5, !0)
            }, 500), !s && a(function () {
                r(i, c, u - 12096e5, !0)
            }, 600), !s && a(function () {
                r(i, c, u - 18144e5, !0)
            }, 700), l = n(u).day(0).hour(0).minute(0).second(0).millisecond(0).toDate().getTime());
            var d = "getChartData:" + i + ":" + c + ":" + l, m = function () {
                return t.all([e.get("/api/admin/flow/" + i, {
                    params: {
                        type: c,
                        time: l
                    }
                }), e.get("/api/admin/flow/" + i + "/user", {params: {type: c, time: l}})])
            };
            return o.get(d, m, 9e4)
        }, w = function a(r, i, c, u, s, l) {
            var d = void 0;
            "hour" === u && (!l && a(r, i, c, u, s - 36e5, !0), !l && a(r, i, c, u, s - 72e5, !0), !l && a(r, i, c, u, s - 108e5, !0), d = n(s).minute(0).second(0).millisecond(0).toDate().getTime()), "day" === u && (!l && a(r, i, c, u, s - 864e5, !0), !l && a(r, i, c, u, s - 1728e5, !0), !l && a(r, i, c, u, s - 2592e5, !0), d = n(s).hour(0).minute(0).second(0).millisecond(0).toDate().getTime()), "week" === u && (!l && a(r, i, c, u, s - 6048e5, !0), !l && a(r, i, c, u, s - 12096e5, !0), !l && a(r, i, c, u, s - 18144e5, !0), d = n(s).day(0).hour(0).minute(0).second(0).millisecond(0).toDate().getTime());
            var m = "getAccountChartData:" + r + ":" + i + ":" + c + ":" + u + ":" + d, f = function () {
                return t.all([e.get("/api/admin/flow/" + r, {
                    params: {
                        port: c,
                        type: u,
                        time: s
                    }
                }), e.get("/api/admin/flow/account/" + i, {params: {port: c, type: u, time: s}})])
            };
            return o.get(m, f, 9e4)
        }, y = function (n, a) {
            var r = "getServerPortData:" + n + ":" + a + ":", i = function () {
                return t.all([e.get("/api/admin/flow/" + n + "/" + a), e.get("/api/admin/flow/" + n + "/" + a + "/lastConnect")]).then(function (e) {
                    return {serverPortFlow: e[0].data[0], lastConnect: e[1].data.lastConnect}
                })
            };
            return o.get(r, i, 6e4)
        }, b = function (t) {
            return e.get("/api/admin/user/" + t + "/lastConnect").then(function (e) {
                return e.data
            })
        }, $ = function (t) {
            var n = "getIpInfo:" + t, a = function () {
                var n = "/api/admin/account/ip/" + t;
                return e.get(n).then(function (e) {
                    return e.data
                })
            };
            return o.get(n, a, 3e5)
        };
        return {
            getUser: r,
            getOrder: i,
            getServer: c,
            getAccount: s,
            getServerFlow: l,
            getServerFlowLastHour: m,
            getAccountId: f,
            getIndexInfo: h,
            getServerPortData: y,
            getUserData: g,
            getChartData: v,
            getAccountChartData: w,
            getUserPortLastConnect: b,
            getIpInfo: $
        }
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.factory("homeApi", ["$http", function (e) {
        var t = function (t, n, o) {
            return e.post("/api/home/signup", {email: t, code: n, password: o}).catch(function (e) {
                return 403 === e.status ? Promise.reject("用户注册失败") : Promise.reject("网络异常，请稍后再试")
            })
        }, n = function (t, n) {
            return e.post("/api/home/login", {email: t, password: n}).then(function (e) {
                return e.data.type
            }).catch(function (e) {
                if (403 === e.status) {
                    var t = "用户名或密码错误";
                    return "user not exists" === e.data && (t = "该用户尚未注册的"), "invalid body" === e.data && (t = "请输入正确的用户名格式"), "password retry out of limit" === e.data && (t = "密码重试次数已达上限\n请稍后再试"), Promise.reject(t)
                }
                return Promise.reject("网络异常，请稍后再试")
            })
        }, o = function (t) {
            return e.post("/api/home/code", {email: t}).then(function (e) {
                return "success"
            }).catch(function (e) {
                if (403 === e.status) {
                    var t = "验证码发送错误";
                    return "email in black list" === e.data && (t = "发送错误，请更换邮箱尝试"), "send email out of limit" === e.data && (t = "请求过于频繁，请稍后再试"), "signup close" === e.data && (t = "当前时段尚未开放注册"), Promise.reject(t)
                }
                return Promise.reject("网络异常，请稍后再试")
            })
        }, a = function (t) {
            return t ? e.post("/api/home/password/sendEmail", {email: t}).then(function (e) {
                return "重置密码链接已发至您的邮箱，\n请注意查收"
            }).catch(function (e) {
                var t = null;
                return t = 403 === e.status && "already send" === e.data ? "重置密码链接已经发送，\n请勿重复发送" : 403 === e.status && "user not exists" === e.data ? "请输入正确的邮箱地址" : "网络异常，请稍后再试", Promise.reject(t)
            }) : Promise.reject("请输入邮箱地址再点击“找回密码”")
        };
        return {userSignup: t, userLogin: n, sendCode: o, findPassword: a}
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.factory("userApi", ["$q", "$http", function (e, t) {
        var n = null, o = function () {
            if (n && !n.$$state.status) return n;
            return n = e.all([t.get("/api/user/account"), t.get("/api/user/server")]).then(function (e) {
                return {
                    account: e[0].data, servers: e[1].data.map(function (e) {
                        return e.host.indexOf(":") >= 0 && (e.host = e.host.split(":")[1]), e
                    })
                }
            })
        }, a = function (e, n) {
            return t.put("/api/user/" + e + "/password", {password: n})
        }, r = function (e, n) {
            return t.post("/api/user/changePassword", {password: e, newPassword: n})
        }, i = function (n) {
            return n.length ? (n.forEach(function (e, o) {
                t.get("/api/user/account/" + e.id).then(function (t) {
                    return t.data.id ? (e.password = t.data.password, e.data = t.data.data, void(e.type = t.data.type)) : void n.splice(o, 1)
                })
            }), e.resolve()) : t.get("/api/user/account").then(function (e) {
                e.data.forEach(function (e) {
                    n.push(e)
                })
            })
        }, c = {}, u = function (n, o, a) {
            if (c["" + n.id] && !c["" + n.id].$$state.status) return c["" + n.id];
            var r = [t.get("/api/user/flow/" + o + "/" + a + "/lastConnect")];
            return n.type >= 2 && n.type <= 5 && r.push(t.get("/api/user/flow/" + o + "/" + a)), c["" + n.id] = e.all(r).then(function (e) {
                return {lastConnect: e[0].data.lastConnect, flow: e[1] ? e[1].data[0] : null}
            }), c["" + n.id]
        }, s = function () {
            return t.get("/api/user/notice").then(function (e) {
                return e.data
            })
        };
        return {
            getServerPortData: u,
            getUserAccount: o,
            changeShadowsocksPassword: a,
            changePassword: r,
            updateAccount: i,
            getNotice: s
        }
    }])
}, function (e, t, n) {
    "use strict";
    var o = n(8);
    o.keys().forEach(function (e) {
        o(e)
    })
}, function (e, t, n) {
    function o(e) {
        return n(a(e))
    }

    function a(e) {
        return r[e] || function () {
            throw new Error("Cannot find module '" + e + "'.")
        }()
    }

    var r = {"./auth.js": 9, "./sceProvider.js": 10, "./themingProvider.js": 11, "./urlRouter.js": 13};
    o.keys = function () {
        return Object.keys(r)
    }, o.resolve = a, e.exports = o, o.id = 8
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.service("authInterceptor", ["$q", "$localStorage", function (e, t) {
        var n = this;
        n.responseError = function (n) {
            return 401 == n.status && (t.home = {}, t.admin = {}, t.user = {}, window.location = "/"), e.reject(n)
        }
    }]).config(["$httpProvider", "$compileProvider", function (e, t) {
        e.interceptors.push("authInterceptor"), t.aHrefSanitizationWhitelist(/^\s*(https?|http|ss):/)
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.config(["$sceProvider", function (e) {
        e.enabled(!1)
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = JSON.parse(a.ssmgrConfig);
    o.config(["$mdThemingProvider", function (e) {
        var t = function (e) {
            var t = ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "grey", "blue-grey"];
            return t.indexOf(e) >= 0
        };
        t(r.themePrimary) && e.theme("default").primaryPalette(r.themePrimary), t(r.themeAccent) && e.theme("default").accentPalette(r.themeAccent), e.alwaysWatchTheme(!0)
    }])
}, function (e, t) {
    e.exports = window
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.config(["$urlRouterProvider", "$locationProvider", function (e, t) {
        t.html5Mode(!0), e.when("/", "/home/index").otherwise("/home/index")
    }])
}, function (e, t, n) {
    "use strict";
    var o = n(15);
    o.keys().forEach(function (e) {
        o(e)
    })
}, function (e, t, n) {
    function o(e) {
        return n(a(e))
    }

    function a(e) {
        return r[e] || function () {
            throw new Error("Cannot find module '" + e + "'.")
        }()
    }

    var r = {
        "./admin.js": 16,
        "./adminAccount.js": 17,
        "./adminNotice.js": 18,
        "./adminServer.js": 19,
        "./adminSetting.js": 20,
        "./adminUser.js": 21,
        "./home.js": 22,
        "./main.js": 23,
        "./user.js": 24
    };
    o.keys = function () {
        return Object.keys(r)
    }, o.resolve = a, e.exports = o, o.id = 15
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.controller("AdminController", ["$scope", "$mdMedia", "$mdSidenav", "$state", "$http", "$document", "$interval", "$timeout", "$localStorage", function (e, t, n, o, a, r, i, c, u) {
        "admin" !== u.home.status ? o.go("home.index") : e.setMainLoading(!1), e.innerSideNav = !0, e.sideNavWidth = function () {
            return e.innerSideNav ? {width: "200px"} : {width: "60px"}
        }, e.menus = [{name: "首页", icon: "home", click: "admin.index"}, {
            name: "服务器",
            icon: "cloud",
            click: "admin.server"
        }, {name: "用户", icon: "people", click: "admin.user"}, {
            name: "账号",
            icon: "account_circle",
            click: "admin.account"
        }, {name: "订单", icon: "attach_money", click: "admin.pay"}, {
            name: "设置",
            icon: "settings",
            click: "admin.settings"
        }, {name: "divider"}, {
            name: "退出", icon: "exit_to_app", click: function () {
                a.post("/api/home/logout").then(function () {
                    u.home = {}, u.admin = {}, o.go("home.index")
                })
            }
        }], e.menuButton = function () {
            return e.menuButtonIcon ? e.menuButtonClick() : void(t("gt-sm") ? e.innerSideNav = !e.innerSideNav : n("left").toggle())
        }, e.menuClick = function (t) {
            n("left").close(), "function" == typeof e.menus[t].click ? e.menus[t].click() : o.go(e.menus[t].click)
        }, e.title = "", e.setTitle = function (t) {
            e.title = t
        }, e.fabButton = !1, e.fabButtonClick = function () {
        }, e.setFabButton = function (t) {
            e.fabButton = !0, e.fabButtonClick = t
        }, e.menuButtonIcon = "", e.menuButtonClick = function () {
        };
        var s = !1, l = "", d = {}, m = function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return l ? function () {
                s = !0, o.go(l, d)
            } : function () {
                s = !1, o.go(e, t)
            }
        };
        e.setMenuButton = function (t, n) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            e.menuButtonIcon = t, "string" == typeof n ? e.menuButtonClick = m(n, o) : (s = !0, e.menuButtonClick = n)
        }, e.menuRightButtonIcon = "", e.menuRightButtonClick = function () {
            e.$broadcast("RightButtonClick", "click")
        }, e.setMenuRightButton = function (t) {
            e.menuRightButtonIcon = t
        }, e.menuSearchButtonIcon = "", e.menuSearch = {input: !1, text: ""}, e.menuSearchButtonClick = function () {
            e.menuSearch.input = !0
        }, e.setMenuSearchButton = function (t) {
            e.menuSearchButtonIcon = t
        }, e.cancelSearch = function () {
            e.menuSearch.text = "", e.menuSearch.input = !1, e.$broadcast("cancelSearch", "cancel")
        }, e.interval = null, e.setInterval = function (t) {
            e.interval = t
        }, e.$on("$stateChangeStart", function (t, n, a) {
            if (e.fabButton = !1, e.title = "", e.menuButtonIcon = "", e.menuRightButtonIcon = "", e.menuSearchButtonIcon = "", e.menuSearch.text = "", e.menuSearch.input = !1, e.interval && i.cancel(e.interval), s) s = !1, l = "", d = {}; else {
                var r = angular.copy(o.current.name), c = angular.copy(o.params);
                l = r, d = c
            }
        })
    }]).controller("AdminIndexController", ["$scope", "$state", "adminApi", "$localStorage", "$interval", "orderDialog", function (e, t, n, o, a, r) {
        e.setTitle("首页"), o.admin.indexInfo && (e.signupUsers = o.admin.indexInfo.data.signup, e.loginUsers = o.admin.indexInfo.data.login, e.orders = o.admin.indexInfo.data.order, e.paypalOrders = o.admin.indexInfo.data.paypalOrder), e.toUser = function (e) {
            t.go("admin.userPage", {userId: e})
        };
        var i = function () {
            n.getIndexInfo().then(function (t) {
                o.admin.indexInfo = {
                    time: Date.now(),
                    data: t
                }, e.signupUsers = t.signup, e.loginUsers = t.login, e.orders = t.order, e.paypalOrders = t.paypalOrder
            })
        };
        i(), e.$on("visibilitychange", function (e, t) {
            "visible" === t && o.admin.indexInfo && Date.now() - o.admin.indexInfo.time >= 15e3 && i()
        }), e.setInterval(a(function () {
            o.admin.indexInfo && Date.now() - o.admin.indexInfo.time >= 9e4 && i()
        }, 15e3)), e.showOrderInfo = function (e) {
            r.show(e)
        }
    }]).controller("AdminPayController", ["$scope", "adminApi", "orderDialog", "$mdMedia", "$localStorage", "orderFilterDialog", "$timeout", "$state", function (e, t, n, o, a, r, i, c) {
        e.setTitle("订单"), e.setMenuSearchButton("search"), e.showOrderInfo = function (e) {
            n.show(e)
        }, e.myPayType = "支付宝";
        var u = 0;
        e.payTypes = [{name: "支付宝"}, {name: "Paypal"}], e.selectPayType = function (t) {
            u = Date.now(), e.myPayType = t, e.orders = [], e.currentPage = 1, e.isOrderPageFinish = !1, e.getOrders()
        }, a.admin.orderFilterSettings || (a.admin.orderFilterSettings = {
            filter: {
                CREATE: !0,
                WAIT_BUYER_PAY: !0,
                TRADE_SUCCESS: !0,
                FINISH: !0,
                TRADE_CLOSED: !0
            }
        }), e.orderFilter = a.admin.orderFilterSettings, e.currentPage = 1, e.isOrderLoading = !1, e.isOrderPageFinish = !1, e.orders = [];
        var s = function () {
            return o("xs") ? 30 : o("sm") ? 30 : o("md") ? 40 : o("gt-md") ? 50 : void 0
        };
        e.getOrders = function (n) {
            var o = u;
            e.isOrderLoading = !0, t.getOrder(e.myPayType, {
                page: e.currentPage,
                pageSize: s(),
                search: n,
                filter: Object.keys(e.orderFilter.filter).filter(function (t) {
                    return e.orderFilter.filter[t]
                })
            }).then(function (t) {
                o === u && (!n && e.menuSearch.text || n && n !== e.menuSearch.text || (t.orders.forEach(function (t) {
                    e.orders.push(t)
                }), t.maxPage > e.currentPage ? e.currentPage++ : e.isOrderPageFinish = !0, e.isOrderLoading = !1))
            }).catch(function () {
                "admin.pay" === c.current.name && i(function () {
                    e.getOrders(n)
                }, 5e3)
            })
        }, e.$on("cancelSearch", function () {
            e.orders = [], e.currentPage = 1, e.isOrderPageFinish = !1, e.getOrders()
        });
        var l = void 0, d = function () {
            e.orders = [], e.currentPage = 1, e.isOrderPageFinish = !1, e.getOrders(e.menuSearch.text)
        };
        e.$watch("menuSearch.text", function () {
            e.menuSearch.text && (l && i.cancel(l), l = i(function () {
                d()
            }, 500))
        }), e.view = function (t) {
            !t || e.isOrderLoading || e.isOrderPageFinish || e.getOrders()
        }, e.setMenuRightButton("sort_by_alpha"), e.orderFilterDialog = function () {
            r.show().then(function () {
                e.orders = [], e.currentPage = 1, e.isOrderPageFinish = !1, e.getOrders()
            })
        }, e.$on("RightButtonClick", function () {
            e.orderFilterDialog()
        })
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.controller("AdminAccountController", ["$scope", "$state", "$stateParams", "$http", "accountSortDialog", "$interval", "adminApi", "$localStorage", "accountSortTool", function (e, t, n, o, a, r, i, c, u) {
        e.setTitle("账号"), e.setMenuRightButton("sort_by_alpha"), e.setMenuSearchButton("search"), c.admin.accountFilterSettings || (c.admin.accountFilterSettings = {
            sort: "port_asc",
            filter: {expired: !0, unexpired: !0, unlimit: !0}
        }), e.accountMethod = c.admin.accountFilterSettings, e.accountInfo = {}, e.sortAndFilter = function () {
            u(e.accountInfo, e.accountMethod)
        }, c.admin.accountInfo || (c.admin.accountInfo = {
            time: Date.now(),
            data: []
        }), e.accountInfo.originalAccount = c.admin.accountInfo.data, e.accountInfo.account = angular.copy(e.accountInfo.originalAccount), e.sortAndFilter();
        var s = function () {
            i.getAccount().then(function (t) {
                c.admin.accountInfo = {
                    time: Date.now(),
                    data: t
                }, e.accountInfo.originalAccount = t, e.accountInfo.account = angular.copy(e.accountInfo.originalAccount), e.sortAndFilter()
            })
        };
        s(), e.$on("visibilitychange", function (e, t) {
            "visible" === t && c.admin.accountInfo && Date.now() - c.admin.accountInfo.time >= 2e4 && s()
        }), e.setInterval(r(function () {
            c.admin.accountInfo && Date.now() - c.admin.accountInfo.time >= 9e4 && s()
        }, 15e3)), e.setFabButton(function () {
            t.go("admin.addAccount")
        }), e.toAccount = function (e) {
            t.go("admin.accountPage", {accountId: e})
        }, e.sortAndFilterDialog = function () {
            a.show(e.accountMethod, e.accountInfo)
        }, e.$on("RightButtonClick", function () {
            e.sortAndFilterDialog()
        });
        var l = function () {
            u(e.accountInfo, e.accountMethod), e.accountInfo.account = e.accountInfo.account.filter(function (t) {
                return (t.port + (t.user ? t.user : "")).indexOf(e.menuSearch.text) >= 0
            })
        };
        e.$on("cancelSearch", function () {
            u(e.accountInfo, e.accountMethod)
        }), e.$watch("menuSearch.text", function () {
            if (e.menuSearch.input) return e.menuSearch.text ? void l() : void u(e.accountInfo, e.accountMethod)
        }), e.accountColor = function (e) {
            return 1 === e.type ? {
                background: "blue-50",
                "border-color": "blue-300"
            } : e.data && e.data.expire <= Date.now() ? {
                background: "red-50",
                "border-color": "red-300"
            } : e.autoRemove ? {background: "lime-50", "border-color": "lime-300"} : {}
        }
    }]).controller("AdminAccountPageController", ["$scope", "$state", "$stateParams", "$http", "$mdMedia", "$q", "adminApi", "$timeout", "$interval", "qrcodeDialog", "ipDialog", function (e, t, n, o, a, r, i, c, u, s, l) {
        e.setTitle("账号"), e.setMenuButton("arrow_back", "admin.account"), r.all([o.get("/api/admin/account/" + n.accountId), o.get("/api/admin/server"), o.get("/api/admin/setting/account")]).then(function (t) {
            e.account = t[0].data, e.servers = t[1].data.map(function (e) {
                return e.host.indexOf(":") >= 0 && (e.host = e.host.split(":")[1]), e
            }), e.getServerPortData(e.servers[0], e.account.port), e.isMultiServerFlow = t[2].data.multiServerFlow
        }).catch(function (e) {
            t.go("admin.account")
        });
        var d = void 0;
        e.getServerPortData = function (t, n) {
            var o = t.id;
            d = o, e.serverPortFlow = 0, e.lastConnect = 0, i.getServerPortData(o, n).then(function (n) {
                e.serverPortFlow = n.serverPortFlow, e.lastConnect = n.lastConnect;
                var o = 0;
                e.account.data && (o = e.account.data.flow * (e.isMultiServerFlow ? 1 : t.scale)), t.isFlowOutOfLimit = !!o && e.serverPortFlow >= o
            }), e.getChartData(o), e.servers.forEach(function (e, t) {
                e.id !== o && c(function () {
                    i.getServerPortData(o, n)
                }, 1e3 * t)
            })
        }, e.setInterval(u(function () {
            var t = d;
            i.getServerPortData(t, e.account.port).then(function (n) {
                t === d && (e.lastConnect = n.lastConnect, e.serverPortFlow = n.serverPortFlow)
            })
        }, 6e4));
        var m = function (e) {
            return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
                return String.fromCharCode("0x" + t)
            }))
        };
        e.createQrCode = function (e, t, n, o, a) {
            return "ss://" + m(e + ":" + t + "@" + n + ":" + o)
        }, e.showQrcodeDialog = function (t, n, o, a, r) {
            var i = e.createQrCode(t, n, o, a, r);
            s.show(r, i)
        }, e.editAccount = function (e) {
            t.go("admin.editAccount", {accountId: e})
        }, e.getQrCodeSize = function () {
            return a("xs") ? 230 : a("lg") ? 240 : 180
        }, e.flowType = {value: "day"};
        var f = {hour: Date.now(), day: Date.now(), week: Date.now()}, p = {
            hour: ["0", "", "", "15", "", "", "30", "", "", "45", "", ""],
            day: ["0", "", "", "", "", "", "6", "", "", "", "", "", "12", "", "", "", "", "", "18", "", "", "", "", ""],
            week: ["S", "M", "T", "W", "T", "F", "S"]
        }, h = function (e) {
            return e < 1 ? e.toFixed(1) + " B" : e < 1e3 ? e.toFixed(0) + " B" : e < 1e6 ? (e / 1e3).toFixed(0) + " KB" : e < 1e9 ? (e / 1e6).toFixed(0) + " MB" : e < 1e12 ? (e / 1e9).toFixed(1) + " GB" : e
        }, g = function (t, n) {
            e.pieChart = {
                data: n.map(function (e) {
                    return e.flow
                }), labels: n.map(function (e) {
                    return e.name
                }), options: {
                    responsive: !1, tooltips: {
                        enabled: !0, mode: "single", callbacks: {
                            label: function e(t, n) {
                                var e = n.labels[t.index], o = n.datasets[t.datasetIndex].data[t.index];
                                return e + ": " + h(o)
                            }
                        }
                    }
                }
            }, e.lineChart = {
                data: [t],
                labels: p[e.flowType.value],
                series: "day",
                datasetOverride: [{yAxisID: "y-axis-1"}],
                options: {
                    responsive: !1,
                    tooltips: {
                        callbacks: {
                            label: function (e) {
                                return h(e.yLabel)
                            }
                        }
                    },
                    scales: {
                        yAxes: [{
                            id: "y-axis-1",
                            type: "linear",
                            display: !0,
                            position: "left",
                            ticks: {callback: h}
                        }]
                    }
                }
            }
        };
        e.getChartData = function (t) {
            i.getAccountChartData(t, n.accountId, e.account.port, e.flowType.value, f[e.flowType.value]).then(function (t) {
                e.sumFlow = t[0].data.reduce(function (e, t) {
                    return e + t
                }, 0), g(t[0].data, t[1].data)
            }), "hour" === e.flowType.value && (e.time = moment(f[e.flowType.value]).format("YYYY-MM-DD HH:00")), "day" === e.flowType.value && (e.time = moment(f[e.flowType.value]).format("YYYY-MM-DD")), "week" === e.flowType.value && (e.time = moment(f[e.flowType.value]).day(0).format("YYYY-MM-DD") + " / " + moment(f[e.flowType.value]).day(6).format("YYYY-MM-DD"))
        }, e.changeFlowTime = function (t, n) {
            var o = {hour: 36e5, day: 864e5, week: 6048e5};
            f[e.flowType.value] += n * o[e.flowType.value], e.getChartData(t)
        }, e.resetFlowTime = function (t) {
            f[e.flowType.value] = Date.now(), e.getChartData(t)
        }, e.getChartSize = function () {
            return a("xs") ? {line: [320, 170], pie: [170, 170]} : a("sm") ? {
                line: [360, 190],
                pie: [190, 190]
            } : a("md") ? {line: [360, 180], pie: [180, 180]} : a("gt-md") ? {
                line: [540, 240],
                pie: [240, 240]
            } : void 0
        }, e.fontColor = function (e) {
            return e >= Date.now() ? {color: "#333"} : {color: "#a33"}
        }, e.toUserPage = function (e) {
            e && t.go("admin.userPage", {userId: e})
        }, e.clientIp = function (e, t) {
            l.show(e, t)
        }, e.cycleStyle = function (e) {
            var t = 0;
            return 1 !== e.type && (t = ((Date.now() - e.data.from) / (e.data.to - e.data.from) * 100).toFixed(0)), t > 100 && (t = 100), {background: "linear-gradient(90deg, rgba(0,0,0,0.12) " + t + "%, rgba(0,0,0,0) 0%)"}
        }
    }]).controller("AdminAddAccountController", ["$scope", "$state", "$stateParams", "$http", "$mdBottomSheet", "alertDialog", function (e, t, n, o, a, r) {
        e.setTitle("添加账号"), e.setMenuButton("arrow_back", "admin.account"), e.typeList = [{
            key: "不限量",
            value: 1
        }, {key: "按周", value: 2}, {key: "按月", value: 3}, {key: "按天", value: 4}, {
            key: "小时",
            value: 5
        }], e.timeLimit = {2: 6048e5, 3: 2592e6, 4: 864e5, 5: 36e5}, e.account = {
            time: Date.now(),
            limit: 1,
            flow: 100,
            autoRemove: 0
        }, e.cancel = function () {
            t.go("admin.account")
        }, e.confirm = function () {
            r.loading(), o.post("/api/admin/account", {
                type: +e.account.type,
                port: +e.account.port,
                password: e.account.password,
                time: e.account.time,
                limit: +e.account.limit,
                flow: 1e3 * +e.account.flow * 1e3,
                autoRemove: e.account.autoRemove ? 1 : 0
            }).then(function (e) {
                r.show("添加账号成功", "确定"), t.go("admin.account")
            }).catch(function () {
                r.show("添加账号失败", "确定")
            })
        }, e.pickTime = function () {
            a.show({templateUrl: "/public/views/admin/pickTime.html", preserveScope: !0, scope: e})
        }, e.setStartTime = function (t) {
            e.account.time += t
        }, e.setLimit = function (t) {
            e.account.limit += t, e.account.limit < 1 && (e.account.limit = 1)
        }
    }]).controller("AdminEditAccountController", ["$scope", "$state", "$stateParams", "$http", "$mdBottomSheet", "confirmDialog", "alertDialog", function (e, t, n, o, a, r, i) {
        e.setTitle("编辑账号"), e.setMenuButton("arrow_back", function () {
            t.go("admin.accountPage", {accountId: n.accountId})
        }), e.typeList = [{key: "不限量", value: 1}, {key: "按周", value: 2}, {key: "按月", value: 3}, {
            key: "按天",
            value: 4
        }, {key: "小时", value: 5}], e.timeLimit = {
            2: 6048e5,
            3: 2592e6,
            4: 864e5,
            5: 36e5
        }, e.account = {time: Date.now(), limit: 1, flow: 100, autoRemove: 0};
        var c = n.accountId;
        o.get("/api/admin/server").then(function (t) {
            return e.servers = t.data, o.get("/api/admin/account/" + c)
        }).then(function (t) {
            e.account.type = t.data.type, e.account.port = t.data.port, e.account.password = t.data.password, e.account.autoRemove = t.data.autoRemove, t.data.type >= 2 && t.data.type <= 5 && (e.account.time = t.data.data.create, e.account.limit = t.data.data.limit, e.account.flow = t.data.data.flow / 1e6), e.account.server = t.data.server, e.accountServer = !!e.account.server, e.accountServerObj = {}, e.account.server && e.servers.forEach(function (t) {
                e.account.server.indexOf(t.id) >= 0 ? e.accountServerObj[t.id] = !0 : e.accountServerObj[t.id] = !1
            })
        }), e.cancel = function () {
            t.go("admin.accountPage", {accountId: n.accountId})
        }, e.confirm = function () {
            i.loading();
            var a = Object.keys(e.accountServerObj).map(function (t) {
                if (e.accountServerObj[t]) return +t
            }).filter(function (e) {
                return e
            });
            o.put("/api/admin/account/" + c + "/data", {
                type: +e.account.type,
                port: +e.account.port,
                password: e.account.password,
                time: e.account.time,
                limit: +e.account.limit,
                flow: 1e3 * +e.account.flow * 1e3,
                autoRemove: e.account.autoRemove ? 1 : 0,
                server: e.accountServer ? a : null
            }).then(function (e) {
                i.show("修改账号成功", "确定"), t.go("admin.accountPage", {accountId: n.accountId})
            }).catch(function () {
                i.show("修改账号失败", "确定")
            })
        }, e.pickTime = function () {
            a.show({templateUrl: "/public/views/admin/pickTime.html", preserveScope: !0, scope: e})
        }, e.setStartTime = function (t) {
            e.account.time += t
        }, e.setStartTimeToCurrentTime = function () {
            e.account.time = Date.now()
        }, e.setLimit = function (t) {
            e.account.limit += t, e.account.limit < 1 && (e.account.limit = 1)
        }, e.deleteAccount = function () {
            r.show({
                text: "真的要删除账号吗？", cancel: "取消", confirm: "删除", error: "删除账号失败", fn: function () {
                    return o.delete("/api/admin/account/" + c)
                }
            }).then(function () {
                t.go("admin.account")
            })
        }
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.controller("AdminNoticeController", ["$scope", "$http", "$state", function (e, t, n) {
        e.setTitle("公告管理"), e.setMenuButton("arrow_back", function () {
            n.go("admin.settings")
        }), e.setFabButton(function () {
            n.go("admin.addNotice")
        }), t.get("/api/admin/notice").then(function (t) {
            e.notices = t.data
        }), e.editNotice = function (e) {
            n.go("admin.editNotice", {noticeId: e})
        }
    }]).controller("AdminEditNoticeController", ["$scope", "$http", "$state", "$stateParams", "markdownDialog", function (e, t, n, o, a) {
        e.setTitle("编辑公告"), e.setMenuButton("arrow_back", "admin.notice"), t.get("/api/admin/notice/" + o.noticeId).then(function (t) {
            e.notice = t.data
        }), e.delete = function () {
            t.delete("/api/admin/notice/" + o.noticeId).then(function (e) {
                n.go("admin.notice")
            })
        }, e.save = function () {
            t.put("/api/admin/notice/" + o.noticeId, {
                title: e.notice.title,
                content: e.notice.content
            }).then(function (e) {
                n.go("admin.notice")
            })
        }, e.preview = function () {
            a.show(e.notice.title, e.notice.content)
        }
    }]).controller("AdminNewNoticeController", ["$scope", "$http", "$state", "markdownDialog", function (e, t, n, o) {
        e.setTitle("新增公告"), e.setMenuButton("arrow_back", "admin.notice"), e.cancel = function () {
            n.go("admin.notice")
        }, e.save = function () {
            t.post("/api/admin/notice/", {title: e.notice.title, content: e.notice.content}).then(function (e) {
                n.go("admin.notice")
            })
        }, e.preview = function () {
            o.show(e.notice.title, e.notice.content)
        }
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.controller("AdminServerController", ["$scope", "$http", "$state", "moment", "$localStorage", "adminApi", "$timeout", "$interval", "serverChartDialog", function (e, t, n, o, a, r, i, c, u) {
        e.setTitle("服务器"), e.setMenuRightButton("timeline"), a.admin.serverChart || (a.admin.serverChart = {showChart: !0}), e.serverChart = a.admin.serverChart, e.$on("RightButtonClick", function () {
            u.show(e.serverChart)
        });
        var s = function (e) {
            return e < 1 ? e.toFixed(1) + " B" : e < 1e3 ? e.toFixed(0) + " B" : e < 1e6 ? (e / 1e3).toFixed(0) + " KB" : e < 1e9 ? (e / 1e6).toFixed(0) + " MB" : e < 1e12 ? (e / 1e9).toFixed(1) + " GB" : e
        };
        e.chart = {
            labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
            series: "day",
            datasetOverride: [{yAxisID: "y-axis-1"}],
            options: {
                tooltips: {
                    callbacks: {
                        label: function (e) {
                            return s(e.yLabel)
                        }
                    }
                },
                scales: {yAxes: [{id: "y-axis-1", type: "linear", display: !0, position: "left", ticks: {callback: s}}]}
            }
        }, a.admin.serverInfo || (a.admin.serverInfo = {
            time: Date.now(),
            data: []
        }), e.servers = a.admin.serverInfo.data;
        var l = function () {
            r.getServer(!0).then(function (t) {
                t.map(function (e) {
                    return e.id
                }).join("") === e.servers.map(function (e) {
                    return e.id
                }).join("") ? e.servers.forEach(function (n, o) {
                    n.host = t[o].host, n.name = t[o].name, n.port = t[o].port, n.status = t[o].status, r.getServerFlow(n.id).then(function (e) {
                        n.flow || (n.flow = {}), n.flow.today = e.today, n.flow.week = e.week, n.flow.month = e.month
                    }), e.serverChart.showChart && i(function () {
                        r.getServerFlowLastHour(n.id).then(function (e) {
                            n.chart || (n.chart = {data: [[]]}), e.flow.forEach(function (e, t) {
                                n.chart.data[0][t] = e
                            })
                        })
                    }, 1e3 * o)
                }) : (a.admin.serverInfo = {time: Date.now(), data: t}, e.servers = t, e.servers.forEach(function (t) {
                    r.getServerFlow(t.id).then(function (e) {
                        t.flow = e
                    }), e.serverChart.showChart && i(function () {
                        r.getServerFlowLastHour(t.id).then(function (e) {
                            t.chart || (t.chart = {data: [[]]}), e.flow.forEach(function (e, n) {
                                t.chart.data[0][n] = e
                            })
                        })
                    }, 1e3 * index)
                }))
            })
        };
        l(), e.$on("visibilitychange", function (e, t) {
            "visible" === t && a.admin.serverInfo && Date.now() - a.admin.serverInfo.time >= 3e4 && l()
        }), e.setInterval(c(function () {
            "visible" === document.visibilityState && a.admin.serverInfo && Date.now() - a.admin.serverInfo.time >= 9e4 && l()
        }, 15e3)), e.toServerPage = function (e) {
            n.go("admin.serverPage", {serverId: e})
        }, e.setFabButton(function () {
            n.go("admin.addServer")
        })
    }]).controller("AdminServerPageController", ["$scope", "$state", "$stateParams", "$http", "moment", "$mdDialog", "adminApi", "$q", "$mdMedia", function (e, t, n, o, a, r, i, c, u) {
        e.setTitle("服务器"), e.setMenuButton("arrow_back", "admin.server");
        var s = n.serverId;
        o.get("/api/admin/server/" + s).then(function (t) {
            e.server = t.data
        }).catch(function () {
        }), e.toAccountPage = function (n) {
            i.getAccountId(n - e.server.shift).then(function (e) {
                t.go("admin.accountPage", {accountId: e})
            })
        }, e.editServer = function () {
            t.go("admin.editServer", {serverId: s})
        }, e.deleteServer = function (e) {
            var n = r.confirm().title("").textContent("删除服务器？").ariaLabel("deleteServer").ok("确认").cancel("取消");
            r.show(n).then(function () {
                return o.delete("/api/admin/server/" + s)
            }).then(function () {
                t.go("admin.server")
            }).catch(function () {
            })
        }, e.flowType = "day";
        var l = {hour: Date.now(), day: Date.now(), week: Date.now()}, d = {
            hour: ["0", "", "", "15", "", "", "30", "", "", "45", "", ""],
            day: ["0", "", "", "", "", "", "6", "", "", "", "", "", "12", "", "", "", "", "", "18", "", "", "", "", ""],
            week: ["S", "M", "T", "W", "T", "F", "S"]
        }, m = function (e) {
            return e < 1 ? e.toFixed(1) + " B" : e < 1e3 ? e.toFixed(0) + " B" : e < 1e6 ? (e / 1e3).toFixed(0) + " KB" : e < 1e9 ? (e / 1e6).toFixed(0) + " MB" : e < 1e12 ? (e / 1e9).toFixed(1) + " GB" : e
        }, f = function (t, n) {
            e.pieChart = {
                data: n.map(function (e) {
                    return e.flow
                }), labels: n.map(function (e) {
                    return e.port + (e.userName ? " [" + e.userName + "]" : "")
                }), options: {
                    responsive: !1, tooltips: {
                        enabled: !0, mode: "single", callbacks: {
                            label: function e(t, n) {
                                var e = n.labels[t.index], o = n.datasets[t.datasetIndex].data[t.index];
                                return [e, m(o)]
                            }
                        }
                    }
                }
            }, e.lineChart = {
                data: [t],
                labels: d[e.flowType],
                series: "day",
                datasetOverride: [{yAxisID: "y-axis-1"}],
                options: {
                    responsive: !1,
                    tooltips: {
                        callbacks: {
                            label: function (e) {
                                return m(e.yLabel)
                            }
                        }
                    },
                    scales: {
                        yAxes: [{
                            id: "y-axis-1",
                            type: "linear",
                            display: !0,
                            position: "left",
                            ticks: {callback: m}
                        }]
                    }
                }
            }
        };
        e.getChartData = function () {
            i.getChartData(s, e.flowType, l[e.flowType]).then(function (t) {
                e.sumFlow = t[0].data.reduce(function (e, t) {
                    return e + t
                }, 0), f(t[0].data, t[1].data)
            }), "hour" === e.flowType && (e.time = a(l[e.flowType]).format("YYYY-MM-DD HH:00")), "day" === e.flowType && (e.time = a(l[e.flowType]).format("YYYY-MM-DD")), "week" === e.flowType && (e.time = a(l[e.flowType]).day(0).format("YYYY-MM-DD") + " / " + a(l[e.flowType]).day(6).format("YYYY-MM-DD"))
        }, e.getChartData(), e.changeFlowTime = function (t) {
            var n = {hour: 36e5, day: 864e5, week: 6048e5};
            l[e.flowType] += t * n[e.flowType], e.getChartData()
        }, e.resetFlowTime = function () {
            l[e.flowType] = Date.now(), e.getChartData()
        }, e.getChartSize = function () {
            return u("xs") ? {line: [320, 170], pie: [170, 170]} : u("sm") ? {
                line: [360, 190],
                pie: [190, 190]
            } : u("md") ? {line: [360, 180], pie: [180, 180]} : u("gt-md") ? {
                line: [540, 240],
                pie: [240, 240]
            } : void 0
        }
    }]).controller("AdminAddServerController", ["$scope", "$state", "$stateParams", "$http", "alertDialog", function (e, t, n, o, a) {
        e.setTitle("新增服务器"), e.setMenuButton("arrow_back", "admin.server"),
            e.methods = ["aes-256-cfb", "aes-192-cfb", "aes-128-cfb", "aes-256-ctr", "aes-192-ctr", "aes-128-ctr", "camellia-256-cfb", "camellia-192-cfb", "camellia-128-cfb", "aes-256-gcm", "aes-192-gcm", "aes-128-gcm", "chacha20-ietf", "chacha20-ietf-poly1305"], e.setMethod = function () {
            e.server.method = e.methodSearch
        }, e.server = {scale: 1, shift: 0}, e.confirm = function () {
            a.loading(), o.post("/api/admin/server", {
                name: e.server.name,
                address: e.server.address,
                port: +e.server.port,
                password: e.server.password,
                method: e.server.method,
                comment: e.server.comment,
                scale: e.server.scale,
                shift: e.server.shift
            }, {timeout: 15e3}).then(function (e) {
                a.show("添加服务器成功", "确定"), t.go("admin.server")
            }).catch(function () {
                a.show("添加服务器失败", "确定")
            })
        }, e.cancel = function () {
            t.go("admin.server")
        }
    }]).controller("AdminEditServerController", ["$scope", "$state", "$stateParams", "$http", "confirmDialog", "alertDialog", function (e, t, n, o, a, r) {
        e.setTitle("编辑服务器");
        var i = n.serverId;
        e.setMenuButton("arrow_back", function () {
            t.go("admin.serverPage", {serverId: n.serverId})
        }), e.methods = ["aes-256-cfb", "aes-192-cfb", "aes-128-cfb", "aes-256-ctr", "aes-192-ctr", "aes-128-ctr", "camellia-256-cfb", "camellia-192-cfb", "camellia-128-cfb", "aes-256-gcm", "aes-192-gcm", "aes-128-gcm", "chacha20-ietf", "chacha20-ietf-poly1305"], e.setMethod = function () {
            e.server.method = e.methodSearch
        }, o.get("/api/admin/server/" + i, {params: {noPort: !0}}).then(function (t) {
            e.server = {
                name: t.data.name,
                comment: t.data.comment,
                address: t.data.host,
                port: +t.data.port,
                password: t.data.password,
                method: t.data.method,
                scale: t.data.scale,
                shift: t.data.shift
            }
        }), e.confirm = function () {
            r.loading(), o.put("/api/admin/server/" + n.serverId, {
                name: e.server.name,
                comment: e.server.comment,
                address: e.server.address,
                port: +e.server.port,
                password: e.server.password,
                method: e.server.method,
                scale: e.server.scale,
                shift: e.server.shift
            }).then(function (e) {
                r.show("修改服务器成功", "确定"), t.go("admin.serverPage", {serverId: n.serverId})
            }).catch(function () {
                r.show("修改服务器失败", "确定")
            })
        }, e.cancel = function () {
            t.go("admin.serverPage", {serverId: n.serverId})
        }, e.deleteServer = function () {
            a.show({
                text: "真的要删除服务器吗？", cancel: "取消", confirm: "删除", error: "删除服务器失败", fn: function () {
                    return o.delete("/api/admin/server/" + n.serverId)
                }
            }).then(function () {
                t.go("admin.server")
            })
        }
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.controller("AdminSettingsController", ["$scope", "$http", "$timeout", "$state", function (e, t, n, o) {
        e.setTitle("设置"), e.toNotice = function () {
            o.go("admin.notice")
        }, e.toPayment = function () {
            o.go("admin.paymentSetting")
        }, e.toAccount = function () {
            o.go("admin.accountSetting")
        }, e.toBase = function () {
            o.go("admin.baseSetting")
        }, e.toMail = function () {
            o.go("admin.mailSetting")
        }, e.empty = function () {
        }
    }]).controller("AdminPaymentSettingController", ["$scope", "$http", "$timeout", "$state", function (e, t, n, o) {
        e.setTitle("支付设置"), e.setMenuButton("arrow_back", "admin.settings"), e.time = [{
            id: "hour",
            name: "小时"
        }, {id: "day", name: "天"}, {id: "week", name: "周"}, {id: "month", name: "月"}, {
            id: "season",
            name: "季"
        }, {id: "year", name: "年"}];
        var a = 0, r = null, i = 3500;
        e.saveSetting = function () {
            Date.now() - a <= i && r && n.cancel(r);
            var o = Date.now() - a >= i ? 0 : i - Date.now() + a;
            a = Date.now(), r = n(function () {
                t.put("/api/admin/setting/payment", {data: e.paymentData})
            }, o)
        }, t.get("/api/admin/setting/payment").then(function (t) {
            e.paymentData = t.data, e.$watch("paymentData", function () {
                e.saveSetting()
            }, !0)
        })
    }]).controller("AdminAccountSettingController", ["$scope", "$http", "$timeout", "$state", function (e, t, n, o) {
        e.setTitle("账号设置"), e.setMenuButton("arrow_back", "admin.settings");
        var a = 0, r = null, i = 3500;
        e.saveSetting = function () {
            Date.now() - a <= i && r && n.cancel(r);
            var o = Date.now() - a >= i ? 0 : i - Date.now() + a;
            a = Date.now(), r = n(function () {
                t.put("/api/admin/setting/account", {data: e.accountData})
            }, o)
        }, t.get("/api/admin/setting/account").then(function (t) {
            e.accountData = t.data, e.$watch("accountData", function () {
                e.saveSetting()
            }, !0)
        })
    }]).controller("AdminBaseSettingController", ["$scope", "$http", "$timeout", "$state", "$q", function (e, t, n, o, a) {
        e.setTitle("基本设置"), e.setMenuButton("arrow_back", "admin.settings"), e.baseData = {};
        var r = 0, i = null, c = 3500;
        e.saveSetting = function () {
            Date.now() - r <= c && i && n.cancel(i);
            var o = Date.now() - r >= c ? 0 : c - Date.now() + r;
            r = Date.now(), i = n(function () {
                t.put("/api/admin/setting/base", {data: e.baseData})
            }, o)
        }, t.get("/api/admin/setting/base").then(function (t) {
            e.baseData = t.data, e.setBorder("primaryStyle", e.baseData.themePrimary), e.setBorder("accentStyle", e.baseData.themeAccent), e.$watch("baseData", function () {
                e.saveSetting()
            }, !0)
        }), e.colors = [{value: "red", color: "#F44336"}, {value: "pink", color: "#E91E63"}, {
            value: "purple",
            color: "#9C27B0"
        }, {value: "deep-purple", color: "#673AB7"}, {value: "indigo", color: "#3F51B5"}, {
            value: "blue",
            color: "#2196F3"
        }, {value: "light-blue", color: "#03A9F4"}, {value: "cyan", color: "#00BCD4"}, {
            value: "teal",
            color: "#009688"
        }, {value: "green", color: "#4CAF50"}, {value: "light-green", color: "#8BC34A"}, {
            value: "lime",
            color: "#CDDC39"
        }, {value: "yellow", color: "#FFEB3B"}, {value: "amber", color: "#FFC107"}, {
            value: "orange",
            color: "#FF9800"
        }, {value: "deep-orange", color: "#FF5722"}, {value: "brown", color: "#795548"}, {
            value: "blue-grey",
            color: "#607D8B"
        }, {value: "grey", color: "#9E9E9E"}], e.colors.forEach(function (e) {
            e.primaryStyle = {
                background: e.color,
                "border-style": "solid",
                "border-width": "0px"
            }, e.accentStyle = {background: e.color, "border-style": "solid", "border-width": "0px"}
        }), e.setBorder = function (t, n) {
            e.colors.forEach(function (e) {
                e.value === n ? e[t]["border-width"] = "2px" : e[t]["border-width"] = "0px"
            })
        }, e.setPrimaryColor = function (t) {
            e.baseData.themePrimary = t, e.setBorder("primaryStyle", t)
        }, e.setAccentColor = function (t) {
            e.baseData.themeAccent = t, e.setBorder("accentStyle", t)
        }, e.serviceWorkerUpdate = function () {
            e.baseData.serviceWorkerTime = Date.now()
        }, e.showBrowserPush = !1;
        var u = function () {
            "serviceWorker" in navigator && (e.showBrowserPush = !0, navigator.serviceWorker.ready.then(function (e) {
                return e.pushManager.getSubscription()
            }).then(function (t) {
                t ? e.receiveBrowserPush = !0 : e.receiveBrowserPush = !1
            }))
        };
        u(), e.changeBrowserPush = function () {
            navigator.serviceWorker.ready.then(function (n) {
                if (e.receiveBrowserPush) return n.pushManager.subscribe({userVisibleOnly: !0}).then(function (e) {
                    t.post("/api/push/client", {data: e})
                });
                var o = void 0;
                return n.pushManager.getSubscription().then(function (e) {
                    return o = e, t.delete("/api/push/client", {params: {data: e}})
                }).then(function (e) {
                    return o.unsubscribe()
                })
            })
        }
    }]).controller("AdminMailSettingController", ["$scope", "$http", "$timeout", "$state", "setEmailDialog", function (e, t, n, o, a) {
        e.setTitle("邮件设置"), e.setMenuButton("arrow_back", "admin.settings"), e.mails = [{
            type: "code",
            name: "注册验证码"
        }, {type: "reset", name: "密码重置"}, {type: "order", name: "订单完成"}], e.setEmail = function (e) {
            a.show(e)
        }
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.controller("AdminUserController", ["$scope", "$state", "$stateParams", "adminApi", "$mdMedia", "$localStorage", "userSortDialog", "$timeout", function (e, t, n, o, a, r, i, c) {
        e.setTitle("用户"), e.setMenuSearchButton("search"), e.setFabButton(function () {
            t.go("admin.addUser")
        }), r.admin.userSortSettings || (r.admin.userSortSettings = {sort: "id_asc"}), e.userSort = r.admin.userSortSettings, e.setMenuRightButton("sort_by_alpha"), e.currentPage = 1, e.isUserLoading = !1, e.isUserPageFinish = !1, e.users = [];
        var u = function () {
            return a("xs") ? 30 : a("sm") ? 30 : a("md") ? 60 : a("gt-md") ? 80 : void 0
        };
        e.getUsers = function (n) {
            e.isUserLoading = !0, o.getUser({
                page: e.currentPage,
                pageSize: u(),
                search: n,
                sort: e.userSort.sort
            }).then(function (t) {
                e.total = t.total, !n && e.menuSearch.text || n && n !== e.menuSearch.text || (t.users.forEach(function (t) {
                    e.users.push(t)
                }), t.maxPage > e.currentPage ? e.currentPage++ : e.isUserPageFinish = !0, e.isUserLoading = !1)
            }).catch(function () {
                "admin.user" === t.current.name && c(function () {
                    e.getUsers(n)
                }, 5e3)
            })
        };
        var s = function () {
            e.users = [], e.currentPage = 1, e.isUserPageFinish = !1, e.getUsers(e.menuSearch.text)
        };
        e.toUser = function (e) {
            t.go("admin.userPage", {userId: e})
        }, e.$on("cancelSearch", function () {
            e.users = [], e.currentPage = 1, e.isUserPageFinish = !1, e.getUsers()
        });
        var l = void 0;
        e.$watch("menuSearch.text", function () {
            e.menuSearch.text && (l && c.cancel(l), l = c(function () {
                s()
            }, 500))
        }), e.view = function (t) {
            !t || e.isUserLoading || e.isUserPageFinish || e.getUsers()
        }, e.userSortDialog = function () {
            i.show().then(function () {
                e.users = [], e.currentPage = 1, e.isUserPageFinish = !1, e.getUsers()
            })
        }, e.$on("RightButtonClick", function () {
            e.userSortDialog()
        }), e.userColor = function (e) {
            return e.port ? {} : {background: "red-50", "border-color": "blue-300"}
        }
    }]).controller("AdminUserPageController", ["$scope", "$state", "$stateParams", "$http", "$mdDialog", "adminApi", "orderDialog", "confirmDialog", "emailDialog", "addAccountDialog", function (e, t, n, o, a, r, i, c, u, s) {
        e.setTitle("用户信息"), e.setMenuButton("arrow_back", "admin.user");
        var l = n.userId, d = function () {
            r.getUserData(l).then(function (t) {
                e.user = t.user, e.server = t.server, e.alipayOrders = t.alipayOrders, e.paypalOrders = t.paypalOrders, e.user.account.forEach(function (e) {
                    r.getUserPortLastConnect(e.port).then(function (t) {
                        e.lastConnect = t.lastConnect
                    })
                }), e.user.macAccount = t.macAccount
            }).catch(function (e) {
                t.go("admin.user")
            })
        };
        d(), e.deleteUserAccount = function (e) {
            c.show({
                text: "将此账号移除出该用户的列表？", cancel: "取消", confirm: "移除", error: "移除账号失败", fn: function () {
                    return o.delete("/api/admin/user/" + l + "/" + e)
                }
            }).then(function () {
                d()
            }).catch(function () {
            })
        }, e.deleteMacAccount = function (e) {
            c.show({
                text: "删除该账号？", cancel: "取消", confirm: "删除", error: "删除账号失败", fn: function () {
                    return o.delete("/api/admin/account/mac/", {params: {id: e}})
                }
            }).then(function () {
                d()
            }).catch(function () {
            })
        }, e.setFabButton(function () {
            s.show(l, e.user.account, e.server).then(function (e) {
                d()
            })
        }), e.editMacAccount = function (t) {
            s.edit(t, e.user.account, e.server).then(function (e) {
                d()
            })
        }, e.toAccountPage = function (e) {
            r.getAccountId(e).then(function (e) {
                t.go("admin.accountPage", {accountId: e})
            })
        }, e.showOrderInfo = function (e) {
            i.show(e)
        }, e.deleteUser = function () {
            c.show({
                text: "真的要删除该用户吗？", cancel: "取消", confirm: "删除", error: "删除用户失败", fn: function () {
                    return o.delete("/api/admin/user/" + l)
                }
            }).then(function () {
                t.go("admin.user")
            })
        }, e.sendEmail = function () {
            u.show(l)
        }
    }]).controller("AdminAddUserController", ["$scope", "$state", "$stateParams", "$http", "alertDialog", function (e, t, n, o, a) {
        e.setTitle("添加用户"), e.setMenuButton("arrow_back", "admin.user"), e.user = {}, e.confirm = function () {
            a.loading(), o.post("/api/admin/user/add", {
                email: e.user.email,
                password: e.user.password
            }, {timeout: 15e3}).then(function (e) {
                a.show("添加用户成功", "确定"), t.go("admin.user")
            }).catch(function () {
                a.show("添加用户失败", "确定")
            })
        }, e.cancel = function () {
            t.go("admin.user")
        }
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.controller("HomeController", ["$scope", "$mdMedia", "$mdSidenav", "$state", "$http", "$timeout", "$localStorage", function (e, t, n, o, a, r, i) {
        "normal" === i.home.status ? o.go("user.index") : "admin" === i.home.status ? o.go("admin.index") : (i.admin = {}, i.user = {}, e.setMainLoading(!1)), e.innerSideNav = !0, e.menuButton = function () {
            t("gt-sm") ? e.innerSideNav = !e.innerSideNav : n("left").toggle()
        }, e.menus = [{name: "首页", icon: "home", click: "home.index"}, {
            name: "登录",
            icon: "cloud",
            click: "home.login"
        }, {name: "注册", icon: "face", click: "home.signup"}], e.menuClick = function (t) {
            n("left").close(), o.go(e.menus[t].click)
        }
    }]).controller("HomeIndexController", ["$scope", "$state", function (e, t) {
        e.icons = [{icon: "flash_on", title: "快速搭建", content: "仅依赖Node.js，无需安装数据库（可选MySQL）"}, {
            icon: "build",
            title: "易于配置",
            content: "带有插件系统，仅需修改配置文件即可运行"
        }, {icon: "vpn_key", title: "官方标准", content: "支持libev和python版本的标准manager API"}], e.login = function () {
            t.go("home.login")
        }, e.signup = function () {
            t.go("home.signup")
        }
    }]).controller("HomeLoginController", ["$scope", "$state", "homeApi", "alertDialog", "$localStorage", function (e, t, n, o, a) {
        e.user = {}, e.login = function () {
            o.loading().then(function () {
                return n.userLogin(e.user.email, e.user.password)
            }).then(function (e) {
                return a.home.status = e, o.close().then(function () {
                    return e
                })
            }).then(function (e) {
                "normal" === e ? t.go("user.index") : "admin" === e && t.go("admin.index")
            }).catch(function (e) {
                o.show(e, "确定")
            })
        }, e.findPassword = function () {
            o.loading().then(function () {
                return n.findPassword(e.user.email)
            }).then(function (e) {
                o.show(e, "确定")
            }).catch(function (e) {
                o.show(e, "确定")
            })
        }, e.enterKey = function (t) {
            13 === t.keyCode && e.login()
        }
    }]).controller("HomeSignupController", ["$scope", "$state", "$interval", "$timeout", "homeApi", "alertDialog", function (e, t, n, o, a, r) {
        e.user = {}, e.sendCodeTime = 0, e.sendCode = function () {
            r.loading().then(function () {
                return a.sendCode(e.user.email)
            }).then(function (t) {
                r.show("验证码已发至邮箱", "确定"), e.sendCodeTime = 120;
                var o = n(function () {
                    e.sendCodeTime > 0 ? e.sendCodeTime-- : (n.cancel(o), e.sendCodeTime = 0)
                }, 1e3)
            }).catch(function (e) {
                r.show(e, "确定")
            })
        }, e.signup = function () {
            r.loading().then(function () {
                return a.userSignup(e.user.email, e.user.code, e.user.password)
            }).then(function (e) {
                r.show("用户注册成功", "确定").then(function (e) {
                    t.go("home.login")
                })
            }).catch(function (e) {
                r.show(e, "确定")
            })
        }
    }]).controller("HomeResetPasswordController", ["$scope", "$http", "$state", "$stateParams", "alertDialog", function (e, t, n, o, a) {
        e.user = {};
        var r = o.token;
        a.loading().then(function () {
            return t.get("/api/home/password/reset", {params: {token: r}})
        }).then(function () {
            return a.close()
        }).catch(function () {
            a.show("该链接已经失效", "确定").then(function () {
                n.go("home.index")
            })
        }), e.resetPassword = function () {
            a.loading(), t.post("/api/home/password/reset", {token: r, password: e.user.password}).then(function () {
                a.show("修改密码成功", "确定").then(function () {
                    n.go("home.login")
                })
            }).catch(function () {
                a.show("修改密码失败", "确定")
            })
        }
    }]).controller("HomeMacLoginController", ["$scope", "$http", "$state", "$stateParams", "$localStorage", function (e, t, n, o, a) {
        var r = o.mac;
        t.post("/api/home/macLogin", {mac: r}).then(function () {
            a.home.status = "normal", n.go("user.index")
        }).catch(function () {
            n.go("home.index")
        })
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.controller("MainController", ["$scope", "$localStorage", "$location", "$http", "$translate", "languageDialog", "$state", function (e, t, n, o, a, r, i) {
        e.version = window.ssmgrVersion, e.config = JSON.parse(window.ssmgrConfig), t.$default({
            admin: {},
            home: {},
            user: {}
        }), e.mainLoading = !0, e.setMainLoading = function (t) {
            e.mainLoading = t
        }, document.addEventListener("visibilitychange", function () {
            e.$broadcast("visibilitychange", document.visibilityState)
        });
        var c = function () {
            var e = navigator.userAgent, t = !!e.match(/iPad/i) || !!e.match(/iPhone/i), n = !!e.match(/WebKit/i),
                o = !!window.navigator.standalone, a = t && n && !e.match(/CriOS/i);
            return a && o
        };
        c() && "/home/index" === n.url() && "/home/index" !== t.home.url && (location.href = t.home.url || "/"), e.$on("$stateChangeSuccess", function () {
            e.currentState = i.current.name, t.home.url = n.url()
        });
        var u = function () {
            return /micromessenger/.test(navigator.userAgent.toLowerCase())
        };
        !u() && "serviceWorker" in navigator && navigator.serviceWorker.register("/serviceworker.js").then(function () {
            return navigator.serviceWorker.ready
        }).then(function (e) {
            console.log("Service Worker is ready to go!", e.scope)
        }).catch(function (e) {
            console.log("Service Worker failed to boot", e)
        }), e.chooseLanguage = function () {
            r.show()
        }, a.use(t.language || navigator.language || "zh-CN")
    }])
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.controller("UserController", ["$scope", "$mdMedia", "$mdSidenav", "$state", "$http", "$interval", "$localStorage", "userApi", function (e, t, n, o, a, r, i, c) {
        "normal" !== i.home.status ? o.go("home.index") : e.setMainLoading(!1), e.innerSideNav = !0, e.sideNavWidth = function () {
            return e.innerSideNav ? {width: "200px"} : {width: "60px"}
        }, e.menuButton = function () {
            t("gt-sm") ? e.innerSideNav = !e.innerSideNav : n("left").toggle()
        }, e.menus = [{name: "首页", icon: "home", click: "user.index"}, {
            name: "账号",
            icon: "account_circle",
            click: "user.account"
        }, {name: "设置", icon: "settings", click: "user.changePassword"}, {name: "divider"}, {
            name: "退出",
            icon: "exit_to_app",
            click: function () {
                a.post("/api/home/logout").then(function () {
                    i.home = {}, i.user = {}, o.go("home.index")
                })
            }
        }], e.menuClick = function (t) {
            n("left").close(), "function" == typeof e.menus[t].click ? e.menus[t].click() : o.go(e.menus[t].click)
        }, e.title = "", e.setTitle = function (t) {
            e.title = t
        }, e.interval = null, e.setInterval = function (t) {
            e.interval = t
        }, e.$on("$stateChangeStart", function (t, n, o) {
            e.title = "", e.interval && r.cancel(e.interval)
        }), i.user.serverInfo || i.user.accountInfo || c.getUserAccount().then(function (e) {
            i.user.serverInfo = {data: e.servers, time: Date.now()}, i.user.accountInfo = {
                data: e.account,
                time: Date.now()
            }
        })
    }]).controller("UserIndexController", ["$scope", "$state", "userApi", "markdownDialog", function (e, t, n, o) {
        e.setTitle("首页"), n.getNotice().then(function (t) {
            e.notices = t
        }), e.toMyAccount = function () {
            t.go("user.account")
        }, e.showNotice = function (e) {
            o.show(e.title, e.content)
        }
    }]).controller("UserAccountController", ["$scope", "$http", "$mdMedia", "userApi", "alertDialog", "payDialog", "qrcodeDialog", "$interval", "$localStorage", "changePasswordDialog", function (e, t, n, o, a, r, i, c, u, s) {
        e.setTitle("账号"), e.flexGtSm = 100, u.user.serverInfo || (u.user.serverInfo = {
            time: Date.now(),
            data: []
        }), e.servers = u.user.serverInfo.data, u.user.accountInfo || (u.user.accountInfo = {
            time: Date.now(),
            data: []
        }), e.account = u.user.accountInfo.data, e.account.length >= 2 && (e.flexGtSm = 50), t.get("/api/user/multiServerFlow").then(function (t) {
            e.isMultiServerFlow = t.data.status
        });
        var l = function (t, n) {
            t.forEach(function (t) {
                t.serverList = e.servers.filter(function (e) {
                    return !t.server || t.server.indexOf(e.id) >= 0
                })
            })
        };
        l(e.account, e.servers);
        var d = function () {
            o.getUserAccount().then(function (t) {
                e.servers = t.servers, t.account.map(function (e) {
                    return e.id
                }).join("") === e.account.map(function (e) {
                    return e.id
                }).join("") ? t.account.forEach(function (t, n) {
                    e.account[n].data = t.data, e.account[n].password = t.password, e.account[n].port = t.port, e.account[n].type = t.type
                }) : e.account = t.account, l(e.account, e.servers), u.user.serverInfo.data = t.servers, u.user.serverInfo.time = Date.now(), u.user.accountInfo.data = t.account, u.user.accountInfo.time = Date.now(), e.account.length >= 2 && (e.flexGtSm = 50)
            })
        };
        d();
        var m = function (e) {
            return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
                return String.fromCharCode("0x" + t)
            }))
        };
        e.createQrCode = function (e, t, n, o, a) {
            return "ss://" + m(e + ":" + t + "@" + n + ":" + o)
        }, e.getServerPortData = function (t, n, a) {
            t.currentServerId = n;
            var r = e.servers.filter(function (e) {
                return e.id === n
            })[0].scale;
            t.isFlowOutOfLimit || (t.isFlowOutOfLimit = {}), o.getServerPortData(t, n, a).then(function (o) {
                t.lastConnect = o.lastConnect, t.serverPortFlow = o.flow;
                var a = 0;
                t.data && (a = t.data.flow * (e.isMultiServerFlow ? 1 : r)), t.isFlowOutOfLimit[n] = !!a && t.serverPortFlow >= a
            })
        }, e.$on("visibilitychange", function (t, n) {
            "visible" === n && u.user.accountInfo && Date.now() - u.user.accountInfo.time >= 1e4 && e.account.forEach(function (t) {
                e.getServerPortData(t, t.currentServerId, t.port)
            })
        }), e.setInterval(c(function () {
            e.account && o.updateAccount(e.account).then(function () {
                l(e.account, e.servers)
            }), e.account.forEach(function (e) {
                var t = e.currentServerId;
                o.getServerPortData(e, e.currentServerId, e.port).then(function (n) {
                    t === e.currentServerId && (e.lastConnect = n.lastConnect, e.serverPortFlow = n.flow)
                })
            })
        }, 6e4)), e.getQrCodeSize = function () {
            return n("xs") ? 230 : 180
        }, e.showChangePasswordDialog = function (e, t) {
            s.show(e, t).then(function () {
                d()
            })
        }, e.createOrder = function (e) {
            r.chooseOrderType(e)
        }, e.fontColor = function (e) {
            return e >= Date.now() ? {color: "#333"} : {color: "#a33"}
        }, e.isAccountOutOfDate = function (e) {
            return e.type >= 2 && e.type <= 5 && Date.now() >= e.data.expire
        }, e.showQrcodeDialog = function (t, n, o, a, r) {
            var c = e.createQrCode(t, n, o, a, r);
            i.show(r, c)
        }, e.cycleStyle = function (e) {
            var t = 0;
            return 1 !== e.type && (t = ((Date.now() - e.data.from) / (e.data.to - e.data.from) * 100).toFixed(0)), t > 100 && (t = 100), {background: "linear-gradient(90deg, rgba(0,0,0,0.12) " + t + "%, rgba(0,0,0,0) 0%)"}
        }
    }]).controller("UserChangePasswordController", ["$scope", "$state", "userApi", "alertDialog", "$http", "$localStorage", function (e, t, n, o, a, r) {
        e.setTitle("设置"), e.data = {password: "", newPassword: "", newPasswordAgain: ""}, e.confirm = function () {
            o.loading(), n.changePassword(e.data.password, e.data.newPassword).then(function (e) {
                o.show("修改密码成功，请重新登录", "确定").then(function () {
                    return a.post("/api/home/logout")
                }).then(function () {
                    r.home = {}, r.user = {}, t.go("home.index")
                })
            }).catch(function (e) {
                o.show("修改密码失败", "确定")
            })
        }
    }])
}, function (e, t, n) {
    "use strict";
    var o = n(26);
    o.keys().forEach(function (e) {
        o(e)
    })
}, function (e, t, n) {
    function o(e) {
        return n(a(e))
    }

    function a(e) {
        return r[e] || function () {
            throw new Error("Cannot find module '" + e + "'.")
        }()
    }

    var r = {
        "./account.js": 27,
        "./addAccount.js": 28,
        "./alert.js": 29,
        "./changePassword.js": 30,
        "./confirm.js": 31,
        "./email.js": 32,
        "./ip.js": 33,
        "./language.js": 34,
        "./markdown.js": 35,
        "./order.js": 36,
        "./pay.js": 37,
        "./qrcode.js": 38,
        "./serverChart.js": 39,
        "./setEmail.js": 40,
        "./user.js": 41
    };
    o.keys = function () {
        return Object.keys(r)
    }, o.resolve = a, e.exports = o, o.id = 26
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("accountSortTool", [function () {
        var e = function (e, t) {
            e.account = e.originalAccount.sort(function (e, n) {
                return "port_asc" === t.sort ? e.port >= n.port ? 1 : -1 : "port_desc" === t.sort ? e.port <= n.port ? 1 : -1 : "expire_desc" === t.sort ? e.data ? n.data ? e.data.expire <= n.data.expire ? 1 : -1 : 1 : -1 : "expire_asc" === t.sort ? e.data ? n.data && e.data.expire >= n.data.expire ? 1 : -1 : 1 : void 0
            }), e.account = e.account.filter(function (e) {
                var n = !0;
                return t.filter.unlimit || 1 !== e.type || (n = !1), !t.filter.expired && e.data && e.data.expire >= Date.now() && (n = !1), !t.filter.unexpired && e.data && e.data.expire <= Date.now() && (n = !1), n
            })
        };
        return e
    }]), o.factory("accountSortDialog", ["$mdDialog", function (e) {
        var t = {}, n = function () {
            return e.hide().then(function (e) {
                o = null
            }).catch(function (e) {
                o = null
            })
        };
        t.hide = n;
        var o = null, a = function () {
            return !(!o || o.$$state.status)
        }, i = {
            templateUrl: r + "/public/views/admin/accountSortAndFilterDialog.html",
            escapeToClose: !1,
            locals: {bind: t},
            bindToController: !0,
            controller: ["$scope", "$mdDialog", "$sessionStorage", "accountSortTool", "bind", function (e, t, n, o, a) {
                e.publicInfo = a, e.sortAndFilter = function () {
                    o(e.publicInfo.accountInfo, e.publicInfo.accountMethod)
                }
            }],
            clickOutsideToClose: !0
        }, c = function (n, r) {
            return a() ? o : (t.accountMethod = n, t.accountInfo = r, o = e.show(i))
        };
        return {show: c, hide: n}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("addAccountDialog", ["$mdDialog", "$state", "$http", function (e, t, n) {
        var o = JSON.parse(a.ssmgrConfig).macAccount, i = {};
        i.status = "choose", i.accountType = "port";
        var c = function () {
            return e.hide().then(function (e) {
                u = null
            }).catch(function (e) {
                u = null
            })
        };
        i.hide = c;
        var u = null, s = function () {
            return !(!u || u.$$state.status)
        }, l = {
            templateUrl: r + "/public/views/dialog/addAccount.html",
            escapeToClose: !1,
            locals: {bind: i},
            bindToController: !0,
            controller: ["$scope", "$mdMedia", "$mdDialog", "$http", "$localStorage", "bind", function (e, t, n, o, a, r) {
                e.publicInfo = r, e.setDialogWidth = function () {
                    return t("xs") || t("sm") ? {} : {"min-width": "400px", "max-width": "640px"}
                }, e.$watch("publicInfo.mac.account", function () {
                    var t = e.publicInfo.account.filter(function (t) {
                        return t.id === e.publicInfo.mac.account
                    })[0];
                    t.server ? e.publicInfo.validServer = e.publicInfo.server.filter(function (e) {
                        return JSON.parse(t.server).indexOf(e.id) >= 0
                    }) : e.publicInfo.validServer = e.publicInfo.server
                })
            }],
            fullscreen: !0,
            clickOutsideToClose: !0
        }, d = function () {
            i.status = "port", i.isLoading = !0, n.get("/api/admin/user/account").then(function (e) {
                i.isLoading = !1, i.account = e.data
            })
        }, m = function () {
            i.status = "mac", i.mac = {account: i.account[0].id, server: i.server[0].id}
        }, f = function () {
            "port" === i.accountType ? d() : "mac" === i.accountType && m()
        };
        i.next = f;
        var p = function () {
            var e = [];
            i.account.forEach(function (t) {
                t.isChecked && e.push(n.put("/api/admin/user/" + i.userId + "/" + t.id))
            }), Promise.all(e).then(function (e) {
                c()
            })
        };
        i.setPort = p;
        var h = function () {
            n.post("/api/admin/account/mac/" + i.mac.macAddress, {
                userId: i.userId,
                accountId: i.mac.account,
                serverId: i.mac.server
            }).then(function (e) {
                c()
            })
        };
        i.setMac = h;
        var g = function () {
            n.put("/api/admin/account/mac", {
                id: i.mac.id,
                macAddress: i.mac.macAddress,
                accountId: i.mac.account,
                serverId: i.mac.server
            }).then(function (e) {
                c()
            })
        };
        i.editMac = g;
        var v = function (t, n, o) {
            return i.account = n, i.server = o, i.mac = {
                id: t.id,
                macAddress: t.mac,
                account: t.accountId,
                server: t.serverId
            }, i.isLoading = !1, i.status = "edit", s() ? u : u = e.show(l)
        }, w = function (t, n, a) {
            return i.userId = t, i.account = n, i.server = a, i.isLoading = !1, o ? i.status = "choose" : f(), s() ? u : u = e.show(l)
        };
        return {show: w, edit: v}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("alertDialog", ["$q", "$mdDialog", function (e, t) {
        var n = {};
        n.isLoading = !1, n.content = "", n.button = "";
        var o = null, a = function () {
            return !(!o || o.$$state.status)
        }, i = function () {
            return t.hide().then(function (e) {
                n.isLoading = !1, o = null
            }).catch(function (e) {
                n.isLoading = !1, o = null
            })
        };
        n.close = i;
        var c = {
            templateUrl: r + "/public/views/dialog/alert.html",
            escapeToClose: !1,
            locals: {bind: n},
            bindToController: !0,
            controller: ["$scope", "$mdDialog", "bind", function (e, t, n) {
                e.publicInfo = n
            }],
            clickOutsideToClose: !1
        }, u = function (r, i) {
            return n.content = r, n.button = i, a() ? (n.isLoading = !1, o) : (o = t.show(c), e.resolve())
        }, s = function () {
            return n.isLoading = !0, a() ? e.resolve() : u()
        };
        return {show: u, loading: s, close: i}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("changePasswordDialog", ["$mdDialog", "userApi", function (e, t) {
        var n = {status: "show"}, o = null, a = function () {
            return !(!o || o.$$state.status)
        }, i = function (t, r) {
            return a() ? o : (n.status = "show", n.accountId = t, n.password = r, o = e.show(s))
        }, c = function () {
            return e.hide().then(function (e) {
                o = null
            }).catch(function (e) {
                o = null
            })
        }, u = function () {
            n.password && (n.status = "loading", t.changeShadowsocksPassword(n.accountId, n.password).then(function () {
                n.status = "success"
            }).catch(function () {
                n.status = "error"
            }))
        };
        n.close = c, n.changePassword = u;
        var s = {
            templateUrl: r + "/public/views/dialog/changePassword.html",
            escapeToClose: !1,
            locals: {bind: n},
            bindToController: !0,
            controller: ["$scope", "bind", function (e, t) {
                e.publicInfo = t
            }],
            clickOutsideToClose: !1
        };
        return {show: i}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("confirmDialog", ["$mdDialog", function (e) {
        var t = {status: "show"}, n = null, o = function () {
            return !(!n || n.$$state.status)
        }, a = function () {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            t.status = "show";
            var r = a.text, i = a.cancel, c = a.confirm, u = a.error, l = a.fn;
            return t.text = r, t.cancel = i, t.confirm = c, t.error = u, t.fn = l, o() ? n : n = e.show(s)
        }, i = function () {
            return e.cancel().then(function (e) {
                n = null
            }).catch(function (e) {
                n = null
            })
        }, c = function () {
            return e.hide().then(function (e) {
                n = null
            }).catch(function (e) {
                n = null
            })
        };
        t.cancelFn = i;
        var u = function () {
            t.status = "loading", t.fn().then(function (e) {
                c()
            }).catch(function () {
                t.status = "error"
            })
        };
        t.confirmFn = u;
        var s = {
            templateUrl: r + "/public/views/dialog/confirm.html",
            escapeToClose: !1,
            locals: {bind: t},
            bindToController: !0,
            controller: ["$scope", "$mdDialog", "bind", function (e, t, n) {
                e.publicInfo = n
            }],
            clickOutsideToClose: !1
        };
        return {show: a}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("emailDialog", ["$mdDialog", "$state", "$http", function (e, t, n) {
        var o = {}, a = function () {
            return e.hide().then(function (e) {
                c = null
            }).catch(function (e) {
                c = null
            })
        };
        o.hide = a;
        var i = function (e, t) {
            l(), n.post("/api/admin/user/" + o.userId + "/sendEmail", {title: e, content: t}).then(function (e) {
                a()
            }).catch(function () {
                o.isLoading = !1
            })
        };
        o.send = i;
        var c = null, u = function () {
            return !(!c || c.$$state.status)
        }, s = {
            templateUrl: r + "/public/views/dialog/email.html",
            escapeToClose: !1,
            locals: {bind: o},
            bindToController: !0,
            controller: ["$scope", "$mdMedia", "$mdDialog", "$http", "$localStorage", "bind", function (e, t, n, o, a, r) {
                e.publicInfo = r, a.admin.email || (a.admin.email = {
                    title: "",
                    content: ""
                }), e.publicInfo.email = a.admin.email, e.setDialogWidth = function () {
                    return t("xs") || t("sm") ? {} : {"min-width": "400px"}
                }
            }],
            fullscreen: !0,
            clickOutsideToClose: !1
        }, l = function () {
            o.isLoading = !0
        }, d = function (t) {
            return o.isLoading = !1, u() ? c : (o.userId = t, c = e.show(s))
        };
        return {show: d}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("ipDialog", ["$mdDialog", "adminApi", function (e, t) {
        var n = {}, o = function () {
            return e.hide().then(function (e) {
                a = null
            }).catch(function (e) {
                a = null
            })
        };
        n.hide = o;
        var a = null, i = function () {
            return !(!a || a.$$state.status)
        }, c = {
            templateUrl: r + "/public/views/dialog/ip.html",
            escapeToClose: !1,
            locals: {bind: n},
            bindToController: !0,
            controller: ["$scope", "$state", "$http", "$mdDialog", "$mdMedia", "$q", "bind", function (e, n, o, a, r, i, c) {
                e.publicInfo = c, e.setDialogWidth = function () {
                    return r("xs") || r("sm") ? {} : {"min-width": "400px"}
                }, i.all([o.get("/api/admin/account/" + e.publicInfo.serverId + "/" + e.publicInfo.accountId + "/ip"), o.get("/api/admin/account/" + e.publicInfo.accountId + "/ip")]).then(function (t) {
                    e.ip = t[0].data.ip.map(function (e) {
                        return {ip: e}
                    }), e.allIp = t[1].data.ip.map(function (e) {
                        return {ip: e}
                    }), e.ip.forEach(function (e) {
                        u(e.ip).then(function (t) {
                            e.info = t
                        })
                    }), e.allIp.forEach(function (e) {
                        u(e.ip).then(function (t) {
                            e.info = t
                        })
                    })
                });
                var u = function (e) {
                    return t.getIpInfo(e)
                }
            }],
            fullscreen: !0,
            clickOutsideToClose: !0
        }, u = function (t, o) {
            return i() ? a : (n.serverId = t, n.accountId = o, a = e.show(c))
        };
        return {show: u}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("languageDialog", ["$mdDialog", function (e) {
        var t = {}, n = function () {
            return e.hide().then(function (e) {
                o = null
            }).catch(function (e) {
                o = null
            })
        };
        t.hide = n;
        var o = null, a = function () {
            return !(!o || o.$$state.status)
        }, i = {
            templateUrl: r + "/public/views/dialog/language.html",
            escapeToClose: !1,
            locals: {bind: t},
            bindToController: !0,
            controller: ["$scope", "$translate", "$localStorage", "bind", function (e, t, n, o) {
                e.publicInfo = o, e.publicInfo.myLanguage = n.language || navigator.language || "zh-CN", e.chooseLanguage = function () {
                    t.use(e.publicInfo.myLanguage), n.language = e.publicInfo.myLanguage, e.publicInfo.hide()
                }, e.languages = [{id: "zh-CN", name: "中文"}, {id: "en-US", name: "English"}]
            }],
            clickOutsideToClose: !0
        }, c = function (t, n) {
            return a() ? o : o = e.show(i)
        };
        return {show: c, hide: n}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("markdownDialog", ["$mdDialog", function (e) {
        var t = {}, n = function () {
            return e.hide().then(function (e) {
                o = null
            }).catch(function (e) {
                o = null
            })
        };
        t.hide = n;
        var o = null, a = function () {
            return !(!o || o.$$state.status)
        }, i = {
            templateUrl: r + "/public/views/admin/previewNotice.html",
            escapeToClose: !1,
            locals: {bind: t},
            bindToController: !0,
            controller: ["$scope", "$mdMedia", "$mdDialog", "bind", function (e, t, n, o) {
                e.publicInfo = o, e.setDialogWidth = function () {
                    return t("xs") || t("sm") ? {} : {"min-width": "400px"}
                }
            }],
            fullscreen: !0,
            clickOutsideToClose: !0
        }, c = function (n, r) {
            return a() ? o : (t.title = n, t.markdown = r, o = e.show(i))
        };
        return {show: c}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("orderDialog", ["$mdDialog", "$state", function (e, t) {
        var n = {}, o = function () {
            return e.hide().then(function (e) {
                i = null
            }).catch(function (e) {
                i = null
            })
        };
        n.hide = o;
        var a = function (e) {
            o(), t.go("admin.userPage", {userId: e})
        };
        n.toUserPage = a;
        var i = null, c = function () {
            return !(!i || i.$$state.status)
        }, u = {
            templateUrl: r + "/public/views/dialog/order.html",
            escapeToClose: !1,
            locals: {bind: n},
            bindToController: !0,
            controller: ["$scope", "$mdMedia", "$mdDialog", "bind", function (e, t, n, o) {
                e.publicInfo = o, e.setDialogWidth = function () {
                    return t("xs") || t("sm") ? {} : {"min-width": "400px"}
                }
            }],
            fullscreen: !0,
            clickOutsideToClose: !0
        }, s = function (t) {
            return c() ? i : (n.order = t, i = e.show(u))
        };
        return {show: s}
    }]), o.factory("orderFilterDialog", ["$mdDialog", function (e) {
        var t = {}, n = function () {
            return e.hide().then(function (e) {
                o = null
            }).catch(function (e) {
                o = null
            })
        };
        t.hide = n;
        var o = null, a = function () {
            return !(!o || o.$$state.status)
        }, i = {
            templateUrl: r + "/public/views/admin/orderFilterDialog.html",
            escapeToClose: !1,
            locals: {bind: t},
            bindToController: !0,
            controller: ["$scope", "$mdDialog", "$localStorage", "bind", function (e, t, n, o) {
                e.publicInfo = o, e.orderFilter = n.admin.orderFilterSettings
            }],
            clickOutsideToClose: !0
        }, c = function () {
            return a() ? o : o = e.show(i)
        };
        return {show: c, hide: n}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("payDialog", ["$mdDialog", "$interval", "$timeout", "$http", function (e, t, n, o) {
        var i = {
            config: JSON.parse(a.ssmgrConfig),
            orderType: "month",
            time: [{type: "hour", name: "一小时"}, {type: "day", name: "一天"}, {type: "week", name: "一周"}, {
                type: "month",
                name: "一个月"
            }, {type: "season", name: "三个月"}, {type: "year", name: "一年"}]
        }, c = null, u = function () {
            i.status = "loading", i.alipay[i.orderType] && i.config.alipay ? o.post("/api/user/order/qrcode", {
                accountId: i.accountId,
                orderType: i.orderType
            }).then(function (e) {
                i.orderId = e.data.orderId, i.qrCode = e.data.qrCode, i.status = "pay", s = t(function () {
                    o.post("/api/user/order/status", {orderId: i.orderId}).then(function (e) {
                        var n = e.data.status;
                        "TRADE_SUCCESS" !== n && "FINISH" !== n || (i.status = "success", s && t.cancel(s))
                    })
                }, 5e3)
            }).catch(function () {
                i.status = "error"
            }) : i.status = "pay";
            var e = "sandbox" === JSON.parse(a.ssmgrConfig).paypalMode ? "sandbox" : "production";
            i.paypal[i.orderType] && paypal.Button.render({
                locale: "zh_CN",
                style: {label: "checkout", size: "medium", shape: "rect", color: "blue"},
                env: e,
                commit: !0,
                payment: function () {
                    var e = "/api/user/paypal/create";
                    return paypal.request.post(e, {accountId: i.accountId, orderType: i.orderType}).then(function (e) {
                        return e.paymentID
                    })
                },
                onAuthorize: function (e, t) {
                    var n = "/api/user/paypal/execute/", e = {paymentID: e.paymentID, payerID: e.payerID};
                    return paypal.request.post(n, e).then(function (e) {
                        i.status = "success"
                    })
                }
            }, "#paypal-button-container")
        }, s = null, l = function () {
            s && t.cancel(s), e.hide()
        };
        i.createOrder = u, i.close = l;
        var d = {
            templateUrl: r + "/public/views/dialog/pay.html",
            escapeToClose: !1,
            locals: {bind: i},
            bindToController: !0,
            fullscreen: !0,
            controller: ["$scope", "$mdDialog", "$mdMedia", "bind", function (e, t, n, o) {
                e.publicInfo = o, e.setDialogWidth = function () {
                    return n("xs") || n("sm") ? {} : {"min-width": "405px"}
                }, e.getQrCodeSize = function () {
                    return n("xs") || n("sm") ? 200 : 250
                }, e.qrCode = function () {
                    return e.publicInfo.qrCode || "invalid qrcode"
                }, e.pay = function () {
                    a.location.href = e.publicInfo.qrCode
                }
            }],
            clickOutsideToClose: !1
        }, m = function (t) {
            i.status = "loading", c = e.show(d), o.get("/api/user/order/price").then(function (e) {
                return i.alipay = e.data.alipay, i.paypal = e.data.paypal, n(function () {
                    i.status = "choose"
                }, 125), i.accountId = t, c
            }).catch(function () {
                return i.status = "error", c
            })
        };
        return {chooseOrderType: m, createOrder: u}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("qrcodeDialog", ["$mdDialog", function (e) {
        var t = {}, n = function () {
            return e.hide().then(function (e) {
                o = null
            }).catch(function (e) {
                o = null
            })
        };
        t.hide = n;
        var o = null, a = function () {
            return !(!o || o.$$state.status)
        }, i = {
            templateUrl: r + "/public/views/user/qrcodeDialog.html",
            escapeToClose: !1,
            locals: {bind: t},
            bindToController: !0,
            controller: ["$scope", "$mdDialog", "$mdMedia", "bind", function (e, t, n, o) {
                e.publicInfo = o, e.setDialogWidth = function () {
                    return n("xs") || n("sm") ? {} : {"min-width": "400px"}
                }
            }],
            fullscreen: !0,
            clickOutsideToClose: !0
        }, c = function (n, r) {
            return a() ? o : (t.serverName = n, t.ssAddress = r, o = e.show(i))
        };
        return {show: c}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("serverChartDialog", ["$mdDialog", function (e) {
        var t = {}, n = function () {
            return e.hide().then(function (e) {
                o = null
            }).catch(function (e) {
                o = null
            })
        };
        t.hide = n;
        var o = null, a = function () {
            return !(!o || o.$$state.status)
        }, i = {
            templateUrl: r + "/public/views/dialog/serverChart.html",
            escapeToClose: !1,
            locals: {bind: t},
            bindToController: !0,
            controller: ["$scope", "bind", function (e, t) {
                e.publicInfo = t
            }],
            clickOutsideToClose: !0
        }, c = function (n) {
            return a() ? o : (t.serverChart = n, o = e.show(i))
        };
        return {show: c, hide: n}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("setEmailDialog", ["$mdDialog", "$state", "$http", function (e, t, n) {
        var o = {}, a = function () {
            return e.hide().then(function (e) {
                u = null
            }).catch(function (e) {
                u = null
            })
        };
        o.hide = a;
        var i = function (e, t) {
            d(), n.put("/api/admin/setting/mail", {type: o.emailType, title: e, content: t}).then(function (e) {
                a()
            }).catch(function () {
                o.isLoading = !1
            })
        };
        o.set = i;
        var c = function () {
            d(), n.get("/api/admin/setting/mail", {params: {type: o.emailType}}).then(function (e) {
                o.title = e.data.title, o.content = e.data.content, o.isLoading = !1
            }).catch(function () {
                o.isLoading = !1
            })
        };
        o.get = c;
        var u = null, s = function () {
            return !(!u || u.$$state.status)
        }, l = {
            templateUrl: r + "/public/views/dialog/setEmail.html",
            escapeToClose: !1,
            locals: {bind: o},
            bindToController: !0,
            controller: ["$scope", "$mdMedia", "$mdDialog", "$http", "bind", function (e, t, n, o, a) {
                e.publicInfo = a, e.setDialogWidth = function () {
                    return t("xs") || t("sm") ? {} : {"min-width": "400px"}
                }
            }],
            fullscreen: !0,
            clickOutsideToClose: !1
        }, d = function () {
            o.isLoading = !0
        }, m = function (t) {
            return o.title = "", o.content = "", o.isLoading = !1, s() ? u : (o.emailType = t, u = e.show(l), o.get(), u)
        };
        return {show: m}
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.factory("userSortDialog", ["$mdDialog", function (e) {
        var t = {}, n = function () {
            return e.hide().then(function (e) {
                o = null
            }).catch(function (e) {
                o = null
            })
        };
        t.hide = n;
        var o = null, a = function () {
            return !(!o || o.$$state.status)
        }, i = {
            templateUrl: r + "/public/views/admin/userSortDialog.html",
            escapeToClose: !1,
            locals: {bind: t},
            bindToController: !0,
            controller: ["$scope", "$mdDialog", "$localStorage", "bind", function (e, t, n, o) {
                e.publicInfo = o, e.userSort = n.admin.userSortSettings
            }],
            clickOutsideToClose: !0
        }, c = function () {
            return a() ? o : o = e.show(i)
        };
        return {show: c, hide: n}
    }])
}, function (e, t, n) {
    "use strict";
    var o = n(43);
    o.keys().forEach(function (e) {
        o(e)
    })
}, function (e, t, n) {
    function o(e) {
        return n(a(e))
    }

    function a(e) {
        return r[e] || function () {
            throw new Error("Cannot find module '" + e + "'.")
        }()
    }

    var r = {"./flow.js": 44, "./mac.js": 45, "./orderStatus.js": 46, "./substr.js": 47, "./time.js": 48};
    o.keys = function () {
        return Object.keys(r)
    }, o.resolve = a, e.exports = o, o.id = 43
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.filter("flow", function () {
        var e = 1e3, t = 1e6, n = 1e9, o = 1e12, a = 1e15;
        return function (r) {
            return r < e ? r + " B" : r < t ? (r / e).toFixed(1) + " KB" : r < n ? (r / t).toFixed(1) + " MB" : r < o ? (r / n).toFixed(2) + " GB" : r < a ? (r / o).toFixed(3) + " TB" : r
        }
    })
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.filter("mac", function () {
        return function (e) {
            return e.toUpperCase().split("").map(function (e, t, n) {
                if (t % 2 === 0) return e + n[t + 1]
            }).filter(function (e) {
                return e
            }).join(":")
        }
    })
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.filter("order", function () {
        return function (e) {
            var t = {
                CREATE: "创建",
                WAIT_BUYER_PAY: "等待",
                TRADE_SUCCESS: "付款",
                FINISH: "完成",
                TRADE_CLOSED: "关闭",
                created: "创建",
                approved: "付款",
                finish: "完成",
                closed: "关闭"
            };
            return t[e] || "其它"
        }
    }).filter("prettyOrderId", function () {
        return function (e) {
            return e.substr(0, 4) + "-" + e.substr(4, 2) + "-" + e.substr(6, 2) + " " + e.substr(8, 2) + ":" + e.substr(10, 2) + ":" + e.substr(12, 2) + " " + e.substr(14)
        }
    })
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.filter("substr", function () {
        return function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20;
            return e.toString().length > t ? e.toString().substr(0, t) + "..." : e
        }
    })
}, function (e, t) {
    "use strict";
    var n = angular.module("app");
    n.filter("timeago", function () {
        Math.trunc = Math.trunc || function (e) {
            return e < 0 ? Math.ceil(e) : Math.floor(e)
        };
        var e = function (e) {
            var t = "", n = "", o = Date.now() - new Date(e);
            o < 0 ? o = -o : n = "前";
            var a = Math.trunc(o / 864e5), r = Math.trunc(o % 864e5 / 36e5), i = Math.trunc(o % 864e5 % 36e5 / 6e4);
            return a && (t += a + "天"), (a || r) && (t += r + "小时"), a || !r && !i || (t += i + "分钟"), o < 6e4 && (t = "几秒"), t + n
        };
        return e.$stateful = !0, e
    }), n.filter("timeagoshort", function () {
        return Math.trunc = Math.trunc || function (e) {
            return e < 0 ? Math.ceil(e) : Math.floor(e)
        }, function (e) {
            var t = "", n = "", o = Date.now() - new Date(e);
            o < 0 ? o = -o : n = "前";
            var a = Math.trunc(o / 864e5), r = Math.trunc(o % 864e5 / 36e5), i = Math.trunc(o % 864e5 % 36e5 / 6e4);
            return a ? t += a + "天" : r ? t += r + "小时" : i ? t += i + "分钟" : o < 6e4 && (t = "几秒"), t + n
        }
    }), n.filter("translateTime", ["$translate", function (e) {
        return function (t) {
            var n = e.use();
            if ("zh-CN" === n) return t;
            if ("en-US" === n) {
                var o = t.match(/([0-9]){1,}天/), a = t.match(/([0-9]){1,}小时/), r = t.match(/([0-9]){1,}分/), i = "";
                return o && (i += o[0].substr(0, o[0].length - 1) + (+o[0].substr(0, o[0].length - 1) <= 1 ? " day " : " days ")), a && (i += a[0].substr(0, a[0].length - 2) + (+a[0].substr(0, a[0].length - 2) <= 1 ? " hour " : " hours ")), r && (i += r[0].substr(0, r[0].length - 1) + (+r[0].substr(0, r[0].length - 1) <= 1 ? " min " : " mins")), t.match(/几秒/) && (i += "a few seconds"), t.match(/前$/) && (i += " ago"), i
            }
        }
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app");
    o.config(["$translateProvider", function (e) {
        e.translations("en-US", n(50)), e.translations("zh-CN", n(51)), e.preferredLanguage(navigator.language || "zh-CN"), e.useSanitizeValueStrategy("escape")
    }])
}, function (e, t) {
    "use strict";

    function n(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    var o;
    e.exports = (o = {
        "首页": "Home",
        "登录": "Sign in",
        "注册": "Sign up",
        "邮箱": "Email",
        "密码": "Password",
        "找回密码": "Reset password",
        "验证码": "Verification code",
        "发送验证码": "Get code",
        "请选择语言：": "Choose language:",
        "快速搭建": "Fast deployment",
        "易于配置": "Easy configuration",
        "官方标准": "Official API",
        "仅依赖Node.js，无需安装数据库（可选MySQL）": "Depends on Node.js and SQLite only (optionally MySQL)",
        "带有插件系统，仅需修改配置文件即可运行": "Plugin-based, super-easy deployment",
        "支持libev和python版本的标准manager API": "Supports standard manager API of both ss-libev and ss-python",
        "请输入邮箱地址再点击“找回密码”": "Please fill in your email address first",
        "邮箱不能为空": "Email address cannot be empty",
        "验证码不能为空": "Code cannot be empty",
        "密码不能为空": "Password cannot be empty",
        "验证码已发至邮箱": "A verification code has been sent to your email address",
        "用户注册成功": "Successfully registered.",
        "确定": "OK",
        "取消": "Cancel",
        "关闭": "Close",
        "下一步": "Next",
        "服务器": "Servers",
        "用户": "Users",
        "账号": "Accounts",
        "订单": "Orders",
        "设置": "Settings",
        "退出": "Exit",
        "我的账号": "My account"
    }, n(o, "账号", "Account"), n(o, "点击进入", "Enter"), n(o, "公告", "Announcements"), n(o, "暂无公告", "Nothing here"), n(o, "地址：", "Address:"), n(o, "端口：", "Port:"), n(o, "密码：", "Password:"), n(o, "加密方式：", "Encryption Method:"), n(o, "流量：", "Data Usage:"), n(o, "周期：", "Duration:"), n(o, "到期时间：", "Due Date:"), n(o, "最近连接：", "Last Connected:"), n(o, "备注：", "Comments:"), n(o, "修改密码", "Change Password"), n(o, "修改密码成功", "Change password success"), n(o, "修改密码失败", "Change password fail"), n(o, "续费", "Recharge"), n(o, "不限时", "unlimited"), n(o, "不限量", "unlimited"), n(o, "无", "none"), n(o, "或", "or"), n(o, "点击这里", "Click Here"), n(o, "付款立即开通帐号", "to pay and get an account now."), n(o, "点击二维码或者用移动设备扫描二维码可自动填充服务器信息", "Click the QR code or scan it by smartphone to retrieve server information automatically"), n(o, "目前该用户没有分配账号，请联系管理员处理", "No account has been assigned to you yet. Please contact the administrator, "), n(o, "请选择续费周期：", "Service duration:"), n(o, "一小时", "1 hour"), n(o, "一天", "1 day"), n(o, "一周", "1 week"), n(o, "一个月", "1 month"), n(o, "三个月", "3 months"), n(o, "一年", "1 year"), n(o, "支付宝扫码支付", "Alipay QR code Payment"), n(o, "手机请点击二维码付款", "On your smartphone, please click the QR code to pay"), n(o, "PayPal支付请点击下面按钮", "For PayPal users, please click the following button"), n(o, "最新注册用户", "Recent Registrations"), n(o, "最近登录用户", "Recent Logins"), n(o, "支付宝订单", "Alipay Orders"), n(o, "PayPal订单", "PayPal Orders"), n(o, "订单号：", "Order No.:"), n(o, "订单类型：", "Order Type:"), n(o, "金额：", "Sum:"), n(o, "用户名：", "Username:"), n(o, "创建时间：", "Creation Time:"), n(o, "状态：", "Status:"), n(o, "本日流量：", "Today:"), n(o, "本周流量：", "This Week:"), n(o, "本月流量：", "This Month:"), n(o, "基本设置", "Basic Settings"), n(o, "公告管理", "Announcement Management"), n(o, "支付设置", "Payment Configuration"), n(o, "邮件设置", "Email Configuration"), n(o, "账号设置", "Account Configuration"), n(o, "用户注册失败", "Registration failed"), n(o, "网络异常，请稍后再试", "Network failure. Please try again later."), n(o, "用户名或密码错误", "Incorrect username or password."), n(o, "该用户尚未注册的", "No such user"), n(o, "请输入正确的用户名格式", "Invalid username."), n(o, "密码重试次数已达上限\n请稍后再试", "Too many login attempts.\n Please try again later."), n(o, "验证码发送错误", "Unable to send verification code."), n(o, "发送错误，请更换邮箱尝试", "Unable to send verification code. Please try to use a different email address."), n(o, "请求过于频繁，请稍后再试", "Too many requests. Please try again later."), n(o, "当前时段尚未开放注册", "Registration is currently unavailable."), n(o, "重置密码链接已发至您的邮箱，\n请注意查收", "A password reset link has been sent to your email address."), n(o, "重置密码链接已经发送，\n请勿重复发送", "The password reset link has already been sent. \n Please do not request it again."), n(o, "请输入正确的邮箱地址", "Invalid email address."), n(o, "已过期", "expired"), n(o, "支付成功", "Payment successful."), n(o, "订单会在两分钟内生效，请稍候", "The order is taking effect in 2 minutes. Please wait."), n(o, "系统错误", "An error occurred."), n(o, "生成支付订单出错，请稍后再试", "Unable to process your order. Please try again later."), n(o, "修改", "Modify"), n(o, "网站标题", "Website Title"), n(o, "使用Service Worker缓存静态页面", "Use ServiceWorker to create a static cache page"), n(o, "新用户自动分配账号", "New User Gets Auto-Allocation Account"), n(o, "随机分配端口号", "Random Port"), n(o, "开放注册", "Open Registration"), n(o, "合并多服务器流量统计", "Sum Up Stat. of Multi-Server Data Usage"), n(o, "注册时间", "Signup Date"), n(o, "上次登录", "Latest Signin"), n(o, "创建", "Created"), n(o, "等待", "Pending"), n(o, "付款", "Paid"), n(o, "完成", "Success"), n(o, "关闭", "Closed"), n(o, "原密码", "Old password"), n(o, "新密码", "New password"), n(o, "重复新密码", "New password again"), o)
}, function (e, t) {
    "use strict";
    e.exports = {}
}, function (e, t, n) {
    "use strict";
    var o = n(53);
    o.keys().forEach(function (e) {
        o(e)
    })
}, function (e, t, n) {
    function o(e) {
        return n(a(e))
    }

    function a(e) {
        return r[e] || function () {
            throw new Error("Cannot find module '" + e + "'.")
        }()
    }

    var r = {
        "./admin.js": 54,
        "./adminAccount.js": 55,
        "./adminServer.js": 56,
        "./adminUser.js": 57,
        "./home.js": 58,
        "./user.js": 59
    };
    o.keys = function () {
        return Object.keys(r)
    }, o.resolve = a, e.exports = o, o.id = 53
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.config(["$stateProvider", function (e) {
        e.state("admin", {
            url: "/admin",
            abstract: !0,
            templateUrl: r + "/public/views/admin/admin.html"
        }).state("admin.index", {
            url: "/index",
            controller: "AdminIndexController",
            templateUrl: r + "/public/views/admin/index.html"
        }).state("admin.pay", {
            url: "/pay",
            controller: "AdminPayController",
            templateUrl: r + "/public/views/admin/pay.html"
        }).state("admin.settings", {
            url: "/settings",
            controller: "AdminSettingsController",
            templateUrl: r + "/public/views/admin/settings.html"
        }).state("admin.notice", {
            url: "/notice",
            controller: "AdminNoticeController",
            templateUrl: r + "/public/views/admin/notice.html"
        }).state("admin.editNotice", {
            url: "/notice/{noticeId:int}",
            controller: "AdminEditNoticeController",
            templateUrl: r + "/public/views/admin/editNotice.html"
        }).state("admin.addNotice", {
            url: "/notice/new",
            controller: "AdminNewNoticeController",
            templateUrl: r + "/public/views/admin/newNotice.html"
        }).state("admin.unfinished", {
            url: "/unfinished",
            templateUrl: r + "/public/views/admin/unfinished.html"
        }).state("admin.paymentSetting", {
            url: "/settings/payment",
            controller: "AdminPaymentSettingController",
            templateUrl: r + "/public/views/admin/paymentSetting.html"
        }).state("admin.baseSetting", {
            url: "/settings/base",
            controller: "AdminBaseSettingController",
            templateUrl: r + "/public/views/admin/baseSetting.html"
        }).state("admin.accountSetting", {
            url: "/settings/account",
            controller: "AdminAccountSettingController",
            templateUrl: r + "/public/views/admin/accountSetting.html"
        }).state("admin.mailSetting", {
            url: "/settings/mail",
            controller: "AdminMailSettingController",
            templateUrl: r + "/public/views/admin/mailSetting.html"
        })
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.config(["$stateProvider", function (e) {
        e.state("admin.account", {
            url: "/account",
            controller: "AdminAccountController",
            templateUrl: r + "/public/views/admin/account.html"
        }).state("admin.accountPage", {
            url: "/account/:accountId",
            controller: "AdminAccountPageController",
            templateUrl: r + "/public/views/admin/accountPage.html"
        }).state("admin.addAccount", {
            url: "/addAccount",
            controller: "AdminAddAccountController",
            templateUrl: r + "/public/views/admin/addAccount.html"
        }).state("admin.editAccount", {
            url: "/account/:accountId/edit",
            controller: "AdminEditAccountController",
            templateUrl: r + "/public/views/admin/editAccount.html"
        })
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.config(["$stateProvider", function (e) {
        e.state("admin.server", {
            url: "/server",
            controller: "AdminServerController",
            templateUrl: r + "/public/views/admin/server.html"
        }).state("admin.serverPage", {
            url: "/server/:serverId",
            controller: "AdminServerPageController",
            templateUrl: r + "/public/views/admin/serverPage.html"
        }).state("admin.addServer", {
            url: "/addServer",
            controller: "AdminAddServerController",
            templateUrl: r + "/public/views/admin/addServer.html"
        }).state("admin.editServer", {
            url: "/server/:serverId/edit",
            controller: "AdminEditServerController",
            templateUrl: r + "/public/views/admin/editServer.html"
        })
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.config(["$stateProvider", function (e) {
        e.state("admin.user", {
            url: "/user",
            controller: "AdminUserController",
            templateUrl: r + "/public/views/admin/user.html"
        }).state("admin.userPage", {
            url: "/user/:userId",
            controller: "AdminUserPageController",
            templateUrl: r + "/public/views/admin/userPage.html"
        }).state("admin.addUser", {
            url: "/addUser",
            controller: "AdminAddUserController",
            templateUrl: r + "/public/views/admin/addUser.html"
        })
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.config(["$stateProvider", function (e) {
        e.state("home", {
            url: "/home",
            abstract: !0,
            templateUrl: r + "/public/views/home/home.html"
        }).state("home.index", {
            url: "/index",
            controller: "HomeIndexController",
            templateUrl: r + "/public/views/home/index.html"
        }).state("home.login", {
            url: "/login",
            controller: "HomeLoginController",
            templateUrl: r + "/public/views/home/login.html"
        }).state("home.macLogin", {
            url: "/login/:mac",
            controller: "HomeMacLoginController",
            templateUrl: r + "/public/views/home/macLogin.html"
        }).state("home.signup", {
            url: "/signup",
            controller: "HomeSignupController",
            templateUrl: r + "/public/views/home/signup.html"
        }).state("home.resetPassword", {
            url: "/password/reset/:token",
            controller: "HomeResetPasswordController",
            templateUrl: r + "/public/views/home/resetPassword.html"
        })
    }])
}, function (e, t, n) {
    "use strict";
    var o = angular.module("app"), a = n(12), r = a.cdn || "";
    o.config(["$stateProvider", function (e) {
        e.state("user", {
            url: "/user",
            abstract: !0,
            templateUrl: r + "/public/views/user/user.html"
        }).state("user.index", {
            url: "/index",
            controller: "UserIndexController",
            templateUrl: r + "/public/views/user/index.html"
        }).state("user.account", {
            url: "/account",
            controller: "UserAccountController",
            templateUrl: r + "/public/views/user/account.html"
        }).state("user.changePassword", {
            url: "/changePassword",
            controller: "UserChangePasswordController",
            templateUrl: r + "/public/views/user/changePassword.html"
        })
    }])
}]);