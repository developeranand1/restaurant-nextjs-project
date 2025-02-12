import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = () => {


    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const router=useRouter();

    const [error,setError]=useState(false);
    const handleLogin=async()=>{
        if(!email || !password){
            setError(true)
            return false
        }
        else{
            setError(false)
        }

        let response=await fetch('http://localhost:3001/api/restaurant',{
            method:'POST',
            body:JSON.stringify({email,password,login:true})
        })

        response=await response.json();
        if(response.success){
            const {result}=response;

            delete result.password;
            localStorage.setItem("restaurantUser",JSON.stringify(result));
            router.push("/restaurant/dashboard")
        }
        else{
            alert("Login Failed!")
        }

    }

    return (
        <>
            <h1> Login Components</h1>
            <div>
                <div className="input-wrapper">
                    <input type="email" placeholder="Enter Email Id" className="input-field" 
                    value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    {
                        error && !email && <span className="input-error">Please enter valid email</span>
                    }
                </div>

                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Password" className="input-field" 
                    value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    {
                        error && !password && <span className="input-error">Please enter correct password</span>
                    }
                </div>

                <div className="input-wrapper">
                    <button className="button" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </>
    );
};

export default RestaurantLogin;
