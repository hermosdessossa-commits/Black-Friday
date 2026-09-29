import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[65vh] flex-col items-center justify-center gap-5 py-16 text-center">
      <span className="font-display text-[22vw] leading-none text-black md:text-[14rem]">404</span>
      <h1 className="display-tight text-3xl md:text-5xl text-black">Page introuvable</h1>
      <p className="max-w-md text-sm text-gray-500">
        Cette page a dû partir en soldes. Revenez vers les deals avant qu'ils ne disparaissent.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/">
          <Button size="lg">Retour à l'accueil</Button>
        </Link>
        <Link to="/boutique">
          <Button variant="ghost" size="lg">
            Voir la boutique
          </Button>
        </Link>
      </div>
    </div>
  )
}