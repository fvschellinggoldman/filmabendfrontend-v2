const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL || '';

export async function loginRequest<T>(
    url: string,
    params: Record<any, any>
  ): Promise<T> {
    try {
      const queryString = params
        ? Object.entries(params)
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join("&")
        : null;
  
      const response = await fetch(`${baseUrl}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
        },
        body: queryString,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData: T = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }