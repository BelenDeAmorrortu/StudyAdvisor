import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { useNavigate } from 'react-router-dom'
import { useTheme } from './ThemeContext'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const { currentTheme } = useTheme()

    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signInWithGoogle() {

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then(() => navigate('/'))

    }

    async function signUp(email, password, username) {

        createUserWithEmailAndPassword(auth, email, password)

        onAuthStateChanged(auth, (user) => {

            if (user) {

                updateProfile(user, {
                    displayName: username
                })
            }
        })

        navigate('/')

    }

    function logIn(email, password) {

        signInWithEmailAndPassword(auth, email, password)

        .then(() => {
            navigate('/')
        })
        .catch(() => {
            Swal.fire({
                text: 'Incorrect email or password, please try again',
                icon: 'error',
                iconColor: '#85C7DE',
                showCloseButton: true,
                showDenyButton: false,
                confirmButtonText: 'Ok',
                allowEnterKey: false,
                customClass: {
                    popup: `Alert ${currentTheme}`,
                    closeButton: 'closeButton',
                    confirmButton: 'confirmButton',
                    denyButton: 'denyButton',
                }
            })
        })
    }

    function logOut() {

        Swal.fire({

            text: 'Are you sure you want to log out?',
            icon: 'question',
            showCloseButton: true,
            showDenyButton: true,
            denyButtonText: 'No, stay logged in',
            confirmButtonText: 'Yes, I am sure',
            allowEnterKey: false,
            customClass: {
                popup: `Alert ${currentTheme}`,
                closeButton: 'closeButton',
                confirmButton: 'confirmButton',
                denyButton: 'denyButton',
            }
        })
        .then( result =>{
            if(result.isConfirmed){
                signOut(auth) 
                navigate('/')
            }
        })
    }

    function changeUsername(currentUser) {

        Swal.fire({

            text: 'Please enter your new username',
            showCloseButton: true,
            showDenyButton: true,
            denyButtonText: 'Cancel',
            confirmButtonText: 'Submit',
            input: 'text',
            inputPlaceholder: 'New username',
            allowEnterKey: false,
            customClass: {
                popup: `Alert ${currentTheme}`,
                closeButton: 'closeButton',
                confirmButton: 'confirmButton',
                denyButton: 'denyButton',
            }
        })
            .then((result) => {

                const newUsername = result.value

                if (result.isConfirmed) {
                    Swal.fire({
                        text: 'Are you sure you want to change your username?',
                        icon: 'question',
                        iconColor: '#85C7DE',
                        showCloseButton: true,
                        showDenyButton: false,
                        confirmButtonText: 'Yes, I am sure',
                        allowEnterKey: false,
                        customClass: {
                            popup: `Alert ${currentTheme}`,
                            closeButton: 'closeButton',
                            confirmButton: 'confirmButton',
                            denyButton: 'denyButton',
                        }
                    })
                        .then((result) => {

                            if (result.isConfirmed) {

                                if (newUsername.trim() !== '') {
                                    updateProfile(currentUser, {
                                        displayName: newUsername
                                    })
                                        .then(() => {

                                            Swal.fire({
                                                text: 'Username changed succesfully',
                                                icon: 'success',
                                                iconColor: '#85C7DE',
                                                showCloseButton: true,
                                                showDenyButton: false,
                                                confirmButtonText: 'Continue',
                                                allowEnterKey: false,
                                                customClass: {
                                                    popup: `Alert ${currentTheme}`,
                                                    closeButton: 'closeButton',
                                                    confirmButton: 'confirmButton',
                                                    denyButton: 'denyButton',
                                                }
                                            })
                                            .then(() => {
                                                window.location.reload()
                                            })

                                        })
                                        .catch((e) => {
                                            console.log('erorrr', e)
                                            Swal.fire({
                                                text: 'An error occurred, please try again',
                                                icon: 'error',
                                                iconColor: '#85C7DE',
                                                showCloseButton: true,
                                                showDenyButton: false,
                                                confirmButtonText: 'Ok',
                                                allowEnterKey: false,
                                                customClass: {
                                                    popup: `Alert ${currentTheme}`,
                                                    closeButton: 'closeButton',
                                                    confirmButton: 'confirmButton',
                                                    denyButton: 'denyButton',
                                                }
                                            })
                                        })
                                }
                            }
                        })
                }
            })

    }

    function changePassword(currentUser) {

        Swal.fire({

            text: 'Please enter your current password',
            showCloseButton: true,
            showDenyButton: true,
            denyButtonText: 'I forgot my password',
            confirmButtonText: 'Submit',
            input: 'password',
            inputLabel: 'Password',
            inputPlaceholder: 'Current Password',
            allowEnterKey: false,
            customClass: {
                popup: `Alert ${currentTheme}`,
                closeButton: 'closeButton',
                confirmButton: 'confirmButton',
                denyButton: 'denyButton',
            }
        })
            .then((result) => {

                if (result.isConfirmed) {

                    if (result.value.trim() !== '') {

                        let credential = EmailAuthProvider.credential(currentUser.email, result.value)
                        reauthenticateWithCredential(currentUser, credential)
                            .catch(e => {
                                Swal.fire({
                                    text: 'Incorrect Password',
                                    icon: 'error',
                                    iconColor: '#85C7DE',
                                    showCloseButton: true,
                                    showDenyButton: false,
                                    confirmButtonText: 'Ok',
                                    allowEnterKey: false,
                                    customClass: {
                                        popup: `Alert ${currentTheme}`,
                                        closeButton: 'closeButton',
                                        confirmButton: 'confirmButton',
                                        denyButton: 'denyButton',
                                    }
                                })
                            })
                        Swal.fire({
                            text: 'Enter your new password',
                            showCloseButton: true,
                            showDenyButton: false,
                            confirmButtonText: 'Change Password',
                            input: 'password',
                            inputLabel: 'Password',
                            inputPlaceholder: 'New Password',
                            allowEnterKey: false,
                            customClass: {
                                popup: `Alert ${currentTheme}`,
                                closeButton: 'closeButton',
                                confirmButton: 'confirmButton',
                                denyButton: 'denyButton',
                            }
                        })
                            .then(result => {

                                if (result.isConfirmed) {

                                    if (result.value.trim() !== '') {

                                        updatePassword(currentUser, result.value)
                                            .then(() => {
                                                Swal.fire({
                                                    text: 'Password updated successfully',
                                                    icon: 'success',
                                                    iconColor: '#85C7DE',
                                                    showCloseButton: true,
                                                    showDenyButton: false,
                                                    confirmButtonText: 'Continue',
                                                    allowEnterKey: false,
                                                    customClass: {
                                                        popup: `Alert ${currentTheme}`,
                                                        closeButton: 'closeButton',
                                                        confirmButton: 'confirmButton',
                                                        denyButton: 'denyButton',
                                                    }
                                                })
                                            })
                                            .catch(() => {
                                                Swal.fire({
                                                    text: 'An error occurred, please try again',
                                                    icon: 'error',
                                                    iconColor: '#85C7DE',
                                                    showCloseButton: true,
                                                    showDenyButton: false,
                                                    confirmButtonText: 'Ok',
                                                    allowEnterKey: false,
                                                    customClass: {
                                                        popup: `Alert ${currentTheme}`,
                                                        closeButton: 'closeButton',
                                                        confirmButton: 'confirmButton',
                                                        denyButton: 'denyButton',
                                                    }
                                                })
                                            })
                                    }
                                }
                            })
                    }
                }
                if (result.isDenied) {
                    Swal.fire({

                        text: 'Did you forget your password ? Reset it',
                        showCloseButton: true,
                        showDenyButton: true,
                        denyButtonText: 'Cancel',
                        confirmButtonText: 'Send me a password reset email',
                        allowEnterKey: false,
                        customClass: {
                            popup: `Alert ${currentTheme}`,
                            closeButton: 'closeButton',
                            confirmButton: 'confirmButton',
                            denyButton: 'denyButton',
                        }
                    })
                        .then(result => {

                            if (result.isConfirmed) {
                                sendPasswordResetEmail(auth, currentUser.email)
                                Swal.fire({

                                    text: 'Password reset email sent successfully',
                                    showCloseButton: true,
                                    showDenyButton: false,
                                    confirmButtonText: 'Ok',
                                    allowEnterKey: false,
                                    customClass: {
                                        popup: `Alert ${currentTheme}`,
                                        closeButton: 'closeButton',
                                        confirmButton: 'confirmButton',
                                        denyButton: 'denyButton',
                                    }
                                })
                            }
                        })
                }
            })


    }

    function deleteAccount(currentUser) {

        deleteUser(currentUser)
            .then(() => {

                Swal.fire({
                    text: 'Account deleted succesfully',
                    icon: 'success',
                    iconColor: '#85C7DE',
                    showCloseButton: true,
                    showDenyButton: false,
                    confirmButtonText: 'Continue',
                    allowEnterKey: false,
                    customClass: {
                        popup: `Alert ${currentTheme}`,
                        closeButton: 'closeButton',
                        confirmButton: 'confirmButton',
                        denyButton: 'denyButton',
                    }
                })
                navigate('/')

            })
            .catch(() => {
                Swal.fire({
                    text: 'An error occurred, please try again',
                    icon: 'error',
                    iconColor: '#85C7DE',
                    showCloseButton: true,
                    showDenyButton: false,
                    confirmButtonText: 'Ok',
                    allowEnterKey: false,
                    customClass: {
                        popup: `Alert ${currentTheme}`,
                        closeButton: 'closeButton',
                        confirmButton: 'confirmButton',
                        denyButton: 'denyButton',
                    }
                })
            })

    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe

    }, [])


    let value = {
        currentUser,
        signUp,
        logIn,
        signInWithGoogle,
        logOut,
        changePassword,
        changeUsername,
        deleteAccount
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}