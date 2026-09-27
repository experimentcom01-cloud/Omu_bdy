(function() {
  const stage1 = document.getElementById('stage1');
  const stage2 = document.getElementById('stage2');
  const stage3 = document.getElementById('stage3');
  const loveBtn = document.getElementById('loveBtn');

  // ====== Stage 1 to Stage 2 / 3 Transition ======
  function showStage2() {
    // Hide Stage 1, fade in Stage 2 hearts
    stage1.classList.remove('active');
    stage2.classList.add('active');
    stage3.classList.add('active');
    // Clean up any existing hearts
    cleanupHearts();
    startFloatingHearts();
  }

  function showStage3() {
    // Hide Stage 2, fade in Stage 3 content
    stage2.classList.remove('active');
    stage3.classList.add('active');
  }

  // ====== Floating Hearts Animation (under 40 particles) ======
  const HEART_COUNT = 30; // Stay well under 40 for mobile performance
  const hearts = [];

  function createHeartElement() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = Math.random() * 12 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.animationDelay = Math.random() * 1 + 's';
    return heart;
  }

  function appendHeart(heart) {
    const container = document.getElementById('heartsContainer');
    if (container) container.appendChild(heart);
  }

  function startFloatingHearts() {
    // Clean up first
    cleanupHearts();

    const colors = ['#d4a84b', '#e8a0b5', '#f4a0b5', '#f8c2cc', '#fff8e1'];

    for (let i = 0; i < HEART_COUNT; i++) {
      const heart = createHeartElement();
      hearts.push(heart);
      appendHeart(heart);

      // Trigger individual animation
      setTimeout(() => {
        if (heart.parentNode) {
          heart.style.opacity = Math.random() * 0.5 + 0.3;
          heart.style.transform = 'translateY(0) scale(1)';
          heart.style.transition = 'opacity 0.3s, transform 3s ease-in-out';
        }
      }, i * 50);
    }
  }

  function cleanupHearts() {
    hearts.forEach(heart => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    });
    hearts.length = 0;
  }

  // Auto-remove hearts after animation completes
  setTimeout(cleanupHearts, 6000);

  // ====== Button Click Handler ======
  loveBtn.addEventListener('click', function(e) {
    e.preventDefault();

    // Initial transition: Stage 1 → Stage 2 (hearts animation)
    showStage2();

    // Then transition to Stage 3 after hearts animation completes
    setTimeout(showStage3, 3500);
  });

  // Keyboard support
  loveBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });

  // Touch: prevent default on double tap to zoom
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  // Initialize: heartbeat animation on page load
  const heartElem = document.getElementById('heartbeatHeart');
  if (heartElem) {
    // Already handled by CSS keyframes, but ensure it starts
    heartElem.style.animationPlayState = 'running';
  }
})();