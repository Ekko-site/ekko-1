import React from 'react'

const style = {
  footer: {
    borderColor: 'rgba(0,0,0,0.1)'
  }
}

const fbIcon = <svg className="fb-icon" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="23px" height="19px" viewBox="0 0 60.734 60.733" style={{
fill: '#3B5998'
}} xmlspace="preserve">
<g style={{
fill: '#3B5998'
}}>
      <path d="M57.378,0.001H3.352C1.502,0.001,0,1.5,0,3.353v54.026c0,1.853,1.502,3.354,3.352,3.354h29.086V37.214h-7.914v-9.167h7.914   v-6.76c0-7.843,4.789-12.116,11.787-12.116c3.355,0,6.232,0.251,7.071,0.36v8.198l-4.854,0.002c-3.805,0-4.539,1.809-4.539,4.462   v5.851h9.078l-1.187,9.166h-7.892v23.52h15.475c1.852,0,3.355-1.503,3.355-3.351V3.351C60.731,1.5,59.23,0.001,57.378,0.001z" style={{
fill: '#3B5998'
}} />
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
    <g style={{
fill: '#3B5998'
}}>
    </g>
      </svg>

export default ({about, facebook}) => {
  return (
    <div style={style.footer} className="max-width-4 mx-auto p2 border-top mt4">
        <p className="inline-block">{about} <a className="align-middle" href={`https://facebook.com/${facebook}`}>{ fbIcon }</a>
        </p>
        <p className="right">{new Date().getFullYear()}</p>
    </div>
  )
}
