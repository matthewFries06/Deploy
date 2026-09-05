import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Ignoruj:
     * - api, admin, _payload (ścieżki robocze Payload CMS)
     * - _next/static, _next/image (pliki produkcyjne Next.js)
     * - favicon i pliki statyczne z rozszerzeniami (.svg, .png, .ico itp.)
     */
    '/((?!admin|api|_payload|_next/static|_next/image|favicon\\.ico|favicon\\.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
