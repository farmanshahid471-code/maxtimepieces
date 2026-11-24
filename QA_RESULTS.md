# QA RESULTS: FUNCTIONAL, ACCESSIBILITY & REGRESSION AUDIT

**Target Domain:** `https://maxtimepieces.com`  
**Audit Date:** 2026-11-24  
**Tested Viewports:** Mobile (360px, 375px, 390px, 430px), Tablet (768px), Desktop (1024px, 1280px, 1440px, 1920px)  

---

## 1. Route Verification & HTTP Status Audit

| Route | Expected Status | Result Status | Test Outcome |
| :--- | :--- | :--- | :--- |
| `/` (Homepage) | 200 OK | 200 OK | **PASSED** |
| `/collections/` (All Collections) | 200 OK | 200 OK | **PASSED** |
| `/collections/rolex/` | 200 OK | 200 OK | **PASSED** |
| `/collections/audemars-piguet/` | 200 OK | 200 OK | **PASSED** |
| `/collections/patek-philippe/` | 200 OK | 200 OK | **PASSED** |
| `/collections/richard-mille/` | 200 OK | 200 OK | **PASSED** |
| `/collections/cartier/` | 200 OK | 200 OK | **PASSED** |
| `/collections/omega/` | 200 OK | 200 OK | **PASSED** |
| `/shipping/` (Shipping Policy) | 200 OK | 200 OK | **PASSED (Restored)** |
| `/privacy/` (Privacy Policy) | 200 OK | 200 OK | **PASSED (Restored)** |
| `/terms/` (Terms & Conditions) | 200 OK | 200 OK | **PASSED (Restored)** |
| `/ip-notice/` (IP Notice) | 200 OK | 200 OK | **PASSED (Restored)** |
| `/about/` (About Us) | 200 OK | 200 OK | **PASSED** |
| `/faq/` (FAQ) | 200 OK | 200 OK | **PASSED** |
| `/contact/` (Contact Page) | 200 OK | 200 OK | **PASSED** |
| `/reviews/` (Reviews) | 200 OK | 200 OK | **PASSED** |
| `/custom/` (Custom Watches) | 200 OK | 200 OK | **PASSED** |
| `/journal/` (Journal) | 200 OK | 200 OK | **PASSED** |
| `/blog/best-super-clone-watches-2025/` | 200 OK | 200 OK | **PASSED (Restored)** |
| `/blog/super-clone-vs-original-rolex/` | 200 OK | 200 OK | **PASSED (Restored)** |
| `/blog/what-is-a-super-clone-watch/` | 200 OK | 200 OK | **PASSED (Restored)** |
| `/compare/clean-factory-vs-vs-factory/` | 200 OK | 200 OK | **PASSED** |
| `/calibers/rolex-clone-movements-guide/` | 200 OK | 200 OK | **PASSED** |
| `/compare/super-clone-vs-genuine-rolex-submariner/` | 200 OK | 200 OK | **PASSED** |
| `/tools/caliber-guide/` | 200 OK | 200 OK | **PASSED** |
| `/404.html` | 200 OK | 200 OK | **PASSED (Upgraded)** |

---

## 2. Interactive Feature & Regression Testing

### A. Floating WhatsApp Widget
- **Launcher Rendering:** Fixed 24px from bottom-right; scales subtly on hover; displays tooltip "Chat with us".
- **Modal Popup:** Toggles visible state on click without page jumping or layout shift.
- **Escape Key Handling:** Pressing `Escape` closes the modal immediately and restores focus to trigger button (**PASSED**).
- **Outside Click:** Clicking outside the popup closes the window smoothly (**PASSED**).
- **Quick Actions:** All 4 action links correctly format URL parameters with encoded strings pointing to `https://wa.me/15716614938?text=...` (**PASSED**).
- **Mobile Viewport (360px–430px):** Modal bounds to screen width (340px) without horizontal scrolling (**PASSED**).

### B. Contact Information Audit
- **Old Number Presence:** `Select-String` search for `+1 (832) 263-0120` or `18322630120` returns **0 occurrences** across all HTML files (**PASSED**).
- **Canonical Number:** `+1 (571) 661-4938` is universally linked via `https://wa.me/15716614938` (**PASSED**).

### C. External Image Dependency Elimination
- **Search for Third-Party Domains:** `pyluxury.com`, `clonewatches.is`, `superluxuriousreps.com` return **0 occurrences** across all HTML and JSON files (**PASSED**).
- **Broken Images:** 0 broken image requests observed; all fallbacks routed to local high-resolution assets (**PASSED**).

### D. Product Specification Corrections
- **AP 15500OR:** Verified title contains no `Gained Weight 168g 41mm`; single thickness specification rendered (**PASSED**).
- **Patek 5980R:** Verified single thickness specification; full chronograph functions present (**PASSED**).
- **FAQ Tolerances:** Weight tolerance stated in grams (±2g), case dimensions in millimeters (±0.05mm) (**PASSED**).

---

## 3. Accessibility & Performance Review

- **Semantic Outline:** Single `<h1>` per route; sequential `<h2>` -> `<h3>` cascade.
- **ARIA Implementation:** `aria-label`, `aria-haspopup="dialog"`, `aria-expanded="false"`, `role="dialog"`, `aria-modal="true"` configured on the chat widget.
- **Color Contrast:** Deep charcoal text (`#0F0E0C`) on warm ivory (`#F5F2EA`) and crisp white surfaces meets WCAG 2.2 AA standards (> 7:1 contrast ratio).
- **Font Loading:** Local Bebas Neue WOFF2 preloaded in `<head>`; Fontshare Satoshi preconnected.
