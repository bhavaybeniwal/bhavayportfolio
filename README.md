# 🚀 Bhavay Beniwal — Personal Portfolio Website

A modern, responsive, animated single-page portfolio built for **Bhavay Beniwal**, 1st-year B.Tech Computer Science & Engineering student at **JECRC University, Jaipur**.

Crafted using **pure HTML5, CSS3, and Vanilla JavaScript** with a modern **dark glassmorphism** design, electric gradient accents, responsive mobile navigation, and interactive animations.

---

## 🌟 Features Included

- **Dark Glassmorphism UI**: Deep navy background (`#0b0f1a`), frosted glass cards (`backdrop-filter: blur`), and vibrant gradient accents (Electric Blue → Purple → Cyan).
- **Light / Dark Mode Toggle**: Built-in switcher with automatic saving to `localStorage`.
- **Dynamic Hero Section**:
  - Live typing effect cycling through: *"B.Tech CSE Student"*, *"C & Python Learner"*, *"Future Software Engineer"*.
  - Animated floating gradient ring around the avatar.
  - Floating tech chips (`#include <stdio.h>` and `print("Hello!")`).
- **Interactive Cursor Glow**: Subtle dual-glow follower tracking mouse movements on desktop.
- **Scroll Progress & Back to Top**: Real-time gradient progress bar at the top with a smooth "Back to Top" floating button.
- **Animated Skill Progress**: Progress bars automatically fill when scrolled into view using `IntersectionObserver`.
- **Working Contact Section**:
  - Direct email with a one-click **Copy to Clipboard** button & tooltip.
  - Interactive glass form with validation that automatically pre-fills your email client via `mailto:beniwaljaat118@gmail.com`.
- **Responsive Mobile First**: Smooth hamburger menu navigation for phones and tablets.
- **Zero Build Step**: Runs directly in any web browser without Node.js, npm, or bundlers.

---

## 📂 Project Structure

```text
bhavay-portfolio/
├── index.html       # Semantic HTML5 layout containing all 8 sections
├── style.css        # Custom CSS variables, glassmorphic styling, keyframe animations & media queries
├── script.js        # Vanilla JS interactions, typing effect, preloader, theme toggle, form & copy logic
└── README.md        # Customization guide & deployment walkthrough
```

---

## ✏️ How to Customize

### 1. Replacing the Profile Photo
In `index.html` inside the `<div class="avatar-card glass-card">` section:
1. Copy your portrait image (e.g. `profile.jpg` or `profile.png`) into this project folder.
2. Replace the `<svg class="avatar-svg" ...> ... </svg>` block with:
   ```html
   <img src="profile.jpg" alt="Bhavay Beniwal" class="avatar-svg" style="object-fit: cover;">
   ```

### 2. Updating Your Social Links
Search for `https://github.com` and `https://linkedin.com` in `index.html` and replace them with your actual profiles:
- **GitHub**: Replace `href="https://github.com"` with `href="https://github.com/your-username"`
- **LinkedIn**: Replace `href="https://linkedin.com"` with `href="https://linkedin.com/in/your-username"`

### 3. Updating Education (10th & 12th Details)
Locate the `<section id="education">` section in `index.html`:
- Replace `[Add Your School Name, City / State]` with your actual high school name.
- Update the Board (CBSE / State Board / ICSE) and your percentage or GPA.

### 4. Adding Real GitHub Repositories to Projects
Locate the `<section id="projects">` section in `index.html`:
- Find each project card's `<a href="https://github.com" ...>` button.
- Replace `https://github.com` with the direct link to your C or Python repository (e.g. `https://github.com/beniwaljaat118/simple-calculator-c`).

### 5. Adding Certificates as You Earn Them
Locate the `<section id="certifications">` section in `index.html`:
- Update `[Add Your Certificate Here]` with your certificate title (e.g., *NPTEL Programming in C*, *Coursera Python for Everybody*).
- Update the issuer name and add an external credential verification URL.

---

## 📝 Complete Checklist of Placeholders to Replace

| # | Section | Placeholder | What to Replace With |
|---|---|---|---|
| 1 | **Hero & Footer** | GitHub Profile Link (`https://github.com`) | Your actual GitHub profile URL |
| 2 | **Hero & Footer** | LinkedIn Profile Link (`https://linkedin.com`) | Your actual LinkedIn profile URL |
| 3 | **Hero** | Avatar SVG illustration | Your real photo (`profile.jpg`) |
| 4 | **Education** | 12th Grade School Name & Marks | Your 12th school name, year & percentage |
| 5 | **Education** | 10th Grade School Name & Marks | Your 10th school name, year & percentage |
| 6 | **Projects** | Project Source Code Links | Direct links to your GitHub repositories for your C & Python programs |
| 7 | **Certifications** | Milestone Card #1 | First course / certificate you complete |
| 8 | **Certifications** | Milestone Card #2 | Workshop / college hackathon participation |

---

## 🌐 Free Deployment Guide

### Option 1: GitHub Pages (Recommended — 100% Free)
1. Initialize Git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```
2. Create a new repository on [GitHub](https://github.com) named `portfolio` or `bhavay-portfolio`.
3. Link and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **Settings** > **Pages** in your GitHub repository.
5. Under **Branch**, select `main` and root `/`, then click **Save**.
6. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`!

### Option 2: Netlify (Drag-and-Drop — 1-Minute Setup)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop this entire `bhavay portfolio` folder onto the page.
3. Netlify will deploy it instantly and provide a free live URL (e.g., `https://bhavay-beniwal.netlify.app`).

---

## 💡 Tech Stack Credits
- Fonts: [Poppins](https://fonts.google.com/specimen/Poppins) & [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Icons: [Font Awesome 6](https://fontawesome.com/)
- Typing Effect: [Typed.js](https://github.com/mattboldt/typed.js/)
- Scroll Animations: [AOS](https://michalsnik.github.io/aos/)

© 2026 Bhavay Beniwal. Crafted for an engineering journey.
