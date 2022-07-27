export const CHANGE_INPUT = 'CHANGE_INPUT';

export const changeInput = (number) => {
    return ({
        type: CHANGE_INPUT,
        payload: number
    })
}