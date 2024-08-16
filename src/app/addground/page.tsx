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

    return (
        <div className="h-full w-full addgroundContainer">
            <div className="addGroundHeader">
                <span>
                    Add Ground
                </span>
            </div>
            <form className="addGroundFormContents">
                <div className="labels">
                    <label htmlFor="groundname">Ground Name:</label>
                    <label htmlFor="groundlocation">Ground Location:</label>
                    <label htmlFor="groundprice">Ground Price:</label>
                    <label htmlFor="grounddescription">Ground Description:</label>
                    <label htmlFor="groundimage">Ground Image:</label>
                </div>

                <div className="inputs">
                    <input id="groundname" type='text' value={groundName} onChange={(e) => { setGroundName(e.target.value) }} />
                    <input id="groundlocation" type='text' value={groundLocation} onChange={(e) => { setGroundLocation(e.target.value) }} />
                    <input id="groundprice" type='number' value={groundPrice} onChange={(e) => { setGroundPrice(Number(e.target.value)) }} />
                    <input id="grounddescription" type='text' value={groundDescription} onChange={(e) => { setGroundDescription(e.target.value) }} />
                    <input id="groundimage" type='file' onChange={(e) => { setGroundImage(e.target.files?.[0]) }} />
                </div>

            </form>
            <div className="addGroundFooter">
                <button className="goback" onClick={() => { router.back() }}>Go Back</button>
            </div>
        </div>
    )
}

export default AddGround;