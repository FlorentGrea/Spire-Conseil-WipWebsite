"use client";

interface CasUsageProps {
  useCase: string;
}

export default function CasUsage({ useCase }: CasUsageProps) {
  return (
    <div className="text-sc-tertiary leading-relaxed">
      <h3 className="text-lg font-bold text-sc-secondary mb-4">Cas d'usage</h3>
      <div>
        {useCase}
      </div>
    </div>
  );
} 