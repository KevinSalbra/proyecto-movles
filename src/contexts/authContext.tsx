import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, authReady } from "../core/firebaseConfig";
import { createOrUpdateUserProfile, UserProfile } from "../utils/createOrUpdateUserProfile";
import { DailyMissionsService } from "../services/DailyMissionsService";
import PushNotificationService from "../services/PushNotificationService";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  isNewUser: boolean;
  userData: UserProfile | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  isNewUser: false,
  userData: null
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  const initializeDailyMissions = async (userId: string) => {
    try {
      console.log("🚀 Inicializando misiones diarias...");
      await DailyMissionsService.getTodayMissions(userId);
      console.log("✅ Misiones diarias inicializadas correctamente");
    } catch (error) {
      console.error("❌ Error inicializando misiones diarias:", error);
    }
  };

  const cleanOldData = () => {
    try {
      DailyMissionsService.cleanOldLocalData();
    } catch (error) {
      console.warn("⚠️ Error limpiando datos antiguos:", error);
    }
  };

  useEffect(() => {
    authReady.then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const { isNew, userData } = await createOrUpdateUserProfile(firebaseUser);
          setIsNewUser(isNew);
          setUserData(userData);
          setUser(firebaseUser);

          await initializeDailyMissions(firebaseUser.uid);

          console.log("[Push] Usuario autenticado, iniciando notificaciones...");
          const pushService = PushNotificationService.getInstance();
          pushService.initialize();
        } else {
          setUser(null);
          setIsNewUser(false);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    });

    cleanOldData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isNewUser, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};