import { useState, useEffect, useCallback } from 'react'
import { SearchList } from '../searchlist/SearchList'

export const SearchBar = ({setUser}) => {
    const [value, setValue] = useState('')
    const [list, setList] = useState([])
    const [isBlur, setIsBlur] = useState(true)

    const fetchData = useCallback(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then( res => res.json())
        .then( data => {
            const results = data.filter(
                user => 
                value && 
                user && 
                user.name && 
                user.name.toLowerCase().includes(value.toLowerCase()))
            setList(results)
        })
    }, [value])

    useEffect(() => {
        fetchData()
    }, [fetchData, isBlur])
    

    const handleChange = (value) => {
        setValue(value)
        fetchData()
    }

    const handleClear = () => {
        setValue('')
    }

    const clear = <button className="btn clear" onClick={(e) => handleClear()}>X</button>

    const handleResult = (user) => {
        setValue(user.name)
        setUser(user)
        setIsBlur(false)
    }

    return (
        <div className="search">
            <div className="search-bar">
                <input 
                type="text" 
                placeholder="Search name" 
                value={value}
                onFocus={(e) => setIsBlur(true)}
                onChange={(e) => handleChange(e.target.value)} 
                />
                { value ? clear : null} 
            </div>
            <SearchList className={value && isBlur ? "list show" : "list"} list={list} setResult={(e) => handleResult(e)} />
        </div>
        
    )
}
