import {S as V, i as W, s as X, K as ie, e as ne, c as re, b as w, d as f, l as y, n as ue, L as le, M as se, N as fe, E as J, C as P, q as ae, x as Y, y as Z, z as ee, F as te, v as U, B as oe, D as ce, O as S, P as v, h as s, I as M, J as d, a as O, f as z} from "./index.js";
import {q as _, d as m} from "./index-2.js";
import {w as de, S as _e} from "./SvgIcon.js";
const j = de("dark")
  , me = o => ({
    theme: o & 1
})
  , Q = o => ({
    theme: o[0]
});
function ye(o) {
    let t, n, i, u;
    const l = o[3].default
      , a = ie(l, o, o[2], Q);
    return {
        c() {
            t = ne("button"),
            a && a.c()
        },
        l(r) {
            t = re(r, "BUTTON", {});
            var c = w(t);
            a && a.l(c),
            c.forEach(f)
        },
        m(r, c) {
            y(r, t, c),
            a && a.m(t, null),
            n = !0,
            i || (u = ue(t, "click", o[1]),
            i = !0)
        },
        p(r, [c]) {
            a && a.p && (!n || c & 5) && le(a, l, r, r[2], n ? fe(l, r[2], c, me) : se(r[2]), Q)
        },
        i(r) {
            n || (J(a, r),
            n = !0)
        },
        o(r) {
            P(a, r),
            n = !1
        },
        d(r) {
            r && f(t),
            a && a.d(r),
            i = !1,
            u()
        }
    }
}
const A = "dark"
  , R = "light";
