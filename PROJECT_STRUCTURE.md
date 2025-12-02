# Brain Resource Center Website - Project Structure

## Overview
This project is a modern React-based website built with Vite, following the same architecture as the House of Handsome website. It includes routing, component-based architecture, and modern styling with Tailwind CSS.

## Technology Stack

### Core
- **React 19.1.1** - UI Library
- **Vite 7.1.7** - Build tool & dev server
- **React Router DOM 7.9.5** - Client-side routing

### Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Tailwind Animate** - Animation utilities
- **Class Variance Authority** - Component variant management

### UI Components
- **Radix UI** - Accessible component primitives
  - @radix-ui/react-accordion
  - @radix-ui/react-dialog
  - @radix-ui/react-slot
- **Lucide React** - Icon library
- **Embla Carousel** - Carousel/slider functionality

### Animation
- **GSAP 3.13.0** - Animation library with ScrollTrigger

### Development Tools
- **ESLint** - Code linting
- **React Compiler** - Optimization
- **Shadcn** - Component CLI

## Project Structure

```
brain-resource-center-website/
│
├── public/                          # Static assets
│   └── vite.svg
│
├── src/                            # Source code
│   ├── assets/                     # Media assets
│   │   ├── images/                 # Image files
│   │   └── react.svg
│   │
│   ├── components/                 # React components
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header/
│   │   │   │   └── Header.jsx     # Navigation header
│   │   │   ├── Footer/
│   │   │   │   └── Footer.jsx     # Footer component
│   │   │   └── index.jsx          # Layout wrapper
│   │   │
│   │   ├── PageComponents/        # Page-specific components
│   │   │   ├── Home/              # Home page sections
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── Features.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Services.jsx
│   │   │   │   ├── Testimonials.jsx
│   │   │   │   └── CTA.jsx
│   │   │   │
│   │   │   ├── About/             # About page sections
│   │   │   │   ├── AboutHero.jsx
│   │   │   │   ├── Mission.jsx
│   │   │   │   ├── Team.jsx
│   │   │   │   └── Values.jsx
│   │   │   │
│   │   │   ├── Services/          # Services page sections
│   │   │   │   ├── ServicesHero.jsx
│   │   │   │   ├── ServicesList.jsx
│   │   │   │   ├── Process.jsx
│   │   │   │   └── CTASection.jsx
│   │   │   │
│   │   │   ├── Programs/          # Programs page sections
│   │   │   │   ├── ProgramsHero.jsx
│   │   │   │   ├── ProgramsList.jsx
│   │   │   │   ├── Benefits.jsx
│   │   │   │   └── Enrollment.jsx
│   │   │   │
│   │   │   ├── Resources/         # Resources page sections
│   │   │   │   ├── ResourcesHero.jsx
│   │   │   │   ├── Categories.jsx
│   │   │   │   └── ResourcesGrid.jsx
│   │   │   │
│   │   │   └── Contact/           # Contact page sections
│   │   │       ├── ContactHero.jsx
│   │   │       ├── ContactForm.jsx
│   │   │       ├── ContactInfo.jsx
│   │   │       └── Map.jsx
│   │   │
│   │   └── ui/                    # Reusable UI components
│   │       ├── accordion.jsx      # Radix accordion
│   │       ├── button.jsx         # Button component
│   │       ├── carousel.jsx       # Embla carousel
│   │       ├── sheet.jsx          # Modal/sheet component
│   │       ├── PrimaryCTA.jsx     # Primary call-to-action
│   │       └── SecondaryCTA.jsx   # Secondary call-to-action
│   │
│   ├── hooks/                     # Custom React hooks
│   │   └── useScrolled.js        # Scroll position hook
│   │
│   ├── lib/                       # Utility libraries
│   │   └── utils.js              # Helper functions (cn, etc.)
│   │
│   ├── pages/                     # Page components
│   │   ├── Home.jsx              # Home page
│   │   ├── About.jsx             # About page
│   │   ├── Services.jsx          # Services page
│   │   ├── Programs.jsx          # Programs page
│   │   ├── Resources.jsx         # Resources page
│   │   └── Contact.jsx           # Contact page
│   │
│   ├── services/                  # API services (future)
│   ├── utils/                     # Additional utilities (future)
│   │
│   ├── App.jsx                    # Main app component with routing
│   ├── App.css                    # App-specific styles
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles & Tailwind imports
│
├── .gitignore                     # Git ignore rules
├── components.json                # Shadcn configuration
├── eslint.config.js              # ESLint configuration
├── index.html                     # HTML entry point
├── jsconfig.json                  # Path alias configuration
├── jsconfig.app.json             # App-specific JS config
├── netlify.toml                   # Netlify deployment config
├── package.json                   # Dependencies & scripts
├── PROJECT_STRUCTURE.md          # This file
├── README.md                      # Project documentation
├── tailwind.config.js            # Tailwind configuration
└── vite.config.js                # Vite configuration

```

## Key Features

### 1. Routing
- Client-side routing with React Router DOM
- Nested routes with Layout wrapper
- Automatic scroll-to-top on route change
- GSAP ScrollTrigger cleanup on navigation

### 2. Component Architecture
- **Layout Components**: Reusable header and footer
- **Page Components**: Organized by page/section
- **UI Components**: Shadcn-based reusable components
- **Page-Specific Components**: Modular sections for each page

### 3. Styling
- Tailwind CSS 4 with custom theme
- CSS variables for colors
- Dark mode support (configured)
- Custom animations (float, accordion)
- Responsive design

### 4. Path Aliases
All imports use the `@/` prefix for cleaner code:
```javascript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

## Pages Structure

### Home Page (`/`)
- Hero section with gradient background
- Features showcase
- About preview
- Services overview
- Testimonials
- Call-to-action

### About Page (`/about`)
- Hero section
- Mission, Vision, Values
- Team members
- Core values list

### Services Page (`/services`)
- Hero section
- Services list with features
- 4-step process
- Call-to-action section

### Programs Page (`/programs`)
- Hero section
- Detailed program listings
- Program benefits
- Enrollment information

### Resources Page (`/resources`)
- Hero section
- Category filters
- Resource cards (articles, videos, downloads)
- Load more functionality

### Contact Page (`/contact`)
- Hero section
- Contact form
- Contact information
- Map placeholder

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Configuration Files

### vite.config.js
- React plugin
- Tailwind CSS plugin
- Path alias (@/) configuration

### tailwind.config.js
- Content paths
- Custom animations (float)
- Theme extensions

### eslint.config.js
- React hooks rules
- React refresh rules
- Custom rule configurations

### components.json
- Shadcn configuration
- Component aliases
- Icon library (Lucide)

## Deployment

Configured for Netlify with SPA routing support:
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects configured for client-side routing

## Best Practices

1. **Component Organization**: Components are organized by feature/page
2. **Reusability**: Common UI components in `/ui` folder
3. **Styling**: Utility-first with Tailwind CSS
4. **Accessibility**: Using Radix UI for accessible primitives
5. **Performance**: React Compiler enabled for optimization
6. **Type Safety**: JSConfig for path resolution

## Future Enhancements

1. Add API integration in `/services` folder
2. Implement state management if needed
3. Add authentication/authorization
4. Integrate with backend services
5. Add analytics tracking
6. Implement SEO optimizations
7. Add image optimization
8. Create custom hooks for data fetching

## Notes

- All components are functional components using React hooks
- The project uses ES modules (type: "module")
- Path aliases are configured for cleaner imports
- Dark mode support is configured but not activated
- The project follows the same structure as House of Handsome website

