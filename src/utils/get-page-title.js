import defaultSettings from '@/settings'

const title = defaultSettings.title || '美络AI-Stuidio'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
