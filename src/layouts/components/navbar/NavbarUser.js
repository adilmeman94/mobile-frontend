import React from "react";
import { connect, useDispatch } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,NavItem, NavLink
} from "reactstrap";
import * as Icon from "react-feather";
import defaultImage from "../../../assets/img/profile.jpg";
import { history } from "../../../history";
import { Link } from "react-router-dom";
import { AuthService } from "../../../services/api.service";
import { TOKEN_KEY } from "../../../configs/constant";
import { Sun, Moon } from 'react-feather'

const UserDropdown = (props) => {
  // const { skin, setSkin } = props;
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem(TOKEN_KEY);
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      AuthService.logOut();
      dispatch({ type: "PURGE_AUTH" });
    } catch (ex) {
      console.log(ex);
    }
  };

  const onChangePassword = async () => {
    await AuthService.resetPassword();
    history.push("/authentication/changepassword/");
  };

  // const ThemeToggler = (props) => {
  //   if (skin === "dark") {
  //     return <Sun className="ficon" onClick={() => setSkin("light")} />;
  //   } else {
  //     return <Moon className="ficon" onClick={() => setSkin("dark")} />;
  //   }
  // };

  return (
      <DropdownMenu>
        
        <Link to="/profile">
          <DropdownItem tag="a">
            <Icon.User size={14} className="mr-50" />
            <span className="align-middle">Admin Details</span>
          </DropdownItem>
        </Link>
        <Link to="/profile/edit">
          <DropdownItem tag="a">
            <Icon.Edit size={14} className="mr-50" />
            <span className="align-middle">Edit Profile</span>
          </DropdownItem>
        </Link>
        <Link to="/ChangePassword">
          <DropdownItem tag="a">
            <Icon.Lock size={14} className="mr-50" />
            <span className="align-middle">Change Password</span>
          </DropdownItem>
        </Link>
        <DropdownItem divider />
        <DropdownItem tag="a" onClick={onLogout}>
          <Icon.Power size={14} className="mr-50" />
          <span className="align-middle">Log Out</span>
        </DropdownItem>
      </DropdownMenu>
    
  );
};

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: [],
  };

  componentDidMount() {}

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  render() {
    const userId = localStorage.getItem("id");
    return (
      <>
        <ul className="nav navbar-nav navbar-nav-user float-right">
        
        </ul>
        <ul className="nav navbar-nav navbar-nav-user float-right">
          <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle tag="a" className="nav-link dropdown-user-link">
              <div className="user-nav d-sm-flex d-none">
                <span className="user-name text-bold-600">
                  {`${this.props.currentUser?.firstName} ${this.props.currentUser?.lastName}`}
                </span>
                <span className="user-status">
                  {this.props.currentUser?.email}
                </span>
              </div>
              <span data-tour="user">
                <img
                  src={this.props.currentUser?.image || defaultImage}
                  className="round"
                  height="40"
                  width="40"
                  alt="avatar"
                />
              </span>
            </DropdownToggle>
            
            <UserDropdown {...this.props} />
            
          </UncontrolledDropdown>
        </ul>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(NavbarUser);
