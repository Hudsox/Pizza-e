import React, { useState } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {useHistory} from  "react-router-dom"
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl2 from "@material-ui/core/FormControl";


import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { FiEdit3, FiXCircle, FiPlus, FiSearch } from "react-icons/fi";

import { Dialog } from "@material-ui/core";

import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";

import { ToastContainer, toast } from "react-toastify";

import ReactTooltip from 'react-tooltip';
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";

const url = window.location.href.replace("http://localhost:3000/", "");

const GenericTable = ({ data, title }) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  var itensQuantidade = [];

  const [valueTipoProduto, setTipoProduto] = React.useState("pizza")
  const [valueGeneric, setTipoValueGeneric] = React.useState("pizza")
  const handleChangePizza = () => {
    setTipoProduto('pizza')
  }

  const handleChangeProduto = () => {
    setTipoProduto('normal')
  }

  const handleChange = (event) => {
    setTipoValueGeneric(event.target.value)
  }

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

  const handleClose = (url) => {
    setOpen(false);

    if(url === 'funcionarios'){
      toast.success("🍕 Registro deletado com sucesso!", {
        toastStyle,
      });
    }
    else if(url === 'estoque'){
      toast.success("🍕 Produto removido do estoque com sucesso!", {
        toastStyle,
      });
    }
    else if(url === 'produtos'){
      toast.success("🍕 Produto removido com sucesso!", {
        toastStyle,
      });
    }
    else if(url === 'pedidos'){
      toast.success("🍕 Pedido removido com sucesso!", {
        toastStyle,
      });
    }

  };


  const handleError = () => {
    toast.error("🍕 Produto não pode ser removido: Quantidade maior que zero!");
  };

  const handleEdit = (item) => {
    {
      url === "pedidos" && history.push("/gerenciar-pedido", {tipo:"Editar", item: item});
    }
    {
      url === "clientes" && history.push("/");
    }
    {
      url === "produtos" && history.push("/gerenciar-produto", {tipo: "Editar", item: item});
    }
    {
      url === "estoque" && history.push("/editar-estoque");
    }
    {
      url === "funcionarios" && history.push("/editar-funcionario");
    }
  };

  const direcionarCadastro = () => {
    {
      url === "pedidos" && history.push("/gerenciar-pedido", {tipo: "Cadastro"});
    }
    {
      url === "clientes" && history.push("/");
    }
    {
      url === "produtos" && (
        confirmAlert({
          title: "Escolher tipo",
          message: "Selecione o tipo de produto que deseja cadastrar",
          buttons: [
            {
              label: "Pizza",
              onClick: () => history.push("/gerenciar-produto", {tipo: "Cadastro", tipoProduto:"Pizza"})
            },
            {
              label: "Normal",
              onClick: () => history.push("/gerenciar-produto", {tipo: "Cadastro", tipoProduto:"Normal"})
            }
          ]
        })
      )
    }
    {
      url === "estoque" && history.push("/cadastrar-estoque");
    }
    {
      url === "funcionarios" && history.push("/cadastrar-funcionario");
    }
  };

  return (
    <>
      <InputGroup className="col-3 mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FiSearch size={18} color="#000" />
          </InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
          placeholder={`Buscar ${title}`}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      {url === "produtos" && (
        <FormControl2 style={{margin:10}} component="RadioTipoProduto">
        <FormLabel >Escolha o tipo do produto</FormLabel>
          <RadioGroup aria-label="TipoProduto" name="TipoProduto" value={valueGeneric} onChange={handleChange}>
            <FormControlLabel
              control={<Radio />}
              value="pizza"
              label="Pizza"
              onChange={handleChangePizza}
            />
            <FormControlLabel
              control={<Radio />}
              value="normal"
              label="Normal"
              onChange={handleChangeProduto}
            />
          </RadioGroup>
        </FormControl2>
      )}
      <Table striped bordered hover>
        {url === "pedidos" && (
          <>
            <thead>
              <tr>
                <td>Data</td>
                <td>ID</td>
                <td>Descrição</td>
                <td>Pagamento</td>
                <td>Observações</td>
                <td>Expedição</td>
                <td>CPF</td>
                <td>Valor</td>
                <td>Status</td>
                <td>Ações</td>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.data}</td>
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td>{item.pagamento}</td>
                  <td>{item.observacoes}</td>
                  <td>{item.expedicao}</td>
                  <td>{item.CPF}</td>
                  <td>R$ {item.valor}</td>
                  <td>{item.status}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                      onClick={value => handleEdit(item)}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger" onClick={() => setOpen(true)}>
                      <FiXCircle size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-apagar">
              {
                "Deseja cancelar o pedido?"
              }
            </DialogTitle>
            <DialogActions>
              <Button
                variant="danger"
                className="botao"
                color="primary"
                onClick={() => setOpen(false)}
              >
                Não
              </Button>

              <Button
                className="botao"
                variant="success"
                onClick={() => handleClose("pedidos")}
                color="primary"
                autoFocus
              >
                Sim
              </Button>
            </DialogActions>
          </Dialog>
          </>
        )}

        {url === "clientes" && (
          <>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.cod}</td>
                  <td>{item.nome}</td>
                  <td>{item.marca}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.itens}</td>
                  <td>{item.qntMinima}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger">
                      <FiXCircle size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        )}

        {url === "produtos" && (
          <>  
          {valueTipoProduto === "pizza" &&(
            <>
            <thead>
            <tr>
              <td>Tipo</td>
              <td>Código</td>
              <td>Nome</td>
              <td>Valor</td>
              <td>Ingredientes</td>
              <td>Adicionais</td>
              <td>Valor promocional</td>
              <td>Início da promoção</td>
              <td>Fim da promoção</td>
              <td>Ações</td>
            </tr>
            </thead>  
            {data.map((item) => {
              if(item.tipo === "Pizza"){
                return (
                  <tbody>
                    <tr>
                      <td>{item.tipo}</td>
                      <td>{item.codigo}</td>
                      <td>{item.nome}</td>
                      <td>{item.valor}</td>
                      <td>{item.ingredientes}</td>
                      <td>{item.adicionais}</td>
                      <td>{item.valorPromocional}</td>
                      <td>{item.inicioPromo}</td>
                      <td>{item.fimPromo}</td>
                      <td>
                        <Button onClick={value => handleEdit(item)} variant="light" data-tip="Editar" style={{marginBottom: 10,marginRight:7, borderWidth:1, borderColor:"black"}}>
                        <ReactTooltip />
                          <FiEdit3 size={20} color="#black" />
                        </Button>
                        <Button variant="danger" data-tip="Desativar" onClick={value => setOpen(true)}>
                        <ReactTooltip />
                          <FiXCircle size={20} color="#black" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                )
              }
              
            })}
            </>
          )}
          {valueTipoProduto === "normal" && (
            <>
          <thead>
            <tr>
              <td>Tipo</td>
              <td>Código</td>
              <td>Nome</td>
              <td>Valor</td>
              <td>Peso</td>
              <td>Status</td>
              <td>Valor promocional</td>
              <td>Início da promoção</td>
              <td>Fim da promoção</td>
              <td>Ações</td>
            </tr>
            </thead>  
            {data.map((item) => {
              if(item.tipo === "Normal"){
                return (
              
                  <tbody>
                    <tr>
                      <td>{item.tipo}</td>
                      <td>{item.codigo}</td>
                      <td>{item.nome}</td>
                      <td>{item.valor}</td>
                      <td>{item.peso}</td>
                      <td>{item.status}</td>
                      <td>{item.valorPromicional}</td>
                      <td>{item.inicioPromo}</td>
                      <td>{item.fimPromo}</td>
                      <td>
                        <Button onClick={value => handleEdit(item)} variant="light" data-tip="Editar" style={{marginRight:7, borderWidth:1, borderColor:"black"}}>
                        <ReactTooltip />
                          <FiEdit3 size={20} color="#black" />
                        </Button>
                        <Button variant="danger" data-tip="Desativar" onClick={value => setOpen(true)}>
                        <ReactTooltip />
                          <FiXCircle size={20} color="#black" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                )
              }
            })}
            </>
          )}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-apagar">
              {
                "Deseja desativar o produto?"
              }
            </DialogTitle>
            <DialogActions>
              <Button
                variant="danger"
                className="botao"
                onClick={() => setOpen(false)}
                color="primary"
              >
                Não
              </Button>

              <Button
                className="botao"
                variant="success"
                onClick={() => handleClose("produtos")}
                color="primary"
                autoFocus
              >
                Sim
              </Button>
            </DialogActions>
          </Dialog>
          </>
        )}
        <FiPlus size={26} color="fff"/>
        {url === "estoque" && (
          <>
            <thead>
              <tr>
                <td>Cod</td>
                <td>Nome</td>
                <td>Marca</td>
                <td>Quantidade</td>
                <td>Valor do item</td>
                <td>Peso do item</td>
                <td>Data de validade</td>
                <td>Data de fabricação</td>
                <td>Ações</td>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.codigo}</td>
                  <td>{item.nome}</td>
                  <td>{item.marca}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.valor}</td>
                  <td>{item.peso}</td>
                  <td>{item.validade}</td>
                  <td>{item.fabricacao}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                      onClick={handleEdit}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger" onClick={handleClickOpen}>
                      <FiXCircle size={20} color="#black" />
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle id="alert-dialog-apagar">
                        {"Deseja realmente remover o produto do estoque?"}
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          variant="danger"
                          className="botao"
                          onClick={() => setOpen(false)}
                          onClick={handleClose}
                          color="primary"
                        >
                          Não
                        </Button>
                        <Button
                          className="botao"
                          variant="success"
                          onClick={() => handleClose("estoque")}
                          color="primary"
                          autoFocus
                        >
                          Sim
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        )}
        {url === "funcionarios" && (
          <>
            <thead>
              <tr>
                <td>Nome</td>
                <td>CPF</td>
                <td>RG</td>
                <td>Carteira de trabalho</td>
                <td>CEP</td>
                <td>Endereço</td>
                <td>Complemento</td>
                <td>Ações</td>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.nome}</td>
                  <td>{item.cpf}</td>
                  <td>{item.rg}</td>
                  <td>{item.carteira_trabalho}</td>
                  <td>{item.cep}</td>
                  <td>{item.endereco}</td>
                  <td>{item.complemento}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                      onClick={handleEdit}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger" onClick={handleClickOpen}>
                      <FiXCircle
                        size={20}
                        color="#black"
                        // onclick={deleteItem(item.quantidade)}
                      />
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle id="alert-dialog-apagar">
                        {
                          "Deseja realmente deletar os registros do funcionário?"
                        }
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          variant="danger"
                          className="botao"
                          onClick={() => setOpen(false)}
                          onClick={handleClose}
                          color="primary"
                        >
                          Não
                        </Button>

                        <Button
                          className="botao"
                          variant="success"
                          onClick={() => handleClose("funcionarios")}
                          color="primary"
                          autoFocus
                        >
                          Sim
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        )}
      </Table>
      <Button variant="success" onClick={direcionarCadastro}>
        <FiPlus size={26} color="fff" />
        Adicionar
      </Button>
      <ToastContainer />
    </>
  );
};

export default GenericTable;
