import React from 'react'
import { Redirect } from 'react-router-dom'
import { history } from '../../App'
import { TOKEN } from '../../util/setting.js/config'

export default function Checkout() {
  if (!localStorage.getItem(TOKEN)){
     return <Redirect to="/login"></Redirect> // dung redirect moi co the dung history.goBack()
  }
  return (
    <div>Checkout</div>
  )
}
