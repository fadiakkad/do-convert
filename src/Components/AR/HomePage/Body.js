import React from 'react'
import "./Style.css"
const cardData=[
    {
        cardNumber: 1,
        cardTitle: " حاسبة الطول",
        cardItems: "حساب الطول",
        calculatorUrl: "/ar/length/",
      },
      {
        cardNumber: 2,
        cardTitle: " حاسبة الطول",
        cardItems: "حساب الطول",
        calculatorUrl: "/ar/length/",
      },
      {
        cardNumber: 3,
        cardTitle: " حاسبة الطول",
        cardItems: "حساب الطول",
        calculatorUrl: "/ar/length/",
      },
      {
        cardNumber: 4,
        cardTitle: " حاسبة الطول",
        cardItems: "حساب الطول",
        calculatorUrl: "/ar/length/",
      },
      {
        cardNumber: 5,
        cardTitle: " حاسبة الطول",
        cardItems: "حساب الطول",
        calculatorUrl: "/ar/length/",
      },
      {
        cardNumber: 6,
        cardTitle: " حاسبة الطول",
        cardItems: "حساب الطول",
        calculatorUrl: "/ar/length/",
      },
      {
        cardNumber: 7,
        cardTitle: " حاسبة الطول",
        cardItems: "حساب الطول",
        calculatorUrl: "/ar/length/",
      },
]
export default function Body() {
  return (
    <div>
      <div style={{backgroundColor:"#0d2cfd12",
        width:"100%",
        height:"172px",
        marginTop: "-25px",
      }}></div>
    <div className='mt-5 container d-flex justify-content-center gap-5 flex-wrap'>
     {cardData.map((box,index)=>(
        <div key={index} style={{
          border:"1px solid gray",
          color:"blueviolet",
          borderRadius:"10px",
          padding:"30px",
          cursor:"pointer",
          boxShadow:"0 12px 20px 0 rgb(0 0 0 / 13%), 0 2px 4px 0 rgb(0 0 0 / 12%)"
        }}
        className='box'>
               <a href={box.calculatorUrl}
                style={{
                fontSize:"24px",
                textDecoration:"none",
               }}>{box.cardTitle}</a>
               <p style={{textAlign: "center"}}>{box.cardItems}</p>
        </div>
     ))}
    </div>
    </div>
  )
}
