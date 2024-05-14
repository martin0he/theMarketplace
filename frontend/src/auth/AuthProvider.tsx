// Import necessary types and dependencies
import { Session, User } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import supabase from "./supabase";
import { CustomUser } from "../types";

// Create a context for authentication
const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  customUser: CustomUser | null;
  signOut: () => void;
}>({
  session: null,
  user: null,
  customUser: null,
  signOut: () => {},
});

// Define the AuthProvider component
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>();
  const [customUser, setCustomUser] = useState<CustomUser | null>(null);
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      setUser(session?.user);
      setLoading(false);

      // Fetch user data from the database and update customUser state
      if (session && session.user) {
        const { data: userData, error: userError } = await supabase
          .from("Users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
        } else {
          // Transform fetched user data into custom user type
          const { email, phone, username, password, school } = userData;
          const customUserData: CustomUser = {
            email,
            phone,
            password,
            username,
            school,
          };
          setCustomUser(customUserData);
          console.log(customUser);
        }
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user);
        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      setUser(null);
      setCustomUser(null);
    } catch (error) {
      console.log("Sign-out error:", error);
    }
  };

  const value = {
    session,
    user,
    customUser,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
