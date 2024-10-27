<script>
    // Function to change language based on selection
    function changeLanguage(lang) {
        // Set the `lang` attribute for the whole page
        document.documentElement.lang = lang;

        // Get all elements with a translation for the selected language
        const translatableElements = document.querySelectorAll('[data-en]');

        // Update each element's text based on the selected language
        translatableElements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Update the URL to reflect the selected language
        const params = new URLSearchParams(window.location.search);
        params.set('lang', lang);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    }

    // Get the language from the URL or default to English
    function getLanguageFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('lang') || 'en'; // Default to English if no lang parameter
    }

    // Initialize the page with the language from the URL or default language
    document.addEventListener('DOMContentLoaded', () => {
        const lang = getLanguageFromUrl();
        changeLanguage(lang); // Set the application language based on the URL
        // Set the dropdown value to the current language
        document.getElementById('language').value = lang;
    });
</script>
