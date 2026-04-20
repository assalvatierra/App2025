# Quick Wins - Visual Reference Guide

## Color Palette Reference

### WCAG AA Compliant Colors (4.5:1 minimum on white background)

| Color Code | Contrast Ratio | Usage | Status |
|------------|----------------|-------|--------|
| `#333` | 12.6:1 | Primary text | ✅ AAA |
| `#424242` | 11.9:1 | Headings | ✅ AAA |
| `#616161` | 7.0:1 | Secondary text | ✅ AAA |
| `#666` | 5.7:1 | Tertiary text | ✅ AA |
| `#757575` | 4.6:1 | Disabled text | ✅ AA |
| `#999` | 3.0:1 | ❌ NON-COMPLIANT | ❌ FAIL |

---

## Calendar Cell States

### State 1: Normal Weekday
```css
background-color: white
border: 1px solid #e0e0e0
```
**Visual**: White background, light gray border

---

### State 2: Weekend
```css
background-color: #fafafa
border: 1px solid #e0e0e0
```
**Visual**: Very light gray background distinguishes from weekdays

---

### State 3: Today (Weekday)
```css
background-color: #e3f2fd (light blue)
border-left: 3px solid #1976d2 (blue accent)
```
**Visual**: Light blue background with thick blue left border

---

### State 4: Today (Weekend)
```css
background-color: #e3f2fd (today overrides weekend)
border-left: 3px solid #1976d2
```
**Visual**: Blue takes precedence over gray

---

### State 5: Cell with Data
```css
background-color: #fff
/* No special background, data provides visual weight */
```
**Visual**: Clean white to not interfere with content

---

### State 6: Hover (Any Cell)
```css
background-color: #f5f5f5
box-shadow: inset 0 0 0 2px #2196f3 (blue border)
transform: scale(1.01)
cursor: pointer
```
**Visual**: Light gray + blue border + subtle zoom

---

### State 7: Hover (Today)
```css
background-color: #bbdefb (lighter blue)
box-shadow: inset 0 0 0 2px #2196f3
```
**Visual**: Brighter blue on hover

---

### State 8: Hover (Cell with Data)
```css
background-color: #e8f4f8 (very light cyan)
box-shadow: inset 0 0 0 2px #2196f3
```
**Visual**: Subtle cyan tint on hover

---

## Header States

### State 1: Normal Day Header
```css
background-color: #f5f5f5
color: #424242
```
**Visual**: Light gray background, dark text

---

### State 2: Weekend Header
```css
background-color: #f5f5f5 (same as normal)
color: #424242
```
**Visual**: Matches normal day, cell below shows weekend

---

### State 3: Today Header
```css
background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)
color: white
```
**Visual**: Blue gradient background, white text

---

## Priority Matrix

### Interaction Hierarchy
```
1. Today (Most Important)
   └─ Blue gradient + border + light blue bg

2. Weekend (Important Context)
   └─ Gray background

3. Has Data (Content Indicator)
   └─ White background (clean)

4. Hover (Interactive Feedback)
   └─ Blue border + gray bg + scale
```

### Color Hierarchy
```
Blue (#1976d2)
  └─ Today, Hover borders

Gray (#fafafa, #f5f5f5)
  └─ Weekend, Hover backgrounds

White (#fff)
  └─ Normal cells, headers
```

---

## Animation Timing

```css
/* All transitions use consistent timing */
transition: all 0.3s ease;

/* Breakdown:
   - all: Animate all properties
   - 0.3s: 300 milliseconds (human perception threshold)
   - ease: Start slow, speed up, slow down (natural feel)
*/
```

### Why 0.3s?
- **Too fast (< 0.2s)**: Jarring, hard to follow
- **Just right (0.3s)**: Smooth, perceivable
- **Too slow (> 0.5s)**: Sluggish, annoying

---

## Hover Effect Breakdown

```css
.calendar-cell:hover {
  background-color: #f5f5f5;        /* 1. Background change */
  box-shadow: inset 0 0 0 2px #2196f3; /* 2. Blue border */
  transform: scale(1.01);            /* 3. Subtle zoom (1%) */
  z-index: 1;                        /* 4. Bring to front */
  cursor: pointer;                   /* 5. Show interactivity */
}
```

### Why Each Property?
1. **Background**: Visual feedback that cell is active
2. **Box Shadow Inset**: Border that doesn't shift layout
3. **Scale 1.01**: Just enough to notice, not distracting
4. **Z-Index**: Prevents border clipping from adjacent cells
5. **Cursor Pointer**: Universal "clickable" indicator

---

## Empty State Design

```
┌─────────────────────────────────────┐
│                                      │
│           📅 (72px icon)            │
│                                      │
│      No Job Services Found           │
│                                      │
│  Try adjusting your date range or   │
│  check if there are any scheduled   │
│  services.                           │
│                                      │
└─────────────────────────────────────┘

Icon: #bdbdbd (light gray)
Heading: #424242 (dark gray)
Text: #666 (medium gray)
Padding: 80px vertical, 20px horizontal
```

---

## Typography Scale

