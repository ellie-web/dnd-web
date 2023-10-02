const getCookieValue = (cookie, name) => 
{
  const regex = new RegExp(`(^| )${name}=([^;]+)`)
  const match = cookie.match(regex)
  if (match) {
    return match[2]
  }
}

export default getCookieValue