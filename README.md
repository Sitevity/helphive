# Helphive - Community Help & Services Platform

A production-ready web application for community-powered help and services, connecting people who need assistance with local helpers, service providers, and community resources.

## Features

### Core Features

- **Service Marketplace**: Browse and book local services (repairs, cleaning, delivery, tutoring, etc.)
- **Help Requests**: Post help requests and connect with community members
- **User Roles**: Multiple user types - seekers, helpers, and admins
- **Real-time Chat**: Direct messaging between users for coordination
- **Reviews & Ratings**: Build trust with verified reviews and ratings
- **Admin Dashboard**: Platform management, user approval, and analytics
- **Cities & Locations**: Browse services by city with local providers
- **Safety & Trust**: Safety guidelines, verification badges, and community standards
- **Corporate Services**: Enterprise offerings for business clients
- **Rewards System**: Loyalty points and rewards for active community members
- **Pass System**: Subscription passes for regular users

### Technical Stack

- **Frontend**: Next.js 16+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Payments**: Razorpay integration
- **Deployment**: Vercel

## Project Structure

```
helphive/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages (login, register, forgot-password, reset-password)
│   │   ├── explore/           # Service exploration (vehicles, experiences)
│   │   ├── dashboard/         # User dashboards (user, host, guide, admin)
│   │   ├── host/              # Host onboarding and vehicle management
│   │   ├── guide/             # Guide onboarding
│   │   ├── admin/             # Admin panel
│   │   ├── cities/            # City-based services
│   │   ├── chat/              # Real-time chat
│   │   ├── tournament/        # Gamification & leaderboards
│   │   ├── rewards/           # Rewards & loyalty
│   │   ├── safety/            # Safety guidelines
│   │   ├── pass/              # Subscription passes
│   │   ├── corporate-events/  # Corporate services
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication APIs
│   │   │   ├── bookings/      # Booking APIs
│   │   │   ├── payments/      # Payment APIs
│   │   │   ├── guides/        # Guide APIs
│   │   │   └── tournaments/   # Tournament APIs
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Base UI components (Button, Input, Card, Modal, etc.)
│   │   ├── vehicles/          # Vehicle/service listing cards
│   │   ├── experiences/       # Experience components
│   │   ├── booking/           # Booking components
│   │   ├── tournament/        # Tournament components
│   │   ├── chat/              # Chat components
│   │   ├── admin/             # Admin components
│   │   ├── forms/             # Form components
│   │   └── layout/             # Layout components (Header, Footer)
│   ├── contexts/              # React contexts (Auth, Theme, etc.)
│   ├── hooks/                 # Custom React hooks
│   ├── lib/
│   │   ├── firebase.ts        # Firebase configuration
│   │   ├── razorpay.ts        # Razorpay configuration
│   │   └── utils.ts           # Utility functions
│   ├── services/
│   │   ├── auth.service.ts    # Authentication service
│   │   ├── vehicle.service.ts  # Vehicle/service operations
│   │   ├── booking.service.ts  # Booking management
│   │   ├── experience.service.ts # Experience management
│   │   ├── tournament.service.ts # Tournament system
│   │   ├── chat.service.ts    # Real-time chat
│   │   ├── payment.service.ts  # Payment processing
│   │   └── review.service.ts   # Reviews & ratings
│   ├── types/                 # TypeScript interfaces
│   └── constants/              # App constants
├── public/                    # Static assets
├── firestore.rules           # Firestore security rules
├── storage.rules             # Storage security rules
├── SPEC.md                    # Detailed specifications
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
git clone https://github.com/Sitevity/helphive.git
cd helphive
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
   - Enable Authentication (Email/Password or Email Link)
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

## Pages Overview

### Public Pages
- `/` - Landing page
- `/explore/vehicles` - Browse services
- `/explore/experiences` - Browse experiences
- `/cities` - City listing
- `/cities/[slug]` - City details
- `/corporate-events` - Enterprise services
- `/safety` - Safety guidelines
- `/rewards` - Rewards program
- `/pass` - Subscription passes
- `/tournament` - Tournaments & leaderboards

### Authentication
- `/auth/login` - User login
- `/auth/register` - User registration
- `/auth/forgot-password` - Password recovery
- `/auth/reset-password` - Password reset

### Dashboards
- `/dashboard/user` - User dashboard
- `/dashboard/host` - Host dashboard
- `/dashboard/guide` - Guide dashboard
- `/dashboard/admin` - Admin dashboard
- `/admin` - Admin panel

### Onboarding
- `/host/onboarding` - Host registration flow

### Other
- `/chat` - Real-time messaging

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git remote add origin https://github.com/Sitevity/helphive.git
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

- **users**: User profiles with role-based access (user, host, guide, admin)
- **vehicles**: Service listings
- **experiences**: Experience/tour listings
- **bookings**: All bookings (services & experiences)
- **reviews**: Reviews for services and experiences
- **tournaments**: Tournament configurations
- **chats**: Chat conversations
- **notifications**: User notifications

See `SPEC.md` for detailed schema documentation.

## API Routes

| Endpoint | Method | Purpose |
|---------|--------|---------|
| `/api/auth/send-otp` | POST | Send OTP to email |
| `/api/auth/verify-otp` | POST | Verify OTP |
| `/api/auth/forgot-password` | POST | Forgot password |
| `/api/bookings` | POST | Create booking |
| `/api/bookings/[id]` | GET/PATCH | Get/update booking |
| `/api/payments/create-order` | POST | Create Razorpay order |
| `/api/payments/verify` | POST | Verify payment signature |
| `/api/payments/webhook` | POST | Handle webhooks |
| `/api/tournaments/leaderboard` | GET | Get leaderboard |

## Security

- Firebase Authentication required for all authenticated actions
- Firestore security rules enforce access control
- Input validation using Zod schemas
- Server-side payment verification
- XSS protection via React's built-in escaping

## User Roles

| Role | Permissions |
|------|-------------|
| `user` | Browse, book, review |
| `host` | List services, manage bookings, view earnings |
| `guide` | List experiences, manage tours |
| `admin` | Approve hosts/guides, platform management, analytics |

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Auth**: Firebase Auth
- **Storage**: Firebase Storage
- **Payments**: Razorpay
- **Icons**: Lucide React
- **Deployment**: Vercel

## License

MIT License - feel free to use for your own projects.

## Contributing

Contributions are welcome! Please read the contribution guidelines before submitting PRs.

## Support

For questions or support, please open an issue on GitHub.
