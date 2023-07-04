import Banner from "../components/Banner";
import Features from "../components/Features";
import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <MenuBar />
      <main>
        <Banner />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
