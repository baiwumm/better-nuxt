import { Ip2Region } from 'ts-ip2region2'

let searcher: Ip2Region | null = null

function getSearcher() {
  if (!searcher) {
    searcher = new Ip2Region({
      cachePolicy: 'content',
    })
  }

  return searcher
}

export function getGeoByIP(ip: string) {
  try {
    const result = getSearcher().search(ip)

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
