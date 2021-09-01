import {SearchIcon} from "@heroicons/react/outline";
import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import styles from './css/SearchBar.module.css'

function SearchBar() {
    const [users, setUsers] = useState([])
    const [filterData, setFilteredData] = useState([])

    useEffect(async () => {
        const {data} = await axios.get("/api/search")
        setUsers(data)
    }, [])

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        const newFilter = users.filter(value => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        })

        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

    const goToUserProfile = (userId) => {
        Router.push(`/user/${userId}`)
        setFilteredData([])
    }

    return (
        <div className="search">
            <div className="hidden md:inline-flex ml-2 items-center rounded-full bg-gray-100 p-2">
                <SearchIcon className="h-6 text-gray-500 flex-shrink"/>
                <input
                    className="hidden lg:inline-flex ml-2 items-centered bg-transparent
                outline-none placeholder-gray-500 flex-shrink"
                    type="text"
                    placeholder="Search Fipubook"
                    onChange={handleFilter}
                />
            </div>
            {filterData.length !== 0 &&
            <div className={styles.dataResult}>
                {filterData.slice(0, 15).map(user =>
                    (<div
                        className={styles.dataItem}
                        key={user.id}>
                        <Image
                            onClick={() =>
                                goToUserProfile(user.id)
                            }
                            className="rounded-full cursor-pointer"
                            src={user.avatar}
                            width={25}
                            height={25}
                            layout="fixed"/>
                        <div className="flex flex-1">
                            <p>{user.name}</p>
                        </div>
                    </div>)
                )}
            </div>}
        </div>
    )
}

export default SearchBar