function S(){}const bt=t=>t;function xt(t,e){for(const n in e)t[n]=e[n];return t}function rt(t){return t()}function Z(){return Object.create(null)}function v(t){t.forEach(rt)}function V(t){return typeof t=="function"}function Yt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let z;function Zt(t,e){return z||(z=document.createElement("a")),z.href=e,t===z.href}function $t(t){return Object.keys(t).length===0}function Et(t,...e){if(t==null)return S;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function te(t,e,n){t.$$.on_destroy.push(Et(e,n))}function ee(t,e,n,i){if(t){const s=ot(t,e,n,i);return t[0](s)}}function ot(t,e,n,i){return t[1]&&i?xt(n.ctx.slice(),t[1](i(e))):n.ctx}function ne(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const l=[],r=Math.max(e.dirty.length,s.length);for(let o=0;o<r;o+=1)l[o]=e.dirty[o]|s[o];return l}return e.dirty|s}return e.dirty}function ie(t,e,n,i,s,l){if(s){const r=ot(e,n,i,l);t.p(r,s)}}function se(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function re(t){return t??""}const lt=typeof window<"u";let vt=lt?()=>window.performance.now():()=>Date.now(),X=lt?t=>requestAnimationFrame(t):S;const M=new Set;function ct(t){M.forEach(e=>{e.c(t)||(M.delete(e),e.f())}),M.size!==0&&X(ct)}function Tt(t){let e;return M.size===0&&X(ct),{promise:new Promise(n=>{M.add(e={c:t,f:n})}),abort(){M.delete(e)}}}let F=!1;function Nt(){F=!0}function At(){F=!1}function Mt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function kt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let a=0;a<e.length;a++){const f=e[a];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let c=0;c<e.length;c++){const a=e[c].claim_order,f=(s>0&&e[n[s]].claim_order<=a?s+1:Mt(1,s,h=>e[n[h]].claim_order,a))-1;i[c]=n[f]+1;const d=f+1;n[d]=c,s=Math.max(d,s)}const l=[],r=[];let o=e.length-1;for(let c=n[s]+1;c!=0;c=i[c-1]){for(l.push(e[c-1]);o>=c;o--)r.push(e[o]);o--}for(;o>=0;o--)r.push(e[o]);l.reverse(),r.sort((c,a)=>c.claim_order-a.claim_order);for(let c=0,a=0;c<r.length;c++){for(;a<l.length&&r[c].claim_order>=l[a].claim_order;)a++;const f=a<l.length?l[a]:null;t.insertBefore(r[c],f)}}function at(t,e){t.appendChild(e)}function ut(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function St(t){const e=G("style");return Ct(ut(t),e),e.sheet}function Ct(t,e){return at(t.head||t,e),e.sheet}function Lt(t,e){if(F){for(kt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Ht(t,e,n){t.insertBefore(e,n||null)}function jt(t,e,n){F&&!n?Lt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function C(t){t.parentNode&&t.parentNode.removeChild(t)}function oe(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function G(t){return document.createElement(t)}function ft(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function Y(t){return document.createTextNode(t)}function le(){return Y(" ")}function ce(){return Y("")}function tt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Dt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ae(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:Dt(t,e,n)}function Pt(t){return Array.from(t.childNodes)}function dt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function _t(t,e,n,i,s=!1){dt(t);const l=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const o=t[r];if(e(o)){const c=n(o);return c===void 0?t.splice(r,1):t[r]=c,s||(t.claim_info.last_index=r),o}}for(let r=t.claim_info.last_index-1;r>=0;r--){const o=t[r];if(e(o)){const c=n(o);return c===void 0?t.splice(r,1):t[r]=c,s?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function ht(t,e,n,i){return _t(t,s=>s.nodeName===e,s=>{const l=[];for(let r=0;r<s.attributes.length;r++){const o=s.attributes[r];n[o.name]||l.push(o.name)}l.forEach(r=>s.removeAttribute(r))},()=>i(e))}function ue(t,e,n){return ht(t,e,n,G)}function fe(t,e,n){return ht(t,e,n,ft)}function zt(t,e){return _t(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>Y(e),!0)}function de(t){return zt(t," ")}function et(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function _e(t,e){const n=et(t,"HTML_TAG_START",0),i=et(t,"HTML_TAG_END",n);if(n===i)return new nt(void 0,e);dt(t);const s=t.splice(n,i-n+1);C(s[0]),C(s[s.length-1]);const l=s.slice(1,s.length-1);for(const r of l)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new nt(l,e)}function he(t,e){e=""+e,t.data!==e&&(t.data=e)}function me(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let O;function Ot(){if(O===void 0){O=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{O=!0}}return O}function pe(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=G("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=Ot();let l;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",l=tt(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{l=tt(i.contentWindow,"resize",e),e()}),at(t,i),()=>{(s||l&&i.contentWindow)&&l(),C(i)}}function ye(t,e,n){t.classList[n?"add":"remove"](e)}function Rt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function ge(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const l=s.textContent.trim();l===`HEAD_${t}_END`?(i-=1,n.push(s)):l===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class qt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=ft(n.nodeName):this.e=G(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Ht(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(C)}}class nt extends qt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)jt(this.t,this.n[n],e)}}function we(t,e){return new t(e)}const q=new Map;let B=0;function Bt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Wt(t,e){const n={stylesheet:St(e),rules:{}};return q.set(t,n),n}function it(t,e,n,i,s,l,r,o=0){const c=16.666/i;let a=`{
`;for(let y=0;y<=1;y+=c){const g=e+(n-e)*l(y);a+=y*100+`%{${r(g,1-g)}}
`}const f=a+`100% {${r(n,1-n)}}
}`,d=`__svelte_${Bt(f)}_${o}`,h=ut(t),{stylesheet:u,rules:_}=q.get(h)||Wt(h,t);_[d]||(_[d]=!0,u.insertRule(`@keyframes ${d} ${f}`,u.cssRules.length));const p=t.style.animation||"";return t.style.animation=`${p?`${p}, `:""}${d} ${i}ms linear ${s}ms 1 both`,B+=1,d}function Ft(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),B-=s,B||Gt())}function Gt(){X(()=>{B||(q.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&C(e)}),q.clear())})}let j;function H(t){j=t}function mt(){if(!j)throw new Error("Function called outside component initialization");return j}function be(t){mt().$$.on_mount.push(t)}function xe(t){mt().$$.after_update.push(t)}const A=[],st=[];let k=[];const Q=[],pt=Promise.resolve();let U=!1;function yt(){U||(U=!0,pt.then(gt))}function $e(){return yt(),pt}function W(t){k.push(t)}function Ee(t){Q.push(t)}const J=new Set;let N=0;function gt(){if(N!==0)return;const t=j;do{try{for(;N<A.length;){const e=A[N];N++,H(e),It(e.$$)}}catch(e){throw A.length=0,N=0,e}for(H(null),A.length=0,N=0;st.length;)st.pop()();for(let e=0;e<k.length;e+=1){const n=k[e];J.has(n)||(J.add(n),n())}k.length=0}while(A.length);for(;Q.length;)Q.pop()();U=!1,J.clear(),H(t)}function It(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(W)}}function Jt(t){const e=[],n=[];k.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),k=e}let L;function Kt(){return L||(L=Promise.resolve(),L.then(()=>{L=null})),L}function K(t,e,n){t.dispatchEvent(Rt(`${e?"intro":"outro"}${n}`))}const R=new Set;let x;function ve(){x={r:0,c:[],p:x}}function Te(){x.r||v(x.c),x=x.p}function wt(t,e){t&&t.i&&(R.delete(t),t.i(e))}function Ne(t,e,n,i){if(t&&t.o){if(R.has(t))return;R.add(t),x.c.push(()=>{R.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Qt={duration:0};function Ae(t,e,n,i){const s={direction:"both"};let l=e(t,n,s),r=i?0:1,o=null,c=null,a=null;function f(){a&&Ft(t,a)}function d(u,_){const p=u.b-r;return _*=Math.abs(p),{a:r,b:u.b,d:p,duration:_,start:u.start,end:u.start+_,group:u.group}}function h(u){const{delay:_=0,duration:p=300,easing:y=bt,tick:g=S,css:$}=l||Qt,T={start:vt()+_,b:u};u||(T.group=x,x.r+=1),o||c?c=T:($&&(f(),a=it(t,r,u,p,_,y,$)),u&&g(0,1),o=d(T,p),W(()=>K(t,u,"start")),Tt(E=>{if(c&&E>c.start&&(o=d(c,p),c=null,K(t,o.b,"start"),$&&(f(),a=it(t,r,o.b,o.duration,0,y,l.css))),o){if(E>=o.end)g(r=o.b,1-r),K(t,o.b,"end"),c||(o.b?f():--o.group.r||v(o.group.c)),o=null;else if(E>=o.start){const D=E-o.start;r=o.a+o.d*y(D/o.duration),g(r,1-r)}}return!!(o||c)}))}return{run(u){V(l)?Kt().then(()=>{l=l(s),h(u)}):h(u)},end(){f(),o=c=null}}}const Me=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function ke(t,e){t.d(1),e.delete(t.key)}function Se(t,e,n,i,s,l,r,o,c,a,f,d){let h=t.length,u=l.length,_=h;const p={};for(;_--;)p[t[_].key]=_;const y=[],g=new Map,$=new Map,T=[];for(_=u;_--;){const m=d(s,l,_),w=n(m);let b=r.get(w);b?i&&T.push(()=>b.p(m,e)):(b=a(w,m),b.c()),g.set(w,y[_]=b),w in p&&$.set(w,Math.abs(_-p[w]))}const E=new Set,D=new Set;function I(m){wt(m,1),m.m(o,f),r.set(m.key,m),f=m.first,u--}for(;h&&u;){const m=y[u-1],w=t[h-1],b=m.key,P=w.key;m===w?(f=m.first,h--,u--):g.has(P)?!r.has(b)||E.has(b)?I(m):D.has(P)?h--:$.get(b)>$.get(P)?(D.add(b),I(m)):(E.add(P),h--):(c(w,r),h--)}for(;h--;){const m=t[h];g.has(m.key)||c(m,r)}for(;u;)I(y[u-1]);return v(T),y}function Ce(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Le(t){t&&t.c()}function He(t,e){t&&t.l(e)}function Ut(t,e,n,i){const{fragment:s,after_update:l}=t.$$;s&&s.m(e,n),i||W(()=>{const r=t.$$.on_mount.map(rt).filter(V);t.$$.on_destroy?t.$$.on_destroy.push(...r):v(r),t.$$.on_mount=[]}),l.forEach(W)}function Vt(t,e){const n=t.$$;n.fragment!==null&&(Jt(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Xt(t,e){t.$$.dirty[0]===-1&&(A.push(t),yt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function je(t,e,n,i,s,l,r,o=[-1]){const c=j;H(t);const a=t.$$={fragment:null,ctx:[],props:l,update:S,not_equal:s,bound:Z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:Z(),dirty:o,skip_bound:!1,root:e.target||c.$$.root};r&&r(a.root);let f=!1;if(a.ctx=n?n(t,e.props||{},(d,h,...u)=>{const _=u.length?u[0]:h;return a.ctx&&s(a.ctx[d],a.ctx[d]=_)&&(!a.skip_bound&&a.bound[d]&&a.bound[d](_),f&&Xt(t,d)),h}):[],a.update(),f=!0,v(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){Nt();const d=Pt(e.target);a.fragment&&a.fragment.l(d),d.forEach(C)}else a.fragment&&a.fragment.c();e.intro&&wt(t.$$.fragment),Ut(t,e.target,e.anchor,e.customElement),At(),gt()}H(c)}class De{$destroy(){Vt(this,1),this.$destroy=S}$on(e,n){if(!V(n))return S;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!$t(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Ce as $,Ut as A,Vt as B,ee as C,ie as D,se as E,ne as F,Lt as G,S as H,te as I,W as J,ae as K,tt as L,Me as M,ge as N,ye as O,bt as P,Zt as Q,v as R,De as S,oe as T,ft as U,fe as V,Se as W,ke as X,nt as Y,_e as Z,re as _,le as a,Ee as a0,pe as a1,Ae as a2,jt as b,de as c,Ne as d,ce as e,Te as f,wt as g,C as h,je as i,xe as j,G as k,ue as l,Pt as m,Dt as n,be as o,me as p,Y as q,zt as r,Yt as s,$e as t,he as u,ve as v,st as w,we as x,Le as y,He as z};
