'use client';


export default function GoogleSignIn() {
  
  return (<>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
        <div  className="g-signin2" data-onsuccess="onSignIn"></div>
</> 
)
}