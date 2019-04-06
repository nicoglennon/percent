import React from 'react';
import { Transition } from 'react-spring';

class CategoryPill extends React.Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        }

        showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        if(this.dropdownMenu === null){
            document.removeEventListener('click', this.closeMenu);
        }

        else if (!this.dropdownMenu.contains(event.target)) {

            this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
            });

        }
    }

    render(){
        var edit = this.props.edit;
        var categories = this.props.categories;
        var selectCategoryFunct = this.props.handleSelectCategory;

        var firstStyle = {
            backgroundColor: 'rgb(255, 118, 167)',
            color: 'white'
        }
        var secondStyle = {
            backgroundColor: 'rgb(132, 116, 255)',
            color: 'white'
        }
        var plusStyle = {
            backgroundColor: 'rgb(93, 93, 93)',
            color: 'white',
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            textAlign: 'center',
        }
        var categoriesHTML;
        var newCategoryButton;
        if(categories){
            categoriesHTML = categories.map(function(cat, index){
                return <div className="categoryPill-selectPill" style={ index === 0 ? firstStyle : secondStyle } key={index} onClick={selectCategoryFunct}>{cat}</div>
            });
            newCategoryButton = <div className="categoryPill-selectPill" style={plusStyle} key="-1"> ＋ </div>;
            categoriesHTML.push(newCategoryButton);
        }
        var categoryString = this.props.category;
        var emptyCategory = this.props.category === undefined || this.props.category === null;
        var emptyStyle = {
            backgroundColor: 'rgb(232, 230, 230)',
        }
        var categories = this.props.categories;
        return(
            <div>
                <span className="categoryPill-outerSpan" onClick={this.showMenu} style={emptyCategory ? emptyStyle : (categoryString === "Personal" ? firstStyle : secondStyle)}></span>
                {
                    this.state.showMenu
                    ? (
                        <Transition
                        items={this.state.showMenu}
                        from={{ opacity: 0, transform: 'translateY(-10px)' }}
                        enter={{ opacity: 1, transform: 'translateY(0px)' }}>
                        { show => props =>
                            <div
                            style={props}
                            ref={(element) => {
                                this.dropdownMenu = element;
                            }}
                            >
                                <div className={edit ? "categoryPill-menu" : "categoryPill-menu noEdit"} style={emptyCategory ? emptyStyle : (categoryString === "Personal" ? firstStyle : secondStyle)}>
                                { emptyCategory 
                                ? 
                                    <div>
                                        {edit ? categoriesHTML : 'No Category'}
                                    </div>
                                    

                                :
                                    <div>
                                        {categoryString}
                                        {edit && <span className="categoryPill-closeMenu" onClick={this.props.handleClearCategory}>✕</span>}
                                    </div>
                                }    
                                </div>
                            </div>
                        }
                        </Transition>
                    )
                    : (
                        null
                    )
                }
            </div>
        )
    }
}
export default CategoryPill
