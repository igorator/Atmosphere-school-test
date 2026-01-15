import styles from "./App.module.css";
import { MapPage } from "@/pages/MapPage/MapPage";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Atmosphere School Test</h1>
      </header>
      <main className={styles.main}>
        <MapPage />
      </main>
    </div>
  );
}

export default App;
