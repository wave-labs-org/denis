import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dimensions, maxWidth } from "./dashboardHelper";
import { connect } from "react-redux";
import { logout, setAuthorizationToken } from "../../redux/auth/actions";
import { Divider, Dropdown, Menu, Space } from "antd";

const FlexContainer = styled.section`
    position: static;
    z-index: 990;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 50px 100px 0px 100px;
    box-sizing: border-box;
    margin: auto;
    max-width: ${maxWidth};

    @media (max-width: ${dimensions.maxWidth}) {
        padding: 50px 50px 0px 50px;
    }

    @media (max-width: ${dimensions.lg}) {
        padding: 50px 50px;
    }

    @media (max-width: ${dimensions.md}) {
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }
`;

const Logo = styled(Link)`
    width: 50%;
    color: white;

    h1 {
        width: 100%;
        box-sizing: border-box;
        margin: 0px;
        font-size: clamp(40px, 6vw, 50px);
        color: inherit;
        font-weight: 900;
        line-height: 94%;
        font-family: "Prata", serif;
        letter-spacing: 0.041em;
        color: white;
    }

    &:hover {
        h1 {
            color: white;
        }
    }
`;

const Avatar = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    .user-image {
        width: 30px;
        height: 30px;
        border-radius: 30px;
    }

    .dropdown-icon {
        width: 12px;
    }
`;

const Login = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    font-size: 18px;

    .link {
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.8);

        &:hover {
            color: white;
        }
    }

    @media (max-width: ${dimensions.xl}) {
        display: none;
    }
`;

const MenuIcon = styled.div`
    display: none;
    cursor: pointer;

    img {
        width: 40px;
        float: right;
        margin-top: 10px;
    }

    @media (max-width: ${dimensions.xl}) {
        display: block;

        img {
            margin: auto;
        }
    }

    @media (max-width: ${dimensions.lg}) {
        img {
            width: 30px;
        }
    }
`;

const navbarItems = [
    { to: "/dashboard/", title: "Profile", treshold: 0 },
    { to: "/dashboard/collections", title: "Collections", treshold: 0 },
    { to: "/dashboard/reports", title: "Reports", treshold: 0 },
    { to: "/dashboard/users", title: "Users", treshold: 2 },
    { to: "/dashboard/debris", title: "Debris", treshold: 0 },
    { to: "/dashboard/biodiversity", title: "Biodiversity", treshold: 0 },
];

function Navbar({
    permissionLevel,
    user,
    isAuthenticated,
    setAuthorizationToken,
    logout,
}) {
    const handleLogout = () => {
        logout().then((response) => {
            if (response.action.payload.status == 200) {
                localStorage.removeItem("token");
                setAuthorizationToken(false);
            }
        });
    };

    const menu = (
        <Menu>
            {/* {navbarItems.map((item, index) => (
                <>
                    {permissionLevel >= item.treshold &&
                        <Menu.Item key={index}>
                            <Link className='link' to={item.to}>{item.title}</Link>
                        </Menu.Item>
                    }
                </>
            ))} 

            <Divider />*/}
            <Menu.Item key={index}>
                <div onClick={handleLogout} className="link">
                    Logout
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <FlexContainer>
            <Logo to="/">
                <h1>DeNIS</h1>
            </Logo>
            <Login>
                {isAuthenticated ? (
                    <>
                        {navbarItems.map((item, index) => (
                            <>
                                {permissionLevel >= item.treshold && (
                                    <Link
                                        key={index}
                                        className="link"
                                        to={item.to}
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </>
                        ))}
                        <Dropdown overlay={menu}>
                            <Avatar onClick={(e) => e.preventDefault()}>
                                <img
                                    src={user?.image}
                                    alt="profile"
                                    className="user-image"
                                />
                                <img
                                    src="/images/icons/dashboard/dropdown_white.svg"
                                    alt="dropdown"
                                    className="dropdown-icon"
                                />
                            </Avatar>
                        </Dropdown>
                    </>
                ) : (
                    <Link className="link" to="/login">
                        Login
                    </Link>
                )}
            </Login>

            <MenuIcon>
                {isAuthenticated ? (
                    <Dropdown overlay={menu}>
                        <img src="/images/icons/menu_white.svg" alt="menu" />
                    </Dropdown>
                ) : (
                    <Link className="link" to="/login">
                        Login
                    </Link>
                )}
            </MenuIcon>
        </FlexContainer>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    };
};

const mapStateToProps = (state) => {
    return {
        permissionLevel: state.auth.permissionLevel,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.currentUser,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
