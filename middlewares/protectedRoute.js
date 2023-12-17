import passport from "passport"

const protectedRoute = passport.authenticate("jwt", { session: false })

export default protectedRoute