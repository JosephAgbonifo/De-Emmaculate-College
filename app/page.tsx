import Contact from "@/components/home/Contact";
import Departments from "@/components/home/Departments";
import Hero from "@/components/home/Hero";
import More from "@/components/home/More";
import Theprincipal from "@/components/home/Theprincipal";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Emmaculate() {
  return (
    <div className="font-roboto overflow-x-hidden hide-scrollbar">
      <Hero />
      <WhyChooseUs />
      <Theprincipal />
      <More />
      <Departments />
      <Contact />
    </div>
  );
}
