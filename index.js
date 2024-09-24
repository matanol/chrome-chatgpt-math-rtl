console.log("[chatGPT-Math-RTL] - Loaded");

const chatGPTMathRTL = () => {
    const LATEX_CLASS_PREFIX = "katex";

    const latexElements = document.querySelectorAll(
        `[class^="${LATEX_CLASS_PREFIX}"]:not([dir="ltr"])`
    );

    if (latexElements.length === 0) {
        return;
    }

    let updateCount = 0;

    latexElements.forEach((element) => {
        element.setAttribute("dir", "ltr"); // Add left to right direction for Latex elements
        updateCount++;
    });

    chrome.storage.sync.get(["debug"], function (result) {
        const debug = result.debug || false;

        if (debug) {
            console.log(
                `[chatGPT-Math-RTL] - Updated ${updateCount} elements.`
            );
        }
    });
};

function observeBody() {
    const observer = new MutationObserver(chatGPTMathRTL);
    observer.observe(document.body, { childList: true, subtree: true });
}

// Set up observer to detect when document.body changes
const observer = new MutationObserver(() => {
    observeBody();
});

// Observe for any changes in the document's structure (in case body gets replaced)
observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
});
