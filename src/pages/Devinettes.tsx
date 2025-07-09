import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Trophy, Star } from "lucide-react";

interface Devinette {
  id: string;
  question: string;
  answer: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
  points: number;
  category: string;
}

// Données d'exemple
const devinettesData: Devinette[] = [
  {
    id: "1",
    question: "Je suis plus rapide que le vent, mais on peut me voir sans me toucher. Qui suis-je ?",
    answer: "L'ombre",
    difficulty: "Facile",
    points: 10,
    category: "Nature"
  },
  {
    id: "2",
    question: "J'ai des dents mais je ne mords pas, j'ai une langue mais je ne parle pas. Qui suis-je ?",
    answer: "Le peigne",
    difficulty: "Moyen",
    points: 20,
    category: "Objets"
  },
  {
    id: "3",
    question: "Plus je grandis, plus je deviens petit. Plus on me nourrit, plus j'ai faim. Qui suis-je ?",
    answer: "Le feu",
    difficulty: "Difficile",
    points: 30,
    category: "Éléments"
  },
  {
    id: "4",
    question: "Je marche sans jambes, je cours sans pieds, et pourtant je parcours le monde. Qui suis-je ?",
    answer: "La rivière",
    difficulty: "Moyen",
    points: 20,
    category: "Nature"
  }
];

const Devinettes = () => {
  const [selectedDevinette, setSelectedDevinette] = useState<Devinette | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<string[]>([]);

  const handleSubmitAnswer = () => {
    if (!selectedDevinette) return;
    
    const isCorrect = userAnswer.toLowerCase().trim() === selectedDevinette.answer.toLowerCase();
    
    if (isCorrect && !answered.includes(selectedDevinette.id)) {
      setScore(score + selectedDevinette.points);
      setAnswered([...answered, selectedDevinette.id]);
    }
    
    setShowAnswer(true);
  };

  const resetDevinette = () => {
    setSelectedDevinette(null);
    setUserAnswer("");
    setShowAnswer(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facile": return "bg-green-100 text-green-800";
      case "Moyen": return "bg-yellow-100 text-yellow-800";
      case "Difficile": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (selectedDevinette) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={resetDevinette}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux devinettes
              </Button>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{score} points</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center items-center space-x-2 mb-4">
                <Badge className={getDifficultyColor(selectedDevinette.difficulty)}>
                  {selectedDevinette.difficulty}
                </Badge>
                <Badge variant="outline">
                  <Star className="h-3 w-3 mr-1" />
                  {selectedDevinette.points} points
                </Badge>
              </div>
              <CardTitle className="text-2xl">Devinette</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <p className="text-lg font-medium">{selectedDevinette.question}</p>
              </div>
              
              {!showAnswer ? (
                <div className="space-y-4">
                  <Input
                    placeholder="Tapez votre réponse..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                  />
                  <Button 
                    onClick={handleSubmitAnswer} 
                    disabled={!userAnswer.trim()}
                    className="w-full"
                  >
                    Valider ma réponse
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-2">La réponse était :</p>
                    <p className="text-xl font-bold text-primary">{selectedDevinette.answer}</p>
                  </div>
                  
                  {userAnswer.toLowerCase().trim() === selectedDevinette.answer.toLowerCase() ? (
                    <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                      <p className="font-semibold">🎉 Bravo ! Bonne réponse !</p>
                      <p className="text-sm">+{selectedDevinette.points} points</p>
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-red-100 text-red-800 rounded-lg">
                      <p className="font-semibold">❌ Pas tout à fait...</p>
                      <p className="text-sm">Votre réponse : {userAnswer}</p>
                    </div>
                  )}
                  
                  <Button onClick={resetDevinette} className="w-full">
                    Choisir une autre devinette
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Devinettes (Tintin)</h1>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">{score} points</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <Brain className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Testez votre sagesse</h2>
          <p className="text-muted-foreground">
            Choisissez une devinette et gagnez des points en trouvant la bonne réponse
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devinettesData.map((devinette) => (
            <Card 
              key={devinette.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                answered.includes(devinette.id) ? 'ring-2 ring-green-500 bg-green-50' : ''
              }`}
              onClick={() => setSelectedDevinette(devinette)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getDifficultyColor(devinette.difficulty)}>
                    {devinette.difficulty}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span className="text-sm font-semibold">{devinette.points}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">Devinette #{devinette.id}</CardTitle>
                <CardDescription>
                  Catégorie: {devinette.category}
                  {answered.includes(devinette.id) && (
                    <span className="block text-green-600 font-semibold mt-1">
                      ✓ Résolue
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Button className="w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  {answered.includes(devinette.id) ? "Revoir" : "Résoudre"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Devinettes;