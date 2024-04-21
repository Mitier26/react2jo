import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown'; // 드롭다운 컴포넌트 추가
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import app from '../firebase';
import { useSelector } from 'react-redux';
import '../Layout/App_Layout.css';
import Logo from '../assets/siteLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const AppLayout = ({ isLogged }) => {
    const { currentUser } = useSelector(state => state.user);
    const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태 추가
    const [keyword, setKeyword] = useState();
    const navigate = useNavigate();
    const auth = getAuth(app);

    const searchByKeyword = (event) => {
        event.preventDefault();
        navigate(`/search?q=${keyword}`);
        setKeyword('');
    };

    // 로그아웃 모듈
    const handleLogout = () => {
        signOut(auth).then(() => {}).catch((err) => {
            console.error(err);
        });
        alert('로그아웃 되었습니다.');
        navigate('/');
    }

    const handleLogin = () => {
        navigate('/auth/login');
    }

    const handleMyPage = () =>{
        navigate('/auth/myPage');
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-black">
                <Container fluid>
                    <Navbar.Brand className="text-black fw-bold" href="/">
                        <img src={Logo} alt="Logo" width="30" height="30" className="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link className="text-style" href="/">
                                홈
                            </Nav.Link>
                            <Nav.Link className="text-style" href="/camping">
                                캠핑장
                            </Nav.Link>
                            <Nav.Link className="text-style" href="/festival">
                                축제
                            </Nav.Link>
                        </Nav>
                        <Form
                            className="d-flex search-btn"
                            onSubmit={(event) => {
                                searchByKeyword(event);
                            }}
                        >
                            <Form.Control
                                type="search"
                                placeholder="내일은 어디로 갈까?"
                                className="input-style"
                                aria-label="Search"
                                value={keyword}
                                onChange={(event) => setKeyword(event.target.value)}
                            />
                            <Button variant='warning' type="submit" className=''>
                                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            </Button>
                            {isLogged ? (
                                <Dropdown show={dropdownOpen} onClick={toggleDropdown}>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" className='drop-toggle' size="m">
                                        <a className="userImageContainer">
                                            <img src={currentUser.photoURL} className='userImage' alt="User" />
                                        </a>
                                        <a>{currentUser.displayName}</a>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdownContainer">
                                        <Dropdown className='UserName'>{currentUser.displayName} 님</Dropdown>
                                        <Dropdown.Item onClick={handleMyPage}>마이페이지</Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Button
                                    className="ms-3"
                                    variant="outline-dark"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            )}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
};

export default AppLayout;
