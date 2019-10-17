import { Upload, Icon, Modal, message } from 'antd';
import styles from './index.less'
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class UploadMulti extends React.Component {
  static defaultProps ={
    length: 3,
    fileInfo: {
      url: '/base/file/freeUpload',
      tip: '上传照片',
      w: 102,
      h: 102
    }

  }
  state = {
    currentIndex: -1,
    previewImage: '',
    previewVisible: false,
    fileList: this.props.fileList,
  };

  uploadPic = (info) => {
    if (info.file.status === 'uploading') {
      this.uploadTag = true
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.code === 400) {
        message.warning('图片上传失败')
        return
      }
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.uploadTag = false
        const newArr = this.state.fileList.concat([{
          uid: info.file.uid,
          url: Array.isArray(info.file.response.data)
            ? info.file.response.data[0].url
            : info.file.response.data.url,
        }]);
        this.setState({
          fileList: newArr,
        })
        if (this.props.getFile) {
          this.props.getFile(newArr)
        }
      })
    }
  }
  showTip = (index = -1) => {
    this.setState({
      currentIndex: index
    })
  }
  // 弹出照片框
  show = (type,item = {}) => {
    this.setState({
      previewVisible: type,
      previewImage: item.url || ''
    });
  }
  del = (pic) => {
    const newArr = this.state.fileList.filter(item => {
      return item.uid !== pic.uid
    })
    this.setState(() => {
      return {
        fileList: newArr
      };
    })
    if (this.props.getFile) {
      this.props.getFile(newArr)
    }
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">{ this.props.fileInfo.tip }</div>
      </div>
    );
    return (
      <div className="qui-fx">
        {this.state.fileList.map((item, index) => {
          return (
            <div
              onMouseOver={() => this.showTip(index)}
              key={item.uid}
              className="qui-fx qui-fx-ac-jc"
              style={{
                position: 'relative',
                marginRight: '10px',
                backgroundColor: '#fff',
                border: '1px dashed #ccc',
                height: this.props.fileInfo.h + 'px',
                width: this.props.fileInfo.w + 'px',
              }}
            >
              {this.state.currentIndex === index ? (
                <div
                  onMouseLeave={this.showTip}
                  className={`${styles.showTip} qui-fx-ac-jc`}
                  v-if="currentIndex === index"
                >
                  <div>
                    <Icon type="eye" onClick={() => this.show(true, item)} />
                    <Icon type="delete" onClick={() => this.del(item)} />
                  </div>
                </div>
              ) : (
                ''
              )}
              <img
                src={item.url}
                style={{
                  width: this.props.fileInfo.w + 'px',
                  height: this.props.fileInfo.h + 'px',
                }}
                alt=""
              />
            </div>
          );
        })}
        <Upload
          name="fileList"
          action={this.props.fileInfo.url}
          listType="picture-card"
          showUploadList={false}
          onChange={this.uploadPic}
        >
          {fileList.length > this.props.length ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={ () => this.show(false)}>
          <img style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

