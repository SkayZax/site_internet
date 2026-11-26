/* ==========================================================
   Mathis Poirier (SkayZax), script du site et canvas des montagnes
   Crépuscule Alpin, Ciel Ambré & Nuit Étoilée
   ========================================================== */

(() => {
  'use strict';

  const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';

  /* Textes de l'interface générés par le script, selon la langue de la page (<html lang>) */
  const LANG = document.documentElement.lang.startsWith('en') ? 'en' : 'fr';
  const I18N = {
    fr: {
      viewProject: 'Voir le projet',
      details: 'Détails',
      projectAria: (title) => `Voir les détails du projet ${title}`,
      resultCount: (n) => `${n} projet${n > 1 ? 's' : ''} trouvé${n > 1 ? 's' : ''}`,
      logoAlt: (title) => `Logo ${title}`,
      emailCopied: (email) => `Email copié dans le presse-papier : ${email}`,
      emailFallback: (email) => `Email : ${email}`,
      mailSubject: (name) => `Portfolio : message de ${name}`,
      writeDirectly: 'Écrivez-moi directement par email',
      sendFailed: "Le message n'a pas pu être envoyé. ",
      fillAll: 'Veuillez renseigner tous les champs du formulaire.',
      invalidEmail: 'Veuillez saisir une adresse email valide.',
      sending: 'Envoi en cours…',
      sent: 'Votre message a bien été envoyé à Mathis.',
      liftoff: 'Décollage ! Votre message part vers Mathis.',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu'
    },
    en: {
      viewProject: 'View project',
      details: 'Details',
      projectAria: (title) => `View details of the ${title} project`,
      resultCount: (n) => `${n} project${n > 1 ? 's' : ''} found`,
      logoAlt: (title) => `${title} logo`,
      emailCopied: (email) => `Email copied to clipboard: ${email}`,
      emailFallback: (email) => `Email: ${email}`,
      mailSubject: (name) => `Portfolio: message from ${name}`,
      writeDirectly: 'Email me directly',
      sendFailed: 'Your message could not be sent. ',
      fillAll: 'Please fill in all the fields.',
      invalidEmail: 'Please enter a valid email address.',
      sending: 'Sending…',
      sent: 'Your message has been sent to Mathis.',
      liftoff: 'Liftoff! Your message is on its way to Mathis.',
      openMenu: 'Open menu',
      closeMenu: 'Close menu'
    }
  };
  const t = I18N[LANG];

  /* Sélecteurs Utilitaires */
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  /* État Global */
  const state = {
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    scrollProgress: 0,
    filters: {
      platform: '',
      kind: '',
      tech: ''
    }
  };

  /* Fonctions Mathématiques & Bruit pour relief montagneux */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  function generateMountainProfile(width, seed, octaves = 3, roughness = 0.5) {
    const points = [];
    const count = 120;
    const step = width / count;

    for (let i = 0; i <= count; i++) {
      const x = i * step;
      let y = 0;
      let amp = 1;
      let freq = 0.003;

      for (let o = 0; o < octaves; o++) {
        y += Math.sin((x + seed * 100) * freq) * amp * 35;
        y += Math.cos((x * 1.7 + seed * 50) * freq) * amp * 20;
        amp *= roughness;
        freq *= 2;
      }
      points.push({ x, y });
    }
    return points;
  }

  /* ==========================================================
     Système de Décollage & Propulsion Fusée (#sky)
     ========================================================== */
  const rocket = {
    x: 0,
    y: 0,
    angle: 0,
    progress: 0.0, // 0 = Pas de tir (Hero), 1 = Haute orbite (Contact)
    isMoving: false,
    exhaustPuffs: [],
    sparks: [],
    boostActive: false,
    boostTimer: 0,
    lastTime: performance.now()
  };

  function triggerRocketBoost() {
    rocket.boostActive = true;
    rocket.boostTimer = 4800;
    // Si la fusée a déjà quitté l'écran à la fin du scroll, on amorce un survol orbital spectaculaire
    if (rocket.progress >= 0.95) {
      rocket.progress = 0.55;
    }
  }

  /* Calcul paramétrique unifié de la trajectoire orbitale (Gravity Turn) */
  function getRocketTrajectory(w, h, p, isBoost = false) {
    const isNarrow = w < 1280;
    // Position du pas de tir sur le massif montagneux à droite
    const startX = isNarrow ? w * 0.82 : w * 0.77;
    const startY = h * 0.58;

    // Point de contrôle de courbure gravitationnelle (ascension droite puis légère inclinaison)
    const cpX = isNarrow ? w * 0.81 : w * 0.77;
    const cpY = h * 0.36;

    // Point d'insertion orbitale : à la fin du scroll, la fusée sort complètement de l'écran par le haut
    const targetX = isBoost ? w * 0.45 : (isNarrow ? w * 0.80 : w * 0.76);
    const targetY = isBoost ? -h * 0.48 : -h * 0.25;

    const t = Math.min(1.2, Math.max(0, p));
    const invT = 1 - t;
    const x = invT * invT * startX + 2 * invT * t * cpX + t * t * targetX;
    const y = invT * invT * startY + 2 * invT * t * cpY + t * t * targetY;

    // Vecteur tangent pour orienter la tuyère et la pointe de la coiffe
    const dx = 2 * (1 - t) * (cpX - startX) + 2 * t * (targetX - cpX);
    const dy = 2 * (1 - t) * (cpY - startY) + 2 * t * (targetY - cpY);
    let angle = Math.atan2(dy, dx) + Math.PI / 2;

    // Au sol sur le pas de tir (t < 0.02), la fusée reste bien droite
    if (t < 0.02) {
      angle = lerp(0, angle, t / 0.02);
    }

    return { x, y, dx, dy, angle, startX, startY, cpX, cpY, targetX, targetY, t };
  }

  function updateRocket(w, h, time) {
    const dt = Math.min(50, time - rocket.lastTime);
    rocket.lastTime = time;

    if (rocket.boostActive) {
      rocket.boostTimer -= dt;
      if (rocket.boostTimer <= 0) rocket.boostActive = false;
    }

    // La progression de la fusée suit directement et fidèlement le scroll de la page
    const scrollTarget = state.scrollProgress;
    const targetP = rocket.boostActive 
      ? Math.min(1.25, scrollTarget + 0.35) 
      : scrollTarget;

    const prevP = rocket.progress;
    // Lerp réactif et soyeux (0.16 = suivi quasi-instantané du scroll tout en conservant l'inertie de masse)
    rocket.progress += (targetP - rocket.progress) * 0.16;

    const scrollDelta = Math.abs(rocket.progress - prevP);
    rocket.isMoving = scrollDelta > 0.00015 || rocket.boostActive;

    // Mise à jour spatiale selon la courbe de vol
    const traj = getRocketTrajectory(w, h, rocket.progress, rocket.boostActive);
    rocket.x = traj.x;
    rocket.y = traj.y;
    rocket.angle = traj.angle;

    // Position des tuyères principales à l'arrière
    const nozzleDist = 36 * 1.22;
    const nozzleX = rocket.x - Math.sin(rocket.angle) * nozzleDist;
    const nozzleY = rocket.y + Math.cos(rocket.angle) * nozzleDist;

    // Émission dynamique de panache et d'étincelles
    const isAtPad = rocket.progress < 0.02;
    const puffCount = rocket.boostActive ? 5 : (rocket.isMoving ? 3 : (isAtPad ? 1 : 0));
    const puffChance = rocket.boostActive ? 0.95 : (rocket.isMoving ? 0.85 : (isAtPad ? 0.35 : 0.05));

    if (Math.random() < puffChance) {
      for (let i = 0; i < puffCount; i++) {
        const spread = (Math.random() - 0.5) * 14;
        const pushAngle = rocket.angle + Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * (rocket.boostActive ? 5.5 : (rocket.isMoving ? 3.6 : 1.8)) + 1.2;

        rocket.exhaustPuffs.push({
          x: nozzleX + spread,
          y: nozzleY,
          vx: Math.cos(pushAngle) * speed + (Math.random() - 0.5) * 1.2,
          vy: Math.sin(pushAngle) * speed + (Math.random() * 1.8 + 0.8),
          size: Math.random() * 7 + 5,
          maxSize: Math.random() * (rocket.boostActive ? 52 : 36) + 24,
          alpha: 0.85,
          r: 255,
          g: Math.floor(Math.random() * 140 + 80),
          b: 30,
          life: 0,
          maxLife: Math.random() * 75 + 45
        });
      }
    }

    // Étincelles incandescentes
    const sparkCount = rocket.boostActive ? 6 : (rocket.isMoving ? 3 : (isAtPad ? 1 : 0));
    const sparkChance = rocket.boostActive ? 0.85 : (rocket.isMoving ? 0.65 : (isAtPad ? 0.25 : 0.02));
    if (Math.random() < sparkChance) {
      for (let i = 0; i < sparkCount; i++) {
        const pushAngle = rocket.angle + Math.PI / 2 + (Math.random() - 0.5) * 0.7;
        const speed = Math.random() * (rocket.boostActive ? 8 : 5) + 3;
        rocket.sparks.push({
          x: nozzleX + (Math.random() - 0.5) * 8,
          y: nozzleY + (Math.random() - 0.5) * 8,
          vx: Math.cos(pushAngle) * speed,
          vy: Math.sin(pushAngle) * speed,
          size: Math.random() * 2.5 + 1,
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 28 + 14
        });
      }
    }

    // Mise à jour de la fumée
    for (let i = rocket.exhaustPuffs.length - 1; i >= 0; i--) {
      const puff = rocket.exhaustPuffs[i];
      puff.x += puff.vx;
      puff.y += puff.vy;
      puff.vx *= 0.985;
      puff.vy *= 0.985;
      puff.life++;
      const ratio = puff.life / puff.maxLife;
      puff.size = lerp(puff.size, puff.maxSize, 0.06);
      puff.alpha = Math.max(0, 0.85 * (1 - ratio));

      if (ratio > 0.25) {
        puff.r = Math.floor(lerp(puff.r, 215, 0.05));
        puff.g = Math.floor(lerp(puff.g, 175, 0.05));
        puff.b = Math.floor(lerp(puff.b, 195, 0.05));
      }

      if (puff.life >= puff.maxLife || puff.alpha <= 0.01) {
        rocket.exhaustPuffs.splice(i, 1);
      }
    }

    // Mise à jour des étincelles
    for (let i = rocket.sparks.length - 1; i >= 0; i--) {
      const sp = rocket.sparks[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.life++;
      sp.alpha = Math.max(0, 1 - sp.life / sp.maxLife);
      if (sp.life >= sp.maxLife) {
        rocket.sparks.splice(i, 1);
      }
    }
  }

  function drawLaunchPad(ctx, w, h, p) {
    const pad = getRocketTrajectory(w, h, 0);
    const padX = pad.startX;
    const padY = pad.startY;

    ctx.save();

    // Fading progressif de la base de lancement vers la nuit profonde en fin de scroll
    const padAlpha = rocket.progress > 0.65 
      ? Math.max(0, 1 - (rocket.progress - 0.65) / 0.28) 
      : 1;
    if (padAlpha <= 0) {
      ctx.restore();
      return;
    }
    ctx.globalAlpha = padAlpha;

    // 1. Structure de soutien inférieure (socle trapézoïdal béton/acier ancré dans le relief)
    ctx.beginPath();
    ctx.moveTo(padX - 28, padY + 45);
    ctx.lineTo(padX - 16, padY);
    ctx.lineTo(padX + 16, padY);
    ctx.lineTo(padX + 28, padY + 45);
    ctx.closePath();
    ctx.fillStyle = '#1D102C';
    ctx.fill();
    ctx.strokeStyle = '#32194B';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Déflecteurs de jet inclinés (Flame Deflectors)
    ctx.beginPath();
    ctx.moveTo(padX - 12, padY + 2);
    ctx.lineTo(padX - 32, padY + 36);
    ctx.moveTo(padX + 12, padY + 2);
    ctx.lineTo(padX + 32, padY + 36);
    ctx.strokeStyle = '#27123A';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 2. Pylône treillis de la tour de lancement (Launch Umbilical Tower)
    ctx.strokeStyle = '#2B173E';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(padX - 22, padY);
    ctx.lineTo(padX - 20, padY - 90);
    ctx.lineTo(padX - 4, padY - 90);
    ctx.lineTo(padX - 6, padY);

    for (let y = padY; y >= padY - 84; y -= 12) {
      ctx.moveTo(padX - 22, y);
      ctx.lineTo(padX - 5, y - 6);
      ctx.moveTo(padX - 5, y);
      ctx.lineTo(padX - 22, y - 6);
    }
    ctx.stroke();

    // Passerelles & bras de charge vers la fusée
    ctx.fillStyle = '#3E2258';
    ctx.fillRect(padX - 16, padY - 64, 28, 4);
    ctx.fillRect(padX - 16, padY - 36, 24, 3);

    // Balise lumineuse rouge clignotante de sécurité aérienne
    const beacon = Math.sin(Date.now() * 0.005) > 0 ? 1 : 0.2;
    ctx.beginPath();
    ctx.arc(padX - 12, padY - 93, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 60, 60, ${beacon})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#FF2222';
    ctx.fill();
    ctx.shadowBlur = 0;

    // Faisceaux de projecteurs au sol (Floodlights vers la fusée qui s'estompent avec l'altitude)
    if (rocket.progress < 0.45) {
      const floodAlpha = Math.max(0, 1 - rocket.progress / 0.45);
      const beamGrad = ctx.createLinearGradient(padX - 20, padY, padX + 25, padY - 200);
      beamGrad.addColorStop(0, `rgba(255, 230, 180, ${0.35 * floodAlpha})`);
      beamGrad.addColorStop(0.5, `rgba(255, 180, 90, ${0.12 * floodAlpha})`);
      beamGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(padX - 30, padY);
      ctx.lineTo(padX - 5, padY - 200);
      ctx.lineTo(padX + 50, padY - 200);
      ctx.lineTo(padX + 25, padY);
      ctx.closePath();
      ctx.fill();
    }

    // Lueur d'allumage au sol (Flame Trench / fosse d'échappement)
    const isAtPad = rocket.progress < 0.15;
    if (isAtPad) {
      const padGlowAlpha = (1 - rocket.progress / 0.15) * 0.7;
      const padGlow = ctx.createRadialGradient(padX, padY, 8, padX, padY, 95);
      padGlow.addColorStop(0, `rgba(255, 190, 80, ${padGlowAlpha})`);
      padGlow.addColorStop(0.4, `rgba(242, 113, 28, ${padGlowAlpha * 0.6})`);
      padGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = padGlow;
      ctx.beginPath();
      ctx.arc(padX, padY, 95, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawRocketPlume(ctx, w, h) {
    const currentP = rocket.progress;
    // À la fin du scroll (section Contact), le panache s'est totalement dissipé dans la haute atmosphère
    if (currentP <= 0.008 || currentP >= 0.98) return;

    // Dissipation progressive du panache entre progress 0.80 et 0.98
    const plumeAlpha = currentP > 0.80 
      ? Math.max(0, 1 - (currentP - 0.80) / 0.18) 
      : 1;

    ctx.save();
    ctx.globalAlpha = plumeAlpha;

    const traj = getRocketTrajectory(w, h, currentP, rocket.boostActive);
    const startX = traj.startX;
    const startY = traj.startY;
    const cpX = traj.cpX;
    const cpY = traj.cpY;
    const targetX = traj.targetX;
    const targetY = traj.targetY;

    const steps = Math.max(14, Math.floor(currentP * 85));

    // 1. Halo lumineux diffus le long de la colonne d'échappement
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const s = (i / steps) * currentP;
      const invS = 1 - s;
      const px = invS * invS * startX + 2 * invS * s * cpX + s * s * targetX;
      const py = invS * invS * startY + 2 * invS * s * cpY + s * s * targetY;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.lineWidth = 36;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(255, 140, 40, 0.16)';
    ctx.stroke();

    // 2. Traînée texturée de fumée et condensation atmosphérique
    for (let i = 1; i <= steps; i++) {
      const sA = ((i - 1) / steps) * currentP;
      const sB = (i / steps) * currentP;
      const invA = 1 - sA;
      const invB = 1 - sB;

      const xA = invA * invA * startX + 2 * invA * sA * cpX + sA * sA * targetX;
      const yA = invA * invA * startY + 2 * invA * sA * cpY + sA * sA * targetY;
      const xB = invB * invB * startX + 2 * invB * sB * cpX + sB * sB * targetX;
      const yB = invB * invB * startY + 2 * invB * sB * cpY + sB * sB * targetY;

      const ratio = i / steps;
      const width = lerp(48, 18, ratio);

      ctx.beginPath();
      ctx.moveTo(xA, yA);
      ctx.lineTo(xB, yB);
      ctx.lineWidth = width;
      ctx.lineCap = 'round';

      if (ratio > 0.85) {
        ctx.strokeStyle = `rgba(255, 175, 50, ${0.55 * ratio})`;
      } else {
        ctx.strokeStyle = `rgba(240, 215, 230, ${0.28 * ratio + 0.1})`;
      }
      ctx.stroke();
    }

    // 3. Bouffées de fumée volumétriques
    for (let puff of rocket.exhaustPuffs) {
      ctx.beginPath();
      ctx.arc(puff.x, puff.y, puff.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${puff.r}, ${puff.g}, ${puff.b}, ${puff.alpha})`;
      ctx.fill();
    }

    // 4. Étincelles vives
    for (let sp of rocket.sparks) {
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 235, 150, ${sp.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#FF8A00';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }

  function drawRocket(ctx) {
    // À la fin du scroll, la fusée s'est échappée dans le cosmos et n'est plus visible
    if (rocket.progress >= 0.98 || rocket.y < -160) return;

    const rx = rocket.x;
    const ry = rocket.y;
    const angle = rocket.angle;
    const isBoost = rocket.boostActive;
    const isMoving = rocket.isMoving;

    // Fondu progressif vers l'espace profond
    const rocketAlpha = rocket.progress > 0.85
      ? Math.max(0, 1 - (rocket.progress - 0.85) / 0.13)
      : 1;

    ctx.save();
    ctx.globalAlpha = rocketAlpha;
    ctx.translate(rx, ry);
    ctx.rotate(angle);
    ctx.scale(1.22, 1.22); // Échelle valorisée pour une présence aérospatiale imposante

    // 1. Halo lumineux incandescent ambiant
    const glowRadius = isBoost ? 260 : (isMoving ? 180 : 140);
    const haloGrad = ctx.createRadialGradient(0, 36, 12, 0, 36, glowRadius);
    haloGrad.addColorStop(0, isBoost ? 'rgba(255, 225, 130, 0.95)' : 'rgba(255, 175, 60, 0.75)');
    haloGrad.addColorStop(0.35, isBoost ? 'rgba(255, 100, 20, 0.45)' : 'rgba(242, 113, 28, 0.3)');
    haloGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(0, 36, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // 2. Flamme supersonique principale (S'allonge dynamiquement lors du mouvement de scroll)
    const baseFlame = isBoost ? 120 : (isMoving ? 82 : 58);
    const flameLen = baseFlame + Math.sin(Date.now() * 0.05) * 6;
    const flameWidth = isBoost ? 24 : (isMoving ? 16 : 12);

    ctx.beginPath();
    ctx.moveTo(-flameWidth, 34);
    ctx.quadraticCurveTo(-flameWidth * 1.25, 34 + flameLen * 0.5, 0, 34 + flameLen);
    ctx.quadraticCurveTo(flameWidth * 1.25, 34 + flameLen * 0.5, flameWidth, 34);
    ctx.closePath();
    const flameGrad = ctx.createLinearGradient(0, 34, 0, 34 + flameLen);
    flameGrad.addColorStop(0, '#FFFFFF');
    flameGrad.addColorStop(0.2, '#FFE600');
    flameGrad.addColorStop(0.55, '#FF6600');
    flameGrad.addColorStop(1, 'rgba(217, 38, 0, 0)');
    ctx.fillStyle = flameGrad;
    ctx.fill();

    // Cœur de plasma blanc-chaud intérieur
    const coreLen = flameLen * 0.58;
    const coreWidth = flameWidth * 0.55;
    ctx.beginPath();
    ctx.moveTo(-coreWidth, 34);
    ctx.quadraticCurveTo(-coreWidth * 0.8, 34 + coreLen * 0.5, 0, 34 + coreLen);
    ctx.quadraticCurveTo(coreWidth * 0.8, 34 + coreLen * 0.5, coreWidth, 34);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowBlur = 16;
    ctx.shadowColor = '#FFB800';
    ctx.fill();
    ctx.shadowBlur = 0;

    // Disques de Mach (Shock Diamonds)
    const diamondCount = isBoost ? 4 : 3;
    for (let d = 1; d <= diamondCount; d++) {
      const dy = 34 + (flameLen * 0.22) * d;
      const dw = (diamondCount - d + 1) * 2.2;
      ctx.beginPath();
      ctx.moveTo(0, dy - 4);
      ctx.lineTo(dw, dy);
      ctx.lineTo(0, dy + 4);
      ctx.lineTo(-dw, dy);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
    }

    // 3. Corps de la Fusée (Orbital Heavy-Lift Vehicle)
    // Tuyères moteurs
    ctx.fillStyle = '#1B1E24';
    ctx.fillRect(-8, 30, 16, 5);
    ctx.beginPath();
    ctx.moveTo(-11, 35);
    ctx.lineTo(11, 35);
    ctx.lineTo(8, 29);
    ctx.lineTo(-8, 29);
    ctx.closePath();
    ctx.fillStyle = '#2A2E38';
    ctx.fill();

    // Ailerons arrières stabilisateurs en ambre
    ctx.beginPath();
    ctx.moveTo(-10, 15);
    ctx.lineTo(-24, 34);
    ctx.lineTo(-10, 32);
    ctx.closePath();
    ctx.fillStyle = '#E85D04';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(10, 15);
    ctx.lineTo(24, 34);
    ctx.lineTo(10, 32);
    ctx.closePath();
    ctx.fillStyle = '#E85D04';
    ctx.fill();

    // Premier étage de propulsion (Corps principal)
    ctx.fillStyle = '#F4F6FB';
    ctx.fillRect(-10, -10, 20, 40);

    // Ombrage cylindrique en 3D
    const shadeGrad = ctx.createLinearGradient(-10, 0, 10, 0);
    shadeGrad.addColorStop(0, 'rgba(0,0,0,0.22)');
    shadeGrad.addColorStop(0.4, 'rgba(255,255,255,0.4)');
    shadeGrad.addColorStop(0.8, 'rgba(0,0,0,0.05)');
    shadeGrad.addColorStop(1, 'rgba(0,0,0,0.35)');
    ctx.fillStyle = shadeGrad;
    ctx.fillRect(-10, -10, 20, 40);

    // Bague d'inter-étage sombre
    ctx.fillStyle = '#1E222B';
    ctx.fillRect(-10, -14, 20, 4);

    // Deuxième étage / Étage supérieur
    ctx.fillStyle = '#F8FAFD';
    ctx.fillRect(-9, -32, 18, 18);
    ctx.fillStyle = shadeGrad;
    ctx.fillRect(-9, -32, 18, 18);

    // Coiffe aérodynamique (Nose Cone / Payload Fairing)
    ctx.beginPath();
    ctx.moveTo(-9, -32);
    ctx.quadraticCurveTo(-7, -54, 0, -62);
    ctx.quadraticCurveTo(7, -54, 9, -32);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.fillStyle = shadeGrad;
    ctx.fill();

    // Liseré vertical ambre / signature SkayZax
    ctx.fillStyle = '#F2711C';
    ctx.fillRect(-1, -26, 2, 42);

    // Sonde pitot au sommet
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -62);
    ctx.lineTo(0, -70);
    ctx.stroke();

    ctx.restore();
  }

  /* ==========================================================
     1. Canvas Ciel, Étoiles & Décollage de Fusée (#sky)
     ========================================================== */
  const skyCanvas = $('#sky');
  const skyCtx = skyCanvas.getContext('2d');
  let stars = [];
  let shootingStars = [];
  let shootingStarSparks = [];
  let nextShootingStarTime = 0;
  let distantMountains1 = [];
  let distantMountains2 = [];

  function initSky() {
    const w = skyCanvas.width = window.innerWidth;
    const h = skyCanvas.height = window.innerHeight;

    distantMountains1 = generateMountainProfile(w, 42, 3, 0.45);
    distantMountains2 = generateMountainProfile(w, 88, 3, 0.5);

    stars = [];
    shootingStars = [];
    shootingStarSparks = [];
    nextShootingStarTime = performance.now() + 1000; // Première étoile filante rapide dès 1s après chargement

    const starCount = Math.floor((w * h) / 4800);
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * (h * 0.72),
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005
      });
    }
  }

  /* Génération d'étoiles filantes célestes ("de temps en temps", élégantes et lumineuses) */
  function spawnShootingStar(w, h, originX, originY) {
    const isBolide = Math.random() < 0.20; // 20% bolide céleste plus puissant et étincelant
    const dir = Math.random() > 0.32 ? 1 : -1; // 68% gauche-vers-droite, 32% droite-vers-gauche
    
    // Angle en diagonale réaliste
    const angle = dir === 1
      ? (Math.PI / 180) * (Math.random() * 14 + 26) // 26° à 40° vers le bas-droite
      : (Math.PI / 180) * (Math.random() * 14 + 140); // 140° à 154° vers le bas-gauche

    const speed = isBolide ? (Math.random() * 6 + 20) : (Math.random() * 6 + 14);
    const length = isBolide ? (Math.random() * 100 + 190) : (Math.random() * 70 + 120);
    const maxLife = isBolide ? Math.floor(Math.random() * 16 + 42) : Math.floor(Math.random() * 14 + 32);

    // Origine dans la voûte céleste (haute atmosphère sombre)
    let startX = originX;
    let startY = originY;

    if (startX === undefined || startY === undefined) {
      startX = dir === 1 
        ? Math.random() * (w * 0.68) + w * 0.04 
        : Math.random() * (w * 0.68) + w * 0.28;
      startY = Math.random() * (h * 0.38) + 15;
    }

    const palettes = [
      { glow: '#FFE082', tail: '255, 224, 130' }, // Or solaire éclatant
      { glow: '#FFD180', tail: '255, 209, 128' }, // Ambre crépusculaire
      { glow: '#FFFFFF', tail: '240, 246, 255' }, // Blanc stellaire pur
      { glow: '#80D8FF', tail: '128, 216, 255' }, // Cyan électrique diamant
      { glow: '#FF9E80', tail: '255, 158, 128' }  // Poussière cométaire cuivrée
    ];
    const pal = palettes[Math.floor(Math.random() * palettes.length)];

    shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: length,
      life: 0,
      maxLife: maxLife,
      isBolide: isBolide,
      headRadius: isBolide ? 3.4 : 2.2,
      glowColor: pal.glow,
      tailColor: pal.tail
    });
  }

  function maybeSpawnShootingStar(w, h, time, p) {
    if (time > nextShootingStarTime) {
      // Cadence équilibrée "de temps en temps" :
      // Toutes les 2.8s à 5.0s en crépuscule, et 2.2s à 4.2s en nuit profonde
      const minDelay = p > 0.4 ? 2200 : 2800;
      const maxDelay = p > 0.4 ? 4200 : 5000;
      nextShootingStarTime = time + (Math.random() * (maxDelay - minDelay) + minDelay);

      spawnShootingStar(w, h);

      // 22% de chance d'une salve double (deux étoiles filantes jumelles)
      if (Math.random() < 0.22) {
        setTimeout(() => {
          const last = shootingStars[shootingStars.length - 1];
          if (last) {
            const offsetX = last.vx > 0 ? -60 : 60;
            spawnShootingStar(w, h, last.x + offsetX, last.y - 25);
          }
        }, 160);
      }
    }
  }

  function drawShootingStars(ctx, p) {
    // 1. Mise à jour et rendu des étincelles / poussière d'étoiles (Stardust trail)
    for (let i = shootingStarSparks.length - 1; i >= 0; i--) {
      const sp = shootingStarSparks[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.alpha -= sp.decay;

      if (sp.alpha <= 0) {
        shootingStarSparks.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${sp.color}, ${sp.alpha})`;
      ctx.fill();
    }

    if (shootingStars.length === 0) return;

    ctx.save();
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      ss.life++;

      ss.x += ss.vx;
      ss.y += ss.vy;

      // Émission d'étincelles de stardust en vol
      if (Math.random() < 0.55) {
        shootingStarSparks.push({
          x: ss.x - ss.vx * 0.25 + (Math.random() - 0.5) * 4,
          y: ss.y - ss.vy * 0.25 + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          alpha: 0.9,
          color: ss.tailColor,
          size: Math.random() * 1.5 + 0.8,
          decay: Math.random() * 0.04 + 0.03
        });
      }

      // Courbe d'intensité d'ignition et de burnout atmosphérique
      const progress = ss.life / ss.maxLife;
      let alpha = 0;
      if (progress < 0.18) {
        alpha = progress / 0.18; // Montée en éclat
      } else if (progress < 0.70) {
        alpha = 1.0; // Pleine incandescence
      } else {
        alpha = Math.max(0, 1 - (progress - 0.70) / 0.30); // Extinction douce
      }

      if (alpha > 0.01) {
        const angle = Math.atan2(ss.vy, ss.vx);
        // La traînée s'allonge au démarrage
        const currentLength = ss.length * Math.min(1, ss.life / 6);
        const tailX = ss.x - Math.cos(angle) * currentLength;
        const tailY = ss.y - Math.sin(angle) * currentLength;

        // Traînée lumineuse dégradée à haute visibilité
        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(${ss.tailColor}, 0)`);
        grad.addColorStop(0.55, `rgba(${ss.tailColor}, ${0.45 * alpha})`);
        grad.addColorStop(0.88, `rgba(${ss.tailColor}, ${0.85 * alpha})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

        // Halo diffus externe de la traînée
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.isBolide ? 4.2 : 2.8;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Fil intérieur blanc pur intense
        ctx.beginPath();
        ctx.moveTo(tailX + Math.cos(angle) * (currentLength * 0.35), tailY + Math.sin(angle) * (currentLength * 0.35));
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * alpha})`;
        ctx.lineWidth = ss.isBolide ? 1.8 : 1.2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Tête étincelante avec halo de réfraction céleste
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.headRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowBlur = ss.isBolide ? 20 : 12;
        ctx.shadowColor = ss.glowColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (ss.life >= ss.maxLife) {
        shootingStars.splice(i, 1);
      }
    }
    ctx.restore();
  }

  function drawSky(time) {
    const w = skyCanvas.width;
    const h = skyCanvas.height;
    const p = state.scrollProgress;

    skyCtx.clearRect(0, 0, w, h);

    // Dégradé du ciel crépusculaire qui évolue avec le scroll
    const skyGrad = skyCtx.createLinearGradient(0, 0, 0, h);
    const rTop = Math.round(lerp(40, 11, p));
    const gTop = Math.round(lerp(25, 14, p));
    const bTop = Math.round(lerp(56, 32, p));

    const rMid = Math.round(lerp(231, 19, p));
    const gMid = Math.round(lerp(111, 24, p));
    const bMid = Math.round(lerp(56, 52, p));

    const rBot = Math.round(lerp(253, 14, p));
    const gBot = Math.round(lerp(215, 18, p));
    const bBot = Math.round(lerp(181, 40, p));

    skyGrad.addColorStop(0, `rgb(${rTop}, ${gTop}, ${bTop})`);
    skyGrad.addColorStop(0.55, `rgb(${rMid}, ${gMid}, ${bMid})`);
    skyGrad.addColorStop(1, `rgb(${rBot}, ${gBot}, ${bBot})`);

    skyCtx.fillStyle = skyGrad;
    skyCtx.fillRect(0, 0, w, h);

    // Soleil couchant à l'horizon
    if (p < 0.6) {
      const sunAlpha = 1 - (p / 0.6);
      const sunY = h * 0.62 + p * 200;
      const sunX = w * 0.72;

      const sunGrad = skyCtx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 180);
      sunGrad.addColorStop(0, `rgba(255, 248, 230, ${0.9 * sunAlpha})`);
      sunGrad.addColorStop(0.2, `rgba(254, 180, 100, ${0.7 * sunAlpha})`);
      sunGrad.addColorStop(0.6, `rgba(242, 113, 28, ${0.3 * sunAlpha})`);
      sunGrad.addColorStop(1, 'transparent');

      skyCtx.fillStyle = sunGrad;
      skyCtx.beginPath();
      skyCtx.arc(sunX, sunY, 180, 0, Math.PI * 2);
      skyCtx.fill();
    }

    // Étoiles scintillantes
    if (p > 0.22) {
      const starVisibility = clamp((p - 0.22) / 0.6);
      for (let s of stars) {
        s.phase += s.speed;
        const currentAlpha = Math.max(0.1, s.alpha + Math.sin(s.phase) * 0.3) * starVisibility;

        skyCtx.beginPath();
        skyCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        skyCtx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        skyCtx.fill();
      }
    }

    // Étoiles filantes poétiques de temps en temps
    maybeSpawnShootingStar(w, h, time, p);
    drawShootingStars(skyCtx, p);

    // Chaîne de Montagnes 1 (Lointaine, brumeuse)
    const baseH1 = h * 0.66;
    skyCtx.beginPath();
    skyCtx.moveTo(0, h);
    distantMountains1.forEach((pt, i) => {
      const y = baseH1 + pt.y - p * 30;
      if (i === 0) skyCtx.lineTo(pt.x, y);
      else skyCtx.lineTo(pt.x, y);
    });
    skyCtx.lineTo(w, h);
    skyCtx.closePath();

    const m1Color = lerp(0.85, 0.25, p);
    skyCtx.fillStyle = `rgba(${Math.round(180 * m1Color)}, ${Math.round(100 * m1Color)}, ${Math.round(115 * m1Color)}, 0.45)`;
    skyCtx.fill();

    // Chaîne de Montagnes 2 (Plan intermédiaire)
    const baseH2 = h * 0.74;
    skyCtx.beginPath();
    skyCtx.moveTo(0, h);
    distantMountains2.forEach((pt, i) => {
      const y = baseH2 + pt.y - p * 50;
      if (i === 0) skyCtx.lineTo(pt.x, y);
      else skyCtx.lineTo(pt.x, y);
    });
    skyCtx.lineTo(w, h);
    skyCtx.closePath();

    const m2R = Math.round(lerp(120, 20, p));
    const m2G = Math.round(lerp(55, 18, p));
    const m2B = Math.round(lerp(85, 45, p));
    skyCtx.fillStyle = `rgb(${m2R}, ${m2G}, ${m2B})`;
    skyCtx.fill();

    // Tour de lancement et projecteurs au pas de tir (ancrés sur les montagnes)
    drawLaunchPad(skyCtx, w, h, p);

    // Mise à jour de la physique et rendu de la fusée en plein décollage
    updateRocket(w, h, time);
    drawRocketPlume(skyCtx, w, h);
    drawRocket(skyCtx);
  }

  /* ==========================================================
     2. Canvas Crête & Silhouettes de Pins (#ridge)
     ========================================================== */
  const ridgeCanvas = $('#ridge');
  const ridgeCtx = ridgeCanvas.getContext('2d');
  let foregroundRidge = [];
  let pineTrees = [];

  function initRidge() {
    const w = ridgeCanvas.width = window.innerWidth;
    const h = ridgeCanvas.height = window.innerHeight;

    foregroundRidge = generateMountainProfile(w, 15, 4, 0.4);

    pineTrees = [];
    const treeCount = Math.floor(w / 42);

    for (let i = 0; i < treeCount; i++) {
      const x = (i / treeCount) * w + (Math.random() - 0.5) * 30;
      const height = Math.random() * 28 + 18;
      pineTrees.push({ x, height });
    }
  }

  function drawPineTree(ctx, x, y, height) {
    ctx.save();
    ctx.translate(x, y);

    // Tronc
    ctx.fillStyle = '#120B1A';
    ctx.fillRect(-1.5, -height * 0.25, 3, height * 0.25);

    // 3 Étages d'aiguilles triangulaires
    const tiers = 3;
    const tierH = height * 0.35;
    for (let i = 0; i < tiers; i++) {
      const curY = -height * 0.2 - (i * tierH * 0.65);
      const w = (height * 0.45) * (1 - i * 0.2);
      ctx.beginPath();
      ctx.moveTo(0, curY - tierH);
      ctx.lineTo(w, curY);
      ctx.lineTo(-w, curY);
      ctx.closePath();
      ctx.fillStyle = '#160E21';
      ctx.fill();
    }
    ctx.restore();
  }

  function drawRidge(time) {
    const w = ridgeCanvas.width;
    const h = ridgeCanvas.height;
    const p = state.scrollProgress;

    ridgeCtx.clearRect(0, 0, w, h);

    const baseY = h * 0.84 + p * 40;

    ridgeCtx.beginPath();
    ridgeCtx.moveTo(0, h);

    const ridgePoints = [];
    foregroundRidge.forEach((pt, i) => {
      const y = baseY + pt.y;
      ridgePoints.push({ x: pt.x, y });
      if (i === 0) ridgeCtx.lineTo(pt.x, y);
      else ridgeCtx.lineTo(pt.x, y);
    });

    ridgeCtx.lineTo(w, h);
    ridgeCtx.closePath();

    const rColor = Math.round(lerp(26, 12, p));
    const gColor = Math.round(lerp(18, 14, p));
    const bColor = Math.round(lerp(37, 30, p));
    ridgeCtx.fillStyle = `rgb(${rColor}, ${gColor}, ${bColor})`;
    ridgeCtx.fill();

    // Liseré ambré doré sur l'arête
    ridgeCtx.beginPath();
    ridgePoints.forEach((pt, i) => {
      if (i === 0) ridgeCtx.moveTo(pt.x, pt.y);
      else ridgeCtx.lineTo(pt.x, pt.y);
    });
    const rimAlpha = Math.max(0.1, 0.5 - p * 0.35);
    ridgeCtx.strokeStyle = `rgba(245, 158, 11, ${rimAlpha})`;
    ridgeCtx.lineWidth = 1.5;
    ridgeCtx.stroke();

    // Silhouettes de pins sur l'arête
    pineTrees.forEach(tree => {
      const idx = Math.min(ridgePoints.length - 1, Math.max(0, Math.floor((tree.x / w) * ridgePoints.length)));
      const pt = ridgePoints[idx];
      if (pt) {
        drawPineTree(ridgeCtx, tree.x, pt.y + 2, tree.height);
      }
    });
  }

  /* Boucle d'animation principale */
  function animate(timestamp) {
    drawSky(timestamp);
    drawRidge(timestamp);
    requestAnimationFrame(animate);
  }

  /* ==========================================================
     3. Rendu des Compétences (« Ce que j'utilise »)
     ========================================================== */
  function renderSkills() {
    const langContainer = $('#skills-lang-list');
    const toolsContainer = $('#skills-tools-list');
    if (!langContainer || !toolsContainer) return;

    langContainer.innerHTML = '';
    toolsContainer.innerHTML = '';

    PORTFOLIO_DATA.skills.languages.forEach(skill => {
      const pill = document.createElement('button');
      pill.className = 'skill-pill';
      pill.setAttribute('data-skill', skill.id);
      pill.setAttribute('type', 'button');
      pill.innerHTML = `
        <img src="${DEVICON_BASE}${skill.icon}.svg" alt="${skill.name}" loading="lazy">
        <span>${skill.name}</span>
        ${skill.count ? `<span class="skill-count">${skill.count}</span>` : ''}
      `;
      pill.addEventListener('click', () => {
        filterByTech(skill.name.split(' ')[0]);
        const projSec = $('#projets');
        if (projSec) projSec.scrollIntoView({ behavior: 'smooth' });
      });
      langContainer.appendChild(pill);
    });

    PORTFOLIO_DATA.skills.tools.forEach(tool => {
      const pill = document.createElement('div');
      pill.className = 'skill-pill';
      pill.innerHTML = `
        <img src="${DEVICON_BASE}${tool.icon}.svg" alt="${tool.name}" loading="lazy">
        <span>${tool.name}</span>
      `;
      toolsContainer.appendChild(pill);
    });
  }

  /* ==========================================================
     4. Rendu des Projets à la Une (Featured)
     ========================================================== */
  // Visuel d'un projet : son logo s'il en a un, sinon son image
  const projectVisual = (proj) => ({
    src: proj.logo || proj.image,
    alt: proj.logo ? t.logoAlt(proj.title) : proj.title,
    stageClass: proj.logo ? `logo-stage logo-stage--${proj.logoTheme || 'night'}` : ''
  });

  function renderFeatured() {
    const featuredContainer = $('#featured-list');
    if (!featuredContainer) return;

    const featuredProjects = PORTFOLIO_DATA.projects.filter(p => p.featured);
    featuredContainer.innerHTML = '';

    featuredProjects.forEach(proj => {
      const card = document.createElement('article');
      card.className = 'featured-card';
      const visual = projectVisual(proj);
      card.innerHTML = `
        <div class="featured-media ${visual.stageClass}">
          <span class="featured-badge">${proj.platformLabel}</span>
          <img src="${visual.src}" alt="${visual.alt}" class="featured-img" loading="lazy">
        </div>
        <div class="featured-info">
          <div class="featured-meta">
            <span>${proj.kind}</span>
            <span>•</span>
            <span>${proj.date}</span>
          </div>
          <h3 class="featured-title">${proj.title}</h3>
          <p class="featured-subtitle">${proj.subtitle}</p>
          <p class="featured-desc">${proj.description}</p>
          <div class="featured-tags">
            ${proj.tech.map(t => `<span class="tag-chip">${t}</span>`).join('')}
          </div>
          <div class="featured-actions">
            <button type="button" class="btn btn-primary open-modal-btn" data-id="${proj.id}">
              <span>${t.viewProject}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;

      card.querySelector('.open-modal-btn').addEventListener('click', () => {
        openModal(proj.id);
      });

      featuredContainer.appendChild(card);
    });
  }

  /* ==========================================================
     5. Rendu de la Grille Complète & Filtres Multiples
     ========================================================== */
  // Clé de comparaison d'une techno : HTML5 → html, CSS3 → css, JavaFX → java
  function techKey(name) {
    const key = name.toLowerCase().replace(/\d+$/, '');
    return key === 'javafx' ? 'java' : key;
  }

  function renderProjectsGrid() {
    const grid = $('#projects-grid');
    const countEl = $('#result-count');
    const emptyEl = $('#empty-state');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = PORTFOLIO_DATA.projects.filter(proj => {
      if (state.filters.platform && proj.platform !== state.filters.platform) {
        return false;
      }
      if (state.filters.kind && proj.kind !== state.filters.kind) {
        return false;
      }
      if (state.filters.tech) {
        const query = techKey(state.filters.tech);
        const hasTech = proj.tech.some(t => techKey(t) === query);
        if (!hasTech) return false;
      }
      return true;
    });

    if (countEl) {
      countEl.textContent = t.resultCount(filtered.length);
    }

    if (filtered.length === 0) {
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    } else {
      if (emptyEl) emptyEl.style.display = 'none';
    }

    filtered.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'project-card';
      const visual = projectVisual(proj);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', t.projectAria(proj.title));

      card.innerHTML = `
        <div class="project-thumb ${visual.stageClass}">
          <span class="project-badge-top">${proj.kind}</span>
          <img src="${visual.src}" alt="${visual.alt}" loading="lazy">
        </div>
        <div class="project-body">
          <h3 class="project-card-title">${proj.title}</h3>
          <p class="project-card-sub">${proj.subtitle}</p>
          <p class="project-card-desc">${proj.description}</p>
          <div class="project-card-footer">
            <div class="project-chips-small">
              ${proj.tech.slice(0, 3).map(t => `<span class="chip-mini">${t}</span>`).join('')}
            </div>
            <span class="btn-inspect">
              ${t.details}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openModal(proj.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(proj.id);
        }
      });

      grid.appendChild(card);
    });

    setupSpotlightAndTilt();
  }

  function filterByTech(techName) {
    state.filters.tech = techName;
    const select = $('#filter-tech-select');
    if (select) {
      for (let opt of select.options) {
        if (techKey(opt.value) === techKey(techName)) {
          select.value = opt.value;
          break;
        }
      }
    }
    renderProjectsGrid();
  }

  function setupFilters() {
    $$('#filter-platform .seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#filter-platform .seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.filters.platform = btn.getAttribute('data-value') || '';
        renderProjectsGrid();
      });
    });

    $$('#filter-kind .seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#filter-kind .seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.filters.kind = btn.getAttribute('data-value') || '';
        renderProjectsGrid();
      });
    });

    const select = $('#filter-tech-select');
    if (select) {
      select.addEventListener('change', () => {
        state.filters.tech = select.value;
        renderProjectsGrid();
      });
    }

    const resetBtn = $('#filter-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.filters.platform = '';
        state.filters.kind = '';
        state.filters.tech = '';
        $$('.seg-btn').forEach(b => b.classList.remove('active'));
        $$('.seg-btn[data-value=""]').forEach(b => b.classList.add('active'));
        if (select) select.value = '';
        renderProjectsGrid();
      });
    }
  }

  /* ==========================================================
     6. Modale de Projet Interactive (Dialog HTML5)
     ========================================================== */
  const modalDialog = $('#project-modal');
  const gallery = { shots: [], index: 0 };

  function showShot(index) {
    const total = gallery.shots.length;
    if (!total) return;
    gallery.index = (index + total) % total;
    const shot = gallery.shots[gallery.index];
    const img = $('#modal-img');
    img.src = shot.src;
    img.alt = shot.alt;
    $('#gallery-count').textContent = `${gallery.index + 1} / ${total}`;
  }

  function openModal(projectId) {
    const proj = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!proj || !modalDialog) return;

    // Captures du projet ; sans capture, la fiche montre le logo
    gallery.shots = proj.screenshots || [];
    const modalImg = $('#modal-img');
    if (gallery.shots.length) {
      modalImg.className = 'modal-hero-img modal-hero-img--shot';
      showShot(0);
    } else {
      const visual = projectVisual(proj);
      modalImg.src = visual.src;
      modalImg.alt = visual.alt;
      modalImg.className = `modal-hero-img ${visual.stageClass}`;
    }
    $('#modal-gallery').classList.toggle('has-many', gallery.shots.length > 1);
    $('#modal-kind').textContent = `${proj.kind} • ${proj.date}`;
    $('#modal-title').textContent = proj.title;
    $('#modal-subtitle').textContent = proj.subtitle;
    $('#modal-long-desc').textContent = proj.longDescription || proj.description;

    // Ce que j'ai fait moi-même dans les projets de groupe
    const roleWrap = $('#modal-role-wrap');
    const roleList = $('#modal-role-list');
    roleList.innerHTML = '';
    (proj.myRole || []).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      roleList.appendChild(li);
    });
    roleWrap.style.display = proj.myRole && proj.myRole.length > 0 ? 'block' : 'none';

    const hlList = $('#modal-highlights-list');
    hlList.innerHTML = '';
    (proj.highlights || []).forEach(hl => {
      const li = document.createElement('li');
      li.textContent = hl;
      hlList.appendChild(li);
    });

    const patternsWrap = $('#modal-patterns-wrap');
    const patternsList = $('#modal-patterns-list');
    if (proj.designPatterns && proj.designPatterns.length > 0) {
      patternsWrap.style.display = 'block';
      patternsList.innerHTML = proj.designPatterns.map(dp => `<span class="pattern-chip">${dp}</span>`).join('');
    } else {
      patternsWrap.style.display = 'none';
    }

    const techList = $('#modal-tech-list');
    techList.innerHTML = proj.tech.map(t => `<span class="tag-chip">${t}</span>`).join('');

    const ghLink = $('#modal-github-link');
    if (ghLink) ghLink.href = proj.githubUrl || PORTFOLIO_DATA.profile.github;

    // Lien vers le site en ligne, pour les projets qui en ont un
    const demoLink = $('#modal-demo-link');
    if (demoLink) {
      demoLink.style.display = proj.demoUrl ? '' : 'none';
      demoLink.href = proj.demoUrl || '#';
    }

    modalDialog.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modalDialog) {
      modalDialog.close();
      document.body.style.overflow = '';
    }
  }

  function setupModalEvents() {
    const closeBtn = $('#modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    $('#gallery-prev').addEventListener('click', () => showShot(gallery.index - 1));
    $('#gallery-next').addEventListener('click', () => showShot(gallery.index + 1));

    if (modalDialog) {
      modalDialog.addEventListener('click', (e) => {
        if (e.target === modalDialog) closeModal();
      });
      modalDialog.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') showShot(gallery.index - 1);
        if (e.key === 'ArrowRight') showShot(gallery.index + 1);
      });
      modalDialog.addEventListener('close', () => {
        document.body.style.overflow = '';
      });
    }
  }

  /* ==========================================================
     7. Formulaire de Contact & Copie Email
     ========================================================== */
  function setupContact() {
    const copyBtn = $('#copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const email = PORTFOLIO_DATA.profile.email;
        navigator.clipboard.writeText(email).then(() => {
          showToast(t.emailCopied(email));
        }).catch(() => {
          showToast(t.emailFallback(email));
        });
      });
    }

    const form = $('#contact-form');
    const feedback = $('#form-feedback');
    const submitBtn = $('#cf-submit');
    if (!form || !feedback || !submitBtn) return;

    const submitLabel = submitBtn.querySelector('span');
    const idleLabel = submitLabel.textContent;

    const showFeedback = (type, ...content) => {
      feedback.className = `form-feedback ${type}`;
      feedback.replaceChildren(...content);
      feedback.style.display = 'flex';
    };

    // Échec d'envoi : le message saisi est conservé et un lien mail prérempli est proposé
    const showSendError = ({ name, email, message }) => {
      const subject = encodeURIComponent(t.mailSubject(name));
      const body = encodeURIComponent(`${message}

${name}
${email}`);
      const link = document.createElement('a');
      link.href = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${subject}&body=${body}`;
      link.textContent = t.writeDirectly;
      const text = document.createElement('span');
      text.append(t.sendFailed, link, '.');
      showFeedback('error', text);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitBtn.disabled) return;

      const fields = {
        name: $('#cf-name').value.trim(),
        email: $('#cf-email').value.trim(),
        message: $('#cf-msg').value.trim()
      };

      if (!fields.name || !fields.email || !fields.message) {
        showFeedback('error', t.fillAll);
        return;
      }
      if (!$('#cf-email').checkValidity()) {
        showFeedback('error', t.invalidEmail);
        return;
      }

      const accessKey = PORTFOLIO_DATA.contact.web3formsKey;
      if (!accessKey) {
        console.error('Formulaire de contact : contact.web3formsKey est vide dans data.js.');
        showSendError(fields);
        return;
      }

      submitBtn.disabled = true;
      submitLabel.textContent = t.sending;
      feedback.style.display = 'none';

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: t.mailSubject(fields.name),
            from_name: 'Portfolio SkayZax',
            botcheck: $('#cf-botcheck').checked,
            ...fields
          }),
          signal: controller.signal
        });
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || `HTTP ${response.status}`);
        }

        // Succès confirmé : poussée maximale de la fusée
        triggerRocketBoost();
        showFeedback('success', t.sent);
        form.reset();
        showToast(t.liftoff);
      } catch (err) {
        console.error('Formulaire de contact :', err);
        showSendError(fields);
      } finally {
        clearTimeout(timeout);
        submitBtn.disabled = false;
        submitLabel.textContent = idleLabel;
      }
    });
  }

  function showToast(text) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  /* ==========================================================
     8. Événements Globaux & Scroll Spy
     ========================================================== */
  function updateScrollProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    state.scrollProgress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

    // Bascule de thème crépuscule/nuit selon la progression de scroll
    if (state.scrollProgress > 0.28) {
      document.body.setAttribute('data-theme', 'night');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }

  /* Menu de navigation mobile */
  function setupMobileNav() {
    const toggle = $('#nav-toggle');
    const menu = $('#nav-menu');
    if (!toggle || !menu) return;

    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? t.closeMenu : t.openMenu);
      menu.classList.toggle('open', open);
    };

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', (e) => {
      if (isOpen() && !e.target.closest('#nav-menu, #nav-toggle')) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Ferme le menu quand le focus clavier en sort
    menu.addEventListener('focusout', (e) => {
      if (e.relatedTarget && !e.relatedTarget.closest('#nav-menu, #nav-toggle')) setOpen(false);
    });

    window.matchMedia('(min-width: 1024px)').addEventListener('change', () => setOpen(false));
  }

  function setupEventListeners() {
    window.addEventListener('mousemove', (e) => {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
    });

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    window.addEventListener('resize', () => {
      initSky();
      initRidge();
      updateScrollProgress();
    });

    // Calcul initial immédiat pour synchroniser la fusée au chargement
    updateScrollProgress();

    // Clic céleste interactif : faire un voeu en déclenchant une étoile filante
    window.addEventListener('click', (e) => {
      if (e.target.closest('button, a, input, select, textarea, .project-card, .featured-card, .modal-dialog, .modal-backdrop, nav')) return;
      spawnShootingStar(skyCanvas.width, skyCanvas.height, e.clientX, Math.min(e.clientY, skyCanvas.height * 0.45));
    });

    // IntersectionObserver pour navigation active
    const sections = $$('header.hero, section[id]');
    const navLinks = $$('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  /* Micro-interactions Premium : Spotlight radial & 3D Tilt */
  function setupSpotlightAndTilt() {
    const cards = $$('.featured-card, .project-card, .about-card, .channel-card, .skills-column');
    cards.forEach(card => {
      if (card.dataset.spotlightBound) return;
      card.dataset.spotlightBound = 'true';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        if (card.classList.contains('featured-card') || card.classList.contains('project-card')) {
          const rx = ((y / rect.height) - 0.5) * -6;
          const ry = ((x / rect.width) - 0.5) * 6;
          card.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (card.classList.contains('featured-card') || card.classList.contains('project-card')) {
          card.style.transform = '';
        }
      });
    });
  }

  /* Initialisation Globale */
  document.addEventListener('DOMContentLoaded', () => {
    initSky();
    initRidge();
    renderSkills();
    renderFeatured();
    renderProjectsGrid();
    setupFilters();
    setupModalEvents();
    setupContact();
    setupSpotlightAndTilt();
    setupMobileNav();
    setupEventListeners();

    requestAnimationFrame(animate);
  });
})();
