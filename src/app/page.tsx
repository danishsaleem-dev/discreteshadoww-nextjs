import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Calligraphy from "@/components/Calligraphy";
import DigitalArt from "@/components/DigitalArt";
import Commission from "@/components/Commission";
import Footer from "@/components/Footer";
import { getAllArtworks, filterByCategory } from "@/lib/db";
import { ArtistJsonLd, GalleryJsonLd } from "@/components/JsonLd";

export default async function Home() {
  const all = await getAllArtworks();
  const paintings = filterByCategory(all, "Painting");
  const calligraphy = filterByCategory(all, "Calligraphy");
  const digital = filterByCategory(all, "Digital");
  const sketches = filterByCategory(all, "Sketch");

  return (
    <main id="top" className="relative">
      <ArtistJsonLd />
      <GalleryJsonLd />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Gallery artworks={paintings} />
      <Calligraphy artworks={calligraphy} />
      <DigitalArt digital={digital} sketches={sketches} />
      <Commission />
      <Footer />
    </main>
  );
}
