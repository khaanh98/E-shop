import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Listcomment from "./Listcomment";
import Commentblog from "./Commentblog";
import Rate from "./Rate";

function Detail(props){
    let params = useParams();

    const [data,setData] = useState([]);
    const [comment,setComment] = useState([]);
	const [idRely,setIdRely]=useState("");
    useEffect(() =>{
        axios.get("http://localhost/laravel/laravel/public/api/blog/detail/" + params.id)
        .then(res=>{
            setData(res.data.data)
            setComment(res.data.data.comment)
            //console.log(res.data.data)
        })
        .catch(error=> console.log(error))
    },[])
	//
    function Getcmt(datacmt){
        console.log('data new comment', datacmt)
		//let noi = comment.concat(datacmt)
		let noi = [datacmt,...comment]
		setComment(noi)	
    }
	//
    function Idcomment(dataid){
        //console.log("id ne", dataid)
		setIdRely(dataid)
    }
	//
    function Datarender(){
        return(
            <div class="blog-post-area">
				<h2 class="title text-center">Latest From our Blog</h2>
						<div class="single-blog-post">
							<h3>{data.title}</h3>
							<div class="post-meta">
								<ul>
									<li><i class="fa fa-user"></i> Mac Doe</li>
									<li><i class="fa fa-clock-o"></i> {data.created_at}</li>
									<li><i class="fa fa-calendar"></i>{data.updated_at}</li>
								</ul>
								<span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span>
							</div>
							<a href="">
                            <img src={"http://localhost/laravel/laravel/public/upload/blog/image/" + data.image} alt="" />
							</a>
							<p>{data.content}</p>
							<div class="pager-area">
								<ul class="pager pull-right">
									<li><a href="#">Pre</a></li>
									<li><a href="#">Next</a></li>
								</ul>
							</div>
						</div>
					</div>
        )
    }


    return(
        <div class="col-sm-9">
		<div className="blogdetail">
			{Datarender()}
			<Rate/>
            <Listcomment comment ={comment} Idcomment={Idcomment}/>
			<Commentblog Getcmt = {Getcmt} idRely={idRely}/>
		</div>
	</div>
    )
}
export default Detail