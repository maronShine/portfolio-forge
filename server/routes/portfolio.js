const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const router = express.Router();

// In-memory storage for development
let portfolios = [];

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Generate unique slug from name
const generateSlug = (firstName, lastName) => {
  const baseName = `${firstName}-${lastName}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseName}-${randomSuffix}`;
};

// @route   POST /api/portfolio
// @desc    Create a new portfolio
// @access  Private
router.post('/', authMiddleware, [
  body('title').notEmpty().withMessage('Title is required'),
  body('tagline').notEmpty().withMessage('Tagline is required')
], handleValidationErrors, async (req, res) => {
  try {
    const portfolioData = {
      id: Date.now().toString(),
      ...req.body,
      userId: req.user.id,
      slug: generateSlug(req.body.firstName || 'user', req.body.lastName || 'portfolio'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    portfolios.push(portfolioData);

    res.status(201).json({
      message: 'Portfolio created successfully',
      portfolio: portfolioData
    });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ error: 'Server error during portfolio creation' });
  }
});

// @route   GET /api/portfolio/:slug
// @desc    Get a public portfolio by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const portfolio = portfolios.find(p => p.slug === slug);

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    // Check if portfolio is public (default to public if not specified)
    if (portfolio.isPublic === false) {
      return res.status(403).json({ error: 'Portfolio is private' });
    }

    res.json({ data: portfolio });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ error: 'Server error while fetching portfolio' });
  }
});

// @route   GET /api/portfolio
// @desc    Get all portfolios for a user
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userPortfolios = portfolios.filter(p => p.userId === req.user.id);

    res.json(userPortfolios);
  } catch (error) {
    console.error('Get portfolios error:', error);
    res.status(500).json({ error: 'Server error while fetching portfolios' });
  }
});

// @route   PUT /api/portfolio/:id
// @desc    Update a portfolio
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const portfolioIndex = portfolios.findIndex(p => p.id === id && p.userId === req.user.id);

    if (portfolioIndex === -1) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    const updatedPortfolio = {
      ...portfolios[portfolioIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    portfolios[portfolioIndex] = updatedPortfolio;

    res.json({
      message: 'Portfolio updated successfully',
      portfolio: updatedPortfolio
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ error: 'Server error while updating portfolio' });
  }
});

// @route   DELETE /api/portfolio/:id
// @desc    Delete a portfolio
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if portfolio exists and belongs to user
    const existingPortfolio = portfolios.find(p => p.id === id && p.userId === req.user.id);

    if (!existingPortfolio) {
      return res.status(404).json({ error: 'Portfolio not found or access denied' });
    }

    portfolios = portfolios.filter(p => p.id !== id);

    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ error: 'Server error while deleting portfolio' });
  }
});

module.exports = router;
