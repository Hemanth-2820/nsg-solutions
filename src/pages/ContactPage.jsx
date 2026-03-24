import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';

const ContactPage = () => {
  return (
    <div className="min-h-screen font-sans">
      <ContactHero />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
