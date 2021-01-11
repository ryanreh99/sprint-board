import React from "react";

import Card from "../../components/Card/Card.jsx";

class Feed extends React.Component {
  constructor(props) {
    super(props);
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
      error: () => {
        $("#display_task").hide();
      },
      dataType: "json",
    });
  }

  render() {
    return (
      <div>
        {this.state.items.map((item, order) => (
          <Card item={item} order={order} />
        ))}
      </div>
    );
  }
}

export default Feed;
