import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';

const withAuthentication = (WrappedComponent) => {
    return function AuthComponent(props) {
        const [isAuthenticated, setAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='));
            if (token) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
            setLoading(false);
        }, []);

        if (loading) {
            return <div>Loading...</div>;
        }

        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        } else {
            return <Navigate to='/login' />;
        }
    };
}

export default withAuthentication;
