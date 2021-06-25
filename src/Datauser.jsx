import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar }
    from '@material-ui/core/';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';


function Datauser() {
    let [current, newVal] = useState([]);

    let [currentStyle, newstyle] = useState({});


    let url1 = "https://reqres.in/api/users?page=1";
    let url2 = "https://reqres.in/api/users?page=2";


    const getUserData = async (url) => {

        try {
            let response = await fetch(url);
            let objData = await response.json();
            newVal(() => {
                return objData.data;
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData(url1);
    }, []);



    //styling document  
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },

        contain: {
            backgroundColor: "lightBlue",
            width: "100vw",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
        },


        childCont: {
            width: '100%',
            height: "20%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

        },

        previous: {
            backgroundColor: "rgb(255, 160, 122)",
            display: "none",
        },

        next: {
            backgroundColor: "violet",
        },



    });
    const classes = useStyles();


//function for previous button    
    function page1() {

        newstyle(() => {
            return {
                none: {
                    display: 'block',
                },

                show: {
                    display: 'none',
                },
            }
        });

        getUserData(url1);

    }


//function for next button    
    function page2() {

        newstyle(() => {
            return {
                none: {
                    display: 'none',
                },

                show: {
                    display: 'block',
                },
            }
        });


        getUserData(url2);

    }


    return (<>

        <Container fixed className={classes.contain}>
            <Container fixed className={classes.childCont}>
                <Button className={classes.previous} onClick={page1} style={currentStyle.show}>Previous Page</Button>
                <Button className={classes.next} onClick={page2} style={currentStyle.none}>Next Page</Button>
            </Container>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="left">Avatar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {current.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.first_name}</TableCell>
                                <TableCell align="center">{row.last_name}</TableCell>
                                <TableCell id={classes.avMain}><Avatar alt="mypic" src={row.avatar} id={classes.avatar} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    </>);
}

export default Datauser;