
export function validate(input){

    let errors = {}

    if(input.email.trim() === '') errors.email = 'To Log in you must enter an email'
    if(input.password.trim() === '') errors.password = 'To Log in you must enter a password'

    return errors

}