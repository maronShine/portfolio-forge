#!/usr/bin/env node

// PortfolioForge API Test Script
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

// Test configuration
const testUser = {
  email: 'test@example.com',
  password: 'test123456',
  firstName: 'Test',
  lastName: 'User'
};

const testPortfolio = {
  firstName: 'John',
  lastName: 'Doe',
  title: 'Full Stack Developer',
  tagline: 'Building amazing web experiences',
  about: 'I am a passionate developer with 5 years of experience...',
  services: [
    {
      title: 'Web Development',
      description: 'Creating modern web applications',
      deliverables: 'Website, documentation',
      duration: '2-4 weeks',
      forWho: 'Startups and SMEs'
    }
  ],
  experiences: [
    {
      role: 'Senior Developer',
      org: 'Tech Company',
      period: '2020-2023',
      description: 'Led development of multiple projects',
      results: 'Increased performance by 40%'
    }
  ],
  skills: [
    { name: 'React', level: 'expert' },
    { name: 'Node.js', level: 'expert' }
  ],
  email: 'john.doe@example.com',
  phone: '+33 6 12 34 56 78',
  location: 'Paris, France',
  availability: 'available'
};

let authToken = '';
let portfolioId = '';

// Utility functions
const log = (message, type = 'INFO') => {
  const timestamp = new Date().toISOString();
  const colors = {
    INFO: '\x1b[36m',    // Cyan
    SUCCESS: '\x1b[32m', // Green
    ERROR: '\x1b[31m',   // Red
    WARNING: '\x1b[33m'  // Yellow
  };
  const reset = '\x1b[0m';
  console.log(`${colors[type]}[${timestamp}] ${message}${reset}`);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Test functions
async function testHealthCheck() {
  log('🏥 Testing API Health Check...');
  try {
    const response = await axios.get(`${API_BASE}/health`);
    if (response.status === 200) {
      log('✅ Health check passed');
      return true;
    }
  } catch (error) {
    log(`❌ Health check failed: ${error.message}`, 'ERROR');
    return false;
  }
}

async function testUserRegistration() {
  log('👤 Testing User Registration...');
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, testUser);
    if (response.status === 201) {
      authToken = response.data.token;
      log('✅ User registration successful');
      log(`📧 Token received: ${authToken.substring(0, 20)}...`);
      return true;
    }
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.error === 'User already exists with this email') {
      log('ℹ️ User already exists, trying login...');
      return await testUserLogin();
    }
    log(`❌ Registration failed: ${error.response?.data?.error || error.message}`, 'ERROR');
    return false;
  }
}

async function testUserLogin() {
  log('🔐 Testing User Login...');
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    if (response.status === 200) {
      authToken = response.data.token;
      log('✅ User login successful');
      log(`📧 Token received: ${authToken.substring(0, 20)}...`);
      return true;
    }
  } catch (error) {
    log(`❌ Login failed: ${error.response?.data?.error || error.message}`, 'ERROR');
    return false;
  }
}

