export const VEHICLE_TYPES = [
  { value: 'tuk-tuk', label: 'Tuk-Tuk', icon: '🛺' },
  { value: 'scooter', label: 'Scooter', icon: '🛵' },
  { value: 'bike', label: 'Bike', icon: '🏍️' },
] as const;

export const FUEL_TYPES = [
  { value: 'petrol', label: 'Petrol' },
  { value: 'electric', label: 'Electric' },
  { value: 'cng', label: 'CNG' },
] as const;

export const TRANSMISSION_TYPES = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' },
] as const;

export const VEHICLE_FEATURES = [
  'Air Conditioning',
  'Music System',
  'GPS Navigation',
  'USB Charging',
  'Helmet Provided',
  'First Aid Kit',
  'Luggage Space',
  'Rain Cover',
  'Child Seat',
  'Pillion Seat',
] as const;

export const EXPERIENCE_CATEGORIES = [
  { value: 'cultural', label: 'Cultural & Heritage' },
  { value: 'food', label: 'Food & Culinary' },
  { value: 'adventure', label: 'Adventure & Nature' },
  { value: 'nightlife', label: 'Nightlife & Entertainment' },
  { value: 'spiritual', label: 'Spiritual & Wellness' },
  { value: 'shopping', label: 'Shopping & Markets' },
  { value: 'photography', label: 'Photography Tours' },
] as const;

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'kn', label: 'Kannada' },
  { value: 'ml', label: 'Malayalam' },
  { value: 'bn', label: 'Bengali' },
  { value: 'mr', label: 'Marathi' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'pa', label: 'Punjabi' },
] as const;

export const BOOKING_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'confirmed', label: 'Confirmed', color: 'blue' },
  { value: 'in_progress', label: 'In Progress', color: 'purple' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
] as const;

export const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'paid', label: 'Paid', color: 'green' },
  { value: 'refunded', label: 'Refunded', color: 'blue' },
  { value: 'failed', label: 'Failed', color: 'red' },
] as const;

export const LISTING_STATUSES = [
  { value: 'pending', label: 'Pending Approval', color: 'yellow' },
  { value: 'approved', label: 'Approved', color: 'green' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
] as const;

export const TOURNAMENT_TYPES = [
  { value: 'weekly', label: 'Weekly Challenge' },
  { value: 'monthly', label: 'Monthly Championship' },
  { value: 'special', label: 'Special Event' },
] as const;

export const CHALLENGE_METRICS = [
  { value: 'rides', label: 'Total Rides', unit: 'rides' },
  { value: 'rating', label: 'Average Rating', unit: 'stars' },
  { value: 'onTime', label: 'On-Time Percentage', unit: '%' },
  { value: 'distance', label: 'Distance Covered', unit: 'km' },
] as const;

export const RATING_CATEGORIES = [
  { value: 'cleanliness', label: 'Cleanliness' },
  { value: 'condition', label: 'Condition' },
  { value: 'communication', label: 'Communication' },
  { value: 'value', label: 'Value for Money' },
] as const;

export const TOAST_DURATION = 5000;
export const OTP_EXPIRY_MINUTES = 10;
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGES_COUNT = 10;
export const MIN_BOOKING_DURATION_HOURS = 2;
export const SERVICE_FEE_PERCENTAGE = 10;
export const TAX_PERCENTAGE = 18;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  EXPLORE_VEHICLES: '/explore/vehicles',
  EXPLORE_EXPERIENCES: '/explore/experiences',
  VEHICLE_DETAIL: (id: string) => `/vehicles/${id}`,
  EXPERIENCE_DETAIL: (id: string) => `/experiences/${id}`,
  DASHBOARD: '/dashboard',
  USER_DASHBOARD: '/dashboard/user',
  HOST_DASHBOARD: '/dashboard/host',
  GUIDE_DASHBOARD: '/dashboard/guide',
  ADMIN_DASHBOARD: '/dashboard/admin',
  HOST_ONBOARDING: '/host/onboarding',
  GUIDE_ONBOARDING: '/guide/onboarding',
  ADD_VEHICLE: '/host/vehicles/new',
  ADD_EXPERIENCE: '/guide/experiences/new',
  TOURNAMENT: '/tournament',
  LEADERBOARD: '/tournament/leaderboard',
  CHALLENGES: '/tournament/challenges',
  CHAT: '/chat',
  CHAT_DETAIL: (id: string) => `/chat/${id}`,
} as const;

export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Jaipur',
  'Goa',
  'Udaipur',
  'Varanasi',
  'Agra',
  'Kerala',
  'Rishikesh',
  'Manali',
] as const;

export const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop';
export const DEFAULT_VEHICLE_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop';
export const DEFAULT_EXPERIENCE_IMAGE = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop';
