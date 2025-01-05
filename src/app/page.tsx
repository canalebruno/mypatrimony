import { auth } from "@/auth";
import styles from "./page.module.scss";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";

export default async function Home() {
  const session = await auth();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        {session?.user && <Dashboard />}
      </main>
    </div>
  );
}
