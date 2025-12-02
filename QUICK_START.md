# Quick Start Guide - Brain Resource Center Website

## Getting Started

### 1. Install Dependencies

Navigate to the project directory and install all required packages:

```bash
cd c:\cosmo\brain-resource-center-website
npm install
```

This will install all dependencies listed in `package.json`, including:
- React 19.1.1
- Vite 7.1.7
- Tailwind CSS 4.1.17
- React Router DOM 7.9.5
- GSAP, Radix UI, Lucide icons, and more

### 2. Start Development Server

Run the development server:

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is busy).

### 3. View the Website

Open your browser and navigate to the local development URL. You should see:
- **Home page** with hero, features, services, and testimonials
- **Navigation** with links to all pages
- **Responsive design** that works on all screen sizes

## Available Pages

The website includes 6 main pages:

1. **Home** (`/`) - Main landing page
2. **About** (`/about`) - About the organization
3. **Services** (`/services`) - Service offerings
4. **Programs** (`/programs`) - Training programs
5. **Resources** (`/resources`) - Learning resources
6. **Contact** (`/contact`) - Contact form and info

## Project Architecture

### Component Structure

```
Pages (routes) 
  ↓
Layout (Header + Footer)
  ↓
PageComponents (sections)
  ↓
UI Components (buttons, cards, etc.)
```

### Adding a New Page

1. Create page component in `src/pages/NewPage.jsx`
2. Create section components in `src/components/PageComponents/NewPage/`
3. Add route in `src/App.jsx`
4. Update navigation in `src/components/layout/Header/Header.jsx`

Example:
```javascript
// src/pages/NewPage.jsx
import React from "react";
import NewHero from "../components/PageComponents/NewPage/NewHero";

function NewPage() {
  return (
    <div>
      <NewHero />
      {/* Add more sections */}
    </div>
  );
}

export default NewPage;
```

### Adding a New Section Component

Create a new file in the appropriate PageComponents folder:

```javascript
// src/components/PageComponents/Home/NewSection.jsx
import React from "react";

function NewSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">Section Title</h2>
        {/* Section content */}
      </div>
    </section>
  );
}

export default NewSection;
```

### Using UI Components

The project includes pre-built UI components:

```javascript
// Buttons
import PrimaryCTA from '@/components/ui/PrimaryCTA';
import SecondaryCTA from '@/components/ui/SecondaryCTA';
import { Button } from '@/components/ui/button';

// Usage
<PrimaryCTA to="/programs">Explore Programs</PrimaryCTA>
<SecondaryCTA to="/about">Learn More</SecondaryCTA>
<Button variant="outline">Click Me</Button>
```

```javascript
// Accordion
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

// Usage
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

```javascript
// Carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

// Usage
<Carousel>
  <CarouselContent>
    <CarouselItem>Item 1</CarouselItem>
    <CarouselItem>Item 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Using Icons

The project uses Lucide React for icons:

```javascript
import { Brain, BookOpen, Users, Mail } from 'lucide-react';

// Usage
<Brain className="w-6 h-6 text-blue-600" />
<Mail size={20} />
```

Browse all icons at: https://lucide.dev/icons/

### Styling with Tailwind

The project uses Tailwind CSS for styling:

```javascript
// Common patterns
<div className="container mx-auto px-4">              // Container
<div className="py-20 bg-white">                      // Section spacing
<h2 className="text-4xl font-bold mb-6">              // Heading
<p className="text-gray-600">                         // Body text
<div className="grid grid-cols-1 md:grid-cols-2">    // Responsive grid
```

### Path Aliases

Use `@/` prefix for cleaner imports:

```javascript
// Instead of: import Button from '../../components/ui/button'
import { Button } from '@/components/ui/button';

// Available aliases:
// @/components
// @/lib
// @/hooks
// @/pages
```

## Customization

### Changing Colors

Edit `src/index.css` to modify the color scheme:

```css
:root {
  --primary: oklch(0.205 0 0);           /* Primary color */
  --secondary: oklch(0.97 0 0);          /* Secondary color */
  /* ... other colors */
}
```

### Adding Fonts

Add font links to `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet" />
```

Then update `src/index.css`:

```css
:root {
  font-family: "YourFont", system-ui, sans-serif;
}
```

### Modifying Navigation

Edit `src/components/layout/Header/Header.jsx`:

```javascript
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  // Add your links here
];
```

## Building for Production

### Build the Project

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

View the production build locally before deploying.

## Deployment

### Deploy to Netlify

The project is pre-configured for Netlify:

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository to Netlify
3. Netlify will automatically use settings from `netlify.toml`
4. Build command: `npm run build`
5. Publish directory: `dist`

### Other Hosting Options

- **Vercel**: Works out of the box
- **GitHub Pages**: Requires additional configuration
- **Traditional Hosting**: Upload `dist` folder contents

## Common Tasks

### Adding a New Shadcn Component

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

### Running Linter

```bash
npm run lint
```

Fix linting issues automatically (when possible):
```bash
npm run lint -- --fix
```

## Troubleshooting

### Port Already in Use

If port 5173 is busy, Vite will automatically use the next available port. Check the terminal output for the correct URL.

### Module Not Found

Make sure you've installed dependencies:
```bash
npm install
```

### Path Alias Not Working

Ensure `jsconfig.json` is properly configured and restart your IDE.

### Styling Not Applied

Make sure Tailwind is running. It should be included via the Vite plugin. Try:
```bash
npm run dev
```

## Next Steps

1. **Customize Content**: Update text, images, and content in component files
2. **Add Images**: Place images in `src/assets/images/`
3. **Create Backend**: Add API integration in `src/services/`
4. **Add Features**: Implement authentication, forms, etc.
5. **Optimize SEO**: Add meta tags, sitemap, robots.txt
6. **Add Analytics**: Integrate Google Analytics or similar

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [GSAP](https://greensock.com/gsap/)
- [Shadcn UI](https://ui.shadcn.com/)

## Support

For questions or issues with the project structure, refer to:
- `PROJECT_STRUCTURE.md` - Detailed architecture documentation
- `README.md` - General project information

Happy coding! 🚀

