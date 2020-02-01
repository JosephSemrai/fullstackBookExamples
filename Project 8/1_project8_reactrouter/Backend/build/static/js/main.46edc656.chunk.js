(window.webpackJsonpproject1_effect=window.webpackJsonpproject1_effect||[]).push([[0],{ 17:function(e,t,n){e.exports=n(42)},41:function(e,t,n){},42:function(e,t,n){'use strict';n.r(t);var a=n(0),r=n.n(a),c=n(15),o=n.n(c),u=n(16),l=n(2),i=n.n(l),s=n(4),f=n(3),p=function(e){var t=e.note,n=e.toggleFlagged;return r.a.createElement('li',{ className:'mainNote card' },r.a.createElement('input',{ type:'checkbox',checked:t.flagged,onChange:n }),t.content)},d=function(e){var t=e.message;return null===t?null:r.a.createElement('div',{ className:'error' },t)},m=function(){return r.a.createElement('div',{ style:{ color:'white',padding:15,fontStyle:'bold',fontSize:16,backgroundColor:'#05386B' } },r.a.createElement('p',null,'This is the end of the above content'))},g=function(e){var t=e.handleLogin,n=e.handleUsernameChange,a=e.handlePasswordChange,c=e.username,o=e.password;return r.a.createElement('form',{ onSubmit:t },r.a.createElement('div',null,'Username',r.a.createElement('input',{ type:'text',value:c,name:'Username',onChange:n })),r.a.createElement('div',null,'Password',r.a.createElement('input',{ type:'password',value:o,name:'Password',onChange:a })),r.a.createElement('button',{ type:'submit' },'Login'))},b=(n(23),r.a.forwardRef((function(e,t){var n=e.buttonLabel,c=e.children,o=Object(a.useState)(!1),u=Object(f.a)(o,2),l=u[0],i=u[1],s={ display:l?'none':'' },p={ display:l?'':'none' },d=function(){i(!l)};return Object(a.useImperativeHandle)(t,(function(){return{ toggleVisibility:d }})),r.a.createElement('div',null,r.a.createElement('div',{ style:s },r.a.createElement('button',{ onClick:d },n)),r.a.createElement('div',{ style:p },c,r.a.createElement('button',{ onClick:d },'Cancel')))}))),h=function(e){var t=e.addNote,n=e.noteField,a=e.handleInputChange;return r.a.createElement('form',{ onSubmit:t },r.a.createElement('input',{ value:n,onChange:a }),r.a.createElement('button',{ type:'submit' },'Add Note'))},v=n(5),w=n.n(v),E=null,O={ setToken:function(e){E='bearer '.concat(e)},getAll:function(){return w.a.get('/api/notes').then((function(e){return e.data}))},create:function(){var e=Object(s.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={ headers:{ Authorization:E } },e.next=3,w.a.post('/api/notes',t,n);case 3:return a=e.sent,e.abrupt('return',a.data);case 5:case'end':return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(e,t){return w.a.put(''.concat('/api/notes','/').concat(e),t).then((function(e){return e.data}))} },j={ login:function(){var e=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.post('/api/login',t);case 2:return n=e.sent,e.abrupt('return',n.data);case 4:case'end':return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}() };function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var k=function(e){var t=Object(a.useState)([]),n=Object(f.a)(t,2),c=n[0],o=n[1],l=Object(a.useState)('Enter a new note here...'),v=Object(f.a)(l,2),w=v[0],E=v[1],k=Object(a.useState)(!0),S=Object(f.a)(k,2),C=S[0],P=S[1],x=Object(a.useState)(),I=Object(f.a)(x,2),N=I[0],A=I[1],D=Object(a.useState)(''),U=Object(f.a)(D,2),L=U[0],T=U[1],F=Object(a.useState)(''),J=Object(f.a)(F,2),z=J[0],B=J[1],R=Object(a.useState)(null),V=Object(f.a)(R,2),_=V[0],H=V[1];Object(a.useEffect)((function(){O.getAll().then((function(e){o(e)})).catch((function(e){A(''.concat(e,': Something went wrong while trying to retrieve data from the server.'))}))}),[]),Object(a.useEffect)((function(){var e=window.localStorage.getItem('noteAppUser');if(e){var t=JSON.parse(e);H(t),O.setToken(t.token)}}),[]);var M=function(){var e=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,j.login({ username:L,password:z });case 4:n=e.sent,H(n),T(''),B(''),window.localStorage.setItem('noteAppUser',JSON.stringify(n)),O.setToken(n.token),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0),A('Incorrect credentials: '+e.t0),setTimeout((function(){A(null)}),3e3);case 17:case'end':return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(s.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault();try{window.localStorage.removeItem('noteAppUser'),O.setToken(null),H(null)}catch(n){console.log(n)}case 2:case'end':return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(e){var t=c.find((function(t){return t.id===e})),n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t,{ flagged:!t.flagged });O.update(e,n).then((function(t){o(c.map((function(t){return t.id===e?n:t})))}))},G=C?c:c.filter((function(e){return e.flagged})),K=function(e){e.preventDefault(),X.current.toggleVisibility();var t={ content:w,date:new Date,flagged:Math.random()>.5 };O.create(t).then((function(e){o(c.concat(e)),E('Enter a new note here...')}))},Q=function(e){console.log('Input form changed',e.target.value),E(e.target.value)},X=r.a.createRef();return r.a.createElement('div',null,r.a.createElement('h1',null,'Notes'),null===_?r.a.createElement(b,{ buttonLabel:'Login' },r.a.createElement(g,{ handleLogin:M,handleUsernameChange:function(e){var t=e.target;return T(t.value)},handlePasswordChange:function(e){var t=e.target;return B(t.value)},username:L,password:z })):r.a.createElement('div',null,r.a.createElement('p',null,'Welcome, ',_.name),' ',r.a.createElement('button',{ onClick:W },'Sign Out'),r.a.createElement(b,{ ref:X },r.a.createElement(h,{ addNote:K,noteField:w,handleInputChange:Q }))),' ',r.a.createElement(d,{ message:N }),r.a.createElement('div',null,r.a.createElement('button',{ onClick:function(){return P(!C)} },'Show ',C?'Flagged':'All')),r.a.createElement('ul',null,G.map((function(e){return r.a.createElement(p,{ key:e.id,note:e,toggleFlagged:function(){return q(e.id)} })}))),r.a.createElement(m,null))};n(41);o.a.render(r.a.createElement(k,null),document.getElementById('root'))} },[[17,1,2]]])
//# sourceMappingURL=main.46edc656.chunk.js.map