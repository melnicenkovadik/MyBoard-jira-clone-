(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{508:function(e,t,r){var content=r(567);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(31).default)("28f1127f",content,!0,{sourceMap:!1})},566:function(e,t,r){"use strict";r(508)},567:function(e,t,r){var o=r(30)(!1);o.push([e.i,".v-dialog{border-radius:15px;background-color:#fff;padding:15px}.upload-block{border:2px dashed #adadad;padding:30px;border-radius:15px;margin-bottom:20px}",""]),e.exports=o},607:function(e,t,r){"use strict";r.r(t);r(46),r(8),r(60),r(15),r(14),r(61),r(68),r(19);var o=r(6),n=(r(33),r(28),r(608));function c(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0,o=function(){};return{s:o,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,c=!0,d=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return c=e.done,e},e:function(e){d=!0,n=e},f:function(){try{c||null==r.return||r.return()}finally{if(d)throw n}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}var d={asyncData:function(){return Object(o.a)(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=$nuxt.$fire.firestore.collection("users").doc($nuxt.$fire.auth.currentUser.uid).collection("boards"),r=[],e.next=4,t.get().then((function(e){if(e.docs.length>0)try{var t,o=c(e.docs);try{for(o.s();!(t=o.n()).done;){var n=t.value,data=n.data();data.id=n.id,r.push(data)}}catch(e){o.e(e)}finally{o.f()}}catch(e){}})).catch((function(e){}));case 4:return e.abrupt("return",{boards:r});case 5:case"end":return e.stop()}}),e)})))()},data:function(){return{enableColor:!1,dialog:!1,valid:!1,board:{title:"",color:""},snackbar:!1,snackbarText:"No error message",currentImageId:""}},created:function(){var e=this;$nuxt.$fire.firestore.collection("users/".concat($nuxt.$fire.auth.currentUser.uid,"/boards/")).onSnapshot((function(t){if(t.docs.length>0){e.boards=[];try{var r,o=c(t.docs);try{for(o.s();!(r=o.n()).done;){var n=r.value,data=n.data();data.id=n.id,e.boards.push(data)}}catch(e){o.e(e)}finally{o.f()}}catch(e){}}}))},methods:{addBoard:function(){this.currentImageId=Object(n.a)(),this.dialog=!0},createBoard:function(){var e=this;this.$refs.form.validate()&&(this.board.dateCreated=Date.now(),this.$fire.firestore.collection("users").doc(this.$fire.auth.currentUser.uid).collection("boards").doc(this.currentImageId).set(this.board).then((function(t){e.dialog=!1,e.$refs.form.reset(),e.snackbarText="Successfully created your board",e.snackbar=!0})).catch((function(e){})))},chooseImage:function(){this.$refs.boardBackground.click()},uploadFiles:function(){var e=this,t=this.fileToUpload.uuid+"-"+this.fileToUpload.file.name,r="images/"+this.$fire.auth.currentUser.uid+"/boards/"+this.currentImageId+"/"+t,n=this.$fire.storage.ref().child(r),c={customMetadata:{owner:this.$fire.auth.currentUser.uid}},l=n.put(this.fileToUpload.file,c);return l.on("state_changed",(function(progress){e.fileToUpload.progress=progress.bytesTransferred/progress.totalBytes*100}),(function(t){return e.fileToUpload.failed=!0,e.fileToUpload.error=t,!1}),Object(o.a)(regeneratorRuntime.mark((function r(){var o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,l.snapshot.ref.getDownloadURL().catch((function(e){return!1}));case 2:o=r.sent,e.board.image={name:t,originalName:e.fileToUpload.file.name,downloadURL:o,uuid:e.fileToUpload.uuid};case 4:case"end":return r.stop()}}),r)}))))}}},f=(r(566),r(56)),v=r(70),h=r.n(v),m=r(510),x=r(491),y=r(460),_=r(603),k=r(456),w=r(587),C=r(494),$=r(446),U=r(454),T=r(495),I=r(580),component=Object(f.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-dialog",{attrs:{"max-width":"355",persistent:""},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[r("v-container",{staticClass:"d-block"},[r("v-row",{attrs:{"no-gutters":"",align:"center",justify:"space-between"}},[r("v-row",{attrs:{"no-gutters":""}},[r("h3",[e._v("Add Board")])]),e._v(" "),r("v-icon",{on:{click:function(t){e.dialog=!1}}},[e._v("mdi-close")])],1),e._v(" "),r("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("div",{staticClass:"d-flex flex-column"},[r("v-text-field",{attrs:{label:"Board title",name:"title",type:"text",rules:[function(e){return!!e||"Board title is required"}],required:""},model:{value:e.board.title,callback:function(t){e.$set(e.board,"title",t)},expression:"board.title"}}),e._v(" "),!1===e.enableColor?r("v-btn",{attrs:{depressed:""},on:{click:function(t){e.enableColor=!0}}},[e._v("\n            Choose board color\n          ")]):e._e(),e._v(" "),r("br"),e._v(" "),!0===e.enableColor?r("v-color-picker",{attrs:{"dot-size":"25","hide-inputs":"","swatches-max-height":"100"},model:{value:e.board.color,callback:function(t){e.$set(e.board,"color",t)},expression:"board.color"}}):e._e(),e._v(" "),r("v-btn",{attrs:{outlined:"",color:"#FC1370",disabled:!e.valid},on:{click:e.createBoard}},[e._v("Submit\n          ")])],1)])],1)],1),e._v(" "),r("div",{staticClass:"d-flex flex-row align-center justify-space-between"},[r("h1",[e._v("My Boards")]),e._v(" "),r("v-btn",{staticClass:"white--text",attrs:{large:"",color:"#FC1370",depressed:""},on:{click:e.addBoard}},[e._v("ADD BOARD\n    ")])],1),e._v(" "),r("div",{staticClass:"d-flex flex-wrap align-center justify-start"},[0===e.boards.length?r("p",[e._v("You have no boards yet.")]):e._e(),e._v(" "),e._l(e.boards,(function(t){return r("v-card",{key:t.id,staticClass:"jello-board-tile",style:t.color?"background-color:"+t.color:"",on:{click:function(r){return e.$router.push("/boards/"+t.id)}}},[r("v-card-title",[e._v("\n        "+e._s(t.title)+"\n      ")]),e._v(" "),r("v-card-subtitle",[e._v("\n        created "+e._s(e._f("formatDate")(t.dateCreated))+"\n      ")])],1)}))],2),e._v(" "),r("v-snackbar",{attrs:{timeout:3e3,absolute:"",bottom:"",color:"primary"},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n    "+e._s(e.snackbarText)+"\n  ")])],1)}),[],!1,null,null,null);t.default=component.exports;h()(component,{VBtn:m.a,VCard:x.a,VCardSubtitle:y.b,VCardTitle:y.d,VColorPicker:_.a,VContainer:k.a,VDialog:w.a,VForm:C.a,VIcon:$.a,VRow:U.a,VSnackbar:T.a,VTextField:I.a})}}]);