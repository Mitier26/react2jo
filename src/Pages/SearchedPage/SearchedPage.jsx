import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearchCampingQuery } from '../../hooks/useSearchCamping'
import SearchedCampingCard from './components/SearchedCampingCard'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

const SearchedPage = () => {
   const [query, setQuery] = useSearchParams()
   const keyword = query.get('q')
   const [page, setPage] = useState(1)

   const { data: searchData, isLoading, isError, error } = useSearchCampingQuery({ keyword, page })
   
   if (isLoading) {
      return <h1>Loading...</h1>
   }
   if (isError) {
      return <Alert variant="danger">{error.message}</Alert>
   }

   const handlePageClick = ({ selected }) => {
      setPage(selected + 1)

      console.log('page', selected) //출력안됨
   }
   console.log('ddd', searchData)

   return (
      <Container className="justify-content-center my-4">
         <Row className="justify-content-center">
            {searchData?.map((campingData, index) => (
               <Col key={index} lg={6} xs={12} className="w-auto p-3">
                  <SearchedCampingCard data={campingData} contentId = {campingData.contentId} address = {campingData.facltNm}/>
               </Col>
            ))}
         </Row>
         <div className="d-flex justify-content-center my-4">
            <ReactPaginate
               nextLabel=">"
               onPageChange={handlePageClick}
               pageRangeDisplayed={5}
               marginPagesDisplayed={5}
               pageCount={page}
               previousLabel="<"
               pageClassName="page-item"
               pageLinkClassName="page-link"
               previousClassName="page-item"
               previousLinkClassName="page-link"
               nextClassName="page-item"
               nextLinkClassName="page-link"
               breakLabel="..."
               breakClassName="page-item"
               breakLinkClassName="page-link"
               containerClassName="pagination"
               activeClassName="active"
               renderOnZeroPageCount={null}
               forcePage={page - 1}
            />
         </div>
      </Container>
   )
}

export default SearchedPage
