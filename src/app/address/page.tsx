export default function Address() {
    return (
        <form action="/address" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="text" className="form-control" name="street_address"/>
                <label>street address</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" name="city"/>
                <label>city</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" name="state"/>
                <label>state</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" name="zip"/>
                <label>zip code</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" name="sf"
                    // onKeyPress="<%=x.nc%>"
                />
                <label>SF</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
    )
}