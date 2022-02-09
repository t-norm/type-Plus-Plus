import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import Uploader from '../components/Uploader';
import UserInfo from '../components/UserInfo';
import Achievements from '../components/Achievements';
<<<<<<< HEAD
import Progress from '../components/Progress'
import EditModal from '../components/EditModal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');


const Dashboard = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
=======
import Progress from '../components/Progress';

const Dashboard = () => {
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
>>>>>>> main
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME);
    console.log(data);

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/dashboard" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return <h4 className="flex-grow">Must be logged in</h4>;
    }
    return (
<<<<<<< HEAD
        <section>
            <UserInfo data={data} />
            <div>
                <button onClick={openModal}>Edit Profile</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Profile</h2>

                    <EditModal data={data} />
                    <button onClick={closeModal}>Done</button>
                </Modal>
            </div>
=======
        <section className="flex-grow">
            <Uploader
                image={image}
                setImage={setImage}
                url={url}
                setUrl={setUrl}
            />
            <UserInfo data={data} />
            <Achievements />
            <Progress />
>>>>>>> main
        </section>
    );
};

export default Dashboard;
