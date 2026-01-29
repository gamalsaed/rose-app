
import { verifyOtpAction } from "@/lib/actions/auth.action";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyOtp (){
// mutation
const { isPending , error , mutate } = useMutation ({
    mutationFn : async (resetCode : number) => {
        const payload = await verifyOtpAction (resetCode);
        if ('code' in payload){
            throw new Error(payload.message)
        }
        return payload;
    },
});
return {isPending , error , verifyOtp :mutate}
};