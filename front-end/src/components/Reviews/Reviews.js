import React from "react";
import Axios from "axios";
import "./Reviews.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getUserId, getToken } from '../../services/Token';
const backUrl = require("../../../src/configuration.json").backend_url;


export default class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            user: {
                user_id: 1,
                username: "joitamihnea1999@gmail.com",
                password: "asd"
            },
            placeholderText: "Example: 300",
            starNumber: 1,
            checked: false,
            buttonText: "Add Review",
            addButtonState: false,
            showButtonState: false,
            searchFilter: "",
            filteredReviews: [],
            updatedIndex: -1,
            updatedReviewId: -1
        }
    }

    transportTypeRef = React.createRef();
    transportNameRef = React.createRef();
    leavingPointRef = React.createRef();
    arrivngPointRef = React.createRef();
    durationRef = React.createRef();
    leftHourRef = React.createRef();
    observationsRef = React.createRef();
    congestionLevelRef = React.createRef();


    starClick = (i) => {

        for (let j = 0; j < i; j++) {
            document.getElementById("star" + j).className = "fa fa-star checked";
        }

        for (let j = i; j < 5; j++) {
            document.getElementById("star" + j).className = "fa fa-star";
        }

        this.setState({ starNumber: i });

    }
    updateReview = async (id) => {
        var reviewToUpdate;
        var transportTypeToUpdate;

        await Axios.get(backUrl + '/reviews/' + id).then(res => reviewToUpdate = res.data);
        await Axios.get(backUrl + '/transport-type/' + reviewToUpdate.transportTypeId).then(res => transportTypeToUpdate = res.data);
        this.leavingPointRef.current.value = reviewToUpdate.leaving_point;
        this.arrivngPointRef.current.value = reviewToUpdate.arriving_point;
        this.transportNameRef.current.value = transportTypeToUpdate.name;
        this.transportTypeRef.current.value = transportTypeToUpdate.type;
        this.leftHourRef.current.value = reviewToUpdate.leaving_hour;
        this.durationRef.current.value = reviewToUpdate.duration;
        this.congestionLevelRef.current.value = reviewToUpdate.congestion_level;
        this.observationsRef.current.value = reviewToUpdate.observations;
        this.starClick(parseInt(reviewToUpdate.rating));
        var index = this.state.reviews.indexOf(reviewToUpdate);
        console.log("index" + index);
        this.setState({ buttonText: "Update review", updatedIndex: index, updatedReviewId: id });



    }
    handleSubmit = async (event) => {
        event.preventDefault();
        var transportType = {
            name: this.transportNameRef.current.value,
            type: this.transportTypeRef.current.value
        }
        var transportTypeDb;
        await Axios.post(backUrl + "/transport-type", transportType).then(res => {
            transportTypeDb = res.data;
            console.log(transportTypeDb)
        }
        )

        var review = {
            leaving_point: String(this.leavingPointRef.current.value),
            arriving_point: String(this.arrivngPointRef.current.value),
            leaving_hour: String(this.leftHourRef.current.value),
            duration: parseInt(this.durationRef.current.value),
            observations: String(this.observationsRef.current.value),
            rating: String(this.state.starNumber),
            congestion_level: parseInt(this.congestionLevelRef.current.value),
            userId: parseInt(getUserId()),
            transportTypeId: parseInt(transportTypeDb.id),

        }

        if (this.state.buttonText === "Add review") {

            Axios.post(backUrl + "/reviews", review,
                { headers: { "Authorization": getToken() } }).then(res => {
                    var existingReviews = [...this.state.reviews];
                    existingReviews.push(res.data);
                    console.log(res.data);
                    this.setState({ reviews: existingReviews });
                })
        }
        else {
            Axios.put(backUrl + "/reviews/" + this.state.updatedReviewId, review,
                { headers: { "Authorization": getToken() } }).then(res => {
                    var existingReviews = [...this.state.reviews];
                    existingReviews[this.state.updatedIndex] = res.data;
                    console.log(this.state.updatedIndex);
                    this.setState({ reviews: existingReviews, buttonText: "Add review" });
                })
        }
    }

    handleSelect = () => {
        switch (this.transportTypeRef.current.value) {
            case "Taxi":
                this.setState({ placeholderText: "Example: B-47-ASD" });
                break;
            case "Metrou":
                this.setState({ placeholderText: "Example: M2" });
                break;
            default:
                this.setState({ placeholderText: "Example: 300" });

        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/reviews`)
            .then(res => {
                const reviews = res.data;
                this.setState({ reviews: reviews });
            })
        //document.getElementById("star0").className = "fa fa-star checked"

        Axios.post(`http://localhost:3001/login`, this.state.user)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
            })
            .catch(error => {
                toast(error.response.data.message)
            });
    }

    

    handleInputChange = (event) =>{
        let myReviews = this.state.reviews
        myReviews = myReviews.filter(review => review.leaving_point === event.target.value )
        event.preventDefault()
        console.log(event.target.searchFilter)
        console.log(event.target.value)
        
            this.setState({
                searchFilter : event.target.value,
                filteredReviews: myReviews
            })

    }

    PressAddReview = () => {
        this.setState( {addButtonState : !this.state.addButtonState})
        this.setState( {showButtonState: false })
    }

    PressShowReview = () => {
        this.setState( {showButtonState : !this.state.showButtonState})
        this.setState( {addButtonState: false })
    }

    render() {
        return <>
        <button onClick = {this.PressAddReview}>Add Review</button>
        <button onClick = {this.PressShowReview}>Show Reviewes</button>
        {this.state.addButtonState === true ? <form className="form-container" onSubmit={this.handleSubmit}>
                <label>Select the transport type</label>
                <select className="form-control" ref={this.transportTypeRef} onChange={this.handleSelect}>
                    <option value="STB">STB</option>
                    <option value="Taxi">Taxi</option>
                    <option value="Metrou">Metrou</option>
                </select>
                <label>Transport name</label>
                <input type="text" className="transportNamebox" ref={this.transportNameRef} placeholder={this.state.placeholderText}></input>
                <input type="text" className="transportNamebox" ref={this.leavingPointRef} placeholder="Punct de plecare"></input>
                <input type="text" className="transportNamebox" ref={this.arrivngPointRef} placeholder="Punct de sosire"></input>
                <label>Leaving Hour</label>
                <input type="time" className="numberInput" ref={this.leftHourRef} required></input>
                <input type="text" className="durationInput" ref={this.durationRef} placeholder="Time in minutes" required></input>
                <label>Grad de aglomerare</label>
                <input type="number" className="numberInput" ref={this.congestionLevelRef} min={1} max={10} placeholder="1 - 10" required></input>
                <label>Observatii</label>
                <textarea ref={this.observationsRef} className="textarea"></textarea>
                <label>Rating</label>
                <div className="ratingBar">
                    <span id={"star0"} onClick={() => this.starClick(1)} className="fa fa-star" ></span>
                    <span id={'star1'} onClick={() => this.starClick(2)} className="fa fa-star"></span>
                    <span id={'star2'} onClick={() => this.starClick(3)} className="fa fa-star"></span>
                    <span id={'star3'} onClick={() => this.starClick(4)} className="fa fa-star"></span>
                    <span id={'star4'} onClick={() => this.starClick(5)} className="fa fa-star"></span>
                </div>
                <button className="submit-button" type="submit">{this.state.buttonText}</button>
            </form> : null}
   
            {this.state.showButtonState === true ? 
            <form>
                <div className="lander">

                <label>Search By Leaving Point</label>
                
                <input type="text" placeholder="Leaving Point" name="searchFilter" onInput={this.handleInputChange}></input>

                {this.state.reviews.map(review => <div key={review.id} className="feedbackContainer" onClick={() => this.updateReview(review.id)}>

                {this.state.searchFilter.length > 0 ? 

                this.state.filteredReviews.map(review => 
                    <table border="1">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Leaving Point</th>
                            <th>Arriving Point</th>
                            <th>Leaving Hour</th>
                            <th>Travel Duration</th>
                            <th>Congestion Level</th>
                            <th>Observations</th>
                            <th>Rating</th>
                        </tr>
                        <tr>
                            <td>{review.transportTypeId}</td>
                            <td>{review.leaving_point}</td>
                            <td>{review.arriving_point}</td>
                            <td>{review.leaving_hour}</td>
                            <td>{review.duration}</td>
                            <td>{review.congestion_level}</td>
                            <td>{review.observations}</td>
                            <td>{review.rating}</td>
                        </tr>
                    </tbody>   
                 </table>
                ): null } 



                </div>)}
            </div>
            </form> : null}

           
             
           
       
        </>
    }
}