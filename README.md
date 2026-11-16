# Carfax Abbey

<!-- PENDIENTE(logo): add the header logo (assets/images/carfax-logo.png, built by `npm run icons`) once it exists:
<p align="center"><img src="https://raw.githubusercontent.com/rgsx/carfax-abbey/master/assets/images/carfax-logo.png" width="100" height="100"></p>
-->

Gothic dark themes for Visual Studio Code and Cursor, named after the Count's English house in Bram Stoker's _Dracula_. Blood, rust and old gold, built for long sessions at night.

Carfax Abbey is an independent theme and is not affiliated with or endorsed by Dracula Theme.

The themes cover the current workbench and Cursor UI (chat and inline edits, command center, sticky scroll, bracket pairs, inlay hints, diffs and merge editor) and use semantic highlighting.

## The themes

Both share one syntax palette and differ only in their backgrounds:

- **Carfax Abbey Wine**: a dark purple-red background, as bright as The Great Sleeper's.
- **Carfax Abbey Crypt Black**: a near-black background with a faint red tint, for a little more contrast.

Every color comes from a five-color base palette: gold `#af8b4d`, tarnished gold `#85530a`, blood `#610605`, rust `#642601` and oxblood `#500c00`. Each syntax role is lifted to the contrast ratio that [The Great Sleeper](https://open-vsx.org/extension/rgsx/great-dreamer) uses for it. Keywords are blood red, types rust, constants coral rose, and strings champagne gold, with a single cold steel blue for regular expressions.

<!-- PENDIENTE(screenshots): no screenshots yet. Put full-window shots in assets/screenshots/src/
(wine.png, wine-2.png, crypt.png, crypt-2.png), run `npm run screenshots`, then link
assets/screenshots/{wine,crypt}-{1,2}.png here via raw.githubusercontent.com. -->

# Installation

Search for `carfax-abbey` in the Extensions view of VS Code or Cursor ([Open VSX](https://open-vsx.org/extension/rgsx/carfax-abbey)), install it, then pick **Carfax Abbey Wine** or **Carfax Abbey Crypt Black** under Preferences: Color Theme.

To install a `.vsix` file instead, run **Extensions: Install from VSIX...** from the Command Palette, or use `cursor --install-extension carfax-abbey-0.1.0.vsix` (`code --install-extension ...` for VS Code).

## Build from source

All themes are generated from one source, so edit `src/` rather than `themes/*.json`:

- `src/palettes.js`: the palette of each theme (a theme can override the shared syntax colors with its own `syntax`)
- `src/ui-colors.js`: workbench colors
- `src/token-colors.js` and `src/semantic-token-colors.js`: syntax colors

```sh
npm run build        # regenerates themes/*.json (Node only, no dependencies)
npm run build:check  # fails if themes/ or the theme list in package.json is out of date
npm run package      # builds carfax-abbey-<version>.vsix
npm run icons        # builds the 256 px icon from the 2048 px master logo (needs Pillow)
npm run screenshots  # scales the README screenshots (needs Pillow)
```

To try changes, open the folder in VS Code or Cursor and press F5. The `demo/` folder has sample files in many languages (TypeScript, JSX/TSX, Vue, Svelte, HTML, CSS, Python, Ruby, C#, Rust, JSON, YAML and Markdown) for checking the colors.

## Contrast

Measured against each theme's editor background (WCAG contrast ratio):

| Theme                    | Syntax colors  | Comments | Line numbers | White on buttons |
| ------------------------ | -------------- | -------- | ------------ | ---------------- |
| Carfax Abbey Wine        | 4.53:1 or more | 3.10:1   | 3.07:1       | 11.06:1          |
| Carfax Abbey Crypt Black | 5.09:1 or more | 3.49:1   | 3.45:1       | 11.06:1          |

In the terminal, the character under a block cursor stays visible, and bright blue matches the blood-red buttons so labels shown on it keep white text.

# Changelog

See [CHANGELOG.md](CHANGELOG.md).

# License

[MIT](LICENSE).

:bat:
