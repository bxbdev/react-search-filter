import './SearchList.scss'
export const SearchList = ({list, result, setResult, className}) => {

    const regex = new RegExp(`${result}`, "gi")

    const handleClick = (user) => {
        setResult(user)
    }

    const handleHightlight = (name) => {
        const result = name.split(' ').map( str => {
            return str.replace(regex, (match) => `<mark>${match}</mark>`)
        })
        return result.join(' ')
    }

    return (
    <div className={className}>
        { list.map( 
            (user, id) => 
            <div 
                className={result === user.name ? "item active" : "item"} 
                key={id} 
                onClick={(e) => handleClick(user)}
            >
                {result !== ''
                    ? <div dangerouslySetInnerHTML={{ __html: handleHightlight(user.name)}}></div>
                    : user.name 
                }
            </div>
        )}
    </div>)
}