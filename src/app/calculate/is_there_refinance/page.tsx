export default function IsThereRefinance() {
    return (
        <form method="post" action="/is_there_refinance" className="center">
            <p>Will there be a refinance for this property?</p>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="refinance" value="yes"
                />
                {/*<%=x.requ%>*/}
                <label className="form-check-label">yes</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="refinance" value="no"/>
                    <label className="form-check-label">no</label>
            </div>
            <br/>
                <button type="submit" className="btn btn-primary">continue</button>
        </form>
    )
}