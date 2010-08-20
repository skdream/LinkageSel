/**
 * javascript Infinite Level Linkage Select
 * javascript 无限级联动多功能菜单
 * 
 * Version 1.2 (2010-08-26)
 * @requires jQuery v1.3.2 or later
 *
 * Examples at: http://linkagesel.xiaozhong.biz
 * @Author waiting@xiaozhong.biz
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;var LinkageSel=function(c){var d=this;this.bindEls=[];this.data={'0':{'name':'root',val:0,cell:{}}};this.recycle=[],this.st={ie6:false,url:'',ajax:'',autoBind:true,autoHide:true,hideWidth:true,autoLink:true,defVal:[],data:null,head:'请选择',level:20,loaderImg:'images/ui-anim_basic_16x16.gif',root:[],minWidth:120,maxWidth:300,fixWidth:0,select:[],selClass:'',selStyle:'margin-left: 1px;',onChange:false,trigger:true,triggerValues:[],err:false};if(c&&typeof c==='object'){jQuery.extend(this.st,c)}if(jQuery.browser.msie&&jQuery.browser.version=='6.0'){st.ie6=true}this.data[0].cell=this.st.data;this.innerCallback=this.st.onChange;this.st.onChange=false;var e=jQuery('#linkagesel_loader');if(!e||!e[0]){jQuery(document.body).append('<img id="linkagesel_loader" style="display: none; position: absolute;"  src="'+this.st.loaderImg||'ui-anim_basic_16x16.gif'+'" />');this.loader=jQuery('#linkagesel_loader')||null}else{this.loader=e}if(typeof this.st.select==='string'){this.st.select=[this.st.select]}else if(!isArray(this.st.select)){this.st.select=[]}if(isNumber(this.st.defVal)){this.st.defVal=[this.st.defVal]}else if(!isArray(this.st.defVal)){this.st.defVal=[]}if(isNumber(this.st.root)||!isNaN(+this.st.root)){this.st.root=[this.st.root]}else if(!isArray(this.st.root)){this.st.root=[]}var f=this.st.select.length;if(f<1){alert('没有对象被绑定到mLinkageSel()!');return false}for(var i=0;i<f;i++){this.bind((this.st.select)[i])}f=c=e=null;this.clean(0);this.fill(0,this.st.defVal[0]);this.outer={changeValues:function(a,b){d._changeValues(a,b);return this},getSelectedValue:function(a){return d._getSelectedValue(a)},getSelectedArr:function(){return d._getSelectedArr()},getSelectedData:function(a,b){return d._getSelectedData(a,b)},getSelectedDataArr:function(a){return d._getSelectedDataArr(a)},onChange:function(a){if(a&&typeof a==='function'){d.st.onChange=a}return this},reset:function(){d._reset();return this},resetAll:function(){d._reset(true);return this}};return this.outer};LinkageSel.prototype.bind=function(b){var c=this,st=this.st,bindEls=this.bindEls,bindIdx=bindEls.length||0,defValue=st.defVal&&st.defVal[bindIdx]||null,elm;if(!b){return false}if(typeof b==='string'){elm=jQuery(b).eq(0)}else if(typeof b==='object'){elm=b.jquery?b.eq(0):jQuery(b).eq(0)}if(!elm[0]||!elm.is('select')){return false}bindEls.push({obj:elm,value:defValue,defValue:defValue});elm.data('bindIdx',bindIdx).change(function(e){var a=c.st,bindEls=c,bindIdx=jQuery(this).data('bindIdx'),nextEl=bindEls[bindIdx+1]&&bindEls[bindIdx+1].obj||null,defVal=null;if(!nextEl||!nextEl.find('option').length){defVal=a.defVal&&a.defVal[bindIdx+1]||null}c.clean(bindIdx);c.fill(bindIdx+1,defVal);a=bindEls=nextEl=defVal=null});if(elm.is(':visible')){this.setWidth(elm)}st=bindEls=bindIdx=defValue=elm=null;return true};LinkageSel.prototype.creatSel=function(a,b){var c=this.st,bindEls=this.bindEls,str='';if(a<=0){return false}if(a>=c.level){this.custCallback();return false}var d='linkagesel_'+(+new Date()),str='<select id="'+d+'" style="display: none;'+c.selStyle+'" class="'+c.selClass+'" ></select>',elm=bindEls[a-1].obj.after(str);c.select.push(['#'+d]);this.bind('#'+d);if(typeof b==='function'){b(a,this)}return true};LinkageSel.prototype.fill=function(d,e){var f=this.bindEls,st=this.st,head=st.head,data=this.getData(d),arr=[],bindEl,elm,row,recycle=this.recycle,recycleLen=recycle.length||0;this.setLoader(false);if(d>=st.level){this.custCallback();return false}if(st.triggerValues.length){e=st.triggerValues[d]||null}else{e=typeof e!=='undefined'&&e!==''?e:null}if(d>0&&(f[d-1].value===null||f[d-1].value==='')){bindEl=f[d]||{};elm=bindEl['obj'];if(elm&&elm[0]&&st.autoHide){st.hideWidth&&elm.hide()||elm.css('visibility','hidden')}st=f=data=null;return false}if(data===false){this.clean(d-1);this.custCallback();this.resetTrigger(true);return false}else if(data===null){if(st.url||st.ajax){this.setLoader(true,d);this.getRemoteData(d-1,function(a,b){var c=b.bindEls[a]&&b.bindEls[a].defValue;b.fill(a,c)})}else{this.custCallback();this.resetTrigger(true)}st=f=null;return false}else if(data&&typeof data==='object'){if(f.length-1<d){this.creatSel(d)}bindEl=f[d]||{};elm=bindEl.obj;if(!elm||!elm[0]){return false}if(head||typeof head==='string'){head='<option value="">'+head+'</option>'}var g,tarr=[];var h=1,selectedIdx=0;for(var x in data){if(!data.hasOwnProperty(x)){continue}row=data[x];if(recycleLen>0){g=recycle.pop();if(typeof g==='object'){jQuery(g).val(x).text(row.name).removeAttr('selected');tarr.push(g)}else{tarr.add(jQuery('<option value="'+x+"'>"+row.name+'</option>'))}recycleLen--}else{arr.push('<option value="',x,'"');arr.push('>',row.name,'</option>')}if(e!==null&&e==x){selectedIdx=h}h++}row=null;if(st.autoLink&&h===2){bindEl.value=x;elm.append(tarr).append(arr.join('')).show().css('visibility','');setTimeout(function(){elm.change();elm=null},0)}else{elm.append(head).append(tarr).append(arr.join('')).css('visibility','').show();if(e){setTimeout(function(){elm.change();elm=null},0)}if(d){this.custCallback()}}tarr=arr=recycle=null;if(st.ie6){setTimeout(function(){elm[0].options[selectedIdx].selected=true;elm=null},0)}else{elm[0].options[selectedIdx].selected=true}this.setWidth(elm)}st=f=data=bindEl=null};LinkageSel.prototype.findEntry=function(a){var b=this.st.root,len=b&&b.length||0;if(a&&len){for(var i=0;i<len;i++){if(!b[i]||!a[b[i]]||!a[b[i]].cell){break}else{a=a[b[i]].cell}}}return a};LinkageSel.prototype.getData=function(a){var b=this.st,bindEls=this.bindEls,data=this.data[0].cell,len=bindEls.length,pValue,key;if(typeof a==='undefined'||a>=b.level){return false}if(a==-1){return this.data}data=this.findEntry(data);for(var i=0;i<=a;i++){if(i>0){pValue=bindEls[i-1].value;if(pValue&&data&&data[pValue]){if(data[pValue].cell===false){data=false}else{data=data[pValue].cell||null}}else{data=false;break}}}b=bindEls=null;return data};LinkageSel.prototype.getRemoteData=function(b,c){var d=this,st=this.st,bindEls=this.bindEls,bindValue=b>=0?bindEls[b].value:0,data,dv,cell;if(b>=st.level){return false}data=this.getData(b);dv=data[bindValue];if(!dv||typeof dv!=='object'||dv.cell===false){this.setLoader(false);this.custCallback();this.resetTrigger(true);return false}var e=0;for(var x in data){if(+x>0){e++;break}}if(st.ajax){jQuery.ajax({cache:false,type:'GET',dataType:'json',mode:'abort',url:st.ajax,data:{id:bindValue},context:d,success:function(a){d.setLoader(false);if(a&&typeof a==='object'&&!isArray(a)){dv.cell=a;c(b+1,d)}else{if(dv.cell===null){dv.cell=false}else{dv.cell=null}d.custCallback();d.resetTrigger(true)}},complete:function(){d.setLoader(false)}})}else if(st.url){jQuery.getJSON(st.url,function(a){d.setLoader(false);if(a&&typeof a==='object'&&!isArray(a)){dv.cell=a;st.url='';c(b+1,d)}else{if(dv.cell===null){dv.cell=false}else{dv.cell=null;st.url=''}d.custCallback()}})}};LinkageSel.prototype._reset=function(a){var b=this.st,bindEls=this.bindEls,bindEl=bindEls[0]||{},elm=bindEl.obj||null,defValue=bindEl.defValue;if(elm){this.clean(0);if(defValue){elm.find("option[value='"+defValue+"']").eq(0).attr('selected',true);elm.change()}else{elm.attr('selectedIndex',0).change()}if(a){this.data[0].cell=b.data;this.clean(0);this.fill(0,b.select[0][1])}}b=bindEls=bindEl=elm=null};LinkageSel.prototype.clean=function(a){var b=this.st,bindEls=this.bindEls||[],len=bindEls.length,bindEl,elm,recycle=this.recycle,topt;if(a<0){return false}if(!len||a>=b.level){this.custCallback();return false}for(var i=len-1;i>a;i--){bindEl=bindEls[i]||{};elm=bindEl.obj;if(elm[0]&&elm.length){elm.scrollTop(0);topt=elm.children();topt.remove();topt.length&&(jQuery.merge(recycle,topt.toArray()));if(b.autoHide){b.hideWidth&&elm.hide()||elm.css('visibility','hidden')}if(b.fixWidth){elm.width(b.fixWidth)}else if(b.minWidth){elm.width(b.minWidth)}bindEl.value=''}}bindEls[a]&&bindEls[a].obj&&(bindEls[a].value=bindEls[a].obj.val());b=bindEls=bindEl=elm=topt=null;return true};LinkageSel.prototype.calcWidth=function(n){var a=this.st,fixW=+a.fixWidth,minW=+a.minWidth,maxW=+a.maxWidth;if(minW>0&&maxW>0){minW=Math.min(minW,maxW);maxW=Math.max(minW,maxW)}if(fixW>0){n=fixW}else if(minW>0&&n<minW){n=minW}else if(maxW>0&&n>maxW){n=maxW}else{n=-1}a=null;return n<0?false:n};LinkageSel.prototype.setWidth=function(a){if(!a||!a[0]){return false}var w=this.calcWidth(a.width());if(w===false){a.width('')}else{a.width(w)}};LinkageSel.prototype.setLoader=function(a,b){if(a&&this.loader){var c=this.bindEls,elm,offset,tmp,width;if(!c){return}for(var i=c.length-1;i>=b;i--){tmp=c[i]&&c[i].obj;if(tmp&&tmp.is(':visible')){elm=tmp;break}}if(!elm){elm=c[b-1].obj}if(elm.is(':visible')){offset=elm.offset();width=elm.width();this.loader.offset({top:(offset.top+1),left:(offset.left+width+3)}).show()}}else{this.loader&&this.loader.hide()}c=elm=tmp=null};LinkageSel.prototype.custCallback=function(){var a=this.st;if(!a.trigger){return}if(this.innerCallback&&typeof this.innerCallback==='function'){this.innerCallback(this)}if(a.onChange&&typeof a.onChange==='function'){a.onChange.apply(this.outer)}};LinkageSel.prototype._getSelectedArr=function(n){var a=this.st,bindEls=this.bindEls,len=bindEls.length,elm,value,arr=[];if(!len||n>len){return null}n=+n-1;if(!n){for(var i=0;i<len;i++){elm=bindEls[i]&&bindEls[i].obj;if(elm&&elm[0]){arr.push(elm.val())}else{arr=null;a.err='_getSelectedArr: !elm';break}}}else{elm=bindEls[i]&&bindEls[i].obj;value=elm&&elm[0]&&elm.val()}a=bindEls=elm=null;return(arr&&arr.length>0)?arr:null};LinkageSel.prototype._getSelectedValue=function(a){var b=this._getSelectedArr(a),len=b.length,value=null,v;if(!b||!len){return null}if(!a){for(var i=0;i<len;i++){v=b[i];if(v||v===0||v==='0'){value=v}else{break}}}else{value=b[a]}return value};LinkageSel.prototype._getSelectedData=function(a,b){var c={},bindEls=this.bindEls,data=this.data[0].cell,dc,len,pos,valueArr,value;if(b&&isNaN(b)||b<0){return null}valueArr=this._getSelectedArr();data=this.findEntry(data);len=valueArr.length;pos=b==null||b===''?len:b+1;if(!len||!data||pos===null){return null}for(var i=0;i<pos;i++){value=valueArr[i];if(value!==''&&value!=null){if(data[value]){dc=data[value];data=data[value].cell}else{dc=null;break}}else if(b>=0){dc=null;break}else{break}}data=null;if(dc===null){c=null}else{for(var x in dc){if(dc.hasOwnProperty(x)&&x!=='cell'){c[x]=dc[x]}}c=a?c[a]:c}dc=bindEls=valueArr=null;return c};LinkageSel.prototype._getSelectedDataArr=function(a){var b=this.bindEls,len=b.length,data,res=[];if(!len){return null}for(var i=0;i<len;i++){data=this._getSelectedData(a,i);if(data==null){break}res[i]=data}data=b=null;return res};LinkageSel.prototype._changeValues=function(a,b,c){if(c&&typeof c==='object'){var d=c}else{var d=this}var e=d.st,triggerValues=e.triggerValues,bindEls=d.bindEls,len=Math.min(bindEls.length,a.length),v=[],elm;b=b?b:false;if(isNumber(a)||typeof a==='string'){a=[a]}else if(isArray(a)){a=a}else{a=[]}d.resetTrigger(b,a);for(var i=0;i<len;i++){elm=bindEls[i]['obj'];if(elm.val()!==a[i]){elm&&elm.find("option[value='"+a[i]+"']").eq(0).attr('selected',true);break}}elm.change()};LinkageSel.prototype.resetTrigger=function(a,b){var c=this.st;a=a||typeof a==='undefined'?a:false;b=isArray(b)?b:(typeof b==='undefined'?[]:[b]);c.triggerValues=b;c.trigger=a};var isArray=function(v){return Object.prototype.toString.apply(v)==='[object Array]'};var isNumber=function(o){return typeof o==='number'&&isFinite(o)};(function($){var c=$.ajax;var d={};$.ajax=function(a){a=$.extend(a,$.extend({},$.ajaxSettings,a));var b=a.port;if(a.mode=="abort"){if(d[b]){d[b].abort()}return(d[b]=c.apply(this,arguments))}return c.apply(this,arguments)}})(jQuery);
