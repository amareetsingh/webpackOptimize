import React from 'react'
import Styles from './dashboard.module.css'

const Index = (props) => {
  const { setEndRow, endRow, setStartRow, startRow, total, pageSize } = props;


  const nextPage = () => {
    if (endRow < total) {
      setStartRow(startRow + pageSize)
      if (endRow + pageSize < total) {
        setEndRow(endRow + pageSize)

      } else {
        setEndRow(total)


      }
    }


  }
  const prevPage = () => {
    if (startRow > 0) {
      setStartRow(startRow - pageSize)


      setEndRow(startRow)


    } else {
      setStartRow(0)
    }

  }
  return (
    <div className={Styles["pagination"]}>

      <button
        onClick={() => prevPage()}
      >
        &lt;
      </button>
      <span>

        {`${startRow + 1} | ${endRow} (${total})`}
      </span>
      <button
        onClick={() => nextPage()}
      >
        &gt;
      </button>


    </div>
  )
}


export default Index