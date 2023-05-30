export default function HoldTime() {
    return (
        <form action="/hold_time" method="post" className="center">
            <div className="form-floating mb-3">
                <input type="number" className={"form-control text-white-900"} name="hold_time"/>
                <label className={"text-white"}>hold time (years)</label>
                <br/><br/>
            </div>
            <button type="submit" className="btn btn-primary">continue</button>
        </form>
    )
}