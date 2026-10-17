// Shared top bar for every page: Home button + language menu.
// Loaded with <script src="site-nav.js" defer> in each page's <head>; styled in theme.css (.site-bar).
// The bar's labels carry data-en/fr/ar, so language.js translates them like the rest of the page.
(function () {
    var LANGS = [['en', 'English'], ['fr', 'Français'], ['ar', 'العربية']];
    var page = location.pathname.split('/').pop() || 'index.html';
    var isHome = page === '' || page === 'index.html';

    var bar = document.createElement('nav');
    bar.className = 'site-bar';
    bar.setAttribute('aria-label', 'Site');

    var home = document.createElement('a');
    home.className = 'site-bar-home';
    home.href = 'index.html';
    home.innerHTML = '<span aria-hidden="true">&#8962;</span> <span data-en="Home" data-fr="Accueil" data-ar="الرئيسية" data-centered="1">Home</span>';
    if (isHome) home.style.visibility = 'hidden';   // keep the layout, no point linking home from home

    var label = document.createElement('label');
    label.className = 'site-bar-lang';
    label.innerHTML = '<span aria-hidden="true">&#127760;</span>';
    var select = document.createElement('select');
    select.setAttribute('aria-label', 'Language');
    LANGS.forEach(function (l) {
        var o = document.createElement('option');
        o.value = l[0]; o.textContent = l[1];
        select.appendChild(o);
    });
    select.value = localStorage.getItem('selectedLanguage') || 'en';
    label.appendChild(select);

    select.addEventListener('change', function () {
        var lang = select.value;
        localStorage.setItem('selectedLanguage', lang);
        var params = new URLSearchParams(location.search);
        // Pages that set things up once at load (tutorial videos, WhatsApp text) or were opened
        // from an ad link with ?lang= need a reload so the new choice sticks everywhere.
        var needsReload = params.has('lang') || document.getElementById('video-frame') || document.querySelector('.wa-link');
        if (needsReload) {
            params.delete('lang');
            var q = params.toString();
            location.replace(location.pathname + (q ? '?' + q : '') + location.hash);
        } else if (typeof changeLanguage === 'function') {
            changeLanguage(lang);
        }
    });

    bar.appendChild(home);
    bar.appendChild(label);
    document.body.insertBefore(bar, document.body.firstChild);
})();
