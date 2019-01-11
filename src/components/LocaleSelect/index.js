import React, { Component } from 'react';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import './index.scss';
const LocaleIcon = ({ lang = 'en-US' }) => {
  return <i className={`locale-icon locale-${lang}`} />;
};

class LocaleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLocaleChange = value => {
    localStorage.setItem('lang', value);
    this.props.onLocaleChange(value);
  };

  render() {
    const { lang } = this.props;
    return (
      <Select
        defaultValue={lang}
        combobox={false}
        showSearch={false}
        optionLabelProp="children"
        value={lang}
        firstActiveValue={lang}
        defaultActiveFirstOption={true}
        onChange={this.handleLocaleChange}
        getPopupContainer={() => document.body}
      >
        <Option value="en-US">
          <span className="option-item">
            <LocaleIcon lang="en-US" />
            English
          </span>
        </Option>
        <Option value="zh-CN">
          <span className="option-item">
            <LocaleIcon lang="zh-CN" />
            中文
          </span>
        </Option>
      </Select>
    );
  }
}

export default LocaleSelect;
