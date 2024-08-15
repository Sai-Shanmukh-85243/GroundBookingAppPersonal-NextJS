'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddGround = () => {
    const router = useRouter();
    const [groundName, setGroundName] = useState<string>("");
    const [groundLocation, setGroundLocation] = useState<string>("");
    const [groundPrice, setGroundPrice] = useState<number | undefined>();
    const [groundDescription, setGroundDescription] = useState<string>("");
    const [groundImage, setGroundImage] = useState<File | undefined>();
    const labels = [
        {
            label: 'Ground Name:',
            className: 'addGroundLabel',
        },
        {
            label: 'Ground Location:',
            className: 'addGroundLabel',
        },
        {
            label: 'Ground Price (per hour):',
            className: 'addGroundLabel',
        },
        {
            label: 'Ground Description:',
            className: 'addGroundLabel',
        },
        {
            label: 'Ground Image:',
            className: 'addGroundLabel',
        },
    ];

    const inputs = [
        {
            className: 'addGroundInput',
            onChange: setGroundName,
            value: groundName,
            type: 'text',
        },
        {
            className: 'addGroundInput',
            onChange: setGroundLocation,
            value: groundLocation,
            type: 'text',
        },
        {
            className: 'addGroundInput',
            onChange: setGroundPrice,
            value: groundPrice,
            type: 'number',
        },
        {
            className: 'addGroundInput',
            onChange: setGroundDescription,
            value: groundDescription,
            type: 'text',
        },
        {
            className: 'addGroundInput',
            onChange: setGroundImage,
            value: undefined,
            type: 'file',
        },
    ]
    return (
        <div className="h-full w-full addgroundContainer">
            <div className="addGroundHeader">
                <span>
                    Add Ground
                </span>
            </div>
            {/* <div className="addGroundFormContents"> */}
            {labels.map((item, index) => {
                return <label key={index} className={item.className}>{item.label}</label>
            })}

            {inputs.map((item, index) => {
                return <input key={index} className={item.className} type={item.type} value={item.value}
                // onChange={(e) => {
                //     if (item.type === 'file') {
                //         // Handle File input separately
                //         item.onChange(e.target.files?.[0] ?? undefined);
                //     } else if (item.type === 'number') {
                //         // Handle number input separately
                //         item.onChange(Number(e.target.value) || undefined); // Ensure number or undefined
                //     } else {
                //         // Handle text inputs (string)
                //         item.onChange(e.target.value);
                //     }
                // }}
                ></input>
            })}

            {/* </div> */}
            <div className="addGroundFooter">
                <button className="goback" onClick={() => { router.back() }}>Go Back</button>
            </div>
        </div>
    )
}

export default AddGround;