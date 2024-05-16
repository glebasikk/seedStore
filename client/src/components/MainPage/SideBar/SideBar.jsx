import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import ReactDOM from "react-dom";
import $ from "jquery";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
const SideBar = (props) => {
  // const [categories,setCategories]=useState([])

  let searchCategories = (event) => {
    let categories = [];
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    for (var i = 0; i < checkboxes.length; i++) {
      categories.push(checkboxes[i].value);
    }
    categories = categories.map(Number);
    categories = categories.filter((x) => !isNaN(x));
    console.log(categories)
    props.searchCategories(categories);
  };

  return (
    <div>
      {window.innerWidth > 1220 && (
        <div className="side-bar">
          <div className="params-div">
            <p className="params">Параметры</p>
            <hr className="long-hr" />
          </div>
          <form id="categoriesForm" onChange={searchCategories}>
            <div className="column">
              Способ выращивания
              <hr className="small-hr" />
              {props.growType.map((x) => (
                <label className="label">
                  <input className="input" type="checkbox" value={x.id} />
                  <span></span>
                  {x.name}
                </label>
              ))}
            </div>

            <div className="column">
              <input id="trigger1" type="checkbox" />
              <div class="catalog_item1">
                <div>
                  Вид
                  <hr className="small-hr" />
                  <ul>
                    {props.type.map((x) => (
                      <li>
                        <label className="label">
                          <input
                            className="input"
                            type="checkbox"
                            value={x.id}
                          />
                          <span></span>
                          {x.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="column">
              <input id="trigger2" type="checkbox" />
              <div class="catalog_item2">
                <div>
                  Поставщик
                  <hr className="small-hr" />
                  <ul>
                    {props.provider.map((x) => (
                      <li>
                        <label className="label">
                          <input
                            className="input"
                            type="checkbox"
                            value={x.id}
                          />
                          <span></span>
                          {x.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {window.innerWidth < 1220 && (
        <div className="side-bar">
        <div className="params-div">
          <p className="params">Параметры</p>
          <hr className="long-hr" />
        </div>
        <form id="categoriesForm" onChange={searchCategories}>
        <div className="column">
              <input id="trigger3" type="checkbox" />
              <div class="catalog_item3">
                <div>
                  <label for="trigger3" class="open_list3">
                    <span className="show--list3">Поставщик<KeyboardArrowDownIcon/></span>
                    <span className="hide--list3">Поставщик<CloseIcon/></span>
                  </label>
                  <hr className="small-hr" />
                  <ul>
                    {props.provider.map((x) => (
                      <li>
                        <label className="label">
                          <input
                            className="input"
                            type="checkbox"
                            value={x.id}
                          />
                          <span></span>
                          {x.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <div className="clear3"></div>
                 
                </div>
              </div>
            </div>

          <div className="column">
            <input id="trigger1" type="checkbox" />
            <div class="catalog_item1">
              <div>
                <label for="trigger1" class="open_list1">
                  <span className="show--list1">Вид<KeyboardArrowDownIcon/></span>
                  <span className="hide--list1">Вид<CloseIcon/></span>
                </label>
                <hr className="small-hr" />
                <ul>
                  {props.type.map((x) => (
                    <li>
                      <label className="label">
                        <input
                          className="input"
                          type="checkbox"
                          value={x.id}
                        />
                        <span></span>
                        {x.name}
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="clear1"></div>
              </div>
            </div>
          </div>

          <div className="column">
            <input id="trigger2" type="checkbox" />
            <div class="catalog_item2">
              <div>
                <label for="trigger2" class="open_list2">
                  <span className="show--list2">Поставщик<KeyboardArrowDownIcon/></span>
                  <span className="hide--list2">Поставщик<CloseIcon/></span>
                </label>
                <hr className="small-hr" />
                <ul>
                  {props.provider.map((x) => (
                    <li>
                      <label className="label">
                        <input
                          className="input"
                          type="checkbox"
                          value={x.id}
                        />
                        <span></span>
                        {x.name}
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="clear2"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
      )}
    </div>
  );
};

export default SideBar;
/*
 <div className="side-bar">
      
        <p className="params">Параметры</p>
        <hr className="long-hr"/>
      
      <div className="column">
      Способ выращивания
      <hr className="small-hr"/>
      {props.growType.map((x) => (
          <label className="label">
            <input className="input" type="checkbox" />{x}
        </label>
      ))}
     
      </div>
      <div className="column">
       Вид
      <hr className="small-hr"/>
      {props.type.map((x) => (
          <label className="label">
            <input className="input" type="checkbox" />{x}
        </label>
      ))}
      <p className="show-more">Показать еще</p>
      <hr className="tiny-hr"/>
      </div>
      <div className="column">
      Производитель
      <hr className="small-hr"/>
      {props.provider.map((x) => (
        <label className="label">
          <input className="input" type="checkbox" />{x}
        </label>
      ))}
      <label for="trigger" class="open-list">
      <p className="show-more">Показать еще</p>
      <p className="hide-list">Показать еще</p>
      <hr className="tiny-hr"/>
      </label>
      </div>
    </div>
*/
