# KNOWN ISSUES & OWNER VERIFICATION ITEMS

**Project:** Max Timepieces Website  
**Domain:** `https://maxtimepieces.com`  
**Report Date:** 2026-11-24  

---

This document transparently records items that were cleaned or made factually conservative during the engineering overhaul, and which require specific business verification or credentials from the site owner:

### 1. External Third-Party Review Profile (Trustpilot / Sitejabber)
- **Status:** Unverified / Removed Claim.
- **Affected Page:** `/reviews/`, `/about/`.
- **Details:** The site previously displayed generic "500+ verified customer reviews" and "Trustpilot 4.9/5" rating badges. Because no live, public Trustpilot API or direct business profile URL was supplied, all unverified badge graphics and unverified review counters have been removed to prevent deceptive claims.
- **Action Required by Owner:** If Max Timepieces owns an active Trustpilot or Sitejabber profile, provide the verified profile URL to link directly to external customer feedback.

### 2. Legal Entity Name & Registered Physical Address
- **Status:** Factually Conservative / Omitted.
- **Affected Page:** `/privacy/`, `/terms/`, `/ip-notice/`.
- **Details:** In accordance with the project guidelines, no fictional corporate registration numbers or fake physical addresses were invented. The legal documents currently identify the service under its brand name "Max Timepieces" and provide direct electronic communication via WhatsApp (+1 571 661 4938) and the official contact form.
- **Action Required by Owner:** If a registered corporate entity name (e.g., LLC) and official registered agent address are to be listed, provide these verified details for inclusion in the Privacy Policy and Terms.

### 3. Contact Form Backend Handler
- **Status:** Client-side Form Active with WhatsApp Fallback.
- **Affected Page:** `/contact/`.
- **Details:** The primary customer communication channel is direct WhatsApp messaging (`+1 571 661 4938`), which functions 100% reliably. The contact page form provides client-side validation and opens the WhatsApp concierge with the pre-filled message if an SMTP server or external transactional email service (e.g., SendGrid, Postmark) is not configured in WordPress.
- **Action Required by Owner:** If an automated email ticketing backend is desired, provide SMTP or API credentials to bind the form directly to a corporate email inbox.
