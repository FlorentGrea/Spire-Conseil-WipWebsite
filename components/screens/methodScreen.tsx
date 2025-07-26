"use client";

import { useState } from "react";
import SubsidiariteCircle from "../SubsidiariteCircle";

export default function MethodScreen() {
  const [selectedCircle, setSelectedCircle] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-16 px-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center" 
          style={{ color: 'var(--color-sc-quaternary)' }}>
        Notre Méthode
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
          <SubsidiariteCircle
            isVisible={true}
            drawingComplete={true}
            gradientRotation={0}
            activeHex={null}
            onHexInteraction={() => {}}
            onCenterClick={() => {}}
          />
      </div>
    </div>
  );
}
