import geoip from 'geoip-lite'

export async function getGeoByIP(ip: string) {
  try {
    // 1️⃣ 本地库优先
    const local = geoip.lookup(ip)

    if (local) {
      return {
        country: local.country,
        province: local.region,
        city: local.city,
      }
    }

    // 2️⃣ fallback API
    const res = await fetch(
      `http://ip-api.com/json/${ip}?lang=zh-CN`,
    )

    const data = await res.json()

    if (data?.status === 'success') {
      return {
        country: data.country,
        province: data.regionName,
        city: data.city,
        isp: data.isp || data.org,
      }
    }

    return null
  }
  catch (err) {
    console.error('geo lookup failed:', err)
    return null
  }
}
