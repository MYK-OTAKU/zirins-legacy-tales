import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Languages
} from 'lucide-react';
import { AudioTrack } from '../../domain/entities/conte';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

interface AudioPlayerProps {
  audioTracks: AudioTrack[];
  onLanguageChange?: (language: 'fr' | 'bm') => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioTracks, 
  onLanguageChange 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([50]);
  const [currentLanguage, setCurrentLanguage] = useState<'fr' | 'bm'>('fr');
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = audioTracks.find(track => track.language === currentLanguage);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.url;
      setDuration(currentTrack.duration);
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSkip = (direction: 'forward' | 'backward') => {
    if (!audioRef.current) return;

    const skipAmount = APP_CONSTANTS.AUDIO.SKIP_DURATION;
    const newTime = direction === 'forward' 
      ? Math.min(currentTime + skipAmount, duration)
      : Math.max(currentTime - skipAmount, 0);
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newVolume = value[0] / 100;
    audioRef.current.volume = newVolume;
    setVolume(value);
  };

  const handleLanguageChange = (language: 'fr' | 'bm') => {
    setCurrentLanguage(language);
    setCurrentTime(0);
    setIsPlaying(false);
    onLanguageChange?.(language);
  };

  if (!currentTrack) {
    return (
      <Card className="p-4">
        <p className="text-center text-muted-foreground">
          Aucune piste audio disponible
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <audio ref={audioRef} preload="metadata" />
      
      {/* Sélecteur de langue */}
      <div className="flex justify-center mb-4 space-x-2">
        <Button
          variant={currentLanguage === 'fr' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleLanguageChange('fr')}
          disabled={!audioTracks.find(t => t.language === 'fr')}
        >
          <Languages className="h-4 w-4 mr-1" />
          Français
        </Button>
        <Button
          variant={currentLanguage === 'bm' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleLanguageChange('bm')}
          disabled={!audioTracks.find(t => t.language === 'bm')}
        >
          <Languages className="h-4 w-4 mr-1" />
          Bambara
        </Button>
      </div>

      <div className="space-y-4">
        {/* Contrôles principaux */}
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
        
        {/* Barre de progression */}
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
        
        {/* Contrôle du volume */}
        <div className="flex items-center justify-center space-x-4">
          <Volume2 className="h-4 w-4" />
          <Slider
            value={volume}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-32"
          />
          <span className="text-sm w-8">{volume[0]}%</span>
        </div>
      </div>
    </Card>
  );
};