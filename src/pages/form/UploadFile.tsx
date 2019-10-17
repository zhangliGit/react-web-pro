import React, {Component} from 'react'
import UploadMulti from '@c/UploadMulti'

export default class UploadFile extends Component {
  state = {
    fileList: []
  }
  fileInfo = {
    url: '/upload/base/file/freeUpload', // 接口地址
    tip: '上传照片',
    w: 102,
    h: 102
  }
  getFile = (fileList : Array<Object>) => {
    console.log(fileList)
  }
  render () {
    return (
      <UploadMulti ref="upload" fileList = {this.state.fileList} getFile = {this.getFile} length ={5} fileInfo ={this.fileInfo}></UploadMulti>
    )
  }
}