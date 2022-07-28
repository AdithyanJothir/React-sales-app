import React from "react";
import toast from 'react-hot-toast';
import {
    Button,
    TextField,
    Grid,
    Paper,
    AppBar,
    Typography,
    Toolbar,
    Link,
} from "@material-ui/core";
import {useState} from "react";
import './Login.css';
import {login} from '../Services/auth';


const Login = () => {

    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const [loginError,setLoginError] = useState("")
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let authlogin = await login(user,pass);
        if (authlogin === 0){
            setLoginError("Login unsuccessful.Please check credentials and try again.");
            toast.error("Login failed");

        }
        else if (authlogin === 1){
            toast.success("Login successfull");
            console.log("Login Successfull");
        }
    }
    return (
        <div>
            <AppBar position="static" alignitems="center" color="primary">
                <Toolbar>
                    <Grid container justify="center" wrap="wrap">
                        <Grid item>
                            <Typography variant="h6">Sales App</Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container spacing={0} justify="center" direction="row">
                <Grid item>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        className="login-form"
                    >
                        <Paper
                            variant="elevation"
                            elevation={2}
                            className="login-background"
                        >
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form onSubmit={handleSubmit}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            <TextField
                                                type="text"
                                                placeholder="Username"
                                                fullWidth
                                                name="username"
                                                variant="outlined"
                                                onChange={e=>{setUser(e.target.value)}}
                                                required
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="password"
                                                placeholder="Password"
                                                fullWidth
                                                name="password"
                                                variant="outlined"
                                                onChange={e=>{setPass(e.target.value)}}
                                                required
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className="button-block"
                                            >
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                            <Grid item>
                                <p>{loginError}</p>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Forgot Password?
                                </Link>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>)
}

export default Login;
