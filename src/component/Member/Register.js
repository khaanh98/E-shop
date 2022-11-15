import axios from "axios";
import { useState } from "react"
import Error from "../Error/Error";

function Register(){
    const [inputs,setInputs] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        level: ''
    });
    const [avatar,setAvatar] = useState ("");
    const [file,setFile] = useState ("");
    const [errors,setErrors] = useState("");
    function handleInput(e){
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state,[nameInput]:value}))
    }
    function handleInputFile  (e) {

        const file = e.target.files        
        setFile(file)
        let reader = new FileReader();
        reader.onload= (e) => {
                setAvatar(e.target.result);
                setFile(file[0]);
            };
        reader.readAsDataURL(file[0])
    }
    //
    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }
    function isFileImage(file) {
        const imageReal = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg', 'image/JPG', 'image/PNG']
        return file && imageReal.includes(file['type']);
    }
    //
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit ={};
        let flag = true;

        if(inputs.name === '' || inputs.name === undefined){
            errorSubmit.name = 'Vui lòng nhập tên';
            flag = false;
        }
        if(inputs.email == '' || inputs.email === undefined){
            errorSubmit.email = 'Vui lòng nhập Email';
            flag = false;
        } else if(!validateEmail (inputs.email)){
            errorSubmit.email = 'Đây không phải là Email,Vui lòng nhập lại'
            flag = false;
        }
        if(inputs.password === '' || inputs.password === undefined){
            errorSubmit.password = 'Chưa nhập Password';
            flag = false;
        }
        if(inputs.phone === '' || inputs.phone === undefined){
            errorSubmit.phone = 'Chua nhập Số điện thoại';
            flag = false
        }
        if(inputs.address === '' || inputs.address === undefined){
            errorSubmit.address = 'Chua nhập Địa chỉ';
            flag = false
        }
        if(inputs.level == ""){
            errorSubmit.level = "Chưa chon level"
            flag = false;
        }
        if(file === ''){
            errorSubmit.file = 'Vui lòng chọn hình'
            flag = false;
        }
        else if (!isFileImage(file)) {
            flag = false;
            errorSubmit.file = "FILE khong phai anh";
        } else if (isFileImage(file) && file.size > 1024 * 1024) {
            flag = false;
            errorSubmit.file = "Kich thuoc anh qua lon";
        }
        if(!flag){
            setErrors(errorSubmit)
        }
        else{
            setErrors("")
            const dataRegister = {
                name:inputs.name,
                email:inputs.email,
                password:inputs.password,
                phone:inputs.phone,
                vxaddress:inputs.address,
                level:inputs.level,
                avatar:avatar
            }
            axios.post("http://localhost/laravel/laravel/public/api/register",dataRegister)
            .then((res) =>{
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    alert("dang ki thanh cong")
                    console.log(res)
                }
            })
        }
    }

    return(
        <div class="col-sm-4">
        <div class="signup-form">
            <h2>New User Signup!</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder="Name" name="name" onChange={handleInput}/>
                <input type="text" placeholder="Email" name="email" onChange={handleInput}/>
                <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                <input type="number" placeholder="Phone" name="phone" onChange={handleInput}/>
                <input type="text" placeholder="Address" name="address" onChange={handleInput}/>
                <input type="file" placeholder="Image" name="avatar" onChange={handleInputFile}/>
                <span><input type="checkbox" class="checkbox" name="level" value="0" onChange={handleInput}/> Level</span>
                    <Error errors={errors}/>
                
                <button type="submit" class="btn btn-default">Signup</button>
            </form>
            
        </div>
    </div>
    )
}
export default Register