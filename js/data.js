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
      'photos/carfe-and-porsche/DSC_6400.jpg',
      'photos/carfe-and-porsche/DSC_6404.jpg',
      'photos/carfe-and-porsche/DSC_6416.jpg',
      'photos/carfe-and-porsche/DSC_6419.jpg',
      'photos/carfe-and-porsche/DSC_6422.jpg',
      'photos/carfe-and-porsche/DSC_6427.jpg',
      'photos/carfe-and-porsche/DSC_6429.jpg',
      'photos/carfe-and-porsche/DSC_6450.jpg',
      'photos/carfe-and-porsche/DSC_6455.jpg',
      'photos/carfe-and-porsche/DSC_6458.jpg',
      'photos/carfe-and-porsche/DSC_6471.jpg',
      'photos/carfe-and-porsche/DSC_6474.jpg',
      'photos/carfe-and-porsche/DSC_6477.jpg',
      'photos/carfe-and-porsche/DSC_6480.jpg',
      'photos/carfe-and-porsche/DSC_6482.jpg',
      'photos/carfe-and-porsche/DSC_6492.jpg',
      'photos/carfe-and-porsche/DSC_6551.jpg',
      'photos/carfe-and-porsche/DSC_6555.jpg',
      'photos/carfe-and-porsche/DSC_6560.jpg',
      'photos/carfe-and-porsche/DSC_6573.jpg',
      'photos/carfe-and-porsche/DSC_6585.jpg',
      'photos/carfe-and-porsche/DSC_6616.jpg',
      'photos/carfe-and-porsche/DSC_6619.jpg',
      'photos/carfe-and-porsche/DSC_6645.jpg',
      'photos/carfe-and-porsche/DSC_6662.jpg',
      'photos/carfe-and-porsche/DSC_6665.jpg',
      'photos/carfe-and-porsche/DSC_6668.jpg',
      'photos/carfe-and-porsche/DSC_6670.jpg',
      'photos/carfe-and-porsche/DSC_6679.jpg',
      'photos/carfe-and-porsche/DSC_6684.jpg',
      'photos/carfe-and-porsche/DSC_6686.jpg',
      'photos/carfe-and-porsche/DSC_6690.jpg',
      'photos/carfe-and-porsche/DSC_6694.jpg',
      'photos/carfe-and-porsche/DSC_6696.jpg',
      'photos/carfe-and-porsche/DSC_6699.jpg',
      'photos/carfe-and-porsche/DSC_6705.jpg',
      'photos/carfe-and-porsche/DSC_6711.jpg',
      'photos/carfe-and-porsche/DSC_6717.jpg',
      'photos/carfe-and-porsche/DSC_6753.jpg',
      'photos/carfe-and-porsche/DSC_6757.jpg',
      'photos/carfe-and-porsche/DSC_6761.jpg',
      'photos/carfe-and-porsche/DSC_6765.jpg',
      'photos/carfe-and-porsche/DSC_6766.jpg',
      'photos/carfe-and-porsche/DSC_6768.jpg',
      'photos/carfe-and-porsche/DSC_6770.jpg',
      'photos/carfe-and-porsche/DSC_6778.jpg',
      'photos/carfe-and-porsche/DSC_6799.jpg',
      'photos/carfe-and-porsche/DSC_6892.jpg',
      'photos/carfe-and-porsche/DSC_6900.jpg',
      'photos/carfe-and-porsche/DSC_6903.jpg',
      'photos/carfe-and-porsche/DSC_6927.jpg',
      'photos/carfe-and-porsche/DSC_6953.jpg',
      'photos/carfe-and-porsche/DSC_6954.jpg',
      'photos/carfe-and-porsche/DSC_6965.jpg',
      'photos/carfe-and-porsche/DSC_6969.jpg',
      'photos/carfe-and-porsche/DSC_6976.jpg',
      'photos/carfe-and-porsche/DSC_6979.jpg',
      'photos/carfe-and-porsche/DSC_6981.jpg',
      'photos/carfe-and-porsche/DSC_6986.jpg',
      'photos/carfe-and-porsche/DSC_6990.jpg',
      'photos/carfe-and-porsche/DSC_7001.jpg',
      'photos/carfe-and-porsche/DSC_7008.jpg',
      'photos/carfe-and-porsche/DSC_7015.jpg',
      'photos/carfe-and-porsche/DSC_7048.jpg',
      'photos/carfe-and-porsche/DSC_7065.jpg',
      'photos/carfe-and-porsche/DSC_7071.jpg',
      'photos/carfe-and-porsche/DSC_7085.jpg',
      'photos/carfe-and-porsche/DSC_7093.jpg',
      'photos/carfe-and-porsche/DSC_7095.jpg',
      'photos/carfe-and-porsche/DSC_7097.jpg',
      'photos/carfe-and-porsche/DSC_7109.jpg',
      'photos/carfe-and-porsche/DSC_7130.jpg',
      'photos/carfe-and-porsche/DSC_7140.jpg',
      'photos/carfe-and-porsche/DSC_7150.jpg',
      'photos/carfe-and-porsche/DSC_7164.jpg',
      'photos/carfe-and-porsche/DSC_7174.jpg',
    ]
  },

  // ── Event 6 ─────────────────────────────────────────────────
  {
    slug:   'maserati-gran-turismo',
    name:   'Maserati Gran Turismo',
    date:   '2025',
    cover:  'photos/maserati-gran-turismo/cover.jpg',
    photos: [
      'photos/maserati-gran-turismo/DSC_5323.jpg',
      'photos/maserati-gran-turismo/DSC_5376.jpg',
      'photos/maserati-gran-turismo/DSC_5513.jpg',
      'photos/maserati-gran-turismo/DSC_5544.jpg',
      'photos/maserati-gran-turismo/DSC_5609.jpg',
      'photos/maserati-gran-turismo/DSC_5642.jpg',
      'photos/maserati-gran-turismo/DSC_5671.jpg',
      'photos/maserati-gran-turismo/DSC_5701.jpg',
      'photos/maserati-gran-turismo/DSC_5755.jpg',
      'photos/maserati-gran-turismo/DSC_5776.jpg',
      'photos/maserati-gran-turismo/DSC_5796.jpg',
      'photos/maserati-gran-turismo/DSC_5801.jpg',
      'photos/maserati-gran-turismo/DSC_5806.jpg',
      'photos/maserati-gran-turismo/DSC_5816.jpg',
    ]
  },

  // ── Event 7 ─────────────────────────────────────────────────
  {
    slug:   'rwb-anniversary',
    name:   'RWB Anniversary',
    date:   '2025',
    cover:  'photos/rwb-anniversary/cover.jpg',
    photos: [
      'photos/rwb-anniversary/DSC_8700.jpg',
      'photos/rwb-anniversary/DSC_8719.jpg',
      'photos/rwb-anniversary/DSC_8726.jpg',
      'photos/rwb-anniversary/DSC_8736.jpg',
      'photos/rwb-anniversary/DSC_8782.jpg',
      'photos/rwb-anniversary/DSC_8808.jpg',
      'photos/rwb-anniversary/DSC_8821.jpg',
      'photos/rwb-anniversary/DSC_8839.jpg',
      'photos/rwb-anniversary/DSC_8856.jpg',
      'photos/rwb-anniversary/DSC_8860.jpg',
      'photos/rwb-anniversary/DSC_8893.jpg',
      'photos/rwb-anniversary/DSC_8917.jpg',
      'photos/rwb-anniversary/DSC_8963.jpg',
      'photos/rwb-anniversary/DSC_8979.jpg',
      'photos/rwb-anniversary/DSC_9033.jpg',
      'photos/rwb-anniversary/DSC_9059.jpg',
      'photos/rwb-anniversary/DSC_9126.jpg',
      'photos/rwb-anniversary/DSC_9180.jpg',
      'photos/rwb-anniversary/DSC_9191.jpg',
      'photos/rwb-anniversary/DSC_9238.jpg',
    ]
  },

  // ── Add more events below this line ─────────────────────────

];
