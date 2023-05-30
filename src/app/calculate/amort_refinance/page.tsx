interface AmortRefinanceProps {
    refinance: {
        sat: number[][]
    }
}

export default function AmortRefinance(props: AmortRefinanceProps) {
    const {refinance} = props
    return (
<>
    <form method="post" action="/output">
        <button type="submit" className="btn btn-primary">go back</button>
    </form>
    <table>
        <tbody>
        <tr>
            <th>year of investment</th>
            <th>month of investment</th>
            <th>year of amortization</th>
            <th>month of amortization</th>
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
            <td></td>
            <td></td>
            <td align="center">$
                {refinance.sat[0][10].toFixed(0)}
            </td>
        </tr>
        {
            refinance.sat.map((refinanceSat: number[], refinanceSatIndex: number) => {
                if(refinanceSatIndex > 0){
                    return (
                        <tr key={refinanceSatIndex}>
                            {refinance.sat.map((jValue: any, jIndex: number) => {
                                if(jIndex === 0 || jIndex === 2){
                                    return (
                                        <td align="center" key={jIndex}>
                                            Y {jValue}
                                        </td>
                                    )}
                                else if(jIndex ===1 || jIndex ===3){
                                    return (
                                        <td align="center" key={jIndex}>
                                        M {jValue}
                                    </td>)
                                } else {
                                    return (<td align="center" key={jIndex}>$
                                        {jValue.toFixed(0)}
                                    </td>)
                                }
                            })}
                        </tr>
                    )
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