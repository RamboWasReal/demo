export const truncateString = (str: string, num: number) => {
  if (!num) {
    return str
  }
  if (str?.length <= num) {
    return str
  }
  if (!str) {
    return ""
  }
  return str?.slice(0, num) + "..."
}
