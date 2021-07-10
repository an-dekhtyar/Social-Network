import React from 'react';
import s from './User.module.css'

type PaginationPropsType = {
    totalCount: number
    pageSize: number
    onPageChange: (page: number) => void
    currentPage: number

}

export const Pagination = (props: PaginationPropsType) => {
    let pages = []
    let pageCount = Math.ceil(props.totalCount / props.pageSize)
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (

        <div>
            {pages.map(p => {

                const setCurrentPageHandler = () => {
                    props.onPageChange(p)
                }

                return <span
                    key={p}
                    className={props.currentPage === p ? s.selected : ""}
                    onClick={setCurrentPageHandler}
                >{p} </span>
            })}
        </div>
    )
}





