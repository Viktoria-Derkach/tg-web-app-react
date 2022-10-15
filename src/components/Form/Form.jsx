import React, { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram';
import './Form.css'

const Form = () => {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState('physical');
  const {tg} = useTelegram();

  const onSendData = useCallback(() => {
      const data = {
          country,
          street,
          subject
      }
      tg.sendData(JSON.stringify(data));
  }, [country, street, subject, tg])

  useEffect(() => {
      tg.onEvent('mainButtonClicked', onSendData)
      return () => {
          tg.offEvent('mainButtonClicked', onSendData)
      }
  }, [onSendData, tg])

  useEffect(() => {
      tg.MainButton.setParams({
          text: 'Send data'
      })
  }, [tg.MainButton])

  useEffect(() => {
      if(!street || !country) {
          tg.MainButton.hide();
      } else {
          tg.MainButton.show();
      }
  }, [country, street, tg.MainButton])

  const onChangeCountry = (e) => {
      setCountry(e.target.value)
  }

  const onChangeStreet = (e) => {
      setStreet(e.target.value)
  }

  const onChangeSubject = (e) => {
    setSubject(e.target.value)
}

  return (
    <div className={'form'}>
        <h3>Fill in the form</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Country'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Street'}
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>physical person</option>
                <option value={'legal'}>legal person</option>
            </select>
    </div>
  )
}

export default Form
