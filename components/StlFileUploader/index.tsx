import { Modal, Upload } from 'antd';
import { useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './style.module.scss'
import ConvertSTLToImage from 'components/stlPreviewComponent';

export const StlFileUploader = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([

    ]);

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    return (
        <div className={styles.FileUploaderTab}>
            <div>
                {/* <ConvertSTLToImage pathToStl='../../public/assets/Lyn.stl'/> */}
                <Upload
                    action={(file) => {
                        // some action logic
                        return 'string'
                    }}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview} // need to make stl preview convertor
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
            </div>
            <div className={styles.BrowseButton}>
                <Button> Browse </Button>
            </div>
        </div>
    )
}