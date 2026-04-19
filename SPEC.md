# TukTukIndia - Vehicle Rental & Experience Marketplace

## 1. Concept & Vision

TukTukIndia is a vibrant, community-driven marketplace connecting travelers with local vehicle owners (tuk-tuks, scooters, bikes) and experiential guides. The platform celebrates the chaotic charm of Indian streets while providing a safe, modern booking experience. Think Airbnb meets Uber for India's iconic three-wheelers, with a gamified twist through driver tournaments.

**Personality**: Warm, energetic, trustworthy — like a helpful local friend who speaks both the tourist language and the street lingo.

---

## 2. Design Language

### Aesthetic Direction
**"Modern India"** — Clean interfaces with pops of Indian color. Inspired by Airbnb's usability with OTP Buses' vibrant energy. Warm terracottas, saffron accents, and teal highlights against clean whites and soft grays.

### Color Palette
```css
--color-primary: #E85D04;      /* Saffron Orange - CTAs, highlights */
--color-secondary: #0A9396;    /* Teal - secondary actions, links */
--color-accent: #9D4EDD;       /* Purple - tournaments, gamification */
--color-success: #2D6A4F;      /* Forest Green - confirmations */
--color-warning: #E9C46A;      /* Mustard - warnings */
--color-error: #D62828;        /* Red - errors */
--color-background: #FEFAE0;   /* Cream - main background */
--color-surface: #FFFFFF;     /* White - cards, modals */
--color-text: #1B1B1B;         /* Near black - body text */
--color-text-muted: #6B7280;   /* Gray - secondary text */
```

### Typography
- **Headings**: `Poppins` (600, 700) — Modern, friendly, slightly rounded
- **Body**: `Inter` (400, 500) — Clean, highly readable
- **Accent/Hindi touches**: `Tiro Devanagari Hindi` for occasional Hindi phrases

### Spatial System
- Base unit: 4px
- Component padding: 16px (4 units)
- Section gaps: 64px (16 units)
- Card border-radius: 12px
- Button border-radius: 8px

### Motion Philosophy
- **Micro-interactions**: 150ms ease-out for hovers, button presses
- **Page transitions**: 300ms fade with slight Y-axis movement
- **Loading states**: Skeleton screens with shimmer animation (1.5s)
- **Success feedback**: Scale bounce (1.0 → 1.05 → 1.0) with checkmark

### Visual Assets
- **Icons**: Lucide React (consistent 24px stroke-width: 2)
- **Images**: Unsplash for hero/travel imagery, placeholder avatars
- **Decorative**: Subtle mandala patterns for Indian touches, geometric shapes

---

## 3. Layout & Structure

### Page Architecture

```
/ (Landing)
├── /auth
│   ├── /login (Email + OTP)
│   ├── /register
│   └── /forgot-password
├── /explore
│   ├── /vehicles (Marketplace)
│   │   └── /vehicles/[id]
│   └── /experiences
│       └── /experiences/[id]
├── /dashboard
│   ├── /user (Bookings, Favorites)
│   ├── /host (My Vehicles, Earnings)
│   ├── /guide (My Tours, Schedule)
│   └── /admin (Analytics, Approvals)
├── /host
│   ├── /onboarding (Multi-step)
│   └── /vehicles/new
├── /guide
│   └── /onboarding
└── /tournament
    ├── /leaderboard
    └── /challenges
```

### Responsive Strategy
- **Mobile-first**: Base styles for 375px+
- **Breakpoints**: 
  - `sm`: 640px (landscape phones)
  - `md`: 768px (tablets)
  - `lg`: 1024px (small laptops)
  - `xl`: 1280px (desktops)

### Visual Pacing
1. **Hero sections**: Full-viewport, high-impact imagery
2. **Feature grids**: 3-column on desktop, 2 on tablet, 1 on mobile
3. **Detail pages**: Left sidebar (filters/images) + Right content
4. **Forms**: Single-column, generous spacing, floating labels

---

## 4. Features & Interactions

### 4.1 Authentication System

**Email + OTP Login Flow**:
1. User enters email → "Send OTP" button
2. Firebase sends OTP to email
3. User enters 6-digit OTP → Verify button
4. On success: redirect to role-appropriate dashboard
5. On failure: shake animation, error message, retry option

**Role-Based Access**:
| Role | Permissions |
|------|-------------|
| `user` | Browse, book, review |
| `host` | + List vehicles, manage bookings, view earnings |
| `guide` | + List experiences, manage tours |
| `admin` | + Approve hosts/guides, analytics, platform management |

### 4.2 Vehicle Rental System

