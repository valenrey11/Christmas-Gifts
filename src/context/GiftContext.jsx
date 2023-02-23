import { createContext, useState } from "react";

const Context = createContext({})

export function GiftContext({ children }) {
    const [giftCont, setGiftCont] = useState([])
    const [idGiftToEditCont, setIdGiftToEditCont] = useState([])
    return <Context.Provider value={[giftCont, setGiftCont, idGiftToEditCont, setIdGiftToEditCont]}>
        {children}
    </Context.Provider>
}
export default Context