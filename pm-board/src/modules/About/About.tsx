// src/modules/Home/Home.tsx
import React from 'react';
import styles from './About.module.scss';

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>About Page</h1>
            <p>Welcome to the About page!</p>
    </div>
  );
}

export default About;
