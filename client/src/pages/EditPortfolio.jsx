import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditPortfolio = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // État du formulaire multi-étapes
  const [currentStep, setCurrentStep] = useState(1)
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    // Étape 1: Identité
    firstName: '',
    lastName: '',
    title: '',
    tagline: '',
    stats: [
      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' }
    ],
    // Étape 2: À propos
    bio: '',
    differentiators: ['', '', ''],
    values: ['', '', ''],
    // Étape 3: Services
    services: [
      { title: '', description: '', deliverables: '', duration: '', forWho: '' }
    ],
    // Étape 4: Expériences
    experiences: [
      { title: '', company: '', period: '', description: '', achievements: ['', ''] }
    ],
    // Étape 5: Projets
    projects: [
      { title: '', description: '', technologies: '', results: '', duration: '', client: '' }
    ],
    // Étape 6: Compétences
    technicalSkills: '',
    softSkills: '',
    languages: '',
    certifications: [
      { title: '', organization: '', year: '', description: '' }
    ],
    // Étape 7: Contact
    email: '',
    phone: '',
    linkedin: '',
    location: '',
    website: ''
  })

  // Charger le portfolio existant
  useEffect(() => {
    const portfolios = JSON.parse(localStorage.getItem('portfolios') || '[]')
    const foundPortfolio = portfolios.find(p => p.id === parseInt(id))
    
    if (foundPortfolio) {
      setPortfolio(foundPortfolio)
      
      // Remplir le formulaire avec les données existantes
      setFormData({
        firstName: foundPortfolio.identity?.firstName || '',
        lastName: foundPortfolio.identity?.lastName || '',
        title: foundPortfolio.identity?.title || '',
        tagline: foundPortfolio.identity?.tagline || '',
        stats: foundPortfolio.identity?.stats || [
          { value: '', label: '' },
          { value: '', label: '' },
          { value: '', label: '' }
        ],
        bio: foundPortfolio.about?.bio || '',
        differentiators: foundPortfolio.about?.differentiators || ['', '', ''],
        values: foundPortfolio.about?.values || ['', '', ''],
        services: foundPortfolio.services || [
          { title: '', description: '', deliverables: '', duration: '', forWho: '' }
        ],
        experiences: foundPortfolio.experiences || [
          { title: '', company: '', period: '', description: '', achievements: ['', ''] }
        ],
        projects: foundPortfolio.projects || [
          { title: '', description: '', technologies: '', results: '', duration: '', client: '' }
        ],
        technicalSkills: foundPortfolio.skills?.technical?.join(', ') || '',
        softSkills: foundPortfolio.skills?.soft?.join(', ') || '',
        languages: foundPortfolio.skills?.languages?.join(', ') || '',
        certifications: foundPortfolio.certifications || [
          { title: '', organization: '', year: '', description: '' }
        ],
        email: foundPortfolio.contact?.email || '',
        phone: foundPortfolio.contact?.phone || '',
        linkedin: foundPortfolio.contact?.linkedin || '',
        location: foundPortfolio.contact?.location || '',
        website: foundPortfolio.contact?.website || ''
      })
    } else {
      // Portfolio non trouvé
      navigate('/dashboard')
    }
    
    setLoading(false)
  }, [id, navigate])

  // Sauvegarder automatiquement à chaque changement
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('portfolioEditDraft', JSON.stringify(formData))
    }
  }, [formData, loading])

  // Étapes du formulaire
  const steps = [
    { id: 1, title: 'Identité', description: 'Informations personnelles' },
    { id: 2, title: 'À propos', description: 'Votre histoire' },
    { id: 3, title: 'Services', description: 'Ce que vous offrez' },
    { id: 4, title: 'Expériences', description: 'Votre parcours' },
    { id: 5, title: 'Projets', description: 'Vos réalisations' },
    { id: 6, title: 'Compétences', description: 'Vos savoir-faire' },
    { id: 7, title: 'Contact', description: 'Coordonnées' }
  ]

  // Gestionnaires d'événements
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const handleSimpleArrayChange = (arrayName, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[arrayName]]
      newArray[index] = value
      return {
        ...prev,
        [arrayName]: newArray
      }
    })
  }

  const handleNestedArrayChange = (arrayName, index, nestedField, nestedIndex, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index 
          ? { 
              ...item, 
              [nestedField]: item[nestedField].map((val, j) => 
                j === nestedIndex ? value : val
              )
            }
          : item
      )
    }))
  }

  const addArrayItem = (arrayName, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultItem]
    }))
  }

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }))
  }

  // Navigation
  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Mettre à jour le portfolio
    const updatedPortfolio = {
      id: portfolio.id,
      identity: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        tagline: formData.tagline,
        stats: formData.stats
      },
      about: {
        bio: formData.bio,
        differentiators: formData.differentiators,
        values: formData.values
      },
      services: formData.services,
      experiences: formData.experiences,
      projects: formData.projects,
      skills: {
        technical: formData.technicalSkills.split(',').map(s => s.trim()).filter(s => s),
        soft: formData.softSkills.split(',').map(s => s.trim()).filter(s => s),
        languages: formData.languages.split(',').map(s => s.trim()).filter(s => s)
      },
      certifications: formData.certifications,
      contact: {
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        location: formData.location,
        website: formData.website
      },
      createdAt: portfolio.createdAt,
      updatedAt: new Date().toISOString()
    }
    
    // Mettre à jour dans localStorage
    const portfolios = JSON.parse(localStorage.getItem('portfolios') || '[]')
    const updatedPortfolios = portfolios.map(p => 
      p.id === portfolio.id ? updatedPortfolio : p
    )
    localStorage.setItem('portfolios', JSON.stringify(updatedPortfolios))
    
    // Nettoyer le brouillon
    localStorage.removeItem('portfolioEditDraft')
    
    // Rediriger vers le dashboard
    navigate('/dashboard')
  }

  // Validation de l'étape actuelle
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.title
      case 2:
        return formData.bio && 
               formData.differentiators.some(d => d) && 
               formData.values.some(v => v)
      case 3:
        return formData.services.length > 0 && 
               formData.services.every(s => s.title && s.description)
      case 4:
        return formData.experiences.length > 0 && 
               formData.experiences.every(e => e.title && e.company)
      case 5:
        return formData.projects.length > 0 && 
               formData.projects.every(p => p.title && p.description)
      case 6:
        return formData.technicalSkills || formData.softSkills || formData.languages
      case 7:
        return formData.email
      default:
        return false
    }
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

  // Composants d'étape (identiques à CreatePortfolio)
  const renderStep1 = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <h3 style={{color: 'white', fontSize: '1.25rem', fontFamily: "Syne, sans-serif"}}>Identité</h3>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1A2332',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            color: '#FFFFFF',
            fontFamily: "DM Sans, sans-serif",
            fontSize: '0.875rem',
            outline: 'none'
          }}
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          placeholder="Prénom *"
        />
        <input
          type="text"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1A2332',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            color: '#FFFFFF',
            fontFamily: "DM Sans, sans-serif",
            fontSize: '0.875rem',
            outline: 'none'
          }}
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          placeholder="Nom *"
        />
      </div>
      
      <input
        type="text"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#1A2332',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          color: '#FFFFFF',
          fontFamily: "DM Sans, sans-serif",
          fontSize: '0.875rem',
          outline: 'none'
        }}
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Titre professionnel *"
      />
      
      <textarea
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#1A2332',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          color: '#FFFFFF',
          fontFamily: "DM Sans, sans-serif",
          fontSize: '0.875rem',
          outline: 'none',
          resize: 'vertical',
          minHeight: '6rem'
        }}
        value={formData.tagline}
        onChange={(e) => handleChange('tagline', e.target.value)}
        placeholder="Tagline ou phrase d'accroche"
        rows={3}
      />
      
      <div>
        <label style={{
          display: 'block',
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 500,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          fontSize: '0.875rem'
        }}>Statistiques (3)</label>
        {formData.stats.map((stat, index) => (
          <div key={index} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              value={stat.value}
              onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)}
              placeholder="Valeur (ex: 50+)"
            />
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              value={stat.label}
              onChange={(e) => handleArrayChange('stats', index, 'label', e.target.value)}
              placeholder="Label (ex: Projets complétés)"
            />
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <h3 style={{color: 'white', fontSize: '1.25rem', fontFamily: "Syne, sans-serif"}}>À propos</h3>
      
      <textarea
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#1A2332',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          color: '#FFFFFF',
          fontFamily: "DM Sans, sans-serif",
          fontSize: '0.875rem',
          outline: 'none',
          resize: 'vertical',
          minHeight: '6rem'
        }}
        value={formData.bio}
        onChange={(e) => handleChange('bio', e.target.value)}
        placeholder="Parlez-vous de votre parcours, votre passion, ce qui vous motive..."
        rows={6}
      />
      
      <div>
        <label style={{
          display: 'block',
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 500,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          fontSize: '0.875rem'
        }}>Différenciateurs (3)</label>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {formData.differentiators.map((diff, index) => (
            <input
              key={index}
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              placeholder="Ce qui vous rend unique..."
              value={diff}
              onChange={(e) => handleSimpleArrayChange('differentiators', index, e.target.value)}
            />
          ))}
        </div>
      </div>
      
      <div>
        <label style={{
          display: 'block',
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 500,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          fontSize: '0.875rem'
        }}>Valeurs (3)</label>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {formData.values.map((value, index) => (
            <input
              key={index}
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              placeholder="Vos valeurs fondamentales..."
              value={value}
              onChange={(e) => handleSimpleArrayChange('values', index, e.target.value)}
            />
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <h3 style={{color: 'white', fontSize: '1.25rem', fontFamily: "Syne, sans-serif"}}>Services</h3>
      
      {formData.services.map((service, index) => (
        <div key={index} style={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <h4 style={{color: '#00C9A7', fontFamily: "Syne, sans-serif"}}>Service {index + 1}</h4>
            {formData.services.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('services', index)}
                style={{
                  backgroundColor: '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Supprimer
              </button>
            )}
          </div>
          
          <input
            type="text"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1A2332',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              color: '#FFFFFF',
              fontFamily: "DM Sans, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
              marginBottom: '1rem'
            }}
            value={service.title}
            onChange={(e) => handleArrayChange('services', index, 'title', e.target.value)}
            placeholder="Titre du service *"
          />
          
          <textarea
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1A2332',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              color: '#FFFFFF',
              fontFamily: "DM Sans, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
              resize: 'vertical',
              minHeight: '4rem',
              marginBottom: '1rem'
            }}
            value={service.description}
            onChange={(e) => handleArrayChange('services', index, 'description', e.target.value)}
            placeholder="Description du service *"
            rows={3}
          />
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              value={service.deliverables}
              onChange={(e) => handleArrayChange('services', index, 'deliverables', e.target.value)}
              placeholder="Livrables"
            />
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              value={service.duration}
              onChange={(e) => handleArrayChange('services', index, 'duration', e.target.value)}
              placeholder="Durée"
            />
          </div>
          
          <input
            type="text"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1A2332',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              color: '#FFFFFF',
              fontFamily: "DM Sans, sans-serif",
              fontSize: '0.875rem',
              outline: 'none'
            }}
            value={service.forWho}
            onChange={(e) => handleArrayChange('services', index, 'forWho', e.target.value)}
            placeholder="Pour qui ?"
          />
        </div>
      ))}
      
      {formData.services.length < 6 && (
        <button
          type="button"
          onClick={() => addArrayItem('services', { title: '', description: '', deliverables: '', duration: '', forWho: '' })}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'transparent',
            color: '#94A3B8',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 500,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minHeight: '2.5rem',
            width: '100%'
          }}
        >
          + Ajouter un service
        </button>
      )}
    </div>
  )

  const renderStep4 = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <h3 style={{color: 'white', fontSize: '1.25rem', fontFamily: "Syne, sans-serif"}}>Expériences</h3>
      
      {formData.experiences.map((exp, index) => (
        <div key={index} style={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <h4 style={{color: '#00C9A7', fontFamily: "Syne, sans-serif"}}>Expérience {index + 1}</h4>
            {formData.experiences.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('experiences', index)}
                style={{
                  backgroundColor: '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Supprimer
              </button>
            )}
          </div>
          
          <input
            type="text"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1A2332',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              color: '#FFFFFF',
              fontFamily: "DM Sans, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
              marginBottom: '1rem'
            }}
            value={exp.title}
            onChange={(e) => handleArrayChange('experiences', index, 'title', e.target.value)}
            placeholder="Poste *"
          />
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              value={exp.company}
              onChange={(e) => handleArrayChange('experiences', index, 'company', e.target.value)}
              placeholder="Entreprise *"
            />
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              value={exp.period}
              onChange={(e) => handleArrayChange('experiences', index, 'period', e.target.value)}
              placeholder="Période (ex: 2020-2023)"
            />
          </div>
          
          <textarea
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1A2332',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              color: '#FFFFFF',
              fontFamily: "DM Sans, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
              resize: 'vertical',
              minHeight: '4rem',
              marginBottom: '1rem'
            }}
            value={exp.description}
            onChange={(e) => handleArrayChange('experiences', index, 'description', e.target.value)}
            placeholder="Description de vos missions..."
            rows={3}
          />
          
          <div>
            <label style={{
              display: 'block',
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 500,
              color: '#FFFFFF',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>Réalisations</label>
            {exp.achievements.map((achievement, achIndex) => (
              <input
                key={achIndex}
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#1A2332',
                  border: '1px solid #334155',
                  borderRadius: '0.5rem',
                  color: '#FFFFFF',
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none',
                  marginBottom: '0.5rem'
                }}
                placeholder="Réalisation ou résultat clé"
                value={achievement}
                onChange={(e) => handleNestedArrayChange('experiences', index, 'achievements', achIndex, e.target.value)}
              />
            ))}
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => addArrayItem('experiences', { title: '', company: '', period: '', description: '', achievements: ['', ''] })}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'transparent',
          color: '#94A3B8',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 500,
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          minHeight: '2.5rem',
          width: '100%'
        }}
      >
        + Ajouter une expérience
      </button>
    </div>
  )

  const renderStep5 = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <h3 style={{color: 'white', fontSize: '1.25rem', fontFamily: "Syne, sans-serif"}}>Projets</h3>
      
      {formData.projects.map((project, index) => (
        <div key={index} style={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <h4 style={{color: '#00C9A7', fontFamily: "Syne, sans-serif"}}>Projet {index + 1}</h4>
            {formData.projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('projects', index)}
                style={{
                  backgroundColor: '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Supprimer
              </button>
            )}
          </div>
          
          <input
            type="text"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1A2332',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              color: '#FFFFFF',
              fontFamily: "DM Sans, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
              marginBottom: '1rem'
            }}
            value={project.title}
            onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
            placeholder="Titre du projet *"
          />
          
          <textarea
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1A2332',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              color: '#FFFFFF',
              fontFamily: "DM Sans, sans-serif",
              fontSize: '0.875rem',
              outline: 'none',
              resize: 'vertical',
              minHeight: '4rem',
              marginBottom: '1rem'
            }}
            value={project.description}
            onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
            placeholder="Description du projet *"
            rows={3}
          />
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              value={project.technologies}
              onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
              placeholder="Technologies utilisées"
            />
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              value={project.results}
              onChange={(e) => handleArrayChange('projects', index, 'results', e.target.value)}
              placeholder="Résultats obtenus"
            />
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              value={project.duration}
              onChange={(e) => handleArrayChange('projects', index, 'duration', e.target.value)}
              placeholder="Durée"
            />
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1A2332',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                fontFamily: "DM Sans, sans-serif",
                fontSize: '0.875rem',
                outline: 'none'
              }}
              value={project.client}
              onChange={(e) => handleArrayChange('projects', index, 'client', e.target.value)}
              placeholder="Client"
            />
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => addArrayItem('projects', { title: '', description: '', technologies: '', results: '', duration: '', client: '' })}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'transparent',
          color: '#94A3B8',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 500,
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          minHeight: '2.5rem',
          width: '100%'
        }}
      >
        + Ajouter un projet
      </button>
    </div>
  )

  const renderStep6 = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <h3 style={{color: 'white', fontSize: '1.25rem', fontFamily: "Syne, sans-serif"}}>Compétences & Certifications</h3>
      
      <div>
        <label style={{
          display: 'block',
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 500,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          fontSize: '0.875rem'
        }}>Compétences Techniques</label>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1A2332',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            color: '#FFFFFF',
            fontFamily: "DM Sans, sans-serif",
            fontSize: '0.875rem',
            outline: 'none'
          }}
          placeholder="React, Node.js, Python... (séparez par des virgules)"
          value={formData.technicalSkills}
          onChange={(e) => handleChange('technicalSkills', e.target.value)}
        />
      </div>
      
      <div>
        <label style={{
          display: 'block',
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 500,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          fontSize: '0.875rem'
        }}>Compétences humaines</label>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1A2332',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            color: '#FFFFFF',
            fontFamily: "DM Sans, sans-serif",
            fontSize: '0.875rem',
            outline: 'none'
          }}
          placeholder="Communication, Leadership, Créativité... (séparez par des virgules)"
          value={formData.softSkills}
          onChange={(e) => handleChange('softSkills', e.target.value)}
        />
      </div>
      
      <div>
        <label style={{
          display: 'block',
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 500,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          fontSize: '0.875rem'
        }}>Langues</label>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1A2332',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            color: '#FFFFFF',
            fontFamily: "DM Sans, sans-serif",
            fontSize: '0.875rem',
            outline: 'none'
          }}
          placeholder="Français, Anglais, Espagnol... (séparez par des virgules)"
          value={formData.languages}
          onChange={(e) => handleChange('languages', e.target.value)}
        />
      </div>
      
      <div>
        <label style={{
          display: 'block',
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 500,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          fontSize: '0.875rem'
        }}>Certifications</label>
        {formData.certifications.map((cert, index) => (
          <div key={index} style={{
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
              <h4 style={{color: '#00C9A7', fontFamily: "Syne, sans-serif"}}>Certification {index + 1}</h4>
              {formData.certifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('certifications', index)}
                  style={{
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  Supprimer
                </button>
              )}
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#1A2332',
                  border: '1px solid #334155',
                  borderRadius: '0.5rem',
                  color: '#FFFFFF',
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                value={cert.title}
                onChange={(e) => handleArrayChange('certifications', index, 'title', e.target.value)}
                placeholder="Titre de la certification"
              />
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#1A2332',
                  border: '1px solid #334155',
                  borderRadius: '0.5rem',
                  color: '#FFFFFF',
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                value={cert.organization}
                onChange={(e) => handleArrayChange('certifications', index, 'organization', e.target.value)}
                placeholder="Organisme"
              />
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#1A2332',
                  border: '1px solid #334155',
                  borderRadius: '0.5rem',
                  color: '#FFFFFF',
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                value={cert.year}
                onChange={(e) => handleArrayChange('certifications', index, 'year', e.target.value)}
                placeholder="Année"
              />
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#1A2332',
                  border: '1px solid #334155',
                  borderRadius: '0.5rem',
                  color: '#FFFFFF',
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                value={cert.description}
                onChange={(e) => handleArrayChange('certifications', index, 'description', e.target.value)}
                placeholder="Description"
              />
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => addArrayItem('certifications', { title: '', organization: '', year: '', description: '' })}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'transparent',
            color: '#94A3B8',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 500,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minHeight: '2.5rem',
            width: '100%'
          }}
        >
          + Ajouter une certification
        </button>
      </div>
    </div>
  )

  const renderStep7 = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <h3 style={{color: 'white', fontSize: '1.25rem', fontFamily: "Syne, sans-serif"}}>Contact</h3>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
        <input
          type="email"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1A2332',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            color: '#FFFFFF',
            fontFamily: "DM Sans, sans-serif",
            fontSize: '0.875rem',
            outline: 'none'
          }}
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Email *"
        />
        <input
          type="tel"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1A2332',
            border: '1px solid #334155',
            borderRadius: '0.5rem',
            color: '#FFFFFF',
            fontFamily: "DM Sans, sans-serif",
            fontSize: '0.875rem',
            outline: 'none'
          }}
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Téléphone"
        />
      </div>
      
      <input
        type="url"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#1A2332',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          color: '#FFFFFF',
          fontFamily: "DM Sans, sans-serif",
          fontSize: '0.875rem',
          outline: 'none'
        }}
        value={formData.linkedin}
        onChange={(e) => handleChange('linkedin', e.target.value)}
        placeholder="URL LinkedIn"
      />
      
      <input
        type="text"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#1A2332',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          color: '#FFFFFF',
          fontFamily: "DM Sans, sans-serif",
          fontSize: '0.875rem',
          outline: 'none'
        }}
        value={formData.location}
        onChange={(e) => handleChange('location', e.target.value)}
        placeholder="Localisation (ex: Paris, France)"
      />
      
      <input
        type="url"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#1A2332',
          border: '1px solid #334155',
          borderRadius: '0.5rem',
          color: '#FFFFFF',
          fontFamily: "DM Sans, sans-serif",
          fontSize: '0.875rem',
          outline: 'none'
        }}
        value={formData.website}
        onChange={(e) => handleChange('website', e.target.value)}
        placeholder="Site web personnel"
      />
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      case 6: return renderStep6()
      case 7: return renderStep7()
      default: return null
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0F1E',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            color: '#FFFFFF',
            fontSize: '2rem',
            fontFamily: "Syne, sans-serif",
            marginBottom: '0.5rem'
          }}>
            Modifier votre Portfolio
          </h1>
          <p style={{
            color: '#94A3B8',
            marginTop: '0.5rem'
          }}>
            Mettez à jour les informations de votre portfolio professionnel
          </p>
        </div>

        {/* Barre de progression */}
        <div style={{marginBottom: '2rem'}}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            marginBottom: '2rem'
          }}>
            {/* Progress Line */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '2px',
              backgroundColor: '#334155',
              transform: 'translateY(-50%)',
              zIndex: 0
            }}>
              <div style={{
                width: `${(currentStep - 1) / 6 * 100}%`,
                height: '100%',
                backgroundColor: '#00C9A7',
                transition: 'width 0.3s ease'
              }} />
            </div>
            
            {/* Steps */}
            {steps.map((step) => (
              <div key={step.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 1,
                backgroundColor: '#0A0F1E',
                padding: '0 1rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: currentStep >= step.id ? '#00C9A7' : '#334155',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 'bold',
                  border: `2px solid ${currentStep >= step.id ? '#00C9A7' : '#334155'}`
                }}>
                  {step.id}
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{
                    color: currentStep >= step.id ? '#FFFFFF' : '#94A3B8',
                    fontFamily: "Syne, sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: currentStep === step.id ? 'bold' : 'normal'
                  }}>
                    {step.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '3rem'
        }}>
          {/* Formulaire */}
          <div style={{
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '0.75rem',
            padding: '2rem'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
              <div>
                <h2 style={{
                  color: '#FFFFFF',
                  fontSize: '1.5rem',
                  fontFamily: "Syne, sans-serif"
                }}>
                  {steps[currentStep - 1].title}
                </h2>
                <p style={{
                  color: '#94A3B8',
                  fontSize: '0.875rem'
                }}>
                  {steps[currentStep - 1].description}
                </p>
              </div>
              <div style={{
                backgroundColor: '#00C9A7',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontFamily: "Syne, sans-serif",
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}>
                Étape {currentStep}/7
              </div>
            </div>
            
            {renderCurrentStep()}
            
            {/* Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2rem',
              gap: '1rem'
            }}>
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: '#94A3B8',
                  border: '1px solid #334155',
                  borderRadius: '0.5rem',
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  minHeight: '2.5rem',
                  opacity: currentStep === 1 ? 0.5 : 1
                }}
              >
                ← Précédent
              </button>
              
              {currentStep < 7 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
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
                    cursor: isStepValid() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    minHeight: '2.5rem',
                    opacity: isStepValid() ? 1 : 0.5
                  }}
                >
                  Suivant →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
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
                    cursor: isStepValid() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    minHeight: '2.5rem',
                    opacity: isStepValid() ? 1 : 0.5
                  }}
                >
                  Sauvegarder les modifications
                </button>
              )}
            </div>
          </div>
          
          {/* Prévisualisation */}
          <div style={{
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '0.75rem',
            padding: '2rem',
            height: 'fit-content',
            position: 'sticky',
            top: '2rem'
          }}>
            <h3 style={{
              color: '#FFFFFF',
              fontSize: '1.25rem',
              fontFamily: "Syne, sans-serif",
              marginBottom: '1.5rem'
            }}>
              Prévisualisation
            </h3>
            
            <div style={{color: '#94A3B8', fontFamily: "DM Sans, sans-serif"}}>
              {formData.firstName && formData.lastName && (
                <div style={{marginBottom: '1rem'}}>
                  <strong style={{color: '#FFFFFF'}}>
                    {formData.firstName} {formData.lastName}
                  </strong>
                  {formData.title && (
                    <div style={{color: '#00C9A7', fontSize: '0.875rem'}}>
                      {formData.title}
                    </div>
                  )}
                </div>
              )}
              
              {formData.tagline && (
                <div style={{marginBottom: '1rem'}}>
                  <strong style={{color: '#FFFFFF'}}>À propos:</strong>
                  <p style={{fontSize: '0.875rem', marginTop: '0.5rem'}}>
                    {formData.tagline.substring(0, 100)}...
                  </p>
                </div>
              )}
              
              {formData.services.length > 0 && formData.services[0].title && (
                <div style={{marginBottom: '1rem'}}>
                  <strong style={{color: '#FFFFFF'}}>Services:</strong>
                  <div style={{fontSize: '0.875rem', marginTop: '0.5rem'}}>
                    {formData.services.slice(0, 2).map((service, index) => (
                      <div key={index} style={{marginBottom: '0.25rem'}}>
                        • {service.title}
                      </div>
                    ))}
                    {formData.services.length > 2 && (
                      <div style={{color: '#94A3B8'}}>
                        ...et {formData.services.length - 2} autres
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {formData.email && (
                <div>
                  <strong style={{color: '#FFFFFF'}}>Contact:</strong>
                  <div style={{fontSize: '0.875rem', marginTop: '0.5rem'}}>
                    📧 {formData.email}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPortfolio
