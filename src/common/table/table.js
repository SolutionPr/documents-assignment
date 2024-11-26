import React, { useState } from 'react';
import { Table, Input, Button, Space, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { delete_file, Get_Files } from '../../redux/authslice';

const CommonTable = ({ Alldata }) => {
    const [searchText, setSearchText] = useState('');
    const [sortedInfo, setSortedInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();

    const data = Alldata?.results || [];
    const totalRecords = Alldata?.count || 0;

    const handleSearch = () => {
        const trimmedSearch = searchText.trim();
        setCurrentPage(1);
        dispatch(Get_Files(trimmedSearch, 1));
    };

    const handleReset = () => {
        setSearchText('');
        setCurrentPage(1);
        dispatch(Get_Files('', 1));
    };

    const handledelete = (id) => {
        dispatch(delete_file(id, dispatch));
    };

    const handleSort = (sorter) => {
        setSortedInfo(sorter);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        dispatch(Get_Files(searchText, page));
    };

    const handleFileClick = (file) => {
        setSelectedFile(file);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedFile(null);
    };

    const columns = [
        {
            title: 'Document Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            ellipsis: true,
            render: (text, record) => (
                <a onClick={() => handleFileClick(record)}>{text}</a>
            ),
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            sorter: (a, b) => a.size - b.size,
            sortOrder: sortedInfo.columnKey === 'size' && sortedInfo.order,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a className="btn btn-info" onClick={() => handledelete(record?.id)}>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Search by document name or content"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                />
                <Button
                    onClick={handleSearch}
                    type="primary"
                    style={{ marginLeft: 10 }}
                >
                    Search
                </Button>
                <Button
                    onClick={handleReset}
                    type="default"
                    style={{ marginLeft: 10 }}
                >
                    Reset
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    current: currentPage,
                    total: totalRecords,
                    pageSize: 10,
                    onChange: handlePageChange,
                }}
                onChange={handleSort}
                rowKey="id"
            />
            <Modal
                title="File Details"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
                width={600}
            >
                {selectedFile ? (
                    <div>
                        <h3>Document Name: {selectedFile.name}</h3>
                        <p><strong>Created At:</strong> {new Date(selectedFile.created_at).toLocaleString()}</p>
                        <p><strong>Size:</strong> {selectedFile.size} KB</p>
                        <div>
                            <strong>File Content:</strong>
                            <pre>{selectedFile.content || 'No content available'}</pre>
                        </div>
                    </div>
                ) : (
                    <p>Loading file details...</p>
                )}
            </Modal>
        </div>
    );
};

export default CommonTable;
