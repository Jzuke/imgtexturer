export const styles = theme => ({
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100vw',
    height: '100vh'
  },
  cropContainer: {
    position: 'relative',
    maxWidth: '700px',
    margin: 'auto',
    height: 200,
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
  button: {
    backgroundColor: '#222',
    height: '50px',
    margin: 'auto',
    '&:hover': {
      backgroundColor: '#777'
    }
  },
  controls: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    minWidth: '200px',
    maxWidth: '700px',
    [theme.breakpoints.up('sm')]: {
    },
  },
  sliderContainer: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
  },
  sliderLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    [theme.breakpoints.down('xs')]: {
      minWidth: 65,
    },
  },
  slider: {
    color: 'black',
    padding: '22px 0px',
    marginLeft: 16,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 16px',
    },
  },
  select: {
    margin: 'auto',
    display: 'block',
    width: '100px'
  },
  selectLabel: {
    fontWeight: '600',
    color: 'black',
    display: 'block',
    textAlign: 'center',
    fontSize: '1rem'
  },
  imageUploader: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    border: '1px solid black',
    maxWidth: '700px',
    width: '700px',
    height: '200px',
    margin: 'auto'
  },

  imageInput: {
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1',
  }
})
