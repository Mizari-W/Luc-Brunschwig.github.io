var divBD = document.querySelector("#BD"); // récupération de l'emplacement des BDs
var allBDs = []; // tableau pour stocker les BDs (objets)
var lucReq = new XMLHttpRequest(); // objet pour fair eles requêtes http

lucReq.open("GET", "https://www.bedetheque.com/auteur-4544-BD-Brunschwig-Luc.html", true); // requête sur la page de Luc Brunschwig
lucReq.responseType = "document"; // on veut une réponse de type "document"

// traitement des données
lucReq.onload = async function(e) {
  var documentLuc = lucReq.response; // récupération de la page
  // on cherche le tableau qui contient les BDs et on récupère toutes les lignes
  var lines = documentLuc.querySelector("table").querySelector("tbody").querySelectorAll("tr");
  // on parcour les lignes
  lines.forEach(line => {
    var BD  = {}; // objet BD qui sera stocké dans le tableau

    // on stock tous les éléments dans une variable (au cas ou)
    var items = line.querySelectorAll("td");
    if (items[0].querySelector(".ico").querySelector("img").getAttribute("src").endsWith("France.png")) {
      // on récupère le lien pour avoir des infos sur la BD en question
      var link = items[0].querySelector(".serie").querySelector("a").getAttribute("href");
      BD.link = link; // on remplit l'objet en ajoutant l'attribut "link"

      // on récupère son nom ça peut être bien
      var name = items[0].querySelector(".serie").innerText;
      BD.name = name; // on ajoute l'attribut "name"

      // on récupère la date de sortie (pour faire un trie plus tard)
      var date = items[1].innerText;
      date = date.replace(/\D/g, ""); // y avait un truc bizarre dans la string du coup je fais en sorte de récupérer que les chiffres
      BD.date = parseInt(date, 10); // on ajoute l'attribut "date" converti en int

      // récupération des données sur la BD
      var bdReq = new XMLHttpRequest();
      bdReq.open("GET", link, true);
      bdReq.responseType = "document";
      bdReq.onload = function (e) {
        var documentBD = bdReq.response; // page de la BD
        // récupération de l'image de couv (du tome 1)
        var linkImg = documentBD.querySelector(".liste-albums").querySelector(".couv").querySelector("img").getAttribute("src");
        linkImg = linkImg.replace("cache/thb_couv", "media/Couvertures");

        BD.img = linkImg; // on ajoute l'attribut "img"
        allBDs.push(BD); // on ajoute la BD au tableau
      }
      bdReq.send();
    }
  });
  await until(_ => allBDs.length > 0);
  allBDs.sort((a, b) => a.date - b.date);
  allBDs.forEach(BD => {
    let div = document.createElement("div");
    div.setAttribute("class", "col-lg-2 text-center text-break");
    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", BD.link);
    linkElement.setAttribute("target", "_blank");
    linkElement.setAttribute("class", "mr-3")
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", BD.img);
    imgElement.setAttribute("style", "width: 100%;");
    imgElement.setAttribute("class", "rounded");
    linkElement.appendChild(imgElement);
    div.appendChild(linkElement);
    let pElement = document.createElement("p");
    pElement.innerText = BD.name;
    div.appendChild(pElement);
    divBD.appendChild(div);
  });

}
lucReq.send();







function until(conditionFunction) {

  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  }

  return new Promise(poll);
}
