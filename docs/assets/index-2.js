import {Q as h, R as u} from "./index.js";
function k(t) {
    return t < .5 ? 4 * t * t * t : .5 * Math.pow(2 * t - 2, 3) + 1
}
function _(t) {
    const e = t - 1;
    return e * e * e + 1
}
function x(t) {
    return --t * t * t * t * t + 1
}
function C(t, {delay: e=0, duration: o=400, easing: n=h}={}) {
    const c = +getComputedStyle(t).opacity;
    return {
        delay: e,
        duration: o,
        easing: n,
        css: s => `opacity: ${s * c}`
    }
}
function O(t, {delay: e=0, duration: o=400, easing: n=_, x: c=0, y: s=0, opacity: r=0}={}) {
    const a = getComputedStyle(t)
      , f = +a.opacity
      , y = a.transform === "none" ? "" : a.transform
      , l = f * (1 - r)
      , [p,m] = u(c)
      , [$,d] = u(s);
    return {
        delay: e,
        duration: o,
        easing: n,
        css: (i, g) => `
			transform: ${y} translate(${(1 - i) * p}${m}, ${(1 - i) * $}${d});
			opacity: ${f - l * g}`
    }
}
function S(t, {delay: e=0, speed: o, duration: n, easing: c=k}={}) {
    let s = t.getTotalLength();
    const r = getComputedStyle(t);
    return r.strokeLinecap !== "butt" && (s += parseInt(r.strokeWidth)),
    n === void 0 ? o === void 0 ? n = 800 : n = s / o : typeof n == "function" && (n = n(s)),
    {
        delay: e,
        duration: n,
        easing: c,
        css: (a, f) => `
			stroke-dasharray: ${s};
			stroke-dashoffset: ${f * s};
		`
    }
}
export {O as a, S as d, C as f, x as q};
