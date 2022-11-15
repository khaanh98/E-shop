import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";

function Index (){
    const [data,setData] = useState([]);
        useEffect(() =>{
            axios.get("http://localhost/laravel/laravel/public/api/blog")
            .then(res=>{
                setData(res.data.blog.data)
				console.log(res.data.blog.data)
            })
            .catch(error=> console.log(error))
        },[])
        function Datarender() {
            if (Object.keys(data).length > 0) {
                return Object.keys(data).map((key, index) => {
                    return (
                        <div className="single-blog-post" key={index}>
                            <h3>{data[key].title}</h3>
                            <div className="post-meta">
                                <ul>
                                    <li><i class="fa fa-user"></i> Mac Doe</li>
                                    <li><i class="fa fa-clock-o"></i> {data[key].updated_at}</li>
                                    <li><i class="fa fa-calendar"></i> {data[key].updated_at}</li>
                                </ul>
                                <span>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star-half-o"></i>
                                </span>
                            </div>
                            <Link to=''>
                                <img src={"http://localhost/laravel/laravel/public/upload/blog/image/"+ data[key].image} alt="" />
                            </Link>
    
                            <p>{data[key].description}</p>
                            {/* <p onClick={()=>navigate(`/blog/detail/${data[key].id}`,{state:{id:data[key].id}})}>read more</p> */}
                            <Link className="btn btn-primary" to={"/blog/detail/" + data[key].id}>Read More</Link>
                        </div>
    
                    )
                })
            }
        }
    return(
        <div className="col-sm-9">
        <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>
            {Datarender()}
            
            <div className="pagination-area">
                <ul className="pagination">
                    <li><a href="" class="active">1</a></li>
                    <li><a href="">2</a></li>
                    <li><a href="">3</a></li>
                    <li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
    )
}
export default Index