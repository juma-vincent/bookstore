import React from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({columns,sortColumn,onSort,dataItems,onDelete,onLike}) => {
    return ( 
        <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

        <TableBody
          dataItems={dataItems}       
          columns={columns}
        />
      </table>
     );
}
 
export default Table;
