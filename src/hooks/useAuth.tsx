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
    console.log("AuthProvider: Initializing auth check...");
    
    // Check for test login first
    const testUserType = localStorage.getItem("testUserType") as UserType;
    if (testUserType) {
      console.log("Found test login, setting user type:", testUserType);
      setUser({ id: "test-user", email: "test@example.com" });
      setUserType(testUserType);
      setLoading(false);
      return;
    }

    // Initial session check
    const checkUser = async () => {
      try {
        console.log("Checking user session...");
        const { data: sessionData, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          setLoading(false);
          return;
        }

        if (!sessionData?.session) {
          console.log("No active session found");
          setLoading(false);
          return;
        }

        console.log("Found active session for user:", sessionData.session.user.id);
        setUser(sessionData.session.user);
        
        // Get user type from code-based auth if present
        const testType = sessionData.session.user.user_metadata?.user_type;
        if (testType) {
          console.log("Setting user type from metadata:", testType);
          setUserType(testType as UserType);
          setLoading(false);
          return;
        }

        // Otherwise check profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', sessionData.session.user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error("Profile fetch error:", profileError);
          setLoading(false);
          return;
        }
          
        if (profileData?.user_type) {
          console.log("Setting user type from profile:", profileData.user_type);
          setUserType(profileData.user_type as UserType);
        } else {
          console.log("No user type found in profile");
        }
        
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        if (!session) {
          console.log("No session in auth change, clearing user");
          setUser(null);
          setUserType(null);
          setLoading(false);
          return;
        }

        setUser(session.user);
        
        // Get user type from code-based auth if present
        const testType = session.user.user_metadata?.user_type;
        if (testType) {
          console.log("Setting user type from metadata:", testType);
          setUserType(testType as UserType);
          setLoading(false);
          return;
        }

        // Otherwise check profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error("Profile fetch error on auth change:", profileError);
          setLoading(false);
          return;
        }
          
        if (profileData?.user_type) {
          console.log("User type updated to:", profileData.user_type);
          setUserType(profileData.user_type as UserType);
        } else {
          console.log("No profile data on auth change");
        }
        
        setLoading(false);
      }
    );

    return () => {
      console.log("Cleaning up auth listener");
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
