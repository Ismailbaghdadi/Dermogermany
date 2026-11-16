# Landing Page – Centre Dermogermany

Landing page (Next.js, App Router + TypeScript) pour les publicités Meta/TikTok du Centre Dermogermany (Aïn Sebaâ, Casablanca). Le CTA principal redirige vers WhatsApp après un formulaire de réservation rapide (nom, téléphone, offre, créneau). Chaque soumission est aussi enregistrée silencieusement dans Google Sheets, en parallèle, comme filet de sécurité si WhatsApp ne s'ouvre pas.

---

## 1. Structure du projet

```
app/
  page.tsx                   Rend le composant DermoLanding
  api/submit-lead/route.ts   Endpoint serveur : valide et enregistre le lead dans Google Sheets
  layout.tsx                 <html lang="fr" dir="ltr">, polices Google Fonts, Pixels
  globals.css                Reset minimal (le design de la page vit dans son propre <style>)

components/
  DermoLanding.tsx            Toute la landing page (markup + script, injectés tels quels)
  PixelScripts.tsx            Code de base Meta Pixel / TikTok Pixel (actif seulement si un ID est configuré)

lib/
  types.ts                    Type du lead WhatsApp
  validation.ts                Validation/normalisation du numéro marocain
  googleSheets.ts               Connexion Google Sheets (côté serveur uniquement)
```

**Important :** aucun secret dans le code. Tout passe par des variables d'environnement (`.env.local` en local, Environment Variables sur Vercel).

---

## 2. Lancer en local

```bash
npm install
cp .env.example .env.local   # remplir les vraies valeurs dans .env.local
npm run dev
```

La page s'affiche sur `http://localhost:3000`.

---

## 3. Flux de la page

1. La visiteuse arrive sur la landing (hero, vidéo, offres, FAQ, carte).
2. Elle choisit une offre et remplit le formulaire (nom, téléphone, créneau).
3. Au clic sur "Confirmer" :
   - Le nom et le téléphone sont validés côté client.
   - Les événements Pixel (`Lead` Meta, `SubmitForm` TikTok) sont envoyés.
   - Le lead est envoyé en arrière-plan (sans bloquer) à `/api/submit-lead`, qui le sauvegarde dans Google Sheets.
   - Après ~700ms, elle est redirigée vers WhatsApp avec un message pré-rempli (offre, nom, téléphone, créneau).
4. Si WhatsApp ne s'ouvre pas, le bouton "Confirmer sur WhatsApp" reste visible dans l'écran de succès.

Le rendez-vous n'est confirmé que lorsque le centre rappelle/répond sur WhatsApp — la page ne le prétend jamais.

---

## 4. Connecter Google Sheets (étape par étape)

### a. Créer ou choisir le Google Sheet

1. Ouvrez [sheets.google.com](https://sheets.google.com) et créez un Sheet (ou réutilisez l'existant du projet).
2. Récupérez le **Spreadsheet ID** dans l'URL :
   `https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXX/edit`

> Pas besoin de créer l'onglet ni les en-têtes à la main : le code crée automatiquement un onglet **`WhatsAppLeads`** (nom modifiable via `GOOGLE_SHEETS_SHEET_NAME`) avec ses en-têtes, dès le premier lead enregistré. Ça évite tout conflit avec un ancien onglet de leads qui aurait une autre structure.

### b. Service Account Google

1. [Google Cloud Console](https://console.cloud.google.com/) → créer/choisir un projet.
2. "APIs & Services" → "Library" → activer **Google Sheets API**.
3. "APIs & Services" → "Credentials" → "Create Credentials" → **Service Account**.
4. Dans le Service Account → "Keys" → "Add Key" → "Create new key" → **JSON** → télécharger.
5. Dans ce fichier JSON :
   - `client_email` → `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_SHEETS_PRIVATE_KEY` (garder `\n` et les lignes `-----BEGIN/END PRIVATE KEY-----`)

### c. Partager le Sheet avec le Service Account

Dans le Google Sheet → "Share" → coller l'email du Service Account → rôle **Editor**.

### d. Variables d'environnement

```
GOOGLE_SHEETS_SPREADSHEET_ID=...
GOOGLE_SHEETS_CLIENT_EMAIL=...
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SHEET_NAME=WhatsAppLeads
```

À ajouter dans `.env.local` en local, et dans Vercel → Project Settings → Environment Variables (Production).

### e. Déployer et vérifier

1. Push sur `main` (déploiement automatique si le repo GitHub est connecté à Vercel).
2. Remplir le formulaire sur le site en ligne.
3. Vérifier que WhatsApp s'ouvre bien, et qu'une ligne apparaît dans l'onglet `WhatsAppLeads` du Sheet.

Si la ligne n'apparaît pas : voir Vercel → Deployments → Logs, le message d'erreur indique ce qui manque (ID, partage, clé...).

---

## 5. Colonnes du Sheet

| Colonne | Contenu |
|---|---|
| تاريخ ووقت الطلب | Horodatage (heure de Casablanca) |
| الاسم | Nom |
| رقم الهاتف | Format `+212...` |
| العرض المختار | Nom de l'offre choisie |
| الوقت المفضل للاتصال | Créneau sélectionné |
| مصدر الطلب | `"Landing Meta Ads"` |
| مصدر الإعلان UTM | `utm_source` |
| الحملة الإعلانية | `utm_campaign` |
| الإعلان | `utm_content` |
| رابط الصفحة ومصدر الزيارة | URL de la page + referrer |

Un lead qui ne sauvegarde pas (Sheets indisponible) n'empêche jamais la redirection WhatsApp — c'est volontairement un filet de sécurité en parallèle, pas un blocage.

---

## 6. Meta Pixel & TikTok Pixel

Déjà configuré et testé (Pixel ID `364046702808936`). Pour changer ou ajouter le TikTok Pixel :

```
NEXT_PUBLIC_META_PIXEL_ID=...
NEXT_PUBLIC_TIKTOK_PIXEL_ID=...
```

Événements envoyés :
- `PageView` (Meta) / page view (TikTok) — au chargement, automatique.
- `ViewContent` — au chargement, et à la lecture de la vidéo.
- `InitiateCheckout` — à la sélection d'une offre.
- `Lead` (Meta) / `SubmitForm` (TikTok) — à la soumission du formulaire.
- `Contact` (Meta) / `Contact` (TikTok) — au clic sur un bouton WhatsApp.

Aucune donnée personnelle (nom, téléphone) n'est envoyée aux Pixels — uniquement le nom de l'offre et sa valeur.

---

## 7. À fournir / vérifier

1. **Vidéo et image poster** : `components/DermoLanding.tsx` pointe vers `/dermogermany-video-web.mp4` et `/dermogermany-poster.jpg`. Déposez ces deux fichiers dans le dossier `public/` du projet (même nom exact) et ils s'afficheront automatiquement, sans toucher au code.
2. **Adresse et horaires du centre** : le texte actuel ("Lotissement Al Amane 4, Immeuble 187, Appt 3, Aïn Sebaâ" / "Lundi au Samedi 10h–20h") vient du fichier que vous avez fourni — à vérifier que c'est bien exact avant de lancer les publicités.
3. **Zones comprises dans "corps complet"** (FAQ) : texte générique à confirmer/adapter avec la liste exacte du centre.
4. **Numéro WhatsApp** : `212601561726`, déjà en place dans le code.
