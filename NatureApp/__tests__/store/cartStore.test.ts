import { useCartStore } from '../../src/store/cartStore';
import { CartService } from '../../src/services/firestoreService';

// Mock the CartService
jest.mock('../../src/services/firestoreService', () => ({
  CartService: {
    get: jest.fn(),
    addItem: jest.fn(),
    updateQuantity: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
}));

describe('cartStore', () => {
  beforeEach(() => {
    // Reset state before each test
    useCartStore.getState().clearCartLocal();
    jest.clearAllMocks();
  });

  it('initial state should be empty', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.itemCount).toBe(0);
  });

  it('loadCart should populate state correctly', async () => {
    // Mock the CartService.get response
    (CartService.get as jest.Mock).mockResolvedValue({
      items: [
        { productId: '1', name: 'Item 1', price: 10, quantity: 2 },
        { productId: '2', name: 'Item 2', price: 15, quantity: 1 },
      ],
      total: 35,
      count: 3
    });

    await useCartStore.getState().loadCart('user123');

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(2);
    expect(state.total).toBe(35);
    expect(state.itemCount).toBe(3);
    expect(state.loading).toBe(false);
  });

  it('clearCartLocal should reset state synchronously', () => {
    // Force some state
    useCartStore.setState({
      items: [{ productId: '1', price: 10, quantity: 2 }],
      total: 20,
      itemCount: 2
    });

    // Call clear
    useCartStore.getState().clearCartLocal();

    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.itemCount).toBe(0);
  });
});
