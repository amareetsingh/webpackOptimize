import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import colorpikerbtn from '../../assets/images/colorpikerbtn.svg';
import style from './assesment.module.css';


class SketchColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    colorPelletes: "",
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    hex:''
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
  
    this.setState({ color: color.rgb,hex:color.hex })
    this.props.setSelectedColor(`rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`)    
  };
 
  render() {
  
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          // padding: '5px',
          // background: '#fff',
          // borderRadius: '50px',
          // boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          marginRight: '10px',
          '& .colorPellete': {
            display: 'inline-block',
            background: 'rgb(192, 90, 17)',
            width: '28px',
            height: '28px',
            marginRight: '0px',
            marginBottom: '14px',
            transform: 'scale(1)',
            transition: 'transform 100ms ease 0s',
            borderRadius: '50%',
            position: 'absolute',
          },
        },
        colorPellete: {
          display: 'inline-block',
          background: 'rgb(192, 90, 17)',
          width: '28px',
          height: '28px',
          marginRight: '0px',
          marginBottom: '14px',
          transform: 'scale(1)',
          transition: 'transform 100ms ease 0s',
          borderRadius: '50%',
          position: 'absolute',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
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
    )
  }
}

export default SketchColorPicker