import z from 'zod'
import { AInputPasswordToggle, AutoFormInput, AutoFormTextarea } from '#components'
import { BAN_DURATIONS, MENU_TARGET, PERMISSIONS, USER_ROLE } from '@/enums'

interface ZInputOpts {
  title: string
  help?: string
  required?: boolean
  maxlength?: number
  isTextarea?: boolean
}

export function useSchema() {
  const { t } = useI18n()
  const { i18nCommon, i18nLocales, i18nMenus, i18nAuth, i18nUsers, i18nRoles } = useMessage()

  // 排序
  const zSort = z.number().default(0).meta({
    title: i18nCommon('sort', true),
  })

  // 输入框 - 函数重载，根据 required 得到准确的类型
  function zInput(opts: ZInputOpts & { required: true }): z.ZodString
  function zInput(opts: ZInputOpts & { required?: false }): z.ZodNullable<z.ZodString>
  function zInput(opts: ZInputOpts): z.ZodString | z.ZodNullable<z.ZodString> {
    const { title, help, required = false, maxlength, isTextarea = false } = opts
    const schema = z.string()
    const baseMeta = {
      title,
      required,
      help,
      input: {
        component: isTextarea ? AutoFormTextarea : AutoFormInput,
        props: {
          maxlength,
        },
      },
    }

    if (required === true) {
      return schema.nonempty({ error: i18nCommon('required') }).meta(baseMeta)
    }

    return schema.nullable().meta(baseMeta)
  }

  // 勾选框
  const zCheckbox = (title: string) => z.boolean().meta({ title, theme: { floatRight: true } })

  // 电子邮箱
  const zEmail = z.email(t('auth.email.error')).nonempty({ error: i18nCommon('required') }).meta({
    title: i18nAuth('email.label', true),
    required: true,
    input: {
      props: {
        placeholder: i18nAuth('email.placeholder'),
      },
    },
  })

  // 用户密码
  const zPassword = z.string(t('auth.password.placeholder')).min(8, t('auth.password.error')).meta({
    title: i18nAuth('password.label', true),
    required: true,
    input: {
      component: AInputPasswordToggle,
      props: {
        placeholder: i18nAuth('password.placeholder'),
      },
    },
  })

  // 用户登录
  const signInFormSchema = z.object({
    email: zEmail,
    password: zPassword,
    rememberMe: z.boolean().optional().meta({ title: i18nAuth('signIn.rememberMe', true), theme: { floatRight: true } }),
  })

  // 用户注册
  const signUpFormSchema = z.object({
    name: z.string().nonempty({ error: t('auth.name.placeholder') }).meta({
      title: i18nAuth('name.label', true),
      required: true,
      input: {
        props: {
          placeholder: i18nAuth('name.placeholder'),
        },
      },
    }),
    email: zEmail,
    password: zPassword,
  })

  // 邮箱一键登录/忘记密码
  const emailFormSchema = z.object({
    email: zEmail,
  })

  // 重置密码
  const forgotPasswordFormSchema = z.object({
    newPassword: z.string(t('auth.newPassword.placeholder')).min(8, t('auth.password.error')).meta({
      title: i18nAuth('newPassword.label', true),
      required: true,
      input: {
        component: AInputPasswordToggle,
        props: {
          placeholder: i18nAuth('newPassword.placeholder'),
        },
      },
    }),
  })

  // 用户管理 - 新增/编辑
  const userFormSchema = signUpFormSchema.extend({
    displayUsername: z.string().nullable().meta({
      title: i18nUsers('displayUsername', true),
      input: {
        props: {
          placeholder: i18nCommon('placeholder'),
        },
      },
    }),
    role: z.array(z.enum(USER_ROLE.values)).optional().meta({
      title: i18nUsers('systemRole', true),
    }),
  })

  // 用户管理 - 封禁用户
  const banUserFormSchema = z.object({
    banReason: z.string().nonempty(t('common.required')).meta({
      title: i18nUsers('banReason', true),
      required: true,
      input: {
        component: AutoFormTextarea,
        props: {
          maxlength: 200,
        },
      },
    }),
    banExpiresIn: z.enum(BAN_DURATIONS.values).optional().meta({
      title: i18nUsers('banExpiresIn', true),
      help: i18nUsers('banExpiresInHelp', true),
    }),
  })

  // 菜单管理 - 新增/编辑
  const menuFormSchema = z.object({
    parentId: z.string().nullable().meta({
      title: i18nMenus('parentId', true),
      help: i18nCommon('parentHelp', true),
    }),
    label: zInput({
      title: i18nMenus('label', true),
      help: i18nMenus('labelHlep', true),
      required: true,
      maxlength: 200,
    }),
    permissions: z.array(z.enum(PERMISSIONS.values)).optional().meta({
      title: i18nMenus('permissions', true),
    }),
    icon: zInput({ title: i18nCommon('icon', true), required: true, maxlength: 50 }),
    to: zInput({ title: i18nMenus('to', true), maxlength: 200 }),
    badge: zInput({ title: i18nMenus('badge', true), maxlength: 10 }),
    keepAlive: zCheckbox(i18nMenus('keepAlive', true)),
    enabled: zCheckbox(i18nCommon('enabled', true)),
    hideInMenu: zCheckbox(i18nMenus('hideInMenu', true)),
    defaultOpen: zCheckbox(i18nMenus('defaultOpen', true)),
    target: z.enum(MENU_TARGET.values).meta({ title: i18nMenus('target.title', true) }),
    sort: zSort,
  })

  // 角色管理 - 新增/编辑
  const roleFormSchema = z.object({
    name: zInput({ title: i18nRoles('name', true), maxlength: 20, required: true }),
    code: zInput({ title: i18nRoles('code', true), maxlength: 50, required: true }),
    description: zInput({ title: i18nRoles('description', true), maxlength: 200, isTextarea: true }),
    enabled: zCheckbox(i18nCommon('enabled', true)),
    sort: zSort,
  })

  // 国际化 - 新增/编辑
  const i18nFormSchema = z.object({
    parentId: z.string().nullable().meta({
      title: i18nCommon('parent', true),
      help: i18nCommon('parentHelp', true),
    }),
    name: zInput({ title: i18nLocales('name', true), required: true, maxlength: 200 }),
    zh: zInput({ title: i18nLocales('zh', true), maxlength: 500, isTextarea: true }),
    en: zInput({ title: i18nLocales('en', true), maxlength: 500, isTextarea: true }),
    sort: zSort,
  })

  // 我的账户 - 更改密码
  const zChangePasswordInput = (field: string) => z.string(t(`auth.${field}.placeholder`)).min(8, t('auth.password.error')).meta({
    title: i18nAuth(`${field}.label`, true),
    required: true,
    input: {
      component: AInputPasswordToggle,
      props: {
        placeholder: i18nAuth(`${field}.placeholder`),
      },
    },
  })
  const changePasswordFormSchema = z.object({
    currentPassword: zChangePasswordInput('currentPassword'),
    ...forgotPasswordFormSchema.shape,
    confirmPassword: zChangePasswordInput('confirmPassword'),
  })

  return {
    zSort,
    zInput,
    i18nFormSchema,
    menuFormSchema,
    signInFormSchema,
    signUpFormSchema,
    emailFormSchema,
    forgotPasswordFormSchema,
    userFormSchema,
    banUserFormSchema,
    roleFormSchema,
    changePasswordFormSchema,
  }
}

// 导出类型
export type SignInFormSchema = z.infer<ReturnType<typeof useSchema>['signInFormSchema']>
export type SignUpFormSchema = z.infer<ReturnType<typeof useSchema>['signUpFormSchema']>
export type EmailFormSchema = z.infer<ReturnType<typeof useSchema>['emailFormSchema']>
export type ForgotPasswordFormSchema = z.infer<ReturnType<typeof useSchema>['forgotPasswordFormSchema']>
export type UserFormSchema = z.infer<ReturnType<typeof useSchema>['userFormSchema']>
export type BanUserFormSchema = z.infer<ReturnType<typeof useSchema>['banUserFormSchema']>
export type MenuFormSchema = z.infer<ReturnType<typeof useSchema>['menuFormSchema']>
export type I18nFormSchema = z.infer<ReturnType<typeof useSchema>['i18nFormSchema']>
export type RoleFormSchema = z.infer<ReturnType<typeof useSchema>['roleFormSchema']>
export type ChangePasswordFormSchema = z.infer<ReturnType<typeof useSchema>['changePasswordFormSchema']>
