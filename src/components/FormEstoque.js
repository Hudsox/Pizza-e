import React, {useState } from 'react';

import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

import { FiCheckCircle, FiChevronLeft } from "react-icons/fi";

import { Button } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Dialog } from "@material-ui/core";

import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";

import { useHistory } from "react-router-dom";

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "30ch",
  },
}));



const FormularioEstoque = (props) => {
  const history = useHistory();
  const classes = useStyles();
  var tipo = props.type;
  const [open, setOpen] = React.useState(false);

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (event) => {
    event.preventDefault();

    if(tipo === "cadastrar"){
      axios.post('http://localhost:8080/produtos-estoque', {
        nome: nome,
        valor: valor,
        peso: peso,
        validade: validade,
        fabricacao: fabricacao,
      }).then(result => toast.success("🍕 Cadastro feito!", {
        toastStyle,
      }))
      .catch(error => {
        console.log(error)
          toast.error(error.response.data.message, {
              toastStyle,
          })
          toast.error(error.response.data.details, {
              toastStyle,
          })
      })
  }
    if (tipo === "editar") {
      toast.success("🍕 Dados atualizados!", {
        toastStyle,
      });
    }
    setTimeout(() => {
      history.push("/estoque");
    }, 1500);
  };

  const [nome, setNome] = useState("")
  const [valor, setValor] = useState("")
  const [peso, setPeso] = useState("")
  const [validade, setValidade] = useState("")
  const [fabricacao, setFabricacao] = useState("")


  return (
    <>
      <form className={classes.root} onSubmit={handleSave}>
        <div className="contentForm">
        <TextField onChange={event => setNome(event.target.value)}
              required
              label="Nome"
              placeholder="Nome do produto"
              style={{
                margin: 8,
              }}
            />
          </div>
          <div className="contentForm">
          <TextField onChange={event => setValor(event.target.value)}
            required
            label="Valor"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />
        </div>
        <div className="contentForm">
          <TextField onChange={event => setPeso(event.target.value)}
            required
            label="Peso"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />
        </div>
        <div className="contentForm">
          <TextField onChange={event => setValidade(event.target.value)}
            label="Data de Validade"
            type="date"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            defaultValue="aaaa-mm-dd"
            InputLabelProps={{
              shrink: true,
            }}
          />
          </div>
          <div className="contentForm">
          <TextField onChange={event => setFabricacao(event.target.value)}
            label="Data de Fabricação"
            type="date"
            style={{
              margin: 8,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            defaultValue="aaaa-mm-dd"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Button
          className="botao"
          variant="ligth"
          style={{ marginRight: 7, borderWidth: 1, borderColor: "black" }}
          onClick={handleClickOpen}
        >
          <FiChevronLeft /> Voltar
        </Button>
        {tipo === "cadastrar" && (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-voltar">
              {"Deseja continuar o cadastro do produto no estoque?"}
            </DialogTitle>
            <DialogActions>
              <Button
                variant="danger"
                className="botao"
                href="/estoque"
                onClick={handleClose}
                color="primary"
              >
                Não
              </Button>

              <Button
                className="botao"
                variant="success"
                onClick={handleClose}
                color="primary"
                autoFocus
              >
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {tipo === "editar" && (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-voltar">
              {"Deseja continuar a editar os dados do produto?"}
            </DialogTitle>
            <DialogActions>
              <Button
                variant="danger"
                className="botao"
                href="/estoque"
                onClick={handleClose}
                color="primary"
              >
                Não
              </Button>

              <Button
                className="botao"
                variant="success"
                onClick={handleClose}
                color="primary"
                autoFocus
              >
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Button
          className="botao"
          style={{ marginRight: 7, borderWidth: 1, borderColor: "black" }}
          type="submit"
          variant="success"
        >
          <FiCheckCircle /> Salvar
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default FormularioEstoque;
