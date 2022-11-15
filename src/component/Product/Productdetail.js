import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Productdetail(){
    let params = useParams();
    const [data,setData] = useState ('');
    const [imgbig,setImgbig] = useState('');
    const [imgsmall,setImgsmall] = useState ('')
    useEffect(()=>{
        axios.get('http://localhost/laravel/laravel/public/api/product/detail/' + params.id)
        .then(res =>{

            //console.log(res.data.data)
            setData(res.data.data)
            const allimg =  JSON.parse(res.data.data.image)
            setImgbig(allimg[0])
            setImgsmall(allimg)

            
        })
        .catch(error => console.log(error))
    },[])
    function Renderimage(){
        if (Object.keys(imgsmall).length > 0) { 
			return Object.keys(imgsmall).map((key, index) => {
               return (
                <img onClick={() => Clickshow(imgsmall[key])} className="img-smail" key={index} src={"http://localhost/laravel/laravel/public/upload/user/product/"+data.id_user +"/"+ imgsmall[key]} alt="" />
                )
			})
		}
    }
    function Clickshow(e) {
        setImgbig(e)
    }
    function Datarender(){
                return(
                    <div class="product-details">
                <div class="col-sm-5" >
                <div class="view-product">
                <img src={"http://localhost/laravel/laravel/public/upload/user/product/"+data.id_user + "/" + imgbig} alt="" />                    
                </div>
                <div id="similar-product" class="carousel slide" data-ride="carousel">        
                    <div class="carousel-inner">
                            {Renderimage()}
                    </div>
                </div>
            </div>
            <div class="col-sm-7">
            <div class="product-information">
                <img src="images/product-details/new.jpg" class="newarrival" alt="" />
                <h2>{data.name}</h2>
                <p>Web ID: {data.id}</p>
                <span>
                    <span>US ${data.price}</span>
                    <label>Quantity:</label>
                    <input type="text" value="1" />
                    <button onClick={() => {Addtocart(data.id)}} type="button" class="btn btn-fefault cart">
                        <i class="fa fa-shopping-cart"></i>
                        Add to cart
                    </button>
                </span>
                <p><b>Availability:</b> In Stock</p>
                <p><b>Condition:</b> {data.status}</p>
                <p><b>Brand:</b> {data.id_brand}</p>
                <a href=""><img src="images/product-details/share.png" class="share img-responsive"  alt="" /></a>
            </div>
            </div>
         </div>
        )
}
function Addtocart(e){
    var product = {}
    var x = 1;
    var cart = localStorage.getItem("Myproduct")
        if(cart){
            product = JSON.parse(cart)
            Object.keys(product).map((key)=>{
                if(key == e){
                    x = 0;
                    product[e] += 1
                }
            })
        }
    if(x == 1){
        product[e] = 1;
    }
    localStorage.setItem("Myproduct",JSON.stringify(product))
    console.log('addtocart',product)

}
return(
    <div class="col-sm-9 padding-right">        
        {Datarender()}
    </div>
)
}
export default Productdetail