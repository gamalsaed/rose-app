import { useMutation } from "@tanstack/react-query";
import { forgetPasswordFormFields } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import { handleForgetPassword } from "../_action/forgot-password.action";
import { toast } from "@/hooks/use-toast";

export default function useForgetPassword() {
  //translation
  const t = useTranslations("auth");

  //   const { setStep, setEmail } = ;

  // mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: forgetPasswordFormFields) => {
      const payload = await handleForgetPassword(fields);

      if (payload&&"error" in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },
    onSuccess: () => {
    toast({
        variant: 'success',
        description: t("otp-sent-successfull"),
      })
    },
  });

  return { error, forgetPassword: mutate, isPending };
}
