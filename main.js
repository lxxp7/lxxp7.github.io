// Theme toggle functionality
function setupThemeToggle() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  }

  const header = document.querySelector(".header-content");
  const themeToggle = document.createElement("button");
  themeToggle.className = "btn btn-icon theme-toggle";
  themeToggle.innerHTML = `
    <i class="fas fa-sun light-icon"></i>
    <i class="fas fa-moon dark-icon"></i>
    <span class="sr-only">Changer le thème</span>
  `;

  const cvButton = document.querySelector(".btn-outline");
  header.insertBefore(themeToggle, cvButton);

  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// Mobile navigation menu
function setupMobileNav() {
  const header = document.querySelector(".header-content");
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.className = "btn btn-icon mobile-menu-btn";
  mobileMenuBtn.innerHTML = `
    <i class="fas fa-bars"></i>
    <span class="sr-only">Menu</span>
  `;

  const mobileMenu = document.createElement("div");
  mobileMenu.className = "mobile-menu";

  const navLinks = document.querySelectorAll(".main-nav .nav-link");
  navLinks.forEach((link) => {
    const clone = link.cloneNode(true);
    mobileMenu.appendChild(clone);
  });

  document.body.appendChild(mobileMenu);
  header.insertBefore(mobileMenuBtn, header.firstChild);

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  mobileMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove("active");
    }
  });
}

// Contact form handling
function setupContactForm() {
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      if (!name || !email || !message) {
        formMessage.textContent = "Veuillez remplir tous les champs.";
        formMessage.style.color = "var(--danger-color, #ff3366)";
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Envoi en cours...";
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        console.log("Form submission:", { name, email, message });
        form.reset();
        formMessage.textContent =
          "Merci pour votre message ! Je vous répondrai bientôt.";
        formMessage.style.color = "var(--primary)";
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;

        setTimeout(() => {
          formMessage.textContent = "";
        }, 5000);
      }, 1500);
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupMobileNav();
  setupContactForm();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
