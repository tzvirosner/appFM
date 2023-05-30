export default function OtherIncome() {
    return (
        <form action="/other_income" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="text"
                       name="other_income_amount"
                       className={"form-control text-white-900"}
                />
                {/*<%=x.requ%>*/}
                {/* onkeypress="<%=x.nc%>">*/}
                <label className={"text-white"}>other income amount</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="growth" className={"form-control text-white-900"}
                />
                {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}

                <label className={"text-white"}>inflation (%)</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
)
}