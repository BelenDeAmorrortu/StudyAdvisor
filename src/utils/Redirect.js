import Alert from "./Alert";

export default function Redirect(navigate, currentTheme){
    Alert(
        currentTheme, 
        'To access this page you need to be logged in', 
        'warning', 
        'Log In', 
        'Go back to home page',
        ()=> navigate('/login'),
        ()=> navigate('/'),
        ()=> navigate('/')
    )
}