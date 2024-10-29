
    // Function to change language based on selection
function changeLanguage(lang) {
    console.log(`Changing language to: ${lang}`); // Debugging log

    // Set the `lang` attribute on the root of the document
    document.documentElement.lang = lang;

    // Select all elements with a `data-en` attribute
    const translatableElements = document.querySelectorAll('[data-en]');

    // Update each element's text, apply language class, and adjust alignment
    translatableElements.forEach(el => {
        // Set the inner HTML based on the selected language to allow HTML tags like <strong>
        el.innerHTML = el.getAttribute(`data-${lang}`);

        // Remove any existing language-specific classes
        el.classList.remove("english-text", "french-text", "arabic-text");

        // Add the new language-specific class
        if (lang === 'en') el.classList.add("english-text");
        else if (lang === 'fr') el.classList.add("french-text");
        else if (lang === 'ar') {
            el.classList.add("arabic-text");

            // Apply text alignment only if not centered
            if (!el.hasAttribute("data-centered")) {
                el.style.textAlign = "right";
                
                // Special case for list items (li) for Arabic alignment
                if (el.tagName.toLowerCase() === 'li') {
                    el.style.listStylePosition = "inside";  // Aligns bullet point with right-aligned text
                }
            }
        }

        // Reset text alignment for non-Arabic languages
        if (lang !== 'ar') {
            el.style.textAlign = "";
        }
    });

    // Store the selected language in local storage
    localStorage.setItem('selectedLanguage', lang);
}





// Add event listener to load the saved language on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English if no language is saved
    changeLanguage(savedLanguage);
});


