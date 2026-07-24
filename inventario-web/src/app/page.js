import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <main className={styles.main}>
      <Sidebar />
    </main>
  );
}
