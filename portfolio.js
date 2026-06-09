 const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => {
        if (el.isIntersecting) {
          el.target.classList.add('visible');
          // Also trigger timeline items
          el.target.querySelectorAll && el.target.querySelectorAll('.timeline-item').forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 150);
          });
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Separate observer for timeline items directly
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(el => {
        if (el.isIntersecting) el.target.classList.add('visible');
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-item').forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.12}s`;
      tlObserver.observe(item);
    });

    // Skill bar animation on scroll
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-fill').forEach(bar => {
            const w = getComputedStyle(bar).getPropertyValue('--w') || bar.style.getPropertyValue('--w') || 0.8;
            bar.style.transform = `scaleX(${w})`;
          });
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
      });
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
      });
    });