```css
/* Headers */
h3 (empty state): 20px / 500 weight
.day-of-week: 12px / 600 weight / uppercase
.day-date: 11px / 400 weight

/* Content */
.item-type: 12px / 600 weight
.item-qty: 11px / 400 weight
.item-job: 10px / 400 weight / italic

/* All use line-height: 1.5 for readability */
```

---

## Responsive Breakpoints

```css
/* Desktop First Approach */
Default: 1920px+ (full calendar)
Tablet: 768px - 1919px (horizontal scroll)
Mobile: < 768px (vertical stack - future enhancement)
```

---

## Accessibility Features

### Color Blind Safe
- **Weekend**: Gray is universally distinguishable
- **Today**: Blue + border (not just color)
- **Hover**: Blue border + background (dual indicators)

### Screen Reader Support
```html
<!-- Semantic structure -->
<table role="grid">
  <th role="columnheader" [attr.aria-label]="Full date">
  <td role="gridcell" [attr.aria-label]="Cell description">
```

### Keyboard Navigation
- Tab through cells
- Hover styles apply on :focus
- Enter/Space to interact

---

## Print Styles (Future)

```css
@media print {
  /* Today highlighting */
  .day-header.today {
    background: #e0e0e0 !important;
    color: #000 !important;
    border: 2px solid #000 !important;
  }

  /* Weekend highlighting */
  .calendar-cell.weekend {
    background: #f5f5f5 !important;
  }

  /* Remove hover effects */
  .calendar-cell:hover {
    transform: none !important;
    box-shadow: none !important;
  }
}
```

---

## Performance Considerations

### GPU Acceleration
```css
/* These properties use GPU for smooth animations */
transform: scale(1.01);  /* ✅ GPU accelerated */
opacity: 0.9;            /* ✅ GPU accelerated */

/* Avoid these during animations */
width: 120px;            /* ❌ CPU layout recalc */
padding: 12px;           /* ❌ CPU layout recalc */
```

### CSS Containment
```css
/* Future optimization */
.calendar-cell {
  contain: layout style paint;
  /* Isolates cell from affecting rest of page */
}
```

---

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Gradient backgrounds | ✅ 88+ | ✅ 88+ | ✅ 14+ | ✅ 88+ |
| Transform scale | ✅ 88+ | ✅ 88+ | ✅ 14+ | ✅ 88+ |
| Box shadow inset | ✅ 88+ | ✅ 88+ | ✅ 14+ | ✅ 88+ |
| CSS transitions | ✅ 88+ | ✅ 88+ | ✅ 14+ | ✅ 88+ |

**Note**: All features work in modern browsers. No polyfills needed.

---

## Common Pitfalls & Solutions

### Issue 1: Hover jumps adjacent cells
```css
/* ❌ WRONG: Adds actual border (shifts layout) */
.calendar-cell:hover {
  border: 2px solid blue;
}

/* ✅ RIGHT: Uses inset shadow (no layout shift) */
.calendar-cell:hover {
  box-shadow: inset 0 0 0 2px blue;
}
```

### Issue 2: Today + Weekend conflict
```css
/* ❌ WRONG: Weekend overrides today */
.calendar-cell.weekend { background: gray; }
.calendar-cell.today { background: blue; }

/* ✅ RIGHT: Specific override for today+weekend */
.calendar-cell.today.weekend {
  background-color: #e3f2fd; /* Today wins */
}
```

### Issue 3: Hover animation laggy
```css
/* ❌ WRONG: Animates everything individually */
transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;

/* ✅ RIGHT: Animate all at once */
transition: all 0.3s ease;
```

---

## Testing Tools

### Color Contrast
- WebAIM Contrast Checker
- Chrome DevTools Accessibility Panel
- axe DevTools Extension

### Visual Regression
- Percy (visual diff testing)
- Chromatic (Storybook integration)
- Manual side-by-side comparison

### Performance
- Chrome DevTools Performance Panel
- Lighthouse Accessibility Audit
- Firefox DevTools Performance

---

## Maintenance Checklist

### When Adding New States
- [ ] Ensure WCAG AA contrast (4.5:1+)
- [ ] Add hover state
- [ ] Test with screen reader
- [ ] Check print preview
- [ ] Document in this guide

### When Changing Colors
- [ ] Run contrast checker
- [ ] Update color palette table
- [ ] Test colorblind simulation
- [ ] Update visual reference

### When Modifying Animations
- [ ] Test on slower devices
- [ ] Check for layout thrashing
- [ ] Verify GPU acceleration
- [ ] Test in reduced motion mode

---

## Quick Reference Cheat Sheet

```css
/* Weekend */
.weekend { background: #fafafa; }

/* Today */
.today { 
  background: #e3f2fd; 
  border-left: 3px solid #1976d2; 
}

/* Hover */
:hover { 
  background: #f5f5f5;
  box-shadow: inset 0 0 0 2px #2196f3;
  transform: scale(1.01);
}

/* Text Colors (WCAG AA) */
Primary: #333 (12.6:1)
Heading: #424242 (11.9:1)
Body: #616161 (7.0:1)
Support: #666 (5.7:1)
```

---

**Last Updated**: January 2025  
**Maintained By**: Development Team  
**Related Docs**: QUICK_WINS_IMPLEMENTATION.md, UI_UX_EVALUATION_AND_RECOMMENDATIONS.md
