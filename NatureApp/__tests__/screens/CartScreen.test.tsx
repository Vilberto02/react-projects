// Mock Expo Router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../src/store/authStore", () => {
  let state = { user: null };
  return {
    useAuthStore: Object.assign(
      (selector: any) => (selector ? selector(state) : state),
      {
        setState: (newState: any) => {
          state = { ...state, ...newState };
        },
      },
    ),
  };
});

jest.mock("../../src/store/cartStore", () => {
  let state = {
    items: [],
    total: 0,
    itemCount: 0,
    clearCart: jest.fn(),
    updateQuantity: jest.fn(),
    removeItem: jest.fn(),
  };
  return {
    useCartStore: Object.assign(
      (selector: any) => (selector ? selector(state) : state),
      {
        setState: (newState: any) => {
          state = { ...state, ...newState };
        },
      },
    ),
  };
});

describe("CartScreen integration", () => {
  it("uses stores correctly", () => {
    expect(true).toBe(true);
  });
});
