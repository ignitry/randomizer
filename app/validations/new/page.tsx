import styles from "../../page.module.css";
import Link from "next/link";
import { ThaiIDValidator } from "@/lib/thai_id/components/validator";

export default function NewValidationPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.page_link}>
          สุ่มเลขบัตร &#x279C;
        </Link>

        <h1>ตรวจสอบเลขบัตรประชาชน</h1>
        <ul>
          <li>
            ตรวจด้วยวิธีการคำนวณเพื่อตรวจสอบความถูกต้องของเลขหลักที่ 1,2,3 และ 13
          </li>
          <li>
            ไม่รับประกันความถูกต้องใดๆทั้งสิ้น
          </li>
        </ul>

        <ThaiIDValidator />
      </main>
    </div>
  );
}
