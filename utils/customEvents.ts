"use client";

export function handleLogout(data?: any) {
  const event = new CustomEvent("LOGOUT", { detail: data });
  document.dispatchEvent(event);
}
export function opnePropileLayer(data?: any) {
  const event = new CustomEvent("OPEN_PROFILE_LAYER", { detail: data });
  document.dispatchEvent(event);
}
