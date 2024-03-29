const changeActiveLink = (page: string): void => {
  const oldlink = document.querySelector('.active');
  oldlink?.classList.remove('active');
  oldlink?.removeAttribute('aria-current');

  const navlink =
    page === '/' || page === '/app'
      ? page === '/'
        ? document.querySelectorAll("a[href='/']")[1]
        : document.querySelectorAll("a[href='/app']")[1]
      : document.querySelector(`a[href='${page}']`);
  navlink?.classList.add('active');
  navlink?.setAttribute('aria-current', 'page');
};

export default changeActiveLink;
