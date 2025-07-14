'use client';

import { DialogBoxContext } from "@/Contexts/DialogBoxContext";
import { dialogboxState} from "@/models/dialogboxInputModel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { DialogBoxSelector, hideDialogBox, removeDialogContent } from "@/redux/slices/dialogBoxSlice";
import { useContext, useEffect, useState } from "react";

const DialogBox = () => {
    const {dialogBox,setDialogBox} = useContext(DialogBoxContext);
    var height = dialogBox.height? dialogBox.height : "50%";
    var width = dialogBox.width? dialogBox.width : "50%";
    return (
        <div>
            {dialogBox.show ?
                <div className="DialogBoxContainer">
                    <div className={`DialogBox border-2 border-black`} style={{height,width}}> {/* ${dialogBox.height} ${dialogBox.width} */}
                        <div className="flex items-center justify-center">
                            <span className="text-md text-center text-pretty">{dialogBox.message}</span>
                        </div>
                        <div className="w-full flex justify-around">
                            {dialogBox.buttons.map((button,index) => {
                                return <button className="dialogBoxButton" key={index} onClick={() => { button.onClick(), setDialogBox({show:false,message:'',buttons:[],height:'50%',width:'50%'}) }}>{button.label}</button>
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