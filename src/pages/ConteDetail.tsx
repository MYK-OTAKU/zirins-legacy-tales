import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Languages,
  BookOpen,
  Eye
} from "lucide-react";

// Données d'exemple pour un conte
const conteData = {
  id: "1",
  title: "Le Lièvre et l'Hyène",
  category: "Sagesse",
  duration: "8 min",
  imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
  pages: [
    {
      id: 1,
      text: "Il était une fois, dans la savane africaine, un petit lièvre très malin qui vivait près d'un grand baobab. Tous les animaux le respectaient pour son intelligence et sa sagesse.",
      imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600"
    },
    {
      id: 2, 
      text: "Un jour, une hyène féroce arriva dans la région. Elle était énorme et terrorisait tous les animaux de la savane. Personne n'osait s'opposer à elle.",
      imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600"
    },
    {
      id: 3,
      text: "Le lièvre décida qu'il fallait faire quelque chose. Il élabora un plan astucieux pour débarrasser la savane de cette menace.",
      imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600"
    },
    {
      id: 4,
      text: "Grâce à sa ruse et son intelligence, le petit lièvre réussit à tromper la hyène et à la chasser de la savane. Tous les animaux furent sauvés.",
      imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600"
    }
  ],
  moral: "L'intelligence et la ruse peuvent triompher de la force brute. Il ne faut jamais sous-estimer quelqu'un à cause de sa taille."
};

const ConteDetail = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(480); // 8 minutes en secondes
  const [volume, setVolume] = useState([50]);
  const [language, setLanguage] = useState("fr");
  const [viewMode, setViewMode] = useState("pages");
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulation de la lecture audio
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleSkip = (direction: 'forward' | 'backward') => {
    const newTime = direction === 'forward' 
      ? Math.min(currentTime + 10, duration)
      : Math.max(currentTime - 10, 0);
    setCurrentTime(newTime);
  };

  const nextPage = () => {
    if (currentPage < conteData.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (viewMode === "continuous") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header avec contrôles */}
        <header className="sticky top-0 bg-background/95 backdrop-blur border-b z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <Link to="/contes">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Button
                  variant={language === "fr" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("fr")}
                >
                  FR
                </Button>
                <Button
                  variant={language === "bm" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("bm")}
                >
                  BM
                </Button>
                <Button
                  variant={viewMode === "pages" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("pages")}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Pages
                </Button>
              </div>
            </div>

            {/* Contrôles audio */}
            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <Button size="sm" onClick={() => handleSkip('backward')}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button onClick={handlePlayPause}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" onClick={() => handleSkip('forward')}>
                  <SkipForward className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-sm">{formatTime(currentTime)}</span>
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    onValueChange={handleSeek}
                    className="flex-1"
                  />
                  <span className="text-sm">{formatTime(duration)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4" />
                  <Slider
                    value={volume}
                    max={100}
                    step={1}
                    onValueChange={setVolume}
                    className="w-20"
                  />
                </div>
              </div>
            </Card>
          </div>
        </header>

        {/* Contenu continu */}
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{conteData.title}</h1>
            <Badge variant="secondary">{conteData.category}</Badge>
          </div>

          <div className="space-y-8">
            {conteData.pages.map((page) => (
              <div key={page.id} className="space-y-4">
                <img
                  src={page.imageUrl}
                  alt={`Illustration ${page.id}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-lg leading-relaxed">{page.text}</p>
              </div>
            ))}
            
            <Card className="bg-muted/50 p-6 mt-8">
              <h3 className="font-semibold mb-2">Morale de l'histoire :</h3>
              <p className="italic">{conteData.moral}</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/contes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button
                variant={language === "fr" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("fr")}
              >
                <Languages className="h-4 w-4 mr-1" />
                FR
              </Button>
              <Button
                variant={language === "bm" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("bm")}
              >
                <Languages className="h-4 w-4 mr-1" />
                BM
              </Button>
              <Button
                variant={viewMode === "continuous" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("continuous")}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Continu
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* En-tête du conte */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">{conteData.title}</h1>
          <div className="flex justify-center items-center space-x-4">
            <Badge variant="secondary">{conteData.category}</Badge>
            <span className="text-muted-foreground">{conteData.duration}</span>
            <span className="text-muted-foreground">
              Page {currentPage + 1} sur {conteData.pages.length}
            </span>
          </div>
        </div>

        {/* Page actuelle */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <img
              src={conteData.pages[currentPage].imageUrl}
              alt={`Page ${currentPage + 1}`}
              className="w-full h-96 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <p className="text-lg leading-relaxed">
                {conteData.pages[currentPage].text}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation des pages */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            Page précédente
          </Button>
          
          <div className="flex space-x-1">
            {conteData.pages.map((_, index) => (
              <Button
                key={index}
                variant={index === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(index)}
                className="w-8 h-8 p-0"
              >
                {index + 1}
              </Button>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            onClick={nextPage}
            disabled={currentPage === conteData.pages.length - 1}
          >
            Page suivante
          </Button>
        </div>

        {/* Contrôles audio */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <Button size="sm" onClick={() => handleSkip('backward')}>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="lg" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button size="sm" onClick={() => handleSkip('forward')}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm w-12">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span className="text-sm w-12">{formatTime(duration)}</span>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <Volume2 className="h-4 w-4" />
              <Slider
                value={volume}
                max={100}
                step={1}
                onValueChange={setVolume}
                className="w-32"
              />
              <span className="text-sm w-8">{volume[0]}%</span>
            </div>
          </div>
        </Card>

        {/* Morale (affiché seulement à la dernière page) */}
        {currentPage === conteData.pages.length - 1 && (
          <Card className="bg-muted/50 p-6 mt-6">
            <h3 className="font-semibold mb-2">Morale de l'histoire :</h3>
            <p className="italic">{conteData.moral}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConteDetail;