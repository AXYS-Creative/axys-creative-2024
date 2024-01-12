import "./nav.js";
import "./form.js";
import "./faqs.js";
import "./animations.js";
import "./mouse-cursor.js";

// Clear focus from any element on mousemove (remove button :focus styles)
(function clearFocusOnMouseMove() {
  function removeFocus() {
    if (
      document.activeElement &&
      !document.activeElement.classList.contains("input")
    ) {
      document.activeElement.blur();
    }
  }
  // Set up event listeners
  document.addEventListener("mousemove", removeFocus);
})();
