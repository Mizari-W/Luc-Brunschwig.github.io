var divBD = document.querySelector("#BD"); // récupération de l'emplacement des BDs
var divLoad = divBD.querySelector(".lds-ring"); // récupération de la div de chargement (pour la delete après)
var lucReq = new XMLHttpRequest(); // objet pour fair eles requêtes http
if (localStorage['allBDs'] === undefined) {
  // tableau pour stocker les BDs (objets)
  localStorage['allBDs'] = "";
  var allBDs = [];
} else {
  var allBDs = JSON.parse(localStorage['allBDs']);
}

lucReq.open("GET", "https://www.bedetheque.com/auteur-4544-BD-Brunschwig-Luc.html", true); // requête sur la page de Luc Brunschwig
lucReq.responseType = "document"; // on veut une réponse de type "document"

// traitement des données
lucReq.onreadystatechange = async function(e) {
  if (this.readyState == 4){
    var documentLuc = lucReq.response; // récupération de la page
    // on cherche le tableau qui contient les BDs et on récupère toutes les lignes
    var lines = documentLuc.querySelector("table").querySelector("tbody").querySelectorAll("tr");
    // on parcour les lignes
    lines.forEach(line => {
      var BD  = {}; // objet BD qui sera stocké dans le tableau

      // on stock tous les éléments dans une variable (au cas ou)
      var items = line.querySelectorAll("td");
      if (items[0].querySelector(".ico").querySelector("img").getAttribute("src").endsWith("France.png")) {

        // on récupère son nom ça peut être bien
        var name = items[0].querySelector(".serie").innerText;

        if (allBDs.find(bd => bd.name === name) !== undefined) {
          BD = allBDs.find(bd => bd.name === name);
        } else {
          BD.name = name; // on ajoute l'attribut "name"

          // on récupère le lien pour avoir des infos sur la BD en question
          var link = items[0].querySelector(".serie").querySelector("a").getAttribute("href");
          link = link.replace(".html", "__10000.html"); // on ajoute "__10000" pour afficher toutes les BDs
          BD.link = link; // on remplit l'objet en ajoutant l'attribut "link"

          // on récupère la date de sortie (pour faire un trie plus tard)
          var date = items[1].innerText;
          date = date.replace(/\D/g, ""); // y avait un truc bizarre dans la string du coup je fais en sorte de récupérer que les chiffres
          BD.date = parseInt(date, 10); // on ajoute l'attribut "date" converti en int

          // récupération des données sur la BD
          var bdReq = new XMLHttpRequest();
          bdReq.open("GET", link, true);
          bdReq.responseType = "document";
          bdReq.onreadystatechange = async function (e) {
            if (this.readyState == 4){
              var documentBD = bdReq.response; // page de la BD
              var allNodes = Array.prototype.slice.call(documentBD.querySelector(".liste-albums").childNodes); // on récupère la liste des BDs \...
              var listBDs = allNodes.filter(item => item.nodeName === "LI"); // .../
              var linkImg = ""; // on prépare la variable
              // on parcour la liste pour trouver celle qui a été faite par Luc (si c'est pas sa série, sinon on garde la première)
              for (var i = 0; i < listBDs.length; i++) {
                await until(_ => listBDs[i].querySelector(".infos") != null);
                await until(_ => listBDs[i].querySelector(".infos").children.length > 0);

                if(listBDs[i].querySelector(".infos").innerText.includes("Brunschwig, Luc")){
                  // récupération de l'image de couv (du tome 1 ou du tome fait par Luc)
                  linkImg = listBDs[i].querySelector(".couv").querySelector("img").getAttribute("src");
                  break;
                }
              }
              // await until(_ => linkImg != "");
              linkImg = linkImg.replace("cache/thb_couv", "media/Couvertures"); // on arrange l'URL pour avoir l'image en grand
              BD.img = linkImg; // on ajoute l'attribut "img"
              allBDs.push(BD); // on ajoute la BD au tableau
            }
          }
          bdReq.send();
        }
      }
    });
    // on attend que la liste soit remplie
    await until(_ => allBDs.length > 0);
    // on enregistre la liste en local
    localStorage["allBDs"] = JSON.stringify(allBDs);
    // tie de la liste par date
    allBDs.sort((a, b) => a.date - b.date);
    await ShowBDs(allBDs);
  }
}
lucReq.send();






async function ShowBDs(BDs) {
  await BDs.forEach(BD => {
    let div = document.createElement("div");
    div.setAttribute("class", "col-lg-2 text-center text-break");
    div.setAttribute("data-bs-toggle", "modal");
    div.setAttribute("data-bs-target", "#modal");
    // let linkElement = document.createElement("a");
    // linkElement.setAttribute("href", BD.link);
    // linkElement.setAttribute("target", "_blank");
    // linkElement.setAttribute("class", "mr-3")
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", BD.img);
    imgElement.setAttribute("class", "rounded");
    // linkElement.appendChild(imgElement);
    // div.appendChild(linkElement);
    div.appendChild(imgElement);
    let pElement = document.createElement("p");
    pElement.innerText = BD.name;
    div.appendChild(pElement);
    divBD.appendChild(div);

    divLoad.remove();
  });
}

function until(conditionFunction) {

  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  }

  return new Promise(poll);
}
