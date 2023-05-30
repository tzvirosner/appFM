import React from "react";

interface AddressProps {
    sale: {
        "total profit": number,
        IRR: number,
        "equity multiple": number,
        "average cash on cash return": number
        "year of refinance": number,
    },
    sdi: number,
    capital_stack: {
        equity: number[],
        debt: number[]
        total_capital: number[]
    },
    hold_time: number,
    budget: {
        purchase_price: number[],
        closing_costs: number[],
        construction_costs: number[],
        total_budget: number[]
    },
    units: number[][],
    refinance: any,
    notes_CFP: string[],
    CFP: number[][],
    how_many_expenses: number,
    property_info: {
        "property name": string,
        "property address": string,
    },
    closing_costs_ratio: number,
    pricing_metrics: {
        "purchase price per unit": number,
        "purchase price per SF": number,
        "cap rate": number,
    }
}

interface TableOneProps {
    property_info: AddressProps["property_info"]
}

interface TableTwoProps {
    pricing_metrics: AddressProps["pricing_metrics"]
}

interface TableThreeProps {
    hold_time: AddressProps["hold_time"],
    budget: AddressProps["budget"],
    capital_stack: AddressProps["capital_stack"],
    sale: AddressProps["sale"]
}

interface TableFourProps {
    budget: AddressProps["budget"],
    closing_costs_ratio: number
}

interface TableFiveProps {
    sdi: AddressProps["sdi"],
}

interface TableSixProps {
    capital_stack: AddressProps["capital_stack"],
}

interface TableSevenProps {
    units: AddressProps["units"],
}

interface TableEightProps {
    refinance: AddressProps["refinance"],
}

interface TableNineProps {
    sale: AddressProps["sale"],
}

interface TableTenProps {
    hold_time: AddressProps["hold_time"],
    CFP: AddressProps["CFP"],
    notes_CFP: AddressProps["notes_CFP"],
    refinance: AddressProps["refinance"],
}

const TableOne = (props: TableOneProps) => {
    const {property_info} = props;
    return (
        <table>
            <tbody>
            <tr>
                <th colSpan={2}>property information</th>
            </tr>
            {
                Object.entries(property_info).map((keyValue: [string, any] , i: number) => {
                    if (keyValue[1] === "" || keyValue[1] === 0) {
                        return (
                            <tr key={`${keyValue[0]}-${i}`}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center">data not provided</td>
                            </tr>
                        )
                    } else if (i === 4) {
                        return (
                            <tr key={`${keyValue[0]}-${i}`}>
                                <td align="center">{keyValue[1]}</td>
                                <td align="center">{keyValue[1]} SF</td>
                            </tr>
                        )
                    } else if (i === 5) {
                        return (
                            <tr key={`${keyValue[0]}-${i}`}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center">{keyValue[1]} units</td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr key={`${keyValue[0]}-${i}`}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center">{keyValue[1]}</td>
                            </tr>
                        )
                    }
                })
            }
            </tbody>
        </table>
    )
}

const TableTwo = (props: TableTwoProps) => {
    const {pricing_metrics} = props;
    return (
        <table>
            <tr>
                <th colSpan={2}>pricing metrics</th>
            </tr>
            {Object.entries(pricing_metrics).map((keyValue, i) => {
                    if (keyValue[0] === "SF not provided") {
                        return (
                            <tr key={`${keyValue[0]}-${i}`}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center">SF not provided</td>
                            </tr>
                        )
                    } else if (i === 7) {
                        return (
                            <tr key={`${keyValue[0]}-${i}`}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center">{keyValue[1].toFixed(2)}%</td>
                            </tr>
                        )
                    } else if (i === 8) {
                        return (
                            <tr key={`${keyValue[0]}-${i}`}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center">{keyValue[1].toFixed(2)}x</td>
                            </tr>
                        )
                    } else if (i === 1 || i === 4) {
                        return (
                            <tr key={`${keyValue[0]}-${i}`}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center">${keyValue[1].toFixed(2)}</td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr key={`${keyValue[0]}-${i}`}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center">${keyValue[1].toFixed(0)}</td>
                            </tr>
                        )
                    }
                }
            )}
        </table>
    )
}

