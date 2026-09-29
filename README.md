# BLACK FRIDAY — Site e-commerce

Front-end vitrine + boutique + tunnel de commande complet, thème **Black Friday** (fond noir, jaune néon, rouge urgent).

## Stack

- **Vite 7 + React 19**
- **Tailwind CSS 4** (design tokens dans `src/index.css`)
- **React Router 7** — navigation SPA
- **Framer Motion** — animations (lettres du hero, scroll-reveal, drawer panier)
- **Zustand** (+ `persist`) — panier, brouillon de commande, historique de commandes en `localStorage`
- **lucide-react** — icônes
- **oxlint** — lint

## Démarrage

```bash
npm install
npm run dev      # serveur de dev
npm run build    # build de production (dist/)
npm run preview  # sert le build
npm run lint     # analyse du code
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing : hero animé, compte à rebours, flash deals, catégories, top ventes, newsletter |
| `/boutique` | Catalogue filtrable (catégorie, prix, remise, tri) |
| `/produit/:id` | Fiche produit (options, quantité, offre à timer, produits liés) |
| `/panier` | Panier, code promo (`BLACKFRIDAY` = -10 %, `WELCOME15` = -15 %) |
| `/checkout` | Tunnel 3 étapes : livraison (invité) → CB ou 3x → récap et validation |
| `/confirmation/:orderId` | Récapitulatif de commande (numéro `BF-AAAA-XXXXX`) |

## Structure

```
src/
  components/
    home/       Hero, FlashDeals, CategoryGrid, BestSellers, Perks, Newsletter
    layout/     Header, Footer, CartDrawer
    ui/         Button, Badge, Input, Countdown, Marquee, Stepper, ProductCard…
  data/         products.js (30 produits), categories.js
  stores/       cart.js, checkout.js, orders.js (Zustand + localStorage)
  pages/        Home, Shop, Product, Cart, Checkout, Confirmation, NotFound
  utils/        time.js
```

## Notes

- Aucune image externe : visuels produits générés (dégradé + emoji) → le site fonctionne hors-ligne.
- Paiement **simulé** : aucun compte marchand, aucune donnée envoyée. Carte de test : `4242 4242 4242 4242`.
- Données fictives uniquement (catalogue dans `src/data/products.js`).
