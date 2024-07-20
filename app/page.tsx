"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { ThaiId } from "@/lib/thai_id";

export default function Home() {
  const [thaiID, setThaiID] = useState('');

  const randomThaiID = () => {
    const thaiid = ThaiId.generate();

    setThaiID(thaiid);

    navigator.clipboard.writeText(thaiid)
      .then(() => {
        console.log('Thai ID copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy Thai ID: ', err);
      });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>โปรแกรมสุ่มเลขบัตรประชาชน</h1>
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

        <button style={{ height: '2.5rem', width:  }} onClick={randomThaiID}>สุ่ม</button>
        {thaiID && (
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#EE9E0B' }}>{thaiID}</p>
          </div>
        )}
      </main>
    </div>
  );
}
