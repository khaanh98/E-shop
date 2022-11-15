import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Error from "../Error/Error"

function Login(){
	const [inputs,setInputs] = useState ({
		email: '',
		password: '',
		level: ''
	})
	const[errors,setErrors] = useState ("");
	let Login = false;
	let navigate = useNavigate();
	function handleInput(e){
		const nameInput = e.target.name;
		const value = e.target.value;
		setInputs(state => ({...state,[nameInput]:value}))
	}
	function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }
	function handleSubmit(e){
		e.preventDefault();
		let errorSubmit ={};
        let flag = true;

		if(inputs.email === '' || inputs.email === undefined){
			errorSubmit.email = 'Chưa nhập Email';
			flag = false;
		}
		else if(!validateEmail(inputs.email)){
			errorSubmit.email = 'Đây không phải là Email';
			flag = false;
		}
		if(inputs.password === '' || inputs.password === undefined){
			errorSubmit.password = 'Chưa nhập Pass';
			flag = false;
		}
		if(inputs.level === '' || inputs.level === undefined){
			errorSubmit.level = 'Chưa chọn level';
			flag = false;
		}
		if(!flag){
			setErrors(errorSubmit)
		}
		else{
			const dataLogin = ({
				email:inputs.email,
				password:inputs.password,
				level:inputs.level
			})
            axios.post("http://localhost/laravel/laravel/public/api/login",dataLogin)
			.then((res) =>{
				console.log(res)
				if(res.data.errors){
                    setErrors(res.data.errors)
                    Login = false;
                }
				else{
					Login = true;
					localStorage.setItem('login',JSON.stringify(Login))
					localStorage.setItem("dataAuth", JSON.stringify(res.data))  
					alert('Login thành công')
					navigate("/home")
				}
			})
		}
	}
	
    return(
        <div class="col-sm-4 col-sm-offset-1">
					<div class="login-form">
						<h2>Login to your account</h2>
						<form onSubmit={handleSubmit} encType="multipart/form-data">
						<input type="text" placeholder="Email Address" name="email" onChange={handleInput}/>
						<input type="password" placeholder="Password" name="password" onChange={handleInput}/>
							<span>
								<input type="checkbox" class="checkbox" name="level" value="0" onChange={handleInput}/> 
								Keep me signed in
							</span>
							<Error errors={errors}/>
							<button type="submit" class="btn btn-default">Login</button>
						</form>
					</div>
				</div>
    )
}
export default Login