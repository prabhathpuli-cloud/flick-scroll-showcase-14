import { useState } from "react";
import Hero from "@/components/Hero";
import ScriptCarousel from "@/components/ScriptCarousel";
import ScriptModal from "@/components/ScriptModal";

// Import script images
import noirImage from "@/assets/script-noir.jpg";
import romanceImage from "@/assets/script-romance.jpg";
import scifiImage from "@/assets/script-scifi.jpg";
import dramaImage from "@/assets/script-drama.jpg";

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

const mockScripts: Script[] = [
  {
    id: "1",
    title: "Midnight in the Alley",
    genre: "Noir Thriller",
    duration: "120 min",
    author: "Sarah Mitchell",
    description: "A detective's pursuit of truth leads through the darkest corners of the city, where every shadow hides a secret and every witness has something to lose.",
    image: noirImage,
    content: `FADE IN:

EXT. RAIN-SOAKED ALLEY - NIGHT

The city breathes through its pores of neon and shadow. Detective JACK STONE (45) steps carefully around puddles that reflect the flickering streetlight above.

JACK
(into radio)
I'm at the scene. Send backup.

A FIGURE emerges from the shadows, coat collar turned up against the rain.

MYSTERIOUS FIGURE
You're too late, Detective. The truth died with her.

JACK spins around, hand moving to his holster.

JACK
Who are you?

But the figure has vanished into the maze of fire escapes and broken dreams that make up this forgotten corner of the city.

FADE TO BLACK.

TITLE CARD: "Some secrets are worth killing for"

FADE IN:

INT. POLICE STATION - MORNING

The fluorescent lights buzz like dying insects. JACK sits at his desk, studying crime scene photos spread before him like tarot cards predicting doom.`
  },
  {
    id: "2",
    title: "Coffee Shop Serenade",
    genre: "Romantic Comedy",
    duration: "95 min",
    author: "Michael Chen",
    description: "When a barista with dreams of Broadway meets a music producer hiding his identity, their daily coffee ritual becomes the soundtrack to an unexpected love story.",
    image: romanceImage,
    content: `FADE IN:

INT. COZY CORNER CAFÉ - MORNING

Sunlight streams through large windows, casting golden rectangles across worn wooden floors. LILY MARTINEZ (28) hums while crafting the perfect latte, her movements choreographed like a dance.

The bell above the door chimes. ALEX THOMPSON (32) enters, hoodie up, trying to blend in but failing to hide the exhaustion in his eyes.

LILY
(bright smile)
The usual mysterious stranger special?

ALEX
(surprised by her warmth)
You... remember my order?

LILY
Large coffee, black, with a side of brooding silence. Hard to forget.

ALEX can't help but smile - the first genuine one we've seen.

ALEX
I'm not that predictable.

LILY
(playful)
Prove it. Try something new.

She slides a steaming mug across the counter. Their fingers brush for just a moment.

LILY (CONT'D)
Cinnamon vanilla latte. Trust me.

ALEX takes a sip, his eyes widening in pleasant surprise.`
  },
  {
    id: "3",
    title: "Neural Highway",
    genre: "Sci-Fi Thriller",
    duration: "135 min",
    author: "David Kim",
    description: "In 2087, a memory hacker discovers that erasing traumatic experiences comes with a price: the elimination of the capacity for human empathy.",
    image: scifiImage,
    content: `FADE IN:

EXT. NEW TOKYO - 2087 - NIGHT

Neon advertisements float holographically between towering spires of glass and steel. Flying vehicles trace light trails through the smog-filtered sky.

INT. UNDERGROUND CLINIC - CONTINUOUS

DR. ELENA VASQUEZ (35) adjusts the neural interface headset on her patient, JAMES WRIGHT (40s), whose trembling hands betray his desperation.

ELENA
Are you certain about this, James? Once I delete these memories, there's no going back.

JAMES
(haunted)
I can't live with what I've seen. What I've done.

Elena's fingers hover over the holographic controls. The memory extraction software pulses with ethereal blue light.

ELENA
Initiating memory partition... Beginning extraction in 3... 2... 1...

The room fills with the soft hum of advanced technology. On her monitor, we see fragments of James's memories - war, loss, unbearable grief - being systematically deleted.

Suddenly, an ERROR MESSAGE flashes:

"WARNING: EMPATHY CENTERS COMPROMISED"

Elena's eyes widen in horror.

ELENA
(whispered)
What have I done?`
  },
  {
    id: "4",
    title: "The Last Garden",
    genre: "Period Drama",
    duration: "148 min",
    author: "Elizabeth Hartwell",
    description: "Set in 1920s England, a widowed estate owner fights to preserve her ancestral home and gardens while navigating the changing social landscape of post-war Britain.",
    image: dramaImage,
    content: `FADE IN:

EXT. HARTWELL MANOR - DAWN - 1924

Mist rises from perfectly manicured gardens. The manor house stands proud against the English countryside, its Georgian facade bearing witness to centuries of history.

INT. MANOR HOUSE - MORNING ROOM - CONTINUOUS

LADY MARGARET HARTWELL (42) sits at an antique writing desk, reviewing financial documents. Her black mourning dress contrasts sharply with the room's warm morning light.

A knock at the door. JENKINS (60s), the family butler, enters with practiced discretion.

JENKINS
My Lady, Mr. Pemberton from the bank has arrived.

Margaret's pen pauses mid-signature.

MARGARET
Already? Show him in, Jenkins.

MR. PEMBERTON (50s) enters, his modern suit and calculating eyes marking him as a man of new money and little sentiment.

PEMBERTON
Lady Hartwell, I'm afraid the estate's debts have reached a critical point. Without immediate payment...

MARGARET
(interrupting, with quiet dignity)
Mr. Pemberton, this estate has weathered the Hundred Years' War, the English Civil War, and Napoleon. Surely it can weather one banker.

She rises, moving to the window that overlooks her beloved gardens.

MARGARET (CONT'D)
These gardens have bloomed for four hundred years. I will not be the generation that lets them die.`
  }
];

const Index = () => {
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScriptSelect = (script: Script) => {
    setSelectedScript(script);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedScript(null);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <ScriptCarousel 
        scripts={mockScripts} 
        onScriptSelect={handleScriptSelect}
      />
      <ScriptModal 
        script={selectedScript}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Index;
