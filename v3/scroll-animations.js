(function () {
  var targets = document.querySelectorAll('.scroll-reveal');
  if (!targets.length) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    targets.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  document.querySelectorAll('.scroll-reveal--on-load').forEach(function (el) {
    requestAnimationFrame(function () {
      el.classList.add('is-visible');
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  targets.forEach(function (el) {
    if (!el.classList.contains('scroll-reveal--on-load')) {
      observer.observe(el);
    }
  });
})();
