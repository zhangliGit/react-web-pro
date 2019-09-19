import { Avatar, Icon, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { ConnectProps, ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps extends ConnectProps {
  currentUser?: CurrentUser;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    }
    router.push(`/account/${key}`);
  };

  render(): React.ReactNode {

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="lock">
          <Icon type="lock" />
          <FormattedMessage id="menu.account.lock" defaultMessage="lock" />
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    return (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <div className={`${styles.action} ${styles.account}`} >
          <img
            style={{
              display: 'block',
              width: '40px',
              height: '40px',
              float: 'left',
              borderRadius: '100%',
              marginTop: '12px',
              marginRight: '10px'
            }}
            src="http://canpoint.oss-cn-beijing.aliyuncs.com/2019/08/24/481aa33b351447eeaf1944da8f845bdf.jpg"
            alt=""
          />
          <span className={styles.name}>全品文教</span>
        </div>
      </HeaderDropdown>
    );
  }
}
export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
