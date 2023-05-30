export default function HowManyExpenses() {
    return (
        <form action="/how_many_expenses" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="number" className={"form-control text-white-900"} name="how_many"
                />
                {/*<%=x.requ%>>*/}

                <label className={"text-white"}># of expenses (exc. man. fee)</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
)
}