<?php
session_start();

// Si pas connect√©, retour au login
if (empty($_SESSION['auth'])) {
    header('Location: index.php');
    exit;
}
?>
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Zone prot√©g√©e</title>
</head>
<body>
  <h1>Bienvenue dans la zone prot√©g√©e Ì†ºÌæâ</h1>
  <p>Antoine si tu vois √ßa t pas bo.</p>
  <p><a href="logout.php">Se d√©connecter</a></p>
</body>
</html>
