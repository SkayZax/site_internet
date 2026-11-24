/* ==========================================================
   Mathis Poirier (SkayZax) — Portfolio Data
   Projets, Compétences et Métadonnées
   ========================================================== */

const PORTFOLIO_DATA = {
  profile: {
    name: "Mathis Poirier",
    pseudo: "SkayZax",
    role: "Développeur Logiciel & Web",
    education: "Étudiant en BUT Informatique",
    status: "À la recherche d'un stage ou d'une alternance pour 2026-2027",
    bio: "Passionné par l'architecture logicielle, la programmation orientée objet et les technologies web modernes. De la conception de moteurs de jeux en JavaFX à l'orchestration de bases de données et d'interfaces web réactives, j'aime concevoir du code propre, modulaire et performant.",
    location: "France",
    email: "mathis140500@gmail.com",
    github: "https://github.com/skayzax",
    linkedin: "https://www.linkedin.com/in/mathis-poirier1/",
    website: "https://skayzax.fr/",
    cvFr: "cv/cv-fr.pdf",
    cvEn: "cv/cv-ang.pdf"
  },

  skills: {
    languages: [
      { id: "java", name: "Java (21/17)", icon: "java/java-original", category: "lang", count: 3 },
      { id: "javafx", name: "JavaFX", icon: "java/java-original", category: "lang", count: 3 },
      { id: "python", name: "Python", icon: "python/python-original", category: "lang", count: 1 },
      { id: "javascript", name: "JavaScript", icon: "javascript/javascript-original", category: "lang", count: 1 },
      { id: "php", name: "PHP", icon: "php/php-original", category: "lang", count: 1 },
      { id: "sql", name: "SQL / PLpgSQL", icon: "postgresql/postgresql-original", category: "lang", count: 2 },
      { id: "html", name: "HTML5", icon: "html5/html5-original", category: "lang", count: 3 },
      { id: "css", name: "CSS3", icon: "css3/css3-original", category: "lang", count: 3 }
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
      subtitle: "Jeu d'Arcade & Patrons de Conception",
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
      description: "Une réimplémentation complète et moderne du classique Pac-Man en JavaFX, mettant un accent primordial sur l'architecture logicielle, la programmation orientée objet et les Design Patterns reconnus.",
      longDescription: "Projet universitaire réalisé en équipe pour approfondir les patrons de conception et concevoir une architecture logicielle hautement maintenable. Le moteur de jeu repose sur un AnimationTimer garantissant un rendu fluide à 60 FPS, avec une détection précise des collisions pixel-perfect et une IA avancée pour chaque type de fantôme.",
      highlights: [
        "Intelligence artificielle différenciée pour les fantômes (traque, embuscade, patrouille et fuite).",
        "Génération et parsing dynamique des labyrinthes avec gestion des bonus et méga-gommes.",
        "Architecture découplée avec boucle de rendu 60 FPS fluide.",
        "Design Patterns implémentés : Stratégie (comportements IA), Observateur (score & jauges), Fabrique (entités), Constructeur (niveaux)."
      ],
      designPatterns: ["Strategy", "Observer", "Factory", "Builder"],
      tech: ["Java", "JavaFX", "Gradle", "Design Patterns"],
      githubUrl: "https://github.com/skayzax",
      demoUrl: null,
      stats: { architecture: "POO / Patterns", fps: "60 FPS", stack: "Java 21" }
    },
    {
      id: "bomberman-javafx",
      title: "BomberMan",
      subtitle: "Jeu de Stratégie & Architecture MVC",
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
      description: "Adaptation dynamique du jeu culte BomberMan en JavaFX avec une séparation stricte Modèle-Vue-Contrôleur, gestion modulaire des explosions et ennemis intelligents.",
      longDescription: "Développement complet d'un jeu BomberMan dans lequel le joueur dépose des bombes tactiques pour frayer son passage à travers des blocs destructibles et vaincre des adversaires dotés d'IA spécifiques (Gobelins, Minotaures, Punkers).",
      highlights: [
        "Système modulaire d'explosions : bombes classiques, en ligne, en croix et méga-bombes.",
        "Plusieurs types d'ennemis autonomes aux comportements tactiques distincts.",
        "Génération procédurale de carte via Design Pattern Factory (murs incassables, briques, power-ups).",
        "Architecture MVC solide avec pattern Façade pour isoler la complexité interne."
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
      subtitle: "Gestion de Distribution d'Eau & Stocks",
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
      description: "Application professionnelle de gestion commerciale et logistique pour une entreprise de distribution d'eau, développée dans le cadre de la SAE 2.01.",
      longDescription: "Conception et implémentation d'un progiciel de gestion complet pour une entreprise de fontaines et bouteilles d'eau. L'application traite le cycle complet des commandes, de la facturation et des alertes de stock critique selon les règles métier.",
      highlights: [
        "Gestion multi-profils : Particuliers, Entreprises et Établissements publics avec remises graduées.",
        "Algorithme de calcul automatique des prix, remises fidélité et bouteilles offertes.",
        "Suivi logistique des stocks répartis dans plusieurs entrepôts avec seuils d'alerte.",
        "Interface utilisateur JavaFX moderne et intuitive basée sur FXML."
      ],
      designPatterns: ["DAO", "MVC", "Singleton"],
      tech: ["Java", "JavaFX", "SQL", "Gradle"],
      githubUrl: "https://github.com/skayzax",
      demoUrl: null,
      stats: { sae: "SAE 2.01", ui: "JavaFX / FXML", data: "SQL Relationnel" }
    },
    {
      id: "larsen-marathon",
      title: "LARSEN",
      subtitle: "Plateforme Événementielle & Marathon Web",
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
      description: "Application web collaborative conçue dans le cadre d'un marathon web intensif, dotée d'un backend PHP robuste pour la gestion d'événements musicaux.",
      longDescription: "Développé sous contrainte de temps pendant un hackathon / marathon web, LARSEN propose une expérience web interactive pour planifier des sessions musicales, gérer la programmation artistique et visualiser les créneaux.",
      highlights: [
        "Architecture web dynamique avec séparation frontend et scripts de traitement backend PHP.",
        "Gestion sécurisée des formulaires, sessions utilisateurs et persistance des données.",
        "Design responsive moderne avec prévisualisations dynamiques."
      ],
      designPatterns: ["MVC Web", "Front Controller"],
      tech: ["HTML", "CSS", "PHP", "SQL"],
      githubUrl: "https://github.com/skayzax",
      demoUrl: null,
      stats: { format: "Marathon Web", backend: "PHP", ui: "Responsive" }
    },
    {
      id: "myanime-progress",
      title: "MyAnimeProgress",
      subtitle: "Tracker d'Animés & Catalogue Personnel",
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
      description: "Application personnalisée de suivi de visionnage d'animés avec statistiques de progression, calendrier d'épisodes et traitement de données en Python.",
      longDescription: "Projet né d'un besoin personnel pour répertorier, organiser et suivre la progression d'animés visionnés. Un moteur en Python gère l'agrégation de données et le calcul des statistiques de temps passé.",
      highlights: [
        "Tableau de bord ergonomique avec jaquette, statut de diffusion et jauges d'avancement.",
        "Filtres par statut : En cours, Complété, En pause, Planifié.",
        "Moteur de calcul statistique en Python."
      ],
      designPatterns: ["Service Layer", "Data Mapper"],
      tech: ["Python", "HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/skayzax",
      demoUrl: null,
      stats: { stack: "Python & Web", context: "Projet Solo", usage: "Quotidien" }
    },
    {
      id: "cookie-clicker",
      title: "Cosmic Cookie Clicker",
      subtitle: "Mini-Jeu Incrémental JavaScript",
      featured: false,
      platform: "web",
      platformLabel: "Web",
      kind: "Personnel",
      date: "2024",
      image: "assets/cookie.jpg",
      logo: "assets/logos/cookie-clicker.png",
      logoTheme: "cookie",
      screenshots: [
        "assets/cookie.jpg"
      ],
      description: "Mini-jeu web incrémental interactif explorant les boucles d'événements JavaScript, les multiplicateurs exponentiels et la sauvegarde en temps réel.",
      longDescription: "Jeu développé pour explorer la manipulation avancée du DOM, les micro-animations CSS et la gestion du stockage local (LocalStorage) avec des boucles de calcul exponentielles.",
      highlights: [
        "Boucle de jeu synchrone fluide avec calcul de Cookies Par Seconde (CPS).",
        "Système de multiplicateurs et d'améliorations déblocables au fil des paliers.",
        "Sauvegarde automatique de la progression dans le navigateur."
      ],
      designPatterns: ["Game Loop", "Observer"],
      tech: ["JavaScript", "HTML", "CSS"],
      githubUrl: "https://github.com/skayzax",
      demoUrl: null,
      stats: { type: "Mini-Jeu", tech: "Pure JS", loop: "RequestAnimationFrame" }
    }
  ]
};
