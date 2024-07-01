import Cookie from "js-cookie";

export function getToken() {
  return Cookie.get("authToken");
}
export function setToken(token: string) {
  deleteToken();
  Cookie.set("authToken", token, { expires: 30 });
}
export function deleteToken() {
  Cookie.remove("authToken");
}
