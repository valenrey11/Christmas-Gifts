import { useEffect, useState, useRef, useContext } from "react"
import { useEffectSetLocal } from "../../customHooks/useEffectSetLocal";
import { useEffectGetLocal } from "../../customHooks/useEffectGetLocal";
import { Modal } from "../../components/modal";
import { ListOfGifts } from "../../components/listOfGifts";
import GiftsContext from "../../context/GiftContext"


export function Home() {
    const [giftCont, setGiftCont] = useContext(GiftsContext)
    const isMounted = useRef(false);
    const firstElToFocus = useRef(null);
    useEffect(() => {
        const listFromLocal = useEffectGetLocal()
        setGiftCont(listFromLocal)
    }, [])

    useEffect(() => {
        if (isMounted.current) {
            useEffectSetLocal(giftCont)
        } else {
            isMounted.current = true;
        }
    }, [giftCont])

    const deleteGift = (e) => {
        const giftNombre = e.target.getAttribute('gift-nombre')
        setGiftCont(prev => prev.filter(gift => gift.nombre !== giftNombre))
    }
    const deleteAllGifts = () => {
        setGiftCont([])
        useEffectSetLocal(giftCont)

    }
    const [isOpen, setIsOpen] = useState(false)
    const toggleModal = () => {
        setIsOpen(!isOpen)

    }
    const handleKeyDown = (e) => {
        console.log(e.key)
        const allElements = document.querySelectorAll('button, a, input, select, textarea');
        const lastElement = allElements[allElements.length - 1];
        if (e.key === "Tab" && document.activeElement === lastElement) {
            e.preventDefault()
            firstElToFocus.current.focus()
        }
        if (e.key === "Enter") {
            e.preventDefault()
            e.target.click()
        }
    }

    return (
        <div className="home w-full">
            <article onKeyDown={handleKeyDown} className=" bg-gray-200/80 rounded-md p-5 max-w-2xl mx-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-4xl text-black mb-2">Regalos:</h2>
                    <button type="button" onClick={toggleModal} autoFocus ref={firstElToFocus}
                        className='hover:cursor-pointer bg-red-500
                        w-1/4 text-center rounded-md p-2'>Agregar
                    </button>
                </div>
                <Modal toggleModal={toggleModal} isOpen={isOpen} />
                <ListOfGifts toggleModal={toggleModal} deleteGift={deleteGift} />
                <button onClick={deleteAllGifts} className='hover:cursor-pointer mt-5 bg-amber-300 w-1/3 sm:w-1/4 text-center rounded-md p-2'>Eliminar todos</button>
            </article>
        </div>
    )
}