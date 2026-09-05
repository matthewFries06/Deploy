import { getCachedGlobal } from '@/utilities/getGlobals'

import './index.css'
import { FooterClient } from './index.client'

export async function Footer() {
  let footer = null

  try {
    footer = await getCachedGlobal('footer', 1)()
  } catch (error) {
    console.error('Błąd podczas pobierania Footer z bazy:', error)
  }

  const fallbackFooter = footer || { navItems: [] }

  return <FooterClient footer={fallbackFooter} />
}
