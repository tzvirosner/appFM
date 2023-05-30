import React from "react";

interface RefinanceType {
    "year of refinance": string,
    "forward year NOI": number,
    "valuation cap rate": number,
    "cost of refinance": number,
    "refinance proceeds": number,
    "repayment of original loan": number
}

export default function RefinanceWillNotWork(props: { refinance: RefinanceType }) {
    const {refinance} = props
    return (
        <div className="center">
            <p>
                Based on a Y
                {refinance["year of refinance"] + 1} NOI of $
                {(refinance["forward year NOI"].toFixed(0))} (forward year NOI is used), a valuation cap rate
                of {refinance["valuation cap rate"].toFixed(2)}% and a closing costs amount of $
                {(-refinance["cost of refinance"].toFixed(0))} the refinance proceeds equate to $
                {(refinance["refinance proceeds"].toFixed(0))}. The balance on the original senior loan at the
                time of the refinance is $
                {(-refinance["repayment of original loan"].toFixed(0))}. Therefore this refinance will not work
                because it does not provide sufficient funds to pay back the original senior loan. For further details
                see below.
            </p>
            <table>
                <tbody>

                <tr>
                    <th colSpan={2}>Refinance Analysis</th>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[0]}
                    </td>
                    <td align="center">Y
                        {Object.values(refinance)[0]}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[1]}
                    </td>
                    <td align="center">$
                        {(Object.values(refinance)[1].toFixed(0))}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[2]}
                    </td>
                    <td align="center">
                        {Object.values(refinance)[2].toFixed(2)}%
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[3]}
                    </td>
                    <td align="center">$
                        {(Object.values(refinance)[3].toFixed(0))}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[4]}
                    </td>
                    <td align="center">
                        {Object.values(refinance)[4].toFixed(2)}%
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[5]}
                    </td>
                    <td align="center">$
                        {(Object.values(refinance)[5].toFixed(0))}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[6]}
                    </td>
                    <td align="center">
                        {Object.values(refinance)[6].toFixed(2)}%
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[7]}
                    </td>
                    <td align="center">$
                        {(Object.values(refinance)[7].toFixed(0))}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[8]}
                    </td>
                    <td align="center">$
                        {(Object.values(refinance)[8].toFixed(0))}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[9]}
                    </td>
                    <td align="center">$
                        {(Object.values(refinance)[9].toFixed(0))}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        {Object.keys(refinance)[10]}
                    </td>
                    <td align="center">$
                        {Object.values(refinance)[10].toFixed(0)}
                    </td>
                </tr>
                </tbody>

            </table>
            <br/>
            <form method="post" action="/refinance_will_not_work">
                <p>Since this refinance will not work, how would you like to proceed?</p>
                <div className="form-check">
                    <input className="form-check-input" name="what_now" type="radio" value="re-enter"/>
                    <label className={"text-white"}>re-enter refinance inputs</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" name="what_now" type="radio" value="cancel"/>
                    <label className={"text-white"}>cancel refinance and continue with analysis</label>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">continue</button>
            </form>
        </div>
    )
}