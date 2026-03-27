import React from 'react';
import ClientAuth from '../components/reviews/ClientAuth';

const ClientLoginPage = () => {
  return (
    <div className="bg-[#f1f5f9]">
      {/* We add some top padding so it doesn't overlap with a fixed navbar, but retains the dark background seamlessly */}
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <ClientAuth />
      </div>
    </div>
  );
};

export default ClientLoginPage;
