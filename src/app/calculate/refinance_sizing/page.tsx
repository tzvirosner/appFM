export default function RefiananceSizing(props: any) {
    const {hold_time} = props;
    return (

        <form method="post" action="/refinance_sizing" className="center">
            <select className="form-select form-control" name="year" >
            <option disabled>year of refinance</option>
                {hold_time.map((i: string) => {
                    return(
                        <option key={i}>Y-{i}</option>
                    )
                })}
        </select>
    <br/><br/>

        <div className="form-floating mb-3">
            <input type="text" className={"form-control text-white-900"} name="cap_rate" />
            {/*onKeyPress="<%=x.nc%>" */}
            {/*<%=x.requ%>*/}
            <label className={"text-white"}>valuation cap rate (%)</label><br/><br/>
        </div>
        <div className="form-floating mb-3">
            <input type="text" className={"form-control text-white-900"} name="LTV" />
            {/*onKeyPress="<%=x.nc%>" <%=x.requ%>*/}
            <label className={"text-white"}>LTV (%)</label><br/><br/>
        </div>
        <div className="form-floating mb-3">
            <input type="text" className={"form-control text-white-900"} name="closing_costs" />
            {/*onKeyPress="<%=x.nc%>" <%=x.requ%>*/}
            <label className={"text-white"}>closing costs (%)</label><br/><br/>
        </div>
        <button type="submit" className="btn btn-primary">continue</button>
    </form>
        
    )
}