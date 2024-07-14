export interface mybookingOutputModel {
    username: string,
    date: string,
    bookedOn: string,
    startTime: string,
    endTime: string,
    groundDetails: {
        groundName: string,
        groundLocation: string,
        price: number,
        description: string,
        addedBy: string,
        image: string
    }
}