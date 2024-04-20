import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import TablaCampañas from './TablaCampañas.jsx';

function TableCampaña({search,setSearch,rowsTable,setRowsTable, huboUpdate}) {

    return (
        <div>
            <TablaCampañas
                search={search}
                setSearch={setSearch}
                rowsTable={rowsTable}
                setRowsTable={setRowsTable}
            />
        </div>
    )
}

export default TableCampaña

TableCampaña.propTypes = {
    value: PropTypes.number,
};