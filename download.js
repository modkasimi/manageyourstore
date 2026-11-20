/* Free downloads (My Store and productsCount for Android).
   A download button calls msDownload(app, source, device): a small box asks for the visitor's
   email, the email goes to our server (Cloud Function registerDownload -> Firestore
   "downloads"), and the installer starts downloading from our own server.
   If the server can't be reached, the download still starts. */
(function () {
  var ENDPOINT = 'https://europe-west1-store-678b8.cloudfunctions.net/registerDownload';
  var FALLBACK = {
    mystore: 'https://store-678b8.web.app/MyStore.apk',
    productscount: 'https://store-678b8.web.app/productsCount.apk'
  };
  var NAMES = { mystore: {en: 'My Store', fr: 'My Store', ar: 'متجري'},
                productscount: {en: 'productsCount', fr: 'productsCount', ar: 'productsCount'} };
  var T = {
    en: { title: 'Download {app} for Android',
          text: 'Enter your email and the download starts right away. We only use it to send you news about the app - no spam.',
          button: 'Download now', cancel: 'Cancel', bad: 'Please enter a valid email address.',
          wait: 'Starting the download…',
          done: 'Your download has started. Open the file when it finishes. You may need to allow "Install from unknown apps".',
          again: 'Download again', privacy: 'Privacy policy' },
    fr: { title: 'Télécharger {app} pour Android',
          text: 'Entrez votre e-mail et le téléchargement commence tout de suite. Nous l’utilisons seulement pour vous donner des nouvelles de l’application - pas de spam.',
          button: 'Télécharger', cancel: 'Annuler', bad: 'Veuillez saisir une adresse e-mail valide.',
          wait: 'Démarrage du téléchargement…',
          done: 'Le téléchargement a commencé. Ouvrez le fichier quand il est terminé. Vous devrez peut-être autoriser « Installer des applications inconnues ».',
          again: 'Télécharger à nouveau', privacy: 'Politique de confidentialité' },
    ar: { title: 'تنزيل {app} لأندرويد',
          text: 'أدخل بريدك الإلكتروني ويبدأ التنزيل مباشرة. نستعمله فقط لنرسل لك أخبار التطبيق - بدون رسائل مزعجة.',
          button: 'نزّل الآن', cancel: 'إلغاء', bad: 'يرجى إدخال بريد إلكتروني صحيح.',
          wait: 'جارٍ بدء التنزيل…',
          done: 'بدأ التنزيل. افتح الملف عند انتهائه. قد تحتاج إلى السماح بـ«تثبيت التطبيقات من مصادر غير معروفة».',
          again: 'نزّل مرة أخرى', privacy: 'سياسة الخصوصية' }
  };
  var EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

  function lang() {
    var l = (document.documentElement.lang || 'en').slice(0, 2);
    return T[l] ? l : 'en';
  }

  var css = document.createElement('style');
  css.textContent =
    '.msdl-back{position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px}' +
    '.msdl-box{background:var(--surface,#fff);color:var(--text,#222);border-radius:16px;max-width:420px;width:100%;padding:22px;box-shadow:0 10px 30px rgba(0,0,0,.25);font-family:inherit}' +
    '.msdl-box h3{margin:0 0 10px;font-size:1.2em;color:var(--ink,inherit)}' +
    '.msdl-box p{margin:0 0 12px;line-height:1.6}' +
    '.msdl-box input{width:100%;box-sizing:border-box;font-size:16px;padding:12px;border:1px solid var(--line,#ccc);border-radius:10px;margin-bottom:8px;direction:ltr}' +
    '.msdl-err{color:#b00020;font-size:.92em}' +
    '.msdl-row{display:flex;gap:10px;margin-top:8px;flex-wrap:wrap}' +
    '.msdl-row button{flex:1;min-width:120px;font-size:16px;padding:12px;border-radius:10px;border:0;cursor:pointer}' +
    '.msdl-box .msdl-go{font-weight:700}' +
    '.msdl-box .msdl-no{background:transparent !important;color:var(--text,#222) !important;border:1px solid var(--line,#ccc) !important;box-shadow:none !important;font-weight:400}' +
    '.msdl-small{font-size:.85em;opacity:.8;margin-top:10px}' +
    'html[lang="ar"] .msdl-box{direction:rtl}';
  document.head.appendChild(css);

  function startDownload(url) {
    var a = document.createElement('a');
    a.href = url; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  }

  window.msDownload = function (app, source, device) {
    var l = lang(), t = T[l], name = (NAMES[app] || NAMES.mystore)[l];
    var saved = '';
    try { saved = localStorage.getItem('msdl_email') || ''; } catch (e) {}
    var back = document.createElement('div');
    back.className = 'msdl-back';
    back.innerHTML =
      '<div class="msdl-box" role="dialog" aria-modal="true" aria-labelledby="msdl-t">' +
      '<h3 id="msdl-t"></h3><p class="msdl-text"></p>' +
      '<input type="email" autocomplete="email" inputmode="email" placeholder="email@example.com" aria-label="Email">' +
      '<p class="msdl-err" hidden></p>' +
      '<div class="msdl-row"><button type="button" class="msdl-go"></button><button type="button" class="msdl-no"></button></div>' +
      '<p class="msdl-small"><a href="privacy-policy.html" target="_blank"></a></p></div>';
    var box = back.firstChild;
    box.querySelector('h3').textContent = t.title.replace('{app}', name);
    box.querySelector('.msdl-text').textContent = t.text;
    var input = box.querySelector('input'); input.value = saved;
    var err = box.querySelector('.msdl-err');
    var go = box.querySelector('.msdl-go'); go.textContent = t.button;
    var no = box.querySelector('.msdl-no'); no.textContent = t.cancel;
    box.querySelector('.msdl-small a').textContent = t.privacy;
    function close() { back.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    back.addEventListener('click', function (e) { if (e.target === back) close(); });
    no.addEventListener('click', close);
    var url = null;

    function submit() {
      if (url) { startDownload(url); return; }
      var email = input.value.trim();
      if (!EMAIL_RE.test(email)) { err.textContent = t.bad; err.hidden = false; input.focus(); return; }
      err.hidden = true; go.disabled = true; go.textContent = t.wait;
      try { localStorage.setItem('msdl_email', email); } catch (e) {}
      if (typeof msLead === 'function') { try { msLead(source || ('download_' + app)); } catch (e) {} }
      var finish = function (u) {
        url = u || FALLBACK[app];
        startDownload(url);
        box.querySelector('.msdl-text').textContent = t.done;
        input.hidden = true; go.disabled = false; go.textContent = t.again; no.textContent = 'OK';
      };
      var ctl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 8000);
      fetch(ENDPOINT, { method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ app: app, email: email, device: device || '', lang: l, source: source || '' }),
        signal: ctl ? ctl.signal : undefined })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (d) { clearTimeout(timer); finish(d && d.url); })
        .catch(function () { clearTimeout(timer); finish(null); });
    }
    go.addEventListener('click', submit);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    document.body.appendChild(back);
    input.focus();
  };
})();
