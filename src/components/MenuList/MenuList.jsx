import MenuItem from '../MenuItem/MenuItem'
import './MenuList.css'

function MenuList({ meals }) {
  return (
    <div className="menu-list">
      {meals.map(meal => (
        <MenuItem key={meal.idMeal} meal={meal} />
      ))}
    </div>
  )
}

export default MenuList