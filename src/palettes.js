// Single source of truth for every theme.
// Each palette holds the UI roles plus its own `syntax` colors, merged over the shared syntax below.
// A palette with `registered: false` is kept here but not built or listed in package.json.
'use strict';

// Blood & Gold base palette: #af8b4d gold, #85530a tarnished gold, #610605 blood, #642601 rust
// and #500c00 oxblood. Every role uses The Great Sleeper's contrast ratio on its editor background
// (noted after each value, measured on Wine), so the structure matches Sleeper while the hues stay
// in the palette's red, rust and gold family. "Lifted" means lightened to reach that ratio.
const bloodGoldSyntax = {
  comment: '#80605b', // oxblood ash, 3.10:1
  keyword: '#e75956', // blood #610605 lifted, 4.94:1
  type: '#db6f30', // rust #642601 lifted, 5.24:1
  constant: '#f3a595', // oxblood #500c00 lifted to coral rose, 8.80:1
  function: '#c3a776', // gold family, 7.55:1
  attribute: '#af8b4d', // the base gold itself, 5.49:1
  parameter: '#cfb6a5', // 9.02:1, in italics
  parameterItalic: true,
  string: '#eee0c3', // gold #af8b4d lifted to champagne, 13.32:1
  regexp: '#84a9c4', // cold steel, the one cool accent, 7.00:1
  tag: '#f3cdab', // pale amber, 11.71:1
  interpolation: '#af7e33', // tarnished gold #85530a lifted, 4.85:1
  component: '#d9984c', // 7.08:1
  variable: '#d2c9bf', // 10.64:1
  punctuation: '#c8beb8', // 9.54:1
  heading: '#fcf5e5',
  magenta: '#c4647c', // garnet: this / self / super, 4.52:1
  pink: '#ef8c9c', // macros, CSS functions, 7.37:1
  cssVariable: '#c98623', // tarnished gold #85530a lifted, 5.73:1
  cssProperty: '#c8beb8',
  deprecated: '#9f7d76',
  invalid: '#ffffff',
  info: '#84a9c4',
  warn: '#c98623',
  error: '#f2595e',
  debug: '#c4647c',
};

// Carfax Abbey Wine: a dark purple-red background at Sleeper's luminance.
const bloodGold = {
  id: 'bloodGold',
  name: 'Carfax Abbey Wine',
  file: 'carfax-abbey-wine-color-theme.json',
  // Main roles
  bg: '#29161e', // wine, same luminance as Sleeper's #181b28
  editorBg: '#26151c',
  contrastBg: '#492735', // 1.35:1 like Sleeper
  border: '#4f333e',
  accent: '#7c0907', // blood #610605, lifted a touch; white text 11.06:1
  accentHover: '#940e0b',
  fg: '#cbc4bc', // 10.07:1
  cyan: '#e9d4a8', // links and highlights: pale gold
  muted: '#9f7d76', // 4.70:1
  lineNumber: '#805f59', // 3.06:1
  activityBarInactiveForeground: '#805f59',
  light: '#d3b98b',
  red: '#f2595e',
  green: '#a2bb71', // moss: git additions and diffs
  modified: '#c98623',
  orange: '#ef8e38',
  // Values unique to this theme
  activityBarForeground: '#af8b4d',
  breadcrumbBackground: '#26151c',
  breadcrumbForeground: '#9f7d76',
  listSelection: '#492735',
  listErrorForeground: '#f2595e',
  statusBarForeground: '#9f7d76',
  statusBarDebuggingBackground: '#7c0907',
  statusBarDebuggingForeground: '#ffffff',
  tabActiveBorderTop: '#af8b4dcc',
  terminalBorder: '#4f333e',
  // Editor and workbench details
  breadcrumbFocusForeground: '#e9d4a8',
  findMatchBackground: '#85530a99',
  findMatchHighlightBackground: '#af8b4d40',
  inactiveSelectionBackground: '#7c090740',
  lineHighlightBackground: '#341e27',
  selectionBackground: '#5b2738',
  cursor: '#af8b4d',
  editorGroupDropBackground: '#7c090740',
  indentGuide: '#4f333e',
  suggestWidgetBorder: '#4f333e',
  whitespace: '#4f333e',
  gitIgnored: '#9f7d76',
  gitUntracked: '#a2bb71ee',
  tabInactiveForeground: '#9f7d76',
  terminal: {
    ansiBlack: '#1b0e13',
    ansiRed: '#e75956',
    ansiGreen: '#a2bb71',
    ansiYellow: '#d3b98b',
    ansiBlue: '#84a9c4',
    ansiMagenta: '#c4647c',
    ansiCyan: '#c3a776',
    ansiWhite: '#d2c9bf',
    ansiBrightBlack: '#80605b',
    ansiBrightRed: '#f2595e',
    ansiBrightGreen: '#bcd18f',
    ansiBrightYellow: '#e9d4a8',
    ansiBrightBlue: '#7c0907', // the button color, so labels such as "History restored" keep white text
    ansiBrightMagenta: '#ef8c9c',
    ansiBrightCyan: '#eee0c3',
    ansiBrightWhite: '#fcf5e5',
    foreground: '#d2c9bf',
    cursorBackground: '#26151c', // the character under a block cursor
    cursorForeground: '#af8b4d',
  },
  syntax: bloodGoldSyntax,
};

