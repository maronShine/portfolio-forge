import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [currentStatIndex, setCurrentStatIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const stats = [
    { value: '+5', label: 'systèmes CRM/ERP déployés' },
    { value: '4', label: 'pays couverts en Afrique' },
    { value: '3', label: 'secteurs : ONG, PME, Secteur public' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatsAnimated(true)
    }, 500)

    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [stats.length])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      color: '#1A1A2E'
    }}>
      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 16px',
        position: 'relative',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #FFFFFF 100%)',
        overflowX: 'hidden',
        maxWidth: '100vw'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          zIndex: 1
        }}>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 6vw, 4rem)',
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            marginBottom: '1rem',
            color: '#1A1A2E',
            lineHeight: 1.1,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            padding: '0 16px',
            textAlign: 'center'
          }}>
            Emmanuel Nduwayo Bagi
          </h1>
          <h2 style={{
            fontSize: window.innerWidth <= 768 ? '1.25rem' : '2rem',
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 500,
            marginBottom: '2rem',
            color: '#1A4D8F'
          }}>
            Architecte de Systèmes CRM & ERP
          </h2>
          <p style={{
            fontSize: window.innerWidth <= 768 ? '1rem' : '1.25rem',
            fontFamily: "DM Sans, sans-serif",
            color: '#64748B',
            maxWidth: window.innerWidth <= 768 ? '100%' : '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
            padding: window.innerWidth <= 768 ? '0 1rem' : '0'
          }}>
            Transformation Digitale pour ONG, PME & Entreprises Publiques en Afrique
          </p>
          
          <blockquote style={{
            fontSize: window.innerWidth <= 768 ? '1rem' : '1.125rem',
            fontFamily: "DM Sans, sans-serif",
            fontStyle: 'italic',
            color: '#94A3B8',
            maxWidth: window.innerWidth <= 768 ? '100%' : '500px',
            margin: '0 auto 3rem',
            padding: window.innerWidth <= 768 ? '1rem' : '1.5rem',
            backgroundColor: 'rgba(0, 201, 167, 0.1)',
            borderLeft: '4px solid #00C9A7',
            borderRadius: '0.5rem',
            textAlign: 'left'
          }}>
            "Je conçois et déploie des systèmes d'information qui transforment les opérations logistiques en Afrique — des outils qui fonctionnent vraiment sur le terrain."
          </blockquote>

          {/* Animated Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: window.innerWidth <= 768 ? '1rem' : '3rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  padding: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                  opacity: statsAnimated ? (currentStatIndex === index ? 1 : 0.7) : 0,
                  transform: statsAnimated ? (currentStatIndex === index ? 'scale(1.05)' : 'scale(1)') : 'scale(0.95)',
                  transition: 'all 0.5s ease',
                  transitionDelay: `${index * 200}ms`,
                  minWidth: window.innerWidth <= 768 ? '120px' : '150px'
                }}
              >
                <div style={{
                  fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
                  fontWeight: 'bold',
                  color: '#00C9A7',
                  fontFamily: "Syne, sans-serif"
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#94A3B8',
                  fontFamily: "DM Sans, sans-serif",
                  marginTop: '0.5rem'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            alignItems: 'center'
          }}>
            <a 
              href="#services" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: window.innerWidth <= 768 ? '1rem' : '1rem 2rem',
                backgroundColor: '#00C9A7',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 500,
                fontSize: '1rem',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minHeight: '3rem',
                width: window.innerWidth <= 768 ? '100%' : 'auto',
                maxWidth: window.innerWidth <= 768 ? '300px' : 'none'
              }}
            >
              Voir mes services
              <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <Link
              to="/create"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: window.innerWidth <= 768 ? '1rem' : '1rem 2rem',
                backgroundColor: 'transparent',
                color: '#00C9A7',
                border: '1px solid #00C9A7',
                borderRadius: '0.5rem',
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 500,
                fontSize: '1rem',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minHeight: '3rem',
                width: window.innerWidth <= 768 ? '100%' : 'auto',
                maxWidth: window.innerWidth <= 768 ? '300px' : 'none'
              }}
            >
              Créer mon portfolio
              <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* POSITIONNEMENT SECTION */}
      <section id="positioning" style={{
        padding: '4rem 0',
        backgroundColor: '#1A2332'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: "Syne, sans-serif",
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#FFFFFF'
          }}>
            À qui je m'adresse
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#00C9A7',
                marginBottom: '1.5rem',
                fontFamily: "Syne, sans-serif"
              }}>
                Je travaille avec :
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {[
                  'ONG et organisations humanitaires',
                  'PME en croissance en RDC et Afrique centrale',
                  'Entreprises publiques en transformation digitale',
                  'Startups tech à impact social'
                ].map((item, index) => (
                  <div key={index} style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                    <svg style={{width: '1.25rem', height: '1.25rem', color: '#00C9A7'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style={{
                      color: '#94A3B8',
                      fontFamily: "DM Sans, sans-serif"
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#1A4D8F',
                marginBottom: '1.5rem',
                fontFamily: "Syne, sans-serif"
              }}>
                Problèmes que je résous :
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {[
                  'Absence de système de gestion des données',
                  'Chaînes logistiques non traçables',
                  'Reporting manuel et chronophage',
                  'Systèmes existants non adaptés au contexte africain'
                ].map((item, index) => (
                  <div key={index} style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                    <svg style={{width: '1.25rem', height: '1.25rem', color: '#1A4D8F'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span style={{
                      color: '#94A3B8',
                      fontFamily: "DM Sans, sans-serif"
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* À PROPOS SECTION */}
      <section id="about" style={{
        padding: '4rem 0',
        backgroundColor: '#0A0F1E'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontFamily: "Syne, sans-serif",
                marginBottom: '2rem',
                color: '#FFFFFF',
                textAlign: 'left'
              }}>
                À propos
              </h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', lineHeight: 1.8, color: '#94A3B8'}}>
                <p style={{color: '#94A3B8', fontFamily: "DM Sans, sans-serif"}}>
                  Je m'appelle Emmanuel Nduwayo Bagi. Originaire de la RDC, j'ai vu de près ce que ça coûte — en temps, en argent, en impact — quand une organisation n'a pas les bons outils pour gérer ses données et sa logistique.
                </p>
                <p style={{color: '#94A3B8', fontFamily: "DM Sans, sans-serif"}}>
                  C'est pour ça que je me suis spécialisé dans la conception et le déploiement de systèmes CRM et ERP adaptés aux réalités africaines. Pas des solutions copiées-collées de l'Occident, mais des systèmes pensés pour fonctionner avec des ressources limitées, des équipes sur le terrain, et des contextes complexes.
                </p>
                <p style={{color: '#94A3B8', fontFamily: "DM Sans, sans-serif"}}>
                  Mon approche : comprendre vos processus métier, analyser vos contraintes, et concevoir des solutions qui apportent une valeur réelle — pas de la technologie pour la technologie.
                </p>
              </div>
              
              <div style={{marginTop: '2rem'}}>
                <a 
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'transparent',
                    color: '#00C9A7',
                    border: '1px solid #00C9A7',
                    borderRadius: '0.5rem',
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <svg style={{width: '1rem', height: '1rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                  Télécharger mon CV
                </a>
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{position: 'relative'}}>
                <div style={{
                  width: '16rem',
                  height: '16rem',
                  background: 'linear-gradient(135deg, #00C9A7, #1A4D8F)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: "DM Sans, sans-serif"
                  }}>EB</span>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '-1rem',
                  right: '-1rem',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '0.75rem',
                  padding: '1rem'
                }}>
                  <div style={{fontSize: '0.875rem', color: '#94A3B8'}}>Disponible</div>
                  <div style={{color: '#00C9A7', fontWeight: 600}}>Pour nouveaux projets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" style={{
        padding: '4rem 0',
        backgroundColor: '#1A2332'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: "Syne, sans-serif",
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#FFFFFF'
          }}>
            Services
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Conception Architecture SI',
                description: 'Audit, conception et architecture de systèmes d\'information adaptés à vos besoins',
                icon: '🏗️',
                color: '#00C9A7'
              },
              {
                title: 'Déploiement ERP/CRM',
                description: 'Installation, configuration et mise en production de solutions ERP/CRM',
                icon: '⚙️',
                color: '#1A4D8F'
              },
              {
                title: 'Formation & Accompagnement',
                description: 'Formation des équipes et accompagnement au changement pour une adoption réussie',
                icon: '🎓',
                color: '#F59E0B'
              },
              {
                title: 'Maintenance & Support',
                description: 'Support technique continu et maintenance évolutive de vos systèmes',
                icon: '🛠️',
                color: '#EF4444'
              }
            ].map((service, index) => (
              <div key={index} style={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '0.75rem',
                padding: '2rem',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    width: '3rem',
                    height: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 201, 167, 0.1)',
                    borderRadius: '0.5rem'
                  }}>
                    {service.icon}
                  </div>
                  <h3 style={{
                    color: '#FFFFFF',
                    fontSize: '1.25rem',
                    fontFamily: "Syne, sans-serif"
                  }}>
                    {service.title}
                  </h3>
                </div>
                
                <p style={{
                  color: '#94A3B8',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  {service.description}
                </p>
                
                <a 
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: service.color,
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    fontFamily: "DM Sans, sans-serif",
                    transition: 'all 0.2s ease'
                  }}
                >
                  En savoir plus →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{
        padding: '4rem 0',
        backgroundColor: '#0A0F1E'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: "Syne, sans-serif",
            marginBottom: '2rem',
            color: '#FFFFFF'
          }}>
            Contact
          </h2>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#94A3B8',
            marginBottom: '3rem',
            fontFamily: "DM Sans, sans-serif"
          }}>
            Parlons de votre projet
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              backgroundColor: '#F8F9FA',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📧</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: "Syne, sans-serif",
                marginBottom: '1rem',
                color: '#1A1A2E'
              }}>
                Email
              </h3>
              <a href="mailto:emmanuel.bagi.n@gmail.com" style={{
                color: '#1A4D8F',
                fontFamily: "DM Sans, sans-serif",
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'color 0.2s ease'
              }} onMouseOver={(e) => {
                e.currentTarget.style.color = '#00C9A7'
              }} onMouseOut={(e) => {
                e.currentTarget.style.color = '#1A4D8F'
              }}>
                emmanuel.bagi.n@gmail.com
              </a>
            </div>
            
            <div style={{
              backgroundColor: '#F8F9FA',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📱</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: "Syne, sans-serif",
                marginBottom: '1rem',
                color: '#1A1A2E'
              }}>
                WhatsApp
              </h3>
              <div style={{
                color: '#1A4D8F',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '1rem',
                marginBottom: '0.5rem'
              }}>
                <a href="https://wa.me/243995504241" target="_blank" style={{
                  color: '#1A4D8F',
                  fontFamily: "DM Sans, sans-serif",
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'color 0.2s ease'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.color = '#00C9A7'
                }} onMouseOut={(e) => {
                  e.currentTarget.style.color = '#1A4D8F'
                }}>
                  +243 995 504 241
                </a>
              </div>
              <div style={{
                color: '#1A4D8F',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '1rem'
              }}>
                <a href="https://wa.me/243839185581" target="_blank" style={{
                  color: '#1A4D8F',
                  fontFamily: "DM Sans, sans-serif",
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'color 0.2s ease'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.color = '#00C9A7'
                }} onMouseOut={(e) => {
                  e.currentTarget.style.color = '#1A4D8F'
                }}>
                  +243 839 185 581
                </a>
              </div>
            </div>
            
            <div style={{
              backgroundColor: '#F8F9FA',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📍</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: "Syne, sans-serif",
                marginBottom: '1rem',
                color: '#1A1A2E'
              }}>
                Localisation
              </h3>
              <p style={{
                color: '#64748B',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '1rem'
              }}>
                Kinshasa, RDC
              </p>
            </div>
            
            <div style={{
              backgroundColor: '#F8F9FA',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>💼</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: "Syne, sans-serif",
                marginBottom: '1rem',
                color: '#1A1A2E'
              }}>
                LinkedIn
              </h3>
              <a href="https://www.linkedin.com/in/emmanuel-bagi-n" target="_blank" rel="noopener noreferrer" style={{
                color: '#1A4D8F',
                fontFamily: "DM Sans, sans-serif",
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'color 0.2s ease'
              }} onMouseOver={(e) => {
                e.currentTarget.style.color = '#00C9A7'
              }} onMouseOut={(e) => {
                e.currentTarget.style.color = '#1A4D8F'
              }}>
                linkedin.com/in/emmanuel-bagi-n
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
