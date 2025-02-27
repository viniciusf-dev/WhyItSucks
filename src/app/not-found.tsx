import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-retro-darkBlue p-4">
      <div className="pixel-card bg-retro-darkGray p-6 max-w-md w-full text-center">
        <h1 className="text-5xl font-pixel text-retro-red mb-6">404</h1>
        <div className="font-pixel-secondary text-xl text-white mb-6">
          GAME OVER
        </div>
        <p className="font-pixel-secondary text-retro-purple mb-6">
          The level you're looking for has been corrupted or doesn't exist.
        </p>
        <Link href="/" className="pixel-button inline-block">
          Return to Title Screen
        </Link>
      </div>
    </div>
  );
}