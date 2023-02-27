import { v4 as uuidv4 } from 'uuid';

export default function useAddGift() {
    const addGift = ({ textFromInput, imgUrl, cantidad, destinatario }) => {
        const giftToAdd = {
            id: uuidv4(),
            nombre: textFromInput,
            cantidad: cantidad,
            imgUrl: imgUrl,
            destinatario: destinatario
        }
        if (textFromInput !== '') {
            return giftToAdd
        }
    }
    return { addGift }
}