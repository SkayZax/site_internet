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
    status: "À la recherche d'un stage ou d'une alternance pour 2026-2027",
    bio: "Je programme surtout en Java avec JavaFX, et je fais aussi des sites web.",
    location: "France",
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
      subtitle: "Jeu d'arcade avec des design patterns",
      featured: true,
      platform: "desktop",
      platformLabel: "Desktop (JavaFX)",
      kind: "Universitaire",
      date: "2024",
      image: "assets/pacman.jpg",
      logo: "assets/logos/pacman.svg",
      logoTheme: "night",
      screenshots: [
        "assets/pacman.jpg"
      ],
      description: "Pac-Man refait en JavaFX, en programmation orientée objet, avec quatre design patterns.",
      longDescription: "Projet universitaire réalisé en équipe pour apprendre les design patterns. Le moteur de jeu utilise un AnimationTimer à 60 FPS. Les collisions sont calculées au pixel près et chaque type de fantôme a sa propre IA.",
      highlights: [
        "Quatre comportements de fantômes : traque, embuscade, patrouille et fuite.",
        "Labyrinthes générés et lus par le programme, avec des bonus et des méga-gommes.",
        "Boucle de rendu à 60 FPS, séparée du reste du code.",
        "Strategy pour les comportements de l'IA, Observer pour le score et les jauges, Factory pour les entités, Builder pour les niveaux."
      ],
      designPatterns: ["Strategy", "Observer", "Factory", "Builder"],
      tech: ["Java", "JavaFX", "Gradle", "Design patterns"],
      githubUrl: "https://github.com/skayzax",
      demoUrl: null,
      stats: { architecture: "POO / Patterns", fps: "60 FPS", stack: "Java 21" }
    },
    {
      id: "bomberman-javafx",
      title: "BomberMan",
      subtitle: "Jeu de stratégie en MVC",
      featured: true,
      platform: "desktop",
      platformLabel: "Desktop (JavaFX)",
      kind: "Universitaire",
      date: "2024",
      image: "assets/bomberman.jpg",
      logo: "assets/logos/bomberman.png",
      logoTheme: "night",
      screenshots: [
        "assets/bomberman.jpg"
      ],
      description: "BomberMan refait en JavaFX sur le modèle MVC, avec plusieurs types de bombes et d'ennemis.",
      longDescription: "Le joueur pose des bombes pour détruire les blocs et battre ses adversaires. Les Gobelins, les Minotaures et les Punkers ont chacun leur IA.",
      highlights: [
        "Quatre sortes de bombes : classiques, en ligne, en croix et méga-bombes.",
        "Trois types d'ennemis qui ne se comportent pas de la même façon.",
        "Carte générée de façon procédurale avec le pattern Factory (murs incassables, briques, power-ups).",
        "Code en MVC, avec une façade qui masque les détails internes."
      ],
      designPatterns: ["MVC", "Facade", "Factory"],
      tech: ["Java", "JavaFX", "Gradle"],
      githubUrl: "https://github.com/skayzax",
      demoUrl: null,
      stats: { enemies: "3 types d'IA", pattern: "MVC + Facade", build: "Gradle" }
    },
    {
      id: "odefrance",
      title: "OdeFrance",
      subtitle: "Gestion des ventes et des stocks d'eau",
      featured: true,
      platform: "desktop",
      platformLabel: "Desktop (JavaFX)",
      kind: "Universitaire",
      date: "2024",
      image: "assets/odefrance.jpg",
      logo: "assets/logos/provenceau.png",
      logoTheme: "night",
      screenshots: [
        "assets/odefrance.jpg"
      ],
      description: "Application de gestion pour une entreprise de distribution d'eau, faite pour la SAE 2.01.",
      longDescription: "L'entreprise vend des fontaines et des bouteilles d'eau. L'application gère ses commandes et ses factures, et prévient quand un stock devient trop bas.",
      highlights: [
        "Remises différentes pour les particuliers, les entreprises et les établissements publics.",
        "Calcul automatique des prix, avec les remises de fidélité et les bouteilles offertes.",
        "Suivi des stocks de plusieurs entrepôts, avec des seuils d'alerte.",
        "Interface JavaFX écrite en FXML."
      ],
      designPatterns: ["DAO", "MVC", "Singleton"],
      tech: ["Java", "JavaFX", "SQL", "Gradle"],
      githubUrl: "https://github.com/skayzax",
      demoUrl: null,
      stats: { sae: "SAE 2.01", ui: "JavaFX / FXML", data: "SQL relationnel" }
    },
    {
      id: "larsen-marathon",
      title: "LARSEN",
      subtitle: "Site d'événements pour un marathon web",
      featured: false,
      platform: "web",
      platformLabel: "Web",
      kind: "Universitaire",
      date: "2024",
      image: "assets/larsen.jpg",
      logo: "assets/logos/larsen.png",
      logoTheme: "black",
      screenshots: [
        "assets/larsen.jpg"
      ],
      description: "Application web collaborative en PHP pour gérer des événements musicaux, faite pendant un marathon web.",
      longDescription: "LARSEN a été développé en temps limité pendant un marathon web. On y planifie des sessions musicales et on voit les créneaux de la programmation.",
      highlights: [
        "Frontend séparé des scripts PHP.",
        "Formulaires sécurisés, sessions utilisateur et données enregistrées en base.",
        "Pages responsive, avec des aperçus dynamiques."
      ],
      designPatterns: ["MVC Web", "Front Controller"],
      tech: ["HTML", "CSS", "PHP", "SQL"],
      githubUrl: "https://github.com/skayzax",
      demoUrl: null,
      stats: { format: "Marathon web", backend: "PHP", ui: "Responsive" }
    },
    {
      id: "myanime-progress",
      title: "MyAnimeProgress",
      subtitle: "Suivi d'animés",
      featured: false,
      platform: "web",
      platformLabel: "Web / Outil",
      kind: "Personnel",
      date: "2024",
      image: "assets/myanime.jpg",
      logo: "assets/logos/myanime-progress.png",
      logoTheme: "light",
      screenshots: [
        "assets/myanime.jpg"
      ],
      description: "Application pour suivre les animés que je regarde, avec un calendrier des épisodes et des statistiques calculées en Python.",
      longDescription: "Je voulais savoir où j'en étais dans les animés que je regarde. Un programme Python rassemble les données et calcule le temps passé.",
      highlights: [
        "Tableau de bord avec la jaquette, le statut de diffusion et une jauge d'avancement.",
        "Filtres par statut : En cours, Complété, En pause, Planifié.",
        "Statistiques calculées en Python."
      ],
      designPatterns: ["Service Layer", "Data Mapper"],
      tech: ["Python", "HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/skayzax",
      demoUrl: null,
      stats: { stack: "Python et web", context: "Projet solo", usage: "Quotidien" }
    }
  ]
};
