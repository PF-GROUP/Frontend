'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gapi: any;
  }
}

export default function GoogleSignIn() {
  
  //useEffect para que se ejecute cuando el santo bboton de los cojones de google se haya cargado y no tener que reiniciar la pagina asheeeeeeeeee
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.gapi && window.gapi.signin2) {
        window.gapi.signin2.render('google-signin-btn', {
          scope: 'profile email',
          width: 240,
          height: 50,
          longtitle: true,
          theme: 'dark',
        });
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  
  return (<>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
</> 
)
}