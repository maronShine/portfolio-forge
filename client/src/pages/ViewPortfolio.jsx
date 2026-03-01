import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ViewPortfolio = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Charger le portfolio depuis localStorage
    const portfolios = JSON.parse(localStorage.getItem('portfolios') || '[]')
    const foundPortfolio = portfolios.find(p => p.id === parseInt(id))
    
    if (foundPortfolio) {
      setPortfolio(foundPortfolio)
    } else {
      setPortfolio(null)
    }
    setLoading(false)
  }, [id])

  const handlePrint = () => {
    window.print()
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0A0F1E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF'
      }}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '2rem', marginBottom: '1rem'}}>⏳</div>
          <p>Chargement du portfolio...</p>
        </div>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0A0F1E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF'
      }}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '4rem', marginBottom: '2rem'}}>📄</div>
          <h1 style={{fontSize: '2rem', marginBottom: '1rem'}}>Portfolio non trouvé</h1>
          <p style={{color: '#94A3B8', marginBottom: '2rem'}}>
            Ce portfolio n'existe pas ou a été supprimé.
          </p>
          <button 
            onClick={handleBackToDashboard}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#00C9A7',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minHeight: '2.5rem'
            }}
          >
            Retour au dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#0A0F1E', color: '#FFFFFF'}}>
      {/* Header Actions */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
        display: 'flex',
        gap: '1rem'
      }}>
        <button
          onClick={handlePrint}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: '#94A3B8',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 500,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minHeight: '2.5rem'
          }}
        >
          🖨️ Imprimer
        </button>
        <button
          onClick={handleBackToDashboard}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: '#94A3B8',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 500,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minHeight: '2.5rem'
          }}
        >
          ← Dashboard
        </button>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
        {/* Hero Section */}
        <section style={{
          textAlign: 'center',
          padding: '4rem 0',
          borderBottom: '1px solid #334155'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontFamily: "Syne, sans-serif",
            marginBottom: '1rem',
            color: '#FFFFFF'
          }}>
            {portfolio.identity?.firstName} {portfolio.identity?.lastName}
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: '#00C9A7',
            fontFamily: "DM Sans, sans-serif",
            marginBottom: '2rem'
          }}>
            {portfolio.identity?.title}
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: '#94A3B8',
            fontFamily: "DM Sans, sans-serif",
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            {portfolio.identity?.tagline}
          </p>
          
          {/* Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            {portfolio.identity?.stats?.map((stat, index) => (
              <div key={index} style={{textAlign: 'center'}}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#00C9A7',
                  fontFamily: "Syne, sans-serif"
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#94A3B8',
                  fontFamily: "DM Sans, sans-serif"
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        {portfolio.about?.bio && (
          <section style={{
            padding: '4rem 0',
            borderBottom: '1px solid #334155'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: "Syne, sans-serif",
              marginBottom: '2rem',
              color: '#FFFFFF'
            }}>
              À propos
            </h2>
            <p style={{
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: '#94A3B8',
              fontFamily: "DM Sans, sans-serif",
              maxWidth: '800px',
              margin: '0 auto 3rem'
            }}>
              {portfolio.about.bio}
            </p>
            
            {/* Differentiators */}
            {portfolio.about?.differentiators?.filter(d => d).length > 0 && (
              <div style={{marginBottom: '3rem'}}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: "Syne, sans-serif",
                  marginBottom: '1.5rem',
                  color: '#FFFFFF'
                }}>
                  Ce qui me différencie
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {portfolio.about.differentiators.filter(d => d).map((diff, index) => (
                    <div key={index} style={{
                      backgroundColor: '#1E293B',
                      padding: '1.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #334155'
                    }}>
                      <p style={{
                        color: '#FFFFFF',
                        fontFamily: "DM Sans, sans-serif"
                      }}>
                        {diff}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Values */}
            {portfolio.about?.values?.filter(v => v).length > 0 && (
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: "Syne, sans-serif",
                  marginBottom: '1.5rem',
                  color: '#FFFFFF'
                }}>
                  Mes valeurs
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  {portfolio.about.values.filter(v => v).map((value, index) => (
                    <span key={index} style={{
                      backgroundColor: '#00C9A7',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontFamily: "DM Sans, sans-serif"
                    }}>
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Services Section */}
        {portfolio.services?.length > 0 && (
          <section style={{
            padding: '4rem 0',
            borderBottom: '1px solid #334155'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: "Syne, sans-serif",
              marginBottom: '2rem',
              color: '#FFFFFF'
            }}>
              Services
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {portfolio.services.map((service, index) => (
                <div key={index} style={{
                  backgroundColor: '#1E293B',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #334155'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontFamily: "Syne, sans-serif",
                    marginBottom: '1rem',
                    color: '#00C9A7'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    color: '#94A3B8',
                    fontFamily: "DM Sans, sans-serif",
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    {service.description}
                  </p>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <p style={{fontSize: '0.875rem', color: '#94A3B8'}}>
                      <strong>Livraison:</strong> {service.deliverables}
                    </p>
                    <p style={{fontSize: '0.875rem', color: '#94A3B8'}}>
                      <strong>Durée:</strong> {service.duration}
                    </p>
                    <p style={{fontSize: '0.875rem', color: '#94A3B8'}}>
                      <strong>Pour qui:</strong> {service.forWho}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {portfolio.experiences?.length > 0 && (
          <section style={{
            padding: '4rem 0',
            borderBottom: '1px solid #334155'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: "Syne, sans-serif",
              marginBottom: '2rem',
              color: '#FFFFFF'
            }}>
              Expériences
            </h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
              {portfolio.experiences.map((exp, index) => (
                <div key={index} style={{
                  backgroundColor: '#1E293B',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #334155'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontFamily: "Syne, sans-serif",
                        color: '#00C9A7',
                        marginBottom: '0.5rem'
                      }}>
                        {exp.title}
                      </h3>
                      <p style={{
                        color: '#94A3B8',
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: '1.125rem'
                      }}>
                        {exp.company}
                      </p>
                    </div>
                    <span style={{
                      color: '#94A3B8',
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: '0.875rem'
                    }}>
                      {exp.period}
                    </span>
                  </div>
                  <p style={{
                    color: '#94A3B8',
                    fontFamily: "DM Sans, sans-serif",
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {exp.description}
                  </p>
                  {exp.achievements?.filter(a => a).length > 0 && (
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {exp.achievements.filter(a => a).map((achievement, achIndex) => (
                        <li key={achIndex} style={{
                          color: '#94A3B8',
                          fontFamily: "DM Sans, sans-serif",
                          marginBottom: '0.5rem',
                          paddingLeft: '1.5rem',
                          position: 'relative'
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            color: '#00C9A7'
                          }}>
                            ✓
                          </span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects?.length > 0 && (
          <section style={{
            padding: '4rem 0',
            borderBottom: '1px solid #334155'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: "Syne, sans-serif",
              marginBottom: '2rem',
              color: '#FFFFFF'
            }}>
              Projets
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {portfolio.projects.map((project, index) => (
                <div key={index} style={{
                  backgroundColor: '#1E293B',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #334155'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontFamily: "Syne, sans-serif",
                    marginBottom: '1rem',
                    color: '#00C9A7'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    color: '#94A3B8',
                    fontFamily: "DM Sans, sans-serif",
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>
                    {project.description}
                  </p>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <p style={{fontSize: '0.875rem', color: '#94A3B8'}}>
                      <strong>Technologies:</strong> {project.technologies}
                    </p>
                    <p style={{fontSize: '0.875rem', color: '#94A3B8'}}>
                      <strong>Résultats:</strong> {project.results}
                    </p>
                    <p style={{fontSize: '0.875rem', color: '#94A3B8'}}>
                      <strong>Durée:</strong> {project.duration}
                    </p>
                    <p style={{fontSize: '0.875rem', color: '#94A3B8'}}>
                      <strong>Client:</strong> {project.client}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {(portfolio.skills?.technical?.length > 0 || portfolio.skills?.soft?.length > 0 || portfolio.skills?.languages?.length > 0) && (
          <section style={{
            padding: '4rem 0',
            borderBottom: '1px solid #334155'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: "Syne, sans-serif",
              marginBottom: '2rem',
              color: '#FFFFFF'
            }}>
              Compétences
            </h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
              {portfolio.skills?.technical?.length > 0 && (
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontFamily: "Syne, sans-serif",
                    marginBottom: '1rem',
                    color: '#FFFFFF'
                  }}>
                    Compétences techniques
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    {portfolio.skills.technical.map((skill, index) => (
                      <span key={index} style={{
                        backgroundColor: '#1E293B',
                        color: '#00C9A7',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontFamily: "DM Sans, sans-serif",
                        border: '1px solid #00C9A7'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {portfolio.skills?.soft?.length > 0 && (
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontFamily: "Syne, sans-serif",
                    marginBottom: '1rem',
                    color: '#FFFFFF'
                  }}>
                    Compétences humaines
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    {portfolio.skills.soft.map((skill, index) => (
                      <span key={index} style={{
                        backgroundColor: '#1E293B',
                        color: '#1A4D8F',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontFamily: "DM Sans, sans-serif",
                        border: '1px solid #1A4D8F'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {portfolio.skills?.languages?.length > 0 && (
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontFamily: "Syne, sans-serif",
                    marginBottom: '1rem',
                    color: '#FFFFFF'
                  }}>
                    Langues
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    {portfolio.skills.languages.map((lang, index) => (
                      <span key={index} style={{
                        backgroundColor: '#1E293B',
                        color: '#FFFFFF',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontFamily: "DM Sans, sans-serif",
                        border: '1px solid #334155'
                      }}>
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {portfolio.contact && (
          <section style={{
            padding: '4rem 0'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontFamily: "Syne, sans-serif",
              marginBottom: '2rem',
              color: '#FFFFFF'
            }}>
              Contact
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {portfolio.contact.email && (
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📧</div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontFamily: "Syne, sans-serif",
                    marginBottom: '0.5rem',
                    color: '#FFFFFF'
                  }}>
                    Email
                  </h3>
                  <a href={`mailto:${portfolio.contact.email}`} style={{
                    color: '#00C9A7',
                    fontFamily: "DM Sans, sans-serif",
                    textDecoration: 'none'
                  }}>
                    {portfolio.contact.email}
                  </a>
                </div>
              )}
              
              {portfolio.contact.phone && (
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📱</div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontFamily: "Syne, sans-serif",
                    marginBottom: '0.5rem',
                    color: '#FFFFFF'
                  }}>
                    Téléphone
                  </h3>
                  <a href={`tel:${portfolio.contact.phone}`} style={{
                    color: '#00C9A7',
                    fontFamily: "DM Sans, sans-serif",
                    textDecoration: 'none'
                  }}>
                    {portfolio.contact.phone}
                  </a>
                </div>
              )}
              
              {portfolio.contact.linkedin && (
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', marginBottom: '1rem'}}>💼</div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontFamily: "Syne, sans-serif",
                    marginBottom: '0.5rem',
                    color: '#FFFFFF'
                  }}>
                    LinkedIn
                  </h3>
                  <a href={portfolio.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{
                    color: '#00C9A7',
                    fontFamily: "DM Sans, sans-serif",
                    textDecoration: 'none'
                  }}>
                    Voir mon profil
                  </a>
                </div>
              )}
              
              {portfolio.contact.location && (
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📍</div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontFamily: "Syne, sans-serif",
                    marginBottom: '0.5rem',
                    color: '#FFFFFF'
                  }}>
                    Localisation
                  </h3>
                  <p style={{
                    color: '#94A3B8',
                    fontFamily: "DM Sans, sans-serif"
                  }}>
                    {portfolio.contact.location}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          div[style*="position: fixed"] {
            display: none !important;
          }
          
          section {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          h1, h2, h3 {
            page-break-after: avoid;
            break-after: avoid;
          }
          
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ViewPortfolio
