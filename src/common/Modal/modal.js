import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import CommonInput from "../Input/input";


const CommonModal = ({ btn, handleChange, filedata, keydata, reset, handleSubmit, file }) => {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        if (!file) {
            handleSubmit();
        } else {
            setOpen(false);
            handleSubmit();
        }
    };
    const handleCancel = () => {
        setOpen(false);
        filedata(null);
        reset();
    };
    return (
        <>
            <Space>
                <Button type="primary" onClick={showModal}>
                    {btn}
                </Button>
            </Space>
            <Modal
                open={open}
                title="Upload"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <CommonInput handledata={handleChange} uniqueKey={keydata} />
            </Modal>
        </>
    );
};


export default CommonModal;
