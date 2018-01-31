export default error => {
    let errorObj
    try {
        errorObj = JSON.parse(error)
        if(errorObj.message && errorObj.errors && !Object.keys(errorObj.errors).length){
            if(errorObj.message.match(/invalid country/i)){
                return {
                    country: 'Please enter a valid country code'
                }
            }
            if(errorObj.message.match(/zipcode was invalid/i)){
                return {
                    postal_code: 'Please enter a valid postal code'
                }
            }
            return errorObj.message
        } else if (errorObj.message) {
            return errorObj.message
        }
        if(errorObj.errors){
            return errorObj.errors
        }
    } catch (e) {
        if(error.match(/bad request/i)){
            return 'Please enter the correct information'
        }
        if(error.match(/internal server error/i)){
            return 'Something went wrong, please try again'
        }
    }
    return error
}
