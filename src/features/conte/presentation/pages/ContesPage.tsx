import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search } from "lucide-react";
import { ConteCard } from "../components/ConteCard";
import { useContes } from "../hooks/use-contes.hook";
import { container } from "../../../../core/di/injection-container";
import { GetAllContesUseCase } from "../../domain/usecases/get-all-contes.usecase";
import { SearchContesUseCase } from "../../domain/usecases/search-contes.usecase";

const categories = ["Tous", "Sagesse", "Merveilleux", "Tradition", "Morale"];

const ContesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const getAllContesUseCase = container.get<GetAllContesUseCase>('GetAllContesUseCase');
  const searchContesUseCase = container.get<SearchContesUseCase>('SearchContesUseCase');

  const { contes, loading, error, searchContes, filterByCategory } = useContes(
    getAllContesUseCase,
    searchContesUseCase
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    searchContes(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterByCategory(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement des contes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Réessayer
          </Button>
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
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contes.map((conte) => (
            <ConteCard key={conte.id} conte={conte} />
          ))}
        </div>

        {contes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun conte trouvé pour votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContesPage;