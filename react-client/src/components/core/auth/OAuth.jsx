import React from 'react'
import IconBtn from '../../common/IconBtn'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../../../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginWithGoogle } from '../../../services/operations/authOperations'
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async()=>{
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});
        try{
            const resultFromGoogle = await signInWithPopup(auth , provider)
            console.log(resultFromGoogle);
            
            dispatch(loginWithGoogle({email:resultFromGoogle.user.email,
                firstName:resultFromGoogle.user.displayName.split(" ")[0],
                lastName:resultFromGoogle.user.displayName.split(" ")[1],
                googlePhotoUrl:resultFromGoogle.user.photoURL
            },navigate))
        }catch(e)
        {
            console.log(e);
        }
    }
  return (
    <IconBtn
        type={'Button'}
        outline
        text={"Continue with Google"}
        onclick={handleGoogleClick}
    >
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
    </IconBtn>
  )
}

export default OAuth