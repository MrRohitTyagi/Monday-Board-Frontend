"use client";

export function handleLogout(data?: any) {
  const event = new CustomEvent("LOGOUT", { detail: data });
  document.dispatchEvent(event);
}
