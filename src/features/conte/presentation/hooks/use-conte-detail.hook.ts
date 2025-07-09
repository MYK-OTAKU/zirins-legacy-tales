import { useState, useEffect } from 'react';
import { Conte } from '../../domain/entities/conte';
import { GetConteByIdUseCase } from '../../domain/usecases/get-conte-by-id.usecase';

interface UseConteDetailState {
  conte: Conte | null;
  loading: boolean;
  error: string | null;
}

export const useConteDetail = (
  getConteByIdUseCase: GetConteByIdUseCase,
  conteId: string
) => {
  const [state, setState] = useState<UseConteDetailState>({
    conte: null,
    loading: false,
    error: null
  });

  const loadConte = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    const result = await getConteByIdUseCase.call({ id: conteId });
    
    result.fold(
      (failure) => setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: failure.message 
      })),
      (conte) => setState(prev => ({ 
        ...prev, 
        loading: false, 
        conte 
      }))
    );
  };

  useEffect(() => {
    if (conteId) {
      loadConte();
    }
  }, [conteId]);

  return {
    ...state,
    loadConte
  };
};