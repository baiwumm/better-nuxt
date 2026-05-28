export async function getGeoByIP(ip: string) {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`)
    const data = await res.json()

    if (data.status === 'success') {
      return {
        country: data.country,
        region: data.regionName,
        city: data.city,
        isp: data.isp || data.org,
      }
    }

    return null
  }
  catch {
    return null
  }
}
