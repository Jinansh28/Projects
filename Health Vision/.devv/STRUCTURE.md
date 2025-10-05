# Health Vision - AI Dermatological Screening Platform

## Project Description
Health Vision is an AI-powered dermatological screening platform designed specifically for Kota's student community. It provides instant, preliminary skin condition analysis to promote early health awareness and encourage preventive healthcare practices among students who often neglect personal health due to academic pressures.

## Key Features
- Complete email OTP authentication system
- AI-powered skin condition analysis with confidence scoring  
- Image upload with drag-and-drop and file selection
- Medical-grade UI design with trust-focused styling
- Comprehensive analysis results with recommendations
- Medical disclaimers and safety information
- Mobile-responsive design optimized for students
- Secure image processing with privacy protection

## Data Storage
Tables: No database tables created yet (Phase 1 uses local processing)
Local: Authentication state persisted via Zustand

## Devv SDK Integration
Built-in: Authentication system, File upload for image processing, Image generation SDK (for future AI model integration)
External: None (using simulated analysis for MVP, ready for real AI model integration)

## Special Requirements
- Medical-grade trust and professionalism in design
- Privacy-first approach with no permanent image storage
- Student-focused UX optimized for mobile usage
- Clear medical disclaimers throughout application
- Accessibility compliance (WCAG AA standards)

## File Structure

/src
├── components/          # Core UI components
│   ├── ui/             # Pre-installed shadcn/ui components
│   ├── AuthModal.tsx   # Email OTP authentication modal
│   ├── Header.tsx      # Main navigation with auth status
│   └── SkinAnalyzer.tsx # Core skin analysis component with image upload
│
├── pages/              # Page components
│   ├── HomePage.tsx    # Complete landing and analysis page
│   └── NotFoundPage.tsx # 404 error page
│
├── store/              # Zustand state management
│   └── auth-store.ts   # Authentication state with persistence
│
├── hooks/              # Custom Hooks directory
│   ├── use-mobile.ts   # Mobile detection Hook
│   └── use-toast.ts    # Toast notification system Hook
│
├── lib/                # Utility library directory
│   └── utils.ts        # Utility functions, including cn function
│
├── App.tsx             # Root component with React Router
├── main.tsx            # Application entry point
└── index.css           # Medical design system with healthcare colors