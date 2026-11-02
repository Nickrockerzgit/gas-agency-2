import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { About } from "./components/About";
import { AppPromo } from "./components/AppPromo";
import { Contact } from "./components/Contact";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header, TopStrip } from "./components/Header";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { Customers, Steps } from "./components/Process";
import { Safety } from "./components/Safety";
import { TruckDelivery } from "./components/TruckDelivery";
import { useRoute } from "./lib/router";
import { initSmoothScroll } from "./lib/smoothScroll";

export default function App() {
  const route = useRoute();
  useEffect(() => initSmoothScroll(), []);
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-primary"
      >
        Skip to main content
      </a>
      <TopStrip />
      <Header />
      <div className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <main id="main">
          {route === "/about" ? (
            <About />
          ) : (
            <>
              <Hero />
              <Pricing />
              <TruckDelivery />
              <AppPromo />
              <Customers />
              <Steps />
              <Safety />
              <Faq />
              <Contact />
            </>
          )}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
