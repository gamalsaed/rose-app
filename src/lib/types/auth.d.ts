import { FORGOT_PASSWORD_STEPS } from "../constants/auth.constant";

// Forgot Password Steps
export type ForgotPasswordStep =typeof FORGOT_PASSWORD_STEPS[keyof typeof FORGOT_PASSWORD_STEPS];