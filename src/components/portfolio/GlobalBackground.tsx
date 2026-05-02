import { lazy, Suspense } from "react";
import OrbitingBadges from "./OrbitingBadges";

const HeroScene = lazy(() => import("./HeroScene"));

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 opacity-15 dark:mix-blend-screen mix-blend-multiply">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      <div className="absolute inset-0 opacity-30">
        <OrbitingBadges />
      </div>
    </div>
  );
};

export default GlobalBackground;
