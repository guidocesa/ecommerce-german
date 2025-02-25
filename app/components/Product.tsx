"use client"

export default function Product({ id, name, price, description, image_url })
{
    return(
        <li key={id} className="border p-4 rounded text-center">
                <h2 className="text-xl font-bold">{name}</h2>
                <p>{description}</p>
                <p>${price}</p>
                {image_url && (
                    <img src={image_url} alt={name} className="max-h-20 w-full object-contain"/>
                )}
        </li>
    )
}