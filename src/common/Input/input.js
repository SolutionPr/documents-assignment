import React from 'react'
import { Input } from 'antd'

const CommonInput = ({ handledata, uniqueKey }) => {

    return (
        <Input key={uniqueKey} type="file" onChange={handledata} placeholder="Upload file" />
    )
}

export default CommonInput