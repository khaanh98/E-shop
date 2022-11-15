import axios from "axios";
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";

function Comment(props){
	const navigate = useNavigate();
	const [comment,setComment] = useState("");
	const [error,setError] = useState("")
	let params = useParams();
	function handleInput(e){
		setComment(e.target.value);
	}
	function Postcomment(){
		var checklogin = localStorage.getItem('login')
		//console.log('check',checklogin)
		if(!checklogin){
			alert('Vui lòng đăng nhập')
			navigate('/member/index')
		}
		else{
			if(comment === '' || comment === undefined){
				setError('Bạn chưa comment')
			} else {
				const dataAuth = JSON.parse(localStorage['dataAuth'])
				let url = 'http://localhost/laravel/laravel/public/api/blog/comment/' + params.id 
				let accessToken = dataAuth.success.token;
				let config = { 
					headers: { 
					'Authorization': 'Bearer '+ accessToken,
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
					} 
				};
				const formData = new FormData();
					formData.append('id_blog',params.id);
					formData.append('id_user',dataAuth.Auth.id);	
					formData.append('id_comment',props.idRely ? props.idRely : 0);
					formData.append('comment',comment);
					formData.append('image_user',dataAuth.Auth.avatar);
					formData.append('name_user',dataAuth.Auth.name);
				axios.post(url,formData,config)
                .then(response=>{
                        console.log(response.data.data)
						props.Getcmt(response.data.data)
                        //props.Getcmt(response.data.data)
                })
			}
		}
	}
    return(
        <div class="replay-box">
						<div class="row">
							<div class="col-sm-12">
								<h2>Leave a replay</h2>						
							<div class="text-area">
						<div class="blank-arrow">
							<label>Your Name</label>
						</div>
						<span>{error}*</span>
						<textarea id="cmt" value={comment} rows="11"onChange={handleInput}></textarea>
						{/* <a class="btn btn-primary" onClick={Postcomment}>post comment</a> */}
						<Link onClick={Postcomment} class="btn btn-primary" to="">post comment</Link>

					</div>
				</div>
			</div>
		</div>
    )
}
export default Comment