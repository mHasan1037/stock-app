import { useEffect, useState } from 'react'

const useSearch = (url) => {
   const [searchStock, setSearchStock] = useState('')

   useEffect(()=>{
      async function getUrl(){
         const res = await fetch(url)
         const stocks = await res.json()
         setSearchStock(stocks.data)
      }

      getUrl()
   },  [url])

   return {searchStock}
}

export default useSearch