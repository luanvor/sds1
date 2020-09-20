import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatDate } from './helpers';
import './style.css';
import { RecordsResponse } from './types';
import Pagination from './Pagination';
import Filters from '../../componentes/Filters';

const BASE = 'https://sds1-luan.herokuapp.com';

const Records = () => {
    const [ recordsResponse, setRecordsResponse ] = useState<RecordsResponse>();
    const [ activePage, setActivePage ] = useState(0);

    useEffect(() =>{
        axios
            .get(`${BASE}/records?linesPerPage=12&page=${activePage}`)
            .then(response => setRecordsResponse(response.data));
    }, [activePage]);

    const handlePageChange = (index: number) => {
        setActivePage(index);
    }
    
    return (
        <div className="page-container">
            <Filters link="/charts" linkText="VER GRÁFICO" />
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsResponse?.content.map(record => (
                        <tr key={record.id}>
                            <td>{ formatDate(record.moment) }</td>
                            <td>{ record.name }</td>
                            <td>{ record.age }</td>
                            <td>{ record.gamePlatform }</td>
                            <td>{ record.genreName }</td>
                            <td>{ record.gameTitle }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                activePage={activePage}
                goToPage={handlePageChange}
                totalPages={recordsResponse?.totalPages}
            />
        </div>
    )
}


export default Records;