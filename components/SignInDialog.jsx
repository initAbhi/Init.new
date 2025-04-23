import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "./ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

const SignInDialog = ({ openDialog, closeDialog }) => {
    const CreateUser = useMutation(api.users.createUser)
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer' + tokenResponse.access_token} },
      );
  
      const user = userInfo.data;
      const dbuser = await CreateUser({
        name:user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4()
      })

      if(typeof window!==undefined){
        localStorage.setItem('user',JSON.stringify(user))
      }

      setUserDetail(dbuser)
      closeDialog(false)
    },
    onError: errorResponse => console.log(errorResponse),
  });
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col items-center justify-center gap-3 ">
              <h2 className="font-bold text-2xl text-white text-center">
            Continue with Init.New 2.0
              </h2>
              <p className="mt-2 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
              <Button onClick={googleLogin} className={"bg-[#ff0] drop-shadow-[0_0_10px_rgba(255,255,0,0.7)] text-black cursor-pointer mt-3 hover:bg-[#fcfc47] " } >Sign In with Google</Button>
              <p >{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
