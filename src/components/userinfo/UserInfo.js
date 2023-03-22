import { useEffect } from 'react';

export const UserInfo = ({user}) => {
    const {name, email, phone, website} = user
    useEffect(() => {
    }, [user])
  
    return (
        <div className="user-info">
            <h2>{name}</h2>
            <div>{phone}</div>
            <div>
                <a href={"mailto:" + email}>{email}</a>
            </div>
            <div>
                <a href={website}>{website}</a>
            </div>
        </div>
    )
}