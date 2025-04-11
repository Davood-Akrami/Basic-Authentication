import {useState, useEffect} from 'react';

const CreateUserForm = ({onSubmit, selectedUser, setSelectedUser, editUser}) => {
    const [form, setForm] = useState({
        email: '',
        name: '',
    })

    useEffect(() => {
        if (selectedUser) {
            setForm({
                email: selectedUser.email,
                name: selectedUser.name,
            })
        } else {
            setForm({
                email: '',
                name: '',
            })
        }
    }, [selectedUser])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedUser) {
            await editUser(form)
        } else {
            await onSubmit(form)
        }

        if (!selectedUser) {
            setForm({
                email: '',
                name: '',
            })
        }
    }

    

    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedUser ? 'Edit User' : 'Create User'}</h2>
            <input 
                type="text" 
                name="email" 
                value={form.email}
                onChange={handleChange} 
                placeholder="Email"
                required
            />
            <input 
                type="text" 
                name="name" 
                value={form.name}
                onChange={handleChange} 
                placeholder="Name"
                required
            />
            <button type='submit'>{selectedUser ? 'Update' : 'Create'}</button>
            <button type='reset' onClick={() => {
                setForm({
                    email: '',
                    name: '',
                });
                setSelectedUser(null);
                }}>
                Reset
            </button>
        </form>
    )
}


















const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:8000/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                } 
            })
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    
    const handleCreateUser = async (formData) => {
        
        setLoading(true)
        try {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (data.user) {
                fetchUsers()
                setSelectedUser(null)
            } else {
                console.error('Error creating user:', data.message)
            }
        } catch (error) {
            console.error('Error creating user:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteUser = async (id) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:8000/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()
            if (data.success) {
                fetchUsers()
            }
        } catch (error) {
            console.error('Error deleting user:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const editUser = async (formData) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:8000/api/users/${selectedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email
                })
            })
            const data = await response.json()
            if (data.success) {
                fetchUsers()
                setSelectedUser(null)
            } else {
                console.error('Error updating user:', data.message)
            }
        } catch (error) {
            console.error('Error updating user:', error)
        } finally {
            setLoading(false)
        }
    }




    return (
        <div>
            <div>
                <CreateUserForm 
                    onSubmit={handleCreateUser}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    editUser={editUser}
                />
            </div>
            <div>
                <h2>Search for users</h2>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={search}
                    onChange={handleSearch} 
                />
            </div>
            <div>
                <h2>Users</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    users.map(user => (
                        <div key={user.id} style={{all: 'unset', display: 'flex',alignItems: 'center', padding: '5px', width: '38%', gap: '15px'}}>
                            <h4>{user.name}</h4>
                            <p>{user.email}</p>
                            <button onClick={() => setSelectedUser(user)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Users