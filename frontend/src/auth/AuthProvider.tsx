import { Session, User } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import supabase from "./supabase";
import { CustomUser } from "../types";

// create a context for authentication
const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
  handleSubmit: (
    email: string,
    password: string,
    fullname: string
  ) => Promise<void>;
}>({
  session: null,
  user: null,
  signOut: () => {},
  handleSubmit: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>();
  const [customUser, setCustomUser] = useState<CustomUser | null>();
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
      setUser(null);
    } catch (error) {
      console.log("Sign-out error:", error);
    }
  };

  const handleSubmit = async (
    email: string,
    password: string,
    fullname: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullname,
          },
        },
      });
      if (error) throw error;
      const customUser: CustomUser = {
        ...data.user,
        username: fullname,
        password,
      };
      setCustomUser(customUser);

      const { data: insertData, error: insertError } = await supabase
        .from("Users")
        .insert([
          {
            username: customUser.username,
            email: customUser.email,
            password: customUser.password,
            phone: customUser.phone,
          },
        ])
        .select();

      console.log("CustomUser:", customUser);
    } catch (error) {
      console.log("Sign-up error:", error);
      alert(error);
    }
  };

  const value = {
    session,
    user,
    signOut,
    handleSubmit,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
