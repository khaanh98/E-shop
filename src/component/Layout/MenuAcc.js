import { Link } from "react-router-dom"

function MenuAcc(){
    return(
        <div class="col-sm-3">
    <div class="left-sidebar">
        <h2>Category</h2>
        <div class="panel-group category-products" id="accordian">  
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <Link to='account/index'><a data-toggle="collapse" data-parent="#accordian">
                            <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                            My account
                        </a>
                        </Link>
                    </h4>
                </div>
                
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <Link to='account/myproduct'><a data-toggle="collapse" data-parent="#accordian" href="#mens">
                            <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                            My product
                        </a>
                        </Link>
                    </h4>
                </div>
            </div>
            
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <Link to='account/addproduct'><a data-toggle="collapse" data-parent="#accordian" href="#womens">
                            <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                            Add product
                        </a>
                        </Link>
                    </h4>
                </div>
                <div id="womens" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            <li><a href="#">Fendi</a></li>
                            <li><a href="#">Guess</a></li>
                            <li><a href="#">Valentino</a></li>
                            <li><a href="#">Dior</a></li>
                            <li><a href="#">Versace</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
   
        
        
        
        
    
    </div>
</div>
    )
}
export default MenuAcc