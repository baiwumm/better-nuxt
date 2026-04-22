export default defineI18nLocale(async () => {
  return {
    auth: {
      signIn: {
        title: '用户登录',
        description: '请在下方输入您的电子邮件，以登录您的账户',
        rememberMe: '记住我',
        submit: '登录',
        footer: '还没有账户吗？',
        footerLink: '立即注册',
        error: '登录失败',
      },
      signUp: {
        title: '用户注册',
        description: '输入您的信息以创建账户',
        submit: '创建账户',
        footer: '已经有账号了吗？',
        footerLink: '立即登录',
        error: '注册失败',
        verifyEmailSent: '验证邮件已发送',
        verifyEmailSentDesc: '请检查收件箱（或垃圾邮箱）并完成验证。',
      },
      forgotPassword: {
        title: '忘记密码',
        description: '请输入您的电子邮件以重置密码',
        submit: '发送重置链接',
        success: '如果该邮箱已注册，我们已发送重置邮件',
        footer: '返回到登录页',
      },
      resetPassword: {
        title: '重置密码',
        description: '请在下方输入您的新密码',
        submit: '保存新的密码',
        success: '重置密码成功',
      },
      magicLink: {
        title: '邮箱一键登录',
        description: '输入邮箱，我们会发送登录链接给你',
        submit: '发送登录链接',
        verifyEmailSent: '验证邮件已发送',
        verifyEmailSentDesc: '请检查你的邮箱（包括垃圾邮件），点击邮件中的链接完成登录',
        signInWithPassword: '使用密码登录',
      },
      name: {
        label: '用户名',
        placeholder: '请输入用户名',
      },
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
      newPassword: {
        label: '新密码',
        placeholder: '请输入新密码',
      },
      provide: {
        github: 'Github',
        google: '谷歌',
        vercel: 'Vercel',
      },
      logout: {
        title: '退出登录',
      },
      waitLogin: '正在登录中...',
      waitLogout: '正在退出登录...',
    },
    pages: {
      title: '控制台',
      administrative: {
        title: '智能行政',
        message: {
          title: '消息公告',
        },
        organization: {
          title: '组织管理',
        },
        postManage: {
          title: '岗位管理',
        },
        framework: {
          title: '组织架构',
        },
      },
      playground: {
        title: '实验场',
        spinner: {
          title: '加载器',
          description: '移植于 Hero UI 的 Spinner 组件!',
          usage: '基本使用',
          colors: '颜色',
          sizes: '尺寸',
        },
      },
      systemSettings: {
        title: '系统设置',
        userManage: {
          title: '用户管理',
        },
        menuManage: {
          title: '菜单管理',
        },
        roleManage: {
          title: '角色管理',
        },
        internalization: {
          title: '国际化',
        },
        operationLog: {
          title: '操作日志',
        },
      },
    },
    components: {
      themePicker: {
        primaryColor: '主题色',
        colorMode: '主题模式',
        locales: '语言',
        radius: '圆角',
      },
      SidebarLogo: {
        title: '技术栈',
      },
    },
    layout: {
      searchMenu: '搜索菜单',
      friendLink: '友情链接',
      blog: '博客',
      github: 'Github',
    },
    common: {
      requestError: '请求失败，请稍后重试',
      loading: '加载中...',
    },
  }
})
