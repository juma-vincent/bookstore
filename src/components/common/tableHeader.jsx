import React, { Component } from "react";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      sortColumn.path = path;
    } else {
      sortColumn.order = "asc";
      sortColumn.path = path;
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn }= this.props;
    if (column.path !== sortColumn.path) {
      return null;
    } else {
      if (sortColumn.order === "asc") {
        return <FaSortUp color="black" size="15" style={{ cursor: "pointer" }} onClick={this.props.onClick} />        
      } else {
        return <FaSortDown color="black" size="15" style={{ cursor: "pointer" }} onClick={this.props.onClick} />        
      }
    }
    
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
