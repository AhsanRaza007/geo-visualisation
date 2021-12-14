import React from "react"
import { gcd } from "../util";
const Popup = ({properties, users})=>{

    let gcdFemaleMale = gcd(users.male_count, users.female_count)
    return (
        <div>
            <p>
                <strong>Name: </strong>&nbsp;{properties.name}
            </p>
            <p>
                <strong>Pin Code: </strong>&nbsp;{properties.pin_code}
            </p>
            <p>
                <strong>No. of Users: </strong>&nbsp;{users.users_count}
            </p>
            <p>
                <strong>Male/Female: </strong>&nbsp;{ users.male_count/gcdFemaleMale } : {users.female_count/gcdFemaleMale }
            </p>
            <p>
                <strong>Revenue(Pro Users): </strong>&nbsp;{ users.num_paid_user }
            </p>
            <p>
                <strong>Avg Age: </strong>&nbsp;{ Math.floor(users.age_sum/users.users_count) }
            </p>
            <p>
                <strong>Avg Num of Matches: </strong> &nbsp; { Math.floor(users.num_matches/users.users_count) }
            </p>
        </div>
    )
}

export default Popup;