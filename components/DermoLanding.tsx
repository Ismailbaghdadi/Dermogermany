"use client";

import Script from "next/script";

const MARKUP = `
<style>
#dg-lp{
  --cream:#FDFBFA; --rose:#F9EEF0; --char:#1C1917; --champ:#D4AF37;
  --gold:#C59B27; --pink:#C86D7E; --wa:#25D366; --wa-h:#1EBE5D;
  --txt:#2A2523; --muted:#6B6360; --line:#EADFD9;
  --r:18px; --shadow:0 10px 30px rgba(28,25,23,.10);
  font-family:'Poppins',system-ui,-apple-system,'Segoe UI',sans-serif;
  color:var(--txt); background:var(--cream); line-height:1.5;
  -webkit-font-smoothing:antialiased; padding-bottom:92px; overflow-x:hidden;
}
#dg-lp *,#dg-lp *::before,#dg-lp *::after{box-sizing:border-box}
#dg-lp .ar{font-family:'Cairo',sans-serif;direction:rtl;unicode-bidi:isolate}
#dg-lp .wrap{max-width:520px;margin:0 auto;padding:0 18px}
#dg-lp section{padding:38px 0}
#dg-lp .alt{background:var(--rose)}
#dg-lp h1,#dg-lp h2,#dg-lp h3{margin:0;line-height:1.2;color:var(--char)}
#dg-lp h2{font-size:24px;font-weight:800;text-align:center;margin-bottom:8px}
#dg-lp .lead{text-align:center;color:var(--muted);font-size:15px;margin:0 0 22px}
#dg-lp a{color:inherit}

/* 1. Barre d'annonce */
#dg-lp .topbar{position:sticky;top:0;z-index:50;background:var(--char);color:#fff;
  font-size:12.5px;font-weight:600;text-align:center;padding:9px 12px;border-bottom:1px solid var(--champ)}
#dg-lp .topbar b{color:var(--champ)}

/* 2. Hero */
#dg-lp .hero{padding-top:22px;text-align:center}
#dg-lp .loc-badge{display:inline-flex;gap:6px;align-items:center;max-width:100%;line-height:1.35;background:var(--char);color:#fff;
  border:1px solid var(--champ);border-radius:999px;padding:7px 14px;font-size:12.5px;font-weight:600}
#dg-lp .hero h1{font-size:27px;font-weight:800;margin:16px 0 10px;letter-spacing:-.3px}
#dg-lp .hero h1 .hl{color:var(--pink)}
#dg-lp .hero h1 .gold{background:linear-gradient(90deg,#B8860B,var(--champ),#B8860B);
  -webkit-background-clip:text;background-clip:text;color:transparent}
#dg-lp .hero p.sub{font-size:15px;color:var(--muted);margin:0 0 6px}
#dg-lp .hero p.dj{font-size:16px;color:var(--pink);margin:0 0 18px;font-weight:700}
#dg-lp .video-box{position:relative;width:100%;max-width:330px;margin:0 auto;aspect-ratio:9/16;
  border-radius:22px;overflow:hidden;box-shadow:0 18px 40px rgba(200,109,126,.28);background:#000;
  border:2px solid var(--champ)}
#dg-lp .video-box video{width:100%;height:100%;object-fit:cover;display:block}
#dg-lp .video-tag{display:inline-block;background:var(--pink);color:#fff;font-size:12.5px;font-weight:700;
  padding:6px 14px;border-radius:999px;margin-bottom:10px}
#dg-lp .cta-stack{display:grid;gap:10px;margin-top:20px}

/* Boutons */
#dg-lp .btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:56px;
  border:0;border-radius:14px;font:700 16px/1.2 'Poppins',sans-serif;cursor:pointer;text-decoration:none;
  padding:14px 16px;transition:transform .15s,background .2s,box-shadow .2s;-webkit-tap-highlight-color:transparent}
#dg-lp .btn:active{transform:scale(.98)}
#dg-lp .btn-gold{background:var(--char);color:#fff;border:2px solid var(--champ);box-shadow:var(--shadow)}
#dg-lp .btn-gold:hover{background:#2b2622}
#dg-lp .btn-wa{background:var(--wa);color:#fff;box-shadow:0 8px 22px rgba(37,211,102,.35)}
#dg-lp .btn-wa:hover{background:var(--wa-h)}
#dg-lp .btn svg{width:22px;height:22px;flex:none}
#dg-lp .pulse{animation:dgPulse 2.2s infinite}
@keyframes dgPulse{0%,100%{box-shadow:0 8px 22px rgba(37,211,102,.35)}50%{box-shadow:0 8px 30px rgba(37,211,102,.6),0 0 0 6px rgba(37,211,102,.12)}}
#dg-lp .trust-row{display:flex;justify-content:center;flex-wrap:wrap;gap:6px 14px;margin-top:14px;font-size:12.5px;color:var(--muted)}

/* 3. Offres */
#dg-lp .offers{display:grid;gap:16px}
#dg-lp .offer{position:relative;border-radius:var(--r);padding:22px 20px;cursor:pointer;
  border:2px solid var(--line);background:#fff;transition:border-color .2s,transform .2s,box-shadow .2s}
#dg-lp .offer.star{background:var(--char);color:#fff;border-color:var(--champ);box-shadow:0 14px 34px rgba(28,25,23,.25)}
#dg-lp .offer.star h3{color:#fff}
#dg-lp .offer.selected{transform:translateY(-2px)}
#dg-lp .offer:not(.star).selected{border-color:var(--pink);box-shadow:0 10px 26px rgba(200,109,126,.22)}
#dg-lp .ribbon{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,var(--gold),var(--champ));
  color:var(--char);font-size:12px;font-weight:800;padding:5px 14px;border-radius:999px;white-space:nowrap}
#dg-lp .offer .tag{font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--pink)}
#dg-lp .offer.star .tag{color:var(--champ)}
#dg-lp .offer h3{font-size:19px;font-weight:800;margin:4px 0 8px}
#dg-lp .price{display:flex;align-items:baseline;gap:10px;margin:6px 0 12px}
#dg-lp .price b{font-size:34px;font-weight:800;line-height:1}
#dg-lp .offer.star .price b{color:var(--champ)}
#dg-lp .price s{color:#9b918d;font-size:15px}
#dg-lp .offer.star .price s{color:#a89f95}
#dg-lp .offer ul{list-style:none;margin:0 0 16px;padding:0;display:grid;gap:7px;font-size:14.5px}
#dg-lp .offer p.desc{font-size:14.5px;color:var(--muted);margin:0 0 16px}
#dg-lp .offer .pick{width:100%;min-height:50px;font-size:15px}
#dg-lp .offer .btn-light{background:var(--rose);color:var(--char);border:2px solid var(--pink)}
#dg-lp .offer.star .btn-light{background:var(--champ);color:var(--char);border-color:var(--champ)}

/* 4. Formulaire */
#dg-lp .form-card{background:#fff;border:2px solid var(--champ);border-radius:22px;padding:22px 18px;box-shadow:var(--shadow)}
#dg-lp .urgency{display:flex;gap:8px;align-items:center;justify-content:center;background:#FFF6E0;color:#7a5a06;
  border:1px solid #F0D58A;border-radius:12px;padding:10px;font-size:14px;font-weight:700;margin-bottom:18px}
#dg-lp .field{margin-bottom:16px}
#dg-lp label.lbl{display:flex;justify-content:space-between;gap:8px;font-size:14px;font-weight:700;margin-bottom:7px;color:var(--char)}
#dg-lp label.lbl .ar{font-weight:700;color:var(--muted)}
#dg-lp .radio-opt{display:flex;gap:12px;align-items:center;border:2px solid var(--line);border-radius:14px;padding:13px 14px;
  margin-bottom:9px;cursor:pointer;background:var(--cream);transition:border-color .2s,background .2s}
#dg-lp .radio-opt input{accent-color:var(--pink);width:20px;height:20px;flex:none;margin:0}
#dg-lp .radio-opt .ro-t{font-size:14.5px;font-weight:700;color:var(--char)}
#dg-lp .radio-opt .ro-s{font-size:12.5px;color:var(--muted)}
#dg-lp .radio-opt.on{border-color:var(--pink);background:var(--rose)}
#dg-lp .radio-opt .ro-b{margin-left:auto;font-size:11px;font-weight:800;color:var(--char);background:var(--champ);padding:3px 8px;border-radius:999px;white-space:nowrap}
#dg-lp input[type=text],#dg-lp input[type=tel],#dg-lp select{width:100%;min-height:52px;border:2px solid var(--line);border-radius:12px;
  padding:12px 14px;font:500 16px 'Poppins',sans-serif;background:#fff;color:var(--txt);outline:none;-webkit-appearance:none;appearance:none}
#dg-lp select{background-image:linear-gradient(45deg,transparent 50%,var(--muted) 50%),linear-gradient(135deg,var(--muted) 50%,transparent 50%);
  background-position:calc(100% - 20px) 50%,calc(100% - 14px) 50%;background-size:6px 6px;background-repeat:no-repeat}
#dg-lp input:focus,#dg-lp select:focus{border-color:var(--pink)}
#dg-lp .err{display:none;color:#C0392B;font-size:12.5px;margin-top:5px}
#dg-lp .field.invalid input{border-color:#C0392B}
#dg-lp .field.invalid .err{display:block}
#dg-lp .submit{background:var(--wa);color:#fff;font-size:15.5px;min-height:62px;animation:dgPulse 2.2s infinite}
#dg-lp .submit:hover{background:var(--wa-h)}
#dg-lp .reassure{text-align:center;font-size:12.5px;color:var(--muted);margin:12px 0 0}
#dg-lp .success{display:none;text-align:center;padding:10px 4px}
#dg-lp .success .big{font-size:46px}
#dg-lp .success h3{font-size:20px;margin:6px 0}
#dg-lp .hp{position:absolute;left:-9999px;opacity:0;height:0;width:0}

/* 5. Avis */
#dg-lp .rating{text-align:center;margin-bottom:18px;font-weight:700}
#dg-lp .rating .stars{color:var(--gold);font-size:20px;letter-spacing:2px}
#dg-lp .reviews{display:grid;gap:14px}
#dg-lp .review{background:#fff;border-radius:var(--r);padding:18px;border:1px solid var(--line);box-shadow:0 4px 14px rgba(28,25,23,.05)}
#dg-lp .review .stars{color:var(--gold);font-size:15px}
#dg-lp .review p{margin:8px 0 10px;font-size:14.5px}
#dg-lp .review .who{font-size:13px;font-weight:700;color:var(--pink)}

/* 6. Piliers */
#dg-lp .pillars{display:grid;grid-template-columns:1fr 1fr;gap:12px}
#dg-lp .pillar{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:16px 14px}
#dg-lp .pillar .ic{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:var(--char);
  border:1px solid var(--champ);font-size:20px;margin-bottom:10px}
#dg-lp .pillar h3{font-size:14.5px;font-weight:800;margin-bottom:5px}
#dg-lp .pillar p{font-size:12.5px;color:var(--muted);margin:0}

/* 7. FAQ */
#dg-lp details{background:#fff;border:1px solid var(--line);border-radius:14px;margin-bottom:10px;overflow:hidden}
#dg-lp summary{list-style:none;cursor:pointer;padding:16px 46px 16px 16px;font-weight:700;font-size:15px;position:relative;color:var(--char)}
#dg-lp summary::-webkit-details-marker{display:none}
#dg-lp summary::after{content:'+';position:absolute;right:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;border-radius:50%;
  background:var(--rose);color:var(--pink);display:grid;place-items:center;font-size:18px;font-weight:700;transition:transform .2s}
#dg-lp details[open] summary::after{content:'–'}
#dg-lp details .ans{padding:0 16px 16px;font-size:14.5px;color:var(--muted)}

/* 8. Localisation */
#dg-lp .loc-card{background:var(--char);color:#fff;border:1px solid var(--champ);border-radius:22px;padding:22px 18px}
#dg-lp .loc-card h2{color:#fff;text-align:left;font-size:21px}
#dg-lp .loc-line{display:flex;gap:10px;font-size:14.5px;margin:12px 0}
#dg-lp .loc-line b{color:var(--champ)}
#dg-lp .map{width:100%;height:230px;border:0;border-radius:14px;margin:8px 0 14px;display:block;background:#2b2622}
#dg-lp .footer{text-align:center;font-size:12px;color:var(--muted);padding:22px 0 10px}

/* 9. Barre fixe bas */
#dg-lp .bottombar{position:fixed;left:0;right:0;bottom:0;z-index:60;background:rgba(28,25,23,.97);border-top:1px solid var(--champ);
  padding:10px 12px calc(10px + env(safe-area-inset-bottom));display:flex;align-items:center;gap:10px;
  transform:translateY(110%);transition:transform .3s}
#dg-lp .bottombar.show{transform:none}
#dg-lp .bb-txt{flex:1;color:#fff;font-size:12px;line-height:1.25}
#dg-lp .bb-txt b{display:block;color:var(--champ);font-size:14px}
#dg-lp .bb-book{flex:none;min-height:48px;width:auto;padding:0 18px;font-size:15px;background:var(--champ);color:var(--char)}
#dg-lp .bb-wa{flex:none;width:48px;height:48px;min-height:48px;padding:0;border-radius:50%;background:var(--wa)}
#dg-lp .bb-wa svg{width:26px;height:26px}

#dg-lp .reveal{opacity:0;transform:translateY(16px);transition:opacity .6s,transform .6s}
#dg-lp .reveal.in{opacity:1;transform:none}
@media (min-width:768px){
  #dg-lp .hero h1{font-size:32px}
  #dg-lp .bottombar{max-width:520px;margin:0 auto;border-radius:16px 16px 0 0;border:1px solid var(--champ)}
}
@media (prefers-reduced-motion:reduce){#dg-lp *{animation:none!important;transition:none!important}}
</style>

<div id="dg-lp">

  <div class="topbar">🔥 OFFRE LIMITÉE CE MOIS-CI • <b>Diagnostic Laser Gratuit</b> à Aïn Sebaâ, Casablanca</div>

  <section class="hero">
    <div class="wrap">
      <span class="loc-badge">📍 Centre Dermogermany • Aïn Sebaâ, Casablanca</span>

      <h1>Épilation Laser Définitive : Séance dès <span class="hl">200&nbsp;DH</span> ou Pack Corps Complet <span class="gold">10&nbsp;Séances à 5&nbsp;000&nbsp;DH</span></h1>
      <p class="sub">Au lieu de 1 000 DH la séance corps complet : vos 10 séances reviennent à 500 DH seulement, avec notre laser médical Diode haute performance.</p>
      <p class="dj ar">حجزي دابا وخلّصي فالمركز ✨</p>

      <span class="video-tag">▶️ Regardez l'offre en 20 secondes</span>
      <div class="video-box">
        <video id="dg-video" controls playsinline preload="metadata" poster="/dermogermany-poster.jpg">
          <source src="/dermogermany-video-web.mp4" type="video/mp4">
        </video>
      </div>

      <div class="cta-stack">
        <a href="#dg-form" class="btn btn-gold js-scroll" data-offer="pack">👇 Réserver mon offre maintenant</a>
        <a href="#" class="btn btn-wa pulse js-wa" target="_blank" rel="noopener">
          <svg viewBox="0 0 32 32" fill="#fff" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.7-5.7C5.1 10 10 5.3 16 5.3S26.9 10 26.9 15.8 22 26.4 16 26.4zm6-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
          📲 Discuter sur WhatsApp
        </a>
      </div>
      <div class="trust-row"><span>✅ Diagnostic gratuit</span><span>💳 Paiement au centre</span><span>🩺 Laser médical</span></div>
    </div>
  </section>

  <section class="alt" id="dg-offres">
    <div class="wrap">
      <h2>Choisissez votre offre</h2>
      <p class="lead">Les 2 offres présentées dans la vidéo, sans surprise.</p>
      <div class="offers">

        <div class="offer star reveal" data-offer="pack" tabindex="0">
          <span class="ribbon">⭐ LE PLUS CHOISI</span>
          <span class="tag">Offre Star • Best-seller</span>
          <h3>Pack Corps Complet — 10 Séances</h3>
          <div class="price"><b>5 000 DH</b><s>10 000 DH</s></div>
          <ul>
            <li>✅ Toutes les zones du corps incluses</li>
            <li>✅ 10 séances corps complet (500 DH la séance)</li>
            <li>✅ Diagnostic de peau offert</li>
            <li>✅ Laser Diode médical, confortable &amp; sécurisé</li>
          </ul>
          <button type="button" class="btn btn-light pick">Je choisis le Pack →</button>
        </div>

        <div class="offer reveal" data-offer="decouverte" tabindex="0">
          <span class="tag">Offre Découverte</span>
          <h3>Séance Promo Découverte</h3>
          <div class="price"><b>200 DH</b></div>
          <p class="desc">Idéal pour tester l'efficacité et le confort de notre laser sur une zone au choix. <b style="color:var(--pink)">Places limitées.</b></p>
          <button type="button" class="btn btn-light pick">Je teste à 200 DH →</button>
        </div>

      </div>
    </div>
  </section>

  <section id="dg-form">
    <div class="wrap">
      <h2>Réservez en 30 secondes</h2>
      <p class="lead">Nous vous rappelons pour confirmer votre créneau. <span class="ar">بلا خلاص أونلاين</span></p>

      <div class="form-card reveal">
        <div class="urgency"><span>⏳ Plus que <b id="dg-places">7</b> places disponibles cette semaine</span></div>

        <form id="dg-booking" novalidate>
          <div class="field">
            <label class="lbl">Choix de votre offre</label>
            <label class="radio-opt on">
              <input type="radio" name="offre" value="pack" checked>
              <span><span class="ro-t">Pack Corps Complet 10 Séances — 5 000 DH</span><br><span class="ro-s">Toutes les zones • Diagnostic offert</span></span>
              <span class="ro-b">⭐ TOP</span>
            </label>
            <label class="radio-opt">
              <input type="radio" name="offre" value="decouverte">
              <span><span class="ro-t">Séance Promo Découverte — 200 DH</span><br><span class="ro-s">1 zone au choix</span></span>
            </label>
          </div>

          <div class="field" id="f-name">
            <label class="lbl" for="dg-name">Nom et Prénom <span class="ar">الاسم الكامل</span></label>
            <input type="text" id="dg-name" name="nom" autocomplete="name" placeholder="Ex : Ikram Benali" required>
            <div class="err">Merci d'indiquer votre nom.</div>
          </div>

          <div class="field" id="f-phone">
            <label class="lbl" for="dg-phone">Téléphone (WhatsApp) <span class="ar">رقم الهاتف</span></label>
            <input type="tel" id="dg-phone" name="telephone" inputmode="tel" autocomplete="tel" placeholder="06 12 34 56 78" required>
            <div class="err">Numéro marocain invalide (ex : 06 12 34 56 78 ou 07…).</div>
          </div>

          <div class="field">
            <label class="lbl" for="dg-slot">Créneau préféré</label>
            <select id="dg-slot" name="creneau">
              <option>Matin (10h - 13h)</option>
              <option>Après-midi (13h - 17h)</option>
              <option>Fin de journée (17h - 20h)</option>
            </select>
          </div>

          <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">

          <button type="submit" class="btn submit">✅ CONFIRMER MA RÉSERVATION (Paiement au centre)</button>
          <p class="reassure">🔒 Aucun paiement en ligne requis • Confirmation rapide par appel ou WhatsApp • Diagnostic gratuit inclus</p>
        </form>

        <div class="success" id="dg-success">
          <div class="big">🎉</div>
          <h3>Réservation reçue, merci !</h3>
          <p style="color:var(--muted);font-size:14.5px;margin:0 0 14px">Nous ouvrons WhatsApp pour confirmer votre créneau. Si rien ne s'ouvre, appuyez ci-dessous.</p>
          <a href="#" class="btn btn-wa" id="dg-success-wa" target="_blank" rel="noopener">📲 Confirmer sur WhatsApp</a>
        </div>
      </div>
    </div>
  </section>

  <section class="alt" id="dg-avis" hidden>
    <div class="wrap">
      <h2>Elles nous ont fait confiance</h2>
      <div class="rating" id="dg-rating"></div>
      <div class="reviews" id="dg-reviews"></div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2>Pourquoi choisir le Centre Dermogermany ?</h2>
      <p class="lead">Un centre esthétique médicalisé au cœur d'Aïn Sebaâ.</p>
      <div class="pillars">
        <div class="pillar reveal"><div class="ic">⚡</div><h3>Laser médical dernière génération</h3><p>Laser Diode adapté à tous les phototypes, avec refroidissement intégré.</p></div>
        <div class="pillar reveal"><div class="ic">🧬</div><h3>Protocole 100 % personnalisé</h3><p>Bilan pilaire gratuit avant votre première séance.</p></div>
        <div class="pillar reveal"><div class="ic">🛡️</div><h3>Hygiène &amp; sécurité strictes</h3><p>Équipe qualifiée et suivi régulier à chaque séance.</p></div>
        <div class="pillar reveal"><div class="ic">💎</div><h3>Transparence totale</h3><p>Prix annoncé = prix payé. Aucun frais caché sur le pack.</p></div>
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2>Vos questions</h2>
      <p class="lead">Tout ce qu'il faut savoir avant de réserver.</p>
      <details><summary>Est-ce que le laser fait mal ?</summary>
        <div class="ans">La plupart de nos patientes décrivent une légère sensation de chaleur ou de picotement. Notre laser Diode dispose d'un système de refroidissement qui rend la séance très supportable, et l'intensité est ajustée à votre peau.</div></details>
      <details><summary>Combien de séances sont incluses dans le pack à 5 000 DH ?</summary>
        <div class="ans">Le pack comprend 10 séances corps complet, soit 500 DH la séance au lieu de 1 000 DH. Le nombre de séances nécessaires varie selon votre peau et votre pilosité : le diagnostic gratuit vous donne une estimation honnête dès le premier rendez-vous.</div></details>
      <details><summary>Quelles zones sont comprises dans le corps complet ?</summary>
        <div class="ans">Le corps complet comprend notamment les jambes entières, les bras, les aisselles, le maillot, le ventre et le dos. La liste exacte vous est confirmée lors du diagnostic gratuit.</div></details>
      <details><summary>Dois-je payer en ligne maintenant ou au centre ?</summary>
        <div class="ans">Aucun paiement en ligne : vous réservez gratuitement ici et vous réglez directement au centre, à Aïn Sebaâ, le jour de votre rendez-vous.</div></details>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="loc-card reveal">
        <h2>📍 Où nous trouver à Casablanca ?</h2>
        <div class="loc-line"><span>🏢</span><span><b>Centre Dermogermany</b><br>Lotissement Al Amane 4, Immeuble 187, Appt 3, Aïn Sebaâ, Casablanca</span></div>
        <div class="loc-line"><span>🕙</span><span>Lundi au Samedi : <b>10h00 – 20h00</b></span></div>
        <iframe class="map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Carte Centre Dermogermany"
          src="https://www.google.com/maps?q=Lotissement+Al+Amane+4,+A%C3%AFn+Seba%C3%A2,+Casablanca&output=embed"></iframe>
        <a class="btn btn-gold" target="_blank" rel="noopener"
           href="https://www.google.com/maps/search/?api=1&query=Centre+Dermogermany+Lotissement+Al+Amane+4+A%C3%AFn+Seba%C3%A2+Casablanca">🗺️ Ouvrir l'itinéraire sur Google Maps</a>
      </div>
      <div class="footer">© Centre Dermogermany • Aïn Sebaâ, Casablanca</div>
    </div>
  </section>

  <div class="bottombar" id="dg-bottombar">
    <div class="bb-txt"><b>10 séances 5 000 DH</b>ou séance dès 200 DH</div>
    <a href="#dg-form" class="btn bb-book js-scroll" data-offer="pack">Réserver</a>
    <a href="#" class="btn bb-wa js-wa" target="_blank" rel="noopener" aria-label="WhatsApp">
      <svg viewBox="0 0 32 32" fill="#fff" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm6 15.6c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
    </a>
  </div>
</div>
`;

