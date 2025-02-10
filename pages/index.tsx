import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to BookFinder</h1>
        <p className={styles.heroSubtitle}>Find your next great read with ease!</p>
        <div className={styles.buttonsContainer}>
          <Link href="/search">
            <button className={styles.heroButton}>Search for Books</button>
          </Link>
          <Link href="/ratings">
            <button className={styles.heroButton}>Check Ratings</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
