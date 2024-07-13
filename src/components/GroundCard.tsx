import { allGroundsOutputModel } from "@/models/allgroundsOutputModel";
import Image from "next/image";

const GroundCard = ({ groundData, buttons }: { groundData: allGroundsOutputModel, buttons: Array<{buttonName:string,handleClick:(groundData:allGroundsOutputModel)=>void}> }) => {

    return (
        <div className="GroundCardsContainer" style={{ backgroundImage: `url(${groundData.image ? `data:image/png;base64,${groundData.image}` : '/images/ImageNotAvailable.webp'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backdropFilter: '' }}>
            <div className="GroundCards">
                <div className="flex">
                    <strong className="groundcard_label">Ground Name:&nbsp;</strong>
                    <span className="groundcard_text">{groundData.groundName}</span>
                </div>
                <div className="flex">
                    <strong className="groundcard_label">Ground Location:&nbsp;</strong>
                    <span className="groundcard_text">{groundData.groundLocation}</span>
                </div>
                <div className="flex">
                    <div className="whitespace-nowrap">
                        <strong className="groundcard_label">Ground Price </strong>
                        <span className="text-[0.6rem]">(per hour):&nbsp;</span>
                    </div>
                    <span>{groundData.price}</span>
                </div>
                <div className="flex">
                    <strong className="groundcard_label">Ground Owner:&nbsp;</strong>
                    <span className="groundcard_text">{groundData.addedBy}</span>
                </div>
                <div className="flex flex-col">
                    <strong className="groundcard_label">Ground Description:&nbsp;</strong>
                    <span className="groundcard_text">{groundData.description}</span>
                </div>
                {/* <Image src={groundData.image ? `data:image/png;base64,${groundData.image}` : '/images/ImageNotAvailable.webp'} height={50} width={50} alt={groundData.groundName + 'image'} /> */}
                <div className="flex justify-around gap-1">
                    {buttons.map((button,index) => {
                        return <button key={index} className="GroundCard_button" onClick={()=>button.handleClick(groundData)}>{button.buttonName}</button>
                        
                    })}
                </div>
            </div>
        </div>
    )
}

export default GroundCard;