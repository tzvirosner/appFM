export default function RefinanceDebtService() {
    return (
        <form action="/refinance_debt_service" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="text" className={"form-control text-white-900"} name="interest_rate"
            />
                {/*<%=x.requ%> onkeypress="<%=x.nc%>"*/}
                <label className={"text-white"}>interest rate (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="number" className={"form-control text-white-900"} name="interest_only" 
            />
                {/*<%=x.requ%> onkeypress="<%=x.nc%>"*/}
                <label className={"text-white"}>interest only (months)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="number" className={"form-control text-white-900"} name="NPER" 
            />
                {/*<%=x.requ%> onkeypress="<%=x.nc%>"*/}

                <label className={"text-white"}>NPER (months)</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
    )
}