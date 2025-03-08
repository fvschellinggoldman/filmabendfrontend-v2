const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "";

export async function postRequest<T>(url: string, data: any): Promise<T> {
  const options = {
    method: "POST", // Specify the HTTP method (GET, POST, PATCH, DELETE, etc.)
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
    },
    body: JSON.stringify(data),
  };
  return fetch(`${baseUrl}${url}`, options).then((res) => res.json());
}

export async function putRequest<T>(url: string, data: any): Promise<Response> {
  const options = {
    method: "PUT", // Specify the HTTP method (GET, POST, PATCH, DELETE, etc.)
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
    },
    body: JSON.stringify(data),
  };
  return fetch(`${baseUrl}${url}`, options);
}

export async function putRequestFile<T>(url: string, data: any): Promise<T> {
  const options = {
    method: "PUT", // Specify the HTTP method (GET, POST, PATCH, DELETE, etc.)
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
    },
    body: data,
  };
  return fetch(`${baseUrl}${url}`, options).then((res) => res.json());
}

export async function postFile<T>(url: string, data: any): Promise<T> {
  const options = {
    method: "POST", // Specify the HTTP method (GET, POST, PATCH, DELETE, etc.)
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
    },
    body: data,
  };

  return fetch(`${baseUrl}${url}`, options).then((res) => res.json());
}

export async function getRequest<T>(
  url: string,
  data: Record<string, string> | null
): Promise<T> {
  const queryString = data
    ? Object.entries(data)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    : null;
  url = url.concat(queryString ? `?${queryString}` : "");
  const options = {
    method: "GET", // Specify the HTTP method (GET, POST, PATCH, DELETE, etc.)
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
    },
  };

  return fetch(`${baseUrl}${url}`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error during fetch:", error);
      // Handle the error or throw it again based on your requirements
      throw error;
    });
}

export async function deleteRequest<T>(
  url: string,
  data: Record<string, string> | null = {}
): Promise<T | null> {
  const queryString = data
    ? Object.entries(data)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    : null;
  url = url.concat(queryString ? `?${queryString}` : "");
  const options = {
    method: "DELETE", // Specify the HTTP method (GET, POST, PATCH, DELETE, etc.)
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
    },
  };

  return fetch(`${baseUrl}${url}`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      if (res.status === 204) {
        return null;
      }
      return res.json() as Promise<T>;
    })
    .catch((error) => {
      console.error("Error during fetch:", error);
      // Handle the error or throw it again based on your requirements
      throw error;
    });
}
