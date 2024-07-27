
import styles from "../../page.module.css";
import Link from "next/link";
import { ThaiIDValidator } from "@/lib/thai_id/components/validator";

export default function NewValidationPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/">
          สุ่มเลขบัตร
        </Link>

        <h1>โปรแกรมตรวจสอบเลขบัตรประชาชน</h1>
        <ul>
          <li>
            ตรวจด้วยวิธีการคำนวณเพื่อตรวจสอบความถูกต้องของหลักสุดท้าย
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
