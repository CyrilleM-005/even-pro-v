export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchDatasOptions<T = unknown> = {
  method: HttpMethod;
  body?: T;
  token?: string;
}

export const fetchDatas = async <TResponse, TBody = unknown>(
  url: string,
  options: FetchDatasOptions<TBody>
): Promise<TResponse> => {
  const { method, body, token } = options;

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  // Ajouter le token si présent
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Content-Type seulement si body existe
  if (body && method !== "GET") {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method,
    headers,
    body:
      body && method !== "GET"
        ? JSON.stringify(body)
        : undefined,
  });

  // Gestion erreurs HTTP
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw {
      status: response.status,
      message: errorData?.message || "Erreur API",
    };
  }

  // DELETE → souvent pas de contenu
  if (method === "DELETE") {
    return {} as TResponse;
  }

  return response.json();
};



// const events = await fetchDatas<Event[]>("/api/events", {
//   method: "GET",
//   token,
// });

// await fetchDatas("/api/events", {
//   method: "POST",
//   token,
//   body: {
//     title: "Concert Afro",
//     date: "2025-12-25",
//   },
// });
