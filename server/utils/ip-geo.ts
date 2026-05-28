import { Ip2Region } from 'ts-ip2region2'

const searcher = new Ip2Region({
  cachePolicy: 'content',
})

export function getGeoByIP(ip: string) {
  try {
    const result = searcher.search(ip)

    if (!result?.region)
      return null

    const [country, province, city, isp] = result.region.split('|')

    return {
      country,
      province,
      city,
      isp,
    }
  }
  catch (err) {
    console.error('ip2region error:', err)

    return null
  }
}
