import {u as j, E as q} from "./index.js";
function B(n) {
    return n?.length !== void 0 ? n : Array.from(n)
}
function C(n, h) {
    n.d(1),
    h.delete(n.key)
}
function D(n, h, M, v, S, r, l, x, g, A, o, E) {
    let i = n.length
      , a = r.length
      , c = i;
    const w = {};
    for (; c--; )
        w[n[c].key] = c;
    const d = []
      , u = new Map
      , y = new Map
      , m = [];
    for (c = a; c--; ) {
        const e = E(S, r, c)
          , t = M(e);
        let s = l.get(t);
        s ? v && m.push( () => s.p(e, h)) : (s = A(t, e),
        s.c()),
        u.set(t, d[c] = s),
        t in w && y.set(t, Math.abs(c - w[t]))
    }
    const p = new Set
      , k = new Set;
    function _(e) {
        q(e, 1),
        e.m(x, o),
        l.set(e.key, e),
        o = e.first,
        a--
    }
    for (; i && a; ) {
        const e = d[a - 1]
          , t = n[i - 1]
          , s = e.key
          , f = t.key;
        e === t ? (o = e.first,
        i--,
        a--) : u.has(f) ? !l.has(s) || p.has(s) ? _(e) : k.has(f) ? i-- : y.get(s) > y.get(f) ? (k.add(s),
        _(e)) : (p.add(f),
        i--) : (g(t, l),
        i--)
    }
    for (; i--; ) {
        const e = n[i];
        u.has(e.key) || g(e, l)
    }
    for (; a; )
        _(d[a - 1]);
    return j(m),
    d
}
export {C as d, B as e, D as u};
