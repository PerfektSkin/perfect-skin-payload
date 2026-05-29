import { GoogleTagManager as NextGoogleTagManager } from '@next/third-parties/google'

const GTM_ID = 'GTM-M8JBQZTC'

export function GoogleTagManager() {
  return <NextGoogleTagManager gtmId={GTM_ID} />
}
