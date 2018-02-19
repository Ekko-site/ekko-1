import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './src/boutique/js/layout'

import FBData from './mock/1473863586167236-Boston Tea Party Cheltenham.json'

const doc = {
    data: FBData
}

ReactDOM.render(
    <Layout doc={doc} />,
    document.getElementById('root')
)
