// tokenService.ts
export const getToken = async (): Promise<string | null> => {
    // Récupérer le token depuis le localStorage, ou une autre source
    return localStorage.getItem('token');
  };
  