"use client";

export function handleLogout(data?: any) {
  const event = new CustomEvent("LOGOUT", { detail: data });
  document.dispatchEvent(event);
}
export function opnePropileLayer(data?: any) {
  const event = new CustomEvent("OPEN_PROFILE_LAYER", { detail: data });
  document.dispatchEvent(event);
}

export function deletePulseInSprint(sprint_id: string, pulses: string[]) {
  const event = new CustomEvent(`DELETE_PULSE_IN_SPRINT_${sprint_id}`, {
    detail: pulses,
  });
  document.dispatchEvent(event);
}
