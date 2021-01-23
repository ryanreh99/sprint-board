import React from "react";

import Card from "../../components/Card/Card.jsx";

const noop = () => {};

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "tasks",
      success: (data) => {
        this.setState({
          items: data.tasks,
        });
      },
      error: noop,
      dataType: "json",
    });
  }

  onSelect(event, task_id) {
    event.preventDefault();
    event.stopPropagation();

    if (!task_id) return;
    this.props.onSelectChange();

    $.ajax({
      type: "GET",
      url: "tasks/" + task_id,
      success: this.props.onShow,
      error: noop,
      dataType: "json",
    });
  }

  render() {
    return (
      <div id="left-feed" className="col-lg-6 col-md-12">
        <div>
          {this.state.items.map((item, order) => (
            <Card key={item.id} item={item} onClick={this.onSelect} />
          ))}
        </div>
      </div>
    );
  }
}

export default Feed;
