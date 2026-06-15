import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/** Standard marketing-page chrome: fixed nav + content + footer. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
