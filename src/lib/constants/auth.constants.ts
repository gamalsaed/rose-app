export const FORGOT_PASSWORD_STEPS = {
  EMAIL: 'email',
  OTP: 'otp',
  NEW_PASSWORD: 'new_password',
}as const;


export const OTP_COOLDOWN_KEY = 'otp-cooldown';

export const OTP_COOLDOWN_TIME = 60000;