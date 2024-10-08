import styles from "./page.module.css";
import { ThaiIDGenerator } from "@/lib/thai_id/components/generator";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/validations/new" className={styles.page_link}>
          ตรวจสอบเลขบัตร &#x279C;
        </Link>

        <h1>สุ่มเลขบัตรประชาชน</h1>
        <ul>
          <li>
            สุ่มเลขตาม format คนที่เกิดในประเทศไทยเท่านั้น
          </li>
          <li>
            ไม่รับประกันความถูกต้องใดๆทั้งสิ้น
          </li>
          <li>
            ถ้าบังเอิญตรงกับเลขจริงของใคร มันคือความบังเอิญจริงๆ
          </li>
        </ul>

        <ThaiIDGenerator />
      </main>
    </div>
  );
}
