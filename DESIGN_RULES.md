# 📘 NSG Solutions: Global UI/UX Design System (v1.0)
*This is the official rulebook for frontend development. To ensure the website maintains a premium Fortune 500 aesthetic (like Accenture, TCS, or Infosys), you **MUST** strictly follow these rules.*

### 1. Typography & Hierarchy 🔤
*   **Large Headings (H1, H2, H3):** You must use our custom font class `font-infosys-heading`.
*   **Body Text:** Use standard `font-sans` with high line-height (`leading-[1.6]`).
*   **Tiny Labels/Badges:** All category tags and subheaders must be tiny, uppercase, and widely spaced (`text-[10px] uppercase font-bold tracking-[0.2em]`).

### 2. Official Color Palette 🎨
*   **Backgrounds:** `bg-[#0a0f16]` or `bg-[#111]` (Premium Dark Mode), and `bg-[#f5f7fa]` (Light Neutral). Never use pure `#000`.
*   **Brand Blues:** `text-[#007cc3]` and `bg-[#007cc3]` (Primary Action), `#5bb8e4` (Highlight), `#1e3a8a` (Deep Corporate Navy).
*   **Special Cards Only:** Vibrant Red (`#e5002b`) and Deep Purple (`#610082`).

### 3. Spacing System (Critical) 📏
*Never use random padding or margins.*
*   **Section Padding:** Use `py-24` or `py-28` for desktop, `py-16` for tablet, and `py-10` for mobile.
*   **Internal Gaps:** Use `gap-6` (small grids), `gap-8` (standard layouts), `gap-12` (large splits).

### 4. Responsiveness Rules 📱
*All components MUST be responsive out of the box using Tailwind breakpoints (`sm`, `md`, `lg`).*
*   **Typography Scaling:** Headings must scale down on smaller screens (e.g., `text-[2rem] md:text-[3rem] lg:text-[4rem]`).
*   **Grid Collapse:** Multi-column grids must break down safely (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

### 5. Button System 🔘
*Do not invent new button styles.*
*   **Primary Button:** `bg-[#007cc3] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-white hover:text-[#111] transition-all`
*   **Secondary/Outline Button:** `border-[2px] border-white/30 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[12px] hover:border-white hover:bg-white/10 transition-all`

### 6. Icon System 🧩
*   Use **only** `lucide-react`. Do not mix in FontAwesome or HeroIcons.
*   Align icons with text using flexbox: `flex items-center gap-2`.

### 7. Image Guidelines 🖼️
*   Use HD images only.
*   Always apply `object-cover`.
*   If text is placed on an image, you **must** use a dark gradient overlay: `<div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>`.

### 8. Interactive Hover Effects ✨
*   *Image Scale:* Any card with a background image MUST slowly zoom when hovered (`group-hover:scale-110 transition-transform duration-[1.5s] ease-out`).
*   *Lift Effect:* Standard cards should lift slightly when hovered (`hover:-translate-y-2 hover:shadow-xl transition-all duration-500`).

### 9. Scroll Animations 🎬
*   Elements must smoothly float up when scrolled into view. Wrap sections in:
    `<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>`

### 10. Code Structure (Team Safety) 🧑‍💻
*   **Rule 1:** You only work in your assigned component folder (e.g., `src/components/reviews/`).
*   **Rule 2:** Do not modify `App.jsx`, `Navbar.jsx`, or global styles without the Project Manager's direct approval.

### 11. Official Core Modules (MNC Tech Stack) 📦
*To prevent developers from installing random, unsafe, or slow libraries, you are **only** allowed to use the following approved enterprise modules:*
*   **Core:** `vite`, `react-router-dom`
*   **Styling:** `tailwindcss`, `lucide-react`
*   **Motion:** `framer-motion`, `gsap`, `@studio-freight/react-lenis`
*   **Forms (Admin ONLY unless specified):** `react-hook-form`, `zod`
*   *(Rule: If you need a new library, request approval from the Project Manager first!)*
