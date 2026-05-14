import { AutoFormInput, AutoFormTextarea } from '#components'
import z from 'zod'
import { MENU_TARGET } from '@/enums'

interface ZInputOpts {
  title: string
  help?: string
  required?: boolean
  maxlength?: number
  isTextarea?: boolean
}

export function useSchema() {
  const { i18nCommon, i18nInternalization, i18nMenu } = useMessage()

  // 排序
  const zSort = z.number().default(0).meta({
    title: '$i18n:common.sort',
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

  // 菜单管理 - 新增/编辑
  const menuFormSchema = z.object({
    parentId: z.string().nullable().meta({
      title: i18nMenu('parentId', true),
      help: '$i18n:common.parentHelp',
    }),
    label: zInput({
      title: i18nMenu('label', true),
      help: i18nMenu('labelHlep', true),
      required: true,
      maxlength: 200,
    }),
    icon: zInput({ title: i18nCommon('icon', true), required: true, maxlength: 50 }),
    to: zInput({ title: i18nMenu('to', true), maxlength: 200 }),
    badge: zInput({ title: i18nMenu('badge', true), maxlength: 10 }),
    keepAlive: zCheckbox(i18nMenu('keepAlive', true)),
    enabled: zCheckbox(i18nMenu('enabled', true)),
    defaultOpen: zCheckbox(i18nMenu('defaultOpen', true)),
    target: z.enum(MENU_TARGET.values).meta({ title: i18nMenu('target.title', true) }),
    sort: zSort,
  })

  // 国际化 - 新增/编辑
  const internalizationFormSchema = z.object({
    parentId: z.string().nullable().meta({
      title: '$i18n:common.parent',
      help: '$i18n:common.parentHelp',
    }),
    name: zInput({ title: i18nInternalization('name', true), required: true, maxlength: 200 }),
    zh: zInput({ title: i18nInternalization('zh', true), maxlength: 500, isTextarea: true }),
    en: zInput({ title: i18nInternalization('en', true), maxlength: 500, isTextarea: true }),
    sort: zSort,
  })

  return {
    zSort,
    zInput,
    internalizationFormSchema,
    menuFormSchema,
  }
}
