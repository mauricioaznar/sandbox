import * as React from 'react'
import {useState} from 'react'

// icons
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

// components
import {useHistory} from 'react-router-dom'
import {Box, Fab, IconButton} from "@mui/material";
import {
    GetTodosQuery,
    namedOperations,
    useDeleteTodoMutation,
    useGetTodosQuery,
    useTodoSubscription
} from "../../schema";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MauSnackbar from "../../components/MauSnackbar";
import {ApolloError} from "@apollo/client";
import {useTypedSelector} from "../../hooks/useTypedSelector";


export default function TodoList() {

    const history = useHistory()

    const { loading, data } = useGetTodosQuery()

    useTodoSubscription(
        {
            onSubscriptionData(options) {
                options.client.refetchQueries({include: [namedOperations.Query.GetTodos]})
            },

        }
    );

    if (loading) {
        return <h1>Loading</h1>;
    }


    function handleCreateClick() {
        history.push('/todoForm')
    }


    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container alignItems={'center'}>
                <Grid item xs>
                    <h2>
                        Todos
                    </h2>
                </Grid>
                <Grid item>
                    <Fab size={'small'} color="primary" aria-label="add" onClick={handleCreateClick}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Due</TableCell>
                                    <TableCell>Completed</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.todos.map((todo) => (
                                    <TodoRow
                                        key={todo._id}
                                        todo={todo}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}


function TodoRow({todo}: { todo: GetTodosQuery["todos"][number] }) {

    const {currentUser} = useTypedSelector(
        (state) => state.auth
    )

    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')
    const [deleteTodoMutation] = useDeleteTodoMutation({
        refetchQueries: [namedOperations.Query.GetTodos]
    })
    const history = useHistory()

    function handleEditClick(todo: GetTodosQuery["todos"][number]) {
        history.push('/todoForm', {todo})
    }

    async function onDelete(todo: GetTodosQuery["todos"][number]) {
        setIsDisabled(true)
        try {
            await deleteTodoMutation({
                variables: {
                    id: todo._id
                }
            })
        } catch (e) {
            if (e instanceof  ApolloError) {
                setMessage(e.message)
            }
        }
    }

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell>
                {todo.description}
            </TableCell>
            <TableCell>
                {todo.due}
            </TableCell>
            <TableCell
                align={'center'}
            >
                <Box
                    sx={{
                        '& > :not(style)': {
                            m: 2,
                        },
                    }}
                >
                    {
                        todo.completed
                        ? <CheckBoxIcon fontSize={'medium'} />
                        : <CheckBoxOutlineBlankIcon fontSize={'medium'} />
                    }
                </Box>

            </TableCell>
            <TableCell>
                {todo.user?.username}
            </TableCell>
            <TableCell>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'nowrap'
                    }}
                >
                    {
                        currentUser?._id === todo.user?._id ? <IconButton
                            size={'small'}
                            onClick={() => {
                                handleEditClick(todo)
                            }}>
                            <CreateIcon fontSize={'small'}/>
                        </IconButton> : null

                    }
                    {
                        currentUser?._id === todo.user?._id ? <IconButton
                            disabled={isDisabled}
                            size={'small'}
                            onClick={() => {
                                onDelete(todo)
                            }}>
                            <DeleteIcon fontSize={'small'}/>
                        </IconButton> : null
                    }
                </Box>
            </TableCell>
            <MauSnackbar
                onClose={() => {
                    setIsDisabled(false)
                    setMessage('')
                }}
                message={message}
            />
        </TableRow>
    );
}