**Add Vehicle Flow** (Multi-step):
1. **Basic Info**: Type (tuk-tuk/scooter/bike), brand, model, year
2. **Photos**: Upload 5+ photos (drag-drop, reordering)
3. **Details**: Capacity, transmission, fuel type, features (checkboxes)
4. **Pricing**: Hourly rate, daily rate, minimum booking duration
5. **Location**: Pickup address with map picker
6. **Availability**: Default availability calendar
7. **Review & Submit**: Summary → Submit for admin approval

**Booking Flow**:
1. Select dates on calendar (unavailable dates grayed)
2. Select pickup/return times
3. View price breakdown (base + fees + taxes)
4. Apply coupon code (optional)
5. Enter trip details (destination, purpose)
6. Confirm & Pay

**Edge Cases**:
- Double-booking prevention: Real-time Firestore listeners
- Last-minute bookings: Minimum 2-hour buffer
- Long-term rentals: Weekly/monthly pricing tiers

### 4.3 Experience System

**Guide Onboarding**:
1. Personal info & bio (500 char limit)
2. Languages spoken (multi-select)
3. Experience categories (cultural, food, adventure, etc.)
4. Tour types offered
5. Pricing per person / per group
6. Availability calendar
7. ID verification upload

**Tour Booking**:
1. Select date from available slots
2. Select number of participants (max 8)
3. View meeting point on map
4. Confirm booking
5. Receive QR code for check-in

### 4.4 Booking Engine

**Booking States**:
```
pending → confirmed → in_progress → completed
    ↓         ↓            ↓           ↓
 cancelled  cancelled    cancelled   cancelled (after review)
```

**Payment Flow (Razorpay)**:
1. Create pending booking in Firestore
2. Initiate Razorpay order with booking amount
3. User completes payment on Razorpay modal
4. Webhook receives payment confirmation
5. Update booking status to `confirmed`
6. Send confirmation email/SMS

**Double-Booking Prevention**:
- Firestore transaction on booking creation
- Check availability before payment
- Real-time listener on vehicle availability

### 4.5 Tournament System

**Driver Metrics Tracked**:
- Total rides completed
- Average rating
- On-time percentage
- Distance covered
- Fuel efficiency

**Weekly Challenges**:
- "King of the Road" — Most rides in a week
- "5-Star Streak" — Highest average rating
- "Early Bird" — Most on-time pickups

**Rewards**:
- Bronze/Silver/Gold badges
- Platform fee discounts (10%/20%/30%)
- Featured listing placement
- Cash bonuses (₹500/₹1000/₹2000)

**Leaderboard UI**:
- Top 3 highlighted with medal icons
- Scrollable list with infinite loading
- Filter by: This Week / This Month / All Time
- Your rank always visible (sticky bottom bar on mobile)

### 4.6 Chat System

**Real-time Chat Features**:
- Text messages with timestamps
- Message read receipts
- Quick-reply templates ("Where are you?", "On my way")
- Image sharing (vehicle damage photos, location pins)

**Implementation**:
- Firestore subcollection: `chats/{chatId}/messages`
- Real-time listeners with `onSnapshot`
- Push notifications via Firebase Cloud Messaging

### 4.7 Rating & Review System

**Review Flow** (post-completion only):
1. Star rating (1-5) with half-star precision
2. Written review (min 20 chars)
3. Category ratings (for vehicles): Cleanliness, Condition, Communication
4. Photo uploads (optional)
5. "Would recommend" toggle

**Review Display**:
- Aggregate rating (4.8 ★) with breakdown bars
- Individual reviews with responder (host/guide) replies
- "Verified Booking" badge on authentic reviews

---

## 5. Component Inventory

### Core Components

| Component | States | Notes |
|-----------|--------|-------|
| `Button` | default, hover, active, disabled, loading | Primary/Secondary/Outline/Ghost variants |
| `Input` | default, focus, error, disabled, success | With floating label animation |
| `Select` | default, open, selected, error | Custom dropdown with search |
| `Card` | default, hover (lift), selected | Used for vehicles, experiences |
| `Avatar` | with-image, initials, placeholder | Sizes: sm/md/lg |
| `Badge` | info, success, warning, error | Role badges, status badges |
| `Modal` | default, full-screen (mobile) | Animated entrance/exit |
| `Calendar` | default, range-select, disabled dates | Availability picker |
| `MapPicker` | default, with-marker, address-search | Google Maps integration |
| `StarRating` | interactive, display-only | Half-star precision |
| `Skeleton` | card, list, text, image | Shimmer animation |
| `Toast` | success, error, info, warning | Auto-dismiss 5s |
| `EmptyState` | no-results, error, loading | Illustrated placeholders |
| `FileUpload` | default, dragging, uploading, complete | Progress bar |
| `OTPInput` | default, filled, error, success | Auto-advance on input |

### Page-Specific Components

