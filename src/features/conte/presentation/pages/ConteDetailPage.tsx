import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Languages, BookOpen, Eye } from "lucide-react";
import { AudioPlayer } from "../components/AudioPlayer";
import { useConteDetail } from "../hooks/use-conte-detail.hook";
import { container } from "../../../../core/di/injection-container";
import { GetConteByIdUseCase } from "../../domain/usecases/get-conte-by-id.usecase";

const ConteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(0);
  const [language, setLanguage] = useState<'fr' | 'bm'>('fr');
  const [viewMode, setViewMode] = useState<'pages' | 'continuous'>('pages');

  const getConteByIdUseCase = container.get<GetConteByIdUseCase>('GetConteByIdUseCase');
  const { conte, loading, error } = useConteDetail(getConteByIdUseCase, id!);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement du conte...</p>
        </div>
      </div>
    );
  }

  if (error || !conte) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Conte non trouvé"}</p>
          <Link to="/contes">
            <Button>Retour aux contes</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextPage = () => {
    if (currentPage < conte.pages.length - 1) {
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
            <AudioPlayer 
              audioTracks={conte.audioTracks} 
              onLanguageChange={setLanguage}
            />
          </div>
        </header>

        {/* Contenu continu */}
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{conte.title}</h1>
            <Badge variant="secondary">{conte.category}</Badge>
          </div>

          <div className="space-y-8">
            {conte.pages.map((page) => (
              <div key={page.id} className="space-y-4">
                {page.imageUrl && (
                  <img
                    src={page.imageUrl}
                    alt={`Illustration ${page.pageNumber}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <p className="text-lg leading-relaxed">{page.text}</p>
              </div>
            ))}
            
            {conte.moral && (
              <Card className="bg-muted/50 p-6 mt-8">
                <h3 className="font-semibold mb-2">Morale de l'histoire :</h3>
                <p className="italic">{conte.moral}</p>
              </Card>
            )}
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
          <h1 className="text-3xl font-bold mb-2">{conte.title}</h1>
          <div className="flex justify-center items-center space-x-4">
            <Badge variant="secondary">{conte.category}</Badge>
            <span className="text-muted-foreground">
              Page {currentPage + 1} sur {conte.pages.length}
            </span>
          </div>
        </div>

        {/* Page actuelle */}
        <Card className="mb-6">
          <CardContent className="p-0">
            {conte.pages[currentPage]?.imageUrl && (
              <img
                src={conte.pages[currentPage].imageUrl}
                alt={`Page ${currentPage + 1}`}
                className="w-full h-96 object-cover rounded-t-lg"
              />
            )}
            <div className="p-6">
              <p className="text-lg leading-relaxed">
                {conte.pages[currentPage]?.text}
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
            {conte.pages.map((_, index) => (
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
            disabled={currentPage === conte.pages.length - 1}
          >
            Page suivante
          </Button>
        </div>

        {/* Contrôles audio */}
        <AudioPlayer 
          audioTracks={conte.audioTracks} 
          onLanguageChange={setLanguage}
        />

        {/* Morale (affiché seulement à la dernière page) */}
        {currentPage === conte.pages.length - 1 && conte.moral && (
          <Card className="bg-muted/50 p-6 mt-6">
            <h3 className="font-semibold mb-2">Morale de l'histoire :</h3>
            <p className="italic">{conte.moral}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConteDetailPage;