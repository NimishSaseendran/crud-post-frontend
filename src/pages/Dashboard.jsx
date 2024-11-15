import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { getAllPostsApi, addPostApi, getDbPostsApi, deleteDbPostApi, deletePostApi, updateDbPostApi, updatePostApi } from '../services/allApis';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import './Dashboard.css'

function Dashboard() {
    const [postList, setPostList] = useState([]);
    const [dbPostList, setDbPostList] = useState([]);
    const [postDetail, setPostDetail] = useState({ userId: '', title: '', body: '', source: '' });
    const [show, setShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editPostId, setEditPostId] = useState(null);
    const [sortType, setSortType] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for spinner
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const postsPerPage = 18; // Number of posts to show per page

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const handleShow = (post = null, source = '') => {
        if (post) {
            setPostDetail({ ...post, source });
            setIsEdit(true);
            setEditPostId(post.id);
        } else {
            resetForm();
        }
        setShow(true);
    };

    const resetForm = () => {
        setPostDetail({ userId: '', title: '', body: '', source: '' });
        setIsEdit(false);
        setEditPostId(null);
    };

    useEffect(() => {
        getData();
        getDbData();
    }, []);

    const getData = async () => {
        setLoading(true); // Start spinner
        const res = await getAllPostsApi();
        if (res.status === 200) {
            setPostList(res.data);
        }
        setLoading(false); // Stop spinner
    };

    const getDbData = async () => {
        setLoading(true); // Start spinner
        const res = await getDbPostsApi();
        if (res.status === 200) {
            setDbPostList(res.data.reverse());
        }
        setLoading(false); // Stop spinner
    };

    const handleSave = async () => {
        const { userId, title, body, source } = postDetail;
        if (!userId || !title || !body) {
            toast.warning('Enter valid Inputs !!');
        } else {
            if (isEdit) {
                await handleEditPost();
            } else {
                await handleAddPost();
            }
        }
    };

    const handleAddPost = async () => {
        setLoading(true); // Start spinner
        const res = await addPostApi(postDetail);
        if (res.status === 201) {
            toast.success('Post Added Successfully!');
            handleClose();
            getDbData();
        }
        setLoading(false); // Stop spinner
    };

    const handleEditPost = async () => {
        setLoading(true); // Start spinner
        const { source } = postDetail;
        let res;
        if (source === 'db') {
            res = await updateDbPostApi(editPostId, postDetail);
            if (res.status === 200) {
                toast.success('Post Updated Successfully in DB!');
                handleClose();
                getDbData();
            }
        } else {
            res = await updatePostApi(editPostId, postDetail);
            if (res.status === 200) {
                toast.success('Post Updated Successfully JSONPlaceholder!');
                handleClose();
                getData();
            }
        }
        setLoading(false); // Stop spinner
    };

    const handleDelete = async (id, listType = 'db') => {
        setLoading(true); // Start spinner
        let res;
        if (listType === 'db') {
            res = await deleteDbPostApi(id);
            if (res.status === 200) {
                toast.success('Post Deleted from DB');
                setDbPostList(dbPostList.filter(post => post.id !== id));
            }
        } else {
            res = await deletePostApi(id);
            if (res.status === 200) {
                toast.success('Post Deleted');
                setPostList(postList.filter(post => post.id !== id));
            }
        }
        setLoading(false); // Stop spinner
    };

    const handleSort = (type) => {
        setSortType(type);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPosts = [...dbPostList, ...postList].filter(post => {
        const lowercasedSearchQuery = searchQuery.toLowerCase();
        return post.title.toLowerCase().includes(lowercasedSearchQuery) || post.userId.toString().includes(lowercasedSearchQuery);
    });

    const sortedPosts = filteredPosts.sort((a, b) => {
        if (sortType === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortType === 'userId') {
            return a.userId - b.userId;
        }
        return 0;
    });

    // Pagination Logic: Slice the posts to show the correct posts for the current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <section style={{ minHeight: '100vh' }}>
                <section className='p-3 shadow'>
                    <div className='container d-flex justify-content-between'>
                        <h3>CRUD</h3>
                        <button className='btn btn-info' onClick={() => handleShow()}>
                            {loading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Add Post +'
                            )}
                        </button>
                    </div>
                </section>

                <section className='container mt-3 d-flex justify-content-between'>
                    <Dropdown onSelect={handleSort}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="title">Sort by Title</Dropdown.Item>
                            <Dropdown.Item eventKey="userId">Sort by User ID</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <input
                        type="text"
                        className='form-control w-50'
                        placeholder='Search by title, userId'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </section>

                <section className='container d-flex flex-wrap justify-content-between'>
                    {
                        currentPosts.length > 0 ? (
                            currentPosts.map((item, index) => (
                                <div key={index} className='shadow my-3 border p-3 rounded-3' style={{ width: '22rem' }}>
                                    <h4 className='dash-title text-info fw-semibold'>{item.title}</h4>
                                    <h5><span className='text-info'>UserId: </span><span className='text-success'>{item.userId}</span></h5>
                                    <p className='dash-body'>{item.body}</p>
                                    <div className='d-flex justify-content-between'>
                                        <button className='btn btn-warning' onClick={() => handleShow(item, dbPostList.includes(item) ? 'db' : 'local')}>
                                            <i className="fa-regular fa-pen-to-square" />
                                        </button>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => handleDelete(item.id, dbPostList.includes(item) ? 'db' : 'local')}
                                            disabled={loading} // Disable button when loading
                                        >
                                            {loading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                <i className="fa-solid fa-trash" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h4>No Post To Show ...</h4>
                        )
                    }
                </section>

                <section className='container d-flex justify-content-center mt-3 mb-5'>
                    <Pagination>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </section>
            </section>

            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? 'Edit' : 'Add'} Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel label="User ID" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="User ID"
                            value={postDetail.userId}
                            onChange={(e) => setPostDetail({ ...postDetail, userId: e.target.value })}
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Title" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            value={postDetail.title}
                            onChange={(e) => setPostDetail({ ...postDetail, title: e.target.value })}
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Body" className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            value={postDetail.body}
                            onChange={(e) => setPostDetail({ ...postDetail, body: e.target.value })}
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {loading ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Dashboard;
