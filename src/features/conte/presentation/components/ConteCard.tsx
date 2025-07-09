import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Lock } from 'lucide-react';
import { Conte } from '../../domain/entities/conte';

interface ConteCardProps {
  conte: Conte;
}

export const ConteCard: React.FC<ConteCardProps> = ({ conte }) => {
  const getDuration = () => {
    const frTrack = conte.audioTracks.find(track => track.language === 'fr');
    if (frTrack) {
      const minutes = Math.floor(frTrack.duration / 60);
      return `${minutes} min`;
    }
    return 'N/A';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
          {getDuration()}
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
  );
};