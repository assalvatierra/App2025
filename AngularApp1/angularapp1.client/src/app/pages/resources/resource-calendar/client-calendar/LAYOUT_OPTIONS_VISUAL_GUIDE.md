# Layout Options - Visual Comparison

## Quick Visual Reference
Compare Calendar vs Stack layout modes side-by-side.

---

## Layout Mode Comparison

### Calendar Mode (Horizontal Grid)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  RESOURCE MANAGEMENT                                                    │
│  Manage job service allocations and resource assignments                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  📅 DATE RANGE              👁️ DISPLAY OPTIONS                          │
│  ┌─────────┬─────────┐     View: [Calendar][Stack]                     │
│  │From | To│ Apply   │     Density: [Comfortable][Compact][Dense]      │
│  └─────────┴─────────┘     Layout: [📅Calendar][📋Stack]               │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  [Calendar View] | List View                                            │
│  ─────────────────────────────                                          │
│                                                                          │
│  ┌──────────┬─────────┬─────────┬─────────┬─────────┬─────────┬────────┐
│  │ Customer │   MON   │   TUE   │   WED   │   THU   │   FRI   │  SAT   │
│  │          │ Jan 15  │ Jan 16  │ Jan 17  │ Jan 18  │ Jan 19  │ Jan 20 │
│  ├──────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┤
│  │ ABC Corp │         │  🚗 Car │  👤 Drv │         │         │        │
│  │          │         │  📋 1   │  📋 1   │         │         │        │
│  ├──────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┤
│  │ XYZ Ltd  │  👤 Drv │         │  🚗 Van │  👤 Drv │         │        │
│  │          │  📋 2   │         │  📋 1   │  🚗 Car │         │        │
│  └──────────┴─────────┴─────────┴─────────┴─────────┴─────────┴────────┘
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

          ↑                      ↑                      ↑
     Weekend Gray           Today Blue            Horizontal Scroll
                                                  (Desktop Optimal)
```

**Best For:**
- 💻 Desktop screens (> 1200px)
- 📊 Seeing entire week at a glance
- 🔍 Comparing across customers
- 📈 High information density needs

---

### Stack Mode (Vertical Accordion)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  RESOURCE MANAGEMENT                                                    │
│  Manage job service allocations and resource assignments                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  📅 DATE RANGE              👁️ DISPLAY OPTIONS                          │
│  ┌─────────┬─────────┐     View: [Compact][Expanded]                   │
│  │From | To│ Apply   │     Density: [Comfortable][Compact][Dense]      │
│  └─────────┴─────────┘     Layout: [Calendar][📋Stack] ← Selected      │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  [Calendar View] | List View                                            │
│  ─────────────────────────────                                          │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────┐            │
│  │ 🏢 ABC Corp                                         [▼] │ ← Tap to   │
│  ├─────────────────────────────────────────────────────────┤   Expand   │
│  │  ┌─────────────────────────────────────────────────┐   │            │
│  │  │ 📅 MON - Jan 15, 2025                          │   │ ← Date Card │
│  │  ├─────────────────────────────────────────────────┤   │            │
│  │  │ 📋 REQUIREMENTS                                 │   │            │
│  │  │   🚗 Car (ABC-001) - Pickup Service             │   │            │
│  │  │                                                  │   │            │
│  │  │ 👤 ASSIGNED                                     │   │            │
│  │  │   🚗 Toyota (VEH-123)                          │   │            │
│  │  └─────────────────────────────────────────────────┘   │            │
│  │                                                          │            │
│  │  ┌─────────────────────────────────────────────────┐   │            │
│  │  │ 📅 TUE - Jan 16, 2025                          │   │            │
│  │  ├─────────────────────────────────────────────────┤   │            │
│  │  │ 📋 No services scheduled                        │   │ ← Empty    │
│  │  └─────────────────────────────────────────────────┘   │   State    │
│  │                                                          │            │
│  │  ┌─────────────────────────────────────────────────┐   │            │
│  │  │ 📅 WED - Jan 17, 2025        [Today - Blue ✨] │   │ ← Today    │
│  │  ├─────────────────────────────────────────────────┤   │   Highlight│
│  │  │ 📋 REQUIREMENTS                                 │   │            │
│  │  │   👤 Driver (DRV-001) - Transfer                │   │            │
│  │  └─────────────────────────────────────────────────┘   │            │
│  └─────────────────────────────────────────────────────────┘            │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────┐            │
│  │ 🏢 XYZ Ltd                                          [▼] │ ← Another  │
│  ├─────────────────────────────────────────────────────────┤   Customer │
│  │  (Collapsed - tap to expand)                            │            │
│  └─────────────────────────────────────────────────────────┘            │
│                                                                          │
│                                                                          │
│                     ↓ Scroll Down ↓                                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

          ↑                      ↑                      ↑
   Touch-Friendly           Vertical Scroll      No Horizontal Scroll
    (Mobile Optimal)                              (320px+ Compatible)
```

