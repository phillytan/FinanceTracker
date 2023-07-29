import { useEffect, useState } from "react"
import { getRate } from "../../utils/currency"
import { roundToTwoDecimals } from "../../utils/math";

const ForeignTransactionIndicator = ({ currency, value, date }) => {
  const [cadValue, setCADValue] = useState(0)
  useEffect(() => {
    getRate(currency, date).then(setCADValue)
  }, [currency, date])
  return `CAD ${roundToTwoDecimals(cadValue * value)}`;
}

export default ForeignTransactionIndicator
