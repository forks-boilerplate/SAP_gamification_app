sinaDefine(['./SinaObject'],function(S){"use strict";return S.derive({_meta:{properties:{targetUrl:{required:true},label:{required:true},target:{required:false}}},performNavigation:function(p){p=p||{};var t=p.trackingOnly||false;if(!t){if(this.target){window.open(this.targetUrl,this.target);}else{window.open(this.targetUrl);}}},isEqualTo:function(o){if(!o){return false;}return this.targetUrl==o.targetUrl;}});});
