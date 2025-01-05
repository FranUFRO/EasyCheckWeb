import React from 'react';
import { Navbar } from '../components/Navbar';

const DefaultLayout = ({ children }) => (
    <div>
      <Navbar /> {/* Componente de la Navbar */}
      <main>
        {children} {/* Este es el contenido de cada página */}
      </main>
    </div>
  );
  
  export default DefaultLayout;