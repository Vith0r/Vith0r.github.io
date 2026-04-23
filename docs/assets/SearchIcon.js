import {w as p, S as d} from "./SvgIcon.js";
import {S as h, i as _, s as C, x as $, y as g, z as v, E as L, C as S, F as b, a as x, O as f, f as w, P as u, b as m, d as r, h as l, l as o} from "./index.js";
const I = p(!1);
function c(a) {
    let t;
    return {
        c() {
            t = f("path"),
            this.h()
        },
        l(n) {
            t = u(n, "path", {
                d: !0,
                fill: !0
            }),
            m(t).forEach(r),
            this.h()
        },
        h() {
            l(t, "d", "M7.66542 10.2366L9.19751 8.951L10.4831 10.4831L13.5473 7.91194L14.8328 9.44402L10.2366 13.3007L7.66542 10.2366Z"),
            l(t, "fill", "currentColor")
        },
        m(n, e) {
            o(n, t, e)
        },
        d(n) {
            n && r(t)
        }
    }
}
function y(a) {
    let t, n, e = a[0] && c();
    return {
        c() {
            e && e.c(),
            t = x(),
            n = f("path"),
            this.h()
        },
        l(s) {
            e && e.l(s),
            t = w(s),
            n = u(s, "path", {
                "fill-rule": !0,
                "clip-rule": !0,
                d: !0,
                fill: !0
            }),
            m(n).forEach(r),
            this.h()
        },
        h() {
            l(n, "fill-rule", "evenodd"),
            l(n, "clip-rule", "evenodd"),
            l(n, "d", "M16.2071 4.89344C19.0923 7.77862 19.3131 12.3193 16.8693 15.4578C16.8846 15.4713 16.8996 15.4854 16.9143 15.5L21.1569 19.7427C21.5474 20.1332 21.5474 20.7664 21.1569 21.1569C20.7664 21.5474 20.1332 21.5474 19.7427 21.1569L15.5 16.9143C15.4854 16.8996 15.4713 16.8846 15.4578 16.8693C12.3193 19.3131 7.77862 19.0923 4.89344 16.2071C1.76924 13.083 1.76924 8.01763 4.89344 4.89344C8.01763 1.76924 13.083 1.76924 16.2071 4.89344ZM14.7929 14.7929C17.1361 12.4498 17.1361 8.6508 14.7929 6.30765C12.4498 3.96451 8.6508 3.96451 6.30765 6.30765C3.96451 8.6508 3.96451 12.4498 6.30765 14.7929C8.6508 17.1361 12.4498 17.1361 14.7929 14.7929Z"),
            l(n, "fill", "currentColor")
        },
        m(s, i) {
            e && e.m(s, i),
            o(s, t, i),
            o(s, n, i)
        },
        p(s, i) {
            s[0] ? e || (e = c(),
            e.c(),
            e.m(t.parentNode, t)) : e && (e.d(1),
            e = null)
        },
        d(s) {
            s && (r(t),
            r(n)),
            e && e.d(s)
        }
    }
}
function E(a) {
    let t, n;
    return t = new d({
        props: {
            $$slots: {
                default: [y]
            },
            $$scope: {
                ctx: a
            }
        }
    }),
    {
        c() {
            $(t.$$.fragment)
        },
        l(e) {
            g(t.$$.fragment, e)
        },
        m(e, s) {
            v(t, e, s),
            n = !0
        },
        p(e, [s]) {
            const i = {};
            s & 3 && (i.$$scope = {
                dirty: s,
                ctx: e
            }),
            t.$set(i)
        },
        i(e) {
            n || (L(t.$$.fragment, e),
            n = !0)
        },
        o(e) {
            S(t.$$.fragment, e),
            n = !1
        },
        d(e) {
            b(t, e)
        }
    }
}
function M(a, t, n) {
    let {found: e=!1} = t;
    return a.$$set = s => {
        "found"in s && n(0, e = s.found)
    }
    ,
    [e]
}
class q extends h {
    constructor(t) {
        super(),
        _(this, t, M, E, C, {
            found: 0
        })
    }
}
export {q as S, I as i};
