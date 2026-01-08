# Discover Services Feature - Frontend Documentation

## Overview

The Discover Services feature allows users to browse, search, filter, and sort available services on the platform. This is a public-facing feature that works without authentication, enabling potential clients to explore services before signing up.

**Status**: ✅ Production Ready  
**Version**: 1.0  
**Last Updated**: January 9, 2026

---

## Table of Contents

1. [Architecture](#architecture)
2. [File Structure](#file-structure)
3. [Data Flow](#data-flow)
4. [Components](#components)
5. [API Integration](#api-integration)
6. [State Management](#state-management)
7. [Features](#features)
8. [Type Definitions](#type-definitions)
9. [Usage Examples](#usage-examples)
10. [Troubleshooting](#troubleshooting)

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Backend API                          │
│              GET /services, GET /categories             │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│              API Service Layer                          │
│         (discover-services.ts)                          │
│         - fetchServices()                               │
│         - fetchCategories()                             │
│         - Data transformation                           │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Page Component                       │
│         (page.tsx)                                      │
│         - State management                              │
│         - Client-side filtering                         │
│         - Client-side sorting                           │
│         - Infinite scroll                               │
└─────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────┴───────────────────┐
        ↓                                       ↓
┌──────────────────┐                  ┌──────────────────┐
│  Filter Sidebar  │                  │  Service List    │
│  - Categories    │                  │  - Service Cards │
│  - Price Range   │                  │  - Loading       │
│  - Skills        │                  │  - Empty State   │
│  - Filters       │                  │  - Pagination    │
└──────────────────┘                  └──────────────────┘
```

### Design Principles

1. **Server-Side Filtering**: Category filtering happens on the backend
2. **Client-Side Filtering**: Search, price range, skills, and other filters are client-side
3. **Client-Side Sorting**: All sorting happens on the frontend
4. **Infinite Scroll**: Automatic pagination when scrolling
5. **Responsive Design**: Mobile-first approach with adaptive layouts
6. **Performance**: Debounced search, memoized computations, deduplication

---

## File Structure

```
src/
├── app/client/hire-talent/discover-services/
│   └── page.tsx                          # Main page component
│
├── features/services/
│   ├── actions/
│   │   └── discover-services.ts          # API integration layer
│   │
│   ├── components/
│   │   ├── discover-services-header.tsx  # Search & sort header
│   │   ├── service-filter-sidebar.tsx    # Filter sidebar
│   │   ├── service-discovery-list.tsx    # Service list container
│   │   ├── service-discovery-card.tsx    # Individual service card
│   │   ├── loading-overlay.tsx           # Loading state overlay
│   │   └── index.ts                      # Component exports
│   │
│   └── schema/
│       ├── discover-services-data.ts     # Frontend types & helpers
│       ├── discover-services-api.ts      # API types
│       └── index.ts                      # Schema exports
│
└── hooks/
    └── use-debounced-value.ts            # Debounce hook
```

---

## Data Flow

### 1. Initial Load

```typescript
// page.tsx
useEffect(() => {
  const fetchInitialData = async () => {
    // Fetch categories and services in parallel
    const [categoriesData, servicesData] = await Promise.all([
      fetchCategories(),
      fetchServices({ page: 1, limit: 20 }),
    ]);

    setCategories(categoriesData);
    setServices(servicesData.services);
    setHasMore(servicesData.pagination.page < servicesData.pagination.totalPages);
  };

  fetchInitialData();
}, []);
```

### 2. Category Filter Change (Server-Side)

```typescript
useEffect(() => {
  const fetchFilteredServices = async () => {
    const queryParams = {
      page: 1,
      limit: 20,
      ...(filters.category !== "all" && { categoryId: filters.category }),
    };

    const servicesData = await fetchServices(queryParams);
    setServices(servicesData.services);
  };

  if (categories.length > 0) {
    fetchFilteredServices();
  }
}, [filters.category]);
```

### 3. Client-Side Filtering

```typescript
const filteredServices = useMemo(() => {
  let result = [...services];

  // Search filter
  if (debouncedSearch.trim()) {
    result = result.filter(service =>
      service.serviceName.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.skills.some(skill => skill.toLowerCase().includes(query))
    );
  }

  // Price range filter
  result = result.filter(service =>
    service.pricing.starting >= filters.priceRange.min &&
    service.pricing.starting <= filters.priceRange.max
  );

  // Other filters...
  return result;
}, [services, debouncedSearch, filters]);
```

### 4. Infinite Scroll Pagination

```typescript
const handleLoadMore = useCallback(async () => {
  if (isLoadingMore || !hasMore) return;

  const nextPage = page + 1;
  const servicesData = await fetchServices({
    page: nextPage,
    limit: 20,
    ...(filters.category !== "all" && { categoryId: filters.category }),
  });

  // Deduplicate services
  setServices(prev => {
    const existingIds = new Set(prev.map(s => s.id));
    const newServices = servicesData.services.filter(s => !existingIds.has(s.id));
    return [...prev, ...newServices];
  });

  setPage(nextPage);
  setHasMore(servicesData.pagination.page < servicesData.pagination.totalPages);
}, [isLoadingMore, hasMore, page, filters.category]);
```

---

## Components

### 1. DiscoverServicesPage

**Location**: `src/app/client/hire-talent/discover-services/page.tsx`

**Purpose**: Main page component that orchestrates the entire feature

**Responsibilities**:
- Fetch initial data (services and categories)
- Manage state (services, categories, filters, loading, errors)
- Handle filter changes
- Implement infinite scroll
- Client-side filtering and sorting
- Pass data to child components

**Key State**:
```typescript
const [services, setServices] = useState<Service[]>([]);
const [categories, setCategories] = useState<Category[]>([]);
const [filters, setFilters] = useState<DiscoverServicesFilters>(defaultFilters);
const [isLoading, setIsLoading] = useState(true);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
```

### 2. DiscoverServicesHeader

**Location**: `src/features/services/components/discover-services-header.tsx`

**Purpose**: Search bar and sort dropdown

**Props**:
```typescript
interface DiscoverServicesHeaderProps {
  filters: DiscoverServicesFilters;
  onFilterChange: (filters: Partial<DiscoverServicesFilters>) => void;
  totalResults: number;
  isLoading: boolean;
}
```

**Features**:
- Search input with debouncing
- Sort dropdown (relevance, rating, price, popularity)
- Results count display

### 3. ServiceFilterSidebar

**Location**: `src/features/services/components/service-filter-sidebar.tsx`

**Purpose**: Filter controls for narrowing down services

**Props**:
```typescript
interface ServiceFilterSidebarProps {
  filters: DiscoverServicesFilters;
  categories: Category[];
  onFilterChange: (filters: Partial<DiscoverServicesFilters>) => void;
  onClearFilters: () => void;
  totalServices: number;
  isLoading: boolean;
}
```

**Filters**:
- Category selection
- Price range slider
- Pricing type (fixed/hourly)
- Skills multi-select
- Experience level
- Delivery time
- Provider level

### 4. ServiceDiscoveryList

**Location**: `src/features/services/components/service-discovery-list.tsx`

**Purpose**: Container for service cards with loading and empty states

**Props**:
```typescript
interface ServiceDiscoveryListProps {
  services: Service[];
  isLoading: boolean;
  hasMore: boolean;
  loadingMore: boolean;
  error: string | null;
  onRetry: () => void;
}
```

**States**:
- Loading skeleton (initial load)
- Service grid
- Empty state
- Error state with retry
- Loading more indicator

### 5. ServiceDiscoveryCard

**Location**: `src/features/services/components/service-discovery-card.tsx`

**Purpose**: Individual service card display

**Props**:
```typescript
interface ServiceCardProps {
  service: Service;
}
```

**Displays**:
- Service name and description
- Provider info (name, avatar, level, rating)
- Pricing information
- Skills tags
- Delivery time
- Experience level
- Upgrade badges (Featured, Urgent)
- View Service button

---

## API Integration

### API Service Layer

**Location**: `src/features/services/actions/discover-services.ts`

### Functions

#### `fetchServices(params)`

Fetches services from the backend with optional filters and pagination.

```typescript
export const fetchServices = async (
  params: ServiceQueryParams = {}
): Promise<{ services: Service[]; pagination: PaginationMetadata }> => {
  // Implementation
};
```

**Parameters**:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `categoryId` - Filter by category UUID
- `status` - Filter by status (default: "active")
- `search` - Search query
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `experienceLevel` - Filter by experience level
- `paymentType` - Filter by pricing type

**Returns**:
```typescript
{
  services: Service[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}
```

#### `fetchCategories()`

Fetches all categories from the backend.

```typescript
export const fetchCategories = async (): Promise<Category[]> => {
  // Implementation
};
```

**Returns**: Array of `Category` objects

#### `fetchServiceById(serviceId)`

Fetches a single service by ID.

```typescript
export const fetchServiceById = async (serviceId: string): Promise<Service> => {
  // Implementation
};
```

### Data Transformation

The API layer transforms backend data to frontend format:

```typescript
const transformAPIServiceToFrontend = (apiService: APIService): Service => {
  return {
    id: apiService.id,
    serviceName: apiService.name,
    description: apiService.description,
    category: {
      id: apiService.categoryId,
      name: apiService.category.name,
      slug: apiService.category.slug,
    },
    skills: apiService.skills.map(skill => skill.name),
    pricing: {
      type: apiService.paymentType,
      starting: apiService.budgetMin,
      currency: "PHP",
    },
    experienceLevel: apiService.experienceLevel,
    deliveryTime: formatDeliveryTime(apiService.deliveryDays),
    deliveryDays: apiService.deliveryDays,
    provider: {
      id: apiService.freelancerId,
      name: constructProviderName(apiService.freelancer),
      avatar: apiService.freelancer?.avatar || "/default-avatar.png",
      level: mapProviderLevel(apiService.freelancer?.level),
    },
    postedDate: apiService.createdAt,
    postedAgo: formatRelativeTime(apiService.createdAt),
    totalOrders: 0, // TODO: Add from backend
    rating: 0, // TODO: Add from backend
    reviewCount: 0, // TODO: Add from backend
    isFeatured: apiService.upgrades?.some(u => u.name === "Featured") || false,
    isUrgent: apiService.upgrades?.some(u => u.name === "Urgent") || false,
    serviceUrl: `/client/services/${apiService.id}`,
  };
};
```

### Error Handling

Custom error class for API errors:

```typescript
export class DiscoverServicesError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "DiscoverServicesError";
  }
}
```

Error handling function:

```typescript
const handleAPIError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    
    if (status === 401) {
      throw new DiscoverServicesError(
        "Authentication required, but you can continue browsing",
        401,
        error
      );
    }
    
    if (status === 404) {
      throw new DiscoverServicesError("No services found", 404, error);
    }
    
    if (status === 500) {
      throw new DiscoverServicesError(
        "Server error, please try again later",
        500,
        error
      );
    }
  }
  
  throw new DiscoverServicesError(
    "Network error, please check your connection",
    undefined,
    error
  );
};
```

---

## State Management

### Filter State

```typescript
interface DiscoverServicesFilters {
  search: string;
  category: string; // Category ID or "all"
  priceRange: {
    min: number;
    max: number;
  };
  pricingType: ServicePricingType | "all";
  skills: string[];
  experienceLevel: ExperienceLevel | "all";
  deliveryTime: DeliveryTimeFilter;
  providerLevel: ProviderLevel | "all";
  sortBy: SortOption;
}
```

### Default Filters

```typescript
export const defaultFilters: DiscoverServicesFilters = {
  search: "",
  category: "all",
  priceRange: {
    min: 0,
    max: 10000,
  },
  pricingType: "all",
  skills: [],
  experienceLevel: "all",
  deliveryTime: "all",
  providerLevel: "all",
  sortBy: "relevance",
};
```

---

## Features

### 1. Search

- **Type**: Client-side
- **Debounce**: 300ms
- **Searches**: Service name, description, skills
- **Case-insensitive**: Yes

### 2. Category Filter

- **Type**: Server-side
- **Behavior**: Fetches new services from API
- **Options**: All categories + "All Categories"

### 3. Price Range Filter

- **Type**: Client-side
- **Range**: ₱0 - ₱10,000
- **Slider**: Dual-handle range slider

### 4. Skills Filter

- **Type**: Client-side
- **Logic**: OR (matches any selected skill)
- **UI**: Multi-select dropdown with search

### 5. Sorting

- **Type**: Client-side
- **Options**:
  - Relevance (rating + orders + featured status)
  - Rating: High to Low
  - Price: Low to High
  - Price: High to Low
  - Most Popular (by total orders)

### 6. Infinite Scroll

- **Trigger**: 80% scroll position
- **Page Size**: 20 services per page
- **Deduplication**: Prevents duplicate services
- **Loading**: Shows loading indicator at bottom

### 7. Responsive Design

- **Mobile**: Sidebar as overlay with toggle button
- **Tablet**: Sidebar visible, adjusted layout
- **Desktop**: Full sidebar, grid layout

---

## Type Definitions

### Service

```typescript
export interface Service {
  id: string;
  serviceName: string;
  description: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  skills: string[];
  pricing: ServicePricing;
  experienceLevel: ExperienceLevel;
  deliveryTime: string;
  deliveryDays: number;
  provider: ServiceProvider;
  postedDate: string;
  postedAgo: string;
  totalOrders: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isUrgent: boolean;
  serviceUrl: string;
  upgrades?: ServiceUpgrade[];
}
```

### Category

```typescript
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  serviceCount?: number;
}
```

### ServiceProvider

```typescript
export interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  level: ProviderLevel;
  country?: string;
  countryCode?: string;
  title?: string;
  rating?: number;
  reviewsCount?: number;
  verified?: boolean;
  responseTime?: string;
}
```

---

## Usage Examples

### Basic Usage

```typescript
import { fetchServices, fetchCategories } from '@/features/services/actions/discover-services';

// Fetch all services
const { services, pagination } = await fetchServices();

// Fetch services by category
const { services } = await fetchServices({
  categoryId: 'cat-123',
  page: 1,
  limit: 20,
});

// Fetch categories
const categories = await fetchCategories();
```

### Filter Services Client-Side

```typescript
const filteredServices = services.filter(service => {
  // Price range
  if (service.pricing.starting < filters.priceRange.min) return false;
  if (service.pricing.starting > filters.priceRange.max) return false;
  
  // Skills (OR logic)
  if (filters.skills.length > 0) {
    const hasSkill = filters.skills.some(skill =>
      service.skills.includes(skill)
    );
    if (!hasSkill) return false;
  }
  
  return true;
});
```

### Sort Services

```typescript
const sortedServices = [...services].sort((a, b) => {
  switch (sortBy) {
    case "relevance":
      const scoreA = a.rating * 0.4 + (a.totalOrders / 200) * 0.3 + (a.isFeatured ? 1 : 0) * 0.3;
      const scoreB = b.rating * 0.4 + (b.totalOrders / 200) * 0.3 + (b.isFeatured ? 1 : 0) * 0.3;
      return scoreB - scoreA;
    case "rating-high":
      return b.rating - a.rating;
    case "price-low":
      return a.pricing.starting - b.pricing.starting;
    case "price-high":
      return b.pricing.starting - a.pricing.starting;
    case "popular":
      return b.totalOrders - a.totalOrders;
    default:
      return 0;
  }
});
```

---

## Troubleshooting

### Issue: Duplicate Services When Scrolling

**Symptom**: React warning about duplicate keys

**Cause**: Backend returning duplicate services across pages

**Solution**: Deduplication logic in `handleLoadMore`:

```typescript
setServices(prev => {
  const existingIds = new Set(prev.map(s => s.id));
  const newServices = servicesData.services.filter(s => !existingIds.has(s.id));
  return [...prev, ...newServices];
});
```

### Issue: Provider Name Shows "Unknown"

**Symptom**: Service cards show "Unknown" as provider name

**Cause**: Backend not returning `first_name` and `last_name`

**Solution**: Ensure backend includes freelancer information in response (see backend documentation)

### Issue: Search Not Working

**Symptom**: Search input doesn't filter services

**Cause**: Debounce delay or state not updating

**Solution**: Check `useDebouncedValue` hook and ensure `debouncedSearch` is used in filter logic

### Issue: Filters Not Applying

**Symptom**: Changing filters doesn't update results

**Cause**: Filter state not passed correctly or memoization issue

**Solution**: Verify `filteredServices` useMemo dependencies include all filter values

### Issue: Infinite Scroll Not Triggering

**Symptom**: More services don't load when scrolling

**Cause**: Scroll event not attached to correct element

**Solution**: Ensure scroll listener is on `main` element:

```typescript
const scrollableElement = document.querySelector('main');
if (scrollableElement) {
  scrollableElement.addEventListener('scroll', handleScroll);
}
```

---

## Performance Optimizations

1. **Debounced Search**: 300ms delay prevents excessive filtering
2. **Memoized Filtering**: `useMemo` prevents re-computation
3. **Memoized Sorting**: Separate `useMemo` for sorting
4. **Deduplication**: Prevents duplicate services in list
5. **Lazy Loading**: Images load as they enter viewport
6. **Infinite Scroll**: Loads data on demand, not all at once

---

## Related Documentation

- [Backend API Documentation](../../juanwork-api/docs/features/DISCOVER-SERVICES-API.md)
- [Service Post Feature](./SERVICE-POST.md)
- [Testing Guide](../TESTING.md)

---

**Last Updated**: January 9, 2026  
**Feature Status**: ✅ Production Ready  
**Version**: 1.0
