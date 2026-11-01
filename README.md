# 🚀 Startup Investment Platform

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg?style=for-the-badge)

## 📖 Description

The **Startup Investment Platform** is a comprehensive web application designed to bridge the gap between visionary startup founders and prospective investors. It streamlines the fundraising process by allowing startups to pitch their ideas, upload decks, and showcase their metrics, while providing investors with a centralized dashboard to discover, evaluate, and fund the next big unicorn.

## ✨ Key Features

* **Role-Based Authentication:** Secure login and registration tailored for both "Founders" and "Investors".
* **Startup Directory:** A searchable and filterable database of active startups seeking funding.
* **Pitch Deck Hosting:** Secure upload and viewing of startup pitch decks and financial documents.
* **Investor Dashboard:** Personalized feeds, saved startups, and portfolio tracking.
* **Real-time Messaging:** Direct communication channel between verified investors and founders.
* **Analytics & Metrics:** Visual representation of funding goals, raised amounts, and company valuation.

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript
* **Styling:** Tailwind CSS, shadcn/ui
* **Backend:** Node.js, Next.js API Routes
* **Database:** PostgreSQL (via Prisma ORM)
* **Authentication:** NextAuth.js / Supabase
* **Storage:** AWS S3 / Supabase Storage (for pitch decks and assets)

## ⚙️ Installation & Setup

Follow these steps to get the project running on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JoudN2001/Startup-Investment-Platform.git
   cd Startup-Investment-Platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the following keys based on the `.env.example` file:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"
   # Add your cloud storage and third-party API keys here
   ```

4. **Run database migrations:**
   ```bash
   npx prisma db push
   # or npx prisma migrate dev
   ```

## 🚀 Usage

To start the local development server, run:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.



### 🔐 Demo Web Login Credentials

[Live Demo](https://startup-investment-platform.vercel.app/)
If you are evaluating the demo version of this web platform, you can use the following seeded test accounts to explore the features without registering:

**Investor Account:**
* **Email:** `investor@naya.com`
* **Password:** `123456`

**Founder Account:**
* **Email:** `startup@naya.com`
* **Password:** `123456`

**Admin Account:**
* **Email:** `admin@naya.com`
* **Password:** `123456`


## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
