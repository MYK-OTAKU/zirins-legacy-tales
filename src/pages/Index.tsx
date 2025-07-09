import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary">Zirin</h1>
              <span className="text-sm text-muted-foreground">Contes et Légendes du Mali</span>
            </div>
            <Button variant="outline">Connexion</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Préservons nos traditions</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Découvrez les contes et devinettes du Mali, transmis de génération en génération. 
          Une application pour sauvegarder notre patrimoine culturel.
        </p>
        
        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link to="/contes">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-2xl">Contes (Zirin)</CardTitle>
                <CardDescription>
                  Explorez notre collection de contes traditionnels maliens avec audio et images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Découvrir les contes</Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/devinettes">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-2xl">Devinettes (Tintin)</CardTitle>
                <CardDescription>
                  Testez votre sagesse avec nos devinettes traditionnelles et gagnez des points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Jouer aux devinettes</Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Fonctionnalités</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎧</span>
              </div>
              <h4 className="font-semibold mb-2">Audio Bilingue</h4>
              <p className="text-sm text-muted-foreground">Écoutez en français et en bambara</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🖼️</span>
              </div>
              <h4 className="font-semibold mb-2">Images IA</h4>
              <p className="text-sm text-muted-foreground">Illustrations générées pour chaque conte</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="font-semibold mb-2">Gamification</h4>
              <p className="text-sm text-muted-foreground">Système de points et classements</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
