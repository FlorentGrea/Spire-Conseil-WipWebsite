"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 text-center shadow-lg" style={{ backgroundColor: 'var(--color-sc-secondary)'}}>
      <div className="container mx-auto px-4">
        <p className="text-xs lg:text-xl" style={{ color: 'var(--color-sc-primary)'}}>
          © {currentYear} SPIRE Conseil. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}