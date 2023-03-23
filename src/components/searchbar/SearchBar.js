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
            setFilterList(data)
        })
    }, [])

    

    useEffect(() => {
        fetchData()
    }, [fetchData, isFocus, inputRef])
    
    const clear = <button className="btn clear" onClick={(e) => handleClear()}>X</button>

    const handleChange = (v) => {
        setValue(v)
        handleFilter(v)
        if (v === '') return setFilterList(list)
    }

    const handleFilter = (value) => {
        // filter original list every time when input value changes
        const update = list.filter( item => item.name.toLowerCase().indexOf(value) !== -1)
        // update new result to filterList, make sure the new result is not the same as the original one
        setFilterList(update)
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
                onFocus={() => handleFocus()}
                onChange={(e) => handleChange(e.target.value)}
                ref={inputRef}
                />
                { value ? clear : null} 
            </div>
            <SearchList className={isFocus ? "list show" : "list"} list={filterList} result={value} setResult={(e) => handleResult(e)} />
        </div>
        
    )
}
