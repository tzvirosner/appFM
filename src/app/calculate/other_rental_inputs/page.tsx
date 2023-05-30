export default function OtherRentalInputs() {
    return (
        <form action="/other_rental_inputs" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="text" name="vacancy" className={"form-control text-white-900"} />
                {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                <label className={"text-white"}>vacancy (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="bad_debt" className={"form-control text-white-900"} />
                {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                <label className={"text-white"}>bad debt (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="management_fee" className={"form-control text-white-900"}/>
                {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                <label className={"text-white"}>management fee (%)</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
    )
}