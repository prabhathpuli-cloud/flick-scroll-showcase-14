import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Clock, User, Download, Share } from "lucide-react";

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

interface ScriptModalProps {
  script: Script | null;
  isOpen: boolean;
  onClose: () => void;
}

const ScriptModal = ({ script, isOpen, onClose }: ScriptModalProps) => {
  if (!script) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gradient-card border-border/50 p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {script.genre}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{script.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{script.author}</span>
                  </div>
                </div>
              </div>
              
              <DialogTitle className="font-cinematic text-3xl font-bold text-foreground mb-3">
                {script.title}
              </DialogTitle>
              
              <p className="text-muted-foreground leading-relaxed">
                {script.description}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <Download className="w-4 h-4 mr-2" />
              Download Script
            </Button>
            <Button variant="outline" className="border-border/50 hover:bg-primary hover:text-primary-foreground">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </DialogHeader>

        {/* Script Content */}
        <ScrollArea className="px-6 pb-6 max-h-[60vh]">
          <div className="bg-background/50 rounded-lg p-6 mt-6 border border-border/30">
            <h3 className="font-cinematic text-xl font-semibold mb-4 text-primary">
              Script Preview
            </h3>
            <div className="font-mono text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
              {script.content}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ScriptModal;