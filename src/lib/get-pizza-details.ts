import {calcTotalPizzaPrice} from "./calc-total-pizza-price"
import {Ingredient, ProductItem} from "@/generated/prisma/client"
import {mapPizzaType, PizzaSize, PizzaType} from "@/constants/pizza"

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients)
    const textDetails = `${size} cm, ${mapPizzaType[type]} pizza`

    return {totalPrice, textDetails: textDetails}
}
