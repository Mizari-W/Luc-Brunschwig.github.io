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
      await item.querySelector("button").setAttribute("class", `nav-link ${(item.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
      await navTab.append(item);
    });
    await navTab.append(dropdown);
  }

  if (window.matchMedia("(min-width: 1400px)").matches) {
    await Reset();
  } else if (window.matchMedia("(min-width: 1200px)").matches) {
    await Reset();
    lmdlp.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(lmdlp.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    dropdown.innerHTML = `
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Autres </a>
      <ul class="dropdown-menu ${localStorage['theme']==="darkTheme"?"bg-dark":"bg-light"}">
        ${lmdlp.outerHTML}
      </ul>`;
    lmdlp.parentNode.removeChild(lmdlp);
  } else if (window.matchMedia("(min-width: 992px)").matches) {
    await Reset();
    lmdlp.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(lmdlp.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    urban.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(urban.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    sdc.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(sdc.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    dropdown.innerHTML = `
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Autres </a>
      <ul class="dropdown-menu ${localStorage['theme']==="darkTheme"?"bg-dark":"bg-light"}">
        ${sdc.outerHTML}
        ${urban.outerHTML}
        ${lmdlp.outerHTML}
      </ul>`;
    lmdlp.parentNode.removeChild(lmdlp);
    urban.parentNode.removeChild(urban);
    sdc.parentNode.removeChild(sdc);
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    await Reset();
    lmdlp.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(lmdlp.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    urban.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(urban.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    sdc.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(sdc.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    makabi.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(makabi.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    dropdown.innerHTML = `
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Autres </a>
      <ul class="dropdown-menu ${localStorage['theme']==="darkTheme"?"bg-dark":"bg-light"}">
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
    lmdlp.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(lmdlp.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    urban.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(urban.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    sdc.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(sdc.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    makabi.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(makabi.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    holmes.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(holmes.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    mystery.querySelector("button").setAttribute("class", `dropdown-item ${localStorage['theme']==="darkTheme"?"text-white":""} ${(mystery.querySelector("button").getAttribute("class").includes("active")?"active":"")}`);
    dropdown.innerHTML = `
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Autres </a>
      <ul class="dropdown-menu ${localStorage['theme']==="darkTheme"?"bg-dark":"bg-light"}">
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
