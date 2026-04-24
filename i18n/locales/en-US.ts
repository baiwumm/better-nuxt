export default defineI18nLocale(async () => {
  return {
    auth: {
      signIn: {
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
        footer: 'Return to the Sign In page.',
      },
      resetPassword: {
        title: 'Reset Password',
        description: 'Enter your new password below',
        submit: 'Save new password',
        success: 'Password reset successful',
      },
      magicLink: {
        title: 'Magic Link',
        description: 'Enter your email to receive a magic link',
        submit: 'Sign in with Magic Link',
        verifyEmailSent: 'The verification email has been sent',
        verifyEmailSentDesc: 'Please check your inbox (or spam folder) and complete the verification.',
        signInWithPassword: 'Sign in with Password',
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
      newPassword: {
        label: 'New Password',
        placeholder: 'Enter your new Password',
      },
      provide: {
        github: 'Github',
        google: 'Google',
        vercel: 'Vercel',
      },
      logout: {
        title: 'Log Out',
      },
      waitLogin: 'Logging in...',
      waitLogout: 'Logouting...',
    },
    pages: {
      title: 'Dashboard',
      administrative: {
        title: 'Administrative',
        message: {
          title: 'Message',
        },
        organization: {
          title: 'Organization',
        },
        postManage: {
          title: 'Post Manage',
        },
        framework: {
          title: 'Framework',
        },
      },
      playground: {
        title: 'Playground',
        spinner: {
          title: 'Spinner',
          description: 'The Spinner component, which has been transplanted from Hero UI!',
          usage: 'Usage',
          colors: 'Colors',
          sizes: 'Sizes',
        },
      },
      systemSettings: {
        title: 'System Settings',
        userManage: {
          title: 'User Manage',
        },
        menuManage: {
          title: 'Menu Manage',
          label: 'Menu Name',
          labelHlep: 'Please fill in the internationalized key, for example: pages.title',
          to: 'Path',
          badge: 'Badge',
          defaultOpen: 'Default Open',
          enabled: 'Enabled',
          toReg: 'It must start with / or http',
          target: {
            title: 'Target',
            self: 'Self',
            blank: 'Blank',
          },
          parentId: 'Parent Menu',
          add: 'Add Menu',
          edit: 'Edit Menu',
        },
        roleManage: {
          title: 'Role Manage',
        },
        internalization: {
          title: 'Internalization',
        },
        operationLog: {
          title: 'Operation Log',
        },
      },
    },
    components: {
      themePicker: {
        primaryColor: 'PrimaryColor',
        colorMode: 'ColorMode',
        locales: 'Locales',
        radius: 'Radius',
      },
      SidebarLogo: {
        title: 'Technical stack',
      },
    },
    layout: {
      searchMenu: 'Search Menu',
      friendLink: 'Friendship Link',
      blog: 'Blog',
      github: 'Github',
    },
    common: {
      index: 'Index',
      icon: 'Icon',
      sort: 'Sort',
      requestError: 'Request failed. Please try again later',
      loading: 'Loading...',
      search: 'Search',
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      deleteSuccess: 'Delete success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      reset: 'Reset',
      save: 'Save',
      saveSuccess: 'Save Success',
      inSave: 'Saving...',
      columnVisibility: 'Column Visibility',
      searchKeyword: 'Search Keyword...',
      placeholder: 'Please enter',
      select: 'Please select',
      required: 'Must not be empty',
      action: 'Action',
    },
  }
})
