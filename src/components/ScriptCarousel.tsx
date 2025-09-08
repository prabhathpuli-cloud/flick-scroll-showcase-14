import { useRef } from "react";
import ScriptCard from "./ScriptCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Script {
  id: string;
  title: string;
  genre: string;
  duration: string;
  author: string;
  description: string;
  image: string;
  content: string;
}

interface ScriptCarouselProps {
  scripts: Script[];
  onScriptSelect: (script: Script) => void;
}

const ScriptCarousel = ({ scripts, onScriptSelect }: ScriptCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340; // Card width + gap
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="scripts" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-cinematic text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-primary">Scripts</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our handpicked selection of exceptional screenplays
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="bg-card/50 border-border/50 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="bg-card/50 border-border/50 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Scripts Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {scripts.map((script, index) => (
            <div 
              key={script.id} 
              className="animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ScriptCard
                {...script}
                onClick={() => onScriptSelect(script)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScriptCarousel;