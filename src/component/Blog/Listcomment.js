import axios from "axios";
import React, { useState, useEffect } from "react";


function Listcomponent (props){	
    function Reply(e){
        props.Idcomment(e.target.id)
		//alert(e.target.id)
    }
    function Datarender(){
        var {comment} = props
		//console.log(comment)
        if((comment).length > 0){
            return comment.map((obj,i)=>{
				if(obj.id_comment == 0) {
					return (
						<React.Fragment key={i}>
                        <li className="media">		
								<a className="pull-left" href="#">
									<img className="media-object" src={"http://localhost/laravel/laravel/public/upload/user/avatar/" + obj.image_user} alt=""/>
								</a>
								<div className="media-body">
									<ul className="sinlge-post-meta">
										<li><i className="fa fa-user"></i>{obj.name_user}</li>
										<li><i className="fa fa-clock-o"></i>{obj.created_at}</li>
										<li><i className="fa fa-calendar"></i>{obj.updated_at}</li>
									</ul>
									<p>{obj.comment}</p>
									<a className="btn btn-primary" id={obj.id} onClick={Reply} href="#cmt" ><i className="fa fa-reply"></i>Replay</a>
								</div>
						</li>
						{comment.map((obj2,j)=>{
							if(obj.id == obj2.id_comment){
								return(
									<li key={j} index={j} className="media second-media">
								<a className="pull-left" href="#">
									<img className="media-object" src={"http://localhost/laravel/laravel/public/upload/user/avatar/" + obj2.image_user} alt=""/>
								</a>
								<div className="media-body">
									<ul className="sinlge-post-meta">
										<li><i className="fa fa-user"></i>{obj2.name_user}</li>
										<li><i className="fa fa-clock-o"></i>{obj2.created_at}</li>
										<li><i className="fa fa-calendar"></i>{obj2.updated_at}</li>
									</ul>
									<p>{obj2.comment}</p>
									<a className="btn btn-primary" onClick={Reply} href="#cmt"><i className="fa fa-reply"></i>Replay</a>
								</div>
								{/* <h1>test listcmt</h1> */}
							</li>
								)
							}
						})}
						</React.Fragment>
                	)
				}
                
            })
        }
    }
	
    return(
        <div className="response-area">
				<h2>3 RESPONSES</h2>
                <ul className="media-list">
                {Datarender()}
				</ul>
		</div>
    )
}
export default Listcomponent 