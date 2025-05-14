document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality with enhanced animation
  const themeToggle = document.getElementById("theme-toggle")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  const formNotification = document.getElementById("form-notification")

  // Check for saved theme preference or use the system preference
  const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light")

  // Set the initial theme
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark")
  } else {
    document.documentElement.removeAttribute("data-theme")
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    let theme = "light"

    if (!document.documentElement.hasAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "dark")
      theme = "dark"
    } else {
      document.documentElement.removeAttribute("data-theme")
    }

    // Save the preference
    localStorage.setItem("theme", theme)
  })

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")
  const navLinksItems = document.querySelectorAll(".nav-links li")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      // Toggle navigation
      navLinks.classList.toggle("active")
      hamburger.classList.toggle("active")

      // Animate links
      navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
      })
    })
  }

  // Enhanced Smooth scrolling for all navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      }

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        smoothScrollTo(targetElement.offsetTop - 70, 800) // Smooth scroll with custom duration
      }
    })
  })

  const hero = document.querySelector(".hero")

  window.addEventListener("load", () => {
    hero.classList.add("visible-on-load")
  })

  // Custom smooth scroll function for consistent behavior
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const scrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, scrollY)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    // Easing function for smoother animation
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  // Active navigation link on scroll with improved performance
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-link")
  let isScrolling = false

  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      isScrolling = true

      // Use requestAnimationFrame for better performance
      window.requestAnimationFrame(() => {
        let current = ""
        const scrollPosition = window.pageYOffset + 200

        sections.forEach((section) => {
          const sectionTop = section.offsetTop
          const sectionHeight = section.clientHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute("id")
          }
        })

        navItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active")
          }
        })

        isScrolling = false
      })
    }

    // Also check for animations while scrolling
    checkScroll()
  })

  // Enhanced Scroll animations with improved performance
  const animateElements = document.querySelectorAll(".animate")
  let ticking = false

  function checkScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        animateElements.forEach((element) => {
          if (element.classList.contains("hero")) {
            element.classList.add("visible")
            return
          }
          const elementTop = element.getBoundingClientRect().top
          const windowHeight = window.innerHeight
          const triggerPoint = windowHeight * 0.85 // Trigger animations a bit earlier

          if (elementTop < triggerPoint) {
            element.classList.add("visible")
          } else if (elementTop > windowHeight) {
            // Reset animation when element is out of view (for scrolling back up)
            element.classList.remove("visible")
          }
        })
        ticking = false
      })
      ticking = true
    }
  }
})
