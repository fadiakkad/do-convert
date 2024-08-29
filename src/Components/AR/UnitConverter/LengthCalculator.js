import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SharedHelmet from "../Helmet";
import RelatedLinks from "../RelatedLinks";
import { FirstAds, SecondAds, ThirdAds, ForthAds } from "../../Ads";
import Timer from "../../Timer";
import MainCalculatorsList from "./MainCalculators";
import SocialMedia from "../../SoicalMedia";

const unitTranslations = {
  m: "متر",
  km: "كيلومتر",
  cm: "سنتيمتر",
  mm: "ميليمتر",
  μm: "مايكرومتر",
  nm: "نانو متر",
  inch: "بوصة",
  foot: "قدم",
  yard: "ياردة",
  lightyear: "سنة ضوئية",
  mile: "ميل",
};

const conversionRates = {
  m: {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    μm: 1e6,
    nm: 1e9,
    inch: 39.3701,
    foot: 3.28084,
    yard: 1.09361,
    lightyear: 1.057e-16,
    mile: 0.000621371,
  },
  km: {
    m: 1000,
    km: 1,
    cm: 100000,
    mm: 1e6,
    μm: 1e9,
    nm: 1e12,
    inch: 39370.1,
    foot: 3280.84,
    yard: 1093.61,
    lightyear: 1.057e-13,
    mile: 0.621371,
  },
  cm: {
    m: 0.01,
    km: 1e-5,
    cm: 1,
    mm: 10,
    μm: 10000,
    nm: 1e7,
    inch: 0.393701,
    foot: 0.0328084,
    yard: 0.0109361,
    lightyear: 1.057e-18,
    mile: 6.2137e-6,
  },
  mm: {
    m: 0.001,
    km: 1e-6,
    cm: 0.1,
    mm: 1,
    μm: 1000,
    nm: 1e6,
    inch: 0.0393701,
    foot: 0.00328084,
    yard: 0.00109361,
    lightyear: 1.057e-19,
    mile: 6.2137e-7,
  },
  μm: {
    m: 1e-6,
    km: 1e-9,
    cm: 1e-4,
    mm: 0.001,
    μm: 1,
    nm: 1000,
    inch: 3.93701e-5,
    foot: 3.28084e-6,
    yard: 1.09361e-6,
    lightyear: 1.057e-22,
    mile: 6.2137e-10,
  },
  nm: {
    m: 1e-9,
    km: 1e-12,
    cm: 1e-7,
    mm: 1e-6,
    μm: 0.001,
    nm: 1,
    inch: 3.93701e-8,
    foot: 3.28084e-9,
    yard: 1.09361e-9,
    lightyear: 1.057e-25,
    mile: 6.2137e-13,
  },
  inch: {
    m: 0.0254,
    km: 2.54e-5,
    cm: 2.54,
    mm: 25.4,
    μm: 25400,
    nm: 2.54e7,
    inch: 1,
    foot: 0.0833333,
    yard: 0.0277778,
    lightyear: 2.68478e-18,
    mile: 1.5783e-5,
  },
  foot: {
    m: 0.3048,
    km: 0.0003048,
    cm: 30.48,
    mm: 304.8,
    μm: 304800,
    nm: 3.048e8,
    inch: 12,
    foot: 1,
    yard: 0.333333,
    lightyear: 3.22174e-17,
    mile: 0.000189394,
  },
  yard: {
    m: 0.9144,
    km: 0.0009144,
    cm: 91.44,
    mm: 914.4,
    μm: 914400,
    nm: 9.144e8,
    inch: 36,
    foot: 3,
    yard: 1,
    lightyear: 9.66522e-17,
    mile: 0.000568182,
  },
  lightyear: {
    m: 9.461e15,
    km: 9.461e12,
    cm: 9.461e17,
    mm: 9.461e18,
    μm: 9.461e21,
    nm: 9.461e24,
    inch: 3.72477e17,
    foot: 3.10397e16,
    yard: 1.03466e16,
    lightyear: 1,
    mile: 5.87863e12,
  },
  mile: {
    m: 1609.34,
    km: 1.60934,
    cm: 160934,
    mm: 1.609e6,
    μm: 1.609e9,
    nm: 1.609e12,
    inch: 63360,
    foot: 5280,
    yard: 1760,
    lightyear: 1.70108e-13,
    mile: 1,
  },
};

