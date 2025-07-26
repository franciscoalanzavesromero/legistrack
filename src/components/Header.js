import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/img/logo.png';

const Header = ({ siteName = "Legistrack", socialLinks = {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container position-relative d-flex align-items-center justify-content-between">
        
        {/* Logo */}
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0" style={{ textDecoration: 'none' }}>
            <img src={logo} alt={siteName} />
            <h1 className="sitename" style={{ textDecoration: 'none' }}>{siteName}</h1>
        </Link>

        {/* Navigation Menu */}
        <nav 
          id="navmenu" 
          className={`navmenu ${isMobileMenuOpen ? 'mobile-nav-active' : ''}`}
          aria-label="Main navigation"
        >
          <ul>
            <li>
              <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/single-post" className={({isActive}) => isActive ? 'active' : ''}>
                Single Post
              </NavLink>
            </li>
            
            {/* Categories Dropdown */}
            <li className={`dropdown ${activeDropdown === 0 ? 'active' : ''}`}>
              <button 
                onClick={() => toggleDropdown(0)}
                className="dropdown-toggle border-0 shadow-none"
                aria-expanded={activeDropdown === 0}
              >
                <span>Categories</span> 
                {/* <i className="bi bi-chevron-down toggle-dropdown"></i> */}
              </button>
              {activeDropdown === 0 && (
                <ul>
                  <li>
                    <NavLink to="/category/1">Category 1</NavLink>
                  </li>
                  <li><NavLink to="/category/2">Category 2</NavLink></li>
                  <li><NavLink to="/category/3">Category 3</NavLink></li>
                  <li><NavLink to="/category/4">Category 4</NavLink></li>
                </ul>
              )}
            </li>
            
            <li>
              <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>
                Contact
              </NavLink>
            </li>
          </ul>
          
          {/* Mobile Navigation Toggle */}
          <button 
            className="mobile-nav-toggle d-xl-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </nav>

        {/* Social Links */}
        <div className="header-social-links" aria-label="Social media links">
          <a 
            href={socialLinks.twitter} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="twitter"
            aria-label="Visit our Twitter page"
          >
            <i className="bi bi-twitter-x"></i>
          </a>
          <a 
            href={socialLinks.facebook} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="facebook"
            aria-label="Visit our Facebook page"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a 
            href={socialLinks.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="instagram"
            aria-label="Visit our Instagram page"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a 
            href={socialLinks.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="linkedin"
            aria-label="Visit our LinkedIn page"
          >
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteName: PropTypes.string,
  socialLinks: PropTypes.shape({
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    linkedin: PropTypes.string
  })
};

export default Header;