const TableThree = (props: TableThreeProps) => {
    const {hold_time, budget, capital_stack, sale} = props;
    return (
        <table>
            <tbody>
            <tr>
                <th colSpan={2}>investment snapshot</th>
            </tr>
            <tr>
                <td align="center">projected hold time</td>
                <td align="center">
                    {hold_time} years
                </td>
            </tr>
            <tr>
                <td align="center">total budget</td>
                <td align="center">$
                    {budget.total_budget[1].toFixed(0)}
                </td>
            </tr>
            <tr>
                <td align="center">total equity commitment</td>
                <td align="center">$
                    {capital_stack.equity[1]}
                </td>
            </tr>
            <tr>
                <td align="center">total profit</td>
                <td align="center">$
                    {sale["total profit"].toFixed(0)}
                </td>
            </tr>
            <tr>
                <td align="center">IRR</td>
                <td align="center">
                    {sale.IRR}
                    {typeof sale.IRR === "number" ? "%" : ""}
                </td>
            </tr>
            <tr>
                <td align="center">equity multiple</td>
                <td align="center">
                    {sale["equity multiple"].toFixed(2)}x
                </td>
            </tr>
            <tr>
                <td align="center">average cash on cash</td>
                <td align="center">
                    {sale["average cash on cash return"].toFixed(2)}%
                </td>
            </tr>
            </tbody>
        </table>
    )
}

const TableFour = (props: TableFourProps) => {
    const {budget, closing_costs_ratio} = props;
    return (
        <table>
            <tr>
                <th colSpan={3}>budget</th>
            </tr>
            <tr>
                <td align="center">purchase price</td>
                <td align="center">$
                    {budget.purchase_price[1].toFixed(0)}
                </td>
                <td align="center">
                    {budget.purchase_price[2].toFixed(2)}%
                </td>
            </tr>
            <tr>
                <td align="center">closing cost</td>
                <td align="center">$
                    {budget.closing_costs[1].toFixed(0)}
                    {closing_costs_ratio > 0 && `(${closing_costs_ratio.toFixed(2)} of the purchase price)`}
                </td>
                <td align="center">
                    {budget.closing_costs[2].toFixed(2)}%
                </td>
            </tr>
            <tr>
                <td align="center">construction cost</td>
                <td align="center">$
                    {budget.construction_costs[1].toFixed(0)}
                </td>
                <td align="center">
                    {budget.construction_costs[2].toFixed(2)}%
                </td>
            </tr>
            <tr>
                <td align="center">total budget</td>
                <td align="center">$
                    {budget.total_budget[1].toFixed(0)}
                </td>
                <td align="center">
                    {budget.total_budget[2].toFixed(2)}%
                </td>
            </tr>
        </table>
    )
}

const TableFive = (props: TableFiveProps) => {
    const {sdi} = props;
    return (
        <table>
            <tr>
                <th colSpan={2}>debt summary</th>
            </tr>
            {Object.entries(sdi).map((keyValue, i) => {
                if (i === 0 || i === 6 || i === 7) {
                    return (
                        <tr key={`${keyValue[0]}-${i}`}>
                            <td align="center">{keyValue[0]}</td>
                            <td align="center">${keyValue[1].toFixed(0)}</td>
                        </tr>
                    )
                } else if (i === 1 || i === 2 || i === 3) {

                    return (
                        <tr key={`${keyValue[0]}-${i}`}>
                            <td align="center">{keyValue[0]}</td>
                            <td align="center">{keyValue[1].toFixed(2)}%</td>
                        </tr>
                    )
                } else if (i === 4 || i === 5) {
                    return (
                        <tr key={`${keyValue[0]}-${i}`}>
                            <td align="center">{keyValue[0]}</td>
                            <td align="center">{keyValue[1].toFixed(0)} months</td>
                        </tr>
                    )
                } else if (i === 8 || i === 9) {
                    return (
                        <tr key={`${keyValue[0]}-${i}`}>
                            <td align="center">{keyValue[0]}</td>
                            <td align="center">{keyValue[1].toFixed(2)}
                                x
                            </td>
                        </tr>
                    )
                }
            })}
            <tr>
                <td align="center" colSpan={2}>
                    <form method="post" action="/amort_initial">
                        <button type="submit" className="btn btn-primary">click here for amortization table</button>
                    </form>
                </td>
            </tr>
        </table>
    )
}

const TableSix = (props: TableSixProps) => {
    const {capital_stack} = props;

    return (
        <table>
            <tbody>
            <tr>
                <th colSpan={3}>capital structure</th>
            </tr>
            <tr>
                <td align="center">
                    {capital_stack.debt[0]}
                </td>
                <td align="center">${capital_stack.debt[1].toFixed(0)}</td>
                <td align="center">
                    {capital_stack.debt[2].toFixed(2)}%
                </td>
            </tr>
            <tr>
                <td align="center">
                    {capital_stack.equity[0]}
                </td>
                <td align="center">${capital_stack.equity[1].toFixed(0)}</td>
                <td align="center">
                    {capital_stack.equity[2].toFixed(2)}%
                </td>
            </tr>
            <tr>
                <td align="center">
                    {capital_stack.total_capital[0]}
                </td>
                <td align="center">${capital_stack.total_capital[1].toFixed(0)}</td>
                <td align="center">
                    {capital_stack.total_capital[2].toFixed(2)}%
                </td>
            </tr>
            </tbody>
        </table>
    )
}

