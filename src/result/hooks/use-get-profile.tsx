import { useEffect } from "react";
import generatePDF from "react-to-pdf";
import { experimental_useObject as useObject } from "ai/react";
import { toast } from "sonner";

import { UserProfile } from "@/server/types";
import UserProfileSchema from "@/server/schemas/userProfles";

const getTargetElement = () => document.getElementById("content-id");

// TODO: Change to fetch
// TODO: Change to useRef to manage references to the element
export const useGetProfile = () => {
  const {
    object: userProfile,
    submit,
    isLoading: isProfileLoading,
  } = useObject({
    api: "/api/getProfile",
    schema: UserProfileSchema,
  });

  const generateFile = () => {
    generatePDF(getTargetElement, { method: "open" });
  };

  // TODO: fix auto download
  useEffect(() => {
    if (isProfileLoading || !userProfile) return;

    toast("CV generado con exito", {
      description: "Ya puedes descargar tu cv",
      action: {
        label: "descargar",
        onClick: () => generateFile(),
      },
    });

    generateFile();
  }, [userProfile, isProfileLoading]);

  const getProfile = userProfile !== undefined ? generateFile : submit;

  return {
    userProfile: userProfile as UserProfile,
    isProfileLoading,
    getProfile,
  };
};
