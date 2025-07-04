const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Include cookies
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  }

  async register(name: string, email: string, password: string) {
    const data = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  }

  async logout() {
    await this.request("/auth/logout", { method: "POST" });
    localStorage.removeItem("token");
  }

  async getCurrentUser() {
    return this.request("/auth/me");
  }

  // Product methods
  async getProducts(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products?${queryString}`);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  // Cart methods
  async getCart() {
    return this.request("/cart");
  }

  async addToCart(productId: string, quantity = 1) {
    return this.request("/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(productId: string, quantity: number) {
    return this.request("/cart/update", {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async removeFromCart(productId: string) {
    return this.request(`/cart/remove/${productId}`, {
      method: "DELETE",
    });
  }

  async clearCart() {
    return this.request("/cart/clear", {
      method: "DELETE",
    });
  }
}

export const apiService = new ApiService();
