import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Play, Lock } from "lucide-react";

interface Conte {
  id: string;
  title: string;
  description: string;
  category: string;
  isPremium: boolean;
  imageUrl: string;
  duration: string;
}

// Données d'exemple
const contesData: Conte[] = [
  {
    id: "1",
    title: "Le Lièvre et l'Hyène",
    description: "Une histoire de ruse et de sagesse où le petit lièvre dépasse la force brute par son intelligence.",
    category: "Sagesse",
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400",
    duration: "8 min"
  },
  {
    id: "2",
    title: "La Jeune Fille et le Génie",
    description: "Un conte merveilleux sur le courage d'une jeune fille face aux forces mystérieuses.",
    category: "Merveilleux",
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400",
    duration: "12 min"
  },
  {
    id: "3",
    title: "L'Araignée Tisseuse",
    description: "Comment Anansi l'araignée apporta la sagesse au monde grâce à sa toile magique.",
    category: "Tradition",
    isPremium: false,
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400",
    duration: "6 min"
  },
  {
    id: "4",
    title: "Le Roi des Animaux",
    description: "Une fable sur le leadership et la justice dans le royaume animal.",
    category: "Morale",
    isPremium: true,
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400",
    duration: "10 min"
  }
];

const categories = ["Tous", "Sagesse", "Merveilleux", "Tradition", "Morale"];

const Contes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredContes = contesData.filter(conte => {
    const matchesSearch = conte.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conte.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || conte.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              <h1 className="text-2xl font-bold">Contes (Zirin)</h1>
            </div>
            <Button variant="outline">Premium</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher un conte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContes.map((conte) => (
            <Card key={conte.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={conte.imageUrl}
                  alt={conte.title}
                  className="w-full h-48 object-cover"
                />
                {conte.isPremium && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-yellow-50 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {conte.duration}
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{conte.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {conte.category}
                  </Badge>
                </div>
                <CardDescription>{conte.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Link to={`/contes/${conte.id}`}>
                  <Button className="w-full" disabled={conte.isPremium}>
                    <Play className="h-4 w-4 mr-2" />
                    {conte.isPremium ? "Premium requis" : "Écouter le conte"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun conte trouvé pour votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contes;