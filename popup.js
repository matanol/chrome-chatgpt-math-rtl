document.addEventListener("DOMContentLoaded", function () {
    const debugToggle = document.getElementById("debugToggle");

    chrome.storage.sync.get(["debug"], function (result) {
        debugToggle.checked = result.debug || false;
    });

    debugToggle.addEventListener("change", function () {
        const isEnabled = debugToggle.checked;

        chrome.storage.sync.set({ debug: isEnabled }, function () {
            console.log("Debug mode set to:", isEnabled);
        });
    });
});
