import React from 'react';
import ContentEditable from 'react-contenteditable';

class BoardPageTitle extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
    }
    this.handleBoardTitleChange = this.handleBoardTitleChange.bind(this);
    this.handleUpdateBoardTitle = this.handleUpdateBoardTitle.bind(this);
  }

  componentDidMount(){
    this.setState({
      title: this.props.title,
    })
  }

  handleBoardTitleChange(e){
    this.setState({
      title: e.target.value
    })
  }

  handleUpdateBoardTitle(){
    if (this.state.title === ''){
      this.setState({
        title: this.props.title,
      })
    } else {
      this.props.editTitle(this.state.title);
    }
  }

  render(){
    return(
      <div>
        <p className="weekPageContent-weekOfSubtitle">Board</p>
        <ContentEditable
          className="boardPageTitle-editable"
          onChange={this.handleBoardTitleChange}
          onBlur={this.handleUpdateBoardTitle}
          html={this.state.title}
        />
      </div>
    )
  }
}
export default BoardPageTitle
