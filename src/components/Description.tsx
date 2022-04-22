import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Description.css";

class Description extends Component<DescriptionProps> {
  render() {
    const { specSelectors, getComponent } = this.props;

    const info = specSelectors.info();
    const description = info.get("description");

    const Markdown = getComponent("Markdown", true);

    return (
      <div className="swagger--description">
        {description ? <Markdown source={description} /> : "-"}
      </div>
    );
  }
}
interface DescriptionProps {
  getComponent: () => void;
  specSelectors: {};
}

export default Description;
