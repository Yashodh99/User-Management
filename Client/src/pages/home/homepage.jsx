import React from 'react';
import './homepage.scss';
import Banner from '../../components/Banner/Banner';
import Skills from '../../components/Skills/Skills';
import Projects from '../../components/Projects/Projects';
import  NavBar  from '../../components/NavBar/NavBar';

const Homepage = () => {
  return (
    <div className="homepage">
      <header>
      </header>
      <main>
        <NavBar/>
        <Banner />
        <Skills />
        <Projects />

      </main>
      <footer>
        <p>&copy; 2024 EnglishEase</p>
      </footer>
    </div>
  );
};

export default Homepage;
