import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "@/lib/services/sign-up.s";
import { useRouter } from "@/i18n/navigation";

export function useSignup() {
  // Navigation
  const router = useRouter();

  // Mutation
  const {
    mutate: signUp,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: registerAPI,
    onSuccess: () => {
      router.push("/login");
    },
  });

  return {
    signUp,
    isPending,
    error: error?.message,
    isError,
  };
}
