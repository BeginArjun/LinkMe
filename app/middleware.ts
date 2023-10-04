import {withAuth} from "next-auth/middleware"
export default withAuth(
    function middleware (req) {
        console.log("In Middleware")
    },
    {
      callbacks: {
        authorized: ({ req, token }) => {
          if (
            req.nextUrl.pathname.startsWith('/protected') &&
            token === null
          ) {
            return false
          }
          return true
        }
      }
    }
  )
export const config={
    matcher:["/api/link/update/:linkid*"]
}