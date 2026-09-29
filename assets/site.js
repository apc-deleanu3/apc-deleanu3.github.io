/* APC Deleanu 3 — shared behaviour: language (RO/RU), larger text (A+),
   back-to-top button, print helpers, document tables and the apartment picker.
   Loaded at the end of every page. */
(function () {
  var d = document.documentElement;
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var fire = function (name, detail) {
    var ev; try { ev = new CustomEvent(name, { detail: detail }); } catch (e) { ev = document.createEvent('CustomEvent'); ev.initCustomEvent(name, false, false, detail); }
    document.dispatchEvent(ev);
  };

  function setLang(l) {
    d.lang = l;
    each(document.querySelectorAll('.lang button'), function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false');
    });
    store.set('apc-lang', l);
    fire('apc:lang', l);
  }
  var l = store.get('apc-lang');
  if (!l && /^ru/i.test(navigator.language || '')) l = 'ru';
  setLang(l === 'ru' ? 'ru' : 'ro');
  each(document.querySelectorAll('.lang button'), function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  var tb = document.querySelector('.tbtn[data-text]');
  function setText(on) {
    if (on) d.setAttribute('data-text', 'mare'); else d.removeAttribute('data-text');
    if (tb) tb.setAttribute('aria-pressed', on ? 'true' : 'false');
    fire('apc:text', on);
  }
  setText(store.get('apc-text') === 'mare');
  if (tb) tb.addEventListener('click', function () {
    var on = d.getAttribute('data-text') !== 'mare';
    setText(on); store.set('apc-text', on ? 'mare' : 'normal');
  });

  // "Sus" appears when the reader scrolls back up far down the page, so it never sits on text being read
  var up = document.querySelector('.to-top');
  if (up) {
    var ticking = false, lastY = window.pageYOffset;
    var check = function () {
      var y = window.pageYOffset;
      if (y < window.innerHeight * 1.5) up.classList.remove('show');
      else if (y < lastY - 6) up.classList.add('show');
      else if (y > lastY + 6) up.classList.remove('show');
      if (Math.abs(y - lastY) > 6) lastY = y;
      ticking = false;
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; window.requestAnimationFrame(check); } }, { passive: true });
  }

  // print everything, including closed answers
  var opened = [];
  window.addEventListener('beforeprint', function () {
    each(document.querySelectorAll('details:not([open])'), function (x) { x.open = true; opened.push(x); });
  });
  window.addEventListener('afterprint', function () { opened.forEach(function (x) { x.open = false; }); opened = []; });
  each(document.querySelectorAll('[data-print]'), function (b) { b.addEventListener('click', function () { window.print(); }); });

  // wide document tables (the budget) become labelled rows when they don't fit the screen
  each(document.querySelectorAll('.doc table'), function (table) {
    var heads = Array.prototype.map.call(table.querySelectorAll('thead th'), function (th) { return th.textContent.trim(); });
    if (heads.length < 3) return;
    each(table.querySelectorAll('tbody tr'), function (tr) {
      each(tr.children, function (td, i) { if (i && heads[i]) td.setAttribute('data-label', heads[i]); });
    });
    var fit = function () {
      table.classList.remove('stack');
      if (table.scrollWidth > table.clientWidth + 1) table.classList.add('stack');
    };
    fit();
    window.addEventListener('resize', fit);
    document.addEventListener('apc:text', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  });

  var APC = window.APC = {
    store: store,
    lang: function () { return d.lang === 'ru' ? 'ru' : 'ro'; },
    t: function (ro, ru) { return d.lang === 'ru' ? ru : ro; },
    fmt: function (n) { return Number(n).toLocaleString('ro-MD', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); },
    onLang: function (fn) { document.addEventListener('apc:lang', function (e) { fn(e.detail); }); },
    // "Ap. 24A", "24 a" and "24а" (Cyrillic a) all mean apartment 24a
    apKey: function (v) { return String(v || '').toLowerCase().replace(/а/g, 'a').replace(/^ap(\.|artament(ul)?)?\s*/, '').replace(/[\s.]/g, ''); },
    // A phone number pad has no letters, so when both 24 and 24a exist, offer them as two buttons.
    apPicker: function (input, box, exists) {
      function draw() {
        var k = APC.apKey(input.value), base = k.replace(/a$/, '');
        box.innerHTML = '';
        if (!/^\d+$/.test(base) || !exists(base) || !exists(base + 'a')) { box.hidden = true; return; }
        var q = document.createElement('span'); q.className = 'q';
        q.textContent = APC.t('Apartamentul dvs.:', 'Ваша квартира:');
        box.appendChild(q);
        [base, base + 'a'].forEach(function (v) {
          var b = document.createElement('button'); b.type = 'button'; b.textContent = v;
          b.setAttribute('aria-pressed', k === v ? 'true' : 'false');
          b.addEventListener('click', function () {
            input.value = v;
            var ev; try { ev = new Event('input', { bubbles: true }); } catch (e) { ev = document.createEvent('Event'); ev.initEvent('input', true, false); }
            input.dispatchEvent(ev);
            var now = box.querySelector('button[aria-pressed="true"]'); if (now) now.focus();
          });
          box.appendChild(b);
        });
        box.hidden = false;
      }
      input.addEventListener('input', draw);
      APC.onLang(draw);
      return draw;
    }
  };
})();
