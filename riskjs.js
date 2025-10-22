(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]'))
        s(l);
    new MutationObserver(l => {
        for (const r of l)
            if (r.type === "childList")
                for (const a of r.addedNodes)
                    a.tagName === "LINK" && a.rel === "modulepreload" && s(a)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(l) {
        const r = {};
        return l.integrity && (r.integrity = l.integrity),
        l.referrerPolicy && (r.referrerPolicy = l.referrerPolicy),
        l.crossOrigin === "use-credentials" ? r.credentials = "include" : l.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin",
        r
    }
    function s(l) {
        if (l.ep)
            return;
        l.ep = !0;
        const r = n(l);
        fetch(l.href, r)
    }
}
)();
function ie() {}
const Ve = e => e;
function pt(e) {
    return e()
}
function Ze() {
    return Object.create(null)
}
function ae(e) {
    e.forEach(pt)
}
function ze(e) {
    return typeof e == "function"
}
function Ot(e, t) {
    return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function"
}
let Ie;
function Re(e, t) {
    return e === t ? !0 : (Ie || (Ie = document.createElement("a")),
    Ie.href = t,
    e === Ie.href)
}
function St(e) {
    return Object.keys(e).length === 0
}
function Se(e) {
    return e ?? ""
}
function $e(e) {
    const t = typeof e == "string" && e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
    return t ? [parseFloat(t[1]), t[2] || "px"] : [e, "px"]
}
const gt = typeof window < "u";
let mt = gt ? () => window.performance.now() : () => Date.now()
  , De = gt ? e => requestAnimationFrame(e) : ie;
const ve = new Set;
function vt(e) {
    ve.forEach(t => {
        t.c(e) || (ve.delete(t),
        t.f())
    }
    ),
    ve.size !== 0 && De(vt)
}
function _t(e) {
    let t;
    return ve.size === 0 && De(vt),
    {
        promise: new Promise(n => {
            ve.add(t = {
                c: e,
                f: n
            })
        }
        ),
        abort() {
            ve.delete(t)
        }
    }
}
const Ct = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : global;
function p(e, t) {
    e.appendChild(t)
}
function yt(e) {
    if (!e)
        return document;
    const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
    return t && t.host ? t : e.ownerDocument
}
function Lt(e) {
    const t = M("style");
    return t.textContent = "/* empty */",
    At(yt(e), t),
    t.sheet
}
function At(e, t) {
    return p(e.head || e, t),
    t.sheet
}
function D(e, t, n) {
    e.insertBefore(t, n || null)
}
function H(e) {
    e.parentNode && e.parentNode.removeChild(e)
}
function M(e) {
    return document.createElement(e)
}
function R(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e)
}
function J(e) {
    return document.createTextNode(e)
}
function G() {
    return J(" ")
}
function Ge() {
    return J("")
}
function Ue(e, t, n, s) {
    return e.addEventListener(t, n, s),
    () => e.removeEventListener(t, n, s)
}
function i(e, t, n) {
    n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n)
}
function Ht(e) {
    return Array.from(e.childNodes)
}
function re(e, t) {
    t = "" + t,
    e.data !== t && (e.data = t)
}
function xe(e, t) {
    e.value = t ?? ""
}
function o(e, t, n, s) {
    n == null ? e.style.removeProperty(t) : e.style.setProperty(t, n, "")
}
function zt(e, t, {bubbles: n=!1, cancelable: s=!1}={}) {
    return new CustomEvent(e,{
        detail: t,
        bubbles: n,
        cancelable: s
    })
}
const Ce = new Map;
let Le = 0;
function Bt(e) {
    let t = 5381
      , n = e.length;
    for (; n--; )
        t = (t << 5) - t ^ e.charCodeAt(n);
    return t >>> 0
}
function Ft(e, t) {
    const n = {
        stylesheet: Lt(t),
        rules: {}
    };
    return Ce.set(e, n),
    n
}
function bt(e, t, n, s, l, r, a, m=0) {
    const h = 16.666 / s;
    let u = `{
`;
    for (let c = 0; c <= 1; c += h) {
        const f = t + (n - t) * r(c);
        u += c * 100 + `%{${a(f, 1 - f)}}
`
    }
    const _ = u + `100% {${a(n, 1 - n)}}
}`
      , g = `__svelte_${Bt(_)}_${m}`
      , v = yt(e)
      , {stylesheet: w, rules: b} = Ce.get(v) || Ft(v, e);
    b[g] || (b[g] = !0,
    w.insertRule(`@keyframes ${g} ${_}`, w.cssRules.length));
    const d = e.style.animation || "";
    return e.style.animation = `${d ? `${d}, ` : ""}${g} ${s}ms linear ${l}ms 1 both`,
    Le += 1,
    g
}
function Pe(e, t) {
    const n = (e.style.animation || "").split(", ")
      , s = n.filter(t ? r => r.indexOf(t) < 0 : r => r.indexOf("__svelte") === -1)
      , l = n.length - s.length;
    l && (e.style.animation = s.join(", "),
    Le -= l,
    Le || Rt())
}
function Rt() {
    De( () => {
        Le || (Ce.forEach(e => {
            const {ownerNode: t} = e.stylesheet;
            t && H(t)
        }
        ),
        Ce.clear())
    }
    )
}
let Ye;
function ke(e) {
    Ye = e
}
const ge = []
  , je = [];
let _e = [];
const et = []
  , wt = Promise.resolve();
