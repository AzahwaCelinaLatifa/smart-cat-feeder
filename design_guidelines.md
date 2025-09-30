# Design Guidelines: Smart Cat Feeder PWA

## Design Approach
**Utility-Focused Smart Home Interface** - Inspired by modern IoT control panels like Google Home, Apple HomeKit, and Philips Hue apps. The design prioritizes clarity, quick interactions, and at-a-glance status monitoring with a friendly, pet-focused personality.

## Color Palette

### Light Mode (Primary)
- **Background**: 0 0% 98% (soft off-white)
- **Surface/Cards**: 0 0% 100% (pure white)
- **Border**: 220 13% 91% (light gray)
- **Primary**: 200 80% 55% (light blue - for actions and active states)
- **Success**: 142 71% 45% (light green - for feeding status, food level)
- **Text Primary**: 222 47% 11% (dark slate)
- **Text Secondary**: 215 14% 34% (medium gray)

### Accent Colors
- **Warning**: 38 92% 50% (amber - for low food level)
- **Error**: 0 72% 51% (soft red - for missed feedings)

## Typography
- **Font Family**: 'Inter' or 'SF Pro Display' via Google Fonts
- **Headings**: 
  - H1: 2rem (32px), font-weight 700
  - H2: 1.5rem (24px), font-weight 600
  - H3: 1.25rem (20px), font-weight 600
- **Body**: 1rem (16px), font-weight 400
- **Small/Meta**: 0.875rem (14px), font-weight 400
- **Button Text**: 0.9375rem (15px), font-weight 500

## Layout System
**Spacing Units**: Use Tailwind units of 2, 3, 4, 6, 8, 12, 16, 20 for consistent rhythm
- Card padding: p-6 on desktop, p-4 on mobile
- Section spacing: space-y-6
- Grid gaps: gap-4 to gap-6

**Container Strategy**:
- Max width: max-w-6xl for main content area
- Desktop: Side navigation (240px fixed) + main content area with 24px padding
- Mobile: Full width content with bottom navigation (64px fixed height)

## Component Library

### Navigation
**Desktop Sidebar** (w-60, fixed left):
- Logo/App name at top (h-16)
- Icon + label navigation items (py-3, px-4)
- Active state: light blue background (200 80% 95%), blue text
- Hover state: subtle gray background

**Mobile Bottom Nav** (h-16, fixed bottom):
- 6 icon-only buttons arranged horizontally
- Active state: blue icon with small dot indicator below
- Labels hidden on mobile for space efficiency

### Dashboard Cards
**Info Cards** (white background, rounded-xl, shadow-sm):
- Header with icon + title (flex items-center, gap-2)
- Primary metric/content area (large text or progress visual)
- Secondary info/timestamp (text-sm, text-gray-500)
- Optional action button (top-right corner)

**Progress Indicators**:
- Food level: Horizontal bar with gradient (green to amber based on level)
- Height: h-3, rounded-full
- Background: gray-200, filled portion: green with transition

**Quick Action Button** ("Feed Now"):
- Primary blue button, rounded-lg, px-6, py-3
- Icon + text layout
- Shows confirmation modal before action

### Schedule Page
**Schedule List**:
- Each item in white card with border-l-4 (blue accent)
- Time displayed prominently (text-2xl, font-semibold)
- Edit/Delete icons on right (hover to show)
- Add schedule: Floating action button (bottom-right on mobile, top-right on desktop)

### History Table
**List View** (preferred on mobile):
- Timeline-style with dots connecting entries
- Each entry: timestamp + status badge
- Status badges: green (Fed), gray (Skipped), red (Failed)

**Table View** (desktop):
- 3 columns: Time, Status, Actions
- Alternating row backgrounds for readability
- Sticky header on scroll

### Control Panel
**Toggle Switches**:
- Large, iOS-style switches (w-14, h-8)
- Active: blue background, inactive: gray-300
- Smooth transition animation (duration-200)

### Camera Placeholder
**Empty State**:
- Centered icon (camera icon, text-6xl)
- "Coming Soon" heading
- Aspect ratio container: 16:9 with gray-100 background
- Rounded corners, subtle border

### Profile Page
**Profile Card**:
- Top section: Avatar placeholder (96px circular) + pet name
- Info grid: 2 columns on desktop, 1 on mobile
- Settings section: List of toggle switches with labels
- Logout button: Outline variant, text-red-600

### Toast Notifications
**Position**: Fixed top-right (desktop), top-center (mobile)
**Style**: 
- White background, shadow-lg, rounded-lg
- Icon + message + close button
- Slide-in animation from right (desktop) or top (mobile)
- Auto-dismiss after 3 seconds
- Types: Success (green border-l-4), Error (red), Info (blue)

## Icons
Use **Heroicons** (outline variant for navigation, solid for actions)
- Home: HomeIcon
- Schedule: ClockIcon
- History: DocumentTextIcon
- Control: AdjustmentsIcon
- Camera: CameraIcon
- Profile: UserCircleIcon
- Feed: BeakerIcon or SparklesIcon

## Images
**No hero images needed** - This is a utility app focused on quick interactions and status monitoring. Use icons and illustrations instead:
- Empty states: Simple line illustrations of cats (can use placeholder illustrations from unDraw or similar)
- Profile: Pet avatar placeholder (circular, soft background color)

## Responsive Breakpoints
- Mobile: < 768px (bottom nav, single column cards)
- Tablet: 768px - 1024px (bottom nav, 2-column grid for cards)
- Desktop: > 1024px (side nav, 3-column grid where appropriate)

## Interactions
- **Button hovers**: Slight brightness increase, scale-105, duration-150
- **Card hovers**: shadow-md transition
- **Active states**: Scale-95 on click
- **Page transitions**: Fade in new content (duration-200)
- **Minimal animations**: Focus on responsiveness over decorative motion

## Accessibility
- Maintain WCAG AA contrast ratios (4.5:1 for normal text)
- Focus indicators: 2px blue ring with offset
- Touch targets: Minimum 44x44px on mobile
- Screen reader labels for all icon-only buttons