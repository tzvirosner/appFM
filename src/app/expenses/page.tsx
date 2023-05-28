export default function Expenses(props: any) {
    const {how_many_expenses} = props;
    return (
        <form action="/expenses" method="post" className="center">
            {how_many_expenses.map((i: string) => {
                return (
                    <div key={i}>
                        <div className="form-floating mb-3 partial_width">
                            <input type="text" className="form-control" name={`type_${i}`}/>
                            {/*<%=x.requ%>>*/}
                            <label>expense type</label>
                        </div>
                        <div className="form-floating mb-3 partial_width">
                            <input type="text" className="form-control" name={`amount_${i}`}/>
                            {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                            <label>amount (anuually)</label>
                        </div>
                        <div className="form-floating mb-3 partial_width">
                            <input type="text" className="form-control" name={`inflation_${i}`}
                            />
                            {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                            <label>inflation (%)</label>
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