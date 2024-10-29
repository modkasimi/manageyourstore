
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


