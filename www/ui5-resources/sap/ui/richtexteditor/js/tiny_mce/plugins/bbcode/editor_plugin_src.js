(function(){tinymce.create('tinymce.plugins.BBCodePlugin',{init:function(e,u){var t=this,d=e.getParam('bbcode_dialect','punbb').toLowerCase();e.onBeforeSetContent.add(function(e,o){o.content=t['_'+d+'_bbcode2html'](o.content);});e.onPostProcess.add(function(e,o){if(o.set)o.content=t['_'+d+'_bbcode2html'](o.content);if(o.get)o.content=t['_'+d+'_html2bbcode'](o.content);});},getInfo:function(){return{longname:'BBCode Plugin',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/bbcode',version:tinymce.majorVersion+"."+tinymce.minorVersion};},_punbb_html2bbcode:function(s){s=tinymce.trim(s);function r(a,b){s=s.replace(a,b);};r(/<a.*?href=\"(.*?)\".*?>(.*?)<\/a>/gi,"[url=$1]$2[/url]");r(/<font.*?color=\"(.*?)\".*?class=\"codeStyle\".*?>(.*?)<\/font>/gi,"[code][color=$1]$2[/color][/code]");r(/<font.*?color=\"(.*?)\".*?class=\"quoteStyle\".*?>(.*?)<\/font>/gi,"[quote][color=$1]$2[/color][/quote]");r(/<font.*?class=\"codeStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi,"[code][color=$1]$2[/color][/code]");r(/<font.*?class=\"quoteStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi,"[quote][color=$1]$2[/color][/quote]");r(/<span style=\"color: ?(.*?);\">(.*?)<\/span>/gi,"[color=$1]$2[/color]");r(/<font.*?color=\"(.*?)\".*?>(.*?)<\/font>/gi,"[color=$1]$2[/color]");r(/<span style=\"font-size:(.*?);\">(.*?)<\/span>/gi,"[size=$1]$2[/size]");r(/<font>(.*?)<\/font>/gi,"$1");r(/<img.*?src=\"(.*?)\".*?\/>/gi,"[img]$1[/img]");r(/<span class=\"codeStyle\">(.*?)<\/span>/gi,"[code]$1[/code]");r(/<span class=\"quoteStyle\">(.*?)<\/span>/gi,"[quote]$1[/quote]");r(/<strong class=\"codeStyle\">(.*?)<\/strong>/gi,"[code][b]$1[/b][/code]");r(/<strong class=\"quoteStyle\">(.*?)<\/strong>/gi,"[quote][b]$1[/b][/quote]");r(/<em class=\"codeStyle\">(.*?)<\/em>/gi,"[code][i]$1[/i][/code]");r(/<em class=\"quoteStyle\">(.*?)<\/em>/gi,"[quote][i]$1[/i][/quote]");r(/<u class=\"codeStyle\">(.*?)<\/u>/gi,"[code][u]$1[/u][/code]");r(/<u class=\"quoteStyle\">(.*?)<\/u>/gi,"[quote][u]$1[/u][/quote]");r(/<\/(strong|b)>/gi,"[/b]");r(/<(strong|b)>/gi,"[b]");r(/<\/(em|i)>/gi,"[/i]");r(/<(em|i)>/gi,"[i]");r(/<\/u>/gi,"[/u]");r(/<span style=\"text-decoration: ?underline;\">(.*?)<\/span>/gi,"[u]$1[/u]");r(/<u>/gi,"[u]");r(/<blockquote[^>]*>/gi,"[quote]");r(/<\/blockquote>/gi,"[/quote]");r(/<br \/>/gi,"\n");r(/<br\/>/gi,"\n");r(/<br>/gi,"\n");r(/<p>/gi,"");r(/<\/p>/gi,"\n");r(/&nbsp;|\u00a0/gi," ");r(/&quot;/gi,"\"");r(/&lt;/gi,"<");r(/&gt;/gi,">");r(/&amp;/gi,"&");return s;},_punbb_bbcode2html:function(s){s=tinymce.trim(s);function r(a,b){s=s.replace(a,b);};r(/\n/gi,"<br />");r(/\[b\]/gi,"<strong>");r(/\[\/b\]/gi,"</strong>");r(/\[i\]/gi,"<em>");r(/\[\/i\]/gi,"</em>");r(/\[u\]/gi,"<u>");r(/\[\/u\]/gi,"</u>");r(/\[url=([^\]]+)\](.*?)\[\/url\]/gi,"<a href=\"$1\">$2</a>");r(/\[url\](.*?)\[\/url\]/gi,"<a href=\"$1\">$1</a>");r(/\[img\](.*?)\[\/img\]/gi,"<img src=\"$1\" />");r(/\[color=(.*?)\](.*?)\[\/color\]/gi,"<font color=\"$1\">$2</font>");r(/\[code\](.*?)\[\/code\]/gi,"<span class=\"codeStyle\">$1</span>&nbsp;");r(/\[quote.*?\](.*?)\[\/quote\]/gi,"<span class=\"quoteStyle\">$1</span>&nbsp;");return s;}});tinymce.PluginManager.add('bbcode',tinymce.plugins.BBCodePlugin);})();
