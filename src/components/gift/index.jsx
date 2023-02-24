import { useEffect, useContext } from "react"
import GiftContext from "../../context/GiftContext";
import editPng from "../../assets/edit-button.png"


export function Gift({ gift, deleteGift, toggleModal }) {
    const [, , idGiftToEditCont, setIdGiftToEditCont] = useContext(GiftContext)
    const firstLetterUpper = gift.nombre.charAt(0).toUpperCase()
    const restOfText = gift.nombre.slice(1)
    const finalProductName = firstLetterUpper + restOfText
    const handleEdit = () => {
        setIdGiftToEditCont(gift.id)
        toggleModal()
    }

    return (
        <div className="flex justify-between
        sm:grid sm:grid-cols-[max(50px)_minmax(100px,300px)_30px_max(150px)_30px_30px] 
         bg-slate-500/50 p-2 rounded-md place-items-center">
            <img src={gift.imgUrl} alt="regalo" className="w-10 h-10 rounded-md" />
            <p className="bg-gray-300 px-2 rounded-md">{finalProductName}</p>
            <p className="bg-blue-300 px-2 rounded-md ">{gift.cantidad}</p>
            <p className="bg-green-800 px-2 text-gray-100 rounded-md">{gift.destinatario}</p>
            <img src={editPng} className="h-6 sm:w-6 rounded-md hover:cursor-pointer my-auto"
                onClick={handleEdit} />
            <div className="bg-red-500 px-2 rounded-md hover:cursor-pointer my-auto"
                gift-nombre={gift.nombre}
                onClick={deleteGift}>x</div>
        </div>
    )
}