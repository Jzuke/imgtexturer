export const styles = theme => ({
    appBar: {
        position: 'relative',
        backgroundColor: '#222',
    },
    spacing: 8,
    flex: {
        flex: 1,
    },
    dialogContainer: {
        maxWidth: '800px',
        minWidth: '315px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    imgContainer: {
        position: 'relative',
        width: 'auto',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        minWidth: '315px',
        marginRight: '20px',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            maxWidth: '400px',
            margin: 'auto 20px',
        }
    },
    controlsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    img: {
        float: 'left',
        maxWidth: '100%',
        maxHeight: '100%',
        mixBlendMode: 'multiply'
    },
    paper: {
        position: 'absolute',
        filter: 'grayscale(100%)',
        width: '100%',
        height: '100%',
        mixBlendMode: 'multiply',
        pointerEvents: 'none'
    },
    saveBtn: {
        marginBottom: '24px',
        backgroundColor: '#222',
        width: '100%',
        '&:hover': {
            backgroundColor: '#777'
        }
    },
    backgroundOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '100',
        mixBlendMode: 'multiply'
    }
})