interface DialogBoxState {
    show: boolean;
    message: string;
    buttons: dialogBoxButtonsState[];
    height?: string;
    width?: string;
}

interface dialogBoxButtonsState {
     label: string; onClick: () => void | string | number
}