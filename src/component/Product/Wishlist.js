import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Wishlist(){
    const [data,setData] = useState({});
    
    useEffect(()=>{
        axios.get('http://localhost/laravel/laravel/public/api/product/wishlist')
        .then(res=>{
            //console.log('data ban dau',res.data.data)
            const datafirst = [...res.data.data]

            var prdwl = localStorage.getItem('Mywishlist')
            console.log('wl',prdwl)
            if(prdwl){
                prdwl = JSON.parse(prdwl)
                Object.keys(prdwl).map((key) => {
                    const result = datafirst.filter(function(value) {
                        return value.id == prdwl[key]
                       })
                       console.log('data da loc',result)
                       setData(result)
                       //
                // var showprd = [];
                // var x = 1;
                //     var test = localStorage.getItem('showprd')
                //         if(test){
                //         showprd = JSON.parse(test)
                //         Object.keys(showprd).map((key)=>{
                //             if(showprd[key] = result){
                //                 //showprd.push(result)
                //                 console.log('trung')
                //                 //delete showprd[key]

                //                 //showprd = result 

                //             }
                //         })
                //     }
                //     if(x == 1){
                //         console.log('add')
                //          //showprd = result
                //          showprd.push(result)
 
                //     }
                //     localStorage.setItem('showprd',JSON.stringify(showprd))
                //     console.log("new prd",showprd)
                })
            }
        })
        .catch(error => console.log(error))
    },[])
    function Datarender() {
            if (Object.keys(data).length > 0) {
                console.log('show data',data)
            return Object.keys(data).map((key, index) => {
                const xx = data[key].image
                // console.log(xx)
                const myArr = JSON.parse(xx);
             return(
                <div class="col-sm-4" key={index}>
                <div class="product-image-wrapper">
                    <div class="single-products">
                        <div class="productinfo text-center">
                        <img src={"http://localhost/laravel/laravel/public/upload/user/product/"+data[key].id_user + "/" + myArr[0]} alt="" />
                            <h2>${data[key].price}</h2>
                            <p>{data[key].name}</p>
                            <p>id: {data[key].id}</p>

                            <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                        </div>
                        <div class="product-overlay">
                            <div class="overlay-content">
                                <h2>${data[key].price}</h2>
                                <p>{data[key].name}</p>
                                {/* <a href="#" id={data[key].id} className="btn btn-default add-to-cart" onClick={() => Addprd(data[key].id)}>Add to cart</a> */}
                            </div>
                        </div>
                    </div>
                    <div class="choose">
                        <ul class="nav nav-pills nav-justified">
                            {/* <li><a onClick={() => Removeprd(data[key].id)}>Remove to wishlist</a></li> */}
                            {/* <li><a href=""><i class="fa fa-plus-square"></i>Add to compare</a></li> */}
                        </ul>
                    </div>
                    </div>
                </div>
             )
     })
             

     }
    }
    return(
        <div class="col-sm-9 padding-right">
                <div class="features_items">
                    <h2 class="title text-center">Products wishlist</h2>
                   {Datarender()}
                </div>
                
            </div>
           )
}
export default Wishlist
