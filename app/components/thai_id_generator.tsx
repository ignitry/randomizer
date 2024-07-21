import { useState } from 'react';
import { ThaiId } from "@/lib/thai_id";

export const ThaiIDGenerator = () => {
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
    <>
      <button style={{ height: '2.5rem', width: '100%' }} onClick={randomThaiID}>สุ่ม</button>
      {thaiID && (
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#EE9E0B' }}>{thaiID}</p>
        </div>
      )}
    </>
  );
};
