<?php
session_start();

// Si pas connecté, retour au login
if (empty($_SESSION['auth'])) {
    header('Location: index.php');
    exit;
}
?>
<!doctype html>
<html lang="fr">
<link href="styles.css" rel="stylesheet">
<head>
  <meta charset="utf-8">
  <title>Zone protégée</title>
</head>
<body>
 <header>
     <div class="navbar">
     <nav>
         <button class="menu-button"><a>Accueil</a></button>
         <button class="menu-button"><a>Contact</a></button>
         <button class="menu-button"><a>Mes Projets</a></button>

                                            </nav></header></div>
</body>
</html>
