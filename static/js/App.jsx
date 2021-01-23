import React from "react";

import Feed from "./components/Feed/Feed.jsx";
import CardLarge from "./components/Card/CardLarge.jsx";

const MIN_TWO_COLUMN_WIDTH = 992;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onShow = this.onShow.bind(this);
    this.state = {
      isSelected: false,
      selected_task: {},
    };
  }

  onSelectChange() {
    this.setState({
      isSelected: true,
    });
  }

  onShow(task) {
    let height;
    if ($(window).width() >= MIN_TWO_COLUMN_WIDTH) {
      height = document.scrollingElement.scrollTop - $("#root").offset().top;
      height = Math.max(0, height + $(".navbar").outerHeight() + 5);
    }

    let src = "https://mdbootstrap.com/img/Photos/Others/photo8.jpg";
    if (task.image_hash) src = `task_images/${task.id}/${task.image_hash}`;

    const selected = {
      padding: height,
      title: task.title,
      description: task.description,
      src,
    };

    selected.task_info = `$${task.pay} per hour, within ${task.days} days.`;
    selected.created_date = `Created at: ${task.create_date}`;
    selected.creator_info = `By: ${task.creator}`;

    this.setState({
      selected_task: selected,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Feed onSelectChange={this.onSelectChange} onShow={this.onShow} />
        <CardLarge
          isSelected={this.state.isSelected}
          task={this.state.selected_task}
        />
      </React.Fragment>
    );
  }
}

export default App;
