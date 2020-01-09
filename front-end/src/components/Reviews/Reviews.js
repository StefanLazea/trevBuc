import React from "react";
import Axios from "axios";
import "./Reviews.css";

export default class Reviews extends React.Component {
    state = {
        reviews: [], 
        user :{
            username: "test",
            password:"test"
        },
        placeholderText : "Example: 300",
        checked: false
        
    }
    starClick1 = () =>{
        this.star1.current.className = "fa fa-star checked";
        this.star2.current.className = "fa fa-star";
        this.star3.current.className = "fa fa-star";
        this.star4.current.className = "fa fa-star";
        this.star5.current.className = "fa fa-star";
    }

    starClick2 = () => {
        this.star1.current.className = "fa fa-star checked";
        this.star2.current.className = "fa fa-star checked";
        this.star3.current.className = "fa fa-star";
        this.star4.current.className = "fa fa-star";
        this.star5.current.className = "fa fa-star";
    }

    starClick3 = () => {
        this.star1.current.className = "fa fa-star checked";
        this.star2.current.className = "fa fa-star checked";
        this.star3.current.className = "fa fa-star checked";
        this.star4.current.className = "fa fa-star";
        this.star5.current.className = "fa fa-star";
    }
    
    starClick4 = () => {
        this.star1.current.className = "fa fa-star checked";
        this.star2.current.className = "fa fa-star checked";
        this.star3.current.className = "fa fa-star checked";
        this.star4.current.className = "fa fa-star checked";
        this.star5.current.className = "fa fa-star";
    }

    starClick5 = () => {
        this.star1.current.className = "fa fa-star checked";
        this.star2.current.className = "fa fa-star checked";
        this.star3.current.className = "fa fa-star checked";
        this.star4.current.className = "fa fa-star checked";
        this.star5.current.className = "fa fa-star checked";
    }
    transportTypeRef = React.createRef();
    transportNameRef= React.createRef();
    feedbackRef = React.createRef();
    star1 = React.createRef();
    star2 = React.createRef();
    star3 = React.createRef();
    star4 = React.createRef();
    star5 = React.createRef();


    handleSubmit = (event) => {
      event.preventDefault();
    }


    handleSelect = () => { 
        switch(this.transportTypeRef.current.value)
        {
            case "Taxi" :
                this.setState({placeholderText: "Example: B-47-ASD"});
                break;
                case "Metrou":
                this.setState({placeholderText: "Example: M2"});
                break;
                default:
                this.setState({placeholderText: "Example: 300"});
                    
        }
        // var transportType= {
        //         name : this.selectRef.current.value,
        //         type : this.selectRef.current.value

        // } 
                   
        // Axios.post(`http://localhost:3000/transport-type`,transportType)
        //     .then(res => {
            
        //     })


    }

    componentDidMount() {
        Axios.get(`http://18.188.203.248:3001/reviews`)
            .then(res => {
                const reviews = res.data;
                // console.log(reviews)
                this.setState({ reviews: reviews });
            })
            
        // Axios.post(`http://localhost:3000/login`, this.state.user)
        //     .then(res => {
        //         console.log(res.data.toket);
        //         localStorage.setItem("token", res.data.token);
        //     })
    }

    render() {
        return <>
           <form className="form-container" onSubmit={this.handleSubmit}>
            <label>Select the transport type</label>
            <select className="form-control" ref={this.transportTypeRef} onChange={this.handleSelect}>        
            <option value="STB">STB</option>
            <option value="Taxi">Taxi</option>
            <option value="Metrou">Metrou</option>
            </select>
            <label>Transport name</label>
            <input type="text" className="transportNamebox"  ref={this.transportNameRef} placeholder={this.state.placeholderText}></input>
               
               <label>Feedback</label>
            <textarea ref={this.feedbackRef} className="textarea"></textarea>
            <label>Give a rating from 1 to 5</label>
            <div className="ratingBar">
            <span ref={this.star1} onClick={this.starClick1} className="fa fa-star"></span>   
              <span ref={this.star2} onClick={this.starClick2} className="fa fa-star"></span>
              <span ref={this.star3} onClick={this.starClick3} className="fa fa-star"></span>
              <span ref={this.star4} onClick={this.starClick4} className="fa fa-star"></span>
              <span ref={this.star5} onClick={this.starClick5} className="fa fa-star"></span>
            </div>
            <button className="submit-button" type="submit"> Add review</button>
              </form>

              
              

            
              <div className="lander">
                    <ul>
                        {this.state.reviews.map(review => <li key={review.id}>{review.leaving_point}</li>)}
                    </ul>
                </div>
            </>
    }
}