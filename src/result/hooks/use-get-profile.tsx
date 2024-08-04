import { useEffect } from "react";
import generatePDF from "react-to-pdf";
import { experimental_useObject as useObject } from "ai/react";

import { UserProfile } from "@/server/types";
import UserProfileSchema from "@/server/schemas/userProfles";

const getTargetElement = () => document.getElementById("content-id");

// TODO: Change to fetch
// TODO: Change to useRef to manage references to the element
export const useGetProfile = () => {
  const {
    object: userProfile,
    submit: getProfile,
    isLoading: isProfileLoading,
  } = useObject({
    api: "/api/getProfile",
    schema: UserProfileSchema,
  });

  useEffect(() => {
    if (isProfileLoading || !userProfile) return;

    generatePDF(getTargetElement, { method: "open" });
  }, [userProfile, isProfileLoading]);

  return {
    userProfile: userProfile as UserProfile,
    isProfileLoading,
    getProfile,
  };
};