const TableSeven = (props: TableSevenProps) => {
    const {units} = props;
    return (
        <table>
            <tr>
                <th colSpan={3}>unit mix</th>
            </tr>
            <tr>
                <td align="center">unit type</td>
                <td align="center">monthly rent</td>
                <td align="center">number of units</td>
            </tr>

            {units.map((unit: number[], i: number) => {
                return (
                    <tr key={`${unit}-${i}`}>
                        <td align="center">{unit[0]}</td>
                        <td align="center">${unit[1].toFixed(0)}</td>
                        <td align="center">{unit[2].toFixed(0)} units</td>
                    </tr>
                )
            })}
        </table>
    )
}

const TableEight = (props: TableEightProps) => {
    const {refinance} = props;
    return (
        <>
            <br/><br/>
            <table>
                <tr>
                    <th colSpan={3}>refinance summary</th>
                </tr>
                {Object.keys(refinance).map((key: string, i: number) => {
                        if (i === 0) {
                            return (
                                <tr key={`${key}-${i}`}>
                                    <td align="center">{key}</td>
                                    <td align="center" colSpan={2}>Y{refinance[key]}</td>
                                </tr>
                            )
                        } else if (i === 1 || i === 3 || i === 5 || i === 8 || i === 9 || i === 10 || i === 11 || i === 12 || i === 18 || i === 19) {
                            return (
                                <tr key={`${key}-${i}`}>
                                    <td align="center">{key}</td>
                                    <td align="center" colSpan={2}>${refinance[key].toFixed(0)}</td>
                                </tr>
                            )
                        } else if (i === 2 || i === 4 || i === 15) {
                            return (
                                <tr key={`${key}-${i}`}>
                                    <td align="center">{key}</td>
                                    <td align="center" colSpan={2}>{refinance[key].toFixed(2)}%</td>
                                </tr>
                            )
                        } else if (i === 16 || i === 17) {
                            return (
                                <tr key={`${key}-${i}`}>
                                    <td align="center">{key}</td>
                                    <td align="center" colSpan={2}>{refinance[key].toFixed(0)} months</td>
                                </tr>
                            )
                        } else if (i === 20 || i === 21) {
                            return (
                                <tr key={`${key}-${i}`}>
                                    <td align="center">{key}</td>
                                    <td align="center" colSpan={2}>{refinance[key].toFixed(2)}x</td>
                                </tr>
                            )
                        } else if (i === 7 || i === 14) {
                            return (
                                <tr key={`${key}-${i}`}>
                                    <td align="center">{key}</td>
                                    <td align="center">{refinance[Object.keys(refinance)[i - 1]].toFixed(2)}%</td>
                                    <td align="center">${refinance[key].toFixed(0)}</td>
                                </tr>
                            )
                        }
                    }
                )}
                <tr>
                    <td align="center" colSpan={2}>
                        <form method="post" action="/amort_refinance">
                            <button type="submit" className="btn btn-primary">click here for amortization table
                            </button>
                        </form>
                    </td>
                </tr>
            </table>
        </>
    )
}

const TableNine = (props: TableNineProps) => {
    const {sale} = props;
    return (<>
        <br/><br/>
        <table>
            <tr>
                <th colSpan={3}>sale summary</th>
            </tr>
            {Object.entries(sale).map((keyValue, i) => {
                    if (i === 0) {
                        return (
                            <tr key={i}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center" colSpan={2}>Y{keyValue[1]}</td>
                            </tr>
                        )
                    } else if (i === 1 || i === 16 || (i === 14 && typeof Object.keys(sale)[i] === "number")) {
                        return (
                            <tr key={i}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center" colSpan={2}>{keyValue[1].toFixed(2)}%</td>
                            </tr>
                        )
                    } else if (i === 14) {
                        return (
                            <tr key={i}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center" colSpan={2}>{keyValue[1]}</td>
                            </tr>
                        )
                    } else if (i === 2 || i === 3 || i === 6 || i === 7 || i === 8 || i === 9 || i === 10 ||
                        (i === 11 && sale["year of refinance"] > 0) || i === 12 || i === 13) {
                        return (
                            <tr key={i}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center" colSpan={2}>${keyValue[1].toFixed(0)}</td>
                            </tr>
                        )
                    } else if (i === 15) {
                        return (
                            <tr key={i}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center" colSpan={2}>{keyValue[1].toFixed(2)}x</td>
                            </tr>
                        )
                    } else if (i === 5) {
                        return (
                            <tr key={i}>
                                <td align="center">{keyValue[0]}</td>
                                <td align="center">{Object.values(sale)[i - 1].toFixed(2)}%</td>
                                <td align="center">${keyValue[1].toFixed(0)}</td>
                            </tr>
                        )
                    }
                }
            )}
        </table>
    </>);
}

