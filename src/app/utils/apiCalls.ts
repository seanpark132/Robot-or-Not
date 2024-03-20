export async function apiRequestNoResponse(
  routeName: string,
  method: string,
  payload: Record<string, any>
) {
  const res = await fetch(`../api/${routeName}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("error");
  }
}

export async function apiRequestWithResponse(
  routeName: string,
  method: string,
  payload: Record<string, any>
) {
  const res = await fetch(`../api/${routeName}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("error");
  }

  const json = await res.json();
  return json.response;
}
