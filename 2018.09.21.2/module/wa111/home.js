define([], function() {
    return {
        siteName: lbltitle.outerText.split('-')[0],
        operator: document.querySelector('.user-info').outerText.split('\n')[1],
        channel: window.siteNumber
    }
})