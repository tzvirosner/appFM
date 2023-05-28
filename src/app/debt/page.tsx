export default function Debt() {
    return (
        <form action="/debt" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="text" name="ltv" className="form-control"
                />
                <label>LTV (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="interest_rate" className="form-control"
                />

                <label>interest rate (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="interest_only" className="form-control"
                />

                <label>interest only (months)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="NPER" className="form-control"
                />
                <label>NPER (months)</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
)
}