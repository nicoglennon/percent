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
            backgroundColor: 'rgb(166, 239, 169)'
        }
        var secondStyle = {
            backgroundColor: 'rgb(171, 180, 251)'
        }
        var categoriesHTML;
        if(categories){
            categoriesHTML = categories.map(function(cat, index){
                return <div className="categoryPill-selectPill" style={ index === 0 ? firstStyle : secondStyle } key={index} onClick={selectCategoryFunct}>{cat}</div>
            });
        }
        var categoryString = this.props.category;
        var emptyCategory = this.props.category === undefined || this.props.category === null;
        var emptyStyle = {
            backgroundColor: 'lightgray',
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
