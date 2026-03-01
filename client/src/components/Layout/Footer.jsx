import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{
      background: '#1A2332',
      borderTop: '1px solid #334155',
      padding: '3rem 0 2rem',
      marginTop: '5rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Logo et description */}
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
              <div style={{
                width: '2rem',
                height: '2rem',
                background: '#00C9A7',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{color: 'white', fontWeight: 'bold', fontFamily: "Syne, sans-serif"}}>PF</span>
              </div>
              <span style={{color: 'white', fontWeight: 'bold', fontSize: '1.25rem', fontFamily: "Syne, sans-serif"}}>
                PortfolioForge
              </span>
            </div>
            <p style={{color: '#94A3B8', lineHeight: 1.6}}>
              Créez votre portfolio professionnel en quelques minutes. 
              La plateforme moderne pour présenter vos compétences et projets.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{color: 'white', fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', fontFamily: "Syne, sans-serif"}}>
              Navigation
            </h3>
            <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <li>
                <Link to="/" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/create" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  Créer Portfolio
                </Link>
              </li>
              <li>
                <Link to="/login" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/register" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  Inscription
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 style={{color: 'white', fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', fontFamily: "Syne, sans-serif"}}>
              Support
            </h3>
            <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <li>
                <a href="#" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  Aide
                </a>
              </li>
              <li>
                <a href="#" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  Contact
                </a>
              </li>
              <li>
                <a href="#" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 style={{color: 'white', fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', fontFamily: "Syne, sans-serif"}}>
              Légal
            </h3>
            <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <li>
                <a href="#" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" style={{color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s'}}>
                  CGU
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '2rem',
          textAlign: 'center'
        }}>
          <p style={{color: '#64748B', fontSize: '0.875rem'}}>
            © 2024 PortfolioForge. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
