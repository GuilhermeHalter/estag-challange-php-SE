import "/src/css/CategoryStyle.css"

const CategoryBody = () => {
    return(
        <div>
            <div className="form">
                <input type="number" className="inp"/>
                <input type="text" className="inp"/>
                <input type="number" className="inp"/>
                <button className="submit">Add Category</button>

            </div>
            <hr className="division"/>
            <div className="table">
             
            </div>
        </div>
    );

}

export default CategoryBody;