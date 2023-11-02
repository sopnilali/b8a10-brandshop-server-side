/**
 * ------------------
 *   Make API Secure 
 * ------------------
 * 
 * The person who should have 
 * 
 * concept:
 * 1. assign two token for each person: (access token and refresh token)
 * 2. access token contains: user identification (email, role, etc). valid for a shorter duration
 * 3. refresh token is used: to recreate an access token that was expired
 * 4. if refresh token is invalid then logout the user
 * 
 * 
 * 
 * 
 */
/**
 * 1: jwt: json web token
 * . use jwt.sign('keydata (playLoad)','secretKey', 'valid expiration')
 * 2. generate a token by using jwt.sign()
 * 3. create api set to cookie. httponly, secure, sameSite
 * 4. from client side: axios withCredentials : true
 * 5. corse setup origin and credentials true
 * 
 * store token:
 * memory: not secure
 * localStorage: if simple app for the local storage 
 * Cookies: mainly recommended
 */

/**
 * 1. for secure api calls
 * 2. server side: install cookies parser and use it as a middleware
 * 3. req.cookies 
 * 4. on the client side: make api call using axios withCredentials: true or  credentials include while using fetch
**/