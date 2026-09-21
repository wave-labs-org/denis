import { Dropdown, Menu } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dimensions } from "./Dashboard/dashboardHelper";
import { logout, setAuthorizationToken } from "../redux/auth/actions";
import { colors } from "../helper";

const FlexContainer = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 990;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 50px 80px 0px 80px;
    box-sizing: border-box;

    .link {
        color: rgba(0, 0, 0, 0.8);
        transition: color 0.3s ease;
        cursor: pointer;
        font-size: 16px;

        &:hover {
            color: black;
        }
    }

    .login {
        background-color: ${colors.main};
        color: white;
        padding: 10px 20px;
        box-sizing: border-box;

        &:hover {
            color: white;
        }
    }

    @media (max-width: ${dimensions.xl}) {
        padding: 50px 50px 0px 50px;
    }

    @media (max-width: ${dimensions.lg}) {
        padding: 50px 20px;
    }

    @media (max-width: ${dimensions.md}) {
        justify-content: space-around;
        padding: 20px;
        position: absolute;
        align-items: center;

        .link {
            display: none;
        }
    }
`;

const Logo = styled.div`
    width: 50%;
    color: white;
    position: relative;

    .logo {
        margin: 0px;
        width: 40%;
        display: none;
    }

    h1 {
        width: 100%;
        box-sizing: border-box;
        margin: 0px;
        font-size: clamp(32px, 6vw, 50px);
        color: inherit;
        font-weight: 100;
        line-height: 94%;
        font-family: "Prata", serif;
        letter-spacing: 0.041em;
    }

    .menu {
        position: absolute;
        right: 0;
        top: 0;
        display: none;
        cursor: pointer;

        img {
            width: 30px;
        }
    }

    @media (max-width: ${dimensions.lg}) {
        width: 100%;

        .menu {
            filter: invert(100%);
        }
    }

    @media (max-width: ${dimensions.md}) {
        text-align: center;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.6);
        padding: 10px;
        box-sizing: border-box;
        border-radius: 12px;

        .menu {
            position: relative;
            display: block;
            filter: invert(0%);

            img {
                width: 35px;
            }
        }

        .logo {
            display: block;
        }
    }
`;

const Login = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    position: relative;

    .logo {
        max-width: 300px;
        width: 40%;
        min-width: 100px;
        margin-left: 100px;
    }

    &:before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 200px;
        z-index: -1;
        background-color: white;
    }

    @media (max-width: ${dimensions.xl}) {
        font-size: 14px;
        gap: 10px;

        .logo {
            margin-left: 50px;
        }
    }

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
        margin: 0px 20px;
        box-sizing: border-box;
    }

    @media (max-width: ${dimensions.md}) {
        display: none;
    }
`;

const navbarItems = [
    { to: "/dashboard/", title: "Profile", treshold: 0 },
    { to: "/dashboard/collections", title: "Collections", treshold: 0 },
    { to: "/dashboard/reports", title: "Reports", treshold: 0 },
    // { to: "/dashboard/users", title: "Users", treshold: 2 },
    // { to: "/dashboard/debris", title: "Debris", treshold: 0 },
    // { to: "/dashboard/biodiversity", title: "Biodiversity", treshold: 0 },
];

function Navbar({
    permissionLevel,
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
            {navbarItems.map((item, index) => (
                <>
                    {permissionLevel >= item.treshold && (
                        <Menu.Item key={index}>
                            <Link className="link" to={item.to}>
                                {item.title}
                            </Link>
                        </Menu.Item>
                    )}
                </>
            ))}
            <Menu.Item key={index}>
                <div onClick={handleLogout} className="link">
                    Logout
                </div>
            </Menu.Item>
        </Menu>
    );
    return (
        <FlexContainer>
            <Logo>
                <img className="logo" src="logo_mobile.svg" alt="DeNIS" />

                <div className="menu">
                    {/* <img className="logo" src='logo.svg' alt="DeNIS" /> */}
                    <Dropdown
                        overlay={
                            !isAuthenticated ? (
                                <Menu>
                                    <Menu.Item>
                                        <Link to="/login">Account</Link>
                                    </Menu.Item>
                                </Menu>
                            ) : (
                                menu
                            )
                        }
                    >
                        <img src="/images/icons/menu_main.svg" alt="menu" />
                    </Dropdown>
                </div>
            </Logo>

            {isAuthenticated ? (
                <Login>
                    <img className="logo" src="logo.svg" alt="DeNIS" />
                    {navbarItems.map((item, index) => (
                        <>
                            {permissionLevel >= item.treshold && (
                                <Link key={index} className="link" to={item.to}>
                                    {item.title}
                                </Link>
                            )}
                        </>
                    ))}

                    <div onClick={handleLogout} className="link">
                        Logout
                    </div>
                </Login>
            ) : (
                <Login>
                    <img className="logo" src="logo.svg" alt="DeNIS" />
                    <Link className="link login" to="/login">
                        Account
                    </Link>
                </Login>
            )}
            {/* 
            {isAuthenticated &&
                <MenuIcon>
                    <Dropdown overlay={menu}>
                        <img src="/images/icons/menu_white.svg" alt="menu" />
                    </Dropdown>
                </MenuIcon>
            } */}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
