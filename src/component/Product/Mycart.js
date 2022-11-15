import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
function Mycart(){
	const [local,setLocal] = useState({});
	const [data,setData] = useState({});
	useEffect(() => {
	let product = localStorage.getItem("Myproduct")
	if(product) {
		product = JSON.parse(product)
		setLocal(product)
	}
		axios.post('http://localhost/laravel/laravel/public/api/product/cart', product)
		.then(res =>{
			console.log("data",res.data.data)
			setData(res.data.data)
		})
		.catch(error => console.log(error))
	}, [])
    
	function upQty(id,qty){
		console.log('id',id)
		console.log('sl',qty)
		const datalocal ={...local}
        const datanew  ={...data}
        Object.keys(datanew).map((key,)=>{
            if(datanew[key].id == id){
                datanew[key].qty +=1;
				local[id] = qty + 1
				datalocal[id] = local[id]
            }
        })
        setData(datanew)  
    	localStorage.setItem('Myproduct',JSON.stringify(datalocal))
    	console.log('local',datalocal)
}
function downQty(id,qty){
    console.log('downqty',id)
	console.log('sl',qty)
	const datalocal ={...local}
    const datanew  =[...data]
	//
    Object.keys(datanew).map((key,)=>{
        if(datanew[key].id == id){
            datanew[key].qty -=1;
        }
		if(datanew[key].qty < 1){
			delete datanew[key]
			
		}
    })

	var filtered = datanew.filter(function (el) {
				return el != null;
			  });
	//console.log('data chua xoa emtry',datanew)
	//console.log('da xoa emtry',filtered)
	setData(filtered)
	//
	Object.keys(datalocal).map((key,)=>{
		if(key == id){
			datalocal[key] = qty - 1
		}
		//
		if(datalocal[key] < 1){
			delete datalocal[key]
			
		}
	})
	localStorage.setItem('Myproduct',JSON.stringify(datalocal))
	console.log(datalocal)
}
function Deleteprd(id){
    console.log('xoa id',id)
	const datanew = data.filter((data) => data.id !== id);
	let datalocalnew = {};
	datanew.map((list) =>{
		 datalocalnew = {... datalocalnew, [list.id]: list.qty}
	})
	setData(datanew)
	localStorage.setItem('Myproduct',JSON.stringify(datalocalnew))
	console.log(datalocalnew)
}
function Totalall(){
	let totalall = 0;
	Object.keys(data).map((key,)=>{
		totalall = totalall += data[key].price * data[key].qty
		//console.log(totalall)
    })
	return(totalall)
}
	function Datarender(){
		if(Object.keys(data).length > 0){
			return Object.keys(data).map((key,index)=>{
				let imagexx = JSON.parse(data[key].image)
				const total = data[key].price * data[key].qty
				return(
					<tr key={index}>
							<td class="cart_product">
							<img className="img_myproduct" src={"http://localhost/laravel/laravel/public/upload/user/product/"+ data[key].id_user +"/"+ imagexx[0]} alt="" /></td>
							
							<td class="cart_description">
								<h4><a href="">{data[key].name}</a></h4>
								<p>Web ID:{data[key].id}</p>
							</td>
							<td class="cart_price">
								<p>${data[key].price}</p>
							</td>
							<td class="cart_quantity">
								<div class="cart_quantity_button">
									<a class="cart_quantity_up" onClick={() => {upQty(data[key].id, data[key].qty)}}> + </a>
									<input class="cart_quantity_input" type="text" name="quantity" value={data[key].qty} autocomplete="off" size="2"/>
									<a class="cart_quantity_down" onClick={() => {downQty(data[key].id, data[key].qty)}}> - </a>
								</div>
							</td>
							<td class="cart_total">
								<p class="cart_total_price">${total}</p>
							</td>
                            <td className="cart_delete">
								<button onClick={() => {Deleteprd(data[key].id)}}>Delete</button>
							</td>
						</tr>
					)
			})
		}
	}
    return(
        <div>
        <section id="cart_items">
		<div class="container">
			<div class="table-responsive cart_info col-sm-9">
				<table class="table table-condensed">
					<thead>
						<tr class="cart_menu">						
							<td class="image">Item</td>
							<td class="description">Products</td>
							<td class="price">Price</td>
							<td class="quantity">Quantity</td>
							<td class="total">Total</td>
							<td class="total">Delete</td>
						</tr>
					</thead>
					<tbody>
						{Datarender()}

					</tbody>

				</table>
			</div>
		</div>
	</section>
    <section id="do_action">
		<div class="container">
			<div class="heading">
				<h3>What would you like to do next?</h3>
				<p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="chose_area">
						<ul class="user_option">
							<li>
								<input type="checkbox"/>
								<label>Use Coupon Code</label>
							</li>
							<li>
								<input type="checkbox"/>
								<label>Use Gift Voucher</label>
							</li>
							<li>
								<input type="checkbox"/>
								<label>Estimate Shipping & Taxes</label>
							</li>
						</ul>
						<ul class="user_info">
							<li class="single_field">
								<label>Country:</label>
								<select>
									<option>United States</option>
									<option>Bangladesh</option>
									<option>UK</option>
									<option>India</option>
									<option>Pakistan</option>
									<option>Ucrane</option>
									<option>Canada</option>
									<option>Dubai</option>
								</select>
								
							</li>
							<li class="single_field">
								<label>Region / State:</label>
								<select>
									<option>Select</option>
									<option>Dhaka</option>
									<option>London</option>
									<option>Dillih</option>
									<option>Lahore</option>
									<option>Alaska</option>
									<option>Canada</option>
									<option>Dubai</option>
								</select>
							
							</li>
							<li class="single_field zip-field">
								<label>Zip Code:</label>
								<input type="text"/>
							</li>
						</ul>
						<a class="btn btn-default update" href="">Get Quotes</a>
						<a class="btn btn-default check_out" href="">Continue</a>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="total_area">
						<ul>
							<li>Cart Sub Total <span>$59</span></li>
							<li>Eco Tax <span>$2</span></li>
							<li>Shipping Cost <span>Free</span></li>
							<li>Total <span>${Totalall()}</span></li>
						</ul>
							<a class="btn btn-default update" href="">Update</a>
							<a class="btn btn-default check_out" href="">Check Out</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

    )
}
export default Mycart