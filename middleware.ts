// middleware.ts
/*import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const requestedPagePath = req.nextUrl.pathname;
  const { isAuthenticated} = getKindeServerSession();
  // Vérifie si l'utilisateur est authentifié
  if (!await isAuthenticated()) {
    // Rediriger vers Kinde pour l'authentification avec le chemin de retour dans les paramètres d'URL
    const redirectUrl = new URL('/api/auth/login', req.url);
    redirectUrl.searchParams.append('returnTo', requestedPagePath);
    return NextResponse.redirect(redirectUrl);
  }

  // Si l'utilisateur est authentifié, renvoyez simplement le middleware d'authentification standard
  return withAuth(req);
}

export const config = {
  matcher: ["/Profil","/Checkout"], // Assurez-vous d'ajouter la route de profil ici
};*/
import {
  authMiddleware,
  withAuth,
} from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function middleware(req: Request) {
  return withAuth(req);
}

export const config = {
  matcher: ["/Profil","/add-products","/manage-products"],
};