// Carfax Abbey Crypt Black: Wine's colors on a near-black background with a faint red tint.
// Syntax colors are unchanged and gain about 12% contrast (keywords 5.56:1, comments 3.49:1).
const bloodGoldCrypt = {
  ...bloodGold,
  id: 'bloodGoldCrypt',
  name: 'Carfax Abbey Crypt Black',
  file: 'carfax-abbey-crypt-black-color-theme.json',
  bg: '#0c0708',
  editorBg: '#110a0b',
  breadcrumbBackground: '#110a0b',
  contrastBg: '#2a1a1c',
  listSelection: '#2a1a1c',
  border: '#241517',
  terminalBorder: '#241517',
  indentGuide: '#241517',
  suggestWidgetBorder: '#2a1a1c',
  whitespace: '#241517',
  lineHighlightBackground: '#1c1012',
  selectionBackground: '#3e1a1e',
  terminal: { ...bloodGold.terminal, ansiBlack: '#1e1213', cursorBackground: '#110a0b' },
};

// Carfax Moonlit Castle: Van Helsing's night rooms, moon-blue windows, lantern violet and candle glow.
const moonlit = {
  id: 'moonlit',
  name: 'Carfax Moonlit Castle',
  file: 'carfax-moonlit-castle-color-theme.json',
  // PENDIENTE(moonlit-rework): set aside until it is reworked for the Blood & Gold base; not built.
  registered: false,
  bg: '#07080f',
  editorBg: '#0b0c16',
  contrastBg: '#1c2448',
  border: '#141830',
  accent: '#223777', // window blue; white text 11.2:1
  accentHover: '#2d4590',
  fg: '#c7c5c9',
  cyan: '#8fb4ff',
  muted: '#8a86a8',
  lineNumber: '#625c84',
  activityBarInactiveForeground: '#625c84',
  light: '#ebc3a7',
  red: '#e73032',
  green: '#7fb89a',
  modified: '#9d8fd8',
  orange: '#c98d45',
  activityBarForeground: '#c7c5c9',
  breadcrumbBackground: '#0b0c16',
  breadcrumbForeground: '#8a86a8',
  listSelection: '#1c2448',
  listErrorForeground: '#e73032',
  statusBarForeground: '#8a86a8',
  statusBarDebuggingBackground: '#e73032',
  statusBarDebuggingForeground: '#07080f',
  tabActiveBorderTop: '#8fb4ff9c',
  terminalBorder: '#141830',
  breadcrumbFocusForeground: '#ebeaf0',
  findMatchBackground: '#2d459099',
  findMatchHighlightBackground: '#8fb4ff33',
  inactiveSelectionBackground: '#22377740',
  lineHighlightBackground: '#10121f',
  selectionBackground: '#1f2a52',
  cursor: '#ebc3a7',
  editorGroupDropBackground: '#22377740',
  indentGuide: '#1c2040',
  suggestWidgetBorder: '#1c2040',
  whitespace: '#1c2040',
  gitIgnored: '#8a86a8',
  gitUntracked: '#7fb89aee',
  tabInactiveForeground: '#8a86a8',
  terminal: {
    ansiBlack: '#141830',
    ansiRed: '#e73032',
    ansiGreen: '#7fb89a',
    ansiYellow: '#ebc3a7',
    ansiBlue: '#5477c9',
    ansiMagenta: '#b089a3',
    ansiCyan: '#8fb4ff',
    ansiWhite: '#c7c5c9',
    ansiBrightBlack: '#6f5582',
    ansiBrightRed: '#ff6070',
    ansiBrightGreen: '#a3d4b8',
    ansiBrightYellow: '#f5dcc8',
    ansiBrightBlue: '#223777', // the button color
    ansiBrightMagenta: '#d9a7c7',
    ansiBrightCyan: '#b8d0ff',
    ansiBrightWhite: '#eceaf2',
    foreground: '#c7c5c9',
    cursorBackground: '#0b0c16',
    cursorForeground: '#ebc3a7',
  },
  syntax: {
    comment: '#6f5582', // violet shadow #544367, lifted
    keyword: '#5477c9', // moon-blue window #2b437f, lifted
    type: '#9d8fd8', // moonlit violet drapes
    constant: '#e73032', // blood red
    function: '#ebc3a7', // candle glow on skin
    attribute: '#c98d45',
    parameter: '#c98d45', // amber brocade
    parameterItalic: true,
    string: '#a8859e', // lantern violet
    regexp: '#8fb4ff', // cold moonlight
    tag: '#d9a7c7',
    interpolation: '#8fb4ff',
    component: '#b8a8f0',
    variable: '#c7c5c9',
    punctuation: '#a3a1b0',
    heading: '#ebc3a7',
    magenta: '#b089a3',
    pink: '#d9a7c7',
    cssVariable: '#9d8fd8',
    cssProperty: '#a3a1b0',
    deprecated: '#8a86a0',
    invalid: '#ffffff',
    info: '#8fb4ff',
    warn: '#c98d45',
    error: '#e73032',
    debug: '#9d8fd8',
  },
};

module.exports = { syntax: bloodGoldSyntax, themes: [bloodGold, bloodGoldCrypt, moonlit] };
