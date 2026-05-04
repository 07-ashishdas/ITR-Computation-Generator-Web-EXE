# 📊 ITR Computation Generator

> Instantly generate professional ITR computation PDFs from your Income Tax India JSON files — 100% local, private, and free forever.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-cyan?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 About

The **ITR Computation Generator** is a privacy-first web tool designed to simplify tax compliance for Indian taxpayers.

Upload your ITR JSON file (downloaded from the Income Tax India portal) and instantly generate a **clean, professional PDF computation sheet** with all relevant income, deductions, and tax details.

Part of the **Finace India Compliance Stack** — a growing suite of public utilities focused on making compliance simple, transparent, and accessible.

---

# You Can Download [Download EXE]([https://github.com/your-repo/releases/download/v1.0.0/app.exe](https://github.com/07-ashishdas/ITR-Computation-Generator-Web-EXE/releases/download/v1.0.0/ITRGen.exe))

## ✨ Key Features

| Feature               | Description                                    |
| --------------------- | ---------------------------------------------- |
| ⚡ Instant Summary     | Generate full tax computation in seconds       |
| 🎯 100% Accurate      | Uses official ITR JSON — no manual errors      |
| 📄 Clean PDF Output   | Professional reports for loans, visas, records |
| 🔒 Privacy First      | Runs entirely in your browser                  |
| ⏱️ Saves Time & Money | No CA dependency for basic computation         |
| 🎁 Free Forever       | No subscriptions, no hidden costs              |

---

## 🛠 Tech Stack

* **Frontend:** React 18, JSX
* **Build Tool:** Vite 5 + vite-plugin-singlefile
* **Styling:** Tailwind CSS, PostCSS, Autoprefixer
* **PDF Engine:** jsPDF, jspdf-autotable
* **Utilities:** clsx, tailwind-merge, lucide-react

---

## 📦 Prerequisites

* Node.js ≥ 18
* npm ≥ 9

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/07-ashishdas/itr-computation-generator.git
cd itr-computation-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open: http://localhost:5173

### 4. Build (Single File Output)

```bash
npm run build
```

Output: `/dist` → fully self-contained HTML file

### 5. Preview build

```bash
npm run preview
```

---

## 📖 Usage Guide

1. Download your ITR JSON from Income Tax portal
2. Upload the file in the app
3. Preview auto-parsed data (masked for privacy)
4. Click **Download PDF**

---

## 📝 Supported ITR Forms

* ITR-1 (Sahaj)
* ITR-2
* ITR-3
* ITR-4 (Sugam)

Auto-detected from JSON.

---

## 📑 PDF Includes

* Personal Info (masked)
* Filing Details
* Income Breakdown
* Deductions (80C, 80D, etc.)
* Tax Computation
* TDS / TCS / Advance Tax
* Refund / Payable Summary
* Bank Details
* Verification

---

## 🔒 Privacy & Security

* ✅ 100% local processing
* ✅ No server uploads
* ✅ No tracking
* ✅ No third-party sharing

Your data never leaves your device.

---

## 📂 Project Structure

```
itr-computation-generator/
├── public/
├── src/
│   ├── components/
│   ├── utils/
│   │   └── pdfGenerator.js
│   ├── main.jsx
│   └── App.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 👤 Author

**Ashish Das**

* GitHub: https://github.com/07-ashishdas
* LinkedIn: https://www.linkedin.com/in/ashish-das-663b32197/

---

## ⚠️ Disclaimer

This tool is for informational purposes only. Always verify results with official records or a qualified tax professional.

---

## 📄 License

MIT License — see `LICENSE` file for details.
