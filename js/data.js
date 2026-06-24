// ═══════════════════════════════════════════════════════════════
//  EVENT DATA — edit this file to add / update your events
// ═══════════════════════════════════════════════════════════════
//
//  Each event object accepts these fields:
//
//    slug    (required) — URL-safe identifier, no spaces or special chars
//                         e.g. "cars-and-coffee-miami-2024"
//
//    name    (required) — Display name shown on cards and the event page
//                         e.g. "Cars & Coffee Miami"
//
//    date    (optional) — Any string, shown as a subtitle on the event page
//                         e.g. "March 15, 2024"  or  "March 2024"
//
//    cover   (optional) — Path to the hero / cover image for this event.
//                         Shown as the card thumbnail and event page banner.
//                         e.g. "photos/cars-and-coffee-miami-2024/cover.jpg"
//
//    photos  (required) — Array of image paths for the gallery.
//                         Tip: name your files 01.jpg, 02.jpg … for easy ordering.
//
// ─────────────────────────────────────────────────────────────
//  FOLDER CONVENTION (recommended):
//
//    photos/
//    └── <slug>/
//        ├── cover.jpg   ← hero image
//        ├── 01.jpg
//        ├── 02.jpg
//        └── ...
//
//  To add a new event:
//    1. Create a folder  photos/<your-slug>/
//    2. Drop your photos in
//    3. Add a new object below, following the same pattern
// ═══════════════════════════════════════════════════════════════

const EVENTS = [

  // ── Example event 1 ─────────────────────────────────────────
  {
    slug:   'retrohavoc-2025',
    name:   'RetroHavoc 2025',
    date:   '2025',
    cover:  'photos/retrohavoc-2025/cover.jpg',
    photos: [
      'photos/retrohavoc-2025/01.jpg',
      'photos/retrohavoc-2025/02.jpg',
      'photos/retrohavoc-2025/03.jpg',
      'photos/retrohavoc-2025/04.jpg',
      'photos/retrohavoc-2025/05.jpg',
    ]
  },

  // ── Event 2 ─────────────────────────────────────────────────
  {
    slug:   'distrix14-2025',
    name:   'DISTRIX14 2025',
    date:   '2025',
    cover:  'photos/distrix14-2025/cover.jpg',
    photos: [
      'photos/distrix14-2025/01.jpg',
      'photos/distrix14-2025/02.jpg',
      'photos/distrix14-2025/03.jpg',
    ]
  },

  // ── Event 3 ─────────────────────────────────────────────────
  {
    slug:   'miapex-2025',
    name:   'MIAPEX 2025',
    date:   '2025',
    cover:  'photos/miapex-2025/cover.jpg',
    photos: [
      'photos/miapex-2025/01.jpg',
      'photos/miapex-2025/02.jpg',
      'photos/miapex-2025/03.jpg',
    ]
  },

  // ── Event 4 ─────────────────────────────────────────────────
  {
    slug:   'sepang-2025',
    name:   'SEPANG 2025',
    date:   '2025',
    cover:  'photos/sepang-2025/cover.jpg',
    photos: [
      'photos/sepang-2025/01.jpg',
      'photos/sepang-2025/02.jpg',
      'photos/sepang-2025/03.jpg',
    ]
  },

  // ── Event 5 ─────────────────────────────────────────────────
  {
    slug:   'carfe-and-porsche',
    name:   'Carfe & Porsche',
    date:   'April 6, 2024',
    cover:  'photos/carfe-and-porsche/cover.jpg',
    photos: [
      'photos/carfe-and-porsche/01.jpg',
      'photos/carfe-and-porsche/02.jpg',
      'photos/carfe-and-porsche/03.jpg',
      'photos/carfe-and-porsche/04.jpg',
    ]
  },

  // ── Event 6 ─────────────────────────────────────────────────
  {
    slug:   'maserati-gran-turismo',
    name:   'Maserati Gran Turismo',
    date:   '2025',
    cover:  'photos/maserati-gran-turismo/cover.PNG',
    photos: [
      'photos/maserati-gran-turismo/DSC_5323.PNG',
      'photos/maserati-gran-turismo/DSC_5376.PNG',
      'photos/maserati-gran-turismo/DSC_5513.PNG',
      'photos/maserati-gran-turismo/DSC_5544.PNG',
      'photos/maserati-gran-turismo/DSC_5609.PNG',
      'photos/maserati-gran-turismo/DSC_5642.PNG',
      'photos/maserati-gran-turismo/DSC_5671.PNG',
      'photos/maserati-gran-turismo/DSC_5701.PNG',
      'photos/maserati-gran-turismo/DSC_5755.PNG',
      'photos/maserati-gran-turismo/DSC_5776.PNG',
      'photos/maserati-gran-turismo/DSC_5796.PNG',
      'photos/maserati-gran-turismo/DSC_5801.PNG',
      'photos/maserati-gran-turismo/DSC_5806.PNG',
      'photos/maserati-gran-turismo/DSC_5816.PNG',
    ]
  },

  // ── Add more events below this line ─────────────────────────

];
