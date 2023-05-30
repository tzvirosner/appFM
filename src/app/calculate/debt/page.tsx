export default function Debt() {
    return (
        <form action="/debt" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="text" name="ltv" className={"form-control text-white-900"}
                />
                <label className={"text-white"}>LTV (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="interest_rate" className={"form-control text-white-900"}
                />

                <label className={"text-white"}>interest rate (%)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="interest_only" className={"form-control text-white-900"}
                />

                <label className={"text-white"}>interest only (months)</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" name="NPER" className={"form-control text-white-900"}
                />
                <label className={"text-white"}>NPER (months)</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
)
}