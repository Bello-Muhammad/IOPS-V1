const isAuth = (req, res, next) => {
    const {session: { user }} = req;
    const url = req.originalUrl
    if(!user){

        return res.redirect(`/api/v1/auth/login`)
    }

    next();
};

const authPage = (permissions) => {
    return (req, res, next) => {
        const role = req.session.user.role;
        if(permissions.includes(role)) {
            next();
        }else{
            if(role === 'supervisor'){
                res.redirect('/api/v1/admin/dashboard');
            } else if (role === 'official') {
                res.redirect('/ap1/v1/admin/staff/dashboard')
            }
        }
    }
};


module.exports = {
    isAuth,
    authPage
}