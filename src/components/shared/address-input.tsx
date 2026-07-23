"use client"

import React, {useState} from "react"
import axios from "axios"

interface Props {
    onChange?: (value?: string) => void
}

interface Suggestion {
    value: string
}

export const AddressInput: React.FC<Props> = ({onChange}) => {
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])

    const searchAddress = async (value: string) => {
        setQuery(value)

        if (!value) {
            setSuggestions([])
            return
        }

        const res = await axios.post(
            "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
            {
                query: value,
                count: 5
            },
            {
                headers: {
                    Authorization: `Token ${process.env.NEXT_PUBLIC_DADATA_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        )

        setSuggestions(res.data.suggestions)
    }

    return (
        <div className="relative">
            <input
                value={query}
                onChange={(e) => searchAddress(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
                placeholder="Enter address"
            />

            {suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border bg-white">
                    {suggestions.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                            onClick={() => {
                                setQuery(item.value)
                                setSuggestions([])
                                onChange?.(item.value)
                            }}
                        >
                            {item.value}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
