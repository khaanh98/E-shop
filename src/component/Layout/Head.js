import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../Context/Usercontext';
import Slider from "./Slider"

function Head(){
	const navigate = useNavigate();
	const checklogin = localStorage.getItem('login')
	const user = useContext(UserContext)
	console.log('log ben head',user.qtycart,user.qtywl)
	function Renderlogin(){
		if(checklogin){
			return(
					<li onClick={Logout}><Link><i class="fa fa-lock"></i>Logout</Link></li>
			)		
		}
		else{
			return(
					<li><Link to='member/index'><i class="fa fa-lock"></i>Login</Link></li>
			)
		}
			
	}
	function Logout(){
		alert('Đã logout')
		localStorage.removeItem('login')
		localStorage.removeItem('dataAuth')
		navigate('member/index')
	}
	function handleAccount(){
		if(!checklogin){
			alert("Bạn chưa đăng nhập")
			navigate('member/index')
			
		}
		else{
			navigate('account/index')
		}	
	}
    return(
    <div>
      <header id="header">
		<div class="header_top">
			<div class="container">
				<div class="row">
					<div class="col-sm-6 ">
						<div class="contactinfo">
							<ul class="nav nav-pills">
								<li><a href=""><i class="fa fa-phone"></i> +2 95 01 88 821</a></li>
								<li><a href=""><i class="fa fa-envelope"></i> info@domain.com</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-6">
						<div class="social-icons pull-right">
							<ul class="nav navbar-nav">
								<li><a href=""><i class="fa fa-facebook"></i></a></li>
								<li><a href=""><i class="fa fa-twitter"></i></a></li>
								<li><a href=""><i class="fa fa-linkedin"></i></a></li>
								<li><a href=""><i class="fa fa-dribbble"></i></a></li>
								<li><a href=""><i class="fa fa-google-plus"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="header-middle">
			<div class="container">
				<div class="row">
					<div class="col-md-4 clearfix">
						<div class="logo pull-left">
							<a href="index.html"><img src="images/home/logo.png" alt="" /></a>
						</div>
						<div class="btn-group pull-right clearfix">
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
									USA
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
									<li><a href="">Canada</a></li>
									<li><a href="">UK</a></li>
								</ul>
							</div>
							
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
									DOLLAR
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
									<li><a href="">Canadian Dollar</a></li>
									<li><a href="">Pound</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-8 clearfix">
						<div class="shop-menu clearfix pull-right">
							<ul class="nav navbar-nav">
							<li onClick={handleAccount}><Link><i className="fa fa-user"/> Account</Link></li>
								<li><a><Link to='whishlist'><i class="fa fa-star"></i> Wishlist {user.qtywl}</Link></a></li>
								<li><a href="cart.html"><i class="fa fa-crosshairs"></i> Checkout</a></li>
								<li><Link to='mycart'><a><i class="fa fa-shopping-cart"></i> Cart {user.qtycart}</a></Link></li>
								{Renderlogin()}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<div class="header-bottom">
			<div class="container">
				<div class="row">
					<div class="col-sm-9">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
						</div>
						<div class="mainmenu pull-left">
							<ul class="nav navbar-nav collapse navbar-collapse">
								<li><Link to='/home'><a>Home</a></Link></li>
								<li class="dropdown"><a href="#" class="active">Shop<i class="fa fa-angle-down"></i></a>
                                    <ul role="menu" class="sub-menu">
                                        <li><a href="shop.html" class="active">Products</a></li>
										<li><a href="product-details.html">Product Details</a></li> 
										<li><a href="checkout.html">Checkout</a></li> 
										<li><a href="cart.html">Cart</a></li> 
										<li><a href="login.html">Login</a></li> 
                                    </ul>
                                </li> 
                                
								<li class="dropdown">
                                <Link to='blog/index'>Blog<i class="fa fa-angle-down"></i></Link>

                                    <ul role="menu" class="sub-menu">
                                        <li><a href="blog.html">Blog List</a></li>
										<li><a href="blog-single.html">Blog Single</a></li>
                                    </ul>
                                </li> 
								<li><a href="404.html">404</a></li>
								<li><a href="contact-us.html">Contact</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="search_box pull-right">
							<input type="text" placeholder="Search"/>
						</div>
					</div>
				</div>
				</div>
			</div>
	</header>
      {/* <Slider/> */}
    </div>
    )
}
export default Head