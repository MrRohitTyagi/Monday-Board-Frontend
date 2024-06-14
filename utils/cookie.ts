import Cookie from "js-cookie";

export function getToken() {
  return Cookie.get("authToken");
}
export function setToken(token: string) {
  deleteToken();
  Cookie.set("authToken", token);
}
export function deleteToken() {
  Cookie.remove("authToken");
}
