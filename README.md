# Network Nexus

Build a responsive web application authentication page for an "AI-Powered Criminal Network Analysis System" developed for the National Crime Records Bureau (NCRB), Ministry of Home Affairs — a platform that helps investigators uncover hidden relationships in criminal networks using AI, ML, NLP, and Graph Analytics by processing data from FIRs, CDRs, financial records, surveillance reports, social media intelligence, and criminal history databases.

Create the initial landing/auth page with the following exact requirements:

OVERALL LAYOUT:

- Centered card/panel on a professional, secure government-style background (dark navy/blue tones).

- An official police/department shield logo at the top of the card.

- App title: "AI-Powered Criminal Network Analysis System", subtitle: "National Crime Records Bureau".

LOGIN VIEW (default):

- Fields: Username, Password (with show/hide toggle).

- "Login" button (primary).

- "OR" divider, then a "Login with Google" (Gmail OAuth) button.

- Links: "Forgot Username?" and "Forgot Password?".

- "Don't have an account? Sign Up" link that toggles to the Signup view.

SIGNUP VIEW (toggled, no page reload):

- Fields: Full Name, Username, Email, Password, Confirm Password.

- "Sign Up" button.

- "Sign Up with Google" option.

- "Already have an account? Login" link back to Login view.

FORGOT USERNAME / FORGOT PASSWORD FLOW:

- Small modal/form for Forgot Password: enter registered email → send reset link.

- Small modal/form for Forgot Username: enter registered email → send username reminder.

UX/DESIGN:

- Smooth client-side toggle between Login/Signup (no reload).

- Form validation: required fields, valid email format, password strength indicator, confirm-password match check.

- Minimal, official, secure aesthetic — shield/badge iconography, navy/gold/white color scheme, avoid playful colors.

- Fully responsive for mobile and desktop.

TECH STACK:

- Frontend: React with Tailwind CSS.

- Auth: Supabase Auth (email/password + Google OAuth provider).

- Backend (for later integration): Supabase, to eventually connect to the AI-based criminal network analysis engine.

Generate clean, well-structured, production-ready code for this page.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/136996e5-0466-4460-a0e7-406af87a951d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
