import { useEffect } from 'react';

export const UserInfo = ({user}) => {
    const {name, email, phone, website} = user
    useEffect(() => {
    }, [user])
  
    return (
        <div className="user-info">
            <h2>{name}</h2>
            {
                user ?
                (
                    <div className="info">
                        <div>Phone: {phone}</div>
                        <div>
                            Email: <a href={"mailto:" + email}>{email}</a>
                        </div>
                        <div>
                            Website: <a href={"https://" + website} target="_blank" rel="noopener noreferrer">{website}</a>
                        </div>
                    </div>
                )
                : null
            }
                
            
        </div>
    )
}