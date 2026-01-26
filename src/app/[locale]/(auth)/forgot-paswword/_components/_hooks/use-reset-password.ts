
import { useRouter } from "@/i18n/navigation";
import { resetNewPasswordAction } from "@/lib/actions/auth.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useResetPasswordOtp (){
// Translations
    const t = useTranslations();
    //router
    const router = useRouter();
// mutation
const { isPending , error , mutate } = useMutation ({
    mutationFn : async (fields:{email : string , newPassword : string}) => {
        const payload = await resetNewPasswordAction (fields);
        if ('code' in payload){
            throw new Error(payload.message)
        }
        return payload;
    },
    onSuccess : ()=>{
        toast.success(t("password-rest"));
        router.push('/login')
    },
});
return {isPending , error , resetPassword :mutate}
};