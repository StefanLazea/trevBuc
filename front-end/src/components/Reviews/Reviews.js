import React from "react";
import Axios from "axios";
import "./Reviews.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getUserId } from '../../services/Token';



export default class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            user: {
                user_id: 1,
                username: "lazeastefan@gmail.com",
                password: "test123123"
            },
            placeholderText: "Example: 300",
            starNumber: 1,
            checked: false

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

    handleSubmit = async (event) => {
        event.preventDefault();
        var transportType = {
            name: this.transportNameRef.current.value,
            type: this.transportTypeRef.current.value
        }
        var transportTypeDb;


        await Axios.post("http://localhost:3000/transport-type", transportType).then(res => {
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
            userId: parseInt(this.state.user.user_id),
            transportTypeId: parseInt(transportTypeDb.id),
        }
        console.log(review);

        Axios.post("http://localhost:3000/reviews", review).then(res => {
            toast("Review done");
        })
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
        console.log(getUserId());
        Axios.get(`http://localhost:3000/reviews`)
            .then(res => {
                const reviews = res.data;
                this.setState({ reviews: reviews });
            })
        document.getElementById("star0").className = "fa fa-star checked"

        Axios.post(`http://localhost:3000/login`, this.state.user)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
            })
            .catch(error => {
                toast(error.response.data.message)
            });
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
                <button className="submit-button" type="submit"> Add review</button>
            </form>
            <div className="lander">

                {this.state.reviews.map(review => <div key={review.id}>

                    {review.leaving_point}  </div>)}

            </div>
        </>
    }
}