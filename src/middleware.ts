import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

// 1. Definir rutas protegidas y públicas
const protectedRoutes = ["/DashboardAdmin", "/DashboardAgente", "/stripe"]
const publicRoutes = ["/login", "/register", "/"]

export default function middleware(request: NextRequest) {
  console.log("🚀 Middleware ejecutándose en:", request.nextUrl.pathname)
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 2. Obtener la cookie del request
  const sessionToken = request.cookies.get("token")?.value
  const isAuthenticated = verifySession(sessionToken)

  // 3. Redirección si no está autenticado
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  // 4. Redirección si ya está logueado e intenta ir a login/register
  if (isPublicRoute && isAuthenticated) {
    const decoded = decryptSession(sessionToken!)
    const role = decoded?.role
    const targetPath = role === "admin" ? "/DashboardAdmin" : "/DashboardAgente"
    return NextResponse.redirect(new URL(targetPath, request.nextUrl))
  }

  return NextResponse.next()
}

function verifySession(token: string | undefined): boolean {
  if (!token) return false
  try {
    const decoded = jwtDecode(token)
    console.log(decoded)
    return !!decoded?.id
  } catch {
    return false
  }
}

function decryptSession(token: string) {
  try {
    return jwtDecode(token)
  } catch {
    return null
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
