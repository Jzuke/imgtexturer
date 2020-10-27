import React from 'react'
import grit from '../textures/grit.jpg'
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles'
import { styles } from './textureStyles'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import download from 'downloadjs'
import htmlToImage from 'html-to-image';
import Slider from '@material-ui/core/Slider'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import paper from '../textures/paper.jpg'
import grain from '../textures/grain.png'


const textureOptions = [
  { value: paper, label: 'Paper' },
  { value: grit, label: 'Grit' },
  { value: grain, label: 'Grain' },
];

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class Texturer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.handleSaveImage = this.handleSaveImage.bind(this)
    this.handleAlphaChange = this.handleAlphaChange.bind(this)
  }
  state = {
    open: false,
    color: {
      r: '255',
      g: '255',
      b: '255',
      a: '.5',
    },
    alphaLayer: '1',
    selectedOption: 'none',
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleColorChange = (color) => {
    let colorStr = color.hex
    if (color.rgb.a !== 1) {
      colorStr = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
    }
    this.setState({ color: colorStr })
  }

  handleTextureChange = (e) => {
    this.setState({ selectedOption: e.target.value });
    console.log(this.state.selectedOption)
  }

  handleAlphaChange = (alphaLayer) => {
    console.log(alphaLayer)
    this.setState({ alphaLayer })
  }

  handleSaveImage() {
    const node = this.myRef.current
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        download(dataUrl, 'my-node.png');
      });
  }

  render() {
    const { classes } = this.props
    const { selectedOption, alphaLayer } = this.state

    return (
      <Dialog
        fullScreen
        open={!!this.props.img}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Texturized photo
            </Typography>
          </Toolbar>
        </AppBar> 
        <div className={classes.dialogContainer}>
          <div ref={this.myRef} className={classes.imgContainer}>
            <div className={classes.backgroundOverlay} style={{ backgroundColor: `${this.state.color}` }}></div>
            {selectedOption === 'none' ? <div></div> : <img src={selectedOption} alt="Texture" className={classes.paper} />}
            <img src={this.props.img} alt="Cropped" className={classes.img} style={{ opacity: this.state.alpha }} />
          </div>
        <div className={classes.controlsContainer}>
          <InputLabel id="texture-label">Select a texture</InputLabel>
          <Select
            labelId="texture-select-label"
            id="texture-select"
            value={selectedOption}
            onChange={this.handleTextureChange}
          >
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            <MenuItem value={paper}>Paper</MenuItem>
            <MenuItem value={grit}>Grit</MenuItem>
            <MenuItem value={grain}>Grain</MenuItem>
          </Select>
          <ChromePicker
            color={this.state.color}
            onChangeComplete={this.handleColorChange} />
          <Slider
            value={alphaLayer}
            min={0}
            max={1}
            step={0.05}
            aria-labelledby="Opacity"
            onChange={() => this.handleAlphaChange}
          />
          <Button
            className={classes.saveBtn}
            onClick={this.handleSaveImage}
            variant="contained"
            color="primary"
          >
            Download
            </Button>
        </div>
        </div>
      </Dialog>
    )
  }
}

export default withStyles(styles)(Texturer)
