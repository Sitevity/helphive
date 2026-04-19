# TukTukIndia - Vehicle Rental & Local Experiences Marketplace

A production-ready web application inspired by TukTukRental.com, combining vehicle rental (tuk-tuks, scooters, bikes) with local experiences marketplace and gamified driver tournaments.

## Features

### Core Features
- **Vehicle Rental System**: Browse, search, and book tuk-tuks, scooters, and bikes
- **Local Experiences**: Book tours and experiences with local guides
- **Booking Engine**: Complete booking flow with date selection, pricing, and payment
- **Tournament System**: Weekly driver competitions with leaderboards and rewards
- **Chat System**: Real-time messaging between users and hosts/guides
- **Rating & Reviews**: Comprehensive review system with photos
- **Admin Dashboard**: Manage listings, users, and platform analytics

### Technical Stack
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Payments**: Razorpay integration
- **Deployment**: Vercel

## Project Structure

```
tuktukindia/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (main)/            # Public pages
│   │   ├── dashboard/         # User/Host/Admin dashboards
│   │   ├── host/              # Host onboarding
│   │   ├── guide/             # Guide onboarding
│   │   ├── api/               # API routes
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── vehicles/          # Vehicle-specific components
│   │   ├── experiences/        # Experience components
│   │   ├── booking/           # Booking components
│   │   ├── tournament/         # Tournament components
│   │   ├── chat/              # Chat components
│   │   ├── admin/             # Admin components
│   │   └── layout/            # Header, Footer, etc.
│   ├── contexts/              # React contexts (Auth, etc.)
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilities, Firebase config
│   ├── services/              # Business logic services
│   ├── types/                 # TypeScript interfaces
│   └── constants/             # App constants
├── public/                    # Static assets
├── firestore.rules           # Firestore security rules
├── storage.rules              # Storage security rules
└── .env.example              # Environment variables template
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project
- Razorpay account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd tuktukindia
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. **Set up Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Create Storage bucket
   - Deploy Firestore rules from `firestore.rules`
   - Deploy Storage rules from `storage.rules`

5. **Set up Razorpay**
   - Create a Razorpay account at https://razorpay.com
   - Get your API keys from Dashboard > Settings > API Keys
   - Configure webhook URL for production

6. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Configure Firebase**
   - Update authorized domains in Firebase Console
   - Add Vercel domain to authorized domains

### Firestore Setup for Production

1. Deploy rules:
```bash
firebase deploy --only firestore:rules
```

2. Create indexes (in Firebase Console or via CLI):
```bash
firebase firestore:indexes
```

## Database Schema

### Collections

- **users**: User profiles with role-based access
- **vehicles**: Vehicle listings
- **experiences**: Experience/tour listings
- **bookings**: All bookings (vehicles & experiences)
- **reviews**: Reviews for vehicles and experiences
- **tournaments**: Tournament configurations
- **chats**: Chat conversations
- **notifications**: User notifications

See `SPEC.md` for detailed schema documentation.

## API Routes

| Endpoint | Method | Purpose |
|---------|--------|---------|
| `/api/payments/create-order` | POST | Create Razorpay order |
| `/api/payments/verify` | POST | Verify payment signature |
| `/api/payments/webhook` | POST | Handle Razorpay webhooks |

## Security

- Firebase Authentication required for all authenticated actions
- Firestore security rules enforce access control
- Input validation using Zod schemas
- Server-side payment verification
- XSS protection via React's built-in escaping

## License

MIT License - feel free to use for your own projects.

## Contributing

Contributions are welcome! Please read the contribution guidelines before submitting PRs.
