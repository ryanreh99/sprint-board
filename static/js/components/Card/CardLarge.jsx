import React from "react";

class CardLarge extends React.Component {
  render() {
    if (!this.props.isSelected) return null;

    const task = this.props.task;

    return (
      <React.Fragment>
        <div
          id="right-feed"
          className="col-lg-6 col-md-12"
          style={{ paddingTop: task.height }}
        >
          <div className="card mb-3">
            <img className="card-img-top" alt="" src={task.src} />
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
              <p className="card-text">
                <small className="text-muted">{task.task_info}</small>
                <br />
                <small className="text-muted">{task.created_date}</small>
                <br />
                <small className="text-muted">{task.creator_info}</small>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CardLarge;
