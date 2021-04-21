import React from 'react';

const UploadImagesPreview = (props) => {

    return (

<img className={'uploadImage'} src={ URL.createObjectURL(props.file)} />

    );
};

export default UploadImagesPreview;