(function () {
  'use strict';
  var WA = '5514998449303';
  window.dataLayer = window.dataLayer || [];
  function track(evento, dados) {
    var o = { event: evento };
    for (var k in dados) o[k] = dados[k];
    window.dataLayer.push(o);
  }

  // Ano no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Topo sólido ao rolar
  var topo = document.getElementById('topo');
  function onScroll() {
    topo.classList.toggle('is-solido', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Parallax leve no hero
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heroImg = document.querySelector('.hero__img img');
  if (heroImg && !reduz) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, window.innerHeight);
        heroImg.style.transform = 'translate3d(0,' + (y * -0.12) + 'px,0)';
        tick = false;
      });
    }, { passive: true });
  }

  // Scroll reveal
  var alvos = document.querySelectorAll('.reveal, .corte');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    alvos.forEach(function (el) { io.observe(el); });
  } else {
    alvos.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Vitrine de materiais
  var matImg = document.getElementById('matImg');
  var itens = document.querySelectorAll('.mat__item');
  var atual = null;
  function mostra(btn) {
    if (!matImg || btn === atual) return;
    atual = btn;
    itens.forEach(function (b) { b.classList.toggle('is-ativo', b === btn); b.setAttribute('aria-pressed', b === btn); });
    var src = btn.getAttribute('data-img');
    var alt = btn.getAttribute('data-alt');
    matImg.classList.add('is-trocando');
    var pre = new Image();
    pre.onload = function () {
      setTimeout(function () {
        matImg.src = src; matImg.alt = alt;
        matImg.classList.remove('is-trocando');
      }, 180);
    };
    pre.src = src;
  }
  itens.forEach(function (b, i) {
    if (i === 0) { atual = b; b.setAttribute('aria-pressed', 'true'); } else b.setAttribute('aria-pressed', 'false');
    b.addEventListener('mouseenter', function () { mostra(b); });
    b.addEventListener('focus', function () { mostra(b); });
    b.addEventListener('click', function () { mostra(b); });
  });

  // Cliques de WhatsApp
  document.querySelectorAll('.js-wa').forEach(function (a) {
    a.addEventListener('click', function () {
      track('whatsapp_click', { local: a.getAttribute('data-local') || 'indefinido' });
    });
  });

  // Formulário: sem Apps Script, monta a mensagem completa e envia pro WhatsApp
  var form = document.getElementById('formOrc');
  if (!form) return;
  var btn = document.getElementById('formBtn');
  var nota = document.getElementById('formNota');
  var tel = document.getElementById('f-tel');

  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '').slice(0, 11);
    var f = d;
    if (d.length > 2) f = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 6) f = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(d.length - 4);
    tel.value = f;
  });
  tel.addEventListener('blur', function () {
    tel.classList.toggle('is-erro', tel.value !== '' && !tel.checkValidity());
  });

  function valida() {
    var ok = form.checkValidity();
    btn.disabled = !ok;
    nota.textContent = ok ? 'Tudo certo. O WhatsApp abre com a sua mensagem pronta.' : 'Preencha os campos para liberar o envio.';
  }
  form.addEventListener('input', valida);
  form.addEventListener('change', valida);
  valida();

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var v = function (n) { return (form.elements[n].value || '').trim(); };
    var linhas = [
      'Olá, vim pelo site da Decor Pedras e quero um orçamento.',
      '',
      '*Nome:* ' + v('nome'),
      '*WhatsApp:* ' + v('whatsapp'),
      '*Cidade da obra:* ' + v('cidade'),
      '*Perfil:* ' + v('perfil'),
      '*Ambiente:* ' + v('ambiente'),
      '*Material de interesse:* ' + v('material'),
      '*Fase da obra:* ' + v('fase')
    ];
    if (v('mensagem')) linhas.push('*Sobre o projeto:* ' + v('mensagem'));
    var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(linhas.join('\n'));

    track('generate_lead', { form: 'orcamento', ambiente: v('ambiente'), material: v('material'), perfil: v('perfil') });

    var janela = window.open(url, '_blank');
    if (janela) { try { janela.opener = null; } catch (e) {} }
    if (!janela) {
      // Pop-up bloqueado: abre na mesma aba
      window.location.href = url;
    } else {
      window.location.href = 'obrigado.html';
    }
  });
})();
