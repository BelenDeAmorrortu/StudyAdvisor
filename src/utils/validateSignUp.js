const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

export function validate(input){

    let errors = {}

    if(input.email.trim() === '') errors.email = 'To sign up you must enter an email'
    else if(!input.email.match(emailRegex)) errors.email = 'Invalid email address';

    if(input.username.trim() === '') errors.username = 'To sign up you must enter a username'

    if(input.password.trim() === '') errors.password = 'To sign up you must enter a password'
    else if(!input.password.match(passwordRegex)) errors.password = 'Your password must have at least 8 characters, 1 uppercase, 1 lowercase and a number';

    if(input.password !== input.confirmPassword) errors.confirmPassword = 'Passwords do not match'
    
    return errors

}