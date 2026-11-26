// מדידת כניסות למדריכי הקבוצה: אותה מדידה של שאר המדריכים (/guide-hit בפורטל), מזהה אנונימי בלבד
(function(){
  var TRACK = "https://academy.mominvest.co.il/guide-hit";
  var q = new URLSearchParams(location.search), vid;
  try {
    vid = localStorage.getItem('mi_vid');
    if(!vid){ vid = (Date.now().toString(36) + Math.random().toString(36).slice(2,10)); localStorage.setItem('mi_vid', vid); }
    ['ref','utm_source','utm_medium','utm_campaign','utm_content'].forEach(function(k){ if(q.get(k)) localStorage.setItem('mi_'+k, q.get(k)); });
  } catch(e){ vid = 'nostore'; }
  var p = new URLSearchParams();
  p.set('page', 'guide');
  p.set('vid', vid || '');
  p.set('ref', q.get('ref') || document.body.dataset.ref || '');
  ['utm_source','utm_medium','utm_campaign','utm_content'].forEach(function(k){
    var v = q.get(k) || (function(){ try { return localStorage.getItem('mi_'+k); } catch(e){ return ''; } })();
    if(v) p.set(k, v);
  });
  var body = p.toString();
  try {
    if(!navigator.sendBeacon || !navigator.sendBeacon(TRACK, new Blob([body], {type:'application/x-www-form-urlencoded'}))){
      fetch(TRACK, {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:body, keepalive:true}).catch(function(){});
    }
  } catch(e){}
})();
