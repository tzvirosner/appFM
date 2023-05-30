import React from "react";

interface OutputProps {
    sdi: {
        sat: any[]
    }
}

export default function Output(props: OutputProps) {
    const {sdi} = props;
    return (
        <>
        <form method="post" action="/output">
            <button type="submit" className="btn btn-primary">go back</button>
        </form>
        <table>
            <tbody>
            <tr>
                <th>year</th>
                <th>month</th>
                <th>balance</th>
                <th>monthly payment</th>
                <th>interest component</th>
                <th>principal component</th>
                <th>cumulative interest</th>
                <th>cumulative principal</th>
                <th>new balance</th>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td align="center">$
                    colSpan={2} {sdi.sat[0][8].toFixed(0)}
                </td>
            </tr>
            {sdi.sat.map((satValue: any, iIndex: number) => {
                if (iIndex > 0) {
                    return satValue.map((j: number, jIndex: number) => {
                        if (jIndex === 0) {
                            return <td align="center" key={jIndex}>Y {j}</td>
                        } else if (jIndex === 1) {
                            return <td align="center" key={jIndex}>M {j}</td>
                        } else {
                            return <td align="center" key={jIndex}>$ {j.toFixed(0)} </td>

                        }
                    })
                }
            })
            }
            </tbody>
        </table>
    <form method="post" action="/output">
        <button type="submit" className="btn btn-primary">go back</button>
    </form>
</>
)
}