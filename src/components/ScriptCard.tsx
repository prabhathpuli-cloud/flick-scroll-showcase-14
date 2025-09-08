import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, User } from "lucide-react";

interface ScriptCardProps {
  id: string;
  title: string;
  genre: string;
  duration: string;
  author: string;
  description: string;
  image: string;
  onClick: () => void;
}

const ScriptCard = ({ title, genre, duration, author, description, image, onClick }: ScriptCardProps) => {
  return (
    <Card 
      className="group relative min-w-[320px] max-w-[320px] bg-gradient-card border-border/50 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-glow overflow-hidden"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary/90 rounded-full p-4 backdrop-blur-sm">
            <Play className="w-8 h-8 text-primary-foreground fill-current" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {genre}
          </Badge>
        </div>

        <h3 className="font-cinematic text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{author}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScriptCard;