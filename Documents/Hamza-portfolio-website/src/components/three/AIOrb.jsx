import MatrixRain from '../ui/MatrixRain';

// We kept the file/component name `AIOrb` to avoid breaking imports in App.jsx,
// but the component has been entirely hollowed out and replaced with the hyper-performant 
// 2D Matrix Rain canvas as per the user's explicit request for maximum performance.
export default function AIOrb() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-bg-primary/50">
      {/* 
        Global background matrix rain returned to classic high-contrast neon green
        but dialed down heavily in opacity to preserve text legibility globally.
      */}
      <MatrixRain color="#39ff14" opacity={0.15} />
    </div>
  );
}
