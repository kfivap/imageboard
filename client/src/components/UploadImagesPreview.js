import React from 'react';

const UploadImagesPreview = (props) => {

    return (

<img className={'uploadImage'} src={ URL.createObjectURL(props.file)}
alt={'upload'}
/>

    );
};

export default UploadImagesPreview;