import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../Context/Usercontext";

function Allproduct(){
    const getContext = useContext(UserContext)
    const [data,setData] = useState ({});
    var qty = 0;
            var cart = localStorage.getItem("Myproduct")
            if(cart){
                var product = JSON.parse(cart)
                Object.keys(product).map((key)=>{
                    qty = qty + product[key]
                })
            }
            getContext.getqty(qty)

    useEffect(()=>{
        axios.get('http://localhost/laravel/laravel/public/api/product')
        .then(res=>{
            setData(res.data.data)
            //console.log(res.data.data)
        })
        .catch(error => console.log(error))
    },[])

    function Datarender(){
        if(Object.keys(data).length > 0){
            return Object.keys(data).map((key,index) =>{
                const image = JSON.parse(data[key].image)
                //console.log(image)
                return(
                    <div class="col-sm-4" key={index}>
                    <div class="product-image-wrapper">
                        <div class="single-products">
                                <div class="productinfo text-center">	
                                <img src={"http://localhost/laravel/laravel/public/upload/user/product/"+data[key].id_user + "/" + image[0]} alt="" />
                                    <h2>${data[key]?.price}</h2>
                                    <p>{data[key]?.name}</p>
                                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                                </div>
                                <div class="product-overlay">
                                    <div class="overlay-content">
                                        <h2>${data[key].price}</h2>
                                        <p  class="test" value="1">SL:1</p>
                                        <p>{data[key]?.detail}</p>
                                        <span id="qty">1</span>
                                        <a onClick={() => Addtocart(data[key].id)} class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                                    </div>
                                </div>
                        </div>
                        <div class="choose">
                            <ul class="nav nav-pills nav-justified">
                                <li><a onClick={() => Addwishlist(data[key].id)}><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                                <li><Link to={'/product/detail/' + (data[key].id)}><a><i class="fa fa-plus-square"></i>Detail</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                )
            })
        }  
    }
    function Addwishlist(e){
        console.log('e day',e)
        var Mywishlist = []
        var x = 1;
            var test = localStorage.getItem("Mywishlist")
            if(test){
                Mywishlist = JSON.parse(test)
                    Object.keys(Mywishlist).map((key)=>{
                    if(Mywishlist[key] == e){
                        x = 0;
                        alert('Delete to wishlist')
                        delete Mywishlist[key]
                        var filtered = Mywishlist.filter(function (el) {
                            return el != null;
                          });
                          Mywishlist = filtered

                    }
                })
            }
        if(x == 1){
            alert('Add to Wishlist')
            Mywishlist.push(e)
        }

        localStorage.setItem("Mywishlist",JSON.stringify(Mywishlist))
        console.log('test add Mywishlist',Mywishlist)
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
            product[e] = 1
        }
        localStorage.setItem("Myproduct",JSON.stringify(product))
        console.log('test add',product)
        getContext.getqty(qty + 1)
    }
    return(
        
				<div class="col-sm-9 padding-right">
                <div class="features_items">
                    <h2 class="title text-center">Products Items</h2>
                   {Datarender()}
                </div>
                
            </div>
    )
}
export default Allproduct