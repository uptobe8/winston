
(() => {
  const drawer = document.querySelector('.mobile-drawer');
  const openMenu = () => drawer?.classList.add('is-open');
  const closeMenu = () => drawer?.classList.remove('is-open');
  document.querySelector('.menu-toggle')?.addEventListener('click', openMenu);
  document.querySelector('.drawer-backdrop')?.addEventListener('click', closeMenu);
  document.querySelector('.drawer-head button')?.addEventListener('click', closeMenu);

  document.querySelectorAll('.photo-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.photo-track');
    const buttons = carousel.querySelectorAll('.carousel-controls button');
    buttons[0]?.addEventListener('click', () => track?.scrollBy({left: -(track.clientWidth * .82), behavior:'smooth'}));
    buttons[1]?.addEventListener('click', () => track?.scrollBy({left: track.clientWidth * .82, behavior:'smooth'}));
  });

  const input = document.querySelector('.search-field input');
  const cards = [...document.querySelectorAll('.resident-card')];
  const filterButtons = [...document.querySelectorAll('.filter-pills button')];
  let period = 'Todos';
  const applyFilters = () => {
    const query = (input?.value || '').toLocaleLowerCase('es');
    let visible = 0;
    cards.forEach((card) => {
      const text = card.textContent.toLocaleLowerCase('es');
      const date = card.querySelector('.resident-date')?.textContent || '';
      const year = Number((date.match(/20\d{2}/) || ['0'])[0]);
      const inPeriod = period === 'Todos' ||
        (period === '2011–2015' && year && year <= 2015) ||
        (period === '2016–2019' && year >= 2016 && year <= 2019) ||
        (period === '2020–hoy' && year >= 2020);
      const show = inPeriod && (!query || text.includes(query));
      card.hidden = !show;
      if (show) visible++;
    });
    const count = document.querySelector('.result-count');
    if (count) count.lastChild.textContent = ' ' + visible + ' historias';
  };
  input?.addEventListener('input', applyFilters);
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    period = button.textContent.trim();
    applyFilters();
  }));

  document.querySelectorAll('.video-feature button').forEach((button) => button.addEventListener('click', () => {
    const video = button.closest('.video-feature')?.querySelector('video');
    if (!video) return;
    if (video.paused) video.play(); else video.pause();
  }));

  document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    form.innerHTML = '<div class="form-success" role="status"><h3>Mensaje preparado.</h3><p>Esta es una previsualización. En la versión final conectaremos el formulario al correo del Santuario.</p></div>';
  });
})();
