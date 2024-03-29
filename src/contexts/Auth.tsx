import React, { PropsWithChildren, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAppStore } from '@/stores/app.ts';

type AuthContextProps = {
  loginWithPhone: any;
  user: FirebaseAuthTypes.User | null;
  confirmation?: {
    confirm: any;
  };
  initializing: boolean;
} | null;

export const AuthContext = React.createContext<AuthContextProps>(null);

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [initializing, setInitializing] = useState(true);
  const [confirmation, setConfirmation] = useState<any>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const { setToken, clearToken } = useAppStore();

  useEffect(() => {
    return auth().onAuthStateChanged(u => {
      setUser(u);
      if (!u) {
        setInitializing(false);
      }
    });
  }, []);

  useEffect(() => {
    return auth().onIdTokenChanged(async result => {
      const t = (await result?.getIdToken()) ?? null;
      if (t) {
        setToken(t);
      }
    });
  }, [setToken]);

  useEffect(() => {
    (async () => {
      if (user) {
        const t = await user.getIdToken();
        setToken(t);
        if (initializing) {
          setInitializing(false);
        }
      } else {
        clearToken();
      }
    })();
  }, [initializing, user, setToken, clearToken]);

  const loginWithPhone = React.useCallback(async (phone: string) => {
    const c = await auth().signInWithPhoneNumber(phone);
    setConfirmation(c);
  }, []);

  const value = React.useMemo(
    () => ({
      loginWithPhone,
      user,
      confirmation,
      initializing,
    }),
    [loginWithPhone, user, confirmation, initializing],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContext');
  }
  return context;
};
