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

<<<<<<< HEAD
    if ($login === APP_USER && password_verify($pass, APP_PASS_HASH)) {
=======
    if ($login === APP_USER && password_verify($pass, APP_PASS_HASH)OR $login === APP_USER1 && password_verify($pass, APP_PASS_HASH1)) {
>>>>>>> ce2f923 (Premier commit depuis mon serveur)
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
<<<<<<< HEAD
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
=======
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Fond animé -->
  <div class="background">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
  </div>

  <div class="container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo">
          <div class="logo-icon"></div>
        </div>
        <h1>Connexion</h1>
        <p>Accédez à votre espace sécurisé</p>
      </div>

      <?php if ($error): ?>
        <div class="error-message">
          <span class="error-icon">⚠️</span>
          <?= htmlspecialchars($error) ?>
        </div>
      <?php endif; ?>

      <form method="post" action="index.php" autocomplete="off" class="login-form">
        <div class="form-group">
          <label for="login" class="form-label">Nom d’utilisateur</label>
          <div class="input-wrapper">
            <input type="text" id="login" name="login" required class="form-input">
            <span class="input-icon"></span>
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Mot de passe</label>
          <div class="input-wrapper">
            <input type="password" id="password" name="password" required class="form-input">
            <span class="input-icon"></span>
          </div>
        </div>

        <button type="submit" class="submit-btn">
          Se connecter
          <span class="btn-arrow">➡️</span>
        </button>
      </form>

      <div class="login-footer">
        <a href="#" class="forgot-link">Mot de passe oublié ?</a>
      </div>
    </div>
  </div>
>>>>>>> ce2f923 (Premier commit depuis mon serveur)
</body>
</html>