const TableTen = (props: TableTenProps) => {
    const {hold_time, CFP, refinance, notes_CFP} = props;
    return (<>
            <br/><br/>
            <table>
                <tr>
                    <th colSpan={hold_time + 4}>
                        {hold_time + 1} year cash flow projection
                    </th>
                </tr>
                {Object.keys(CFP).map((key, i) => {
                        if (key === "rental income") {
                            return (
                                <tr key={i}>
                                    <td align="center"></td>
                                    <td align="center">notes</td>
                                    <td colSpan={hold_time + 2} align="center"></td>
                                </tr>
                            )
                        } else if (key === "management fee") {
                            return (
                                <tr key={i}>
                                    <td align="center">expenses</td>
                                    <td colSpan={hold_time + 3} align="center"></td>
                                </tr>
                            )
                        } else if (key === "NOI") {
                            return (
                                <tr key={i}>
                                    <td align="center">NOI</td>
                                    <td colSpan={hold_time + 3} align="center"></td>
                                </tr>
                            )
                        } else if (key === "debt service") {
                            return (
                                <tr key={i}>
                                    <td align="center">debt service</td>
                                    <td colSpan={hold_time + 3} align="center"></td>
                                </tr>
                            )
                        } else if (key === "cash flow") {
                            return (
                                <tr key={i}>
                                    <td align="center">cash flow</td>
                                    <td colSpan={hold_time + 3} align="center"></td>
                                </tr>
                            )
                        }
                        return (
                            <tr key={i}>
                                {((refinance["year of refinance"] === 0 && i !== 14 + Object.keys(CFP).length) || refinance["year of refinance"] > 0) && i > 0 &&
                                    <td>{key}</td>}
                                {(i > 0 && refinance["year of refinance"] > 0) || (i > 0 && i !== 14 + Object.keys(CFP).length) &&
                                    <td align="center">{notes_CFP[i]}</td>}
                                {Object.values(CFP)[i].map((value, j) => {
                                    return (
                                        <>
                                            {
                                                ((i > 0 && i < 11 + Object.keys(CFP).length) || 
                                                    i === 12 + Object.keys(CFP).length || 
                                                    i === 15 + Object.keys(CFP).length || 
                                                    i === 16 + Object.keys(CFP).length) && typeof value === "number" &&
                                                <td align="center">${value.toFixed(0)}</td>
                                            }
                                            {
                                                i === 11 + Object.keys(CFP).length && typeof value === "number" &&
                                                <td align="center">{value.toFixed(2)}x</td>
                                            }
                                            {
                                                (i === 13 + Object.keys(CFP).length ||
                                                    (i === 14 + Object.keys(CFP).length && refinance["year of refinance"] > 0)
                                                ) && typeof value === "number" &&
                                                <td align="center">{value.toFixed(2)}%</td>
                                            }
                                            {
                                                ((refinance["year of refinance"] === 0 && i !== 14 + Object.keys(CFP).length) 
                                                    || refinance["year of refinance"] > 0) &&
                                                <td align="center">{value}</td>}
                                        </>
                                    )
                                })}
                            </tr>
                        )
                    }
                )}
            </table>
        </>
    );
}

export default function Address(props: AddressProps) {
    const {
        sdi,
        sale,
        hold_time,
        capital_stack,
        refinance,
        units,
        property_info,
        closing_costs_ratio,
        budget,
        pricing_metrics,
        CFP,
        notes_CFP
    }: AddressProps = props;
    return (
        <>
            <TableOne property_info={property_info}/>
            <TableTwo pricing_metrics={pricing_metrics}/>
            <TableThree hold_time={hold_time}
                        budget={budget}
                        capital_stack={capital_stack}
                        sale={sale}/>
            <TableFour budget={budget} closing_costs_ratio={closing_costs_ratio}/>
            <TableFive sdi={sdi}/>
            <TableSix capital_stack={capital_stack}/>
            <TableSeven units={units}/>
            {refinance["year of refinance"] > 0 && <TableEight refinance={refinance}/>}
            <TableNine sale={sale}/>
            <TableTen refinance={refinance} hold_time={hold_time} CFP={CFP} notes_CFP={notes_CFP}/>
        </>

    )
}
                                    