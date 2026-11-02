/* IRA Google Forms connector — only form submission behavior is changed. */
(()=>{
'use strict';
const ENDPOINT='https://script.google.com/macros/s/AKfycbw35lSFHN2CTfUVLCdI6WUDBwj_L5a1o5KWLqmg6mh05Ei691UMHa2A8LFQn-tN2o8/exec';
const F={voteForm:'product',partnerForm:'partner',feedbackForm:'feedback',spotForm:'location'};
const $=(f,n)=>f.elements.namedItem(n);
function values(f,n){return [...f.querySelectorAll(`[name="${n}"]:checked`)].map(x=>x.value)}
function value(f,n){const x=$(f,n);return x&&'value'in x?String(x.value).trim():''}
function collect(f,type){
 if(type==='product')return {
  'What would you like to suggest?':'Suggest Products for IRA.',
  'What products would you like to see?':values(f,'vote'),
  'Specific Brand / Product Suggestion':value(f,'products'),
  'Your name':value(f,'name'),
  'Additional Suggestions':value(f,'extra')};
 if(type==='partner')return {
  'Name':value(f,'name'), 'Organisation / Institution Name':value(f,'organisation'),
  'Type of Location':value(f,'category'),'Your Designation':value(f,'role'),
  'Phone number':value(f,'phone'),'Official Email Address':value(f,'email'),
  'Location/ Area':value(f,'area'),'City':value(f,'city'),
  'Approximate Daily Footfall':value(f,'footfall'),
  'Preferred Installation Timeline':value(f,'timeline'),
  'Additional Requirements / Questions':value(f,'extra')};
 if(type==='feedback')return {
  'What do you need help with?':value(f,'issue'),
  'IRA Machine / Location':value(f,'location'),
  'Date of Incident':value(f,'date'), 'Product Name':value(f,'product'),
  'Describe the Issue':value(f,'details'),
  'Payment Amount (₹)':value(f,'amount'),
  'UPI Transaction Reference':value(f,'upi'),
  'Mobile for Follow-up':value(f,'phone')};
 return {'Where should IRA go next?':value(f,'spot'),
  'What kind of place is it?':value(f,'type')==='Other'?(value(f,'type_other')||'Other'):value(f,'type'),
  'Which area is it in?':value(f,'area'),
  'Why would you love IRA here?':[...values(f,'why'),...(value(f,'reason')?[value(f,'reason')]:[])]};
}
function notice(f,msg,isError){let n=f.querySelector('.ira-form-status');if(!n){n=document.createElement('div');n.className='ira-form-status';n.setAttribute('role','status');n.style.cssText='margin-top:12px;font-weight:600;font-size:14px;line-height:1.5';f.append(n)}n.style.color=isError?'#b3261e':'inherit';n.textContent=msg}
function submit(e){const f=e.target,type=F[f?.id];if(!type)return;
 e.preventDefault();e.stopImmediatePropagation();if(!f.reportValidity())return;
 const answers=collect(f,type);
 if(type==='product'&&!answers['What products would you like to see?'].length&&!answers['Specific Brand / Product Suggestion']&&!answers['Additional Suggestions']){notice(f,'Please select a product or enter a suggestion.',true);return}
 const btn=f.querySelector('[type="submit"]');if(!btn||btn.disabled)return;
 const old=btn.textContent;btn.disabled=true;btn.textContent='Sending…';notice(f,'Submitting your response…',false);
 const nonce='ira_'+Date.now()+'_'+Math.random().toString(36).slice(2);
 const frame=document.createElement('iframe');frame.name=nonce;frame.style.display='none';frame.setAttribute('title','IRA form submission');document.body.append(frame);
 const post=document.createElement('form');post.action=ENDPOINT;post.method='POST';post.target=nonce;post.style.display='none';
 const payload={formType:type,answers,nonce};const input=document.createElement('input');input.name='payload';input.value=JSON.stringify(payload);post.append(input);document.body.append(post);
 let finished=false;
 const finish=(ok,message)=>{if(finished)return;finished=true;window.removeEventListener('message',receive);clearTimeout(timer);post.remove();setTimeout(()=>frame.remove(),1500);btn.disabled=false;btn.textContent=old;
 if(ok){f.reset();notice(f,'Thank you! Your response has been saved successfully.',false)}else notice(f,message||'We could not confirm your response. Please try again.',true)};
 const receive=(ev)=>{if(!/^https:\/\/(?:script\.google(?:usercontent)?\.com)(?::443)?$/.test(ev.origin))return;const data=ev.data;if(!data||data.source!=='IRA_FORMS'||data.nonce!==nonce)return;finish(data.success, data.error||'Submission failed. Please try again.')};
 window.addEventListener('message',receive);
 const timer=setTimeout(()=>finish(false,'Google did not return a confirmation. Check Google Forms Responses before retrying to avoid duplicates.'),30000);
 try{post.submit()}catch(err){finish(false,'Unable to submit: '+err.message)}
}
document.addEventListener('submit',submit,true);
const st=document.querySelector('#spotForm [name=type]'),so=document.getElementById('spotTypeOther');
if(st&&so)st.addEventListener('change',()=>{const on=st.value==='Other';so.style.display=on?'block':'none';so.querySelector('input').required=on});
document.querySelectorAll('[data-open]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.getElementById(a.dataset.open)?.showModal()}));
document.querySelectorAll('dialog.xd').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d)d.close()});d.querySelector('.xd-x')?.addEventListener('click',()=>d.close())});
const dt=document.querySelector('#feedbackForm [name=date]');if(dt)dt.value=new Date().toLocaleDateString('en-CA');
})();
