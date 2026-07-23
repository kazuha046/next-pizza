import {useEffect} from "react"
import {useCartStore} from "@/store/cart"
import {CreateCartItemValues} from "@/components/services/dto/cart.dto"
import {CartStateItem} from "@/lib/get-cart-details"

type ReturnProps = {
    totalAmount: number
    items: CartStateItem[]
    loading: boolean
    updateItemQuantity: (id: number, quantity: number) => void
    removeCartItem: (id: number) => void
    addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (): ReturnProps => {
    const totalAmount = useCartStore((state) => state.totalAmount)
    const items = useCartStore((state) => state.items)
    const loading = useCartStore((state) => state.loading)

    const updateItemQuantity = useCartStore((state) => state.updateItemQuantity)
    const removeCartItem = useCartStore((state) => state.removeCartItem)
    const addCartItem = useCartStore((state) => state.addCartItem)
    const fetchCartItems = useCartStore((state) => state.fetchCartItems)

    useEffect(() => {
        fetchCartItems().then(() => console.log("Fetch cart items"))
    }, [])

    return {totalAmount, items, loading, updateItemQuantity, removeCartItem, addCartItem}
}
