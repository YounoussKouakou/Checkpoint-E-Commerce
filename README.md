 🛒 MonSiteEcommerce

            https://checkpoint-de-e-commerce.vercel.app/
            
Bienvenue dans **MonSiteEcommerce**, une application e-commerce moderne construite avec **Next.js**, **React**, **Tailwind CSS**, et intégrée avec **PayPal** pour le paiement.

📦 Fonctionnalités

- Page produit avec détails et images
- Passer une commande avec résumé
- Intégration PayPal pour le paiement sécurisé
- Espace admin (gestion des produits, commandes, utilisateurs)
- Design responsive (mobile, tablette, desktop)

## 🚀 Tech Stack

- **Next.js** (App Router, SSR/SSG)
- **React** (hooks, context, composants réutilisables)
- **Tailwind CSS** (design moderne et responsive)
- **TypeScript** (optionnel, si utilisé)
- **Prisma** / **MongoDB** ou autre (pour la base de données)
- **NextAuth.js** (pour l’authentification)
- **PayPal SDK** (paiement)

## 🔧 Installation locale

Installer les dépendances :

bash
Copier
Modifier
npm install
 Configurer les variables d’environnement :

Créer un fichier .env.local à la racine et ajouter :

ini
Copier
Modifier
DATABASE_URL=...
NEXTAUTH_SECRET=...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
Démarrer en local :

bash
Copier
Modifier
npm run dev
