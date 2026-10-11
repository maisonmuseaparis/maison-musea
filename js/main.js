/* Maison MUSÉA Paris — scripts du site */

/* ---------- RÉGLAGES ---------- */
var CONFIG = {
  // Numéro WhatsApp au format international, sans + ni espaces. Exemple : "33612345678".
  // Tant qu'il est vide, le formulaire affiche le message à copier au lieu d'ouvrir WhatsApp.
  whatsapp: "33620402345"
};

/* ---------- GALERIE : filtre par style ---------- */
(function () {
  var boutons = document.querySelectorAll("#filtres .pill");
  var photos = document.querySelectorAll("#galerie figure");
  boutons.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      var filtre = bouton.dataset.filter;
      boutons.forEach(function (b) { b.setAttribute("aria-pressed", b === bouton ? "true" : "false"); });
      photos.forEach(function (photo) {
        photo.hidden = !(filtre === "tout" || photo.dataset.cat === filtre);
      });
    });
  });
})();

/* ---------- TROUVEZ VOTRE FORME ---------- */
(function () {
  var BASE = "14px 14px";
  var FORMES = [
    { nom: "Amande", rayon: "50% 50% " + BASE + " / 58% 58% " + BASE, decoupe: "none",
      texte: "Les côtés se resserrent vers une pointe arrondie. Elle allonge visuellement les doigts et reste confortable au quotidien.",
      ideal: "Les doigts courts ou les mains larges, en gel ou en extensions." },
    { nom: "Ovale", rayon: "50% 50% " + BASE + " / 30% 30% " + BASE, decoupe: "none",
      texte: "La plus naturelle : elle suit la courbe de la cuticule. Discrète, elle casse peu.",
      ideal: "Toutes les mains, et les ongles naturels de longueur courte à moyenne." },
    { nom: "Carré", rayon: "5px 5px " + BASE, decoupe: "none",
      texte: "Bord droit et angles nets, pour un rendu graphique. C'est la forme classique de la french.",
      ideal: "Les doigts longs et fins, avec une plaque d'ongle assez large." },
    { nom: "Carré arrondi", rayon: "26px 26px " + BASE, decoupe: "none",
      texte: "Le bord reste droit, les coins sont adoucis. Elle n'accroche pas et résiste bien aux chocs.",
      ideal: "Celles qui travaillent beaucoup avec leurs mains." },
    { nom: "Ballerine", rayon: "0 0 " + BASE, decoupe: "polygon(27% 0, 73% 0, 100% 42%, 100% 100%, 0 100%, 0 42%)",
      texte: "Longue, effilée, avec un bout coupé droit comme un chausson de danse. Elle demande de la longueur.",
      ideal: "Une pose en extensions, pour un effet affirmé." },
    { nom: "Stiletto", rayon: "50% 50% " + BASE + " / 94% 94% " + BASE, decoupe: "none",
      texte: "Très longue et pointue, c'est la plus spectaculaire. Elle est aussi plus fragile que les autres.",
      ideal: "Les grandes occasions, toujours en extensions." }
  ];

  var zone = document.getElementById("formes");
  var ongle = document.getElementById("ongle");
  if (!zone || !ongle) return;

  function afficher(index) {
    var forme = FORMES[index];
    ongle.style.borderRadius = forme.rayon;
    ongle.style.clipPath = forme.decoupe;
    document.getElementById("forme-nom").textContent = forme.nom;
    document.getElementById("forme-texte").textContent = forme.texte;
    document.getElementById("forme-ideal").textContent = forme.ideal;
    zone.querySelectorAll(".pill").forEach(function (b, i) {
      b.setAttribute("aria-pressed", i === index ? "true" : "false");
    });
  }

  FORMES.forEach(function (forme, index) {
    var bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "pill";
    bouton.textContent = forme.nom;
    bouton.addEventListener("click", function () { afficher(index); });
    zone.appendChild(bouton);
  });
  afficher(0);
})();

/* ---------- FORMULAIRE DE RENDEZ-VOUS ---------- */
(function () {
  var form = document.getElementById("form-rdv");
  if (!form) return;
  var erreur = document.getElementById("rdv-erreur");
  var resultat = document.getElementById("rdv-resultat");
  var titre = document.getElementById("rdv-resultat-titre");
  var texte = document.getElementById("rdv-resultat-texte");
  var copier = document.getElementById("rdv-copier");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var prenom = form.prenom.value.trim();
    var tel = form.tel.value.trim();
    resultat.hidden = true;

    if (!prenom || !tel) {
      erreur.textContent = "Indiquez votre prénom et votre numéro de téléphone pour que je puisse vous rappeler.";
      erreur.hidden = false;
      (prenom ? form.tel : form.prenom).focus();
      return;
    }
    erreur.hidden = true;

    var lignes = [
      "Bonjour, je souhaite prendre rendez-vous.",
      "Prénom : " + prenom,
      "Téléphone : " + tel,
      "Prestation : " + form.prestation.value,
      "Lieu : " + form.lieu.value
    ];
    if (form.message.value.trim()) lignes.push("Précisions : " + form.message.value.trim());
    var message = lignes.join("\n");

    texte.textContent = message;
    resultat.hidden = false;

    if (CONFIG.whatsapp) {
      titre.textContent = "WhatsApp s'ouvre avec votre demande. S'il ne s'ouvre pas, copiez le message ci-dessous.";
      window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(message), "_blank", "noopener");
    } else {
      titre.textContent = "Votre demande est prête. Copiez ce message et envoyez-le sur WhatsApp ou Instagram (maisonmuseaparis).";
    }
  });

  copier.addEventListener("click", function () {
    var fini = function () { copier.textContent = "Message copié"; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texte.textContent).then(fini, function () {});
    } else {
      var selection = window.getSelection();
      var plage = document.createRange();
      plage.selectNodeContents(texte);
      selection.removeAllRanges();
      selection.addRange(plage);
    }
  });
})();

/* ---------- Année du pied de page ---------- */
(function () {
  var annee = document.getElementById("annee");
  if (annee) annee.textContent = new Date().getFullYear();
})();
