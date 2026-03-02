import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [portfolios, setPortfolios] = useState([])
  const [user, setUser] = useState(null)
  const [shareMessage, setShareMessage] = useState('')

  // Charger les données au montage
  useEffect(() => {
    // Charger l'utilisateur connecté
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error loading user:', error)
        navigate('/login')
      }
    } else {
      navigate('/login')
    }

    // Charger les portfolios
    const portfoliosData = localStorage.getItem('portfolios')
    if (portfoliosData) {
      try {
        const parsedPortfolios = JSON.parse(portfoliosData)
        setPortfolios(parsedPortfolios)
      } catch (error) {
        console.error('Error loading portfolios:', error)
        setPortfolios([])
      }
    }
  }, [navigate])

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Supprimer un portfolio
  const handleDelete = (portfolioId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce portfolio ?')) {
      const updatedPortfolios = portfolios.filter(p => p.id !== portfolioId)
      setPortfolios(updatedPortfolios)
      localStorage.setItem('portfolios', JSON.stringify(updatedPortfolios))
    }
  }

  // Partager un portfolio
  const handleShare = (portfolioId) => {
    const shareUrl = `${window.location.origin}/portfolio/${portfolioId}`
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareMessage('Lien copié dans le presse-papiers !')
      setTimeout(() => setShareMessage(''), 3000)
    })
  }

  // Créer un nouveau portfolio
  const handleCreatePortfolio = () => {
    navigate('/create')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0F1E',
      color: '#FFFFFF'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#1A2332',
        borderBottom: '1px solid #334155',
        padding: window.innerWidth <= 768 ? '1rem 0' : '2rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: window.innerWidth <= 768 ? '0 1rem' : '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: window.innerWidth <= 768 ? 'flex-start' : 'center',
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
          gap: window.innerWidth <= 768 ? '1rem' : '0'
        }}>
          <div>
            <h1 style={{
              color: '#FFFFFF',
              fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem',
              fontFamily: "Syne, sans-serif",
              marginBottom: '0.5rem'
            }}>
              Bonjour {user?.firstName || ''} 👋
            </h1>
            <p style={{
              color: '#94A3B8',
              fontSize: '1rem',
              fontFamily: "DM Sans, sans-serif"
            }}>
              Gérez vos portfolios professionnels
            </p>
          </div>
          
          <button
            onClick={handleCreatePortfolio}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: window.innerWidth <= 768 ? '0.75rem 1rem' : '1rem 2rem',
              backgroundColor: '#00C9A7',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: window.innerWidth <= 768 ? '100%' : 'auto'
            }}
          >
            <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouveau Portfolio
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: window.innerWidth <= 768 ? '1rem' : '2rem'
      }}>
        {/* Share Message */}
        {shareMessage && (
          <div style={{
            backgroundColor: '#00C9A7',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '2rem',
            textAlign: 'center',
            fontFamily: "DM Sans, sans-serif"
          }}>
            {shareMessage}
          </div>
        )}

        {/* Portfolios Grid */}
        {portfolios.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                style={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '0.75rem',
                  padding: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = '#00C9A7'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 201, 167, 0.1), 0 4px 6px -2px rgba(0, 201, 167, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = '#334155'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* En-tête de la carte */}
                <div style={{marginBottom: '1.5rem'}}>
                  <h3 style={{
                    color: '#FFFFFF',
                    fontSize: '1.25rem',
                    fontFamily: "Syne, sans-serif",
                    marginBottom: '0.5rem'
                  }}>
                    {portfolio.identity?.firstName} {portfolio.identity?.lastName}
                  </h3>
                  <p style={{
                    color: '#00C9A7',
                    fontSize: '1rem',
                    fontFamily: "DM Sans, sans-serif",
                    marginBottom: '0.5rem'
                  }}>
                    {portfolio.identity?.title}
                  </p>
                  <p style={{
                    color: '#94A3B8',
                    fontSize: '0.875rem',
                    fontFamily: "DM Sans, sans-serif"
                  }}>
                    Créé le {formatDate(portfolio.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <Link
                    to={`/portfolio/${portfolio.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: window.innerWidth <= 768 ? '0.75rem 1rem' : '1rem 2rem',
                      backgroundColor: '#00C9A7',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      width: window.innerWidth <= 768 ? '100%' : 'auto'
                    }}
                  >
                    <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Voir
                  </Link>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
                    gap: '0.5rem'
                  }}>
                    <Link
                      to={`/edit/${portfolio.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: window.innerWidth <= 768 ? '0.75rem 1rem' : '1rem 2rem',
                        backgroundColor: 'transparent',
                        color: '#94A3B8',
                        border: '1px solid #334155',
                        borderRadius: '0.5rem',
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: window.innerWidth <= 768 ? '100%' : 'auto'
                      }}
                    >
                      <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Modifier
                    </Link>
                    
                    <button
                      onClick={() => handleShare(portfolio.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: window.innerWidth <= 768 ? '0.75rem 1rem' : '1rem 2rem',
                        backgroundColor: 'transparent',
                        color: '#94A3B8',
                        border: '1px solid #334155',
                        borderRadius: '0.5rem',
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: window.innerWidth <= 768 ? '100%' : 'auto'
                      }}
                    >
                      <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Partager
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(portfolio.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: window.innerWidth <= 768 ? '0.75rem 1rem' : '1rem 2rem',
                      backgroundColor: '#EF4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      width: window.innerWidth <= 768 ? '100%' : 'auto'
                    }}
                  >
                    <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              opacity: 0.5
            }}>
              📁
            </div>
            <h2 style={{
              color: '#FFFFFF',
              fontSize: '1.5rem',
              fontFamily: "Syne, sans-serif",
              marginBottom: '1rem'
            }}>
              Aucun portfolio
            </h2>
            <p style={{
              color: '#94A3B8',
              fontSize: '1rem',
              fontFamily: "DM Sans, sans-serif",
              marginBottom: '2rem'
            }}>
              Commencez dès maintenant en créant votre premier portfolio professionnel
            </p>
            <button
              onClick={handleCreatePortfolio}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: '#00C9A7',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Créer mon premier portfolio
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
