import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToScripts = () => {
    const scriptsSection = document.getElementById('scripts');
    scriptsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Cinematic theater backdrop" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-cinematic text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Cinematic
          </span>{" "}
          <span className="text-foreground">Scripts</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light leading-relaxed animate-fade-in [animation-delay:200ms]">
          Discover exceptional stories in our curated collection of premium scripts
        </p>

        <Button 
          onClick={scrollToScripts}
          size="lg" 
          className="bg-gradient-primary hover:shadow-glow transition-all duration-500 text-lg px-8 py-6 animate-fade-in [animation-delay:400ms]"
        >
          Explore Scripts
        </Button>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <ChevronDown 
            className="w-8 h-8 text-primary cursor-pointer opacity-70 hover:opacity-100 transition-opacity" 
            onClick={scrollToScripts}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;