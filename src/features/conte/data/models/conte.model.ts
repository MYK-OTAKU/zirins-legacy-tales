import { Conte, AudioTrack, ContePage } from '../../domain/entities/conte';

export interface ConteModel {
  id: string;
  title: string;
  description: string;
  category: string;
  isPremium: boolean;
  imageUrl: string;
  pages: ContePage[];
  audioTracks: AudioTrack[];
  moral?: string;
  createdAt: string;
  updatedAt: string;
}

export class ConteModelMapper {
  static toDomain(model: ConteModel): Conte {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      category: model.category,
      isPremium: model.isPremium,
      imageUrl: model.imageUrl,
      pages: model.pages,
      audioTracks: model.audioTracks,
      moral: model.moral,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    };
  }

  static fromDomain(conte: Conte): ConteModel {
    return {
      id: conte.id,
      title: conte.title,
      description: conte.description,
      category: conte.category,
      isPremium: conte.isPremium,
      imageUrl: conte.imageUrl,
      pages: conte.pages,
      audioTracks: conte.audioTracks,
      moral: conte.moral,
      createdAt: conte.createdAt.toISOString(),
      updatedAt: conte.updatedAt.toISOString(),
    };
  }
}