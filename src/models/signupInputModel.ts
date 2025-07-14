export interface signupInputModel{
    firstname:string,
    lastname:string,
    email:string,
    created_by:string,
    modified_by:string,
    user_location:string,
    mobile_number:string,
    date_of_birth:string,
    secondary_emailid:string,
    userCredentials:{
        username:string,
        password:string,
        role:{
            roleName:string
        }
    }
}

export interface signUpApiResponse{
    message:string,
    success:boolean
}