function LengthCalculator() {
  const { fromLengthUnit, toLengthUnit } = useParams();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rate, setRate] = useState(null);
  const [storedAmount, setStoredAmount] = useState("");
  const [showTimer, setShowTimer] = useState(false);

  const translatedFromUnit = unitTranslations[fromLengthUnit] || fromLengthUnit;
  const translatedToUnit = unitTranslations[toLengthUnit] || toLengthUnit;

  const TITLE = `حاسبة تحويل من ${translatedFromUnit} إلى ${translatedToUnit} - حول من ${translatedFromUnit} إلى ${translatedToUnit}`;
  const DESCRIPTION = `استخدم محول الوحدات المتقدم لدينا لتحويل دقيق بين ${translatedFromUnit} و${translatedToUnit}. قم بحساب وتحويل كميات ${translatedFromUnit} إلى ${translatedToUnit} بسرعة وسهولة باستخدام أدوات التحويل الفعالة لدينا. مثالي لتحويل الوحدات في الحسابات اليومية والاحترافية.`;
  const KEYWORDS = `تحويل وحدات, ${translatedFromUnit} إلى ${translatedToUnit}, ${fromLengthUnit} إلى ${toLengthUnit}, محول وحدات, أدوات تحويل`;
  const OG_URL = `https://do-calculate.com/calculator/ar/unit_converter/length/${fromLengthUnit}/${toLengthUnit}`;

  useEffect(() => {
    if (
      conversionRates[fromLengthUnit] &&
      conversionRates[fromLengthUnit][toLengthUnit]
    ) {
      setRate(conversionRates[fromLengthUnit][toLengthUnit]);
    } else {
      setRate(null);
    }
  }, [fromLengthUnit, toLengthUnit]);

  const handleCalculate = () => {
    setShowTimer(true);
    if (amount && rate) {
      setStoredAmount(amount);
      setConvertedAmount(amount * rate);
    } else {
      setConvertedAmount("0");
    }
  };

  const amounts = [1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
  amounts.sort((a, b) => a - b);

  const conversionTable = amounts.map((a) => ({
    fromAmount: a,
    toAmount: rate ? a * rate : "0",
  }));

  return (
    <Container className="rtl">
      <SharedHelmet
        TITLE={TITLE}
        DESCRIPTION={DESCRIPTION}
        KEYWORDS={KEYWORDS}
        OG_URL={OG_URL}
      />
      <Row>
        <Col xs={12} md={8}>
          <FirstAds />
        </Col>
        <Col xs={12} md={4} className="text-center"></Col>
      </Row>
      <Row>
        <Col xs={12} md={8}>
          <br />
          <div
            className="bg-success text-white text-center"
            style={{ height: "50px" }}
          >
            <h1 style={{ fontSize: "17px" }}>{TITLE}</h1>
          </div>
          <div className="border border-light">
            <Row>
                 <div>
                <p>
                  مرحبًا بك في أداة <strong>تحويل الوحدات</strong> الرائدة لدينا! مع <strong>محول الوحدات</strong> هذا، يمكنك بسهولة تحويل الوحدات من <strong>{translatedFromUnit}</strong> إلى <strong>{translatedToUnit}</strong> والعكس. هل تحتاج إلى <strong>تحويل {translatedFromUnit} إلى {translatedToUnit}</strong>؟ أو ربما <strong>تحويل {translatedToUnit} إلى {translatedFromUnit}</strong>؟ هذه الأداة توفر لك الحل المثالي. استخدم <strong>محول الوحدات</strong> لتحويل مقادير <strong>{translatedFromUnit}</strong> إلى <strong>{translatedToUnit}</strong> بدقة وسرعة، أو العكس، لتحصل على النتائج التي تحتاجها. سواء كنت بحاجة إلى <strong>تحويل {translatedFromUnit}</strong> إلى <strong>{translatedToUnit}</strong> لأغراض مختلفة، فمحول الوحدات هذا هو الأداة المثالية لذلك.
                </p>
                <hr />
              </div>
            </Row>
            <Row>
              <Col sm={12} md={7} className="calcualtorStyle">
                <div className="p-3 mb-2 bg-success text-white">
                  <h2 style={{ fontSize: "16px" }}>
                    {translatedFromUnit} إلى {translatedToUnit}
                  </h2>
                </div>
                <hr />
                <div dir="rtl">
                  <div>
                    <div className="alert alert-info">
                      <b>1 </b> {translatedFromUnit} يساوي <b>{rate}</b>{" "}
                      {translatedToUnit}
                      <br />
                    </div>
                    <hr />
                    <div
                      className="form-group d-flex align-items-center"
                      htmlFor="amount"
                    >
                      <b>
                        <label className="form-label ms-2">
                          ادخل القيمة بالـ {translatedFromUnit}
                        </label>
                      </b>
                      <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) =>
                          setAmount(parseFloat(e.target.value) || 0)
                        }
                        placeholder="أدخل القيمة"
                        className="form-control"
                        style={{ width: "75%" }}
                      />
                    </div>
                    <br />
                    <button
                      className="text-white bg-success"
                      style={{ fontSize: "20px", marginLeft: "10px" }}
                      onClick={handleCalculate}
                      disabled={showTimer}
                    >
                      {showTimer ? (
                        <Timer
                          duration={3}
                          onTimeout={() => setShowTimer(false)}
                        />
                      ) : (
                        "احسب"
                      )}
                    </button>
                    <Link
                      to={`/calculator/ar/unit_converter/length/${toLengthUnit}/${fromLengthUnit}/`}
                    >
                      <button
                        className="text-white bg-secondary"
                        style={{ padding: "4px" }}
                      >
                        تحويل من {translatedToUnit} إلى {translatedFromUnit}
                      </button>
                    </Link>
                  </div>
                  <br />
                  {convertedAmount && !showTimer && (
                    <div className="p-3 mb-2 bg-success text-white">
                      <p className="text-white">
                        {storedAmount} {translatedFromUnit} = {convertedAmount}{" "}
                        {translatedToUnit}{" "}
                      </p>
                    </div>
                  )}
                  <hr />
                </div>
              </Col>
              <div>
                <br />
                <p className="alert alert-success">
                  ان كل <b>1 (واحد)</b> {translatedFromUnit} يساوي <b>{rate}</b>{" "}
                  {translatedToUnit} وفيما يلي جدول يظهر السعر لبعض الفئات:
                </p>
                <table className="bmi-table">
                  <thead>
                    <tr>
                      <th className="bmi-header">{translatedFromUnit}</th>
                      <th className="bmi-header">{translatedToUnit}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversionTable.map((entry, index) => (
                      <tr key={index}>
                        <td>
                          {entry.fromAmount} {translatedFromUnit}
                        </td>
                        <td>
                          {entry.toAmount} {translatedToUnit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Row>
            <hr />
            <div>
              <br />
              <SocialMedia shareUrl={OG_URL} />
            </div>
            <Row>
              <RelatedLinks />
              <hr />
            </Row>
          </div>
        </Col>
        <Col>
          <SecondAds />
          <MainCalculatorsList></MainCalculatorsList>
          <br />
          <ThirdAds />
          <br />
        </Col>
      </Row>
      <Row style={{ height: "auto" }}>
        <Col xs={12} md={4}>
          <ForthAds />
        </Col>
      </Row>
      <br />
    </Container>
  );
}

export default LengthCalculator;
