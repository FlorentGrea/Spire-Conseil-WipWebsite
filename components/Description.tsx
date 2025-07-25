"use client";

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <div className="text-sc-tertiary leading-relaxed">
      <h3 className="text-lg font-bold text-sc-secondary mb-4">Description</h3>
      <div>
        {description}
      </div>
    </div>
  );
} 