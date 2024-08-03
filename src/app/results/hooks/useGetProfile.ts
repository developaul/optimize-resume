import UserProfileSchema from "@/server/schemas/userProfles";
import { useEffect } from "react";
import { experimental_useObject as useObject } from "ai/react";
import generatePDF from "react-to-pdf";
import { UserProfile } from "@/server/types";

const getTargetElement = () => document.getElementById("content-id");

const useGetProfile = () => {
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

export default useGetProfile;
