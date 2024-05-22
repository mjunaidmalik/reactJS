// src/modules/Home/Home.tsx
import React from 'react';
import styles from './Home.module.scss';
import Board from './pages/Board/Board';
import Backlog from './pages/Board/Backlog';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <p>Welcome to my board!</p>

      <Board />
      <Backlog />
    </div>
  );
}

export default Home;
