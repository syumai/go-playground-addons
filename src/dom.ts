export function initDOM() {
  const wrapper = document.getElementById('wrap') as HTMLElement;
  wrapper.insertAdjacentHTML(
    'afterbegin',
    `<div id="tabs"></div>
<textarea
  itemprop="description"
  id="codeAddon"
  autocorrect="off"
  autocomplete="off"
  autocapitalize="off"
  spellcheck="false"
></textarea>`
  );
  const script = document.createElement('script');
  script.textContent = `
$('#codeAddon').linedtextarea();
$('#codeAddon').attr('wrap', 'off');
`;
  document.body.appendChild(script);
}
