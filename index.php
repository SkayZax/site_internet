<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
session_start();
require __DIR__ . '/config.php';

// Si déjà connecté, redirection vers la page protégée
if (!empty($_SESSION['auth']) && $_SESSION['auth'] === true) {
    header('Location: secret.php');
    exit;
}

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = $_POST['login'] ?? '';
    $pass  = $_POST['password'] ?? '';

    if ($login === APP_USER && password_verify($pass, APP_PASS_HASH)) {
        $_SESSION['auth'] = true;
        session_regenerate_id(true);
        header('Location: secret.php');
        exit;
    } else {
        $error = "Identifiants incorrects.";
    }
}
?>
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Connexion</title>
</head>
<body>
  <h1>Connexion</h1>

  <?php if ($error): ?>
    <p style="color:red;"><?= htmlspecialchars($error) ?></p>
  <?php endif; ?>

  <form method="post" action="index.php" autocomplete="off">
    <div>
      <label for="login">Nom d’utilisateur</label><br>
      <input type="text" id="login" name="login" required>
    </div>
    <div>
      <label for="password">Mot de passe</label><br>
      <input type="password" id="password" name="password" required>
    </div>
    <button type="submit">Se connecter</button>
  </form>
</body>
</html>
