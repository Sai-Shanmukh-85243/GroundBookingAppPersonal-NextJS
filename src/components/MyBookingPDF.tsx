import { mybookingOutputModel } from "@/models/mybookingsOutputModel";
import { useAppSelector } from "@/redux/hook";
import { MyBookingSelector } from "@/redux/slices/myBookingsSlice";
import { Document,Page,Text } from "@react-pdf/renderer";

const MyBookingPDF = ({index}:{index:number}) =>{
    //const MyBookings = useAppSelector(MyBookingSelector);
    //const currentBooking = MyBookings[index];
    const currentBooking = "Test";
    if (!currentBooking) {
        return (
            <Document>
                <Page>
                    <Text>No booking found for the provided index.</Text>
                </Page>
            </Document>
        );
    }

    return (
        <Document>
            <Page>
                <Text>{currentBooking}</Text>
            </Page>
        </Document>
    );
}
export default MyBookingPDF;