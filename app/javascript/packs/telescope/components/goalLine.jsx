import React from 'react';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html-react';
import CategoryPill from './categoryPill.jsx';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const StyledGoalWrapper = styled.div`
  margin-bottom: 10px;
  border-radius: 9px;
  background-color: ${props => (props.isDragging ? 'rgb(255, 233, 231)' : 'rgba(0, 0, 0, 0.04)')};
  transition: background-color 400ms ease;
`;

const DragHandle = styled.div`
  display: inline-block;
  margin-right: 5px;
  padding: 0px 6px;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

const DragHandleHidden = styled.span`
  display: none;
`;

class GoalLine extends React.Component {
  constructor(){
    super();
    this.state = {
      isHovered: false,
      goalInput: '',
      isChecked: false,
      goalCategory: null
    }

    this.handleDeleteGoal = this.handleDeleteGoal.bind(this);
    this.handleHoverGoal = this.handleHoverGoal.bind(this);
    this.handleUnhoverGoal = this.handleUnhoverGoal.bind(this);
    this.handleGoalInputChange = this.handleGoalInputChange.bind(this);
    this.handleGoalInputBlur = this.handleGoalInputBlur.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.clearCategory = this.clearCategory.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  componentDidMount(){
    this.setState({
      goalInput: this.props.goal.title,
      goalCategory: this.props.goal.category
    })
  }

  handleGoalInputChange(e){
    this.setState({
      goalInput: e.target.value
    })
  }

  clearCategory(){
    this.setState({
      goalCategory: null
    })
    this.props.updateGoal(this.props.goal, this.state.goalInput, null);
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

  handleGoalInputBlur(){

    var sanitizedGoal = this.sanitizeHtmlTwice(this.state.goalInput);
    if(sanitizedGoal === ''){
      this.setState({
        goalInput: this.props.goal.title
      })
    } else {
      if (sanitizedGoal !== this.props.goal.title){
        this.props.updateGoal(this.props.goal, sanitizedGoal, this.state.goalCategory)
      }
      this.setState({
        goalInput: sanitizedGoal,
      })
    }
  }

  handleKeyPress(e){
    // blur on pressing enter on the boardTitle
    if(e.charCode == 13) {
      e.preventDefault();
      e.target.blur();
    }
  }

  handleDeleteGoal() {
    this.props.deleteGoal(this.props.goal);
  }

  handleHoverGoal() {
    this.setState({
      isHovered: true
    })
  }

  handleUnhoverGoal() {
    this.setState({
      isHovered: false
    })
  }

  handleSelectCategory(e){
    this.setState({
      goalCategory: e.target.innerText
    })
    this.props.updateGoal(this.props.goal, this.state.goalInput, e.target.innerText);
  }

  handleCheckboxChange(e){
    this.setState({
      isChecked: e.target.checked
    });
    if (this.props.updateCheckbox){
      this.props.updateCheckbox(this.props.goal, e.target.checked);
    }
  }

  render(){
    var goalLineWrapperStyling = '';
    var checkbox;
    var deleteGoalButton;
    var categoryPillEditable = <CategoryPill edit={true} category={this.state.goalCategory} categories={this.props.categories} handleClearCategory={this.clearCategory} handleSelectCategory={this.handleSelectCategory} />;
    var categoryPillNotEditable = <CategoryPill edit={false} category={this.state.goalCategory} />;
    let draggableId = this.props.goal.shortid ? this.props.goal.shortid : this.props.goal.id;
    if (this.props.showDeleteButton && this.state.isHovered === true) {
      deleteGoalButton = <span className="goalLine-deletebuttonspan" onClick={this.handleDeleteGoal}>✕</span>
    }

    if (this.props && this.props.showCheckbox) {
      checkbox = <input className="goalLineCheck" type="checkbox" checked={this.props.goal.completed} onChange={this.handleCheckboxChange} />
      if (this.props && this.props.goal.completed) {
        goalLineWrapperStyling = ' goalLineWrapper-completed';
      }
    }
    return(
      <Draggable draggableId={draggableId} index={this.props.index}>
        {(provided, snapshot) => (
          <StyledGoalWrapper
            {...provided.draggableProps} 
            
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className={'goalLineWrapper' + goalLineWrapperStyling} onMouseOver={this.handleHoverGoal} onMouseLeave={this.handleUnhoverGoal}>
              {checkbox}
              {checkbox && <DragHandleHidden {...provided.dragHandleProps}></DragHandleHidden>}
              {!checkbox && <DragHandle {...provided.dragHandleProps}>☰</DragHandle>}
              {!checkbox && categoryPillEditable}
              <ContentEditable
                className="goalLineInput"
                onChange={this.handleGoalInputChange}
                onBlur={this.handleGoalInputBlur}
                onKeyPress={this.handleKeyPress}
                html={this.state.goalInput}
                disabled={this.props.disabled}
              />
              {checkbox && categoryPillNotEditable}
              {deleteGoalButton}
            </div>
          </StyledGoalWrapper>
        )}
      </Draggable>
    )
  }
}
export default GoalLine
