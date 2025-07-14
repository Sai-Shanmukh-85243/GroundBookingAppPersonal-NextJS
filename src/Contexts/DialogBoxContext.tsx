'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface DialogBoxContextProps {
    dialogBox: DialogBoxState;
    setDialogBox: Dispatch<SetStateAction<DialogBoxState>>;
}

const defaultDialogBoxState: DialogBoxState = {
    show: false,
    message: '',
    buttons: [],
    height: 'auto',
    width: 'auto',
};

const DialogBoxContext = createContext<DialogBoxContextProps>({
    dialogBox: defaultDialogBoxState,
    setDialogBox: () => { },
});

const DialogBoxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dialogBox, setDialogBox] = useState<DialogBoxState>({
        show: false,
        message: '',
        buttons: [],
        height: '50%',
        width: '50%',
    });


    return (
        <DialogBoxContext.Provider value={{ dialogBox, setDialogBox }}>
            {children}
        </DialogBoxContext.Provider>
    )
}

export { DialogBoxProvider, DialogBoxContext }
