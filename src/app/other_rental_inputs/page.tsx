export default function OtherRentalInputs() {
    return (
        <form action="/other_rental_inputs" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="text" name="vacancy" className="form-control" />
                {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                <label>vacancy (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="bad_debt" className="form-control" />
                {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                <label>bad debt (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="management_fee" className="form-control"/>
                {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                <label>management fee (%)</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
    )
}