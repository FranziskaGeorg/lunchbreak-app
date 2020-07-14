import React, {useReducer, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    inputField: {
        backgroundColor: "#eef5f6",
        '@media (max-width: 599px)': {
            width: "75vw"
        },
        '@media (min-width:600px)': {
            width: "50vw"
        },
        '@media (min-width:960px)': {
            width: "25vw"
        }
    },
    notchedOutline: {
        borderColor: "#eef5f6 !important",
    },
    nextTopic: {
        paddingTop: theme.spacing(2)
    }
}));

export default function ProfilePage() {
    const classes = useStyles();
    const [subsidiary, setSubsidiary] = useState('');

    const subsidiaries = [
        {
            value: "Technologies"
        },
        {
            value: "Business Consultants"
        },
        {
            value: "Communications"
        },
        {
            value: "Development & Integration"
        },
        {
            value: "Services"
        },
        {
            value: "Solutions"
        },
        {
            value: "Babiel"
        },
        {
            value: "PROCON IT"
        }
    ]

    const [lunchdays, setLunchdays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
    })
    const {monday, tuesday, wednesday, thursday, friday} = lunchdays;

    const [profileInput, setProfileInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            firstName: '',
            lastName: '',
            job: '',
            subsidiary: subsidiary,
            favoriteFood: '',
            interests: '',
            email: '',
            phoneNumber: '',
            lunchDays: [],
        }
    )

    function handleInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        setProfileInput({[field]: value});
    }

    function handleSubsidiaryChange(event) {
        setSubsidiary(event.target.value);
    }

    function handleLunchdayChange(event) {
        setLunchdays({...lunchdays, [event.target.name]: event.target.checked});
    }

    return (
        <Card>
            <Grid container
                  className={classes.gridContainer}
                  direction="column"
                  alignContent="center"
                  justify="center"
                  spacing={1}
            >
                <CardContent>
                    <Grid item>
                        <Typography variant="h5">
                            Über Dich
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            margin="dense"
                            className={classes.inputField}
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            id="outlined-required"
                            variant="outlined"
                            name="firstName"
                            label="Vorname"
                            value={profileInput.firstName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            margin="dense"
                            className={classes.inputField}
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            id="outlined-required"
                            variant="outlined"
                            name="lastName"
                            label="Nachname"
                            value={profileInput.lastName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            margin="dense"
                            className={classes.inputField}
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            id="outlined-required"
                            variant="outlined"
                            name="job"
                            label="Tätigkeit bei CONET"
                            value={profileInput.job}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            select
                            margin="dense"
                            className={classes.inputField}
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            id="outlined-select"
                            variant="outlined"
                            name="subsidiary"
                            label="CONET-Gesellschaft"
                            value={subsidiary}
                            onChange={handleSubsidiaryChange}
                        >
                            {subsidiaries.map(subsidiary => (
                                <MenuItem value={subsidiary.value}>
                                    {subsidiary.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            margin="dense"
                            className={classes.inputField}
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            id="outlined-required"
                            variant="outlined"
                            name="favoriteFood"
                            label="Lieblingsessen bzw. -essensrichtung"
                            value={profileInput.favoriteFood}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            multiline
                            margin="dense"
                            className={classes.inputField}
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            id="outlined-required"
                            variant="outlined"
                            name="interests"
                            label="Hobbies oder Interessen"
                            value={profileInput.interests}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item
                          className={classes.nextTopic}
                    >
                        <Typography variant="h5">
                            Kontaktdaten
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            margin="dense"
                            className={classes.inputField}
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            id="outlined-required"
                            variant="outlined"
                            name="email"
                            label="E-Mail-Adresse"
                            value={profileInput.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            margin="dense"
                            className={classes.inputField}
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                            id="outlined-required"
                            variant="outlined"
                            name="phoneNumber"
                            label="Handynummer"
                            value={profileInput.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item
                          className={classes.nextTopic}
                    >
                        <Typography variant="h5">
                            Deine Lunchdays
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormControl component="fieldset">
                            <FormLabel
                                component="legend"
                                className={classes.nextTopic}>
                                Markiere die Tage, an denen Du grundsätzlich lunchen gehen möchtest/kannst
                            </FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={monday} onChange={handleLunchdayChange} name="monday"/>}
                                    label="Montag"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={tuesday} onChange={handleLunchdayChange}
                                                       name="tuesday"/>}
                                    label="Dienstag"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={wednesday} onChange={handleLunchdayChange}
                                                       name="wednesday"/>}
                                    label="Mittwoch"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={thursday} onChange={handleLunchdayChange}
                                                       name="thursday"/>}
                                    label="Donnerstag"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={friday} onChange={handleLunchdayChange} name="friday"/>}
                                    label="Freitag"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </CardContent>
            </Grid>
        </Card>
    )
}