import { withAuth } from 'next-auth/middleware' 

export const config = {
    matcher: ['/dashboard/:path*', '/dashboard']
}

