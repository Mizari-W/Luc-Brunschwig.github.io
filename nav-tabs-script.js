async function Redim() {
  let navTab = document.querySelector("#StoryTab");
  let dropdown = navTab.querySelector(".dropdown");
  await until(_ => dropdown !== null);


  let lmdlp = navTab.querySelector("#lmdlp-tab").parentNode;
  let urban = navTab.querySelector("#urban-tab").parentNode;
  let sdc = navTab.querySelector("#sdc-tab").parentNode;
  let makabi = navTab.querySelector("#makabi-tab").parentNode;
  let holmes = navTab.querySelector("#holmes-tab").parentNode;
  let mystery = navTab.querySelector("#mystery-tab").parentNode;

  async function Reset(){
    let items = dropdown.querySelectorAll("li");
    dropdown.innerHTML = "";
    await items.forEach(async item => {
      await navTab.append(item);
    });
    await navTab.append(dropdown);
  }

  if (window.matchMedia("(min-width: 1400px)").matches) {
    await Reset();
  } else if (window.matchMedia("(min-width: 1200px)").matches) {
    await Reset();
    dropdown.innerHTML = `
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Autres </a>
      <ul class="dropdown-menu bg-dark">
        ${lmdlp.outerHTML}
      </ul>`;
    lmdlp.parentNode.removeChild(lmdlp);
  } else if (window.matchMedia("(min-width: 992px)").matches) {
    await Reset();
    dropdown.innerHTML = `
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Autres </a>
      <ul class="dropdown-menu bg-dark">
        ${sdc.outerHTML}
        ${urban.outerHTML}
        ${lmdlp.outerHTML}
      </ul>`;
    lmdlp.parentNode.removeChild(lmdlp);
    urban.parentNode.removeChild(urban);
    sdc.parentNode.removeChild(sdc);
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    await Reset();
    dropdown.innerHTML = `
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Autres </a>
      <ul class="dropdown-menu bg-dark">
        ${makabi.outerHTML}
        ${sdc.outerHTML}
        ${urban.outerHTML}
        ${lmdlp.outerHTML}
      </ul>`;
    lmdlp.parentNode.removeChild(lmdlp);
    urban.parentNode.removeChild(urban);
    sdc.parentNode.removeChild(sdc);
    makabi.parentNode.removeChild(makabi);
  } else if (window.matchMedia("(min-width: 576px)").matches) {
    await Reset();
    dropdown.innerHTML = `
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Autres </a>
      <ul class="dropdown-menu bg-dark">
        ${mystery.outerHTML}
        ${holmes.outerHTML}
        ${makabi.outerHTML}
        ${sdc.outerHTML}
        ${urban.outerHTML}
        ${lmdlp.outerHTML}
      </ul>`;
    lmdlp.parentNode.removeChild(lmdlp);
    urban.parentNode.removeChild(urban);
    sdc.parentNode.removeChild(sdc);
    makabi.parentNode.removeChild(makabi);
    holmes.parentNode.removeChild(holmes);
    mystery.parentNode.removeChild(mystery);
  }
}

window.addEventListener("DOMContentLoaded", Redim);
window.addEventListener("resize", Redim);
