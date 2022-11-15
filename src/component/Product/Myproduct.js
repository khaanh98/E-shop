import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
function Myproduct(){

	useEffect(() => {
	let dataAuth = localStorage.getItem("dataAuth")
	if (dataAuth) {
		dataAuth = JSON.parse(dataAuth);
		setToken(dataAuth.success.token)
	}

		let url = 'http://localhost/laravel/laravel/public/api/user/my-product'
		//console.log(accessToken)
		let accessToken = dataAuth.success.token
		let config = { 
		headers: { 
		'Authorization': 'Bearer '+ accessToken,
		'Content-Type': 'application/x-www-form-urlencoded',
		'Accept': 'application/json'
		} 
		};
		axios.get(url,config)
		.then(res =>{
			//console.log("data",res)
			setData(res.data.data)
		})
		.catch(error => console.log(error))
	}, [])

	const [token,setToken] = useState("");
	const [data,setData] = useState({});
	function Deleteproduct(e){
		let iddel = e.target.id
		console.log(iddel)
		let url = 'http://localhost/laravel/laravel/public/api/user/delete-product/' + iddel
		let config = { 
			headers: { 
			'Authorization': 'Bearer '+ token,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json'
			} 
		};
		axios.get(url,config)
		.then(res =>{
			console.log('test del',res.data)
			setData(res.data.data)

		})
		.catch(error => console.log(error))
	}
	function Datarender(){
		if(Object.keys(data).length > 0){
			return Object.keys(data).map((key,index)=>{
				let imagexx = JSON.parse(data[key].image)
				console.log('img',imagexx)
				return(
					<tr key={index}>
							<td class="cart_product">

							<img className="img_myproduct" src={"http://localhost/laravel/laravel/public/upload/user/product/"+ data[key].id_user +"/"+ imagexx[0]} alt="" /></td>
							
							<td class="cart_description">
								<h4><a href="">{data[key].name}</a></h4>
								<p>Web ID: {data[key].id}</p>
							</td>
							<td class="cart_price">
								<p>${data[key].price}</p>
							</td>
							<td class="cart_deletel">
								<Link to={'/account/editproduct/' + (data[key].id)}>
								<button><a>Edit</a></button>
								</Link>
								<button><a id={data[key].id} onClick={Deleteproduct}>Delete</a></button>
							</td>
							<td class="cart_deletel">
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
							<td class="description">Product</td>
							<td class="price">Price</td>
							<td class="total">Setting</td>
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
							<li>Total <span>$61</span></li>
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
export default Myproduct