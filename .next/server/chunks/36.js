exports.id=36,exports.ids=[36],exports.modules={6818:(e,t,r)=>{"use strict";r.d(t,{Z:()=>createLucideIcon});var a=r(3542);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let toKebabCase=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),toCamelCase=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase()),toPascalCase=e=>{let t=toCamelCase(e);return t.charAt(0).toUpperCase()+t.slice(1)},mergeClasses=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim(),hasA11yProp=e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,a.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:l="",children:i,iconNode:c,...d},n)=>(0,a.createElement)("svg",{ref:n,...s,width:t,height:t,stroke:e,strokeWidth:o?24*Number(r)/Number(t):r,className:mergeClasses("lucide",l),...!i&&!hasA11yProp(d)&&{"aria-hidden":"true"},...d},[...c.map(([e,t])=>(0,a.createElement)(e,t)),...Array.isArray(i)?i:[i]])),createLucideIcon=(e,t)=>{let r=(0,a.forwardRef)(({className:r,...s},l)=>(0,a.createElement)(o,{ref:l,iconNode:t,className:mergeClasses(`lucide-${toKebabCase(toPascalCase(e))}`,`lucide-${e}`,r),...s}));return r.displayName=toPascalCase(e),r}},9723:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var a=r(6818);let s=(0,a.Z)("house",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]])},2300:(e,t,r)=>{let{createProxy:a}=r(5153);e.exports=a("/data/data/com.termux/files/home/tetrashop-projects/nlp-project/node_modules/next/dist/client/link.js")},4353:(e,t,r)=>{e.exports=r(2300)}};