| Component | Purpose |
|-----------|---------|
| `VehicleCard` | Marketplace listing with image, price, rating |
| `ExperienceCard` | Tour listing with date picker preview |
| `BookingCard` | Dashboard booking with status, actions |
| `HostOnboardingStep` | Multi-step form container with progress |
| `LeaderboardRow` | Tournament entry with rank, avatar, stats |
| `ChatBubble` | Message display with timestamp, read status |
| `ReviewCard` | Review display with stars, photos, response |
| `AdminApprovalCard` | Pending approval with approve/reject actions |
| `AnalyticsChart` | Recharts wrapper for admin dashboard |

---

## 6. Technical Architecture

### Folder Structure

```
tuktukindia/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── (main)/
│   │   │   ├── page.tsx        # Landing
│   │   │   ├── explore/
│   │   │   ├── vehicles/
│   │   │   ├── experiences/
│   │   │   └── tournament/
│   │   ├── dashboard/
│   │   │   ├── user/
│   │   │   ├── host/
│   │   │   ├── guide/
│   │   │   └── admin/
│   │   ├── host/
│   │   │   ├── onboarding/
│   │   │   └── vehicles/
│   │   ├── guide/
│   │   │   └── onboarding/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── bookings/
│   │   │   ├── payments/
│   │   │   └── webhooks/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # Base components
│   │   ├── forms/              # Form components
│   │   ├── vehicles/           # Vehicle-specific
│   │   ├── experiences/        # Experience-specific
│   │   ├── booking/            # Booking flows
│   │   ├── tournament/         # Gamification
│   │   ├── chat/               # Messaging
│   │   ├── admin/              # Admin panel
│   │   └── layout/             # Header, Footer, Sidebar
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   ├── firebase.ts         # Firebase config
│   │   ├── razorpay.ts         # Payment config
│   │   └── utils.ts            # Helpers
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── vehicle.service.ts
│   │   ├── booking.service.ts
│   │   ├── experience.service.ts
│   │   ├── tournament.service.ts
│   │   ├── chat.service.ts
│   │   └── payment.service.ts
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── BookingContext.tsx
│   │   └── ThemeContext.tsx
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── constants/
│       └── index.ts            # App constants
├── public/
│   ├── images/
│   └── icons/
├── firestore.rules
├── firestore.indexes.json
├── storage.rules
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Database Schema (Firestore)

#### `users` Collection
```typescript
interface User {
  id: string;
  email: string;
  phone?: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'host' | 'guide' | 'admin';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Role-specific
  hostProfile?: HostProfile;
  guideProfile?: GuideProfile;
  stats?: UserStats;
}

interface HostProfile {
  isApproved: boolean;
  vehicles: string[]; // Vehicle IDs
  totalEarnings: number;
  rating: number;
  responseRate: number;
}

interface GuideProfile {
  isApproved: boolean;
  tours: string[]; // Tour IDs
  languages: string[];
  categories: string[];
  bio: string;
  rating: number;
}

interface UserStats {
  totalRides: number;
  averageRating: number;
  onTimePercentage: number;
  distanceCovered: number;
  tournamentPoints: number;
}
```

#### `vehicles` Collection
```typescript
interface Vehicle {
  id: string;
  hostId: string;
  type: 'tuk-tuk' | 'scooter' | 'bike';
  brand: string;
  model: string;
  year: number;
  capacity: number;
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'electric' | 'cng';
  
  // Media
  images: string[];
  primaryImage: string;
  
  // Pricing
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  minimumDuration: number; // hours
  
  // Location
  address: string;
  city: string;
  state: string;
  pincode: string;
  coordinates: GeoPoint;
  
  // Features
  features: string[];
  
  // Availability
  availability: VehicleAvailability;
  
  // Status
  status: 'pending' | 'approved' | 'rejected' | 'inactive';
  isApproved: boolean;
  
  // Stats
  rating: number;
  totalBookings: number;
  totalReviews: number;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface VehicleAvailability {
  defaultAvailable: boolean;
  customSchedule?: {
    [date: string]: boolean;
  };
}
```

#### `bookings` Collection
```typescript
interface Booking {
  id: string;
  userId: string;
  hostId: string;
  
  // Booking type
  type: 'vehicle' | 'experience';
  vehicleId?: string;
  experienceId?: string;
  
  // Date/time
  startDate: Timestamp;
  endDate: Timestamp;
  
  // Pricing
  baseAmount: number;
  serviceFee: number;
  taxes: number;
  discount: number;
  totalAmount: number;
  currency: 'INR';
  
  // Status
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  
  // Payment
  paymentId?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  razorpayOrderId?: string;
  
  // Details
  pickupLocation?: string;
  returnLocation?: string;
  purpose?: string;
  participants?: number;
  
  // Reviews
  hasReview: boolean;
  reviewId?: string;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  confirmedAt?: Timestamp;
  completedAt?: Timestamp;
}
```

#### `reviews` Collection
```typescript
interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  revieweeId: string;
  vehicleId?: string;
  experienceId?: string;
  
