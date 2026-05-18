import dayjs from 'dayjs'
import { randomInt } from 'es-toolkit/math'

export interface ChartItem {
  date: string
  uv: number // 访客数 UV
  pv: number // 浏览量 PV
}

/**
 * 生成近 N 天较真实的图表数据
 */
export function getChartData(days = 10): ChartItem[] {
  const data: ChartItem[] = []
  for (let i = days - 1; i >= 0; i--) {
    data.push({
      date: dayjs().subtract(i, 'day').format('MM-DD'),
      uv: randomInt(500, 1000),
      pv: randomInt(1000, 2000),
    })
  }

  return data
}
