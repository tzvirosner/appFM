export default function Sale() {
    return (
        <form method="post" action="/sale" className="center">
            <div className="form-floating mb-3">
                <input name="cap_rate" type="text" className="form-control" />
                <label>exit cap rate (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input name="closing_costs" type="text" className="form-control" />
                <label>closing costs (%)</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
    )
}