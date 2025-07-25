import { mygroundsOutputModel } from "@/models/mygroundsOutputModel";
import { useEffect } from "react";

interface MySideCardProps {
    sideCard: mygroundsOutputModel,
    changeCurrentIndex: (newCurrentIndex: number) => void,
    indexOfGround: number,
    mygrounds: mygroundsOutputModel[]
}


const MyGroundsSideCard = ({ sideCard, changeCurrentIndex, indexOfGround, mygrounds }: MySideCardProps) => {
    
    function callChangeCurrentIndex() {
        var index = mygrounds.findIndex((ground) => {
            return ground.groundName === sideCard.groundName;
        })
        changeCurrentIndex(index);
    }
    return (
        <div className="w-full h-full sideCardMainContainer">
            {sideCard &&
                <div className="h-full w-full sideCardContainer" style={{ backgroundImage: `url(${sideCard.image ? `data:image/png;base64,${sideCard.image}` : `/images/ImageNotAvailable.webp`})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

                    <div className="sideCardDesign w-full h-full" onClick={() => callChangeCurrentIndex()}>
                        <span className="myGroundsSideCardsText">{sideCard.groundName}</span>
                        <span className="myGroundsSideCardsText">{sideCard.groundLocation}</span>
                        <span className="myGroundsSideCardsText">{sideCard.price}</span>
                        <span className="myGroundsSideCardsText">{sideCard.description}</span>
                    </div>
                </div> 
            }
        </div>
    )
}

export default MyGroundsSideCard;