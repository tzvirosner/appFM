export default function Address() {
    return (
        <form action="/address" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="text" className={"form-control text-white-900"} name="street_address"/>
                <label className={"text-white"}>street address</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className={"form-control text-white-900"} name="city" />
                <label className={"text-white"}>city</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className={"form-control text-white-900"} name="state"/>
                <label className={"text-white"}>state</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className={"form-control text-white-900"} name="zip"/>
                <label className={"text-white"}>zip code</label><br/><br/>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className={"form-control text-white-900"} name="sf"/>
                <label className={"text-white"}>SF</label><br/><br/>
            </div>
            <button type="submit" className="btn btn-primary text-white">continue</button>
        </form>
    )
}