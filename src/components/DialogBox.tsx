'use client';

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { DialogBoxSelector, hideDialogBox, removeDialogContent } from "@/redux/slices/dialogBoxSlice";

const DialogBox = () => {
    const dialogBox = useAppSelector(DialogBoxSelector);
    const dispatch = useAppDispatch();
    return (
        <div>
            {dialogBox.show ?
                <div className="DialogBoxContainer">
                    <div className={`DialogBox ${dialogBox.height ? `h-[${dialogBox.height.toString()}]` : 'h-[50%]'
                        } ${dialogBox.width ? `w-[${dialogBox.width.toString()}]` : 'w-[50%]'
                        }`}> {/* ${dialogBox.height} ${dialogBox.width} */}
                        <div className="flex items-center justify-center">
                            <span className="text-md text-center text-pretty">{dialogBox.message}</span>
                        </div>
                        <div className="w-full flex justify-around">
                            {dialogBox.buttons.map((button) => {
                                return <button className="dialogBoxButton" onClick={() => { button.onClick(), dispatch(hideDialogBox()), dispatch(removeDialogContent()) }}>{button.name}</button>
                            })}
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}

export default DialogBox;