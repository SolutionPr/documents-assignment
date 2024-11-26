import React, { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const CommonTable = () => {
    const [searchText, setSearchText] = useState('');
    const [sortedInfo, setSortedInfo] = useState({});

    const data = [
        {
            id: 17,
            name: "cover_letter.txt",
            content: "Job Specific Cover Letter\r\n\r\nI am excited to apply for the position that involves working with Django Rest Framework, API integration, and various technologies. With a solid background in Python programming, data analysis, and hands-on experience in integrating third-party APIs, I am confident in my ability to make a meaningful contribution to your team.\r\n\r\nAt Tricky Web Solutions, I have successfully developed and maintained RESTful APIs, ensuring efficient data communication while enhancing applications with LangChain for natural language processing. My recent internship at Applify further solidified my skills in machine learning and data handling, where I gathered and cleaned data for analysis and created ML models.\r\n\r\nAdditionally, I have worked extensively with AWS, utilizing S3 for effective file storage solutions. My experience with OpenAI technologies to generate text, image, and audio provides me with a diverse skill set that aligns well with this role.\r\n\r\nI am eager to bring my expertise to your organization, driving innovation and delivering impactful data-driven solutions. Thank you for considering my application; I look forward to discussing how I can contribute to your team.",
            created_at: "2024-11-26T08:18:36.588328Z",
            size: 1211.0
        },
        {
            id: 18,
            name: "cqqover_letter.txt",
            content: "Job Specific Cover Letter\r\n\r\nI am excited to apply for the position that involves working with Django Rest Framework, API integration, and various technologies. With a solid background in Python programming, data analysis, and hands-on experience in integrating third-party APIs, I am confident in my ability to make a meaningful contribution to your team.\r\n\r\nAt Tricky Web Solutions, I have successfully developed and maintained RESTful APIs, ensuring efficient data communication while enhancing applications with LangChain for natural language processing. My recent internship at Applify further solidified my skills in machine learning and data handling, where I gathered and cleaned data for analysis and created ML models.\r\n\r\nAdditionally, I have worked extensively with AWS, utilizing S3 for effective file storage solutions. My experience with OpenAI technologies to generate text, image, and audio provides me with a diverse skill set that aligns well with this role.\r\n\r\nI am eager to bring my expertise to your organization, driving innovation and delivering impactful data-driven solutions. Thank you for considering my application; I look forward to discussing how I can contribute to your team.",
            created_at: "2024-11-26T08:18:36.588328Z",
            size: 121111.0
        },
    ];

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleSort = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.content.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: 'Document Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            ellipsis: true,
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
    ];

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Search by document name or content"
                    value={searchText}
                    onChange={handleSearch}
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                />
                <Button
                    onClick={() => setSearchText('')}
                    type="primary"
                    style={{ marginLeft: 10 }}
                >
                    Reset Search
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={filteredData}
                onChange={handleSort}
                rowKey="id"
            />
        </div>
    );
};

export default CommonTable;
