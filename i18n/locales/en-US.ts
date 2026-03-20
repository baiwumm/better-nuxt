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
        wechat: 'Wechat',
        github: 'Github',
        google: 'Google',
      },
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
  }
})
