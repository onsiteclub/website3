/** Official-style store badge buttons — Apple / Google Play / Web */

function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" className="store-icon">
      <path fill="#fff" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-62.1 24-72.5-24 1.3-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 512 512" className="store-icon">
      <path fill="#4285F4" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" />
      <path fill="#34A853" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
      <path fill="#FBBC04" d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
      <path fill="#EA4335" d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg viewBox="0 0 24 24" className="store-icon">
      <path fill="rgba(255,255,255,0.8)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

const ICON_MAP = { ios: AppleIcon, android: PlayIcon, web: WebIcon };

const SUBTITLE_MAP: Record<string, string> = {
  ios: 'Download on the',
  android: 'Get it on',
  web: 'Open',
};

export interface StorePlatform {
  icon: 'ios' | 'android' | 'web';
  url: string;
  label: string;
}

export default function StoreButton({ platform }: { platform: StorePlatform }) {
  const Icon = ICON_MAP[platform.icon];
  const subtitle = SUBTITLE_MAP[platform.icon];
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="store-badge"
    >
      <Icon />
      <span className="store-badge-text">
        <span className="store-badge-sub">{subtitle}</span>
        <span className="store-badge-name">{platform.label}</span>
      </span>
    </a>
  );
}
