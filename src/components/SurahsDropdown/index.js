import React, { Component, PropTypes } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import Col from 'react-bootstrap/lib/Col';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { surahType } from 'types';

const styles = require('./style.scss');

export default class SurahsDropdown extends Component {
  static propTypes = {
    surahs: PropTypes.objectOf(surahType).isRequired,
    title: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.surahs !== nextProps.surahs;
  }

  renderList() {
    const { surahs } = this.props;

    return Object.values(surahs).map((surah, index) => (
      <LinkContainer to={`/${surah.id}`} activeClass="active" key={`surah-${index}`}>
        <MenuItem>
          <div className="row">
            <Col xs={2} md={2}>
              <span className="surah-num">
                {surah.id}
              </span>
            </Col>
            <Col xs={7} md={7}>
              <span className="suran-name">{surah.name.simple}</span>
              <br />
              <span className="surah-meaning">{surah.name.english}</span>
            </Col>
            <Col xs={3} md={3} className={`text-right ${styles.arabicName}`}>
              {surah.name.arabic}
            </Col>
          </div>
        </MenuItem>
      </LinkContainer>
    ));
  }

  render() {
    const { title } = this.props;

    return (
      <NavDropdown
        link
        className={styles.dropdown}
        id="surahs-dropdown"
        title={title || <LocaleFormattedMessage id="setting.surahs" defaultMessage="Surahs" />}
      >
        {this.renderList()}
      </NavDropdown>
    );
  }
}
