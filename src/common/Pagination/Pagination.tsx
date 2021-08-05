import React, {useState} from 'react';
import s from './Pagination.module.css'
import cn from 'classnames'

type PaginationPropsType = {
    totalCount: number
    pageSize: number
    onPageChange: (page: number) => void
    currentPage: number
    portionSize: number
}

export const Pagination = (props: PaginationPropsType) => {

    let {totalCount, currentPage, onPageChange, pageSize, portionSize} = props

    let pages = []
    let pageCount = Math.ceil(totalCount / pageSize)
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pageCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize


    return <div className={s.paginationContainer}>

        <button
            className={s.button}
            disabled={portionNumber === 1}
            onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>«</button>

        {
            pages.filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((p) => {
                    return <div className={cn(s.paginationPage,{[s.selected]: currentPage === p}, '')}
                                 key={p}
                                 onClick={(e) => {
                                     onPageChange(p)
                                 }}>
                        <div className={s.page}>{p}</div>
                    </div>
                })
        }



        <button
            className={s.button}
            disabled={portionCount === portionNumber} onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>»</button>
    </div>

}





