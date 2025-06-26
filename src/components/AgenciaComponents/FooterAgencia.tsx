import React from "react";

interface FooterAgenciaProps {
  agenciaName: string;
}

export default function FooterAgencia({ agenciaName }: FooterAgenciaProps) {
  return (
    <footer
      className="border-t border-gray-300 py-2 text-center text-sm text-gray-600"
    >
      <p>© {new Date().getFullYear()} {agenciaName}</p>
    </footer>
  );
}
