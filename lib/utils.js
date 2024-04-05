import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}



export function defualtCols() {
  return {
      resizable: true,
      sortable: true,
      filter: "agTextColumnFilter",
      wrapText: true,
      autoHeight: true,
  };
}

export function defualtAgGridProps({ defaultColDef, gridRef, data }) {
  return {
    showOpenedGroup: true,
    defaultColDef: defaultColDef,
    columnHoverHighlight: false,
    ref: gridRef,
    autoSizePadding: 2,
    headerHeight: 35,
    rowHeight: 33,
    pagination: true,
    paginationPageSize: 200,
    rowData: data,
    suppressRowVirtualisation: true,
    suppressColumnVirtualisation: true,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    // rowClassRules: {
    //     'ag-row-selected': function (params) {
    //         return params.node.id === 17292;
    //     },
    // },
    overlayLoadingTemplate: '<span className="ag-overlay-loading-center">Loading...</span>'
  }

};