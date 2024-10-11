import {Suspense} from "react"
import {Container} from "@/components/shared/container"
import {Title} from "@/components/shared/title"
import {TopBar} from "@/components/shared/top-bar"
import {Filters} from "@/components/shared/filters"
import {ProductsGroupList} from "@/components/shared/products-group-list"
import {findPizzas, GetSearchParams} from "@/lib/find-pizzas"
import {Stories} from "@/components/shared/stories"

export default async function Home({searchParams}: { searchParams: GetSearchParams }) {
    const categories = await findPizzas(searchParams)

    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold"/>
            </Container>

            <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

            <Stories/>

            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    <div className="w-[250px]">
                        <Suspense>
                            <Filters/>
                        </Suspense>
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {
                                categories.map(
                                    (category) => category.products.length > 0 && (
                                        <ProductsGroupList
                                            key={category.id}
                                            title={category.name}
                                            categoryId={category.id}
                                            items={category.products}
                                        />
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
