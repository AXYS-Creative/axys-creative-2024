let mqMaxXxl = window.matchMedia("(max-width: 1440px)");
let mqMaxSm = window.matchMedia("(max-width: 480px)");

const heroGlitchText = () => {
  const dynamicText = document.querySelector(".dynamic-text");
  const words = [
    { word: "Creative", color: "#E48C66" },
    { word: "Responsive", color: "#7EC1D4" },
    { word: "Accessible", color: "#A4D1A2" },
    { word: "Innovative", color: "#FBFAA2" },
    { word: "Engaging", color: "#E1A7B4" },
  ];

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?><:;";
  const charLength = characters.length;
  let index = 0;
  let glitchInterval;

  function applyGlitchEffect(wordObj) {
    if (glitchInterval) clearInterval(glitchInterval);

    let glitchIterations = 0;
    const maxIterations = wordObj.word.length * 4;
    dynamicText.style.color = wordObj.color;
    const wordArray = wordObj.word.split("");

    glitchInterval = setInterval(() => {
      const glitchText = wordArray
        .map((char, idx) => {
          if (glitchIterations / 3 > idx) return char;
          return characters.charAt(Math.floor(Math.random() * charLength));
        })
        .join("");

      dynamicText.innerText = glitchText;
      glitchIterations++;

      if (glitchIterations >= maxIterations) {
        clearInterval(glitchInterval);
        dynamicText.innerText = wordObj.word;
      }
    }, 25);
  }

  function updateText() {
    applyGlitchEffect(words[index]);
    index = (index + 1) % words.length;
  }

  updateText();
  setInterval(updateText, 4000); // Control the update of words separately
};

heroGlitchText();

//

const title = document.querySelector(".section-title");
const originalText = "Our Work"; // Use the text content directly
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let passiveGlitch;

const glitchAnimation = () => {
  let titleIterations = 0;
  clearInterval(passiveGlitch);

  passiveGlitch = setInterval(() => {
    const glitchedText = originalText
      .split("")
      .map((char, index) => {
        if (index < titleIterations) {
          return index < 3 ? char : `<span class="yellow-text">${char}</span>`;
        }
        return index < 3
          ? char
          : `<span class="yellow-text">${
              letters[Math.floor(Math.random() * 36)]
            }</span>`;
      })
      .join("");

    title.innerHTML = glitchedText;

    if (titleIterations >= originalText.length) {
      clearInterval(passiveGlitch);
      title.innerHTML = `Our <span class="yellow-text">Work</span>`;
    }

    titleIterations += 1 / 3;
  }, 25);
};

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        glitchAnimation();
      }
    });
  },
  { threshold: 0.1 }
);

observer.observe(title);

//

const scrollAnimations = () => {
  function throttle(func, limit) {
    let lastFunc;
    let lastRan;

    return function () {
      const context = this;
      const args = arguments;

      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  function isElementInView(element, offset = 0) {
    const rect = element.getBoundingClientRect();

    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const isTopInView = rect.top <= windowHeight - offset;
    const isBottomPassedTop = rect.top < 0 + offset;
    return isTopInView && !isBottomPassedTop;
  }

  let pixelSpacer = 80;

  if (mqMaxXxl.matches) {
    pixelSpacer = 64;
  } else if (mqMaxSm.matches) {
    pixelSpacer = 32;
  }

  const handleScroll = () => {
    document.querySelectorAll(".scroll-animate").forEach((el) => {
      if (isElementInView(el, pixelSpacer)) {
        el.classList.add("animate");
      } else {
        el.classList.remove("animate");
      }
    });
  };

  // Adjust the throttle with the second argument below. The smaller the number, the quicker the function calls (milliseconds)
  const throttledScroll = throttle(handleScroll, 100);
  window.addEventListener("scroll", throttledScroll);
};

scrollAnimations();

//

if (mqMaxSm.matches) {
  let siteHeader = document.querySelector(".site-header");

  const scrollFromTop = () => {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 120) {
        siteHeader.classList.add("away-from-top");
      } else {
        siteHeader.classList.remove("away-from-top");
      }
    });
  };

  scrollFromTop();
}
