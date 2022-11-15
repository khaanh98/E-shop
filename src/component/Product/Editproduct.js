import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error/Error";

function Editproduct(){

    let params = useParams();
    const [inputs,setInputs] = useState ({
        name: '',
        price: '',
        brand: '',
        category: '',
        status: '',
        sale: '',
        detail: '',
        company: ''

    })
    const [getcategory,setCategory] = useState({});
    const [getbrand,setBrand] = useState({});
    const [errors,setErrors] = useState ({});
    const [getFile,setFile] = useState("");
    const [image,setImage] = useState("");
    const [token,setToken] = useState("");
    const [getid,setId] = useState('');
    const [checkboximg,SetCheckboximg] = useState([]);
    //
    useEffect (() => {
        let dataAuth = localStorage.getItem("dataAuth")
        if (dataAuth) {
            dataAuth = JSON.parse(dataAuth);
            setToken(dataAuth.success.token)
            setId(dataAuth.Auth.id)
        }
        let accessToken = dataAuth.success.token
        let url = 'http://localhost/laravel/laravel/public/api/user/product/' + params.id
        let config = { 
			headers: { 
			'Authorization': 'Bearer '+ accessToken,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json'
			} 
		};
		axios.get(url,config)
		.then(res =>{
			//console.log('test dataprd',res.data)
            let product = res.data.data
            setInputs({
                name:product?.name,
                price: product?.price,
                brand: product?.brand,
                category: product?.id_category,
                brand: product?.id_brand,
                sale: product?.sale,
                detail: product?.detail,
                company: product?.company_profile,
                status: product?.status

            })
            setImage(product)
		})
		.catch(error => console.log(error))
        //
        
    },[])
    //
    
    //
    function listCategory() {
        if(Object.keys(getcategory).length > 0){
           // console.log(getcategory)
            return Object.keys(getcategory).map((key,index)=>{
                return (
                    <option key={index} value={getcategory[key].id}>{getcategory[key].category}</option>
                    )
            })
        }
    }
    function listBrand() {
        if(Object.keys(getbrand).length > 0){
            return Object.keys(getbrand).map((key,index)=>{
                return (
                    <option key={index} value={getbrand[key].id}>{getbrand[key].brand}</option>
                    )
            })
        }
    }
    useEffect (() => {
        axios.get("http://localhost/laravel/laravel/public/api/category-brand")
        .then(res =>{
            //console.log(res)
            setCategory(res.data.category)
            setBrand(res.data.brand)
        })
    },[])
    function renderSale() {
        if (inputs.status == 0) {
            return (
                <input name="sale" placeholder="0" onChange={handleInput} />
            )
        }
    }
    function renderImage(){
        if(Object.keys(image).length > 0){
            const showimg = image.image
            return Object.keys(showimg).map((key,index)=>{
                return (
                    <div key={index} className="img_form_edit_item">
                    <img className="img_myproduct" src={"http://localhost/laravel/laravel/public/upload/user/product/" + getid +"/"+ showimg[key]} alt="" />
                    <input className="span_form_edit" type="checkbox" value={showimg[key]} onChange={handleCheckox}/>
                    </div>
                )
            })
        }
    
    }
    function handleCheckox(e){
        // const file = e.target.files      
        const file = e.target.value
        const check = e.target.checked
        if(check){
            // SetCheckboximg(state => ([...state,file])) 
            SetCheckboximg([...checkboximg,file]) 
            console.log("mang add",checkboximg)
        }
        else {
            const testdelimg = checkboximg.filter((checkboximgs)=>{
                return checkboximgs !== file
            })
            SetCheckboximg(testdelimg)
            console.log("mang da xoa",checkboximg)
        }
    }
    function handleInput(e){
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs(state => ({...state,[nameInput]:value}))   
    }
    function isFileImage(file) {
        const imageReal = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg', 'image/JPG', 'image/PNG']
        return file && imageReal.includes(file['type']);
    }
    function handleImgFile(e){
        const getFile = e.target.files;
        setFile(getFile);

    }
    function handleSubmit(e){
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if(inputs.name === undefined || inputs.name === '') {
            flag = false;
            errorSubmit.name = " Tên không được để trống"
        }
        if(inputs.price === undefined || inputs.price === '') {
            flag = false;
            errorSubmit.price = " Price không được để trống"
        }
        if(inputs.category === undefined || inputs.categry === '') {
            flag = false;
            errorSubmit.category = " categry không được để trống"
        }
        if(inputs.brand === undefined || inputs.brand === '') {
            flag = false;
            errorSubmit.brand = "brand không được để trống"
        }
        if(inputs.status === undefined || inputs.status === '') {
            flag = false;
            errorSubmit.status = "Status không được để trống"
        }
        if(inputs.company === undefined || inputs.company === '') {
            flag = false;
            errorSubmit.status = "Company không được để trống"
        }
        if(getFile === undefined || getFile === ''){
            flag = false;
            errorSubmit.image = "File không được để trống"
        }
        else if(getFile.length > 3){
            flag = false;
            errorSubmit.image = "Chỉ được chọn 3 hình"
        }
        else{
            Object.values(getFile).map((getFile) =>{
                    if (!isFileImage(getFile)) {
                    flag = false;
                    errorSubmit.image = "Đây không phải là hình ảnh"
                }
                 else if (isFileImage(getFile) && getFile.size > 1024 * 1024) {
                    flag = false;
                    errorSubmit.image = "Kích thước ảnh quá lớn"
                }
            })
        }
        if(inputs.detail === undefined || inputs.detail === '') {
            flag = false;
            errorSubmit.detail = "Detail không được để trống"
        }
        if(!flag){
            setErrors(errorSubmit)
        }
        else{
            let url = 'http://localhost/laravel/laravel/public/api/user/edit-product/' + params.id
            console.log(url)
            let accessToken = token
            let config = { 
            headers: { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
            };
			//console.log(config)
                const formData = new FormData();
                    formData.append('name', inputs.name);
                    formData.append('price',inputs.price);
                    formData.append('category', inputs.category);
                    formData.append('brand', inputs.brand);
                    formData.append('company', inputs.company);
                    // formData.append('company', getcompany);
                    formData.append('detail', inputs.detail);
                    formData.append('status', inputs.status);
                    formData.append('sale', inputs.sale);
                    Object.keys(getFile).map((item,i) =>{
                        formData.append("file[]",getFile[item]);
                        console.log('test file',getFile[item])
                    });
                    Object.keys(checkboximg).map((item,i) =>{
                        formData.append("avatarCheckBox[]",checkboximg[item]);
                        console.log('test avatar',checkboximg[item])
                    });
                    axios.post(url,formData,config)
                    .then(response=>{
                        if(response.data.errors){
                            setErrors(response.data.errors)
                            console.log(response)
                        }
                        else{
                        console.log(response)
                        alert('done')
                        }
                    })
        }

    }
    return(
        <div class="col-sm-8">
        <div class="signup-form">
            <h2>Create Product</h2>
            <form onSubmit = {handleSubmit} className="form-register" form enctype="multipart/form-data">
            <input type="text" name="name" placeholder="Name" value={inputs.name} onChange={handleInput}/>
            <input type="text" name="price" placeholder="Price" value={inputs.price} onChange={handleInput}/>
            <select placeholder="Please choose categry" name="category" value={inputs.category} onChange={handleInput}>
                <option value=''>Please choose categry</option>
                {listCategory()}
            </select>
            <select placeholder="Please choose brand" name="brand" value={inputs.brand} onChange={handleInput}>
            <option value=''>Please choose brand</option>
                {listBrand()}
            </select>
            <select placeholder="Status" name="status" value={inputs.status} onChange={handleInput}>
                <option value={1}>new</option>
                <option value={0}>sale</option>
            </select>
            {renderSale()}
            <input type="text" name="company" placeholder="company profile" value={inputs.company} onChange={handleInput}/>

            <input type="file" name="getFile" placeholder="CHọn hình ảnh sản phẩm" onChange={handleImgFile} multiple/>
            {renderImage()}
            <textarea type="text" name="detail" placeholder="Detail" value={inputs.detail} onChange={handleInput}></textarea>
            <Error errors={errors}/>
                <button type="submit">Add Product</button>
            </form>
        </div>
    </div> 
    )
}
export default Editproduct