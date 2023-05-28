export default function RentalIncome(props: any) {
    const {num_unit_types} = props;
    return (
        <form action="/rental_income" method="post" className="center">
            {num_unit_types.map((i: string) => {
                return (
                    <div key={i}>
                        <div className="form-floating mb-3 partial_width">
                            <input type="text" className="form-control"
                                   name={`type_${i}`}
                            />
                            <label>unit type</label>
                        </div>
                        <div className="form-floating mb-3 partial_width">
                            <input type="text" className="form-control"
                                   name={`income_${i}`}
                            />
                            <label>monthly rent (p/unit)</label>
                        </div>
                        <div className="form-floating mb-3 partial_width">
                            <input type="number" className="form-control"
                                   name={`amount_${i}`}
                            />
                            <label># of units</label>
                        </div>
                    </div>
                );
            })
            }

            <div className="form-floating mb-3 full_width">
                <input type="text" name="inflation_rate"
                       className="form-control"
                       // /*<%=x.requ%> onkeypress="<%=x.nc%>">*/

                />
                <label>inflation (%)</label><br/><br/>
            </div>
            <div className="full_width">
                <button type="submit" className="btn btn-primary">continue</button>
            </div>
        </form>
    )
}