//const baseUrl = "https://filmabend-backend.fly.dev";
const baseUrl = "";

export async function postRequest<T>(
    url: string,
    data: any
  ): Promise<T> {

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
  
export async function postFile<T>(
    url:string,
    data: any
) : Promise<T> {
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

return fetch(`${baseUrl}${url}`, options).then((res) => res.json());
}