import geoip from 'geoip-lite'

export function getGeoByIP(ip: string) {
  try {
    const result = geoip.lookup(ip)

    if (!result)
      return null

    return {
      country: result.country,

      province: result.region,

      city: result.city,
    }
  }
  catch (err) {
    console.error('geoip-lite error:', err)

    return null
  }
}
