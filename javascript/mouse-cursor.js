const cursor = document.querySelector(".mouse-cursor"),
  logo = document.querySelector(".logo"),
  menuBtn = document.querySelector(".menu-btn"),
  burger = document.querySelector(".burger"),
  navLinks = document.querySelectorAll(".nav-link"),
  navFooterLinks = document.querySelectorAll(".nav-footer-link"),
  socialMediaLinks = document.querySelectorAll(".social-media-link"),
  cta1 = document.querySelectorAll(".cta-1"),
  cta2 = document.querySelectorAll(".cta-2"),
  workItems = document.querySelectorAll(".showcase-link"),
  mailForm = document.querySelector(".mail-form"),
  submitFormBtn = document.querySelector(".submit-btn"),
  faqItems = document.querySelectorAll(".faq-item"),
  emailUsLink = document.querySelector(".email-us-link");

let followMouse = true;
cursor.style.opacity = 0; // Initially hide when loading the site

document.addEventListener("mousemove", function (e) {
  cursor.style.opacity = 1;

  if (followMouse) {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
  }
});

// Toggle vanish class to mouse cursor
const cursorHoverVanish = (elem) => {
  elem.addEventListener("mouseenter", () => {
    cursor.classList.add("vanish-mouse-cursor");
  });
  elem.addEventListener("mouseleave", () => {
    cursor.classList.remove("vanish-mouse-cursor");
  });
};

// Attaching vanish to individual elements
cursorHoverVanish(logo);
cursorHoverVanish(emailUsLink);
// Attaching events to NodeList items
[...cta1, ...workItems, ...faqItems].forEach(cursorHoverVanish);

// Toggle sibling selector (dot, icon, etc...)
const cursorHoverSibling = (elements, querySelector, activeClass) => {
  elements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      followMouse = false;
      const sibling = element.querySelector(querySelector);
      const siblingRef = sibling.getBoundingClientRect();
      cursor.style.left = siblingRef.left + siblingRef.width / 2 + "px";
      cursor.style.top = siblingRef.top + siblingRef.height / 2 + "px";
      cursor.classList.add(activeClass);
    });

    element.addEventListener("mouseleave", () => {
      followMouse = true;
      cursor.classList.remove(activeClass);
    });
  });
};

cursorHoverSibling(navLinks, ".nav-link-svg", "nav-link-active");
cursorHoverSibling(navFooterLinks, ".icon", "nav-link-active");
cursorHoverSibling(cta2, ".dot", "cta2-active");

socialMediaLinks.forEach((link) => {
  link.addEventListener("mousemove", () => {
    const linkRect = link.getBoundingClientRect();
    cursor.style.top = linkRect.top + linkRect.height / 2 + "px";
    cursor.style.left = linkRect.left + linkRect.width / 2 + "px";
    cursor.classList.add("social-link-active");
    followMouse = false;
  });

  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("social-link-active");
    followMouse = true;
  });
});

menuBtn.addEventListener("mousemove", () => {
  const burgerRect = burger.getBoundingClientRect();
  cursor.style.top = burgerRect.top + burgerRect.height / 2 + "px";
  cursor.style.left = burgerRect.left + burgerRect.width / 2 + "px";
  cursor.classList.add("burger-active");
  followMouse = false;
});

menuBtn.addEventListener("mouseleave", () => {
  cursor.classList.remove("burger-active");
  followMouse = true;
});

mailForm.addEventListener("mousemove", () => {
  followMouse = false;
  const submitBtnRect = submitFormBtn.getBoundingClientRect();
  cursor.style.left = submitBtnRect.left + submitBtnRect.width / 2 + "px";
  cursor.style.top = submitBtnRect.top + submitBtnRect.height / 2.2 + "px";
  cursor.classList.add("mail-form-active");
});

mailForm.addEventListener("mouseleave", () => {
  followMouse = true;
  cursor.classList.remove("mail-form-active");
});

submitFormBtn.addEventListener("mousemove", () => {
  const submitBtnRect = submitFormBtn.getBoundingClientRect();
  cursor.style.left = submitBtnRect.left + submitBtnRect.width / 2 + "px";
  cursor.style.top = submitBtnRect.top + submitBtnRect.height / 2.2 + "px";
  followMouse = false;
});

submitFormBtn.addEventListener("mouseleave", () => {
  followMouse = true;
});
