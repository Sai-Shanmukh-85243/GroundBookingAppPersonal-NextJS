import { useAppSelector } from "@/redux/hook"
import { MyBookingSelector } from "@/redux/slices/myBookingsSlice"
import { Document,Page,renderToStream,Text } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import MyBookingPDF from "@/components/MyBookingPDF";

const MyBooking = ({index} : {index:number}) =>{
    //const myBooking = useAppSelector(MyBookingSelector);
    return(
        // <MyBookingPDF index = {index}/>
    <Document>
        <Page>
            <Text>React PDF</Text>
            {/* <MyBookingPDF index={index}/> */}
        </Page>
    </Document>
    )
}

export async function POST(Req:Request, {params}:{params:{index:number}}){

    const stream = await renderToStream(<MyBooking index = {params.index}/>)
    

    return new NextResponse(stream as unknown as ReadableStream,
        {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `attachment; filename="my-booking-${params.index}.pdf"`,
            },
        }
    );
}