**Best For:**
- 📱 Mobile devices (< 768px)
- 👆 Touch navigation
- 📜 Vertical scrolling
- 🎯 Progressive disclosure (expand what you need)

---

## Layout Toggle Control

### Desktop View (Full Labels)

```
┌──────────────────────────────────────────────────────────────┐
│ DISPLAY OPTIONS                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  View:    [📐 Compact] [📋 Expanded]                        │
│                                                              │
│  Density: [🟦 Comfortable] [🟦 Compact] [🟦 Dense]          │
│                                                              │
│  Layout:  [📅 Calendar] [📋 Stack]  ← NEW                   │
│           ─────────────                                      │
│              ↑ Selected                                      │
└──────────────────────────────────────────────────────────────┘
```

### Mobile View (Icons Only)

```
┌──────────────────────────────┐
│ DISPLAY OPTIONS              │
├──────────────────────────────┤
│ View:    [📐][📋]           │
│ Density: [🟦][🟦][🟦]       │
│ Layout:  [📅][📋] ← NEW     │
│          ───                 │
└──────────────────────────────┘
```

---

## Visual States in Stack Mode

### Date Card States

#### 1. Normal Date Card (White)
```
┌─────────────────────────────────────┐
│ 📅 MON - Jan 15, 2025              │
├─────────────────────────────────────┤
│ 📋 REQUIREMENTS                     │
│   🚗 Car - Pickup Service           │
└─────────────────────────────────────┘
```

#### 2. Weekend Date Card (Gray Background)
```
┌─────────────────────────────────────┐ ← Gray (#fafafa)
│ 📅 SAT - Jan 20, 2025              │
├─────────────────────────────────────┤
│ 📋 REQUIREMENTS                     │
│   👤 Driver - Delivery              │
└─────────────────────────────────────┘
```

#### 3. Today Date Card (Blue Background + Border)
```
║ 📅 WED - Jan 17, 2025      ✨       ║ ← Blue border (4px)
╠═════════════════════════════════════╣    Light blue bg (#e3f2fd)
║ 📋 REQUIREMENTS                     ║
║   🚗 Van - Transfer                 ║
╚═════════════════════════════════════╝
```

#### 4. Date Card with Data (Blue Left Border)
```
║ 📅 TUE - Jan 16, 2025              │ ← Blue accent (4px)
╟─────────────────────────────────────┤
║ 📋 REQUIREMENTS                     │
║   👤 Driver - Pickup                │
║                                     │
║ 👤 ASSIGNED                         │
║   👤 John Doe (DRV-123)            │
└─────────────────────────────────────┘
```

#### 5. Empty Date Card
```
┌─────────────────────────────────────┐
│ 📅 THU - Jan 18, 2025              │
├─────────────────────────────────────┤
│                                     │
│    📅 No services scheduled         │ ← Gray icon + italic text
│                                     │
└─────────────────────────────────────┘
```

#### 6. Hover State (Elevated Shadow + Slide)
```
    ┌─────────────────────────────────────┐ ← Shadow depth increase
    │ 📅 MON - Jan 15, 2025         →    │ ← Slide right (4px)
    ├─────────────────────────────────────┤
    │ 📋 REQUIREMENTS                     │
    │   🚗 Car - Pickup                   │
    └─────────────────────────────────────┘
        Cursor over card
```

---

## Section Labels in Stack Mode

