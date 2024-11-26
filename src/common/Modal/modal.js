import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import CommonInput from "../Input/input";


const CommonModal = ({ btn, handleChange, filedata, keydata, reset }) => {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
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
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <CommonInput handledata={handleChange} uniqueKey={keydata} />
            </Modal>
        </>
    );
};


export default CommonModal;
