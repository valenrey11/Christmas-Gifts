import { useContext, useEffect, useRef } from "react"
import GiftsContext from "../../context/GiftContext"
import useAddGift from "../../customHooks/useAddGift"
export function AddGiftForm({ toggleModal }) {
    const [giftCont, setGiftCont, idGiftToEditCont, setIdGiftToEditCont] = useContext(GiftsContext)
    const { addGift } = useAddGift()
    const formEl = useRef()
    const firstElToFocus = useRef(null)
    const giftToEdit = giftCont.find(g => g.id === idGiftToEditCont)
    // const inputNombreValue =document.querySelector('.input-nombre').value
    // const inputUrlValue =document.querySelector('.input-nombre').value
    // const inputCantidadValue =document.querySelector('.input-nombre').value
    // const inputDestinatarioValue =document.querySelector('.input-nombre').value

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
    const handleSubmit = (e) => {
        e.preventDefault()
        const { repeted } = chechValuesBlank()
        if (repeted === false) {
            alert('El formulario esta vacio')
        } else {
            const textFromInput = e.target.nombre.value
            const imgUrl = e.target.url.value
            const cantidad = e.target.cantidad.value
            const destinatario = e.target.destinatario.value
            const gift = addGift({ textFromInput, imgUrl, cantidad, destinatario })
            setGiftCont(prev => [...prev, gift])
            toggleModal()
        }
    }
    const handleKeyDown = (e) => {
        const lastInput = document.getElementById('last-modal-btn');
        if (e.key === "Tab" && document.activeElement === lastInput) {
            e.preventDefault()
            firstElToFocus.current.focus()
        } else if (e.key === "Enter") {
            e.preventDefault()
            formEl.current.submit()
        }
    }
    const chechValuesBlank = () => {
        const listaDeInputs = [document.querySelector('.input-nombre').value,
        document.querySelector('.input-url').value,
        document.querySelector('.input-cantidad').value,
        document.querySelector('.input-destinatario').value]
        let repeted = false
        listaDeInputs.map(inp => {
            if (inp !== '') {
                repeted = true
            }
        })
        return { repeted }
    }
    return (
        <form ref={formEl} onKeyDown={handleKeyDown} className="w-full flex flex-col h-full justify-between" onSubmit={handleSubmit}>
            <input name="nombre"
                placeholder="Nombre de regalo"
                className="input-nombre p-2 rounded-md"
                type="text"
                autoFocus
                ref={firstElToFocus} />

            <input name="url"
                placeholder="Dirección de enlace..."
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

                {idGiftToEditCont.length === 0 ? <button type="submit" id="last-modal-btn"
                    className="bg-red-500 text-white">Agregar</button> : <button type="button" onClick={saveAndRemoveCont} className="bg-amber-500 text-white">Guardar</button>}

            </div>
        </form>)
}

