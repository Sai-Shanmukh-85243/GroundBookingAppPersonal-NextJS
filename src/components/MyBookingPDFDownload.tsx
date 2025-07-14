import { mybookingOutputModel } from "@/models/mybookingsOutputModel";
import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import ImageNotAvailable from '@/images/ImageNotAvailable.webp';
import { SourceObject } from "@react-pdf/types";

const MyBookingPDFDownload = ({ BookingDetails }: { BookingDetails: mybookingOutputModel }) => {

    const imageSrc = BookingDetails.groundDetails.image
         ? `data:image/png;base64,${BookingDetails.groundDetails.image}`
         : 'images/ImageNotAvailable.webp';


    // const imageSrc = BookingDetails.groundDetails.image
    //      ? `data:image/png;base64,${BookingDetails.groundDetails.image}`
    //      : ImageNotAvailable;

    // const imageSrc = BookingDetails.groundDetails.image
    //     ? { uri: `data:image/png;base64,${BookingDetails.groundDetails.image}` }
    //     : require('/images/ImageNotAvailable.webp');

    //const imageSrc = { uri: `data:image/png;base64,${BookingDetails.groundDetails.image}`};

    let styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },
        sameRow: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '10',
        },
        tinyText: {
            fontSize: '8.4'
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        content: {
            position: 'relative',
            zIndex: 1,
        },
    })
    return (
        <Document>
            <Page size={'A4'} style={styles.page}>
                {/* <Image src={imageSrc} style={styles.backgroundImage}/> */}
                <View style={styles.content}>
                    <View style={styles.sameRow}>
                        <Text>Username:</Text>
                        <Text>{BookingDetails.username}</Text>
                    </View>
                    <View style={styles.sameRow}>
                        <Text>Ground Name:</Text>
                        <Text>{BookingDetails.groundDetails.groundName}</Text>
                    </View>
                    <View style={styles.sameRow}>
                        <Text>Ground Location:</Text>
                        <Text>{BookingDetails.groundDetails.groundLocation}</Text>
                    </View>
                    <View style={styles.sameRow}>
                        <Text>Price<Text style={styles.tinyText}>(per hour)</Text>:</Text>
                        <Text>{BookingDetails.groundDetails.price}</Text>
                    </View>
                    <View style={styles.sameRow}>
                        <Text>Ground Description:</Text>
                        <Text>{BookingDetails.groundDetails.description}</Text>
                    </View>
                    <View style={styles.sameRow}>
                        <Text>Ground Owner:</Text>
                        <Text>{BookingDetails.groundDetails.addedBy}</Text>
                    </View>

                    <View style={styles.sameRow}>
                        <Text>Booked On:</Text>
                        <Text>{BookingDetails.bookedOn}</Text>
                    </View>
                    <View style={styles.sameRow}>
                        <Text>Booked For:</Text>
                        <Text>{BookingDetails.date}</Text>
                    </View>
                    <View style={styles.sameRow}>
                        <Text>Start Time:</Text>
                        <Text>{BookingDetails.startTime}</Text>
                    </View>
                    <View style={styles.sameRow}>
                        <Text>End Time:</Text>
                        <Text>{BookingDetails.endTime}</Text>
                    </View>
                    {/* <Image 
                    src={imageSrc as unknown as SourceObject} 
                    // style={{ height: '100%', width: '100%' }} 
                    /> */}
                </View>
            </Page>
        </Document>
    )
}

export default MyBookingPDFDownload;