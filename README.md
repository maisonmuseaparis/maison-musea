# Site Maison MUSÉA Paris

Site vitrine en fichiers simples : aucune installation, aucune base de données.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Tout le contenu du site : textes, tarifs, galerie, questions |
| `css/style.css` | Apparence. Les couleurs se changent dans le bloc `:root` en haut du fichier |
| `js/main.js` | Filtre de la galerie, sélecteur de forme, formulaire. Le numéro WhatsApp se règle en haut du fichier |
| `images/` | Photos du site |
| `mentions-legales.html` | Mentions légales, à compléter |

## À compléter avant la mise en ligne

Tout ce qui est entre crochets `[...]` dans `index.html` et `mentions-legales.html` :
prénom et parcours, diplôme, prix, téléphone, Instagram, horaires, offres, avis clientes, SIRET, hébergeur.

## Modifications courantes

- **Changer un prix** : dans `index.html`, section `TARIFS`, modifier le texte de `<span class="price">`.
- **Ajouter une photo** : déposer l'image dans `images/`, puis dans la section `RÉALISATIONS`
  remplacer `<div class="placeholder shot ...">[Votre photo]</div>` par
  `<img src="images/nom.jpg" alt="description de la pose">`.
  L'attribut `data-cat` du bloc `<figure>` (`nude`, `french`, `couleur`, `nail-art`) décide du filtre.
- **Activer WhatsApp** : dans `js/main.js`, renseigner `whatsapp: "33612345678"`.

## Mise en ligne avec GitHub Pages

1. Déposer tous ces fichiers à la racine du dépôt GitHub.
2. Dans le dépôt : Settings, puis Pages, choisir « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Le site est publié à l'adresse `https://<utilisateur>.github.io/<dépôt>/` après une à deux minutes.
4. Pour un nom de domaine : l'indiquer dans Settings, Pages, « Custom domain », puis créer chez le
   vendeur du domaine les enregistrements DNS demandés par GitHub.
