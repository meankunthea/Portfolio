
// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {

  // ============================================================
  // 1. LOADING SCREEN
  // ============================================================
  const loadingScreen = document.getElementById('loading-screen');
  
  window.addEventListener('load', function() {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      // Remove from DOM after fade
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 800); // Show loader for at least 800ms for smooth UX
  });

  // ============================================================
  // 2. DARK MODE TOGGLE
  // ============================================================
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    html.classList.add('dark');
  }

  themeToggle.addEventListener('click', function() {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  });

  // ============================================================
  // 3. MOBILE MENU TOGGLE
  // ============================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIcon = mobileMenuBtn.querySelector('i');

  mobileMenuBtn.addEventListener('click', function() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      if (!mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    }
  });

  // ============================================================
  // 4. SMOOTH SCROLLING
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================================
  // 5. NAVBAR SCROLL EFFECTS
  // ============================================================
  const navbar = document.getElementById('navbar');
  
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ============================================================
  // 6. ACTIVE NAV LINK HIGHLIGHTING
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ============================================================
  // 7. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optionally unobserve after reveal
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ============================================================
  // 8. ANIMATED TYPING EFFECT
  // ============================================================
  const typingElement = document.getElementById('typing-text');
  const typingTexts = [
    'Frontend Developer',
    'IT Student',
    'Web Designer',
    'React Developer',
    'UI/UX Enthusiast'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
      // Deleting characters
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing characters
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal speed when typing
    }

    // Check if word is complete
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 2000; // Wait 2 seconds before deleting
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      typingSpeed = 500; // Brief pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start typing effect after loading
  setTimeout(typeEffect, 1000);

  // ============================================================
  // 9. ANIMATED COUNTERS
  // ============================================================
  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach(counter => {
          animateCounter(counter);
        });
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target + '+';
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + '+';
      }
    }, 16);
  }

  // ============================================================
  // 10. SKILL PILLS ENTRANCE ANIMATION
  // ============================================================
  const skillPills = document.querySelectorAll('.skill-pill');

  const pillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Staggered entrance for all pills
        skillPills.forEach((pill, index) => {
          setTimeout(() => {
            pill.classList.add('visible');
          }, index * 60); // 60ms stagger between each pill
        });
        pillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Observe the container
  const pillsContainer = document.querySelector('.skills-pills-container');
  if (pillsContainer) {
    pillsObserver.observe(pillsContainer);
  }

  // ============================================================
  // 11. PROJECT FILTERING
  // ============================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.classList.remove('bg-primary', 'text-white');
        b.classList.add('bg-slate-200', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
      });
      this.classList.add('active');
      this.classList.remove('bg-slate-200', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
      this.classList.add('bg-primary', 'text-white');

      const filter = this.getAttribute('data-filter');

      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden-project');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.classList.add('hidden-project');
          }, 300);
        }
      });
    });
  });

  // ============================================================
  // 12. BACK TO TOP BUTTON
  // ============================================================
  const backToTopBtn = document.getElementById('back-to-top');

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ============================================================
  // 13. CONTACT FORM HANDLING
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Show loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate sending (replace with actual API call)
    setTimeout(() => {
      showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.disabled = false;
    }, 1500);

    /* 
    // ACTUAL API INTEGRATION EXAMPLE:
    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    })
    .then(response => response.json())
    .then(data => {
      showToast('Message sent successfully!', 'success');
      contactForm.reset();
    })
    .catch(error => {
      showToast('Something went wrong. Please try again.', 'error');
    })
    .finally(() => {
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.disabled = false;
    });
    */
  });

  // Toast notification function
  function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(toast);

    // Show toast
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Hide after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4000);
  }

  // ============================================================
  // 14. SET CURRENT YEAR IN FOOTER
  // ============================================================
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ============================================================
  // 15. PARALLAX EFFECT (subtle background movement)
  // ============================================================
  const heroSection = document.getElementById('home');
  
  function handleParallax() {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      const decorations = heroSection.querySelectorAll('.absolute');
      decorations.forEach((dec, index) => {
        if (dec.classList.contains('pointer-events-none')) {
          const speed = 0.1 + (index * 0.02);
          dec.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    }
  }

  // ============================================================
  // 16. HEADER SHADOW ON SCROLL
  // ============================================================
  // Debounced scroll handler combining multiple scroll-based functions
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavbarScroll();
        highlightActiveNav();
        handleBackToTop();
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================================================
  // 17. INFO CARD ENTRANCE ANIMATION
  // ============================================================
  const infoCards = document.querySelectorAll('.info-card');
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  infoCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });

  // ============================================================
  // 18. SOCIAL ICON ENTRANCE IN HERO
  // ============================================================
  const socialIcons = document.querySelectorAll('.social-icon');
  
  socialIcons.forEach((icon, index) => {
    icon.style.opacity = '0';
    icon.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      icon.style.opacity = '1';
      icon.style.transform = 'translateY(0)';
    }, 1200 + (index * 100)); // Start after typing effect begins
  });

  // ============================================================
  // 19. NAVBAR LINK HOVER EFFECT
  // ============================================================
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(-2px)';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // ============================================================
  // 20. TIMELINE ITEM REVEAL
  // ============================================================
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const content = entry.target.querySelector('.glass');
        if (content) {
          setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateX(0)';
          }, index * 200);
        }
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  timelineItems.forEach(item => {
    const content = item.querySelector('.glass');
    if (content) {
      // Check if it's on the left or right side
      const isRightSide = content.parentElement.classList.contains('md:pl-12');
      content.style.opacity = '0';
      content.style.transform = isRightSide ? 'translateX(30px)' : 'translateX(-30px)';
      content.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    }
    timelineObserver.observe(item);
  });

  // ============================================================
  // 21. SKILL PILLS ENTRANCE (handled in section 10)
  // ============================================================

  // ============================================================
  // 22. PROJECT CARD ENTRANCE STAGGER
  // ============================================================
  const projectCardsList = document.querySelectorAll('.project-card');
  
  const projectCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
        projectCardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  projectCardsList.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectCardObserver.observe(card);
  });

  // ============================================================
  // 23. SERVICE CARD ENTRANCE STAGGER
  // ============================================================
  const serviceCards = document.querySelectorAll('.service-card');
  
  const serviceCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
        serviceCardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    serviceCardObserver.observe(card);
  });

  // ============================================================
  // 24. KEYBOARD NAVIGATION SUPPORT
  // ============================================================
  document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      closeMobileMenu();
    }
  });

  // ============================================================
  // 25. PERFORMANCE: PAUSE ANIMATIONS WHEN TAB IS HIDDEN
  // ============================================================
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Pause non-essential animations
      document.body.classList.add('paused');
    } else {
      document.body.classList.remove('paused');
    }
  });

}); // End DOMContentLoaded
