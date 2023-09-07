"use strict";
import colorpikerbtn from "../../assets/images/colorpikerbtn.svg";
import style from "./assesment.module.css";
import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
/*
 <div>
      
        <div style={ styles.swatch } onClick={ this.handleClick }>
            <span className={this.props.colorPelletes} style={{background:this.props.selectedColor}} ></span>           
          <img src={colorpikerbtn} alt="colorpikerbtn" className={style.imagesetColorpellete}/>
        </div> 
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.props.selectedColor ? this.props.selectedColor : this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
*/
class SketchColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    },
    hex: "",
  };
  componentDidMount() {
    if (this.props.selectedColor && this.props.selectedColor.includes("rgba")) {
      let colorData = this.props.selectedColor;
      let colorsData = colorData
        .replace("rgba(", "")
        .replace(")", "")
        .split(",");
      //console.log("colorsData",colorsData);
      this.setState({
        color: {
          r: colorsData[0],
          g: colorsData[1],
          b: colorsData[2],
          a: parseFloat(colorsData[3]),
        },
      });
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  /*handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.setState({ color: color.rgb, hex: color.hex });
    this.props.setSelectedColor(
      `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`
    );
  };
*/

  handleChange = (color) => {
    //alert('color' + color);
    const updatedColor = color.rgb;
    this.setState({ color: updatedColor }, () => {
      this.props.setSelectedColor(
        `rgba(${updatedColor.r}, ${updatedColor.g}, ${updatedColor.b}, ${updatedColor.a})`
      );
    });
  };
  

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "150px",
          height: "30px",
          borderRadius: "2px",
          background: this.props.selectedColor
            ? this.props.selectedColor
            : `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: "0px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });
    //console.log("this.props.selectedColor",this.props.selectedColor)
    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default SketchColorPicker;
