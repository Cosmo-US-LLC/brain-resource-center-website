# Brain Resource Center Website

This website is built with React + Vite and follows modern web development practices.

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **GSAP** - Animation library
- **Radix UI** - Accessible component primitives
- **Embla Carousel** - Carousel/slider library
- **Lucide React** - Icon library
- **Shadcn UI** - Re-usable components

## Project Structure

```
src/
├── components/
│   ├── layout/           # Header, Footer, Layout wrapper
│   ├── PageComponents/   # Page-specific components
│   └── ui/              # Reusable UI components (Shadcn)
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── assets/             # Images, icons, etc.
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
└── index.css           # Global styles

```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## React Compiler

The React Compiler is enabled on this project. See [React Compiler documentation](https://react.dev/learn/react-compiler) for more information.

Note: This may impact Vite dev & build performances.

## Features

- ⚡️ Vite for fast development and optimized builds
- 🎨 Tailwind CSS 4 with custom animations
- 🧩 Component-based architecture
- 🎯 Path aliases for clean imports (@/ prefix)
- 📱 Responsive design
- ♿️ Accessible components with Radix UI
- 🎠 Smooth animations with GSAP
- 🔄 Client-side routing with React Router
- 🎪 Carousel/slider support
- 🎨 Shadcn UI components

## Path Aliases

The project uses path aliases for cleaner imports:

- `@/components` - Components directory
- `@/lib` - Library/utilities
- `@/hooks` - Custom hooks
- `@/ui` - UI components

Example:
```javascript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

## Deployment

This project is configured for Netlify deployment with SPA routing support.

