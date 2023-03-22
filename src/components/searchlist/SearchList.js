import './SearchList.scss';
export const SearchList = ({list, setResult, className}) => {

    const handleClick = (user) => {
        setResult(user);
    }
 
    return (
    <div className={className}>
        { list.map( 
            (user, id) => <div className="item" key={id} onClick={(e) => handleClick(user)}>{user.name}</div>
        )}
    </div>)
}