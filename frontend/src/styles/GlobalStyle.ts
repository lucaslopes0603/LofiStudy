import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #11090d;
    --panel: rgba(43, 19, 25, 0.72);
    --panel-strong: #251017;
    --wine: #6f2435;
    --wine-2: #8d3040;
    --coral: #f58673;
    --rose: #d95d65;
    --cream: #f7d8bf;
    --muted: #bfa5a1;
    --line: rgba(247, 216, 191, 0.12);
    --shadow: 0 24px 80px rgba(0, 0, 0, 0.38);
    color-scheme: dark;
    font-family: 'Manrope', sans-serif;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background:
      radial-gradient(circle at 15% 8%, rgba(141, 48, 64, 0.34), transparent 28%),
      radial-gradient(circle at 84% 20%, rgba(245, 134, 115, 0.14), transparent 26%),
      linear-gradient(135deg, #0c0709 0%, #170b11 48%, #261018 100%);
    color: #fff7ec;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: .22;
    background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
    background-size: 46px 46px;
    mask-image: linear-gradient(to bottom, #000, transparent 86%);
  }

  button, input, select, textarea { font: inherit; }
  button { cursor: pointer; }
  a { color: inherit; text-decoration: none; }
`;
