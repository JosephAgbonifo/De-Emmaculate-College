import Contact from "@/src/components/home/Contact";
import Departments from "@/src/components/home/Departments";
import Hero from "@/src/components/home/Hero";
import More from "@/src/components/home/More";
import Theprincipal from "@/src/components/home/Theprincipal";
import WhyChooseUs from "@/src/components/home/WhyChooseUs";

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