  type: 'vehicle' | 'experience';
  
  // Ratings
  overallRating: number; // 1-5
  categoryRatings?: {
    cleanliness?: number;
    condition?: number;
    communication?: number;
    value?: number;
  };
  
  // Content
  text: string;
  images?: string[];
  wouldRecommend: boolean;
  
  // Response
  response?: {
    text: string;
    respondedAt: Timestamp;
  };
  
  // Verification
  isVerifiedBooking: boolean;
  
  createdAt: Timestamp;
}
```

#### `tournaments` Collection
```typescript
interface Tournament {
  id: string;
  name: string;
  description: string;
  type: 'weekly' | 'monthly' | 'special';
  
  startDate: Timestamp;
  endDate: Timestamp;
  
  status: 'upcoming' | 'active' | 'completed';
  
  challenges: Challenge[];
  
  rewards: {
    bronze: TournamentReward;
    silver: TournamentReward;
    gold: TournamentReward;
  };
  
  createdAt: Timestamp;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  metric: 'rides' | 'rating' | 'onTime' | 'distance';
  target: number;
}

interface TournamentReward {
  badge: string;
  feeDiscount: number;
  cashBonus?: number;
  featuredListing?: boolean;
}

interface LeaderboardEntry {
  odinal: string;
  rank: number;
  points: number;
  metrics: {
    totalRides: number;
    averageRating: number;
    onTimePercentage: number;
    distanceCovered: number;
  };
}
```

#### `chats` Collection (Subcollections)
```typescript
// chats/{chatId}
interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: Timestamp;
  unreadCount: {
    [userId: string]: number;
  };
}

// chats/{chatId}/messages/{messageId}
interface Message {
  id: string;
  senderId: string;
  text: string;
  type: 'text' | 'image' | 'location' | 'template';
  imageUrl?: string;
  location?: GeoPoint;
  templateType?: 'arrived' | 'onway' | 'help';
  
  readBy: string[];
  createdAt: Timestamp;
}
```

### API Endpoints

| Endpoint | Method | Purpose |
|---------|--------|---------|
| `/api/auth/send-otp` | POST | Send OTP to email |
| `/api/auth/verify-otp` | POST | Verify OTP, create session |
| `/api/bookings` | POST | Create new booking |
| `/api/bookings/[id]` | GET/PATCH | Get/update booking |
| `/api/payments/create-order` | POST | Create Razorpay order |
| `/api/payments/webhook` | POST | Razorpay webhook handler |
| `/api/vehicles/availability` | GET | Check vehicle availability |
| `/api/tournament/leaderboard` | GET | Get leaderboard data |

### Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == userId;
      allow update: if request.auth.uid == userId 
                    || isAdmin();
    }
    
    // Vehicles - public read, host-only write
    match /vehicles/{vehicleId} {
      allow read: if true;
      allow create: if isHost();
      allow update: if isHost() && resource.data.hostId == request.auth.uid
                    || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Bookings - user can read own, host/guide can read theirs
    match /bookings/{bookingId} {
      allow read: if request.auth.uid == resource.data.userId
                  || request.auth.uid == resource.data.hostId
                  || isAdmin();
      allow create: if request.auth.uid == request.resource.data.userId;
      allow update: if request.auth.uid == resource.data.userId
                    || request.auth.uid == resource.data.hostId
                    || isAdmin();
    }
    
    // Reviews - public read, verified booking required for create
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if hasCompletedBooking(reviewId);
      allow update: if request.auth.uid == resource.data.revieweeId;
    }
    
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isHost() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'host';
    }
    
    function hasCompletedBooking(reviewId) {
      // Verify booking is completed and review doesn't exist
      return true; // Simplified - implement actual logic
    }
  }
}
```

---

## 7. Security Implementation

### Input Validation
- Zod schemas for all form inputs
- Server-side validation for all API routes
- Rate limiting on auth endpoints (5 OTP requests/minute)
- XSS prevention via React's built-in escaping

### Payment Security
- Server-side order creation (never expose API key to client)
- Webhook signature verification
- Idempotent payment processing
- Double-check booking status after payment

### Firebase Security
- Auth UID verification on all writes
- Resource-based access control
- Admin SDK for server-side operations only
- Storage rules for image uploads (size limits, file types)

---

## 8. Performance Optimizations

### Frontend
- Next.js App Router with server components
- Image optimization with next/image
- Dynamic imports for heavy components
- SWR for client-side data fetching
- Skeleton loading states

### Backend
- Firestore indexes for common queries
- Pagination (max 20 items per request)
- Batch writes for bulk operations
- Cached tournament leaderboard (refresh every 15 min)

### CDN & Hosting
- Vercel Edge Network
- Static asset caching
- ISR for marketplace listings
