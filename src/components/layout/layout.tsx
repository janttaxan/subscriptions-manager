import styles from './layout.module.css';

import { ReactChild } from 'react';

interface LayoutProps {
  children?: ReactChild;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>header</header>
      <main className={styles.content}>{children}</main>
    </div>
  );
};
