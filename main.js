// Theme toggle functionality
function setupThemeToggle() {
  // Check for saved theme preference or use system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark")
  }

  // Add theme toggle button to header
  const header = document.querySelector(".header-content")
  const themeToggle = document.createElement("button")
  themeToggle.className = "btn btn-icon theme-toggle"
  themeToggle.innerHTML = `
    <i class="fas fa-sun light-icon"></i>
    <i class="fas fa-moon dark-icon"></i>
    <span class="sr-only">Changer le thème</span>
  `

  // Insert before the resume button
  header.insertBefore(themeToggle, document.querySelector(".btn-outline"))

  // Add toggle functionality
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark")
    const isDark = document.documentElement.classList.contains("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  })

  // Add styles for theme toggle
  const style = document.createElement("style")
  style.textContent = `
    .theme-toggle {
      margin-right: 0.5rem;
    }
    .light-icon {
      display: block;
    }
    .dark-icon {
      display: none;
    }
    .dark .light-icon {
      display: none;
    }
    .dark .dark-icon {
      display: block;
    }
  `
  document.head.appendChild(style)
}

// Mobile navigation menu
function setupMobileNav() {
  const header = document.querySelector(".header-content")
  const mobileMenuBtn = document.createElement("button")
  mobileMenuBtn.className = "btn btn-icon mobile-menu-btn"
  mobileMenuBtn.innerHTML = `
    <i class="fas fa-bars"></i>
    <span class="sr-only">Menu</span>
  `

  // Only show on mobile
  const style = document.createElement("style")
  style.textContent = `
    .mobile-menu-btn {
      display: block;
    }
    @media (min-width: 768px) {
      .mobile-menu-btn {
        display: none;
      }
    }
    .mobile-menu {
      position: fixed;
      top: 3.5rem;
      left: 0;
      right: 0;
      background-color: var(--background);
      border-bottom: 1px solid var(--border);
      padding: 1rem;
      display: none;
      flex-direction: column;
      gap: 1rem;
    }
    .mobile-menu.active {
      display: flex;
    }
    .mobile-menu .nav-link {
      font-size: 1rem;
      padding: 0.5rem 0;
    }
  `
  document.head.appendChild(style)

  // Create mobile menu
  const mobileMenu = document.createElement("div")
  mobileMenu.className = "mobile-menu"

  // Clone nav links
  const navLinks = document.querySelectorAll(".main-nav .nav-link")
  navLinks.forEach((link) => {
    const clone = link.cloneNode(true)
    mobileMenu.appendChild(clone)
  })

  // Add to DOM
  document.body.appendChild(mobileMenu)
  header.insertBefore(mobileMenuBtn, header.firstChild)

  // Toggle functionality
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })

  // Close menu when clicking a link
  mobileMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove("active")
    }
  })
}

// Contact form handling
function setupContactForm() {
  const form = document.getElementById("contact-form")
  const formMessage = document.getElementById("form-message")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(form)
      const name = formData.get("name")
      const email = formData.get("email")
      const message = formData.get("message")

      // Validate form (simple validation)
      if (!name || !email || !message) {
        formMessage.textContent = "Veuillez remplir tous les champs."
        return
      }

      // Show sending state
      const submitBtn = form.querySelector('button[type="submit"]')
      const originalBtnText = submitBtn.textContent
      submitBtn.textContent = "Envoi en cours..."
      submitBtn.disabled = true

      // Simulate form submission (since we don't have a backend)
      setTimeout(() => {
        // Log to console (in a real app, you'd send this to a server)
        console.log("Form submission:", { name, email, message })

        // Reset form
        form.reset()

        // Show success message
        formMessage.textContent = "Merci pour votre message ! Je vous répondrai bientôt."

        // Reset button
        submitBtn.textContent = originalBtnText
        submitBtn.disabled = false

        // Clear message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = ""
        }, 5000)
      }, 1500)
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle()
  setupMobileNav()
  setupContactForm()

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
})

