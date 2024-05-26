/* eslint-disable @typescript-eslint/no-explicit-any */
import { Session, User } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import supabase from "./supabase";
import { CustomUser } from "../types";

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

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>();
  const [customUser, setCustomUser] = useState<CustomUser | null>(null);
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      setUser(session?.user);
      setLoading(true);

      try {
        const { data: userData, error: userError } = await supabase
          .from("Users")
          .select("*")
          .eq("id", session?.user.id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
          setCustomUser(null);
        } else {
          const {
            email,
            phone,
            username,
            password,
            school,
            id,
            items_liked,
            items_sold,
            listings,
            created_at,
          } = userData;
          const customUserData: CustomUser = {
            id,
            email,
            phone,
            password,
            username,
            school,
            items_liked,
            items_sold,
            listings,
            created_at,
          };
          setCustomUser(customUserData);
        }
      } finally {
        setLoading(false);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        fetchData();
      }
    );

    fetchData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setCustomUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
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

export const useAuth = () => {
  return useContext(AuthContext);
};
