(function () {
  var KEY = 'apc-lang';
  function set(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === l ? 'true' : 'false');
    });
    try { localStorage.setItem(KEY, l); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (!saved && /^ru/i.test(navigator.language || '')) saved = 'ru';
  set(saved === 'ru' ? 'ru' : 'ro');
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { set(b.dataset.lang); });
  });
})();
