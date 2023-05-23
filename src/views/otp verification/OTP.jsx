import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client'
import Loader from '../../components/loader/Loader'
import { useStateContext } from '../../contexts/ContextProvider'
import ModalOTP from './ModalOTP'
import Spinner from '../../components/loader/Spinner' 
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
 
export default function OTP({route,navigate}) {
    const [showModal, setShowModal] = useState(false)
    const [userID, setUserID] = useState()
    const [loading, setLoading] = useState(false)
    const [countDown, setCountDown] = useState(0)
    const [errors, setErrors] = useState()
    const [runTimer, setRunTimer] = useState(true)
    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
    const location = useLocation()
    const Navigate = useNavigate()
    const resendRef = useRef()
    const otp1 = useRef()
    const otp2 = useRef()
    const otp3 = useRef()
    const otp4 = useRef()
    const otp5 = useRef()
    const otp6 = useRef() 
    const MySwal = withReactContent(Swal)
    const {setUser,setToken,setRole, setUser_ID} = useStateContext()

    const onKeyPress = (ev) => {
        if (!/[0-9]/.test(ev.key)) {
            ev.preventDefault();
          }
    } 
 
    const onSubmit = (ev) => {
        ev.preventDefault()
        
        const verification = {
            token: otp1.current.value+otp2.current.value+otp3.current.value+otp4.current.value+otp5.current.value+otp6.current.value,
            email: location.state.email,
        }

        axiosClient.post('/verifyotp', verification)
            .then(({data}) => {
                console.log(data.user)
                if (data.user) {
                    setUser(data.user)
                    setToken(data.token)
                    setRole(data.role)
                    setUser_ID(data.user_ID)
                } else {
                    // console.log('login no')
                    setShowModal(true)
                    setUserID(data.id)
                }
                   
                
            })
            .catch(err => {
                
                const response = err.response
                // console.log(response)
                if (response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors)
                    }else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }

    const onResend = (ev) => {

        ev.preventDefault()

        setLoading(true)
        resendRef.current.classList.add('isDisabled');
        // setRunTimer(true);
        // setCountDown(10);

        const otpEmail = {
            email: location.state.email
        }

        axiosClient.post('/resendotp', otpEmail)
            .then(({data}) => {
                // Navigate('/dashboard')   
                console.log(data)
                if(data=='blocked') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Your account has been temporarily locked due to 3 consecutive request OTP attempts. Please try again in 60 minutes or contact your Corporate Manager.', 
                    }).then(() => {
                        Navigate('/')
                    })
                    setLoading(false)
                    setErrors('')
                } else {
                    resendRef.current.classList.add('isDisabled');
                    setRunTimer(true);
                    setLoading(false)
                    setErrors('')
                }
            }) 
    }

    useEffect(() => {
        let timerId;

        if (runTimer) {
            setCountDown(60 * 3);
            timerId = setInterval(() => {
                setCountDown((countDown) => countDown - 1);
            }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);

    }, [runTimer])

    useEffect(() => {
        if (countDown < 0 && runTimer) {
            resendRef.current.classList.remove('isDisabled'); 
            setRunTimer(false);
            setCountDown(0);

            const otpEmail = {
                email: location.state.email
            }

            axiosClient.post('/expiredotp', otpEmail)
            .then(({data}) => {
                // Navigate('/dashboard')   
                // console.log(data)
            })
          }
    }, [countDown, runTimer])

   
 
  return (
    <div id="otp"> 
 
        <form className="form" onSubmit={onSubmit}>
            <span className="close">X</span>
            <div className="info">
                <span className="title">Email Verification</span>
                <p className="description">Please enter the code we have sent you.</p>
            </div>
            <div className="inputs">
                <input ref={otp1} placeholder="" type="text" maxLength="1" onKeyPress={onKeyPress} />
                <input ref={otp2} placeholder="" type="tel" maxLength="1" onKeyPress={onKeyPress} />
                <input ref={otp3} placeholder="" type="tel" maxLength="1" onKeyPress={onKeyPress} />
                <input ref={otp4} placeholder="" type="tel" maxLength="1" onKeyPress={onKeyPress} />
                <input ref={otp5} placeholder="" type="tel" maxLength="1" onKeyPress={onKeyPress} />
                <input ref={otp6} placeholder="" type="tel" maxLength="1" onKeyPress={onKeyPress} />
            </div> 
            {errors && <div className="otp_alert">
                        {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0] ?? ''}</p>
                        ))}
                    </div>
                    }
            <div className="timer">Time: {minutes}:{seconds}</div>
            <button className="validate">Verify</button>
            <div>
            <p className="resend">Did not received email verification?
                <a ref={resendRef} onClick={onResend} className="resend-action isDisabled" >
                    send again
                </a>
            </p>
            {loading && <Spinner />}
            </div>
        </form>

         <ModalOTP show={showModal} close={() => setShowModal(false)} email= {location.state.email} id={userID} />
    </div>
  )
}
