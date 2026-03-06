import { useState, useEffect } from "react"

export default function MemoryCard({ detailUrl, onClick, name }) {
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        fetch(detailUrl)
            .then(response => response.json())
            .then(data =>
                setImageUrl(data.sprites.other["official-artwork"].front_default)
            )
    }, [detailUrl])

    return (
        <div className="memory-card" onClick={onClick}>
            <div className="memory-card-inner">
                <img src={imageUrl} alt={name}></img>
                <p>{name}</p>
            </div>
        </div>
    )
}