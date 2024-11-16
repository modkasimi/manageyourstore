document.addEventListener('DOMContentLoaded', function () {
    const videoFrame = document.getElementById('video-frame');
    const currentLang = document.documentElement.lang; // Get current page language
    const pageId = document.body.getAttribute('data-page-id'); // Get page identifier

    // Define videos for each page and language
    const videos = {
        cancelOperation: {
            en: "https://www.facebook.com/plugins/video.php?href=ARABIC_VIDEO_URL_FOR_PAGE1",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE1",
            ar: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100085252551188%2Fvideos%2F876555391335228%2F&show_text=false&width=560&t=0",
            
        },
        returnRepair: {
            en: "https://www.facebook.com/plugins/video.php?href=ENGLISH_VIDEO_URL_FOR_PAGE2",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE2",
            ar: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100085252551188%2Fvideos%2F575969954945459%2F&show_text=false&width=560&t=0" 
        }
        recordWastage: {
            en: "https://www.facebook.com/plugins/video.php?href=ENGLISH_VIDEO_URL_FOR_PAGE2",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE2",
            ar: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100085252551188%2Fvideos%2F546211488041609%2F&show_text=false&width=560&t=0"
        }
    detailedSale: {
            en: "https://www.facebook.com/plugins/video.php?href=ENGLISH_VIDEO_URL_FOR_PAGE2",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE2",
            ar: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100085252551188%2Fvideos%2F2364303830574432%2F&show_text=false&width=560&t=0"
        }
    simpleSale: {
            en: "https://www.facebook.com/plugins/video.php?href=ENGLISH_VIDEO_URL_FOR_PAGE2",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE2",
            ar: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100085252551188%2Fvideos%2F1086917339683917%2F&show_text=false&width=560&t=0"
        }
    prodPic: {
            en: "https://www.facebook.com/plugins/video.php?href=ENGLISH_VIDEO_URL_FOR_PAGE2",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE2",
            ar: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100085252551188%2Fvideos%2F1086917339683917%2F&show_text=false&width=560&t=0"
        }
    addProduct: {
            en: "https://www.facebook.com/plugins/video.php?href=ENGLISH_VIDEO_URL_FOR_PAGE2",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE2",
            ar: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100085252551188%2Fvideos%2F480459731094192%2F&show_text=false&width=560&t=0"
        }
    mainMenu: {
            en: "https://www.facebook.com/plugins/video.php?href=ENGLISH_VIDEO_URL_FOR_PAGE2",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE2",
            ar: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100085252551188%2Fvideos%2F606796831677427%2F&show_text=false&width=560&t=0"
        }
    launchApp: {
            en: "https://www.facebook.com/plugins/video.php?href=ENGLISH_VIDEO_URL_FOR_PAGE2",
            fr: "https://www.facebook.com/plugins/video.php?href=FRENCH_VIDEO_URL_FOR_PAGE2",
            ar: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100085252551188%2Fvideos%2F1219124206055432%2F&show_text=false&width=560&t=0"
        }
    };

    // Check if the pageId exists in the videos object
    if (videos[pageId]) {
        // Set the video based on the current language; default to English if not found
        videoFrame.src = videos[pageId][currentLang] || videos[pageId].en;
    } else {
        console.error("No video defined for this page ID:", pageId);
    }
});
