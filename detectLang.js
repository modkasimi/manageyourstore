document.addEventListener('DOMContentLoaded', function () {
    const videoFrame = document.getElementById('video-frame');
    const currentLang = document.documentElement.lang; // Get current page language
    const pageId = document.body.getAttribute('data-page-id'); // Get page identifier

    // Define videos for each page and language
    const videos = {
        page1: {
            en: "https://www.facebook.com/plugins/video.php?href=ENGLISH_VIDEO_URL_FOR_PAGE1",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE1",
            ar: "https://www.facebook.com/plugins/video.php?href=ARABIC_VIDEO_URL_FOR_PAGE1"
        },
        page2: {
            en: "https://www.facebook.com/plugins/video.php?href=ENGLISH_VIDEO_URL_FOR_PAGE2",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE2",
            ar: "https://www.facebook.com/plugins/video.php?href=ARABIC_VIDEO_URL_FOR_PAGE2"
        }
        // Add more pages as needed
    };

    // Check if the pageId exists in the videos object
    if (videos[pageId]) {
        // Set the video based on the current language; default to English if not found
        videoFrame.src = videos[pageId][currentLang] || videos[pageId].en;
    } else {
        console.error("No video defined for this page ID:", pageId);
    }
});
