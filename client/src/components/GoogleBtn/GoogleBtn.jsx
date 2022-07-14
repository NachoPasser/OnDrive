import React from 'react'
import { useEffect } from 'react';
export default function GoogleBtn({handleResponse}) {

    useEffect(() => {

        window.google.accounts.id.initialize({
          client_id: "76338579163-sjcuevpdi6af8eqc2etjii3bf93brltg.apps.googleusercontent.com",
          callback: handleResponse
        });
    
        window.google.accounts.id.renderButton(
          document.getElementById('btnGoogle'),
          { theme: 'outline', size: 'large'}
        )
      }, [])

  return (
    <div id='btnGoogle'>
        
    </div>
  )
}
