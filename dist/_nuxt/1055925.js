/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{606:function(e,t,r){"use strict";r.r(t);var n=r(463),o=r(464),c=r(465),l=r(468),h="firebasestorage.googleapis.com",f=function(e){function t(code,r){var n=e.call(this,d(code),"Firebase Storage: "+r+" ("+d(code)+")")||this;return n.customData={serverResponse:null},Object.setPrototypeOf(n,t.prototype),n}return Object(o.c)(t,e),t.prototype._codeEquals=function(code){return d(code)===this.code},Object.defineProperty(t.prototype,"message",{get:function(){return this.customData.serverResponse?this.message+"\n"+this.customData.serverResponse:this.message},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"serverResponse",{get:function(){return this.customData.serverResponse},set:function(e){this.customData.serverResponse=e},enumerable:!1,configurable:!0}),t}(c.c);function d(code){return"storage/"+code}function _(){return new f("unknown","An unknown error occurred, please check the error payload for server response.")}function v(){return new f("canceled","User canceled the upload/download.")}function m(){return new f("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function y(e){return new f("invalid-argument",e)}function w(){return new f("app-deleted","The Firebase app was deleted.")}function R(e){return new f("invalid-root-operation","The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function k(e,t){return new f("invalid-format","String does not match format '"+e+"': "+t)}function O(e){throw new f("internal-error","Internal error: "+e)}var T={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},x=function(data,e){this.data=data,this.contentType=e||null};function P(e,t){switch(e){case T.RAW:return new x(U(t));case T.BASE64:case T.BASE64URL:return new x(S(e,t));case T.DATA_URL:return new x((r=new C(t)).base64?S(T.BASE64,r.rest):function(e){var t;try{t=decodeURIComponent(e)}catch(e){throw k(T.DATA_URL,"Malformed data URL.")}return U(t)}(r.rest),function(e){return new C(e).contentType}(t))}var r;throw _()}function U(e){for(var b=[],i=0;i<e.length;i++){var t=e.charCodeAt(i);if(t<=127)b.push(t);else if(t<=2047)b.push(192|t>>6,128|63&t);else if(55296==(64512&t))if(i<e.length-1&&56320==(64512&e.charCodeAt(i+1)))t=65536|(1023&t)<<10|1023&e.charCodeAt(++i),b.push(240|t>>18,128|t>>12&63,128|t>>6&63,128|63&t);else b.push(239,191,189);else 56320==(64512&t)?b.push(239,191,189):b.push(224|t>>12,128|t>>6&63,128|63&t)}return new Uint8Array(b)}function S(e,t){switch(e){case T.BASE64:var r=-1!==t.indexOf("-"),n=-1!==t.indexOf("_");if(r||n)throw k(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break;case T.BASE64URL:var o=-1!==t.indexOf("+"),c=-1!==t.indexOf("/");if(o||c)throw k(e,"Invalid character '"+(o?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}var l;try{l=atob(t)}catch(t){throw k(e,"Invalid character found")}for(var h=new Uint8Array(l.length),i=0;i<l.length;i++)h[i]=l.charCodeAt(i);return h}var C=function(e){this.base64=!1,this.contentType=null;var t=e.match(/^data:([^,]+)?,/);if(null===t)throw k(T.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var r=t[1]||null;null!=r&&(this.base64=(s=r,n=";base64",s.length>=n.length&&s.substring(s.length-n.length)===n),this.contentType=this.base64?r.substring(0,r.length-";base64".length):r),this.rest=e.substring(e.indexOf(",")+1);var s,n};var j,E={STATE_CHANGED:"state_changed"},A={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function I(e){switch(e){case"running":case"pausing":case"canceling":return A.RUNNING;case"paused":return A.PAUSED;case"success":return A.SUCCESS;case"canceled":return A.CANCELED;case"error":default:return A.ERROR}}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(j||(j={}));var L=function(){function e(){var e=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=j.NO_ERROR,this.sendPromise_=new Promise((function(t){e.xhr_.addEventListener("abort",(function(){e.errorCode_=j.ABORT,t(e)})),e.xhr_.addEventListener("error",(function(){e.errorCode_=j.NETWORK_ERROR,t(e)})),e.xhr_.addEventListener("load",(function(){t(e)}))}))}return e.prototype.send=function(e,t,body,r){if(this.sent_)throw O("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==r)for(var n in r)r.hasOwnProperty(n)&&this.xhr_.setRequestHeader(n,r[n].toString());return void 0!==body?this.xhr_.send(body):this.xhr_.send(),this.sendPromise_},e.prototype.getErrorCode=function(){if(!this.sent_)throw O("cannot .getErrorCode() before sending");return this.errorCode_},e.prototype.getStatus=function(){if(!this.sent_)throw O("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}},e.prototype.getResponseText=function(){if(!this.sent_)throw O("cannot .getResponseText() before sending");return this.xhr_.responseText},e.prototype.abort=function(){this.xhr_.abort()},e.prototype.getResponseHeader=function(header){return this.xhr_.getResponseHeader(header)},e.prototype.addUploadProgressListener=function(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)},e.prototype.removeUploadProgressListener=function(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)},e}(),N=function(){function e(){}return e.prototype.createXhrIo=function(){return new L},e}(),B=function(){function e(e,path){this.bucket=e,this.path_=path}return Object.defineProperty(e.prototype,"path",{get:function(){return this.path_},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isRoot",{get:function(){return 0===this.path.length},enumerable:!1,configurable:!0}),e.prototype.fullServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)},e.prototype.bucketOnlyServerUrl=function(){return"/b/"+encodeURIComponent(this.bucket)+"/o"},e.makeFromBucketSpec=function(t,r){var n;try{n=e.makeFromUrl(t,r)}catch(r){return new e(t,"")}if(""===n.path)return n;throw new f("invalid-default-bucket","Invalid default bucket '"+t+"'.")},e.makeFromUrl=function(t,r){var n=null,o="([A-Za-z0-9.\\-_]+)";var c=new RegExp("^gs://"+o+"(/(.*))?$","i");function l(e){e.path_=decodeURIComponent(e.path)}for(var d=r.replace(/[.]/g,"\\."),_=[{regex:c,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp("^https?://"+d+"/v[A-Za-z0-9_]+/b/"+o+"/o(/([^?#]*).*)?$","i"),indices:{bucket:1,path:3},postModify:l},{regex:new RegExp("^https?://"+(r===h?"(?:storage.googleapis.com|storage.cloud.google.com)":r)+"/"+o+"/([^?#]*)","i"),indices:{bucket:1,path:2},postModify:l}],i=0;i<_.length;i++){var v=_[i],m=v.regex.exec(t);if(m){var y=m[v.indices.bucket],w=m[v.indices.path];w||(w=""),n=new e(y,w),v.postModify(n);break}}if(null==n)throw function(e){return new f("invalid-url","Invalid URL '"+e+"'.")}(t);return n},e}(),M=function(){function e(e){this.promise_=Promise.reject(e)}return e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){},e}();function D(p){return"string"==typeof p||p instanceof String}function z(p){return H()&&p instanceof Blob}function H(){return"undefined"!=typeof Blob}function F(e,t,r,n){if(n<t)throw y("Invalid value for '"+e+"'. Expected "+t+" or greater.");if(n>r)throw y("Invalid value for '"+e+"'. Expected "+r+" or less.")}function X(e,t){var r=t.match(/^(\w+):\/\/.+/),n=t;return null==(null==r?void 0:r[1])&&(n="https://"+t),n+"/v0"+e}function G(e){var t=encodeURIComponent,r="?";for(var n in e){if(e.hasOwnProperty(n))r=r+(t(n)+"="+t(e[n]))+"&"}return r=r.slice(0,-1)}var W=function(){function e(e,t,r,body,n,o,c,l,h,f,d){var _=this;this.pendingXhr_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=t,this.headers_=r,this.body_=body,this.successCodes_=n.slice(),this.additionalRetryCodes_=o.slice(),this.callback_=c,this.errorCallback_=l,this.progressCallback_=f,this.timeout_=h,this.pool_=d,this.promise_=new Promise((function(e,t){_.resolve_=e,_.reject_=t,_.start_()}))}return e.prototype.start_=function(){var e=this;function t(t,r){var n,o=e.resolve_,c=e.reject_,l=r.xhr;if(r.wasSuccessCode)try{var h=e.callback_(l,l.getResponseText());void 0!==h?o(h):o()}catch(e){c(e)}else null!==l?((n=_()).serverResponse=l.getResponseText(),e.errorCallback_?c(e.errorCallback_(l,n)):c(n)):r.canceled?c(n=e.appDelete_?w():v()):c(n=new f("retry-limit-exceeded","Max retry time for operation exceeded, please try again."))}this.canceled_?t(0,new V(!1,null,!0)):this.backoffId_=function(e,t,r){var n=1,c=null,l=!1,h=0;function f(){return 2===h}var d=!1;function _(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];d||(d=!0,t.apply(null,e))}function v(t){c=setTimeout((function(){c=null,e(m,f())}),t)}function m(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(!d)if(e)_.call.apply(_,Object(o.f)([null,e],t));else{var c;f()||l?_.call.apply(_,Object(o.f)([null,e],t)):(n<64&&(n*=2),1===h?(h=2,c=0):c=1e3*(n+Math.random()),v(c))}}var y=!1;function w(e){y||(y=!0,d||(null!==c?(e||(h=2),clearTimeout(c),v(0)):e||(h=1)))}return v(0),setTimeout((function(){l=!0,w(!0)}),r),w}((function(t,r){if(r)t(!1,new V(!1,null,!0));else{var n=e.pool_.createXhrIo();e.pendingXhr_=n,null!==e.progressCallback_&&n.addUploadProgressListener(o),n.send(e.url_,e.method_,e.body_,e.headers_).then((function(r){null!==e.progressCallback_&&r.removeUploadProgressListener(o),e.pendingXhr_=null;var n=(r=r).getErrorCode()===j.NO_ERROR,c=r.getStatus();if(n&&!e.isRetryStatusCode_(c)){var l=-1!==e.successCodes_.indexOf(c);t(!0,new V(l,r))}else{var h=r.getErrorCode()===j.ABORT;t(!1,new V(!1,null,h))}}))}function o(t){var r=t.loaded,n=t.lengthComputable?t.total:-1;null!==e.progressCallback_&&e.progressCallback_(r,n)}}),t,this.timeout_)},e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingXhr_&&this.pendingXhr_.abort()},e.prototype.isRetryStatusCode_=function(e){var t=e>=500&&e<600,r=-1!==[408,429].indexOf(e),n=-1!==this.additionalRetryCodes_.indexOf(e);return t||r||n},e}(),V=function(e,t,r){this.wasSuccessCode=e,this.xhr=t,this.canceled=!!r};function K(){return"undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function J(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=K();if(void 0!==r){for(var n=new r,i=0;i<e.length;i++)n.append(e[i]);return n.getBlob()}if(H())return new Blob(e);throw new f("unsupported-environment","This browser doesn't seem to support creating Blobs")}var Z=function(){function e(data,e){var t=0,r="";z(data)?(this.data_=data,t=data.size,r=data.type):data instanceof ArrayBuffer?(e?this.data_=new Uint8Array(data):(this.data_=new Uint8Array(data.byteLength),this.data_.set(new Uint8Array(data))),t=this.data_.length):data instanceof Uint8Array&&(e?this.data_=data:(this.data_=new Uint8Array(data.length),this.data_.set(data)),t=data.length),this.size_=t,this.type_=r}return e.prototype.size=function(){return this.size_},e.prototype.type=function(){return this.type_},e.prototype.slice=function(t,r){if(z(this.data_)){var n=function(e,t,r){return e.webkitSlice?e.webkitSlice(t,r):e.mozSlice?e.mozSlice(t,r):e.slice?e.slice(t,r):null}(this.data_,t,r);return null===n?null:new e(n)}return new e(new Uint8Array(this.data_.buffer,t,r-t),!0)},e.getBlob=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];if(H()){var n=t.map((function(t){return t instanceof e?t.data_:t}));return new e(J.apply(null,n))}var o=t.map((function(e){return D(e)?P(T.RAW,e).data:e.data_})),c=0;o.forEach((function(e){c+=e.byteLength}));var l=new Uint8Array(c),h=0;return o.forEach((function(e){for(var i=0;i<e.length;i++)l[h++]=e[i]})),new e(l,!0)},e.prototype.uploadData=function(){return this.data_},e}();function $(s){var e,p;try{e=JSON.parse(s)}catch(e){return null}return"object"!=typeof(p=e)||Array.isArray(p)?null:e}function Y(path){var e=path.lastIndexOf("/",path.length-2);return-1===e?path:path.slice(e+1)}function Q(e,t){return t}var ee=function(e,t,r,n){this.server=e,this.local=t||e,this.writable=!!r,this.xform=n||Q},te=null;function re(){if(te)return te;var e=[];e.push(new ee("bucket")),e.push(new ee("generation")),e.push(new ee("metageneration")),e.push(new ee("name","fullPath",!0));var t=new ee("name");t.xform=function(e,t){return function(e){return!D(e)||e.length<2?e:Y(e)}(t)},e.push(t);var r=new ee("size");return r.xform=function(e,t){return void 0!==t?Number(t):t},e.push(r),e.push(new ee("timeCreated")),e.push(new ee("updated")),e.push(new ee("md5Hash",null,!0)),e.push(new ee("cacheControl",null,!0)),e.push(new ee("contentDisposition",null,!0)),e.push(new ee("contentEncoding",null,!0)),e.push(new ee("contentLanguage",null,!0)),e.push(new ee("contentType",null,!0)),e.push(new ee("metadata","customMetadata",!0)),te=e}function ne(e,t,r){for(var n={type:"file"},o=r.length,i=0;i<o;i++){var c=r[i];n[c.local]=c.xform(n,t[c.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){var r=e.bucket,path=e.fullPath,n=new B(r,path);return t._makeStorageReference(n)}})}(n,e),n}function oe(e,t,r){var n=$(t);return null===n?null:ne(e,n,r)}function ie(e,t){for(var r={},n=t.length,i=0;i<n;i++){var o=t[i];o.writable&&(r[o.server]=e[o.local])}return JSON.stringify(r)}function ae(e,t,r){var n=$(r);return null===n?null:function(e,t,r){var n={prefixes:[],items:[],nextPageToken:r.nextPageToken};if(r.prefixes)for(var o=0,c=r.prefixes;o<c.length;o++){var l=c[o].replace(/\/$/,""),h=e._makeStorageReference(new B(t,l));n.prefixes.push(h)}if(r.items)for(var f=0,d=r.items;f<d.length;f++){var _=d[f];h=e._makeStorageReference(new B(t,_.name)),n.items.push(h)}return n}(e,t,n)}var se=function(e,t,r,n){this.url=e,this.method=t,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]};function ue(e){if(!e)throw _()}function ce(e,t){return function(r,text){var n=oe(e,text,t);return ue(null!==n),n}}function le(e,t){return function(r,text){var n=oe(e,text,t);return ue(null!==n),function(e,t,r){var n=$(t);if(null===n)return null;if(!D(n.downloadTokens))return null;var o=n.downloadTokens;if(0===o.length)return null;var c=encodeURIComponent;return o.split(",").map((function(t){var n=e.bucket,path=e.fullPath;return X("/b/"+c(n)+"/o/"+c(path),r)+G({alt:"media",token:t})}))[0]}(n,text,e.host)}}function he(e){return function(t,r){var n,path,o;return 401===t.getStatus()?n=new f("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(o=e.bucket,n=new f("quota-exceeded","Quota for bucket '"+o+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(path=e.path,n=new f("unauthorized","User does not have permission to access '"+path+"'.")):n=r,n.serverResponse=r.serverResponse,n}}function fe(e){var t=he(e);return function(r,n){var path,o=t(r,n);return 404===r.getStatus()&&(path=e.path,o=new f("object-not-found","Object '"+path+"' does not exist.")),o.serverResponse=n.serverResponse,o}}function pe(e,t,r){var n=X(t.fullServerUrl(),e.host),o=e.maxOperationRetryTime,c=new se(n,"GET",ce(e,r),o);return c.errorHandler=fe(t),c}function de(e,t,r,n,o){var c={};t.isRoot?c.prefix="":c.prefix=t.path+"/",r&&r.length>0&&(c.delimiter=r),n&&(c.pageToken=n),o&&(c.maxResults=o);var l=X(t.bucketOnlyServerUrl(),e.host),h=e.maxOperationRetryTime,f=new se(l,"GET",function(e,t){return function(r,text){var n=ae(e,t,text);return ue(null!==n),n}}(e,t.bucket),h);return f.urlParams=c,f.errorHandler=he(t),f}function _e(e,t,r){var n=Object.assign({},r);return n.fullPath=e.path,n.size=t.size(),n.contentType||(n.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),n}var ge=function(e,t,r,n){this.current=e,this.total=t,this.finalized=!!r,this.metadata=n||null};function be(e,t){var r=null;try{r=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){ue(!1)}return ue(!!r&&-1!==(t||["active"]).indexOf(r)),r}var ve=262144;function me(e,t,r,n,o,c,l,h){var d=new ge(0,0);if(l?(d.current=l.current,d.total=l.total):(d.current=0,d.total=n.size()),n.size()!==d.total)throw new f("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.");var _=d.total-d.current,v=_;o>0&&(v=Math.min(v,o));var y=d.current,w=y+v,R={"X-Goog-Upload-Command":v===_?"upload, finalize":"upload","X-Goog-Upload-Offset":d.current},body=n.slice(y,w);if(null===body)throw m();var k=t.maxUploadRetryTime,O=new se(r,"POST",(function(e,text){var r,o=be(e,["active","final"]),l=d.current+v,h=n.size();return r="final"===o?ce(t,c)(e,text):null,new ge(l,h,"final"===o,r)}),k);return O.headers=R,O.body=body.uploadData(),O.progressCallback=h||null,O.errorHandler=he(e),O}var ye=function(e,t,r){if("function"==typeof e||null!=t||null!=r)this.next=e,this.error=t,this.complete=r;else{var n=e;this.next=n.next,this.error=n.error,this.complete=n.complete}};function we(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];Promise.resolve().then((function(){return e.apply(void 0,t)}))}}var Re=function(){function e(e,t,r){var n=this;void 0===r&&(r=null),this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=re(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=function(e){n._request=void 0,n._chunkMultiplier=1,e._codeEquals("canceled")?(n._needToFetchStatus=!0,n.completeTransitions_()):(n._error=e,n._transition("error"))},this._metadataErrorHandler=function(e){n._request=void 0,e._codeEquals("canceled")?n.completeTransitions_():(n._error=e,n._transition("error"))},this._promise=new Promise((function(e,t){n._resolve=e,n._reject=t,n._start()})),this._promise.then(null,(function(){}))}return e.prototype._makeProgressCallback=function(){var e=this,t=this._transferred;return function(r){return e._updateProgress(t+r)}},e.prototype._shouldDoResumable=function(e){return e.size()>262144},e.prototype._start=function(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this._continueUpload():this._oneShotUpload())},e.prototype._resolveToken=function(e){var t=this;this._ref.storage._getAuthToken().then((function(r){switch(t._state){case"running":e(r);break;case"canceling":t._transition("canceled");break;case"pausing":t._transition("paused")}}))},e.prototype._createResumable=function(){var e=this;this._resolveToken((function(t){var r=function(e,t,r,n,o){var c=t.bucketOnlyServerUrl(),l=_e(t,n,o),h={name:l.fullPath},f=X(c,e.host),d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":n.size(),"X-Goog-Upload-Header-Content-Type":l.contentType,"Content-Type":"application/json; charset=utf-8"},body=ie(l,r),_=e.maxUploadRetryTime,v=new se(f,"POST",(function(e){var t;be(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){ue(!1)}return ue(D(t)),t}),_);return v.urlParams=h,v.headers=d,v.body=body,v.errorHandler=he(t),v}(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),n=e._ref.storage._makeRequest(r,t);e._request=n,n.getPromise().then((function(t){e._request=void 0,e._uploadUrl=t,e._needToFetchStatus=!1,e.completeTransitions_()}),e._errorHandler)}))},e.prototype._fetchStatus=function(){var e=this,t=this._uploadUrl;this._resolveToken((function(r){var n=function(e,t,r,n){var o=e.maxUploadRetryTime,c=new se(r,"POST",(function(e){var t=be(e,["active","final"]),r=null;try{r=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){ue(!1)}r||ue(!1);var o=Number(r);return ue(!isNaN(o)),new ge(o,n.size(),"final"===t)}),o);return c.headers={"X-Goog-Upload-Command":"query"},c.errorHandler=he(t),c}(e._ref.storage,e._ref._location,t,e._blob),o=e._ref.storage._makeRequest(n,r);e._request=o,o.getPromise().then((function(t){t=t,e._request=void 0,e._updateProgress(t.current),e._needToFetchStatus=!1,t.finalized&&(e._needToFetchMetadata=!0),e.completeTransitions_()}),e._errorHandler)}))},e.prototype._continueUpload=function(){var e=this,t=ve*this._chunkMultiplier,r=new ge(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken((function(o){var c;try{c=me(e._ref._location,e._ref.storage,n,e._blob,t,e._mappings,r,e._makeProgressCallback())}catch(t){return e._error=t,void e._transition("error")}var l=e._ref.storage._makeRequest(c,o);e._request=l,l.getPromise().then((function(t){e._increaseMultiplier(),e._request=void 0,e._updateProgress(t.current),t.finalized?(e._metadata=t.metadata,e._transition("success")):e.completeTransitions_()}),e._errorHandler)}))},e.prototype._increaseMultiplier=function(){ve*this._chunkMultiplier<33554432&&(this._chunkMultiplier*=2)},e.prototype._fetchMetadata=function(){var e=this;this._resolveToken((function(t){var r=pe(e._ref.storage,e._ref._location,e._mappings),n=e._ref.storage._makeRequest(r,t);e._request=n,n.getPromise().then((function(t){e._request=void 0,e._metadata=t,e._transition("success")}),e._metadataErrorHandler)}))},e.prototype._oneShotUpload=function(){var e=this;this._resolveToken((function(t){var r=function(e,t,r,n,o){var c=t.bucketOnlyServerUrl(),l={"X-Goog-Upload-Protocol":"multipart"},h=function(){for(var e="",i=0;i<2;i++)e+=Math.random().toString().slice(2);return e}();l["Content-Type"]="multipart/related; boundary="+h;var f=_e(t,n,o),d="--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+ie(f,r)+"\r\n--"+h+"\r\nContent-Type: "+f.contentType+"\r\n\r\n",_="\r\n--"+h+"--",body=Z.getBlob(d,n,_);if(null===body)throw m();var v={name:f.fullPath},y=X(c,e.host),w=e.maxUploadRetryTime,R=new se(y,"POST",ce(e,r),w);return R.urlParams=v,R.headers=l,R.body=body.uploadData(),R.errorHandler=he(t),R}(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),n=e._ref.storage._makeRequest(r,t);e._request=n,n.getPromise().then((function(t){e._request=void 0,e._metadata=t,e._updateProgress(e._blob.size()),e._transition("success")}),e._errorHandler)}))},e.prototype._updateProgress=function(e){var t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()},e.prototype._transition=function(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request&&this._request.cancel();break;case"running":var t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=v(),this._state=e,this._notifyObservers();break;case"error":case"success":this._state=e,this._notifyObservers()}},e.prototype.completeTransitions_=function(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}},Object.defineProperty(e.prototype,"snapshot",{get:function(){var e=I(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}},enumerable:!1,configurable:!0}),e.prototype.on=function(e,t,r,n){var o=this,c=new ye(t,r,n);return this._addObserver(c),function(){o._removeObserver(c)}},e.prototype.then=function(e,t){return this._promise.then(e,t)},e.prototype.catch=function(e){return this.then(null,e)},e.prototype._addObserver=function(e){this._observers.push(e),this._notifyObserver(e)},e.prototype._removeObserver=function(e){var i=this._observers.indexOf(e);-1!==i&&this._observers.splice(i,1)},e.prototype._notifyObservers=function(){var e=this;this._finishPromise(),this._observers.slice().forEach((function(t){e._notifyObserver(t)}))},e.prototype._finishPromise=function(){if(void 0!==this._resolve){var e=!0;switch(I(this._state)){case A.SUCCESS:we(this._resolve.bind(null,this.snapshot))();break;case A.CANCELED:case A.ERROR:we(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}},e.prototype._notifyObserver=function(e){switch(I(this._state)){case A.RUNNING:case A.PAUSED:e.next&&we(e.next.bind(e,this.snapshot))();break;case A.SUCCESS:e.complete&&we(e.complete.bind(e))();break;case A.CANCELED:case A.ERROR:e.error&&we(e.error.bind(e,this._error))();break;default:e.error&&we(e.error.bind(e,this._error))()}},e.prototype.resume=function(){var e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e},e.prototype.pause=function(){var e="running"===this._state;return e&&this._transition("pausing"),e},e.prototype.cancel=function(){var e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e},e}(),ke=function(){function e(e,t){this._service=e,this._location=t instanceof B?t:B.makeFromUrl(t,e.host)}return e.prototype.toString=function(){return"gs://"+this._location.bucket+"/"+this._location.path},e.prototype._newRef=function(t,r){return new e(t,r)},Object.defineProperty(e.prototype,"root",{get:function(){var e=new B(this._location.bucket,"");return this._newRef(this._service,e)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this._location.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this._location.path},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return Y(this._location.path)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"storage",{get:function(){return this._service},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){var t=function(path){if(0===path.length)return null;var e=path.lastIndexOf("/");return-1===e?"":path.slice(0,e)}(this._location.path);if(null===t)return null;var r=new B(this._location.bucket,t);return new e(this._service,r)},enumerable:!1,configurable:!0}),e.prototype._throwIfRoot=function(e){if(""===this._location.path)throw R(e)},e}();function Oe(e){var t={prefixes:[],items:[]};return Te(e,t).then((function(){return t}))}function Te(e,t,r){return Object(o.b)(this,void 0,void 0,(function(){var n,c,l;return Object(o.d)(this,(function(o){switch(o.label){case 0:return[4,xe(e,{pageToken:r})];case 1:return n=o.sent(),(c=t.prefixes).push.apply(c,n.prefixes),(l=t.items).push.apply(l,n.items),null==n.nextPageToken?[3,3]:[4,Te(e,t,n.nextPageToken)];case 2:o.sent(),o.label=3;case 3:return[2]}}))}))}function xe(e,t){return Object(o.b)(this,void 0,void 0,(function(){var r,n,c;return Object(o.d)(this,(function(o){switch(o.label){case 0:return null!=t&&"number"==typeof t.maxResults&&F("options.maxResults",1,1e3,t.maxResults),[4,e.storage._getAuthToken()];case 1:return r=o.sent(),n=t||{},c=de(e.storage,e._location,"/",n.pageToken,n.maxResults),[2,e.storage._makeRequest(c,r).getPromise()]}}))}))}function Pe(e,t){return Object(o.b)(this,void 0,void 0,(function(){var r,n;return Object(o.d)(this,(function(o){switch(o.label){case 0:return e._throwIfRoot("updateMetadata"),[4,e.storage._getAuthToken()];case 1:return r=o.sent(),n=function(e,t,r,n){var o=X(t.fullServerUrl(),e.host),body=ie(r,n),c=e.maxOperationRetryTime,l=new se(o,"PATCH",ce(e,n),c);return l.headers={"Content-Type":"application/json; charset=utf-8"},l.body=body,l.errorHandler=fe(t),l}(e.storage,e._location,t,re()),[2,e.storage._makeRequest(n,r).getPromise()]}}))}))}function Ue(e){return Object(o.b)(this,void 0,void 0,(function(){var t,r;return Object(o.d)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("getDownloadURL"),[4,e.storage._getAuthToken()];case 1:return t=n.sent(),r=function(e,t,r){var n=X(t.fullServerUrl(),e.host),o=e.maxOperationRetryTime,c=new se(n,"GET",le(e,r),o);return c.errorHandler=fe(t),c}(e.storage,e._location,re()),[2,e.storage._makeRequest(r,t).getPromise().then((function(e){if(null===e)throw new f("no-download-url","The given file does not have any download URLs.");return e}))]}}))}))}function Se(e){return Object(o.b)(this,void 0,void 0,(function(){var t,r;return Object(o.d)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("deleteObject"),[4,e.storage._getAuthToken()];case 1:return t=n.sent(),r=function(e,t){var r=X(t.fullServerUrl(),e.host),n=e.maxOperationRetryTime,o=new se(r,"DELETE",(function(e,t){}),n);return o.successCodes=[200,204],o.errorHandler=fe(t),o}(e.storage,e._location),[2,e.storage._makeRequest(r,t).getPromise()]}}))}))}function Ce(e,t){var r=function(path,e){var t=e.split("/").filter((function(component){return component.length>0})).join("/");return 0===path.length?t:path+"/"+t}(e._location.path,t),n=new B(e._location.bucket,r);return new ke(e.storage,n)}function je(path){return/^[A-Za-z]+:\/\//.test(path)}function Ee(e,path){if(e instanceof qe){var t=e;if(null==t._bucket)throw new f("no-default-bucket","No default bucket found. Did you set the 'storageBucket' property when initializing the app?");var r=new ke(t,t._bucket);return null!=path?Ee(r,path):r}if(void 0!==path){if(path.includes(".."))throw y('`path` param cannot contain ".."');return Ce(e,path)}return e}function Ae(e,t){if(t&&je(t)){if(e instanceof qe)return new ke(e,t);throw y("To use ref(service, url), the first argument must be a Storage instance.")}return Ee(e,t)}function Ie(e,t){var r=null==t?void 0:t.storageBucket;return null==r?null:B.makeFromBucketSpec(r,e)}var qe=function(){function e(e,t,r,n,o){this.app=e,this._authProvider=t,this._pool=r,this._url=n,this._firebaseVersion=o,this._bucket=null,this._host=h,this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=n?B.makeFromBucketSpec(n,this._host):Ie(this._host,this.app.options)}return Object.defineProperty(e.prototype,"host",{get:function(){return this._host},set:function(e){this._host=e,null!=this._url?this._bucket=B.makeFromBucketSpec(this._url,e):this._bucket=Ie(e,this.app.options)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this._maxUploadRetryTime},set:function(time){F("time",0,Number.POSITIVE_INFINITY,time),this._maxUploadRetryTime=time},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxOperationRetryTime",{get:function(){return this._maxOperationRetryTime},set:function(time){F("time",0,Number.POSITIVE_INFINITY,time),this._maxOperationRetryTime=time},enumerable:!1,configurable:!0}),e.prototype._getAuthToken=function(){return Object(o.b)(this,void 0,void 0,(function(){var e,t;return Object(o.d)(this,(function(r){switch(r.label){case 0:return(e=this._authProvider.getImmediate({optional:!0}))?[4,e.getToken()]:[3,2];case 1:if(null!==(t=r.sent()))return[2,t.accessToken];r.label=2;case 2:return[2,null]}}))}))},e.prototype._delete=function(){return this._deleted=!0,this._requests.forEach((function(e){return e.cancel()})),this._requests.clear(),Promise.resolve()},e.prototype._makeStorageReference=function(e){return new ke(this,e)},e.prototype._makeRequest=function(e,t){var r=this;if(this._deleted)return new M(w());var n=function(e,t,r,n,o){var c=G(e.urlParams),l=e.url+c,h=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(h,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(h,r),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(null!=t?t:"AppManager")}(h,o),new W(l,e.method,h,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,n)}(e,this._appId,t,this._pool,this._firebaseVersion);return this._requests.add(n),n.getPromise().then((function(){return r._requests.delete(n)}),(function(){return r._requests.delete(n)})),n},e}();function Le(e,data,t){return function(e,data,t){return e._throwIfRoot("uploadBytesResumable"),new Re(e,new Z(data),t)}(e=Object(c.p)(e),data,t)}function Ne(e){return function(e){return Object(o.b)(this,void 0,void 0,(function(){var t,r;return Object(o.d)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("getMetadata"),[4,e.storage._getAuthToken()];case 1:return t=n.sent(),r=pe(e.storage,e._location,re()),[2,e.storage._makeRequest(r,t).getPromise()]}}))}))}(e=Object(c.p)(e))}function Be(e,t){return Ae(e=Object(c.p)(e),t)}var Me,De,ze=function(){function e(e,t,r){this._delegate=e,this.task=t,this.ref=r}return Object.defineProperty(e.prototype,"bytesTransferred",{get:function(){return this._delegate.bytesTransferred},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"metadata",{get:function(){return this._delegate.metadata},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this._delegate.state},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"totalBytes",{get:function(){return this._delegate.totalBytes},enumerable:!1,configurable:!0}),e}(),He=function(){function e(e,t){this._delegate=e,this._ref=t,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate)}return Object.defineProperty(e.prototype,"snapshot",{get:function(){return new ze(this._delegate.snapshot,this,this._ref)},enumerable:!1,configurable:!0}),e.prototype.then=function(e,t){var r=this;return this._delegate.then((function(t){if(e)return e(new ze(t,r,r._ref))}),t)},e.prototype.on=function(e,t,r,n){var o=this,c=void 0;return t&&(c="function"==typeof t?function(e){return t(new ze(e,o,o._ref))}:{next:t.next?function(e){return t.next(new ze(e,o,o._ref))}:void 0,complete:t.complete||void 0,error:t.error||void 0}),this._delegate.on(e,c,r||void 0,n||void 0)},e}(),Fe=function(){function e(e,t){this._delegate=e,this._service=t}return Object.defineProperty(e.prototype,"prefixes",{get:function(){var e=this;return this._delegate.prefixes.map((function(t){return new Xe(t,e._service)}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"items",{get:function(){var e=this;return this._delegate.items.map((function(t){return new Xe(t,e._service)}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"nextPageToken",{get:function(){return this._delegate.nextPageToken||null},enumerable:!1,configurable:!0}),e}(),Xe=function(){function e(e,t){this._delegate=e,this.storage=t}return Object.defineProperty(e.prototype,"name",{get:function(){return this._delegate.name},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this._delegate.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this._delegate.fullPath},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return this._delegate.toString()},e.prototype.child=function(t){return new e(function(e,t){return Ce(e,t)}(this._delegate,t),this.storage)},Object.defineProperty(e.prototype,"root",{get:function(){return new e(this._delegate.root,this.storage)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){var t=this._delegate.parent;return null==t?null:new e(t,this.storage)},enumerable:!1,configurable:!0}),e.prototype.put=function(data,e){return this._throwIfRoot("put"),new He(Le(this._delegate,data,e),this)},e.prototype.putString=function(e,t,r){void 0===t&&(t=T.RAW),this._throwIfRoot("putString");var data=P(t,e),n=Object(o.a)({},r);return null==n.contentType&&null!=data.contentType&&(n.contentType=data.contentType),new He(new Re(this._delegate,new Z(data.data,!0),n),this)},e.prototype.listAll=function(){var e,t=this;return(e=this._delegate,Oe(e=Object(c.p)(e))).then((function(e){return new Fe(e,t.storage)}))},e.prototype.list=function(e){var t=this;return function(e,t){return xe(e=Object(c.p)(e),t)}(this._delegate,e||void 0).then((function(e){return new Fe(e,t.storage)}))},e.prototype.getMetadata=function(){return Ne(this._delegate)},e.prototype.updateMetadata=function(e){return function(e,t){return Pe(e=Object(c.p)(e),t)}(this._delegate,e)},e.prototype.getDownloadURL=function(){return e=this._delegate,Ue(e=Object(c.p)(e));var e},e.prototype.delete=function(){return this._throwIfRoot("delete"),e=this._delegate,Se(e=Object(c.p)(e));var e},e.prototype._throwIfRoot=function(e){if(""===this._delegate._location.path)throw R(e)},e}(),Ge=function(){function e(e,t){var r=this;this.app=e,this._delegate=t,this.INTERNAL={delete:function(){return r._delegate._delete()}}}return Object.defineProperty(e.prototype,"maxOperationRetryTime",{get:function(){return this._delegate.maxOperationRetryTime},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this._delegate.maxUploadRetryTime},enumerable:!1,configurable:!0}),e.prototype.ref=function(path){if(je(path))throw y("ref() expected a child path but got a URL, use refFromURL instead.");return new Xe(Be(this._delegate,path),this)},e.prototype.refFromURL=function(e){if(!je(e))throw y("refFromURL() expected a full URL but got a child path, use ref() instead.");try{B.makeFromUrl(e,this._delegate.host)}catch(e){throw y("refFromUrl() expected a valid full URL but got an invalid one.")}return new Xe(Be(this._delegate,e),this)},e.prototype.setMaxUploadRetryTime=function(time){this._delegate.maxUploadRetryTime=time},e.prototype.setMaxOperationRetryTime=function(time){this._delegate.maxOperationRetryTime=time},e.prototype.useEmulator=function(e,t){!function(e,t,r){e.host="http://"+t+":"+r}(this._delegate,e,t)},e}();function We(e,t){var r=t.instanceIdentifier,o=e.getProvider("app").getImmediate(),c=e.getProvider("auth-internal");return new Ge(o,new qe(o,c,new N,r,n.a.SDK_VERSION))}Me=n.a,De={TaskState:A,TaskEvent:E,StringFormat:T,Storage:qe,Reference:Xe},Me.INTERNAL.registerComponent(new l.a("storage",We,"PUBLIC").setServiceProps(De).setMultipleInstances(!0)),Me.registerVersion("@firebase/storage","0.5.0")}}]);