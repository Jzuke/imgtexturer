import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
import Texturer from './texturer'
import { getCroppedImg, getRotatedImage } from '../utils/canvasUtils'
import { styles } from './styles'
import cropperStyles from './cropper.module.scss'


const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
}

const ImageCropper = ({ classes }) => {
  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [aspectRatio, setAspectRatio] = useState(4 / 3)


  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      // apply rotation if needed
      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      }

      setImageSrc(imageDataUrl)
    }
  }

  return (
    <div className={cropperStyles.pagewrapper}>
      <h1 className={cropperStyles.heading}>ImgTexturer</h1>
      {imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <Typography
            variant="overline"
            classes={{ root: classes.selectLabel }}
          >
            Select an aspect ratio
              </Typography>
          <Select
            labelId="aspect-ratio-label"
            id="aspect-ratio"
            value={aspectRatio}
            className={classes.select}
            onChange={(e) => setAspectRatio(e.target.value)}
          >
            <MenuItem value={4 / 3}>4:3</MenuItem>
            <MenuItem value={16 / 9}>16:9</MenuItem>
            <MenuItem value={1 / 1}>1:1</MenuItem>
          </Select>
          <div className={classes.controls}>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                className={classes.slider}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                Rotation
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                className={classes.slider}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              classes={{ root: classes.button }}
            >
              Show Result
            </Button>
          </div>
          <Texturer img={croppedImage} onClose={onClose} />
        </React.Fragment>
      ) : (
          <>
            <input type="file" name="file" id="file-upload" className={cropperStyles.inputfile} accept="image/*" onChange={onFileChange} />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                color="primary"
                classes={{ root: classes.button }}
                onClick={onFileChange}
              >
                Upload Photo
            </Button>
            </label>
          </>
        )}
    </div>
  )
}

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export default withStyles(styles)(ImageCropper)

