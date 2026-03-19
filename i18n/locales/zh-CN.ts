export default defineI18nLocale(async () => {
  return {
    pages: {
      login: {
        title: '登录',
        description: '请在下方输入您的电子邮件，以登录您的账户',
        submit: '登录',
        email: {
          label: '邮箱',
          placeholder: '请输入邮箱',
          error: '请输入有效的电子邮件地址',
        },
        password: {
          label: '密码',
          placeholder: '请输入密码',
          error: '密码长度不能小于 8 个字符',
          forgot: '忘记密码？',
        },
        rememberMe: '记住我',
        signUp: '立即注册',
        signUpText: '还没有账户吗？',
        error: '登录失败',
      },
      dashboard: {
        title: '控制台',
      },
    },
  }
})
