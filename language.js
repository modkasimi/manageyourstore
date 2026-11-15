// Links like download.html?lang=fr (ads, WhatsApp messages) open the page in that language.
// A first-time visitor with no ?lang and no saved choice gets the language of their phone or
// computer (Arabic, French, otherwise English); the menu choice is saved and always wins after that.
(function () {
    var q = new URLSearchParams(location.search).get('lang');
    try {
        if (q === 'en' || q === 'fr' || q === 'ar') {
            localStorage.setItem('selectedLanguage', q);
        } else if (!localStorage.getItem('selectedLanguage')) {
            var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
            var found = 'en';
            for (var i = 0; i < prefs.length; i++) {
                var code = String(prefs[i]).toLowerCase().slice(0, 2);
                if (code === 'ar' || code === 'fr' || code === 'en') { found = code; break; }
            }
            localStorage.setItem('selectedLanguage', found);
        }
    } catch (e) {}
})();


    // Function to change language based on selection
function changeLanguage(lang) {
    document.documentElement.lang = lang;
    const translatableElements = document.querySelectorAll('[data-en]');
    translatableElements.forEach(el => {
        el.innerHTML = el.getAttribute(`data-${lang}`);
        el.classList.remove("english-text", "french-text", "arabic-text");

        if (lang === 'en') el.classList.add("english-text");
        else if (lang === 'fr') el.classList.add("french-text");
        else if (lang === 'ar') {
            el.classList.add("arabic-text");
            if (!el.hasAttribute("data-centered")) {
                el.style.textAlign = "right";
                el.style.direction = "rtl";
            }
        }

        if (lang !== 'ar') {
            el.style.textAlign = "";
            el.style.direction = "ltr";
        }
    });
    localStorage.setItem('selectedLanguage', lang);
}





// Add event listener to load the saved language on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English if no language is saved
    changeLanguage(savedLanguage);
});


