console.log(`[chatGPT-Math-RTL] - Loaded`);

const debounce = (func, timeout) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const chatGPTMathRTL = () => {
  const LATEX_CLASS_PREFIX = "katex";

  const latexElements = document.querySelectorAll(
    `[class^="${LATEX_CLASS_PREFIX}"]`
  );

  let updateCount = 0;

  latexElements.forEach((element) => {
    if (!element.hasAttribute("dir")) {
      element.setAttribute("dir", "ltr"); // Add left to right direction for Latex elements
      updateCount++;
    }
  });

  if (updateCount > 0) {
    console.log(`[chatGPT-Math-RTL] - Updated ${updateCount} elements.`);
  }
};

// A debounced version of chatGPTMathRTL
const debouncedChatGPTMathRTL = debounce(chatGPTMathRTL, 1000);

const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList" || mutation.type === "attributes") {
      debouncedChatGPTMathRTL();
    }
  }
});

const config = { attributes: true, childList: true, subtree: true };

observer.observe(document.body, config);
