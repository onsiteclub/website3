import { useTranslations } from 'next-intl';

/* Blueprint line data: [x%, y%, width/height in px, isVertical, color, thickEnd]
   color: 0=gray  1=black  2=amber
   thickEnd: 0=thick-left/top → thin-right/bottom, 1=opposite */
const BP: [number, number, number, boolean, number, number][] = [
  // Top-left open rect
  [6, 10, 180, false, 0, 0],
  [6, 10, 140, true,  2, 1],
  [18, 10, 100, true,  1, 0],

  // Left bracket (mid)
  [4, 42, 120, false, 2, 0],
  [14, 42, 120, true,  0, 1],
  [4, 55, 90,  false, 1, 1],

  // Left vertical mark
  [2, 28, 80, true, 0, 0],
  [2, 28, 60, false, 1, 1],

  // Lower-left cluster
  [8, 68, 100, true, 1, 0],
  [8, 80, 130, false, 0, 1],
  [20, 73, 70, true, 2, 0],

  // Bottom-left fragments
  [12, 86, 110, false, 1, 1],
  [3, 90, 70, true, 0, 1],

  // Left scattered
  [22, 30, 100, false, 0, 1],
  [30, 24, 80, true, 1, 0],
  [15, 62, 90, false, 2, 0],

  // Upper transition zone (between text and models)
  [35, 7, 130, false, 1, 1],
  [35, 7, 100, true, 0, 0],
  [44, 7, 60, true, 0, 1],

  // Mid transition
  [32, 33, 110, false, 0, 1],
  [38, 28, 80, true, 1, 0],
  [35, 40, 80, false, 2, 0],

  // Top edge marks
  [50, 3, 80, false, 1, 1],
  [50, 3, 40, true, 0, 0],

  // Far right edge marks (border area)
  [96, 15, 180, true, 0, 0],
  [96, 15, 50, false, 2, 1],
  [97, 50, 140, true, 1, 1],
  [93, 85, 80, false, 0, 0],
  [93, 85, 60, true, 2, 1],

  // Right mid bracket
  [90, 35, 100, true, 0, 1],
  [90, 35, 70, false, 1, 0],

  // Bottom edge marks
  [25, 93, 140, false, 0, 0],
  [25, 93, 50, true, 2, 1],
  [45, 90, 90, false, 1, 1],
  [55, 90, 60, true, 0, 0],
  [70, 95, 110, false, 2, 0],
  [80, 92, 50, true, 1, 1],
];

const COLORS = [
  ['rgba(160,160,160,0.40)', 'rgba(160,160,160,0.08)'],   // gray
  ['rgba(0,0,0,0.50)',       'rgba(0,0,0,0.10)'],          // black
  ['rgba(212,175,55,0.25)',  'rgba(212,175,55,0.05)'],     // amber
];

function BlueprintLines() {
  return (
    <div className="opening-blueprint">
      {BP.map(([x, y, len, vert, c, flip], i) => {
        const thick = COLORS[c][0];
        const thin  = COLORS[c][1];
        const from = flip ? thin : thick;
        const to   = flip ? thick : thin;
        const grad = vert
          ? `linear-gradient(to bottom, ${from}, ${to})`
          : `linear-gradient(to right, ${from}, ${to})`;
        const style: React.CSSProperties = {
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          width:  vert ? '1.5px' : `${len}px`,
          height: vert ? `${len}px` : '1.5px',
          background: grad,
          pointerEvents: 'none',
        };
        return <div key={i} style={style} />;
      })}
    </div>
  );
}

export default function Opening() {
  const t = useTranslations('opening');

  return (
    <section className="opening">
      <div className="opening-bg" />

      <BlueprintLines />

      <span className="corner tl">45°25&apos;N 75°41&apos;W</span>
      <span className="corner tr">EST. 2024</span>
      <span className="corner br">ONTARIO, CA</span>

      <div className="opening-content">
        <div className="opening-pre">{t('tagline')}</div>
        <h1>
          {t('title_1')}<br />
          <span className="word-amber">{t('title_2')}</span><br />
          {t('title_3')}
        </h1>
        <p className="opening-sub">{t('subtitle')}</p>
        <a href="#blueprint" className="opening-scroll">
          <span className="opening-scroll-text">{t('scroll')}</span>
          <span className="opening-scroll-arrow" />
        </a>
      </div>
    </section>
  );
}
