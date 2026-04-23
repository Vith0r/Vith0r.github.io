import {S as G, i as J, s as Q, e as $, t as A, a as B, v as M, c as E, b as y, g as H, d as v, f as C, h as _, l as I, m as k, o as W, p as T, w as me, x as K, y as X, r as ve, z as Y, A as se, n as F, B as Z, C as P, D as x, E as S, F as ee, q as pe, G as ge, H as be, I as re, J as U, u as ke} from "./index.js";
import {f as ie, a as ne} from "./index-2.js";
import {S as $e, i as ae} from "./SearchIcon.js";
import {e as q} from "./each.js";
/* empty css                       */
import "./SvgIcon.js";
const Ee = "modulepreload"
  , we = function(n) {
    return "/" + n
}
  , oe = {}
  , ye = function(e, r, l) {
    let t = Promise.resolve();
    if (r && r.length > 0) {
        const i = document.getElementsByTagName("link");
        t = Promise.all(r.map(s => {
            if (s = we(s),
            s in oe)
                return;
            oe[s] = !0;
            const a = s.endsWith(".css")
              , c = a ? '[rel="stylesheet"]' : "";
            if (!!l)
                for (let f = i.length - 1; f >= 0; f--) {
                    const d = i[f];
                    if (d.href === s && (!a || d.rel === "stylesheet"))
                        return
                }
            else if (document.querySelector(`link[href="${s}"]${c}`))
                return;
            const h = document.createElement("link");
            if (h.rel = a ? "stylesheet" : Ee,
            a || (h.as = "script",
            h.crossOrigin = ""),
            h.href = s,
            document.head.appendChild(h),
            a)
                return new Promise( (f, d) => {
                    h.addEventListener("load", f),
                    h.addEventListener("error", () => d(new Error(`Unable to preload CSS for ${s}`)))
                }
                )
        }
        ))
    }
    return t.then( () => e()).catch(i => {
        const s = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (s.payload = i,
        window.dispatchEvent(s),
        !s.defaultPrevented)
            throw i
    }
    )
};
function ce(n, e, r) {
    const l = n.slice();
    return l[2] = e[r],
    l
}
function fe(n) {
    let e, r = n[2] + "", l, t, i;
    return {
        c() {
            e = $("a"),
            l = A(r),
            this.h()
        },
        l(s) {
            e = E(s, "A", {
                class: !0,
                href: !0,
                title: !0
            });
            var a = y(e);
            l = H(a, r),
            a.forEach(v),
            this.h()
        },
        h() {
            _(e, "class", "tag svelte-vr1ej0"),
            _(e, "href", t = `/tags/${n[2]}`),
            _(e, "title", i = n[2])
        },
        m(s, a) {
            I(s, e, a),
            k(e, l)
        },
        p(s, a) {
            a & 1 && r !== (r = s[2] + "") && W(l, r),
            a & 1 && t !== (t = `/tags/${s[2]}`) && _(e, "href", t),
            a & 1 && i !== (i = s[2]) && _(e, "title", i)
        },
        d(s) {
            s && v(e)
        }
    }
}
function ue(n) {
    let e;
    return {
        c() {
            e = $("hr"),
            this.h()
        },
        l(r) {
            e = E(r, "HR", {
                class: !0
            }),
            this.h()
        },
        h() {
            _(e, "class", "my-4 text-theme-dark-secondary")
        },
        m(r, l) {
            I(r, e, l)
        },
        d(r) {
            r && v(e)
        }
    }
}
function Ie(n) {
    let e, r, l, t, i = n[0].title + "", s, a, c, p, h, f, d = n[0].description + "", D, j, L, R, V, w = q(n[0].tags), b = [];
    for (let o = 0; o < w.length; o += 1)
        b[o] = fe(ce(n, w, o));
    let u = !n[1] && ue();
    return {
        c() {
            e = $("div"),
            r = $("div"),
            l = $("h4"),
            t = $("a"),
            s = A(i),
            a = A(" →"),
            h = B(),
            f = $("p"),
            D = A(d),
            j = B(),
            L = $("ul");
            for (let o = 0; o < b.length; o += 1)
                b[o].c();
            R = B(),
            u && u.c(),
            V = M(),
            this.h()
        },
        l(o) {
            e = E(o, "DIV", {
                class: !0
            });
            var g = y(e);
            r = E(g, "DIV", {
                class: !0
            });
            var m = y(r);
            l = E(m, "H4", {
                class: !0
            });
            var N = y(l);
            t = E(N, "A", {
                href: !0,
                title: !0
            });
            var z = y(t);
            s = H(z, i),
            a = H(z, " →"),
            z.forEach(v),
            N.forEach(v),
            h = C(m),
            f = E(m, "P", {
                class: !0
            });
            var te = y(f);
            D = H(te, d),
            te.forEach(v),
            j = C(m),
            L = E(m, "UL", {
                class: !0
            });
            var le = y(L);
            for (let O = 0; O < b.length; O += 1)
                b[O].l(le);
            le.forEach(v),
            m.forEach(v),
            g.forEach(v),
            R = C(o),
            u && u.l(o),
            V = M(),
            this.h()
        },
        h() {
            _(t, "href", c = `/${n[0].category}/${n[0].slug}`),
            _(t, "title", p = n[0].title),
            _(l, "class", "post-preview__title svelte-vr1ej0"),
            _(f, "class", "post-preview__desc svelte-vr1ej0"),
            _(L, "class", "tag-list svelte-vr1ej0"),
            _(r, "class", "flex-1"),
            _(e, "class", "post-preview hover:bg-theme-primary svelte-vr1ej0")
        },
        m(o, g) {
            I(o, e, g),
            k(e, r),
            k(r, l),
            k(l, t),
            k(t, s),
            k(t, a),
            k(r, h),
            k(r, f),
            k(f, D),
            k(r, j),
            k(r, L);
            for (let m = 0; m < b.length; m += 1)
                b[m] && b[m].m(L, null);
            I(o, R, g),
            u && u.m(o, g),
            I(o, V, g)
        },
        p(o, [g]) {
            if (g & 1 && i !== (i = o[0].title + "") && W(s, i),
            g & 1 && c !== (c = `/${o[0].category}/${o[0].slug}`) && _(t, "href", c),
            g & 1 && p !== (p = o[0].title) && _(t, "title", p),
            g & 1 && d !== (d = o[0].description + "") && W(D, d),
            g & 1) {
                w = q(o[0].tags);
                let m;
                for (m = 0; m < w.length; m += 1) {
                    const N = ce(o, w, m);
                    b[m] ? b[m].p(N, g) : (b[m] = fe(N),
                    b[m].c(),
                    b[m].m(L, null))
                }
                for (; m < b.length; m += 1)
                    b[m].d(1);
                b.length = w.length
            }
            o[1] ? u && (u.d(1),
            u = null) : u || (u = ue(),
            u.c(),
            u.m(V.parentNode, V))
        },
        i: T,
        o: T,
        d(o) {
            o && (v(e),
            v(R),
            v(V)),
            me(b, o),
            u && u.d(o)
        }
    }
}
function Le(n, e, r) {
    let {post: l} = e
      , {isLast: t=!1} = e;
    return n.$$set = i => {
        "post"in i && r(0, l = i.post),
        "isLast"in i && r(1, t = i.isLast)
    }
    ,
    [l, t]
}
class Se extends G {
    constructor(e) {
        super(),
        J(this, e, Le, Ie, Q, {
            post: 0,
            isLast: 1
        })
    }
}
function he(n, e, r) {
    const l = n.slice();
    return l[7] = e[r],
    l[9] = r,
    l
}
function De(n) {
    let e;
    function r(i, s) {
        return i[0].length ? je : Pe
    }
    let l = r(n)
      , t = l(n);
    return {
        c() {
            e = $("div"),
            t.c(),
            this.h()
        },
        l(i) {
            e = E(i, "DIV", {
                class: !0
            });
            var s = y(e);
            t.l(s),
            s.forEach(v),
            this.h()
        },
        h() {
            _(e, "class", "search__results--none svelte-wfdxob")
        },
        m(i, s) {
            I(i, e, s),
            t.m(e, null)
        },
        p(i, s) {
            l !== (l = r(i)) && (t.d(1),
            t = l(i),
            t && (t.c(),
            t.m(e, null)))
        },
        i: T,
        o: T,
        d(i) {
            i && v(e),
            t.d()
        }
    }
}
function Ve(n) {
    let e, r, l = q(n[1]), t = [];
    for (let s = 0; s < l.length; s += 1)
        t[s] = de(he(n, l, s));
    const i = s => P(t[s], 1, 1, () => {
        t[s] = null
    }
    );
    return {
        c() {
            for (let s = 0; s < t.length; s += 1)
                t[s].c();
            e = M()
        },
        l(s) {
            for (let a = 0; a < t.length; a += 1)
                t[a].l(s);
            e = M()
        },
        m(s, a) {
            for (let c = 0; c < t.length; c += 1)
                t[c] && t[c].m(s, a);
            I(s, e, a),
            r = !0
        },
        p(s, a) {
            if (a & 2) {
                l = q(s[1]);
                let c;
                for (c = 0; c < l.length; c += 1) {
                    const p = he(s, l, c);
                    t[c] ? (t[c].p(p, a),
                    S(t[c], 1)) : (t[c] = de(p),
                    t[c].c(),
                    S(t[c], 1),
                    t[c].m(e.parentNode, e))
                }
                for (Z(),
                c = l.length; c < t.length; c += 1)
                    i(c);
                x()
            }
        },
        i(s) {
            if (!r) {
                for (let a = 0; a < l.length; a += 1)
                    S(t[a]);
                r = !0
            }
        },
        o(s) {
            t = t.filter(Boolean);
            for (let a = 0; a < t.length; a += 1)
                P(t[a]);
            r = !1
        },
        d(s) {
            s && v(e),
            me(t, s)
        }
    }
}
function Pe(n) {
    let e;
    return {
        c() {
            e = A("Search something and let me find it for you! :-)")
        },
        l(r) {
            e = H(r, "Search something and let me find it for you! :-)")
        },
        m(r, l) {
            I(r, e, l)
        },
        d(r) {
            r && v(e)
        }
    }
}
function je(n) {
    let e;
    return {
        c() {
            e = A("No matching items found!")
        },
        l(r) {
            e = H(r, "No matching items found!")
        },
        m(r, l) {
            I(r, e, l)
        },
        d(r) {
            r && v(e)
        }
    }
}
function de(n) {
    let e, r;
    return e = new Se({
        props: {
            post: n[7],
            isLast: n[9] === n[1].length - 1
        }
    }),
    {
        c() {
            K(e.$$.fragment)
        },
        l(l) {
            X(e.$$.fragment, l)
        },
        m(l, t) {
            Y(e, l, t),
            r = !0
        },
        p(l, t) {
            const i = {};
            t & 2 && (i.post = l[7]),
            t & 2 && (i.isLast = l[9] === l[1].length - 1),
            e.$set(i)
        },
        i(l) {
            r || (S(e.$$.fragment, l),
            r = !0)
        },
        o(l) {
            P(e.$$.fragment, l),
            r = !1
        },
        d(l) {
            ee(e, l)
        }
    }
}
function Ne(n) {
    let e, r, l, t, i, s, a, c, p, h, f, d, D = "<small>click anywhere outside to close</small>", j, L, R;
    t = new $e({
        props: {
            found: n[1].length > 0
        }
    });
    const V = [Ve, De]
      , w = [];
    function b(u, o) {
        return u[1].length ? 0 : 1
    }
    return p = b(n),
    h = w[p] = V[p](n),
    {
        c() {
            e = $("div"),
            r = $("div"),
            l = $("label"),
            K(t.$$.fragment),
            i = B(),
            s = $("input"),
            a = B(),
            c = $("div"),
            h.c(),
            f = B(),
            d = $("div"),
            d.innerHTML = D,
            this.h()
        },
        l(u) {
            e = E(u, "DIV", {
                class: !0
            });
            var o = y(e);
            r = E(o, "DIV", {
                class: !0
            });
            var g = y(r);
            l = E(g, "LABEL", {
                for: !0,
                class: !0
            });
            var m = y(l);
            X(t.$$.fragment, m),
            m.forEach(v),
            i = C(g),
            s = E(g, "INPUT", {
                type: !0,
                name: !0,
                placeholder: !0,
                class: !0
            }),
            g.forEach(v),
            a = C(o),
            c = E(o, "DIV", {
                class: !0
            });
            var N = y(c);
            h.l(N),
            N.forEach(v),
            f = C(o),
            d = E(o, "DIV", {
                class: !0,
                "data-svelte-h": !0
            }),
            ve(d) !== "svelte-fzud3b" && (d.innerHTML = D),
            o.forEach(v),
            this.h()
        },
        h() {
            _(l, "for", "search"),
            _(l, "class", "svelte-wfdxob"),
            _(s, "type", "text"),
            _(s, "name", "search"),
            _(s, "placeholder", "What are you looking for?"),
            _(s, "class", "svelte-wfdxob"),
            _(r, "class", "search__ctrl svelte-wfdxob"),
            _(c, "class", "search__results svelte-wfdxob"),
            _(d, "class", "note svelte-wfdxob"),
            _(e, "class", "search svelte-wfdxob")
        },
        m(u, o) {
            I(u, e, o),
            k(e, r),
            k(r, l),
            Y(t, l, null),
            k(r, i),
            k(r, s),
            n[5](s),
            se(s, n[0]),
            k(e, a),
            k(e, c),
            w[p].m(c, null),
            k(e, f),
            k(e, d),
            j = !0,
            L || (R = F(s, "input", n[6]),
            L = !0)
        },
        p(u, [o]) {
            const g = {};
            o & 2 && (g.found = u[1].length > 0),
            t.$set(g),
            o & 1 && s.value !== u[0] && se(s, u[0]);
            let m = p;
            p = b(u),
            p === m ? w[p].p(u, o) : (Z(),
            P(w[m], 1, 1, () => {
                w[m] = null
            }
            ),
            x(),
            h = w[p],
            h ? h.p(u, o) : (h = w[p] = V[p](u),
            h.c()),
            S(h, 1),
            h.m(c, null))
        },
        i(u) {
            j || (S(t.$$.fragment, u),
            S(h),
            j = !0)
        },
        o(u) {
            P(t.$$.fragment, u),
            P(h),
            j = !1
        },
        d(u) {
            u && v(e),
            ee(t),
            n[5](null),
            w[p].d(),
            L = !1,
            R()
        }
    }
}
function Re(n, e, r) {
    let l, t, i, s = "", a = [];
    pe(async () => {
        const h = (await ye( () => import("./lunr.8J99-g7N.js").then(d => d.l), __vite__mapDeps([]))).default
          , f = await fetch("/search-index.json");
        r(3, t = await f.json()),
        r(4, i = h(function() {
            this.ref("slug"),
            this.field("title"),
            this.field("description"),
            this.field("tags"),
            this.field("body"),
            t.forEach(d => {
                this.add(d)
            }
            , this)
        })),
        l.focus()
    }
    );
    function c(h) {
        ge[h ? "unshift" : "push"]( () => {
            l = h,
            r(2, l)
        }
        )
    }
    function p() {
        s = this.value,
        r(0, s)
    }
    return n.$$.update = () => {
        if (n.$$.dirty & 27 && s && s.length >= 3) {
            const h = i.search(s);
            r(1, a = []),
            h.map(f => {
                t.filter(d => {
                    f.ref === d.slug && a.push(d)
                }
                )
            }
            )
        }
    }
    ,
    [s, a, l, t, i, c, p]
}
class Be extends G {
    constructor(e) {
        super(),
        J(this, e, Re, Ne, Q, {})
    }
}
function _e(n) {
    let e, r, l, t, i, s, a, c, p, h;
    return s = new Be({}),
    {
        c() {
            e = $("div"),
            l = B(),
            t = $("div"),
            i = $("div"),
            K(s.$$.fragment),
            this.h()
        },
        l(f) {
            e = E(f, "DIV", {
                class: !0,
                role: !0,
                tabindex: !0
            }),
            y(e).forEach(v),
            l = C(f),
            t = E(f, "DIV", {
                class: !0,
                role: !0
            });
            var d = y(t);
            i = E(d, "DIV", {
                class: !0
            });
            var D = y(i);
            X(s.$$.fragment, D),
            D.forEach(v),
            d.forEach(v),
            this.h()
        },
        h() {
            _(e, "class", "modal__backdrop svelte-gud11r"),
            _(e, "role", "button"),
            _(e, "tabindex", "0"),
            _(i, "class", "modal__cnt svelte-gud11r"),
            _(t, "class", "modal svelte-gud11r"),
            _(t, "role", "dialog")
        },
        m(f, d) {
            I(f, e, d),
            I(f, l, d),
            I(f, t, d),
            k(t, i),
            Y(s, i, null),
            c = !0,
            p || (h = [F(e, "click", n[1]), F(e, "keydown", n[2])],
            p = !0)
        },
        p: T,
        i(f) {
            c || (f && re( () => {
                c && (r || (r = U(e, ie, {}, !0)),
                r.run(1))
            }
            ),
            S(s.$$.fragment, f),
            f && re( () => {
                c && (a || (a = U(i, ne, {
                    y: 200,
                    duration: 300
                }, !0)),
                a.run(1))
            }
            ),
            c = !0)
        },
        o(f) {
            f && (r || (r = U(e, ie, {}, !1)),
            r.run(0)),
            P(s.$$.fragment, f),
            f && (a || (a = U(i, ne, {
                y: 200,
                duration: 300
            }, !1)),
            a.run(0)),
            c = !1
        },
        d(f) {
            f && (v(e),
            v(l),
            v(t)),
            f && r && r.end(),
            ee(s),
            f && a && a.end(),
            p = !1,
            ke(h)
        }
    }
}
function Ce(n) {
    let e, r, l = n[0] && _e(n);
    return {
        c() {
            l && l.c(),
            e = M()
        },
        l(t) {
            l && l.l(t),
            e = M()
        },
        m(t, i) {
            l && l.m(t, i),
            I(t, e, i),
            r = !0
        },
        p(t, [i]) {
            t[0] ? l ? (l.p(t, i),
            i & 1 && S(l, 1)) : (l = _e(t),
            l.c(),
            S(l, 1),
            l.m(e.parentNode, e)) : l && (Z(),
            P(l, 1, 1, () => {
                l = null
            }
            ),
            x())
        },
        i(t) {
            r || (S(l),
            r = !0)
        },
        o(t) {
            P(l),
            r = !1
        },
        d(t) {
            t && v(e),
            l && l.d(t)
        }
    }
}
function Ae(n, e, r) {
    let l;
    be(n, ae, s => r(0, l = s));
    const t = () => ae.set(!1);
    return [l, t, s => {
        s.key === "Escape" && t()
    }
    ]
}
class Oe extends G {
    constructor(e) {
        super(),
        J(this, e, Ae, Ce, Q, {})
    }
}
export {Oe as default};
function __vite__mapDeps(indexes) {
    if (!__vite__mapDeps.viteFileDeps) {
        __vite__mapDeps.viteFileDeps = []
    }
    return indexes.map( (i) => __vite__mapDeps.viteFileDeps[i])
}
