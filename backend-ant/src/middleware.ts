import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Ignoruj ścieżki systemowe Next.js oraz wszystkie zasoby z rozszerzeniem pliku (np. favicon.ico, .svg, .png)
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|favicon\\.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
