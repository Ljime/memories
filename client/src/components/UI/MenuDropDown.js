import classes from './MenuDropDown.module.css'

const MenuDropDown = (props) => {
    const items = props.items.map(item => {
        return <li key={Math.random()} className={classes.menuDropDownItem}>{item.title}</li>
    });
    return (
        <div className={classes.menuContainer}>
            <div className={classes.menu}>
                <ul className={classes.menuDropDown}>
                    {items}
                </ul>
            </div>
        </div>
    )
}

export default MenuDropDown