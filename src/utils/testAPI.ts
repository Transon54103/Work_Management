// Test API Connection
// You can run this in the browser console to test the API

const testRegisterAPI = async () => {
  try {
    const response = await fetch("https://localhost:7058/api/User/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        password: "testpassword123",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful:", data);
      return data;
    } else {
      const errorData = await response.text();
      console.error("Registration failed:", response.status, errorData);
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
};

// Uncomment the line below to test the API
// testRegisterAPI();

export { testRegisterAPI };
