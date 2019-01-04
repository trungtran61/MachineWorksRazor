getToken()
{
    return localStorage.getItem('bearerToken');
}

getSecurityObject()
{
    return JSON.parse(localStorage.getItem('securityObject'));
}

getUsers(getListRequest)
{
    let params = new HttpParams().append("searchParm", getListRequest.searchParm)
        .append("PageSize", environment.pageSize.toString())
        .append("PageNumber", getListRequest.pageNumber.toString());

    return this.http.get<GetUsersResponse>(this.apiUrl + 'GetUsers', {
        params: params
    });
}

getUser(id)
{
    let params = new HttpParams().set("id", id.toString());
    console.log(id);
    return this.http.get<User>(this.apiUrl + 'GetUser', {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'my-auth-token'
        }),
        params: params
    });
}

getRole(id)
{
    let params = new HttpParams().set("id", id.toString());

    return this.http.get<Role>(this.apiUrl + 'GetRole', {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'my-auth-token'
        }),
        params: params
    });
}

getPermission(id)
{
    let params = new HttpParams().set("id", id.toString());

    return this.http.get<Permission>(this.apiUrl + 'GetPermission', {
        params: params
    });
}

updateUserRoles(id)
{
    return (this.http.post(this.apiUrl + 'UpdateUserRoles', { id: id, roles: JSON.stringify(roles) }));
}

updateUserStatus(id)
{
    return (this.http.post(this.apiUrl + 'UpdateUserStatus', { id: id, active: active }));
}

updateRoleStatus(role)
{
    return (this.http.post(this.apiUrl + 'UpdateRoleStatus', { id: role.id, active: role.active }));
}

updatePermissionStatus(permission)
{
    return (this.http.post(this.apiUrl + 'UpdatePermissionStatus', { id: permission.id, active: permission.active }));
}

updateUserProfile(user) {
    return (this.http.post(this.apiUrl + 'UpdateUserProfile', user));
}

updateRole(role)
{
    return (this.http.post(this.apiUrl + 'UpdateRole', role));
}

updatePermission(permission)
{
    return this.http.post(this.apiUrl + 'UpdatePermission', permission);
}

getRoles(getListRequest)
{
    let params = new HttpParams().append("searchParm", getListRequest.searchParm)
        .append("PageSize", environment.pageSize.toString())
        .append("PageNumber", getListRequest.pageNumber.toString());

    return this.http.get<GetRolesResponse>(this.apiUrl + 'GetRoles', {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'my-auth-token'
        }),
        params: params
    });
}

getPermissions(getListRequest){
    let params = new HttpParams().append("searchParm", getListRequest.searchParm)
        .append("PageSize", environment.pageSize.toString())
        .append("PageNumber", getListRequest.pageNumber.toString());

    return this.http.get<GetPermissionsResponse>(this.apiUrl + 'GetPermissions', {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'my-auth-token'
        }),
        params: params
    });
}

 extractData(response) {
    let body = response.json();
    return body || {};
}

initializeUser()
{
    return {
        id: 0,
        userName: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
        active: false,
        roles: null,
        permissions: ''
    };
}

logout()
{
    localStorage.removeItem("bearerToken");
    localStorage.removeItem("securityObject");
}

hasClaim(claimType, claimValue)
{
    let ret = false;

    // See if an array of values was passed in.
    if (typeof claimType === "string") {
        ret = this.isClaimValid(claimType, claimValue);
    }
    else {
        let claims: string[] = claimType;
        if (claims) {
            for (let index = 0; index < claims.length; index++) {
                ret = this.isClaimValid(claims[index]);
                // If one is successful, then let them in
                if (ret) {
                    break;
                }
            }
        }
    }

    return ret;
}

isClaimValid(claimType, claimValue)
{
    let ret = false;
    let auth = null;

    // Retrieve security object
    auth = this.getSecurityObject(); // this.securityObject;  

    if (auth) {
        // See if the claim type has a value
        // *hasClaim="'claimType:value'"
        if (claimType.indexOf(":") >= 0) {
            let words: string[] = claimType.split(":");
            claimType = words[0].toLowerCase();
            claimValue = words[1];
        }
        else {
            claimType = claimType.toLowerCase();
            // Either get the claim value, or assume 'true'
            claimValue = claimValue ? claimValue : "true";
        }
        // Attempt to find the claim
        ret = auth.claims.find(c =>
            c.claimType.toLowerCase() == claimType &&
            c.claimValue.toLowerCase() == claimValue) != null;
    }

    return ret;
}