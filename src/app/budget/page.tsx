export default function Budget() {
    return (
        <form action="/budget" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="text" name="purchase_price" className="form-control"/>
                {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                <label>purchase price</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="closing_costs" className="form-control"/>
                {/*<%=x.requ%> onkeypress="<%=x.nc%>">*/}
                <label>closing costs (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="construction_costs" className="form-control"

                 // onkeypress="<%=x.nc%>"
            />
                <label>construction costs</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
)
}