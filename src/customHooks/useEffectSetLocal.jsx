export function useEffectSetLocal(regalos) {
    localStorage.setItem('gifts', JSON.stringify(regalos))
}