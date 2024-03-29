// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// return the Datacenter from the session storage
export const getIP = () => {
  return sessionStorage.getItem('ip') || null;
}

export const getTextDC = () => {
  return sessionStorage.getItem('textDC') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (ip,token, user) => {
  sessionStorage.setItem('ip', ip);
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));

}
export const setTextDC = (textDC) => {
  sessionStorage.setItem('textDC', textDC);
}
