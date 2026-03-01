import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis'
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères'
    }
    
    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis'
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Le nom doit contenir au moins 2 caractères'
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    }
    
    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulation d'inscription réussie
      const userData = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      }
      
      localStorage.setItem('token', 'mock-jwt-token')
      localStorage.setItem('user', JSON.stringify(userData))
      
      navigate('/dashboard')
    } catch (error) {
      setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0F1E 0%, #1A2332 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        maxWidth: '450px',
        width: '100%',
        backgroundColor: '#1E293B',
        borderRadius: '1rem',
        border: '1px solid #334155',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        padding: '2rem'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            fontFamily: "Syne, sans-serif",
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              background: '#00C9A7',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{color: 'white', fontWeight: 'bold', fontFamily: "Syne, sans-serif"}}>PF</span>
            </div>
            <span>PortfolioForge</span>
          </div>
          <h2 style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '0.5rem',
            fontFamily: "Syne, sans-serif"
          }}>
            Inscription
          </h2>
          <p style={{
            color: '#94A3B8',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}>
            Créez votre espace portfolio
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {/* First Name */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{
              display: 'block',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Prénom
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Entrez votre prénom"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: errors.firstName ? '1px solid #EF4444' : '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00C9A7'
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 201, 167, 0.1)'
              }}
              onBlur={(e) => {
                if (!errors.firstName) {
                  e.target.style.borderColor = '#334155'
                  e.target.style.boxShadow = 'none'
                }
              }}
            />
            {errors.firstName && (
              <div style={{
                color: '#EF4444',
                fontSize: '0.75rem',
                marginTop: '0.5rem'
              }}>
                {errors.firstName}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{
              display: 'block',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Nom
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: errors.lastName ? '1px solid #EF4444' : '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00C9A7'
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 201, 167, 0.1)'
              }}
              onBlur={(e) => {
                if (!errors.lastName) {
                  e.target.style.borderColor = '#334155'
                  e.target.style.boxShadow = 'none'
                }
              }}
            />
            {errors.lastName && (
              <div style={{
                color: '#EF4444',
                fontSize: '0.75rem',
                marginTop: '0.5rem'
              }}>
                {errors.lastName}
              </div>
            )}
          </div>

          {/* Email */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{
              display: 'block',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              disabled={isLoading}
              autoComplete="email"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: errors.email ? '1px solid #EF4444' : '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00C9A7'
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 201, 167, 0.1)'
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#334155'
                  e.target.style.boxShadow = 'none'
                }
              }}
            />
            {errors.email && (
              <div style={{
                color: '#EF4444',
                fontSize: '0.75rem',
                marginTop: '0.5rem'
              }}>
                {errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{
              display: 'block',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="•••••••"
              disabled={isLoading}
              autoComplete="new-password"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: errors.password ? '1px solid #EF4444' : '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00C9A7'
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 201, 167, 0.1)'
              }}
              onBlur={(e) => {
                if (!errors.password) {
                  e.target.style.borderColor = '#334155'
                  e.target.style.boxShadow = 'none'
                }
              }}
            />
            {errors.password && (
              <div style={{
                color: '#EF4444',
                fontSize: '0.75rem',
                marginTop: '0.5rem'
              }}>
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{
              display: 'block',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              Confirmation mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="•••••••"
              disabled={isLoading}
              autoComplete="new-password"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: errors.confirmPassword ? '1px solid #EF4444' : '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#00C9A7'
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 201, 167, 0.1)'
              }}
              onBlur={(e) => {
                if (!errors.confirmPassword) {
                  e.target.style.borderColor = '#334155'
                  e.target.style.boxShadow = 'none'
                }
              }}
            />
            {errors.confirmPassword && (
              <div style={{
                color: '#EF4444',
                fontSize: '0.75rem',
                marginTop: '0.5rem'
              }}>
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #EF4444',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              color: '#EF4444',
              fontSize: '0.875rem',
              textAlign: 'center'
            }}>
              {errors.general}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
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
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              minHeight: '2.5rem',
              opacity: isLoading ? 0.7 : 1,
              width: '100%'
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Inscription en cours...
              </>
            ) : (
              'S\'inscrire'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid #334155'
        }}>
          <p style={{
            color: '#94A3B8',
            fontSize: '0.875rem'
          }}>
            Déjà un compte?{' '}
            <Link 
              to="/login" 
              style={{
                color: '#00C9A7',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Register
