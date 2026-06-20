/* =====================================================
   LA CAPITAL RP — script.js
   Animaciones: Loader, Partículas, Navbar scroll,
   Contador de stats, Scroll reveal, Menú móvil,
   Glitch loop, Copiar código.
===================================================== */

// =====================================================
// 1. LOADER
// =====================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hide');
    // Lanza el contador de stats una vez cargado
    initCounters();
    initParticles();
  }, 1600);
});

// =====================================================
// 2. CANVAS DE PARTÍCULAS
// =====================================================
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const COLORS = ['#9B30FF', '#C084FC', '#6B1FBB', '#ffffff'];
  // EDITABLE: Cambia la cantidad de partículas
  const PARTICLE_COUNT = 80;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); createParticles(); });

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x:      Math.random() * W,
        y:      Math.random() * H,
        r:      Math.random() * 1.5 + 0.4,
        vx:     (Math.random() - 0.5) * 0.35,
        vy:     (Math.random() - 0.5) * 0.35,
        alpha:  Math.random() * 0.55 + 0.15,
        color:  COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
  }
  createParticles();

  function drawLines() {
    // EDITABLE: Distancia máxima para dibujar líneas entre partículas
    const MAX_DIST = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(155,48,255,${0.08 * (1 - dist / MAX_DIST)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawLines();
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// =====================================================
// 3. NAVBAR — cambio al hacer scroll
// =====================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  // Actualiza el link activo
  updateActiveNavLink();
});

// =====================================================
// 4. MENÚ MÓVIL (hamburguesa)
// =====================================================
const burger  = document.getElementById('navBurger');
const navMenu = document.getElementById('navMenu');

if (burger && navMenu) {
  burger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    // Animación de las barras
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Cierra el menú al hacer clic en un link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// =====================================================
// 5. LINK ACTIVO EN NAVBAR según sección visible
// =====================================================
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

// =====================================================
// 6. SCROLL REVEAL — elementos que aparecen al entrar
// =====================================================
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Retraso escalonado para grupos de elementos
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Aplica retrasos escalonados a hijos de grids
  document.querySelectorAll('.values-grid, .features-grid, .staff-row, .steps, .community-grid').forEach(grid => {
    grid.querySelectorAll('.val-card, .feat-card, .staff-card, .step, .comm-card').forEach((child, i) => {
      child.dataset.delay = i * 100;
      // También aplica reveal individual si no lo tienen
      if (!child.classList.contains('reveal')) {
        child.classList.add('reveal');
        observer.observe(child);
      }
    });
  });

  revealEls.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', initScrollReveal);

// =====================================================
// 7. CONTADOR ANIMADO DE ESTADÍSTICAS
// =====================================================
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1800; // ms
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });
}

// =====================================================
// 8. COPIAR CÓDIGO DE SERVIDOR
// =====================================================
function copyServerCode() {
  // EDITABLE: Cambia 'LACAPIRP' si cambias el código
  const code = document.getElementById('serverCode')?.textContent || 'LACAPIRP';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(showToast).catch(() => fallbackCopy(code));
  } else {
    fallbackCopy(code);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast();
}

function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

// =====================================================
// 9. EFECTO HOVER en tarjetas de STAFF — luz que sigue el cursor
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.staff-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const x     = ((e.clientX - rect.left) / rect.width)  * 100;
      const y     = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
      card.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(155,48,255,0.08) 0%, var(--bg-card) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
});

// =====================================================
// 10. SCROLL SUAVE con offset por la navbar fija
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70; // altura de la navbar
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// =====================================================
// 11. GLITCH MANUAL en el logo hero (extra énfasis)
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  const capitalEl = document.querySelector('.hl-capital');
  if (!capitalEl) return;
  // El glitch CSS ya corre solo; aquí añadimos un pulso de brillo extra
  setInterval(() => {
    capitalEl.style.transition = 'text-shadow 0.1s';
    capitalEl.style.textShadow = '0 0 60px rgba(155,48,255,0.9), 0 0 120px rgba(155,48,255,0.4)';
    setTimeout(() => {
      capitalEl.style.textShadow = '';
    }, 150);
  }, 5000);
});

// =====================================================
// 12. NAVBAR: añade clase active al link actual en CSS
// =====================================================
// (Agrega en styles.css si quieres estilar el link activo:)
// .nav-link.active { color: var(--accent-lite); }

