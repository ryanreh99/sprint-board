import React from "react";

class Card extends React.Component {
  render() {
    const { item, order } = this.props;
    return (
      <React.Fragment key={order}>
        <div className="row task_elem" data-task-id={item.id}>
          <div className="col-md-3">
            <div className="view overlay rounded z-depth-1">
              <img
                src={item.image_src}
                className="img-fluid thumbnail-images"
                alt=""
              />
            </div>
          </div>

          <div className="col-md-9">
            <p className="dark-grey-text">
              <strong>{item.title}</strong>
            </p>
            <p>
              $ {item.pay} / hour within {item.days} days.
            </p>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default Card;
