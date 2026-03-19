export default defineI18nLocale(async () => {
  return {
    pages: {
      login: {
        title: 'Sign In',
        description: 'Enter your email below to login to your account',
        submit: 'Login',
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
        rememberMe: 'Remember Me',
        signUp: 'Sign Up',
        signUpText: 'Don\'t have an account?',
        error: 'Login Failed',
      },
      dashboard: {
        title: 'Dashboard',
      },
    },
  }
})
