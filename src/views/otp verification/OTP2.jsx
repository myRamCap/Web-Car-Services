import React from 'react'

export default function OTP2() {
  return (
    <div id="otp2">

        <div className="design-container">
            <div className="design-wrapper">
                <div className="call">
                    <div>
                    <p className="phone-number">+1 555 773-</p>
                    <p className="phone-desc">unknown caller</p>
                </div>
            
                </div>
                <form className="form-card">
                    <p className="form-card-title">We're calling your number to confirm it</p>
                    <p className="form-card-prompt">Enter last 4 digits of the number we are calling you from</p>
                    <div className="form-card-input-wrapper">
                    <input type="tel" maxlength="4" placeholder="____" className="form-card-input"/>
                    <div className="form-card-input-bg"></div>
                    </div>
                    <p className="call-again"><span className="underlined">call again</span> in 0:30 seconds</p>
                    <button className="form-card-submit" type="submit">submit</button>

                </form>
            </div>
     
        </div>
    </div>
  )
}
