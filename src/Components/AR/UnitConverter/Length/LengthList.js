import React from "react";
import SharedHelmet from "../Helmet";

const TITLE = "تحويل الوحدات - أداة شاملة لتحويل كافة الوحدات بدقة";

const DESCRIPTION = "حوّل بين مختلف الوحدات بسهولة باستخدام أداة تحويل الوحدات الشاملة. توفر دقة وسرعة في تحويل القياسات من وحدات مختلفة، مما يجعلها مثالية لجميع احتياجات القياس.";

const KEYWORDS = "تحويل الوحدات, محول الوحدات, حاسبة تحويل الوحدات, أدوات قياس, تحويل قياسات";
const OG_URL = "https://do-calculate.com/calculator/ar/unit_converter/length/";

const lengthParameters = {
  m: "متر", //
  km: "كيلومتر",//
  cm: "سنتيمتر",//
  mm: "ميليمتر",//
  mcm: "مايكرومتر",//
  nm: "نانومتر",//
  mile: "ميل",//
  yard: "ياردة",//
  foot: "قدم",//
  inch: "بوصة",//
  lightyear: "سنة ضوئية",//
};


const lengths = Object.keys(lengthParameters);


function UnitsList() {
  const renderTable = (parameters, parameterNames) => (
    <table className="bmi-table">
      <thead>
        <tr>
          <th className="bmi-header">من الوحدة</th>
          <th className="bmi-header">إلى الوحدة</th>
          <th className="bmi-header">رابط الحاسبة</th>
        </tr>
      </thead>
      <tbody>
        {parameters.map((fromParams) =>
          parameters.map((toParams) => {
            if (fromParams !== toParams) {
              const url = `/calculator/ar/unit_converter/length/${fromParams}/${toParams}/`;
              return (
                <tr key={`${fromParams}-${toParams}`}>
                  <td>{parameterNames[fromParams]}</td>
                  <td>{parameterNames[toParams]}</td>
                  <td>
                    <a href={url}>
                      تحويل من  {parameterNames[fromParams]} إلى{" "}
                      {parameterNames[toParams]}
                    </a>
                  </td>
                </tr>
              );
            }
            return null;
          })
        )}
      </tbody>
    </table>
  );

  return (
    <div>
      <div className="container rtl-container">
        <SharedHelmet
          TITLE={TITLE}
          DESCRIPTION={DESCRIPTION}
          KEYWORDS={KEYWORDS}
          OG_URL={OG_URL}
        />
        <div>
          <h1 style={{ fontSize: "26px" }}>{TITLE}</h1>
          <hr />
          <div className="alert alert-secondary" role="alert">
            <p>{DESCRIPTION}</p>
          </div>
      
        </div>
        <hr />
        <h2>الطول</h2>
        {renderTable(lengths, lengthParameters)}
        <br />
      </div>
    </div>
  );
}

export default UnitsList;
