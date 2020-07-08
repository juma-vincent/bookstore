import React, { Component } from "react";
import _ from "lodash";


class TableBody extends Component {
  renderCell = (dataItem, column) => {
    if (column.content) {
      return column.content(dataItem);
    }else {
      return _.get(dataItem, column.path);
    }
  };

  createKey = (dataItem, column) => {
    return dataItem._id + (column.path || column.content);
  };

  render() {
    const { dataItems, columns } = this.props;
    return (
      <tbody>
        {dataItems.map((dataItem) => (
          <tr key={dataItem._id}>
            {columns.map((column) => (
              <td key={this.createKey(dataItem, column)}>
                {this.renderCell(dataItem, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
