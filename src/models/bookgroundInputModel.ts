export interface bookgroundInputModel{
    username:string,
    date:string,
    startTime:string,
    endTime:string,
    groundDetails:{
        groundName:string
    },
    userDetails:{
        userCredentials:{
            username:string
        }
    }
}