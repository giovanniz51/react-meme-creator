import React from 'react';
import "bulma/css/bulma.css"
import axios from "axios"

class App extends React.Component {
  state = {
    images: [],
    selectedImg: "",
    text: ["", ""],
    colors: ["#001f3f", "#0074D9", "#FF4136", "#FFDC00"],
    color: "#fff"
  }
  
  
  async componentDidMount(){
    const data = await axios.get("https://api.imgflip.com/get_memes")
    this.setState({images: data.data.data.memes.slice(10)})
  }
  
  handleMemeChange = (e) => {
    const img = this.state.images.find(i => i.name == e.target.value)
    this.setState({selectedImg: img.url})
  }
  
  handleTextChange = (e, i) => {
    const text = [...this.state.text]
    text[i] = e.target.value
    this.setState({text})
  }
  
  handleChangeColor = (color) => {
    this.setState({color})
  }
  
  render = () => (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div class="card" style={{width: 500, margin: "0 auto", position: "relative", top: "10%"}}>
            <div class="card-image">
              <figure class="image is-4by3">
                <img src={this.state.selectedImg || "https://bulma.io/images/placeholders/1280x960.png" } alt="Placeholder image" />
              </figure>
              <p style={{left: "35%",fontSize: 40, fontWeight: 900, position: "absolute", bottom: "10%", color: this.state.color}}>{this.state.text[1]}</p>
              <p style={{left: "35%",fontSize: 40, fontWeight: 900, position: "absolute", top: "5%", color: this.state.color}}>{this.state.text[0]}</p>
            </div>
            <div class="card-content">
              <div class="content">
               <div class="control" style={{margin: "10px 0"}}>
                  <div class="select">
                    <select onChange={this.handleMemeChange}>
                      {this.state.images.map(i => <option>{i.name}</option>)}
                    </select>
                  </div>
                  <div class="control" style={{margin: "10px 0"}}>
                    {this.state.text.map((t,i) => <input onChange={(e) => this.handleTextChange(e, i)} class="input" type="text" placeholder={"text " + (i+1)} />)}
                  </div>
                  <div className="columns is-mobile">
                    {this.state.colors.map(c => (
                      <div className="column is-2">
                        <div className="color" onClick={() => this.handleChangeColor(c)} style={{width: 50, height: 50, background: c }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}


export default App;
