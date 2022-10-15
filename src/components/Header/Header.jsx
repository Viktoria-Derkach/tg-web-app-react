import React from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import Button from '../Button/Button'

const Header = () => {
  const {onClose, username} = useTelegram();

  return (
    <div className={'header'}>
      <Button onClick={onClose} >Close</Button>
      <span className={'username'}>{username}</span>
    </div>
  )
}

export default Header
