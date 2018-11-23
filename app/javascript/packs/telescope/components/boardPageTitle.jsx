import React from 'react';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html-react';

class BoardPageTitle extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
    }
    this.handleBoardTitleChange = this.handleBoardTitleChange.bind(this);
    this.handleUpdateBoardTitle = this.handleUpdateBoardTitle.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.sanitizeHtmlTwice = this.sanitizeHtmlTwice.bind(this);
  }

  componentDidMount(){
    this.setState({
      title: this.props.title,
    })
  }

  handleBoardTitleChange(e){
    this.setState({
      title: e.target.value,
    })
  }

  sanitizeHtmlTwice(html){
    var once = sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: []
    });

    return sanitizeHtml(once, {
      allowedTags: [],
      allowedAttributes: []
    }).trim();
  }

  handleUpdateBoardTitle(){
    var sanitizedTitle = this.sanitizeHtmlTwice(this.state.title);
    if (sanitizedTitle === ''){
      this.setState({
        title: this.props.title,
      })
    } else {
      if (sanitizedTitle !== this.props.title){
        this.props.editTitle(sanitizedTitle);
      }
      this.setState({
        title: sanitizedTitle,
      })
    }
  }

  handleKeyPress(e){
    // blur on pressing enter on the title
    if(e.charCode == 13) {
      e.preventDefault();
      e.target.blur();
    }
  }

  render(){
    return(
      <div>
        <p className="weekPageContent-weekOfSubtitle">Goals</p>
        {/* <ContentEditable
          className="boardPageTitle-editable"
          onChange={this.handleBoardTitleChange}
          onBlur={this.handleUpdateBoardTitle}
          onKeyPress={this.handleKeyPress}
          html={this.state.title}
        />*/}
        <h2 className="weekPageContent-date">Set your Goals</h2>
      </div>
    )
  }
}
export default BoardPageTitle
