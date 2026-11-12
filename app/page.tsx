import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PackagesSection from "@/components/PackagesSection";
import HowItWorks from "@/components/HowItWorks";
import LeadForm from "@/components/form/LeadForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PackagesSection />
        <HowItWorks />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
