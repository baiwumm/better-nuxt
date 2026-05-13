import { AutoFormInput, AutoFormTextarea } from '#components'
import z from 'zod'

interface ZInputOpts { title: string, required?: boolean, maxlength?: number, isTextarea?: boolean }

export function useSchema() {
  const { i18nCommon, i18nInternalization } = useMessage()

  // 排序
  const zSort = z.number().default(0).meta({
    title: '$i18n:common.sort',
  })

  // 输入框 - 函数重载，根据 required 得到准确的类型
  function zInput(opts: ZInputOpts & { required: true }): z.ZodString
  function zInput(opts: ZInputOpts & { required?: false }): z.ZodNullable<z.ZodString>
  function zInput(opts: ZInputOpts): z.ZodString | z.ZodNullable<z.ZodString> {
    const { title, required = false, maxlength, isTextarea = false } = opts
    const schema = z.string()
    const baseMeta = {
      title,
      required,
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

  // 国际化 - 新增/删除
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
  }
}
