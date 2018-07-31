class LoginUtil {
    isLoggedIn(logged_in_user) {
	return (logged_in_user && logged_in_user.status && logged_in_user.status == 1);
    }
    isAdmin(logged_in_user) {
	if (!this.isLoggedIn(logged_in_user)) {
	    return false;
	}
	return (logged_in_user.role == 'admin');
    }
    isAuthorized(logged_in_user, quark) {
	if (!quark || !this.isLoggedIn(logged_in_user)) {
	    return false;
	}
	if (this.isAdmin(logged_in_user)) {
	    return true;
	}
	if (logged_in_user.id == quark.user_id) {
	    return true;
	}
	if (!quark.is_exclusive) {
	    return true;
	}
	return false;
    }
}
export default LoginUtil;
