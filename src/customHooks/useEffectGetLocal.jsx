export function useEffectGetLocal() {
    const gifts = JSON.parse(localStorage.getItem('gifts'))
    if (gifts) {
        return gifts
    } else return []
}