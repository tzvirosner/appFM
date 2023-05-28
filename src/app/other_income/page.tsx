export default function OtherIncome() {
    return (
        <form action="/other_income" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="text"
                       name="other_income_amount"
                       className="form-control"
                />
                {/*<%=x.requ%>*/}
                {/* onkeypress="<%=x.nc%>">*/}
                <label>other income amount</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="growth" className="form-control"
                />
                {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}

                <label>inflation (%)</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
)
}