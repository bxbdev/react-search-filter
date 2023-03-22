import "./SearchBar.scss"
import { useState, useEffect, useCallback, useRef } from 'react'
import { SearchList } from '../searchlist/SearchList'

export const SearchBar = ({setUser}) => {
    const [value, setValue] = useState('')
    const [list, setList] = useState([])
    const [filterList, setFilterList] = useState([])
    const [isFocus, setIsFocus] = useState(false)

    const inputRef = useRef(null)

    const fetchData = useCallback(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then( res => res.json())
        .then( data => {
            setList(data)
        })
    }, [])

    const filterData = useCallback(() => {
        const results = list.filter(
            user => 
            value && 
            user && 
            user.name && 
            user.name.toLowerCase().includes(value.toLowerCase()))
        setFilterList(results)
    }, [value, list])
    

    useEffect(() => {
        fetchData()
    }, [fetchData, filterData, isFocus, inputRef])
    
    const clear = <button className="btn clear" onClick={(e) => handleClear()}>X</button>

    const handleChange = (value) => {
        setValue(value)
        filterData()
        if (value === '') {
            setFilterList([])
        }
    }

    const handleClear = () => {
        inputRef.current.value = '';
        inputRef.current.focus();
        setValue('')
    }

    const handleResult = (user) => {
        setValue(user.name)
        setUser(user)
        setIsFocus(false)
    }

    const handleFocus = () => {
        setIsFocus(true)
    }

    return (
        <div className="search">
            <div className="search-bar">
                <input 
                type="text" 
                placeholder="Search name" 
                value={value}
                onFocus={(e) => handleFocus()}
                onChange={(e) => handleChange(e.target.value)} 
                ref={inputRef}
                />
                { value ? clear : null} 
            </div>
            <SearchList className={ isFocus ? "list show" : "list"} list={filterList.length > 0 ? filterList : list} result={value} setResult={(e) => handleResult(e)} />
        </div>
        
    )
}
