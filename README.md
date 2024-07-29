# Randomizer

โปรแกรมสุ่มเลขบัตรประชาชน deploy ผ่าน Cloudflare Pages ไว้ที่ - [randomizer](https://randomizer.ignitry.com/)

## Run the development server

```bash
# ต้องใช้ --force ด้วยเพราะ test library ยังไม่ support React 19
npm install --force
npm run dev
```

## วิธี Deploy ไปที่ Cloudflare Pages

- ~~เลือกประเภท `Next.js`  ที่เป็น static generator~~
- ~~build command ใช้ `mkdir out && npx next build`~~
- ใช้คำสั่งข้างบนไม่ได้อีกเนื่องจาก Cloudflare Pages ไม่ support การ `npm install --force`
- ไม่ต้องใส่คำสั่ง build และเลือก `/out` เป็น output directory
- run คำสั่ง `npx next build` เองใน local ก่อน commit
- React 19 stable เมื่อไหร่คงจะกลับไปใช้ได้
