import logger from "../logger.js"

export const privateRoutes = ( req, res, next ) =>{
    if ( req.user ) return res.redirect('/profile')
    next()
}

export const publicRoutes = ( req, res, next ) =>{
    if ( !req.user ) return res.redirect('/')
    next()
}

export const handlePolicies = policies => (req, res, next) => {
    if (policies.includes('PUBLIC')) return next();
    if (!req.user || !req.user.user.role){   
        console.log(req.user.user);
        console.log(req.user.user.role);
        logger.error('You are not logged in or do not have a role')
        return res.status(401).json({ status: 'error', error: 'You are not logged in or do not have a role' });
    }

    if (policies.length > 0){
        if(!policies.includes(req.user.user.role.toUpperCase()) ) {
            logger.error('You are not authorized')
            console.log(req.user.user);
            console.log(req.user.user.role);
            return res.status(401).json({ status: 'error', error: 'You are not authorized' });
        }
    }
    next();
};



