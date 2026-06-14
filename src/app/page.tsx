import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Calligraphy from "@/components/Calligraphy";
import DigitalArt from "@/components/DigitalArt";
import Commission from "@/components/Commission";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top" className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Gallery />
      <Calligraphy />
      <DigitalArt />
      <Commission />
      <Footer />
    </main>
  );
}
