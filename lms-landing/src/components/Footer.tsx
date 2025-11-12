import React from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Features',
      links: [
        'Course Creation',
        'Student Engagement',
        'Assessment Tools',
        'Analytics Dashboard',
        'Mobile Learning',
        'Accessibility'
      ]
    },
    {
      title: 'Resources',
      links: [
        'Documentation',
        'API Reference',
        'Help Center',
        'Community Forum',
        'Video Tutorials',
        'Best Practices'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Our Mission',
        'Blog',
        'Careers',
        'Press Kit',
        'Contact'
      ]
    },
    {
      title: 'Support',
      links: [
        'Getting Started',
        'FAQ',
        'Community Support',
        'Feature Requests',
        'Bug Reports',
        'System Status'
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer id="resources" className="bg-neutral-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold">LearnFlow LMS</span>
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Empowering educators and learners worldwide with modern, accessible, and powerful learning tools. 
              Free forever, open source, built with purpose.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-neutral-400">
                <Mail className="h-4 w-4 mr-3" />
                <span>hello@learnflow-lms.com</span>
              </div>
              <div className="flex items-center text-neutral-400">
                <Phone className="h-4 w-4 mr-3" />
                <span>Support: 24/7 Community</span>
              </div>
              <div className="flex items-center text-neutral-400">
                <MapPin className="h-4 w-4 mr-3" />
                <span>Global • Remote-First</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Trust Badges */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-neutral-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-semantic-success rounded-full mr-2"></span>
                WCAG 2.1 AA
              </span>
              <span>SOC 2 Compliant</span>
              <span>GDPR Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-neutral-400 text-sm">
              © 2025 LearnFlow LMS. Made with ❤️ for educators worldwide.
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200">
                Accessibility Statement
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
