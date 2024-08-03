export type dialogboxState = {
    show: boolean,
    message: string,
    buttons: dialogboxButtonsArray,
    height?: string,
    width?: string
}

export type dialogPayload = {
    message: string,
    buttons: dialogboxButtonsArray,
    height?: string,
    width?: string
}

export type dialogboxButtonsArray = Array<dialogboxButtonsObject>;

export type dialogboxButtonsObject = { name: string, onClick: () => void | number | string }