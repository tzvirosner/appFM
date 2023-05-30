export default function RentalIncomeHM() {
    return (
        <form action="/rental_income_HM" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="number" name="how_many" className={"form-control text-white-900"}
                />
                <label className={"text-white"}># of unit <b>types</b></label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
)
}