import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SocialMedia from "../../../Common/SocialMedia";

// قائمة وحدات الطول وعوامل التحويل بالنسبة للمتر
const units = {
  متر: 1,
  كيلومتر: 0.001,
  سنتيمتر: 100,
  ميلمتر: 1000,
  ميل: 0.000621371,
  ياردة: 1.09361,
  قدم: 3.28084,
  بوصة: 39.3701,
};

const LengthConverter = () => {
  const [inputValue, setInputValue] = useState(""); // القيمة المدخلة من قبل المستخدم
  const [inputUnit, setInputUnit] = useState("meter"); // الوحدة المدخلة من قبل المستخدم
  const { fromLengthUnit, toLengthUnit } = useParams();
  // دالة لتحويل الطول المدخل إلى جميع الوحدات
  const convertLength = (value, unit) => {
    const baseValueInMeters = value / units[unit]; // تحويل القيمة المدخلة إلى متر
    const convertedValues = {};

    // تحويل المتر إلى جميع الوحدات الأخرى
    Object.keys(units).forEach((key) => {
      convertedValues[key] = baseValueInMeters * units[key];
    });

    return convertedValues;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUnitChange = (e) => {
    setInputUnit(e.target.value);
  };

  const convertedLengths = convertLength(parseFloat(inputValue) || 0, inputUnit);

  return (
    
    <div style={{direction:"rtl"}}>
      <div style={{width:"100%",height:"40px",backgroundColor:"blue",color:"white"}}>
        <h1 style={{fontSize:"20px",marginRight:"17px",paddingTop:"4px"}}>التحويل</h1>
        </div>
      <h2 style={{marginTop:"26px",marginBottom:"26px",color:"blue"}}>محول وحدات الطول</h2>
      <div style={{backgroundColor:"#4b0e8b2b",width:"fit-content",padding:"20px",borderRadius:"15px"}}>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="أدخل الطول" 
          style={{
            borderRadius:"6px",
            border:"2px solid gray",
            paddingRight:"10px",
            paddingTop:"3px"
          }}
        />
        <select style={{marginRight:"10px",borderRadius:"6px",padding:"3px",border:"2px solid gray"}} value={inputUnit} onChange={handleUnitChange}>
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      <h3 style={{marginTop:"16px",marginBottom:"16px"}}>النتائج المحولة:</h3>
      <table border="1" style={{width:"300px"}}>
        <thead style={{backgroundColor:"#0000ff59",textAlign:"center"}}>
          <tr>
            <th>الوحدة</th>
            <th>القيمة</th>
          </tr>
        </thead>
        <tbody style={{textAlign:"center"}}>
          {Object.keys(convertedLengths).map((unit) => (
            <tr key={unit}>
              <td>{unit}</td>
              <td>{convertedLengths[unit].toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div style={{width:"300px",height:"200px",backgroundColor:"yellow",borderRadius:"15px",position:"absolute",top:"130px",left:"180px"}}></div>
      <Link
                      to={`/${toLengthUnit}/${fromLengthUnit}/`}
                    style={{display:"flex",flexDirection:"column",marginTop:"35px"}}
                    >
                   {Object.keys(convertedLengths).map((unit) => (
            <tr key={unit}>
              <td>التحويل من {inputUnit}إلى {unit}</td>
            </tr>
          ))}
                    </Link>
                    <div style={{marginTop:"30px"}}>
                    <SocialMedia/>
                    </div>
                    
    </div>

  );
};

export default LengthConverter;