let qe = !1;
function kt() {
    qe || (qe = !0,
    wt.then(jt))
}
function tt() {
    return kt(),
    wt
}
function fe(e) {
    _e.push(e)
}
const Fe = new Set;
let pe = 0;
function jt() {
    if (pe !== 0)
        return;
    const e = Ye;
    do {
        try {
            for (; pe < ge.length; ) {
                const t = ge[pe];
                pe++,
                ke(t),
                Gt(t.$$)
            }
        } catch (t) {
            throw ge.length = 0,
            pe = 0,
            t
        }
        for (ke(null),
        ge.length = 0,
        pe = 0; je.length; )
            je.pop()();
        for (let t = 0; t < _e.length; t += 1) {
            const n = _e[t];
            Fe.has(n) || (Fe.add(n),
            n())
        }
        _e.length = 0
    } while (ge.length);
    for (; et.length; )
        et.pop()();
    qe = !1,
    Fe.clear(),
    ke(e)
}
function Gt(e) {
    if (e.fragment !== null) {
        e.update(),
        ae(e.before_update);
        const t = e.dirty;
        e.dirty = [-1],
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(fe)
    }
}
function Pt(e) {
    const t = []
      , n = [];
    _e.forEach(s => e.indexOf(s) === -1 ? t.push(s) : n.push(s)),
    n.forEach(s => s()),
    _e = t
}
let we;
function Mt() {
    return we || (we = Promise.resolve(),
    we.then( () => {
        we = null
    }
    )),
    we
}
function Ae(e, t, n) {
    e.dispatchEvent(zt(`${t ? "intro" : "outro"}${n}`))
}
const Ne = new Set;
let ne;
function nt() {
    ne = {
        r: 0,
        c: [],
        p: ne
    }
}
function it() {
    ne.r || ae(ne.c),
    ne = ne.p
}
function me(e, t) {
    e && e.i && (Ne.delete(e),
    e.i(t))
}
function Oe(e, t, n, s) {
    if (e && e.o) {
        if (Ne.has(e))
            return;
        Ne.add(e),
        ne.c.push( () => {
            Ne.delete(e),
            s && (n && e.d(1),
            s())
        }
        ),
        e.o(t)
    } else
        s && s()
}
const Tt = {
    duration: 0
};
function Et(e, t, n) {
    const s = {
        direction: "in"
    };
    let l = t(e, n, s), r = !1, a, m, h = 0;
    function u() {
        a && Pe(e, a)
    }
    function _() {
        const {delay: v=0, duration: w=300, easing: b=Ve, tick: d=ie, css: c} = l || Tt;
        c && (a = bt(e, 0, 1, w, v, b, c, h++)),
        d(0, 1);
        const f = mt() + v
          , O = f + w;
        m && m.abort(),
        r = !0,
        fe( () => Ae(e, !0, "start")),
        m = _t(S => {
            if (r) {
                if (S >= O)
                    return d(1, 0),
                    Ae(e, !0, "end"),
                    u(),
                    r = !1;
                if (S >= f) {
                    const C = b((S - f) / w);
                    d(C, 1 - C)
                }
            }
            return r
        }
        )
    }
    let g = !1;
    return {
        start() {
            g || (g = !0,
            Pe(e),
            ze(l) ? (l = l(s),
            Mt().then(_)) : _())
        },
        invalidate() {
            g = !1
        },
        end() {
            r && (u(),
            r = !1)
        }
    }
}
function It(e, t, n) {
    const s = {
        direction: "out"
    };
    let l = t(e, n, s), r = !0, a;
    const m = ne;
    m.r += 1;
    let h;
    function u() {
        const {delay: _=0, duration: g=300, easing: v=Ve, tick: w=ie, css: b} = l || Tt;
        b && (a = bt(e, 1, 0, g, _, v, b));
        const d = mt() + _
          , c = d + g;
        fe( () => Ae(e, !1, "start")),
        "inert"in e && (h = e.inert,
        e.inert = !0),
        _t(f => {
            if (r) {
                if (f >= c)
                    return w(0, 1),
                    Ae(e, !1, "end"),
                    --m.r || ae(m.c),
                    !1;
                if (f >= d) {
                    const O = v((f - d) / g);
                    w(1 - O, O)
                }
            }
            return r
        }
        )
    }
    return ze(l) ? Mt().then( () => {
        l = l(s),
        u()
    }
    ) : u(),
    {
        end(_) {
            _ && "inert"in e && (e.inert = h),
            _ && l.tick && l.tick(1, 0),
            r && (a && Pe(e, a),
            r = !1)
        }
    }
}
function He(e) {
    return e?.length !== void 0 ? e : Array.from(e)
}
function qt(e, t) {
    e.d(1),
    t.delete(e.key)
}
function Vt(e, t) {
    Oe(e, 1, 1, () => {
        t.delete(e.key)
    }
    )
}
function Nt(e, t, n, s, l, r, a, m, h, u, _, g) {
    let v = e.length
      , w = r.length
      , b = v;
    const d = {};
    for (; b--; )
        d[e[b].key] = b;
    const c = []
      , f = new Map
      , O = new Map
      , S = [];
    for (b = w; b--; ) {
        const T = g(l, r, b)
          , B = n(T);
        let L = a.get(B);
        L ? S.push( () => L.p(T, t)) : (L = u(B, T),
        L.c()),
        f.set(B, c[b] = L),
        B in d && O.set(B, Math.abs(b - d[B]))
    }
    const C = new Set
      , Q = new Set;
    function P(T) {
        me(T, 1),
        T.m(m, _),
        a.set(T.key, T),
        _ = T.first,
        w--
    }
    for (; v && w; ) {
        const T = c[w - 1]
          , B = e[v - 1]
          , L = T.key
          , x = B.key;
        T === B ? (_ = T.first,
        v--,
        w--) : f.has(x) ? !a.has(L) || C.has(L) ? P(T) : Q.has(x) ? v-- : O.get(L) > O.get(x) ? (Q.add(L),
        P(T)) : (C.add(x),
        v--) : (h(B, a),
        v--)
    }
    for (; v--; ) {
        const T = e[v];
        f.has(T.key) || h(T, a)
    }
    for (; w; )
        P(c[w - 1]);
    return ae(S),
    c
}
function Dt(e, t, n) {
    const {fragment: s, after_update: l} = e.$$;
    s && s.m(t, n),
    fe( () => {
        const r = e.$$.on_mount.map(pt).filter(ze);
        e.$$.on_destroy ? e.$$.on_destroy.push(...r) : ae(r),
        e.$$.on_mount = []
    }
    ),
    l.forEach(fe)
}
function Ut(e, t) {
    const n = e.$$;
    n.fragment !== null && (Pt(n.after_update),
    ae(n.on_destroy),
    n.fragment && n.fragment.d(t),
    n.on_destroy = n.fragment = null,
    n.ctx = [])
}
function Yt(e, t) {
    e.$$.dirty[0] === -1 && (ge.push(e),
    kt(),
    e.$$.dirty.fill(0)),
    e.$$.dirty[t / 31 | 0] |= 1 << t % 31
}
function Kt(e, t, n, s, l, r, a=null, m=[-1]) {
    const h = Ye;
    ke(e);
    const u = e.$$ = {
        fragment: null,
        ctx: [],
        props: r,
        update: ie,
        not_equal: l,
        bound: Ze(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(t.context || (h ? h.$$.context : [])),
        callbacks: Ze(),
        dirty: m,
        skip_bound: !1,
        root: t.target || h.$$.root
    };
    a && a(u.root);
    let _ = !1;
    if (u.ctx = n ? n(e, t.props || {}, (g, v, ...w) => {
        const b = w.length ? w[0] : v;
        return u.ctx && l(u.ctx[g], u.ctx[g] = b) && (!u.skip_bound && u.bound[g] && u.bound[g](b),
        _ && Yt(e, g)),
        v
    }
    ) : [],
    u.update(),
    _ = !0,
    ae(u.before_update),
    u.fragment = s ? s(u.ctx) : !1,
    t.target) {
        if (t.hydrate) {
            const g = Ht(t.target);
            u.fragment && u.fragment.l(g),
            g.forEach(H)
        } else
            u.fragment && u.fragment.c();
        t.intro && me(e.$$.fragment),
        Dt(e, t.target, t.anchor),
        jt()
    }
    ke(h)
}
class Wt {
    $$ = void 0;
    $$set = void 0;
    $destroy() {
        Ut(this, 1),
        this.$destroy = ie
    }
    $on(t, n) {
        if (!ze(n))
            return ie;
        const s = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
        return s.push(n),
        () => {
            const l = s.indexOf(n);
            l !== -1 && s.splice(l, 1)
        }
    }
    $set(t) {
        this.$$set && !St(t) && (this.$$.skip_bound = !0,
        this.$$set(t),
        this.$$.skip_bound = !1)
    }
}
const Xt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = {
    v: new Set
})).v.add(Xt);
function Jt(e) {
    const t = e - 1;
    return t * t * t + 1
}
function st(e, {delay: t=0, duration: n=400, easing: s=Ve}={}) {
    const l = +getComputedStyle(e).opacity;
    return {
        delay: t,
        duration: n,
        easing: s,
        css: r => `opacity: ${r * l}`
    }
}
function lt(e, {delay: t=0, duration: n=400, easing: s=Jt, x: l=0, y: r=0, opacity: a=0}={}) {
    const m = getComputedStyle(e)
      , h = +m.opacity
      , u = m.transform === "none" ? "" : m.transform
      , _ = h * (1 - a)
      , [g,v] = $e(l)
      , [w,b] = $e(r);
    return {
        delay: t,
        duration: n,
        easing: s,
        css: (d, c) => `
			transform: ${u} translate(${(1 - d) * g}${v}, ${(1 - d) * w}${b});
			opacity: ${h - _ * c}`
    }
}
const {document: ot} = Ct;
function rt(e, t, n) {
    const s = e.slice();
    return s[35] = t[n],
    s[36] = t,
    s[37] = n,
    s
}
function ft(e, t, n) {
    const s = e.slice();
    return s[38] = t[n],
    s
}
function at(e, t) {
    let n, s, l, r, a, m, h, u, _ = t[38].message + "", g, v, w, b, d;
    return {
        key: e,
        first: null,
        c() {
            n = M("div"),
            s = M("div"),
            l = M("div"),
            r = G(),
            a = M("i"),
            h = G(),
            u = M("span"),
            g = J(_),
            v = G(),
            i(l, "class", "progress svelte-vmojrg"),
            o(l, "width", t[38].progress + "%"),
            i(a, "class", m = Se(t[19][t[38].type]?.icon) + " svelte-vmojrg"),
            o(a, "z-index", "2"),
            o(a, "font-size", "1.4vh"),
            o(a, "color", "white"),
            o(u, "margin-left", "1vh"),
            i(u, "class", "svelte-vmojrg"),
            i(s, "class", "message-box svelte-vmojrg"),
            o(s, "background-color", t[19][t[38].type]?.bg || "#34495e"),
            i(n, "class", "notification svelte-vmojrg"),
            this.first = n
        },
        m(c, f) {
            D(c, n, f),
            p(n, s),
            p(s, l),
            p(s, r),
            p(s, a),
            p(s, h),
            p(s, u),
            p(u, g),
            p(n, v),
            d = !0
        },
        p(c, f) {
            t = c,
            (!d || f[0] & 1024) && o(l, "width", t[38].progress + "%"),
            (!d || f[0] & 1024 && m !== (m = Se(t[19][t[38].type]?.icon) + " svelte-vmojrg")) && i(a, "class", m),
            (!d || f[0] & 1024) && _ !== (_ = t[38].message + "") && re(g, _),
            (!d || f[0] & 1024) && o(s, "background-color", t[19][t[38].type]?.bg || "#34495e")
        },
        i(c) {
            d || (c && fe( () => {
                d && (b && b.end(1),
                w = Et(n, lt, {
                    x: 80,
                    duration: 200
                }),
                w.start())
            }
            ),
            d = !0)
        },
        o(c) {
            w && w.invalidate(),
            c && (b = It(n, lt, {
                x: 80,
                duration: 200
            })),
            d = !1
        },
        d(c) {
            c && H(n),
            c && b && b.end()
        }
    }
}
function ct(e) {
    let t, n, s, l, r, a, m, h, u, _;
    return {
        c() {
            t = M("div"),
            n = M("div"),
            s = M("div"),
            l = M("div"),
            r = J(e[4]),
            a = G(),
            m = M("div"),
            h = M("input"),
            i(l, "class", "input-title svelte-vmojrg"),
            i(h, "type", "text"),
            i(h, "placeholder", e[6]),
            h.autofocus = !0,
            i(h, "class", "svelte-vmojrg"),
            i(m, "class", "input-content svelte-vmojrg"),
            i(s, "class", "input-bg svelte-vmojrg"),
            i(n, "class", "input-main svelte-vmojrg"),
            i(t, "class", "input-mainbg svelte-vmojrg")
        },
        m(g, v) {
            D(g, t, v),
            p(t, n),
            p(n, s),
            p(s, l),
            p(l, r),
            p(s, a),
            p(s, m),
            p(m, h),
            xe(h, e[5]),
            h.focus(),
            u || (_ = Ue(h, "input", e[22]),
            u = !0)
        },
        p(g, v) {
            v[0] & 16 && re(r, g[4]),
            v[0] & 64 && i(h, "placeholder", g[6]),
            v[0] & 32 && h.value !== g[5] && xe(h, g[5])
        },
        d(g) {
            g && H(t),
            u = !1,
            _()
        }
    }
}
function ut(e) {
    let t, n, s, l, r, a, m, h, u, _, g, v, w, b, d, c, f, O, S, C, Q, P, T, B, L, x, K, ce, se, q, V, ue, Me, z, te, de = e[1][e[0]].label + "", ye, j, y, E, N = (e[18].length ? e[20]() : 0) + "", F, W, U = e[18].length + "", Z, he, Ke, Y, le, ee, $ = [], We = new Map, Xe, X, Te, be, A, Be, Je, Ee = He(e[1]);
    const Qe = k => k[35].label;
    for (let k = 0; k < Ee.length; k += 1) {
        let I = rt(e, Ee, k)
          , oe = Qe(I);
        We.set(oe, $[k] = dt(oe, I))
    }
    return {
        c() {
            t = M("div"),
            n = M("div"),
            s = R("svg"),
            l = R("defs"),
            r = R("filter"),
            a = R("feGaussianBlur"),
            m = R("feColorMatrix"),
            h = R("feMerge"),
            u = R("feMergeNode"),
            _ = R("feMergeNode"),
            g = R("linearGradient"),
            v = R("stop"),
            w = R("stop"),
            b = R("stop"),
            d = R("rect"),
            f = R("rect"),
            S = R("rect"),
            C = R("rect"),
            P = R("path"),
            T = R("path"),
            x = G(),
            K = M("div"),
            se = G(),
            q = M("div"),
            V = M("img"),
            Me = G(),
            z = M("div"),
            te = M("span"),
            ye = J(de),
            j = G(),
            y = M("span"),
            E = J("("),
            F = J(N),
            W = J("/"),
            Z = J(U),
            he = J(")"),
            Ke = G(),
            Y = M("div"),
            le = M("div"),
            ee = M("div");
            for (let k = 0; k < $.length; k += 1)
                $[k].c();
            Xe = G(),
            X = M("div"),
            X.innerHTML = '<span style="color:#ffffff; font-weight:500;" class="svelte-vmojrg">Beta - 1.0</span> <span style="color:#ffffff; font-weight:500;" class="svelte-vmojrg">Risk.lua</span>',
            i(a, "stdDeviation", "3"),
            i(a, "result", "glow"),
            i(a, "class", "svelte-vmojrg"),
            i(m, "in", "glow"),
            i(m, "type", "matrix"),
            i(m, "values", `\r
                0 0 0 0 0\r
                0 0 0 0 0\r
                0 0 0 0 0\r
                0 0 0 0.5 0`),
            i(m, "result", "darkGlow"),
            i(m, "class", "svelte-vmojrg"),
            i(u, "in", "darkGlow"),
            i(u, "class", "svelte-vmojrg"),
            i(_, "in", "SourceGraphic"),
            i(_, "class", "svelte-vmojrg"),
            i(h, "class", "svelte-vmojrg"),
            i(r, "id", "innerGlow"),
            i(r, "x", "-200%"),
            i(r, "y", "-50%"),
            i(r, "width", "500%"),
            i(r, "height", "200%"),
            i(r, "class", "svelte-vmojrg"),
            i(v, "offset", "0%"),
            i(v, "stop-color", "#1a1a1a"),
            i(v, "class", "svelte-vmojrg"),
            i(w, "offset", "50%"),
            i(w, "stop-color", "#0a0a0a"),
            i(w, "class", "svelte-vmojrg"),
            i(b, "offset", "100%"),
            i(b, "stop-color", "#1a1a1a"),
            i(b, "class", "svelte-vmojrg"),
            i(g, "id", "coreV"),
            i(g, "x1", "0"),
            i(g, "y1", "0"),
            i(g, "x2", "0"),
            i(g, "y2", "1"),
            i(g, "class", "svelte-vmojrg"),
            i(l, "class", "svelte-vmojrg"),
            i(d, "x", "7.5"),
            i(d, "y", "0"),
            i(d, "width", "11"),
            i(d, "height", c = e[14] + 56),
            i(d, "rx", "5.5"),
            i(d, "ry", "5.5"),
            i(d, "fill", "#000000"),
            i(d, "class", "svelte-vmojrg"),
            i(f, "x", "9"),
            i(f, "y", "22"),
            i(f, "width", "8"),
            i(f, "height", O = e[14] + 12),
            i(f, "rx", "4"),
            i(f, "ry", "4"),
            i(f, "fill", "url(#coreV)"),
            i(f, "filter", "url(#innerGlow)"),
            i(f, "class", "svelte-vmojrg"),
            i(S, "x", "8"),
            i(S, "y", "0"),
            i(S, "width", "10"),
            i(S, "height", "20"),
            i(S, "rx", "5"),
            i(S, "ry", "5"),
            i(S, "fill", "#000000"),
            i(S, "class", "svelte-vmojrg"),
            i(C, "x", "8"),
            i(C, "y", Q = e[14] + 36),
            i(C, "width", "10"),
            i(C, "height", "20"),
            i(C, "rx", "5"),
            i(C, "ry", "5"),
            i(C, "fill", "#000000"),
            i(C, "class", "svelte-vmojrg"),
            i(P, "d", "M 10,12 L 13,7 L 16,12"),
            i(P, "fill", "#ffffff"),
            i(P, "stroke", "#ffffff"),
            i(P, "stroke-width", "1"),
            i(P, "stroke-linejoin", "round"),
            i(P, "stroke-linecap", "round"),
            i(P, "class", "svelte-vmojrg"),
            i(T, "d", B = "M 10," + (e[14] + 44) + " L 13," + (e[14] + 49) + " L 16," + (e[14] + 44)),
            i(T, "fill", "#ffffff"),
            i(T, "stroke", "#ffffff"),
            i(T, "stroke-width", "1"),
            i(T, "stroke-linejoin", "round"),
            i(T, "stroke-linecap", "round"),
            i(T, "class", "svelte-vmojrg"),
            i(s, "viewBox", L = "0 0 26 " + (e[14] + 56)),
            i(s, "preserveAspectRatio", "none"),
            o(s, "width", "100%"),
            o(s, "height", "100%"),
            o(s, "display", "block"),
            i(s, "class", "svelte-vmojrg"),
            i(K, "class", "scrollbar-thumb svelte-vmojrg"),
            o(K, "top", e[15] + 22 + "px"),
            o(K, "height", e[16] + "px"),
            i(n, "class", ce = "scrollbar-container " + (e[17] ? "is-hidden" : "") + " svelte-vmojrg"),
            o(n, "top", e[13] - 28 + "px"),
            o(n, "height", e[14] + 61.6 + "px"),
            Re(V.src, ue = e[9]) || i(V, "src", ue),
            o(V, "display", "block"),
            o(V, "width", "100%"),
            o(V, "height", "9.5vh"),
            o(V, "object-fit", "cover"),
            o(V, "margin", "0"),
            o(V, "padding", "0"),
            o(V, "border", "0"),
            i(V, "class", "svelte-vmojrg"),
            o(q, "transform", "translateY(-0.2vh)"),
            o(q, "margin-left", "1.75vh"),
            o(q, "width", "95%"),
            o(q, "border-radius", "0.4vh"),
            o(q, "overflow", "hidden"),
            o(q, "line-height", "0"),
            i(q, "class", "svelte-vmojrg"),
            o(te, "color", "#ffffff"),
            o(te, "font-weight", "500"),
            i(te, "class", "svelte-vmojrg"),
            o(y, "color", "#ffffff"),
            o(y, "font-weight", "500"),
            i(y, "class", "svelte-vmojrg"),
            o(z, "margin-top", "0.5vh"),
            o(z, "margin-left", "1.75vh"),
            o(z, "width", "90%"),
            o(z, "background", "rgba(0, 0, 0)"),
            o(z, "border-radius", "0.5vh 0.5vh 0 0"),
            o(z, "padding", "0.8vh 0.9vh"),
            o(z, "font-size", "1.1vh"),
            o(z, "color", "#ffffff"),
            o(z, "display", "flex"),
            o(z, "justify-content", "space-between"),
            o(z, "align-items", "center"),
            i(z, "class", "svelte-vmojrg"),
            o(ee, "display", "flex"),
            o(ee, "flex-direction", "column"),
            o(ee, "gap", "0.0vh"),
            o(ee, "position", "relative"),
            i(ee, "class", "svelte-vmojrg"),
            i(le, "class", "hide-scrollbar svelte-vmojrg"),
            o(le, "max-height", "33.6vh"),
            o(X, "background", "rgba(0, 0, 0)"),
            o(X, "border-radius", "0 0 0.5vh 0.5vh"),
            o(X, "padding", "0.8vh 0.9vh"),
            o(X, "font-size", "1.1vh"),
            o(X, "color", "#ffffff"),
            o(X, "display", "flex"),
            o(X, "justify-content", "space-between"),
            o(X, "align-items", "center"),
            i(X, "class", "svelte-vmojrg"),
            o(Y, "position", "absolute"),
            o(Y, "margin-left", "1.75vh"),
            o(Y, "width", "33.5vh"),
            o(Y, "background", "rgb(0, 0, 0, 0.5)"),
            o(Y, "border-radius", "0 0 0.5vh 0.5vh"),
            o(Y, "display", "flex"),
            o(Y, "flex-direction", "column"),
            o(Y, "overflow", "hidden"),
            o(Y, "position", "relative"),
            i(Y, "class", "svelte-vmojrg"),
            o(t, "position", "absolute"),
            o(t, "top", "50%"),
            o(t, "transform", "translateY(-50%)"),
            o(t, "left", e[8] == "left" && "6.5vh" || e[8] == "right" && "calc(100% - 41vh)"),
            o(t, "transition", "0.5s"),
            o(t, "font-family", "'Geist', sans-serif"),
            i(t, "class", "svelte-vmojrg")
        },
        m(k, I) {
            D(k, t, I),
            p(t, n),
            p(n, s),
            p(s, l),
            p(l, r),
            p(r, a),
            p(r, m),
            p(r, h),
            p(h, u),
            p(h, _),
            p(l, g),
            p(g, v),
            p(g, w),
            p(g, b),
            p(s, d),
            p(s, f),
            p(s, S),
            p(s, C),
            p(s, P),
            p(s, T),
            p(n, x),
            p(n, K),
            p(t, se),
            p(t, q),
            p(q, V),
            p(t, Me),
            p(t, z),
            p(z, te),
            p(te, ye),
            p(z, j),
            p(z, y),
            p(y, E),
            p(y, F),
            p(y, W),
            p(y, Z),
            p(y, he),
            p(t, Ke),
            p(t, Y),
            p(Y, le),
            p(le, ee);
            for (let oe = 0; oe < $.length; oe += 1)
                $[oe] && $[oe].m(ee, null);
            e[25](le),
            p(Y, Xe),
            p(Y, X),
            e[26](t),
            A = !0,
            Be || (Je = Ue(le, "scroll", e[21]),
            Be = !0)
        },
        p(k, I) {
            (!A || I[0] & 16384 && c !== (c = k[14] + 56)) && i(d, "height", c),
            (!A || I[0] & 16384 && O !== (O = k[14] + 12)) && i(f, "height", O),
            (!A || I[0] & 16384 && Q !== (Q = k[14] + 36)) && i(C, "y", Q),
            (!A || I[0] & 16384 && B !== (B = "M 10," + (k[14] + 44) + " L 13," + (k[14] + 49) + " L 16," + (k[14] + 44))) && i(T, "d", B),
            (!A || I[0] & 16384 && L !== (L = "0 0 26 " + (k[14] + 56))) && i(s, "viewBox", L),
            (!A || I[0] & 32768) && o(K, "top", k[15] + 22 + "px"),
            (!A || I[0] & 65536) && o(K, "height", k[16] + "px"),
            (!A || I[0] & 131072 && ce !== (ce = "scrollbar-container " + (k[17] ? "is-hidden" : "") + " svelte-vmojrg")) && i(n, "class", ce),
            (!A || I[0] & 8192) && o(n, "top", k[13] - 28 + "px"),
            (!A || I[0] & 16384) && o(n, "height", k[14] + 61.6 + "px"),
            (!A || I[0] & 512 && !Re(V.src, ue = k[9])) && i(V, "src", ue),
            (!A || I[0] & 3) && de !== (de = k[1][k[0]].label + "") && re(ye, de),
            (!A || I[0] & 262144) && N !== (N = (k[18].length ? k[20]() : 0) + "") && re(F, N),
            (!A || I[0] & 262144) && U !== (U = k[18].length + "") && re(Z, U),
            I[0] & 131 && (Ee = He(k[1]),
            $ = Nt($, I, Qe, 1, k, Ee, We, ee, qt, dt, null, rt)),
            (!A || I[0] & 256) && o(t, "left", k[8] == "left" && "6.5vh" || k[8] == "right" && "calc(100% - 41vh)")
        },
        i(k) {
            A || (k && fe( () => {
                A && (be && be.end(1),
                Te = Et(t, st, {
                    duration: 200
                }),
                Te.start())
            }
            ),
            A = !0)
        },
        o(k) {
            Te && Te.invalidate(),
            k && (be = It(t, st, {
                duration: 200
            })),
            A = !1
        },
        d(k) {
            k && H(t);
            for (let I = 0; I < $.length; I += 1)
                $[I].d();
            e[25](null),
            e[26](null),
            k && be && be.end(),
            Be = !1,
            Je()
        }
    }
}
function Qt(e) {
    let t, n, s = e[35].label + "", l, r, a, m, h, u = e[37];
    function _(d, c) {
        if (d[35].type == "submenu")
            return tn;
        if (d[35].type == "checkbox")
            return en;
        if (d[35].type == "slider")
            return xt;
        if (d[35].type == "scroll")
            return $t
    }
    let g = _(e)
      , v = g && g(e);
    const w = () => e[24](t, u)
      , b = () => e[24](null, u);
    return {
        c() {
            t = M("div"),
            n = M("span"),
            l = J(s),
            r = G(),
            v && v.c(),
            a = G(),
            o(n, "flex-grow", "1"),
            o(n, "text-align", "left"),
            o(n, "font-size", "1.2vh"),
            o(n, "height", "100%"),
            i(n, "class", "svelte-vmojrg"),
            i(t, "class", m = Se(e[37] == e[0] ? "active" : "") + " svelte-vmojrg"),
            i(t, "style", h = "padding: 0.7vh 0.6vh; color: white; justify-content: space-between; display: flex; align-items: center; font-family: 'Geist', sans-serif; font-size: 1.4vh; gap: 1vh; font-weight: 400; cursor: pointer; z-index: 1; transition: background 0.2s ease-in-out, box-shadow 0.2s ease-in-out; " + (e[37] == e[0] ? "background-color: rgb(100, 0, 0); box-shadow: inset 0 0 0 0.05vh rgb(250, 0, 0);" : ""))
        },
        m(d, c) {
            D(d, t, c),
            p(t, n),
            p(n, l),
            p(t, r),
            v && v.m(t, null),
            p(t, a),
            w()
        },
        p(d, c) {
            e = d,
            c[0] & 2 && s !== (s = e[35].label + "") && re(l, s),
            g === (g = _(e)) && v ? v.p(e, c) : (v && v.d(1),
            v = g && g(e),
            v && (v.c(),
            v.m(t, a))),
            c[0] & 3 && m !== (m = Se(e[37] == e[0] ? "active" : "") + " svelte-vmojrg") && i(t, "class", m),
            c[0] & 3 && h !== (h = "padding: 0.7vh 0.6vh; color: white; justify-content: space-between; display: flex; align-items: center; font-family: 'Geist', sans-serif; font-size: 1.4vh; gap: 1vh; font-weight: 400; cursor: pointer; z-index: 1; transition: background 0.2s ease-in-out, box-shadow 0.2s ease-in-out; " + (e[37] == e[0] ? "background-color: rgb(100, 0, 0); box-shadow: inset 0 0 0 0.05vh rgb(250, 0, 0);" : "")) && i(t, "style", h),
            u !== e[37] && (b(),
            u = e[37],
            w())
        },
        d(d) {
            d && H(t),
            v && v.d(),
            b()
        }
    }
}
function Zt(e) {
    let t;
    return {
        c() {
            t = M("div"),
            i(t, "class", "menu-divider svelte-vmojrg")
        },
        m(n, s) {
            D(n, t, s)
        },
        p: ie,
        d(n) {
            n && H(t)
        }
    }
}
function $t(e) {
    let t, n, s, l, r = e[35].options[e[35].selected]?.label + "", a, m, h;
    return {
        c() {
            t = M("div"),
            n = M("span"),
            n.textContent = "-",
            s = G(),
            l = M("span"),
            a = J(r),
            m = G(),
            h = M("span"),
            h.textContent = "-",
            o(n, "font-size", "1.2vh"),
            o(n, "line-height", "1"),
            i(n, "class", "svelte-vmojrg"),
            o(l, "font-size", "1.2vh"),
            o(l, "line-height", "1"),
            i(l, "class", "svelte-vmojrg"),
            o(h, "font-size", "1.2vh"),
            o(h, "line-height", "1"),
            i(h, "class", "svelte-vmojrg"),
            o(t, "position", "relative"),
            o(t, "display", "flex"),
            o(t, "align-items", "center"),
            o(t, "justify-content", "center"),
            o(t, "width", "auto"),
            o(t, "height", "100%"),
            o(t, "gap", "0.4vh"),
            i(t, "class", "svelte-vmojrg")
        },
        m(u, _) {
            D(u, t, _),
            p(t, n),
            p(t, s),
            p(t, l),
            p(l, a),
            p(t, m),
            p(t, h)
        },
        p(u, _) {
            _[0] & 2 && r !== (r = u[35].options[u[35].selected]?.label + "") && re(a, r)
        },
        d(u) {
            u && H(t)
        }
    }
}
function xt(e) {
    let t, n, s, l, r, a, m;
    function h(...u) {
        return e[23](e[35], e[36], e[37], ...u)
    }
    return {
        c() {
            t = M("input"),
            i(t, "type", "range"),
            i(t, "class", "range svelte-vmojrg"),
            t.value = n = e[35].value,
            i(t, "min", s = e[35].min),
            i(t, "max", l = e[35].max),
            i(t, "step", r = e[35].step),
            o(t, "--pct", (e[35].value - e[35].min) / (e[35].max - e[35].min) * 100 + "%")
        },
        m(u, _) {
            D(u, t, _),
            a || (m = Ue(t, "input", h),
            a = !0)
        },
        p(u, _) {
            e = u,
            _[0] & 2 && n !== (n = e[35].value) && (t.value = n),
            _[0] & 2 && s !== (s = e[35].min) && i(t, "min", s),
            _[0] & 2 && l !== (l = e[35].max) && i(t, "max", l),
            _[0] & 2 && r !== (r = e[35].step) && i(t, "step", r),
            _[0] & 2 && o(t, "--pct", (e[35].value - e[35].min) / (e[35].max - e[35].min) * 100 + "%")
        },
        d(u) {
            u && H(t),
            a = !1,
            m()
        }
    }
}
function en(e) {
    let t, n;
    return {
        c() {
            t = M("i"),
            i(t, "class", n = "ph " + (e[35].checked ? "ph-check" : "ph-x") + " svelte-vmojrg"),
            o(t, "color", "white"),
            o(t, "font-size", "1.2vh")
        },
        m(s, l) {
            D(s, t, l)
        },
        p(s, l) {
            l[0] & 2 && n !== (n = "ph " + (s[35].checked ? "ph-check" : "ph-x") + " svelte-vmojrg") && i(t, "class", n)
        },
        d(s) {
            s && H(t)
        }
    }
}
function tn(e) {
    let t;
    return {
        c() {
            t = M("i"),
            i(t, "class", "ph ph-caret-double-right svelte-vmojrg"),
            o(t, "color", "white"),
            o(t, "font-size", "1.2vh")
        },
        m(n, s) {
            D(n, t, s)
        },
        p: ie,
        d(n) {
            n && H(t)
        }
    }
}
function dt(e, t) {
    let n, s;
    function l(m, h) {
        return m[35].type == "divider" ? Zt : Qt
    }
    let r = l(t)
      , a = r(t);
    return {
        key: e,
        first: null,
        c() {
            n = Ge(),
            a.c(),
            s = Ge(),
            this.first = n
        },
        m(m, h) {
            D(m, n, h),
            a.m(m, h),
            D(m, s, h)
        },
        p(m, h) {
            t = m,
            r === (r = l(t)) && a ? a.p(t, h) : (a.d(1),
            a = r(t),
            a && (a.c(),
            a.m(s.parentNode, s)))
        },
        d(m) {
            m && (H(n),
            H(s)),
            a.d(m)
        }
    }
}
function nn(e) {
    let t, n, s, l, r, a = [], m = new Map, h, u, _, g, v = He(e[10]);
    const w = c => c[38].id;
    for (let c = 0; c < v.length; c += 1) {
        let f = ft(e, v, c)
          , O = w(f);
        m.set(O, a[c] = at(O, f))
    }
    let b = e[3] && ct(e)
      , d = e[2] && ut(e);
    return {
        c() {
            t = M("link"),
            n = M("script"),
            n.innerHTML = "",
            l = G(),
            r = M("div");
            for (let c = 0; c < a.length; c += 1)
                a[c].c();
            h = G(),
            b && b.c(),
            u = G(),
            d && d.c(),
            _ = Ge(),
            i(t, "href", "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"),
            i(t, "rel", "stylesheet"),
            i(t, "class", "svelte-vmojrg"),
            Re(n.src, s = "https://unpkg.com/@phosphor-icons/web") || i(n, "src", s),
            i(n, "class", "svelte-vmojrg"),
            i(r, "class", "notification-container svelte-vmojrg")
        },
        m(c, f) {
            p(ot.head, t),
            p(ot.head, n),
            D(c, l, f),
            D(c, r, f);
            for (let O = 0; O < a.length; O += 1)
                a[O] && a[O].m(r, null);
            D(c, h, f),
            b && b.m(c, f),
            D(c, u, f),
            d && d.m(c, f),
            D(c, _, f),
            g = !0
        },
        p(c, f) {
            f[0] & 525312 && (v = He(c[10]),
            nt(),
            a = Nt(a, f, w, 1, c, v, m, r, Vt, at, null, ft),
            it()),
            c[3] ? b ? b.p(c, f) : (b = ct(c),
            b.c(),
            b.m(u.parentNode, u)) : b && (b.d(1),
            b = null),
            c[2] ? d ? (d.p(c, f),
            f[0] & 4 && me(d, 1)) : (d = ut(c),
            d.c(),
            me(d, 1),
            d.m(_.parentNode, _)) : d && (nt(),
            Oe(d, 1, 1, () => {
                d = null
            }
            ),
            it())
        },
        i(c) {
            if (!g) {
                for (let f = 0; f < v.length; f += 1)
                    me(a[f]);
                me(d),
                g = !0
            }
        },
        o(c) {
            for (let f = 0; f < a.length; f += 1)
                Oe(a[f]);
            Oe(d),
            g = !1
        },
        d(c) {
            c && (H(l),
            H(r),
            H(h),
            H(u),
            H(_)),
            H(t),
            H(n);
            for (let f = 0; f < a.length; f += 1)
                a[f].d();
            b && b.d(c),
            d && d.d(c)
        }
    }
}
const ht = 18
  , sn = 28;
