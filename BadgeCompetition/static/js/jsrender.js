/*! JsRender v1.0.13: http://jsviews.com/#jsrender */
/*! **VERSION FOR WEB** (For NODE.JS see http://jsviews.com/download/jsrender-node.js) */
!function(t,e){var n=e.jQuery;"object"==typeof exports?module.exports=n?t(e,n):function(n){if(n&&!n.fn)throw"Provide jQuery or null";return t(e,n)}:"function"==typeof define&&define.amd?define(function(){return t(e)}):t(e,!1)}(function(t,e){"use strict";function n(t,e){return function(){var n,r=this,i=r.base;return r.base=t,n=e.apply(r,arguments),r.base=i,n}}function r(t,e){return st(e)&&(e=n(t?t._d?t:n(a,t):a,e),e._d=(t&&t._d||0)+1),e}function i(t,e){var n,i=e.props;for(n in i)!Vt.test(n)||t[n]&&t[n].fix||(t[n]="convert"!==n?r(t.constructor.prototype[n],i[n]):i[n])}function o(t){return t}function a(){return""}function s(t){try{throw console.log("JsRender dbg breakpoint: "+t),"dbg breakpoint"}catch(e){}return this.base?this.baseApply(arguments):t}function p(t){this.name=(e.link?"JsViews":"JsRender")+" Error",this.message=t||this.name}function l(t,e){if(t){for(var n in e)t[n]=e[n];return t}}function d(t,e,n){return t?pt(t)?d.apply(ot,t):(wt=n?n[0]:wt,/^(\W|_){5}$/.test(t+e+wt)||S("Invalid delimiters"),mt=t[0],_t=t[1],xt=e[0],bt=e[1],gt.delimiters=[mt+_t,xt+bt,wt],t="\\"+mt+"(\\"+wt+")?\\"+_t,e="\\"+xt+"\\"+bt,rt="(?:(\\w+(?=[\\/\\s\\"+xt+"]))|(\\w+)?(:)|(>)|(\\*))\\s*((?:[^\\"+xt+"]|\\"+xt+"(?!\\"+bt+"))*?)",ft.rTag="(?:"+rt+")",rt=new RegExp("(?:"+t+rt+"(\\/)?|\\"+mt+"(\\"+wt+")?\\"+_t+"(?:(?:\\/(\\w+))\\s*|!--[\\s\\S]*?--))"+e,"g"),ft.rTmpl=new RegExp("^\\s|\\s$|<.*>|([^\\\\]|^)[{}]|"+t+".*"+e),ht):gt.delimiters}function c(t,e){e||t===!0||(e=t,t=void 0);var n,r,i,o,a=this,s="root"===e;if(t){if(o=e&&a.type===e&&a,!o)if(n=a.views,a._.useKey){for(r in n)if(o=e?n[r].get(t,e):n[r])break}else for(r=0,i=n.length;!o&&r<i;r++)o=e?n[r].get(t,e):n[r]}else if(s)o=a.root;else if(e)for(;a&&!o;)o=a.type===e?a:void 0,a=a.parent;else o=a.parent;return o||void 0}function u(){var t=this.get("item");return t?t.index:void 0}function f(){return this.index}function g(t,e,n,r){var i,o,s,p=0;if(1===n&&(r=1,n=void 0),e)for(o=e.split("."),s=o.length;t&&p<s;p++)i=t,t=o[p]?t[o[p]]:t;return n&&(n.lt=n.lt||p<s),void 0===t?r?a:"":r?function(){return t.apply(i,arguments)}:t}function v(n,r,i){var o,a,s,p,d,c,u,f=this,g=!Ct&&arguments.length>1,v=f.ctx;if(n){if(f._||(d=f.index,f=f.tag),c=f,v&&v.hasOwnProperty(n)||(v=ct).hasOwnProperty(n)){if(s=v[n],"tag"===n||"tagCtx"===n||"root"===n||"parentTags"===n)return s}else v=void 0;if((!Ct&&f.tagCtx||f.linked)&&(s&&s._cxp||(f=f.tagCtx||st(s)?f:(f=f.scope||f,!f.isTop&&f.ctx.tag||f),void 0!==s&&f.tagCtx&&(f=f.tagCtx.view.scope),v=f._ocps,s=v&&v.hasOwnProperty(n)&&v[n]||s,s&&s._cxp||!i&&!g||((v||(f._ocps=f._ocps||{}))[n]=s=[{_ocp:s,_vw:c,_key:n}],s._cxp={path:jt,ind:0,updateValue:function(t,n){return e.observable(s[0]).setProperty(jt,t),this}})),p=s&&s._cxp)){if(arguments.length>2)return a=s[1]?ft._ceo(s[1].deps):[jt],a.unshift(s[0]),a._cxp=p,a;if(d=p.tagElse,u=s[1]?p.tag&&p.tag.cvtArgs?p.tag.cvtArgs(d,1)[p.ind]:s[1](s[0].data,s[0],ft):s[0]._ocp,g)return ft._ucp(n,r,f,p),f;s=u}return s&&st(s)&&(o=function(){return s.apply(this&&this!==t?this:c,arguments)},l(o,s)),o||s}}function h(t){return t&&(t.fn?t:this.getRsc("templates",t)||lt(t))}function m(t,e,n,r){var o,a,s,p,d,c="number"==typeof n&&e.tmpl.bnds[n-1];if(void 0===r&&c&&c._lr&&(r=""),void 0!==r?n=r={props:{},args:[r]}:c&&(n=c(e.data,e,ft)),c=c._bd&&c,t||c){if(a=e._lc,o=a&&a.tag,n.view=e,!o){if(o=l(new ft._tg,{_:{bnd:c,unlinked:!0,lt:n.lt},inline:!a,tagName:":",convert:t,onArrayChange:!0,flow:!0,tagCtx:n,tagCtxs:[n],_is:"tag"}),p=n.args.length,p>1)for(d=o.bindTo=[];p--;)d.unshift(p);a&&(a.tag=o,o.linkCtx=a),n.ctx=Q(n.ctx,(a?a.view:e).ctx),i(o,n)}o._er=r&&s,o.ctx=n.ctx||o.ctx||{},n.ctx=void 0,s=o.cvtArgs()[0],o._er=r&&s}else s=n.args[0];return s=c&&e._.onRender?e._.onRender(s,e,o):s,void 0!=s?s:""}function _(t,e){var n,r,i,o,a,s,p,l=this;if(l.tagName){if(s=l,l=(s.tagCtxs||[l])[t||0],!l)return}else s=l.tag;if(a=s.bindFrom,o=l.args,(p=s.convert)&&typeof p===Bt&&(p="true"===p?void 0:l.view.getRsc("converters",p)||S("Unknown converter: '"+p+"'")),p&&!e&&(o=o.slice()),a){for(i=[],n=a.length;n--;)r=a[n],i.unshift(x(l,r));e&&(o=i)}if(p){if(p=p.apply(s,i||o),void 0===p)return o;if(a=a||[0],n=a.length,pt(p)&&(p.arg0===!1||1!==n&&p.length===n&&!p.arg0)||(p=[p],a=[0],n=1),e)o=p;else for(;n--;)r=a[n],+r===r&&(o[r]=p[n])}return o}function x(t,e){return t=t[+e===e?"args":"props"],t&&t[e]}function b(t){return this.cvtArgs(t,1)}function w(t,e){var n,r,i=this;if(typeof e===Bt){for(;void 0===n&&i;)r=i.tmpl&&i.tmpl[t],n=r&&r[e],i=i.parent;return n||ot[t][e]}}function y(t,e,n,r,o,a){function s(t){var e=p[t];if(void 0!==e)for(e=pt(e)?e:[e],h=e.length;h--;)q=e[h],isNaN(parseInt(q))||(e[h]=parseInt(q));return e||[0]}e=e||it;var p,l,d,c,u,f,g,h,m,w,y,C,k,j,T,A,P,F,N,R,M,$,V,I,D,q,U,K,J,B,L=0,H="",W=e._lc||!1,Z=e.ctx,z=n||e.tmpl,G="number"==typeof r&&e.tmpl.bnds[r-1];for("tag"===t._is?(p=t,t=p.tagName,r=p.tagCtxs,d=p.template):(l=e.getRsc("tags",t)||S("Unknown tag: {{"+t+"}} "),d=l.template),void 0===a&&G&&(G._lr=l.lateRender&&G._lr!==!1||G._lr)&&(a=""),void 0!==a?(H+=a,r=a=[{props:{},args:[],params:{props:{}}}]):G&&(r=G(e.data,e,ft)),g=r.length;L<g;L++)y=r[L],P=y.tmpl,(!W||!W.tag||L&&!W.tag.inline||p._er||P&&+P===P)&&(P&&z.tmpls&&(y.tmpl=y.content=z.tmpls[P-1]),y.index=L,y.ctxPrm=v,y.render=E,y.cvtArgs=_,y.bndArgs=b,y.view=e,y.ctx=Q(Q(y.ctx,l&&l.ctx),Z)),(n=y.props.tmpl)&&(y.tmpl=e._getTmpl(n),y.content=y.content||y.tmpl),p?W&&W.fn._lr&&(F=!!p.init):(p=new l._ctr,F=!!p.init,p.parent=f=Z&&Z.tag,p.tagCtxs=r,W&&(p.inline=!1,W.tag=p),p.linkCtx=W,(p._.bnd=G||W.fn)?(p._.ths=y.params.props["this"],p._.lt=r.lt,p._.arrVws={}):p.dataBoundOnly&&S(t+" must be data-bound:\n{^{"+t+"}}")),I=p.dataMap,y.tag=p,I&&r&&(y.map=r[L].map),p.flow||(C=y.ctx=y.ctx||{},c=p.parents=C.parentTags=Z&&Q(C.parentTags,Z.parentTags)||{},f&&(c[f.tagName]=f),c[p.tagName]=C.tag=p,C.tagCtx=y);if(!(p._er=a)){for(i(p,r[0]),p.rendering={rndr:p.rendering},L=0;L<g;L++){if(y=p.tagCtx=r[L],V=y.props,p.ctx=y.ctx,!L){if(F&&(p.init(y,W,p.ctx),F=void 0),y.args.length||y.argDefault===!1||p.argDefault===!1||(y.args=M=[y.view.data],y.params.args=["#data"]),j=s("bindTo"),void 0!==p.bindTo&&(p.bindTo=j),void 0!==p.bindFrom?p.bindFrom=s("bindFrom"):p.bindTo&&(p.bindFrom=p.bindTo=j),T=p.bindFrom||j,K=j.length,U=T.length,p._.bnd&&(J=p.linkedElement)&&(p.linkedElement=J=pt(J)?J:[J],K!==J.length&&S("linkedElement not same length as bindTo")),(J=p.linkedCtxParam)&&(p.linkedCtxParam=J=pt(J)?J:[J],U!==J.length&&S("linkedCtxParam not same length as bindFrom/bindTo")),T)for(p._.fromIndex={},p._.toIndex={},m=U;m--;)for(q=T[m],h=K;h--;)q===j[h]&&(p._.fromIndex[h]=m,p._.toIndex[m]=h);W&&(W.attr=p.attr=W.attr||p.attr||W._dfAt),u=p.attr,p._.noVws=u&&u!==Jt}if(M=p.cvtArgs(L),p.linkedCtxParam)for($=p.cvtArgs(L,1),h=U,B=p.constructor.prototype.ctx;h--;)(k=p.linkedCtxParam[h])&&(q=T[h],A=$[h],y.ctx[k]=ft._cp(B&&void 0===A?B[k]:A,void 0!==A&&x(y.params,q),y.view,p._.bnd&&{tag:p,cvt:p.convert,ind:h,tagElse:L}));(N=V.dataMap||I)&&(M.length||V.dataMap)&&(R=y.map,R&&R.src===M[0]&&!o||(R&&R.src&&R.unmap(),N.map(M[0],y,R,!p._.bnd),R=y.map),M=[R.tgt]),w=void 0,p.render&&(w=p.render.apply(p,M),e.linked&&w&&!Et.test(w)&&(n={links:[]},n.render=n.fn=function(){return w},w=O(n,e.data,void 0,!0,e,void 0,void 0,p))),M.length||(M=[e]),void 0===w&&(D=M[0],p.contentCtx&&(D=p.contentCtx===!0?e:p.contentCtx(D)),w=y.render(D,!0)||(o?void 0:"")),H=H?H+(w||""):void 0!==w?""+w:void 0}p.rendering=p.rendering.rndr}return p.tagCtx=r[0],p.ctx=p.tagCtx.ctx,p._.noVws&&p.inline&&(H="text"===u?dt.html(H):""),G&&e._.onRender?e._.onRender(H,e,p):H}function C(t,e,n,r,i,o,a,s){var p,l,d,c=this,f="array"===e;c.content=s,c.views=f?[]:{},c.data=r,c.tmpl=i,d=c._={key:0,useKey:f?0:1,id:""+qt++,onRender:a,bnds:{}},c.linked=!!a,c.type=e||"top",e&&(c.cache={_ct:gt._cchCt}),n&&"top"!==n.type||((c.ctx=t||{}).root=c.data),(c.parent=n)?(c.root=n.root||c,p=n.views,l=n._,c.isTop=l.scp,c.scope=(!t.tag||t.tag===n.ctx.tag)&&!c.isTop&&n.scope||c,l.useKey?(p[d.key="_"+l.useKey++]=c,c.index=Wt,c.getIndex=u):p.length===(d.key=c.index=o)?p.push(c):p.splice(o,0,c),c.ctx=t||n.ctx):e&&(c.root=c)}function k(t){var e,n,r;for(e in Yt)n=e+"s",t[n]&&(r=t[n],t[n]={},ot[n](r,t))}function j(t,e,n){function i(){var e=this;e._={unlinked:!0},e.inline=!0,e.tagName=t}var o,a,s,p=new ft._tg;if(st(e)?e={depends:e.depends,render:e}:typeof e===Bt&&(e={template:e}),a=e.baseTag){e.flow=!!e.flow,a=typeof a===Bt?n&&n.tags[a]||ut[a]:a,a||S('baseTag: "'+e.baseTag+'" not found'),p=l(p,a);for(s in e)p[s]=r(a[s],e[s])}else p=l(p,e);return void 0!==(o=p.template)&&(p.template=typeof o===Bt?lt[o]||lt(o):o),(i.prototype=p).constructor=p._ctr=i,n&&(p._parentTmpl=n),p}function T(t){return this.base.apply(this,t)}function A(t,n,r,i){function o(n){var o,s;if(typeof n===Bt||n.nodeType>0&&(a=n)){if(!a&&(/^\.?\/[^\\:*?"<>]*$/.test(n)?(s=lt[t=t||n])?n=s:a=document.getElementById(n):"#"===n.charAt(0)&&(a=document.getElementById(n.slice(1))),!a&&e.fn&&!ft.rTmpl.test(n)))try{a=e(n,document)[0]}catch(p){}a&&("SCRIPT"!==a.tagName&&S(n+": Use script block, not "+a.tagName),i?n=a.innerHTML:(o=a.getAttribute(Qt),o&&(o!==Ht?(n=lt[o],delete lt[o]):e.fn&&(n=e.data(a)[Ht])),o&&n||(t=t||(e.fn?Ht:n),n=A(t,a.innerHTML,r,i)),n.tmplName=t=t||o,t!==Ht&&(lt[t]=n),a.setAttribute(Qt,t),e.fn&&e.data(a,Ht,n))),a=void 0}else n.fn||(n=void 0);return n}var a,s,p=n=n||"";if(ft._html=dt.html,0===i&&(i=void 0,p=o(p)),i=i||(n.markup?n.bnds?l({},n):n:{}),i.tmplName=i.tmplName||t||"unnamed",r&&(i._parentTmpl=r),!p&&n.markup&&(p=o(n.markup))&&p.fn&&(p=p.markup),void 0!==p)return p.render||n.render?p.tmpls&&(s=p):(n=R(p,i),q(p.replace(Pt,"\\$&"),n)),s||(s=l(function(){return s.render.apply(s,arguments)},n),k(s)),s}function P(t,e){return st(t)?t.call(e):t}function F(t,e,n){Object.defineProperty(t,e,{value:n,configurable:!0})}function N(t,n){function r(t){d.apply(this,t)}function i(){return new r(arguments)}function o(t,e){for(var n,r,i,o,a,s=0;s<x;s++)i=f[s],n=void 0,typeof i!==Bt&&(n=i,i=n.getter,a=n.parentRef),void 0===(o=t[i])&&n&&void 0!==(r=n.defaultVal)&&(o=P(r,t)),e(o,n&&u[n.type],i,a)}function a(e){e=typeof e===Bt?JSON.parse(e):e;var n,r,i,a,l=0,d=e,c=[];if(pt(e)){for(e=e||[],n=e.length;l<n;l++)c.push(this.map(e[l]));return c._is=t,c.unmap=p,c.merge=s,c}if(e){for(o(e,function(t,e){e&&(t=e.map(t)),c.push(t)}),d=this.apply(this,c),l=x;l--;)if(i=c[l],a=f[l].parentRef,a&&i&&i.unmap)if(pt(i))for(n=i.length;n--;)F(i[n],a,d);else F(i,a,d);for(r in e)r===at||w[r]||(d[r]=e[r])}return d}function s(t,e,n){t=typeof t===Bt?JSON.parse(t):t;var r,a,s,p,l,d,c,u,f,g,h=0,m=this;if(pt(m)){for(c={},f=[],a=t.length,s=m.length;h<a;h++){for(u=t[h],d=!1,r=0;r<s&&!d;r++)c[r]||(l=m[r],v&&(c[r]=d=typeof v===Bt?u[v]&&(w[v]?l[v]():l[v])===u[v]:v(l,u)));d?(l.merge(u),f.push(l)):(f.push(g=i.map(u)),n&&F(g,n,e))}return void(b?b(m).refresh(f,!0):m.splice.apply(m,[0,m.length].concat(f)))}o(t,function(t,e,n,r){e?m[n]().merge(t,m,r):m[n]()!==t&&m[n](t)});for(p in t)p===at||w[p]||(m[p]=t[p])}function p(){function t(t){for(var e=[],n=0,r=t.length;n<r;n++)e.push(t[n].unmap());return e}var e,n,r,i,o=0,a=this;if(pt(a))return t(a);for(e={};o<x;o++)n=f[o],r=void 0,typeof n!==Bt&&(r=n,n=r.getter),i=a[n](),e[n]=r&&i&&u[r.type]?pt(i)?t(i):i.unmap():i;for(n in a)!a.hasOwnProperty(n)||"_"===n.charAt(0)&&w[n.slice(1)]||n===at||st(a[n])||(e[n]=a[n]);return e}var l,d,c,u=this,f=n.getters,g=n.extend,v=n.id,h=e.extend({_is:t||"unnamed",unmap:p,merge:s},g),m="",_="",x=f?f.length:0,b=e.observable,w={};for(r.prototype=h,l=0;l<x;l++)!function(t){t=t.getter||t,w[t]=l+1;var e="_"+t;m+=(m?",":"")+t,_+="this."+e+" = "+t+";\n",h[t]=h[t]||function(n){return arguments.length?void(b?b(this).setProperty(t,n):this[e]=n):this[e]},b&&(h[t].set=h[t].set||function(t){this[e]=t})}(f[l]);return _=new Function(m,_),d=function(){_.apply(this,arguments),(c=arguments[x+1])&&F(this,arguments[x],c)},d.prototype=h,h.constructor=d,i.map=a,i.getters=f,i.extend=g,i.id=v,i}function R(t,n){var r,i=vt._wm||{},o={tmpls:[],links:{},bnds:[],_is:"template",render:E};return n&&(o=l(o,n)),o.markup=t,o.htmlTag||(r=Rt.exec(t),o.htmlTag=r?r[1].toLowerCase():""),r=i[o.htmlTag],r&&r!==i.div&&(o.markup=e.trim(o.markup)),o}function M(t,e){function n(i,o,a){var s,p,l,d=ft.onStore[t];if(i&&typeof i===Lt&&!i.nodeType&&!i.markup&&!i.getTgt&&!("viewModel"===t&&i.getters||i.extend)){for(p in i)n(p,i[p],o);return o||ot}return i&&typeof i!==Bt&&(a=o,o=i,i=void 0),l=a?"viewModel"===t?a:a[r]=a[r]||{}:n,s=e.compile,void 0===o&&(o=s?i:l[i],i=void 0),null===o?i&&delete l[i]:(s&&(o=s.call(l,i,o,a,0)||{},o._is=t),i&&(l[i]=o)),d&&d(i,o,a,s),o}var r=t+"s";ot[r]=n}function $(t){ht[t]=ht[t]||function(e){return arguments.length?(gt[t]=e,ht):gt[t]}}function V(t){function e(e,n){this.tgt=t.getTgt(e,n),n.map=this}return st(t)&&(t={getTgt:t}),t.baseMap&&(t=l(l({},t.baseMap),t)),t.map=function(t,n){return new e(t,n)},t}function E(t,e,n,r,i,o){var a,s,p,l,d,c,u,f,g=r,v="";if(e===!0?(n=e,e=void 0):typeof e!==Lt&&(e=void 0),(p=this.tag)?(d=this,g=g||d.view,l=g._getTmpl(p.template||d.tmpl),arguments.length||(t=p.contentCtx&&st(p.contentCtx)?t=p.contentCtx(t):g)):l=this,l){if(!r&&t&&"view"===t._is&&(g=t),g&&t===g&&(t=g.data),c=!g,Ct=Ct||c,c&&((e=e||{}).root=t),!Ct||vt.useViews||l.useViews||g&&g!==it)v=O(l,t,e,n,g,i,o,p);else{if(g?(u=g.data,f=g.index,g.index=Wt):(g=it,u=g.data,g.data=t,g.ctx=e),pt(t)&&!n)for(a=0,s=t.length;a<s;a++)g.index=a,g.data=t[a],v+=l.fn(t[a],g,ft);else g.data=t,v+=l.fn(t,g,ft);g.data=u,g.index=f}c&&(Ct=void 0)}return v}function O(t,e,n,r,i,o,a,s){var p,d,c,u,f,g,v,h,m,_,x,b,w,y="";if(s&&(m=s.tagName,b=s.tagCtx,n=n?Q(n,s.ctx):s.ctx,t===i.content?v=t!==i.ctx._wrp?i.ctx._wrp:void 0:t!==b.content?t===s.template?(v=b.tmpl,n._wrp=b.content):v=b.content||i.content:v=i.content,b.props.link===!1&&(n=n||{},n.link=!1)),i&&(a=a||i._.onRender,w=n&&n.link===!1,w&&i._.nl&&(a=void 0),n=Q(n,i.ctx),b=!s&&i.tag?i.tag.tagCtxs[i.tagElse]:b),(_=b&&b.props.itemVar)&&("~"!==_[0]&&D("Use itemVar='~myItem'"),_=_.slice(1)),o===!0&&(g=!0,o=0),a&&s&&s._.noVws&&(a=void 0),h=a,a===!0&&(h=void 0,a=i._.onRender),n=t.helpers?Q(t.helpers,n):n,x=n,pt(e)&&!r)for(c=g?i:void 0!==o&&i||new C(n,"array",i,e,t,o,a,v),c._.nl=w,i&&i._.useKey&&(c._.bnd=!s||s._.bnd&&s,c.tag=s),p=0,d=e.length;p<d;p++)u=new C(x,"item",c,e[p],t,(o||0)+p,a,c.content),_&&((u.ctx=l({},x))[_]=ft._cp(e[p],"#data",u)),f=t.fn(e[p],u,ft),y+=c._.onRender?c._.onRender(f,u):f;else c=g?i:new C(x,m||"data",i,e,t,o,a,v),_&&((c.ctx=l({},x))[_]=ft._cp(e,"#data",c)),c.tag=s,c._.nl=w,y+=t.fn(e,c,ft);return s&&(c.tagElse=b.index,b.contentView=c),h?h(y,c):y}function I(t,e,n){var r=void 0!==n?st(n)?n.call(e.data,t,e):n||"":"{Error: "+(t.message||t)+"}";return gt.onError&&void 0!==(n=gt.onError.call(e.data,t,n&&r,e))&&(r=n),e&&!e._lc?dt.html(r):r}function S(t){throw new ft.Err(t)}function D(t){S("Syntax error\n"+t)}function q(t,e,n,r,i){function o(e){e-=v,e&&m.push(t.substr(v,e).replace(Tt,"\\n"))}function a(e,n){e&&(e+="}}",D((n?"{{"+n+"}} block has {{/"+e+" without {{"+e:"Unmatched or missing {{/"+e)+", in template:\n"+t))}function s(s,p,l,u,g,x,b,w,y,C,k,j){(b&&p||y&&!l||w&&":"===w.slice(-1)||C)&&D(s),x&&(g=":",u=Jt),y=y||n&&!i;var T,A,P,F=(p||n)&&[[]],N="",R="",M="",$="",V="",E="",O="",I="",S=!y&&!g;l=l||(w=w||"#data",g),o(j),v=j+s.length,b?f&&m.push(["*","\n"+w.replace(/^:/,"ret+= ").replace(At,"$1")+";\n"]):l?("else"===l&&(Nt.test(w)&&D('For "{{else if expr}}" use "{{else expr}}"'),F=_[9]&&[[]],_[10]=t.substring(_[10],j),A=_[11]||_[0]||D("Mismatched: "+s),_=h.pop(),m=_[2],S=!0),w&&B(w.replace(Tt," "),F,e,n).replace(Ft,function(t,e,n,r,i,o,a,s){return"this:"===r&&(o="undefined"),s&&(P=P||"@"===s[0]),r="'"+i+"':",a?(R+=n+o+",",$+="'"+s+"',"):n?(M+=r+"j._cp("+o+',"'+s+'",view),',E+=r+"'"+s+"',"):e?O+=o:("trigger"===i&&(I+=o),"lateRender"===i&&(T="false"!==s),N+=r+o+",",V+=r+"'"+s+"',",c=c||Vt.test(i)),""}).slice(0,-1),F&&F[0]&&F.pop(),d=[l,u||!!r||c||"",S&&[],K($||(":"===l?"'#data',":""),V,E),K(R||(":"===l?"data,":""),N,M),O,I,T,P,F||0],m.push(d),S&&(h.push(_),_=d,_[10]=v,_[11]=A)):k&&(a(k!==_[0]&&k!==_[11]&&k,_[0]),_[10]=t.substring(_[10],j),_=h.pop()),a(!_&&k),m=_[2]}var p,l,d,c,u,f=gt.allowCode||e&&e.allowCode||ht.allowCode===!0,g=[],v=0,h=[],m=g,_=[,,g];if(f&&e._is&&(e.allowCode=f),n&&(void 0!==r&&(t=t.slice(0,-r.length-2)+xt),t=mt+t+bt),a(h[0]&&h[0][2].pop()[0]),t.replace(rt,s),o(t.length),(v=g[g.length-1])&&a(typeof v!==Bt&&+v[10]===v[10]&&v[0]),n){for(l=L(g,t,n),u=[],p=g.length;p--;)u.unshift(g[p][9]);U(l,u)}else l=L(g,e);return l}function U(t,e){var n,r,i=0,o=e.length;for(t.deps=[],t.paths=[];i<o;i++){t.paths.push(r=e[i]);for(n in r)"_jsvto"!==n&&r.hasOwnProperty(n)&&r[n].length&&!r[n].skp&&(t.deps=t.deps.concat(r[n]))}}function K(t,e,n){return[t.slice(0,-1),e.slice(0,-1),n.slice(0,-1)]}function J(t,e){return"\n\tparams:{args:["+t[0]+"],\n\tprops:{"+t[1]+"}"+(t[2]?",\n\tctx:{"+t[2]+"}":"")+"},\n\targs:["+e[0]+"],\n\tprops:{"+e[1]+"}"+(e[2]?",\n\tctx:{"+e[2]+"}":"")}function B(t,n,r,i){function o(r,o,l,T,A,P,F,N,R,M,$,V,E,O,I,S,q,U,K,J,B){function L(t,e,r,o,p,l,d,c){if(z="."===r,r&&(A=A.slice(e.length),/^\.?constructor$/.test(c||A)&&D(t),z||(t=(M?(i?"":"(ltOb.lt=ltOb.lt||")+"(ob=":"")+(o?'view.ctxPrm("'+o+'")':p?"view":"data")+(M?")===undefined"+(i?"":")")+'?"":view._getOb(ob,"':"")+(c?(l?"."+l:o?"":p?"":"."+r)+(d||""):(c=o?"":p?l||"":r,"")),t+=c?"."+c:"",t=e+("view.data"===t.slice(0,9)?t.slice(5):t)+(M?(i?'"':'",ltOb')+($?",1)":")"):"")),u)){if(H="_linkTo"===a?s=n._jsvto=n._jsvto||[]:f.bd,W=z&&H[H.length-1]){if(W._cpfn){for(;W.sb;)W=W.sb;W.prm&&(W.bnd&&(A="^"+A.slice(1)),W.sb=A,W.bnd=W.bnd||"^"===A[0])}}else H.push(A);$&&!z&&(y[m]=Y,C[m]=k[m].length)}return t}T&&!N&&(A=T+A),P=P||"",E=E||"",l=l||o||E,A=A||R,M&&(M=!/\)|]/.test(B[J-1]))&&(A=A.slice(1).split(".").join("^")),$=$||U||"";var Q,H,W,Z,z,G,X,Y=J;if(!c&&!d){if(F&&D(t),q&&u){if(Q=y[m-1],B.length-1>Y-(Q||0)){if(Q=e.trim(B.slice(Q,Y+r.length)),H=s||g[m-1].bd,W=H[H.length-1],W&&W.prm){for(;W.sb&&W.sb.prm;)W=W.sb;Z=W.sb={path:W.sb,bnd:W.bnd}}else H.push(Z={path:H.pop()});W&&W.sb===Z&&(k[m]=k[m-1].slice(W._cpPthSt)+k[m],k[m-1]=k[m-1].slice(0,W._cpPthSt)),Z._cpPthSt=C[m-1],Z._cpKey=Q,k[m]+=B.slice(j,J),j=J,Z._cpfn=Zt[Q]=Zt[Q]||new Function("data,view,j","//"+Q+"\nvar v;\nreturn ((v="+k[m]+("]"===S?")]":S)+")!=null?v:null);"),k[m-1]+=w[h]&&vt.cache?'view.getCache("'+Q.replace(Pt,"\\$&")+'"':k[m],Z.prm=f.bd,Z.bnd=Z.bnd||Z.path&&Z.path.indexOf("^")>=0}k[m]=""}"["===$&&($="[j._sq("),"["===l&&(l="[j._sq(")}return X=c?(c=!O,c?r:E+'"'):d?(d=!I,d?r:E+'"'):(l?(b[++h]=!0,_[h]=0,u&&(y[m++]=Y++,f=g[m]={bd:[]},k[m]="",C[m]=1),l):"")+(K?h?"":(v=B.slice(v,Y),(a?(a=p=s=!1,"\b"):"\b,")+v+(v=Y+r.length,u&&n.push(f.bd=[]),"\b")):N?(m&&D(t),u&&n.pop(),a="_"+A,p=T,v=Y+r.length,u&&(u=f.bd=n[a]=[],u.skp=!T),A+":"):A?A.split("^").join(".").replace(ft.rPath,L)+($||P):P?P:S?"]"===S?")]":")":V?(w[h]||D(t),","):o?"":(c=O,d=I,'"')),c||d||S&&(w[h]=!1,h--),u&&(c||d||(S&&(b[h+1]&&(f=g[--m],b[h+1]=!1),x=_[h+1]),$&&(_[h+1]=k[m].length+(l?1:0),(A||S)&&(f=g[++m]={bd:[]},b[h+1]=!0))),k[m]=(k[m]||"")+B.slice(j,J),j=J+r.length,c||d||((G=l&&b[h+1])&&(k[m-1]+=l,C[m-1]++),"("===$&&z&&!Z&&(k[m]=k[m-1].slice(x)+k[m],k[m-1]=k[m-1].slice(0,x))),k[m]+=G?X.slice(1):X),c||d||!$||(h++,A&&"("===$&&(w[h]=!0)),c||d||!U||(u&&(k[m]+=$),X+=$),X}var a,s,p,l,d,c,u=n&&n[0],f={bd:u},g={0:f},v=0,h=0,m=0,_={},x=0,b={},w={},y={},C={0:0},k={0:""},j=0;return"@"===t[0]&&(t=t.replace(Dt,".")),l=(t+(r?" ":"")).replace(ft.rPrm,o),u&&(l=k[0]),!h&&l||D(t)}function L(t,e,n){var r,i,o,a,s,p,l,d,c,u,f,g,v,h,m,_,x,b,w,y,C,k,j,T,A,P,F,N,M,$,V,E,O,I=0,S=vt.useViews||e.useViews||e.tags||e.templates||e.helpers||e.converters,q="",K={},B=t.length;for(typeof e===Bt?(b=n?'data-link="'+e.replace(Tt," ").slice(1,-1)+'"':e,e=0):(b=e.tmplName||"unnamed",e.allowCode&&(K.allowCode=!0),e.debug&&(K.debug=!0),f=e.bnds,x=e.tmpls),r=0;r<B;r++)if(i=t[r],typeof i===Bt)q+='+"'+i+'"';else if(o=i[0],"*"===o)q+=";\n"+i[1]+"\nret=ret";else{if(a=i[1],C=!n&&i[2],s=J(i[3],v=i[4]),$=i[6],V=i[7],i[8]?(E="\nvar ob,ltOb={},ctxs=",O=";\nctxs.lt=ltOb.lt;\nreturn ctxs;"):(E="\nreturn ",O=""),k=i[10]&&i[10].replace(At,"$1"),(A="else"===o)?g&&g.push(i[9]):(N=i[5]||gt.debugMode!==!1&&"undefined",f&&(g=i[9])&&(g=[g],I=f.push(1))),S=S||v[1]||v[2]||g||/view.(?!index)/.test(v[0]),(P=":"===o)?a&&(o=a===Jt?">":a+o):(C&&(w=R(k,K),w.tmplName=b+"/"+o,w.useViews=w.useViews||S,L(C,w),S=w.useViews,x.push(w)),A||(y=o,S=S||o&&(!ut[o]||!ut[o].flow),T=q,q=""),j=t[r+1],j=j&&"else"===j[0]),M=N?";\ntry{\nret+=":"\n+",h="",m="",P&&(g||$||a&&a!==Jt||V)){if(F=new Function("data,view,j","// "+b+" "+ ++I+" "+o+E+"{"+s+"};"+O),F._er=N,F._tag=o,F._bd=!!g,F._lr=V,n)return F;U(F,g),_='c("'+a+'",view,',u=!0,h=_+I+",",m=")"}if(q+=P?(n?(N?"try{\n":"")+"return ":M)+(u?(u=void 0,S=c=!0,_+(F?(f[I-1]=F,I):"{"+s+"}")+")"):">"===o?(l=!0,"h("+v[0]+")"):(d=!0,"((v="+v[0]+")!=null?v:"+(n?"null)":'"")'))):(p=!0,"\n{view:view,content:false,tmpl:"+(C?x.length:"false")+","+s+"},"),y&&!j){if(q="["+q.slice(0,-1)+"]",_='t("'+y+'",view,this,',n||g){if(q=new Function("data,view,j"," // "+b+" "+I+" "+y+E+q+O),q._er=N,q._tag=y,g&&U(f[I-1]=q,g),q._lr=V,n)return q;h=_+I+",undefined,",m=")"}q=T+M+_+(g&&I||q)+")",g=0,y=0}N&&!j&&(S=!0,q+=";\n}catch(e){ret"+(n?"urn ":"+=")+h+"j._err(e,view,"+N+")"+m+";}"+(n?"":"\nret=ret"))}q="// "+b+(K.debug?"\ndebugger;":"")+"\nvar v"+(p?",t=j._tag":"")+(c?",c=j._cnvt":"")+(l?",h=j._html":"")+(n?(i[8]?", ob":"")+";\n":',ret=""')+q+(n?"\n":";\nreturn ret;");try{q=new Function("data,view,j",q)}catch(Q){D("Compiled template code:\n\n"+q+'\n: "'+(Q.message||Q)+'"')}return e&&(e.fn=q,e.useViews=!!S),q}function Q(t,e){return t&&t!==e?e?l(l({},e),t):t:e&&l({},e)}function H(t,n){var r,i,o=n.map,a=o&&o.propsArr;if(!a){if(a=[],typeof t===Lt||st(t))for(r in t)i=t[r],r===at||!t.hasOwnProperty(r)||n.props.noFunctions&&e.isFunction(i)||a.push({key:r,prop:i});o&&(o.propsArr=o.options&&a)}return W(a,n)}function W(t,n){var r,i,o,a=n.tag,s=n.props,p=n.params.props,l=s.filter,d=s.sort,c=d===!0,u=parseInt(s.step),f=s.reverse?-1:1;if(!pt(t))return t;if(c||d&&typeof d===Bt?(r=t.map(function(t,e){return t=c?t:g(t,d),{i:e,v:typeof t===Bt?t.toLowerCase():t}}),r.sort(function(t,e){return t.v>e.v?f:t.v<e.v?-f:0}),t=r.map(function(e){return t[e.i]})):(d||f<0)&&!a.dataMap&&(t=t.slice()),st(d)&&(t=t.sort(function(){return d.apply(n,arguments)})),f<0&&(!d||st(d))&&(t=t.reverse()),t.filter&&l&&(t=t.filter(l,n),n.tag.onFilter&&n.tag.onFilter(n)),p.sorted&&(r=d||f<0?t:t.slice(),a.sorted?e.observable(a.sorted).refresh(r):n.map.sorted=r),i=s.start,o=s.end,(p.start&&void 0===i||p.end&&void 0===o)&&(i=o=0),isNaN(i)&&isNaN(o)||(i=+i||0,o=void 0===o||o>t.length?t.length:+o,t=t.slice(i,o)),u>1){for(i=0,o=t.length,r=[];i<o;i+=u)r.push(t[i]);t=r}return p.paged&&a.paged&&$observable(a.paged).refresh(t),t}function Z(t,n,r){var i=this.jquery&&(this[0]||S("Unknown template")),o=i.getAttribute(Qt);return E.call(o&&e.data(i)[Ht]||lt(i),t,n,r)}function z(t){return Ut[t]||(Ut[t]="&#"+t.charCodeAt(0)+";")}function G(t,e){return Kt[e]||""}function X(t){return void 0!=t?$t.test(t)&&(""+t).replace(Ot,z)||t:""}function Y(t){return typeof t===Bt?t.replace(It,z):t}function tt(t){return typeof t===Bt?t.replace(St,G):t}var et=e===!1;e=e&&e.fn?e:t.jQuery;var nt,rt,it,ot,at,st,pt,lt,dt,ct,ut,ft,gt,vt,ht,mt,_t,xt,bt,wt,yt,Ct,kt="v1.0.13",jt="_ocp",Tt=/[ \t]*(\r\n|\n|\r)/g,At=/\\(['"\\])/g,Pt=/['"\\]/g,Ft=/(?:\x08|^)(onerror:)?(?:(~?)(([\w$.]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,Nt=/^if\s/,Rt=/<(\w+)[>\s]/,Mt=/[\x00`><"'&=]/g,$t=/[\x00`><\"'&=]/,Vt=/^on[A-Z]|^convert(Back)?$/,Et=/^\#\d+_`[\s\S]*\/\d+_`$/,Ot=Mt,It=/[&<>]/g,St=/&(amp|gt|lt);/g,Dt=/\[['"]?|['"]?\]/g,qt=0,Ut={"&":"&amp;","<":"&lt;",">":"&gt;","\0":"&#0;","'":"&#39;",'"':"&#34;","`":"&#96;","=":"&#61;"},Kt={amp:"&",gt:">",lt:"<"},Jt="html",Bt="string",Lt="object",Qt="data-jsv-tmpl",Ht="jsvTmpl",Wt="For #index in nested block use #getIndex().",Zt={},zt={},Gt=t.jsrender,Xt=Gt&&e&&!e.render,Yt={template:{compile:A},tag:{compile:j},viewModel:{compile:N},helper:{},converter:{}};if(ot={jsviews:kt,sub:{rPath:/^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,rPrm:/(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(~?[\w$.^]+)?\s*((\+\+|--)|\+|-|~(?![\w$])|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?(@)?[#~]?[\w$.^]+)([([])?)|(,\s*)|(?:(\()\s*)?\\?(?:(')|("))|(?:\s*(([)\]])(?=[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,View:C,Err:p,tmplFn:q,parse:B,extend:l,extendCtx:Q,syntaxErr:D,onStore:{template:function(t,e){null===e?delete zt[t]:t&&(zt[t]=e)}},addSetting:$,settings:{allowCode:!1},advSet:a,_thp:i,_gm:r,_tg:function(){},_cnvt:m,_tag:y,_er:S,_err:I,_cp:o,_sq:function(t){return"constructor"===t&&D(""),t}},settings:{delimiters:d,advanced:function(t){return t?(l(vt,t),ft.advSet(),ht):vt}},map:V},(p.prototype=new Error).constructor=p,u.depends=function(){return[this.get("item"),"index"]},f.depends="index",C.prototype={get:c,getIndex:f,ctxPrm:v,getRsc:w,_getTmpl:h,_getOb:g,getCache:function(t){return gt._cchCt>this.cache._ct&&(this.cache={_ct:gt._cchCt}),void 0!==this.cache[t]?this.cache[t]:this.cache[t]=Zt[t](this.data,this,ft)},_is:"view"},ft=ot.sub,ht=ot.settings,!(Gt||e&&e.render)){for(nt in Yt)M(nt,Yt[nt]);if(dt=ot.converters,ct=ot.helpers,ut=ot.tags,ft._tg.prototype={baseApply:T,cvtArgs:_,bndArgs:b,ctxPrm:v},it=ft.topView=new C,e){if(e.fn.render=Z,at=e.expando,e.observable){if(kt!==(kt=e.views.jsviews))throw"jquery.observable.js requires jsrender.js "+kt;l(ft,e.views.sub),ot.map=e.views.map}}else e={},et&&(t.jsrender=e),e.renderFile=e.__express=e.compile=function(){throw"Node.js: use npm jsrender, or jsrender-node.js"},e.isFunction=function(t){return"function"==typeof t},e.isArray=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},ft._jq=function(t){t!==e&&(l(t,e),e=t,e.fn.render=Z,delete e.jsrender,at=e.expando)},e.jsrender=kt;gt=ft.settings,gt.allowCode=!1,st=e.isFunction,e.render=zt,e.views=ot,e.templates=lt=ot.templates;for(yt in gt)$(yt);(ht.debugMode=function(t){return void 0===t?gt.debugMode:(gt._clFns&&gt._clFns(),gt.debugMode=t,gt.onError=typeof t===Bt?function(){return t}:st(t)?t:void 0,ht)})(!1),vt=gt.advanced={cache:!0,useViews:!1,_jsv:!1},ut({"if":{render:function(t){var e=this,n=e.tagCtx,r=e.rendering.done||!t&&(n.args.length||!n.index)?"":(e.rendering.done=!0,void(e.selected=n.index));return r},contentCtx:!0,flow:!0},"for":{sortDataMap:V(W),init:function(t,e){this.setDataMap(this.tagCtxs)},render:function(t){var e,n,r,i,o,a=this,s=a.tagCtx,p=s.argDefault===!1,l=s.props,d=p||s.args.length,c="",u=0;if(!a.rendering.done){if(e=d?t:s.view.data,p)for(p=l.reverse?"unshift":"push",i=+l.end,o=+l.step||1,e=[],r=+l.start||0;(i-r)*o>0;r+=o)e[p](r);void 0!==e&&(n=pt(e),c+=s.render(e,!d||l.noIteration),u+=n?e.length:1),(a.rendering.done=u)&&(a.selected=s.index)}return c},setDataMap:function(t){for(var e,n,r,i=this,o=t.length;o--;)e=t[o],n=e.props,r=e.params.props,e.argDefault=void 0===n.end||e.args.length>0,n.dataMap=e.argDefault!==!1&&pt(e.args[0])&&(r.sort||r.start||r.end||r.step||r.filter||r.reverse||n.sort||n.start||n.end||n.step||n.filter||n.reverse)&&i.sortDataMap},flow:!0},props:{baseTag:"for",dataMap:V(H),init:a,flow:!0},include:{flow:!0},"*":{render:o,flow:!0},":*":{render:o,flow:!0},dbg:ct.dbg=dt.dbg=s}),dt({html:X,attr:X,encode:Y,unencode:tt,url:function(t){return void 0!=t?encodeURI(""+t):null===t?t:""}})}return gt=ft.settings,pt=(e||Gt).isArray,ht.delimiters("{{","}}","^"),Xt&&Gt.views.sub._jq(e),e||Gt},window);
//# sourceMappingURL=jsrender.min.js.map