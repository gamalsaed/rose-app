
'use server';

export async function forgotPasswordAction (email : string){

     const response = await fetch(`${process.env.BASE_API}auth/forgotPassword`,{
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body : JSON.stringify({ email })
        });
        const payload = await response.json()

        return payload
    };

    export async function verifyOtpAction (resetCode : number){

     const response = await fetch(`${process.env.BASE_API}auth/verifyResetCode`,{
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body : JSON.stringify({resetCode})
        });
        const payload = await response.json()

        return payload
    };

    export async function resetNewPasswordAction (fields:{email : string , newPassword : string}){

     const response = await fetch(`${process.env.BASE_API}auth/resetPassword`,{
            method : "PUT",
            headers: { "Content-Type": "application/json" },
            body : JSON.stringify(fields)
        });
        const payload = await response.json()

        return payload
    };
