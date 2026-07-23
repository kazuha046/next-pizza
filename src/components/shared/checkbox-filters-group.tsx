"use client"

import React, {useState} from "react"
import {FilterCheckbox, FilterCheckboxProps} from "./filter-checkbox"
import {Input} from "../ui/input"
import {Skeleton} from "../ui/skeleton"

type Item = FilterCheckboxProps

interface Props {
    title: string
    items: Item[]
    defaultItems?: Item[]
    limit?: number
    searchInputPlaceholder?: string
    loading?: boolean
    onClickCheckbox?: (id: string) => void
    defaultValue?: string[]
    className?: string
    selectedIds?: Set<string>
    name?: string
}

export const CheckBoxFiltersGroup: React.FC<Props> = (
    {
        title,
        items,
        defaultItems,
        limit = 5,
        searchInputPlaceholder = "Search...",
        className,
        loading,
        onClickCheckbox,
        selectedIds,
        name

    }
) => {
    const [showALl, setShowALl] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    if (loading) {
        return (
            <div className={className}>
                <p className={"font-bold mb-3"}>{title}</p>

                {
                    ...Array(limit)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton key={index} className={"h-6 mb-4 rounded-xl"}/>
                        ))
                }

                <Skeleton className={"h-6 mb-4 w-24 rounded-xl"}/>
            </div>
        )
    }

    const list = showALl
        ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : (defaultItems || items).slice(0, limit)

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className={className}>
            <p className={"font-bold mb-3"}>{title}</p>

            {showALl && (
                <div className={"mb-5"}>
                    <Input
                        onChange={onChangeSearchInput}
                        placeholder={searchInputPlaceholder}
                        className={"bg-gray-50 border-none"}
                    />
                </div>
            )}

            <div className={"flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar"}>
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selectedIds?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        name={name}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showALl ? "border-t border-t-neutral-100 mt-4" : ""}>
                    <button onClick={() => setShowALl(!showALl)} className={"text-primary mt-3"}>
                        {showALl ? "Hide" : "+ Show all"}
                    </button>
                </div>
            )}
        </div>
    )
}
