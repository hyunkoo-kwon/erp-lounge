/* ERP 라운지 실습앱 공통: 단계 머리 · IMG 설정 박스 · 이전/다음 */
(function(){
var css=`.chh{border-left:4px solid #0A6ED1;background:#EBF5FE;border-radius:0 10px 10px 0;padding:12px 16px;margin-bottom:18px}
.chh .chn{display:inline-block;font-size:12px;font-weight:700;color:#fff;background:#0A6ED1;border-radius:20px;padding:1px 10px;margin-right:8px}
.chh b{font-size:18px;color:#1D2D3E}.chh p{margin:4px 0 0;color:#556B82;font-size:14px}
.imgbox{margin-top:28px;border:1px solid #B0D4F7;border-radius:12px;overflow:hidden;background:#fff}
.imgh{display:flex;justify-content:space-between;align-items:center;gap:10px;background:#EBF5FE;padding:12px 16px}
.imgh b{font-size:16px;color:#1D2D3E}
.imgt{display:inline-block;font-size:12px;font-weight:700;background:#0854A0;color:#fff;border-radius:4px;padding:1px 8px;margin-right:8px}
.imgn{font-size:13px;font-weight:700;color:#0854A0}
.imgl{list-style:none;margin:0;padding:6px 12px 4px}
.imgl li{display:flex;gap:12px;padding:12px 4px;border-bottom:1px solid #D9DEE3}.imgl li:last-child{border-bottom:0}
.imgl li.ok{background:#F6FBF8}
.ick{position:relative;flex:none;cursor:pointer}
.ick input{position:absolute;opacity:0;width:30px;height:30px;margin:0;cursor:pointer}
.ick span{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#EBF5FE;color:#0854A0;font-weight:700;font-size:13px}
.imgl li.ok .ick span{background:#107E3E;color:#fff;font-size:0}.imgl li.ok .ick span::after{content:"✓";font-size:15px}
.ick input:focus-visible+span{outline:2px solid #0A6ED1;outline-offset:2px}
.ib{flex:1;min-width:0}.ihd{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}.ihd b{font-size:15px}
.ihd .itc{flex:none;max-width:55%;text-align:right;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;font-weight:700;background:#EBF5FE;color:#0854A0;border-radius:4px;padding:1px 7px}
.iex{font-size:14px;margin-top:3px}.iex em{font-style:normal;font-size:11.5px;font-weight:700;color:#107E3E;background:#F1FDF6;border-radius:4px;padding:1px 6px;margin-right:6px}
.iwhy{font-size:13.5px;color:#556B82;margin-top:2px}
.ib details{margin-top:4px}.ib summary{cursor:pointer;font-size:12.5px;font-weight:700;color:#0854A0}
.ipath{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;background:#F5F6F7;border-radius:6px;padding:7px 9px;margin-top:4px;word-break:break-word}
.inote{font-size:12.5px;color:#556B82;padding:8px 16px 12px}
.pn{display:flex;justify-content:space-between;gap:8px;margin-top:24px}.pn a{text-decoration:none}
.ck-btn{display:inline-block;border:1px solid #0A6ED1;background:#fff;color:#0A6ED1;border-radius:8px;padding:8px 14px;font-weight:700;font-size:14px}
.ck-btn.pri{background:#0A6ED1;color:#fff}
.road{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.rd{display:block;text-decoration:none;color:#1D2D3E;border:1px solid #D9DEE3;border-left:3px solid #0A6ED1;border-radius:8px;padding:10px 12px;background:#fff;text-align:left;font:inherit;cursor:pointer;width:100%}
.rd:hover{background:#EBF5FE}
.rd span{font-size:12px;font-weight:700;color:#0A6ED1}.rd b{display:block;font-size:15px}.rd small{display:block;color:#556B82;font-size:12.5px}
.rd em{font-style:normal;font-size:11.5px;font-weight:700;color:#0854A0;background:#EBF5FE;border-radius:4px;padding:1px 6px;display:inline-block;margin-top:4px}
.ck-intro .grid3{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.ck-intro .c{border:1px solid #D9DEE3;border-radius:10px;padding:14px 16px}
.ck-intro .c h4{margin:0 0 6px;font-size:15px}.ck-intro .c p{margin:0;color:#556B82;font-size:14px}
.ck-intro table{border-collapse:collapse;width:100%;font-size:14px}.ck-intro th{background:#4E6A87;color:#fff;text-align:left;padding:8px 10px}
.ck-intro td{border-bottom:1px solid #D9DEE3;padding:8px 10px;vertical-align:top}.ck-intro .tw{overflow-x:auto;border:1px solid #D9DEE3;border-radius:10px}
.ck-intro h3{font-size:16px;margin:22px 0 8px}.ck-note{font-size:13px;color:#556B82}`;
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var K=null,DONE={};
window.CK={
 init:function(key){K=key;try{DONE=JSON.parse(localStorage.getItem(K)||"{}")}catch(e){DONE={}}
  document.addEventListener("change",function(e){var k=e.target.dataset&&e.target.dataset.img;if(!k)return;if(e.target.checked)DONE[k]=1;else delete DONE[k];try{localStorage.setItem(K,JSON.stringify(DONE))}catch(err){}
   var li=e.target.closest("li");if(li)li.classList.toggle("ok",e.target.checked);var box=e.target.closest(".imgbox");if(box){var n=box.querySelectorAll("input:checked").length;box.querySelector(".imgn").textContent=n+" / "+box.querySelectorAll("input").length}});},
 img:function(k,L){if(!L||!L.length)return"";var n=L.filter(function(_,i){return DONE[k+i]}).length;
  return '<div class="imgbox"><div class="imgh"><div><span class="imgt">IMG 설정</span><b>이 단계를 SAP에 구현하기</b></div><span class="imgn">'+n+' / '+L.length+'</span></div><ol class="imgl">'+
  L.map(function(s,i){return '<li class="'+(DONE[k+i]?"ok":"")+'"><label class="ick"><input type="checkbox" data-img="'+k+i+'"'+(DONE[k+i]?" checked":"")+'><span>'+(i+1)+'</span></label><div class="ib"><div class="ihd"><b>'+esc(s[0])+'</b>'+(s[1]?'<span class="itc">'+esc(s[1])+'</span>':'')+'</div><div class="iex"><em>설정 예시</em>'+esc(s[3])+'</div><div class="iwhy">'+esc(s[4])+'</div><details><summary>SPRO 경로</summary><div class="ipath">'+(s[2].charAt(0)==="("?"":"SPRO &gt; ")+esc(s[2])+'</div></details></div></li>'}).join("")+
  '</ol><div class="inote">경로는 S/4HANA 온프레미스 기준이며 릴리스마다 조금 다릅니다. 실습 시스템에서 설정했다면 체크하세요.</div></div>'},
 wrap:function(CH,IMG,k,inner){var c=null,i=-1;CH.forEach(function(x,j){if(x.k===k){c=x;i=j}});if(!c)return inner;var pv=CH[i-1],nx=CH[i+1];
  var head=c.n?'<div class="chh"><span class="chn">'+(c.n==="+"?"심화":"STEP "+c.n)+'</span><b>'+esc(c.t)+'</b>'+(c.lead?'<p>'+esc(c.lead)+'</p>':'')+'</div>':'';
  return head+inner+this.img(k,IMG[k])+'<div class="pn">'+(pv?'<a href="#'+pv.k+'" class="ck-btn">← '+esc(pv.t)+'</a>':'<span></span>')+(nx?'<a href="#'+nx.k+'" class="ck-btn pri">'+esc(nx.t)+' →</a>':'')+'</div>'},
 intro:function(o,CH,IMG){return '<div class="ck-intro"><h2>'+o.title+'</h2><p class="lead">'+o.lead+'</p><div class="grid3">'+o.cards.map(function(c){return '<div class="c"><h4>'+c[0]+'</h4><p>'+c[1]+'</p></div>'}).join("")+'</div><h3>'+o.linkTitle+'</h3><div class="tw"><table><tr><th>모듈</th><th>연결 지점</th></tr>'+o.links.map(function(l){return '<tr><td><b>'+l[0]+'</b></td><td>'+l[1]+'</td></tr>'}).join("")+'</table></div><h3>이 앱의 학습 순서</h3><div class="road">'+CH.filter(function(c){return /^[1-9]$/.test(c.n)}).map(function(c){return '<a href="#'+c.k+'" class="rd"><span>STEP '+c.n+'</span><b>'+esc(c.t)+'</b><small>'+esc(c.lead||"")+'</small>'+(IMG[c.k]?'<em>IMG '+IMG[c.k].length+'</em>':'')+'</a>'}).join("")+'</div><p class="ck-note" style="margin-top:12px">각 단계는 <b>콘텐츠 → IMG 설정</b> 순서입니다. 콘텐츠로 개념을 잡고, 아래 IMG 목록으로 실습 시스템에 직접 구현해 보세요.</p></div>'}
};
})();
