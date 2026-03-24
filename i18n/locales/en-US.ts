export default defineI18nLocale(async () => {
  return {
    auth: {
      login: {
        title: 'Sign In',
        description: 'Enter your email below to login to your account',
        rememberMe: 'Remember Me',
        submit: 'Login',
        footer: 'Don\'t have an account？',
        footerLink: 'Sign Up',
        error: 'Login Failed',
      },
      signUp: {
        title: 'Sign Up',
        description: 'Enter your information to create an account',
        submit: 'Create an account',
        footer: 'Already have an account？',
        footerLink: 'Sign In',
        error: 'SignUp Failed',
        verifyEmailSent: 'The verification email has been sent',
        verifyEmailSentDesc: 'Please check your inbox (or spam folder) and complete the verification.',
      },
      forgotPassword: {
        title: 'Forgot Password',
        description: 'Enter your email to reset your password',
        submit: 'Send reset Link',
        success: 'If an account with this email exists, a reset link has been sent',
      },
      name: {
        label: 'userName',
        placeholder: 'Enter your userName',
      },
      email: {
        label: 'Email',
        placeholder: 'Enter your email',
        error: 'Please enter a valid email address',
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password',
        error: 'The password length must be no less than 8 characters',
        forgot: 'Forgot your password?',
      },
      provide: {
        github: 'Github',
        google: 'Google',
        vercel: 'Vercel',
      },
      waitLogin: 'Logging in...',
    },
    pages: {
      dashboard: {
        title: 'Dashboard',
      },
    },
    components: {
      themePicker: {
        primaryColor: 'PrimaryColor',
        colorMode: 'ColorMode',
        locales: 'Locales',
        radius: 'Radius',
      },
    },
    common: {
      requestError: 'Request failed. Please try again later',
    },
  }
})
