'use client';
import Loading from "@/components/Loading";
import MyBookingCard from "@/components/MyBookingCard";
import PromptLogin from "@/components/PromptLogin";
import { mybookingOutputModel } from "@/models/mybookingsOutputModel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { LoginSelector } from "@/redux/slices/loginSlice";
import { getMyBookings, MyBookingSelector } from "@/redux/slices/myBookingsSlice";
import { StatusSelector } from "@/redux/slices/statusSlice";
import Image from "next/image";
import { PDFDocument, rgb } from "pdf-lib";
import { useEffect, useState } from "react";

const MyBookings = () => {
    const loginDetails = useAppSelector(LoginSelector);
    const MyBookings: mybookingOutputModel[] = useAppSelector(MyBookingSelector);
    const [MyBookingReverse, setMyBookingReverse] = useState<mybookingOutputModel[]>([]);
    const [index, setIndex] = useState<number>(0);
    const BookingStatus: boolean | null = useAppSelector(StatusSelector).bookingStatus;
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (loginDetails.status) {
            dispatch(getMyBookings({ token: loginDetails.token, username: loginDetails.username }))
        }
    }, [])

    useEffect(() => {
        if (loginDetails.status && BookingStatus) {
            dispatch(getMyBookings({ token: loginDetails.token, username: loginDetails.username }))
        }
    }, [BookingStatus])

    useEffect(() => {
        setMyBookingReverse([...MyBookings].reverse());
    }, [MyBookings])

    function handleRefresh() {
        dispatch(getMyBookings({ token: loginDetails.token, username: loginDetails.username }))
    }

    function handleFirst() {
        setIndex(0);
    }

    function handleLast() {
        setIndex(MyBookingReverse.length - 1)
    }

    function handlePrevious() {
        setIndex((prev) => { return prev - 1 })
    }

    function handleNext() {
        setIndex((prev) => { return prev + 1 })
    }

    async function handleDownload() {
        const groundData: mybookingOutputModel = MyBookingReverse[index];
        const pdfDoc = await PDFDocument.create();
        //[595, 842] is standarad A4 size page dimensions
        const page = pdfDoc.addPage([595, 842]);

        const base64Image = `data:image/jpeg;base64,${groundData.groundDetails.image}`
        const backgroundImage = await pdfDoc.embedJpg(base64Image);
        const { width, height } = backgroundImage.scale(1);
        page.drawImage(backgroundImage, {
            x: 0,
            y: 0,
            width: page.getWidth(),
            height: page.getHeight(),
        });

        page.drawRectangle({
            x: 0,
            y: 0,
            width: page.getWidth(),
            height: page.getHeight(),
            color: rgb(0, 0, 0),
            opacity: 0.5,
        });

        const fontSize = 12;
        const fieldSpacing = 25;
        let yPosition = 500;

        // Function to calculate centered text position
        const drawCenteredText =async (text:string, { x, y, size, color }:{x:number,y:number,size:number,color:any}) => {
            const font =await pdfDoc.embedFont('Helvetica')
            const textWidth = font.widthOfTextAtSize(text, size);
            const centeredX = (page.getWidth() - textWidth) / 4;
            page.drawText(text, { x: centeredX+x, y, size, color });
        };

        const drawField = (label: string, value: string) => {
            drawCenteredText(label, { x: 50, y: yPosition, size: fontSize, color: rgb(1, 1, 1) });
            drawCenteredText(value, { x: 200, y: yPosition, size: fontSize, color: rgb(1, 1, 1) });
            yPosition -= fieldSpacing;
        };

        drawField('Ground Name:', groundData.groundDetails.groundName)
        drawField('Ground Location:', groundData.groundDetails.groundLocation)
        drawField('Price:', groundData.groundDetails.price.toString())
        drawField('Ground Owner:', groundData.groundDetails.addedBy)
        drawField('Booked For:', groundData.date)
        drawField('Booked From', groundData.startTime)
        drawField('Booked To:', groundData.endTime)
        drawField('Booked On:', groundData.bookedOn)
        drawField('Booked By:', loginDetails.username)

        const pdfBytes = await pdfDoc.save();

        const fileName = `${MyBookingReverse[index].groundDetails.groundName}.pdf`;
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.download = fileName;
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="h-full w-full">
            {!loginDetails.status ?
                <PromptLogin /> :
                <div className="flex h-full w-full">
                    {MyBookingReverse.length === 0 ?
                        <span>No Booking</span>
                        :
                        <div className="flex h-full w-full">
                            <div className="flex flex-col h-full w-full p-5">
                                <div className="basis-1/12">
                                    <div className="flex justify-center">
                                        <span className="MyBookings_Heading">My Bookings</span>
                                    </div>
                                </div>
                                <div className="basis-1/12 self-end">
                                    <div className="flex gap-3">
                                        <button className="bg-blue-500 p-1 rounded-md text-[0.8rem] hover:bg-blue-300" onClick={handleDownload}>Download</button>
                                        <button className="bg-blue-500 p-1 rounded-md text-[0.8rem] hover:bg-blue-300" onClick={handleRefresh}>Refresh</button>
                                    </div>
                                </div>
                                <div className={"basis-9/12 m-5 mt-0 "} >
                                    <MyBookingCard MyBooking={MyBookingReverse[index]} />
                                </div>
                                <div className="basis-1/12 flex justify-around">
                                    <div className="flex gap-3">
                                        <div>
                                            <button onClick={handleFirst} className="bg-blue-500 p-1 rounded-md text-[0.8rem] hover:bg-blue-300">First</button>
                                        </div>
                                        <div>
                                            <button onClick={handlePrevious} disabled={index === 0 ? true : false} className="bg-blue-500 p-1 rounded-md text-[0.8rem] hover:bg-blue-300 disabled:hover:cursor-not-allowed disabled:hover:bg-red-500">Previous</button>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div>
                                            <button onClick={handleNext} disabled={index === (MyBookingReverse.length - 1) ? true : false} className="bg-blue-500 p-1 rounded-md text-[0.8rem] hover:bg-blue-300 disabled:hover:cursor-not-allowed disabled:hover:bg-red-500">Next</button>
                                        </div>
                                        <div>
                                            <button onClick={handleLast} className="bg-blue-500 p-1 rounded-md text-[0.8rem] hover:bg-blue-300">Last</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="-z-10 opacity-10">
                        <Image src='/images/hockey1.png' alt='hockey' fill />
                    </div>
                </div>
            }
        </div>
    )
}

export default MyBookings;