
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type UserType = "institution" | "business" | "tourist" | null;

interface AuthContextType {
  user: any;
  userType: UserType;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userType: null,
  signOut: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for test login first
    const testUserType = localStorage.getItem("testUserType") as UserType;
    if (testUserType) {
      console.log("Found test login user type:", testUserType);
      setUser({ id: "test-user", email: "test@example.com" });
      setUserType(testUserType);
      setLoading(false);
      return;
    }

    // İlk yükleme sırasında oturum kontrolü
    const checkUser = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData.session) {
          setUser(sessionData.session.user);
          
          // Kullanıcı tipini öğren
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', sessionData.session.user.id)
            .maybeSingle();
            
          if (profileData && profileData.user_type) {
            setUserType(profileData.user_type as UserType);
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Auth durumu değişikliklerini dinle
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user);
          
          // Kullanıcı tipini öğren
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', session.user.id)
            .maybeSingle();
            
          if (profileData && profileData.user_type) {
            setUserType(profileData.user_type as UserType);
          }
        } else {
          setUser(null);
          setUserType(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      // Clear test login if exists
      localStorage.removeItem("testUserType");
      
      await supabase.auth.signOut();
      setUser(null);
      setUserType(null);
      
      toast({
        title: "Çıkış yapıldı",
        description: "Başarıyla çıkış yaptınız.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Çıkış yaparken hata oluştu",
        description: error.message,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, userType, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
