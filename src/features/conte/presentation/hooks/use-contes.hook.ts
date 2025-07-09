import { useState, useEffect } from 'react';
import { Conte } from '../../domain/entities/conte';
import { GetAllContesUseCase } from '../../domain/usecases/get-all-contes.usecase';
import { SearchContesUseCase } from '../../domain/usecases/search-contes.usecase';
import { NoParams } from '../../../../shared/domain/usecases/usecase';

interface UseContesState {
  contes: Conte[];
  loading: boolean;
  error: string | null;
}

export const useContes = (
  getAllContesUseCase: GetAllContesUseCase,
  searchContesUseCase: SearchContesUseCase
) => {
  const [state, setState] = useState<UseContesState>({
    contes: [],
    loading: false,
    error: null
  });

  const loadContes = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await getAllContesUseCase.call(new NoParams());
    
    result.fold(
      (failure) => setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: failure.message 
      })),
      (contes) => setState(prev => ({ 
        ...prev, 
        loading: false, 
        contes 
      }))
    );
  };

  const searchContes = async (query: string) => {
    if (!query.trim()) {
      await loadContes();
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await searchContesUseCase.call({ query });
    
    result.fold(
      (failure) => setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: failure.message 
      })),
      (contes) => setState(prev => ({ 
        ...prev, 
        loading: false, 
        contes 
      }))
    );
  };

  const filterByCategory = (category: string) => {
    if (category === 'Tous') {
      loadContes();
    } else {
      setState(prev => ({
        ...prev,
        contes: prev.contes.filter(conte => conte.category === category)
      }));
    }
  };

  useEffect(() => {
    loadContes();
  }, []);

  return {
    ...state,
    loadContes,
    searchContes,
    filterByCategory
  };
};