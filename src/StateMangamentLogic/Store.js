import { create } from 'zustand';

const useCartStore = create((set) => ({
    cart: [],
    add: (item) => set((state) => ({ cart: [...state.cart, item] })),
    remove: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
    increase: (id) => set((state) => ({
        cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        ),
    })),
    decrease: (id) => set((state) => ({
        cart: state.cart.map((item) =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ),
    })),
}));

export default useCartStore;
