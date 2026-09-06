import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="px-6 max-w-7xl mx-auto w-full flex-1">{children}</div>
      <Footer />
    </>
  );
}