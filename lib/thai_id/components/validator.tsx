"use client"

import React, { useState } from 'react'
import { useThaiIDValidation } from '@/lib/thai_id/hooks/useThaiIDValidation'

export const ThaiIDValidator: React.FC = () => {
  const [inputID, setInputID] = useState<string>('1234567890121')
  const errors = useThaiIDValidation(inputID);

  return (
    <>
      <input
        type="text"
        value={inputID}
        onChange={(e) => setInputID(e.target.value)}
        style={{ height: '2.5rem', width: '100%', marginBottom: '1rem' }}
        placeholder="กรอกหมายเลขบัตรประชาชน"
      />

      {errors.length > 0 ? (
        <div style={{ marginTop: '1rem', color: '#EE9E0B' }}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>
                <p>{error}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        inputID &&
        <p style={{ marginTop: '1rem', color: 'green' }}>
          เลขบัตรประชาชนถูกต้อง
        </p>
      )}
    </>
  );
};
