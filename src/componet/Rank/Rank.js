import React from 'react';
const Rank =({usedata})=>
{
    return(
        <div className="tc" style={{marginTop:""}}>
            <div className="white f2">
            {`${usedata.name} rank is`}
            </div>
            <div className="white f1">
            {`#${usedata.entries}`}
            </div>
        </div>
    )
}
export default Rank;