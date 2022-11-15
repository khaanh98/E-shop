import axios from "axios";
import { useEffect, useState } from "react"
import Error from "../Error/Error";

function Update(){
    const [inputs,setInputs] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });
    const [avatar,setAvatar] = useState ("");
    const [file,setFile] = useState ("");
    const [errors,setErrors] = useState("");
    const [token,setToken] = useState("");
    const [iduser,setIduser] = useState ("");
    //
    useEffect(()=>{
        const useData = JSON.parse(localStorage['dataAuth'])
        setIduser(useData.Auth.id)
        setToken(useData.success.token)
        setInputs({
            name: useData.Auth?.name,
            email: useData.Auth?.email,
            password: '',
            phone: useData.Auth?.phone,
            address: useData.Auth?.address,

        })

    },[])
    //

    function handleInput(e){
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state,[nameInput]:value}))
    }
    //
    function handleImgFile  (e) {
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
        if(inputs.phone === '' || inputs.phone === undefined){
            errorSubmit.phone = 'Chua nhập Số điện thoại';
            flag = false
        }
        if(inputs.address === '' || inputs.address === undefined){
            errorSubmit.address = 'Chua nhập Địa chỉ';
            flag = false
        }
        // if(inputs.level == ""){
        //     errorSubmit.level = "Chưa chon level"
        //     flag = false;
        // }
        // if(file === ''){
        //     errorSubmit.file = 'Vui lòng chọn hình'
        //     flag = false;
        // }
        // else if (!isFileImage(file)) {
        //     flag = false;
        //     errorSubmit.file = "FILE khong phai anh";
        // } else if (isFileImage(file) && file.size > 1024 * 1024) {
        //     flag = false;
        //     errorSubmit.file = "Kich thuoc anh qua lon";
        // }
        if(!flag){
            setErrors(errorSubmit)
        }
        else{
            setErrors("")
            console.log('token',token)
            console.log('id',iduser)
            let url = 'http://localhost/laravel/laravel/public/api/user/update/' + iduser
            let accessToken = token
            let config = { 
            headers: { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
            };
            const formData = new FormData();
                    formData.append('name', inputs.name);
                    formData.append('email',inputs.email);
                    formData.append('password', inputs.password ? inputs.password : "");
                    formData.append('phone', inputs.phone);
                    formData.append('address', inputs.address);
                    formData.append('avatar', avatar);
                axios.post(url,formData,config)
                .then(res=>{
                    console.log(res)
					localStorage.setItem("dataAuth", JSON.stringify(res.data))
                    alert('done')
                })
            
        }
    }

    return(
        <div class="col-sm-8">
        <div class="signup-form">
            <h2>User Update!</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder="name" name="name" value={inputs.name} onChange={handleInput}/>
                <input type="text" placeholder="Email" value={inputs.email} onChange={handleInput} readOnly/>
                <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                <input type="text" placeholder="Phone" name="phone" value={inputs.phone} onChange={handleInput}/>
                <input type="text" placeholder="Address" name="address" value={inputs.address} onChange={handleInput}/>
                <input type="file" name="img" onChange={handleImgFile} className="climg"/>
                {/* <span><input type="checkbox" class="checkbox" name="level" value="0" onChange={handleInput}/> Level</span> */}
                    <Error errors={errors}/>
                
                <button type="submit" class="btn btn-default">Up</button>
            </form>
            
        </div>
    </div>
    )
}
export default Update