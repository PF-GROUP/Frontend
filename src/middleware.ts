import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"
import { userPayload } from "@/interfaces/userPayload.dto"

// 1. Definir rutas protegidas y públicas
const protectedRoutes = ["/DashboardAgente"]
const onBoardingRoutes = ["/stripe"]
const adminRoutes = ["/DashboardAdmin"]
const publicRoutes = ["/login", "/register"]

export default async function middleware(request: NextRequest) {
  let isTokenValid = false
    const sessionToken = request.cookies.get("token")?.value
  try {
     isTokenValid = await verifyToken(request)
  } catch (error) {
    isTokenValid = false
  }



  console.log("🚀 Middleware ejecutándose en:", request.nextUrl.pathname)
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isOnBoardingRoute = onBoardingRoutes.includes(path)
  const isAdminRoute = adminRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  if (!isTokenValid && !isPublicRoute && !!sessionToken) {
    const response =  NextResponse.redirect(new URL("/login", request.nextUrl))
    response.cookies.delete("token")
    return response
  }
  // 2. Obtener la cookie del request
  const session = verifySession(sessionToken)
  const { isAuthenticated, isAdmin, isOnBoarding, isPay } = session

  if (isAuthenticated && isAdmin) {
      return NextResponse.next()
  }

  // 3. Redirección si no está autenticado
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
  // if (isProtectedRoute && !isPay && isAuthenticated) {
  //   return NextResponse.redirect(new URL("/stripe", request.nextUrl))
  // }
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
async function verifyToken(req) {
  const res = await fetch(`http://localhost:3000/auth/ValidToken`,{credentials:"include", headers: req.headers})
  console.log(res.status)
  return res.status === 401 || res.status === 403 ? false : true
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
    console.log('user::: ', user);
    const isAdmin = user.isAdmin
    console.log('isAdmin::: ', isAdmin);
    const isPay = user.status
    console.log('isPay::: ', isPay);
    const isOnBoarding = user.onBoarding ? true : false
    console.log('isOnBoarding::: ', isOnBoarding);
    const isAuthenticated = true
    console.log('isAuthenticated::: ', isAuthenticated);

    

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
