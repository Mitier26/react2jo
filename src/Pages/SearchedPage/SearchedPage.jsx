import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchCampingQuery } from '../../hooks/useSearchCamping';
import SearchedCampingCard from './components/SearchedCampingCard';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './SearchedPage.css';

const SearchedPage = () => {
    const [query, setQuery] = useSearchParams();
    const keyword = query.get('q');
    const [pageNo, setPage] = useState(1);
    const [dataIs, setDataIs] = useState(null);

    const { data: searchData, isLoading, isError, error } = useSearchCampingQuery({ keyword, pageNo });

    useEffect(() => {
      if (searchData) {
         setDataIs(searchData);
      }
  }, [searchData]);


    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    const handlePageClick = ({ selected }) => {
      setPage(selected + 1);
      console.log('page', selected);
  };

    const SearchItems = dataIs?.response?.body?.items.item;
    console.log('searchItems', SearchItems);
    console.log('totalcount', dataIs?.response.body.totalCount);
    return (
        <Container className="justify-content-center my-4 camping-search">
            <Row className="justify-content-center camping-search-text">
                <div className="justify-content-start ms-4 search-resultbox">
                    <p>검색결과</p>
                    <p>{dataIs?.response.body.totalCount} 개가 검색되었습니다. </p>
                </div>
                <Row>
                    {SearchItems?.map((campingData, index) => (
                        <Col key={index} lg={6} xs={12} className="w-auto p-3">
                            <SearchedCampingCard data={campingData} contentId = {campingData.contentId} address = {campingData.facltNm}/>
                        </Col>
                    ))}
                </Row>
            </Row>

            <div className="d-flex justify-content-center my-4">
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={5}
                    pageCount={
                        dataIs?.response?.body?.totalCount / 10 > 500 ? 500 : dataIs?.response?.body?.totalCount / 10
                    }
                    previousLabel="<"
                    pageClassName="o-page-item"
                    pageLinkClassName="o-page-link"
                    previousClassName="o-page-item"
                    previousLinkClassName="o-page-link"
                    nextClassName="o-page-item"
                    nextLinkClassName="o-page-link"
                    breakLabel="..."
                    breakClassName="o-page-item"
                    breakLinkClassName="o-page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={pageNo - 1}
                />
            </div>
        </Container>
    );
};

export default SearchedPage;
