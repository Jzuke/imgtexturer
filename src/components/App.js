
import React from 'react'

import Cropper from './cropper'

import appStyles from './App.module.scss'
import grain from '../textures/grit.jpg'

const App = () => {
  return (
    <div className={appStyles.wrapper}>
      <div className={appStyles.gritbg}> <img className={appStyles.gritimg} src={grain} /></div>
      <Cropper />
    </div>
  );
}


export default App
