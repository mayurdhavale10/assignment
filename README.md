# 🎨 React Component Development Assignment

## 📌 Overview
This project implements **two reusable UI components** — `InputField` and `DataTable` — using **React, TypeScript, and TailwindCSS**, documented with **Storybook**.

The focus areas:
- Clean, accessible, and reusable design
- Scalable project structure for future components
- Strict typing with TypeScript
- Storybook documentation & deployment

---

## 🚀 Live Links
- **GitHub Repository**: [mayurdhavale10/assignment](https://github.com/mayurdhavale10/assignment)  
- **Live Demo (Next.js app)**: [assignment-alpha-ten-95.vercel.app](https://assignment-alpha-ten-95.vercel.app/)  
- **Storybook Preview (Chromatic)**: [View Storybook](https://68aadd78be8140a34d55e889-gfjyjnumum.chromatic.com/)  

---

## 🧩 Components

### 1. InputField
A flexible input component with multiple variants, sizes, and validation states.  
**Features**
- Label, placeholder, helper text, error message  
- States: `disabled`, `invalid`, `loading`  
- Variants: `filled`, `outlined`, `ghost`  
- Sizes: `sm`, `md`, `lg`  
- Optional: clear button, password toggle  
- Light & dark theme support  

---

### 2. DataTable
Reusable data table with basic interactivity.  
**Features**
- Display tabular data  
- Column sorting  
- Row selection (single/multiple)  
- Delete selected rows  
- Min-age filter  
- Loading state  
- Empty state  
- Accessible with ARIA attributes  

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Next.js 15 (App Router)  
- **Language**: TypeScript  
- **Styling**: TailwindCSS  
- **Docs**: Storybook 9 (Next.js + Vite)  
- **Testing**: Vitest + Testing Library  
- **Deployment**: Vercel (Next.js) + Chromatic (Storybook)  

---

## 📂 Project Structure


assignment/
├── .storybook/ # Storybook config
├── public/ # Static assets
│ └── screenshots/ # Screenshots for README
│ ├── home.png.png
│ └── inputfield.png.png
├── src/
│ ├── app/ # Next.js pages
│ │ ├── page.tsx # Home page demo
│ │ └── examples/ # Example usage page
│ ├── components/ui/ # Core reusable UI components
│ │ ├── input-field/ # InputField + stories
│ │ └── data-table/ # DataTable + stories
│ └── types/ # TypeScript types & shims
├── package.json
└── README.md


---

## 🖥️ Local Development

### Install
```bash
npm install

Run Next.js app
npm run dev

Run Storybook
npm run storybook

Build Storybook (for deployment)
npm run build-storybook
