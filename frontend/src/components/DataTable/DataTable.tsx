//import React from 'react';
import { FiEdit2 } from 'react-icons/fi';  // Replaced FaEdit with FiEdit2
import './DataTable.css';
import { BeneficiaryRecord, BeneficiaryListParams } from '../../types/beneficiary';

interface DataTableProps {
    data: BeneficiaryRecord;
    onEdit: (record: BeneficiaryListParams) => void;
    //onDelete: (id: string) => void;
    hiddenColumns?: string[];  // Columns to hide in normal view
    columnOrder?: string[];    // Column display order
    isEditMode?: boolean;      // Whether table is in edit mode
}

export const DataTable: React.FC<DataTableProps> = ({ 
    data, 
    onEdit, 
    //onDelete, 
    hiddenColumns = [], 
    columnOrder = [],
    isEditMode = false 
}) => {
    if (data.length === 0) {
        return <div className="no-data">No records found</div>;
    }

    // Get headers from first data item, excluding ID fields
    let headers = Object.keys(data.data[0]).filter(key => 
        !key.endsWith('Id') && key !== 'id' && (!hiddenColumns.includes(key) || isEditMode)
    );

    // Reorder headers based on columnOrder prop
    if (columnOrder.length > 0) {
        // First, include ordered columns that exist in headers
        const orderedHeaders = columnOrder.filter(col => headers.includes(col));
        // Then, add any remaining headers that weren't in columnOrder
        const remainingHeaders = headers.filter(col => !columnOrder.includes(col));
        headers = [...orderedHeaders, ...remainingHeaders];
    }
    
    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {headers.map(header => (
                            <th key={header} className={hiddenColumns.includes(header) ? 'edit-mode-column' : ''}>
                                {header.replace(/([A-Z])/g, ' $1').trim()}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((df: BeneficiaryListParams) => (
                        <tr key={df.id}>
                            {headers.map(header => (
                                <td 
                                    key={`${df.id}-${header}`}
                                    className={hiddenColumns.includes(header) ? 'edit-mode-column' : ''}
                                >
                                    {typeof df[header as keyof BeneficiaryListParams] === 'number' 
                                        ? df[header as keyof BeneficiaryListParams]?.toLocaleString('en-IN')
                                        : df[header as keyof BeneficiaryListParams]}
                                </td>
                            ))}
                            <td className="actions">
                                <button onClick={() => onEdit(df)} className="edit-btn">
                                    <FiEdit2 />
                                </button>
                                {/* <button onClick={() => onDelete(df.id)} className="delete-btn">
                                    <FaTrash />
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
