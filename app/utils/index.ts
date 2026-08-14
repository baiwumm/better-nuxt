import type { PaginationState } from '@tanstack/vue-table'
import type { ClassValue } from 'clsx'
import { faker } from '@faker-js/faker'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** 默认分页状态（表格分页组件消费，只读） */
export const INITIAL_PAGINATION: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
}

/** 分页大小选项 */
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

/**
 * @description: 合并类名
 * @param {Array} inputs
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @description: 统一处理 catch 错误
 */
export function catchError(err: unknown): string {
  let message = 'Request failed, please try again later'

  if (err instanceof Error) {
    message = err.message
  }
  else if (typeof err === 'string') {
    message = err
  }
  return message
}

/**
 * @description: 判断请求是否成功
 */
export const isSuccess = (code: ResponseCode) => code === RESPONSE_CODE.SUCCESS

/**
 * @description: 处理动态路径
 */
const PARAM_REGEXP = /\/:\w+(?:\([^)]*\))?[?+*]?/g

export function normalizePath(path: string) {
  return path.replace(PARAM_REGEXP, '')
}

/**
 * @description: 随机图片
 */
export function generateRandomImages(count = 6, width = 640, height = 640): string[] {
  return Array.from({ length: count }).map(() => {
    return faker.image.urlPicsumPhotos({ width, height, blur: 0 })
  })
}
