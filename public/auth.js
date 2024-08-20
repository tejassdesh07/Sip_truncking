import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, getIdToken } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_vkK3-v55DyjqZeC9H4s2r13zTQIpqAI",
  authDomain: "siptruncking.firebaseapp.com",
  projectId: "siptruncking",
  storageBucket: "siptruncking.appspot.com",
  messagingSenderId: "949470775882",
  appId: "1:949470775882:web:982b97939c507347a374b3",
  measurementId: "G-547GE7YYTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login');

  loginButton.addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await getIdToken(user);

      // Send ID token to the server
      const response = await fetch('/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Redirect to response.html with UID in query parameters
      window.location.href = `response.html?status=success&message=Authentication successful! UID=${encodeURIComponent(data.uid)}`;
    } catch (error) {
      console.error('Error during sign-in:', error);
      // Redirect to response.html with error message
      window.location.href = `response.html?status=failure&message=${encodeURIComponent(error.message)}`;
    }
  });
});
