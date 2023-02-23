import { Gift } from "../gift"
export function ListOfGifts({ giftCont, toggleModal, deleteGift }) {
    return (
        giftCont.length === 0 ? <p className="my-4">Te faltan agregar regalos crack!</p> : <ul className="mt-10 flex flex-col gap-2">
            {giftCont === undefined ? <div>Esperando</div> : giftCont.map(x => {
                return <li key={x.id} className="text-black list-none">
                    <Gift gift={x} toggleModal={toggleModal} deleteGift={deleteGift} />
                </li>
            })}
        </ul>

    )
}