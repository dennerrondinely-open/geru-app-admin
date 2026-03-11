import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "GERU Admin",
  description: "Painel de administração Geru",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
