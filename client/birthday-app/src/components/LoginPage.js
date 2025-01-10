import { useContext } from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from '../context/authContext';
import "./LoginPage.css";

const LoginPage = ({ onLogin, role }) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue
  } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const authContext = useContext(AuthContext);

  const onSubmit = (data) => {
    const { username, password } = data;
    fetch(`http://localhost:3006/employees/login`, {
      body: JSON.stringify({ username, password }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => Promise.all([res.status, res.json()]))
      .then(([status, user]) => {
        if (status === 400) {
          
          return Promise.reject(user.message);
        }
        return user;
      })
      .then((user) => {
        authContext.setLoginState(user.token);
        navigate('/votes');
      })
      .catch(e =>alert(e));

    setValue('username', '');
    setValue('password', '');
  };

  return (
    <div class="login">
      <Grid
        item
        sx={{ width: isDesktop ? "30%" : "80%", margin: "0 auto" }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          mt={3}
          mb={3}
          sx={{ fontWeight: "bold" }}
        >
          Влизане
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "90%", margin: "0 auto" }}
        >
          <Grid
            item
            container
            direction="column"
            spacing={2}
            sx={{ [theme.breakpoints.up("md")]: { marginTop: "4px" } }}
          >
            <Typography mb={-1}>Потребителско име</Typography>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Задължително поле" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  variant="outlined"
                  helperText={errors.username?.message}
                  fullWidth
                />
              )}
            />
            <Typography mb={-1}>Парола</Typography>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Задължително поле" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  type="password"
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  variant="outlined"
                  helperText={errors.password?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            sx={{ marginTop: "15px", marginBottom: "15px", height: "3rem" }}
            fullWidth
          >
            Влез
          </Button>
        </form>
      </Grid>
    </div>
  );
};

export default LoginPage;