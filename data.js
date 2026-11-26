/* ==========================================================
   Mathis Poirier (SkayZax), données du portfolio
   Projets, compétences et métadonnées
   ========================================================== */

const PORTFOLIO_DATA = {
  profile: {
    name: "Mathis Poirier",
    pseudo: "SkayZax",
    role: "Développeur logiciel et web",
    education: "Étudiant en BUT Informatique",
    status: "À la recherche d'un stage ou d'une alternance, début possible le 15 mars 2027",
    bio: "Je programme surtout en Java, et je fais aussi des sites web.",
    location: "Lens (mobile sur Lille, Arras et alentours)",
    email: "mathis140500@gmail.com",
    github: "https://github.com/skayzax",
    linkedin: "https://www.linkedin.com/in/mathis-poirier1/",
    website: "https://skayzax.fr/",
    cvFr: "cv/cv-fr.pdf",
    cvEn: "cv/cv-ang.pdf"
  },

  contact: {
    // Clé Web3Forms (publique, à obtenir sur https://web3forms.com)
    web3formsKey: "fbdd2a7b-1d47-480d-9d52-43e6a3b03de3"
  },

  skills: {
    languages: [
      { id: "java", name: "Java (21/17)", icon: "java/java-original", category: "lang", count: 3 },
      { id: "javafx", name: "JavaFX", icon: "java/java-original", category: "lang", count: 3 },
      { id: "python", name: "Python", icon: "python/python-original", category: "lang", count: 1 },
      { id: "javascript", name: "JavaScript", icon: "javascript/javascript-original", category: "lang", count: 1 },
      { id: "php", name: "PHP", icon: "php/php-original", category: "lang", count: 1 },
      { id: "sql", name: "SQL / PLpgSQL", icon: "postgresql/postgresql-original", category: "lang", count: 2 },
      { id: "html", name: "HTML5", icon: "html5/html5-original", category: "lang", count: 2 },
      { id: "css", name: "CSS3", icon: "css3/css3-original", category: "lang", count: 2 }
    ],
    tools: [
      { id: "git", name: "Git & GitHub/GitLab", icon: "git/git-original", category: "tool" },
      { id: "intellij", name: "IntelliJ IDEA", icon: "intellij/intellij-original", category: "tool" },
      { id: "vscode", name: "VS Code", icon: "vscode/vscode-original", category: "tool" },
      { id: "gradle", name: "Gradle", icon: "gradle/gradle-original", category: "tool" },
      { id: "postgres", name: "PostgreSQL", icon: "postgresql/postgresql-original", category: "tool" },
      { id: "docker", name: "Docker", icon: "docker/docker-original", category: "tool" },
      { id: "pycharm", name: "PyCharm", icon: "pycharm/pycharm-original", category: "tool" }
    ]
  },

  projects: [
    {
      id: "pacman-javafx",
      title: "Pac-Man JavaFX",
      subtitle: "Jeu d'arcade en JavaFX",
      featured: true,
      platform: "desktop",
      platformLabel: "Desktop (JavaFX)",
      kind: "Universitaire",
      date: "2025",
      image: "assets/pacman.jpg",
      logo: "assets/logos/pacman.svg",
      logoTheme: "night",
      screenshots: [
        { src: "assets/captures/pacman-1.webp", alt: "Écran de départ de Pac-Man" },
        { src: "assets/captures/pacman-2.webp", alt: "Début de partie de Pac-Man avec quatre fantômes" },
        { src: "assets/captures/pacman-3.webp", alt: "Partie de Pac-Man en cours, score 940" }
      ],
      description: "Pac-Man refait en JavaFX, à quatre, pendant le BUT Informatique.",
      longDescription: "Projet universitaire réalisé à quatre, à partir d'une base fournie en cours. Le joueur commence avec trois vies, mange les pac-gommes et évite quatre fantômes qui se déplacent au hasard.",
      myRole: [
        "J'ai écrit la classe PacMan : les vies et le score sont des propriétés JavaFX liées à l'affichage.",
        "Les collisions du joueur : 10 points par pac-gomme, une vie en moins au contact d'un fantôme, fin de partie à zéro vie.",
        "Le retour de Pac-Man à sa position de départ après la perte d'une vie."
      ],
      highlights: [
        "Carte générée par le programme.",
        "Collisions entre le joueur, les fantômes et les pac-gommes, avec un score et des vies.",
        "Boucle de jeu avec un AnimationTimer.",
        "Code séparé entre le modèle, la vue et le contrôleur."
      ],
      designPatterns: ["MVC"],
      tech: ["Java", "JavaFX", "Gradle"],
      githubUrl: "https://github.com/SkayZax/pacman",
      demoUrl: null,
      stats: { architecture: "MVC", loop: "AnimationTimer", stack: "Java 21" }
    },
    {
      id: "bomberman-javafx",
      title: "BomberMan",
      subtitle: "Jeu JavaFX en MVC",
      featured: true,
      platform: "desktop",
      platformLabel: "Desktop (JavaFX)",
      kind: "Universitaire",
      date: "2025",
      image: "assets/bomberman.jpg",
      logo: "assets/logos/bomberman.png",
      logoTheme: "night",
      screenshots: [
        { src: "assets/captures/bomberman-1.webp", alt: "Carte de BomberMan avec le joueur et trois ennemis" },
        { src: "assets/captures/bomberman-2.webp", alt: "Une autre carte de BomberMan générée au lancement" }
      ],
      description: "Un BomberMan en JavaFX, avec une carte aléatoire et des ennemis qui se déplacent.",
      longDescription: "Le joueur se déplace avec les flèches sur une carte créée au lancement, où trois ennemis bougent au hasard. Les bombes ne sont pas encore jouables.",
      highlights: [
        "Carte de 13 lignes et 15 colonnes, avec 20 murs de briques placés au hasard.",
        "Trois ennemis qui avancent d'une case par seconde.",
        "Murs et briques qui bloquent le passage.",
        "Une façade entre le contrôleur et le modèle."
      ],
      designPatterns: ["MVC", "Facade", "Factory"],
      tech: ["Java", "JavaFX", "Gradle"],
      githubUrl: "https://github.com/SkayZax/BomberMan",
      demoUrl: null,
      stats: { enemies: "3 ennemis", pattern: "MVC + Facade", build: "Gradle" }
    },
    {
      id: "odefrance",
      title: "OdeFrance",
      subtitle: "Gestion des stocks et des commandes d'eau",
      featured: true,
      platform: "desktop",
      platformLabel: "Desktop (JavaFX)",
      kind: "Universitaire",
      date: "2025",
      image: "assets/odefrance.jpg",
      logo: "assets/logos/provenceau.png",
      logoTheme: "night",
      screenshots: [
        { src: "assets/captures/odefrance-1.webp", alt: "Menu principal d'OdeFrance" },
        { src: "assets/captures/odefrance-2.webp", alt: "Stocks d'eau plate et d'eau gazeuse dans OdeFrance" },
        { src: "assets/captures/odefrance-3.webp", alt: "Saisie d'une commande dans OdeFrance" }
      ],
      description: "Application de gestion pour une entreprise fictive de distribution d'eau, faite pour la SAE 2.01.",
      longDescription: "Projet réalisé à quatre pour la SAE 2.01. L'application a un écran pour les clients, un pour les stocks et un pour les commandes. Les données restent en mémoire et toutes les fonctions du sujet ne sont pas terminées.",
      highlights: [
        "Trois types de clients : particuliers, entreprises et établissements publics.",
        "Bouteilles offertes selon le type de client, par exemple une pour 12 achetées chez les particuliers.",
        "Ajout et suppression d'eau dans le stock.",
        "Interface JavaFX écrite en FXML."
      ],
      designPatterns: ["MVC", "Facade"],
      tech: ["Java", "JavaFX", "Gradle"],
      githubUrl: "https://github.com/SkayZax/odefrance",
      demoUrl: null,
      stats: { sae: "SAE 2.01", ui: "JavaFX / FXML", data: "En mémoire" }
    },
    {
      id: "larsen-marathon",
      title: "LARSEN",
      subtitle: "Blog sur le grunge",
      featured: false,
      platform: "web",
      platformLabel: "Web",
      kind: "Universitaire",
      date: "2025",
      image: "assets/larsen.jpg",
      logo: "assets/logos/larsen.png",
      logoTheme: "black",
      screenshots: [
        { src: "assets/captures/larsen-1.webp", alt: "Page d'accueil de LARSEN" },
        { src: "assets/captures/larsen-2.webp", alt: "Liste des articles de LARSEN avec les filtres" },
        { src: "assets/captures/larsen-3.webp", alt: "Page À propos de LARSEN" }
      ],
      description: "Blog musical en Laravel, fait en équipe pendant un marathon web.",
      longDescription: "LARSEN est un blog consacré au grunge, développé en temps limité pendant un marathon web. Les visiteurs lisent les articles. Avec un compte, ils peuvent aussi en écrire et donner leur avis.",
      myRole: [
        "La page d'un article, avec sa route et son contrôleur.",
        "Le formulaire de création d'article, avec l'ajout de médias.",
        "Les boutons like et dislike sur les articles.",
        "Des composants Blade réutilisables : en-tête, pied de page, bouton et messages d'alerte.",
        "La page À propos, la favicon et plusieurs corrections d'affichage."
      ],
      highlights: [
        "Recherche et filtres par rythme, accessibilité et conclusion.",
        "Articles que leur auteur peut modifier ou retirer de la ligne.",
        "Avis et likes sur les articles, abonnement à d'autres utilisateurs.",
        "Comptes gérés avec Laravel Fortify."
      ],
      designPatterns: ["MVC"],
      tech: ["PHP", "Laravel", "SQL", "HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/SkayZax/marthon-web",
      demoUrl: null,
      stats: { format: "Marathon web", backend: "Laravel", database: "SQL" }
    },
    {
      id: "myanime-progress",
      title: "MyAnimeProgress",
      subtitle: "Suivi d'animés",
      featured: false,
      platform: "web",
      platformLabel: "Web",
      kind: "Personnel",
      date: "2025-2026",
      image: "assets/myanime.jpg",
      logo: "assets/logos/myanime-progress.png",
      logoTheme: "light",
      screenshots: [
        { src: "assets/captures/myanime-accueil.webp", alt: "Page d'accueil de MyAnimeProgress" },
        { src: "assets/captures/myanime-fiche.webp", alt: "Fiche d'un animé avec une case par épisode" },
        { src: "assets/captures/myanime-progression.webp", alt: "Page de progression avec le temps passé et les animés suivis" }
      ],
      description: "Site en Flask pour noter à quel épisode on en est dans ses animés.",
      longDescription: "Je voulais savoir où j'en étais dans les animés que je regarde. Le site récupère les fiches avec l'API Tenrai et garde la progression de chaque compte dans une base SQLite. Il est en ligne et s'installe comme une application sur mobile.",
      highlights: [
        "Recherche d'animés et filtre par genre.",
        "Une case par épisode pour noter où on en est.",
        "Page de progression avec les épisodes vus et le temps passé.",
        "Nombre d'épisodes sortis à jour pour les séries en cours.",
        "Liste de favoris.",
        "Inscription avec un code de vérification envoyé par email.",
        "Synopsis traduits en français.",
        "Sécurité : essais limités, jetons CSRF et sessions révocables."
      ],
      designPatterns: [],
      tech: ["Python", "Flask", "SQL", "HTML", "CSS"],
      githubUrl: "https://github.com/SkayZax/MyAnimeProgress",
      demoUrl: "https://anime.skayzax.fr",
      stats: { stack: "Python et Flask", context: "Projet solo", api: "Tenrai" }
    }
  ]
};
