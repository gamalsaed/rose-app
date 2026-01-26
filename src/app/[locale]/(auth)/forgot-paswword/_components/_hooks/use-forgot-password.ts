import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { sendOtpAction } from "@/lib/actions/auth.action";

export default function useForgetPassword() {
  //translation
  const t = useTranslations();


  // mutation
  
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (email: string) => {
      const payload = await sendOtpAction (email);

      if (payload&&"error" in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },
  });

  return { error, sendOtp: mutate, isPending };
}