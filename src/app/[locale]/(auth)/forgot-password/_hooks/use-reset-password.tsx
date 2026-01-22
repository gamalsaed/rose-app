import { useMutation } from "@tanstack/react-query";
import {  setPasswordFormFields } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import { resetPasswordAction } from "../_action/reset-password.action";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function useResetPassword() {

  //translation
  const t = useTranslations("auth");

  //state
  const router = useRouter();

  //   const { setStep, setEmail } = ;

  // mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: setPasswordFormFields &{email:string}) => {
      const payload = await resetPasswordAction({
        email: fields.email,
        newPassword: fields.password,
      });

      if (payload&&"error" in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        description: t("password-reset-successful"),
      })
      router.push("/login");
      
    },
  });

  return { error, resetPassword: mutate, isPending };
}
