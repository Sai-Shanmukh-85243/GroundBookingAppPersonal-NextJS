import { mybookingOutputModel } from "@/models/mybookingsOutputModel";
import { useEffect } from "react";

const MyBookingCard = ({ MyBooking }: { MyBooking: mybookingOutputModel }) => {
    return (
        <div id="container" className="MyBookingsCard_Container" style={{ backgroundImage: `url(${MyBooking.groundDetails.image ? `data:image/png;base64,${MyBooking.groundDetails.image}` : '/images/ImageNotAvailable.webp'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', zIndex: -1 }}>
            <div className="flex h-full justify-center items-center bg-black/50">
                <form className="MyBookingsCard_form">

                    <div className="flex flex-col justify-center items-center">
                        <label>
                            GroundName:
                        </label>
                        <span className="border-2 p-1 rounded-sm m-1">
                            {MyBooking.groundDetails.groundName}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <label>
                            GroundLocation:
                        </label>
                        <span className="border-2 p-1 rounded-sm m-1">
                            {MyBooking.groundDetails.groundLocation}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <label>
                            Price<span>(per hour)</span>:
                        </label>
                        <span className="border-2 p-1 rounded-sm m-1">
                            {MyBooking.groundDetails.price}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <label>
                            Ground Owner:
                        </label>
                        <span className="border-2 p-1 rounded-sm m-1">
                            {MyBooking.groundDetails.addedBy}
                        </span>
                    </div>


                    <div className="flex flex-col justify-center items-center">
                        <label>
                            Booked For (yyyy-mm-dd):
                        </label>
                        <span className="border-2 p-1 rounded-sm m-1">
                            {MyBooking.date}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <label>
                            Booked From:
                        </label>
                        <span className="border-2 p-1 rounded-sm m-1">
                            {MyBooking.startTime}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <label>
                            Booked To:
                        </label>
                        <span className="border-2 p-1 rounded-sm m-1">
                            {MyBooking.endTime}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <label>
                            Booked On (yyyy-mm-dd):
                        </label>
                        <span className="border-2 p-1 rounded-sm m-1">
                            {MyBooking.bookedOn}
                        </span>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default MyBookingCard;