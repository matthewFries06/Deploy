import { getCachedGlobal } from '@/utilities/getGlobals'

import './index.css'
import { HeaderClient } from './index.client'

export async function Header() {
  let header = null

  try {
    // Próbujemy pobrać dane z bazy/cache
    header = await getCachedGlobal('header', 1)()
  } catch (error) {
    // Przechwytujemy błąd braku tabeli SQLite przy czystej bazie, 
    // zapobiegając błędowi React #441
    console.error('Błąd podczas pobierania Header z bazy:', error)
  }

  // Jeśli brak danych lub błąd, przekazujemy bezpieczny obiekt zastępczy
  const fallbackHeader = header || { navItems: [] }

  return <HeaderClient header={fallbackHeader} />
}
