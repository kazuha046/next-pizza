"use client"

import React from "react"
import {Title} from "./title"
import {Input} from "../ui/input"
import {RangeSlider} from "./range-slider"
import {CheckBoxFiltersGroup} from "./checkbox-filters-group"
import {useIngredients} from "@/hooks/use-ingredients"
import {useFilters} from "@/hooks/use-filters"
import {useQueryFilters} from "@/hooks/use-query-filters"

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className}) => {
    const {ingredients, loading} = useIngredients()
    const filters = useFilters()

    useQueryFilters(filters)

    const items = ingredients.map((item) => ({value: String(item.id), text: item.name}))

    const updatePrices = (prices: number[]) => {
        filters.setPrices("priceFrom", prices[0])
        filters.setPrices("priceTo", prices[1])
    }

    return (
        <div className={className}>
            <Title text={"Filters"} size={"sm"} className={"mb-5 font-bold"}/>

            <div className={"flex flex-col gap-4"}>
                <CheckBoxFiltersGroup
                    title="Dough Type"
                    name="pizzaTypes"
                    className="mb-5"
                    onClickCheckbox={filters.setPizzaTypes}
                    selectedIds={filters.pizzaTypes}
                    items={[
                        {text: "Thin", value: "1"},
                        {text: "Traditional", value: "2"}
                    ]}
                />

                <CheckBoxFiltersGroup
                    title="Sizes"
                    name="sizes"
                    className="mb-5"
                    onClickCheckbox={filters.setSizes}
                    selectedIds={filters.sizes}
                    items={[
                        {text: "20 cm", value: "20"},
                        {text: "30 cm", value: "30"},
                        {text: "40 cm", value: "40"}
                    ]}
                />
            </div>

            <div className={"mt-5 border-y border-y-neutral-100 py-6 pb-7"}>
                <p className={"font-bold mb-3"}>Price range:</p>

                <div className={"flex gap-3 mb-5"}>
                    <Input
                        type={"number"}
                        placeholder={"0"}
                        min={0}
                        max={1000}
                        value={String(filters.prices.priceFrom)}
                        onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
                    />

                    <Input
                        type={"number"}
                        placeholder={"1000"}
                        min={100}
                        max={1000}
                        value={String(filters.prices.priceTo)}
                        onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
                    onValueCommit={updatePrices}
                />
            </div>

            <CheckBoxFiltersGroup
                title={"Ingredients"}
                name={"ingredients"}
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                className={"mt-5"}
                loading={loading}
                onClickCheckbox={filters.setSelectedIngredients}
                selectedIds={filters.selectedIngredients}
            />
        </div>
    )
}
