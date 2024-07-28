import { mygroundsOutputModel } from "@/models/mygroundsOutputModel";
import { useEffect } from "react";

interface MySideCardProps {
    sideCard: mygroundsOutputModel,
    changeCurrentIndex: (newCurrentIndex: number) => void,
    indexOfGround: number,
    mygrounds: mygroundsOutputModel[]
}


const MyGroundsSideCard = ({ sideCard, changeCurrentIndex, indexOfGround, mygrounds }: MySideCardProps) => {
    // useEffect(()=>{
    //     console.log("sideCard.groundName:",sideCard.groundName)
    //     console.log("sideCard.image:",sideCard.image)
    // })
    function callChangeCurrentIndex() {XMLDocument
        //console.log("myground:", mygrounds)

        var index = mygrounds.findIndex((ground) => {
            //console.log("ground.groundName:", ground.groundName)
            //console.log("sideCard.groundName:", sideCard.groundName)
            return ground.groundName === sideCard.groundName;
        })
        // console.log("index:", index)
        // console.log(mygrounds[index]);
        changeCurrentIndex(index);
    }
    return (
        <div className="w-full h-full">
            {sideCard &&
                <div className="h-full w-full sideCardContainer" style={{ backgroundImage: `url(${sideCard.image ? `data:image/png;base64,${sideCard.image}` : `/images/ImageNotAvailable.webp`})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

                    <div className="sideCardDesign w-full h-full" onClick={() => callChangeCurrentIndex()}>
                        <span>{sideCard.groundName}</span>
                        <span>{sideCard.groundLocation}</span>
                        <span>{sideCard.price}</span>
                        <span>{sideCard.description}</span>
                    </div>
                </div> 
            }
        </div>
    )
}

export default MyGroundsSideCard;