const BEHAVIOR_SCRIPT = `
(function () {
  var CONFIG = {
    WHATSAPP_NUMBER: "212601561726",
    PLACES_LEFT: 7,
    WEBHOOK_URL: "/api/submit-lead",
    CURRENCY: "MAD"
  };

  var OFFERS = {
    pack:       { name: "Pack Corps Complet 10 Séances — 5 000 DH", value: 5000 },
    decouverte: { name: "Séance Promo Découverte — 200 DH", value: 200 }
  };

  var root = document.getElementById("dg-lp");
  var $ = function (s, c) { return (c || root).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || root).querySelectorAll(s)); };

  $("#dg-places").textContent = CONFIG.PLACES_LEFT;

  function trackMeta(ev, params) {
    try { if (typeof window.fbq === "function") window.fbq("track", ev, params || {}); } catch (e) {}
  }
  function trackTikTok(ev, params) {
    try { if (window.ttq && typeof window.ttq.track === "function") window.ttq.track(ev, params || {}); } catch (e) {}
  }

  trackMeta("ViewContent", { content_name: "Landing Épilation Laser Dermogermany", content_category: "Epilation laser",
                             value: OFFERS.pack.value, currency: CONFIG.CURRENCY });

  var ic = {};
  function initiate(key) {
    if (ic[key]) return; ic[key] = true;
    trackMeta("InitiateCheckout", { content_name: OFFERS[key].name, value: OFFERS[key].value, currency: CONFIG.CURRENCY });
  }

  function waLink(msg) {
    return "https://wa.me/" + CONFIG.WHATSAPP_NUMBER.replace(/\\D/g, "") + "?text=" + encodeURIComponent(msg);
  }
  var waDefault = "Bonjour Centre Dermogermany 👋 Je souhaite des informations sur l'épilation laser (" +
                  OFFERS.pack.name + " / séance dès 200 DH).";
  $$(".js-wa").forEach(function (a) {
    a.href = waLink(waDefault);
    a.addEventListener("click", function () { trackMeta("Contact", { content_name: "WhatsApp" }); trackTikTok("Contact"); });
  });

  function selectOffer(key, scroll) {
    $$(".offer").forEach(function (o) { o.classList.toggle("selected", o.dataset.offer === key); });
    $$('input[name="offre"]').forEach(function (r) {
      r.checked = r.value === key;
      r.closest(".radio-opt").classList.toggle("on", r.checked);
    });
    initiate(key);
    if (scroll) $("#dg-form").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  $$(".offer").forEach(function (o) {
    o.addEventListener("click", function () { selectOffer(o.dataset.offer, true); });
    o.addEventListener("keydown", function (e) { if (e.key === "Enter") selectOffer(o.dataset.offer, true); });
  });
  $$('input[name="offre"]').forEach(function (r) {
    r.addEventListener("change", function () { selectOffer(r.value, false); });
  });
  $$(".js-scroll").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); selectOffer(a.dataset.offer || "pack", true); });
  });

  function normPhone(v) {
    var d = v.replace(/[^\\d+]/g, "");
    if (d.indexOf("+212") === 0) d = "0" + d.slice(4);
    else if (d.indexOf("00212") === 0) d = "0" + d.slice(5);
    else if (d.indexOf("212") === 0 && d.length === 12) d = "0" + d.slice(3);
    return /^0[67]\\d{8}$/.test(d) ? d : null;
  }

  function getUtmAndSource() {
    var params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmContent: params.get("utm_content") || params.get("utm_term") || "",
      pageUrl: window.location.href,
      referrer: document.referrer || ""
    };
  }

  var form = $("#dg-booking");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.website.value) return;
    var name = form.nom.value.trim();
    var phone = normPhone(form.telephone.value);
    $("#f-name").classList.toggle("invalid", name.length < 2);
    $("#f-phone").classList.toggle("invalid", !phone);
    if (name.length < 2 || !phone) { (name.length < 2 ? form.nom : form.telephone).focus(); return; }

    var key = form.offre.value, offer = OFFERS[key], slot = form.creneau.value;
    var tracking = getUtmAndSource();
    var data = {
      offre: offer.name, nom: name, telephone: phone, creneau: slot,
      source: "Landing Meta Ads",
      utmSource: tracking.utmSource, utmCampaign: tracking.utmCampaign, utmContent: tracking.utmContent,
      pageUrl: tracking.pageUrl, referrer: tracking.referrer
    };

    trackMeta("Lead", { content_name: offer.name, value: offer.value, currency: CONFIG.CURRENCY });
    trackTikTok("SubmitForm", { content_name: offer.name, value: offer.value, currency: CONFIG.CURRENCY });

    try {
      fetch(CONFIG.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).catch(function () {});
    } catch (err) {}

    var msg = "Bonjour Centre Dermogermany 👋\\nJe confirme ma réservation :\\n" +
              "• Offre : " + offer.name + "\\n• Nom : " + name + "\\n• Téléphone : " + phone +
              "\\n• Créneau préféré : " + slot + "\\n(Paiement au centre)";
    var link = waLink(msg);
    $("#dg-success-wa").href = link;
    form.style.display = "none";
    $(".urgency").style.display = "none";
    $("#dg-success").style.display = "block";
    setTimeout(function () { window.location.href = link; }, 700);
  });
  ["nom", "telephone"].forEach(function (n) {
    form[n].addEventListener("input", function () { form[n].closest(".field").classList.remove("invalid"); });
  });

  var v = $("#dg-video"), played = false;
  if (v) v.addEventListener("play", function () {
    if (played) return; played = true;
    trackMeta("ViewContent", { content_name: "Vidéo offre laser", content_type: "video" });
  });

  var bar = $("#dg-bottombar"), hero = $(".hero"), formSec = $("#dg-form");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var heroEnd = hero.offsetTop + hero.offsetHeight - 120;
    var r = formSec.getBoundingClientRect();
    var onForm = r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.3;
    bar.classList.toggle("show", y > heroEnd && !onForm);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); }
})();
`;

export default function DermoLanding() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
      <Script id="dg-lp-behavior" strategy="afterInteractive">
        {BEHAVIOR_SCRIPT}
      </Script>
    </>
  );
}
