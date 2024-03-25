import "/src/css/CategoryStyle.css"
import CategoryComp from "../../components/category/CategoryComp";
import CategoryCompForm from "../../components/category/CategoryCompForm";

const CategoryBody = () => {
    return (
        <div className="global">
            <div className="main">

                <CategoryCompForm />

                <div className="division">
                    <hr className="division" />
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Tax</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <CategoryComp />
                    </table>
                </div>
            </div>
        </div>
    );

}

export default CategoryBody;