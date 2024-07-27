"use client";

import React, { useState } from 'react';
import { ThaiId } from "@/lib/thai_id/thai_id";

export const ThaiIDValidator: React.FC = () => {
  const [inputID, setInputID] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const validateThaiID = () => {
    const validationErrors = ThaiId.validate(inputID);
    setErrors(validationErrors);
  };

  return (
    <>
      <input
        type="text"
        value={inputID}
        onChange={(e) => setInputID(e.target.value)}
        style={{ height: '2.5rem', width: '100%', marginBottom: '1rem' }}
        placeholder="กรอกหมายเลขบัตรประชาชน"
      />
      <button style={{ height: '2.5rem', width: '100%' }} onClick={validateThaiID}>ตรวจสอบ</button>
      {errors.length > 0 && (
        <div style={{ marginTop: '1rem', color: 'red' }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </>
  );
};
