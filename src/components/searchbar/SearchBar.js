import "./SearchBar.scss"
import { useState, useEffect, useCallback, useRef } from 'react'
import { SearchList } from '../searchlist/SearchList'

export const SearchBar = ({setUser}) => {
    const [value, setValue] = useState('')
    const [list, setList] = useState([])
    const [filterList, setFilterList] = useState([])
    const [isFocus, setIsFocus] = useState(false)

    const inputRef = useRef(null)
    const searchRef = useRef(null)

    const fetchData = useCallback(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then( res => res.json())
        .then( data => {
            setList(data)
            setFilterList(data)
        })
    }, [])

    useEffect(() => {
        // init list
        fetchData()

        // click from document to close list
        document.addEventListener('mousedown', clickOutside)

        // remove mousedown event handler
        return () => {
            document.removeEventListener('mousedown', clickOutside)
        }

    }, [fetchData, isFocus, inputRef])

    // click outside to close list
    const clickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsFocus(false)
        }
    }
    const closeIcon =   <span className="icon">
                            <svg viewBox="0 0 100 100" width="30" height="30">
                                <line x1="30" y1="30" x2="70" y2="70" />
                                <line x1="30" y1="70" x2="70" y2="30" />
                            </svg>
                        </span>
    const clear = <button className="btn clear" onClick={(e) => handleClear()}>{closeIcon}</button>

    // update value and list when input changes
    const handleChange = (v) => {
        setValue(v)
        handleFilter(v)
        if (v === '') {
            setFilterList(list)
            setUser(v)
        } 
    }

    const handleFilter = (value) => {
        // filter original list every time when input value changes
        const update = list.filter( item => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        // update new result to filterList, make sure the new result is not the same as the original one
        setFilterList(update)
        if (update.length === 0) return setUser('undefined')
    }

    // clear input value
    const handleClear = () => {
        inputRef.current.focus();
        setValue('')
        setUser('')
        // have to update filter list back to original list
        setFilterList(list)
    }

    // send result to parent component
    const handleResult = (user) => {
        setValue(user.name)
        setUser(user)
        setIsFocus(false)
    }

    // show list
    const handleFocus = () => {
        setIsFocus(true)
    }

    return (
        <div className="search" ref={searchRef}>
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
            <SearchList className={isFocus ? "list show" : "list"} list={filterList} searchTerm={value} setResult={(e) => handleResult(e)} />
        </div>
    )
}
