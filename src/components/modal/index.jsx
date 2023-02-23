import { AddGiftForm } from "../addGiftform"

export function Modal({ addGift, toggleModal, isOpen, }) {
    return (
        isOpen && <div className="">
            <div className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>
            <div className="z-20 absolute max-w-xs max-h-64 p-5 rounded-md
                        bg-gray-500 left-0 top-0 bottom-0 right-0 m-auto">
                <AddGiftForm toggleModal={toggleModal} addGift={addGift} />
            </div >
        </div>)
}