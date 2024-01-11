import logger from "../logger.js"

export const privateRoutes = ( req, res, next ) =>{
    if ( req.user ) return res.redirect('/profile')
    next()
}

export const publicRoutes = ( req, res, next ) =>{
    if ( !req.user ) return res.redirect('/')
    next()
}

export const handlePolicies = (policies) => (req, res, next) => {
	const userRole = req.user && (req.user.user?.role || req.user.role);

	if (policies.includes("PUBLIC")) return next();
	if (!userRole)
		return res
			.status(401)
			.json({ status: "error", error: "You are not logged in" });

	if (policies.length > 0) {
		console.log("role: ", userRole.toUpperCase());

		if (!policies.includes(userRole.toUpperCase())) {
			return res
				.status(403)
				.json({ status: "error", error: "You are not authorized" });
            
        }
    }
    next()
}