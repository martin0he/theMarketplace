/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@mui/material";
import Colors from "../../assets/Colors";
import { useAuth } from "../../auth/AuthProvider";
import { useEffect, useState } from "react";
import { Universities } from "../../assets/Universities";

const UniversityTitle = () => {
  const { customUser } = useAuth();

  const [universityName, setUniversityName] = useState<string | null>(null);

  useEffect(() => {
    const domain = customUser?.email?.split("@")[1];
    const matchedUniversity = Universities.find((uni: any) =>
      uni.domains.includes(domain)
    );
    if (matchedUniversity) {
      setUniversityName(matchedUniversity.name + " Marketplace");
    } else {
      setUniversityName("University marketplace not found :(");
    }
  }, [customUser]);

  return (
    
  );
};

export default UniversityTitle;
