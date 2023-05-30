export default function Expenses(props: any) {
    const {how_many_expenses} = props;
    return (
        <form action="/expenses" method="post" className="center">
            {how_many_expenses.map((i: string) => {
                return (
                    <div key={i}>
                        <div className="form-floating mb-3 partial_width">
                            <input type="text" className={"form-control text-white-900"} name={`type_${i}`}/>
                            {/*<%=x.requ%>>*/}
                            <label className={"text-white"}>expense type</label>
                        </div>
                        <div className="form-floating mb-3 partial_width">
                            <input type="text" className={"form-control text-white-900"} name={`amount_${i}`}/>
                            {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                            <label className={"text-white"}>amount (anuually)</label>
                        </div>
                        <div className="form-floating mb-3 partial_width">
                            <input type="text" className={"form-control text-white-900"} name={`inflation_${i}`}
                            />
                            {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                            <label className={"text-white"}>inflation (%)</label>
                        </div>
                    </div>
                )
            })}


            <div className="full_width">
                <button type="submit" className="btn btn-primary">continue</button>
            </div>
        </form>
    )
}