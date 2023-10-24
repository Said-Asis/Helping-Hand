import React, { Component } from 'react';
import { FIREBASE_AUTH } from '../firebase/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { useState } from 'react';

const Login =()=>{
  const auth= FIREBASE_AUTH;
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const signIn= async ()=>{
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    }
    catch(error){
      console.log(error);
    }
  }
  const signUp= async ()=>{
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    }
    catch(error){
      console.log(error);
    }
  }
return(
  <div>
   
      <label>
        Correo electrónico:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" onClick={signUp}>Iniciar sesión</button>
    
  </div>
)
};
export default Login