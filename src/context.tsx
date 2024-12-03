import { createContext, useContext, useEffect, ReactNode } from 'react';
import { getCurrentUser } from './utils/apiAuth';
import useFetch from './hooks/use-fetch';
import { User } from '@supabase/supabase-js';

// Define the context type
interface UrlContextType {
  user: User | null;
  fetchUser: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

// Create the context with a default value
const UrlContext = createContext<UrlContextType | undefined>(undefined);

const UrlProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const isAuthenticated = user?.role === 'authenticated';

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

// Create a custom hook to use the UrlContext directly
export const UrlState = (): UrlContextType => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error('UrlState must be used within a UrlProvider');
  }
  return context;
};

export default UrlProvider;