function pe(o, t, n) {
    let {$$slots: i={}, $$scope: u} = t
      , l = A;
    function a() {
        window.document.documentElement.classList.toggle(A),
        n(0, l = localStorage.getItem("theme") === A ? R : A),
        localStorage.setItem("theme", l),
        j.set(l)
    }
    return ae( () => {
        localStorage.getItem("theme") === R ? (window.document.documentElement.classList.remove(A),
        n(0, l = R)) : (window.document.documentElement.classList.add(A),
        n(0, l = A)),
        j.set(l)
    }
    ),
    o.$$set = r => {
        "$$scope"in r && n(2, u = r.$$scope)
    }
    ,
    [l, a, u, i]
}
class xe extends V {
    constructor(t) {
        super(),
        W(this, t, pe, ye, X, {})
    }
}
function $e(o) {
    let t, n, i;
    return {
        c() {
            t = S("path"),
            this.h()
        },
        l(u) {
            t = v(u, "path", {
                d: !0
            }),
            w(t).forEach(f),
            this.h()
        },
        h() {
            s(t, "d", "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z")
        },
        m(u, l) {
            y(u, t, l),
            i = !0
        },
        i(u) {
            i || (u && M( () => {
                i && (n || (n = d(t, m, {
                    duration: 500,
                    delay: 100,
                    easing: _
                }, !0)),
                n.run(1))
            }
            ),
            i = !0)
        },
        o(u) {
            u && (n || (n = d(t, m, {
                duration: 500,
                delay: 100,
                easing: _
            }, !1)),
            n.run(0)),
            i = !1
        },
        d(u) {
            u && f(t),
            u && n && n.end()
        }
    }
}
function ge(o) {
    let t, n, i, u, l, a, r, c, T, $, I, C, g, L, D, h, q, K, E, B, F, b, H, G, k, N, x;
    return {
        c() {
            t = S("circle"),
            i = O(),
            u = S("line"),
            a = O(),
            r = S("line"),
            T = O(),
            $ = S("line"),
            C = O(),
            g = S("line"),
            D = O(),
            h = S("line"),
            K = O(),
            E = S("line"),
            F = O(),
            b = S("line"),
            G = O(),
            k = S("line"),
            this.h()
        },
        l(e) {
            t = v(e, "circle", {
                cx: !0,
                cy: !0,
                r: !0
            }),
            w(t).forEach(f),
            i = z(e),
            u = v(e, "line", {
                x1: !0,
                y1: !0,
                x2: !0,
                y2: !0
            }),
            w(u).forEach(f),
            a = z(e),
            r = v(e, "line", {
                x1: !0,
                y1: !0,
                x2: !0,
                y2: !0
            }),
            w(r).forEach(f),
            T = z(e),
            $ = v(e, "line", {
                x1: !0,
                y1: !0,
                x2: !0,
                y2: !0
            }),
            w($).forEach(f),
            C = z(e),
            g = v(e, "line", {
                x1: !0,
                y1: !0,
                x2: !0,
                y2: !0
            }),
            w(g).forEach(f),
            D = z(e),
            h = v(e, "line", {
                x1: !0,
                y1: !0,
                x2: !0,
                y2: !0
            }),
            w(h).forEach(f),
            K = z(e),
            E = v(e, "line", {
                x1: !0,
                y1: !0,
                x2: !0,
                y2: !0
            }),
            w(E).forEach(f),
            F = z(e),
            b = v(e, "line", {
                x1: !0,
                y1: !0,
                x2: !0,
                y2: !0
            }),
            w(b).forEach(f),
            G = z(e),
            k = v(e, "line", {
                x1: !0,
                y1: !0,
                x2: !0,
                y2: !0
            }),
            w(k).forEach(f),
            this.h()
        },
        h() {
            s(t, "cx", "12"),
            s(t, "cy", "12"),
            s(t, "r", "5"),
            s(u, "x1", "12"),
            s(u, "y1", "1"),
            s(u, "x2", "12"),
            s(u, "y2", "3"),
            s(r, "x1", "12"),
            s(r, "y1", "21"),
            s(r, "x2", "12"),
            s(r, "y2", "23"),
            s($, "x1", "4.22"),
            s($, "y1", "4.22"),
            s($, "x2", "5.64"),
            s($, "y2", "5.64"),
            s(g, "x1", "18.36"),
            s(g, "y1", "18.36"),
            s(g, "x2", "19.78"),
            s(g, "y2", "19.78"),
            s(h, "x1", "1"),
            s(h, "y1", "12"),
            s(h, "x2", "3"),
            s(h, "y2", "12"),
            s(E, "x1", "21"),
            s(E, "y1", "12"),
            s(E, "x2", "23"),
            s(E, "y2", "12"),
            s(b, "x1", "4.22"),
            s(b, "y1", "19.78"),
            s(b, "x2", "5.64"),
            s(b, "y2", "18.36"),
            s(k, "x1", "18.36"),
            s(k, "y1", "5.64"),
            s(k, "x2", "19.78"),
            s(k, "y2", "4.22")
        },
        m(e, p) {
            y(e, t, p),
            y(e, i, p),
            y(e, u, p),
            y(e, a, p),
            y(e, r, p),
            y(e, T, p),
            y(e, $, p),
            y(e, C, p),
            y(e, g, p),
            y(e, D, p),
            y(e, h, p),
            y(e, K, p),
            y(e, E, p),
            y(e, F, p),
            y(e, b, p),
            y(e, G, p),
            y(e, k, p),
            x = !0
        },
        i(e) {
            x || (e && M( () => {
                x && (n || (n = d(t, m, {
                    duration: 1e3,
                    delay: 200,
                    easing: _
                }, !0)),
                n.run(1))
            }
            ),
            e && M( () => {
                x && (l || (l = d(u, m, {
                    duration: 100,
                    delay: 30,
                    easing: _
                }, !0)),
                l.run(1))
            }
            ),
            e && M( () => {
                x && (c || (c = d(r, m, {
                    duration: 100,
                    delay: 40,
                    easing: _
                }, !0)),
                c.run(1))
            }
            ),
            e && M( () => {
                x && (I || (I = d($, m, {
                    duration: 100,
                    delay: 50,
                    easing: _
                }, !0)),
                I.run(1))
            }
            ),
            e && M( () => {
                x && (L || (L = d(g, m, {
                    duration: 100,
                    delay: 60,
                    easing: _
                }, !0)),
                L.run(1))
            }
            ),
            e && M( () => {
                x && (q || (q = d(h, m, {
                    duration: 100,
                    delay: 70,
                    easing: _
                }, !0)),
                q.run(1))
            }
            ),
            e && M( () => {
                x && (B || (B = d(E, m, {
                    duration: 100,
                    delay: 80,
                    easing: _
                }, !0)),
                B.run(1))
            }
            ),
            e && M( () => {
                x && (H || (H = d(b, m, {
                    duration: 100,
                    delay: 90,
                    easing: _
                }, !0)),
                H.run(1))
            }
            ),
            e && M( () => {
                x && (N || (N = d(k, m, {
                    duration: 100,
                    delay: 100,
                    easing: _
                }, !0)),
                N.run(1))
            }
            ),
            x = !0)
        },
        o(e) {
            e && (n || (n = d(t, m, {
                duration: 1e3,
                delay: 200,
                easing: _
            }, !1)),
            n.run(0)),
            e && (l || (l = d(u, m, {
                duration: 100,
                delay: 30,
                easing: _
            }, !1)),
            l.run(0)),
            e && (c || (c = d(r, m, {
                duration: 100,
                delay: 40,
                easing: _
            }, !1)),
            c.run(0)),
            e && (I || (I = d($, m, {
                duration: 100,
                delay: 50,
                easing: _
            }, !1)),
            I.run(0)),
            e && (L || (L = d(g, m, {
                duration: 100,
                delay: 60,
                easing: _
            }, !1)),
            L.run(0)),
            e && (q || (q = d(h, m, {
                duration: 100,
                delay: 70,
                easing: _
            }, !1)),
            q.run(0)),
            e && (B || (B = d(E, m, {
                duration: 100,
                delay: 80,
                easing: _
            }, !1)),
            B.run(0)),
            e && (H || (H = d(b, m, {
                duration: 100,
                delay: 90,
                easing: _
            }, !1)),
            H.run(0)),
            e && (N || (N = d(k, m, {
                duration: 100,
                delay: 100,
                easing: _
            }, !1)),
            N.run(0)),
            x = !1
        },
        d(e) {
            e && (f(t),
            f(i),
            f(u),
            f(a),
            f(r),
            f(T),
            f($),
            f(C),
            f(g),
            f(D),
            f(h),
            f(K),
            f(E),
            f(F),
            f(b),
            f(G),
            f(k)),
            e && n && n.end(),
            e && l && l.end(),
            e && c && c.end(),
            e && I && I.end(),
            e && L && L.end(),
            e && q && q.end(),
            e && B && B.end(),
            e && H && H.end(),
            e && N && N.end()
        }
    }
}
function he(o) {
    let t, n, i;
    const u = [ge, $e]
      , l = [];
    function a(r, c) {
        return r[0] === "dark" ? 0 : 1
    }
    return t = a(o),
    n = l[t] = u[t](o),
    {
        c() {
            n.c(),
            i = U()
        },
        l(r) {
            n.l(r),
            i = U()
        },
        m(r, c) {
            l[t].m(r, c),
            y(r, i, c)
        },
        p(r, c) {
            let T = t;
            t = a(r),
            t !== T && (oe(),
            P(l[T], 1, 1, () => {
                l[T] = null
            }
            ),
            ce(),
            n = l[t],
            n || (n = l[t] = u[t](r),
            n.c()),
            J(n, 1),
            n.m(i.parentNode, i))
        },
        d(r) {
            r && f(i),
            l[t].d(r)
        }
    }
}
function Ee(o) {
    let t, n;
    return t = new _e({
        props: {
            $$slots: {
                default: [he]
            },
            $$scope: {
                ctx: o
            }
        }
    }),
    {
        c() {
            Y(t.$$.fragment)
        },
        l(i) {
            Z(t.$$.fragment, i)
        },
        m(i, u) {
            ee(t, i, u),
            n = !0
        },
        p(i, u) {
            const l = {};
            u & 3 && (l.$$scope = {
                dirty: u,
                ctx: i
            }),
            t.$set(l)
        },
        i(i) {
            n || (J(t.$$.fragment, i),
            n = !0)
        },
        o(i) {
            P(t.$$.fragment, i),
            n = !1
        },
        d(i) {
            te(t, i)
        }
    }
}
function be(o) {
    let t, n;
    return t = new xe({
        props: {
            $$slots: {
                default: [Ee, ({theme: i}) => ({
                    0: i
                }), ({theme: i}) => i ? 1 : 0]
            },
            $$scope: {
                ctx: o
            }
        }
    }),
    {
        c() {
            Y(t.$$.fragment)
        },
        l(i) {
            Z(t.$$.fragment, i)
        },
        m(i, u) {
            ee(t, i, u),
            n = !0
        },
        p(i, [u]) {
            const l = {};
            u & 3 && (l.$$scope = {
                dirty: u,
                ctx: i
            }),
            t.$set(l)
        },
        i(i) {
            n || (J(t.$$.fragment, i),
            n = !0)
        },
        o(i) {
            P(t.$$.fragment, i),
            n = !1
        },
        d(i) {
            te(t, i)
        }
    }
}
class ve extends V {
    constructor(t) {
        super(),
        W(this, t, null, be, X, {})
    }
}
export {ve as default};