async function testGetCurrentUser() {
  log('👤 Testing Get Current User...');
  try {
    const response = await axios.get(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    if (response.status === 200) {
      log('✅ Get current user successful');
      log(`👤 User: ${response.data.firstName} ${response.data.lastName}`);
      return true;
    }
  } catch (error) {
    log(`❌ Get current user failed: ${error.response?.data?.error || error.message}`, 'ERROR');
    return false;
  }
}

async function testCreatePortfolio() {
  log('📝 Testing Portfolio Creation...');
  try {
    const response = await axios.post(`${API_BASE}/portfolio`, testPortfolio, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    if (response.status === 201) {
      portfolioId = response.data.portfolio.id;
      log('✅ Portfolio creation successful');
      log(`📄 Portfolio ID: ${portfolioId}`);
      log(`🔗 Portfolio Slug: ${response.data.portfolio.slug}`);
      return true;
    }
  } catch (error) {
    log(`❌ Portfolio creation failed: ${error.response?.data?.error || error.message}`, 'ERROR');
    return false;
  }
}

async function testGetPortfolios() {
  log('📋 Testing Get User Portfolios...');
  try {
    const response = await axios.get(`${API_BASE}/portfolio`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    if (response.status === 200) {
      log('✅ Get portfolios successful');
      const portfolios = Array.isArray(response.data) ? response.data : response.data.data || [];
      log(`📊 Found ${portfolios.length} portfolios`);
      return true;
    }
  } catch (error) {
    log(`❌ Get portfolios failed: ${error.response?.data?.error || error.message}`, 'ERROR');
    return false;
  }
}

async function testGetPublicPortfolio() {
  if (!portfolioId) {
    log('⚠️ No portfolio ID available for public test', 'WARNING');
    return false;
  }
  
  log('🌐 Testing Get Public Portfolio...');
  try {
    // First get the portfolio to get its slug
    const portfolioResponse = await axios.get(`${API_BASE}/portfolio`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    const portfolios = Array.isArray(portfolioResponse.data) ? portfolioResponse.data : portfolioResponse.data.data || [];
    const portfolio = portfolios.find(p => p.id === portfolioId);
    
    if (!portfolio) {
      log('❌ Portfolio not found for public test', 'ERROR');
      return false;
    }

    const response = await axios.get(`${API_BASE}/portfolio/${portfolio.slug}`);
    if (response.status === 200) {
      log('✅ Get public portfolio successful');
      log(`🔗 Public URL: /portfolio/${portfolio.slug}`);
      return true;
    }
  } catch (error) {
    log(`❌ Get public portfolio failed: ${error.response?.data?.error || error.message}`, 'ERROR');
    return false;
  }
}

async function testUpdatePortfolio() {
  if (!portfolioId) {
    log('⚠️ No portfolio ID available for update test', 'WARNING');
    return false;
  }
  
  log('✏️ Testing Portfolio Update...');
  try {
    const updatedData = { ...testPortfolio, title: 'Updated Full Stack Developer' };
    const response = await axios.put(`${API_BASE}/portfolio/${portfolioId}`, updatedData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    if (response.status === 200) {
      log('✅ Portfolio update successful');
      return true;
    }
  } catch (error) {
    log(`❌ Portfolio update failed: ${error.response?.data?.error || error.message}`, 'ERROR');
    return false;
  }
}

async function testDeletePortfolio() {
  if (!portfolioId) {
    log('⚠️ No portfolio ID available for delete test', 'WARNING');
    return false;
  }
  
  log('🗑️ Testing Portfolio Deletion...');
  try {
    const response = await axios.delete(`${API_BASE}/portfolio/${portfolioId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    if (response.status === 200) {
      log('✅ Portfolio deletion successful');
      return true;
    }
  } catch (error) {
    log(`❌ Portfolio deletion failed: ${error.response?.data?.error || error.message}`, 'ERROR');
    return false;
  }
}

// Main test runner
async function runTests() {
  log('🚀 Starting PortfolioForge API Tests', 'SUCCESS');
  log('=====================================');
  
  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'User Registration', fn: testUserRegistration },
    { name: 'Get Current User', fn: testGetCurrentUser },
    { name: 'Create Portfolio', fn: testCreatePortfolio },
    { name: 'Get Portfolios', fn: testGetPortfolios },
    { name: 'Get Public Portfolio', fn: testGetPublicPortfolio },
    { name: 'Update Portfolio', fn: testUpdatePortfolio },
    { name: 'Delete Portfolio', fn: testDeletePortfolio }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      log(`❌ Test "${test.name}" crashed: ${error.message}`, 'ERROR');
      failed++;
    }
    
    // Small delay between tests
    await sleep(500);
  }

  log('=====================================');
  log(`📊 Test Results: ${passed} passed, ${failed} failed`, 
    failed === 0 ? 'SUCCESS' : 'WARNING');
  
  if (failed === 0) {
    log('🎉 All tests passed! PortfolioForge API is working perfectly!', 'SUCCESS');
  } else {
    log('⚠️ Some tests failed. Please check the logs above.', 'WARNING');
  }

  process.exit(failed === 0 ? 0 : 1);
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(error => {
    log(`💥 Test runner crashed: ${error.message}`, 'ERROR');
    process.exit(1);
  });
}

module.exports = {
  runTests,
  testHealthCheck,
  testUserRegistration,
  testUserLogin,
  testGetCurrentUser,
  testCreatePortfolio,
  testGetPortfolios,
  testGetPublicPortfolio,
  testUpdatePortfolio,
  testDeletePortfolio
};
