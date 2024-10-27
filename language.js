
    // Function to change language based on selection
function changeLanguage(lang) {
    console.log(`Changing language to: ${lang}`); // Debugging log
    // Set the `lang` attribute on the root of the document
    document.documentElement.lang = lang;

    // Select all elements with a `data-en` attribute
    const translatableElements = document.querySelectorAll('[data-en]');

    // Update each element's text based on the selected language
    translatableElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Store the selected language in local storage
    localStorage.setItem('selectedLanguage', lang);
}

// Add event listener to load the saved language on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English if no language is saved
    changeLanguage(savedLanguage);
});


