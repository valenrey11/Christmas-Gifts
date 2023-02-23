import { useContext, useEffect, useRef } from "react"
import GiftsContext from "../../context/GiftContext"
export function AddGiftForm({ addGift, toggleModal }) {
    const [giftCont, setGiftCont, idGiftToEditCont, setIdGiftToEditCont] = useContext(GiftsContext)
    const formEl = useRef()
    const giftToEdit = giftCont.find(g => g.id === idGiftToEditCont)
    useEffect(() => {
        if (idGiftToEditCont.length > 0) {
            document.querySelector('.input-nombre').value = giftToEdit.nombre
            document.querySelector('.input-url').value = giftToEdit.imgUrl
            document.querySelector('.input-cantidad').value = giftToEdit.cantidad
            document.querySelector('.input-destinatario').value = giftToEdit.destinatario
        }
    }, [])

    const saveAndRemoveCont = () => {
        const lastGifts = [...giftCont]
        const indexObjectToUpdate = lastGifts.findIndex(g => g.id === idGiftToEditCont)

        giftToEdit.nombre = document.querySelector(".input-nombre").value
        giftToEdit.imgUrl = document.querySelector(".input-url").value
        giftToEdit.cantidad = document.querySelector(".input-cantidad").value
        giftToEdit.destinatario = document.querySelector(".input-destinatario").value

        if (indexObjectToUpdate !== -1) {
            lastGifts[indexObjectToUpdate] = giftToEdit
        }
        setGiftCont(lastGifts)
        setIdGiftToEditCont([])
        toggleModal()
    }
    const handleCancelBtn = () => {
        toggleModal()
        setIdGiftToEditCont([])
    }
    return (
        <form ref={formEl} className="w-full flex flex-col h-full justify-between" onSubmit={addGift}>
            <input name="nombre"
                placeholder="Nombre de regalo"
                className="input-nombre p-2 rounded-md"
                type="text" />

            <input name="url"
                placeholder="https://..."
                className="input-url p-2 rounded-md"
                type="text" />

            <div className="flex gap-2">
                <input name="destinatario"
                    placeholder="Destinatario"
                    type="text"
                    className="input-destinatario p-2 pr-0 rounded-md" />

                <input name="cantidad"
                    placeholder="0..."
                    type="number"
                    className="input-cantidad w-full pl-2 rounded-md" />
            </div>
            <div className="flex justify-between">
                <button type="button" onClick={handleCancelBtn} className="hover:text-inherit flex decoration justify-center items-center text-black w-1/3 hover:cursor-pointer text-center bg-amber-300 rounded-md">Cancelar</button>
                {idGiftToEditCont.length === 0 ? <button type="submit" className="bg-red-500 text-white">Agregar</button> : <button type="button" onClick={saveAndRemoveCont} className="bg-amber-500 text-white">Guardar</button>}

            </div>
        </form>)
}

