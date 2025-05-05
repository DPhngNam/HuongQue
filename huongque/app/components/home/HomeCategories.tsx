import { CategoryProps } from "../../models/Category.model"
import { categories } from "../../utils/homeData"
import Image from "next/image"

function Category({ name, imageSrc, imageAlt }: CategoryProps){
    return (
        <div className="group relative">
            <Image
                alt={imageAlt}
                src={imageSrc}
                width={500}
                height={500}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {name}
                        </a>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default function HomeCategories() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {categories.map((category) => (
                        <Category
                            key={category.id}
                            id={category.id}
                            name={category.name} 
                            imageSrc={category.imageSrc} 
                            imageAlt={category.imageAlt}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}