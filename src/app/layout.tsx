import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HidroEquipos y Albercas",
  description: "Asistente interno de diagnóstico de mantenimiento de albercas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