### Requirements Section
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │ 📋 REQUIREMENTS                 │ │ ← Gray background (#f5f5f5)
│ └─────────────────────────────────┘ │    Uppercase, icon + text
│                                     │
│ 🚗 Car (ABC-001) - Pickup Service   │ ← Actual requirement items
│ 👤 Driver (DRV-002) - Transfer      │
│                                     │
└─────────────────────────────────────┘
```

### Assigned Resources Section
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │ 👤 ASSIGNED                     │ │ ← Gray background (#f5f5f5)
│ └─────────────────────────────────┘ │
│                                     │
│ 🚗 Toyota Camry (VEH-123)          │ ← Assigned resources
│ 👤 John Smith (DRV-456)            │
│                                     │
└─────────────────────────────────────┘
```

---

## Density Mode Comparison in Stack Layout

### Comfortable (Spacious)
```
┌─────────────────────────────────────────┐
│                                         │ ← Extra padding (20px)
│  📅 MON - Jan 15, 2025                 │
│                                         │
│  ──────────────────────────────────────│
│                                         │
│  📋 REQUIREMENTS                        │ ← Larger gaps (20px)
│                                         │
│  🚗 Car - Pickup Service                │
│                                         │
│  ──────────────────────────────────────│
│                                         │
│  👤 ASSIGNED                            │
│                                         │
│  🚗 Toyota (VEH-123)                   │
│                                         │
└─────────────────────────────────────────┘
```

### Compact (Default, Balanced)
```
┌───────────────────────────────────┐
│                                   │ ← Standard padding (16px)
│  📅 MON - Jan 15, 2025           │
│  ─────────────────────────────── │
│                                   │
│  📋 REQUIREMENTS                  │ ← Balanced gaps (16px)
│  🚗 Car - Pickup Service          │
│                                   │
│  👤 ASSIGNED                      │
│  🚗 Toyota (VEH-123)             │
│                                   │
└───────────────────────────────────┘
```

### Dense (Minimal)
```
┌─────────────────────────────────┐
│ 📅 MON - Jan 15, 2025          │ ← Tight padding (12px)
│ ───────────────────────────────│
│ 📋 REQUIREMENTS                 │ ← Small gaps (12px)
│ 🚗 Car - Pickup Service         │
│                                 │
│ 👤 ASSIGNED                     │
│ 🚗 Toyota (VEH-123)            │
└─────────────────────────────────┘
```

---

## Responsive Grid on Desktop (Stack Mode)

When Stack Mode is used on desktop (> 1200px), date cards arrange in a grid:

```
┌───────────────┬───────────────┬───────────────┐
│ 📅 MON        │ 📅 TUE        │ 📅 WED        │
│ Jan 15        │ Jan 16        │ Jan 17 ✨     │ ← Today
├───────────────┼───────────────┼───────────────┤
│ 📋 REQ        │ 📅 Empty      │ 📋 REQ        │
│ 🚗 Car        │               │ 👤 Driver     │
│               │               │               │
│ 👤 ASSIGNED   │               │ 👤 ASSIGNED   │
│ 🚗 Toyota     │               │ 👤 John Doe   │
└───────────────┴───────────────┴───────────────┘

┌───────────────┬───────────────┬───────────────┐
│ 📅 THU        │ 📅 FRI        │ 📅 SAT        │
│ Jan 18        │ Jan 19        │ Jan 20        │ ← Weekend
├───────────────┼───────────────┼───────────────┤
│ 📅 Empty      │ 📋 REQ        │ 📅 Empty      │
│               │ 🚗 Van        │               │
└───────────────┴───────────────┴───────────────┘

Grid: 3 columns × auto rows (minmax 300px)
```

---

## Mobile Touch Targets

All interactive elements meet Material Design 48px minimum:

```
┌─────────────────────────────────────────────────┐
│ 🏢 ABC Corp                             [▼]    │ ← 56px min height
├─────────────────────────────────────────────────┤    (Touch target)
│  Content when expanded...                      │
└─────────────────────────────────────────────────┘
       ↑
   Full width tap area
```

Date cards are full-width for easy tapping:

```
┌─────────────────────────────────────────────────┐
│ 📅 MON - Jan 15, 2025                          │
├─────────────────────────────────────────────────┤ ← Entire card
│ 📋 REQUIREMENTS                                 │   is tappable
│   🚗 Car - Pickup Service                       │   area
└─────────────────────────────────────────────────┘
        Full width (100% of screen)
```

---

## Animation Transitions

### Expansion Panel Open/Close
```
Collapsed:
┌─────────────────────────────────────┐
│ 🏢 ABC Corp                     [▼]│
└─────────────────────────────────────┘
              ↓
         (300ms smooth)
              ↓
Expanded:
┌─────────────────────────────────────┐
│ 🏢 ABC Corp                     [▲]│
├─────────────────────────────────────┤
│  📅 MON - Jan 15                   │
│  📅 TUE - Jan 16                   │
│  📅 WED - Jan 17                   │
└─────────────────────────────────────┘
```

### Date Card Hover
```
Normal:                 Hover:
┌─────────────┐        ┌─────────────┐
│ 📅 MON      │   →   │ 📅 MON    →│ ← Slides right 4px
│ Jan 15      │        │ Jan 15      │    Shadow deepens
└─────────────┘        └─────────────┘
                          ↑ Elevated
```

---

## Color Coding Reference

### Stack Mode Colors

| Element | Color | Purpose |
|---------|-------|---------|
| **Normal Card** | White (#ffffff) | Default state |
| **Weekend Card** | Light Gray (#fafafa) | Weekend identification |
| **Today Card** | Light Blue (#e3f2fd) | Current day emphasis |
| **Has Data Border** | Primary Blue (#1976d2) | Visual indicator |
| **Section Labels** | Light Gray (#f5f5f5) | Section grouping |
| **Icons** | Primary Blue (#1976d2) | Brand consistency |
| **Text Dark** | Dark Gray (#333) | High contrast headings |
| **Text Medium** | Medium Gray (#666) | Secondary text |
| **Text Light** | Light Gray (#616161) | Tertiary text |

---

## Icon Legend

### Layout Toggle Icons
- 📅 `calendar_view_month` - Calendar grid mode
- 📋 `view_list` - Stack vertical mode

### Customer Icons
- 🏢 `business` - Customer/company

### Date Icons
- 📅 `event` - Date marker

### Section Icons
- 📋 `assignment` - Requirements section
- 👤 `assignment_ind` - Assigned resources section

### Resource Type Icons
- 🚗 `directions_car` - Vehicle
- 👤 `person` - Driver
- 🔧 `construction` - Equipment
- ⛽ `local_gas_station` - Fuel/Other service

### State Icons
- 📅 `event_available` - Empty day state
- 📅 `event_busy` - No data empty state

---

## Quick Decision Matrix

**Which layout should I use?**

```
┌─────────────────────┬──────────────┬──────────────┐
│ Your Situation      │ Calendar     │ Stack        │
├─────────────────────┼──────────────┼──────────────┤
│ Desktop (> 1200px)  │ ✅ Best      │ ⚠️ Optional  │
│ Tablet (768-1200px) │ ✅ Good      │ ✅ Good      │
│ Mobile (< 768px)    │ ❌ Poor      │ ✅ Best      │
│ Need overview       │ ✅ Best      │ ⚠️ Limited   │
│ Focus on details    │ ⚠️ Cluttered │ ✅ Best      │
│ Touch navigation    │ ⚠️ Difficult │ ✅ Best      │
│ Keyboard navigation │ ✅ Good      │ ✅ Good      │
│ Print view          │ ✅ Best      │ ⚠️ Long      │
└─────────────────────┴──────────────┴──────────────┘

Legend:
✅ Best      - Optimal choice
✅ Good      - Works well
⚠️ Optional  - Usable but not ideal
⚠️ Limited   - Functional but limited
⚠️ Difficult - Challenging to use
⚠️ Cluttered - May feel cramped
⚠️ Long      - May span many pages
❌ Poor      - Not recommended
```

---

## Accessibility Features

### Keyboard Navigation Flow (Stack Mode)

```
Tab Order:
1. Layout Toggle → [Calendar] [Stack]
                         ↓ Enter to select
2. Customer Panel → 🏢 ABC Corp [▼]
                         ↓ Space/Enter to expand
3. Date Card → 📅 MON Jan 15
                         ↓ Tab to next
4. Date Card → 📅 TUE Jan 16
                         ↓ Continue...
5. Next Customer Panel → 🏢 XYZ Ltd [▼]
```

### Screen Reader Announcements

```
"Layout mode button group"
→ "Calendar button, selected"
→ "Stack button, not selected"

"Customer accordion"
→ "ABC Corp expansion panel, collapsed"
→ [User activates]
→ "ABC Corp expansion panel, expanded"
→ "Date cards for ABC Corp"
→ "Monday, January 15, 2025"
→ "Requirements section"
→ "Car, ABC-001, Pickup Service"
```

---

## Mobile Screenshot Simulation

### iPhone SE (375px × 667px)

```
┌───────────────────────────────────┐
│ ◀ Resource Management            │ ← Top bar
├───────────────────────────────────┤
│ 📅 DATE RANGE                    │
│ From: Jan 15  To: Jan 21 [Apply] │
│                                   │
│ 👁️ DISPLAY OPTIONS               │
│ View: [📐][📋]                   │
│ Density: [🟦][🟦][🟦]           │
│ Layout: [📅][📋] ← Selected     │
├───────────────────────────────────┤
│ [Calendar View] List View         │
├───────────────────────────────────┤
│ ┌───────────────────────────────┐│
│ │🏢 ABC Corp              [▼]  ││ ← Scroll
│ └───────────────────────────────┘│   Start
│ ┌───────────────────────────────┐│
│ │🏢 XYZ Ltd               [▼]  ││
│ └───────────────────────────────┘│
│ ┌───────────────────────────────┐│   ↓
│ │🏢 Acme Inc              [▼]  ││
│ └───────────────────────────────┘│
│                                   │   ↓
│              ⋮                    │
│         Scroll Down               │   ↓
│              ⋮                    │
│                                   │
│                                   │
│                                   │
└───────────────────────────────────┘
    No horizontal scroll! ✅
    Natural thumb reach ✅
    Touch targets 56px ✅
```

---

## Summary

**Calendar Layout:**
- Horizontal grid table
- Best for desktop
- High density
- Week overview

**Stack Layout:**
- Vertical accordion
- Best for mobile
- Progressive disclosure
- Touch-friendly

**Toggle anytime** based on your needs and device!
