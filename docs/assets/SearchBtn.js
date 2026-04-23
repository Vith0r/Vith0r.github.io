import {S as l, i as m, s as u, e as f, x as p, c as _, b as d, y as h, d as c, l as $, z as S, n as g, p as b, E as x, C as y, F as v} from "./index.js";
import {S as w, i as B} from "./SearchIcon.js";
import "./SvgIcon.js";
function C(o) {
    let e, n, a, r, i;
    return n = new w({}),
    {
        c() {
            e = f("button"),
            p(n.$$.fragment)
        },
        l(t) {
            e = _(t, "BUTTON", {});
            var s = d(e);
            h(n.$$.fragment, s),
            s.forEach(c)
        },
        m(t, s) {
            $(t, e, s),
            S(n, e, null),
            a = !0,
            r || (i = g(e, "click", o[0]),
            r = !0)
        },
        p: b,
        i(t) {
            a || (x(n.$$.fragment, t),
            a = !0)
        },
        o(t) {
            y(n.$$.fragment, t),
            a = !1
        },
        d(t) {
            t && c(e),
            v(n),
            r = !1,
            i()
        }
    }
}
function E(o) {
    function e() {
        B.set(!0)
    }
    return [e]
}
class z extends l {
    constructor(e) {
        super(),
        m(this, e, E, C, u, {})
    }
}
export {z as default};