function ln(e, t, n) {
    let s = 0
      , l = []
      , r = !1
      , a = !1
      , m = "Input"
      , h = ""
      , u = "test"
      , _ = []
      , g = "left"
      , v = "https://r2.fivemanage.com/lrrdae0D5Ib5w6BFae6yt/riskbanner.png"
      , w = []
      , b = 1;
    const d = {
        success: {
            icon: "ph ph-check-circle",
            bg: "#27ae60"
        },
        error: {
            icon: "fa-solid fa-circle-xmark",
            bg: "#c0392b"
        },
        warning: {
            icon: "fa-solid fa-triangle-exclamation",
            bg: "#f39c12"
        },
        anticheat: {
            icon: "fa-solid fa-user-shield",
            bg: "#8e44ad"
        },
        info: {
            icon: "fa-solid fa-circle-exclamation",
            bg: "#3498db"
        }
    };
    let c, f, O = 0, S = 0, C = 0, Q = 24, P = !0, T = !1, B = [], L = [];
    function x() {
        const j = L.length;
        if (j === 0)
            return 0;
        const y = L.indexOf(s);
        if (y !== -1)
            return y + 1;
        let E = -1
          , N = 1 / 0;
        for (let F = 0; F < j; F++) {
            const W = Math.abs(L[F] - s);
            W < N && (N = W,
            E = F)
        }
        return E !== -1 ? E + 1 : 0
    }
    function K() {
        if (!f)
            return;
        const j = Math.max(0, S + 12 - Q);
        if (T) {
            const y = Math.max(0, f.scrollHeight - f.clientHeight);
            if (f.scrollTop <= 1) {
                n(15, C = 0);
                return
            }
            const E = y > 0 ? Math.min(1, Math.max(0, f.scrollTop / y)) : 0;
            n(15, C = Math.round(j * E))
        } else {
            const y = Math.max(1, l.length)
              , E = Math.max(1, y - 1)
              , N = Math.min(Math.max(s, 0), y - 1)
              , F = y > 1 ? N / E : 0;
            n(15, C = Math.round(j * F))
        }
    }
    function ce() {
        if (!c || !f)
            return;
        const j = c.getBoundingClientRect()
          , y = f.getBoundingClientRect();
        n(13, O = Math.round(y.top - j.top)),
        n(14, S = Math.round(y.height));
        const E = f.clientHeight
          , N = f.scrollHeight;
        T = N > E + 1,
        n(17, P = !r || l.length === 0),
        n(16, Q = T ? Math.max(ht, Math.round(E / N * S)) : Math.max(ht, Math.min(sn, S))),
        K()
    }
    function se(j) {
        if (!f)
            return;
        const y = Math.max(0, f.scrollHeight - f.clientHeight);
        if (!T || y === 0) {
            n(12, f.scrollTop = 0, f),
            K();
            return
        }
        const E = Math.max(0, l.length - 1);
        if (j <= 0) {
            n(12, f.scrollTop = 0, f),
            requestAnimationFrame(K);
            return
        }
        if (j >= E) {
            n(12, f.scrollTop = y, f),
            requestAnimationFrame(K);
            return
        }
        const N = _[j];
        if (!N)
            return;
        let U = N.offsetTop + N.offsetHeight / 2 - f.clientHeight / 2;
        U < 0 && (U = 0),
        U > y && (U = y),
        n(12, f.scrollTop = U, f),
        requestAnimationFrame(K)
    }
    const q = () => requestAnimationFrame( () => requestAnimationFrame(ce));
    function V() {
        K()
    }
    function ue(j, y, E) {
        const N = b++
          , F = {
            id: N,
            type: j,
            message: y,
            duration: E,
            progress: 0
        };
        n(10, w = [F, ...w]);
        const W = 100 / (E / 50)
          , U = setInterval( () => {
            const Z = w.findIndex(he => he.id === N);
            if (Z === -1) {
                clearInterval(U);
                return
            }
            w[Z].progress < 100 ? (n(10, w[Z].progress = Math.min(w[Z].progress + W, 100), w),
            n(10, w = [...w])) : (clearInterval(U),
            setTimeout( () => {
                n(10, w = w.filter(he => he.id !== N))
            }
            , F.progress))
        }
        , 50)
    }
    window.addEventListener("message", j => {
        const y = j.data
          , E = y.action;
        E === "setCurrent" ? (n(0, s = y.current - 1),
        n(1, l = y.menu),
        n(2, r = !0),
        se(s),
        q()) : E === "setVisible" ? (n(2, r = y.visible),
        r && se(s),
        q()) : E === "position" ? (n(8, g = y.position),
        q()) : E === "banner" ? n(9, v = y.banner) : y.action === "showInput" ? (n(3, a = !!y.showInput),
        n(4, m = y.title ?? "Input"),
        a || n(5, h = ""),
        n(6, u = y.disc ?? "test")) : y.action === "setInputText" ? n(5, h = y.value ?? "") : E === "notify" && ue(y.notificationType || "success", y.message || "Notification", y.duration || 3e3)
    }
    );
    function Me() {
        h = this.value,
        n(5, h)
    }
    const z = (j, y, E, N) => {
        const F = parseFloat(N.currentTarget.value);
        n(1, y[E].value = F, l);
        const W = j.min || 0
          , U = j.max || 100
          , Z = (F - W) / (U - W) * 100;
        N.currentTarget.style.setProperty("--pct", `${Z}%`)
    }
    ;
    function te(j, y) {
        je[j ? "unshift" : "push"]( () => {
            _[y] = j,
            n(7, _)
        }
        )
    }
    function de(j) {
        je[j ? "unshift" : "push"]( () => {
            f = j,
            n(12, f)
        }
        )
    }
    function ye(j) {
        je[j ? "unshift" : "push"]( () => {
            c = j,
            n(11, c)
        }
        )
    }
    return e.$$.update = () => {
        e.$$.dirty[0] & 2 && n(18, B = l.filter(j => j?.type !== "divider")),
        e.$$.dirty[0] & 2 && (L = l.map( (j, y) => j?.type !== "divider" ? y : -1).filter(j => j !== -1)),
        e.$$.dirty[0] & 5 && r && se(s),
        e.$$.dirty[0] & 2 && l.length > 0 && tt().then( () => {
            document.querySelectorAll(".range").forEach(y => {
                const E = parseFloat(y.min) || 0
                  , N = parseFloat(y.max) || 100
                  , W = ((parseFloat(y.value) || 0) - E) / (N - E) * 100;
                y.style.setProperty("--pct", `${W}%`)
            }
            ),
            q()
        }
        ),
        e.$$.dirty[0] & 1 && s >= 0 && tt().then( () => {
            q(),
            se(s)
        }
        )
    }
    ,
    [s, l, r, a, m, h, u, _, g, v, w, c, f, O, S, C, Q, P, B, d, x, V, Me, z, te, de, ye]
}
class on extends Wt {
    constructor(t) {
        super(),
        Kt(this, t, ln, nn, Ot, {}, null, [-1, -1])
    }
}
new on({
    target: document.getElementById("app")
});
