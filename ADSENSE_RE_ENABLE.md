# How to Re-Enable Google AdSense Ads

## Current Status
AdSense ads are currently **DISABLED** during the Google AdSense review process.

## What's Currently Active
- ✅ AdSense script is loaded in `app/layout.tsx` (required for review)
- ✅ `ads.txt` file is in `public/ads.txt` (required for verification)
- ✅ AdSlot component exists and is ready (`components/visuals/AdSlot.tsx`)
- ❌ AdSlot UI is commented out in blog posts

## To Re-Enable Ads After Approval

### Step 1: Uncomment the Import
In `app/blog/[slug]/page.tsx`, uncomment line 9:
```typescript
// Change from:
// import { AdSlot } from "@/components/visuals/AdSlot"; // DISABLED during AdSense review - uncomment when approved

// To:
import { AdSlot } from "@/components/visuals/AdSlot";
```

### Step 2: Uncomment the AdSlot Component
In `app/blog/[slug]/page.tsx`, uncomment lines 147-149:
```typescript
// Change from:
{/* Ad Placement - DISABLED during AdSense review */}
{/* TODO: Uncomment below when AdSense is approved to show ads */}
{/* <AdSlot className="mb-12" /> */}

// To:
{/* Ad Placement */}
<AdSlot className="mb-12" />
```

### Step 3: Verify
1. Check that ads appear on blog post pages
2. Verify ads are loading correctly in browser console
3. Test on production domain (rushi.blog)

## Ad Placement Location
Ads currently appear:
- **Between article header and content** in blog post pages (`/blog/[slug]`)

## Additional Notes
- The AdSense script in `app/layout.tsx` will continue to load (this is fine)
- The `ads.txt` file will remain in place (required for AdSense)
- The AdSlot component is production-ready and will work once uncommented



