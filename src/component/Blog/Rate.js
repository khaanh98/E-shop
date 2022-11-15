import axios from "axios";
import { useEffect, useState } from "react"
import StarRatings from "react-star-ratings";
import { Link, useNavigate, useParams } from "react-router-dom";


function Rate(){
	const [rating,setRating] = useState(2);
	const navigate = useNavigate();
    const [slrt,setSlrt] = useState ('');
    const params = useParams();
    //
    function changeRating (newRating) {
		var checklogin = localStorage.getItem('login');
        if(!checklogin){
            alert('Bạn chưa đăng nhập');
			navigate('/member/index');
        } else {
            const dataAuth = JSON.parse(localStorage['dataAuth'])
            let url = 'http://localhost/laravel/laravel/public/api/blog/rate/' + params.id
				let accessToken = dataAuth.success.token;
				let config = { 
					headers: { 
					'Authorization': 'Bearer '+ accessToken,
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
					} 
				};
                const formData = new FormData();
					formData.append('blog_id',params.id);
					formData.append('user_id',dataAuth.Auth.id);	
					formData.append('rate',newRating);
				axios.post(url,formData,config)
                .then(response=>{
                        console.log(response.data)
                        alert(response.data.message)
                })
        }

    }
    //
    useEffect(() => {
        axios.get("http://localhost/laravel/laravel/public/api/blog/rate/"  + params.id)
            .then(res => {
                //console.log('all rate',res.data.data)
                changeRating(res.data.data)
                let sum = 0;
                var tt = 0;
                var x = res.data.data
					var result = Object.keys(x).map((key) => [Number(key), x[key]]);
					Object.keys(x).map((key) => {
						var item = x[key]["rate"] 
						sum += item
					})
					tt = sum / result.length
                    const slrt = result.length
                    // console.log('sl',slrt)
					setRating(tt)
                    setSlrt(result.length)

            })
    }, [])
    
    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li>
                    <StarRatings
                        rating={rating}
                        starRatedColor="#FE980F"
                        changeRating={changeRating}
                        numberOfStars={5}
                        name='rating'
                    />
                </li>
                <li className="color">({slrt} votes)</li>
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li className="color"><link to="#" />Pink <span>/</span></li>
                <li className="color"><link to="#" />T-Shirt <span>/</span></li>
                <li className="color"><link to="#" />Girls</li>
            </ul>
        </div>
      )
      ;}
export default Rate