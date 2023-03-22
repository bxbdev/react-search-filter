import './SearchList.scss';
import { useEffect } from 'react';
export const SearchList = ({list, result, setResult, className}) => {

    useEffect(() => {
    
    }, [list])

    const handleClick = (user) => {
        setResult(user);
    }



    return (
    <div className={className}>
        { list.map( 
            (user, id) => <div className={result === user.name ? "item active" : "item"} key={id} onClick={(e) => handleClick(user)}>{user.name}</div>
        )}
    </div>)
}