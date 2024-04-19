import React from 'react';
import { useParams } from 'react-router-dom';
import { useCampingDetail } from '../../hooks/useCampingDetail';

const CampingDetailPage = () => {

    const { id } = useParams();
    const { data, isLoading, isError, error } = useCampingDetail({ params: id});


    return <div>CampingDetailPage</div>;
};

export default CampingDetailPage;