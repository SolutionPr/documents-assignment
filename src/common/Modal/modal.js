import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import CommonInput from "../Input/input";


const CommonModal = () => {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Space>
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
            </Space>
            <Modal
                open={open}
                title="Upload"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <CommonInput />
            </Modal>
        </>
    );
};


export default CommonModal;
