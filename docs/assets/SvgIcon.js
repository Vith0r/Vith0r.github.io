import {p as h, s as d, S as p, i as g, K as b, O as m, P as w, b as k, d as _, h as u, l as $, L as v, M as S, N as q, E as C, C as j} from "./index.js";
const c = [];
function x(r, t=h) {
    let n;
    const o = new Set;
    function s(a) {
        if (d(r, a) && (r = a,
        n)) {
            const f = !c.length;
            for (const i of o)
                i[1](),
                c.push(i, r);
            if (f) {
                for (let i = 0; i < c.length; i += 2)
                    c[i][0](c[i + 1]);
                c.length = 0
            }
        }
    }
    function e(a) {
        s(a(r))
    }
    function l(a, f=h) {
        const i = [a, f];
        return o.add(i),
        o.size === 1 && (n = t(s, e) || h),
        a(r),
        () => {
            o.delete(i),
            o.size === 0 && n && (n(),
            n = null)
        }
    }
    return {
        set: s,
        update: e,
        subscribe: l
    }
}
function z(r) {
    let t, n;
    const o = r[1].default
      , s = b(o, r, r[0], null);
    return {
        c() {
            t = m("svg"),
            s && s.c(),
            this.h()
        },
        l(e) {
            t = w(e, "svg", {
                xmlns: !0,
                width: !0,
                height: !0,
                viewBox: !0,
                fill: !0,
                stroke: !0,
                "stroke-width": !0,
                "stroke-linecap": !0,
                "stroke-linejoin": !0
            });
            var l = k(t);
            s && s.l(l),
            l.forEach(_),
            this.h()
        },
        h() {
            u(t, "xmlns", "http://www.w3.org/2000/svg"),
            u(t, "width", "24"),
            u(t, "height", "24"),
            u(t, "viewBox", "0 0 24 24"),
            u(t, "fill", "none"),
            u(t, "stroke", "currentColor"),
            u(t, "stroke-width", "2"),
            u(t, "stroke-linecap", "round"),
            u(t, "stroke-linejoin", "round")
        },
        m(e, l) {
            $(e, t, l),
            s && s.m(t, null),
            n = !0
        },
        p(e, [l]) {
            s && s.p && (!n || l & 1) && v(s, o, e, e[0], n ? q(o, e[0], l, null) : S(e[0]), null)
        },
        i(e) {
            n || (C(s, e),
            n = !0)
        },
        o(e) {
            j(s, e),
            n = !1
        },
        d(e) {
            e && _(t),
            s && s.d(e)
        }
    }
}
function B(r, t, n) {
    let {$$slots: o={}, $$scope: s} = t;
    return r.$$set = e => {
        "$$scope"in e && n(0, s = e.$$scope)
    }
    ,
    [s, o]
}
class y extends p {
    constructor(t) {
        super(),
        g(this, t, B, z, d, {})
    }
}
export {y as S, x as w};
