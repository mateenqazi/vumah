import { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CURRENT_USER, SIGNUP } from '../graphql/Queries';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: {}
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  UPDATE_USER: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: {}
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
  setData: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [values, setValues] = useState({});

  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    if (!loading) {
      if (error !== undefined) {
        setSession(null);
        dispatch({ type: 'LOGOUT' });
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: {}
          }
        });
        return;
      }

      if (data.GetCurrentUser !== null) {
        const user = data.GetCurrentUser;

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user
          }
        });
      } else {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: {}
          }
        });
      }
    }
  }, [data, error]);

  const setData = (res) => {
    const { token, user } = res.data.login;

    setSession(token);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const login = async (email, password) => {
    const response = await axios.post('/api/account/login', {
      email,
      password
    });

    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const updateUser = async () => () => {
    if (!loading) {
      if (error !== undefined) {
        setSession(null);
        dispatch({ type: 'LOGOUT' });
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: {}
          }
        });
        return;
      }

      if (data.GetCurrentUser !== null) {
        const user = data.GetCurrentUser;

        dispatch({
          type: 'UPDATE_USER',
          payload: {
            isAuthenticated: true,
            user
          }
        });
      } else {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: {}
          }
        });
      }
    }
  };

  const register = async (newValues) => {
    setValues(newValues);

    // await CreateUser()
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        setData,
        updateUser,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
