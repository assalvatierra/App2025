# Calendar View Modes

## Overview
The client calendar component supports two view modes: **Compact** and **Expanded**.

## View Mode Features

### Compact Mode (Default)
- **Icon-based display**: Shows item type as an icon instead of text
- **Minimal information**: Displays only the quantity number without label
- **Space-efficient**: Items are displayed horizontally with rounded pill design
- **Tooltip on hover**: Full details (job reference, notes, dates) appear on mouse hover
- **Service Requirements Icon colors** (Gray theme):
  - 🚚 Vehicle/Truck: Gray 600 (#757575)
  - 👤 Driver/Person: Gray 700 (#616161)
  - 🔧 Equipment/Tool: Gray 500 (#9e9e9e)
  - ⛽ Fuel: Gray 600 (#757575)
  - 📦 Other: Gray 500 (#9e9e9e)
- **Assigned Resources Icon colors**:
  - 👤 Driver/Person: Green (#4caf50)
  - 🚚 Vehicle: Blue (#2196f3)
  - 🔧 Equipment: Orange (#ff9800)
  - ⚙️ Other: Purple (#673ab7)

### Expanded Mode
- **Full text display**: Shows complete item type name
- **Detailed information**: Displays:
  - Item type with icon
  - Quantity with label
  - Job reference
  - Notes (if available)
- **Card-style layout**: Vertical stack with left border accent
- **More readable**: Better for detailed review of calendar items

## Usage

### Toggle View Mode
Use the button toggle in the date filter toolbar:
- Click "Compact" for condensed view
- Click "Expanded" for detailed view

### Tooltips
Both modes support tooltips that show:
- Customer name
- Job reference
- Item type
- Quantity
- Date range (from - to)
- Notes (if available)

## When to Use Each Mode

### Use Compact Mode When:
- You need to see more data at once
- Screen space is limited
- You're familiar with the data and just need quick overview
- You're looking for patterns across multiple days/customers

### Use Expanded Mode When:
- You need to read detailed information
- You're reviewing specific job requirements
- Notes and job references are important
- You prefer more readable, card-based layout

## Technical Implementation

### Component Structure
- **CalendarCellComponent**: Handles individual cell rendering
- **Client-calendar component**: Manages view mode state
- View mode is passed as `@Input()` to calendar cells
- Uses Material Design icons and components

### Styling
- Compact: Rounded pills with horizontal layout
- Expanded: Vertical cards with left border
- Hover effects on both modes for better interactivity
- Responsive design adapts to different screen sizes
