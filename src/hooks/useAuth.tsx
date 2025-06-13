
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, mockUsers } from '@/db/mockdata';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithPosId: (posId: string) => Promise<boolean>;
  loginWithWebIdentifier: (webIdentifier: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('AuthProvider: Initialization started');
    
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          console.log('AuthProvider: User loaded from localStorage:', parsedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('AuthProvider: Error parsing saved user:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
        console.log('AuthProvider: Initialization completed');
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthProvider: Login attempt with email:', email);
    setIsLoading(true);
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser && foundUser.isActive) {
      console.log('AuthProvider: Login successful for user:', foundUser);
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    console.log('AuthProvider: Login failed');
    setIsLoading(false);
    return false;
  };

  const loginWithPosId = async (posId: string): Promise<boolean> => {
    console.log('AuthProvider: POS Login attempt with ID:', posId);
    setIsLoading(true);
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.posId === posId);
    if (foundUser && foundUser.isActive) {
      console.log('AuthProvider: POS Login successful for user:', foundUser);
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    console.log('AuthProvider: POS Login failed');
    setIsLoading(false);
    return false;
  };

  const loginWithWebIdentifier = async (webIdentifier: string, password: string): Promise<boolean> => {
    console.log('AuthProvider: Web identifier login attempt');
    setIsLoading(true);
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.webIdentifier === webIdentifier && u.password === password);
    if (foundUser && foundUser.isActive) {
      console.log('AuthProvider: Web identifier login successful for user:', foundUser);
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    console.log('AuthProvider: Web identifier login failed');
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    console.log('AuthProvider: Logout');
    setUser(null);
    localStorage.removeItem('user');
  };

  const contextValue = { 
    user, 
    login, 
    loginWithPosId, 
    loginWithWebIdentifier, 
    logout, 
    isLoading 
  };

  console.log('AuthProvider: Rendering with context value:', contextValue);

  // Ne rendre les enfants que si le provider est complètement initialisé
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initialisation...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('useAuth: Context value:', context);
  
  if (context === null) {
    console.error('useAuth: Called outside of AuthProvider');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
