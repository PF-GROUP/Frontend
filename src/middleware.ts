import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"
import { userPayload } from "@/interfaces/userPayload.dto"

// 1. Definir rutas protegidas y públicas
const protectedRoutes = ["/DashboardAgente"]
const onBoardingRoutes = ["/stripe"]
const adminRoutes = ["/DashboardAdmin"]
const publicRoutes = ["/login", "/register"]

export default function middleware(request: NextRequest) {
  console.log("🚀 Middleware ejecutándose en:", request.nextUrl.pathname)
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isOnBoardingRoute = onBoardingRoutes.includes(path)
  const isAdminRoute = adminRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 2. Obtener la cookie del request
  const sessionToken = request.cookies.get("token")?.value
  const session = verifySession(sessionToken)
  const { isAuthenticated, isAdmin, isOnBoarding, isPay } = session

  if (isAuthenticated && isAdmin) {
      return NextResponse.next()
  }

  // 3. Redirección si no está autenticado
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
  if (isProtectedRoute && !isPay && isAuthenticated) {
    return NextResponse.redirect(new URL("/stripe", request.nextUrl))
  }
  if (isProtectedRoute && isOnBoarding && isAuthenticated) {
    return NextResponse.redirect(new URL("/stripe", request.nextUrl))
  }
  if (isOnBoardingRoute && !isOnBoarding) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }
  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  // 4. Redirección si ya está logueado e intenta ir a login/register
  if (isPublicRoute && isAuthenticated) {
    const targetPath = isOnBoarding || isPay ? "/stripe" : "/DashboardAgente"
    return NextResponse.redirect(new URL(targetPath, request.nextUrl))
  }

  return NextResponse.next()
}

function verifySession(token: string | undefined): {
  isAuthenticated: boolean
  isAdmin: boolean
  isOnBoarding: boolean 
  isPay: string | undefined | boolean} {
  console.log(token)
  if (!token) return {
    isAuthenticated: false,
    isAdmin: false,
    isOnBoarding: false,
    isPay: false
  }
  try {
    const user:userPayload = jwtDecode(token)
    const isAdmin = user.isAdmin
    const isPay = user.status
    const isOnBoarding = user.onBoarding ? true : false
    const isAuthenticated = true



    return {
      isAuthenticated,
      isAdmin,
      isOnBoarding,
      isPay
    }
  } catch {
    return {
      isAuthenticated: false,
      isAdmin: false,
      isOnBoarding: false,
      isPay: false
    }
  }
}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
